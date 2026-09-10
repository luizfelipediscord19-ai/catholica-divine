/**
 * Objeções e respostas acrescentadas ao banco principal (ver apologetica-objecoes.ts).
 * Cada resposta cita fontes verificáveis (Escritura, Padres, concílios, CIC).
 */

import type { Objecao } from "./apologetica-objecoes";

export const OBJECOES_ADICIONAIS: Objecao[] = [
  // ===== DEUS E RAZÃO =====
  {
    slug: "fe-e-salto-no-escuro",
    categoria: "Deus e razão",
    objecao: "Fé é acreditar sem evidência, um salto no escuro.",
    resposta: [
      "A definição católica de fé é o contrário disso: é adesão da inteligência e da vontade a um Deus que se revelou, e é razoável porque se apoia em motivos de credibilidade — a coerência da mensagem, os sinais históricos, o testemunho dos mártires.",
      "Nada do que a fé propõe pode contradizer o que a razão estabelece com certeza, porque a mesma verdade não pode contradizer-se; onde parece haver conflito, houve erro de leitura de um dos lados.",
      "A Igreja condenou expressamente tanto o racionalismo, que reduz a fé à razão, quanto o fideísmo, que a dispensa de qualquer razoabilidade.",
    ],
    fontes: [
      "CIC §§ 154-159",
      "Dei Filius, cap. 3-4 (DH 3008-3020)",
      "Fides et Ratio, nn. 52-56",
      "1Pd 3,15",
    ],
  },
  {
    slug: "milagres-sao-impossiveis",
    categoria: "Deus e razão",
    objecao: "Milagres são impossíveis: violam as leis da natureza.",
    resposta: [
      "Um milagre não é a quebra de uma lei, mas a ação livre do autor da natureza dentro dela — como o autor de um livro que escreve uma frase inesperada sem deixar de respeitar a gramática.",
      "A afirmação de que milagres não ocorrem não é conclusão científica, mas pressuposto filosófico assumido antes de examinar os casos.",
      "A Igreja não aceita relatos com facilidade: exige documentação médica, comissões independentes e a exclusão de explicação natural conhecida, como no procedimento do Escritório Médico de Lourdes e nas causas de canonização.",
    ],
    fontes: ["CIC §§ 156, 547-550", "Summa Theologiae I, q. 105, a. 6-8", "Jo 10,38"],
  },
  {
    slug: "religiao-e-muleta-psicologica",
    categoria: "Deus e razão",
    objecao: "Deus é apenas projeção do desejo humano por um pai protetor.",
    resposta: [
      "A explicação psicológica de por que alguém crê não decide se o que ele crê é verdadeiro: o mesmo argumento invertido diria que o ateísmo é projeção do desejo de não ter juiz.",
      "O Deus da Revelação não corresponde ao desejo espontâneo de conforto: pede conversão, perdão dos inimigos, cruz e desapego dos bens.",
      "A fé cristã reconhece a existência de religiosidade doentia e a critica: há textos proféticos inteiros contra o culto usado como substituto da justiça.",
    ],
    fontes: ["CIC §§ 2094, 2110-2117", "Is 1,11-17", "Mt 16,24", "Spe Salvi, nn. 22-23"],
  },
  // ===== ESCRITURA =====
  {
    slug: "igreja-escondeu-a-biblia",
    categoria: "Escritura",
    objecao: "A Igreja proibia o povo de ler a Bíblia.",
    resposta: [
      "Foram monges católicos que copiaram à mão a Escritura por mil anos, e a primeira obra impressa por Gutenberg, em 1455, foi a Vulgata latina; antes de Lutero circulavam dezenas de edições da Bíblia em alemão.",
      "As restrições dos séculos XVI-XVIII incidiam sobre traduções específicas consideradas alteradas em pontos doutrinais e sobre a leitura sem orientação em contexto de guerra religiosa, não sobre a Escritura em si.",
      "Hoje a Igreja recomenda insistentemente a leitura pessoal e comunitária, e concede indulgência à leitura orante da Escritura.",
    ],
    fontes: [
      "Dei Verbum, nn. 21-25",
      "CIC §§ 131-133",
      "Verbum Domini, nn. 72-87",
      "Enchiridion Indulgentiarum, conc. 30",
    ],
  },
  {
    slug: "infalibilidade-papal",
    categoria: "Igreja e Papado",
    objecao: "A Igreja diz que o Papa nunca erra.",
    resposta: [
      "A infalibilidade não é impecabilidade nem opinião garantida: aplica-se somente quando o Papa, como pastor supremo, define em caráter definitivo uma verdade de fé ou moral a ser sustentada por toda a Igreja.",
      "Fora desse ato, o ensino pontifício exige respeito religioso, mas não é infalível; declarações sobre política, ciência ou estratégia pastoral não têm essa nota.",
      "Em quase dois mil anos, definições reconhecidas como ex cathedra são raríssimas — os exemplos citados são a Imaculada Conceição (1854) e a Assunção (1950).",
    ],
    fontes: [
      "Pastor Aeternus, cap. 4 (DH 3074)",
      "Lumen Gentium 25",
      "CIC §§ 888-892",
      "CDC c. 749",
    ],
  },
  {
    slug: "papas-maus-invalidam-a-igreja",
    categoria: "Igreja e Papado",
    objecao: "Houve papas corruptos; isso destrói a pretensão da Igreja.",
    resposta: [
      "A Igreja nunca prometeu governantes santos: prometeu que a fé transmitida não se corromperia. A história de papas indignos é reconhecida por historiadores católicos e não foi ocultada nos manuais.",
      "Justamente nesses períodos nenhum papa definiu doutrina nova em favor de seus vícios — sinal, para o crente, de uma preservação que não depende da virtude dos homens.",
      "O escândalo do pecado dos pastores é levado a sério pela Igreja, que pede perdão publicamente por ele e mantém a distinção entre a santidade da instituição em seus dons e o pecado de seus membros.",
    ],
    fontes: ["CIC §§ 827, 1550", "Lumen Gentium 8", "Incarnationis Mysterium, n. 11", "Mt 23,2-3"],
  },
  {
    slug: "igreja-inventou-doutrinas",
    categoria: "Igreja e Papado",
    objecao: "A Igreja inventa dogmas novos com o tempo.",
    resposta: [
      "Definir não é inventar: um dogma é proclamado quando o que a Igreja já vivia e criam é contestado e precisa de formulação precisa — foi assim com a divindade de Cristo em Niceia, em 325.",
      "São Vicente de Lérins, no século V, já distinguia o progresso da fé, que é aprofundamento do mesmo conteúdo, da mudança, que o substitui.",
      "Nenhuma definição católica pode contradizer definição anterior; quando isso é alegado, o exame dos textos mostra mudança de disciplina ou de linguagem, não de doutrina definida.",
    ],
    fontes: [
      "Commonitorium 23 (Vicente de Lérins)",
      "Dei Verbum, n. 8",
      "CIC §§ 66, 88-90, 94",
      "Mysterium Ecclesiae, n. 5",
    ],
  },
  // ===== SACRAMENTOS =====
  {
    slug: "confissao-ao-padre",
    categoria: "Sacramentos",
    objecao: "Por que confessar a um homem, se posso pedir perdão direto a Deus?",
    resposta: [
      "Deus perdoa, e é sempre Ele quem perdoa; a questão é o modo que Cristo escolheu: ressuscitado, deu aos apóstolos o poder de perdoar e de retê-los, o que supõe alguém que ouça o pecado.",
      "O sacramento tem efeitos que a oração privada não garante: a certeza objetiva do perdão, a reconciliação com a comunidade ferida pelo pecado e a orientação concreta para a emenda.",
      "O sigilo é absoluto e inviolável, e o sacerdote age em nome de Cristo, não por autoridade própria.",
    ],
    fontes: ["Jo 20,22-23", "Mt 16,19; 18,18", "Tg 5,16", "CIC §§ 1441-1467", "CDC c. 983"],
  },
  {
    slug: "eucaristia-e-simbolo",
    categoria: "Sacramentos",
    objecao: "A Eucaristia é apenas um símbolo, não o corpo real de Cristo.",
    resposta: [
      "No discurso do capítulo sexto de João, quando os ouvintes se escandalizam com a expressão 'comer a minha carne', Jesus não corrige nem ameniza: reforça, e muitos o abandonam por isso.",
      "São Paulo declara que comer indignamente o pão torna alguém réu do corpo e do sangue do Senhor, o que não faria sentido diante de um símbolo.",
      "O testemunho patrístico é explícito e antigo: Santo Inácio de Antioquia, por volta do ano 107, e São Justino, cerca de 155, afirmam a identidade real entre o pão consagrado e a carne de Cristo.",
    ],
    fontes: [
      "Jo 6,51-66",
      "1Cor 11,27-29",
      "Inácio de Antioquia, Smirn. 7,1",
      "Justino, I Apologia 66",
      "Trento, ses. XIII (DH 1636-1651)",
      "CIC §§ 1373-1381",
    ],
  },
  // ===== MARIA E SANTOS =====
  {
    slug: "maria-teve-outros-filhos",
    categoria: "Maria e santos",
    objecao: "A Bíblia fala dos irmãos de Jesus, logo Maria teve outros filhos.",
    resposta: [
      "O grego adelphós, como o aramaico correspondente, designa também primos e parentes próximos; não havia no vocabulário semítico do tempo uma palavra corrente para 'primo'.",
      "Dois dos 'irmãos' nomeados em Marcos, Tiago e José, aparecem como filhos de outra Maria, distinta da mãe de Jesus.",
      "Na cruz, Jesus confia sua mãe a João; entregar a mãe a um discípulo seria incompreensível se ela tivesse outros filhos vivos, obrigados por lei e costume a acolhê-la.",
    ],
    fontes: [
      "Mc 6,3 e Mc 15,40",
      "Jo 19,26-27",
      "Gn 13,8 (uso amplo de 'irmão')",
      "CIC §§ 499-501",
      "Lateranense de 649 (DH 503)",
    ],
  },
  {
    slug: "pedir-a-santos-e-idolatria",
    categoria: "Maria e santos",
    objecao: "Pedir aos santos é idolatria e nega o único mediador, Cristo.",
    resposta: [
      "Há uma diferença de natureza entre adoração, devida somente a Deus, e veneração, prestada a criaturas nas quais Deus agiu; a Igreja definiu essa distinção com precisão.",
      "Pedir a intercessão de um santo é o mesmo ato de pedir a oração de um amigo, com a diferença de que o santo está vivo em Deus; isso não concorre com a mediação única de Cristo, participa dela.",
      "O Apocalipse mostra as orações dos santos apresentadas diante de Deus, e a prática da intercessão está atestada nas inscrições das catacumbas romanas dos primeiros séculos.",
    ],
    fontes: [
      "Ap 5,8; 8,3-4",
      "Niceia II (DH 600-603)",
      "Trento, ses. XXV (DH 1821)",
      "CIC §§ 956, 2132",
      "Lumen Gentium 49-50",
    ],
  },
  {
    slug: "imagens-violam-o-decalogo",
    categoria: "Maria e santos",
    objecao: "Ter imagens em igrejas viola o mandamento contra os ídolos.",
    resposta: [
      "O que a Lei proíbe é a imagem tomada como deus. O mesmo Deus que proibiu ídolos mandou fazer os querubins de ouro sobre a Arca e a serpente de bronze.",
      "A Encarnação muda a questão: o Deus invisível assumiu um rosto humano, e por isso pode ser representado — argumento central do II Concílio de Niceia, em 787, contra a iconoclastia.",
      "A honra prestada à imagem passa ao original representado; ninguém reza ao verniz nem à madeira.",
    ],
    fontes: [
      "Ex 25,18-20; Nm 21,8-9",
      "Niceia II (DH 600-603)",
      "CIC §§ 1159-1162, 2129-2132",
      "Basílio, Sobre o Espírito Santo 18,45",
    ],
  },
  // ===== MORAL E HISTÓRIA =====
  {
    slug: "cruzadas-e-inquisicao",
    categoria: "Moral e história",
    objecao: "Cruzadas e Inquisição provam que a Igreja é violenta.",
    resposta: [
      "São fatos reais e há culpas reais: João Paulo II pediu perdão publicamente, no ano 2000, pelos pecados cometidos em nome da fé.",
      "A pesquisa histórica recente corrige exageros de propaganda: os tribunais da Inquisição espanhola executaram uma fração pequena dos processados, e usavam procedimentos de prova mais rigorosos que os tribunais civis da época, o que não os torna aceitáveis, apenas historicamente compreensíveis.",
      "A Igreja hoje afirma sem ambiguidade a liberdade religiosa como direito fundado na dignidade da pessoa, e considera contrária ao Evangelho qualquer coerção em matéria de fé.",
    ],
    fontes: [
      "Dignitatis Humanae 2-3",
      "CIC §§ 2104-2109",
      "Incarnationis Mysterium, n. 11",
      "Memória e Reconciliação (CTI, 1999)",
    ],
  },
  {
    slug: "igreja-e-a-escravidao",
    categoria: "Moral e história",
    objecao: "A Igreja apoiou a escravidão durante séculos.",
    resposta: [
      "Houve omissões e cumplicidades concretas de clérigos e instituições, e isso não deve ser negado nem relativizado.",
      "Houve também condenações papais explícitas e antigas: Sicut Dudum, de 1435, Sublimis Deus, de 1537, In Supremo Apostolatus, de 1839, e Catholicae Ecclesiae, de 1890, além da ação de missionários como Pedro Claver e Antônio Vieira em defesa dos cativos.",
      "O ensino atual é definitivo: a escravidão é intrinsecamente má, um pecado contra a dignidade da pessoa, sem exceção possível.",
    ],
    fontes: [
      "Sublimis Deus (1537)",
      "In Supremo Apostolatus (1839)",
      "CIC §§ 2414",
      "Veritatis Splendor, n. 80",
      "Gaudium et Spes 27",
    ],
  },
  {
    slug: "abusos-do-clero",
    categoria: "Moral e história",
    objecao: "Os casos de abuso sexual mostram que a Igreja não tem autoridade moral.",
    resposta: [
      "Os crimes são reais, gravíssimos, e o encobrimento por parte de autoridades eclesiásticas agravou o dano; a Igreja reconhece isso em documentos oficiais e pede perdão às vítimas.",
      "A resposta institucional mudou: normas obrigatórias de proteção de menores, dever de comunicação às autoridades civis onde a lei o exige, abolição do segredo pontifício nesses processos em 2019 e responsabilização de bispos negligentes.",
      "A validade de uma doutrina não depende da virtude de quem a pregou — Cristo já advertira contra pastores indignos —, mas a credibilidade sim, e por isso a reparação e a transparência são obrigação, não estratégia.",
    ],
    fontes: [
      "Vos estis lux mundi (2019)",
      "Rescriptum sobre o segredo pontifício (2019)",
      "Carta ao Povo de Deus (2018)",
      "CIC §§ 2284-2287, 2389",
      "Mt 18,6",
    ],
  },
];
