// Páginas temáticas de Sacramentos, sacramentais e rituais.
//
// VERACIDADE: sínteses de redação própria, fiéis ao Catecismo, ao Concílio de
// Trento, a Sacrosanctum Concilium, ao Código de Direito Canônico e aos rituais
// oficiais citados. Nenhum texto litúrgico protegido é reproduzido; as
// referências permitem conferir a fonte.

import type { SecaoTema } from "./enciclopedia-temas";

export type TemaSacramental = {
  slug: string;
  nome: string;
  kicker: string;
  resumo: string;
  secoes: SecaoTema[];
  /** Parágrafos do Catecismo abertos por link direto. */
  paragrafosCIC: number[];
  /** Verbetes da Enciclopédia ligados ao tema. */
  verbetes: string[];
};

export const TEMAS_SACRAMENTAIS: TemaSacramental[] = [
  {
    slug: "sacramentais",
    nome: "Sacramentais",
    kicker: "Sacramentalia",
    resumo:
      "Bênçãos, exorcismos, água benta, objetos abençoados: sinais sagrados instituídos pela Igreja que dispõem à graça dos sacramentos, sem serem sacramentos.",
    secoes: [
      {
        id: "o-que-sao",
        titulo: "O que são os sacramentais",
        paragrafos: [
          "Sacramentais são sinais sagrados instituídos pela Igreja — não por Cristo diretamente — para santificar circunstâncias da vida e dispor os fiéis a receber o efeito principal dos sacramentos. A diferença é decisiva: o sacramento age ex opere operato, pela força do próprio rito instituído por Cristo; o sacramental age ex opere operantis Ecclesiae, isto é, pela oração da Igreja e pela disposição de quem o usa.",
          "Daí decorre uma consequência prática que evita superstição: uma medalha, uma água benta ou um escapulário não produzem efeito automático nem funcionam como amuleto. São sinais que suscitam fé, arrependimento e caridade — e é por esse caminho que a graça chega.",
        ],
        pontos: [
          "Instituídos pela Igreja, à imitação dos sacramentos (CIC §§ 1667-1670).",
          "Agem pela oração da Igreja e pela disposição do fiel, não automaticamente.",
          "Usar sacramental como amuleto é superstição, expressamente reprovada (CIC § 2111).",
        ],
        referencias: ["CIC §§ 1667-1679", "Sacrosanctum Concilium 60-61", "CDC, cân. 1166-1172"],
      },
      {
        id: "bencaos",
        titulo: "Bênçãos: quem abençoa e o que se abençoa",
        paragrafos: [
          "A bênção é o sacramental por excelência. Toda bênção é louvor a Deus e pedido de seus dons. O livro litúrgico próprio é o Livro das Bênçãos (De Benedictionibus, 1984), que organiza as fórmulas para pessoas, refeições, objetos, lugares, trabalhos e tempos.",
          "Ministros: algumas bênçãos são reservadas ao bispo — dedicação de igreja e de altar, consagração do santo crisma, bênção de óleos. Outras são próprias do presbítero ou do diácono. Há também bênçãos que qualquer batizado pode fazer, em razão do sacerdócio comum: pais que abençoam filhos, bênção da mesa, oração sobre um doente na família.",
        ],
        pontos: [
          "Livro das Bênçãos (De Benedictionibus, editio typica 1984).",
          "Bênçãos reservadas ao bispo e bênçãos acessíveis a todo batizado (CIC §§ 1669, 1678).",
          "Bênçãos constitutivas dedicam pessoas ou coisas a Deus de modo permanente; invocativas pedem auxílio.",
        ],
        referencias: ["CIC §§ 1671-1679", "CDC, cân. 1168-1169"],
      },
      {
        id: "objetos-e-agua-benta",
        titulo: "Água benta, medalhas, escapulários e imagens",
        paragrafos: [
          "A água benta recorda o Batismo: ao entrar na igreja, o fiel repete o gesto que o inseriu em Cristo. Medalhas, terços, escapulários, crucifixos e imagens são sinais de fé e devoção. Objetos abençoados não se vendem como abençoados, e um objeto perde a bênção se for tratado como mercadoria de poder.",
          "O escapulário do Carmo, por exemplo, é sinal de pertença e compromisso de vida cristã, e não garantia mecânica de salvação — leitura que a própria Ordem do Carmo e o Magistério rejeitam. A honra prestada às imagens vai à pessoa representada, princípio definido pelo II Concílio de Niceia, em 787.",
        ],
        pontos: [
          "A honra à imagem passa ao protótipo (II Niceia, 787; CIC §§ 1159-1162, 2131-2132).",
          "É proibido comerciar com sacramentais como se fossem eficácia garantida (CIC § 2121, simonia).",
          "Devoção verdadeira leva aos sacramentos; devoção supersticiosa afasta deles.",
        ],
        referencias: ["CIC §§ 1159-1162, 1674-1676, 2111, 2131-2132"],
      },
      {
        id: "exorcismos",
        titulo: "Exorcismos: disciplina, prudência e limites",
        paragrafos: [
          "A Igreja distingue exorcismo simples, presente no rito do Batismo e em orações de libertação, e exorcismo maior, ato solene sobre pessoa que se julga possuída. O exorcismo maior só pode ser realizado por presbítero com licença expressa e específica do bispo diocesano, homem de piedade, ciência, prudência e integridade de vida.",
          "Antes do rito, exige-se prudência médica e psicológica: o ritual determina que se distinga possessão de doença. O livro litúrgico é De Exorcismis et Supplicationibus Quibusdam (1999, com edição revista em 2004). Sensacionalismo neste campo é contrário à disciplina da própria Igreja.",
        ],
        pontos: [
          "Exorcismo maior: só presbítero com licença do bispo (CIC § 1673; CDC, cân. 1172).",
          "Ritual próprio: De Exorcismis et Supplicationibus Quibusdam (1999/2004).",
          "Antes de tudo, discernimento clínico — a doença não é possessão.",
        ],
        referencias: ["CIC §§ 1673, 550, 2117", "CDC, cân. 1172"],
      },
      {
        id: "piedade-popular",
        titulo: "Piedade popular e liturgia: como se articulam",
        paragrafos: [
          "Procissões, novenas, terço, via-sacra, romarias e bênçãos de casas formam o que o Magistério chama piedade popular — tesouro real, que expressa a fé de um povo. O Diretório sobre a Piedade Popular e a Liturgia (2002) estabelece o critério: essas práticas devem harmonizar-se com a liturgia, dela derivar e a ela conduzir, sem substituí-la nem competir com ela.",
          "O princípio orientador está em Sacrosanctum Concilium 13: os exercícios de piedade do povo cristão são recomendados, desde que conformes às leis e normas da Igreja, e a liturgia permanece o cume e a fonte.",
        ],
        pontos: [
          "A liturgia é cume e fonte da vida da Igreja (Sacrosanctum Concilium 10).",
          "Piedade popular recomendada, com ordenação à liturgia (Sacrosanctum Concilium 12-13).",
          "Diretório sobre a Piedade Popular e a Liturgia (Congregação para o Culto Divino, 2002).",
        ],
        referencias: ["CIC §§ 1674-1676", "Sacrosanctum Concilium 10-13"],
      },
    ],
    paragrafosCIC: [1667, 1671, 1673, 1674, 2111],
    verbetes: ["sacramentos"],
  },
  {
    slug: "sacramentarios",
    nome: "Sacramentários e livros litúrgicos",
    kicker: "Libri liturgici",
    resumo:
      "Do Sacramentário Veronense ao Missal atual: como os livros da liturgia se formaram, o que cada um contém e por que a Igreja mantém edições típicas.",
    secoes: [
      {
        id: "o-que-e-um-sacramentario",
        titulo: "O que é um sacramentário",
        paragrafos: [
          "Sacramentário é o livro que reúne as orações reservadas a quem preside a celebração — coletas, orações sobre as oferendas, prefácios, orações eucarísticas, orações depois da comunhão. Nos primeiros séculos as leituras estavam em outro livro (lecionário) e os cantos em outro (antifonário ou gradual); o sacramentário não continha, portanto, a celebração inteira.",
          "Com a reforma tridentina do século XVI, esses conteúdos foram reunidos em um único volume, o Missal Romano. A reforma litúrgica pedida pelo Concílio Vaticano II voltou a distribuir o material: Missal para as orações, Lecionário em vários volumes para a Escritura.",
        ],
        pontos: [
          "Sacramentário: orações do presidente; Lecionário: leituras; Gradual: cantos.",
          "O Missal Romano unifica orações e rubricas a partir de 1570 (Pio V).",
          "A reforma pós-conciliar restaura a distinção entre Missal e Lecionário (1969-1970).",
        ],
        referencias: ["CIC §§ 1140-1144, 1200-1206", "Sacrosanctum Concilium 21-25, 35, 51"],
      },
      {
        id: "sacramentarios-antigos",
        titulo: "Os grandes sacramentários antigos",
        paragrafos: [
          "Três coleções romanas antigas são a base do estudo histórico da liturgia latina. O Sacramentário Veronense, chamado tradicionalmente leoniano, é um manuscrito do início do século VII que reúne formulários romanos mais antigos. O Gelasiano antigo, de meados do século VIII, apresenta um material romano adaptado na Gália. O Gregoriano, ligado ao nome de São Gregório Magno, chega a Carlos Magno no fim do século VIII e é adaptado por Alcuíno de York, dando origem ao tipo que dominou o Ocidente.",
          "Nota de honestidade histórica: a atribuição desses livros a Leão Magno e a Gregório Magno é tradicional e parcialmente disputada pelos estudiosos. O que é documentado são os manuscritos e sua difusão, não a autoria pessoal de cada oração.",
        ],
        pontos: [
          "Veronense (Verona, Bibl. Capitolare LXXXV), início do séc. VII.",
          "Gelasiano antigo (Vat. Reg. lat. 316), meados do séc. VIII.",
          "Gregoriano-hadrianum enviado a Carlos Magno, base do Missal medieval.",
        ],
        referencias: ["CIC §§ 1200-1203", "Sacrosanctum Concilium 4, 23"],
      },
      {
        id: "missal-e-lecionario",
        titulo: "Missal Romano e Lecionário hoje",
        paragrafos: [
          "O Missal Romano atual descende da editio typica de 1970, com edições típicas em 1975 e 2002 e reimpressão emendada em 2008. Sua Introdução Geral — Institutio Generalis Missalis Romani — é o texto normativo que explica a estrutura da Missa, os ministérios e as opções rituais.",
          "O Lecionário, promulgado em 1969 e revisado em 1981, distribui a Escritura em ciclo dominical de três anos (A, B, C) e ciclo ferial de dois anos (I e II). Essa é a razão técnica de a Missa dominical apresentar hoje muito mais Escritura do que antes da reforma: uma exigência expressa de Sacrosanctum Concilium 51.",
          "Sobre a forma anterior do rito romano: Bento XVI ampliou seu uso em Summorum Pontificum (2007) e o papa Francisco restringiu-o em Traditionis Custodes (2021), reservando ao bispo diocesano a regulação. Trata-se de disciplina litúrgica, mutável por natureza, e não de doutrina definida.",
        ],
        pontos: [
          "Missal Romano: editio typica 1970; 3ª edição típica 2002 (reimpressão 2008).",
          "Lecionário: ciclo dominical A-B-C e ciclo ferial I-II.",
          "Summorum Pontificum (07.07.2007) e Traditionis Custodes (16.07.2021): disciplina.",
        ],
        referencias: [
          "CIC §§ 1345-1355 (estrutura da celebração)",
          "Sacrosanctum Concilium 50-51",
          "Institutio Generalis Missalis Romani (2002)",
        ],
      },
      {
        id: "outros-livros",
        titulo: "Os demais livros oficiais",
        paragrafos: [
          "Além de Missal e Lecionário, a liturgia romana usa: a Liturgia das Horas em quatro volumes, para a oração do dia; o Pontifical Romano, com os ritos próprios do bispo (ordenações, confirmação, dedicação de igreja); o Ritual Romano, distribuído em volumes por sacramento e por bênção; o Martirológio Romano, catálogo oficial dos santos, cuja edição típica atual é de 2001, com emendas em 2004; e o Cerimonial dos Bispos.",
          "Cada um desses livros existe em uma editio typica latina aprovada pela Santa Sé, da qual as traduções para as línguas vivas são feitas e reconhecidas — norma reafirmada por Liturgiam Authenticam (2001) e ajustada por Magnum Principium (2017), que devolveu maior responsabilidade às conferências episcopais.",
        ],
        pontos: [
          "Liturgia das Horas (1971), Pontifical, Ritual, Martirológio (2001/2004), Cerimonial dos Bispos.",
          "As traduções derivam da editio typica latina e exigem reconhecimento da Santa Sé.",
          "Magnum Principium (03.09.2017) reformou o processo de aprovação de traduções.",
        ],
        referencias: ["CIC §§ 1174-1178, 1200-1209", "Sacrosanctum Concilium 36, 63"],
      },
      {
        id: "ritos-e-familias",
        titulo: "Ritos e famílias litúrgicas: a Igreja não é uniforme",
        paragrafos: [
          "Rito romano não é sinônimo de Igreja Católica. Estão em plena comunhão com Roma 23 Igrejas orientais católicas, cada uma com liturgia, direito e tradição espiritual próprios: bizantina, alexandrina (copta e etíope), siríaca ocidental, siríaca oriental, armênia e maronita.",
          "No Ocidente subsistem também usos particulares, como o rito ambrosiano em Milão, o hispano-mozárabe em Toledo, e os usos de ordens religiosas. O Catecismo afirma expressamente que essa diversidade não fere a unidade, mas a manifesta: a mesma fé, celebrada em culturas diferentes.",
        ],
        pontos: [
          "23 Igrejas orientais católicas em plena comunhão, com ritos próprios (Orientalium Ecclesiarum 2-6).",
          "A diversidade de ritos enriquece e não divide (CIC §§ 1200-1206).",
          "Código dos Cânones das Igrejas Orientais (1990) rege a disciplina oriental.",
        ],
        referencias: ["CIC §§ 1200-1209", "Orientalium Ecclesiarum 1-6", "Lumen Gentium 23"],
      },
    ],
    paragrafosCIC: [1140, 1200, 1345, 1174],
    verbetes: ["missa", "eucaristia"],
  },
  {
    slug: "rituais",
    nome: "Rituais e celebração",
    kicker: "Ordo celebrandi",
    resumo:
      "Como cada sacramento é celebrado na prática: estrutura dos ritos, matéria e forma, ministros, condições de validade e o que muda quando se celebra fora da Missa.",
    secoes: [
      {
        id: "estrutura-comum",
        titulo: "A estrutura comum de todo rito sacramental",
        paragrafos: [
          "Todos os sacramentos seguem uma arquitetura reconhecível: ritos iniciais que reúnem e acolhem, uma liturgia da Palavra, o rito essencial com a matéria e a fórmula sacramental, orações que explicitam o sentido e ritos de conclusão com bênção e envio. Essa ordem não é decoração: mostra que o sacramento nasce da Palavra proclamada e conduz à missão.",
          "A reforma pedida pelo Vaticano II determinou que os ritos fossem revistos para maior clareza e participação, e que cada sacramento tivesse seu ritual próprio publicado com introdução doutrinal — os praenotanda, que explicam a teologia antes das rubricas.",
        ],
        pontos: [
          "Liturgia da Palavra em todo sacramento (Sacrosanctum Concilium 35, 59).",
          "Cada ritual traz praenotanda com fundamentação doutrinal.",
          "A participação ativa e consciente dos fiéis é exigência conciliar (SC 14, 48).",
        ],
        referencias: ["CIC §§ 1145-1162", "Sacrosanctum Concilium 14, 35, 59-63"],
      },
      {
        id: "materia-forma-ministro",
        titulo: "Matéria, forma, ministro e intenção",
        paragrafos: [
          "A teologia escolástica descreve o sinal sacramental por matéria (a realidade sensível), forma (as palavras que a determinam), ministro (quem age validamente) e sujeito (quem recebe, com as disposições requeridas). É categoria explicativa recebida pelo Magistério, e não uma fórmula dogmática única para todos os sacramentos.",
          "Para a validade exige-se ainda a intenção mínima de fazer o que a Igreja faz. Um exemplo recente ilustra a seriedade da forma: em 2020, a Congregação para a Doutrina da Fé declarou inválidos batismos celebrados com a fórmula nós te batizamos, porque quem batiza é Cristo, não a assembleia.",
        ],
        pontos: [
          "Validade exige matéria, forma, ministro capaz e intenção reta (CIC §§ 1127-1128).",
          "Responsa ad dubia sobre a validade do Batismo, CDF, 24.06.2020: fórmula na primeira pessoa do plural é inválida.",
          "Frutuosidade depende da fé e da disposição de quem recebe (CIC § 1128).",
        ],
        referencias: ["CIC §§ 1127-1134", "CDC, cân. 840-848", "Trento, Sessão VII (DH 1600-1613)"],
      },
      {
        id: "rituais-por-sacramento",
        titulo: "Os rituais de cada sacramento",
        paragrafos: [
          "Cada sacramento tem hoje seu livro próprio, em edição típica latina: o Rito da Iniciação Cristã de Adultos (RICA, 1972) e o Rito do Batismo de Crianças (1969); o Ordo Confirmationis (1971), promulgado por Divinae Consortium Naturae; o Ordo Paenitentiae (1973), com três formas de celebração; o Ordo Unctionis Infirmorum (1972); o De Ordinatione Episcopi, Presbyterorum et Diaconorum (2ª edição, 1990); e o Ordo Celebrandi Matrimonium (2ª edição, 1991).",
          "O RICA restaurou o catecumenato antigo em etapas — pré-catecumenato, catecumenato, eleição, purificação e iluminação na Quaresma, sacramentos na Vigília Pascal e mistagogia no tempo pascal. É o modelo que inspira a iniciação de adultos em todo o mundo.",
        ],
        pontos: [
          "Penitência: três formas — individual, comunitária com confissão individual, e geral em casos previstos (CIC §§ 1480-1484).",
          "Iniciação de adultos: as etapas do RICA culminam na Vigília Pascal.",
          "Ordenação: matéria é a imposição das mãos do bispo; forma, a oração consecratória (Sacramentum Ordinis, 1947).",
        ],
        referencias: ["CIC §§ 1229-1245, 1297-1301, 1480-1484, 1517-1519, 1572-1574, 1621-1624"],
      },
      {
        id: "fora-da-missa",
        titulo: "Celebrar dentro ou fora da Missa",
        paragrafos: [
          "Vários sacramentos podem ser celebrados dentro da Missa, e essa é a forma preferida quando possível: confirmação, matrimônio entre católicos, unção comunitária dos enfermos, ordenações. A razão é teológica: todos os sacramentos se ordenam à Eucaristia como ao seu fim.",
          "Há exceções previstas. O matrimônio entre parte católica e parte não batizada celebra-se ordinariamente fora da Missa. A unção de um doente em casa ou no hospital segue o rito breve. A confissão nunca se celebra durante a Oração Eucarística. Em perigo de morte, os ritos são reduzidos ao essencial, e a Igreja prevê o viático — a comunhão dada como alimento para a passagem.",
        ],
        pontos: [
          "Todos os sacramentos se ordenam à Eucaristia (CIC § 1324; Presbyterorum Ordinis 5).",
          "Viático: comunhão do moribundo, sacramento próprio da passagem (CIC §§ 1524-1525).",
          "Em perigo de morte, qualquer sacerdote pode absolver e confirmar (CDC, cân. 883, § 3; 976).",
        ],
        referencias: ["CIC §§ 1321-1327, 1517-1525", "CDC, cân. 883, 976, 1119-1120"],
      },
      {
        id: "abusos-e-fidelidade",
        titulo: "Fidelidade ao rito e limites da criatividade",
        paragrafos: [
          "A liturgia não é propriedade de quem preside. Sacrosanctum Concilium 22 estabelece que a regulação da liturgia depende da autoridade da Igreja e que ninguém, mesmo sacerdote, pode acrescentar, suprimir ou mudar algo por iniciativa própria. A razão é pastoral e não burocrática: o fiel tem direito a receber a liturgia da Igreja, não a versão particular de alguém.",
          "A instrução Redemptionis Sacramentum (2004) elenca abusos concretos e recorda que os fiéis podem apresentar reclamação ao bispo. Ao mesmo tempo, o rito prevê legítima adaptação — escolha de leituras e fórmulas, adaptações culturais aprovadas, acomodação a doentes e a crianças.",
        ],
        pontos: [
          "Ninguém pode mudar a liturgia por iniciativa privada (Sacrosanctum Concilium 22, § 3).",
          "Redemptionis Sacramentum (25.03.2004): abusos e direito de reclamação dos fiéis.",
          "A adaptação legítima está dentro do próprio ritual, com aprovação competente (SC 37-40).",
        ],
        referencias: ["CIC §§ 1125, 1205-1206", "Sacrosanctum Concilium 22, 37-40"],
      },
    ],
    paragrafosCIC: [1127, 1210, 1480, 1517],
    verbetes: ["missa", "sacramentos"],
  },
];

export function temaSacramentalPorSlug(slug: string) {
  return TEMAS_SACRAMENTAIS.find((t) => t.slug === slug);
}
