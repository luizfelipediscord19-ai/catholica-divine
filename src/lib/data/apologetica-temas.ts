// Páginas temáticas de Apologética ("Razões para crer").
//
// VERACIDADE: as sínteses são redação própria do Portal Católico, fiéis ao
// Catecismo, aos concílios e aos documentos citados em cada seção. Nenhuma
// tradução protegida é reproduzida; as referências permitem conferir a fonte.
// Argumento filosófico, dado histórico e opinião teológica são distinguidos no
// próprio texto.

import type { SecaoTema } from "./enciclopedia-temas";

export type TemaApologetica = {
  slug: string;
  nome: string;
  kicker: string;
  /** Frase de abertura, também usada como descrição para buscadores. */
  resumo: string;
  secoes: SecaoTema[];
  /** Slugs de verbetes da Enciclopédia ligados ao tema. */
  verbetes: string[];
  /** Parágrafos do Catecismo que o tema comenta (links diretos). */
  paragrafosCIC: number[];
};

export const TEMAS_APOLOGETICA: TemaApologetica[] = [
  {
    slug: "filosofia",
    nome: "Filosofia",
    kicker: "Praeambula fidei",
    resumo:
      "As vias racionais para a existência de Deus, o problema do mal, a alma e a liberdade: o que a razão alcança por si mesma antes de qualquer apelo à Revelação.",
    secoes: [
      {
        id: "o-que-a-razao-alcanca",
        titulo: "O que a razão alcança sem a fé",
        paragrafos: [
          "A Igreja nunca sustentou que a existência de Deus seja apenas objeto de fé. O Concílio Vaticano I ensinou que Deus, princípio e fim de todas as coisas, pode ser conhecido com certeza pela luz natural da razão a partir das coisas criadas. Essa afirmação é doutrina católica definida, não hipótese de escola.",
          "A tradição chama esses conhecimentos de praeambula fidei — preâmbulos da fé. Eles não produzem a fé, que é dom sobrenatural, mas mostram que crer não é um salto no escuro: há razões públicas, discutíveis e verificáveis para sustentar que a realidade não se explica por si mesma.",
          "Distinção necessária: os argumentos filosóficos concluem que existe uma causa primeira, não que essa causa seja a Trindade. A identidade pessoal de Deus, revelada em Cristo, só se conhece pela Revelação. Confundir os dois planos é o erro mais comum das duas partes da discussão.",
        ],
        pontos: [
          "Deus pode ser conhecido pela razão a partir das criaturas (CIC §§ 31-36; Dei Filius, cap. 2; DH 3004).",
          "A fé permanece dom sobrenatural, não conclusão de silogismo (CIC §§ 153-156).",
          "Escritura e filosofia convergem nesse ponto: Sb 13,1-9 e Rm 1,19-20.",
        ],
        referencias: [
          "CIC §§ 31-38, 153-156",
          "Concílio Vaticano I, Dei Filius, cap. 2 (DH 3004)",
          "Fides et Ratio 8-13",
        ],
      },
      {
        id: "cinco-vias",
        titulo: "As cinco vias de Santo Tomás, explicadas",
        paragrafos: [
          "Santo Tomás de Aquino apresenta cinco vias na Summa Theologiae (I, q. 2, a. 3). Nenhuma delas é o argumento popular do 'quem criou o universo?'. Todas partem de um fato observável e perguntam pela condição que o torna inteligível.",
          "Via do movimento: há coisas em mudança; nada passa da potência ao ato por si mesmo; logo existe um ato puro que move sem ser movido. Via da causalidade eficiente: séries causais atuais não se sustentam sem uma causa não causada. Via da contingência: o que pode não existir não explica sua própria existência; algo necessário deve existir. Via dos graus de perfeição: perfeições participadas remetem a uma perfeição plena. Via da finalidade: agentes sem inteligência agem de modo regular para um fim, o que supõe inteligência ordenadora.",
          "O que costuma passar por refutação — 'e quem criou Deus?' — não atinge as vias, porque elas não afirmam que tudo tem causa, mas que tudo o que é composto, mutável ou contingente tem causa. Um ser necessário e simples não cai nessa exigência.",
        ],
        pontos: [
          "As vias são a posteriori: partem da experiência, não de definições.",
          "A série causal em questão é de dependência atual, não de sucessão no tempo.",
          "Nenhuma via depende de o universo ter começado; a criação é sustentação, não apenas início.",
        ],
        referencias: [
          "Santo Tomás de Aquino, Summa Theologiae I, q. 2, a. 3",
          "Santo Tomás, Summa contra Gentiles I, 13",
          "CIC §§ 34-35",
        ],
      },
      {
        id: "contingencia-e-cosmologia",
        titulo: "Contingência, começo do universo e a pergunta que resta",
        paragrafos: [
          "A cosmologia contemporânea descreve um universo com uma história — expansão, radiação de fundo, formação de estruturas. Isso interessa à discussão, mas não é a base do argumento católico: mesmo um universo eterno permaneceria contingente, isto é, algo que não explica por que existe em vez de não existir.",
          "Por isso a Igreja evitou, com prudência, transformar teorias físicas em provas de fé. Pio XII acolheu com simpatia os dados sobre o começo do cosmos; o Magistério posterior manteve a distinção entre o que a física afirma e o que a metafísica conclui. A doutrina da criação diz que tudo depende de Deus para ser, a cada instante — não apenas no primeiro.",
        ],
        pontos: [
          "Criação do nada não é um evento entre eventos, mas relação de dependência total (CIC §§ 296-301).",
          "A fé não fica prisioneira de um modelo cosmológico particular.",
          "Opinião teológica: o argumento de contingência é mais robusto do que o argumento do começo, precisamente porque não muda com a física.",
        ],
        referencias: ["CIC §§ 279-301", "Fides et Ratio 16-48"],
      },
      {
        id: "problema-do-mal",
        titulo: "O problema do mal",
        paragrafos: [
          "A objeção mais séria contra a existência de Deus não é científica, e sim moral: se Deus é bom e onipotente, por que existe o mal? A resposta católica não minimiza a dor. Começa por uma tese metafísica: o mal não é uma coisa, é privação de um bem devido. Não há uma substância má criada por Deus; há bens feridos.",
          "Em seguida, distingue: o mal moral vem do uso livre da liberdade criada, que Deus permite porque uma criatura capaz de amar tem de ser capaz de recusar. O mal físico está ligado à condição de um mundo em devir, que caminha para a perfeição. Nenhuma dessas explicações consola por si só, e o Catecismo reconhece isso: só o conjunto da fé cristã, culminando na Cruz e na Ressurreição, responde à pergunta — não com uma teoria, mas com Deus assumindo o sofrimento.",
        ],
        pontos: [
          "O mal é privação, não criatura (Santo Agostinho, Confissões VII; CIC § 309-314).",
          "Deus permite o mal para extrair dele um bem maior, o que só se vê na história inteira da salvação.",
          "A resposta plena é cristológica: a Cruz não explica a dor, habita-a.",
        ],
        referencias: ["CIC §§ 309-314, 385, 412", "Santo Agostinho, Enchiridion 11"],
      },
      {
        id: "alma-liberdade-verdade",
        titulo: "Alma, liberdade e a existência da verdade",
        paragrafos: [
          "A antropologia católica sustenta que o ser humano é unidade de corpo e alma espiritual, criada imediatamente por Deus. O argumento filosófico se apoia em operações que não se reduzem a processos materiais particulares: a apreensão de conceitos universais, a autoconsciência reflexiva, o juízo sobre a verdade.",
          "Daí decorre a liberdade: um ser que julga o verdadeiro pode escolher o bem conhecido; por isso é responsável. E daí decorre também a crítica ao relativismo radical, que se autodestrói: quem afirma que nenhuma afirmação é verdadeira está afirmando algo como verdadeiro.",
        ],
        pontos: [
          "A alma espiritual é criada por Deus e não produzida pelos pais (CIC §§ 362-366).",
          "A liberdade é capacidade de escolher o bem, não indiferença absoluta (CIC §§ 1730-1742).",
          "O relativismo radical é autocontraditório — objeção clássica, de Platão a Fides et Ratio 5.",
        ],
        referencias: ["CIC §§ 355-368, 1730-1742", "Fides et Ratio 4-6, 80-91"],
      },
    ],
    verbetes: ["revelacao", "graca"],
    paragrafosCIC: [31, 156, 309, 366, 1730],
  },
  {
    slug: "ciencia",
    nome: "Ciência",
    kicker: "Veritas non potest veritati contradicere",
    resumo:
      "Fé e ciência não competem pelo mesmo espaço: o que a Igreja ensina sobre criação e evolução, o caso Galileu, os limites do método científico e a contribuição católica à história da ciência.",
    secoes: [
      {
        id: "dois-modos-de-conhecer",
        titulo: "Dois modos de conhecer, um só real",
        paragrafos: [
          "O princípio católico é simples e antigo: a verdade não pode contradizer a verdade. Se o mesmo Deus é autor da razão e da Revelação, um conflito real entre ciência bem feita e doutrina bem entendida é impossível. Onde parece haver conflito, um dos dois lados foi mal interpretado — e a Igreja admite explicitamente que o erro pode estar do lado da leitura teológica.",
          "O método científico responde perguntas sobre como as coisas funcionam, mediante medição e experimento. Não é competente para dizer se a existência tem sentido, se a pessoa tem dignidade ou por que existe algo em vez de nada. Não por deficiência, mas por definição de objeto. O cientificismo — a tese de que só é conhecimento o que a ciência empírica produz — é uma afirmação filosófica, e das que não podem ser demonstradas cientificamente.",
        ],
        pontos: [
          "Nunca há desacordo verdadeiro entre fé e razão (Dei Filius, cap. 4; DH 3017).",
          "A autonomia legítima das ciências é reconhecida pelo Concílio (Gaudium et Spes 36).",
          "Cientificismo é filosofia disfarçada de ciência (Fides et Ratio 88).",
        ],
        referencias: [
          "CIC §§ 159, 283-284",
          "Gaudium et Spes 36",
          "Fides et Ratio 88; Providentissimus Deus (1893)",
        ],
      },
      {
        id: "criacao-e-evolucao",
        titulo: "Criação e evolução: o que a Igreja realmente ensina",
        paragrafos: [
          "A doutrina da criação afirma que tudo o que existe depende de Deus e que o ser humano foi criado à sua imagem, com alma espiritual criada imediatamente por Deus. Ela não determina o mecanismo biológico pelo qual os corpos vivos se diversificaram.",
          "Por isso Pio XII, em Humani Generis (1950), declarou que a pesquisa sobre a origem do corpo humano a partir de matéria viva preexistente pode ser investigada livremente, ressalvando a criação direta da alma. São João Paulo II, em mensagem à Pontifícia Academia das Ciências (22.10.1996), reconheceu que a evolução é mais do que uma hipótese, mantendo a mesma ressalva. Bento XVI insistiu que criação e evolução respondem a perguntas diferentes: uma pergunta por que existe algo, a outra como as formas se desenvolveram.",
          "Distinção honesta: o criacionismo de idade recente da Terra não é doutrina católica, e a Igreja jamais o impôs. Também não é doutrina afirmar que a evolução exclui Deus — isso é uma leitura filosófica acrescentada aos dados.",
        ],
        pontos: [
          "A alma espiritual é criada por Deus, não produto de processo material (CIC § 366).",
          "Gênesis 1-3 é ensinado como texto que afirma verdades salvíficas em linguagem figurada (CIC §§ 289, 337, 390).",
          "A Igreja não tem doutrina sobre a idade da Terra nem sobre mecanismos biológicos.",
        ],
        referencias: [
          "CIC §§ 282-289, 337-349, 366, 390",
          "Pio XII, Humani Generis (12.08.1950), n. 36",
          "João Paulo II, Mensagem à Pontifícia Academia das Ciências (22.10.1996)",
        ],
      },
      {
        id: "caso-galileu",
        titulo: "O caso Galileu, sem lenda de nenhum dos lados",
        paragrafos: [
          "O processo de 1633 condenou Galileu Galilei por sustentar o heliocentrismo como tese demonstrada; ele foi obrigado a abjurar e viveu em prisão domiciliar até a morte, em 1642. Nada disso é negado pela Igreja: São João Paulo II, em discurso à Pontifícia Academia das Ciências de 31 de outubro de 1992, reconheceu publicamente o erro dos juízes e a lição que dele decorre.",
          "Ao mesmo tempo, a lenda popular deforma o episódio: Galileu não foi torturado nem executado, era amigo de cardeais e do futuro Urbano VIII, e a controvérsia envolvia também questões científicas então abertas — a ausência de paralaxe estelar detectável, por exemplo. A raiz do erro eclesiástico foi metodológica: tratar uma leitura literal de passagens bíblicas como critério de física, exatamente o que Leão XIII depois proibiu em Providentissimus Deus.",
          "Fato documentado, e não folclore: nenhum cientista foi executado pela Inquisição romana por sua ciência. Giordano Bruno, muitas vezes citado, foi condenado em 1600 por teses teológicas, não por astronomia.",
        ],
        pontos: [
          "1633: condenação; 1741-1758: liberação gradual das obras; 1992: reconhecimento público do erro.",
          "A Escritura ensina para a salvação, não para descrever a estrutura física do céu (Providentissimus Deus).",
          "Casos isolados de erro humano não anulam a doutrina; ilustram por que a Igreja distingue disciplina de dogma.",
        ],
        referencias: [
          "João Paulo II, Discurso à Pontifícia Academia das Ciências (31.10.1992)",
          "Leão XIII, Providentissimus Deus (18.11.1893)",
          "CIC §§ 106-110 (verdade da Escritura e gêneros literários)",
        ],
      },
      {
        id: "contribuicao-catolica",
        titulo: "A contribuição católica à ciência",
        paragrafos: [
          "A história documenta uma continuidade que a caricatura ignora. As universidades nasceram como instituições eclesiásticas — Bolonha, Paris, Oxford, Salamanca, Coimbra. Bispos e cônegos medievais como Roberto Grosseteste e Nicolau de Oresme trabalharam matemática e óptica. Nicolau Copérnico era cônego; o calendário gregoriano foi reforma promovida por Gregório XIII com base em trabalho astronômico.",
          "No período moderno: o jesuíta Christoph Clavius em astronomia, Gregor Mendel — monge agostiniano — na genética, Georges Lemaître — sacerdote belga — na formulação do universo em expansão, Nicolau Stenão na geologia. A Pontifícia Academia das Ciências, reorganizada em 1936, reúne pesquisadores de várias crenças, inclusive não crentes.",
        ],
        pontos: [
          "A ideia de uma natureza inteligível e ordenada, pressuposto do método científico, é herança da doutrina da criação.",
          "Mendel (hereditariedade) e Lemaître (expansão do universo) são casos documentados, não apologia inflada.",
          "A Pontifícia Academia das Ciências existe desde 1603 (Accademia dei Lincei) e em forma atual desde 1936.",
        ],
        referencias: ["Gaudium et Spes 36, 62", "Fides et Ratio 106", "CIC § 2293"],
      },
      {
        id: "bioetica-e-limites",
        titulo: "Bioética: onde a ciência precisa da ética",
        paragrafos: [
          "O ponto de maior atrito atual não é cosmologia, é bioética. A Igreja não se opõe à pesquisa; opõe-se a tratar a pessoa humana como material. O critério é o valor da vida humana desde a concepção até a morte natural, e a exigência de que a técnica sirva à pessoa, não o contrário.",
          "Donum Vitae (1987) e Dignitas Personae (2008) expõem essa posição em detalhe: apoio à pesquisa com células-tronco adultas, recusa da destruição de embriões, defesa de que a origem da vida humana se dê no contexto pessoal do matrimônio. É doutrina moral, apresentada com argumentos racionais, e reconhecidamente contestada fora da Igreja — o que a torna objeto de debate, não de imposição.",
        ],
        pontos: [
          "A vida humana deve ser respeitada e protegida de modo absoluto desde a concepção (CIC § 2270).",
          "Nem tudo o que é tecnicamente possível é moralmente admissível (CIC §§ 2292-2295).",
          "A pesquisa com células-tronco adultas é expressamente apoiada (Dignitas Personae 32).",
        ],
        referencias: [
          "CIC §§ 2258-2283, 2292-2295",
          "Congregação para a Doutrina da Fé, Donum Vitae (22.02.1987)",
          "Congregação para a Doutrina da Fé, Dignitas Personae (08.09.2008)",
        ],
      },
    ],
    verbetes: ["revelacao", "virtudes-teologais"],
    paragrafosCIC: [159, 283, 366, 2270, 2293],
  },
  {
    slug: "historia",
    nome: "História",
    kicker: "Testis temporum",
    resumo:
      "A Igreja diante do próprio passado: origem apostólica, Inquisição, Cruzadas, escravidão e o século XX — o que a documentação sustenta e o que a Igreja reconheceu como culpa.",
    secoes: [
      {
        id: "origem-apostolica",
        titulo: "Origem apostólica documentada",
        paragrafos: [
          "A continuidade entre a comunidade dos Apóstolos e a Igreja Católica não depende apenas de textos do Novo Testamento. Documentos do fim do século I e do século II descrevem uma Igreja já estruturada em bispos, presbíteros e diáconos, com sucessão nomeada.",
          "São Clemente Romano, por volta de 96, escreve aos coríntios sobre a sucessão instituída pelos Apóstolos. Santo Inácio de Antioquia, por volta de 107, descreve a tríade ministerial e usa a expressão 'Igreja católica'. Santo Ireneu, cerca de 180, lista os bispos de Roma desde Pedro como critério para distinguir a fé apostólica das seitas gnósticas.",
        ],
        pontos: [
          "Clemente Romano, Carta aos Coríntios 42-44: sucessão apostólica.",
          "Inácio de Antioquia, Aos Esmirniotas 8,2: primeira ocorrência de 'Igreja católica'.",
          "Ireneu, Adversus Haereses III, 3, 1-3: lista episcopal romana.",
        ],
        referencias: ["CIC §§ 857-865, 880-887", "Lumen Gentium 8, 20"],
      },
      {
        id: "inquisicao",
        titulo: "Inquisição: o que os arquivos mostram",
        paragrafos: [
          "A Inquisição foi um conjunto de tribunais, não uma instituição única, e variou muito no tempo e no lugar. A pesquisa histórica das últimas décadas, apoiada nos próprios registros processuais — sobretudo os arquivos espanhol e romano —, corrigiu números que circulavam por herança de propaganda dos séculos XVI a XIX.",
          "O que essa pesquisa mostra: os tribunais aplicavam procedimento escrito, admitiam defesa e recurso, e a maioria absoluta dos processos terminava em penitência, não em morte. As execuções, embora reais e numericamente muito inferiores às lendárias, eram executadas pelo poder civil. Nada disso torna o sistema aceitável: coagir a consciência é contrário à doutrina que a própria Igreja proclamou no Vaticano II, em Dignitatis Humanae.",
          "Em 12 de março de 2000, São João Paulo II presidiu o pedido público de perdão pelos pecados de filhos da Igreja, incluindo o uso da violência a serviço da verdade. A Comissão Teológica Internacional havia publicado, no mesmo ano, o estudo Memória e Reconciliação, que distingue a santidade da Igreja e as culpas de seus membros.",
        ],
        pontos: [
          "Ninguém pode ser coagido a agir contra a própria consciência em matéria religiosa (Dignitatis Humanae 2-3; CIC § 2106).",
          "As sentenças capitais eram executadas pelo braço secular, e são hoje reconhecidas como injustas.",
          "Ato penitencial de 12.03.2000 e o documento Memória e Reconciliação (CTI, 2000).",
        ],
        referencias: [
          "CIC §§ 2104-2109",
          "Dignitatis Humanae 1-3",
          "Comissão Teológica Internacional, Memória e Reconciliação (2000)",
        ],
      },
      {
        id: "cruzadas",
        titulo: "Cruzadas: contexto, culpa e distorção",
        paragrafos: [
          "As Cruzadas começam em 1095, quatro séculos depois da conquista islâmica da Síria, do Egito, do norte da África e de parte da Península Ibérica, e após a derrota bizantina em Manzikert (1071) e dificuldades impostas aos peregrinos. Compreender esse contexto não transforma as Cruzadas em ação santa; apenas evita apresentá-las como agressão sem causa.",
          "O que a documentação também mostra é o horror: o massacre de Jerusalém em 1099 e, sobretudo, o saque de Constantinopla em 1204 pela Quarta Cruzada, desviada de seu objetivo — condenado pelo próprio Inocêncio III. Em 2001, São João Paulo II pediu perdão aos ortodoxos por esse episódio.",
        ],
        pontos: [
          "A Quarta Cruzada (1204) foi condenada pelo papa que a convocara.",
          "Pedido de perdão de João Paulo II aos gregos ortodoxos (04.05.2001).",
          "A doutrina atual sobre a guerra é restritiva: legítima defesa com condições estritas (CIC §§ 2307-2317).",
        ],
        referencias: ["CIC §§ 2302-2317", "Gaudium et Spes 77-82"],
      },
      {
        id: "escravidao-e-direitos",
        titulo: "Escravidão, povos indígenas e direitos humanos",
        paragrafos: [
          "A imagem de uma Igreja simplesmente cúmplice da escravidão colonial não resiste à documentação. Em Sublimis Deus (1537), Paulo III declarou que os indígenas americanos são verdadeiros homens, capazes de fé e não passíveis de escravização. Gregório XIV, Urbano VIII, Bento XIV e Gregório XVI, em In Supremo Apostolatus (1839), condenaram o tráfico de escravos; Leão XIII retomou a condenação em In Plurimis (1888).",
          "Também é fato que muitos católicos, incluindo instituições eclesiásticas, participaram do sistema escravista, e que teólogos buscaram justificativas. Ambas as coisas são verdadeiras. A doutrina firmou-se de modo definitivo no século XX: Gaudium et Spes elenca a escravidão entre as ofensas à dignidade humana, e o Catecismo a condena sem reservas.",
          "Do lado da teoria jurídica, a Escola de Salamanca — Francisco de Vitoria, Domingo de Soto, Francisco Suárez — desenvolveu, no século XVI, argumentos sobre direitos dos povos que estão na raiz do direito internacional moderno.",
        ],
        pontos: [
          "Sublimis Deus (1537) e In Supremo Apostolatus (1839): condenações papais documentadas.",
          "A escravidão é ofensa à dignidade da pessoa (CIC § 2414; Gaudium et Spes 27, 29).",
          "Reconhecer culpas de membros da Igreja é exigência da própria doutrina, não concessão.",
        ],
        referencias: ["CIC §§ 1934-1938, 2414", "Gaudium et Spes 27-29", "Rerum Novarum (1891)"],
      },
      {
        id: "seculo-xx",
        titulo: "Século XX: totalitarismos e abusos",
        paragrafos: [
          "Diante do nazismo, Pio XI publicou em 1937 a encíclica Mit brennender Sorge, escrita em alemão e lida nos púlpitos, condenando a divinização da raça e do Estado; dias depois, Divini Redemptoris condenou o comunismo ateu. A atuação de Pio XII durante a guerra é objeto de debate histórico legítimo, hoje conduzido com os arquivos vaticanos abertos desde 2020.",
          "Sobre a crise dos abusos sexuais cometidos por clérigos, a Igreja reconheceu responsabilidade institucional, criou normas obrigatórias de denúncia e proteção — Vos Estis Lux Mundi (2019) e a revisão do Livro VI do Código de Direito Canônico (2021) — e realizou encontros específicos com vítimas. Aqui não há apologia possível nem cabível: o dado é a culpa, e a resposta exigida é justiça, transparência e prevenção.",
        ],
        pontos: [
          "Mit brennender Sorge (14.03.1937) e Divini Redemptoris (19.03.1937).",
          "Arquivos do pontificado de Pio XII abertos à pesquisa em 2020.",
          "Vos Estis Lux Mundi (2019); novo Livro VI do CDC (2021): normas vinculantes.",
        ],
        referencias: ["CIC §§ 1867, 2284-2287", "Gaudium et Spes 76"],
      },
    ],
    verbetes: ["tradicao-apostolica", "magisterio"],
    paragrafosCIC: [857, 2106, 2307, 2414],
  },
  {
    slug: "escritura",
    nome: "Escritura",
    kicker: "Sola Scriptura?",
    resumo:
      "Como se formou o cânon, por que a Igreja tem 73 livros, o que significa inspiração e inerrância, e por que a Escritura sozinha não se interpreta a si mesma.",
    secoes: [
      {
        id: "canon",
        titulo: "Como se formou o cânon",
        paragrafos: [
          "Nenhum livro do Novo Testamento traz uma lista dos livros inspirados. A coleção que hoje chamamos Bíblia foi discernida por uma comunidade viva, ao longo de séculos, usando critérios de origem apostólica, uso litúrgico e conformidade com a fé recebida.",
          "Os marcos são documentáveis: o fragmento de Muratori (fim do séc. II) já apresenta um núcleo do Novo Testamento; a carta festal de Santo Atanásio (367) lista 27 livros do NT; os sínodos de Hipona (393) e Cartago (397), com a carta de Inocêncio I a Exupério (405), fixam a lista de 73 livros no Ocidente. O Concílio de Trento, em 1546, definiu-a solenemente diante da contestação protestante — definiu, não inventou.",
        ],
        pontos: [
          "A Igreja reconheceu o cânon; não o produziu por decreto arbitrário (CIC §§ 120-127).",
          "Hipona (393), Cartago (397) e Inocêncio I (405) atestam os 73 livros muito antes de Trento.",
          "Trento, Sessão IV (08.04.1546), DH 1502-1503: definição dogmática do cânon.",
        ],
        referencias: ["CIC §§ 105-133", "Dei Verbum 8, 11", "Trento, Sessão IV (DH 1501-1505)"],
      },
      {
        id: "deuterocanonicos",
        titulo: "Os sete livros discutidos",
        paragrafos: [
          "Tobias, Judite, Sabedoria, Eclesiástico (Sirácida), Baruc, 1 e 2 Macabeus, mais partes de Ester e Daniel, são chamados deuterocanônicos pelos católicos e apócrifos pelos protestantes. Estavam na Septuaginta, a tradução grega usada pelos judeus de língua grega e pelos próprios autores do Novo Testamento, que citam predominantemente essa versão.",
          "O Novo Testamento não cita explicitamente todos eles, mas também não cita Ester nem Eclesiastes, cuja canonicidade ninguém contesta — o argumento da citação, portanto, não decide a questão. Há ecos reconhecíveis, como a relação entre Sb 2 e a Paixão, e entre Hb 11,35 e 2Mc 7.",
          "Divergência apresentada como divergência: judeus e protestantes seguem o cânon hebraico mais curto; católicos e ortodoxos seguem a tradição grega mais ampla, com pequenas variações entre si. A escolha depende de qual autoridade se reconhece para discernir o cânon — e essa é a verdadeira questão em disputa.",
        ],
        pontos: [
          "2Mc 12,44-46 sustenta a oração pelos mortos, o que explica parte da resistência do séc. XVI.",
          "São Jerônimo hesitou quanto a esses livros; Santo Agostinho e os sínodos africanos os incluíram.",
          "As Igrejas ortodoxas também têm cânon mais amplo que o protestante.",
        ],
        referencias: ["CIC § 120", "Dei Verbum 8", "Trento, Sessão IV (DH 1502)"],
      },
      {
        id: "inspiracao-e-inerrancia",
        titulo: "Inspiração e inerrância, corretamente entendidas",
        paragrafos: [
          "A Igreja afirma que Deus é o autor da Escritura e que ele agiu por meio de autores humanos reais, que escreveram segundo sua cultura, língua e gênero literário. Por isso a inerrância diz respeito à verdade que Deus quis comunicar para nossa salvação, não a uma pretensão de manual de história natural.",
          "Isso não é concessão moderna. Leão XIII, em Providentissimus Deus (1893), já ensinava que o Espírito Santo não pretendeu ensinar aos homens a constituição íntima das coisas visíveis. Dei Verbum 11-13 e o Catecismo pedem atenção ao que o autor humano quis dizer e ao modo como o disse.",
        ],
        pontos: [
          "Deus é autor da Escritura, agindo por autores humanos verdadeiros (CIC §§ 105-107).",
          "Interpretar exige atender ao gênero literário e ao contexto (CIC §§ 109-110; Dei Verbum 12).",
          "Os quatro sentidos clássicos — literal, alegórico, moral, anagógico — permanecem úteis (CIC §§ 115-119).",
        ],
        referencias: [
          "CIC §§ 105-119",
          "Dei Verbum 11-13",
          "Pontifícia Comissão Bíblica, A Interpretação da Bíblia na Igreja (1993)",
        ],
      },
      {
        id: "sola-scriptura",
        titulo: "Por que a Escritura sozinha não basta",
        paragrafos: [
          "A tese da Escritura como única regra de fé enfrenta um problema interno: ela não está na Escritura. Paulo manda conservar as tradições transmitidas por palavra ou por carta (2Ts 2,15), chama a Igreja de coluna e sustentáculo da verdade (1Tm 3,15) e ordena transmitir o depósito a homens fiéis (2Tm 2,2). O eunuco de Atos 8 lê Isaías e precisa de alguém que o guie.",
          "O católico não opõe Escritura e Tradição: sustenta que formam um só depósito, e que o Magistério existe para servi-lo, não para dominá-lo. O critério prático é histórico: a divisão doutrinal crescente entre comunidades que adotam apenas a Escritura mostra que um texto sagrado, sem autoridade interpretativa reconhecida, não produz por si unidade de fé.",
        ],
        pontos: [
          "Escritura, Tradição e Magistério estão ligados de tal modo que nenhum subsiste sem os outros (CIC §§ 80-82, 95).",
          "O Magistério não está acima da Palavra de Deus, mas a serve (CIC § 86; Dei Verbum 10).",
          "Argumento histórico, não insulto: a fragmentação confessional é dado verificável.",
        ],
        referencias: ["CIC §§ 74-100", "Dei Verbum 7-10", "2Ts 2,15; 1Tm 3,15; 2Tm 2,2"],
      },
      {
        id: "textos-e-manuscritos",
        titulo: "Manuscritos: o Novo Testamento é confiável?",
        paragrafos: [
          "O Novo Testamento é o texto antigo melhor atestado que existe. O catálogo do Institut für Neutestamentliche Textforschung, em Münster, registra mais de 5.800 manuscritos gregos, além de milhares de versões latinas, siríacas e coptas e de citações patrísticas.",
          "A distância entre composição e cópia mais antiga é pequena para os padrões da Antiguidade: o papiro P52, com um trecho de João, é datado por volta de 125; P66 e P75 são do fim do séc. II; os grandes códices Vaticano e Sinaítico, do séc. IV. As variantes existem em grande número, mas a esmagadora maioria é ortográfica ou de ordem de palavras; nenhuma põe em causa a doutrina central.",
          "Honestidade textual: passagens como o final longo de Marcos (16,9-20) e a mulher adúltera (Jo 7,53-8,11) são discutidas pela crítica textual, e as edições católicas modernas registram isso em nota. A Igreja as recebe como canônicas — e essa é justamente a diferença entre crítica textual e autoridade canônica.",
        ],
        pontos: [
          "Mais de 5.800 manuscritos gregos catalogados (INTF, Münster).",
          "P52 (c. 125) é o fragmento mais antigo conhecido de um evangelho.",
          "Variantes textuais são majoritariamente irrelevantes para a doutrina.",
        ],
        referencias: ["CIC §§ 120-127", "Dei Verbum 22", "Divino Afflante Spiritu (1943)"],
      },
    ],
    verbetes: ["sagrada-escritura", "revelacao"],
    paragrafosCIC: [105, 120, 80, 115],
  },
];

export function temaApologeticaPorSlug(slug: string) {
  return TEMAS_APOLOGETICA.find((t) => t.slug === slug);
}
