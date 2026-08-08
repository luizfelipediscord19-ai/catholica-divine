// Server-only. Camada de acesso ao banco do portal.
// Nenhuma tabela é exposta ao navegador: todo acesso passa por aqui.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SANTOS_LISTA } from "../santos-lista";
import { SANTOS } from "../data/santos";
import { LIVROS } from "../data/biblia";


export type IdentidadePublica = {
  id: string;
  santoSlug: string;
  santoNome: string;
  santoImagem: string | null;
  santoEscolhido: boolean;
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

export function toPublica(row: {
  id: string;
  santo_slug: string;
  santo_nome: string;
  santo_imagem: string | null;
  santo_escolhido?: boolean | null;
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
    santoEscolhido: Boolean(row.santo_escolhido),
    apelido: row.apelido,
    xp: row.xp,
    nivel: row.nivel,
    streak: row.streak,
    melhorStreak: row.melhor_streak,
    ultimaOracao: row.ultima_oracao,
  };
}

/** Define (ou troca) o santo padroeiro escolhido pelo próprio membro. */
export async function escolherSanto(token: string, slug: string) {
  const item = SANTOS_LISTA.find((s) => s.slug === slug);
  if (!item) throw new Error("Santo não encontrado.");
  const rico = SANTOS.find((s) => s.slug === slug);
  const { data, error } = await supabaseAdmin
    .from("identidades")
    .update({
      santo_slug: item.slug,
      santo_nome: item.nome,
      santo_imagem: rico?.imagem ?? null,
      santo_escolhido: true,
    })
    .eq("token", token)
    .select(COLUNAS)
    .maybeSingle();
  if (error || !data) throw new Error("Não foi possível salvar seu padroeiro.");
  return toPublica(data);
}

export const COLUNAS =
  "id, santo_slug, santo_nome, santo_imagem, santo_escolhido, apelido, xp, nivel, streak, melhor_streak, ultima_oracao";

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

async function contar(tabela: "diario_espiritual" | "favoritos" | "notas" | "leituras_biblia", identidadeId: string) {
  const { count } = await supabaseAdmin
    .from(tabela)
    .select("id", { count: "exact", head: true })
    .eq("identidade_id", identidadeId);
  return count ?? 0;
}

/** Slugs dos livros da Bíblia já lidos por inteiro pela identidade. */
async function livrosConcluidos(identidadeId: string): Promise<Set<string>> {
  const { data } = await supabaseAdmin
    .from("leituras_biblia")
    .select("livro, capitulo")
    .eq("identidade_id", identidadeId);

  const porLivro = new Map<string, Set<number>>();
  for (const linha of data ?? []) {
    const atual = porLivro.get(linha.livro) ?? new Set<number>();
    atual.add(linha.capitulo);
    porLivro.set(linha.livro, atual);
  }

  const completos = new Set<string>();
  for (const livro of LIVROS) {
    if ((porLivro.get(livro.slug)?.size ?? 0) >= livro.capitulos) completos.add(livro.slug);
  }
  return completos;
}

const EVANGELHOS = ["mateus", "marcos", "lucas", "joao"];
const PENTATEUCO = LIVROS.filter((l) => l.grupo === "Pentateuco").map((l) => l.slug);
const NOVO_TESTAMENTO = LIVROS.filter((l) => l.testamento === "NT").map((l) => l.slug);

/** Conquistas transversais: quem já orou, leu, favoritou e anotou. */
async function conquistasDeAcervo(identidadeId: string) {
  const [oracoes, leituras, favoritos, notas] = await Promise.all([
    contar("diario_espiritual", identidadeId),
    contar("leituras_biblia", identidadeId),
    contar("favoritos", identidadeId),
    contar("notas", identidadeId),
  ]);
  return oracoes > 0 && leituras > 0 && favoritos > 0 && notas > 0
    ? ["caminho-completo"]
    : [];
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

  const minutos = entrada.minutos ?? 0;
  const diasRezados = await contar("diario_espiritual", id.id);

  const alvos = ["primeira-oracao"];
  if (streak >= 3) alvos.push("streak-3");
  if (streak >= 7) alvos.push("streak-7");
  if (streak >= 14) alvos.push("streak-14");
  if (streak >= 30) alvos.push("streak-30");
  if (streak >= 60) alvos.push("streak-60");
  if (streak >= 100) alvos.push("streak-100");
  if (streak >= 365) alvos.push("streak-365");
  if (diasRezados >= 10) alvos.push("oracoes-10");
  if (diasRezados >= 50) alvos.push("oracoes-50");
  if (diasRezados >= 100) alvos.push("oracoes-100");
  if (minutos >= 30) alvos.push("oracao-30min");
  if (minutos >= 60) alvos.push("vigilia");
  if ((entrada.reflexao ?? "").trim().length >= 280) alvos.push("reflexao-profunda");
  alvos.push(...(await conquistasDeAcervo(id.id)));
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
  const total = count ?? 0;
  if (total >= 10) alvos.push("dez-capitulos");
  if (total >= 25) alvos.push("capitulos-25");
  if (total >= 50) alvos.push("capitulos-50");
  if (total >= 100) alvos.push("capitulos-100");
  if (total >= 250) alvos.push("capitulos-250");

  const completos = await livrosConcluidos(id.id);
  if (completos.size >= 1) alvos.push("livro-completo");
  if (completos.size >= 5) alvos.push("cinco-livros");
  if (EVANGELHOS.some((s) => completos.has(s))) alvos.push("evangelho-completo");
  if (EVANGELHOS.every((s) => completos.has(s))) alvos.push("quatro-evangelhos");
  if (PENTATEUCO.every((s) => completos.has(s))) alvos.push("pentateuco");
  if (completos.has("salmos")) alvos.push("salterio");
  if (NOVO_TESTAMENTO.every((s) => completos.has(s))) alvos.push("novo-testamento");
  alvos.push(...(await conquistasDeAcervo(id.id)));
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

/** Painel: progresso completo da identidade. Auto-recupera tokens órfãos. */
export async function obterPainel(token: string) {
  // Se o token guardado no navegador não existir mais no banco, criamos uma
  // identidade nova em vez de falhar — o painel nunca fica em branco.
  const { token: tokenAtual, identidade } = await garantirIdentidade(token);
  const id = await identidadePorToken(tokenAtual);
  const hoje = hojeISO();
  void identidade;


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
    tokenAtual,
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
