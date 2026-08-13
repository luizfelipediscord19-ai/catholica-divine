import type { Trilha } from "./tipos";

export const PRIMEIROS_PASSOS: Trilha = {
  slug: "primeiros-passos",
  titulo: "Primeiros passos na fé católica",
  subtitulo: "Do zero ao essencial, na ordem certa",
  nivel: "Iniciante",
  marcador: "✝️",
  descricao:
    "Dez lições que percorrem os fundamentos da fé: quem é Deus, quem é Jesus Cristo, o que é a Igreja, como Escritura e Tradição se articulam, os sacramentos, os mandamentos, o Credo, a oração, a Missa e a vida cristã concreta.",
  paraQuem:
    "Para quem está começando agora, voltou à Igreja depois de anos ou nunca teve catequese sistemática.",
  licoes: [
    {
      slug: "quem-e-deus",
      titulo: "Quem é Deus?",
      resumo:
        "Deus não é uma força impessoal nem uma ideia útil: é o Ser subsistente que se revelou como Pai, Filho e Espírito Santo.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "O ponto de partida",
          paragrafos: [
            "A fé católica afirma que Deus existe e pode ser conhecido de dois modos distintos e complementares. Pela razão natural, a partir das criaturas, o ser humano é capaz de chegar à certeza da existência de um Criador. Pela Revelação, Deus livremente se dá a conhecer naquilo que a razão sozinha jamais alcançaria: sua vida íntima, trinitária, e seu plano de salvação.",
            "Por isso o cristianismo não começa com um esforço humano de subir até Deus, mas com o reconhecimento de que Deus desceu primeiro. Ele fala, chama, faz aliança, envia profetas e finalmente envia o próprio Filho.",
            "Deus não é uma peça dentro do universo, ao lado das outras coisas que existem. Ele é o próprio ato de existir, aquele de quem tudo depende e que não depende de nada. Essa é a razão de a Igreja rejeitar tanto o panteísmo (Deus é o mundo) quanto o deísmo (Deus criou e se afastou).",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Deus se revela pelo nome",
          citacoes: [
            {
              ref: "Ex 3, 14",
              texto:
                "Deus disse a Moisés: EU SOU AQUELE QUE SOU. Eis como responderás aos israelitas: EU SOU envia-me a vós.",
            },
            {
              ref: "1Jo 4, 8",
              texto: "Aquele que não ama não conheceu a Deus, pois Deus é amor.",
            },
            {
              ref: "Rm 1, 20",
              texto:
                "Desde a criação do mundo, as perfeições invisíveis de Deus tornam-se visíveis à inteligência através das criaturas.",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "O Deus único em três Pessoas",
          citacoes: [
            {
              ref: "CIC §232",
              texto:
                "Os cristãos são batizados em nome do Pai e do Filho e do Espírito Santo. O mistério da Santíssima Trindade é o mistério central da fé e da vida cristã.",
            },
            {
              ref: "CIC §253",
              texto:
                "A Trindade é una. Não confessamos três deuses, mas um só Deus em três Pessoas.",
            },
            {
              ref: "CIC §36",
              texto:
                "A Santa Igreja, nossa Mãe, sustenta e ensina que Deus, princípio e fim de todas as coisas, pode ser conhecido com certeza pela luz natural da razão humana a partir das coisas criadas.",
            },
          ],
        },
        {
          tipo: "padres",
          titulo: "A inquietação do coração",
          citacoes: [
            {
              ref: "Santo Agostinho, Confissões I, 1",
              texto:
                "Fizeste-nos para Ti, e o nosso coração está inquieto enquanto não repousa em Ti.",
            },
            {
              ref: "Santo Irineu, Contra as Heresias IV, 20, 7",
              texto: "A glória de Deus é o homem vivo, e a vida do homem é a visão de Deus.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Trindade não é acreditar em três deuses?",
              resposta:
                "Não. A Igreja confessa uma só natureza divina subsistindo em três Pessoas realmente distintas entre si — Pai, Filho e Espírito Santo — mas não distintas na substância. Negar essa distinção é modalismo; multiplicar a substância é triteísmo. Ambos foram rejeitados pela Igreja.",
            },
            {
              pergunta: "Se Deus é bom, por que existe o mal?",
              resposta:
                "O mal não é uma coisa criada, mas privação de um bem devido. A liberdade das criaturas racionais torna possível o mal moral; Deus o permite sem jamais querê-lo, e dele tira um bem maior — o ápice disso é a Cruz. O Catecismo trata do tema nos §§309-314.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§27-49; §§232-267; §§309-314" },
        { obra: "Concílio Vaticano I", ref: "Dei Filius, cap. 2" },
        { obra: "Concílio Vaticano II", ref: "Dei Verbum, 2-6" },
        { obra: "Bíblia Sagrada", ref: "Ex 3, 14; Rm 1, 20; 1Jo 4, 8" },
      ],
      relacionados: [
        { label: "Catecismo — A profissão de fé", to: "/catecismo" },
        { label: "Glossário: Trindade, Revelação", to: "/glossario" },
      ],
    },
    {
      slug: "quem-e-jesus",
      titulo: "Quem é Jesus Cristo?",
      resumo:
        "Verdadeiro Deus e verdadeiro homem, uma só Pessoa em duas naturezas: o centro de toda a fé cristã.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Não um mestre entre outros",
          paragrafos: [
            "O cristianismo não é primeiramente uma doutrina moral, mas o encontro com uma Pessoa. Jesus de Nazaré é reconhecido pela Igreja como o Filho eterno de Deus que assumiu a natureza humana no seio da Virgem Maria, viveu, pregou, morreu crucificado sob Pôncio Pilatos e ressuscitou ao terceiro dia.",
            "O Concílio de Calcedônia (451) fixou a fórmula que a Igreja professa até hoje: uma só Pessoa, o Verbo, em duas naturezas — divina e humana — sem confusão, sem mudança, sem divisão, sem separação. Cristo é plenamente Deus e plenamente homem; não meio a meio.",
            "A Ressurreição não é uma metáfora do ânimo dos discípulos: é um acontecimento histórico e transcendente atestado pelo túmulo vazio e pelas aparições, e sem ela, diz São Paulo, a fé seria vã.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Testemunhos centrais",
          citacoes: [
            {
              ref: "Jo 1, 14",
              texto:
                "E o Verbo se fez carne e habitou entre nós. E vimos a sua glória, glória que ele tem como Filho único do Pai, cheio de graça e de verdade.",
            },
            {
              ref: "Mt 16, 15-16",
              texto:
                "E vós, quem dizeis que eu sou? Simão Pedro respondeu: Tu és o Cristo, o Filho do Deus vivo.",
            },
            {
              ref: "1Cor 15, 14",
              texto:
                "E se Cristo não ressuscitou, é vã a nossa pregação e é vã também a vossa fé.",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "A fé de Calcedônia",
          citacoes: [
            {
              ref: "CIC §464",
              texto:
                "O acontecimento único e totalmente singular da Encarnação do Filho de Deus não significa que Jesus Cristo seja em parte Deus e em parte homem, nem que seja o resultado de uma mistura confusa entre o divino e o humano.",
            },
            {
              ref: "CIC §480",
              texto:
                "Jesus Cristo é verdadeiro Deus e verdadeiro homem, na unidade de sua Pessoa divina; por isso ele é o único Mediador entre Deus e os homens.",
            },
            {
              ref: "CIC §638",
              texto:
                "A Ressurreição de Jesus é a verdade culminante de nossa fé em Cristo, crida e vivida como verdade central pela primeira comunidade cristã.",
            },
          ],
        },
        {
          tipo: "padres",
          titulo: "Por que Deus se fez homem",
          citacoes: [
            {
              ref: "Santo Atanásio, De Incarnatione 54",
              texto: "Ele se fez homem para que nós fôssemos feitos deuses (por participação).",
            },
            {
              ref: "São Leão Magno, Tomo a Flaviano",
              texto:
                "Cada natureza conserva sem defeito o que lhe é próprio, e assim como a forma de Deus não suprime a forma de servo, a forma de servo não diminui a forma de Deus.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Jesus alguma vez disse claramente que era Deus?",
              resposta:
                "Sim, sobretudo em João: 'Antes que Abraão existisse, eu sou' (Jo 8, 58), retomando o nome divino do Êxodo; e 'Eu e o Pai somos um' (Jo 10, 30), após o que os ouvintes pegam pedras por blasfêmia — sinal de que entenderam a afirmação.",
            },
            {
              pergunta: "Ele tinha vontade humana ou só divina?",
              resposta:
                "Duas vontades, humana e divina, perfeitamente unidas e nunca opostas, conforme o III Concílio de Constantinopla (681). Getsêmani mostra isso: 'não se faça a minha vontade, mas a tua'.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§422-483; §§638-658" },
        { obra: "Concílio de Calcedônia", ref: "Definição de fé (451)" },
        { obra: "III Concílio de Constantinopla", ref: "Definição sobre as duas vontades (681)" },
        { obra: "Bíblia Sagrada", ref: "Jo 1, 14; Mt 16, 15-16; 1Cor 15" },
      ],
      relacionados: [{ label: "Ler o Evangelho de João", to: "/biblia" }],
    },
    {
      slug: "o-que-e-a-igreja",
      titulo: "O que é a Igreja?",
      resumo:
        "Corpo de Cristo e povo de Deus, visível e espiritual, una, santa, católica e apostólica.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "Instituição e mistério",
          paragrafos: [
            "A Igreja não é apenas uma organização humana com fins religiosos, nem apenas uma comunhão invisível de crentes sinceros. Ela é ambas as coisas em unidade: uma sociedade visível, com estrutura hierárquica e sacramentos, e ao mesmo tempo um mistério, o Corpo de Cristo animado pelo Espírito Santo.",
            "Ela nasce do lado aberto de Cristo na Cruz e se manifesta publicamente em Pentecostes. Sua missão é dupla: santificar seus membros e evangelizar o mundo.",
            "As quatro notas — una, santa, católica e apostólica — não são elogios, mas critérios de identificação, professados no Credo desde o século IV.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Fundação e estrutura",
          citacoes: [
            {
              ref: "Mt 16, 18",
              texto:
                "E eu te digo: tu és Pedro, e sobre esta pedra edificarei a minha Igreja, e as portas do inferno não prevalecerão contra ela.",
            },
            {
              ref: "1Tm 3, 15",
              texto: "A Igreja do Deus vivo, coluna e fundamento da verdade.",
            },
            {
              ref: "At 2, 42",
              texto:
                "Eram perseverantes em ouvir o ensinamento dos apóstolos, na comunhão fraterna, na fração do pão e nas orações.",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Definições fundamentais",
          citacoes: [
            {
              ref: "CIC §751",
              texto:
                "A palavra Igreja significa convocação. Designa a assembleia daqueles que a Palavra de Deus convoca para formar o povo de Deus.",
            },
            {
              ref: "CIC §811",
              texto:
                "Esta é a única Igreja de Cristo, que professamos no Credo como una, santa, católica e apostólica.",
            },
            {
              ref: "CIC §857",
              texto:
                "A Igreja é apostólica porque está fundada sobre os apóstolos, guarda o depósito da fé e continua a ser instruída e santificada por eles através de seus sucessores.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Concílio Vaticano II",
          citacoes: [
            {
              ref: "Lumen Gentium, 1",
              texto:
                "A Igreja é em Cristo como que o sacramento, isto é, o sinal e o instrumento da íntima união com Deus e da unidade de todo o gênero humano.",
            },
            {
              ref: "Lumen Gentium, 8",
              texto:
                "Esta Igreja, constituída e organizada neste mundo como uma sociedade, subsiste na Igreja Católica, governada pelo sucessor de Pedro e pelos bispos em comunhão com ele.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Se a Igreja é santa, por que há pecadores nela?",
              resposta:
                "A santidade da Igreja vem de Cristo, sua cabeça, e dos meios de graça que ela guarda, não do mérito de seus membros. O Catecismo (§827) afirma que a Igreja é ao mesmo tempo santa e sempre necessitada de purificação.",
            },
            {
              pergunta: "Precisa de hierarquia?",
              resposta:
                "Cristo escolheu os Doze, deu-lhes autoridade de ensinar, santificar e governar, e essa estrutura foi transmitida por sucessão apostólica. Não é acréscimo posterior: já em Inácio de Antioquia (c. 107) bispo, presbíteros e diáconos aparecem como estrutura normal.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§748-870" },
        { obra: "Concílio Vaticano II", ref: "Lumen Gentium, 1-8; 18-29" },
        { obra: "Santo Inácio de Antioquia", ref: "Carta aos Esmirniotas, 8" },
      ],
    },
    {
      slug: "biblia-e-tradicao",
      titulo: "Bíblia e Tradição",
      resumo:
        "Uma só fonte, a Revelação, transmitida por dois canais, interpretada com autoridade pelo Magistério.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Como a Revelação chega até nós",
          paragrafos: [
            "A Revelação divina foi confiada por Cristo aos apóstolos e por eles transmitida de duas formas: por escrito (a Sagrada Escritura) e oralmente, na pregação, na liturgia e na vida da Igreja (a Sagrada Tradição). As duas brotam da mesma fonte divina e formam um único depósito da fé.",
            "O Magistério — o papa e os bispos em comunhão com ele — não está acima da Palavra de Deus, mas a serviço dela: ensina apenas o que foi transmitido, guardando-o e explicando-o com fidelidade.",
            "O cânon católico tem 73 livros: 46 no Antigo Testamento (incluindo os deuterocanônicos) e 27 no Novo. Essa lista já era reconhecida pela tradição da Igreja nos concílios regionais de Hipona (393) e Cartago (397), sendo definida solenemente como dogma de fé pelo Concílio de Trento (1546), diante das controvérsias do século XVI sobre o cânon.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "A própria Escritura fala da Tradição",
          citacoes: [
            {
              ref: "2Ts 2, 15",
              texto:
                "Permanecei firmes, irmãos, e guardai os ensinamentos que de nós recebestes, seja de viva voz, seja por carta.",
            },
            {
              ref: "2Tm 3, 16",
              texto:
                "Toda a Escritura é inspirada por Deus e útil para ensinar, para argumentar, para corrigir e para educar na justiça.",
            },
            {
              ref: "At 8, 30-31",
              texto:
                "Compreendes o que estás lendo? Ele respondeu: Como posso, se ninguém me explica?",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Os três elos",
          citacoes: [
            {
              ref: "CIC §80",
              texto:
                "A Tradição e a Sagrada Escritura estão intimamente ligadas e se comunicam entre si, pois ambas jorram da mesma fonte divina.",
            },
            {
              ref: "CIC §85",
              texto:
                "O ofício de interpretar autenticamente a Palavra de Deus, escrita ou transmitida, foi confiado unicamente ao Magistério vivo da Igreja.",
            },
            {
              ref: "CIC §95",
              texto:
                "Tradição, Escritura e Magistério estão de tal modo unidos entre si que nenhum deles subsiste sem os outros.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Como começar a ler a Bíblia",
          pontos: [
            "Comece por um Evangelho inteiro — Marcos é o mais curto e direto; João é o mais teológico.",
            "Depois leia Atos dos Apóstolos: mostra a Igreja nascendo e conecta os Evangelhos às cartas.",
            "Reserve um horário fixo e um capítulo por dia. Constância vale mais do que volume.",
            "Leia com a Igreja: acompanhe as leituras da Missa do dia e consulte o Catecismo nos pontos difíceis.",
            "Anote o que não entendeu em vez de travar. Retome depois com uma introdução ao livro.",
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "A Igreja acrescentou livros à Bíblia?",
              resposta:
                "Não. Os deuterocanônicos já constavam na Septuaginta, versão grega que teve papel fundamental entre os primeiros cristãos, e foram lidos como Escritura pelos Padres desde a antiguidade. Trento não os criou nem inventou um cânon novo: diante das controvérsias do século XVI, definiu solenemente como dogma de fé a lista canônica já recebida pela tradição da Igreja. Foram outras confissões que os removeram nesse mesmo século.",
            },
            {
              pergunta: "Por que não basta só a Escritura?",
              resposta:
                "Porque a própria Escritura é fruto e testemunho da Tradição apostólica — foi a Igreja quem discerniu quais livros são inspirados — e porque textos exigem interpretação autorizada, como o próprio Novo Testamento reconhece (2Pd 3, 16).",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§74-100; §§101-141" },
        { obra: "Concílio Vaticano II", ref: "Dei Verbum, 7-10; 21-25" },
        { obra: "Concílio de Trento", ref: "Sessão IV (1546), Decreto sobre os livros sagrados" },
      ],
      relacionados: [
        { label: "Bíblia Sagrada — 73 livros", to: "/biblia" },
        { label: "Leituras do dia", to: "/biblia/leituras" },
      ],
    },
    {
      slug: "os-sete-sacramentos",
      titulo: "Os sete sacramentos",
      resumo:
        "Sinais eficazes instituídos por Cristo que conferem realmente a graça que significam.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que é um sacramento",
          paragrafos: [
            "Sacramento é um sinal sensível, instituído por Cristo e confiado à Igreja, pelo qual a graça divina é realmente comunicada. Ele não apenas representa: efetua o que significa.",
            "São sete: Batismo, Confirmação (Crisma) e Eucaristia (iniciação cristã); Penitência e Unção dos Enfermos (cura); Ordem e Matrimônio (serviço da comunhão).",
            "Os sacramentos agem ex opere operato, isto é, pela ação de Cristo, e não pela santidade do ministro; mas seu fruto depende da disposição de quem os recebe.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Instituição pelos textos",
          citacoes: [
            { ref: "Mt 28, 19", texto: "Ide, pois, e ensinai a todas as nações, batizando-as em nome do Pai e do Filho e do Espírito Santo." },
            { ref: "Jo 20, 22-23", texto: "Recebei o Espírito Santo. Àqueles a quem perdoardes os pecados, ser-lhes-ão perdoados." },
            { ref: "Tg 5, 14-15", texto: "Está alguém doente entre vós? Chame os presbíteros da Igreja, e estes façam oração sobre ele, ungindo-o com óleo em nome do Senhor." },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Definição e eficácia",
          citacoes: [
            {
              ref: "CIC §1131",
              texto:
                "Os sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja, pelos quais nos é dispensada a vida divina.",
            },
            {
              ref: "CIC §1210",
              texto:
                "Os sacramentos da Nova Lei foram instituídos por Cristo e são sete: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem e Matrimônio.",
            },
            {
              ref: "CIC §1128",
              texto:
                "O sacramento não é realizado pela justiça do homem que o dá ou o recebe, mas pelo poder de Deus.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Por que sete e não mais?",
              resposta:
                "Porque são os sete ritos que a Igreja reconheceu como instituídos por Cristo e transmitidos desde os apóstolos. O número foi explicitado no século XII e definido no Concílio de Florença (1439) e em Trento (Sessão VII).",
            },
            {
              pergunta: "Um padre em pecado invalida o sacramento?",
              resposta:
                "Não. É Cristo quem age. O pecado do ministro é grave, mas não anula a validade do que ele confere com matéria, forma e intenção corretas.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1113-1134; §§1210-1666" },
        { obra: "Concílio de Trento", ref: "Sessão VII, Cânones sobre os sacramentos em geral" },
      ],
      relacionados: [{ label: "Página dos Sacramentos", to: "/sacramentos" }],
    },
    {
      slug: "os-dez-mandamentos",
      titulo: "Os Dez Mandamentos",
      resumo: "A lei da aliança, resumida por Cristo no duplo mandamento do amor.",
      minutos: 7,
      blocos: [
        {
          tipo: "texto",
          titulo: "Lei que liberta",
          paragrafos: [
            "O Decálogo foi entregue a Moisés no Sinai como cláusula da aliança e assumido por Cristo, que o aprofundou no Sermão da Montanha. Os três primeiros mandamentos ordenam a relação com Deus; os sete seguintes, a relação com o próximo.",
            "A Igreja ensina que os mandamentos obrigam gravemente em sua substância e exprimem a lei moral natural, acessível à razão. Não são imposições arbitrárias, mas a descrição do que protege a dignidade humana.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Textos-base",
          citacoes: [
            { ref: "Ex 20, 1-17", texto: "Promulgação do Decálogo no Sinai." },
            { ref: "Dt 5, 6-21", texto: "Segunda formulação do Decálogo." },
            {
              ref: "Mt 22, 37-40",
              texto:
                "Amarás o Senhor teu Deus de todo o teu coração... Amarás o teu próximo como a ti mesmo. Nestes dois mandamentos se resumem toda a Lei e os Profetas.",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Alcance e obrigação",
          citacoes: [
            {
              ref: "CIC §2072",
              texto:
                "Por exprimirem os deveres fundamentais do homem para com Deus e para com o próximo, os Dez Mandamentos revelam, em seu conteúdo primordial, obrigações graves.",
            },
            {
              ref: "CIC §2068",
              texto:
                "A salvação depende da observância dos mandamentos, com a graça de Deus, para quem conhece o Evangelho.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Os dez, na formulação catequética",
          pontos: [
            "1. Amar a Deus sobre todas as coisas.",
            "2. Não tomar seu santo nome em vão.",
            "3. Guardar domingos e festas de guarda.",
            "4. Honrar pai e mãe.",
            "5. Não matar.",
            "6. Não pecar contra a castidade.",
            "7. Não roubar.",
            "8. Não levantar falso testemunho.",
            "9. Não desejar a mulher (ou o marido) do próximo.",
            "10. Não cobiçar as coisas alheias.",
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§2052-2557" },
        { obra: "Bíblia Sagrada", ref: "Ex 20; Dt 5; Mt 5-7; Mt 22" },
      ],
    },
    {
      slug: "o-credo",
      titulo: "O Credo",
      resumo: "O resumo oficial da fé, artigo por artigo, fixado por dois concílios.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "Duas fórmulas, uma fé",
          paragrafos: [
            "A Igreja usa dois símbolos principais: o Símbolo dos Apóstolos, mais antigo e breve, ligado ao rito batismal de Roma; e o Símbolo Niceno-Constantinopolitano, formulado nos concílios de Niceia (325) e Constantinopla (381) para responder às crises ariana e pneumatomaquiana.",
            "Rezar o Credo não é recitar uma lista: é aderir pessoalmente a Deus que se revela e à verdade que ele comunica. Por isso começa por 'Creio', no singular, mesmo quando rezado em assembleia.",
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Sentido do símbolo",
          citacoes: [
            {
              ref: "CIC §187",
              texto:
                "Chamam-se profissões de fé porque resumem a fé que os cristãos professam. Chamam-se Credo por causa da palavra com que normalmente começam.",
            },
            {
              ref: "CIC §194",
              texto:
                "O Símbolo dos Apóstolos é assim chamado por ser considerado com razão o resumo fiel da fé dos apóstolos.",
            },
            {
              ref: "CIC §195",
              texto:
                "O Símbolo chamado de Niceno-Constantinopolitano deve sua grande autoridade ao fato de provir dos dois primeiros concílios ecumênicos.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Estrutura em três partes",
          pontos: [
            "Primeira parte: o Pai, criador do céu e da terra.",
            "Segunda parte: o Filho, encarnado, morto, ressuscitado, que voltará como juiz.",
            "Terceira parte: o Espírito Santo, a Igreja, a comunhão dos santos, o perdão dos pecados, a ressurreição da carne e a vida eterna.",
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§185-1065" },
        { obra: "Concílio de Niceia", ref: "Símbolo (325)" },
        { obra: "I Concílio de Constantinopla", ref: "Símbolo (381)" },
      ],
      relacionados: [{ label: "A Fé Católica", to: "/fe-catolica" }],
    },
    {
      slug: "oracao",
      titulo: "Oração",
      resumo: "Elevação da alma a Deus: formas, dificuldades e o modelo do Pai-Nosso.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que é orar",
          paragrafos: [
            "A oração é relação viva com Deus, não técnica de concentração. A tradição distingue cinco formas: bênção e adoração, petição, intercessão, ação de graças e louvor.",
            "Também distingue três expressões: oração vocal (com palavras), meditação (busca reflexiva) e oração contemplativa (permanência silenciosa e amorosa diante de Deus).",
            "As dificuldades — distração, secura, tédio — são normais e fazem parte do combate espiritual. A resposta não é abandonar, mas perseverar em horários e formas simples.",
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Definições clássicas",
          citacoes: [
            {
              ref: "CIC §2559",
              texto:
                "A oração é a elevação da alma a Deus ou o pedido a Deus de bens convenientes. A humildade é o fundamento da oração.",
            },
            {
              ref: "CIC §2725",
              texto:
                "A oração é um dom da graça e uma resposta decidida de nossa parte. Supõe sempre um esforço.",
            },
            {
              ref: "CIC §2761",
              texto:
                "O Pai-Nosso é verdadeiramente o resumo de todo o Evangelho, a mais perfeita das orações.",
            },
          ],
        },
        {
          tipo: "escritura",
          titulo: "Ensino de Jesus",
          citacoes: [
            { ref: "Mt 6, 6", texto: "Quando orares, entra no teu quarto, fecha a porta e ora ao teu Pai que está no segredo." },
            { ref: "Lc 18, 1", texto: "É preciso orar sempre, sem jamais esmorecer." },
            { ref: "1Ts 5, 17", texto: "Orai sem cessar." },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Um plano mínimo e sustentável",
          pontos: [
            "Manhã: oferecimento do dia, três minutos.",
            "Durante o dia: uma leitura do Evangelho da Missa.",
            "Noite: exame de consciência breve e ato de contrição.",
            "Semanal: um terço rezado com calma, um mistério por vez se necessário.",
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§2558-2865" },
        { obra: "Bíblia Sagrada", ref: "Mt 6; Lc 11; Lc 18" },
      ],
      relacionados: [
        { label: "Biblioteca de orações", to: "/oracoes" },
        { label: "Santo Rosário", to: "/oracoes/rosario" },
      ],
    },
    {
      slug: "santa-missa",
      titulo: "A Santa Missa",
      resumo:
        "O mesmo sacrifício do Calvário, oferecido de modo incruento, e o modo de participar dele.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Estrutura da celebração",
          paragrafos: [
            "A Missa se divide em Ritos Iniciais, Liturgia da Palavra, Liturgia Eucarística e Ritos Finais. Palavra e Eucaristia formam um só ato de culto, e não duas partes independentes.",
            "Na Liturgia Eucarística, pelas palavras da consagração pronunciadas pelo sacerdote em nome de Cristo, o pão e o vinho passam a ser o Corpo e o Sangue do Senhor, permanecendo apenas as aparências.",
            "A Missa não repete o sacrifício da Cruz: torna-o presente. É o mesmo e único sacrifício, oferecido agora de modo sacramental e incruento.",
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Sacrifício e presença",
          citacoes: [
            {
              ref: "CIC §1367",
              texto:
                "O sacrifício de Cristo e o sacrifício da Eucaristia são, portanto, um único sacrifício. A vítima é uma e a mesma; só o modo de oferecer é diferente.",
            },
            {
              ref: "CIC §1324",
              texto:
                "A Eucaristia é fonte e ápice de toda a vida cristã.",
            },
            {
              ref: "CIC §1385",
              texto:
                "Quem tem consciência de estar em pecado grave deve receber o sacramento da Reconciliação antes de comungar.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Como participar bem",
          pontos: [
            "Chegue alguns minutos antes e faça silêncio interior antes do início.",
            "Leia as leituras do dia previamente — a Palavra rende muito mais quando já é conhecida.",
            "Jejum eucarístico de uma hora antes da comunhão (água e remédios não quebram).",
            "Comungue em estado de graça; se houver pecado grave, confesse-se antes.",
            "Reserve alguns minutos de ação de graças após a comunhão, antes de sair.",
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Faltar à Missa dominical é pecado grave?",
              resposta:
                "Sim, quando é deliberado e sem causa proporcional (doença, cuidado de doentes, impossibilidade real). O preceito está no Código de Direito Canônico, cân. 1247, e no Catecismo §2181.",
            },
            {
              pergunta: "Posso comungar em qualquer situação?",
              resposta:
                "É preciso estar em comunhão com a fé católica, em estado de graça e ter observado o jejum. Quem vive em situação objetivamente contrária ao Evangelho deve procurar orientação sacerdotal antes.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1322-1419; §2181" },
        { obra: "Código de Direito Canônico", ref: "cân. 916; 919; 1247" },
        { obra: "Concílio Vaticano II", ref: "Sacrosanctum Concilium, 47-56" },
      ],
      relacionados: [{ label: "Liturgia do dia", to: "/liturgia-diaria" }],
    },
    {
      slug: "vida-crista",
      titulo: "Vida cristã",
      resumo:
        "Como a fé se traduz em rotina: estado de graça, virtudes, caridade concreta e perseverança.",
      minutos: 7,
      blocos: [
        {
          tipo: "texto",
          titulo: "Santidade não é heroísmo excepcional",
          paragrafos: [
            "O Concílio Vaticano II recuperou com força a doutrina da vocação universal à santidade: todos os batizados, em qualquer estado de vida, são chamados à perfeição da caridade.",
            "Isso se dá pelos meios ordinários: sacramentos frequentes, oração diária, cumprimento fiel dos deveres de estado, obras de misericórdia e formação contínua.",
            "A vida moral cristã não é uma soma de proibições: é o crescimento das virtudes teologais (fé, esperança e caridade) e cardeais (prudência, justiça, fortaleza e temperança), sustentado pela graça.",
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Chamado universal",
          citacoes: [
            {
              ref: "Lumen Gentium, 40",
              texto:
                "Todos os fiéis, de qualquer estado ou condição, são chamados por Deus, cada um por seu caminho, à perfeição daquela santidade com que o próprio Pai é perfeito.",
            },
          ],
        },
        {
          tipo: "escritura",
          titulo: "O critério final",
          citacoes: [
            {
              ref: "Mt 25, 40",
              texto:
                "Todas as vezes que fizestes isso a um destes meus irmãos mais pequeninos, foi a mim que o fizestes.",
            },
            { ref: "Tg 2, 17", texto: "A fé sem obras é morta em si mesma." },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Rotina realista para um mês",
          pontos: [
            "Missa dominical inegociável; se possível, uma Missa a mais na semana.",
            "Confissão mensal, mesmo sem pecado grave, pela graça sacramental.",
            "Dez a quinze minutos de oração diária em horário fixo.",
            "Uma obra de misericórdia concreta por semana, com nome e rosto.",
            "Um estudo por semana: uma lição de trilha, um verbete, um capítulo do Catecismo.",
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1691-2051" },
        { obra: "Concílio Vaticano II", ref: "Lumen Gentium, 39-42" },
        { obra: "Bíblia Sagrada", ref: "Mt 25; Tg 2" },
      ],
      relacionados: [{ label: "Meu painel espiritual", to: "/painel" }],
    },
  ],
};
