// Server-only. Camada de acesso ao banco do portal.
// Nenhuma tabela é exposta ao navegador: todo acesso passa por aqui.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SANTOS_LISTA } from "../santos-lista";
import { SANTOS } from "../data/santos";

export type IdentidadePublica = {
  id: string;
  santoSlug: string;
  santoNome: string;
  santoImagem: string | null;
  apelido: string | null;
  xp: number;
  nivel: number;
  streak: number;
  melhorStreak: number;
  ultimaOracao: string | null;
};

export function nivelDoXp(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(xp, 0) / 50)) + 1;
}

function sortearSanto() {
  const santo = SANTOS_LISTA[Math.floor(Math.random() * SANTOS_LISTA.length)]!;
  const rico = SANTOS.find((s) => s.slug === santo.slug);
  return {
    slug: santo.slug,
    nome: santo.nome,
    imagem: rico?.imagem ?? null,
  };
}

function toPublica(row: {
  id: string;
  santo_slug: string;
  santo_nome: string;
  santo_imagem: string | null;
  apelido: string | null;
  xp: number;
  nivel: number;
  streak: number;
  melhor_streak: number;
  ultima_oracao: string | null;
}): IdentidadePublica {
  return {
    id: row.id,
    santoSlug: row.santo_slug,
    santoNome: row.santo_nome,
    santoImagem: row.santo_imagem,
    apelido: row.apelido,
    xp: row.xp,
    nivel: row.nivel,
    streak: row.streak,
    melhorStreak: row.melhor_streak,
    ultimaOracao: row.ultima_oracao,
  };
}

const COLUNAS =
  "id, santo_slug, santo_nome, santo_imagem, apelido, xp, nivel, streak, melhor_streak, ultima_oracao";

/** Devolve a identidade do token; cria uma nova (com santo sorteado) se não existir. */
export async function garantirIdentidade(
  token: string | null,
): Promise<{ token: string; identidade: IdentidadePublica }> {
  if (token) {
    const { data } = await supabaseAdmin
      .from("identidades")
      .select(COLUNAS)
      .eq("token", token)
      .maybeSingle();
    if (data) return { token, identidade: toPublica(data) };
  }

  const santo = sortearSanto();
  const { data, error } = await supabaseAdmin
    .from("identidades")
    .insert({
      santo_slug: santo.slug,
      santo_nome: santo.nome,
      santo_imagem: santo.imagem,
    })
    .select(`token, ${COLUNAS}`)
    .single();

  if (error || !data) throw new Error("Não foi possível criar a identidade.");
  return { token: data.token as string, identidade: toPublica(data) };
}

async function identidadePorToken(token: string) {
  const { data } = await supabaseAdmin
    .from("identidades")
    .select(COLUNAS)
    .eq("token", token)
    .maybeSingle();
  if (!data) throw new Error("Identidade não encontrada.");
  return data;
}

async function desbloquear(identidadeId: string, slugs: string[]): Promise<string[]> {
  if (slugs.length === 0) return [];
  const { data: jaTem } = await supabaseAdmin
    .from("conquistas_usuario")
    .select("conquista_slug")
    .eq("identidade_id", identidadeId)
    .in("conquista_slug", slugs);
  const existentes = new Set((jaTem ?? []).map((c) => c.conquista_slug));
  const novos = slugs.filter((s) => !existentes.has(s));
  if (novos.length === 0) return [];

  await supabaseAdmin
    .from("conquistas_usuario")
    .insert(novos.map((slug) => ({ identidade_id: identidadeId, conquista_slug: slug })));

  const { data: cat } = await supabaseAdmin
    .from("conquistas_catalogo")
    .select("slug, xp")
    .in("slug", novos);
  const bonus = (cat ?? []).reduce((acc, c) => acc + (c.xp ?? 0), 0);
  if (bonus > 0) await somarXp(identidadeId, bonus);
  return novos;
}

