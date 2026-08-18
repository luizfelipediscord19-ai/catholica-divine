/**
 * Planos de leitura bíblica guiada.
 *
 * Os planos são gerados a partir da estrutura factual dos 73 livros
 * (`LIVROS`), distribuindo os capítulos de forma equilibrada pelos dias.
 * Nenhum texto protegido é reproduzido aqui: cada dia aponta para os
 * capítulos já disponíveis no leitor do portal.
 */
import { LIVROS, type Livro } from "./index";

export interface TrechoDia {
  livro: string;
  nome: string;
  abrev: string;
  de: number;
  ate: number;
}

export interface DiaPlano {
  dia: number;
  trechos: TrechoDia[];
}

export interface PlanoLeitura {
  slug: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  paraQuem: string;
  dias: DiaPlano[];
  /** Total de capítulos do plano. */
  capitulos: number;
}

function livrosPorSlug(slugs: string[]): Livro[] {
  return slugs
    .map((s) => LIVROS.find((l) => l.slug === s))
    .filter((l): l is Livro => Boolean(l));
}

/** Distribui os capítulos dos livros informados ao longo de `dias` dias. */
function montar(livros: Livro[], dias: number): { dias: DiaPlano[]; capitulos: number } {
  const fila: { livro: Livro; cap: number }[] = [];
  for (const livro of livros) {
    for (let c = 1; c <= livro.capitulos; c++) fila.push({ livro, cap: c });
  }

  const total = fila.length;
  const plano: DiaPlano[] = [];
  let indice = 0;

  for (let d = 0; d < dias; d++) {
    const restamDias = dias - d;
    const quantidade = Math.ceil((total - indice) / restamDias);
    const fatia = fila.slice(indice, indice + quantidade);
    indice += fatia.length;

    const trechos: TrechoDia[] = [];
    for (const item of fatia) {
      const ultimo = trechos[trechos.length - 1];
      if (ultimo && ultimo.livro === item.livro.slug && ultimo.ate === item.cap - 1) {
        ultimo.ate = item.cap;
        continue;
      }
      trechos.push({
        livro: item.livro.slug,
        nome: item.livro.nome,
        abrev: item.livro.abrev,
        de: item.cap,
        ate: item.cap,
      });
    }

    if (trechos.length > 0) plano.push({ dia: d + 1, trechos });
  }

  return { dias: plano, capitulos: total };
}

function plano(
  base: Omit<PlanoLeitura, "dias" | "capitulos">,
  slugs: string[],
  dias: number,
): PlanoLeitura {
  const { dias: lista, capitulos } = montar(livrosPorSlug(slugs), dias);
  return { ...base, dias: lista, capitulos };
}

const NOVO_TESTAMENTO = LIVROS.filter((l) => l.testamento === "NT").map((l) => l.slug);
const TODOS = LIVROS.map((l) => l.slug);

export const PLANOS: PlanoLeitura[] = [
  plano(
    {
      slug: "evangelhos-30-dias",
      titulo: "Os Evangelhos em 30 dias",
      subtitulo: "Mateus, Marcos, Lucas e João",
      descricao:
        "Um mês percorrendo os quatro Evangelhos, do começo ao fim, cerca de três capítulos por dia. É o melhor ponto de partida para quem nunca leu a Bíblia inteira: a Igreja ensina que os Evangelhos são o coração de todas as Escrituras, porque são o principal testemunho da vida e da doutrina do Verbo encarnado (CIC §125).",
      paraQuem: "Quem está começando e quer conhecer Jesus Cristo pelas próprias fontes.",
    },
    ["mateus", "marcos", "lucas", "joao"],
    30,
  ),
  plano(
    {
      slug: "salmos-30-dias",
      titulo: "Os Salmos em 30 dias",
      subtitulo: "150 salmos, cinco por dia",
      descricao:
        "O Saltério é o livro de orações da Igreja e a oração que Cristo mesmo rezou. Cinco salmos por dia formam o coração para a oração litúrgica e para a Liturgia das Horas (CIC §§2585–2589).",
      paraQuem: "Quem quer aprender a rezar com as palavras que Deus mesmo inspirou.",
    },
    ["salmos"],
    30,
  ),
  plano(
    {
      slug: "novo-testamento-90-dias",
      titulo: "Novo Testamento em 90 dias",
      subtitulo: "De Mateus ao Apocalipse",
      descricao:
        "Três meses cobrindo os 27 livros do Novo Testamento na ordem canônica: Evangelhos, Atos, as cartas de São Paulo, as cartas católicas e o Apocalipse.",
      paraQuem: "Quem já leu os Evangelhos e quer entender a vida da Igreja apostólica.",
    },
    NOVO_TESTAMENTO,
    90,
  ),
  plano(
    {
      slug: "biblia-em-um-ano",
      titulo: "A Bíblia inteira em um ano",
      subtitulo: "Os 73 livros do cânon católico",
      descricao:
        "O plano completo: do Gênesis ao Apocalipse, incluindo os sete livros deuterocanônicos que a Igreja recebeu como inspirados. São três a quatro capítulos por dia, na ordem canônica.",
      paraQuem: "Quem quer conhecer toda a história da salvação, sem atalhos.",
    },
    TODOS,
    365,
  ),
];

export function acharPlano(slug: string): PlanoLeitura | undefined {
  return PLANOS.find((p) => p.slug === slug);
}

/** Rótulo curto de um dia, ex.: "Mt 1–3 · Mc 1". */
export function rotuloDia(dia: DiaPlano): string {
  return dia.trechos
    .map((t) => (t.de === t.ate ? `${t.abrev} ${t.de}` : `${t.abrev} ${t.de}–${t.ate}`))
    .join(" · ");
}

/** Capítulos individuais de um dia, para gerar links de leitura. */
export function capitulosDoDia(dia: DiaPlano): { livro: string; nome: string; cap: number }[] {
  const lista: { livro: string; nome: string; cap: number }[] = [];
  for (const t of dia.trechos) {
    for (let c = t.de; c <= t.ate; c++) lista.push({ livro: t.livro, nome: t.nome, cap: c });
  }
  return lista;
}
