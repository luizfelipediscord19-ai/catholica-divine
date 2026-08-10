import type { Trilha } from "./tipos";

export const CATEQUESE_INTERMEDIARIA: Trilha = {
  slug: "catequese-intermediaria",
  titulo: "Catequese intermediária",
  subtitulo: "Aprofundar o que já se professa",
  nivel: "Intermediário",
  marcador: "📚",
  descricao:
    "Seis lições sobre os temas que mais aparecem na vida sacramental concreta: graça, Eucaristia, confissão, Maria e os santos, as últimas realidades e a formação da consciência moral.",
  paraQuem:
    "Para quem já conhece o essencial e quer entender o porquê de cada prática, com fontes na mão.",
  licoes: [
    {
      slug: "eucaristia",
      titulo: "A Eucaristia",
      resumo:
        "Presença real, sacrifício e comunhão: o que é, o que ensina a Escritura, o Catecismo, os Padres e Trento.",
      minutos: 11,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que é",
          paragrafos: [
            "A Eucaristia é o sacramento em que Cristo se faz realmente presente sob as espécies do pão e do vinho — verdadeira, real e substancialmente, com seu Corpo, Sangue, Alma e Divindade.",
            "A mudança da substância do pão e do vinho na substância do Corpo e do Sangue de Cristo, permanecendo as aparências (acidentes), é chamada pela Igreja de transubstanciação. O termo é técnico, mas protege uma afirmação simples: aquilo que está no altar já não é pão, embora continue com aparência de pão.",
            "A Eucaristia é ao mesmo tempo sacrifício (a Cruz tornada presente), presença permanente (por isso a reserva no sacrário e a adoração) e banquete de comunhão (a Ceia do Senhor).",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que a Bíblia ensina",
          citacoes: [
            {
              ref: "Jo 6, 51",
              texto:
                "Eu sou o pão vivo descido do céu. Quem comer deste pão viverá eternamente. E o pão que eu hei de dar é a minha carne, para a salvação do mundo.",
            },
            {
              ref: "Jo 6, 53-56",
              texto:
                "Se não comerdes a carne do Filho do Homem e não beberdes o seu sangue, não tereis a vida em vós. Pois a minha carne é verdadeiramente uma comida e o meu sangue é verdadeiramente uma bebida.",
            },
            {
              ref: "Lc 22, 19-20",
              texto:
                "Isto é o meu corpo, que é dado por vós; fazei isto em memória de mim. Este cálice é a nova aliança em meu sangue, que é derramado por vós.",
            },
            {
              ref: "1Cor 11, 27-29",
              texto:
                "Todo aquele que comer o pão ou beber o cálice do Senhor indignamente será réu do corpo e do sangue do Senhor.",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "O que diz o Catecismo",
          citacoes: [
            {
              ref: "CIC §1324",
              texto:
                "A Eucaristia é fonte e ápice de toda a vida cristã. Os demais sacramentos, assim como todos os ministérios eclesiais e as obras de apostolado, estão unidos à Eucaristia e a ela se ordenam.",
            },
            {
              ref: "CIC §1374",
              texto:
                "No santíssimo sacramento da Eucaristia estão contidos verdadeira, real e substancialmente o Corpo e o Sangue, juntamente com a alma e a divindade de nosso Senhor Jesus Cristo e, portanto, Cristo inteiro.",
            },
            {
              ref: "CIC §1376",
              texto:
                "Pela consagração do pão e do vinho opera-se a conversão de toda a substância do pão na substância do Corpo de Cristo e de toda a substância do vinho na substância do seu Sangue.",
            },
            {
              ref: "CIC §1327",
              texto:
                "Em suma, a Eucaristia é o resumo e a soma de nossa fé.",
            },
          ],
        },
        {
          tipo: "padres",
          titulo: "O que os Padres ensinaram",
          citacoes: [
            {
              ref: "Santo Inácio de Antioquia, Aos Esmirniotas 7 (c. 107)",
              texto:
                "Afastam-se da Eucaristia e da oração porque não confessam que a Eucaristia é a carne de nosso Salvador Jesus Cristo, a mesma que sofreu por nossos pecados.",
            },
            {
              ref: "São Justino, I Apologia 66 (c. 155)",
              texto:
                "Não recebemos esse alimento como pão comum nem bebida comum; assim como Jesus Cristo se fez carne, também esse alimento é a carne e o sangue daquele mesmo Jesus encarnado.",
            },
            {
              ref: "São Cirilo de Jerusalém, Catequeses Mistagógicas IV, 6",
              texto:
                "Já que ele mesmo declarou 'isto é o meu corpo', quem ousará duvidar? Não julgues a realidade pelo paladar, mas pela fé.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Definições conciliares",
          citacoes: [
            {
              ref: "Concílio de Trento, Sessão XIII (1551), cap. 4",
              texto:
                "Pela consagração do pão e do vinho realiza-se a conversão de toda a substância do pão na substância do corpo de Cristo, e de toda a substância do vinho na substância do seu sangue; conversão que a Igreja católica chama convenientemente de transubstanciação.",
            },
            {
              ref: "Sacrosanctum Concilium, 47",
              texto:
                "O Salvador instituiu na última Ceia o sacrifício eucarístico do seu Corpo e Sangue, para perpetuar pelos séculos o sacrifício da cruz até que ele volte.",
            },
            {
              ref: "Ecclesia de Eucharistia (São João Paulo II, 2003), 1",
              texto: "A Igreja vive da Eucaristia.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Como participar corretamente da Missa",
          pontos: [
            "Preparação: leia as leituras antes, chegue com antecedência e faça silêncio interior.",
            "Estado de graça: quem tem consciência de pecado grave deve confessar-se antes de comungar (CIC §1385).",
            "Jejum eucarístico: uma hora antes da comunhão, exceto água e remédios (cân. 919).",
            "Postura: gestos comuns da assembleia, atenção às orações, resposta consciente ao diálogo litúrgico.",
            "Depois: alguns minutos de ação de graças; a Missa não termina na porta da igreja.",
            "Ao menos uma vez por ano, a comunhão pascal é preceito (cân. 920).",
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Jo 6 não é apenas simbólico?",
              resposta:
                "O próprio contexto exclui a leitura simbólica: os ouvintes se escandalizam e muitos discípulos o abandonam (Jo 6, 60-66), e Jesus, em vez de corrigir o mal-entendido, reforça a afirmação. Quando fala em símbolo, ele costuma explicar (cf. Jo 10, 6-7).",
            },
            {
              pergunta: "Se é o mesmo sacrifício, Cristo sofre de novo?",
              resposta:
                "Não. A Cruz é única e irrepetível. Na Missa, o mesmo sacrifício se torna sacramentalmente presente, de modo incruento (CIC §1367; Trento, Sessão XXII).",
            },
            {
              pergunta: "Posso comungar duas vezes no mesmo dia?",
              resposta:
                "Sim, uma segunda vez, desde que dentro de outra celebração eucarística da qual se participe (cân. 917).",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1322-1419" },
        { obra: "Concílio de Trento", ref: "Sessão XIII (1551); Sessão XXII (1562)" },
        { obra: "Concílio Vaticano II", ref: "Sacrosanctum Concilium, 47-58" },
        { obra: "São João Paulo II", ref: "Ecclesia de Eucharistia (2003)" },
        { obra: "Código de Direito Canônico", ref: "cân. 916-920" },
        { obra: "Bíblia Sagrada", ref: "Jo 6; Lc 22; 1Cor 10-11" },
      ],
      relacionados: [
        { label: "Sacramentos", to: "/sacramentos" },
        { label: "Liturgia do dia", to: "/liturgia-diaria" },
      ],
    },
    {
      slug: "graca-e-justificacao",
      titulo: "Graça e justificação",
      resumo:
        "O que é a graça, como o homem é justificado e por que fé e obras não se opõem.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Graça: dom, não salário",
          paragrafos: [
            "Graça é o favor gratuito de Deus, participação em sua própria vida. Ela não é devida a ninguém e precede qualquer mérito humano: é Deus quem inicia.",
            "A justificação é a obra pela qual Deus, pelos méritos de Cristo, perdoa os pecados e santifica interiormente o homem, tornando-o realmente justo — não apenas declarado justo por fora.",
            "A distinção clássica: graça santificante (habitual, estado de vida em Deus) e graças atuais (auxílios pontuais para agir bem).",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Textos-chave",
          citacoes: [
            { ref: "Ef 2, 8-9", texto: "É pela graça que sois salvos, mediante a fé. E isso não vem de vós, é dom de Deus; não vem das obras, para que ninguém se glorie." },
            { ref: "Tg 2, 24", texto: "Vede que o homem é justificado pelas obras, e não somente pela fé." },
            { ref: "Gl 5, 6", texto: "O que vale é a fé que atua pela caridade." },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Doutrina católica",
          citacoes: [
            {
              ref: "CIC §1996",
              texto:
                "Nossa justificação vem da graça de Deus. A graça é o favor, o auxílio gratuito que Deus nos dá para responder ao seu chamado.",
            },
            {
              ref: "CIC §1989",
              texto:
                "A primeira obra da graça do Espírito Santo é a conversão, que opera a justificação.",
            },
            {
              ref: "CIC §2010",
              texto:
                "Ninguém pode merecer a graça inicial, na origem da conversão. Movidos pelo Espírito Santo, podemos merecer para nós e para os outros as graças úteis à nossa santificação.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Trento e o consenso posterior",
          citacoes: [
            {
              ref: "Concílio de Trento, Sessão VI (1547), cap. 7",
              texto:
                "A justificação não é apenas remissão dos pecados, mas também santificação e renovação do homem interior.",
            },
            {
              ref: "Declaração Conjunta sobre a Doutrina da Justificação (1999), 15",
              texto:
                "Somente pela graça, na fé na obra salvífica de Cristo, e não por causa de nosso mérito, somos aceitos por Deus.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Paulo e Tiago se contradizem?",
              resposta:
                "Não: usam 'obras' em sentidos diferentes. Paulo nega o valor salvífico das obras da Lei antes e sem a graça; Tiago afirma que a fé viva necessariamente frutifica em caridade. A síntese está em Gl 5, 6.",
            },
            {
              pergunta: "Posso perder a graça?",
              resposta:
                "Sim: o pecado mortal destrói a caridade no coração e faz perder a graça santificante, recuperável pelo sacramento da Penitência (CIC §1855-1856).",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1987-2029" },
        { obra: "Concílio de Trento", ref: "Sessão VI, Decreto sobre a justificação" },
        { obra: "Bíblia Sagrada", ref: "Rm 3-8; Ef 2; Tg 2; Gl 5" },
      ],
    },
    {
      slug: "confissao",
      titulo: "Confissão sacramental",
      resumo:
        "Por que confessar a um padre, o que é necessário para uma boa confissão e o que fazer depois.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "O sacramento do perdão",
          paragrafos: [
            "Cristo confiou aos apóstolos o poder de perdoar pecados em seu nome. A Igreja exerce esse poder no sacramento da Penitência, que reconcilia o pecador com Deus e com a comunidade eclesial ferida pelo pecado.",
            "São necessários: exame de consciência, contrição (dor pelo pecado), propósito de emenda, confissão íntegra dos pecados graves em espécie e número, e cumprimento da penitência.",
            "O sigilo sacramental é absoluto e inviolável: nenhum confessor pode revelar, por qualquer motivo, o que ouviu em confissão.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Fundamento bíblico",
          citacoes: [
            { ref: "Jo 20, 21-23", texto: "Assim como o Pai me enviou, também eu vos envio... Àqueles a quem perdoardes os pecados, ser-lhes-ão perdoados." },
            { ref: "2Cor 5, 18", texto: "Deus nos confiou o ministério da reconciliação." },
            { ref: "Tg 5, 16", texto: "Confessai os vossos pecados uns aos outros e orai uns pelos outros para serdes curados." },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Elementos essenciais",
          citacoes: [
            { ref: "CIC §1422", texto: "Os que se aproximam do sacramento da Penitência recebem da misericórdia de Deus o perdão da ofensa que lhe fizeram e ao mesmo tempo se reconciliam com a Igreja." },
            { ref: "CIC §1456", texto: "A confissão dos pecados ao sacerdote constitui parte essencial do sacramento: é preciso enumerar todos os pecados mortais de que se tem consciência." },
            { ref: "CIC §1467", texto: "A Igreja declara que todo sacerdote que ouve confissões está obrigado, sob penas severíssimas, a guardar segredo absoluto." },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Roteiro de uma boa confissão",
          pontos: [
            "Peça luz ao Espírito Santo e examine a consciência pelos dez mandamentos e pelos deveres de estado.",
            "Confesse os pecados graves em espécie e número aproximado; não é preciso relatar circunstâncias desnecessárias.",
            "Escute a orientação e o ato de contrição; a absolvição é dada em nome da Trindade.",
            "Cumpra a penitência assim que possível.",
            "Retome com um propósito concreto e verificável, não genérico.",
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Por que não confessar direto a Deus?",
              resposta:
                "Também se deve pedir perdão a Deus diretamente; mas Cristo quis um sinal sensível e um ministério concreto de reconciliação (Jo 20, 23). O sacramento dá certeza objetiva do perdão e graça específica para não recair.",
            },
            {
              pergunta: "E se eu esquecer um pecado grave?",
              resposta:
                "Se o esquecimento foi involuntário, a confissão é válida e o pecado é perdoado; deve-se mencioná-lo na próxima confissão (CIC §1456).",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1422-1498" },
        { obra: "Código de Direito Canônico", ref: "cân. 959-991; 983" },
        { obra: "Concílio de Trento", ref: "Sessão XIV (1551)" },
      ],
    },
    {
      slug: "maria-e-os-santos",
      titulo: "Maria e os santos",
      resumo:
        "Culto de latria, dulia e hiperdulia: por que os católicos pedem a intercessão e não adoram criaturas.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Distinções que evitam confusão",
          paragrafos: [
            "A Igreja distingue adoração (latria), devida somente a Deus; veneração dos santos (dulia); e veneração especial de Maria (hiperdulia). Pedir a intercessão de um santo não é adorá-lo, assim como pedir oração a um amigo vivo não é adorá-lo.",
            "Os quatro dogmas marianos são: Maternidade divina (Éfeso, 431), Virgindade perpétua, Imaculada Conceição (1854) e Assunção (1950).",
            "Maria é chamada Mediadora subordinada: toda a sua ação é participação na única mediação de Cristo, e nada acrescenta a ela.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Base bíblica",
          citacoes: [
            { ref: "Lc 1, 48", texto: "Doravante todas as gerações me chamarão bem-aventurada." },
            { ref: "Jo 2, 5", texto: "Fazei tudo o que ele vos disser." },
            { ref: "Ap 5, 8", texto: "Os anciãos tinham taças de ouro cheias de perfume, que são as orações dos santos." },
            { ref: "Hb 12, 1", texto: "Estamos rodeados de tão grande nuvem de testemunhas." },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Ensino da Igreja",
          citacoes: [
            { ref: "CIC §971", texto: "O culto da Santíssima Virgem é intrínseco ao culto cristão, mas difere essencialmente do culto de adoração prestado ao Verbo encarnado, ao Pai e ao Espírito Santo." },
            { ref: "CIC §956", texto: "A intercessão dos santos: por estarem mais intimamente unidos a Cristo, consolidam mais firmemente toda a Igreja na santidade." },
            { ref: "CIC §487", texto: "O que a fé católica crê a respeito de Maria funda-se no que ela crê a respeito de Cristo." },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Documentos definidores",
          citacoes: [
            { ref: "Ineffabilis Deus (Pio IX, 1854)", texto: "Definição do dogma da Imaculada Conceição." },
            { ref: "Munificentissimus Deus (Pio XII, 1950)", texto: "Definição do dogma da Assunção." },
            { ref: "Lumen Gentium, 62", texto: "A função materna de Maria para com os homens não obscurece nem diminui de modo algum a única mediação de Cristo, antes mostra a sua eficácia." },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§484-511; §§946-975" },
        { obra: "Concílio Vaticano II", ref: "Lumen Gentium, cap. VIII" },
        { obra: "Concílio de Éfeso", ref: "Definição de Theotokos (431)" },
      ],
      relacionados: [
        { label: "Maria Santíssima", to: "/maria" },
        { label: "Santos", to: "/santos" },
      ],
    },
    {
      slug: "ultimas-realidades",
      titulo: "As últimas realidades",
      resumo: "Morte, juízo particular, purgatório, céu, inferno e ressurreição final.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que a Igreja ensina sobre o fim",
          paragrafos: [
            "Cada pessoa recebe, no instante da morte, a retribuição eterna em seu juízo particular. Há três destinos possíveis: a purificação (purgatório), a bem-aventurança do céu ou a condenação definitiva do inferno.",
            "O purgatório não é uma segunda chance: é a purificação de quem morre em graça de Deus, mas ainda imperfeitamente purificado. Todos os que estão no purgatório se salvarão.",
            "O inferno é a autoexclusão definitiva da comunhão com Deus, escolhida livremente e não revogada. A Igreja jamais declarou que alguma pessoa concreta esteja nele.",
            "No fim, haverá a ressurreição dos corpos e o juízo final, quando a justiça de Deus se manifestará plenamente diante de toda a criação.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Textos fundamentais",
          citacoes: [
            { ref: "2Mc 12, 46", texto: "É um pensamento santo e salutar orar pelos mortos, para que sejam livres de seus pecados." },
            { ref: "1Cor 3, 15", texto: "Se a obra de alguém for queimada, ele sofrerá o dano; será salvo, mas como que através do fogo." },
            { ref: "Mt 25, 46", texto: "E irão estes para o suplício eterno, e os justos para a vida eterna." },
            { ref: "1Cor 15, 42-44", texto: "Semeia-se na corrupção, ressuscita-se na incorruptibilidade." },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Definições",
          citacoes: [
            { ref: "CIC §1030", texto: "Os que morrem na graça e na amizade de Deus, mas imperfeitamente purificados, embora seguros de sua salvação eterna, sofrem depois da morte uma purificação." },
            { ref: "CIC §1033", texto: "Morrer em pecado mortal sem estar arrependido significa permanecer separado dele para sempre por nossa livre escolha. É esse estado de autoexclusão definitiva que se designa pela palavra inferno." },
            { ref: "CIC §1023", texto: "Os que morrem na graça e amizade de Deus e estão perfeitamente purificados vivem para sempre com Cristo." },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Purgatório está na Bíblia?",
              resposta:
                "A doutrina está implícita em 2Mc 12, 39-46 (oração pelos mortos), 1Cor 3, 10-15 (salvação como que através do fogo) e Mt 12, 32 (perdão no século futuro), e explícita na prática litúrgica desde os primeiros séculos, atestada por Tertuliano e Santo Agostinho.",
            },
            {
              pergunta: "Deus manda alguém para o inferno?",
              resposta:
                "Deus quer que todos se salvem (1Tm 2, 4). O inferno é consequência da recusa livre e persistente do amor de Deus, não de um decreto arbitrário.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1020-1065" },
        { obra: "Concílio de Lyon II (1274) e Concílio de Florença (1439)", ref: "Sobre o purgatório" },
        { obra: "Bento XVI", ref: "Spe Salvi (2007), 45-47" },
      ],
    },
    {
      slug: "moral-e-consciencia",
      titulo: "Moral e consciência",
      resumo:
        "Como se forma uma consciência reta, o que torna um ato bom ou mau e o peso do pecado.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "A consciência não inventa a verdade",
          paragrafos: [
            "A consciência moral é o juízo prático da razão que aplica a lei moral ao ato concreto. Deve ser sempre seguida, mas também precisa ser formada — pode errar, e uma consciência erroneamente formada por negligência não isenta de culpa.",
            "A moralidade de um ato depende de três fontes: o objeto escolhido, a intenção e as circunstâncias. Um objeto intrinsecamente mau nunca pode ser tornado bom por boa intenção.",
            "Pecado mortal exige matéria grave, plena advertência e consentimento deliberado. Faltando algum desses elementos, há pecado venial, que fere a caridade sem destruí-la.",
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Critérios",
          citacoes: [
            { ref: "CIC §1778", texto: "A consciência moral é um juízo da razão pelo qual a pessoa humana reconhece a qualidade moral de um ato concreto." },
            { ref: "CIC §1783", texto: "É preciso que a consciência seja informada e o juízo moral esclarecido. A educação da consciência é tarefa de toda a vida." },
            { ref: "CIC §1857", texto: "Para que um pecado seja mortal são requeridas três condições: matéria grave, plena advertência e consentimento deliberado." },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Veritatis Splendor",
          citacoes: [
            {
              ref: "Veritatis Splendor (1993), 80",
              texto:
                "Existem atos que, por si e em si mesmos, independentemente das circunstâncias, são sempre gravemente ilícitos, em razão do seu objeto.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Formar a consciência na prática",
          pontos: [
            "Estudo regular do Catecismo, parte III, e da Escritura.",
            "Direção espiritual ou, ao menos, um confessor habitual.",
            "Exame de consciência diário breve, escrito quando possível.",
            "Desconfiar de justificativas que só aparecem quando convém.",
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1749-1876" },
        { obra: "São João Paulo II", ref: "Veritatis Splendor (1993)" },
        { obra: "Concílio Vaticano II", ref: "Gaudium et Spes, 16" },
      ],
    },
  ],
};
