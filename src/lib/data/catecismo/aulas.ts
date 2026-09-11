// Curso de catecismo em 16 semanas — quatro semanas para cada pilar do
// Catecismo da Igreja Católica (Credo, Sacramentos, Vida em Cristo, Oração).
//
// VERACIDADE: as perguntas e respostas são redação própria do Portal Católico,
// fiéis ao Catecismo e aos documentos citados. Nenhum parágrafo do CIC é
// reproduzido literalmente (a tradução portuguesa é protegida); cada resposta
// indica os parágrafos onde o texto oficial pode ser conferido.

export type PerguntaAula = {
  pergunta: string;
  resposta: string;
  /** Parágrafos do Catecismo onde conferir a resposta. */
  cic: number[];
};

export type AulaCatecismo = {
  semana: number;
  slug: string;
  /** Pilar do Catecismo (1 a 4). */
  parte: 1 | 2 | 3 | 4;
  titulo: string;
  objetivo: string;
  /** Exposição da aula, em parágrafos. */
  exposicao: string[];
  perguntas: PerguntaAula[];
  leitura: { ref: string; livro: string; capitulo: number };
  /** Faixa do Catecismo a estudar na semana. */
  estudo: string;
  paragrafosCIC: number[];
  tarefa: string;
};

export const AULAS: AulaCatecismo[] = [
  // ═══════════ PILAR I — A PROFISSÃO DA FÉ ═══════════
  {
    semana: 1,
    slug: "o-homem-capaz-de-deus",
    parte: 1,
    titulo: "O homem é capaz de Deus",
    objetivo:
      "Compreender por que a busca de Deus pertence à natureza humana e como a razão pode chegar à sua existência antes de qualquer revelação.",
    exposicao: [
      "O Catecismo começa por uma afirmação sobre o homem, não sobre Deus: o ser humano é capaz de Deus. O desejo de verdade, de bem e de felicidade sem fim não é um acidente cultural — é a marca de uma criatura feita para uma comunhão que ela não consegue produzir por si.",
      "Antes da fé, a razão já pode reconhecer que existe uma causa primeira: pelo mundo, que é ordenado e contingente, e pela própria pessoa humana, com sua consciência moral e sua abertura ao infinito. São as chamadas vias de acesso a Deus, que não são cálculos de física, mas argumentos convergentes.",
      "Falar de Deus, porém, sempre exige humildade: nossa linguagem é a de criaturas e nunca esgota o mistério. Dizemos verdades sobre Deus por analogia — verdadeiras, mas sempre menores do que Ele.",
    ],
    perguntas: [
      {
        pergunta: "Por que se diz que o homem é “capaz de Deus”?",
        resposta:
          "Porque foi criado por Deus e para Deus: em todo tempo e cultura os homens buscaram o transcendente, e só nessa comunhão encontram a felicidade plena que procuram.",
        cic: [27, 28, 30],
      },
      {
        pergunta: "A razão sozinha pode chegar à existência de Deus?",
        resposta:
          "Sim. A partir do mundo criado e da pessoa humana — sua consciência moral e sua abertura à verdade — a razão pode alcançar com certeza a existência de uma causa primeira. Isso não substitui a fé, mas a prepara.",
        cic: [31, 32, 33, 36],
      },
      {
        pergunta: "Se Deus pode ser conhecido pela razão, por que a Revelação é necessária?",
        resposta:
          "Porque o conhecimento natural é limitado, sujeito a erro e não alcança a vida íntima de Deus nem seu plano de salvação. Deus quis se dar a conhecer e chamar o homem à sua própria comunhão.",
        cic: [37, 38, 50],
      },
      {
        pergunta: "Nossas palavras conseguem dizer o que Deus é?",
        resposta:
          "Dizem verdades reais, mas de modo analógico e sempre insuficiente: falamos com linguagem de criaturas sobre Aquele que as ultrapassa. Deus permanece mistério inefável.",
        cic: [40, 42, 43],
      },
      {
        pergunta: "O ateísmo é sempre culpa do descrente?",
        resposta:
          "Não necessariamente. O Catecismo reconhece que a ignorância, o escândalo dos crentes e uma apresentação deficiente da fé podem contribuir para a recusa — e por isso pede exame de consciência aos próprios cristãos.",
        cic: [2123, 2125],
      },
    ],
    leitura: { ref: "Romanos 1,18-23", livro: "romanos", capitulo: 1 },
    estudo: "CIC §§ 27-49",
    paragrafosCIC: [27, 31, 36, 40, 43],
    tarefa:
      "Escreva em poucas linhas quando você percebeu, na sua própria vida, um desejo que nenhuma coisa criada satisfez.",
  },
  {
    semana: 2,
    slug: "revelacao-escritura-e-tradicao",
    parte: 1,
    titulo: "Revelação, Escritura e Tradição",
    objetivo:
      "Entender como Deus se revelou na história, o que é a Tradição apostólica e por que a Escritura não se interpreta isoladamente.",
    exposicao: [
      "Deus se revelou por etapas: à criação seguem as alianças com Noé e Abraão, a Lei dada a Moisés, os profetas — e finalmente a Palavra definitiva, que é o próprio Filho. Depois de Cristo não haverá nova revelação pública: o depósito da fé está completo.",
      "Essa Revelação chega até nós por dois canais que nascem da mesma fonte: a Sagrada Escritura, escrita sob inspiração do Espírito Santo, e a Tradição apostólica, transmitida viva na Igreja. Não são duas verdades concorrentes, mas um só depósito.",
      "A tarefa de interpretar autenticamente cabe ao Magistério — o Papa e os bispos em comunhão com ele — que não está acima da Palavra de Deus, mas a serve. Escritura, Tradição e Magistério estão de tal modo unidos que nenhum subsiste sem os outros.",
    ],
    perguntas: [
      {
        pergunta: "Haverá alguma nova revelação pública depois de Cristo?",
        resposta:
          "Não. Cristo é a Palavra definitiva do Pai; a economia da Revelação está encerrada, embora a Igreja leve séculos para penetrar todo o seu conteúdo.",
        cic: [65, 66, 67],
      },
      {
        pergunta: "O que são as revelações privadas, como as aparições aprovadas?",
        resposta:
          "Não pertencem ao depósito da fé nem o completam: podem ajudar a viver mais plenamente o Evangelho num tempo determinado. Nenhum fiel é obrigado a crer nelas.",
        cic: [67],
      },
      {
        pergunta: "O que significa dizer que a Escritura é inspirada?",
        resposta:
          "Que Deus é seu autor, agindo por meio de autores humanos verdadeiros, que escreveram com sua cultura e seu estilo. Por isso ensina sem erro a verdade da salvação.",
        cic: [105, 106, 107],
      },
      {
        pergunta: "Como se interpreta corretamente a Escritura?",
        resposta:
          "Atendendo à intenção dos autores, ao gênero literário e às condições do tempo; e sempre na fé viva da Igreja, com a unidade de toda a Escritura, a Tradição e a analogia da fé.",
        cic: [109, 110, 111, 113, 114],
      },
      {
        pergunta: "O Magistério pode inventar doutrinas novas?",
        resposta:
          "Não. Está a serviço da Palavra de Deus: ensina somente o que foi transmitido, guardando-o fielmente e explicitando-o.",
        cic: [85, 86, 88],
      },
    ],
    leitura: { ref: "2 Timóteo 3,14-17", livro: "2timoteo", capitulo: 3 },
    estudo: "CIC §§ 50-141",
    paragrafosCIC: [65, 80, 85, 107, 113],
    tarefa:
      "Leia um capítulo do Evangelho de João e anote o que ele afirma sobre a identidade de Jesus.",
  },
  {
    semana: 3,
    slug: "creio-em-deus-pai-e-na-criacao",
    parte: 1,
    titulo: "Creio em Deus Pai — Trindade e criação",
    objetivo:
      "Professar o mistério central da fé cristã, a Santíssima Trindade, e compreender a doutrina da criação e da providência.",
    exposicao: [
      "A Trindade é o mistério central da fé: um só Deus em três Pessoas realmente distintas — Pai, Filho e Espírito Santo — de uma só substância, iguais em tudo. Não são três deuses, nem três máscaras do mesmo: são relações subsistentes num único ser divino.",
      "Esse Deus criou tudo do nada, livremente, por bondade, e não a partir de matéria preexistente nem por necessidade. A criação é boa, tem ordem e finalidade, e não se explica como acidente sem sentido nem como emanação divina.",
      "Deus sustenta e conduz o que criou pela providência, sem anular a liberdade humana nem as leis naturais. Aqui aparece a questão do mal, que a fé não resolve com uma teoria, mas com a Cruz e a Ressurreição de Cristo.",
    ],
    perguntas: [
      {
        pergunta: "O que a Igreja professa sobre a Santíssima Trindade?",
        resposta:
          "Um só Deus em três Pessoas distintas, consubstanciais: o Pai gera o Filho, o Filho é gerado, o Espírito Santo procede do Pai e do Filho. As Pessoas se distinguem por suas relações, não por partes do ser divino.",
        cic: [253, 254, 255, 261],
      },
      {
        pergunta: "O que significa criar “do nada”?",
        resposta:
          "Que Deus não partiu de matéria preexistente nem de necessidade alguma: criou livremente, por bondade e amor, para comunicar sua glória e sua vida.",
        cic: [296, 293, 295],
      },
      {
        pergunta: "A fé na criação contradiz as ciências naturais?",
        resposta:
          "Não. A Escritura não é um tratado científico: ensina quem criou e para quê. As ciências investigam como o universo se desenvolve; os planos não competem entre si.",
        cic: [159, 283, 284],
      },
      {
        pergunta: "Se Deus é bom e todo-poderoso, por que existe o mal?",
        resposta:
          "O mal moral entra no mundo pelo uso livre e desordenado da liberdade das criaturas, não por vontade de Deus. Ele permite o mal e dele tira um bem maior, o que se revela plenamente na Paixão e Ressurreição de Cristo.",
        cic: [309, 311, 312, 324],
      },
      {
        pergunta: "O que são os anjos?",
        resposta:
          "Criaturas espirituais, pessoais e imortais, servidores e mensageiros de Deus. Sua existência é verdade de fé; a Escritura os mostra desde a criação até o cumprimento da salvação.",
        cic: [328, 330, 331],
      },
    ],
    leitura: { ref: "Gênesis 1,1-31", livro: "genesis", capitulo: 1 },
    estudo: "CIC §§ 199-421",
    paragrafosCIC: [253, 279, 295, 311, 328],
    tarefa:
      "Reze o Credo dos Apóstolos com calma, parando em cada artigo que você não sabia explicar.",
  },
  {
    semana: 4,
    slug: "jesus-cristo-e-o-espirito-santo",
    parte: 1,
    titulo: "Jesus Cristo, o Espírito Santo e a Igreja",
    objetivo:
      "Professar quem é Jesus Cristo, o sentido de sua Paixão e Ressurreição, e reconhecer a obra do Espírito Santo na Igreja.",
    exposicao: [
      "Jesus é verdadeiro Deus e verdadeiro homem: uma só Pessoa divina em duas naturezas, sem confusão e sem separação, como definiu Calcedônia em 451. Tem alma humana, vontade humana e conhecimento humano reais — não é Deus disfarçado de homem.",
      "Sua morte não foi um acidente político absorvido pela fé: é o sacrifício voluntário que reconcilia a humanidade com o Pai. A Ressurreição não é metáfora do ânimo dos discípulos, mas acontecimento real e atestado, fundamento de toda a fé cristã.",
      "Pentecostes inaugura o tempo da Igreja: o Espírito Santo, enviado pelo Pai e pelo Filho, constrói o Corpo de Cristo, dá os sacramentos, suscita santos e conduz a Igreja na verdade. A Igreja é una, santa, católica e apostólica.",
    ],
    perguntas: [
      {
        pergunta: "O que a Igreja define sobre as duas naturezas de Cristo?",
        resposta:
          "Que na única Pessoa do Verbo há duas naturezas, divina e humana, sem confusão, sem mudança, sem divisão e sem separação — definição do Concílio de Calcedônia (451).",
        cic: [464, 467, 470],
      },
      {
        pergunta: "Por que Jesus morreu na cruz?",
        resposta:
          "Por amor, entregando-se livremente para reconciliar a humanidade com o Pai. Sua morte é sacrifício redentor, oferecido por todos, e não uma fatalidade imposta.",
        cic: [599, 609, 613, 616],
      },
      {
        pergunta: "A Ressurreição é um fato ou um símbolo?",
        resposta:
          "É um acontecimento real e transcendente: o túmulo vazio e as aparições são atestados pelos discípulos, que morreram por esse testemunho. Sem ela a fé seria vazia.",
        cic: [639, 643, 647, 651],
      },
      {
        pergunta: "Qual é a obra do Espírito Santo?",
        resposta:
          "Revelar Cristo, dar vida à Igreja, santificar os fiéis pelos sacramentos e pelos dons, ensinar a orar e conduzir à verdade plena.",
        cic: [683, 686, 733, 737],
      },
      {
        pergunta: "O que significa dizer que a Igreja é “católica” e “apostólica”?",
        resposta:
          "Católica porque possui a totalidade dos meios de salvação e é enviada a todos os povos; apostólica porque está fundada sobre os Apóstolos e transmite seu ensinamento pela sucessão dos bispos.",
        cic: [830, 831, 857, 862],
      },
    ],
    leitura: { ref: "João 1,1-18", livro: "joao", capitulo: 1 },
    estudo: "CIC §§ 422-975",
    paragrafosCIC: [464, 599, 639, 683, 830],
    tarefa:
      "Escolha um dos artigos do Credo sobre Cristo e explique-o em voz alta para alguém da família.",
  },

  // ═══════════ PILAR II — A CELEBRAÇÃO DO MISTÉRIO CRISTÃO ═══════════
  {
    semana: 5,
    slug: "liturgia-e-sacramentos",
    parte: 2,
    titulo: "O que é a liturgia e o que são os sacramentos",
    objetivo:
      "Compreender a liturgia como ação de Cristo e da Igreja, e o que os sacramentos são e realizam.",
    exposicao: [
      "Liturgia não é encenação nem apenas costume: é a obra da Trindade, ação do Cristo total — Cabeça e membros — pela qual a salvação realizada uma vez na história se torna presente e atuante hoje.",
      "Os sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja. Não simbolizam de fora: realizam o que significam, porque quem age neles é Cristo. Por isso se diz que operam ex opere operato — pela ação de Cristo, não pela santidade do ministro.",
      "São sete, ordenados em iniciação (Batismo, Confirmação, Eucaristia), cura (Penitência, Unção dos Enfermos) e serviço da comunhão (Ordem, Matrimônio). O fruto que produzem, no entanto, depende da disposição de quem os recebe.",
    ],
    perguntas: [
      {
        pergunta: "O que é a liturgia?",
        resposta:
          "A celebração do mistério de Cristo, obra da Santíssima Trindade e ação do Cristo total, na qual a Igreja participa da obra da salvação. É fonte e cume da vida cristã.",
        cic: [1067, 1069, 1071, 1074],
      },
      {
        pergunta: "O que é um sacramento?",
        resposta:
          "Um sinal sensível e eficaz da graça, instituído por Cristo e confiado à Igreja, pelo qual a vida divina nos é comunicada.",
        cic: [1113, 1131],
      },
      {
        pergunta: "O que quer dizer que os sacramentos agem “ex opere operato”?",
        resposta:
          "Que a graça vem da ação de Cristo, e não do merecimento do ministro ou de quem recebe. Ainda assim, o fruto colhido depende da disposição do fiel.",
        cic: [1128],
      },
      {
        pergunta: "Quantos são os sacramentos e como se agrupam?",
        resposta:
          "Sete: iniciação cristã (Batismo, Confirmação, Eucaristia), cura (Penitência, Unção dos Enfermos) e serviço da comunhão e da missão (Ordem, Matrimônio).",
        cic: [1210, 1211],
      },
      {
        pergunta: "Por que existem gestos, cantos, imagens e vestes na liturgia?",
        resposta:
          "Porque o homem é corpo e alma: a fé se expressa em sinais sensíveis. Os sinais litúrgicos assumem elementos da criação e da cultura para significar a ação de Deus.",
        cic: [1145, 1146, 1148, 1157],
      },
    ],
    leitura: { ref: "Atos 2,42-47", livro: "atos", capitulo: 2 },
    estudo: "CIC §§ 1066-1209",
    paragrafosCIC: [1067, 1113, 1128, 1145, 1210],
    tarefa:
      "Na próxima Missa, observe um gesto do sacerdote e procure na semana o que ele significa.",
  },
  {
    semana: 6,
    slug: "batismo-e-confirmacao",
    parte: 2,
    titulo: "Batismo e Confirmação",
    objetivo:
      "Entender o que o Batismo realiza, por que se batizam crianças e o que a Confirmação acrescenta.",
    exposicao: [
      "O Batismo é a porta da vida no Espírito: apaga o pecado original e todos os pecados pessoais, incorpora a Cristo e à Igreja, faz do batizado filho adotivo de Deus e imprime um caráter permanente — por isso não se repete.",
      "A Igreja batiza crianças desde a antiguidade, porque o Batismo é graça pura e não conquista de quem já entende. Os pais e padrinhos assumem o compromisso de educar na fé aquilo que a criança recebeu.",
      "A Confirmação completa a graça batismal: enraíza mais profundamente na filiação divina, une mais firmemente a Cristo, aumenta os dons do Espírito Santo e dá força para testemunhar a fé publicamente.",
    ],
    perguntas: [
      {
        pergunta: "O que o Batismo faz?",
        resposta:
          "Perdoa o pecado original e os pecados pessoais, dá a graça santificante e as virtudes, incorpora à Igreja e imprime um selo espiritual indelével.",
        cic: [1263, 1265, 1272, 1279],
      },
      {
        pergunta: "Por que a Igreja batiza crianças?",
        resposta:
          "Porque a salvação é dom gratuito e as crianças nascem com a natureza ferida e precisam do renascimento. É prática atestada desde os primeiros séculos, com o compromisso dos pais de educá-las na fé.",
        cic: [1250, 1251, 1252],
      },
      {
        pergunta: "Quem pode batizar em caso de necessidade?",
        resposta:
          "Em perigo de morte, qualquer pessoa pode batizar, derramando água sobre a cabeça e pronunciando a fórmula trinitária com a intenção de fazer o que a Igreja faz.",
        cic: [1256, 1284],
      },
      {
        pergunta: "O que a Confirmação acrescenta ao Batismo?",
        resposta:
          "Aumenta e aprofunda a graça batismal, une mais firmemente a Cristo, multiplica os dons do Espírito Santo e dá força para confessar a fé com coragem.",
        cic: [1303, 1316],
      },
      {
        pergunta: "Batismo e Confirmação podem ser repetidos?",
        resposta:
          "Não. Ambos imprimem um caráter espiritual permanente na alma e por isso são recebidos uma única vez na vida.",
        cic: [1272, 1304],
      },
    ],
    leitura: { ref: "Atos 8,14-17", livro: "atos", capitulo: 8 },
    estudo: "CIC §§ 1210-1321",
    paragrafosCIC: [1263, 1250, 1256, 1303, 1272],
    tarefa: "Descubra a data do seu Batismo e reze nesse dia agradecendo por ele.",
  },
  {
    semana: 7,
    slug: "eucaristia",
    parte: 2,
    titulo: "A Eucaristia, fonte e cume",
    objetivo:
      "Professar a presença real de Cristo, entender a Missa como sacrifício e conhecer as condições para comungar.",
    exposicao: [
      "A Eucaristia é o próprio Cristo — Corpo, Sangue, Alma e Divindade — sob as espécies do pão e do vinho. A Igreja chama transubstanciação a conversão de toda a substância do pão e do vinho, permanecendo as aparências sensíveis.",
      "A Missa não é um sacrifício novo, nem apenas a lembrança de um antigo: é a presença sacramental do único sacrifício da Cruz, oferecido de modo incruento. Por isso é chamada fonte e cume de toda a vida cristã.",
      "Comungar exige estar em estado de graça, guardar o jejum eucarístico e viver na comunhão da fé. Quem tem consciência de pecado grave deve confessar-se antes: é exigência de reverência, não de rigorismo.",
    ],
    perguntas: [
      {
        pergunta: "O que a Igreja professa sobre a presença de Cristo na Eucaristia?",
        resposta:
          "Que Cristo está presente verdadeira, real e substancialmente sob as espécies do pão e do vinho — Corpo, Sangue, Alma e Divindade —, e não apenas em símbolo ou lembrança.",
        cic: [1374, 1375, 1376, 1413],
      },
      {
        pergunta: "A Missa é um novo sacrifício?",
        resposta:
          "Não. É a atualização sacramental do único sacrifício de Cristo na Cruz, oferecido de maneira incruenta; sacrifício e banquete são o mesmo mistério.",
        cic: [1366, 1367, 1382],
      },
      {
        pergunta: "Quais são as condições para receber a comunhão?",
        resposta:
          "Estar em estado de graça — confessando-se antes, se houver pecado grave —, observar o jejum eucarístico de uma hora e professar a fé católica.",
        cic: [1385, 1387, 1415],
      },
      {
        pergunta: "Quais são os frutos da comunhão eucarística?",
        resposta:
          "Une intimamente a Cristo, alimenta e aumenta a graça recebida no Batismo, apaga os pecados veniais, preserva dos graves e fortalece a unidade da Igreja.",
        cic: [1391, 1392, 1393, 1396],
      },
      {
        pergunta: "Por que se adora o Santíssimo Sacramento fora da Missa?",
        resposta:
          "Porque Cristo permanece presente enquanto subsistem as espécies. A adoração e a reserva eucarística decorrem da fé na presença real e alimentam a devoção.",
        cic: [1378, 1379, 1418],
      },
    ],
    leitura: { ref: "João 6,48-58", livro: "joao", capitulo: 6 },
    estudo: "CIC §§ 1322-1419",
    paragrafosCIC: [1374, 1366, 1385, 1391, 1378],
    tarefa: "Faça quinze minutos de adoração eucarística nesta semana, sem celular.",
  },
  {
    semana: 8,
    slug: "penitencia-uncao-ordem-matrimonio",
    parte: 2,
    titulo: "Penitência, Unção, Ordem e Matrimônio",
    objetivo:
      "Conhecer os sacramentos de cura e os sacramentos ao serviço da comunhão, com suas condições e efeitos.",
    exposicao: [
      "Na Confissão, Cristo perdoa pelo ministério do sacerdote. São necessários contrição, confissão dos pecados graves e satisfação; o sigilo sacramental é absoluto e não admite exceção alguma.",
      "A Unção dos Enfermos não é sacramento apenas dos moribundos: destina-se a quem está gravemente enfermo ou debilitado pela idade, conferindo força, paz e, se convém à salvação, também a saúde do corpo.",
      "A Ordem e o Matrimônio ordenam-se à salvação dos outros. A Ordem tem três graus — episcopado, presbiterado e diaconato — e imprime caráter permanente. O Matrimônio sacramental entre batizados, consumado, é indissolúvel: os esposos se dão um ao outro por toda a vida.",
    ],
    perguntas: [
      {
        pergunta: "O que é necessário para uma boa confissão?",
        resposta:
          "Arrepender-se (contrição), confessar todos os pecados graves ao sacerdote, ter propósito de emenda e cumprir a satisfação recebida.",
        cic: [1451, 1454, 1456, 1459],
      },
      {
        pergunta: "O sigilo da confissão pode ser quebrado?",
        resposta:
          "Nunca, por motivo algum. O sacerdote não pode revelar nada do que ouviu, nem usar o que soube; o sigilo é inviolável.",
        cic: [1467],
      },
      {
        pergunta: "Quem deve receber a Unção dos Enfermos?",
        resposta:
          "Todo fiel que começa a estar em perigo por doença grave ou pela idade avançada; pode ser repetida se a doença se agravar ou em nova enfermidade.",
        cic: [1514, 1515, 1528],
      },
      {
        pergunta: "Quais são os graus do sacramento da Ordem?",
        resposta:
          "Episcopado, presbiterado e diaconato. Os dois primeiros conferem participação no sacerdócio de Cristo; o diaconato é para o serviço. Todos imprimem caráter permanente.",
        cic: [1554, 1581],
      },
      {
        pergunta: "Por que o matrimônio sacramental é indissolúvel?",
        resposta:
          "Porque o vínculo é selado por Deus, e Cristo restaurou a unidade e a indissolubilidade do princípio. Um matrimônio válido e consumado entre batizados não pode ser dissolvido por poder humano.",
        cic: [1614, 1640, 1644],
      },
    ],
    leitura: { ref: "João 20,19-23", livro: "joao", capitulo: 20 },
    estudo: "CIC §§ 1420-1690",
    paragrafosCIC: [1451, 1467, 1514, 1554, 1640],
    tarefa: "Faça um exame de consciência pelos Dez Mandamentos e marque uma confissão.",
  },

  // ═══════════ PILAR III — A VIDA EM CRISTO ═══════════
  {
    semana: 9,
    slug: "liberdade-consciencia-e-pecado",
    parte: 3,
    titulo: "Liberdade, consciência e pecado",
    objetivo:
      "Compreender a dignidade da liberdade humana, o papel da consciência e a distinção entre pecado grave e leve.",
    exposicao: [
      "A vida moral católica não começa em proibições, mas na vocação à bem-aventurança: o homem foi criado à imagem de Deus e chamado à felicidade que só Deus dá. A liberdade existe para o bem, e cresce quanto mais se liga à verdade.",
      "A consciência é o juízo da razão que reconhece a qualidade moral de um ato concreto. Deve ser sempre seguida — e por isso deve ser formada, porque pode errar por ignorância. A consciência não cria a norma: descobre-a.",
      "Três coisas definem a moralidade de um ato: o objeto escolhido, a intenção e as circunstâncias. Uma boa intenção não torna bom um ato mau em si. Pecado mortal exige matéria grave, plena consciência e consentimento deliberado; sem isso o pecado é venial.",
    ],
    perguntas: [
      {
        pergunta: "O que torna um ato humano moralmente bom?",
        resposta:
          "A bondade do objeto escolhido, da intenção e das circunstâncias, juntas. Um ato mau em si não se torna bom por boa intenção ou por bom resultado.",
        cic: [1750, 1755, 1756],
      },
      {
        pergunta: "É preciso obedecer à própria consciência?",
        resposta:
          "Sim, sempre — e justamente por isso é obrigatório formá-la com a Palavra de Deus, o ensinamento da Igreja e a oração, pois pode julgar erradamente por ignorância.",
        cic: [1782, 1783, 1790, 1791],
      },
      {
        pergunta: "Qual é a diferença entre pecado mortal e venial?",
        resposta:
          "O mortal destrói a caridade e exige matéria grave, plena consciência e consentimento deliberado. O venial fere a caridade sem destruí-la e não priva da graça santificante.",
        cic: [1855, 1857, 1862, 1863],
      },
      {
        pergunta: "O que são as virtudes cardeais e as teologais?",
        resposta:
          "Cardeais: prudência, justiça, fortaleza e temperança, adquiridas pelo exercício. Teologais: fé, esperança e caridade, infundidas por Deus e fundamento da vida cristã.",
        cic: [1805, 1812, 1813],
      },
      {
        pergunta: "O que é a graça e por que ela é necessária?",
        resposta:
          "É o dom gratuito de Deus que nos faz participar de sua vida. Sem ela não é possível merecer a vida eterna nem perseverar no bem; ela não anula, mas cura e eleva a liberdade.",
        cic: [1996, 1998, 2001, 2002],
      },
    ],
    leitura: { ref: "Mateus 5,1-16", livro: "mateus", capitulo: 5 },
    estudo: "CIC §§ 1691-2051",
    paragrafosCIC: [1750, 1783, 1855, 1805, 1996],
    tarefa:
      "Escolha uma virtude cardeal e defina um ato concreto para exercitá-la todos os dias desta semana.",
  },
  {
    semana: 10,
    slug: "os-tres-primeiros-mandamentos",
    parte: 3,
    titulo: "Amar a Deus — os três primeiros Mandamentos",
    objetivo:
      "Estudar os mandamentos que ordenam a relação com Deus: adoração, respeito ao seu nome e santificação do Dia do Senhor.",
    exposicao: [
      "O primeiro mandamento manda adorar somente Deus e proíbe a idolatria, a superstição, a magia, o espiritismo e a presunção de manipular o sagrado. Veneração das imagens e dos santos não contraria esse mandamento: a honra prestada à imagem se dirige à pessoa representada.",
      "O segundo pede respeito ao nome de Deus — contra a blasfêmia, o juramento falso e o uso banal do sagrado. O nome divino é santo porque revela quem Ele é.",
      "O terceiro santifica o Dia do Senhor. Para os cristãos, o sábado do Antigo Testamento é cumprido no domingo, dia da Ressurreição: participar da Missa é grave obrigação, e o descanso do trabalho pertence ao próprio mandamento.",
    ],
    perguntas: [
      {
        pergunta: "Veneração de imagens e de santos é idolatria?",
        resposta:
          "Não. A adoração é devida só a Deus; aos santos se presta veneração, e a honra dada à imagem se dirige a quem ela representa — doutrina definida no II Concílio de Niceia (787).",
        cic: [2112, 2131, 2132],
      },
      {
        pergunta: "O que o primeiro mandamento proíbe?",
        resposta:
          "A idolatria, a superstição, a divinação e a magia, o espiritismo, o sacrilégio, a simonia, o ateísmo e o agnosticismo como recusa deliberada de Deus.",
        cic: [2110, 2111, 2116, 2117],
      },
      {
        pergunta: "Por que os cristãos guardam o domingo, e não o sábado?",
        resposta:
          "Porque o domingo é o dia da Ressurreição do Senhor, a Páscoa semanal que cumpre o sábado; a Igreja apostólica passou a celebrá-lo como Dia do Senhor.",
        cic: [2174, 2175, 2176],
      },
      {
        pergunta: "Faltar à Missa dominical é pecado grave?",
        resposta:
          "Sim, quando é omissão deliberada sem causa séria — doença, cuidado de crianças, distância ou impedimento equivalente escusam a obrigação.",
        cic: [2180, 2181, 2183],
      },
      {
        pergunta: "O descanso dominical é apenas um costume?",
        resposta:
          "Não: pertence ao mandamento. Os fiéis devem abster-se de trabalhos e ocupações que impeçam o culto, a alegria própria do dia, as obras de misericórdia e o repouso.",
        cic: [2184, 2185, 2187],
      },
    ],
    leitura: { ref: "Êxodo 20,1-17", livro: "exodo", capitulo: 20 },
    estudo: "CIC §§ 2052-2195",
    paragrafosCIC: [2112, 2142, 2174, 2181, 2185],
    tarefa: "Programe o domingo desta semana em torno da Missa, e não o contrário.",
  },
  {
    semana: 11,
    slug: "familia-vida-e-castidade",
    parte: 3,
    titulo: "Família, vida humana e castidade",
    objetivo:
      "Estudar o quarto, quinto e sexto mandamentos: honra aos pais, respeito à vida e verdade do amor humano.",
    exposicao: [
      "A família é a célula original da sociedade e a primeira escola de fé. O quarto mandamento pede honra aos pais e, por extensão, respeito à autoridade legítima — que por sua vez tem deveres para com os filhos e os cidadãos.",
      "O quinto mandamento protege a vida humana desde a concepção até a morte natural. A Igreja rejeita o aborto e a eutanásia como atos gravemente contrários à lei moral, e ao mesmo tempo pede cuidado paliativo, misericórdia e acolhida de quem sofre.",
      "O sexto mandamento fala da castidade como integração da sexualidade na pessoa: virtude para todos os estados de vida, não apenas para consagrados. A doutrina protege a unidade e a fecundidade do amor conjugal.",
    ],
    perguntas: [
      {
        pergunta: "O que o quarto mandamento exige dos filhos e dos pais?",
        resposta:
          "Dos filhos: respeito, gratidão, obediência enquanto vivem em casa e assistência aos pais idosos. Dos pais: educação na fé, sustento, respeito à vocação dos filhos e exemplo de vida.",
        cic: [2214, 2217, 2218, 2221, 2223],
      },
      {
        pergunta: "Por que a Igreja considera o aborto um mal grave?",
        resposta:
          "Porque a vida humana deve ser respeitada e protegida de modo absoluto desde a concepção; a cooperação formal no aborto é pecado grave e implica pena canônica.",
        cic: [2270, 2271, 2272],
      },
      {
        pergunta: "Qual é a diferença entre eutanásia e cuidados paliativos?",
        resposta:
          "A eutanásia é ação ou omissão que causa a morte para eliminar o sofrimento — sempre moralmente inaceitável. Os cuidados paliativos aliviam a dor sem provocar a morte, e são forma especial de caridade.",
        cic: [2277, 2278, 2279],
      },
      {
        pergunta: "A legítima defesa contraria o quinto mandamento?",
        resposta:
          "Não. Defender a própria vida ou a de outros é direito e pode ser dever de quem tem responsabilidade sobre terceiros, desde que a força usada seja proporcionada.",
        cic: [2263, 2264, 2265],
      },
      {
        pergunta: "O que é a virtude da castidade?",
        resposta:
          "A integração da sexualidade na pessoa e, por ela, na unidade interior do homem — vivida de modo próprio por casados, celibatários e consagrados. Todos os batizados são chamados a ela.",
        cic: [2337, 2348, 2349],
      },
    ],
    leitura: { ref: "Efésios 5,21-33", livro: "efesios", capitulo: 5 },
    estudo: "CIC §§ 2196-2400",
    paragrafosCIC: [2214, 2270, 2277, 2263, 2337],
    tarefa:
      "Faça uma obra concreta de cuidado com alguém idoso ou doente da sua família ou paróquia.",
  },
  {
    semana: 12,
    slug: "justica-verdade-e-doutrina-social",
    parte: 3,
    titulo: "Justiça, verdade e doutrina social",
    objetivo:
      "Estudar o sétimo, oitavo, nono e décimo mandamentos e os princípios da doutrina social da Igreja.",
    exposicao: [
      "O sétimo mandamento manda respeitar os bens alheios e ordena o uso da propriedade ao destino universal dos bens. Dele decorre a doutrina social: dignidade da pessoa, bem comum, subsidiariedade, solidariedade e opção preferencial pelos pobres.",
      "O oitavo obriga à verdade: proíbe o falso testemunho, a calúnia, a difamação e a mentira, e ao mesmo tempo protege o segredo profissional e a vida privada. A verdade se diz com caridade e com discrição.",
      "Nono e décimo tocam o desejo: cobiça dos afetos e cobiça dos bens. O Evangelho pede pureza de coração e desapego, porque a raiz das injustiças está no interior da pessoa.",
    ],
    perguntas: [
      {
        pergunta: "A propriedade privada é legítima?",
        resposta:
          "Sim, mas não absoluta: é legítima e útil, e ao mesmo tempo subordinada ao destino universal dos bens. O uso da propriedade tem responsabilidade social.",
        cic: [2402, 2403, 2404, 2405],
      },
      {
        pergunta: "Quais são os princípios da doutrina social da Igreja?",
        resposta:
          "A dignidade inviolável da pessoa, o bem comum, a subsidiariedade, a solidariedade e a atenção preferencial aos pobres.",
        cic: [1905, 1913, 1928, 2443, 2444],
      },
      {
        pergunta: "Todo segredo pode ser revelado em nome da verdade?",
        resposta:
          "Não. Há segredos que devem ser guardados — profissionais, confidências, informações que causariam dano injusto — e o direito à verdade não é direito a saber tudo de todos.",
        cic: [2489, 2491, 2492],
      },
      {
        pergunta: "O que a Igreja ensina sobre o trabalho e o salário?",
        resposta:
          "O trabalho é dever e direito, participação na obra da criação. O salário justo é fruto legítimo do trabalho, e negá-lo é grave injustiça.",
        cic: [2427, 2428, 2434],
      },
      {
        pergunta: "Por que os últimos mandamentos falam do desejo?",
        resposta:
          "Porque as injustiças começam no coração. Pedem pureza de intenção, luta contra a cobiça e desapego, para que a caridade governe os afetos e os bens.",
        cic: [2517, 2534, 2544, 2551],
      },
    ],
    leitura: { ref: "Tiago 2,14-26", livro: "tiago", capitulo: 2 },
    estudo: "CIC §§ 2401-2557",
    paragrafosCIC: [2402, 1905, 2489, 2427, 2534],
    tarefa: "Reveja um hábito de consumo seu à luz do destino universal dos bens e mude um ponto.",
  },

  // ═══════════ PILAR IV — A ORAÇÃO CRISTÃ ═══════════
  {
    semana: 13,
    slug: "o-que-e-a-oracao",
    parte: 4,
    titulo: "O que é a oração cristã",
    objetivo:
      "Compreender a oração como dom, aliança e comunhão, e conhecer suas expressões fundamentais.",
    exposicao: [
      "Orar não é dominar Deus com palavras: é resposta a quem chama primeiro. O Catecismo define a oração como elevação da alma a Deus e pedido dos bens convenientes — sempre dom de Deus antes de ser esforço nosso.",
      "A oração é aliança: acontece no coração, centro da pessoa, e é comunhão com o Pai, pelo Filho, no Espírito Santo. Não é técnica de concentração nem exercício de autoajuda.",
      "Suas formas clássicas são a bênção e adoração, a petição, a intercessão, a ação de graças e o louvor. E há três grandes expressões: vocal, meditação e oração contemplativa.",
    ],
    perguntas: [
      {
        pergunta: "O que é a oração cristã?",
        resposta:
          "Elevação da alma a Deus e pedido dos bens convenientes; dom da graça e resposta livre do homem ao Deus que o chama, numa relação de aliança e comunhão.",
        cic: [2559, 2560, 2564, 2565],
      },
      {
        pergunta: "Quais são as formas de oração?",
        resposta:
          "Bênção e adoração, oração de petição, de intercessão, de ação de graças e de louvor.",
        cic: [2626, 2629, 2634, 2637, 2639],
      },
      {
        pergunta: "Quais são as três expressões da vida de oração?",
        resposta:
          "Oração vocal, meditação e oração contemplativa; todas supõem recolhimento do coração e podem ser vividas por qualquer batizado.",
        cic: [2700, 2705, 2709, 2721],
      },
      {
        pergunta: "É preciso “sentir” algo para que a oração valha?",
        resposta:
          "Não. A oração é ato de fé e de vontade; a secura e a distração não a invalidam. O que importa é a busca humilde e perseverante de Deus.",
        cic: [2729, 2731, 2732],
      },
      {
        pergunta: "Por que às vezes parece que Deus não responde?",
        resposta:
          "Porque ele responde segundo o bem verdadeiro, e não segundo a medida de nossos pedidos; a oração de petição amadurece quando se conforma à vontade de Deus.",
        cic: [2735, 2736, 2737, 2739],
      },
    ],
    leitura: { ref: "Lucas 11,1-13", livro: "lucas", capitulo: 11 },
    estudo: "CIC §§ 2558-2758",
    paragrafosCIC: [2559, 2626, 2700, 2729, 2735],
    tarefa:
      "Marque quinze minutos fixos de oração silenciosa por dia e cumpra-os, mesmo sem sentir nada.",
  },
  {
    semana: 14,
    slug: "o-pai-nosso",
    parte: 4,
    titulo: "O Pai-Nosso, petição por petição",
    objetivo: "Rezar com compreensão a oração que o próprio Cristo ensinou.",
    exposicao: [
      "O Pai-Nosso é chamado pela Tradição a oração do Senhor e o resumo de todo o Evangelho: cabe nele tudo o que se pode pedir legitimamente. A Igreja o reza na liturgia das Horas e na Missa, antes da comunhão.",
      "As três primeiras petições nos voltam para Deus — seu nome, seu Reino, sua vontade; as quatro seguintes apresentam nossas necessidades — o pão, o perdão, a provação e o mal.",
      "Chamar Deus de Pai não é metáfora piedosa: é ousadia dada pelo Espírito de filhos adotivos. Por isso a Missa introduz essa oração dizendo que ousamos rezá-la.",
    ],
    perguntas: [
      {
        pergunta: "Por que o Pai-Nosso é chamado oração do Senhor?",
        resposta:
          "Porque foi ensinado pelo próprio Jesus. A Tradição o chama resumo de todo o Evangelho, pois contém tudo o que se pode pedir a Deus.",
        cic: [2759, 2761, 2765],
      },
      {
        pergunta: "Como podemos chamar Deus de “Pai”?",
        resposta:
          "Por dom da graça: no Batismo tornamo-nos filhos adotivos, e o Espírito Santo nos dá essa ousadia filial em Cristo.",
        cic: [2777, 2779, 2782],
      },
      {
        pergunta: "O que pedimos ao dizer “santificado seja o vosso nome”?",
        resposta:
          "Que o nome de Deus seja reconhecido como santo e glorificado no mundo — inclusive por nossa vida, para que ela não o desonre.",
        cic: [2807, 2814],
      },
      {
        pergunta: "O “pão de cada dia” é apenas material?",
        resposta:
          "Não. Pede o necessário à vida e, no sentido que a Tradição sempre viu, também o Pão da Eucaristia e a Palavra de Deus.",
        cic: [2830, 2835, 2837],
      },
      {
        pergunta: "Deus nos induz à tentação?",
        resposta:
          "Não. Pedimos que não nos deixe entrar em tentação nem consentir nela; Deus não tenta ninguém, mas permite a provação e dá força para vencê-la.",
        cic: [2846, 2847, 2848],
      },
    ],
    leitura: { ref: "Mateus 6,5-15", livro: "mateus", capitulo: 6 },
    estudo: "CIC §§ 2759-2865",
    paragrafosCIC: [2759, 2777, 2807, 2830, 2846],
    tarefa: "Reze o Pai-Nosso uma vez por dia parando em cada petição por um instante de silêncio.",
  },
  {
    semana: 15,
    slug: "maria-santos-e-devocoes",
    parte: 4,
    titulo: "Maria, os santos e as devoções",
    objetivo:
      "Entender o lugar de Maria e dos santos na oração católica e distinguir adoração de veneração.",
    exposicao: [
      "Só Deus é adorado. Aos santos se presta veneração, e a Maria uma veneração especial, porque ela é Mãe de Deus e a primeira discípula. Pedir intercessão não substitui Cristo: nasce da comunhão dos santos, um só Corpo em Cristo.",
      "Os quatro dogmas marianos são: Mãe de Deus (Éfeso, 431), virgindade perpétua, Imaculada Conceição (1854) e Assunção (1950). Nenhum deles diverge de Cristo: todos apontam para Ele.",
      "As devoções — Rosário, Via-Sacra, novenas, ladainhas — são caminhos legítimos e recomendados quando conduzem à liturgia, à conversão e à caridade. Nenhuma dispensa os mandamentos ou os sacramentos.",
    ],
    perguntas: [
      {
        pergunta: "Católicos adoram Maria e os santos?",
        resposta:
          "Não. Adoração é devida somente a Deus. A Maria e aos santos se presta veneração, e a eles se pede intercessão, como se pede oração a um irmão de fé.",
        cic: [971, 2132, 2683],
      },
      {
        pergunta: "Por que pedir a intercessão dos santos se Cristo é o único mediador?",
        resposta:
          "Porque a intercessão dos santos não concorre com a mediação de Cristo: participa dela, na comunhão do único Corpo. Toda oração cristã continua sendo dirigida ao Pai por Cristo.",
        cic: [956, 957, 970, 2634],
      },
      {
        pergunta: "Quais são os dogmas marianos?",
        resposta:
          "Maria é Mãe de Deus, sempre Virgem, imaculada em sua conceição e assunta em corpo e alma à glória do céu.",
        cic: [495, 499, 491, 966],
      },
      {
        pergunta: "As devoções populares são obrigatórias?",
        resposta:
          "Não. São recomendadas quando levam à liturgia, à conversão e à caridade; devem ser purificadas de qualquer traço supersticioso e nunca substituem os sacramentos.",
        cic: [1674, 1675, 2111],
      },
      {
        pergunta: "O que é a comunhão dos santos?",
        resposta:
          "A comunhão dos bens espirituais entre todos os membros da Igreja — no céu, em purificação e na terra — em um só Corpo, que sustenta a oração mútua.",
        cic: [946, 947, 954, 962],
      },
    ],
    leitura: { ref: "Lucas 1,26-56", livro: "lucas", capitulo: 1 },
    estudo: "CIC §§ 946-975; 2673-2682",
    paragrafosCIC: [971, 956, 495, 1674, 946],
    tarefa: "Reze um terço nesta semana meditando os mistérios, sem pressa.",
  },
  {
    semana: 16,
    slug: "vida-de-fe-e-missao",
    parte: 4,
    titulo: "Vida de fé, novíssimos e missão",
    objetivo:
      "Reunir o curso: mandamentos da Igreja, esperança nos novíssimos e vocação missionária do batizado.",
    exposicao: [
      "A fé se vive em ritmo concreto: os mandamentos da Igreja garantem o mínimo indispensável — Missa dominical e nas festas de guarda, confissão anual, comunhão pascal, jejum e abstinência, sustento da Igreja.",
      "A esperança cristã olha para os novíssimos: morte, juízo, purificação, céu e inferno, e a ressurreição da carne no último dia. Nada disso é ameaça: é a seriedade da liberdade humana e a promessa da nova criação.",
      "Todo batizado é enviado. Não existe cristão espectador: a missão nasce do Batismo e se realiza no testemunho de vida, na caridade concreta e no anúncio explícito, cada um em seu estado.",
    ],
    perguntas: [
      {
        pergunta: "Quais são os mandamentos da Igreja?",
        resposta:
          "Participar da Missa nos domingos e festas de guarda, confessar-se ao menos uma vez por ano, comungar ao menos na Páscoa, guardar os dias de jejum e abstinência e ajudar nas necessidades materiais da Igreja.",
        cic: [2041, 2042, 2043],
      },
      {
        pergunta: "O que acontece imediatamente após a morte?",
        resposta:
          "Cada um recebe a retribuição eterna no juízo particular: purificação, comunhão plena com Deus ou separação definitiva por escolha livre.",
        cic: [1021, 1022],
      },
      {
        pergunta: "O que é o purgatório?",
        resposta:
          "O estado de purificação de quem morre na graça de Deus mas ainda imperfeitamente purificado. Não é segunda chance: quem está nele está salvo.",
        cic: [1030, 1031, 1032],
      },
      {
        pergunta: "Deus condena alguém ao inferno?",
        resposta:
          "Não. O inferno é autoexclusão livre e definitiva da comunhão com Deus; Deus não predestina ninguém a ele.",
        cic: [1033, 1037],
      },
      {
        pergunta: "Qual é a missão do fiel leigo?",
        resposta:
          "Santificar o mundo por dentro: família, trabalho, cultura e vida pública, dando testemunho de Cristo e cooperando na missão da Igreja segundo sua vocação própria.",
        cic: [897, 898, 900, 905],
      },
    ],
    leitura: { ref: "Mateus 28,16-20", livro: "mateus", capitulo: 28 },
    estudo: "CIC §§ 2041-2043; 988-1060",
    paragrafosCIC: [2041, 1021, 1030, 1033, 897],
    tarefa:
      "Escolha um passo concreto para os próximos três meses: um serviço na paróquia, um estudo continuado ou o convite a alguém para conhecer a fé.",
  },
];

export function aulaPorSlug(slug: string): AulaCatecismo | undefined {
  return AULAS.find((a) => a.slug === slug);
}

export const NOME_PILAR: Record<1 | 2 | 3 | 4, string> = {
  1: "A Profissão da Fé",
  2: "A Celebração do Mistério Cristão",
  3: "A Vida em Cristo",
  4: "A Oração Cristã",
};
