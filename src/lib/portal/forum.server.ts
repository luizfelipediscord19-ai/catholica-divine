// Server-only. Fórum "Agora Ecclesiae" — leitura pública, escrita por identidade anônima.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { revisarTexto, sanitizarTexto } from "./moderacao.server";
import { dbLeitura } from "./db.server";

function slugTopico(titulo: string) {
  const base = titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  return `${base || "topico"}-${Math.random().toString(36).slice(2, 7)}`;
}

async function identidadePorToken(token: string) {
  const { data } = await supabaseAdmin
    .from("identidades")
    .select("id")
    .eq("token", token)
    .maybeSingle();
  if (!data) throw new Error("Identidade não encontrada.");
  return data.id;
}

/** Identidade opcional: usada só para o autor enxergar o próprio conteúdo em revisão. */
async function identidadeOpcional(token?: string | null) {
  if (!token) return null;
  const { data } = await supabaseAdmin
    .from("identidades")
    .select("id")
    .eq("token", token)
    .maybeSingle();
  return data?.id ?? null;
}

/** Contagem de "Amém" por tópico ou por resposta, em uma só consulta. */
async function contarAmens(
  coluna: "topico_id" | "resposta_id",
  ids: string[],
  identidadeId: string | null,
) {
  const total: Record<string, number> = {};
  const meus: Record<string, boolean> = {};
  if (ids.length === 0) return { total, meus };

  const { data } = await dbLeitura()
    .from("forum_reacoes")
    .select(`${coluna}, identidade_id`)
    .in(coluna, ids)
    .eq("tipo", "amem");

  for (const linha of (data ?? []) as Record<string, string | null>[]) {
    const alvo = linha[coluna];
    if (!alvo) continue;
    total[alvo] = (total[alvo] ?? 0) + 1;
    if (identidadeId && linha["identidade_id"] === identidadeId) meus[alvo] = true;
  }
  return { total, meus };
}

const AUTOR = "identidades!inner(santo_nome, santo_slug, santo_imagem, nivel, apelido)";

/** Aprovado para todos, ou em revisão apenas para o próprio autor. */
function filtroVisibilidade(identidadeId: string | null) {
  return identidadeId
    ? `status.eq.aprovado,identidade_id.eq.${identidadeId}`
    : "status.eq.aprovado";
}

export async function listarSecoes() {
  const { data } = await dbLeitura()
    .from("forum_secoes")
    .select("id, slug, nome, descricao, ordem")
    .order("ordem");
  return data ?? [];
}

export async function listarTopicos(secaoSlug?: string, token?: string | null, limite = 30) {
  const identidadeId = await identidadeOpcional(token);
  // Lê via service role: a tabela identidades não é mais pública (o token é
  // secreto), então o join de autor não pode passar pela chave publicável.
  // A visibilidade já é filtrada por status em filtroVisibilidade().
  let query = supabaseAdmin
    .from("forum_topicos")
    .select(
      `id, slug, titulo, corpo, fixado, trancado, status, respostas_count, ultima_atividade, created_at,
       forum_secoes!inner(slug, nome), ${AUTOR}`,
    )
    .or(filtroVisibilidade(identidadeId))
    .order("fixado", { ascending: false })
    .order("ultima_atividade", { ascending: false })
    .limit(limite);

  if (secaoSlug) query = query.eq("forum_secoes.slug", secaoSlug);
  const { data } = await query;
  const lista = data ?? [];
  const amens = await contarAmens(
    "topico_id",
    lista.map((t) => t.id),
    identidadeId,
  );
  return lista.map((t) => ({
    ...t,
    amens: amens.total[t.id] ?? 0,
    reagi: amens.meus[t.id] ?? false,
  }));
}


