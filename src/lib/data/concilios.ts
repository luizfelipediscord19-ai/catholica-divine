/**
 * Concílios ecumênicos da Igreja Católica.
 *
 * VERACIDADE: datas, locais e definições são fatos históricos verificáveis,
 * conforme a lista oficial dos vinte e um concílios ecumênicos reconhecidos
 * pela Igreja Católica. As sínteses são redação própria do Portal Católico;
 * nenhuma tradução protegida de documento conciliar é reproduzida. As
 * referências permitem conferir o texto oficial (vatican.va) ou o Catecismo.
 */

export type Concilio = {
  slug: string;
  numero: number;
  nome: string;
  /** Ano ou faixa de anos. */
  anos: string;
  local: string;
  /** Papa (ou papas) do período conciliar. */
  papa: string;
  /** O que estava em causa. */
  contexto: string;
  /** Principais definições e decisões. */
  definicoes: string[];
  /** Referências para conferência (CIC, documentos, símbolos de fé). */
  referencias: string[];
};

export const CONCILIOS: Concilio[] = [
  {
    slug: "niceia-i",
    numero: 1,
    nome: "I Concílio de Niceia",
    anos: "325",
    local: "Niceia (Bitínia, hoje İznik, Turquia)",
    papa: "São Silvestre I",
    contexto:
      "O presbítero Ário sustentava que o Filho era criatura, a mais alta de todas, mas não Deus verdadeiro. A controvérsia atingia o próprio conteúdo da fé batismal.",
    definicoes: [
      "Professou o Filho como consubstancial (homoousios) ao Pai, Deus de Deus, gerado e não criado.",
      "Formulou o núcleo do Símbolo niceno, base do Credo rezado na liturgia.",
      "Fixou critérios para a data comum da Páscoa.",
      "Promulgou vinte cânones disciplinares, entre eles a organização das sedes metropolitanas.",
    ],
    referencias: ["CIC §§ 465, 242", "Símbolo Niceno-Constantinopolitano"],
  },
  {
    slug: "constantinopla-i",
    numero: 2,
    nome: "I Concílio de Constantinopla",
    anos: "381",
    local: "Constantinopla",
    papa: "São Dâmaso I",
    contexto:
      "Persistiam formas de arianismo e negava-se a divindade do Espírito Santo (pneumatômacos).",
    definicoes: [
      "Confessou a divindade do Espírito Santo, Senhor que dá a vida, adorado com o Pai e o Filho.",
      "Completou o Símbolo niceno na forma usada até hoje na liturgia.",
      "Reafirmou a condenação do arianismo em suas variantes.",
    ],
    referencias: ["CIC §§ 245-248, 685", "Símbolo Niceno-Constantinopolitano"],
  },
  {
    slug: "efeso",
    numero: 3,
    nome: "Concílio de Éfeso",
    anos: "431",
    local: "Éfeso",
    papa: "São Celestino I",
    contexto:
      "Nestório recusava a Maria o título de Theotókos, dividindo em Cristo o sujeito divino e o humano.",
    definicoes: [
      "Definiu a unidade da pessoa de Cristo, verdadeiro Deus e verdadeiro homem.",
      "Proclamou Maria Theotókos, Mãe de Deus, por causa da união hipostática.",
      "Condenou o nestorianismo.",
    ],
    referencias: ["CIC §§ 466, 495"],
  },
  {
    slug: "calcedonia",
    numero: 4,
    nome: "Concílio de Calcedônia",
    anos: "451",
    local: "Calcedônia",
    papa: "São Leão Magno",
    contexto:
      "O monofisismo de Êutiques dissolvia a humanidade de Cristo na divindade. A carta dogmática de São Leão (Tomo a Flaviano) orientou os padres conciliares.",
    definicoes: [
      "Definiu Cristo em duas naturezas, sem confusão, sem mudança, sem divisão, sem separação, numa só pessoa.",
      "Condenou o monofisismo.",
      "Reconheceu a autoridade doutrinal da sede de Pedro na fórmula lida no concílio.",
    ],
    referencias: ["CIC §§ 467, 468"],
  },
  {
    slug: "constantinopla-ii",
    numero: 5,
    nome: "II Concílio de Constantinopla",
    anos: "553",
    local: "Constantinopla",
    papa: "Vigílio",
    contexto:
      "A recepção de Calcedônia no Oriente exigia esclarecer a linguagem cristológica e resolver a questão dos Três Capítulos.",
    definicoes: [
      "Reafirmou a fé de Niceia, Éfeso e Calcedônia com precisão terminológica sobre a única hipóstase do Verbo.",
      "Condenou proposições atribuídas a Teodoro de Mopsuéstia, Teodoreto e Ibas.",
      "Rejeitou o origenismo em suas teses sobre preexistência das almas.",
    ],
    referencias: ["CIC § 468"],
  },
  {
    slug: "constantinopla-iii",
    numero: 6,
    nome: "III Concílio de Constantinopla",
    anos: "680–681",
    local: "Constantinopla",
    papa: "Santo Agatão e São Leão II",
    contexto:
      "O monotelismo afirmava em Cristo uma só vontade, comprometendo a integridade de sua liberdade humana.",
    definicoes: [
      "Definiu em Cristo duas vontades e duas operações, a divina e a humana, sem oposição.",
      "Ensinou que a vontade humana de Cristo segue livremente a vontade divina.",
      "Condenou o monotelismo.",
    ],
    referencias: ["CIC §§ 475, 482"],
  },
  {
    slug: "niceia-ii",
    numero: 7,
    nome: "II Concílio de Niceia",
    anos: "787",
    local: "Niceia",
    papa: "Adriano I",
    contexto: "A crise iconoclasta destruía imagens sacras e proibia sua veneração.",
    definicoes: [
      "Legitimou a veneração das imagens sacras, fundada na Encarnação do Verbo.",
      "Distinguiu adoração (latria), devida só a Deus, e veneração (dulia) das imagens e dos santos.",
      "Estabeleceu que a honra prestada à imagem se dirige a quem ela representa.",
    ],
    referencias: ["CIC §§ 1159-1162, 2131"],
  },
  {
    slug: "constantinopla-iv",
    numero: 8,
    nome: "IV Concílio de Constantinopla",
    anos: "869–870",
    local: "Constantinopla",
    papa: "Adriano II",
    contexto: "O cisma de Fócio abalava a comunhão entre Roma e Constantinopla.",
    definicoes: [
      "Depôs Fócio e restabeleceu Inácio na sede de Constantinopla.",
      "Reafirmou o primado da sede romana na comunhão eclesial.",
      "Confirmou a doutrina do II Concílio de Niceia sobre as imagens.",
    ],
    referencias: ["CIC § 882"],
  },
  {
    slug: "latrao-i",
    numero: 9,
    nome: "I Concílio de Latrão",
    anos: "1123",
    local: "Roma, Basílica de São João de Latrão",
    papa: "Calisto II",
    contexto: "Fim da querela das investiduras, selada pela Concordata de Worms (1122).",
    definicoes: [
      "Confirmou a liberdade da Igreja na nomeação de bispos e abades.",
      "Condenou a simonia e o concubinato clerical.",
      "Regulou privilégios e disciplina do clero.",
    ],
    referencias: ["Concordata de Worms, 1122"],
  },
  {
    slug: "latrao-ii",
    numero: 10,
    nome: "II Concílio de Latrão",
    anos: "1139",
    local: "Roma, Latrão",
    papa: "Inocêncio II",
    contexto: "Superação do cisma de Anacleto II e reforma da disciplina eclesiástica.",
    definicoes: [
      "Anulou as ordenações do antipapa e restabeleceu a unidade.",
      "Renovou a legislação contra a simonia e a usura.",
      "Reforçou a disciplina do celibato no clero latino.",
    ],
    referencias: ["Cân. 277 (CDC 1983), sobre o celibato"],
  },
  {
    slug: "latrao-iii",
    numero: 11,
    nome: "III Concílio de Latrão",
    anos: "1179",
    local: "Roma, Latrão",
    papa: "Alexandre III",
    contexto: "Eleições papais contestadas e difusão de movimentos dissidentes no sul da França.",
    definicoes: [
      "Estabeleceu a maioria de dois terços dos cardeais para a eleição do papa.",
      "Determinou o ensino gratuito da gramática junto às catedrais.",
      "Tomou medidas contra cátaros e valdenses.",
    ],
    referencias: ["Disciplina da eleição pontifícia"],
  },
  {
    slug: "latrao-iv",
    numero: 12,
    nome: "IV Concílio de Latrão",
    anos: "1215",
    local: "Roma, Latrão",
    papa: "Inocêncio III",
    contexto:
      "Um dos concílios medievais de maior alcance doutrinal e pastoral, convocado para a reforma da Igreja.",
    definicoes: [
      "Empregou o termo transubstanciação para a conversão eucarística.",
      "Impôs a confissão sacramental e a comunhão pascal ao menos uma vez por ano.",
      "Definiu a doutrina de um só Deus criador de tudo, contra o dualismo cátaro.",
    ],
    referencias: ["CIC §§ 1376, 1457, 2042"],
  },
  {
    slug: "lyon-i",
    numero: 13,
    nome: "I Concílio de Lyon",
    anos: "1245",
    local: "Lyon",
    papa: "Inocêncio IV",
    contexto: "Conflito com o imperador Frederico II e ameaça mongol ao Oriente cristão.",
    definicoes: [
      "Depôs Frederico II como imperador.",
      "Organizou auxílio à Terra Santa e ao Oriente.",
      "Aprovou normas processuais e disciplinares para a Igreja.",
    ],
    referencias: ["Atas do concílio, séc. XIII"],
  },
  {
    slug: "lyon-ii",
    numero: 14,
    nome: "II Concílio de Lyon",
    anos: "1274",
    local: "Lyon",
    papa: "Beato Gregório X",
    contexto:
      "Tentativa de reunião com os cristãos do Oriente. São Tomás de Aquino morreu no caminho para o concílio e São Boaventura faleceu durante os trabalhos.",
    definicoes: [
      "Aprovou uma união com os gregos, que não se sustentou na prática.",
      "Regulou o conclave, com a clausura dos cardeais para a eleição papal.",
      "Confessou a procedência do Espírito Santo do Pai e do Filho.",
    ],
    referencias: ["CIC §§ 246-248"],
  },
  {
    slug: "vienne",
    numero: 15,
    nome: "Concílio de Vienne",
    anos: "1311–1312",
    local: "Vienne (França)",
    papa: "Clemente V",
    contexto: "Pressão da coroa francesa e processo contra a Ordem do Templo.",
    definicoes: [
      "Suprimiu a Ordem dos Templários por via administrativa.",
      "Condenou erros atribuídos aos beguinos e begardas.",
      "Determinou o ensino de línguas orientais em universidades para a missão.",
    ],
    referencias: ["Constituições do concílio, 1312"],
  },
  {
    slug: "constanca",
    numero: 16,
    nome: "Concílio de Constança",
    anos: "1414–1418",
    local: "Constança",
    papa: "Gregório XII (renúncia) e Martinho V",
    contexto: "O Grande Cisma do Ocidente havia dividido a obediência entre três pretendentes.",
    definicoes: [
      "Encerrou o Grande Cisma com a eleição de Martinho V.",
      "Condenou teses de John Wyclif e de Jan Hus.",
      "Debateu o conciliarismo, tese depois rejeitada pelo Magistério.",
    ],
    referencias: ["CIC §§ 880-882, sobre o primado"],
  },
  {
    slug: "florenca",
    numero: 17,
    nome: "Concílio de Basileia–Ferrara–Florença",
    anos: "1431–1445",
    local: "Basileia, Ferrara, Florença e Roma",
    papa: "Eugênio IV",
    contexto: "Nova tentativa de união com gregos, armênios e coptas, sob pressão política e turca.",
    definicoes: [
      "Assinou o decreto de união com os gregos (Laetentur caeli, 1439).",
      "Reafirmou o primado do bispo de Roma.",
      "Expôs a doutrina dos sete sacramentos em decretos para os armênios.",
    ],
    referencias: ["CIC §§ 1113, 882"],
  },
  {
    slug: "latrao-v",
    numero: 18,
    nome: "V Concílio de Latrão",
    anos: "1512–1517",
    local: "Roma, Latrão",
    papa: "Júlio II e Leão X",
    contexto: "Reação ao conciliábulo de Pisa e urgência de reforma antes da crise protestante.",
    definicoes: [
      "Rejeitou o conciliarismo e reafirmou a autoridade pontifícia.",
      "Definiu a imortalidade e a individualidade da alma humana contra o averroísmo.",
      "Aprovou decretos de reforma que tiveram aplicação limitada.",
    ],
    referencias: ["CIC §§ 366, 882"],
  },
  {
    slug: "trento",
    numero: 19,
    nome: "Concílio de Trento",
    anos: "1545–1563",
    local: "Trento e Bolonha",
    papa: "Paulo III, Júlio III e Pio IV",
    contexto:
      "Resposta doutrinal e disciplinar à Reforma protestante e ponto de partida da reforma católica.",
    definicoes: [
      "Ensinou a relação entre Escritura e Tradição e fixou o cânon dos livros sagrados.",
      "Definiu a justificação, a natureza do pecado original e a cooperação da liberdade com a graça.",
      "Definiu os sete sacramentos, a transubstanciação e o caráter sacrificial da Missa.",
      "Criou os seminários para a formação do clero e reformou a disciplina episcopal.",
    ],
    referencias: ["CIC §§ 120, 1376, 1367, 1989-1995"],
  },
  {
    slug: "vaticano-i",
    numero: 20,
    nome: "I Concílio do Vaticano",
    anos: "1869–1870",
    local: "Roma, Basílica de São Pedro",
    papa: "Beato Pio IX",
    contexto:
      "Racionalismo, fideísmo e questões sobre a autoridade da Igreja no mundo moderno. O concílio foi interrompido pela tomada de Roma.",
    definicoes: [
      "Ensinou a harmonia entre fé e razão na constituição Dei Filius.",
      "Definiu o primado de jurisdição do bispo de Roma na Pastor aeternus.",
      "Definiu a infalibilidade do Romano Pontífice quando ensina ex cathedra em matéria de fé e moral.",
    ],
    referencias: ["CIC §§ 156-159, 891"],
  },
  {
    slug: "vaticano-ii",
    numero: 21,
    nome: "II Concílio do Vaticano",
    anos: "1962–1965",
    local: "Roma, Basílica de São Pedro",
    papa: "São João XXIII e São Paulo VI",
    contexto:
      "Concílio pastoral convocado para apresentar a fé íntegra ao mundo contemporâneo, sem definir novos dogmas.",
    definicoes: [
      "Sacrosanctum Concilium: reforma da liturgia e participação ativa dos fiéis.",
      "Lumen gentium: a Igreja como sacramento de salvação, colegialidade episcopal e vocação universal à santidade.",
      "Dei Verbum: a Revelação, a Escritura e a Tradição na vida da Igreja.",
      "Gaudium et spes: a Igreja no mundo de hoje, dignidade da pessoa e bem comum.",
      "Dignitatis humanae e Nostra aetate: liberdade religiosa e relação com as outras religiões.",
    ],
    referencias: ["CIC §§ 748-810, 1066-1075", "vatican.va, documentos do concílio"],
  },
];

export function concilioPorSlug(slug: string): Concilio | undefined {
  return CONCILIOS.find((c) => c.slug === slug);
}
