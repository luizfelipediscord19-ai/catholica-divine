import type { Trilha } from "./tipos";

export const TEOLOGIA = {
  slug: "teologia",
  titulo: "Teologia fundamental",
  subtitulo: "As grandes chaves do dogma",
  nivel: "Avançado",
  marcador: "📖",
  descricao:
    "Cinco lições sobre os pilares do dogma: Trindade, Cristologia e os concílios, graça e liberdade, eclesiologia e sacramentalidade, e escatologia. Com terminologia explicada e fontes conciliares.",
  paraQuem:
    "Para quem já domina o essencial e quer entender a linguagem dos concílios e dos manuais sem se perder nos termos técnicos.",
  licoes: [
    {
      slug: "trindade",
      titulo: "A Santíssima Trindade",
      resumo:
        "Uma só natureza, três Pessoas: o que significam substância, pessoa, processão e as relações.",
      minutos: 11,
      blocos: [
        {
          tipo: "texto",
          titulo: "O dogma em termos precisos",
          paragrafos: [
            "O dogma trinitário afirma que Deus é uno em substância (ou essência) e trino em Pessoas. Não há três deuses, nem um Deus que assume três aparências: há um só Deus que é Pai, Filho e Espírito Santo.",
            "Substância designa aquilo que Deus é; Pessoa designa quem é. As três Pessoas possuem inteiramente a mesma e única natureza divina — são consubstanciais — e se distinguem apenas pelas relações de origem: o Pai não é gerado, o Filho é gerado, o Espírito procede.",
            "A tradição latina fala de duas processões: a geração do Filho, por modo de inteligência, e a espiração do Espírito, por modo de amor. A distinção entre as Pessoas é real, mas não divide a essência: tudo em Deus é uno, exceto o que é oposição de relação.",
            "Distingue-se ainda a Trindade imanente (Deus em si mesmo) da Trindade econômica (Deus agindo na história da salvação). As obras exteriores são das três Pessoas em conjunto, ainda que atribuídas por apropriação a uma delas.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "Mt 28, 19",
              texto:
                "Batizai-os em nome do Pai, do Filho e do Espírito Santo.",
            },
            { ref: "Jo 1, 1", texto: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." },
            {
              ref: "Jo 15, 26",
              texto:
                "Quando vier o Paráclito, que eu vos enviarei da parte do Pai, o Espírito da Verdade, que procede do Pai, ele dará testemunho de mim.",
            },
            { ref: "2Cor 13, 13", texto: "A graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo estejam com todos vós." },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Os concílios",
          citacoes: [
            {
              ref: "Niceia (325) e Constantinopla (381)",
              texto:
                "Creio em um só Senhor, Jesus Cristo, Filho Unigênito de Deus, gerado, não criado, consubstancial ao Pai... Creio no Espírito Santo, Senhor e fonte de vida, que procede do Pai e do Filho, e com o Pai e o Filho é adorado e glorificado.",
            },
            {
              ref: "IV Concílio de Latrão (1215)",
              texto:
                "Cremos firmemente que existe um só Deus verdadeiro, eterno, imenso... três Pessoas, mas uma única essência, substância ou natureza absolutamente simples.",
            },
            {
              ref: "CIC §254",
              texto:
                "As Pessoas divinas são realmente distintas entre si. Deus é único, mas não solitário.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Trindade é uma invenção do século IV?",
              resposta:
                "A fé é apostólica; a terminologia é posterior. Niceia não criou a doutrina: fixou palavras precisas (consubstancial) para excluir o arianismo, que negava a divindade do Filho.",
            },
            {
              pergunta: "É possível entender a Trindade?",
              resposta:
                "É possível compreender que a formulação não é contraditória e o que ela exclui. A vida íntima de Deus, porém, é mistério estrito: conhecida por Revelação, nunca esgotada pela razão.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Catecismo da Igreja Católica",
          ref: "§§232-267",
          url: "https://www.vatican.va/archive/cathechism_po/index_new/index_po.html",
        },
        { obra: "Símbolo Niceno-Constantinopolitano", ref: "381" },
        { obra: "IV Concílio de Latrão", ref: "cap. 1, Firmiter credimus (1215)" },
      ],
    },
    {
      slug: "cristologia",
      titulo: "Cristologia e os concílios",
      resumo:
        "Uma Pessoa, duas naturezas: Éfeso, Calcedônia e por que cada palavra importa.",
      minutos: 11,
      blocos: [
        {
          tipo: "texto",
          titulo: "A união hipostática",
          paragrafos: [
            "Jesus Cristo é uma só Pessoa divina, o Verbo, subsistindo em duas naturezas, divina e humana. Essa união da humanidade à Pessoa (hipóstase) do Verbo chama-se união hipostática.",
            "As naturezas não se misturam nem se anulam: permanecem íntegras, sem confusão, sem mudança, sem divisão, sem separação — a fórmula de Calcedônia. Cristo tem, portanto, inteligência e vontade humanas verdadeiras, além da vontade divina.",
            "Cada grande heresia cristológica negou uma parte disso: o arianismo negou a divindade; o nestorianismo dividiu a Pessoa; o monofisismo absorveu a humanidade na divindade; o docetismo tornou o corpo aparente; o monotelismo negou a vontade humana, condenado em Constantinopla III (681).",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            { ref: "Jo 1, 14", texto: "E o Verbo se fez carne e habitou entre nós." },
            {
              ref: "Fl 2, 6-7",
              texto:
                "Ele, que era de condição divina, não considerou como usurpação ser igual a Deus, mas aniquilou-se a si mesmo, assumindo a condição de escravo.",
            },
            { ref: "Cl 2, 9", texto: "Nele habita corporalmente toda a plenitude da divindade." },
            { ref: "Hb 4, 15", texto: "Provado em tudo como nós, à exceção do pecado." },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "As definições conciliares",
          citacoes: [
            {
              ref: "Éfeso (431)",
              texto:
                "A Santa Virgem é Mãe de Deus (Theotokos), porque gerou segundo a carne o Verbo de Deus feito carne.",
            },
            {
              ref: "Calcedônia (451)",
              texto:
                "Um só e mesmo Cristo, Senhor, Filho Unigênito, reconhecido em duas naturezas, sem confusão, sem mudança, sem divisão e sem separação.",
            },
            {
              ref: "CIC §480",
              texto:
                "Jesus Cristo é verdadeiro Deus e verdadeiro homem, na unidade de sua Pessoa divina.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Se Cristo é Deus, como pode dizer que o Pai é maior (Jo 14, 28)?",
              resposta:
                "Fala segundo a natureza humana assumida. A tradição lê os textos cristológicos distinguindo o que se diz de Cristo quanto à divindade e quanto à humanidade.",
            },
            {
              pergunta: "Jesus sabia tudo?",
              resposta:
                "Como Verbo, sim. Quanto à ciência humana, a Igreja afirma que sua alma humana conhecia o Pai de modo imediato, mas o crescimento em sabedoria descrito em Lc 2, 52 é real e não fingido.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§464-483" },
        { obra: "Concílio de Calcedônia", ref: "Símbolo (451)" },
        { obra: "Concílio de Éfeso", ref: "Cartas de São Cirilo, aprovadas (431)" },
      ],
      relacionados: [{ label: "Maria, Mãe de Deus", to: "/maria" }],
    },
    {
      slug: "graca-e-liberdade",
      titulo: "Graça, liberdade e justificação",
      resumo:
        "Como a graça age sem destruir a liberdade e o que Trento definiu contra a justificação apenas extrínseca.",
      minutos: 10,
      blocos: [
        {
          tipo: "texto",
          titulo: "Vocabulário essencial",
          paragrafos: [
            "Graça é o dom gratuito de Deus que nos torna participantes de sua vida. A graça santificante é um dom habitual que transforma a alma; as graças atuais são intervenções pontuais que movem ao bem.",
            "A justificação, para a fé católica, não é apenas uma declaração jurídica externa: é uma transformação interior real, pela qual o pecador é feito justo, filho adotivo, herdeiro. Envolve remissão dos pecados e santificação do homem interior.",
            "A graça precede sempre a liberdade (graça preveniente) e a capacita, sem coagir. Por isso a Igreja rejeita tanto o pelagianismo, que faz da salvação obra humana, quanto qualquer determinismo que anule o consentimento livre.",
            "O mérito, no vocabulário católico, é sempre derivado: merecemos porque Deus quis associar nossa liberdade à sua graça. Ninguém merece a graça inicial da conversão.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "Ef 2, 8-10",
              texto:
                "Pela graça fostes salvos, mediante a fé. E isso não vem de vós, é dom de Deus... criados em Jesus Cristo para as boas obras.",
            },
            {
              ref: "Fl 2, 12-13",
              texto:
                "Trabalhai na vossa salvação com temor e tremor, pois Deus é quem opera em vós o querer e o realizar.",
            },
            { ref: "Tg 2, 17", texto: "A fé sem obras é morta." },
            { ref: "2Pd 1, 4", texto: "Para vos tornardes participantes da natureza divina." },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "O que definiu o Magistério",
          citacoes: [
            {
              ref: "Concílio de Trento, Sessão VI, cap. 7",
              texto:
                "A justificação não é apenas remissão dos pecados, mas também santificação e renovação do homem interior.",
            },
            {
              ref: "II Concílio de Orange (529)",
              texto:
                "Nada de bom o homem faz sem que Deus lhe conceda fazê-lo; o próprio início da fé é dom da graça.",
            },
            {
              ref: "CIC §2001",
              texto:
                "A iniciativa pertence a Deus. A obra da graça corrige e eleva a liberdade do homem.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Católicos creem em salvação pelas obras?",
              resposta:
                "Não. Creem que a salvação é dom gratuito recebido pela fé, e que essa fé viva produz obras. As obras não compram a graça; nascem dela e a manifestam.",
            },
            {
              pergunta: "Posso perder a graça?",
              resposta:
                "Sim, pelo pecado mortal — o que pressupõe liberdade real. A Igreja rejeita a certeza absoluta e subjetiva da própria salvação, mantendo firme a esperança confiante.",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Concílio de Trento", ref: "Sessão VI, Decreto sobre a justificação (1547)" },
        { obra: "Catecismo da Igreja Católica", ref: "§§1987-2029" },
        { obra: "II Concílio de Orange", ref: "cânones (529)" },
      ],
    },
    {
      slug: "igreja-e-sacramentos",
      titulo: "Eclesiologia e sacramentalidade",
      resumo:
        "A Igreja como sacramento de salvação, suas quatro notas e a estrutura dos sete sacramentos.",
      minutos: 10,
      blocos: [
        {
          tipo: "texto",
          titulo: "A Igreja, sacramento de comunhão",
          paragrafos: [
            "A Igreja é, ao mesmo tempo, visível e espiritual: sociedade hierárquica e corpo místico de Cristo, sem que se possam separar essas dimensões. O Vaticano II a descreve como sinal e instrumento — sacramento — da união com Deus e da unidade do gênero humano.",
            "Suas quatro notas são clássicas: una, santa, católica e apostólica. Católica significa universal e íntegra na doutrina; apostólica indica a continuidade da missão pela sucessão dos bispos.",
            "Os sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja. Agem ex opere operato: a eficácia vem de Cristo, não da santidade do ministro, embora a fecundidade na vida do fiel dependa de sua disposição.",
            "Cada sacramento tem matéria e forma. Três imprimem caráter indelével e não se repetem: Batismo, Confirmação e Ordem.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            { ref: "1Cor 12, 27", texto: "Vós sois o corpo de Cristo, e seus membros, cada um por sua parte." },
            { ref: "Ef 5, 32", texto: "Este é um grande mistério: refiro-me a Cristo e à Igreja." },
            {
              ref: "At 2, 42",
              texto:
                "Eram assíduos ao ensinamento dos apóstolos, à comunhão fraterna, à fração do pão e às orações.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "O que diz o Magistério",
          citacoes: [
            {
              ref: "Lumen Gentium, 1",
              texto:
                "A Igreja é em Cristo como que o sacramento, ou seja, o sinal e o instrumento da união íntima com Deus e da unidade de todo o gênero humano.",
            },
            {
              ref: "Lumen Gentium, 8",
              texto:
                "Esta Igreja, constituída e organizada neste mundo como sociedade, subsiste na Igreja católica.",
            },
            {
              ref: "CIC §1131",
              texto:
                "Os sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja, pelos quais nos é dispensada a vida divina.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Concílio Vaticano II, Lumen Gentium",
          ref: "nn. 1-8",
          url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
        },
        { obra: "Catecismo da Igreja Católica", ref: "§§748-810, §§1113-1134" },
      ],
      relacionados: [{ label: "Os sete sacramentos", to: "/sacramentos" }],
    },
    {
      slug: "escatologia",
      titulo: "Escatologia: as últimas realidades",
      resumo:
        "Morte, juízo, purgatório, céu, inferno e a ressurreição da carne — o que é dogma e o que não é.",
      minutos: 10,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que a Igreja afirma",
          paragrafos: [
            "Cada pessoa, ao morrer, recebe no juízo particular a retribuição imediata: comunhão plena com Deus, purificação ou condenação eterna. No fim da história haverá o juízo final, com a ressurreição de todos os mortos.",
            "O purgatório não é um lugar intermediário entre céu e inferno, nem uma segunda chance: é a purificação daqueles que morrem na graça de Deus, mas ainda precisam ser purificados para entrar na alegria do céu. Por isso a Igreja reza pelos defuntos desde a Antiguidade.",
            "O inferno é a autoexclusão definitiva da comunhão com Deus, consequência de uma recusa livre e persistente. A Igreja afirma sua existência e eternidade, mas nunca declarou que uma pessoa concreta esteja nele.",
            "A esperança cristã não é imortalidade da alma apenas: é ressurreição da carne. O Credo confessa que o próprio corpo, transformado, participará da vida eterna.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            { ref: "Hb 9, 27", texto: "Está determinado que os homens morram uma só vez, seguindo-se depois o juízo." },
            {
              ref: "2Mc 12, 46",
              texto:
                "É santo e salutar pensamento orar pelos mortos, para que sejam livres de seus pecados.",
            },
            {
              ref: "1Cor 3, 15",
              texto:
                "Se a sua obra for queimada, sofrerá dano; ele, porém, será salvo, mas como que através do fogo.",
            },
            {
              ref: "Ap 21, 4",
              texto:
                "Deus enxugará toda lágrima de seus olhos, e não haverá mais morte, nem luto, nem grito, nem dor.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Definições e ensinamentos",
          citacoes: [
            {
              ref: "Concílio de Florença (1439)",
              texto:
                "As almas verdadeiramente penitentes, que morreram no amor de Deus antes de satisfazerem com frutos dignos de penitência, são purificadas depois da morte.",
            },
            {
              ref: "Benedictus Deus, Bento XII (1336)",
              texto:
                "As almas plenamente purificadas veem a essência divina de modo intuitivo e face a face.",
            },
            {
              ref: "CIC §1035",
              texto:
                "A pena principal do inferno consiste na separação eterna de Deus, no qual somente o homem pode ter a vida e a felicidade.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Purgatório está na Bíblia?",
              resposta:
                "A palavra não; a realidade de uma purificação depois da morte e da oração pelos mortos sim, em 2Mc 12, 46 e 1Cor 3, 15 — e na prática litúrgica atestada nas catacumbas.",
            },
            {
              pergunta: "Um Deus bom pode condenar alguém para sempre?",
              resposta:
                "Deus não predestina ninguém ao inferno; a condenação supõe a recusa livre e definitiva da criatura. O amor que respeita a liberdade aceita a possibilidade de ser recusado.",
            },
            {
              pergunta: "A Igreja ensina reencarnação?",
              resposta:
                "Não, e a exclui expressamente: a morte encerra o tempo da liberdade histórica (CIC §1013).",
            },
          ],
        },
      ],
      fontes: [
        { obra: "Catecismo da Igreja Católica", ref: "§§1020-1060" },
        { obra: "Concílio de Florença", ref: "Decreto para os gregos (1439)" },
        { obra: "Bento XII", ref: "Constituição Benedictus Deus (1336)" },
      ],
    },
  ],
} as const satisfies Trilha;
