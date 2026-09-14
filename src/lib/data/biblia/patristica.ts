export type FamiliaPatristica = "apostolicos" | "apologistas" | "doutores";

export type ComentarioPatristico = {
  livro: string;
  capitulo: number;
  versiculos?: [number, number];
  familia: FamiliaPatristica;
  autor: string;
  seculo: string;
  obra: string;
  nota: string;
  fonte: string;
};

export const FAMILIA_PATRISTICA: Record<FamiliaPatristica, string> = {
  apostolicos: "Padres Apostólicos",
  apologistas: "Padres Apologistas",
  doutores: "Grandes Padres e Doutores",
};

/** Paráfrases editoriais; não reproduzem traduções modernas protegidas. */
export const COMENTARIOS_PATRISTICOS: ComentarioPatristico[] = [
  {
    livro: "genesis",
    capitulo: 1,
    familia: "apologistas",
    autor: "São Justino Mártir",
    seculo: "II",
    obra: "I Apologia, 59–60",
    nota: "Justino lê a criação à luz do Logos: toda ordem e verdade presente no mundo recebe de Cristo sua inteligibilidade e seu cumprimento.",
    fonte: "Texto grego e traduções históricas em domínio público; síntese própria.",
  },
  {
    livro: "genesis",
    capitulo: 3,
    versiculos: [14, 15],
    familia: "apologistas",
    autor: "Santo Irineu de Lyon",
    seculo: "II",
    obra: "Contra as Heresias, III, 22,4",
    nota: "Irineu contrapõe a desobediência de Eva à obediência de Maria: o nó da incredulidade é desatado pela fé, dentro da recapitulação realizada por Cristo.",
    fonte: "Adversus Haereses; síntese editorial própria.",
  },
  {
    livro: "mateus",
    capitulo: 5,
    familia: "doutores",
    autor: "Santo Agostinho",
    seculo: "IV–V",
    obra: "Sermão do Senhor na Montanha, I",
    nota: "As bem-aventuranças formam uma ascensão da vida cristã: da humildade e do arrependimento até a pureza, a paz e a perseverança por causa da justiça.",
    fonte: "De sermone Domini in monte; síntese editorial própria.",
  },
  {
    livro: "mateus",
    capitulo: 16,
    versiculos: [13, 20],
    familia: "doutores",
    autor: "São João Crisóstomo",
    seculo: "IV",
    obra: "Homilias sobre Mateus, 54",
    nota: "Crisóstomo destaca que a confissão de Pedro não nasce de opinião humana, mas da revelação do Pai, e relaciona as chaves à autoridade confiada por Cristo.",
    fonte: "Homiliae in Matthaeum; síntese editorial própria.",
  },
  {
    livro: "joao",
    capitulo: 1,
    versiculos: [1, 18],
    familia: "doutores",
    autor: "Santo Agostinho",
    seculo: "IV–V",
    obra: "Tratados sobre o Evangelho de João, 1–3",
    nota: "O Verbo não começou no tempo: é eternamente Deus e, assumindo nossa humanidade, ilumina e recria aqueles que o recebem pela fé.",
    fonte: "In Iohannis Evangelium Tractatus; síntese editorial própria.",
  },
  {
    livro: "joao",
    capitulo: 6,
    versiculos: [48, 58],
    familia: "apostolicos",
    autor: "Santo Inácio de Antioquia",
    seculo: "I–II",
    obra: "Carta aos Esmirnenses, 7",
    nota: "Ao combater quem negava a realidade da Encarnação, Inácio testemunha a fé antiga na Eucaristia como verdadeira carne de Jesus Cristo que padeceu por nós.",
    fonte: "Ad Smyrnaeos 7; síntese editorial própria.",
  },
  {
    livro: "joao",
    capitulo: 20,
    versiculos: [19, 23],
    familia: "doutores",
    autor: "São João Crisóstomo",
    seculo: "IV",
    obra: "Homilias sobre João, 86",
    nota: "O Ressuscitado comunica o Espírito e entrega aos ministros da Igreja uma missão real de reconciliação, exercida em dependência de sua autoridade.",
    fonte: "Homiliae in Ioannem; síntese editorial própria.",
  },
  {
    livro: "romanos",
    capitulo: 5,
    versiculos: [12, 21],
    familia: "doutores",
    autor: "Santo Agostinho",
    seculo: "IV–V",
    obra: "Sobre o Espírito e a Letra, 9–10",
    nota: "Agostinho relaciona a solidariedade da humanidade em Adão à superabundância da graça em Cristo, que não apenas perdoa, mas cura e vivifica.",
    fonte: "De spiritu et littera; síntese editorial própria.",
  },
  {
    livro: "1corintios",
    capitulo: 11,
    versiculos: [23, 29],
    familia: "apologistas",
    autor: "São Justino Mártir",
    seculo: "II",
    obra: "I Apologia, 65–67",
    nota: "A descrição da assembleia dominical de Justino testemunha leitura apostólica, oração comum, ação de graças e comunhão reservada aos que professam a fé e vivem conforme Cristo.",
    fonte: "I Apologia; síntese editorial própria.",
  },
  {
    livro: "apocalipse",
    capitulo: 21,
    familia: "doutores",
    autor: "Santo Agostinho",
    seculo: "IV–V",
    obra: "A Cidade de Deus, XXII",
    nota: "A Jerusalém nova manifesta o fim para o qual a história é conduzida: comunhão definitiva com Deus, ressurreição do corpo e paz sem perda do bem criado.",
    fonte: "De civitate Dei; síntese editorial própria.",
  },
];

export function comentariosDoCapitulo(livro: string, capitulo: number) {
  return COMENTARIOS_PATRISTICOS.filter((item) => item.livro === livro && item.capitulo === capitulo);
}