export async function obterTopico(slug: string, token?: string | null) {
  const identidadeId = await identidadeOpcional(token);

  const { data: topico } = await supabaseAdmin
    .from("forum_topicos")
    .select(
      `id, slug, titulo, corpo, fixado, trancado, status, identidade_id, respostas_count, created_at,
       forum_secoes!inner(slug, nome), ${AUTOR}`,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!topico) return null;
  // Conteúdo em revisão só é visível para quem escreveu.
  if (topico.status !== "aprovado" && topico.identidade_id !== identidadeId) return null;

  const { data: respostas } = await dbLeitura()
    .from("forum_respostas")
    .select(`id, corpo, status, created_at, ${AUTOR}`)
    .eq("topico_id", topico.id)
    .or(filtroVisibilidade(identidadeId))
    .order("created_at");

  const lista = respostas ?? [];
  const amensTopico = await contarAmens("topico_id", [topico.id], identidadeId);
  const amensRespostas = await contarAmens(
    "resposta_id",
    lista.map((r) => r.id),
    identidadeId,
  );

  return {
    topico: {
      ...topico,
      amens: amensTopico.total[topico.id] ?? 0,
      reagi: amensTopico.meus[topico.id] ?? false,
    },
    respostas: lista.map((r) => ({
      ...r,
      amens: amensRespostas.total[r.id] ?? 0,
      reagi: amensRespostas.meus[r.id] ?? false,
    })),
  };
}


export async function criarTopico(
  token: string,
  entrada: { secaoSlug: string; titulo: string; corpo: string },
) {
  const identidadeId = await identidadePorToken(token);
  const { data: secao } = await supabaseAdmin
    .from("forum_secoes")
    .select("id")
    .eq("slug", entrada.secaoSlug)
    .maybeSingle();
  if (!secao) throw new Error("Seção não encontrada.");

  const titulo = sanitizarTexto(entrada.titulo, 160);
  const corpo = sanitizarTexto(entrada.corpo);
  if (titulo.length < 5) throw new Error("O título precisa ter ao menos 5 caracteres.");
  if (corpo.length < 10) throw new Error("A mensagem precisa ter ao menos 10 caracteres.");

  const revisao = revisarTexto(titulo, corpo);

  const { data, error } = await supabaseAdmin
    .from("forum_topicos")
    .insert({
      secao_id: secao.id,
      identidade_id: identidadeId,
      titulo,
      slug: slugTopico(titulo),
      corpo,
      status: revisao.status,
    })

    .select("slug")
    .single();
  if (error || !data) throw new Error("Não foi possível criar o tópico.");

  const { count: totalTopicos } = await supabaseAdmin
    .from("forum_topicos")
    .select("id", { count: "exact", head: true })
    .eq("identidade_id", identidadeId);

  const conquistas = ["primeiro-topico"];
  if ((totalTopicos ?? 0) >= 5) conquistas.push("cinco-topicos");
  await premiar(identidadeId, 30, conquistas);

  return { slug: data.slug, status: revisao.status, motivo: revisao.motivo };
}

export async function responderTopico(token: string, topicoSlug: string, entradaCorpo: string) {
  const identidadeId = await identidadePorToken(token);
  const { data: topico } = await supabaseAdmin
    .from("forum_topicos")
    .select("id, trancado, respostas_count")
    .eq("slug", topicoSlug)
    .maybeSingle();
  if (!topico) throw new Error("Tópico não encontrado.");
  if (topico.trancado) throw new Error("Este tópico está trancado.");

  const corpo = sanitizarTexto(entradaCorpo);
  if (corpo.length < 5) throw new Error("A resposta precisa ter ao menos 5 caracteres.");

  const revisao = revisarTexto(corpo);

  const { error } = await supabaseAdmin
    .from("forum_respostas")
    .insert({
      topico_id: topico.id,
      identidade_id: identidadeId,
      corpo,
      status: revisao.status,
    });

  if (error) throw new Error("Não foi possível publicar a resposta.");

  // O contador público só cresce quando a resposta já está visível.
  if (revisao.status === "aprovado") {
    await supabaseAdmin
      .from("forum_topicos")
      .update({
        respostas_count: topico.respostas_count + 1,
        ultima_atividade: new Date().toISOString(),
      })
      .eq("id", topico.id);
  }

  const { count } = await supabaseAdmin
    .from("forum_respostas")
    .select("id", { count: "exact", head: true })
    .eq("identidade_id", identidadeId);

  const totalRespostas = count ?? 0;
  const conquistasResposta = ["primeira-resposta"];
  if (totalRespostas >= 10) conquistasResposta.push("dez-respostas");
  if (totalRespostas >= 50) conquistasResposta.push("cinquenta-respostas");
  await premiar(identidadeId, 15, conquistasResposta);

  return { ok: true, status: revisao.status, motivo: revisao.motivo };
}

