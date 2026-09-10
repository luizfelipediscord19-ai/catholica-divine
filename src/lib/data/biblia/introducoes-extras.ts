// Detalhes acrescentados às introduções bíblicas: divisão interna do livro,
// uso litúrgico e dificuldades de leitura.
//
// VERACIDADE: a divisão em blocos e o uso litúrgico são dados verificáveis
// (Lecionário Romano, Liturgia das Horas, Neo-Vulgata como referência de
// numeração). As notas de dificuldade seguem Dei Verbum 11-13 e o CIC
// §§ 105-119; nenhuma tradução protegida é reproduzida.

import type { Introducao } from "./introducoes";

export const DETALHES_LIVROS: Record<string, Partial<Introducao>> = {
  genesis: {
    estrutura: [
      "1–11: origens — criação, queda, dilúvio, Babel",
      "12–25: Abraão e a promessa",
      "25–36: Isaac e Jacó",
      "37–50: José no Egito",
    ],
    liturgia:
      "Lido na Vigília Pascal (criação e sacrifício de Isaac), nas primeiras semanas da Quaresma e no tempo comum do ano ímpar.",
    dificuldades: [
      "Os onze primeiros capítulos usam linguagem figurada para afirmar verdades reais: Deus criou tudo do nada, o homem é imagem de Deus, o pecado é escolha humana. A Igreja não exige leitura literal dos seis dias.",
      "A poligamia e a violência dos patriarcas são narradas, não aprovadas: a Escritura descreve um povo em formação, pedagogicamente conduzido.",
    ],
  },
  exodo: {
    estrutura: [
      "1–15: opressão e libertação, até a passagem do mar",
      "16–18: caminhada no deserto",
      "19–24: aliança e Decálogo no Sinai",
      "25–40: culto, bezerro de ouro, renovação da aliança",
    ],
    liturgia:
      "Segunda leitura da Vigília Pascal (passagem do mar); presente na Quaresma e no tempo comum; o Decálogo é lido no terceiro domingo da Quaresma do ano B.",
    dificuldades: [
      "As pragas devem ser lidas como confronto teológico entre o Deus da aliança e as divindades egípcias, gênero épico próprio da narrativa de libertação.",
      "As leis rituais dos capítulos finais foram cumpridas e superadas em Cristo, único e definitivo sacerdote (Hb 9).",
    ],
  },
  salmos: {
    estrutura: [
      "Cinco livros: 1–41, 42–72, 73–89, 90–106, 107–150",
      "Gêneros: hinos, lamentações, ações de graças, salmos régios e sapienciais",
      "Coleções internas: subidas (120–134), aleluiáticos (146–150)",
    ],
    liturgia:
      "Coluna da Liturgia das Horas, rezada diariamente pela Igreja, e salmo responsorial de toda Missa. A numeração pode variar em uma unidade entre a tradição hebraica e a grega/latina.",
    dificuldades: [
      "Os salmos imprecatórios, que pedem a ruína dos inimigos, expressam de modo cru a revolta humana diante do mal; a Igreja os reza referindo-os ao combate contra o pecado, e alguns são omitidos no Ofício.",
      "A ausência de esperança clara na vida eterna em salmos antigos reflete a etapa da Revelação em que foram compostos.",
    ],
  },
  jo: {
    estrutura: [
      "1–2: prólogo em prosa, a aposta e a provação",
      "3–31: diálogos com os três amigos",
      "32–37: discursos de Eliú",
      "38–42: resposta de Deus e epílogo",
    ],
    liturgia:
      "Lido no tempo comum e nas exéquias; o versículo sobre o Redentor que vive (19,25) entrou na liturgia dos defuntos.",
    dificuldades: [
      "O livro não explica o sofrimento do justo: recusa as respostas fáceis dos amigos e conduz ao encontro com Deus, que responde revelando-se em vez de argumentar.",
      "As falas dos amigos de Jó estão na Escritura como discurso errado registrado, e não como ensinamento aprovado.",
    ],
  },
  isaias: {
    estrutura: [
      "1–39: Isaías de Jerusalém, séc. VIII a.C.",
      "40–55: Livro da consolação, do tempo do exílio",
      "56–66: oráculos do retorno",
    ],
    liturgia:
      "É o profeta do Advento e do Natal, e os quatro cânticos do Servo estruturam a Semana Santa; o quarto cântico é lido na Sexta-feira Santa.",
    dificuldades: [
      "A crítica reconhece três blocos de composição; isso não fere a inspiração, porque Deus se serviu de autores e de uma tradição viva.",
      "A profecia da virgem que concebe (7,14) é lida pelo Novo Testamento em sentido pleno, cumprido em Maria, sem anular seu significado imediato para o rei Acaz.",
    ],
  },
  mateus: {
    estrutura: [
      "1–2: infância de Jesus",
      "3–7: início do ministério e Sermão da Montanha",
      "8–18: milagres, missão dos discípulos, parábolas do Reino",
      "19–25: subida a Jerusalém e discurso final",
      "26–28: paixão, morte e ressurreição",
    ],
    liturgia:
      "Evangelho do ano A do ciclo dominical; o Sermão da Montanha é lido nas primeiras semanas do tempo comum.",
    dificuldades: [
      "As duras invectivas contra escribas e fariseus refletem uma polêmica interna ao judaísmo do primeiro século e não autorizam nenhuma hostilidade contra o povo judeu, como a Igreja declarou expressamente.",
      "As duas genealogias de Jesus, em Mateus e Lucas, seguem intenções teológicas distintas — Mateus parte de Abraão, Lucas chega a Adão.",
    ],
  },
  marcos: {
    estrutura: [
      "1–8: ministério na Galileia e a pergunta sobre quem Jesus é",
      "8–10: caminho para Jerusalém e três anúncios da Paixão",
      "11–16: Jerusalém, paixão e ressurreição",
    ],
    liturgia: "Evangelho do ano B do ciclo dominical; é o mais antigo dos quatro, escrito por volta de 65-70.",
    dificuldades: [
      "O chamado segredo messiânico — Jesus pede silêncio sobre sua identidade — protege a revelação de um messianismo político; só sob a cruz um homem o confessa Filho de Deus.",
      "O final longo (16,9-20) tem atestação textual mais fraca, mas é canônico e inspirado, como confirmou o Concílio de Trento.",
    ],
  },
  lucas: {
    estrutura: [
      "1–2: infância de João Batista e de Jesus",
      "3–9: ministério na Galileia",
      "9–19: grande viagem a Jerusalém, exclusiva de Lucas",
      "19–24: Jerusalém, paixão, ressurreição e Emaús",
    ],
    liturgia:
      "Evangelho do ano C; fornece os cânticos diários da Liturgia das Horas — Benedictus, Magnificat e Nunc dimittis.",
    dificuldades: [
      "O recenseamento de Quirino (2,2) apresenta dificuldade cronológica discutida por historiadores; o dado essencial é teológico: Jesus nasce dentro da história concreta.",
      "A insistência de Lucas sobre a pobreza não é ideologia, mas anúncio da predileção de Deus pelos pequenos.",
    ],
  },
  joao: {
    estrutura: [
      "1,1-18: prólogo do Verbo",
      "1–12: livro dos sinais",
      "13–17: última ceia e discurso de despedida",
      "18–21: paixão, ressurreição e aparições",
    ],
    liturgia:
      "Lido intensamente na Quaresma, na Semana Santa e no tempo pascal; o prólogo é o Evangelho da Missa do dia de Natal.",
    dificuldades: [
      "A expressão 'os judeus' designa, no quarto Evangelho, sobretudo as autoridades hostis de Jerusalém; lê-la como acusação a um povo é contrário à fé católica.",
      "A cronologia da Páscoa difere dos sinóticos por opção teológica: Jesus morre quando os cordeiros são imolados no templo.",
    ],
  },
  atos: {
    estrutura: [
      "1–7: Igreja de Jerusalém e Pentecostes",
      "8–12: abertura à Samaria e aos pagãos",
      "13–20: viagens missionárias de Paulo",
      "21–28: prisão e chegada a Roma",
    ],
    liturgia: "Primeira leitura de todo o tempo pascal, do domingo de Páscoa a Pentecostes.",
    dificuldades: [
      "Os discursos são sínteses redigidas pelo autor conforme a prática historiográfica antiga, fiéis ao conteúdo pregado.",
      "A comunhão de bens dos primeiros capítulos é apresentada como testemunho de caridade livre, não como sistema econômico normativo.",
    ],
  },
  romanos: {
    estrutura: [
      "1–4: todos, judeus e gregos, precisam da salvação; a justificação pela fé",
      "5–8: vida nova no Espírito",
      "9–11: o mistério de Israel",
      "12–16: exortações concretas",
    ],
    liturgia: "Lida no tempo comum dos anos ímpares e em grande parte da Quaresma e do tempo pascal do ano A.",
    dificuldades: [
      "A justificação pela fé, em Paulo, não exclui as obras da caridade: o mesmo apóstolo afirma que a fé age pelo amor (Gl 5,6), e Trento precisou o sentido católico.",
      "Os capítulos sobre a predestinação afirmam a primazia absoluta da graça, não uma condenação decidida de antemão: Deus quer que todos se salvem (1Tm 2,4).",
    ],
  },
  apocalipse: {
    estrutura: [
      "1–3: cartas às sete Igrejas da Ásia",
      "4–11: os selos e as trombetas",
      "12–20: a Mulher, a Besta e o julgamento",
      "21–22: Jerusalém nova",
    ],
    liturgia:
      "Lido no fim do ano litúrgico e no tempo pascal; muitos de seus cânticos entraram nas Vésperas.",
    dificuldades: [
      "Não é um calendário de eventos futuros: é literatura apocalíptica, escrita para sustentar cristãos perseguidos no fim do século I, com símbolos decifráveis a partir do Antigo Testamento.",
      "Os números são simbólicos — sete indica plenitude, mil indica duração indeterminada. A Igreja rejeitou o milenarismo que espera um reinado terreno de mil anos.",
    ],
  },
};

export function comDetalhes(slug: string, intro: Introducao): Introducao {
  const extra = DETALHES_LIVROS[slug];
  return extra ? { ...intro, ...extra } : intro;
}
