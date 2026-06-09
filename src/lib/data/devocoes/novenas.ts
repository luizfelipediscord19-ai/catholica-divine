export type Novena = {
  slug: string;
  titulo: string;
  ocasiao: string;
  resumo: string;
  oracaoInicial: string;
  oracaoFinal: string;
  dias: { dia: number; titulo: string; meditacao: string }[];
  fonte?: string;
};

export const NOVENAS: Novena[] = [
  {
    slug: "espirito-santo",
    titulo: "Novena ao Espírito Santo",
    ocasiao: "Entre a Ascensão e Pentecostes — a primeira novena da Igreja",
    resumo:
      "A novena por excelência, recolhida da experiência do Cenáculo: Maria e os Apóstolos perseveravam unânimes em oração à espera do Paraclito (At 1,14).",
    oracaoInicial:
      "Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Enviai o vosso Espírito e tudo será criado, e renovareis a face da terra.",
    oracaoFinal:
      "Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo, nosso Senhor. Amém.",
    dias: [
      { dia: 1, titulo: "Espírito de Sabedoria", meditacao: "Concedei-nos saborear as coisas de Deus acima de todas as coisas." },
      { dia: 2, titulo: "Espírito de Entendimento", meditacao: "Iluminai nossa inteligência para penetrar nos mistérios da fé." },
      { dia: 3, titulo: "Espírito de Conselho", meditacao: "Guiai-nos a escolher sempre o que é mais agradável a Deus." },
      { dia: 4, titulo: "Espírito de Fortaleza", meditacao: "Fortalecei-nos para vencer as tentações e perseverar no bem." },
      { dia: 5, titulo: "Espírito de Ciência", meditacao: "Ensinai-nos a julgar todas as coisas à luz de Deus." },
      { dia: 6, titulo: "Espírito de Piedade", meditacao: "Acendei em nós o amor filial ao Pai do Céu." },
      { dia: 7, titulo: "Espírito de Temor de Deus", meditacao: "Dai-nos horror ao pecado e reverência diante da vossa Majestade." },
      { dia: 8, titulo: "Frutos do Espírito", meditacao: "Produzi em nós caridade, alegria, paz, paciência e mansidão." },
      { dia: 9, titulo: "Renovação de Pentecostes", meditacao: "Renovai a face da terra e a face de nossa alma." },
    ],
    fonte: "Tradição da Igreja — At 1,12-14",
  },
  {
    slug: "nossa-senhora-aparecida",
    titulo: "Novena a Nossa Senhora Aparecida",
    ocasiao: "Padroeira do Brasil — 12 de outubro",
    resumo:
      "Nove dias preparatórios à festa da Padroeira do Brasil, lembrando a manifestação da imagem nas águas do rio Paraíba em 1717.",
    oracaoInicial:
      "Ó incomparável Senhora da Conceição Aparecida, Mãe de Deus, Rainha dos Anjos, advogada dos pecadores, refúgio e consolação dos aflitos e atribulados, vós que sois a fonte inesgotável de bênçãos, lançai sobre nós um olhar compassivo.",
    oracaoFinal:
      "Sob vossa proteção nos refugiamos, Santa Mãe de Deus. Não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita.",
    dias: Array.from({ length: 9 }, (_, i) => ({
      dia: i + 1,
      titulo: `Dia ${i + 1}`,
      meditacao:
        "Contemplemos hoje uma virtude da Virgem Aparecida — fé, humildade, obediência, pureza, caridade, paciência, esperança, fortaleza e união com Cristo — e peçamos a graça de imitá-la.",
    })),
  },
  {
    slug: "sao-jose",
    titulo: "Novena a São José",
    ocasiao: "Esposo de Maria e Padroeiro da Igreja Universal — 19 de março",
    resumo:
      "Pio IX proclamou São José Patrono da Igreja Universal em 1870. Esta novena confia ao Justo de Nazaré as causas mais difíceis.",
    oracaoInicial:
      "Glorioso São José, esposo virginal de Maria e pai adotivo de Jesus, eu vos saúdo e venero como protetor escolhido pelo Eterno Pai para guarda das suas duas maiores obras.",
    oracaoFinal:
      "Lembrai-vos, ó castíssimo Esposo de Maria, ó meu amável protetor São José, que jamais se ouviu dizer que algum daqueles que invocaram vossa proteção e imploraram vosso socorro fosse por vós desamparado.",
    dias: Array.from({ length: 9 }, (_, i) => ({
      dia: i + 1,
      titulo: `Dia ${i + 1}`,
      meditacao: "Meditemos uma das dores e alegrias de São José, pedindo a graça de servir com humildade silenciosa.",
    })),
  },
  {
    slug: "sagrado-coracao",
    titulo: "Novena ao Sagrado Coração de Jesus",
    ocasiao: "Solenidade do Sagrado Coração — sexta após Corpus Christi",
    resumo:
      "Devoção difundida por Santa Margarida Maria Alacoque (séc. XVII) e ratificada por Leão XIII na encíclica Annum Sacrum (1899).",
    oracaoInicial:
      "Ó Sagrado Coração de Jesus, fonte de todas as bênçãos, eu vos adoro, eu vos amo e, com vivo arrependimento dos meus pecados, ofereço-vos este pobre coração.",
    oracaoFinal:
      "Doce Coração do meu Jesus, fazei que eu vos ame cada vez mais.",
    dias: Array.from({ length: 9 }, (_, i) => ({
      dia: i + 1,
      titulo: `Dia ${i + 1}`,
      meditacao: "Meditemos hoje uma das promessas do Sagrado Coração reveladas a Santa Margarida Maria.",
    })),
  },
];
