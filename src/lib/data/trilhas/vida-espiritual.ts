import type { Trilha } from "./tipos";

export const VIDA_ESPIRITUAL: Trilha = {
  slug: "vida-espiritual",
  titulo: "Vida espiritual",
  subtitulo: "Uma rotina de oração que se sustenta",
  nivel: "Iniciante",
  marcador: "🕯️",
  descricao:
    "Cinco lições práticas sobre oração: como começar, oração mental e lectio divina, o combate espiritual, exame de consciência e confissão, e a construção de uma regra de vida realista.",
  paraQuem:
    "Para quem quer rezar com constância, já tentou e desistiu, ou sente que a oração esfriou.",
  licoes: [
    {
      slug: "comecar-a-rezar",
      titulo: "Como começar a rezar",
      resumo:
        "O que é oração, as suas formas e o mínimo diário que qualquer pessoa consegue manter.",
      minutos: 7,
      blocos: [
        {
          tipo: "texto",
          titulo: "O que é oração",
          paragrafos: [
            "Oração é a elevação da alma a Deus, ou o pedido de bens convenientes. Antes de ser técnica, é relação: Deus chama primeiro, e a oração é a resposta.",
            "A tradição distingue cinco formas: adoração e bênção, petição, intercessão, ação de graças e louvor. Uma vida de oração equilibrada usa todas, e não apenas o pedido.",
            "Há três grandes modos de rezar: a oração vocal (com palavras, próprias ou recebidas), a meditação (buscar com a inteligência o que Deus diz) e a oração contemplativa (permanecer em silêncio no olhar de Deus).",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            { ref: "1Ts 5, 17", texto: "Orai sem cessar." },
            {
              ref: "Mt 6, 6",
              texto:
                "Quando orares, entra no teu quarto, fecha a porta e ora ao teu Pai em segredo; e teu Pai, que vê o escondido, recompensar-te-á.",
            },
            {
              ref: "Lc 11, 1",
              texto: "Senhor, ensina-nos a orar, como também João ensinou a seus discípulos.",
            },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "O que diz o Catecismo",
          citacoes: [
            {
              ref: "CIC §2559",
              texto:
                "A oração é a elevação da alma para Deus ou o pedido a Deus de bens convenientes.",
            },
            {
              ref: "CIC §2725",
              texto:
                "A oração é um dom da graça e uma resposta decidida de nossa parte. Supõe sempre um esforço.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "O mínimo que se sustenta",
          pontos: [
            "Escolha um horário fixo, de preferência de manhã: constância vale mais que duração.",
            "Comece com dez minutos. É melhor rezar dez minutos todos os dias que uma hora aos domingos.",
            "Tenha um lugar e um sinal: um crucifixo, uma imagem, uma vela. O corpo ajuda a alma.",
            "Ao acordar, ofereça o dia. Ao deitar, agradeça e peça perdão.",
            "Se falhar um dia, volte no dia seguinte sem dramatizar. O inimigo da oração é o desânimo, não a falha.",
          ],
        },
      ],
      fontes: [
        {
          obra: "Catecismo da Igreja Católica",
          ref: "§§2558-2565, §§2697-2724",
          url: "https://www.vatican.va/archive/cathechism_po/index_new/index_po.html",
        },
      ],
      relacionados: [{ label: "Biblioteca de orações", to: "/oracoes" }],
    },
    {
      slug: "oracao-mental-lectio",
      titulo: "Oração mental e lectio divina",
      resumo:
        "Como meditar a Escritura em quatro passos e o que fazer quando a cabeça não colabora.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Os quatro passos da lectio divina",
          paragrafos: [
            "A lectio divina é a leitura orante da Escritura, praticada pelos monges desde os primeiros séculos e recomendada expressamente pelo Concílio Vaticano II a todos os fiéis.",
            "Leitura (lectio): ler devagar um trecho curto, uma vez em silêncio, outra vez com atenção às palavras. Perguntar simplesmente: o que o texto diz?",
            "Meditação (meditatio): ruminar o texto, relacioná-lo com a própria vida. O que Deus me diz aqui, hoje?",
            "Oração (oratio): responder a Deus com as próprias palavras, a partir do que se leu — pedido, gratidão, arrependimento.",
            "Contemplação (contemplatio): calar e permanecer. Nada a produzir; apenas estar. Muitos consideram esse o passo mais difícil e o mais fecundo.",
          ],
        },
        {
          tipo: "padres",
          titulo: "O que ensinaram os Padres e Doutores",
          citacoes: [
            {
              ref: "São Jerônimo, Comentário a Isaías, prólogo",
              texto: "Ignorar as Escrituras é ignorar Cristo.",
            },
            {
              ref: "Santa Teresa de Ávila, Vida 8, 5",
              texto:
                "A oração mental não é outra coisa, em minha opinião, senão tratar de amizade com Deus, estando muitas vezes tratando a sós com quem sabemos que nos ama.",
            },
            {
              ref: "Santo Agostinho, Sermão 179",
              texto: "Que a oração acompanhe a leitura, e a leitura, a oração.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "O que diz o Magistério",
          citacoes: [
            {
              ref: "Dei Verbum, 25",
              texto:
                "O Concílio exorta insistentemente todos os fiéis a que, pela leitura frequente das divinas Escrituras, adquiram a sublime ciência de Jesus Cristo. A oração deve acompanhar a leitura da Sagrada Escritura.",
            },
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Minha cabeça vagueia o tempo todo. Estou rezando errado?",
              resposta:
                "As distrações não são pecado; o que importa é a vontade de estar ali. Cada vez que perceber, volte com calma ao texto. Essa volta repetida já é oração.",
            },
            {
              pergunta: "Não sinto nada. Devo parar?",
              resposta:
                "Não. A aridez faz parte do caminho de quase todos os santos. Fidelidade sem consolação amadurece a fé mais que qualquer emoção.",
            },
            {
              pergunta: "Por onde começar na Bíblia?",
              resposta:
                "Pelo Evangelho de São Lucas ou São Marcos, um trecho curto por dia, ou pelo Evangelho da liturgia do dia — assim se reza junto com a Igreja inteira.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Concílio Vaticano II, Dei Verbum",
          ref: "n. 25",
          url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
        },
        { obra: "Catecismo da Igreja Católica", ref: "§§2705-2724" },
      ],
      relacionados: [
        { label: "Liturgia diária", to: "/liturgia-diaria" },
        { label: "Modo de leitura da Bíblia", to: "/biblia" },
      ],
    },
    {
      slug: "combate-espiritual",
      titulo: "O combate espiritual",
      resumo:
        "Tentação, pecados capitais e as armas concretas da tradição contra o desânimo.",
      minutos: 9,
      blocos: [
        {
          tipo: "texto",
          titulo: "Um combate, não um castigo",
          paragrafos: [
            "A vida cristã é descrita pela Escritura como combate: não contra pessoas, mas contra o pecado que habita em nós e contra o Adversário. Sentir tentação não é sinal de decadência espiritual; é sinal de que se está caminhando.",
            "A tradição identifica sete inclinações desordenadas na raiz dos pecados: soberba, avareza, inveja, ira, luxúria, gula e preguiça (acídia). Conhecer a própria inclinação dominante é meio caminho da correção.",
            "É preciso distinguir tentação de consentimento. A tentação sugere; o pecado só existe quando a vontade adere. E é preciso distinguir pecado mortal (matéria grave, plena consciência e consentimento deliberado) de pecado venial.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "Ef 6, 11-12",
              texto:
                "Revesti-vos da armadura de Deus... porque não é contra homens de carne e sangue que temos de lutar, mas contra os principados e potestades.",
            },
            {
              ref: "1Cor 10, 13",
              texto:
                "Deus é fiel: não permitirá que sejais tentados além das vossas forças, mas com a tentação vos dará também meio de sair dela.",
            },
            {
              ref: "Tg 1, 14-15",
              texto:
                "Cada um é tentado pela sua própria concupiscência, que o atrai e alicia. A concupiscência, tendo concebido, dá à luz o pecado.",
            },
          ],
        },
        {
          tipo: "padres",
          titulo: "O que ensinaram os santos",
          citacoes: [
            {
              ref: "São Francisco de Sales, Filoteia IV, 3",
              texto:
                "Não vos inquieteis com as vossas imperfeições: levantai-vos com coragem, quantas vezes caírdes.",
            },
            {
              ref: "Santo Inácio de Loyola, Exercícios, regra 12",
              texto:
                "O inimigo se comporta como fraco diante da força e forte diante da fraqueza: se enfrentado com firmeza, foge.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Armas concretas",
          pontos: [
            "Fugir da ocasião: mais eficaz que resistir no lugar da queda.",
            "Oração breve no momento da tentação: uma jaculatória, o nome de Jesus, uma Ave-Maria.",
            "Confissão frequente e, se possível, um confessor estável que conheça sua história.",
            "Eucaristia e adoração: a graça sacramental não é simbólica.",
            "Jejum e mortificações pequenas, para que a vontade obedeça em coisas grandes.",
            "Transparência: contar a alguém de confiança rompe o segredo em que o vício se alimenta.",
          ],
        },
      ],
      fontes: [
        {
          obra: "Catecismo da Igreja Católica",
          ref: "§§1849-1876 (pecado), §§2846-2849 (tentação)",
          url: "https://www.vatican.va/archive/cathechism_po/index_new/index_po.html",
        },
        { obra: "São Francisco de Sales, Introdução à vida devota", ref: "Parte IV" },
      ],
    },
    {
      slug: "exame-e-confissao",
      titulo: "Exame de consciência e confissão",
      resumo:
        "Como se examinar sem escrúpulo e como confessar bem, passo a passo.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "Cinco passos da confissão",
          paragrafos: [
            "A tradição resume a boa confissão em cinco atos: exame de consciência, dor dos pecados, propósito de emenda, acusação dos pecados ao sacerdote e cumprimento da penitência.",
            "A contrição perfeita nasce do amor a Deus; a imperfeita, do temor das consequências. Ambas dispõem ao perdão no sacramento, e ninguém deve deixar de se confessar por achar que não sente o bastante.",
            "O sigilo sacramental é absoluto e sem exceções. O sacerdote não pode revelar nada do que ouviu, sob nenhuma circunstância.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "Jo 20, 22-23",
              texto:
                "Recebei o Espírito Santo. Àqueles a quem perdoardes os pecados, serão perdoados; e àqueles a quem os retiverdes, serão retidos.",
            },
            {
              ref: "1Jo 1, 9",
              texto:
                "Se reconhecermos os nossos pecados, Deus, que é fiel e justo, os perdoará e nos purificará de toda iniquidade.",
            },
            { ref: "Tg 5, 16", texto: "Confessai os vossos pecados uns aos outros e orai uns pelos outros." },
          ],
        },
        {
          tipo: "catecismo",
          titulo: "O que diz o Catecismo",
          citacoes: [
            {
              ref: "CIC §1457",
              texto:
                "Todo fiel, chegado à idade da discrição, é obrigado a confessar os pecados graves de que tem consciência ao menos uma vez por ano.",
            },
            {
              ref: "CIC §1458",
              texto:
                "A confissão regular de nossos pecados veniais nos ajuda a formar a consciência, a lutar contra as inclinações más.",
            },
          ],
        },
        {
          tipo: "pratica",
          titulo: "Um roteiro simples de exame",
          pontos: [
            "Deus: rezei? Guardei o domingo? Usei o nome de Deus com leviandade?",
            "Próximo: fui justo, honesto, verdadeiro? Julguei, humilhei, guardei rancor?",
            "Família: cumpri meus deveres de estado com fidelidade e paciência?",
            "Pureza e sobriedade: usei o corpo e os bens conforme minha vocação?",
            "Omissões: que bem eu devia ter feito e não fiz?",
            "Termine com uma decisão só, concreta, para as próximas semanas.",
          ],
        },
        {
          tipo: "duvidas",
          titulo: "Principais dúvidas",
          duvidas: [
            {
              pergunta: "Faz anos que não me confesso. Como voltar?",
              resposta:
                "Diga isso ao sacerdote na primeira frase: ele conduzirá as perguntas. Não é preciso lembrar de tudo com exatidão de arquivo; basta a sinceridade sobre o que se reconhece.",
            },
            {
              pergunta: "E se eu esquecer um pecado grave?",
              resposta:
                "Esquecido de boa-fé, está perdoado com os demais. Mencione-o na próxima confissão quando lembrar.",
            },
            {
              pergunta: "Sinto escrúpulos e confesso as mesmas coisas sempre.",
              resposta:
                "Escolha um confessor fixo e obedeça ao seu juízo. Escrúpulo se cura pela obediência, não por mais análise.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Catecismo da Igreja Católica",
          ref: "§§1422-1498",
          url: "https://www.vatican.va/archive/cathechism_po/index_new/index_po.html",
        },
        { obra: "Concílio de Trento", ref: "Sessão XIV, sobre o sacramento da Penitência" },
      ],
      relacionados: [{ label: "Os sacramentos", to: "/sacramentos" }],
    },
    {
      slug: "regra-de-vida",
      titulo: "Uma regra de vida realista",
      resumo:
        "Como organizar oração, sacramentos, estudo e caridade em um plano que você consiga cumprir.",
      minutos: 8,
      blocos: [
        {
          tipo: "texto",
          titulo: "Por que ter uma regra",
          paragrafos: [
            "Sem plano, a vida espiritual fica à mercê do humor. A regra de vida é um compromisso escrito, modesto e revisável, que protege o essencial nos dias ruins.",
            "Ela deve nascer do estado de vida real de cada um. A regra de um pai de família com três filhos não pode imitar a de um monge; se imitar, será abandonada em duas semanas.",
            "Regra boa é regra cumprida. É melhor prometer pouco e ser fiel do que planejar muito e viver em dívida permanente com Deus.",
          ],
        },
        {
          tipo: "pratica",
          titulo: "Modelo de regra em cinco linhas",
          pontos: [
            "Diário: oração da manhã e da noite, dez minutos de meditação da Escritura, exame breve antes de dormir.",
            "Semanal: Missa dominical sem exceção, um terço em família, meia hora de leitura formativa.",
            "Mensal: confissão, uma obra de caridade concreta, revisão da regra.",
            "Anual: um retiro ou um dia de deserto, uma leitura séria completa.",
            "Sempre: uma devoção que sustente o afeto — o Rosário, a Via-Sacra, a adoração.",
          ],
        },
        {
          tipo: "escritura",
          titulo: "O que diz a Escritura",
          citacoes: [
            {
              ref: "Lc 14, 28",
              texto:
                "Quem de vós, querendo edificar uma torre, não se senta primeiro para calcular os gastos?",
            },
            {
              ref: "Mt 11, 29-30",
              texto: "Tomai sobre vós o meu jugo... porque o meu jugo é suave e o meu peso é leve.",
            },
          ],
        },
        {
          tipo: "magisterio",
          titulo: "Chamados todos à santidade",
          citacoes: [
            {
              ref: "Lumen Gentium, 40",
              texto:
                "Todos os fiéis, de qualquer estado ou condição, são chamados pelo Senhor, cada um por seu caminho, à perfeição da santidade.",
            },
            {
              ref: "CIC §2015",
              texto:
                "O caminho da perfeição passa pela cruz. Não há santidade sem renúncia e sem combate espiritual.",
            },
          ],
        },
      ],
      fontes: [
        {
          obra: "Concílio Vaticano II, Lumen Gentium",
          ref: "cap. V, nn. 39-42",
          url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
        },
        { obra: "Catecismo da Igreja Católica", ref: "§§2012-2016" },
      ],
      relacionados: [{ label: "Painel espiritual", to: "/painel" }],
    },
  ],
};
