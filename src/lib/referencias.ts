/**
 * Referências clicáveis.
 *
 * Converte citações escritas em texto ("Jo 6, 51-58", "CIC §1324") em links
 * internos do portal, para que o leitor possa conferir a fonte sem sair do site.
 */
import { LIVROS } from "./data/biblia/index";
import { PARTES } from "./data/catecismo/index";

/** Mantém acentos: em português "Jo" é João e "Jó" é o livro de Jó. */
function chaveAcentuada(s: string): string {
  return s.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
}

function normalizar(s: string): string {
  return chaveAcentuada(s.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
}

type AlvoLivro = { slug: string; nome: string; capitulos: number };

/** Abreviaturas cujo sentido depende do acento — resolvidas antes de tudo. */
const ALIASES: Record<string, string> = {
  jo: "joao",
  jó: "jo",
  joao: "joao",
  joão: "joao",
};

const INDICE_ACENTUADO = new Map<string, AlvoLivro>();
const INDICE_LIVROS = new Map<string, AlvoLivro>();

for (const l of LIVROS) {
  const alvo: AlvoLivro = { slug: l.slug, nome: l.nome, capitulos: l.capitulos };
  for (const chave of [l.abrev, l.nome, l.slug]) {
    const ka = chaveAcentuada(chave);
    if (ka && !INDICE_ACENTUADO.has(ka)) INDICE_ACENTUADO.set(ka, alvo);
    const k = normalizar(chave);
    if (k && !INDICE_LIVROS.has(k)) INDICE_LIVROS.set(k, alvo);
  }
}

function acharLivro(entrada: string): AlvoLivro | undefined {
  const ka = chaveAcentuada(entrada);
  const alias = ALIASES[ka];
  if (alias) {
    const porSlug = LIVROS.find((l) => l.slug === alias);
    if (porSlug)
      return { slug: porSlug.slug, nome: porSlug.nome, capitulos: porSlug.capitulos };
  }
  return INDICE_ACENTUADO.get(ka) ?? INDICE_LIVROS.get(normalizar(entrada));
}

export type ReferenciaEscritura = {
  tipo: "escritura";
  /** Como aparece no texto original. */
  texto: string;
  nomeLivro: string;
  capitulo: number;
  versiculo?: number;
  /** Caminho interno, ex.: "/biblia/joao/6#v51" */
  caminho: string;
};

export type ReferenciaCatecismo = {
  tipo: "catecismo";
  texto: string;
  paragrafo: number;
  /** Caminho interno da parte correspondente do Catecismo. */
  caminho: string;
};

export type Referencia = ReferenciaEscritura | ReferenciaCatecismo;

/** Faixas de parágrafos de cada parte do Catecismo, extraídas dos rótulos "§§ a–b". */
const FAIXAS_CIC: { slug: string; de: number; ate: number }[] = PARTES.map((p: { slug: string; paragrafos: string }) => {
  const nums = (p.paragrafos.match(/\d+/g) ?? []).map(Number);
  return { slug: p.slug, de: nums[0] ?? 0, ate: nums[1] ?? Number.MAX_SAFE_INTEGER };
});

export function caminhoCatecismo(paragrafo: number): string {
  const faixa = FAIXAS_CIC.find((f) => paragrafo >= f.de && paragrafo <= f.ate);
  return faixa ? `/catecismo/${faixa.slug}` : "/catecismo";
}

export function caminhoEscritura(livro: string, capitulo: number, versiculo?: number): string | null {
  const alvo = acharLivro(livro);
  if (!alvo) return null;
  if (capitulo < 1 || capitulo > alvo.capitulos) return null;
  return `/biblia/${alvo.slug}/${capitulo}${versiculo ? `#v${versiculo}` : ""}`;
}

// "Jo 6, 51-58" · "1Cor 11,23" · "Mt 28, 19" · "Gn 1, 1"
const RE_ESCRITURA =
  /\b((?:[1-3]\s?)?[A-ZÁÂÃÉÊÍÓÔÕÚÇ][a-záâãéêíóôõúç]{1,14}\.?)\s(\d{1,3})\s?[,:]\s?(\d{1,3})(?:\s?[-–]\s?\d{1,3})?/g;

const RE_CATECISMO = /(?:CIC|Catecismo(?:\s+da\s+Igreja\s+Cat[óo]lica)?)[^\d§]{0,24}§{1,2}?\s?(\d{1,4})/gi;

/**
 * Encontra referências internas em um texto livre (Markdown inclusive).
 * Devolve no máximo `limite` itens, sem repetições.
 */
export function encontrarReferencias(texto: string, limite = 12): Referencia[] {
  const vistas = new Set<string>();
  const saida: Referencia[] = [];

  for (const m of texto.matchAll(RE_ESCRITURA)) {
    const livro = m[1]!.replace(/\./g, "").replace(/\s+/g, " ").trim();
    const capitulo = Number(m[2]);
    const versiculo = Number(m[3]);
    const caminho = caminhoEscritura(livro, capitulo, versiculo);
    if (!caminho) continue;
    const alvo = acharLivro(livro)!;
    if (vistas.has(caminho)) continue;
    vistas.add(caminho);
    saida.push({
      tipo: "escritura",
      texto: m[0]!.trim(),
      nomeLivro: alvo.nome,
      capitulo,
      versiculo,
      caminho,
    });
  }

  for (const m of texto.matchAll(RE_CATECISMO)) {
    const paragrafo = Number(m[1]);
    if (!paragrafo) continue;
    const chave = `cic-${paragrafo}`;
    if (vistas.has(chave)) continue;
    vistas.add(chave);
    saida.push({
      tipo: "catecismo",
      texto: `CIC §${paragrafo}`,
      paragrafo,
      caminho: caminhoCatecismo(paragrafo),
    });
  }

  return saida.slice(0, limite);
}
