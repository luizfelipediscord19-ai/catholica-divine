/**
 * Padres da Igreja — testemunhas da Tradição nos primeiros séculos.
 *
 * VERACIDADE: datas, sedes e obras são fatos históricos verificáveis. As
 * sínteses são redação própria do Portal Católico; nenhuma tradução protegida
 * é reproduzida. As referências indicam onde conferir o ensinamento no
 * Catecismo ou na própria obra citada.
 */

export type EraPadre = "apostolicos" | "gregos" | "latinos" | "desertos";

export const ERA_NOME: Record<EraPadre, string> = {
  apostolicos: "Padres Apostólicos",
  gregos: "Padres gregos",
  latinos: "Padres latinos",
  desertos: "Padres do deserto",
};

export type Padre = {
  slug: string;
  nome: string;
  era: EraPadre;
  /** Datas de nascimento e morte, quando conhecidas. */
  datas: string;
  /** Sede, região ou condição eclesial. */
  sede: string;
  /** Obras principais. */
  obras: string[];
  /** Contribuição doutrinal, em redação própria. */
  contribuicao: string;
  /** Referências para conferência. */
  referencias: string[];
  /** Slug do santo no acervo do portal, quando existe ficha. */
  santo?: string;
};

export const PADRES: Padre[] = [
  {
    slug: "clemente-de-roma",
    nome: "São Clemente Romano",
    era: "apostolicos",
    datas: "† c. 99",
    sede: "Bispo de Roma",
    obras: ["Carta aos Coríntios (1Clem)"],
    contribuicao:
      "Testemunha mais antiga fora do Novo Testamento sobre a sucessão apostólica e a ordem hierárquica na Igreja, escrevendo de Roma para restaurar a paz em Corinto.",
    referencias: ["CIC § 861", "1Clem 42; 44"],
  },
  {
    slug: "inacio-de-antioquia",
    nome: "Santo Inácio de Antioquia",
    era: "apostolicos",
    datas: "† c. 107",
    sede: "Bispo de Antioquia, mártir em Roma",
    obras: ["Sete cartas às Igrejas (Efésios, Esmirna, Romanos, entre outras)"],
    contribuicao:
      "Primeiro autor a chamar a Igreja de católica e a descrever a Eucaristia como carne de Cristo; insiste na unidade em torno do bispo.",
    referencias: ["CIC §§ 830, 1369", "Aos Esmirnenses 8", "Aos Romanos 4"],
    santo: "santo-inacio-de-antioquia",
  },
  {
    slug: "policarpo",
    nome: "São Policarpo de Esmirna",
    era: "apostolicos",
    datas: "c. 69 – c. 155",
    sede: "Bispo de Esmirna, mártir",
    obras: ["Carta aos Filipenses", "Martírio de Policarpo (relato contemporâneo)"],
    contribuicao:
      "Elo direto entre os apóstolos e a Igreja do século II; seu martírio é o mais antigo relato conservado de veneração das relíquias e da data do mártir.",
    referencias: ["CIC § 2473", "Martírio de Policarpo 18"],
  },
  {
    slug: "justino",
    nome: "São Justino de Roma",
    era: "gregos",
    datas: "c. 100 – c. 165",
    sede: "Filósofo e mártir, Roma",
    obras: ["I e II Apologia", "Diálogo com Trifão"],
    contribuicao:
      "Primeiro grande apologista: descreve a Missa dominical do século II e apresenta o cristianismo como a verdadeira filosofia.",
    referencias: ["CIC §§ 1345, 27", "I Apologia 65-67"],
  },
  {
    slug: "irineu",
    nome: "Santo Irineu de Lyon",
    era: "gregos",
    datas: "c. 130 – c. 202",
    sede: "Bispo de Lyon, doutor da unidade",
    obras: ["Contra as heresias", "Demonstração da pregação apostólica"],
    contribuicao:
      "Refutou o gnosticismo com a regra da fé, a sucessão apostólica e a recapitulação de tudo em Cristo, segundo mostrou também a analogia entre Eva e Maria.",
    referencias: ["CIC §§ 518, 1730, 494"],
    santo: "santo-irineu-de-lyon",
  },
  {
    slug: "tertuliano",
    nome: "Tertuliano",
    era: "latinos",
    datas: "c. 155 – c. 220",
    sede: "Cartago (escritor leigo; passou ao montanismo no fim da vida)",
    obras: ["Apologético", "Da prescrição contra os hereges", "Do batismo"],
    contribuicao:
      "Criou grande parte do vocabulário teológico latino, inclusive o termo trinitas. O portal cita seus argumentos, indicando que ele não é Padre da Igreja em sentido pleno por causa do montanismo final.",
    referencias: ["CIC § 1446, sobre a penitência antiga"],
  },
  {
    slug: "cipriano",
    nome: "São Cipriano de Cartago",
    era: "latinos",
    datas: "c. 210 – 258",
    sede: "Bispo de Cartago, mártir",
    obras: ["Da unidade da Igreja católica", "Sobre a oração do Senhor", "Cartas"],
    contribuicao:
      "Pastor da unidade eclesial e da reconciliação dos que caíram na perseguição; sua doutrina do episcopado é citada até hoje.",
    referencias: ["CIC §§ 810, 2782"],
    santo: "sao-cipriano",
  },
  {
    slug: "atanasio",
    nome: "Santo Atanásio de Alexandria",
    era: "gregos",
    datas: "c. 296 – 373",
    sede: "Bispo de Alexandria, doutor da Igreja",
    obras: ["A encarnação do Verbo", "Contra os arianos", "Vida de Santo Antão"],
    contribuicao:
      "Defensor incansável da fé de Niceia contra o arianismo, mesmo em cinco exílios; formulou o princípio de que Deus se fez homem para que o homem participasse da vida divina.",
    referencias: ["CIC § 460"],
    santo: "santo-atanasio",
  },
  {
    slug: "basilio",
    nome: "São Basílio Magno",
    era: "gregos",
    datas: "c. 330 – 379",
    sede: "Bispo de Cesareia da Capadócia, doutor da Igreja",
    obras: ["Sobre o Espírito Santo", "Regras monásticas", "Homilias sobre o Hexaêmeron"],
    contribuicao:
      "Fundamentou a divindade do Espírito Santo e organizou o monaquismo cenobítico oriental, unindo teologia, liturgia e caridade estruturada.",
    referencias: ["CIC §§ 336, 2132"],
    santo: "sao-basilio-magno",
  },
  {
    slug: "gregorio-nazianzeno",
    nome: "São Gregório Nazianzeno",
    era: "gregos",
    datas: "c. 329 – 390",
    sede: "Bispo de Constantinopla, doutor da Igreja",
    obras: ["Cinco discursos teológicos", "Cartas cristológicas"],
    contribuicao:
      "Chamado O Teólogo: precisou a linguagem trinitária e cristológica, afirmando que o que não foi assumido por Cristo não foi salvo.",
    referencias: ["CIC §§ 256, 2670"],
  },
  {
    slug: "gregorio-de-nissa",
    nome: "São Gregório de Nissa",
    era: "gregos",
    datas: "c. 335 – c. 395",
    sede: "Bispo de Nissa",
    obras: ["Grande catequese", "Vida de Moisés", "Sobre a alma e a ressurreição"],
    contribuicao:
      "Mestre da teologia mística: a vida cristã é progresso sem fim (epéktasis) na comunhão com Deus.",
    referencias: ["CIC § 2028"],
  },
  {
    slug: "joao-crisostomo",
    nome: "São João Crisóstomo",
    era: "gregos",
    datas: "c. 349 – 407",
    sede: "Bispo de Constantinopla, doutor da Igreja",
    obras: ["Homilias sobre São Mateus e São Paulo", "Do sacerdócio"],
    contribuicao:
      "Maior pregador do Oriente: unia exegese literal, exigência moral e defesa dos pobres; sua liturgia continua em uso no rito bizantino.",
    referencias: ["CIC §§ 1397, 2446"],
    santo: "sao-joao-crisostomo",
  },
  {
    slug: "cirilo-de-alexandria",
    nome: "São Cirilo de Alexandria",
    era: "gregos",
    datas: "c. 376 – 444",
    sede: "Bispo de Alexandria, doutor da Igreja",
    obras: ["Contra Nestório", "Comentário ao Evangelho de São João"],
    contribuicao:
      "Artífice teológico do Concílio de Éfeso: defendeu a unidade do sujeito em Cristo e o título Theotókos dado a Maria.",
    referencias: ["CIC §§ 466, 495"],
  },
  {
    slug: "ambrosio",
    nome: "Santo Ambrósio de Milão",
    era: "latinos",
    datas: "c. 339 – 397",
    sede: "Bispo de Milão, doutor da Igreja",
    obras: ["Dos mistérios", "Dos sacramentos", "Dos deveres dos ministros"],
    contribuicao:
      "Catequista mistagógico do Ocidente e mestre da liberdade da Igreja diante do poder político; teve papel decisivo na conversão de Santo Agostinho.",
    referencias: ["CIC §§ 1225, 2782"],
    santo: "santo-ambrosio",
  },
  {
    slug: "jeronimo",
    nome: "São Jerônimo",
    era: "latinos",
    datas: "c. 347 – 420",
    sede: "Presbítero em Belém, doutor da Igreja",
    obras: ["Vulgata", "Comentários bíblicos", "Cartas"],
    contribuicao:
      "Traduziu a Escritura para o latim a partir das línguas originais e formulou o princípio de que ignorar as Escrituras é ignorar Cristo.",
    referencias: ["CIC § 133"],
    santo: "sao-jeronimo",
  },
  {
    slug: "agostinho",
    nome: "Santo Agostinho de Hipona",
    era: "latinos",
    datas: "354 – 430",
    sede: "Bispo de Hipona, doutor da Igreja",
    obras: ["Confissões", "A cidade de Deus", "A Trindade", "Comentários aos Salmos"],
    contribuicao:
      "Padre mais citado do Ocidente: graça, pecado original, interioridade, história da salvação e teologia trinitária estão marcados por seu pensamento.",
    referencias: ["CIC §§ 27, 1994, 2560"],
    santo: "santo-agostinho",
  },
  {
    slug: "leao-magno",
    nome: "São Leão Magno",
    era: "latinos",
    datas: "† 461",
    sede: "Papa, doutor da Igreja",
    obras: ["Tomo a Flaviano", "Sermões litúrgicos"],
    contribuicao:
      "Sua carta dogmática orientou Calcedônia na definição das duas naturezas em Cristo; consolidou o exercício doutrinal do primado romano.",
    referencias: ["CIC §§ 467, 469"],
  },
  {
    slug: "gregorio-magno",
    nome: "São Gregório Magno",
    era: "latinos",
    datas: "c. 540 – 604",
    sede: "Papa, doutor da Igreja",
    obras: ["Regra pastoral", "Diálogos", "Moralia in Iob"],
    contribuicao:
      "Reorganizou a ação pastoral e missionária do Ocidente e deu forma duradoura à espiritualidade do pastor servo dos servos de Deus.",
    referencias: ["CIC §§ 1466, 2634"],
    santo: "sao-gregorio-magno",
  },
  {
    slug: "antao",
    nome: "Santo Antão do Deserto",
    era: "desertos",
    datas: "c. 251 – 356",
    sede: "Eremita no deserto egípcio",
    obras: ["Ditos conservados nos Apophthegmata Patrum", "Vida escrita por Santo Atanásio"],
    contribuicao:
      "Pai do monaquismo: o combate espiritual, o silêncio e o discernimento dos pensamentos entram definitivamente na tradição cristã.",
    referencias: ["CIC §§ 2015, 2725"],
    santo: "santo-antao",
  },
  {
    slug: "joao-cassiano",
    nome: "São João Cassiano",
    era: "desertos",
    datas: "c. 360 – c. 435",
    sede: "Monge, fundador em Marselha",
    obras: ["Instituições cenobíticas", "Conferências"],
    contribuicao:
      "Transmitiu ao Ocidente a sabedoria dos monges do Egito; foi fonte direta da Regra de São Bento e da tradição da oração contínua.",
    referencias: ["CIC § 2785"],
  },
  {
    slug: "efrem",
    nome: "Santo Efrém, o Sírio",
    era: "gregos",
    datas: "c. 306 – 373",
    sede: "Diácono em Nísibis e Edessa, doutor da Igreja",
    obras: ["Hinos sobre a fé", "Hinos sobre a Natividade", "Comentário ao Diatessarão"],
    contribuicao:
      "Teólogo-poeta da tradição siríaca: cantou a Encarnação, a Eucaristia e Maria em hinos que ainda hoje sustentam a liturgia oriental.",
    referencias: ["CIC § 2673"],
  },
  {
    slug: "joao-damasceno",
    nome: "São João Damasceno",
    era: "gregos",
    datas: "c. 675 – c. 749",
    sede: "Monge em Jerusalém, doutor da Igreja",
    obras: ["A fonte do conhecimento", "Discursos sobre as imagens sacras"],
    contribuicao:
      "Último grande Padre grego: sintetizou a teologia patrística e defendeu a veneração das imagens com base na Encarnação, preparando o II Concílio de Niceia.",
    referencias: ["CIC §§ 1159, 2559"],
  },
];

export function padresPorEra(era: EraPadre): Padre[] {
  return PADRES.filter((p) => p.era === era);
}

export function padrePorSlug(slug: string): Padre | undefined {
  return PADRES.find((p) => p.slug === slug);
}
