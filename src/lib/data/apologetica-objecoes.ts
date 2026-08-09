/**
 * Banco de objeções e respostas apologéticas.
 * Cada resposta cita fontes verificáveis (Escritura, Padres, concílios, CIC).
 */
export type CategoriaObjecao =
  | "Deus e razão"
  | "Escritura"
  | "Igreja e Papado"
  | "Sacramentos"
  | "Maria e santos"
  | "Moral e história";

export type Objecao = {
  slug: string;
  categoria: CategoriaObjecao;
  objecao: string;
  resposta: string[];
  fontes: string[];
};

export const CATEGORIAS_OBJECAO: CategoriaObjecao[] = [
  "Deus e razão",
  "Escritura",
  "Igreja e Papado",
  "Sacramentos",
  "Maria e santos",
  "Moral e história",
];

export const OBJECOES: Objecao[] = [
  {
    slug: "deus-nao-existe-sem-provas",
    categoria: "Deus e razão",
    objecao: "Não há nenhuma prova da existência de Deus.",
    resposta: [
      "A Igreja nunca afirmou que Deus é demonstrável como um teorema, mas ensina que Ele pode ser conhecido com certeza pela luz natural da razão a partir das criaturas (Concílio Vaticano I, Dei Filius, cap. 2).",
      "Os argumentos clássicos partem de fatos observáveis: existe mudança, existem causas ordenadas, existem seres que podem não existir. Cada série exige um princípio que não dependa de outro — o que chamamos Deus.",
      "Negar isso obriga a aceitar um universo autoexplicativo, o que é justamente a afirmação que se pedia provar.",
    ],
    fontes: ["Dei Filius, cap. 2 (DH 3004)", "CIC §§ 31–36", "Summa Theologiae I, q. 2, a. 3", "Rm 1,19–20"],
  },
  {
    slug: "ciencia-substituiu-religiao",
    categoria: "Deus e razão",
    objecao: "A ciência já explicou tudo; religião é superstição.",
    resposta: [
      "A ciência responde 'como' funcionam os processos naturais; não responde por que existe algo em vez de nada, nem funda obrigações morais.",
      "O modelo cosmológico padrão, formulado pelo sacerdote Georges Lemaître, é compatível com a criação; a genética moderna nasce com o monge Gregor Mendel.",
      "A Igreja ensina explicitamente a inexistência de conflito real entre fé e razão.",
    ],
    fontes: ["Dei Filius, cap. 4 (DH 3017)", "Fides et Ratio, nn. 16–48", "Gaudium et Spes 36"],
  },
  {
    slug: "sofrimento-refuta-deus",
    categoria: "Deus e razão",
    objecao: "Se Deus é bom, por que existe tanto sofrimento?",
    resposta: [
      "O mal não é uma coisa criada, mas privação de um bem devido; Deus permite o mal para dele tirar um bem maior.",
      "A resposta cristã não é uma teoria, mas a Cruz: Deus não explica o sofrimento de fora, entra nele.",
      "A liberdade real implica a possibilidade do abuso; suprimi-la anularia o amor.",
    ],
    fontes: ["CIC §§ 309–314, 385", "Santo Agostinho, Enchiridion 11", "Salvifici Doloris (1984)"],
  },
  {
    slug: "fe-e-cega",
    categoria: "Deus e razão",
    objecao: "Fé é acreditar sem evidência.",
    resposta: [
      "Fé católica é assentimento livre à Palavra de Deus, apoiado em motivos de credibilidade — milagres, profecias, a santidade e a difusão da Igreja.",
      "O Vaticano I define que esses motivos mostram que o assentimento da fé não é um movimento cego do espírito.",
    ],
    fontes: ["CIC §§ 153–156", "Dei Filius, cap. 3 (DH 3008–3010)"],
  },
  {
    slug: "biblia-cheia-de-contradicoes",
    categoria: "Escritura",
    objecao: "A Bíblia está cheia de contradições.",
    resposta: [
      "A maioria das 'contradições' vem de ler gêneros literários diversos como se fossem atas notariais. A Igreja exige atenção ao gênero, à intenção do autor e ao contexto cultural.",
      "Divergências de detalhe entre relatos paralelos (ordem das aparições, número de anjos) são típicas de testemunhos independentes e reforçam, não anulam, a historicidade do núcleo.",
    ],
    fontes: ["Dei Verbum 11–12", "CIC §§ 109–119", "Divino Afflante Spiritu (1943)"],
  },
  {
    slug: "sola-scriptura",
    categoria: "Escritura",
    objecao: "Só a Bíblia é autoridade — a Tradição é invenção humana.",
    resposta: [
      "A própria Escritura manda guardar o que foi transmitido 'seja por palavra, seja por carta' (2Ts 2,15) e chama a Igreja 'coluna e fundamento da verdade' (1Tm 3,15).",
      "A Bíblia não traz sua própria lista de livros: o cânon foi discernido pela Igreja nos sínodos de Hipona (393) e Cartago (397).",
      "Sem Tradição e Magistério, o princípio do sola Scriptura produziu milhares de leituras mutuamente excludentes.",
    ],
    fontes: ["2Ts 2,15; 1Tm 3,15; 2Tm 2,2", "Dei Verbum 9–10", "Trento, Sessão IV (DH 1501)"],
  },
  {
    slug: "livros-deuterocanonicos",
    categoria: "Escritura",
    objecao: "Os católicos acrescentaram sete livros à Bíblia.",
    resposta: [
      "Os deuterocanônicos constavam da Septuaginta, a versão grega usada pelos apóstolos e citada no Novo Testamento.",
      "As listas antigas de Hipona (393), Cartago (397) e a carta de Inocêncio I a Exupério (405) já os incluem — mais de mil anos antes de sua remoção nas edições protestantes.",
      "Portanto não houve acréscimo católico, mas subtração posterior.",
    ],
    fontes: ["Trento, Sessão IV (DH 1502)", "Sínodo de Cartago (397)", "CIC § 120"],
  },
  {
    slug: "jesus-nunca-existiu",
    categoria: "Escritura",
    objecao: "Jesus é um mito; nenhuma fonte fora da Bíblia fala dele.",
    resposta: [
      "Fontes não cristãs do séc. I–II mencionam Cristo e os cristãos: Tácito (Anais XV, 44), Suetônio (Nero 16), Plínio o Jovem (Ep. X, 96) e Flávio Josefo (Antiguidades XVIII, 63; XX, 200).",
      "O credo transmitido em 1Cor 15,3–8 remonta aos anos 30–35 d.C., poucos anos após os fatos.",
      "Nenhum historiador acadêmico sério sustenta hoje a tese mitista.",
    ],
    fontes: ["Tácito, Anais XV, 44", "Josefo, Antiguidades XVIII, 63", "1Cor 15,3–8"],
  },
  {
    slug: "papado-invencao-medieval",
    categoria: "Igreja e Papado",
    objecao: "O Papado é uma invenção medieval.",
    resposta: [
      "São Clemente Romano intervém autoritativamente em Corinto por volta de 96 d.C.; Santo Ireneu (c. 180) recita a lista dos bispos de Roma desde Pedro e fala da 'preeminência' daquela Igreja.",
      "Já no séc. V, o Concílio de Calcedônia acolhe o Tomus de São Leão Magno com a aclamação 'Pedro falou pela boca de Leão'.",
      "Mt 16,18–19, Lc 22,32 e Jo 21,15–17 fundamentam o ministério petrino no próprio Evangelho.",
    ],
    fontes: ["Clemente, Carta aos Coríntios 42–44", "Adversus Haereses III, 3, 1–3", "Pastor Aeternus (DH 3050–3075)"],
  },
  {
    slug: "igreja-mudou-doutrina",
    categoria: "Igreja e Papado",
    objecao: "A Igreja muda de doutrina conforme a época.",
    resposta: [
      "Há desenvolvimento homogêneo, não mutação: a mesma verdade é compreendida com maior profundidade, 'no mesmo dogma, no mesmo sentido, na mesma acepção' (São Vicente de Lérins).",
      "Disciplina (jejum, língua litúrgica, celibato) pode mudar; dogma definido não é revogado.",
    ],
    fontes: ["Commonitorium 23", "Dei Verbum 8", "CIC §§ 66, 94"],
  },
  {
    slug: "chamar-padre-de-pai",
    categoria: "Igreja e Papado",
    objecao: "Jesus proibiu chamar alguém de 'pai' (Mt 23,9).",
    resposta: [
      "A advertência condena a vaidade de quem se põe no lugar de Deus, não o uso comum do termo: São Paulo se apresenta como pai dos coríntios (1Cor 4,15) e chama Timóteo 'meu filho' (1Tm 1,2).",
      "O mesmo texto proíbe chamar alguém de 'mestre', e ninguém interpreta isso como proibição de professores.",
    ],
    fontes: ["Mt 23,8–12", "1Cor 4,15", "1Ts 2,11"],
  },
  {
    slug: "eucaristia-simbolo",
    categoria: "Sacramentos",
    objecao: "A Eucaristia é apenas um símbolo.",
    resposta: [
      "Em Jo 6, diante do escândalo dos ouvintes, Jesus não ameniza: intensifica o verbo (trógein, 'mastigar') e aceita a deserção dos discípulos.",
      "Santo Inácio de Antioquia († c. 107) e São Justino († c. 165) já testemunham a fé na presença real como doutrina recebida.",
      "São Paulo declara réu quem come indignamente 'o Corpo e o Sangue do Senhor' (1Cor 11,27–29) — algo sem sentido para um mero símbolo.",
    ],
    fontes: ["Jo 6,51–58", "1Cor 11,27–29", "Trento, Sessão XIII (DH 1640–1642)", "CIC §§ 1373–1377"],
  },
  {
    slug: "confissao-a-padre",
    categoria: "Sacramentos",
    objecao: "Por que confessar a um homem, se só Deus perdoa?",
    resposta: [
      "Só Deus perdoa — e escolheu perdoar por meio de ministros: 'A quem perdoardes os pecados, serão perdoados' (Jo 20,22–23).",
      "Cristo confiou aos apóstolos o 'ministério da reconciliação' (2Cor 5,18) e o poder de ligar e desligar (Mt 18,18).",
      "O sacramento une a certeza objetiva do perdão à verdade humilde da confissão.",
    ],
    fontes: ["Jo 20,21–23", "2Cor 5,18–20", "CIC §§ 1441–1467", "Trento, Sessão XIV (DH 1670)"],
  },
  {
    slug: "batismo-de-criancas",
    categoria: "Sacramentos",
    objecao: "Batizar crianças é inválido, pois elas não têm fé.",
    resposta: [
      "O Novo Testamento registra o batismo de 'casas' inteiras (At 16,15.33; 1Cor 1,16), expressão que inclui os menores.",
      "O batismo é dom gratuito, não recompensa por mérito; a fé é professada pela Igreja e pelos pais, e depois assumida pessoalmente.",
      "Orígenes e Santo Agostinho atestam a prática como tradição recebida dos apóstolos.",
    ],
    fontes: ["At 16,15.33; 1Cor 1,16", "CIC §§ 1250–1252", "Agostinho, De Baptismo IV, 24"],
  },
  {
    slug: "purgatorio-nao-existe",
    categoria: "Sacramentos",
    objecao: "O purgatório não está na Bíblia.",
    resposta: [
      "2Mac 12,44–46 louva a oração e o sacrifício pelos mortos; 1Cor 3,13–15 fala de quem se salva 'como através do fogo'; Mt 12,32 sugere pecados perdoáveis no século futuro.",
      "O purgatório não é uma segunda chance, mas a purificação final de quem já morreu na graça de Deus.",
      "A oração pelos defuntos é atestada nas catacumbas romanas e na liturgia mais antiga.",
    ],
    fontes: ["2Mac 12,44–46", "1Cor 3,13–15", "CIC §§ 1030–1032", "Trento, Sessão XXV (DH 1820)"],
  },
  {
    slug: "adorar-maria",
    categoria: "Maria e santos",
    objecao: "Católicos adoram Maria.",
    resposta: [
      "A distinção é técnica e antiga: latria (adoração) só a Deus; hiperdulia (veneração singular) a Maria; dulia aos santos.",
      "Toda honra a Maria é cristológica: ela é venerada por ser Mãe de Deus (Theotókos, Éfeso 431) e o Magnificat atribui tudo à graça (Lc 1,46–49).",
      "A própria Escritura a chama 'bendita entre as mulheres' e prevê que 'todas as gerações' a chamarão bem-aventurada.",
    ],
    fontes: ["Lc 1,42.48", "Éfeso (DH 251)", "Lumen Gentium 66–67", "CIC §§ 971, 2110–2114"],
  },
  {
    slug: "orar-aos-santos",
    categoria: "Maria e santos",
    objecao: "Pedir a intercessão dos santos é necromancia.",
    resposta: [
      "Necromancia é consultar os mortos para obter conhecimento oculto; pedir oração é o que já fazemos com irmãos vivos (Tg 5,16).",
      "Os santos estão vivos em Cristo (Lc 20,38) e apresentam a Deus as orações dos fiéis (Ap 5,8; 8,3–4).",
      "A comunhão dos santos é artigo do Credo e decorre da unidade do Corpo Místico (1Cor 12).",
    ],
    fontes: ["Ap 5,8; 8,3–4", "Tg 5,16", "Lumen Gentium 49–51", "CIC §§ 946–962"],
  },
  {
    slug: "imagens-e-idolatria",
    categoria: "Maria e santos",
    objecao: "Ter imagens viola o primeiro mandamento.",
    resposta: [
      "Deus proíbe ídolos, mas Ele mesmo ordena imagens sacras: os querubins da Arca (Ex 25,18–20) e a serpente de bronze (Nm 21,8–9).",
      "Com a Encarnação, o Invisível se tornou visível: por isso o II Concílio de Niceia (787) definiu a legitimidade da veneração das imagens.",
      "A honra prestada à imagem passa ao original que ela representa (São Basílio).",
    ],
    fontes: ["Ex 25,18–20", "II Niceia (787), DH 600–603", "CIC §§ 1159–1162, 2129–2132"],
  },
  {
    slug: "irmaos-de-jesus",
    categoria: "Maria e santos",
    objecao: "Jesus tinha irmãos, logo Maria não é sempre virgem.",
    resposta: [
      "O termo grego adelphós, refletindo o hebraico ah, designa também primos e parentes próximos; o Antigo Testamento chama Ló 'irmão' de Abraão (Gn 13,8).",
      "Tiago e José, chamados 'irmãos do Senhor' (Mc 6,3), são filhos de outra Maria (Mc 15,40).",
      "No Calvário, Jesus confia sua mãe a João (Jo 19,26–27) — inexplicável se houvesse irmãos de sangue.",
    ],
    fontes: ["Mc 6,3; Mc 15,40; Jo 19,26–27", "Lateranense (649), DH 503", "CIC §§ 499–501"],
  },
  {
    slug: "inquisicao-cruzadas",
    categoria: "Moral e história",
    objecao: "A Igreja é culpada da Inquisição e das Cruzadas.",
    resposta: [
      "A historiografia recente reduziu drasticamente os números antes repetidos: a Inquisição espanhola executou cerca de 1% a 2% dos processados ao longo de três séculos, taxa inferior à dos tribunais civis da época.",
      "As Cruzadas nasceram como resposta militar à conquista de territórios cristãos e ao bloqueio das peregrinações; isso não justifica os abusos cometidos.",
      "São João Paulo II pediu perdão publicamente pelos pecados dos filhos da Igreja no Jubileu de 2000, distinguindo a santidade da Igreja das faltas de seus membros.",
    ],
    fontes: ["Memória e Reconciliação (CTI, 2000)", "Incarnationis Mysterium 11 (1998)", "CIC §§ 827, 1428"],
  },
  {
    slug: "igreja-rica",
    categoria: "Moral e história",
    objecao: "A Igreja deveria vender tudo e dar aos pobres.",
    resposta: [
      "A Igreja é a maior rede assistencial do mundo: milhares de hospitais, escolas e obras de caridade sustentados justamente por esse patrimônio.",
      "O patrimônio artístico é, em grande parte, inalienável e mantido em custódia cultural para todos, não em conta bancária.",
      "A doutrina social ensina o destino universal dos bens e a opção preferencial pelos pobres — critério pelo qual a própria Igreja se deixa julgar.",
    ],
    fontes: ["CIC §§ 2402–2406, 2443–2449", "Evangelii Gaudium 186–201"],
  },
  {
    slug: "celibato-antinatural",
    categoria: "Moral e história",
    objecao: "O celibato é antinatural e causa dos abusos.",
    resposta: [
      "O celibato pelo Reino é recomendado por Cristo (Mt 19,12) e por São Paulo (1Cor 7,32–35); é disciplina, não dogma, e existe também em ritos orientais em outra forma.",
      "Estudos sobre abuso sexual não mostram correlação entre celibato e abuso: a maioria absoluta dos casos ocorre em contextos não celibatários.",
      "A resposta ao crime é justiça, transparência e prevenção — não a supressão de um carisma.",
    ],
    fontes: ["Mt 19,12; 1Cor 7,32–35", "Presbyterorum Ordinis 16", "CIC §§ 1579, 1618–1620"],
  },
  {
    slug: "todas-religioes-iguais",
    categoria: "Moral e história",
    objecao: "Todas as religiões são caminhos iguais para Deus.",
    resposta: [
      "A Igreja reconhece elementos de verdade e santidade em outras tradições, e respeita sinceramente sua busca.",
      "Mas afirma que a plenitude da Revelação está em Cristo, único mediador (1Tm 2,5; At 4,12).",
      "Dizer que todas as afirmações contraditórias são igualmente verdadeiras é abandonar o próprio conceito de verdade.",
    ],
    fontes: ["Nostra Aetate 2", "Dominus Iesus (2000)", "CIC §§ 843–848"],
  },
  {
    slug: "fora-da-igreja-nao-ha-salvacao",
    categoria: "Moral e história",
    objecao: "A Igreja ensina que todos os não católicos vão para o inferno.",
    resposta: [
      "O axioma 'fora da Igreja não há salvação' significa que toda salvação vem de Cristo e do seu Corpo, não que Deus condene quem, sem culpa, não a conheceu.",
      "Quem, ignorando o Evangelho sem culpa própria, busca a Deus e cumpre sua vontade conforme a consciência pode alcançar a salvação eterna.",
      "Isso não dispensa a missão: a Igreja anuncia porque o Evangelho é um bem, não uma ameaça.",
    ],
    fontes: ["Lumen Gentium 14–16", "CIC §§ 846–848", "Ad Gentes 7"],
  },
  {
    slug: "big-bang-contra-criacao",
    categoria: "Deus e razão",
    objecao: "A teoria do Big Bang contradiz a doutrina da criação.",
    resposta: [
      "O Big Bang descreve o 'como' da origem física do universo a partir de um estado inicial extremamente denso; a doutrina da criação responde ao 'porquê' há algo em vez de nada, questão que a física não pode resolver com seus próprios métodos.",
      "Foi justamente um sacerdote e físico, Georges Lemaître, quem formulou pela primeira vez a hipótese do 'átomo primitivo', precursora do modelo do Big Bang, sem ver nisso qualquer conflito com sua fé.",
      "Pio XII e depois São João Paulo II afirmaram que um começo temporal do cosmos é compatível com a criação, embora advertissem contra identificar apressadamente o Big Bang com o ato criador propriamente dito, que é metafísico e não físico.",
      "A ciência estuda causas segundas dentro do tempo e do espaço; a criação é a causação do próprio ser do universo, algo de outra ordem que a física não pode nem afirmar nem negar.",
    ],
    fontes: ["CIC §§ 282–289", "Pio XII, Discurso à Pontifícia Academia das Ciências (1951)", "Fides et Ratio, n. 34", "Gn 1,1"],
  },
  {
    slug: "argumento-do-relojoeiro-refutado",
    categoria: "Deus e razão",
    objecao: "A evolução por seleção natural elimina a necessidade de um Criador.",
    resposta: [
      "A evolução biológica é uma explicação sobre mecanismos de transformação das espécies ao longo do tempo; não responde por que existem leis naturais ordenadas capazes de produzir complexidade, nem por que existe matéria e energia para evoluir.",
      "São João Paulo II reconheceu a evolução como 'mais que uma hipótese' no plano científico, mantendo firme que a alma espiritual do homem não pode derivar de processos meramente materiais, mas é criação direta de Deus.",
      "Afirmar um Criador que atua através de causas segundas, inclusive processos evolutivos, não é contraditório: Deus pode ser autor tanto da lei natural quanto dos eventos que dela decorrem, como ensina Santo Tomás sobre a causalidade primeira e segunda.",
      "Reduzir a evolução a um argumento contra Deus é confundir o nível científico com o nível metafísico, dois planos de explicação que se complementam, não competem.",
    ],
    fontes: ["São João Paulo II, Mensagem à Pontifícia Academia das Ciências (1996)", "CIC §§ 159, 283–284", "Summa Theologiae I, q. 105, a. 5", "Humani Generis (1950)"],
  },
  {
    slug: "deus-do-antigo-testamento-cruel",
    categoria: "Deus e razão",
    objecao: "O Deus do Antigo Testamento é cruel e vingativo, incompatível com o Deus de amor do Evangelho.",
    resposta: [
      "A Revelação é progressiva: Deus se adapta pedagogicamente à dureza de coração de um povo antigo, revelando-se plenamente apenas em Cristo, 'imagem do Deus invisível' (Cl 1,15).",
      "Muitos textos de guerra e juízo devem ser lidos com atenção ao gênero literário e ao contexto histórico do antigo Oriente Médio, sem transformar hipérboles bélicas em relatórios etnográficos literais.",
      "O mesmo Antigo Testamento revela, lado a lado com páginas duras, uma ternura constante — 'Como uma mãe consola um filho, assim Eu vos consolarei' (Is 66,13) — que prepara e antecipa a revelação plena da misericórdia em Jesus.",
      "A Igreja ensina que o Deus dos dois Testamentos é o mesmo, único e verdadeiro, contra o antigo erro marcionita que os opunha.",
    ],
    fontes: ["CIC §§ 122, 128–130", "Dei Verbum 14–15", "Is 66,13; Cl 1,15", "Concílio de Roma contra Marcião (144 d.C.)"],
  },
  {
    slug: "predestinacao-e-liberdade",
    categoria: "Deus e razão",
    objecao: "Se Deus é onisciente e predestina, o livre-arbítrio humano é uma ilusão.",
    resposta: [
      "O conhecimento divino não é temporal, mas eterno: Deus não 'prevê' como quem antecipa um futuro incerto, mas conhece todas as coisas em seu presente eterno, sem por isso determinar necessariamente a escolha livre da criatura.",
      "A Igreja rejeitou tanto o determinismo absoluto quanto o pelagianismo que dispensa a graça: a salvação é obra de Deus e resposta livre do homem, cooperando com a graça sem ser anulado por ela.",
      "Santo Tomás explica que a causalidade divina, sendo causa do próprio ser da liberdade, não a suprime, mas a funda: Deus move a vontade a agir livremente, não a contragosto.",
      "O Concílio de Trento condenou tanto quem nega o livre-arbítrio depois do pecado original quanto quem o considera capaz de se salvar sem a graça.",
    ],
    fontes: ["Trento, Decreto sobre a Justificação (DH 1554)", "Summa Theologiae I, q. 14, a. 13", "CIC §§ 154, 1731–1738, 2002", "Concílio de Orange II (529)"],
  },
  {
    slug: "genesis-nao-e-historico",
    categoria: "Escritura",
    objecao: "Gênesis 1-3 é apenas mito; a Igreja obriga a crer em seis dias literais e num jardim geográfico.",
    resposta: [
      "A Igreja nunca exigiu leitura fundamentalista dos primeiros capítulos de Gênesis: já Santo Agostinho, no séc. IV, discutia várias interpretações possíveis dos 'dias' da criação, incluindo leituras não literais.",
      "O gênero literário de Gênesis 1-11 é etiológico e teológico, transmitindo verdades essenciais — a criação por Deus, a bondade original, a queda pelo pecado — através de narrativa simbólica adequada ao seu tempo, sem pretender ser um relato científico ou geográfico exato.",
      "A Pontifícia Comissão Bíblica (1909) e Pio XII em Humani Generis afirmaram a historicidade substancial de um pecado original cometido por um casal humano real, deixando aberta a questão da forma literária dos detalhes narrativos.",
      "Assim, negar o literalismo cronológico não equivale a negar as verdades de fé que o texto realmente ensina: a origem divina do mundo, a dignidade do homem e a realidade do pecado original.",
    ],
    fontes: ["Agostinho, De Genesi ad litteram", "Humani Generis, n. 38 (1950)", "CIC §§ 289–290, 396–390", "Dei Verbum 11"],
  },
  {
    slug: "evangelhos-escritos-tarde-demais",
    categoria: "Escritura",
    objecao: "Os Evangelhos foram escritos décadas depois dos fatos e não são confiáveis historicamente.",
    resposta: [
      "Um intervalo de trinta a sessenta anos entre os eventos e a redação é curto para os padrões da historiografia antiga: as biografias de Alexandre Magno, por exemplo, foram escritas séculos depois de sua morte e são tidas como fontes históricas válidas.",
      "Os Evangelhos se apoiam em tradições orais cuidadosamente memorizadas, típicas da cultura judaica de transmissão de ensinamentos rabínicos, e em fontes escritas anteriores, como o hipotético documento Q e os primeiros credos citados por São Paulo (1Cor 15,3-8, datável de meados dos anos 30).",
      "A existência de testemunhas oculares ainda vivas durante a redação funcionava como controle contra invenções grosseiras, algo que São Lucas menciona explicitamente em seu prólogo (Lc 1,1-4).",
      "A arqueologia e a análise textual têm confirmado repetidamente detalhes geográficos, sociais e políticos dos Evangelhos, reforçando sua fidelidade histórica no essencial.",
    ],
    fontes: ["Lc 1,1-4", "1Cor 15,3-8", "Dei Verbum 19", "CIC §§ 125–127"],
  },
  {
    slug: "profecias-cumpridas-coincidencia",
    categoria: "Escritura",
    objecao: "As profecias messiânicas cumpridas em Jesus são coincidência ou invenção retroativa dos evangelistas.",
    resposta: [
      "Profecias como o nascimento em Belém (Mq 5,1), a traição por trinta moedas de prata (Zc 11,12-13) e o sofrimento detalhado do Servo (Is 53) foram escritas séculos antes, com manuscritos anteriores a Cristo preservados, por exemplo, entre os Manuscritos do Mar Morto.",
      "A convergência de dezenas de detalhes específicos, de origens e épocas distintas, cumpridos numa única pessoa histórica, ultrapassa amplamente o que se poderia atribuir ao acaso estatístico.",
      "Ainda que alguns evangelistas tenham selecionado e destacado paralelos proféticos ao narrar a vida de Jesus, isso não inventa os fatos históricos centrais — a crucificação sob Pôncio Pilatos é atestada também por fontes não cristãs.",
      "A Igreja sempre leu o Antigo Testamento como preparação providencial que encontra em Cristo seu sentido pleno, sem que isso negue o valor histórico independente das próprias profecias.",
    ],
    fontes: ["Is 53; Mq 5,1; Zc 11,12-13", "Manuscritos do Mar Morto (1QIsa)", "Dei Verbum 15–16", "CIC §§ 122, 601"],
  },
  {
    slug: "canon-decidido-por-constantino",
    categoria: "Escritura",
    objecao: "O cânon bíblico foi decidido por Constantino no Concílio de Niceia para servir a interesses políticos.",
    resposta: [
      "O Concílio de Niceia (325) tratou da controvérsia ariana sobre a divindade de Cristo e não discutiu nem definiu o cânon das Escrituras — essa é uma confusão histórica popularizada por obras de ficção sem base documental.",
      "O processo de discernimento do cânon do Novo Testamento foi gradual, apoiado em critérios de origem apostólica, uso litúrgico universal e conformidade com a regra da fé, culminando formalmente nos sínodos de Hipona (393) e Cartago (397), décadas depois de Niceia.",
      "Listas como o Cânon de Muratori (séc. II) já atestam consenso sobre a maioria dos livros do Novo Testamento muito antes de qualquer intervenção imperial.",
      "A tese de manipulação política ignora que o processo de reconhecimento canônico foi obra de discernimento eclesial ao longo de gerações, não de um decreto único e arbitrário.",
    ],
    fontes: ["Cânon de Muratori (séc. II)", "Sínodo de Hipona (393)", "Sínodo de Cartago (397)", "CIC §§ 120, 138"],
  },
  {
    slug: "papa-pode-errar-infalibilidade",
    categoria: "Igreja e Papado",
    objecao: "Papas já cometeram erros graves; logo a infalibilidade papal é uma contradição histórica.",
    resposta: [
      "A infalibilidade não significa impecabilidade pessoal nem imunidade a erros de julgamento, disciplina ou governo: papas pecadores e imprudentes existiram, e a Igreja nunca negou isso.",
      "A infalibilidade, definida no Vaticano I, se aplica estritamente às definições solenes ex cathedra sobre fé e moral, dirigidas a toda a Igreja como vinculantes — condição cumprida rarissimamente na história, como na definição da Imaculada Conceição (1854) e da Assunção (1950).",
      "Casos frequentemente citados como 'erros papais', como o de Honório I, referem-se a ambiguidades disciplinares ou pessoais, jamais a uma definição ex cathedra formal contrária à fé recebida.",
      "A garantia da infalibilidade é dom do Espírito Santo à Igreja, não mérito pessoal do homem que ocupa a sé de Pedro, o que explica a coexistência de fraquezas humanas com a assistência divina nos momentos definidos.",
    ],
    fontes: ["Pastor Aeternus, cap. 4 (DH 3073–3075)", "CIC §§ 891, 2035", "Lumen Gentium 25", "Concílio III de Constantinopla (680-681)"],
  },
  {
    slug: "concilio-vaticano-ii-ruptura",
    categoria: "Igreja e Papado",
    objecao: "O Concílio Vaticano II rompeu com a Tradição da Igreja anterior a 1962.",
    resposta: [
      "Bento XVI ensinou que o Concílio deve ser lido segundo a 'hermenêutica da reforma na continuidade', e não da ruptura: os documentos conciliares se apoiam explicitamente na Escritura, nos Padres e nos concílios anteriores.",
      "Mudanças disciplinares, como a forma da liturgia ou a linguagem litúrgica, pertencem ao âmbito legítimo de desenvolvimento pastoral que a Igreja sempre exerceu, sem tocar em dogmas definidos.",
      "Documentos como Lumen Gentium e Dei Verbum retomam e aprofundam ensinamentos patrísticos e escolásticos sobre a Igreja e a Revelação, mostrando continuidade doutrinal, não invenção.",
      "Interpretações extremas — seja rejeitando o Concílio, seja lendo-o como ruptura revolucionária — foram ambas corrigidas pelo Magistério posterior como leituras equivocadas de um concílio pastoral, mas plenamente autêntico.",
    ],
    fontes: ["Bento XVI, Discurso à Cúria Romana (22/12/2005)", "Lumen Gentium; Dei Verbum", "CIC § 892", "Sacrosanctum Concilium 4"],
  },
  {
    slug: "cisma-do-oriente-culpa-de-roma",
    categoria: "Igreja e Papado",
    objecao: "O Grande Cisma de 1054 prova que o primado romano é uma imposição tardia e injusta.",
    resposta: [
      "O cisma resultou de um processo longo de distanciamento cultural, político e teológico entre Roma e Constantinopla, agravado por disputas sobre o Filioque e a jurisdição eclesiástica, não de uma invenção repentina do primado papal.",
      "Testemunhos anteriores ao cisma, como os apelos ao bispo de Roma em controvérsias doutrinais (por exemplo, o caso de São João Crisóstomo recorrendo ao Papa Inocêncio I), mostram reconhecimento de uma autoridade petrina especial já nos primeiros séculos, em Oriente e Ocidente.",
      "A Igreja Católica reconhece a validade dos sacramentos das Igrejas ortodoxas e trabalha ativamente pelo diálogo ecumênico, reconhecendo responsabilidades de ambos os lados na ruptura histórica.",
      "O primado de Pedro não nasceu do cisma nem foi anulado por ele: permanece ensinado como fundamento da unidade visível da Igreja querida por Cristo (Jo 17,21).",
    ],
    fontes: ["Jo 17,20-21", "Unitatis Redintegratio 14–18", "CIC §§ 817–822", "Inocêncio I, Cartas a João Crisóstomo (404-406)"],
  },
  {
    slug: "extrema-uncao-e-so-para-moribundos",
    categoria: "Sacramentos",
    objecao: "A unção dos enfermos é apenas o antigo rito da 'extrema-unção' para quem está morrendo.",
    resposta: [
      "O Concílio Vaticano II restaurou o nome e o sentido original do sacramento, esclarecendo que ele se destina a todo fiel gravemente enfermo ou debilitado pela idade, não apenas aos moribundos em agonia final.",
      "O fundamento bíblico está em Tiago 5,14-15, onde os presbíteros são chamados para ungir 'o enfermo', sem restrição a estado terminal, prometendo alívio, perdão e possível cura.",
      "A prática de reservar a unção só para a hora da morte era uma restrição pastoral medieval, não a intenção original do sacramento instituído por Cristo através dos apóstolos.",
      "Hoje a Igreja incentiva receber esse sacramento antes de cirurgias graves ou no início de doenças sérias, como fonte de força espiritual, e não apenas como rito derradeiro.",
    ],
    fontes: ["Tg 5,14-15", "Sacrosanctum Concilium 73", "CIC §§ 1499–1523", "Concílio de Trento, Sessão XIV (DH 1694-1700)"],
  },
  {
    slug: "crisma-repete-o-batismo",
    categoria: "Sacramentos",
    objecao: "A Crisma é repetitiva, pois o batismo já dá o Espírito Santo.",
    resposta: [
      "O batismo comunica o Espírito Santo para a nova vida em Cristo e a remoção do pecado original; a Crisma fortalece essa mesma graça, capacitando o cristão para o testemunho público e maduro da fé, à semelhança de Pentecostes sobre os apóstolos já batizados.",
      "Os Atos dos Apóstolos distinguem claramente os dois momentos: os samaritanos foram batizados, mas receberam o Espírito por imposição das mãos dos apóstolos em ocasião posterior (At 8,14-17).",
      "A tradição da Igreja desde os primeiros séculos preserva essa distinção sacramental de unção pós-batismal, atestada por Tertuliano e Santo Hipólito de Roma.",
      "Longe de ser repetição, a Crisma é o selo (character) que sela e completa a iniciação cristã, junto com a Eucaristia, formando os três sacramentos da iniciação.",
    ],
    fontes: ["At 8,14-17; At 19,1-6", "CIC §§ 1285–1305", "Tertuliano, De Baptismo 7-8", "Lumen Gentium 11"],
  },
  {
    slug: "matrimonio-catolico-e-so-contrato",
    categoria: "Sacramentos",
    objecao: "O matrimônio é apenas um contrato civil; a Igreja não deveria interferir nisso.",
    resposta: [
      "Para os batizados, o matrimônio válido é simultaneamente contrato e sacramento — sinal eficaz da aliança de amor entre Cristo e a Igreja (Ef 5,25-32) — não uma sobreposição arbitrária da religião sobre um assunto puramente civil.",
      "Jesus mesmo elevou a união conjugal à sua intenção original de indissolubilidade, corrigindo a permissão mosaica de repúdio 'por causa da dureza do vosso coração' (Mt 19,3-9).",
      "A Igreja não pretende substituir a autoridade civil na regulação jurídica e patrimonial do casamento, mas afirma que, entre batizados, esse vínculo participa de uma realidade sacramental que nenhuma lei humana pode desfazer.",
      "Reconhecer o caráter sagrado do matrimônio protege sua dignidade contra a banalização, defendendo a estabilidade que beneficia cônjuges, filhos e sociedade.",
    ],
    fontes: ["Ef 5,25-32", "Mt 19,3-9", "CIC §§ 1601–1617, 1638–1642", "Gaudium et Spes 48"],
  },
  {
    slug: "por-que-precisa-de-padre-para-casar",
    categoria: "Sacramentos",
    objecao: "Por que a Igreja exige a presença de um padre para validar o matrimônio, se os próprios noivos são os ministros do sacramento?",
    resposta: [
      "É verdade que, na doutrina católica, os próprios cônjuges são os ministros do sacramento, conferindo-o um ao outro através do consentimento livre e mútuo.",
      "Contudo, desde o Concílio de Trento, a Igreja exige a chamada 'forma canônica' — a presença de um padre ou diácono testemunhando em nome da Igreja, além de duas testemunhas — para evitar os graves abusos de casamentos clandestinos que causavam bigamia e disputas de validade na Europa medieval.",
      "Essa exigência é disciplina eclesial, não elemento essencial do sacramento em si — daí a Igreja reconhecer, sob certas condições específicas, matrimônios de católicos orientais celebrados sem essa forma, ou dispensar dela em casos excepcionais.",
      "A presença de um ministro sagrado também expressa que o matrimônio não é assunto privado entre duas pessoas, mas ato eclesial que insere o casal na comunidade de fé com direitos e responsabilidades públicas.",
    ],
    fontes: ["Trento, Decreto Tametsi (1563)", "CIC §§ 1623–1624", "Código de Direito Canônico, cânones 1108–1123", "Familiaris Consortio 68"],
  },
  {
    slug: "nossa-senhora-medianeira-usurpa-cristo",
    categoria: "Maria e santos",
    objecao: "Chamar Maria de 'Medianeira' e 'Corredentora' usurpa o papel único de Cristo como único Mediador.",
    resposta: [
      "A Igreja é categórica: 'há um só Deus e um só Mediador entre Deus e os homens, Cristo Jesus' (1Tm 2,5), e nenhum título mariano pode diminuir ou dividir essa mediação única e insubstituível.",
      "Quando a tradição chama Maria de 'medianeira', o Concílio Vaticano II explica que isso 'nada tira nem acrescenta à dignidade e eficácia de Cristo, único Mediador', mas expressa a cooperação subordinada e derivada que ela exerceu ao dar à luz o Redentor e ao permanecer unida à sua obra.",
      "Toda graça atribuída à intercessão de Maria flui exclusivamente dos méritos infinitos de Cristo; ela é canal, não fonte — participante, jamais igual ou concorrente da obra redentora.",
      "O termo 'corredentora', quando usado por alguns teólogos, nunca foi definido como dogma pela Igreja e é entendido, quando legítimo, no sentido estrito de cooperação humilhada aos pés da cruz (Jo 19,25), não de coautoria da salvação.",
    ],
    fontes: ["1Tm 2,5", "Lumen Gentium 60–62", "CIC §§ 969–970", "Jo 19,25-27"],
  },
  {
    slug: "assuncao-de-maria-sem-base-biblica",
    categoria: "Maria e santos",
    objecao: "A Assunção de Maria ao Céu não tem nenhuma base bíblica e foi inventada em 1950.",
    resposta: [
      "O dogma foi solenemente definido por Pio XII em 1950, mas a crença na assunção corporal de Maria é atestada na tradição litúrgica e patrística oriental e ocidental desde ao menos o séc. VI, muito antes de qualquer definição formal.",
      "A Escritura não narra o evento diretamente, mas oferece fundamentos: 1Cor 15,20-23 apresenta Cristo como 'primícias' de uma ressurreição que se estende aos que são seus, e Ap 12,1 descreve 'uma mulher vestida de sol' em glória celeste, lida tradicionalmente com referência mariana.",
      "A ausência de qualquer relíquia ou tradição sobre o túmulo ou os restos mortais de Maria — algo inusitado para uma figura tão venerada desde o início — é indício histórico coerente com a crença antiga em sua assunção.",
      "A definição dogmática não criou uma crença nova, mas reconheceu solenemente o que já era 'sensus fidei' universal do povo cristão ao longo dos séculos.",
    ],
    fontes: ["Munificentissimus Deus (1950)", "1Cor 15,20-23", "Ap 12,1", "CIC §§ 966, 974"],
  },
  {
    slug: "culto-aos-santos-e-politeismo",
    categoria: "Maria e santos",
    objecao: "Ter tantos santos padroeiros para causas diferentes é uma forma disfarçada de politeísmo.",
    resposta: [
      "Politeísmo é a crença em múltiplas divindades com poder próprio e independente; os santos não têm poder algum em si mesmos — são criaturas que, unidas a Deus na glória, intercedem junto a Ele, como amigos que rezam uns pelos outros (Ap 5,8).",
      "A escolha de padroeiros para ofícios, cidades ou causas específicas reflete a biografia e a virtude particular de cada santo — por exemplo, Santa Rita para causas difíceis por sua própria vida marcada por provações —, não uma divisão de poderes cósmicos entre divindades.",
      "Toda intercessão dos santos é participação na única mediação de Cristo, e toda graça concedida por meio deles vem exclusivamente de Deus, nunca de um poder próprio e autônomo.",
      "A comunhão dos santos, artigo de fé desde o Credo dos Apóstolos, expressa precisamente a unidade da Igreja no amor, e não uma multiplicação de divindades a serem apaziguadas.",
    ],
    fontes: ["Ap 5,8", "Credo dos Apóstolos", "CIC §§ 946–959", "Lumen Gentium 50"],
  },
  {
    slug: "relíquias-sao-superstição",
    categoria: "Maria e santos",
    objecao: "Venerar relíquias de santos é superstição medieval sem sentido cristão.",
    resposta: [
      "A prática tem raiz bíblica: o simples contato com os ossos de Eliseu ressuscitou um morto (2Rs 13,21), e lenços tocados por São Paulo curavam enfermos (At 19,11-12), mostrando que Deus pode agir através de objetos ligados a pessoas santas.",
      "A veneração de relíquias não atribui poder mágico ao objeto em si, mas honra o corpo que foi 'templo do Espírito Santo' (1Cor 6,19) e reconhece que Deus, na sua liberdade, escolhe às vezes conceder graças por meio delas.",
      "Desde os primeiros séculos, os cristãos guardavam com reverência os restos dos mártires, celebrando a Eucaristia sobre seus túmulos — prática que deu origem, inclusive, ao costume de relíquias em altares até hoje.",
      "Como toda devoção popular, pode haver abusos supersticiosos individuais, mas a doutrina da Igreja distingue claramente entre veneração legítima e superstição condenável.",
    ],
    fontes: ["2Rs 13,21; At 19,11-12", "1Cor 6,19", "CIC §§ 1674, 2111", "Concílio de Trento, Sessão XXV (DH 1822)"],
  },
  {
    slug: "aborto-questao-apenas-religiosa",
    categoria: "Moral e história",
    objecao: "A posição da Igreja contra o aborto é uma imposição religiosa que não deveria valer para quem não é católico.",
    resposta: [
      "A defesa da vida humana desde a concepção não se apoia primariamente em um argumento de fé, mas na razão e na biologia: desde a fecundação existe um organismo humano geneticamente completo, distinto e em desenvolvimento contínuo, fato reconhecido pela embriologia independentemente de qualquer crença religiosa.",
      "O princípio de que toda vida humana inocente merece proteção jurídica é fundamento de direitos humanos universalmente reconhecidos, não exclusividade católica — daí legislações civis em muitos países, de tradições religiosas diversas, protegerem a vida pré-natal.",
      "A Igreja condena o aborto desde o primeiro século, como atesta o Didaquê ('não matarás o filho no seio materno'), independentemente de definições dogmáticas posteriores, mostrando coerência moral constante, não invenção contemporânea.",
      "Defender a vida do mais frágil e vulnerável dos seres humanos é, antes de tudo, questão de justiça elementar, que a fé ilumina, mas que a própria razão natural já pode reconhecer.",
    ],
    fontes: ["Didaquê 2,2 (séc. I-II)", "CIC §§ 2270–2275", "Evangelium Vitae 58–62", "Declaração sobre o Aborto Provocado (1974)"],
  },
  {
    slug: "escravidao-aprovada-pela-igreja",
    categoria: "Moral e história",
    objecao: "A Igreja aprovou e lucrou com a escravidão por séculos.",
    resposta: [
      "É historicamente verdade que muitos cristãos, inclusive clérigos, participaram ou toleraram práticas escravagistas, algo que a Igreja reconhece como pecado grave de seus filhos ao longo da história.",
      "Ao mesmo tempo, papas condenaram formalmente a escravidão de povos indígenas e africanos em diversos documentos: Paulo III na bula Sublimis Deus (1537) declarou os indígenas americanos verdadeiros seres humanos com direito à liberdade, e Gregório XVI condenou o tráfico de escravos na bula In Supremo (1839).",
      "Santos como Pedro Claver dedicaram a vida ao serviço direto dos escravizados, e ordens religiosas promoveram alforrias e educação para libertos, mostrando que a coerência doutrinal com a dignidade humana sempre esteve presente, mesmo quando desobedecida na prática.",
      "São João Paulo II pediu publicamente perdão pelos pecados históricos ligados à escravidão cometidos por filhos da Igreja, reafirmando que tais práticas contradizem a própria fé que professavam.",
    ],
    fontes: ["Sublimis Deus (1537)", "In Supremo Apostolatus (1839)", "CIC §§ 2414", "João Paulo II, Discurso em Gorée, Senegal (1992)"],
  },
  {
    slug: "galileu-prova-que-igreja-e-anticientifica",
    categoria: "Moral e história",
    objecao: "O caso Galileu prova que a Igreja é estruturalmente contrária à ciência.",
    resposta: [
      "O caso Galileu foi um conflito específico, marcado por fatores científicos ainda não conclusivos na época, disputas pessoais e questões de prudência teológica na interpretação bíblica — não uma rejeição estrutural da ciência pela Igreja.",
      "A própria Igreja financiou e promoveu a ciência ao longo dos séculos: fundou as primeiras universidades da Europa, sustentou observatórios astronômicos como o Observatório Vaticano, e contou entre seus clérigos com cientistas como Gregor Mendel (genética) e Georges Lemaître (cosmologia do Big Bang).",
      "São João Paulo II reconheceu publicamente, em 1992, os erros cometidos pelos teólogos que condenaram Galileu, promovendo uma revisão histórica completa do caso pela Pontifícia Academia das Ciências.",
      "A relação histórica entre Igreja e ciência é predominantemente de colaboração fecunda, sendo o caso Galileu uma exceção dramática e mal compreendida, não a regra.",
    ],
    fontes: ["João Paulo II, Discurso à Pontifícia Academia das Ciências (1992)", "Fides et Ratio, nn. 34, 106", "CIC §§ 159", "Gaudium et Spes 36"],
  },
  {
    slug: "cristianismo-oprime-a-mulher",
    categoria: "Moral e história",
    objecao: "O cristianismo é uma religião estruturalmente machista que oprime as mulheres.",
    resposta: [
      "Jesus rompeu, de modo notável para sua época, com normas sociais discriminatórias: conversou publicamente com a samaritana (Jo 4), teve mulheres entre seus discípulos e financiadoras (Lc 8,1-3), e escolheu Maria Madalena como primeira testemunha da Ressurreição, apóstola dos apóstolos.",
      "São Paulo, apesar de textos disciplinares específicos de contexto cultural, afirma o princípio radical de que 'não há judeu nem grego, escravo nem livre, homem nem mulher, pois todos sois um em Cristo Jesus' (Gl 3,28).",
      "A Igreja proclamou quatro mulheres Doutoras da Igreja — Teresa d'Ávila, Catarina de Sena, Teresinha de Lisieux e Hildegarda de Bingen — reconhecendo sua autoridade teológica ao lado dos maiores mestres homens da tradição.",
      "São João Paulo II, na Mulieris Dignitatem, desenvolveu extensamente a igual dignidade e a complementaridade vocacional entre homem e mulher, condenando explicitamente qualquer discriminação injusta baseada no sexo.",
    ],
    fontes: ["Jo 4,1-42; Lc 8,1-3; Gl 3,28", "Mulieris Dignitatem (1988)", "CIC §§ 369–372, 2334–2335", "Christifideles Laici 49"],
  },
];

export function objecaoPorSlug(slug: string): Objecao | undefined {
  return OBJECOES.find((o) => o.slug === slug);
}
