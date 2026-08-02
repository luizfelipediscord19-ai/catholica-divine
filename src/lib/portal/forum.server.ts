// Server-only. Fórum "Agora Ecclesiae" — leitura pública, escrita por identidade anônima.
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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

const AUTOR = "identidades!inner(santo_nome, santo_slug, santo_imagem, nivel, apelido)";

export async function listarSecoes() {
  const { data } = await supabaseAdmin
    .from("forum_secoes")
    .select("id, slug, nome, descricao, ordem")
    .order("ordem");
  return data ?? [];
}

export async function listarTopicos(secaoSlug?: string, limite = 30) {
  let query = supabaseAdmin
    .from("forum_topicos")
    .select(
      `id, slug, titulo, corpo, fixado, trancado, respostas_count, ultima_atividade, created_at,
       forum_secoes!inner(slug, nome), ${AUTOR}`,
    )
    .order("fixado", { ascending: false })
    .order("ultima_atividade", { ascending: false })
    .limit(limite);

  if (secaoSlug) query = query.eq("forum_secoes.slug", secaoSlug);
  const { data } = await query;
  return data ?? [];
}

export async function obterTopico(slug: string) {
  const { data: topico } = await supabaseAdmin
    .from("forum_topicos")
    .select(
      `id, slug, titulo, corpo, fixado, trancado, respostas_count, created_at,
       forum_secoes!inner(slug, nome), ${AUTOR}`,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!topico) return null;

  const { data: respostas } = await supabaseAdmin
    .from("forum_respostas")
    .select(`id, corpo, created_at, ${AUTOR}`)
    .eq("topico_id", topico.id)
    .order("created_at");

  return { topico, respostas: respostas ?? [] };
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

  const { data, error } = await supabaseAdmin
    .from("forum_topicos")
    .insert({
      secao_id: secao.id,
      identidade_id: identidadeId,
      titulo: entrada.titulo,
      slug: slugTopico(entrada.titulo),
      corpo: entrada.corpo,
    })
    .select("slug")
    .single();
  if (error || !data) throw new Error("Não foi possível criar o tópico.");

  await premiar(identidadeId, 30, ["primeiro-topico"]);
  return { slug: data.slug };
}

export async function responderTopico(token: string, topicoSlug: string, corpo: string) {
  const identidadeId = await identidadePorToken(token);
  const { data: topico } = await supabaseAdmin
    .from("forum_topicos")
    .select("id, trancado, respostas_count")
    .eq("slug", topicoSlug)
    .maybeSingle();
  if (!topico) throw new Error("Tópico não encontrado.");
  if (topico.trancado) throw new Error("Este tópico está trancado.");

  const { error } = await supabaseAdmin
    .from("forum_respostas")
    .insert({ topico_id: topico.id, identidade_id: identidadeId, corpo });
  if (error) throw new Error("Não foi possível publicar a resposta.");

  await supabaseAdmin
    .from("forum_topicos")
    .update({
      respostas_count: topico.respostas_count + 1,
      ultima_atividade: new Date().toISOString(),
    })
    .eq("id", topico.id);

  const { count } = await supabaseAdmin
    .from("forum_respostas")
    .select("id", { count: "exact", head: true })
    .eq("identidade_id", identidadeId);

  await premiar(identidadeId, 15, (count ?? 0) >= 10 ? ["dez-respostas"] : []);
  return { ok: true };
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
