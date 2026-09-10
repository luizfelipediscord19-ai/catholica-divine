// Páginas temáticas da Enciclopédia Católica.
//
// VERACIDADE: as sínteses são redação própria do Portal Católico, fiéis ao
// Catecismo, aos concílios e aos documentos citados em cada seção. Nenhuma
// tradução protegida é reproduzida; as referências permitem conferir a fonte.

export type SecaoTema = {
  /** Âncora usada pelo sumário da página. */
  id: string;
  titulo: string;
  paragrafos: string[];
  pontos?: string[];
  referencias?: string[];
};

export type TemaEnciclopedia = {
  slug: string;
  nome: string;
  kicker: string;
  /** Frase de abertura, também usada como descrição para buscadores. */
  resumo: string;
  secoes: SecaoTema[];
  /** Slugs de verbetes da enciclopédia ligados ao tema. */
  verbetes: string[];
};

export const TEMAS_ENCICLOPEDIA: TemaEnciclopedia[] = [
  {
    slug: "teologia",
    nome: "Teologia",
    kicker: "Fides quaerens intellectum",
    resumo:
      "Como a Igreja conhece Deus: revelação, Escritura e Tradição, o trabalho da razão crente, os dogmas trinitário e cristológico e o sentido do desenvolvimento doutrinal.",
    secoes: [
      {
        id: "o-que-e-teologia",
        titulo: "O que é teologia",
        paragrafos: [
          "Teologia é a fé que procura entender. Não substitui a fé por raciocínio, nem dispensa o raciocínio em nome da fé: parte do que Deus revelou e procura expor esse dom de modo ordenado, coerente e comunicável. Por isso a tradição a define, com Santo Anselmo, como fides quaerens intellectum — a fé em busca de inteligência.",
          "A teologia católica trabalha com fontes: a Sagrada Escritura como alma de todo o estudo, a Tradição viva, os Padres, a liturgia, o Magistério e a experiência dos santos. Quando alguma dessas fontes é isolada das outras, o resultado deixa de ser teologia católica e passa a ser opinião particular.",
        ],
        pontos: [
          "A fé é razoável: crer não é abdicar de pensar (CIC §§ 154-159).",
          "A Escritura é a alma da teologia (Dei Verbum 24).",
          "Fé e razão não se opõem, porque vêm do mesmo Deus (Fides et Ratio 9).",
        ],
        referencias: ["CIC §§ 27-49", "Dei Verbum 24", "Fides et Ratio 9"],
      },
      {
        id: "revelacao-escritura-tradicao",
        titulo: "Revelação, Escritura e Tradição",
        paragrafos: [
          "Deus não é objeto de conquista humana: ele se dá a conhecer livremente, por atos e palavras, numa história que culmina em Jesus Cristo. Depois de Cristo não haverá nova revelação pública, embora a compreensão do que foi revelado continue a amadurecer na Igreja.",
          "Escritura e Tradição não são duas fontes concorrentes, e sim um único depósito da Palavra de Deus, transmitido de modo escrito e de modo vivo. Ao Magistério não cabe criar doutrina nova, mas servir, guardar e expor fielmente esse depósito.",
        ],
        pontos: [
          "A Revelação alcança em Cristo sua plenitude definitiva (CIC §§ 65-67).",
          "Escritura e Tradição formam um só depósito (Dei Verbum 9-10).",
          "O Magistério está a serviço da Palavra, não acima dela (CIC § 86).",
        ],
        referencias: ["CIC §§ 50-100", "Dei Verbum 2-10"],
      },
      {
        id: "trindade-e-cristologia",
        titulo: "Trindade e Cristologia",
        paragrafos: [
          "O centro da fé cristã é o mistério de um só Deus em três Pessoas realmente distintas — Pai, Filho e Espírito Santo — que possuem a mesma e única natureza divina. Niceia (325) e Constantinopla (381) fixaram a linguagem desse mistério contra as leituras que reduziam o Filho ou o Espírito a criaturas.",
          "Sobre Cristo, Calcedônia (451) formulou a regra permanente da fé: uma só Pessoa, o Verbo, em duas naturezas, divina e humana, sem confusão, sem mudança, sem divisão e sem separação. Toda a soteriologia depende disso: só quem é verdadeiramente Deus pode salvar, e só quem é verdadeiramente homem pode representar a humanidade.",
        ],
        pontos: [
          "Um só Deus, três Pessoas, uma só natureza (CIC §§ 253-256).",
          "Cristo é consubstancial ao Pai (Niceia, 325).",
          "Duas naturezas em uma só Pessoa (Calcedônia, 451; CIC §§ 464-469).",
        ],
        referencias: ["CIC §§ 232-267", "CIC §§ 456-483", "Jo 1,1-14", "Fp 2,6-11"],
      },
      {
        id: "graca-e-salvacao",
        titulo: "Graça, justificação e liberdade",
        paragrafos: [
          "A iniciativa da salvação é sempre de Deus. A graça é dom gratuito que perdoa, renova interiormente e torna a pessoa capaz de responder ao chamado divino. Nada disso é merecido antes de ser recebido.",
          "Ao mesmo tempo, a graça não anula a liberdade: ela a desperta e a sustenta. Por isso a tradição católica fala de cooperação — a resposta livre do homem é ela mesma efeito da graça, e não uma contribuição que dispute o mérito com Deus.",
        ],
        pontos: [
          "A justificação é obra da misericórdia de Deus (CIC §§ 1987-1995).",
          "A graça santificante é participação estável na vida divina (CIC § 2000).",
          "O mérito cristão pressupõe a graça que o antecede (CIC §§ 2006-2011).",
        ],
        referencias: ["CIC §§ 1987-2029", "Rm 3,21-26", "Tg 2,14-26", "Trento, sess. VI"],
      },
      {
        id: "desenvolvimento-doutrinal",
        titulo: "Desenvolvimento doutrinal",
        paragrafos: [
          "Dizer que a doutrina se desenvolve não é dizer que ela muda de conteúdo. A imagem clássica de São Vicente de Lérins é o crescimento de um corpo vivo: o adulto não é outro ser que a criança, mas o mesmo ser mais desdobrado.",
          "Um dogma proclamado tardiamente — como a Imaculada Conceição (1854) ou a Assunção (1950) — não é invenção do século em que foi definido: é explicitação daquilo que a Igreja já vivia na liturgia, na oração e na pregação. O critério é a continuidade: nenhum desenvolvimento legítimo contradiz o que foi crido antes.",
        ],
        pontos: [
          "A Tradição progride na compreensão, não no conteúdo (Dei Verbum 8).",
          "Dogmas tardios explicitam a fé já vivida (CIC §§ 88-90).",
          "O critério de autenticidade é a continuidade, não a novidade.",
        ],
        referencias: ["CIC §§ 84-95", "Dei Verbum 8"],
      },
    ],
    verbetes: [
      "revelacao",
      "trindade",
      "tradicao-apostolica",
      "magisterio",
      "graca",
      "justificacao",
    ],
  },
  {
    slug: "moral",
    nome: "Moral",
    kicker: "Vita in Christo",
    resumo:
      "A vida em Cristo: dignidade da pessoa, consciência, virtudes, pecado e conversão, Decálogo e doutrina social — a moral católica como resposta livre à graça.",
    secoes: [
      {
        id: "fundamento-da-moral",
        titulo: "O fundamento: dignidade e vocação",
        paragrafos: [
          "A moral católica não começa por proibições, mas por uma afirmação: a pessoa humana é criada à imagem de Deus, dotada de inteligência e liberdade, e chamada à bem-aventurança. As normas existem para proteger e servir essa vocação, não para substituí-la.",
          "Por isso a terceira parte do Catecismo se chama 'A vida em Cristo': o agir cristão é consequência do dom recebido no Batismo. A moral é a forma concreta da gratidão.",
        ],
        pontos: [
          "O homem é imagem de Deus, livre e responsável (CIC §§ 1700-1709).",
          "As bem-aventuranças revelam o fim da vida humana (CIC §§ 1716-1729).",
          "A liberdade cresce à medida que escolhe o bem (CIC §§ 1731-1738).",
        ],
        referencias: ["CIC §§ 1691-1748", "Gn 1,26-27", "Mt 5,3-12"],
      },
      {
        id: "consciencia-e-lei",
        titulo: "Consciência, lei natural e discernimento",
        paragrafos: [
          "A consciência é o juízo prático pelo qual a pessoa reconhece a qualidade moral de um ato concreto. Ela deve ser sempre seguida — mas também formada, porque pode errar por ignorância culpável ou por hábitos deformados.",
          "A lei natural é a participação da criatura racional na sabedoria de Deus: aquilo que a razão reconhece como devido ao bem da pessoa, em qualquer cultura. A lei revelada não a contradiz; purifica-a e a leva mais longe.",
        ],
        pontos: [
          "A consciência deve ser formada, não apenas consultada (CIC §§ 1783-1785).",
          "Nunca é lícito fazer o mal para obter um bem (CIC § 1789).",
          "Circunstâncias e intenção agravam ou atenuam, mas não tornam bom um ato mau em si (CIC §§ 1750-1756).",
        ],
        referencias: ["CIC §§ 1749-1802", "Veritatis Splendor 54-64", "Rm 2,14-15"],
      },
      {
        id: "virtudes-e-pecado",
        titulo: "Virtudes, pecado e conversão",
        paragrafos: [
          "As virtudes cardeais — prudência, justiça, fortaleza e temperança — organizam o caráter; as virtudes teologais — fé, esperança e caridade — o orientam diretamente a Deus. A caridade é a forma de todas as demais.",
          "O pecado é palavra, ato ou desejo contrário à lei eterna; distinguem-se o pecado mortal, que rompe a comunhão com Deus, e o venial, que a fere. A distinção não serve para medir culpa alheia, mas para levar a sério a conversão e o sacramento da Penitência.",
        ],
        pontos: [
          "A caridade é a forma das virtudes (CIC § 1827).",
          "Pecado mortal exige matéria grave, plena consciência e consentimento deliberado (CIC § 1857).",
          "A confissão sacramental reconcilia com Deus e com a Igreja (CIC §§ 1440-1449).",
        ],
        referencias: ["CIC §§ 1803-1876", "CIC §§ 1420-1470", "1Cor 13,4-13"],
      },
      {
        id: "decalogo",
        titulo: "O Decálogo hoje",
        paragrafos: [
          "Os dez mandamentos resumem a resposta devida à aliança: três voltados diretamente a Deus, sete às relações humanas. Cristo não os aboliu; radicalizou-os, mostrando que atingem também o coração e o desejo.",
          "Lidos hoje, tocam questões concretas: verdade e reputação nas redes, respeito à vida desde a concepção até a morte natural, justiça no trabalho e no salário, castidade conforme o estado de vida, honestidade nos contratos, descanso e culto no domingo.",
        ],
        pontos: [
          "O Decálogo é caminho de liberdade, não jugo arbitrário (CIC §§ 2057-2063).",
          "O quinto mandamento protege a vida em todas as suas fases (CIC §§ 2258-2283).",
          "O sétimo obriga à justiça econômica e ao cuidado da criação (CIC §§ 2401-2418).",
        ],
        referencias: ["CIC §§ 2052-2557", "Ex 20,1-17", "Dt 6,4-5"],
      },
      {
        id: "doutrina-social",
        titulo: "Doutrina social da Igreja",
        paragrafos: [
          "Desde a Rerum Novarum (1891), o Magistério desenvolveu um corpo de ensinamentos sobre trabalho, propriedade, política e economia, articulado por quatro princípios: dignidade da pessoa, bem comum, subsidiariedade e solidariedade.",
          "A Igreja não propõe um modelo técnico de economia; propõe critérios morais. Daí a insistência no destino universal dos bens, na opção preferencial pelos pobres e no cuidado da casa comum como exigência de justiça, e não de sentimentalismo.",
        ],
        pontos: [
          "Destino universal dos bens e função social da propriedade (CIC §§ 2402-2406).",
          "Subsidiariedade: decidir o mais próximo possível de quem é afetado (CIC § 1883).",
          "Opção preferencial pelos pobres (CIC §§ 2443-2449).",
        ],
        referencias: ["CIC §§ 1877-1948", "Rerum Novarum", "Centesimus Annus", "Mt 25,31-46"],
      },
    ],
    verbetes: ["virtudes-teologais", "graca", "justificacao", "comunhao-dos-santos"],
  },
  {
    slug: "liturgia",
    nome: "Liturgia",
    kicker: "Opus Dei",
    resumo:
      "O culto público da Igreja: economia sacramental, estrutura da Missa, os sete sacramentos, o ano litúrgico e a Liturgia das Horas.",
    secoes: [
      {
        id: "economia-sacramental",
        titulo: "Economia sacramental",
        paragrafos: [
          "Liturgia é o exercício do sacerdócio de Cristo: por sinais sensíveis, a obra da salvação é celebrada e comunicada. Quem age primeiro na liturgia não é a assembleia, e sim Cristo inteiro, cabeça e membros, no Espírito Santo.",
          "Daí a linguagem da 'economia sacramental': o que aconteceu uma vez na Páscoa é distribuído no tempo através dos sacramentos, sem ser repetido. A liturgia terrestre participa da liturgia celeste descrita no Apocalipse.",
        ],
        pontos: [
          "A liturgia é fonte e ponto culminante da vida da Igreja (Sacrosanctum Concilium 10).",
          "Cristo age em cada celebração (CIC §§ 1084-1090).",
          "A liturgia terrena participa do culto do céu (CIC §§ 1137-1139).",
        ],
        referencias: ["CIC §§ 1066-1209", "Sacrosanctum Concilium 7-10", "Ap 4,1-11"],
      },
      {
        id: "estrutura-da-missa",
        titulo: "A estrutura da Missa",
        paragrafos: [
          "A celebração eucarística tem duas grandes partes que formam um só ato de culto: a Liturgia da Palavra, com as leituras, o salmo, o Evangelho, a homilia e as preces; e a Liturgia Eucarística, com a apresentação dos dons, a Oração Eucarística e a Comunhão.",
          "Na Oração Eucarística estão o prefácio e o Sanctus, a epiclese ao Espírito Santo, o relato da instituição, a anamnese, as intercessões e a doxologia final. Essa ordem não é etiqueta: expressa que a Igreja não fabrica o dom, mas o pede e o recebe.",
        ],
        pontos: [
          "Uma só celebração em duas partes (CIC §§ 1346-1347).",
          "Epiclese e palavras da instituição pertencem ao coração da oração (CIC §§ 1352-1354).",
          "A Eucaristia é memorial, presença real e banquete (CIC §§ 1356-1381).",
        ],
        referencias: ["CIC §§ 1322-1419", "1Cor 11,23-29", "Lc 22,19-20"],
      },
      {
        id: "sete-sacramentos",
        titulo: "Os sete sacramentos",
        paragrafos: [
          "A Igreja reconhece sete sacramentos instituídos por Cristo: Batismo, Confirmação e Eucaristia (iniciação); Penitência e Unção dos Enfermos (cura); Ordem e Matrimônio (serviço da comunhão). Cada um significa e realiza a graça que anuncia.",
          "Batismo, Confirmação e Ordem imprimem um caráter permanente e por isso não se repetem. Todos os sacramentos pedem disposição interior: o sinal age por Cristo, mas o fruto depende de quem o recebe.",
        ],
        pontos: [
          "Sacramentos da iniciação, da cura e do serviço (CIC §§ 1210-1211).",
          "Três sacramentos imprimem caráter indelével (CIC § 1121).",
          "A eficácia é de Cristo; o fruto depende da disposição (CIC §§ 1127-1128).",
        ],
        referencias: ["CIC §§ 1210-1666", "Jo 3,5", "Tg 5,14-15"],
      },
      {
        id: "ano-liturgico",
        titulo: "O ano litúrgico",
        paragrafos: [
          "O ano litúrgico desdobra o único mistério pascal ao longo do tempo: Advento, Natal, Quaresma, Tríduo, Páscoa e Tempo Comum. O domingo é a Páscoa semanal, primeiro dia e dia da Ressurreição.",
          "As festas dos santos não competem com o mistério de Cristo: mostram nele os frutos da redenção. As solenidades marianas, em especial, sempre remetem à obra do Filho.",
        ],
        pontos: [
          "O domingo é o fundamento de todo o ano litúrgico (CIC §§ 1166-1167).",
          "O Tríduo Pascal é o ápice do ano (CIC § 1168).",
          "As memórias dos santos glorificam a graça de Cristo (CIC § 1173).",
        ],
        referencias: ["CIC §§ 1163-1178", "Sacrosanctum Concilium 102-111"],
      },
      {
        id: "liturgia-das-horas",
        titulo: "Liturgia das Horas e piedade popular",
        paragrafos: [
          "A oração das Horas santifica o dia com salmos, leituras e cânticos; é oração de toda a Igreja, não apenas do clero, e prolonga a Eucaristia ao longo das horas.",
          "A piedade popular — rosário, via-sacra, novenas, procissões — não substitui a liturgia, mas dela deriva e para ela conduz, quando é bem ordenada e purificada de superstição.",
        ],
        pontos: [
          "As Horas prolongam o louvor eucarístico (CIC §§ 1174-1178).",
          "A piedade popular deve harmonizar-se com a liturgia (CIC § 1675).",
        ],
        referencias: ["CIC §§ 1174-1178", "CIC §§ 1674-1676", "At 2,42"],
      },
    ],
    verbetes: ["liturgia", "eucaristia", "oracao-crista"],
  },
  {
    slug: "mariologia",
    nome: "Mariologia",
    kicker: "Ad Iesum per Mariam",
    resumo:
      "Maria na fé católica: os quatro dogmas marianos, a maternidade espiritual, a diferença entre culto e adoração, e as devoções aprovadas.",
    secoes: [
      {
        id: "maria-no-plano-de-deus",
        titulo: "Maria no plano de Deus",
        paragrafos: [
          "Tudo o que a Igreja diz de Maria diz respeito a Cristo. Ela é a mulher em quem o Verbo assumiu a natureza humana, e seu 'sim' é o modelo da resposta crente: livre, consciente e total.",
          "Por isso a mariologia não é apêndice devocional: pertence à cristologia e à eclesiologia. O Concílio Vaticano II tratou dela no capítulo VIII da Lumen Gentium, dentro do mistério da Igreja.",
        ],
        pontos: [
          "Maria é a nova Eva, associada à obediência do Filho (CIC §§ 494, 511).",
          "Seu 'sim' é modelo de fé para todo cristão (Lc 1,38).",
          "A mariologia se lê dentro do mistério de Cristo e da Igreja (Lumen Gentium 52-69).",
        ],
        referencias: ["CIC §§ 484-511", "Lumen Gentium 52-69", "Lc 1,26-38"],
      },
      {
        id: "quatro-dogmas",
        titulo: "Os quatro dogmas marianos",
        paragrafos: [
          "Maternidade divina (Theotókos): definida em Éfeso (431), afirma que Maria é mãe de Jesus, que é Deus — logo, mãe de Deus segundo a humanidade assumida. É uma tese cristológica antes de ser mariana.",
          "Virgindade: a Igreja professa a concepção virginal e a virgindade permanente, atestada desde os primeiros séculos e reafirmada no Concílio de Latrão (649).",
          "Imaculada Conceição: definida por Pio IX em 1854, afirma que Maria foi preservada do pecado original desde o primeiro instante, por graça de Cristo — ela é a primeira redimida, não uma exceção à redenção.",
          "Assunção: definida por Pio XII em 1950, afirma que, terminado o curso da vida terrena, Maria foi elevada em corpo e alma à glória celeste, sinal antecipado do destino de todos os salvos.",
        ],
        pontos: [
          "Theotókos — Éfeso, 431 (CIC §§ 466, 495).",
          "Virgindade permanente — Latrão, 649 (CIC §§ 499-507).",
          "Imaculada Conceição — Ineffabilis Deus, 1854 (CIC §§ 490-493).",
          "Assunção — Munificentissimus Deus, 1950 (CIC §§ 966, 974).",
        ],
        referencias: ["CIC §§ 484-511", "CIC §§ 963-975", "Éfeso (431)", "Lumen Gentium 59"],
      },
      {
        id: "culto-e-adoracao",
        titulo: "Culto, veneração e adoração",
        paragrafos: [
          "A distinção é antiga e decisiva: adoração (latria) é devida somente a Deus; veneração (dulia) é honra prestada aos santos; à Maria se presta uma veneração singular (hiperdulia), superior à dos outros santos e inteiramente distinta da adoração.",
          "O Segundo Concílio de Niceia (787) fixou o princípio das imagens: a honra prestada à imagem passa ao original; não se adora madeira ou tinta, honra-se quem ela representa.",
        ],
        pontos: [
          "Somente Deus é adorado (CIC §§ 2096-2097).",
          "A veneração de Maria é singular, mas não é adoração (CIC § 971).",
          "A honra à imagem se dirige à pessoa representada (Niceia II, 787; CIC § 2132).",
        ],
        referencias: ["CIC §§ 971, 2096-2132", "Niceia II (787)", "Lc 1,48"],
      },
      {
        id: "mediacao-materna",
        titulo: "Mediação materna e maternidade espiritual",
        paragrafos: [
          "Há um só mediador entre Deus e os homens: Cristo. A intercessão de Maria e dos santos não acrescenta nada a essa mediação única — participa dela, como a oração de um irmão pelo outro participa da única mediação de Cristo.",
          "A maternidade espiritual de Maria em relação aos fiéis é lida a partir do Calvário, quando o Filho a confia ao discípulo e o discípulo a ela. A Igreja a invoca como Mãe, advogada e auxiliadora, sem jamais colocá-la no lugar do Redentor.",
        ],
        pontos: [
          "Um só mediador, participado por muitos intercessores (1Tm 2,5; Lumen Gentium 60-62).",
          "A maternidade espiritual nasce no Calvário (Jo 19,26-27; CIC § 964).",
          "Nenhum título mariano diminui a mediação de Cristo (Lumen Gentium 62).",
        ],
        referencias: ["CIC §§ 963-970", "Lumen Gentium 60-62", "1Tm 2,5", "Jo 19,26-27"],
      },
      {
        id: "devocoes-aprovadas",
        titulo: "Devoções e aparições aprovadas",
        paragrafos: [
          "O rosário, o Angelus, as antífonas marianas e as consagrações são caminhos aprovados de oração mariana — sempre cristocêntricos, porque cada mistério contemplado é um episódio da vida de Jesus.",
          "Sobre aparições, a Igreja distingue com cuidado: a revelação pública está encerrada em Cristo. Aprovar uma aparição significa reconhecer que nada nela contraria a fé e que seus frutos são bons; nunca significa acrescentar um novo artigo de fé.",
        ],
        pontos: [
          "Revelações privadas não completam a Revelação (CIC § 67).",
          "O rosário é oração evangélica e contemplativa (Rosarium Virginis Mariae 1-3).",
          "A aprovação eclesial é reconhecimento de frutos, não novo dogma.",
        ],
        referencias: ["CIC §§ 67, 971", "Marialis Cultus", "Rosarium Virginis Mariae"],
      },
    ],
    verbetes: ["trindade", "comunhao-dos-santos", "graca", "oracao-crista"],
  },
];

export function temaPorSlug(slug: string): TemaEnciclopedia | undefined {
  return TEMAS_ENCICLOPEDIA.find((t) => t.slug === slug);
}