export async function denunciar(
  token: string,
  alvo: { topicoId?: string; respostaId?: string },
  motivo: string,
  comentario?: string,
) {
  const identidadeId = await identidadePorToken(token);
  if (!alvo.topicoId && !alvo.respostaId) throw new Error("Nada para denunciar.");

  const coluna = alvo.topicoId ? ("topico_id" as const) : ("resposta_id" as const);
  const valor = alvo.topicoId ?? alvo.respostaId!;

  const { data: existente } = await supabaseAdmin
    .from("forum_denuncias")
    .select("id")
    .eq("identidade_id", identidadeId)
    .eq(coluna, valor)
    .maybeSingle();
  if (existente) return { ok: true, repetida: true };

  const { error } = await supabaseAdmin.from("forum_denuncias").insert({
    identidade_id: identidadeId,
    topico_id: alvo.topicoId ?? null,
    resposta_id: alvo.respostaId ?? null,
    motivo,
    comentario: comentario ?? null,
  });
  if (error) throw new Error("Não foi possível registrar a denúncia.");

  // Três denúncias distintas retiram o conteúdo de circulação até revisão.
  const { count } = await supabaseAdmin
    .from("forum_denuncias")
    .select("id", { count: "exact", head: true })
    .eq(coluna, valor)
    .eq("situacao", "pendente");

  if ((count ?? 0) >= 3) {
    const tabela = alvo.topicoId ? "forum_topicos" : "forum_respostas";
    await supabaseAdmin.from(tabela).update({ status: "em_revisao" }).eq("id", valor);
  }

  return { ok: true, repetida: false };
}

export async function reagir(
  token: string,
  alvo: { topicoId?: string; respostaId?: string },
  tipo = "amem",
) {
  const identidadeId = await identidadePorToken(token);
  const filtro = alvo.topicoId
    ? { coluna: "topico_id" as const, valor: alvo.topicoId }
    : { coluna: "resposta_id" as const, valor: alvo.respostaId! };

  const { data: existente } = await supabaseAdmin
    .from("forum_reacoes")
    .select("id")
    .eq("identidade_id", identidadeId)
    .eq(filtro.coluna, filtro.valor)
    .eq("tipo", tipo)
    .maybeSingle();

  if (existente) {
    await supabaseAdmin.from("forum_reacoes").delete().eq("id", existente.id);
    return { reagiu: false };
  }

  await supabaseAdmin.from("forum_reacoes").insert({
    identidade_id: identidadeId,
    topico_id: alvo.topicoId ?? null,
    resposta_id: alvo.respostaId ?? null,
    tipo,
  });
  return { reagiu: true };
}

async function premiar(identidadeId: string, xp: number, conquistas: string[]) {
  const { data } = await supabaseAdmin
    .from("identidades")
    .select("xp")
    .eq("id", identidadeId)
    .single();
  const novoXp = (data?.xp ?? 0) + xp;
  await supabaseAdmin
    .from("identidades")
    .update({ xp: novoXp, nivel: Math.floor(Math.sqrt(novoXp / 50)) + 1 })
    .eq("id", identidadeId);

  if (conquistas.length === 0) return;
  await supabaseAdmin
    .from("conquistas_usuario")
    .upsert(
      conquistas.map((slug) => ({ identidade_id: identidadeId, conquista_slug: slug })),
      { onConflict: "identidade_id,conquista_slug", ignoreDuplicates: true },
    );
}
