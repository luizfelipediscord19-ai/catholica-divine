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

/** Capítulos e artigos de cada seção — estrutura factual do CIC. */
export type CapituloCIC = {
  secao: string; // slug da SecaoCIC
  titulo: string;
  paragrafos: string;
  itens: string[];
};

export const CAPITULOS: CapituloCIC[] = [
  // ---- Parte I ----
  {
    secao: "credo-1",
    titulo: "Creio em Deus Pai todo-poderoso",
    paragrafos: "§§ 198-324",
    itens: [
      "Creio em um só Deus (§§ 199-202)",
      "O Pai revelado pelo Filho (§§ 238-242)",
      "A Santíssima Trindade: um só Deus em três Pessoas (§§ 249-267)",
      "O Todo-Poderoso e o escândalo do mal (§§ 268-314)",
    ],
  },
  {
    secao: "credo-1",
    titulo: "Criador do céu e da terra",
    paragrafos: "§§ 325-421",
    itens: [
      "A criação: obra da Trindade (§§ 290-301)",
      "Os anjos (§§ 328-336)",
      "O homem, imagem de Deus, corpo e alma (§§ 355-384)",
      "A queda e o pecado original (§§ 385-421)",
    ],
  },
  {
    secao: "credo-2",
    titulo: "Jesus Cristo, Filho único de Deus",
    paragrafos: "§§ 422-570",
    itens: [
      "Os nomes: Jesus, Cristo, Filho de Deus, Senhor (§§ 430-455)",
      "Por que o Verbo se fez carne (§§ 456-478)",
      "Concebido pelo Espírito Santo, nascido da Virgem Maria (§§ 484-511)",
      "Os mistérios da vida oculta e pública (§§ 512-570)",
    ],
  },
  {
    secao: "credo-2",
    titulo: "Paixão, morte, ressurreição e glória",
    paragrafos: "§§ 571-682",
    itens: [
      "O processo, a Cruz e a sepultura (§§ 571-630)",
      "Desceu à mansão dos mortos (§§ 631-637)",
      "Ressuscitou no terceiro dia (§§ 638-658)",
      "Subiu aos céus e voltará para julgar (§§ 659-682)",
    ],
  },
  {
    secao: "credo-3",
    titulo: "Creio no Espírito Santo",
    paragrafos: "§§ 683-747",
    itens: [
      "A missão conjunta do Filho e do Espírito (§§ 689-702)",
      "O Espírito e a Igreja nos últimos tempos (§§ 731-741)",
    ],
  },
  {
    secao: "credo-3",
    titulo: "A Igreja, Povo de Deus e Corpo de Cristo",
    paragrafos: "§§ 748-975",
    itens: [
      "Origem, missão e mistério da Igreja (§§ 758-810)",
      "Una, santa, católica e apostólica (§§ 811-870)",
      "Fiéis: hierarquia, leigos e vida consagrada (§§ 871-945)",
      "A comunhão dos santos e Maria, Mãe da Igreja (§§ 946-975)",
    ],
  },
  {
    secao: "credo-3",
    titulo: "Creio na vida eterna",
    paragrafos: "§§ 976-1065",
    itens: [
      "O perdão dos pecados (§§ 976-987)",
      "A ressurreição da carne (§§ 988-1019)",
      "Morte, juízo particular, céu, purgatório, inferno (§§ 1020-1050)",
      "Juízo final e a esperança dos novos céus (§§ 1038-1060)",
    ],
  },
  // ---- Parte II ----
  {
    secao: "liturgia-1",
    titulo: "A liturgia, obra da Santíssima Trindade",
    paragrafos: "§§ 1077-1134",
    itens: [
      "O Pai, fonte e fim da liturgia (§§ 1077-1083)",
      "A obra de Cristo na liturgia (§§ 1084-1090)",
      "O Espírito Santo e a Igreja na liturgia (§§ 1091-1109)",
      "Os sacramentos de Cristo, da Igreja, da fé e da salvação (§§ 1113-1134)",
    ],
  },
  {
    secao: "liturgia-1",
    titulo: "A celebração pascal da Igreja",
    paragrafos: "§§ 1135-1209",
    itens: [
      "Quem celebra, como, quando e onde (§§ 1136-1199)",
      "Diversidade litúrgica e unidade do mistério (§§ 1200-1209)",
    ],
  },
  {
    secao: "liturgia-2",
    titulo: "Sacramentos da iniciação cristã",
    paragrafos: "§§ 1210-1419",
    itens: [
      "Batismo (§§ 1213-1284)",
      "Confirmação (§§ 1285-1321)",
      "Eucaristia (§§ 1322-1419)",
    ],
  },
  {
    secao: "liturgia-2",
    titulo: "Sacramentos de cura",
    paragrafos: "§§ 1420-1532",
    itens: [
      "Penitência e Reconciliação (§§ 1422-1498)",
      "Unção dos enfermos (§§ 1499-1532)",
    ],
  },
  {
    secao: "liturgia-2",
    titulo: "Sacramentos ao serviço da comunhão e sacramentais",
    paragrafos: "§§ 1533-1690",
    itens: [
      "Ordem (§§ 1536-1600)",
      "Matrimônio (§§ 1601-1666)",
      "Sacramentais e exéquias cristãs (§§ 1667-1690)",
    ],
  },
  // ---- Parte III ----
  {
    secao: "vida-1",
    titulo: "A vocação do homem: a vida no Espírito",
    paragrafos: "§§ 1699-1876",
    itens: [
      "Dignidade da pessoa e bem-aventuranças (§§ 1700-1729)",
      "Liberdade, moralidade dos atos e paixões (§§ 1730-1775)",
      "Consciência moral, virtudes e pecado (§§ 1776-1876)",
    ],
  },
  {
    secao: "vida-1",
    titulo: "Comunidade humana, lei e graça",
    paragrafos: "§§ 1877-2051",
    itens: [
      "Pessoa e sociedade; participação e justiça social (§§ 1877-1948)",
      "A lei natural, a Lei antiga e a Lei nova (§§ 1949-1986)",
      "Graça, justificação, mérito e santidade (§§ 1987-2029)",
      "A Igreja, Mãe e Educadora; os mandamentos da Igreja (§§ 2030-2051)",
    ],
  },
  {
    secao: "vida-2",
    titulo: "Amarás o Senhor teu Deus (1º ao 3º mandamento)",
    paragrafos: "§§ 2083-2195",
    itens: [
      "Adorarás a um só Deus (§§ 2084-2141)",
      "Não pronunciarás o nome de Deus em vão (§§ 2142-2167)",
      "Santificarás o dia do Senhor (§§ 2168-2195)",
    ],
  },
  {
    secao: "vida-2",
    titulo: "Amarás o próximo como a ti mesmo (4º ao 10º)",
    paragrafos: "§§ 2196-2557",
    itens: [
      "Família, autoridade e sociedade (§§ 2197-2257)",
      "Respeito pela vida humana (§§ 2258-2330)",
      "Castidade, matrimônio e vida conjugal (§§ 2331-2400)",
      "Bens temporais, justiça e solidariedade (§§ 2401-2463)",
      "Verdade, testemunho e uso dos meios de comunicação (§§ 2464-2513)",
      "Pureza do coração e desejo desordenado (§§ 2514-2557)",
    ],
  },
  // ---- Parte IV ----
  {
    secao: "oracao-1",
    titulo: "A revelação e a tradição da oração",
    paragrafos: "§§ 2566-2696",
    itens: [
      "A oração no Antigo Testamento (§§ 2568-2597)",
      "A oração de Jesus e da Virgem Maria (§§ 2598-2622)",
      "Fontes, caminhos e mestres de oração (§§ 2623-2696)",
    ],
  },
  {
    secao: "oracao-1",
    titulo: "A vida de oração",
    paragrafos: "§§ 2697-2758",
    itens: [
      "Vocal, meditação e oração contemplativa (§§ 2700-2724)",
      "O combate da oração e as distrações (§§ 2725-2745)",
      "A oração sacerdotal de Jesus (§§ 2746-2758)",
    ],
  },
  {
    secao: "oracao-2",
    titulo: "As sete petições do Pai-Nosso",
    paragrafos: "§§ 2759-2865",
    itens: [
      "‘Pai nosso que estás nos céus’ (§§ 2777-2802)",
      "Santificado seja o teu nome; venha o teu Reino; seja feita a tua vontade (§§ 2803-2827)",
      "O pão de cada dia; perdoa-nos; não nos deixes cair em tentação; livra-nos do mal (§§ 2828-2865)",
    ],
  },
];

export function capitulosDaSecao(secaoSlug: string): CapituloCIC[] {
  return CAPITULOS.filter((c) => c.secao === secaoSlug);
}

export const VATICAN_URL = "https://www.vatican.va/archive/cathechism_po/index_new/prefacio.html";

export function urlVatican(): string {
  return VATICAN_URL;
}