async function somarXp(identidadeId: string, xp: number) {
  const { data } = await supabaseAdmin
    .from("identidades")
    .select("xp")
    .eq("id", identidadeId)
    .single();
  const novoXp = (data?.xp ?? 0) + xp;
  await supabaseAdmin
    .from("identidades")
    .update({ xp: novoXp, nivel: nivelDoXp(novoXp) })
    .eq("id", identidadeId);
  return novoXp;
}

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

/** Registra a oração do dia (diário espiritual), atualiza streak, XP e conquistas. */
export async function registrarOracao(
  token: string,
  entrada: { intencao?: string; reflexao?: string; minutos?: number },
) {
  const id = await identidadePorToken(token);
  const hoje = hojeISO();
  const ontem = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  await supabaseAdmin.from("diario_espiritual").upsert(
    {
      identidade_id: id.id,
      data: hoje,
      intencao: entrada.intencao ?? null,
      reflexao: entrada.reflexao ?? null,
      minutos: entrada.minutos ?? 0,
    },
    { onConflict: "identidade_id,data" },
  );

  const jaRezouHoje = id.ultima_oracao === hoje;
  let streak = id.streak;
  if (!jaRezouHoje) {
    streak = id.ultima_oracao === ontem ? id.streak + 1 : 1;
    await supabaseAdmin
      .from("identidades")
      .update({
        streak,
        melhor_streak: Math.max(streak, id.melhor_streak),
        ultima_oracao: hoje,
      })
      .eq("id", id.id);
    await somarXp(id.id, 25 + Math.min(entrada.minutos ?? 0, 60));
  }

  const alvos = ["primeira-oracao"];
  if (streak >= 3) alvos.push("streak-3");
  if (streak >= 7) alvos.push("streak-7");
  if (streak >= 30) alvos.push("streak-30");
  if (streak >= 100) alvos.push("streak-100");
  const novasConquistas = await desbloquear(id.id, alvos);

  return { streak, novasConquistas, jaRezouHoje };
}

/** Marca ou desmarca um capítulo da Bíblia como lido. */
export async function marcarCapitulo(
  token: string,
  livro: string,
  capitulo: number,
  lido: boolean,
) {
  const id = await identidadePorToken(token);

  if (!lido) {
    await supabaseAdmin
      .from("leituras_biblia")
      .delete()
      .eq("identidade_id", id.id)
      .eq("livro", livro)
      .eq("capitulo", capitulo);
    return { lido: false, novasConquistas: [] as string[] };
  }

  await supabaseAdmin
    .from("leituras_biblia")
    .upsert(
      { identidade_id: id.id, livro, capitulo },
      { onConflict: "identidade_id,livro,capitulo" },
    );
  await somarXp(id.id, 10);

  const { count } = await supabaseAdmin
    .from("leituras_biblia")
    .select("id", { count: "exact", head: true })
    .eq("identidade_id", id.id);

  const alvos = ["primeiro-capitulo"];
  if ((count ?? 0) >= 10) alvos.push("dez-capitulos");
  const novasConquistas = await desbloquear(id.id, alvos);

  return { lido: true, novasConquistas };
}

/** Alterna um versículo favorito. */
export async function alternarFavorito(
  token: string,
  livro: string,
  capitulo: number,
  versiculo: number,
  texto?: string,
) {
  const id = await identidadePorToken(token);
  const { data: existente } = await supabaseAdmin
    .from("favoritos")
    .select("id")
    .eq("identidade_id", id.id)
    .eq("livro", livro)
    .eq("capitulo", capitulo)
    .eq("versiculo", versiculo)
    .maybeSingle();

  if (existente) {
    await supabaseAdmin.from("favoritos").delete().eq("id", existente.id);
    return { favorito: false, novasConquistas: [] as string[] };
  }

  await supabaseAdmin
    .from("favoritos")
    .insert({ identidade_id: id.id, livro, capitulo, versiculo, texto: texto ?? null });
  await somarXp(id.id, 5);
  return { favorito: true, novasConquistas: await desbloquear(id.id, ["primeiro-favorito"]) };
}

