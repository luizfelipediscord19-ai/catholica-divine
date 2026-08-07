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
];

export function objecaoPorSlug(slug: string): Objecao | undefined {
  return OBJECOES.find((o) => o.slug === slug);
}
