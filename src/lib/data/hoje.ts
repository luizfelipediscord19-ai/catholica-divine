// Conteúdo diário: versículo, santo e evangelho do dia.
// Cicla automaticamente por dia do ano — sempre o mesmo conteúdo em uma data,
// muda à meia-noite local.

import { PLANO, dayOfYear, type Leitura } from "./biblia/leituras";
import { SANTOS } from "./santos";
import { celebracoesFixas, GRAU_NOME, type GrauCelebracao } from "../liturgia/santoral";

export type ItemRef = {
  livro: string;
  nome: string;
  capitulo: number;
  vi?: number;
  vf?: number;
};

export type VersiculoDia = ItemRef & { texto: string };
export type EvangelhoDia = ItemRef & { texto: string; titulo: string };
export type SantoDia = {
  nome: string;
  data: string;
  resumo: string;
  celebradoHoje?: boolean;
  grau?: GrauCelebracao | "feria";
  grauNome?: string;
  slug?: string;
  brasil?: boolean;
  outras?: string[];
};

const VERSICULOS: VersiculoDia[] = [
  { livro: "joao", nome: "João", capitulo: 14, vi: 6, vf: 6, texto: "Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por mim." },
  { livro: "mateus", nome: "Mateus", capitulo: 11, vi: 28, vf: 28, texto: "Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei." },
  { livro: "joao", nome: "João", capitulo: 3, vi: 16, vf: 16, texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito." },
  { livro: "salmos", nome: "Salmos", capitulo: 23, vi: 1, vf: 1, texto: "O Senhor é o meu pastor; nada me faltará." },
  { livro: "filipenses", nome: "Filipenses", capitulo: 4, vi: 13, vf: 13, texto: "Posso todas as coisas naquele que me fortalece." },
  { livro: "isaias", nome: "Isaías", capitulo: 41, vi: 10, vf: 10, texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus." },
  { livro: "mateus", nome: "Mateus", capitulo: 6, vi: 33, vf: 33, texto: "Buscai primeiro o Reino de Deus e a sua justiça, e tudo o mais vos será acrescentado." },
  { livro: "salmos", nome: "Salmos", capitulo: 27, vi: 1, vf: 1, texto: "O Senhor é a minha luz e a minha salvação; a quem temerei?" },
  { livro: "romanos", nome: "Romanos", capitulo: 8, vi: 28, vf: 28, texto: "Tudo coopera para o bem daqueles que amam a Deus." },
  { livro: "1joao", nome: "1 João", capitulo: 4, vi: 8, vf: 8, texto: "Aquele que não ama não conhece a Deus, porque Deus é amor." },
  { livro: "proverbios", nome: "Provérbios", capitulo: 3, vi: 5, vf: 6, texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento." },
  { livro: "salmos", nome: "Salmos", capitulo: 91, vi: 1, vf: 2, texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará." },
  { livro: "joao", nome: "João", capitulo: 8, vi: 12, vf: 12, texto: "Eu sou a luz do mundo; quem me segue não andará em trevas." },
  { livro: "mateus", nome: "Mateus", capitulo: 5, vi: 8, vf: 8, texto: "Bem-aventurados os puros de coração, porque eles verão a Deus." },
  { livro: "1corintios", nome: "1 Coríntios", capitulo: 13, vi: 13, vf: 13, texto: "Agora, pois, permanecem a fé, a esperança e o amor — mas o maior destes é o amor." },
];

const EVANGELHOS: EvangelhoDia[] = [
  { livro: "mateus", nome: "Mateus", capitulo: 5, vi: 1, vf: 12, titulo: "As Bem-aventuranças", texto: "Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus..." },
  { livro: "lucas", nome: "Lucas", capitulo: 15, vi: 11, vf: 32, titulo: "O Filho Pródigo", texto: "Um homem tinha dois filhos. O mais novo disse: ‘Pai, dá-me a parte da herança que me toca’..." },
  { livro: "joao", nome: "João", capitulo: 6, vi: 35, vf: 40, titulo: "O Pão da Vida", texto: "Eu sou o pão da vida; aquele que vem a mim jamais terá fome." },
  { livro: "marcos", nome: "Marcos", capitulo: 4, vi: 1, vf: 20, titulo: "O Semeador", texto: "Saiu o semeador a semear. Enquanto semeava, parte da semente caiu à beira do caminho..." },
  { livro: "lucas", nome: "Lucas", capitulo: 10, vi: 25, vf: 37, titulo: "O Bom Samaritano", texto: "Um homem descia de Jerusalém para Jericó e caiu nas mãos de salteadores..." },
  { livro: "joao", nome: "João", capitulo: 15, vi: 1, vf: 17, titulo: "A Videira verdadeira", texto: "Eu sou a videira verdadeira, e meu Pai é o agricultor..." },
  { livro: "mateus", nome: "Mateus", capitulo: 25, vi: 31, vf: 46, titulo: "O Juízo Final", texto: "Quando o Filho do Homem vier em sua glória... separará uns dos outros, como o pastor separa as ovelhas dos cabritos." },
  { livro: "lucas", nome: "Lucas", capitulo: 24, vi: 13, vf: 35, titulo: "Os Discípulos de Emaús", texto: "Naquele mesmo dia, dois discípulos iam para uma aldeia chamada Emaús..." },
  { livro: "joao", nome: "João", capitulo: 14, vi: 1, vf: 14, titulo: "‘Eu sou o Caminho’", texto: "Não se perturbe o vosso coração. Credes em Deus, crede também em mim." },
  { livro: "mateus", nome: "Mateus", capitulo: 6, vi: 5, vf: 15, titulo: "O Pai-Nosso", texto: "Pai nosso, que estais nos céus, santificado seja o vosso nome..." },
  { livro: "joao", nome: "João", capitulo: 20, vi: 19, vf: 31, titulo: "Aparição aos Apóstolos", texto: "Naquele mesmo dia, o primeiro da semana, Jesus apareceu aos discípulos..." },
  { livro: "marcos", nome: "Marcos", capitulo: 10, vi: 17, vf: 31, titulo: "O Jovem Rico", texto: "‘Mestre bom, que farei para herdar a vida eterna?’" },
  { livro: "lucas", nome: "Lucas", capitulo: 1, vi: 26, vf: 38, titulo: "A Anunciação", texto: "‘Eis a serva do Senhor; faça-se em mim segundo a tua palavra.’" },
  { livro: "joao", nome: "João", capitulo: 11, vi: 1, vf: 44, titulo: "A Ressurreição de Lázaro", texto: "‘Eu sou a ressurreição e a vida. Quem crê em mim, ainda que esteja morto, viverá.’" },
];


export function versoDoDia(d: Date = new Date()): VersiculoDia {
  return VERSICULOS[(dayOfYear(d) - 1 + VERSICULOS.length * 1000) % VERSICULOS.length];
}
export function evangelhoDoDia(d: Date = new Date()): EvangelhoDia {
  return EVANGELHOS[(dayOfYear(d) - 1 + EVANGELHOS.length * 1000) % EVANGELHOS.length];
}
const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/**
 * Santo do dia — baseado no santoral litúrgico (Calendário Romano Geral e
 * calendário próprio do Brasil). Nunca inventa uma celebração: quando o dia
 * é féria, devolve `celebradoHoje: false` e a UI deve dizê-lo com clareza.
 */
export function santoDoDia(d: Date = new Date()): SantoDia {
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const porExtenso = `${Number(dd)} de ${MESES[d.getUTCMonth()]}`;

  const fixas = celebracoesFixas(d);
  if (fixas.length > 0) {
    const c = fixas[0];
    const ficha = c.slug ? SANTOS.find((s) => s.slug === c.slug) : undefined;
    return {
      nome: c.nome,
      data: porExtenso,
      resumo: ficha?.resumo ?? c.nota ?? `${GRAU_NOME[c.grau]} de hoje no calendário litúrgico.`,
      celebradoHoje: true,
      grau: c.grau,
      grauNome: GRAU_NOME[c.grau],
      slug: c.slug,
      brasil: c.brasil,
      outras: fixas.slice(1).map((o) => o.nome),
    };
  }

  // Féria: nenhum santo é celebrado hoje. Sugere-se um santo do acervo cuja
  // memória cai nos próximos dias, sempre rotulado como "próxima memória".
  const proximo = proximaMemoria(d);
  return {
    nome: proximo?.nome ?? "Féria",
    data: proximo?.data ?? porExtenso,
    resumo:
      proximo?.resumo ??
      "Hoje não há memória de santo no calendário litúrgico: é dia de féria.",
    celebradoHoje: false,
    grau: "feria",
    grauNome: "Féria",
    slug: proximo?.slug,
    outras: [],
  };
}

/** Próxima celebração fixa a partir de amanhã (até 14 dias à frente). */
function proximaMemoria(
  d: Date,
): { nome: string; data: string; resumo: string; slug?: string } | null {
  for (let i = 1; i <= 14; i++) {
    const alvo = new Date(d.getTime() + i * 86400000);
    const c = celebracoesFixas(alvo)[0];
    if (!c) continue;
    const ficha = c.slug ? SANTOS.find((s) => s.slug === c.slug) : undefined;
    return {
      nome: c.nome,
      data: `${alvo.getUTCDate()} de ${MESES[alvo.getUTCMonth()]}`,
      resumo: ficha?.resumo ?? c.nota ?? GRAU_NOME[c.grau],
      slug: c.slug,
    };
  }
  return null;
}


export function leituraComoRef(l: Leitura): ItemRef {
  return { livro: l.livro, nome: l.nome, capitulo: l.capitulo, vi: l.vi, vf: l.vf };
}

export { PLANO };
