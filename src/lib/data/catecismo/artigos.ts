// Catecismo da Igreja Católica — árvore de artigos com faixa de parágrafos.
//
// VERACIDADE: a estrutura (partes, seções, artigos e a numeração dos parágrafos)
// é fato verificável e não copyrightável. As sínteses abaixo são redação
// própria do Portal Católico, fiéis ao conteúdo do artigo correspondente;
// nenhum parágrafo do CIC é reproduzido literalmente, porque a tradução
// portuguesa é protegida. O texto integral está em vatican.va, linkado em
// cada artigo.
//
// Numeração conforme a edição típica latina (1997), a mesma da edição
// portuguesa em uso no Brasil.

export type ArtigoCIC = {
  slug: string;
  parte: 1 | 2 | 3 | 4;
  /** Bloco (seção/capítulo) a que o artigo pertence — usado no sumário. */
  bloco: string;
  titulo: string;
  /** Primeiro parágrafo do artigo. */
  de: number;
  /** Último parágrafo do artigo. */
  ate: number;
  /** Síntese própria, fiel ao artigo. */
  sintese: string;
  /** Pontos-chave com o parágrafo de referência. */
  pontos: string[];
};

export const ARTIGOS: ArtigoCIC[] = [
  // ═══════════════ PARTE I — A PROFISSÃO DA FÉ ═══════════════
  {
    slug: "desejo-de-deus",
    parte: 1,
    bloco: "Prólogo e o homem capaz de Deus",
    titulo: "O desejo de Deus e o conhecimento natural",
    de: 27,
    ate: 49,
    sintese:
      "O Catecismo abre a exposição da fé afirmando que o homem é, por sua própria constituição, capaz de Deus: existe nele um desejo de infinito que nenhuma criatura satisfaz. A partir da criação e da consciência moral, a razão humana pode chegar com certeza ao conhecimento de que Deus existe, ainda que esse caminho encontre dificuldades reais — o sofrimento, o mal, a força dos hábitos e o peso do pecado. Falamos de Deus com uma linguagem tirada das criaturas, sempre insuficiente diante do mistério, mas verdadeira: dizemos algo real de Deus quando dizemos que é bom, sem esgotar o que sua bondade é.",
    pontos: [
      "O desejo de Deus está inscrito no coração humano (§ 27).",
      "Vias de acesso a Deus: o mundo criado e a pessoa humana (§§ 31-35).",
      "A linguagem humana sobre Deus é analógica, não equivalente (§§ 39-43).",
    ],
  },
  {
    slug: "revelacao",
    parte: 1,
    bloco: "Deus vem ao encontro do homem",
    titulo: "Deus revela-se e revela seu desígnio de amor",
    de: 50,
    ate: 73,
    sintese:
      "Acima do que a razão alcança, Deus quis revelar-se livremente, comunicando-se a si mesmo e o seu desígnio de salvação. A Revelação percorre etapas pedagógicas: a aliança com Noé, o chamado de Abraão, a formação do povo de Israel por meio de Moisés e dos profetas. Essa história culmina em Jesus Cristo, Verbo encarnado, que é ao mesmo tempo o mediador e a plenitude de toda a Revelação. Por isso a Igreja ensina que não haverá outra revelação pública: nada de essencialmente novo se acrescentará ao que foi dito em Cristo, embora a compreensão desse dom continue a amadurecer ao longo dos séculos.",
    pontos: [
      "Deus se revela por atos e palavras, gratuitamente (§§ 50-53).",
      "Etapas: Noé, Abraão, Israel, os profetas (§§ 56-64).",
      "Cristo é a Revelação plena e definitiva (§§ 65-67).",
    ],
  },
  {
    slug: "transmissao-da-revelacao",
    parte: 1,
    bloco: "Deus vem ao encontro do homem",
    titulo: "A transmissão da Revelação: Tradição, Escritura e Magistério",
    de: 74,
    ate: 100,
    sintese:
      "O que Deus revelou destina-se a todas as gerações, e por isso a Igreja o transmite pela pregação apostólica, viva na Tradição, e pelos escritos inspirados. Tradição e Escritura não são duas fontes concorrentes: brotam da mesma nascente e formam um só depósito da fé confiado à Igreja inteira. A interpretação autêntica desse depósito pertence ao Magistério vivo — o Papa e os bispos em comunhão com ele —, que não está acima da Palavra de Deus, mas a serve. O conjunto dos fiéis, sustentado pelo Espírito Santo, possui um sentido sobrenatural da fé que não se engana quando adere ao que a Igreja crê.",
    pontos: [
      "Tradição e Escritura brotam de uma mesma fonte divina (§§ 80-82).",
      "O Magistério serve a Palavra de Deus, não a domina (§ 86).",
      "O sensus fidei do povo de Deus (§§ 91-93).",
    ],
  },
  {
    slug: "sagrada-escritura",
    parte: 1,
    bloco: "Deus vem ao encontro do homem",
    titulo: "A Sagrada Escritura: inspiração, cânon e interpretação",
    de: 101,
    ate: 141,
    sintese:
      "Deus fala nas Escrituras por meio de homens e à maneira humana: são autores verdadeiros, e Deus é o autor principal. Daí a necessidade de atender ao que os hagiógrafos quiseram dizer, ao gênero literário e às condições de seu tempo, sem perder de vista a unidade de toda a Escritura, a Tradição viva e a analogia da fé. O cânon católico reúne 46 livros do Antigo Testamento e 27 do Novo, entre os quais os Evangelhos ocupam lugar único. Antigo e Novo Testamento iluminam-se mutuamente, e a Igreja venera a Escritura como venera o Corpo do Senhor.",
    pontos: [
      "Inspiração: Deus autor principal, o homem autor verdadeiro (§§ 105-107).",
      "Critérios de interpretação: unidade, Tradição, analogia da fé (§§ 112-114).",
      "Sentidos literal e espiritual; 73 livros no cânon (§§ 115-120).",
    ],
  },
  {
    slug: "resposta-da-fe",
    parte: 1,
    bloco: "A resposta do homem a Deus",
    titulo: "A obediência da fé e as características do ato de crer",
    de: 142,
    ate: 184,
    sintese:
      "Crer é responder livremente a Deus que fala, submetendo-lhe a inteligência e a vontade. Abraão e Maria são os modelos dessa obediência confiante. A fé é ao mesmo tempo graça e ato genuinamente humano: não contraria a liberdade nem a razão, embora ultrapasse o que a razão pode demonstrar. Não se crê isoladamente: recebemos a fé da Igreja e nela a professamos, dizendo primeiro 'creio' no Batismo e 'cremos' na assembleia reunida. Essa fé é necessária à salvação, deve crescer e pode ser perdida — por isso precisa de alimento, testemunho e perseverança.",
    pontos: [
      "Abraão e Maria, modelos da obediência da fé (§§ 145-149).",
      "A fé é graça e ato humano, livre e razoável (§§ 153-159).",
      "'Creio' e 'cremos': fé pessoal e eclesial (§§ 166-169).",
    ],
  },
  {
    slug: "simbolos-da-fe",
    parte: 1,
    bloco: "A profissão da fé cristã",
    titulo: "Os símbolos da fé",
    de: 185,
    ate: 197,
    sintese:
      "Desde o início a Igreja resumiu a fé em fórmulas breves e articuladas, chamadas símbolos ou credos, usadas sobretudo na catequese batismal. Entre os muitos símbolos que a história conheceu, dois têm lugar de honra: o Símbolo dos Apóstolos, antigo credo batismal da Igreja de Roma, e o Símbolo niceno-constantinopolitano, nascido dos dois primeiros concílios ecumênicos e comum a Oriente e Ocidente. O Catecismo comenta a fé seguindo o Símbolo dos Apóstolos, mas recorre constantemente ao niceno, mais explícito em pontos decisivos da doutrina sobre Cristo e o Espírito Santo.",
    pontos: [
      "O símbolo é sinal de reconhecimento e resumo da fé (§§ 187-188).",
      "Estrutura trinitária dos credos, ligada ao Batismo (§ 189).",
      "Apostólico e niceno-constantinopolitano (§§ 194-195).",
    ],
  },
  {
    slug: "um-so-deus",
    parte: 1,
    bloco: "Creio em Deus Pai",
    titulo: "Creio em um só Deus, que revela seu Nome",
    de: 199,
    ate: 231,
    sintese:
      "A fé de Israel e da Igreja começa pela unicidade de Deus: há um só Deus, e nada nem ninguém é comparável a ele. Ao revelar seu Nome a Moisés, Deus se dá a conhecer como aquele que é, fiel e presente, misericordioso e cheio de compaixão. Deus é a própria verdade e a própria caridade: o Antigo Testamento já o mostra apaixonado por seu povo, e o Novo revela que 'Deus é amor'. Reconhecer isso tem consequências práticas para a vida inteira: viver na sua presença, dar graças, confiar nele em todas as circunstâncias e reconhecer a unidade e a dignidade de todos os homens.",
    pontos: [
      "'Eu sou aquele que sou': o Nome revelado (§§ 203-213).",
      "Deus é a Verdade e é o Amor (§§ 214-221).",
      "Consequências práticas de crer no Deus único (§§ 222-227).",
    ],
  },
  {
    slug: "trindade",
    parte: 1,
    bloco: "Creio em Deus Pai",
    titulo: "A Santíssima Trindade: um só Deus em três Pessoas",
    de: 232,
    ate: 267,
    sintese:
      "O mistério central da fé cristã é a Trindade: um só Deus em três Pessoas, Pai, Filho e Espírito Santo. É mistério estritamente sobrenatural, inacessível à razão sozinha, revelado pelo Filho e comunicado no Batismo. A Igreja, para guardar essa fé contra deformações, precisou de linguagem precisa: as Pessoas são realmente distintas entre si, mas não se dividem na única substância divina; distinguem-se pelas relações de origem — o Pai gera, o Filho é gerado, o Espírito procede. E porque são um só Deus, agem sempre juntas: toda obra divina é obra das três, cada uma segundo o que lhe é próprio.",
    pontos: [
      "Dogma: três Pessoas, uma só natureza (§§ 253-255).",
      "As Pessoas distinguem-se pelas relações de origem (§ 254).",
      "A ação divina é comum às três Pessoas (§§ 257-260).",
    ],
  },
  {
    slug: "todo-poderoso",
    parte: 1,
    bloco: "Creio em Deus Pai",
    titulo: "O Pai todo-poderoso e o escândalo do mal",
    de: 268,
    ate: 278,
    sintese:
      "Entre os atributos divinos, o Credo destaca a onipotência: Deus pode tudo o que quer, e seu poder é universal, amoroso e paterno. Essa onipotência revela-se de modo desconcertante na criação a partir do nada, no perdão dos pecados e sobretudo na fraqueza aparente da Cruz e na Ressurreição. Justamente aí se coloca a pergunta mais dura da fé: se Deus é todo-poderoso e Pai, por que existe o mal? O Catecismo não oferece uma resposta que dissolva o mistério, mas indica que a fé inteira, tomada em conjunto, é a resposta — sobretudo o fato de que Deus não elimina o mal de fora, e sim o vence por dentro, assumindo-o em Cristo.",
    pontos: [
      "A onipotência divina é universal, amorosa e misteriosa (§§ 268-271).",
      "Manifesta-se na Cruz e na Ressurreição (§ 272).",
      "O problema do mal só se ilumina no conjunto da fé (§§ 272-274).",
    ],
  },
  {
    slug: "criador",
    parte: 1,
    bloco: "Creio em Deus Pai",
    titulo: "Criador do céu e da terra",
    de: 279,
    ate: 324,
    sintese:
      "A criação é o começo da história da salvação e obra comum das três Pessoas divinas. Deus cria livremente, do nada, sem necessidade alguma, para manifestar e comunicar sua glória, e o que cria é bom e ordenado. A fé na criação não concorre com o estudo científico das origens: são planos distintos de pergunta, e a Igreja reconhece o valor próprio da pesquisa sobre a idade e o desenvolvimento do cosmo. Deus não abandona o que fez: sustenta o mundo pela providência e conduz a história, associando as criaturas à sua ação e podendo tirar bem até do mal — como fez, supremamente, no mal maior que foi a morte de seu Filho.",
    pontos: [
      "Criação do nada, livre e ordenada ao bem (§§ 295-299).",
      "Fé e ciência têm objetos e métodos distintos (§§ 283-284).",
      "Providência divina e cooperação das criaturas (§§ 302-314).",
    ],
  },
  {
    slug: "anjos",
    parte: 1,
    bloco: "Creio em Deus Pai",
    titulo: "Os anjos, criaturas espirituais",
    de: 325,
    ate: 354,
    sintese:
      "A existência de seres espirituais, sem corpo, chamados anjos, é verdade de fé atestada pela Escritura e pela Tradição unânime. São criaturas pessoais e imortais, dotadas de inteligência e vontade, que contemplam Deus e o servem como mensageiros de seu desígnio. Estão presentes em toda a história da salvação, e sobretudo junto de Cristo: anunciam seu nascimento, servem-no no deserto, consolam-no na agonia e proclamam sua ressurreição. A Igreja crê também que cada fiel tem a companhia de um anjo para guardá-lo e conduzi-lo, e associa-se ao louvor angélico em cada liturgia.",
    pontos: [
      "Os anjos são criaturas espirituais e pessoais (§§ 328-330).",
      "Cristo é o centro do mundo angélico (§§ 331-333).",
      "Anjos da guarda e liturgia celeste (§§ 334-336).",
    ],
  },
  {
    slug: "homem-imagem-de-deus",
    parte: 1,
    bloco: "Creio em Deus Pai",
    titulo: "O homem, imagem de Deus: corpo, alma e comunhão",
    de: 355,
    ate: 384,
    sintese:
      "O homem é o cume da criação visível: único ser criado à imagem de Deus, chamado a conhecer e amar seu Criador. Por isso possui dignidade de pessoa, não é apenas alguma coisa, mas alguém. É unidade de corpo e alma — a alma espiritual, criada imediatamente por Deus, é imortal e não resulta dos pais. Homem e mulher são criados em igual dignidade e complementaridade, chamados a formar comunhão de vida e a colaborar com Deus transmitindo a vida e cuidando da criação. No estado original, o homem vivia em amizade com Deus, em harmonia consigo mesmo, com o outro e com o mundo.",
    pontos: [
      "Dignidade da pessoa humana, imagem de Deus (§§ 356-358).",
      "Unidade de corpo e alma; a alma é imortal (§§ 362-368).",
      "Igual dignidade do homem e da mulher (§§ 369-373).",
    ],
  },
  {
    slug: "queda-pecado-original",
    parte: 1,
    bloco: "Creio em Deus Pai",
    titulo: "A queda e o pecado original",
    de: 385,
    ate: 421,
    sintese:
      "A existência do pecado é um fato que só se compreende à luz da Revelação: não sabemos o que é o pecado sem conhecer o amor que ele recusa. O relato da queda usa linguagem figurada, mas afirma um acontecimento originante no início da história humana: o abuso da liberdade contra Deus, provocado pela voz de um anjo caído. Suas consequências atingem toda a humanidade — privação da santidade original, morte, sofrimento, inclinação ao mal — transmitidas por propagação, não por imitação, e sanadas pelo Batismo. A narrativa termina, porém, com uma promessa de vitória, e a Igreja canta a Páscoa como o bem que superou infinitamente o mal daquele começo.",
    pontos: [
      "O relato usa linguagem figurada e afirma um fato originante (§§ 390-392).",
      "O pecado original é transmitido, não imitado (§§ 402-405).",
      "A promessa da vitória e o 'felix culpa' pascal (§§ 410-412).",
    ],
  },
  {
    slug: "nomes-de-jesus",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "Jesus, Cristo, Filho único de Deus, Senhor",
    de: 422,
    ate: 455,
    sintese:
      "O centro da catequese é uma pessoa, e os quatro nomes do Credo dizem quem ela é. 'Jesus' significa Deus salva e indica sua missão; 'Cristo' traduz Messias, o ungido pelo Espírito para ser rei, sacerdote e profeta; 'Filho de Deus' não designa nele uma adoção, mas a relação única e eterna com o Pai, confessada por Pedro e proclamada na Transfiguração; 'Senhor' é o título que a Escritura reserva a Deus e que a fé aplica a Jesus, reconhecendo nele a soberania divina. Confessar 'Jesus é Senhor' é o coração da fé apostólica e só é possível pelo Espírito Santo.",
    pontos: [
      "'Jesus': Deus salva (§§ 430-435).",
      "'Cristo': ungido, sacerdote, profeta e rei (§§ 436-440).",
      "'Filho de Deus' e 'Senhor': a divindade confessada (§§ 441-455).",
    ],
  },
  {
    slug: "encarnacao",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "Por que o Verbo se fez carne: verdadeiro Deus e verdadeiro homem",
    de: 456,
    ate: 483,
    sintese:
      "O Verbo assumiu a carne para nos salvar, para que conhecêssemos o amor de Deus, para nos dar um modelo de santidade e para nos tornar participantes da natureza divina. A Igloreja precisou de séculos e de vários concílios para dizer com exatidão esse mistério contra as heresias: Cristo é verdadeiro Deus e verdadeiro homem, uma só Pessoa em duas naturezas, unidas sem confusão e sem separação. Sua humanidade é íntegra: alma humana, conhecimento humano, vontade humana livre, corpo real — e é justamente essa humanidade que se torna, na fé, o ícone visível do Deus invisível.",
    pontos: [
      "Quatro razões da Encarnação (§§ 457-460).",
      "União hipostática: uma Pessoa, duas naturezas (§§ 464-469).",
      "Cristo tem alma, conhecimento e vontade humanos (§§ 470-478).",
    ],
  },
  {
    slug: "concebido-nascido-de-maria",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "Concebido pelo Espírito Santo, nascido da Virgem Maria",
    de: 484,
    ate: 511,
    sintese:
      "A Encarnação começa com a ação do Espírito Santo e o consentimento de uma jovem de Nazaré. Preparada por toda a história de Israel, Maria é predestinada a ser Mãe do Filho de Deus e, para isso, preservada de todo pecado desde a concepção — dogma da Imaculada Conceição, definido em 1854. Seu 'sim' é livre e total, e a Igreja professa sua virgindade antes, no e depois do parto, entendida não como restrição mas como fecundidade única da fé. Ao chamá-la Mãe de Deus, o Concílio de Éfeso (431) defendia sobretudo a unidade da Pessoa de Cristo: quem nasceu dela é o próprio Filho eterno.",
    pontos: [
      "Imaculada Conceição, definida em 1854 (§§ 490-493).",
      "O 'sim' livre de Maria e a maternidade divina (§§ 494-495, Éfeso 431).",
      "Virgindade de Maria e maternidade da Igreja (§§ 496-507).",
    ],
  },
  {
    slug: "misterios-da-vida-de-cristo",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "Os mistérios da vida oculta e pública de Jesus",
    de: 512,
    ate: 570,
    sintese:
      "Toda a vida de Cristo é revelação e mistério de salvação: nada nela é banal. O Natal e a infância mostram um Deus que se faz pequeno; a vida em Nazaré santifica o trabalho e a obediência comum; o batismo no Jordão antecipa o batismo de sua morte; as tentações no deserto revelam a vitória sobre o adversário. A pregação do Reino vem acompanhada de sinais que autenticam a missão, e a escolha dos Doze prepara a Igreja. A Transfiguração dá aos discípulos um antegosto da glória antes da Paixão, e a entrada em Jerusalém abre o mistério pascal, para o qual toda a vida de Jesus caminhava.",
    pontos: [
      "Todos os mistérios da vida de Cristo são salvíficos (§§ 512-521).",
      "Nazaré: santificação da vida comum (§§ 531-534).",
      "Batismo, tentações, Reino, Transfiguração (§§ 535-556).",
    ],
  },
  {
    slug: "paixao-e-morte",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "O processo, a Cruz e a morte redentora",
    de: 571,
    ate: 630,
    sintese:
      "O mistério pascal está no centro da Boa Nova. O Catecismo trata com cuidado da questão histórica da responsabilidade pela morte de Jesus, recusando toda acusação coletiva ao povo judeu e afirmando que todos os pecadores foram, de fato, autores da Paixão. A morte de Cristo é sacrifício voluntário e único: ele entrega livremente a vida, e sua obediência de amor repara o que a desobediência quebrou. Na Última Ceia, Jesus antecipa e significa essa entrega. Na Cruz, o Filho de Deus verdadeiramente morre — e permanece unido, na Pessoa, à natureza humana que a morte separava.",
    pontos: [
      "Nenhuma culpa coletiva pode ser imputada aos judeus (§§ 597-598).",
      "A Paixão está no plano de Deus e é entrega livre (§§ 599-609).",
      "A Ceia antecipa a Cruz; morte real de Cristo (§§ 610-630).",
    ],
  },
  {
    slug: "descida-aos-infernos",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "Desceu à mansão dos mortos",
    de: 631,
    ate: 637,
    sintese:
      "O Credo afirma que Cristo, depois de morrer, desceu à mansão dos mortos — a morada dos que aguardavam o Redentor. Não se trata de um lugar de condenação, mas do estado de todos os que morreram antes dele. A descida significa que a redenção alcança todas as épocas e todos os homens: Cristo levou a Boa Nova aos justos que o precederam, de Abel aos profetas, abrindo-lhes as portas do céu. A alma de Cristo, unida à sua Pessoa divina, desceu ali como Salvador, não como sofredor; e é essa vitória sobre o reino da morte que a Ressurreição manifestará.",
    pontos: [
      "Cristo realmente morreu e esteve entre os mortos (§§ 631-632).",
      "A descida alcança os justos que o precederam (§§ 633-634).",
      "Vitória sobre a morte, prelúdio da Ressurreição (§§ 635-637).",
    ],
  },
  {
    slug: "ressurreicao",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "Ressuscitou no terceiro dia",
    de: 638,
    ate: 658,
    sintese:
      "A Ressurreição é a verdade culminante da fé, crida e pregada desde o primeiro momento da Igreja. É um acontecimento real e histórico, atestado por sinais — o sepulcro vazio, as aparições a Maria Madalena, às mulheres, a Pedro, aos Doze, a mais de quinhentos — e ao mesmo tempo transcendente, porque ninguém viu o próprio ato de ressuscitar. O corpo de Cristo ressuscitado é o mesmo que foi crucificado, mas em estado glorioso, não mais submetido ao tempo e ao espaço. Obra das três Pessoas divinas, a Ressurreição confirma a divindade de Cristo, cumpre as promessas e é a fonte e o modelo da nossa própria ressurreição futura.",
    pontos: [
      "Acontecimento histórico e transcendente (§§ 639-647).",
      "O corpo ressuscitado é o mesmo, em estado glorioso (§§ 645-646).",
      "Fonte e princípio da nossa ressurreição (§§ 654-658).",
    ],
  },
  {
    slug: "ascensao-e-juizo",
    parte: 1,
    bloco: "Creio em Jesus Cristo",
    titulo: "Subiu aos céus e voltará para julgar",
    de: 659,
    ate: 682,
    sintese:
      "Depois de quarenta dias de aparições, Cristo entra definitivamente na glória do Pai: sua humanidade é introduzida no céu, onde intercede sem cessar por nós e nos prepara lugar. Ele reina agora como cabeça da Igreja e Senhor da história, ainda que esse reinado esteja escondido e contestado. A fé espera a sua volta gloriosa, cuja hora é desconhecida e que será precedida por provações e pela recusa de muitos. No fim, o julgamento manifestará a verdade de cada vida e de toda a história, revelando o que cada um fez ou deixou de fazer ao próximo — e, com isso, a justiça e a misericórdia de Deus.",
    pontos: [
      "A humanidade de Cristo entra na glória; intercessão (§§ 659-667).",
      "Reinado presente e escondido de Cristo (§§ 668-672).",
      "Volta gloriosa e Juízo final (§§ 673-682).",
    ],
  },
  {
    slug: "espirito-santo",
    parte: 1,
    bloco: "Creio no Espírito Santo",
    titulo: "Creio no Espírito Santo, Senhor que dá a vida",
    de: 683,
    ate: 747,
    sintese:
      "Ninguém pode confessar Jesus como Senhor sem o Espírito Santo, e é o Espírito quem torna possível todo conhecimento da fé. Ele é a terceira Pessoa da Trindade, adorada com o Pai e o Filho, e age inseparavelmente do Filho em toda a história: prepara o povo pelas promessas, pelos profetas e pelas figuras do Antigo Testamento, forma João Batista, e realiza na Virgem Maria a plenitude do tempo. A Escritura o nomeia com muitos símbolos — água, fogo, óleo, nuvem, pomba, selo. No Pentecostes, o Espírito é derramado sobre a Igreja e nela permanece: santifica, ensina, unifica e envia até o fim dos tempos.",
    pontos: [
      "Missão conjunta e inseparável do Filho e do Espírito (§§ 689-690).",
      "Nomes e símbolos do Espírito Santo (§§ 691-701).",
      "Pentecostes e a ação permanente do Espírito na Igreja (§§ 731-741).",
    ],
  },
  {
    slug: "igreja-misterio",
    parte: 1,
    bloco: "Creio na santa Igreja católica",
    titulo: "A Igreja: origem, missão e mistério",
    de: 748,
    ate: 810,
    sintese:
      "A palavra Igreja significa convocação: o povo que Deus reúne. Nascida no coração do Pai, preparada na história de Israel, instituída por Cristo e manifestada pelo Espírito no Pentecostes, ela é ao mesmo tempo visível e espiritual, sociedade estruturada e comunhão de vida divina. A Escritura a descreve por imagens complementares: redil e rebanho, videira, edifício e templo, esposa e mãe. Três expressões dizem sua realidade mais profunda: Povo de Deus, Corpo de Cristo e Templo do Espírito Santo. Sua missão é ser sinal e instrumento da união dos homens com Deus e entre si.",
    pontos: [
      "Origem, fundação e manifestação da Igreja (§§ 758-769).",
      "Visível e espiritual: um só complexo (§§ 770-780).",
      "Povo de Deus, Corpo de Cristo, Templo do Espírito (§§ 781-810).",
    ],
  },
  {
    slug: "igreja-notas",
    parte: 1,
    bloco: "Creio na santa Igreja católica",
    titulo: "Una, santa, católica e apostólica",
    de: 811,
    ate: 870,
    sintese:
      "As quatro notas do Credo descrevem a Igreja de Cristo. Ela é una, porque tem um só Senhor, uma só fé e um só Batismo, e as feridas da divisão entre cristãos exigem oração, conversão e diálogo pela unidade. É santa, ainda que composta de pecadores, porque santo é aquele que a une a si. É católica, isto é, íntegra e universal, subsistindo na Igreja governada pelo sucessor de Pedro e pelos bispos em comunhão com ele, ainda que elementos verdadeiros de santificação existam fora de suas fronteiras visíveis. E é apostólica, fundada sobre os Apóstolos, guardando o que eles ensinaram e continuando sua missão.",
    pontos: [
      "Unidade e o dever ecumênico (§§ 813-822).",
      "Santa e composta de pecadores; necessidade da Igreja (§§ 823-848).",
      "Apostolicidade e sucessão dos bispos (§§ 857-865).",
    ],
  },
  {
    slug: "fieis-de-cristo",
    parte: 1,
    bloco: "Creio na santa Igreja católica",
    titulo: "Os fiéis: hierarquia, leigos e vida consagrada",
    de: 871,
    ate: 945,
    sintese:
      "Todos os batizados participam, segundo sua condição, do sacerdócio, do profetismo e da realeza de Cristo. O colégio dos bispos, com o Papa como cabeça, recebe o múnus de ensinar, santificar e governar; o Romano Pontífice, pastor de toda a Igreja, goza de primado e, em condições determinadas, de infalibilidade quando proclama definitivamente uma verdade de fé. Os leigos vivem a mesma vocação à santidade no mundo, santificando as realidades temporais de dentro. A vida consagrada, pela profissão dos conselhos evangélicos, é dom para a Igreja e sinal antecipado do Reino que vem.",
    pontos: [
      "Sacerdócio comum dos fiéis e sacerdócio ministerial (§§ 871-873, 1547).",
      "Colégio episcopal, primado e infalibilidade (§§ 880-892).",
      "Vocação dos leigos e vida consagrada (§§ 897-945).",
    ],
  },
  {
    slug: "comunhao-dos-santos",
    parte: 1,
    bloco: "Creio na santa Igreja católica",
    titulo: "A comunhão dos santos",
    de: 946,
    ate: 962,
    sintese:
      "Crer na comunhão dos santos é crer que a Igreja é uma comunhão real de bens espirituais: a fé, os sacramentos, os carismas e a caridade circulam entre todos os membros. Essa comunhão não é interrompida pela morte. A Igreja peregrina na terra, os que se purificam e os que já contemplam a Deus formam um só Corpo, e nele os mais fortes sustentam os mais fracos: os santos intercedem por nós, e nós podemos ajudar os defuntos com a oração e sobretudo com a Eucaristia. Nada do que é feito por amor se perde nessa economia de solidariedade.",
    pontos: [
      "Comunhão dos bens espirituais e da caridade (§§ 947-953).",
      "As três situações da Igreja: terra, purificação, glória (§ 954).",
      "Intercessão dos santos e sufrágio pelos defuntos (§§ 956-958).",
    ],
  },
  {
    slug: "maria-mae-da-igreja",
    parte: 1,
    bloco: "Creio na santa Igreja católica",
    titulo: "Maria, Mãe de Cristo e Mãe da Igreja",
    de: 963,
    ate: 975,
    sintese:
      "A figura de Maria é inseparável do mistério da Igreja: ela é a mais perfeita realização do que a Igreja é chamada a ser. Associada de modo único à obra do Filho, foi ao término da vida terrena elevada em corpo e alma à glória — dogma da Assunção, definido em 1950 —, antecipação da ressurreição de todos os membros do Corpo de Cristo. Sua maternidade não cessou: continua a intercedê-los junto ao Filho, e por isso a Igreja a invoca com títulos como advogada e medianeira, sempre entendidos como participação na única mediação de Cristo, e presta-lhe um culto singular, distinto da adoração devida a Deus.",
    pontos: [
      "Maria é figura e mãe da Igreja (§§ 963-970).",
      "Assunção, definida em 1950 (§§ 966-967).",
      "Culto mariano distinto da adoração (§ 971).",
    ],
  },
  {
    slug: "perdao-dos-pecados",
    parte: 1,
    bloco: "Creio na vida eterna",
    titulo: "Creio no perdão dos pecados",
    de: 976,
    ate: 987,
    sintese:
      "O Credo liga o perdão dos pecados ao Batismo, primeiro e principal sacramento do perdão, que apaga o pecado original e todos os pecados pessoais. Como a vida nova pode ser perdida, Cristo confiou aos Apóstolos o poder de perdoar em seu nome — o que a Igreja exerce no sacramento da Penitência. Não há falta, por grave que seja, que a Igreja não possa perdoar a quem se arrepende sinceramente. Esse poder das chaves é sinal de que a misericórdia divina é mais forte que o pecado, e que na Igreja o pecador encontra sempre um caminho de retorno.",
    pontos: [
      "O Batismo é o primeiro sacramento do perdão (§§ 977-978).",
      "O poder das chaves confiado à Igreja (§§ 979-983).",
      "Nenhum pecado é maior que a misericórdia (§ 982).",
    ],
  },
  {
    slug: "ressurreicao-da-carne",
    parte: 1,
    bloco: "Creio na vida eterna",
    titulo: "Creio na ressurreição da carne",
    de: 988,
    ate: 1019,
    sintese:
      "A fé cristã não espera apenas a sobrevivência da alma, mas a ressurreição do corpo. Quem ressuscita é o homem todo, e ressuscitará porque Cristo ressuscitou e nos comunica seu Espírito. Isso acontecerá no último dia, no fim do mundo, por obra do poder divino; como será, ultrapassa o que podemos imaginar — o corpo será o mesmo, transformado em corpo glorioso e incorruptível. Já agora vivemos ligados a essa esperança pelo Batismo e pela Eucaristia. A morte, consequência do pecado, foi transformada por Cristo: para quem morre nele, morrer é entrar mais plenamente na vida.",
    pontos: [
      "Ressuscita o homem inteiro, corpo e alma (§§ 988-1004).",
      "No último dia, por obra de Deus (§§ 1001-1004).",
      "Sentido cristão da morte (§§ 1005-1014).",
    ],
  },
  {
    slug: "escatologia",
    parte: 1,
    bloco: "Creio na vida eterna",
    titulo: "Juízo particular, céu, purgatório, inferno e vida eterna",
    de: 1020,
    ate: 1060,
    sintese:
      "Cada homem recebe, imediatamente após a morte, uma retribuição eterna num juízo particular que refere sua vida a Cristo. Quem morre na graça e perfeitamente purificado vive para sempre a visão de Deus — o céu, que é a felicidade última e o cumprimento de todo desejo humano. Quem morre na amizade de Deus, mas ainda imperfeitamente purificado, passa por uma purificação chamada purgatório, e os fiéis podem ajudá-lo com orações e sufrágios. Quem morre em pecado mortal, sem arrepender-se, permanece separado de Deus por escolha livre e definitiva: é o inferno, cuja pena principal é essa separação eterna. No fim, o Juízo final e a renovação de todas as coisas.",
    pontos: [
      "Juízo particular imediatamente após a morte (§ 1022).",
      "Céu: visão de Deus; purgatório: purificação (§§ 1023-1032).",
      "Inferno: separação eterna e livremente escolhida (§§ 1033-1037).",
    ],
  },
  {
    slug: "amem",
    parte: 1,
    bloco: "Creio na vida eterna",
    titulo: "'Amém': a fé selada na fidelidade de Deus",
    de: 1061,
    ate: 1065,
    sintese:
      "O Credo termina como termina o último livro da Escritura: com o 'Amém'. A palavra hebraica está ligada à raiz de 'crer' e evoca solidez, fidelidade, verdade. Dizer 'Amém' ao fim da profissão de fé é confiar não em nossas convicções, mas na fidelidade de Deus que nunca falta. E porque Cristo é o Amém definitivo do amor do Pai por nós, cada vez que a Igreja o pronuncia — no Credo, na oração, na liturgia — ela se une ao próprio Cristo, ratificando com ele o desígnio de salvação que acaba de confessar.",
    pontos: [
      "'Amém' expressa solidez e fidelidade (§ 1062).",
      "Deus é o Deus do Amém, digno de confiança (§ 1063).",
      "Cristo é o Amém definitivo (§ 1065).",
    ],
  },

  // ═══════════════ PARTE II — A CELEBRAÇÃO DO MISTÉRIO CRISTÃO ═══════════════
  {
    slug: "liturgia-obra-da-trindade",
    parte: 2,
    bloco: "A economia sacramental",
    titulo: "A liturgia, obra da Santíssima Trindade",
    de: 1077,
    ate: 1112,
    sintese:
      "Na liturgia, o Pai é a fonte e o termo de toda bênção: ele nos abençoa em Cristo e a Igreja o abençoa em resposta. Cristo age na liturgia como sacerdote do culto novo: o que fez uma vez por todas na Páscoa torna-se presente e eficaz nos sinais celebrados, sem ser repetido. O Espírito Santo é o pedagogo da fé que prepara a assembleia, faz recordar o mistério, transforma os dons e torna atual a obra de Cristo. Assim, cada celebração é um encontro real, não uma lembrança: memória viva em que a Igreja recebe o que celebra.",
    pontos: [
      "O Pai, fonte e fim das bênçãos litúrgicas (§§ 1077-1083).",
      "A obra de Cristo torna-se presente, não se repete (§§ 1084-1090).",
      "O Espírito Santo, memória e transformação (§§ 1091-1109).",
    ],
  },
  {
    slug: "mistério-sacramental",
    parte: 2,
    bloco: "A economia sacramental",
    titulo: "Os sacramentos de Cristo, da Igreja, da fé e da salvação",
    de: 1113,
    ate: 1134,
    sintese:
      "Os sete sacramentos tocam todos os momentos e todas as etapas decisivas da vida cristã. Foram instituídos por Cristo e confiados à Igreja, que os administra e é por eles edificada. São sacramentos da fé, pois a pressupõem e a alimentam; e são eficazes por si mesmos, porque quem age neles é Cristo — a santidade do ministro não aumenta nem diminui a graça conferida, embora seja decisiva para a fecundidade da celebração. Batismo, Confirmação e Ordem imprimem um caráter indelével e não se repetem. Todos, celebrados dignamente, comunicam a graça própria do sacramento e antecipam a glória.",
    pontos: [
      "Sete sacramentos instituídos por Cristo (§§ 1114-1117).",
      "Eficácia 'ex opere operato' (§§ 1127-1128).",
      "Caráter indelével do Batismo, Confirmação e Ordem (§ 1121).",
    ],
  },
  {
    slug: "celebracao-pascal",
    parte: 2,
    bloco: "A celebração pascal da Igreja",
    titulo: "Quem celebra, como, quando e onde",
    de: 1135,
    ate: 1199,
    sintese:
      "A liturgia é ação de Cristo e de todo o seu Corpo: celebra-a a assembleia inteira, cada um segundo sua função — o bispo e os presbíteros presidindo em nome de Cristo, os ministros e os fiéis com participação ativa e consciente. Ela se expressa por sinais e símbolos tirados da criação, da vida humana e da história da salvação: palavras e ações, cantos, música, imagens sagradas, gestos e silêncio. Tem tempos próprios: o domingo, dia do Senhor e coração do ano; o ano litúrgico, que desdobra os mistérios de Cristo; a Liturgia das Horas, que santifica o dia. E tem espaço próprio: a igreja de pedra, sinal da Igreja viva.",
    pontos: [
      "A assembleia inteira celebra, cada um em seu ofício (§§ 1140-1144).",
      "Sinais, palavras, cantos e imagens sagradas (§§ 1145-1162).",
      "Domingo, ano litúrgico e Liturgia das Horas (§§ 1163-1178).",
    ],
  },
  {
    slug: "diversidade-liturgica",
    parte: 2,
    bloco: "A celebração pascal da Igreja",
    titulo: "Diversidade litúrgica e unidade do mistério",
    de: 1200,
    ate: 1209,
    sintese:
      "O mistério celebrado é um só, mas as formas de celebrá-lo são legitimamente diversas. A Igreja reconhece várias tradições e ritos — latino, bizantino, alexandrino, siríaco, armênio, maronita, caldeu, entre outros —, todos de igual dignidade e todos expressão da mesma fé apostólica. Essa diversidade é riqueza, não ameaça: mostra que o Evangelho pode encarnar-se em culturas diferentes sem perder identidade. O critério de discernimento é a fidelidade à comunhão com a Igreja universal e à substância dos sacramentos: adaptações são possíveis, rupturas não.",
    pontos: [
      "Ritos diversos, mesma fé e igual dignidade (§§ 1200-1203).",
      "Inculturação legítima da liturgia (§§ 1204-1206).",
      "Critério: comunhão e substância do sacramento (§§ 1206-1209).",
    ],
  },
  {
    slug: "batismo",
    parte: 2,
    bloco: "Sacramentos da iniciação cristã",
    titulo: "O sacramento do Batismo",
    de: 1213,
    ate: 1284,
    sintese:
      "O Batismo é a porta da vida no Espírito e o acesso aos outros sacramentos. Prefigurado pela água das origens, pelo dilúvio, pela travessia do mar e pelo Jordão, é celebrado por imersão ou infusão de água, com a invocação da Trindade. Apaga o pecado original e os pecados pessoais, faz do batizado filho adotivo de Deus, membro do Corpo de Cristo e templo do Espírito, e imprime um selo indelével — por isso não se repete. É necessário à salvação para quem ouviu o Evangelho, o que a Igreja professa reconhecendo ao mesmo tempo caminhos de graça para quem morre pela fé ou busca sinceramente a verdade; e confia à misericórdia divina as crianças mortas sem Batismo.",
    pontos: [
      "Matéria e forma: água e invocação trinitária (§§ 1239-1240).",
      "Efeitos: perdão, filiação divina, caráter indelével (§§ 1262-1274).",
      "Batismo de sangue, de desejo e o caso das crianças (§§ 1257-1261).",
    ],
  },
  {
    slug: "confirmacao",
    parte: 2,
    bloco: "Sacramentos da iniciação cristã",
    titulo: "O sacramento da Confirmação",
    de: 1285,
    ate: 1321,
    sintese:
      "A Confirmação completa a graça batismal, enraizando o cristão mais profundamente na filiação divina e conferindo-lhe força para testemunhar a fé publicamente. No rito romano celebra-se pela unção com o santo crisma na fronte, com a imposição da mão e as palavras que dão o dom do Espírito Santo; imprime caráter indelével e, por isso, não se repete. O ministro ordinário é o bispo, embora o direito preveja casos em que presbíteros confirmam — no batismo de adultos, na recepção à plena comunhão e, em perigo de morte, por qualquer sacerdote. Nas Igrejas orientais católicas é conferida junto ao Batismo, sublinhando a unidade da iniciação.",
    pontos: [
      "Unção com o crisma; caráter indelével (§§ 1293-1301, 1304).",
      "Efeitos: dom do Espírito e força para o testemunho (§§ 1302-1305).",
      "Ministro: o bispo; presbíteros conforme o direito (§§ 1312-1314).",
    ],
  },
  {
    slug: "eucaristia",
    parte: 2,
    bloco: "Sacramentos da iniciação cristã",
    titulo: "O sacramento da Eucaristia",
    de: 1322,
    ate: 1419,
    sintese:
      "A Eucaristia é fonte e ápice de toda a vida cristã: nela está contido o próprio Cristo, nossa Páscoa. Instituída na Última Ceia, é ao mesmo tempo memorial, sacrifício e banquete — não uma nova imolação, mas a presença sacramental do único sacrifício da Cruz. Pela ação do Espírito e pelas palavras do sacerdote, o pão e o vinho tornam-se verdadeiramente o Corpo e o Sangue de Cristo: a Igreja chama essa conversão de transubstanciação, e a presença permanece enquanto subsistirem as espécies, o que fundamenta a adoração eucarística. A comunhão exige estado de graça, aumenta a união com Cristo, perdoa os pecados veniais e compromete com os pobres.",
    pontos: [
      "Memorial, sacrifício e presença real (§§ 1362-1381).",
      "Transubstanciação e adoração do Santíssimo (§§ 1376-1381).",
      "Condições e frutos da comunhão (§§ 1385-1401).",
    ],
  },
  {
    slug: "penitencia",
    parte: 2,
    bloco: "Sacramentos de cura",
    titulo: "O sacramento da Penitência e da Reconciliação",
    de: 1422,
    ate: 1498,
    sintese:
      "O batizado que peca pode ser reconciliado com Deus e com a Igreja neste sacramento, chamado de conversão, penitência, confissão, perdão e reconciliação — cinco nomes que dizem cinco faces do mesmo dom. O penitente contribui com três atos: a contrição, que é a dor e a recusa do pecado; a confissão dos pecados ao sacerdote; e a satisfação, isto é, a reparação possível do dano. Os pecados graves devem ser confessados individualmente, e o sacerdote está absolutamente vinculado ao sigilo, que não admite exceção. O sacramento restitui a graça, reconcilia com a Igreja, remite a pena eterna e dá paz de consciência.",
    pontos: [
      "Atos do penitente: contrição, confissão, satisfação (§§ 1450-1460).",
      "Sigilo sacramental inviolável (§ 1467).",
      "Efeitos: reconciliação com Deus e com a Igreja (§§ 1468-1470).",
    ],
  },
  {
    slug: "uncao-dos-enfermos",
    parte: 2,
    bloco: "Sacramentos de cura",
    titulo: "O sacramento da Unção dos Enfermos",
    de: 1499,
    ate: 1532,
    sintese:
      "A Igreja recebeu do Senhor o cuidado dos doentes e o sinal sacramental da unção, atestado já na carta de Tiago. Destina-se ao fiel que começa a estar em perigo por doença grave ou por idade avançada, e pode ser repetido se a doença se agrava ou se outra sobrevém. Celebra-se com a unção da fronte e das mãos, no rito romano, com óleo bento, e só bispos e presbíteros podem administrá-lo. Seus efeitos são a graça de força e paz para enfrentar a enfermidade, a união à Paixão de Cristo, o perdão dos pecados se o doente não pôde obtê-lo de outro modo e, quando convém à salvação, a recuperação da saúde.",
    pontos: [
      "Fundamento em Tg 5,14-15 (§§ 1510-1511).",
      "Perigo por doença grave ou idade avançada; repetível (§ 1514).",
      "Ministros: apenas bispos e presbíteros (§ 1516).",
    ],
  },
  {
    slug: "ordem",
    parte: 2,
    bloco: "Sacramentos ao serviço da comunhão",
    titulo: "O sacramento da Ordem",
    de: 1536,
    ate: 1600,
    sintese:
      "Pela Ordem, a missão confiada por Cristo aos Apóstolos continua a ser exercida na Igreja. O sacerdócio ministerial difere essencialmente do sacerdócio comum de todos os batizados, e está a seu serviço: o ministro age em nome de Cristo cabeça. São três os graus: episcopado, presbiterado e diaconato. Cada um se confere pela imposição das mãos do bispo e pela oração consecratória, e imprime caráter indelével, de modo que a ordenação não se repete e não pode ser revogada. A Igreja se reconhece vinculada à escolha do Senhor ao conferir a ordenação somente a homens batizados; na Igreja latina, o presbiterado é ordinariamente ligado ao celibato.",
    pontos: [
      "Três graus: bispo, presbítero, diácono (§§ 1554-1571).",
      "Rito essencial: imposição das mãos e oração (§ 1573).",
      "Caráter indelével; ministro é o bispo (§§ 1581-1584).",
    ],
  },
  {
    slug: "matrimonio",
    parte: 2,
    bloco: "Sacramentos ao serviço da comunhão",
    titulo: "O sacramento do Matrimônio",
    de: 1601,
    ate: 1666,
    sintese:
      "A aliança matrimonial, inscrita na própria criação do homem e da mulher, foi elevada por Cristo à dignidade de sacramento. Nasce do consentimento livre dos esposos, que na Igreja latina são os próprios ministros do sacramento, com a assistência qualificada do sacerdote ou diácono exigida para a validade; nas Igrejas orientais católicas, a bênção do sacerdote é requerida. Suas propriedades essenciais são a unidade e a indissolubilidade, ordenadas ao bem dos cônjuges e à geração e educação dos filhos. A Igreja reconhece a dor das situações feridas — separação, divórcio civil, novas uniões — e acompanha essas pessoas, que continuam membros da comunidade.",
    pontos: [
      "O consentimento faz o matrimônio (§ 1626; cân. 1057).",
      "Unidade e indissolubilidade; fins do matrimônio (§§ 1643-1654).",
      "A família como Igreja doméstica (§§ 1655-1658).",
    ],
  },
  {
    slug: "sacramentais",
    parte: 2,
    bloco: "Sacramentos ao serviço da comunhão",
    titulo: "Sacramentais, religiosidade popular e exéquias",
    de: 1667,
    ate: 1690,
    sintese:
      "Além dos sacramentos, a Igreja institui sacramentais: sinais sagrados — bênçãos, consagrações, exorcismos, objetos bentos — que preparam para receber a graça e santificam circunstâncias concretas da vida. Não conferem a graça do Espírito à maneira dos sacramentos, mas dispõem a ela pela oração da Igreja. Nessa mesma linha situa-se a religiosidade popular: procissões, romarias, terços, devoções, que prolongam a vida sacramental e devem ser respeitadas e purificadas, não desprezadas. As exéquias cristãs encerram a caminhada: não são sacramento, mas celebração litúrgica em que a Igreja entrega o defunto a Deus e consola os vivos com a esperança da ressurreição.",
    pontos: [
      "Sacramentais dispõem à graça pela oração da Igreja (§§ 1667-1673).",
      "Valor e purificação da piedade popular (§§ 1674-1676).",
      "Exéquias cristãs e esperança da ressurreição (§§ 1680-1690).",
    ],
  },

  // ═══════════════ PARTE III — A VIDA EM CRISTO ═══════════════
  {
    slug: "dignidade-e-bem-aventurancas",
    parte: 3,
    bloco: "A vocação do homem: a vida no Espírito",
    titulo: "Dignidade da pessoa e vocação à bem-aventurança",
    de: 1700,
    ate: 1729,
    sintese:
      "A vida moral cristã não parte de proibições, mas de uma vocação: o homem, imagem de Deus, é chamado à felicidade que só Deus pode dar. As bem-aventuranças do Evangelho desenham o rosto dessa felicidade e revelam o fim último da existência humana, que ultrapassa toda promessa terrena — riqueza, fama, poder, saúde. Reconhecer esse chamado tem consequência imediata: nossos atos e escolhas passam a ser medidos por ele. A moral, assim entendida, é a resposta livre de quem descobriu para que foi feito e aprende a agir de acordo com essa descoberta.",
    pontos: [
      "O homem, imagem de Deus, é chamado à bem-aventurança (§§ 1701-1715).",
      "As bem-aventuranças revelam o fim último (§§ 1716-1724).",
      "A felicidade prometida põe em questão nossas escolhas (§ 1723).",
    ],
  },
  {
    slug: "liberdade-e-moralidade",
    parte: 3,
    bloco: "A vocação do homem: a vida no Espírito",
    titulo: "Liberdade humana e moralidade dos atos",
    de: 1730,
    ate: 1761,
    sintese:
      "Deus criou o homem racional e livre, capaz de iniciativa e responsável por seus atos. A liberdade cresce à medida que adere ao bem; escolhendo o mal, abusa de si mesma e torna-se escrava. A responsabilidade pode ser diminuída ou anulada pela ignorância, pela violência, pelo medo ou por hábitos adquiridos. Para julgar a moralidade de um ato, o Catecismo distingue três elementos: o objeto escolhido, a intenção que move e as circunstâncias em que se age. Uma intenção boa não torna bom um ato mau em seu objeto: há ações que, por si mesmas, são sempre ilícitas, e nenhum fim as justifica.",
    pontos: [
      "Liberdade e responsabilidade; o que as diminui (§§ 1731-1738).",
      "Objeto, intenção e circunstâncias (§§ 1750-1754).",
      "Há atos intrinsecamente maus (§§ 1755-1756).",
    ],
  },
  {
    slug: "paixoes-e-consciencia",
    parte: 3,
    bloco: "A vocação do homem: a vida no Espírito",
    titulo: "As paixões e a consciência moral",
    de: 1762,
    ate: 1802,
    sintese:
      "Os sentimentos e as paixões são realidades humanas boas em si: tornam-se moralmente qualificados quando a razão e a vontade os assumem. A consciência moral é o juízo prático pelo qual a pessoa reconhece a qualidade moral de um ato concreto; deve ser sempre seguida, e ao mesmo tempo precisa ser formada, porque pode errar. Há erros de que a pessoa não é culpada — ignorância invencível — e erros de que é responsável, por descuido em conhecer o bem ou por hábitos que cegaram o juízo. A formação da consciência é tarefa de toda a vida, iluminada pela Palavra de Deus, pelo ensinamento da Igreja e pela oração.",
    pontos: [
      "As paixões são boas quando ordenadas pela razão (§§ 1762-1775).",
      "Dever de seguir a consciência e de formá-la (§§ 1776-1785).",
      "Consciência errônea: culpável ou não (§§ 1790-1794).",
    ],
  },
  {
    slug: "virtudes",
    parte: 3,
    bloco: "A vocação do homem: a vida no Espírito",
    titulo: "As virtudes e os dons do Espírito Santo",
    de: 1803,
    ate: 1845,
    sintese:
      "Virtude é uma disposição estável para fazer o bem, adquirida pela repetição e sustentada pela graça. As quatro virtudes cardeais — prudência, justiça, fortaleza e temperança — organizam a vida humana; as três teologais — fé, esperança e caridade — têm Deus por origem, motivo e objeto, e a caridade é a maior de todas, forma e raiz das demais. A elas se juntam os sete dons do Espírito Santo, que tornam o cristão docilmente conduzido, e os frutos que a tradição enumera como sinais dessa presença. O pecado, por contraste, gera vícios, e a tradição identifica sete deles como raízes dos outros.",
    pontos: [
      "Virtudes cardeais: prudência, justiça, fortaleza, temperança (§§ 1805-1809).",
      "Virtudes teologais; a caridade é a maior (§§ 1812-1829).",
      "Dons e frutos do Espírito Santo (§§ 1830-1832).",
    ],
  },
  {
    slug: "pecado",
    parte: 3,
    bloco: "A vocação do homem: a vida no Espírito",
    titulo: "O pecado: gravidade, espécies e proliferação",
    de: 1846,
    ate: 1876,
    sintese:
      "O anúncio da misericórdia é a chave para falar do pecado: só quem sabe que é amado consegue reconhecer-se pecador sem desespero. O pecado é uma palavra, ato ou desejo contrário à lei eterna, ofensa a Deus e ferida na comunhão eclesial. Distingue-se o pecado mortal — matéria grave, plena consciência e consentimento deliberado, que destrói a caridade no coração — do pecado venial, que a fere sem destruí-la. A repetição de atos maus gera vícios que obscurecem o juízo; e há estruturas e situações que constituem verdadeiros pecados sociais, na medida em que resultam de escolhas pessoais e as favorecem.",
    pontos: [
      "Definição de pecado e sua diversidade (§§ 1849-1853).",
      "Pecado mortal: três condições (§§ 1857-1861).",
      "Pecado venial, vícios e proliferação do pecado (§§ 1862-1869).",
    ],
  },
  {
    slug: "pessoa-e-sociedade",
    parte: 3,
    bloco: "A comunidade humana",
    titulo: "Pessoa, sociedade, autoridade e justiça social",
    de: 1877,
    ate: 1948,
    sintese:
      "A vocação humana é comunitária: ninguém se realiza sozinho, e a sociedade existe para servir a pessoa, não o contrário. Toda sociedade precisa de autoridade legítima, que só obriga quando busca o bem comum e respeita a lei moral. O Catecismo enuncia aqui princípios centrais da doutrina social: o bem comum, a subsidiariedade — segundo a qual instâncias superiores não devem absorver o que instâncias menores podem fazer —, a participação de todos na vida pública e a solidariedade. Afirma também a igual dignidade de todos os homens, condenando toda discriminação, e reconhece que desigualdades escandalosas exigem correção.",
    pontos: [
      "A sociedade está a serviço da pessoa (§§ 1878-1889).",
      "Bem comum, subsidiariedade e participação (§§ 1905-1917).",
      "Igual dignidade e solidariedade (§§ 1934-1948).",
    ],
  },
  {
    slug: "lei-moral",
    parte: 3,
    bloco: "A lei de Deus",
    titulo: "A lei natural, a Lei antiga e a Lei nova",
    de: 1949,
    ate: 1986,
    sintese:
      "A lei moral é obra da sabedoria divina que indica ao homem os caminhos da verdadeira liberdade. Sua primeira forma é a lei natural, inscrita na razão de todo homem, universal e imutável em seus preceitos fundamentais, ainda que percebida de modo desigual nas culturas. A Lei antiga, resumida no Decálogo, é a primeira etapa da lei revelada: santa e boa, mas ainda imperfeita, pedagogia que prepara para Cristo. A Lei nova ou evangélica é a plenitude: obra do Espírito Santo, ela age pela caridade, tem no Sermão da Montanha sua expressão maior e não abole a antiga, mas a leva ao seu fim.",
    pontos: [
      "Lei natural: universal, imutável em seus preceitos (§§ 1954-1960).",
      "A Lei antiga é pedagogia para Cristo (§§ 1961-1964).",
      "A Lei nova age pela caridade (§§ 1965-1974).",
    ],
  },
  {
    slug: "graca-e-justificacao",
    parte: 3,
    bloco: "Graça e justificação",
    titulo: "Justificação, graça e mérito",
    de: 1987,
    ate: 2029,
    sintese:
      "A graça de Cristo justifica o pecador: não é apenas perdão exterior, mas renovação interior que faz do homem justo diante de Deus e o torna participante da vida trinitária. A justificação é obra da misericórdia divina que solicita e nunca coage a liberdade, e nela colaboram graça e consentimento humano. Distingue-se a graça santificante, dom estável, das graças atuais, intervenções pontuais, além dos carismas e graças de estado ordenados ao serviço dos outros. Nossos méritos são reais, mas derivados: só temos algo a apresentar a Deus porque ele mesmo nos deu primeiro. Toda essa doutrina desemboca no chamado universal à santidade.",
    pontos: [
      "Justificação: perdão e renovação interior (§§ 1987-1995).",
      "Graça santificante, graças atuais e carismas (§§ 1996-2004).",
      "Mérito e chamado universal à santidade (§§ 2006-2029).",
    ],
  },
  {
    slug: "igreja-mae-e-educadora",
    parte: 3,
    bloco: "Graça e justificação",
    titulo: "A Igreja, Mãe e Educadora; os mandamentos da Igreja",
    de: 2030,
    ate: 2051,
    sintese:
      "A vida moral não se aprende no isolamento: é na Igreja que o cristão recebe a Palavra, os sacramentos, os exemplos dos santos e o ensino do Magistério. Compete à autoridade da Igreja pronunciar-se sobre questões morais, e essa competência alcança também a ordem social, quando estão em jogo direitos fundamentais e a salvação das almas. Os cinco mandamentos da Igreja fixam o mínimo indispensável de vida litúrgica e moral: participar da Missa nos domingos e festas de preceito, confessar-se ao menos uma vez por ano, comungar ao menos na Páscoa, guardar os dias de jejum e abstinência e prover às necessidades materiais da Igreja.",
    pontos: [
      "A Igreja ensina a moral e a vive (§§ 2030-2040).",
      "Os cinco mandamentos da Igreja (§§ 2041-2043).",
      "O testemunho moral dos fiéis (§§ 2044-2046).",
    ],
  },
  {
    slug: "decalogo",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "O Decálogo na Escritura, na Tradição e na vida",
    de: 2052,
    ate: 2082,
    sintese:
      "Perguntado sobre o que fazer para ter a vida eterna, Jesus remete aos mandamentos e depois convida a seguir-lhe. O Decálogo, recebido no Sinai, é palavra de Deus e caminho de aliança: dez preceitos, transmitidos em enumerações ligeiramente diferentes na tradição judaica e cristã, que se resumem no duplo mandamento do amor a Deus e ao próximo. Pertencem substancialmente à lei natural e por isso obrigam sempre e a todos; formam unidade orgânica, de modo que violar um é ferir a lei inteira. Guardá-los é possível pela graça, e essa observância é já participação na liberdade dos filhos de Deus.",
    pontos: [
      "O Decálogo no contexto da aliança (§§ 2056-2063).",
      "Unidade orgânica dos dez preceitos (§§ 2069, 2079).",
      "Obrigam sempre; a graça torna possível guardá-los (§§ 2072-2074).",
    ],
  },
  {
    slug: "primeiro-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Primeiro mandamento: adorarás a um só Deus",
    de: 2084,
    ate: 2141,
    sintese:
      "O primeiro mandamento chama a crer, esperar e amar a Deus acima de tudo, e a prestar-lhe o culto que só a ele é devido: adoração, oração, sacrifício, cumprimento de promessas. Contrariam-no os pecados contra as virtudes teologais — incredulidade, heresia, apostasia, desespero, presunção, indiferença, ingratidão, ódio a Deus — e as formas de culto desviado: superstição, idolatria, divinação e magia, irreligião, tentar a Deus, sacrilégio e simonia. O mandamento condena também o ateísmo e o agnosticismo enquanto recusas ou evasivas diante de Deus. A veneração das imagens sagradas é legítima, porque a honra prestada à imagem se dirige à pessoa representada.",
    pontos: [
      "Fé, esperança e caridade e os pecados contra elas (§§ 2087-2094).",
      "Superstição, idolatria, divinação, magia (§§ 2110-2117).",
      "Culto das imagens sagradas (§§ 2129-2132).",
    ],
  },
  {
    slug: "segundo-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Segundo mandamento: o Nome do Senhor",
    de: 2142,
    ate: 2167,
    sintese:
      "O nome de Deus é santo, e o segundo mandamento pede que seja respeitado no falar, no pensar e no agir. Proíbe o uso abusivo — a blasfêmia, que é dizer palavras de ódio ou desafio contra Deus, seus santos ou a Igreja; o juramento falso e o perjúrio, que tomam Deus por testemunha da mentira; a promessa feita em nome de Deus sem intenção de cumprir. Positivamente, o mandamento sustenta o hábito cristão de invocar o Nome com reverência, de abençoar e dar graças. O cristão recebe seu nome no Batismo, e esse nome — muitas vezes de um santo — é sinal de que sua identidade última está em Deus.",
    pontos: [
      "Blasfêmia, perjúrio e juramento vão (§§ 2148-2155).",
      "Reverência ao Nome; bênçãos e ações de graças (§§ 2143-2146).",
      "O nome cristão recebido no Batismo (§§ 2156-2159).",
    ],
  },
  {
    slug: "terceiro-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Terceiro mandamento: santificarás o dia do Senhor",
    de: 2168,
    ate: 2195,
    sintese:
      "O sábado bíblico recorda a criação e a libertação do Egito, e é sinal da aliança. Para os cristãos, o dia do Senhor é o domingo, dia da Ressurreição, que não substitui o sábado por comodidade, mas por cumprimento: o novo começo da criação em Cristo. A Igreja pede a participação na Eucaristia dominical como obrigação grave, dispensando quem tem razão séria, e pede também que o domingo seja realmente diferente — descanso do trabalho, tempo para a família, para a caridade, para o silêncio e a cultura. Essa exigência tem alcance social: os fiéis devem defender o direito de todos ao descanso.",
    pontos: [
      "Do sábado ao domingo, dia da Ressurreição (§§ 2168-2176).",
      "Obrigação da Missa dominical e razões de dispensa (§§ 2180-2183).",
      "Descanso, família e dimensão social do domingo (§§ 2184-2195).",
    ],
  },
  {
    slug: "quarto-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Quarto mandamento: família, autoridade e sociedade",
    de: 2196,
    ate: 2257,
    sintese:
      "Depois de Deus, devemos honra aos pais e a quem exerce legítima autoridade. A família fundada no matrimônio é a célula original da vida social e tem direitos próprios, anteriores ao Estado. Aos filhos pede-se respeito, gratidão e, enquanto vivem sob o mesmo teto, obediência; aos pais, a primeira responsabilidade na educação — incluída a educação da fé — e o respeito pela vocação de cada filho. As autoridades civis devem ser respeitadas quando servem o bem comum; e o cidadão tem deveres de participação, verdade, tributo e defesa do país. Onde a lei civil contraria a lei moral, o cristão deve recusar obediência.",
    pontos: [
      "A família, célula original da sociedade (§§ 2207-2213).",
      "Deveres dos filhos e dos pais; educação da fé (§§ 2214-2233).",
      "Deveres do cidadão e limites da obediência civil (§§ 2238-2246).",
    ],
  },
  {
    slug: "quinto-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Quinto mandamento: respeito pela vida humana",
    de: 2258,
    ate: 2330,
    sintese:
      "A vida humana é sagrada desde a concepção até a morte natural, porque só Deus é seu senhor. O mandamento proíbe o homicídio direto e voluntário; admite a legítima defesa, que pode ser dever para quem tem responsabilidade sobre outros. O aborto é gravemente contrário à lei moral desde o primeiro instante da existência, e a eutanásia, entendida como ação ou omissão que causa a morte para eliminar o sofrimento, é igualmente inaceitável — o que não obriga a tratamentos desproporcionados nem impede o cuidado paliativo. Sobre a pena de morte, o Catecismo, em sua redação atual, ensina que ela é inadmissível e que a Igreja trabalha por sua abolição. O mandamento condena ainda o suicídio, o escândalo, a mutilação e o desrespeito ao corpo.",
    pontos: [
      "Legítima defesa e responsabilidade pelos outros (§§ 2263-2267).",
      "Aborto e eutanásia (§§ 2270-2279).",
      "Pena de morte inadmissível, na redação de 2018 (§ 2267).",
    ],
  },
  {
    slug: "sexto-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Sexto mandamento: castidade e amor conjugal",
    de: 2331,
    ate: 2400,
    sintese:
      "A sexualidade humana diz respeito à pessoa inteira e é ordenada ao amor e à vida. A castidade, virtude para todos segundo o próprio estado, integra a sexualidade na pessoa e amadurece com o tempo, a oração e a disciplina de si. Contrariam-na a luxúria, a masturbação, a fornicação, a pornografia, a prostituição e o estupro — este último sempre um crime gravíssimo. Sobre as pessoas de inclinação homossexual, o Catecismo pede que sejam acolhidas com respeito, compaixão e delicadeza, evitando toda discriminação injusta. No matrimônio, o amor conjugal é fiel, exclusivo, aberto à vida e não se compraz na infidelidade, no divórcio nem na contracepção.",
    pontos: [
      "Castidade como integração da sexualidade (§§ 2337-2347).",
      "Respeito e não discriminação das pessoas homossexuais (§§ 2357-2359).",
      "Fidelidade, fecundidade e regulação da natalidade (§§ 2360-2379).",
    ],
  },
  {
    slug: "setimo-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Sétimo mandamento: justiça, bens e trabalho",
    de: 2401,
    ate: 2463,
    sintese:
      "O sétimo mandamento proíbe tomar ou retirar injustamente o bem alheio e exige justiça e caridade no uso dos bens. A propriedade privada é legítima, mas nunca absoluta: os bens da criação destinam-se a toda a humanidade, e por isso a propriedade é acompanhada de destinação universal e de deveres sociais. O mandamento condena o roubo, a fraude, a especulação, a corrupção, o trabalho mal pago e o desrespeito aos animais tanto pela crueldade quanto pela idolatria. Afirma o direito ao trabalho, ao salário justo e à greve nos limites da justiça, e desemboca no amor pelos pobres, medida do juízo final e obrigação de toda a Igreja.",
    pontos: [
      "Propriedade privada e destinação universal dos bens (§§ 2402-2406).",
      "Trabalho, salário justo, greve, atividade econômica (§§ 2426-2436).",
      "Amor preferencial pelos pobres (§§ 2443-2449).",
    ],
  },
  {
    slug: "oitavo-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Oitavo mandamento: verdade e testemunho",
    de: 2464,
    ate: 2513,
    sintese:
      "Deus é a verdade, e a vida em Cristo exige veracidade em palavras e atos. O mandamento condena o falso testemunho, o perjúrio, o juízo temerário, a maledicência, a calúnia, a adulação e a mentira, cuja gravidade se mede pela verdade que deforma e pelo dano que causa. Exige também reparação: quem prejudicou a reputação de alguém deve corrigir o que disse. Ao mesmo tempo, a verdade não obriga a dizer tudo a todos: o bem e a segurança do próximo, a vida privada e o sigilo profissional impõem discrição, e o segredo sacramental é absoluto. O mandamento inspira ainda o uso responsável dos meios de comunicação e o respeito pela arte e pela beleza.",
    pontos: [
      "Ofensas à verdade e dever de reparação (§§ 2475-2487).",
      "Respeito à vida privada e aos segredos (§§ 2488-2492).",
      "Meios de comunicação, arte e beleza (§§ 2493-2503).",
    ],
  },
  {
    slug: "nono-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Nono mandamento: pureza do coração",
    de: 2514,
    ate: 2533,
    sintese:
      "Enquanto o sexto mandamento trata dos atos, o nono alcança o desejo: proíbe a concupiscência desordenada, isto é, o apetite que se rebela contra a razão. O combate espiritual pede purificação do coração, sustentada pela virtude da castidade, pela pureza de intenção, pela guarda do olhar, pela disciplina da imaginação e pela oração. O Catecismo insiste também na necessidade do pudor, que protege o mistério das pessoas e recusa o desnudamento indiscreto, e chama a uma purificação do ambiente social, marcado por permissividade que joga contra a dignidade da pessoa. A promessa é a bem-aventurança dos puros de coração: eles verão a Deus.",
    pontos: [
      "Concupiscência e combate espiritual (§§ 2514-2520).",
      "Pudor e purificação do clima social (§§ 2521-2527).",
      "Bem-aventurança dos puros de coração (§§ 2518-2519).",
    ],
  },
  {
    slug: "decimo-mandamento",
    parte: 3,
    bloco: "Os Dez Mandamentos",
    titulo: "Décimo mandamento: desprendimento dos bens",
    de: 2534,
    ate: 2557,
    sintese:
      "O décimo mandamento completa o sétimo, voltando-se para a raiz interior: proíbe a cobiça desordenada dos bens alheios e o desejo desmedido de acumular. Aí se enraízam a avareza, que faz do dinheiro fim último, e a inveja, tristeza pelo bem do outro que pode chegar a desejar-lhe o mal. Contra elas, a Tradição propõe a benevolência, a humildade e sobretudo a pobreza de espírito — desprendimento que liberta o coração e abre para a confiança na providência. O horizonte do mandamento é o desejo de ver a Deus, que só se sacia nele: quem entende isso ordena todos os outros desejos ao Reino.",
    pontos: [
      "Cobiça, avareza e inveja (§§ 2534-2540).",
      "Pobreza de espírito e desprendimento (§§ 2544-2550).",
      "'Quero ver a Deus': o desejo último (§§ 2548-2550).",
    ],
  },

  // ═══════════════ PARTE IV — A ORAÇÃO CRISTÃ ═══════════════
  {
    slug: "revelacao-da-oracao",
    parte: 4,
    bloco: "A revelação da oração",
    titulo: "A oração revelada no Antigo Testamento",
    de: 2566,
    ate: 2597,
    sintese:
      "Rezar é possível porque Deus procura o homem primeiro; a oração é sempre resposta a um chamado. O Antigo Testamento mostra essa história em figuras concretas: a criação e a promessa, Abraão que intercede e obedece, Jacó que luta na noite, Moisés que fala com Deus face a face e intercede pelo povo. Os reis e profetas aprendem a rezar voltando o coração ao Deus da aliança, e o Templo torna-se casa de oração. Os Salmos são o cume dessa pedagogia: nascidos da história de Israel e assumidos pela Igreja, ensinam a rezar em todas as situações humanas, do louvor à queixa mais crua.",
    pontos: [
      "A oração é resposta ao chamado de Deus (§§ 2566-2567).",
      "Abraão, Moisés, os reis e os profetas (§§ 2570-2584).",
      "Os Salmos, oração de Israel e da Igreja (§§ 2585-2597).",
    ],
  },
  {
    slug: "oracao-plenamente-revelada",
    parte: 4,
    bloco: "A revelação da oração",
    titulo: "A oração plenamente revelada em Jesus e em Maria",
    de: 2598,
    ate: 2622,
    sintese:
      "Jesus é ao mesmo tempo mestre e modelo de oração: reza nos momentos decisivos, retira-se ao deserto e à montanha, e ensina os discípulos a rezar com simplicidade, insistência, vigilância e fé. Suas próprias palavras revelam a relação filial que está no fundo de toda oração cristã. A Igreja aprende também a rezar 'em seu nome', o que dá à oração um acesso novo ao Pai. Maria aparece como aquela cuja oração coopera de modo único com o desígnio de Deus: seu 'sim' na Anunciação, seu cântico de louvor e seu pedido em Caná mostram uma oração de fé, de confiança e de intercessão.",
    pontos: [
      "Jesus reza e ensina a rezar (§§ 2598-2615).",
      "Rezar 'em nome de Jesus' (§§ 2614-2616).",
      "A oração da Virgem Maria: 'sim', Magnificat, Caná (§§ 2617-2622).",
    ],
  },
  {
    slug: "tradicao-orante",
    parte: 4,
    bloco: "A tradição da oração",
    titulo: "As fontes e as formas da oração",
    de: 2623,
    ate: 2649,
    sintese:
      "A Igreja aprende a rezar nas fontes que Deus lhe deu: a Palavra de Deus, a liturgia, as virtudes teologais e as circunstâncias de cada dia. Dessas fontes brotam formas complementares de oração. A bênção e a adoração reconhecem a grandeza de Deus. A oração de petição pede antes de tudo o perdão e o Reino, e leva ao coração de Deus todas as necessidades reais. A intercessão amplia o coração até os outros, inclusive os inimigos. A ação de graças reconhece o dom recebido em cada acontecimento. E o louvor, forma mais desinteressada, ama Deus por ele mesmo e é a linguagem própria da liturgia e da vida eterna.",
    pontos: [
      "Fontes: Palavra, liturgia, virtudes teologais, o hoje (§§ 2650-2660).",
      "Bênção, adoração, petição, intercessão (§§ 2626-2636).",
      "Ação de graças e louvor (§§ 2637-2643).",
    ],
  },
  {
    slug: "caminho-e-mestres",
    parte: 4,
    bloco: "A tradição da oração",
    titulo: "O caminho da oração: Cristo, o Espírito, Maria e os mestres",
    de: 2650,
    ate: 2696,
    sintese:
      "Toda oração cristã passa por Cristo, único caminho ao Pai, e é obra do Espírito Santo, mestre interior que ensina a rezar. Nesse caminho a Igreja reza com Maria e a ela se une, como acontece na Ave-Maria e no rosário. Os santos, cada um com seu carisma, oferecem escolas e caminhos diversos de espiritualidade, todos convergindo para o mesmo Espírito. A oração se aprende em lugares e vínculos concretos: a família como primeiro lugar de educação para a fé, os ministros ordenados, a vida consagrada, a catequese, os grupos de oração e a direção espiritual — e em espaços que a favorecem, da igreja ao oratório doméstico.",
    pontos: [
      "Rezar ao Pai, por Cristo, no Espírito (§§ 2664-2672).",
      "Em comunhão com Maria; a Ave-Maria (§§ 2673-2682).",
      "Guias, lugares e escolas de oração (§§ 2683-2696).",
    ],
  },
  {
    slug: "expressoes-da-oracao",
    parte: 4,
    bloco: "A vida de oração",
    titulo: "Oração vocal, meditação e contemplação",
    de: 2697,
    ate: 2724,
    sintese:
      "A oração é vida do coração novo e precisa de ritmo: momentos determinados no dia, a Liturgia das Horas, a Eucaristia dominical, o alimento de cada tempo litúrgico. A Tradição distingue três expressões dessa vida. A oração vocal, que associa corpo e palavra, é acessível a todos e insubstituível na oração comum. A meditação busca compreender e apropriar-se do que se lê, sobretudo na Escritura, mobilizando pensamento, imaginação e desejo. A contemplação é o olhar simples da fé, silencioso, em que o orante se deixa ver e amar por Deus — dom gratuito que exige, porém, disponibilidade e fidelidade.",
    pontos: [
      "Necessidade de tempos e ritmos de oração (§§ 2697-2699).",
      "Oração vocal e meditação (§§ 2700-2708).",
      "Oração contemplativa (§§ 2709-2719).",
    ],
  },
  {
    slug: "combate-da-oracao",
    parte: 4,
    bloco: "A vida de oração",
    titulo: "O combate da oração",
    de: 2725,
    ate: 2745,
    sintese:
      "Rezar é uma luta: contra nós mesmos e contra o que nos afasta de Deus. Objeções culturais tratam a oração como fuga ou perda de tempo; dificuldades interiores atacam de outro modo — a distração, que revela a que estamos apegados; a aridez, quando a oração parece seca; a acídia, forma de negligência espiritual. A tentação mais frequente é a falta de fé diante de pedidos aparentemente não atendidos, junto com a suspeita de que Deus não escuta. O Catecismo responde lembrando que a oração de Jesus foi ouvida no essencial e não segundo suas aparências, e que a perseverança filial é a forma concreta da confiança.",
    pontos: [
      "Objeções e concepções erradas da oração (§§ 2726-2728).",
      "Distração, aridez, acídia (§§ 2729-2733).",
      "Confiança filial e perseverança (§§ 2734-2745).",
    ],
  },
  {
    slug: "oracao-sacerdotal",
    parte: 4,
    bloco: "A vida de oração",
    titulo: "A oração sacerdotal de Jesus",
    de: 2746,
    ate: 2758,
    sintese:
      "Na hora de sua Páscoa, Jesus reza a oração que a tradição chama sacerdotal: pede ao Pai a glorificação do Filho, para que o Filho glorifique o Pai; pede pelos discípulos que vão continuar sua missão no mundo; e pede pela unidade de todos os que crerão nele, unidade que tem por medida a comunhão entre o Pai e o Filho. Essa oração revela o mistério da salvação como dom de conhecimento e de comunhão: a vida eterna é conhecer o Pai e aquele que ele enviou. Toda oração da Igreja se inscreve nessa oração, que Cristo continua a apresentar ao Pai por nós.",
    pontos: [
      "A hora e a glória do Filho (§§ 2746-2751).",
      "Oração por todos os que crerão (§§ 2750-2751).",
      "A vida eterna é conhecer o Pai e o Filho (§ 2751).",
    ],
  },
  {
    slug: "pai-nosso-resumo",
    parte: 4,
    bloco: "A oração do Senhor: Pai-Nosso",
    titulo: "O Pai-Nosso, resumo de todo o Evangelho",
    de: 2759,
    ate: 2776,
    sintese:
      "A pedido de um discípulo, Jesus deu à Igreja a oração que é sua herança própria. Transmitida em duas versões, é chamada por Tertuliano resumo de todo o Evangelho, e santo Agostinho mostra que qualquer oração legítima pode ser encontrada nela. Desde a antiguidade, o Pai-Nosso pertence à liturgia: é entregue aos catecúmenos, rezado no Batismo, na Liturgia das Horas e na Missa, onde ocupa lugar entre a Oração Eucarística e a comunhão. Sua estrutura é simples: uma invocação e sete petições, as três primeiras voltadas para Deus, as quatro seguintes para as necessidades de quem reza.",
    pontos: [
      "Duas versões evangélicas; resumo do Evangelho (§§ 2759-2764).",
      "Oração da Igreja: catecumenato, Batismo, Missa (§§ 2767-2772).",
      "Estrutura: invocação e sete petições (§§ 2803-2806).",
    ],
  },
  {
    slug: "pai-nosso-invocacao",
    parte: 4,
    bloco: "A oração do Senhor: Pai-Nosso",
    titulo: "'Pai nosso que estás nos céus'",
    de: 2777,
    ate: 2802,
    sintese:
      "Chamar Deus de Pai é uma audácia que só o Evangelho autoriza: pressupõe a filiação recebida em Cristo e pede humildade e confiança de coração simples. Dizer 'nosso' significa reconhecer que ninguém é filho isoladamente: a oração é da Igreja inteira e abre o coração a todos os batizados e a toda a humanidade, expulsando exclusivismos. A expressão 'que estás nos céus' não localiza Deus num lugar distante: designa sua majestade e, ao mesmo tempo, sua presença no coração dos justos. Assim a invocação já contém uma conversão: a de quem se descobre filho, irmão e habitado por Deus.",
    pontos: [
      "'Pai': audácia filial e confiança (§§ 2777-2785).",
      "'Nosso': comunhão eclesial, sem exclusivismo (§§ 2786-2793).",
      "'Que estás nos céus': majestade e presença (§§ 2794-2796).",
    ],
  },
  {
    slug: "tres-primeiras-peticoes",
    parte: 4,
    bloco: "A oração do Senhor: Pai-Nosso",
    titulo: "As três primeiras petições",
    de: 2803,
    ate: 2827,
    sintese:
      "As três primeiras petições voltam-se inteiramente para Deus. 'Santificado seja o teu nome' não acrescenta santidade a Deus: pede que seu nome seja reconhecido como santo em nós e por nós, o que compromete a vida do orante com o testemunho. 'Venha o teu Reino' pede sobretudo a vinda final do Reino pelo retorno de Cristo, e também seu crescimento hoje, na santidade dos que dele vivem. 'Seja feita a tua vontade' pede a união da nossa vontade com a do Pai, cuja vontade é que todos os homens sejam salvos; o modelo dessa entrega é Cristo, e o padrão da execução é o céu.",
    pontos: [
      "'Santificado seja o teu nome' (§§ 2807-2815).",
      "'Venha o teu Reino' (§§ 2816-2821).",
      "'Seja feita a tua vontade' (§§ 2822-2827).",
    ],
  },
  {
    slug: "quatro-ultimas-peticoes",
    parte: 4,
    bloco: "A oração do Senhor: Pai-Nosso",
    titulo: "As quatro últimas petições",
    de: 2828,
    ate: 2854,
    sintese:
      "As quatro petições seguintes apresentam ao Pai nossas necessidades. 'O pão de cada dia' pede confiadamente o necessário para viver — alimento e tudo o que o sustenta — e, ao mesmo tempo, o Pão da vida na Eucaristia; a palavra 'nosso' impõe justiça e partilha. 'Perdoa-nos as nossas ofensas' liga o perdão recebido ao perdão concedido, e o Catecismo insiste que essa condição não é negociável, mesmo quando perdoar exige tempo e graça. 'Não nos deixes cair em tentação' pede discernimento e força no combate espiritual, não a ausência de provações. 'Livra-nos do mal' é pedido concreto de libertação do Maligno e de todos os males, com esperança firme.",
    pontos: [
      "'O pão de cada dia': providência, justiça e Eucaristia (§§ 2828-2837).",
      "Perdão recebido e perdão concedido (§§ 2838-2845).",
      "Tentação e libertação do mal (§§ 2846-2854).",
    ],
  },
  {
    slug: "doxologia-final",
    parte: 4,
    bloco: "A oração do Senhor: Pai-Nosso",
    titulo: "A doxologia final e o 'Amém'",
    de: 2855,
    ate: 2865,
    sintese:
      "A doxologia que na liturgia se acrescenta ao Pai-Nosso — 'teu é o reino, o poder e a glória' — retoma as três primeiras petições e as devolve a Deus como louvor, reconhecendo que o Reino, o poder e a glória são dele e não nossos. O 'Amém' final sela a oração: significa 'assim seja', consentimento pleno às sete petições que acabamos de fazer. Com essa palavra, o cristão ratifica com Cristo e na Igreja tudo o que pediu, e encerra a Parte IV do Catecismo naquela mesma nota de confiança com que a Parte I havia encerrado o Credo.",
    pontos: [
      "A doxologia retoma as três primeiras petições (§§ 2855-2856).",
      "'Amém': consentimento a tudo o que foi pedido (§ 2865).",
      "Louvor final: o Reino é de Deus (§ 2855).",
    ],
  },
];

/** Faixa de parágrafos formatada, ex. "§§ 1322-1419". */
export function faixa(a: ArtigoCIC): string {
  return a.de === a.ate ? `§ ${a.de}` : `§§ ${a.de}-${a.ate}`;
}

export function artigosDaParte(parte: 1 | 2 | 3 | 4): ArtigoCIC[] {
  return ARTIGOS.filter((a) => a.parte === parte);
}

/** Blocos (na ordem em que aparecem) de uma parte. */
export function blocosDaParte(parte: 1 | 2 | 3 | 4): string[] {
  const vistos: string[] = [];
  for (const a of artigosDaParte(parte)) if (!vistos.includes(a.bloco)) vistos.push(a.bloco);
  return vistos;
}

/** Artigo que contém o parágrafo informado (ex.: 1324 → Eucaristia). */
export function artigoPorParagrafo(n: number): ArtigoCIC | undefined {
  return ARTIGOS.find((a) => n >= a.de && n <= a.ate);
}

export function artigoPorSlug(slug: string): ArtigoCIC | undefined {
  return ARTIGOS.find((a) => a.slug === slug);
}

/** URL do texto integral no site da Santa Sé. */
export const VATICAN_INDICE =
  "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html";
