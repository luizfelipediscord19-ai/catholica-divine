import type { Trilha } from "./tipos";

export const APOLOGETICA: Trilha = {
  slug: "apologetica",
  titulo: "Apologética católica",
  subtitulo: "Dar razão da esperança, com serenidade",
  nivel: "Intermediário",
  marcador: "🛡️",
  descricao:
    "Cinco lições para responder às objeções mais frequentes: existência de Deus, confiabilidade dos Evangelhos, canon e Tradição, o papado e a mediação de Maria e dos santos. Cada resposta traz a fonte verificável.",
  paraQuem:
    "Para quem é questionado no trabalho, na família ou na internet e quer responder com verdade e caridade, sem improvisar.",
  licoes: [
    {
      slug: "como-defender-a-fe",
      titulo: "Como defender a fé sem brigar",
      resumo:
        "Apologética é serviço à verdade, não vitória sobre pessoas. Método, limites e disposição interior.",
      minutos: 7,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que é apologética",
          paragrafos: [
            "Apologética vem do grego apologia, defesa. Não é o esforço de humilhar quem discorda, mas de tornar a fé inteligível: mostrar que crer não é irracional e que a doutrina católica tem coerência interna e raízes históricas.",
            "Há dois níveis distintos. O primeiro é o da razão comum: argumentos filosóficos e históricos que qualquer pessoa de boa vontade pode examinar. O segundo é o da fé: aquilo que só se conhece porque Deus revelou. Confundir os dois níveis é a causa mais comum de discussões estéreis.",
            "Nenhum argumento produz a fé. O argumento remove obstáculos; a fé é dom de Deus acolhido livremente. Isso liberta o apologista da ansiedade de convencer a qualquer custo.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O mandato bíblico",
          citacoes: [
            {
              ref: "1Pd 3, 15-16",
              texto:
                "Estai sempre prontos a dar a razão da vossa esperança a todo o que vo-la pedir; fazei-o, porém, com brandura e respeito, conservando boa consciência.",
            },
            {
              ref: "At 17, 22-23",
              texto:
                "Paulo, de pé no meio do Areópago, disse: Atenienses, sob todos os aspectos vos considero extremamente religiosos... O que adorais sem conhecer, eu vos anuncio.",
            },
            {
              ref: "2Tm 2, 24-25",
              texto:
                "O servo do Senhor não deve ser briguento, mas afável para com todos, capaz de instruir, paciente.",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "Fé e razão não se opõem",
          citacoes: [
            {
              ref: "CIC §159",
              texto:
                "Não há contradição entre fé e ciência: a realidade profana e a realidade da fé têm origem no mesmo Deus.",
            },
            {
              ref: "CIC §35",
              texto:
                "As faculdades do homem tornam-no capaz de conhecer a existência de um Deus pessoal.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Regras de conduta",
          pontos: [
            "Peça definições antes de responder: metade das objeções desaparece quando os termos ficam claros.",
            "Nunca cite uma fonte que você não leu. Verifique a referência exata antes de usá-la.",
            "Distinga dogma, doutrina e opinião teológica livre: não defenda como dogma o que não é.",
            "Reconheça o que é verdade na objeção do outro. É desarmante e é honesto.",
            "Quando não souber, diga que não sabe e volte depois com a fonte.",
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Discutir religião não é sempre inútil?",
              resposta:
                "Discutir para vencer, sim. Explicar para esclarecer, não: muitas conversões passaram por uma dúvida honestamente respondida.",
            },
            {
              pergunta: "Preciso estudar filosofia para isso?",
              resposta:
                "Não para começar. Basta conhecer bem o Credo, o Catecismo e saber onde verificar. A filosofia ajuda nos temas sobre a existência de Deus.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Catecismo da Igreja Católica",
          ref: "§§27-49, §§156-165",
          url: "https://www.vatican.va/archive/cathechism_po/index_new/p1s1c1_26-49_po.html",
        },
        {
          obra: "Concílio Vaticano I, Dei Filius",
          ref: "cap. 4, sobre fé e razão",
          url: "https://www.vatican.va/content/vatican/it.html",
        },
      ],
      relacionados: [{ label: "Banco de objeções", to: "/apologetica" }],
    },
    {
      slug: "existencia-de-deus",
      titulo: "É racional crer em Deus?",
      resumo:
        "Os caminhos clássicos da razão até o Criador e o que eles provam — e o que não provam.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Os caminhos da razão",
          paragrafos: [
            "A tradição católica não pede um salto no escuro. Ela sustenta que a existência de Deus pode ser conhecida a partir do mundo criado, ainda que a fé acrescente muito mais do que a razão alcança.",
            "O argumento do movimento parte da constatação de que tudo o que muda é movido por outro; a cadeia de causas em ato exige um primeiro que não seja movido por nenhum outro. O argumento da contingência observa que as coisas que existem poderiam não existir, e o que é contingente não explica a si mesmo: exige um ser necessário.",
            "O argumento da ordem observa que corpos sem inteligência agem de modo regular e orientado a fins, o que sugere uma inteligência ordenadora. Já o argumento moral parte da experiência de uma obrigação que não inventamos.",
            "Esses caminhos concluem a existência de um ser primeiro, necessário e inteligente. Não concluem, por si, a Trindade nem a Encarnação: isso é objeto de Revelação.",
          ],
        },
        {
          tipo: "padres",
          titulo: "O que ensinaram os Padres e Doutores",
          citacoes: [
            {
              ref: "Santo Agostinho, Confissões I, 1",
              texto:
                "Fizeste-nos para ti, e o nosso coração vive inquieto enquanto não repousar em ti.",
            },
            {
              ref: "São Tomás de Aquino, Suma Teológica I, q. 2, a. 3",
              texto:
                "Existe portanto algo que é por si necessário... e a isso todos chamam Deus.",
            },
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "Rm 1, 19-20",
              texto:
                "O que de Deus se pode conhecer, eles o conhecem, porque Deus lho revelou. Porque desde a criação do mundo as suas perfeições invisíveis se tornaram visíveis à inteligência, por meio das suas obras.",
            },
            {
              ref: "Sb 13, 5",
              texto: "Pela grandeza e pela beleza das criaturas se conhece o seu Criador.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "E quem criou Deus?",
              resposta:
                "A pergunta supõe que Deus seja um ser contingente como os outros. O argumento afirma exatamente o contrário: o que precisa de causa é o contingente; Deus é o ser necessário, aquele cuja essência é existir.",
            },
            {
              pergunta: "O Big Bang não dispensa o Criador?",
              resposta:
                "Não. A cosmologia descreve como o universo se desenvolve; a pergunta metafísica é por que existe algo em vez de nada. São perguntas de ordens diferentes.",
            },
            {
              pergunta: "E o sofrimento dos inocentes?",
              resposta:
                "É a objeção mais séria, e a resposta católica não é um silogismo, mas a Cruz: Deus não explica o mal à distância, entra nele. O Catecismo trata do tema em §§309-314.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Catecismo da Igreja Católica",
          ref: "§§31-38, §§309-314",
          url: "https://www.vatican.va/archive/cathechism_po/index_new/p1s1c1_26-49_po.html",
        },
        { obra: "São Tomás de Aquino, Suma Teológica", ref: "I, q. 2, a. 3" },
      ],
    },
    {
      slug: "evangelhos-confiaveis",
      titulo: "Os Evangelhos são confiáveis?",
      resumo:
        "Datação, testemunhas, manuscritos e o critério de credibilidade histórica dos quatro Evangelhos.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que está em jogo",
          paragrafos: [
            "A fé cristã depende de um fato histórico: Jesus de Nazaré viveu, morreu crucificado e foi anunciado ressuscitado por testemunhas dispostas a morrer por isso. Se os Evangelhos fossem lendas tardias, o cristianismo perderia o chão.",
            "Os Evangelhos não são atas notariais nem biografias modernas. São testemunhos catequéticos escritos dentro da comunidade que viveu os fatos, com finalidade declarada: que se creia (Jo 20, 31).",
            "A crítica histórica trabalha com critérios como a multiplicidade de fontes independentes, o constrangimento (a comunidade preserva episódios que a desfavorecem, como a fuga dos apóstolos e a negação de Pedro) e a coerência com o contexto judaico do século I.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "Testemunho declarado",
          citacoes: [
            {
              ref: "Lc 1, 1-4",
              texto:
                "Resolvi também eu, depois de tudo ter investigado cuidadosamente, escrever-te de modo ordenado, para que reconheças a solidez dos ensinamentos que recebeste.",
            },
            {
              ref: "1Cor 15, 3-6",
              texto:
                "Transmiti-vos, em primeiro lugar, o que eu mesmo recebi: Cristo morreu por nossos pecados... e apareceu a mais de quinhentos irmãos de uma vez, dos quais a maior parte ainda vive.",
            },
            {
              ref: "2Pd 1, 16",
              texto:
                "Não foi baseados em fábulas engenhosas que vos falamos, mas como testemunhas oculares da sua grandeza.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "O que diz o Magistério",
          citacoes: [
            {
              ref: "Dei Verbum, 19",
              texto:
                "A Santa Mãe Igreja firme e constantemente sustentou e sustenta que os quatro Evangelhos referidos têm origem apostólica.",
            },
            {
              ref: "Dei Verbum, 11",
              texto:
                "Os livros sagrados ensinam firmemente, fielmente e sem erro a verdade que Deus quis consignada nas Sagradas Letras para nossa salvação.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Os Evangelhos não se contradizem?",
              resposta:
                "Divergem em ordem, ênfase e detalhes de narração, como todo testemunho independente. Convergem no essencial: pregação, paixão, morte e sepultura vazia. Uniformidade absoluta seria, historicamente, mais suspeita.",
            },
            {
              pergunta: "O texto não foi alterado ao longo dos séculos?",
              resposta:
                "O Novo Testamento é o texto antigo com maior número de manuscritos e citações patrísticas. Isso permite comparar tradições e reconstruir o texto com alto grau de segurança; as variantes conhecidas não afetam a substância da fé.",
            },
            {
              pergunta: "E os evangelhos apócrifos?",
              resposta:
                "São em geral posteriores (séculos II a IV), dependentes dos canônicos e marcados por doutrinas gnósticas estranhas à pregação apostólica. Não foram suprimidos por conspiração, mas não reconhecidos pelas Igrejas.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Concílio Vaticano II, Dei Verbum",
          ref: "nn. 7-20",
          url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
        },
        { obra: "Catecismo da Igreja Católica", ref: "§§101-141" },
      ],
      relacionados: [{ label: "Introduções aos livros bíblicos", to: "/biblia" }],
    },
    {
      slug: "biblia-e-tradicao",
      titulo: "Bíblia, Tradição e o canon",
      resumo:
        "Por que a Igreja não vive de Escritura isolada e por que a Bíblia católica tem 73 livros.",
      minutos: 10,
      blocos: [
        {
          tipo: "texto",
          titulo: "Uma única fonte, dois modos de transmissão",
          paragrafos: [
            "Para a fé católica, a Revelação é uma só: Cristo. Ela chega até nós por dois canais inseparáveis, Escritura e Tradição, confiados à custódia do Magistério, que não está acima da Palavra, mas a serve.",
            "A Igreja é anterior ao Novo Testamento. Havia comunidades cristãs, Eucaristia, bispos e catequese antes de existirem os livros; foi a mesma comunidade que discerniu quais escritos eram apostólicos.",
            "O canon católico tem 73 livros: 46 no Antigo Testamento e 27 no Novo. A diferença em relação às Bíblias protestantes está nos sete livros deuterocanônicos (Tobias, Judite, Sabedoria, Eclesiástico, Baruc, 1 e 2 Macabeus) e em partes de Ester e Daniel, presentes na tradição grega usada pela Igreja antiga.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "2Ts 2, 15",
              texto:
                "Ficai firmes, irmãos, e conservai os ensinamentos que de nós aprendestes, seja de viva voz, seja por escrito.",
            },
            {
              ref: "1Tm 3, 15",
              texto:
                "A Igreja do Deus vivo, que é a coluna e o fundamento da verdade.",
            },
            {
              ref: "Jo 21, 25",
              texto:
                "Jesus fez ainda muitas outras coisas. Se fossem escritas uma por uma, penso que nem o mundo inteiro poderia conter os livros.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "O que diz o Magistério",
          citacoes: [
            {
              ref: "Dei Verbum, 10",
              texto:
                "A Tradição sagrada e a Sagrada Escritura constituem um único depósito sagrado da palavra de Deus, confiado à Igreja.",
            },
            {
              ref: "Concílio de Trento, sessão IV (1546)",
              texto:
                "O Concílio estabelece e declara o elenco dos livros sagrados, recebidos como canônicos com todas as suas partes.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "A Igreja acrescentou livros em Trento?",
              resposta:
                "Não. Trento confirmou solenemente uma lista já atestada em concílios locais do século IV (Roma 382, Hipona 393, Cartago 397) e na Vulgata de São Jerônimo, em resposta à sua rejeição no século XVI.",
            },
            {
              pergunta: "Sola Scriptura não é mais seguro?",
              resposta:
                "A própria lista dos livros inspirados não está na Bíblia. Definir o canon já exige uma autoridade externa ao texto — o que mostra a insuficiência do princípio.",
            },
            {
              pergunta: "Tradição é o mesmo que costume antigo?",
              resposta:
                "Não. Tradição, em sentido teológico, é a transmissão viva da Revelação apostólica. Costumes disciplinares mudam; a Tradição, não.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Concílio Vaticano II, Dei Verbum",
          ref: "nn. 7-10",
          url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
        },
        { obra: "Catecismo da Igreja Católica", ref: "§§74-100, §§120-127" },
        { obra: "Concílio de Trento", ref: "Sessão IV, Decreto sobre as Escrituras canônicas" },
      ],
      relacionados: [{ label: "Ler a Bíblia no portal", to: "/biblia" }],
    },
    {
      slug: "papa-maria-santos",
      titulo: "Papado, Maria e os santos",
      resumo:
        "As três objeções mais frequentes de irmãos evangélicos, com base bíblica e patrística.",
      minutos: 11,
      blocos: [
        {
          tipo: "texto",
          titulo: "Primado de Pedro",
          paragrafos: [
            "Nos Evangelhos, Pedro recebe um lugar único: é chamado de rocha, recebe as chaves, é encarregado de confirmar os irmãos e de apascentar o rebanho. Nenhum outro apóstolo recebe esse conjunto de encargos.",
            "O ministério do Bispo de Roma é entendido como continuação desse serviço à unidade. Não é uma monarquia sobre a Revelação: o Papa está vinculado à Escritura e à Tradição e sua infalibilidade se exerce em condições estritas, ao definir doutrina de fé ou moral.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "Mt 16, 18-19",
              texto:
                "Tu és Pedro, e sobre esta pedra edificarei a minha Igreja... Dar-te-ei as chaves do Reino dos céus.",
            },
            {
              ref: "Lc 22, 32",
              texto: "Roguei por ti, para que a tua fé não desfaleça. E tu, uma vez convertido, confirma os teus irmãos.",
            },
            { ref: "Jo 21, 15-17", texto: "Apascenta os meus cordeiros... apascenta as minhas ovelhas." },
            { ref: "Lc 1, 48", texto: "Todas as gerações me chamarão bem-aventurada." },
            {
              ref: "Ap 5, 8",
              texto:
                "Os vinte e quatro ancião prostraram-se... tendo taças de ouro cheias de perfumes, que são as orações dos santos.",
            },
          ],
        },
        {
          tipo: "texto",
          titulo: "Maria e a intercessão dos santos",
          paragrafos: [
            "A Igreja adora somente a Deus. A Maria e aos santos presta veneração — em grau eminente a Maria, por ser Mãe de Deus. A distinção entre adoração (latria) e veneração (dulia) é antiga e explícita.",
            "Pedir a intercessão de um santo é o mesmo gesto de pedir oração a um irmão de fé, com uma diferença: quem já está em Deus não morreu, vive. A comunhão dos santos é um artigo do Credo, não um acréscimo devocional.",
            "Os dogmas marianos não competem com Cristo: cada um afirma algo sobre Ele. Mãe de Deus (Éfeso, 431) defende a unidade da pessoa do Verbo encarnado; a Imaculada Conceição e a Assunção mostram os efeitos plenos da redenção obtida por Cristo em uma criatura.",
          ],
        },
        {
          tipo: "padres",
          titulo: "O que ensinaram os Padres",
          citacoes: [
            {
              ref: "Santo Inácio de Antioquia, Aos Romanos (c. 107)",
              texto: "À Igreja que presta a sua presidência na caridade, na região dos romanos.",
            },
            {
              ref: "Santo Irineu, Contra as Heresias III, 3, 2",
              texto:
                "Com esta Igreja de Roma, por causa de sua origem mais excelente, deve concordar toda a Igreja.",
            },
            {
              ref: "Sub tuum praesidium (papiro grego, séc. III-IV)",
              texto: "Sob a vossa proteção nos acolhemos, santa Mãe de Deus.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "1Tm 2, 5 não diz que só há um mediador?",
              resposta:
                "Sim, e a Igreja o afirma: Cristo é o único mediador por natureza. A intercessão dos santos e a nossa oração pelos outros participam dessa única mediação, não a substituem.",
            },
            {
              pergunta: "Chamar o Papa de Santo Padre não contraria Mt 23, 9?",
              resposta:
                "Nesse texto Jesus condena a arrogância de quem se coloca no lugar de Deus. O próprio São Paulo se chama pai dos coríntios (1Cor 4, 15), o que mostra que o uso relativo do termo não é proibido.",
            },
            {
              pergunta: "Imagens não são idolatria?",
              resposta:
                "O II Concílio de Niceia (787) distinguiu: a honra à imagem passa ao original, e o culto de adoração é devido só a Deus. O que Êxodo 20 proíbe é o ídolo que substitui Deus.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Catecismo da Igreja Católica",
          ref: "§§880-887 (primado), §§963-975 (Maria), §§2132-2141 (imagens)",
          url: "https://www.vatican.va/archive/cathechism_po/index_new/index_po.html",
        },
        {
          obra: "Concílio Vaticano II, Lumen Gentium",
          ref: "cap. III e cap. VIII",
          url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
        },
        { obra: "II Concílio de Niceia (787)", ref: "Decreto sobre as imagens sagradas" },
      ],
      relacionados: [
        { label: "Maria, Mãe de Deus", to: "/maria" },
        { label: "Vida dos santos", to: "/santos" },
      ],
    },
  ],
};
