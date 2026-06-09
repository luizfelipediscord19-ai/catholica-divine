// Estrutura factual do Catecismo da Igreja Católica (CIC, 1992/1997).
// Cada parte / seção / capítulo é um fato (não copyrightável).
// O texto integral fica em vatican.va — linkado em cada nó.

export type SecaoCIC = {
  slug: string;
  parte: 1 | 2 | 3 | 4;
  titulo: string;
  paragrafos: string; // ex: "§§ 27–49"
  resumo: string;
};

export const PARTES = [
  {
    num: 1,
    slug: "credo",
    titulo: "A Profissão da Fé",
    paragrafos: "§§ 26–1065",
    resumo: "‘Creio’ — ‘Cremos’. O homem é capaz de Deus, e Deus vem ao seu encontro pela Revelação. Comentário do Símbolo dos Apóstolos.",
  },
  {
    num: 2,
    slug: "liturgia",
    titulo: "A Celebração do Mistério Cristão",
    paragrafos: "§§ 1066–1690",
    resumo: "A economia sacramental: a liturgia como obra da Santíssima Trindade e ação do Cristo total. Os sete sacramentos.",
  },
  {
    num: 3,
    slug: "vida-em-cristo",
    titulo: "A Vida em Cristo",
    paragrafos: "§§ 1691–2557",
    resumo: "A vocação à bem-aventurança, a liberdade, a moralidade dos atos humanos, a graça, os Dez Mandamentos.",
  },
  {
    num: 4,
    slug: "oracao",
    titulo: "A Oração Cristã",
    paragrafos: "§§ 2558–2865",
    resumo: "A oração na vida cristã, a tradição orante da Igreja, e o Pai-Nosso comentado petição por petição.",
  },
] as const;

export const SECOES: SecaoCIC[] = [
  // Parte I
  { slug: "credo-1", parte: 1, titulo: "Eu creio em Deus Pai", paragrafos: "§§ 198–421", resumo: "Deus único; o Pai todo-poderoso; criador do céu e da terra; o homem; a queda." },
  { slug: "credo-2", parte: 1, titulo: "Eu creio em Jesus Cristo", paragrafos: "§§ 422–682", resumo: "O Filho único de Deus, concebido pelo Espírito Santo, nasceu de Maria Virgem; padeceu, morreu, ressuscitou, subiu aos céus." },
  { slug: "credo-3", parte: 1, titulo: "Eu creio no Espírito Santo", paragrafos: "§§ 683–1065", resumo: "O Espírito Santo, a Igreja, a comunhão dos santos, a remissão dos pecados, a ressurreição da carne e a vida eterna." },
  // Parte II
  { slug: "liturgia-1", parte: 2, titulo: "A Economia Sacramental", paragrafos: "§§ 1076–1209", resumo: "A liturgia, obra da Trindade. Mistério pascal celebrado na liturgia da Igreja." },
  { slug: "liturgia-2", parte: 2, titulo: "Os Sete Sacramentos", paragrafos: "§§ 1210–1690", resumo: "Iniciação cristã (Batismo, Confirmação, Eucaristia); Cura (Penitência, Unção); Serviço (Ordem, Matrimônio)." },
  // Parte III
  { slug: "vida-1", parte: 3, titulo: "A Vocação do Homem", paragrafos: "§§ 1699–2051", resumo: "Dignidade da pessoa humana; comunidade humana; salvação de Deus: a Lei e a Graça." },
  { slug: "vida-2", parte: 3, titulo: "Os Dez Mandamentos", paragrafos: "§§ 2052–2557", resumo: "Comentário ao Decálogo: Amarás a Deus sobre todas as coisas; Amarás o próximo como a ti mesmo." },
  // Parte IV
  { slug: "oracao-1", parte: 4, titulo: "A Oração na Vida Cristã", paragrafos: "§§ 2566–2758", resumo: "A revelação da oração; a tradição da oração; a vida de oração." },
  { slug: "oracao-2", parte: 4, titulo: "A Oração do Senhor: Pai-Nosso", paragrafos: "§§ 2759–2865", resumo: "Comentário ao Pai-Nosso, ‘resumo de todo o Evangelho’ (Tertuliano)." },
];

export const VATICAN_URL = "https://www.vatican.va/archive/cathechism_po/index_new/prefacio.html";

export function urlVatican(): string {
  return VATICAN_URL;
}
