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
  {
    slug: "nossa-senhora-de-fatima",
    titulo: "Novena a Nossa Senhora de Fátima",
    ocasiao: "Aparições de Fátima (1917) — 13 de maio e 13 de outubro",
    resumo:
      "Nove dias em memória das aparições de Nossa Senhora aos três pastorinhos em Fátima, pedindo conversão, penitência e paz para o mundo.",
    oracaoInicial:
      "Ó Nossa Senhora do Rosário de Fátima, que viestes do Céu para chamar os homens à conversão, à penitência e à oração do Rosário, escutai a nossa súplica confiante nesta novena.",
    oracaoFinal:
      "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do Inferno, levai as almas todas para o Céu, e socorrei principalmente as que mais precisarem, por intercessão de Nossa Senhora de Fátima. Amém.",
    dias: [
      { dia: 1, titulo: "A aparição na Cova da Iria", meditacao: "Em 13 de maio de 1917, uma Senhora vestida de branco apareceu a três crianças pastoras em Fátima, dizendo vir do Céu. Peçamos hoje a simplicidade de coração dos pastorinhos para acolher a mensagem de Deus. Que não desprezemos os sinais que o Senhor nos envia." },
      { dia: 2, titulo: "O chamado à conversão", meditacao: "Nossa Senhora pediu insistentemente que os homens deixassem de ofender a Deus, já tão ofendido. Examinemos hoje nossa própria vida e os pecados que ainda nos afastam do Senhor. Que este exame nos leve a um propósito sincero de mudança." },
      { dia: 3, titulo: "A oração do terço", meditacao: "Em todas as aparições, Maria pediu a reza diária do Rosário pela paz do mundo. Comprometamo-nos hoje a rezar o terço com mais fervor e constância. Essa oração simples é arma poderosa contra o mal." },
      { dia: 4, titulo: "A penitência pelos pecadores", meditacao: "Os pastorinhos ofereceram pequenos sacrifícios pela conversão dos pecadores, unindo-os à Paixão de Cristo. Ofereçamos hoje também alguma renúncia concreta por quem está longe de Deus. Nenhum sacrifício feito com amor é inútil." },
      { dia: 5, titulo: "A visão do inferno", meditacao: "Aos pastorinhos foi mostrada a realidade terrível da perdição eterna, para que rezassem pela salvação das almas. Que essa verdade nos desperte do adormecimento espiritual. Rezemos hoje especialmente pelos que vivem indiferentes a Deus." },
      { dia: 6, titulo: "A consagração ao Imaculado Coração", meditacao: "Nossa Senhora pediu a consagração do mundo e de cada família ao seu Imaculado Coração como caminho de paz. Renovemos hoje nossa própria consagração pessoal a Maria. Que Ela nos conduza sempre a Jesus." },
      { dia: 7, titulo: "O milagre do sol", meditacao: "Em 13 de outubro de 1917, diante de milhares de pessoas, ocorreu um fenômeno solar extraordinário, testemunhado por crentes e céticos e amplamente entendido como sinal que confirma a credibilidade das aparições — reconhecidas pela Igreja como dignas de fé, sem constituir dogma. Agradeçamos a Deus por sustentar a fé dos simples com sinais visíveis. Que a nossa fé não dependa de milagres, mas se fortaleça neles." },
      { dia: 8, titulo: "O testemunho dos pastorinhos", meditacao: "Francisco, Jacinta e Lúcia viveram com heroica fidelidade a missão recebida, e os dois primeiros foram canonizados por São João Paulo II. Peçamos a graça de sermos fiéis, como eles, à vontade de Deus em nossa vida. Que a santidade infantil nos inspire." },
      { dia: 9, titulo: "A paz prometida por Maria", meditacao: "Nossa Senhora prometeu que, ao final, o seu Imaculado Coração triunfaria e seria concedido um tempo de paz à humanidade. Confiemos ao seu Coração maternal as guerras e sofrimentos do mundo atual. Nossa Senhora de Fátima, rogai por nós." },
    ],
    fonte: "Memórias da Irmã Lúcia de Jesus; Mensagem de Fátima (Santa Sé, 2000)",
  },
  {
    slug: "sao-miguel-arcanjo",
    titulo: "Novena a São Miguel Arcanjo",
    ocasiao: "Príncipe da Milícia Celeste — 29 de setembro",
    resumo:
      "Novena de proteção espiritual invocando São Miguel Arcanjo contra as ciladas e a malícia do demônio, conforme a oração composta por Leão XIII.",
    oracaoInicial:
      "São Miguel Arcanjo, defendei-nos no combate; sede o nosso refúgio contra as maldades e ciladas do demônio. Que Deus vos exorte, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e aos outros espíritos malignos.",
    oracaoFinal:
      "Glorioso Arcanjo São Miguel, ficai sempre a nosso lado nesta vida e assisti-nos na hora da morte, para que, com a vossa ajuda, alcancemos a glória do Paraíso. Amém.",
    dias: [
      { dia: 1, titulo: "Quem como Deus?", meditacao: "O próprio nome Miguel significa 'Quem como Deus?', grito de fidelidade lançado contra a rebelião de Lúcifer no Céu. Peçamos hoje a graça de rejeitar todo orgulho que nos afaste de Deus. Que sua humildade seja também a nossa arma." },
      { dia: 2, titulo: "Príncipe da milícia celeste", meditacao: "A Escritura o apresenta liderando os anjos fiéis na batalha contra o dragão (Ap 12,7-9). Confiemos-lhe hoje as batalhas espirituais que travamos silenciosamente. Nenhuma luta interior escapa ao seu auxílio." },
      { dia: 3, titulo: "Defensor do povo de Deus", meditacao: "No livro de Daniel, Miguel é chamado 'o grande príncipe, que se levanta em defesa dos filhos do teu povo' (Dn 12,1). Peçamos sua proteção sobre a Igreja e sobre nossas famílias. Que ele nos defenda das ciladas visíveis e invisíveis." },
      { dia: 4, titulo: "Guardião das almas na hora da morte", meditacao: "A tradição cristã invoca São Miguel como aquele que conduz as almas dos justos à presença de Deus. Peçamos hoje sua assistência para nossa própria hora final. Que ele nos ajude a perseverar até o fim." },
      { dia: 5, titulo: "Vigilância contra o mal", meditacao: "São Miguel nos ensina que o combate espiritual exige vigilância constante, não apenas oração ocasional. Examinemos hoje as áreas de nossa vida mais expostas à tentação. Peçamos discernimento para reconhecer as astúcias do inimigo." },
      { dia: 6, titulo: "Proteção da Igreja", meditacao: "Desde a Idade Média, São Miguel é invocado como protetor especial da Igreja em tempos de crise e perseguição. Rezemos hoje pela Igreja em todo o mundo, especialmente onde é perseguida. Que ele a defenda das divisões internas e dos ataques externos." },
      { dia: 7, titulo: "A oração de Leão XIII", meditacao: "Impressionado por uma visão da luta futura contra a Igreja, o Papa Leão XIII compôs a célebre oração a São Miguel, rezada por décadas ao final da Missa. Façamos hoje dessa oração nossa arma diária. Que jamais a abandonemos por comodismo." },
      { dia: 8, titulo: "Modelo de obediência", meditacao: "Miguel não age por si mesmo, mas como servo fiel da vontade divina, sempre em nome de Deus. Peçamos a graça de agir com essa mesma submissão humilde ao Senhor. Que nossa vontade se conforme sempre à d'Ele." },
      { dia: 9, titulo: "Vitória final do bem", meditacao: "O Apocalipse revela que, apesar da fúria do dragão, a vitória de Miguel e dos anjos fiéis é certa e definitiva. Confiemos que, unidos a Cristo, também nós participaremos dessa vitória final. São Miguel Arcanjo, defendei-nos sempre no combate." },
    ],
    fonte: "Ap 12,7-9; Dn 12,1; Oração de Leão XIII (1886)",
  },
  {
    slug: "santa-rita-de-cassia",
    titulo: "Novena a Santa Rita de Cássia",
    ocasiao: "Padroeira das causas impossíveis — 22 de maio",
    resumo:
      "Nove dias confiando a Santa Rita de Cássia, esposa, mãe, viúva e religiosa agostiniana, as causas mais difíceis e aparentemente impossíveis.",
    oracaoInicial:
      "Ó gloriosa Santa Rita, que participastes de modo tão admirável dos sofrimentos de Nosso Senhor Jesus Cristo, alcançai-me a graça de suportar com paciência as provações desta vida e de confiar sempre na Providência de Deus.",
    oracaoFinal:
      "Santa Rita, advogada dos impossíveis, alcançai-me de Deus a graça que humildemente vos peço, se ela for para o bem da minha alma e para a glória de Deus. Amém.",
    dias: [
      { dia: 1, titulo: "O casamento difícil", meditacao: "Rita foi dada em casamento a um homem violento e suportou, com paciência e oração, anos de sofrimento conjugal. Peçamos hoje a graça da paciência para quem atravessa dificuldades no matrimônio. Que a conversão, e não o desespero, seja sempre buscada primeiro." },
      { dia: 2, titulo: "A conversão do esposo", meditacao: "Com sua doçura e orações constantes, Rita conseguiu, ao fim, a conversão do marido antes de sua morte violenta. Confiemos hoje à sua intercessão a conversão de pessoas endurecidas que amamos. Nenhum coração está fora do alcance da graça." },
      { dia: 3, titulo: "A dor de mãe", meditacao: "Após perder o esposo, Rita viu seus dois filhos desejarem vingar a morte do pai, e rezou para que Deus os levasse antes de cometerem tal pecado. Confiemos-lhe hoje as intenções dos pais que sofrem pelos filhos. Que ela interceda por famílias marcadas pela violência e pelo luto." },
      { dia: 4, titulo: "A vocação tardia", meditacao: "Viúva e sem família, Rita buscou entrar no convento agostiniano por três vezes, sendo aceita apenas depois de muita insistência. Peçamos perseverança para quem busca uma vocação e encontra portas fechadas. Deus abre caminho para quem confia e persiste." },
      { dia: 5, titulo: "A espinha na fronte", meditacao: "Rita recebeu, em resposta à sua oração diante do crucifixo, uma chaga na testa semelhante à ferida da coroa de espinhos de Cristo, que carregou até a morte. Peçamos a graça de aceitar com fé os sofrimentos que Deus permite em nossa vida. Que saibamos uni-los à Paixão do Senhor." },
      { dia: 6, titulo: "Advogada dos casos impossíveis", meditacao: "Por sua vida marcada por situações humanamente sem solução, Rita tornou-se padroeira de todas as causas tidas por impossíveis. Apresentemos hoje, com confiança, a necessidade que nos trouxe a esta novena. Nada é impossível ao poder de Deus." },
      { dia: 7, titulo: "A rosa do milagre", meditacao: "Conta a tradição que, já enferma, Rita pediu uma rosa fora de época e a recebeu floresceu em pleno inverno, sinal do poder de Deus manifestado por sua intercessão. Confiemos que os sinais de Deus chegam no tempo certo, ainda que pareça impossível. Que aprendamos a esperar com fé." },
      { dia: 8, titulo: "A paciência nas provações finais", meditacao: "Rita suportou anos de doença e sofrimento físico antes de sua morte, sem jamais perder a paz interior. Peçamos essa mesma serenidade diante das provações da saúde e da velhice. Que o sofrimento não nos afaste, mas nos aproxime de Deus." },
      { dia: 9, titulo: "Modelo para todos os estados de vida", meditacao: "Rita viveu como esposa, mãe, viúva e religiosa, santificando cada etapa de sua vida com fidelidade a Deus. Que ela nos ensine a buscar a santidade no estado de vida em que hoje nos encontramos. Santa Rita de Cássia, advogada dos impossíveis, rogai por nós." },
    ],
    fonte: "Processo de canonização (Leão XIII, 1900); tradição agostiniana",
  },
];
