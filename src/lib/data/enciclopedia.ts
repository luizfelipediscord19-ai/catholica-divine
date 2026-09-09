export type VerbeteEnciclopedia = {
  slug: string;
  termo: string;
  categoria: "Doutrina" | "Escritura" | "Liturgia" | "Vida espiritual";
  sintese: string;
  referencias: string[];
  relacionados: string[];
};

/**
 * Sínteses editoriais próprias. As referências indicam onde conferir a doutrina
 * no Catecismo e na Escritura; nenhuma tradução moderna protegida é reproduzida.
 */
export const VERBETES_ENCICLOPEDIA: VerbeteEnciclopedia[] = [
  {
    slug: "eucaristia",
    termo: "Eucaristia",
    categoria: "Liturgia",
    sintese:
      "Sacramento no qual Cristo se torna verdadeira, real e substancialmente presente sob as espécies do pão e do vinho. É memorial sacramental do sacrifício pascal, comunhão com Cristo e princípio de unidade da Igreja.",
    referencias: ["CIC §§ 1322–1419", "1Cor 10,16–17", "1Cor 11,23–29"],
    relacionados: ["transubstanciacao", "sacramentos", "missa"],
  },
  {
    slug: "trindade",
    termo: "Santíssima Trindade",
    categoria: "Doutrina",
    sintese:
      "Mistério central da fé cristã: há um só Deus em três Pessoas realmente distintas — Pai, Filho e Espírito Santo — que possuem a mesma e única natureza divina.",
    referencias: ["CIC §§ 232–267", "Mt 28,19", "2Cor 13,13"],
    relacionados: ["encarnacao", "espirito-santo", "credo"],
  },
  {
    slug: "tradicao-apostolica",
    termo: "Tradição Apostólica",
    categoria: "Doutrina",
    sintese:
      "Transmissão viva do Evangelho recebido dos Apóstolos, realizada na pregação, na vida, no culto e nas instituições da Igreja. Com a Sagrada Escritura, forma um único depósito da Palavra de Deus.",
    referencias: ["CIC §§ 74–100", "Dei Verbum 7–10", "2Ts 2,15"],
    relacionados: ["magisterio", "sagrada-escritura", "sucessao-apostolica"],
  },
  {
    slug: "magisterio",
    termo: "Magistério",
    categoria: "Doutrina",
    sintese:
      "Ofício de interpretar autenticamente a Palavra de Deus, confiado ao Papa e aos bispos em comunhão com ele. O Magistério não está acima da Palavra, mas a serve, escuta, guarda e expõe fielmente.",
    referencias: ["CIC §§ 85–95", "Dei Verbum 10", "Lumen Gentium 25"],
    relacionados: ["tradicao-apostolica", "infalibilidade", "concilio-ecumenico"],
  },
  {
    slug: "graca",
    termo: "Graça",
    categoria: "Vida espiritual",
    sintese:
      "Dom gratuito pelo qual Deus comunica sua vida e torna a pessoa capaz de responder ao seu chamado. A graça santificante é participação estável na vida divina; graças atuais auxiliam em atos concretos.",
    referencias: ["CIC §§ 1996–2029", "Jo 1,16–17", "Ef 2,8–10"],
    relacionados: ["justificacao", "sacramentos", "virtudes-teologais"],
  },
  {
    slug: "justificacao",
    termo: "Justificação",
    categoria: "Doutrina",
    sintese:
      "Ação misericordiosa de Deus que perdoa o pecado, renova interiormente a pessoa e a torna justa pela graça de Cristo. É recebida na fé e no Batismo e chama à cooperação livre com a graça.",
    referencias: ["CIC §§ 1987–1995", "Rm 3,21–26", "Tg 2,14–26"],
    relacionados: ["graca", "batismo", "merito"],
  },
  {
    slug: "comunhao-dos-santos",
    termo: "Comunhão dos Santos",
    categoria: "Doutrina",
    sintese:
      "Comunhão nos bens santos e união, em Cristo, dos fiéis peregrinos, das almas em purificação e dos santos na glória. Essa unidade fundamenta a intercessão e a solidariedade espiritual na Igreja.",
    referencias: ["CIC §§ 946–962", "1Cor 12,12–27", "Hb 12,1"],
    relacionados: ["igreja", "intercessao", "purgatorio"],
  },
  {
    slug: "revelacao",
    termo: "Revelação divina",
    categoria: "Doutrina",
    sintese:
      "Iniciativa livre pela qual Deus se dá a conhecer e manifesta seu desígnio de salvação por atos e palavras. A Revelação pública alcança sua plenitude definitiva em Jesus Cristo.",
    referencias: ["CIC §§ 50–73", "Dei Verbum 2–6", "Hb 1,1–2"],
    relacionados: ["tradicao-apostolica", "sagrada-escritura", "encarnacao"],
  },
  {
    slug: "sagrada-escritura",
    termo: "Sagrada Escritura",
    categoria: "Escritura",
    sintese:
      "Coleção dos livros inspirados reconhecidos pela Igreja. Deus é seu autor principal e os escritores humanos são verdadeiros autores; a interpretação considera o gênero literário, a unidade da Escritura, a Tradição e a analogia da fé.",
    referencias: ["CIC §§ 101–141", "Dei Verbum 11–12", "2Tm 3,16–17"],
    relacionados: ["inspiracao", "canon-biblico", "tradicao-apostolica"],
  },
  {
    slug: "virtudes-teologais",
    termo: "Virtudes teologais",
    categoria: "Vida espiritual",
    sintese:
      "Fé, esperança e caridade são hábitos infundidos por Deus que orientam diretamente a vida cristã para Ele. Informam e vivificam as virtudes morais, sustentando a resposta humana à graça.",
    referencias: ["CIC §§ 1812–1829", "1Cor 13,13", "1Ts 1,3"],
    relacionados: ["graca", "caridade", "virtudes-cardinais"],
  },
  {
    slug: "liturgia",
    termo: "Liturgia",
    categoria: "Liturgia",
    sintese:
      "Exercício do sacerdócio de Cristo no culto público da Igreja. Por sinais sensíveis, especialmente nos sacramentos, a obra da salvação é celebrada e comunicada ao povo de Deus.",
    referencias: ["CIC §§ 1066–1209", "Sacrosanctum Concilium 7", "At 2,42"],
    relacionados: ["eucaristia", "sacramentos", "ano-liturgico"],
  },
  {
    slug: "oracao-crista",
    termo: "Oração cristã",
    categoria: "Vida espiritual",
    sintese:
      "Relação viva dos filhos de Deus com o Pai, por Cristo, no Espírito Santo. Pode assumir as formas de bênção, adoração, pedido, intercessão, ação de graças e louvor.",
    referencias: ["CIC §§ 2558–2865", "Mt 6,5–13", "Rm 8,26–27"],
    relacionados: ["pai-nosso", "liturgia-das-horas", "contemplacao"],
  },
];

export function verbetePorSlug(slug: string): VerbeteEnciclopedia | undefined {
  return VERBETES_ENCICLOPEDIA.find((verbete) => verbete.slug === slug);
}