/** Cria ou atualiza uma anotação pessoal. */
export async function salvarNota(
  token: string,
  nota: { id?: string; livro: string; capitulo: number; versiculo?: number; conteudo: string },
) {
  const id = await identidadePorToken(token);

  if (nota.id) {
    await supabaseAdmin
      .from("notas")
      .update({ conteudo: nota.conteudo })
      .eq("id", nota.id)
      .eq("identidade_id", id.id);
    return { novasConquistas: [] as string[] };
  }

  await supabaseAdmin.from("notas").insert({
    identidade_id: id.id,
    livro: nota.livro,
    capitulo: nota.capitulo,
    versiculo: nota.versiculo ?? null,
    conteudo: nota.conteudo,
  });
  await somarXp(id.id, 10);
  return { novasConquistas: await desbloquear(id.id, ["primeira-nota"]) };
}

export async function apagarNota(token: string, notaId: string) {
  const id = await identidadePorToken(token);
  await supabaseAdmin.from("notas").delete().eq("id", notaId).eq("identidade_id", id.id);
}

/** Painel: progresso completo da identidade. */
export async function obterPainel(token: string) {
  const id = await identidadePorToken(token);
  const hoje = hojeISO();

  const [leituras, favoritos, notas, conquistas, catalogo, diarioHoje, ultima] = await Promise.all([
    supabaseAdmin
      .from("leituras_biblia")
      .select("livro, capitulo")
      .eq("identidade_id", id.id),
    supabaseAdmin
      .from("favoritos")
      .select("livro, capitulo, versiculo, texto")
      .eq("identidade_id", id.id)
      .order("created_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("notas")
      .select("id, livro, capitulo, versiculo, conteudo, updated_at")
      .eq("identidade_id", id.id)
      .order("updated_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("conquistas_usuario")
      .select("conquista_slug, created_at")
      .eq("identidade_id", id.id),
    supabaseAdmin.from("conquistas_catalogo").select("slug, titulo, descricao, icone, xp"),
    supabaseAdmin
      .from("diario_espiritual")
      .select("intencao, reflexao, minutos")
      .eq("identidade_id", id.id)
      .eq("data", hoje)
      .maybeSingle(),
    supabaseAdmin
      .from("leituras_biblia")
      .select("livro, capitulo, created_at")
      .eq("identidade_id", id.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const desbloqueadas = new Set((conquistas.data ?? []).map((c) => c.conquista_slug));

  return {
    identidade: toPublica(id),
    rezouHoje: id.ultima_oracao === hoje,
    diarioHoje: diarioHoje.data ?? null,
    leituras: leituras.data ?? [],
    ultimaLeitura: ultima.data ?? null,
    favoritos: favoritos.data ?? [],
    notas: notas.data ?? [],
    conquistas: (catalogo.data ?? []).map((c) => ({
      ...c,
      desbloqueada: desbloqueadas.has(c.slug),
    })),
  };
}

/** Estado de leitura/favoritos/notas de um capítulo específico. */
export async function obterCapitulo(token: string, livro: string, capitulo: number) {
  const id = await identidadePorToken(token);
  const [lido, favoritos, notas] = await Promise.all([
    supabaseAdmin
      .from("leituras_biblia")
      .select("id")
      .eq("identidade_id", id.id)
      .eq("livro", livro)
      .eq("capitulo", capitulo)
      .maybeSingle(),
    supabaseAdmin
      .from("favoritos")
      .select("versiculo")
      .eq("identidade_id", id.id)
      .eq("livro", livro)
      .eq("capitulo", capitulo),
    supabaseAdmin
      .from("notas")
      .select("id, versiculo, conteudo, updated_at")
      .eq("identidade_id", id.id)
      .eq("livro", livro)
      .eq("capitulo", capitulo)
      .order("updated_at", { ascending: false }),
  ]);

  return {
    lido: Boolean(lido.data),
    favoritos: (favoritos.data ?? []).map((f) => f.versiculo),
    notas: notas.data ?? [],
  };
}
