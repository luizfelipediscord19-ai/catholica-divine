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
  {
    slug: "santa-teresinha",
    titulo: "Novena a Santa Teresinha do Menino Jesus",
    ocasiao: "Doutora da Igreja, patrona das missões — 1º de outubro",
    resumo:
      "Nove dias no 'pequeno caminho' de confiança e amor ensinado por Santa Teresa de Lisieux (1873-1897), Doutora da Igreja em 1997.",
    oracaoInicial:
      "Ó Santa Teresinha do Menino Jesus, que prometestes passar o vosso Céu fazendo o bem sobre a terra e derramar uma chuva de rosas, confiante recorro a vós nesta novena para pedir a graça de que necessito.",
    oracaoFinal:
      "Concedei-me, ó pequena Santa, a simplicidade das crianças de Deus, para que eu viva cada instante com grande amor e absoluta confiança na Providência. Amém.",
    dias: [
      { dia: 1, titulo: "A infância espiritual", meditacao: "Teresinha descobriu que a santidade não exige grandes feitos, mas amor em tudo o que se faz. Peçamos a graça de viver como filhos pequenos diante do Pai, sem orgulho nem desânimo. Que aprendamos a confiar mesmo quando nos sentimos fracos." },
      { dia: 2, titulo: "O amor às pequenas coisas", meditacao: "Ela ensinou que um sorriso, um gesto de paciência ou uma oração breve, feitos com amor, têm valor imenso aos olhos de Deus. Examinemos hoje como vivemos as tarefas ordinárias. Peçamos a graça de fazer tudo com amor extraordinário." },
      { dia: 3, titulo: "A confiança abandonada", meditacao: "Teresinha se lançava nos braços de Deus como uma criança nos braços do pai, certa de ser amada apesar das próprias fraquezas. Confiemos hoje as nossas fraquezas e pecados à misericórdia divina. Não há queda que a confiança não converta em graça." },
      { dia: 4, titulo: "O caminho de humildade", meditacao: "Ela nunca buscou reconhecimento; escondeu-se no Carmelo e viveu despercebida. Peçamos a graça de servir sem precisar ser vistos ou elogiados. A verdadeira grandeza está no oculto diante de Deus." },
      { dia: 5, titulo: "O amor às missões", meditacao: "Apesar de nunca ter saído do convento, Teresinha é padroeira das missões, pois ofereceu suas orações e sofrimentos pelos missionários do mundo inteiro. Rezemos hoje por quem anuncia o Evangelho em terras distantes. Ofereçamos nossos pequenos sacrifícios por essa causa." },
      { dia: 6, titulo: "O sofrimento oferecido", meditacao: "Ela atravessou a noite escura da fé e a doença terrível sem perder a confiança em Deus. Ofereçamos as nossas próprias dores unidas às dela, sem murmuração. O sofrimento aceito com amor se torna fecundo." },
      { dia: 7, titulo: "O amor fraterno", meditacao: "Teresinha se esforçava para amar até as irmãs mais difíceis de sua comunidade, vendo Cristo em cada uma. Peçamos a graça de amar concretamente quem nos é difícil de suportar. O amor verdadeiro se mede nas relações mais custosas." },
      { dia: 8, titulo: "A chuva de rosas", meditacao: "Antes de morrer, ela prometeu continuar fazendo o bem do Céu, intercedendo por quantos a invocassem. Confiemos hoje as nossas intenções mais urgentes a essa promessa. Pedimos um sinal de sua intercessão maternal." },
      { dia: 9, titulo: "A pequena via da santidade", meditacao: "Ao final da novena, renovemos o propósito de trilhar o pequeno caminho: humildade, confiança e amor nas coisas de cada dia. Que Deus nos conceda perseverar nesse caminho até o fim. Santa Teresinha, rogai por nós." },
    ],
    fonte: "Autobiografia 'História de uma Alma' (1898)",
  },
  {
    slug: "divina-misericordia",
    titulo: "Novena à Divina Misericórdia",
    ocasiao: "Da Sexta-feira Santa até o Domingo da Divina Misericórdia",
    resumo:
      "Ditada por Jesus a Santa Faustina Kowalska, esta novena confia à misericórdia divina categorias específicas de almas a cada dia.",
    oracaoInicial:
      "Jesus, em Vós confio! Ó Divina Misericórdia, fonte inesgotável de bondade, derramai sobre nós e sobre o mundo inteiro as vossas graças nestes nove dias de preparação.",
    oracaoFinal:
      "Coroa de misericórdias infinitas, Coração de Jesus, aceitai a nossa oferta de confiança e concedei ao mundo a paz que só Vós podeis dar. Amém.",
    dias: [
      { dia: 1, titulo: "Toda a humanidade, especialmente os pecadores", meditacao: "Jesus pediu que hoje fossem trazidos ao seu Coração todos os homens, mas de modo especial os pecadores. Nenhuma alma está fora do alcance da misericórdia divina. Confiemos ao Senhor todos os que ainda estão longe dEle." },
      { dia: 2, titulo: "As almas dos sacerdotes e religiosos", meditacao: "Pedimos hoje força e santidade para os ministros da Igreja, que tanto precisam de nossa oração. Que sejam instrumentos fiéis da misericórdia que anunciam. Rezemos também pelas vocações consagradas." },
      { dia: 3, titulo: "As almas fervorosas e fiéis", meditacao: "Hoje confiamos ao Senhor os que se esforçam por viver com fidelidade o Evangelho. Que perseverem no bem e sejam luz para os que hesitam. Peçamos perseverança final para eles e para nós." },
      { dia: 4, titulo: "Os que não creem em Deus e os pagãos", meditacao: "Jesus pediu oração pelos que ainda não O conhecem, para que a luz de sua graça os alcance. Nenhuma indiferença é maior que a misericórdia divina. Roguemos pela conversão de quantos buscam sem saber o que buscam." },
      { dia: 5, titulo: "As almas separadas da Igreja", meditacao: "Confiemos hoje os irmãos separados pela divisão histórica dos cristãos, pedindo a unidade que Cristo quis para todos. Que a misericórdia una o que o pecado dividiu. Rezemos pela plena comunhão de todos os batizados." },
      { dia: 6, titulo: "As crianças e os mansos de coração", meditacao: "Jesus disse que estas almas são as mais próximas do seu Coração pela simplicidade e confiança. Peçamos hoje pela infância inocente e por quantos vivem com pureza de coração. Que aprendamos com elas a confiar sem reservas." },
      { dia: 7, titulo: "Os devotos e apóstolos da misericórdia", meditacao: "Confiamos hoje a Deus todos os que se dedicam a espalhar esta devoção pelo mundo. Que sejam instrumentos de consolo para muitas almas. Que nós mesmos nos tornemos apóstolos concretos da misericórdia recebida." },
      { dia: 8, titulo: "As almas do purgatório", meditacao: "Pedimos hoje alívio e libertação para as almas que ainda se purificam antes de ver a Deus face a face. Nossas orações e sacrifícios podem abreviar sua espera. Que a misericórdia as introduza logo na glória eterna." },
      { dia: 9, titulo: "As almas mornas e tíbias", meditacao: "Jesus pediu compaixão especial para as almas indiferentes, que O feriram mais que os próprios pecadores por sua frieza. Confiemos hoje quem perdeu o entusiasmo da fé. Que o fogo da misericórdia reacenda corações apagados." },
    ],
    fonte: "Diário de Santa Faustina Kowalska, nn. 1210-1229",
  },
  {
    slug: "sao-judas-tadeu",
    titulo: "Novena a São Judas Tadeu",
    ocasiao: "Apóstolo das causas difíceis e desesperadas — 28 de outubro",
    resumo:
      "Devoção secular ao apóstolo primo de Jesus, invocado nas situações que parecem humanamente sem solução.",
    oracaoInicial:
      "Glorioso São Judas Tadeu, fiel servo e amigo de Jesus, apóstolo e mártir, a Igreja vos honra e invoca universalmente como padroeiro das causas difíceis e quase desesperadas. Rogai por mim.",
    oracaoFinal:
      "Que eu jamais separe minha confiança em vossa intercessão da confiança na vontade de Deus, único que sabe o que verdadeiramente me convém. Amém.",
    dias: [
      { dia: 1, titulo: "Chamado por Jesus", meditacao: "Judas Tadeu foi um dos doze escolhidos por Cristo, homem comum transformado pelo convívio com o Mestre. Peçamos a graça de nos deixar transformar também pela proximidade com Jesus. Nenhuma vocação é pequena diante de Deus." },
      { dia: 2, titulo: "A pergunta no Cenáculo", meditacao: "No Evangelho, Judas pergunta a Jesus por que Ele se manifestaria aos discípulos e não ao mundo (Jo 14,22). Jesus responde que vem habitar em quem O ama e guarda sua palavra. Peçamos esse mesmo desejo de intimidade com Deus." },
      { dia: 3, titulo: "Uma causa aparentemente perdida", meditacao: "Apresentemos hoje, com confiança e sem ansiedade, a necessidade que nos trouxe a esta novena. Nada é impossível para Deus, ainda que pareça sem saída aos nossos olhos. São Judas, intercedei por nós." },
      { dia: 4, titulo: "A fidelidade até o martírio", meditacao: "A tradição narra que Judas Tadeu pregou o Evangelho até derramar o sangue por Cristo. Peçamos a graça de perseverar na fé mesmo diante das dificuldades da vida. A fidelidade nas pequenas provações prepara a fidelidade nas grandes." },
      { dia: 5, titulo: "Confiança na Providência", meditacao: "Muitos recorrem a este santo justamente quando todos os recursos humanos parecem esgotados. Que a nossa oração não seja desespero, mas confiança madura na Providência. Deus nunca chega tarde." },
      { dia: 6, titulo: "A intercessão dos santos", meditacao: "A Igreja crê que os santos, vivos em Cristo, continuam a interceder por nós junto ao Pai. Agradeçamos hoje a comunhão que nos une aos que já venceram. São Judas, apresentai a Deus a nossa súplica." },
      { dia: 7, titulo: "Paciência na espera", meditacao: "Muitas graças não chegam no tempo que esperamos, mas no tempo que Deus sabe ser o melhor. Peçamos paciência para continuar confiando enquanto aguardamos a resposta. A espera também é oração." },
      { dia: 8, titulo: "Gratidão antecipada", meditacao: "Agradeçamos hoje, de antemão, pela certeza de que Deus ouve toda oração feita com fé. Mesmo quando a resposta não é a que esperávamos, algo de bom sempre floresce da confiança. Louvado seja Deus em todas as coisas." },
      { dia: 9, titulo: "Compromisso de divulgar a graça", meditacao: "Concluindo a novena, comprometamo-nos, se a graça for alcançada, a tornar pública a bondade de Deus e a intercessão de São Judas. Que nossa vida seja também testemunho de confiança para outros. São Judas Tadeu, rogai por nós." },
    ],
    fonte: "Tradição popular; Martirológio Romano, 28 de outubro",
  },
  {
    slug: "perpetuo-socorro",
    titulo: "Novena a Nossa Senhora do Perpétuo Socorro",
    ocasiao: "Ícone bizantino confiado aos Redentoristas em 1866",
    resumo:
      "Devoção baseada no ícone que retrata Maria mostrando ao Menino os instrumentos da Paixão, símbolo do socorro constante nas provações.",
    oracaoInicial:
      "Ó Mãe do Perpétuo Socorro, com grande confiança venho à vossa presença, certo de que quem recorre a vós jamais é desamparado. Alcançai-me a graça que peço nesta novena.",
    oracaoFinal:
      "Mãe do Perpétuo Socorro, fazei que eu viva sempre sob vosso manto e que, na hora da minha morte, receba de vossas mãos o socorro final. Amém.",
    dias: [
      { dia: 1, titulo: "Maria, Socorro constante", meditacao: "O ícone mostra Maria olhando para nós enquanto o Menino se agarra à sua mão, temendo os instrumentos da Paixão. Ela nos ensina que o socorro materno nunca cessa, mesmo diante do sofrimento anunciado. Confiemos-lhe as nossas próprias aflições." },
      { dia: 2, titulo: "A fé diante do temor", meditacao: "O Menino Jesus, no ícone, olha assustado para o anjo com a cruz, mas segura-se firme à mão de Maria. Aprendamos que o medo não anula a fé quando há a quem se agarrar. Peçamos essa mesma firmeza nas nossas provações." },
      { dia: 3, titulo: "Maria e os instrumentos da Paixão", meditacao: "Os anjos apresentam a lança, a cruz e a esponja: Maria conhece de perto o preço da nossa redenção. Ela pode compreender as nossas dores porque as viveu junto ao Filho. Recorramos a ela sem receio, como a quem já sofreu." },
      { dia: 4, titulo: "A confiança dos que sofrem", meditacao: "Milhões de fiéis, ao longo dos séculos, encontraram consolo diante desta imagem em momentos de doença, guerra e perseguição. Unamo-nos a essa multidão de suplicantes. O socorro de Maria não tem limite de tempo nem de lugar." },
      { dia: 5, titulo: "Perpétuo, não ocasional", meditacao: "O título 'Perpétuo Socorro' lembra que a ajuda de Maria não é esporádica, mas constante em toda a vida do cristão. Reconheçamos hoje os momentos em que já fomos socorridos sem perceber. Agradeçamos por essa proteção silenciosa." },
      { dia: 6, titulo: "Maria e a Igreja perseguida", meditacao: "O ícone atravessou séculos de guerras e mudanças, sempre venerado como sinal de esperança para a Igreja em dificuldade. Peçamos hoje por cristãos perseguidos em todo o mundo. Que encontrem na Mãe o socorro que os homens lhes negam." },
      { dia: 7, titulo: "Refúgio dos pecadores", meditacao: "Maria não intercede apenas pelos justos, mas principalmente por aqueles que mais precisam de conversão. Confiemos-lhe hoje as almas mais distantes de Deus que conhecemos. Que ela as conduza de volta ao Filho." },
      { dia: 8, titulo: "A imitação de Maria", meditacao: "Antes de pedir seu socorro, aprendamos a imitar sua disponibilidade: 'Faça-se em mim segundo a vossa palavra'. Que a nossa oração não seja só pedido, mas também entrega. Maria nos ensina o caminho da confiança ativa." },
      { dia: 9, titulo: "Gratidão final", meditacao: "Ao encerrar esta novena, agradeçamos por todas as graças já recebidas por intercessão da Mãe do Perpétuo Socorro. Renovemos nossa consagração a ela e nosso compromisso de recorrer sempre à sua proteção. Mãe do Perpétuo Socorro, rogai por nós." },
    ],
    fonte: "Tradição dos Padres Redentoristas, Basílica de Sant'Alfonso (Roma)",
  },
  {
    slug: "almas-do-purgatorio",
    titulo: "Novena pelas Almas do Purgatório",
    ocasiao: "Mês de novembro — comemoração dos fiéis defuntos",
    resumo:
      "Novena de sufrágio pelas almas que ainda se purificam antes de contemplar Deus face a face, exercício concreto da comunhão dos santos.",
    oracaoInicial:
      "Ó Deus de infinita misericórdia, atendei as nossas orações em favor das almas dos vossos servos e servas, para que, purificadas de toda mancha, entrem na posse da luz eterna.",
    oracaoFinal:
      "Dai-lhes, Senhor, o descanso eterno, e brilhe para eles a luz perpétua. Descansem em paz. Amém.",
    dias: [
      { dia: 1, titulo: "A realidade do Purgatório", meditacao: "A Igreja ensina que muitas almas partem em graça de Deus, mas ainda precisam de purificação antes da visão beatífica. Ofereçamos hoje esta novena por todas elas, sem exceção. Que nenhuma alma seja esquecida em nossas orações." },
      { dia: 2, titulo: "Pelos nossos familiares falecidos", meditacao: "Recordemos hoje especialmente os parentes que já partiram desta vida. A caridade cristã não termina com a morte, mas continua na oração de sufrágio. Que encontrem em nós filhos e amigos fiéis até o fim." },
      { dia: 3, titulo: "Pelas almas mais abandonadas", meditacao: "Existem almas por quem já ninguém reza, esquecidas até da memória dos vivos. Voltemo-nos hoje para elas com especial ternura. Que a nossa oração supra o silêncio dos que as esqueceram." },
      { dia: 4, titulo: "Pelos sacerdotes e religiosos falecidos", meditacao: "Aqueles que nos serviram na fé também precisam de nossa oração de gratidão. Rezemos por todos os que anunciaram o Evangelho e hoje aguardam a plenitude da glória. Que colham o fruto do bem que semearam." },
      { dia: 5, titulo: "Pelas vítimas de acidentes e tragédias", meditacao: "Muitas almas partiram de modo súbito, sem tempo de preparação consciente. Confiemo-las à misericórdia infinita de Deus, que conhece o segredo dos corações. Nenhuma morte surpreende ao Senhor da vida." },
      { dia: 6, titulo: "Pela conversão e paciência", meditacao: "As almas do Purgatório já não podem merecer por si mesmas; dependem inteiramente da caridade dos que ainda vivem. Ofereçamos hoje um sacrifício concreto por elas. Que a nossa generosidade abrevie sua purificação." },
      { dia: 7, titulo: "Pela alegria da comunhão dos santos", meditacao: "A Igreja é uma só realidade viva: militante na terra, sofredora no Purgatório, triunfante no Céu. Alegremo-nos por pertencer a essa grande família espiritual. Nossa oração de hoje une essas três Igrejas em um só amor." },
      { dia: 8, titulo: "Pelas almas mais próximas da glória", meditacao: "Algumas almas estão prestes a concluir sua purificação; que nossa oração de hoje seja o último impulso de caridade que as introduza no Céu. Cada oração conta diante de Deus. Nada do bem que fazemos se perde." },
      { dia: 9, titulo: "Encerramento em esperança", meditacao: "Concluímos esta novena confiantes de que a misericórdia de Deus é maior que qualquer purificação necessária. Continuemos a rezar pelos defuntos ao longo de todo o ano, não somente em novembro. Que um dia todos nos reencontremos na luz eterna." },
    ],
    fonte: "CIC §§ 1030-1032; Trento, Sessão XXV (DH 1820)",
  },
];
