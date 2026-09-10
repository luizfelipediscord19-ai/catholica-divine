/**
 * Acervo de orações tradicionais da Igreja Católica.
 * Textos em português (uso corrente no Brasil) e, quando clássicos, o incipit latino.
 */

import { ORACOES_ADICIONAIS } from "./oracoes-extras";

export type CategoriaOracao =
  | "Fundamentais"
  | "Marianas"
  | "Ao Espírito Santo"
  | "Eucarísticas"
  | "Penitenciais"
  | "Proteção"
  | "Diárias"
  | "Aos Santos"
  | "Litanias"
  | "Ocasiões"
  | "Defuntos";

export type Oracao = {
  slug: string;
  titulo: string;
  latim?: string;
  categoria: CategoriaOracao;
  /** Contexto histórico/litúrgico em uma frase. */
  nota?: string;
  /** Para que serve — finalidade espiritual concreta. */
  paraQue?: string;
  /** Quando rezar — momento ou ocasião indicada. */
  quando?: string;
  texto: string;
};

export const CATEGORIAS_ORACAO: CategoriaOracao[] = [
  "Fundamentais",
  "Marianas",
  "Ao Espírito Santo",
  "Eucarísticas",
  "Penitenciais",
  "Proteção",
  "Diárias",
  "Aos Santos",
  "Litanias",
  "Ocasiões",
  "Defuntos",
];

export const ORACOES: Oracao[] = [...ORACOES_NUCLEO, ...ORACOES_ADICIONAIS];



const ORACOES_NUCLEO: Oracao[] = [
  // ===== FUNDAMENTAIS =====
  {
    slug: "sinal-da-cruz",
    titulo: "Sinal da Cruz",
    latim: "Signum Crucis",
    categoria: "Fundamentais",
    nota: "Abre e encerra toda oração cristã; professa a fé trinitária e a redenção pela Cruz.",
    texto: "Em nome do Pai, e do Filho, e do Espírito Santo. Amém.",
  },
  {
    slug: "pai-nosso",
    titulo: "Pai-Nosso",
    latim: "Pater Noster",
    categoria: "Fundamentais",
    nota: "A oração que o próprio Senhor ensinou (Mt 6,9-13); São Tomás a chama 'a mais perfeita das orações'.",
    texto:
      "Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  },
  {
    slug: "gloria-ao-pai",
    titulo: "Glória ao Pai",
    latim: "Gloria Patri",
    categoria: "Fundamentais",
    nota: "Doxologia menor: conclui os salmos na Liturgia das Horas e as dezenas do Rosário.",
    texto:
      "Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.",
  },
  {
    slug: "credo-apostolico",
    titulo: "Credo dos Apóstolos",
    latim: "Symbolum Apostolorum",
    categoria: "Fundamentais",
    nota: "Símbolo batismal da Igreja de Roma; é o resumo da fé rezado no início do Rosário.",
    texto:
      "Creio em Deus Pai todo-poderoso, criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  },
  {
    slug: "credo-niceno",
    titulo: "Credo Niceno-Constantinopolitano",
    latim: "Credo in unum Deum",
    categoria: "Fundamentais",
    nota: "Professado nos concílios de Niceia (325) e Constantinopla (381); rezado aos domingos e solenidades.",
    texto:
      "Creio em um só Deus, Pai todo-poderoso, criador do céu e da terra, de todas as coisas visíveis e invisíveis. Creio em um só Senhor, Jesus Cristo, Filho Unigênito de Deus, nascido do Pai antes de todos os séculos: Deus de Deus, Luz da Luz, Deus verdadeiro de Deus verdadeiro; gerado, não criado, consubstancial ao Pai. Por Ele todas as coisas foram feitas. E por nós, homens, e para nossa salvação, desceu dos céus: e se encarnou pelo Espírito Santo, no seio da Virgem Maria, e se fez homem. Também por nós foi crucificado sob Pôncio Pilatos; padeceu e foi sepultado. Ressuscitou ao terceiro dia, conforme as Escrituras; e subiu aos céus, onde está sentado à direita do Pai. E de novo há de vir, em sua glória, para julgar os vivos e os mortos; e o seu reino não terá fim. Creio no Espírito Santo, Senhor que dá a vida, e procede do Pai e do Filho; e com o Pai e o Filho é adorado e glorificado: Ele que falou pelos profetas. Creio na Igreja, una, santa, católica e apostólica. Professo um só batismo para a remissão dos pecados. E espero a ressurreição dos mortos, e a vida do mundo que há de vir. Amém.",
  },
  {
    slug: "ato-de-fe",
    titulo: "Ato de Fé",
    categoria: "Fundamentais",
    texto:
      "Meu Deus, eu creio firmemente em tudo o que a Santa Igreja Católica crê e ensina, porque Vós, ó verdade infalível, o revelastes. Nesta fé quero viver e morrer. Amém.",
  },
  {
    slug: "ato-de-esperanca",
    titulo: "Ato de Esperança",
    categoria: "Fundamentais",
    texto:
      "Meu Deus, esperando em vossa infinita bondade e nos méritos de Jesus Cristo, espero de Vós o perdão dos meus pecados, a graça de bem viver e a vida eterna. Amém.",
  },
  {
    slug: "ato-de-caridade",
    titulo: "Ato de Caridade",
    categoria: "Fundamentais",
    texto:
      "Meu Deus, eu vos amo sobre todas as coisas, com todo o meu coração, porque sois infinitamente bom; e amo o meu próximo como a mim mesmo por amor de Vós. Perdoo a quem me ofendeu e peço perdão a quem ofendi. Amém.",
  },

  // ===== MARIANAS =====
  {
    slug: "ave-maria",
    titulo: "Ave-Maria",
    latim: "Ave Maria",
    categoria: "Marianas",
    nota: "Une a saudação do anjo (Lc 1,28) à de Isabel (Lc 1,42) e a súplica da Igreja.",
    texto:
      "Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
  },
  {
    slug: "salve-rainha",
    titulo: "Salve-Rainha",
    latim: "Salve Regina",
    categoria: "Marianas",
    nota: "Antífona do século XI, cantada nas Completas do Tempo Comum e ao fim do Rosário.",
    texto:
      "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro nos mostrai Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.",
  },
  {
    slug: "angelus",
    titulo: "Angelus (Anjo do Senhor)",
    latim: "Angelus Domini",
    categoria: "Marianas",
    nota: "Rezado às 6h, 12h e 18h; no Tempo Pascal é substituído pelo Regina Caeli.",
    texto:
      "V. O Anjo do Senhor anunciou a Maria. R. E ela concebeu do Espírito Santo. Ave Maria...\nV. Eis aqui a serva do Senhor. R. Faça-se em mim segundo a vossa palavra. Ave Maria...\nV. E o Verbo divino se fez carne. R. E habitou entre nós. Ave Maria...\nV. Rogai por nós, santa Mãe de Deus. R. Para que sejamos dignos das promessas de Cristo.\nOremos: Infundi, Senhor, a vossa graça em nossos corações, para que, conhecendo pela mensagem do Anjo a encarnação de Cristo, vosso Filho, cheguemos, por sua paixão e cruz, à glória da ressurreição. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "regina-caeli",
    titulo: "Rainha do Céu",
    latim: "Regina Caeli",
    categoria: "Marianas",
    nota: "Substitui o Angelus do Domingo de Páscoa até Pentecostes.",
    texto:
      "Rainha do céu, alegrai-vos, aleluia! Porque Aquele que merecestes trazer em vosso seio, aleluia, ressuscitou como disse, aleluia. Rogai a Deus por nós, aleluia.\nV. Alegrai-vos e exultai, ó Virgem Maria, aleluia. R. Porque o Senhor ressuscitou verdadeiramente, aleluia.\nOremos: Ó Deus, que vos dignastes alegrar o mundo com a ressurreição do vosso Filho, Jesus Cristo, concedei-nos, vos pedimos, que por sua Mãe, a Virgem Maria, alcancemos as alegrias da vida eterna. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "lembrai-vos",
    titulo: "Lembrai-vos",
    latim: "Memorare",
    categoria: "Marianas",
    nota: "Difundida por São Bernardo de Claraval; oração de confiança absoluta em Maria.",
    texto:
      "Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que têm recorrido à vossa proteção, implorado a vossa assistência e reclamado o vosso socorro, fosse por vós desamparado. Animado com esta confiança, a vós também recorro, ó Virgem, Mãe das virgens; a vós venho e, gemendo sob o peso dos meus pecados, me prostro a vossos pés. Não desprezeis as minhas súplicas, ó Mãe do Verbo Encarnado, mas dignai-vos ouvi-las propícia e atendei-as benignamente. Amém.",
  },
  {
    slug: "sob-vossa-protecao",
    titulo: "Sob Vossa Proteção",
    latim: "Sub Tuum Praesidium",
    categoria: "Marianas",
    nota: "Tida como a mais antiga oração mariana conhecida; o papiro egípcio que a conserva é datado entre os sécs. III e IV, sem consenso entre os especialistas.",
    texto:
      "Sob vossa proteção nos acolhemos, Santa Mãe de Deus; não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita. Amém.",
  },
  {
    slug: "consagracao-a-maria",
    titulo: "Consagração a Nossa Senhora",
    categoria: "Marianas",
    texto:
      "Ó Senhora minha, ó minha Mãe! Eu me ofereço todo a vós e, em prova da minha devoção para convosco, vos consagro neste dia e para sempre os meus olhos, os meus ouvidos, a minha boca, o meu coração e inteiramente todo o meu ser. E porque assim sou vosso, ó incomparável Mãe, guardai-me e defendei-me como coisa e propriedade vossa. Amém.",
  },
  {
    slug: "nossa-senhora-aparecida",
    titulo: "Oração a Nossa Senhora Aparecida",
    categoria: "Marianas",
    nota: "Padroeira do Brasil, celebrada em 12 de outubro.",
    texto:
      "Ó Virgem Imaculada, Mãe de Deus e nossa Mãe, Senhora Aparecida, olhai com bondade para o povo brasileiro que se consagra a vós. Sede o refúgio dos aflitos, a saúde dos enfermos, o consolo dos tristes e a esperança dos que sofrem. Alcançai-nos de vosso Filho a fé viva, a paz nas famílias e a perseverança no bem. Amém.",
  },

  // ===== AO ESPÍRITO SANTO =====
  {
    slug: "vinde-espirito-santo",
    titulo: "Vinde, Espírito Santo",
    latim: "Veni, Sancte Spiritus",
    categoria: "Ao Espírito Santo",
    texto:
      "Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Enviai o vosso Espírito e tudo será criado, e renovareis a face da terra.\nOremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "veni-creator",
    titulo: "Vinde, Espírito Criador",
    latim: "Veni, Creator Spiritus",
    categoria: "Ao Espírito Santo",
    nota: "Hino do séc. IX atribuído a Rabano Mauro; cantado em Pentecostes, ordenações e Crisma.",
    texto:
      "Vinde, ó Espírito Criador, as nossas almas visitai e enchei os nossos corações com vossos dons celestiais. Vós sois chamado o Intercessor, do Deus excelso o dom sem par, a fonte viva, o fogo, o amor, a unção divina e salutar. Sois doador dos sete dons e sois poder na mão do Pai, por Ele prometido a nós, por nós à luz da fé levai. A todos dai perpétua paz e derramai vossa alegria; por vós sejamos conduzidos ao Pai, ao Filho, todo dia. Amém.",
  },
  {
    slug: "sequencia-pentecostes",
    titulo: "Sequência de Pentecostes",
    latim: "Veni, Sancte Spiritus (Sequentia)",
    categoria: "Ao Espírito Santo",
    nota: "Chamada 'Sequência de Ouro', cantada antes do Evangelho no Domingo de Pentecostes.",
    texto:
      "Vinde, ó Espírito Santo, e do céu enviai um raio de vossa luz. Vinde, Pai dos pobres; vinde, doador dos dons; vinde, luz dos corações. Consolador ótimo, doce hóspede da alma, doce alívio nosso. No trabalho, descanso; no calor, brisa suave; no pranto, consolação. Ó luz santíssima, enchei o íntimo do coração dos vossos fiéis. Sem a vossa força, nada há no homem, nada que seja inocente. Lavai o que está manchado, regai o que é árido, curai o que está ferido. Dobrai o que é rígido, aquecei o que é frio, dirigi o que se desvia. Dai aos vossos fiéis, que em Vós confiam, os sete dons sagrados. Dai-lhes o mérito da virtude, dai-lhes a salvação final, dai-lhes a alegria eterna. Amém.",
  },

  // ===== EUCARÍSTICAS =====
  {
    slug: "alma-de-cristo",
    titulo: "Alma de Cristo",
    latim: "Anima Christi",
    categoria: "Eucarísticas",
    nota: "Oração do séc. XIV, cara a Santo Inácio de Loyola; rezada após a comunhão.",
    texto:
      "Alma de Cristo, santificai-me. Corpo de Cristo, salvai-me. Sangue de Cristo, inebriai-me. Água do lado de Cristo, lavai-me. Paixão de Cristo, confortai-me. Ó bom Jesus, ouvi-me. Dentro de vossas chagas, escondei-me. Não permitais que eu me separe de Vós. Do espírito maligno, defendei-me. Na hora da minha morte, chamai-me. E mandai-me ir para Vós, para que com os vossos santos vos louve, por todos os séculos dos séculos. Amém.",
  },
  {
    slug: "adoro-te-devote",
    titulo: "Adoro-vos devotamente",
    latim: "Adoro Te devote",
    categoria: "Eucarísticas",
    nota: "Hino eucarístico de Santo Tomás de Aquino (1264), escrito para Corpus Christi.",
    texto:
      "Adoro-vos devotamente, ó Deus escondido, que sob estas espécies verdadeiramente vos ocultais. A Vós meu coração inteiramente se submete, porque, ao contemplar-vos, todo desfalece. A vista, o tato e o gosto em Vós se enganam; só pelo ouvido se crê com segurança: creio em tudo o que disse o Filho de Deus; nada é mais verdadeiro do que esta palavra da Verdade. Jesus, a quem agora vejo velado, faz que se cumpra o que tanto desejo: que, contemplando-vos face a face descoberta, seja eu feliz na visão de vossa glória. Amém.",
  },
  {
    slug: "comunhao-espiritual",
    titulo: "Comunhão Espiritual",
    categoria: "Eucarísticas",
    nota: "Atribuída a Santo Afonso Maria de Ligório; para quem não pode comungar sacramentalmente.",
    texto:
      "Meu Jesus, eu creio que estais realmente presente no Santíssimo Sacramento do altar. Amo-vos sobre todas as coisas e desejo receber-vos em minha alma. Já que agora não vos posso receber sacramentalmente, vinde ao menos espiritualmente ao meu coração. Como se já viésseis, eu vos abraço e me uno todo a Vós. Não permitais que eu me separe de Vós. Amém.",
  },
  {
    slug: "tantum-ergo",
    titulo: "Tão sublime Sacramento",
    latim: "Tantum ergo Sacramentum",
    categoria: "Eucarísticas",
    nota: "Últimas estrofes do Pange Lingua, cantadas na bênção do Santíssimo.",
    texto:
      "Tão sublime Sacramento adoremos neste altar, pois o Antigo Testamento deu ao Novo seu lugar. Venha a fé por suplemento os sentidos completar. Ao eterno Pai cantemos e a Jesus, o Salvador; ao Espírito exaltemos, na Trindade eterno amor. Ao Deus uno e trino demos a alegria do louvor. Amém.",
  },

  // ===== PENITENCIAIS =====
  {
    slug: "ato-de-contricao",
    titulo: "Ato de Contrição",
    categoria: "Penitenciais",
    nota: "Rezado na confissão sacramental e no exame de consciência diário.",
    texto:
      "Meu Deus, eu me arrependo de todo o coração de vos ter ofendido, porque sois infinitamente bom e digno de todo o meu amor; e detesto os meus pecados, porque me privam de vossa graça e me tornam digno de castigo. Proponho firmemente, com a ajuda de vossa graça, não tornar a pecar, fugir das ocasiões de pecado e fazer a devida penitência. Amém.",
  },
  {
    slug: "confiteor",
    titulo: "Confissão dos pecados",
    latim: "Confiteor",
    categoria: "Penitenciais",
    nota: "Ato penitencial do início da Missa.",
    texto:
      "Confesso a Deus todo-poderoso e a vós, irmãos e irmãs, que pequei muitas vezes por pensamentos e palavras, atos e omissões, por minha culpa, minha tão grande culpa. E peço à Virgem Maria, aos anjos e santos e a vós, irmãos e irmãs, que rogueis por mim a Deus, nosso Senhor. Amém.",
  },
  {
    slug: "oracao-de-jesus",
    titulo: "Oração de Jesus",
    categoria: "Penitenciais",
    nota: "Oração do coração, repetida ao ritmo da respiração pela tradição oriental (hesicasmo).",
    texto: "Senhor Jesus Cristo, Filho de Deus, tende piedade de mim, pecador.",
  },

  // ===== PROTEÇÃO =====
  {
    slug: "sao-miguel-arcanjo",
    titulo: "Oração a São Miguel Arcanjo",
    categoria: "Proteção",
    nota: "Composta por Leão XIII e difundida a partir de 1886; o relato de uma visão papal na origem da oração pertence à tradição piedosa, sem comprovação documental.",
    texto:
      "São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a Satanás e aos outros espíritos malignos que vagueiam pelo mundo para perder as almas. Amém.",
  },
  {
    slug: "anjo-da-guarda",
    titulo: "Santo Anjo do Senhor",
    latim: "Angele Dei",
    categoria: "Proteção",
    texto:
      "Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa e me ilumina. Amém.",
  },
  {
    slug: "sao-bento",
    titulo: "Oração de São Bento",
    categoria: "Proteção",
    nota: "Fórmula da medalha de São Bento: 'Vade retro Satana'.",
    texto:
      "A Cruz sagrada seja a minha luz, não seja o dragão o meu guia. Retira-te, Satanás! Nunca me aconselhes coisas vãs. É mau o que tu me ofereces; bebe tu mesmo do teu veneno. Amém.",
  },
  {
    slug: "sagrado-coracao",
    titulo: "Consagração ao Sagrado Coração de Jesus",
    categoria: "Proteção",
    texto:
      "Sagrado Coração de Jesus, eu me consagro inteiramente a Vós: minha vida, meus trabalhos, minhas alegrias e minhas dores. Fazei o meu coração semelhante ao vosso, manso e humilde. Reinai sobre a minha família, sobre a minha casa e sobre tudo o que sou. Sagrado Coração de Jesus, eu confio em Vós. Amém.",
  },

  // ===== DIÁRIAS =====
  {
    slug: "oferecimento-do-dia",
    titulo: "Oferecimento do dia",
    categoria: "Diárias",
    texto:
      "Ó Jesus, por meio do Coração Imaculado de Maria, eu vos ofereço as orações, obras, alegrias e sofrimentos deste dia, em reparação das ofensas e pelas intenções pelas quais vosso Sagrado Coração intercede. Amém.",
  },
  {
    slug: "oracao-da-manha",
    titulo: "Oração da manhã",
    categoria: "Diárias",
    texto:
      "Senhor meu Deus, eu vos adoro no começo deste dia e vos agradeço a vida que me dais. Abençoai meus pensamentos, palavras e obras; livrai-me do pecado e conduzi-me pelos caminhos da vossa vontade. Que tudo o que eu fizer hoje seja para a vossa glória. Amém.",
  },
  {
    slug: "oracao-da-noite",
    titulo: "Oração da noite",
    categoria: "Diárias",
    texto:
      "Senhor, ao terminar este dia, eu vos agradeço por todos os vossos benefícios. Perdoai o que fiz de mal e aceitai o pouco de bem que consegui fazer. Guardai o meu sono, protegei minha família e concedei-me acordar amanhã para vos servir com um coração renovado. Amém.",
  },
  {
    slug: "bencao-da-mesa",
    titulo: "Bênção da mesa",
    categoria: "Diárias",
    texto:
      "Abençoai, Senhor, este alimento que vamos receber de vossa bondade, e dai pão a quem tem fome e fome de justiça a quem tem pão. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "oracao-de-sao-francisco",
    titulo: "Oração da Paz",
    categoria: "Diárias",
    nota: "Atribuída a São Francisco de Assis; sua forma atual surgiu na França no início do séc. XX.",
    texto:
      "Senhor, fazei-me instrumento de vossa paz. Onde houver ódio, que eu leve o amor; onde houver ofensa, que eu leve o perdão; onde houver discórdia, que eu leve a união; onde houver dúvida, que eu leve a fé; onde houver erro, que eu leve a verdade; onde houver desespero, que eu leve a esperança; onde houver tristeza, que eu leve a alegria; onde houver trevas, que eu leve a luz. Ó Mestre, fazei que eu procure mais consolar que ser consolado; compreender que ser compreendido; amar que ser amado. Pois é dando que se recebe, é perdoando que se é perdoado, e é morrendo que se vive para a vida eterna. Amém.",
  },
  {
    slug: "tomai-senhor",
    titulo: "Tomai, Senhor, e recebei",
    latim: "Suscipe",
    categoria: "Diárias",
    nota: "Oferecimento final dos Exercícios Espirituais de Santo Inácio de Loyola.",
    texto:
      "Tomai, Senhor, e recebei toda a minha liberdade, a minha memória, o meu entendimento e toda a minha vontade, tudo o que tenho e possuo. Vós me destes; a Vós, Senhor, o restituo. Tudo é vosso: disponde de tudo segundo a vossa vontade. Dai-me somente o vosso amor e a vossa graça, que isto me basta. Amém.",
  },

  // ===== DEFUNTOS =====
  {
    slug: "requiem-eternam",
    titulo: "Descanso eterno",
    latim: "Requiem aeternam",
    categoria: "Defuntos",
    texto:
      "Dai-lhes, Senhor, o descanso eterno, e brilhe para eles a luz perpétua. Descansem em paz. Amém.",
  },
  {
    slug: "de-profundis",
    titulo: "Das profundezas (Salmo 129/130)",
    latim: "De profundis",
    categoria: "Defuntos",
    nota: "Salmo penitencial tradicionalmente rezado pelos fiéis defuntos.",
    texto:
      "Das profundezas eu clamo a vós, Senhor; escutai a minha voz! Estejam atentos os vossos ouvidos ao clamor da minha prece. Se levardes em conta as nossas faltas, quem haverá de subsistir? Mas em Vós se encontra o perdão, para que sejais temido com respeito. No Senhor ponho a minha esperança, espera a minha alma em sua palavra. A minha alma espera pelo Senhor mais que o vigia pela aurora. Espere Israel pelo Senhor, porque no Senhor se encontra a misericórdia e copiosa redenção. Ele é que redimirá Israel de todas as suas culpas. Amém.",
  },
  {
    slug: "oracao-pelos-agonizantes",
    titulo: "Oração pelos agonizantes",
    categoria: "Defuntos",
    paraQue: "Implorar misericórdia e paz para quem está nos últimos momentos da vida.",
    quando: "Junto ao leito de um enfermo grave ou ao saber de alguém em agonia.",
    texto:
      "Ó clementíssimo Jesus, amante das almas, pelas angústias do vosso Coração Sacratíssimo e pelas dores de vossa Mãe Imaculada, lavai no vosso Sangue os pecadores de todo o mundo que agora estão em agonia e que hoje devem morrer. Coração de Jesus, que sofrestes até a morte, tende piedade dos agonizantes. Amém.",
  },
  {
    slug: "eterno-repouso-familiares",
    titulo: "Oração pelos pais e familiares falecidos",
    categoria: "Defuntos",
    paraQue: "Sufragar as almas dos próprios familiares, exercitando a caridade que vence a morte.",
    quando: "No aniversário de falecimento, em novembro e nas visitas ao cemitério.",
    texto:
      "Ó Deus, que nos mandastes honrar pai e mãe, olhai com bondade a alma de meus pais e de meus familiares falecidos: perdoai-lhes os pecados, concedei-lhes ver o vosso rosto na luz eterna e dai-me a graça de reencontrá-los na alegria do vosso Reino. Por Cristo, nosso Senhor. Amém.",
  },

  // ===== AOS SANTOS =====
  {
    slug: "sao-jose-pai-adotivo",
    titulo: "A São José",
    latim: "Ad te, beate Ioseph",
    categoria: "Aos Santos",
    nota: "Oração de Leão XIII (1889), recomendada especialmente no mês de março e em outubro.",
    paraQue: "Pedir a proteção do Patrono da Igreja para a família, o trabalho e a boa morte.",
    quando: "Às quartas-feiras, no mês de março e em qualquer necessidade doméstica ou de emprego.",
    texto:
      "A vós, bem-aventurado São José, recorremos em nossa tribulação e, depois de implorar o auxílio de vossa Santíssima Esposa, cheios de confiança solicitamos também o vosso patrocínio. Por esse laço de caridade que vos uniu à Virgem Imaculada, Mãe de Deus, e pelo amor paternal que tivestes ao Menino Jesus, ó pai amantíssimo, defendei-nos e protegei-nos. Amém.",
  },
  {
    slug: "santo-antonio",
    titulo: "A Santo Antônio de Pádua",
    categoria: "Aos Santos",
    paraQue: "Pedir a intercessão do Doutor Evangélico, invocado nas coisas perdidas e nas causas urgentes.",
    quando: "Às terças-feiras e na festa de 13 de junho.",
    texto:
      "Glorioso Santo Antônio, servo fiel e amigo de Jesus Cristo, que recebestes de Deus o poder de operar prodígios e a graça de restituir o que se perdeu: alcançai-me a graça de reencontrar o que perdi — sobretudo a paz, a fé e a caridade. Fazei que, imitando o vosso zelo pela Palavra de Deus, eu una à minha oração a emenda de vida. Amém.",
  },
  {
    slug: "santa-rita",
    titulo: "A Santa Rita de Cássia",
    categoria: "Aos Santos",
    paraQue: "Confiar as causas humanamente impossíveis e as feridas do matrimônio e da família.",
    quando: "Novena de 13 a 22 de maio e em momentos de aparente desesperança.",
    texto:
      "Santa Rita de Cássia, esposa, mãe, viúva e religiosa, que em cada estado de vida glorificastes a Deus pela paciência: obtende-me a graça de perdoar como perdoastes e de perseverar na oração pelas causas que me parecem perdidas. Pela chaga que recebestes da coroa de espinhos, ensinai-me a amar a Cruz de Cristo. Amém.",
  },
  {
    slug: "santa-terezinha",
    titulo: "A Santa Teresinha do Menino Jesus",
    categoria: "Aos Santos",
    paraQue: "Aprender o caminho da confiança e da pequenez, e pedir graças pelas missões.",
    quando: "Novena de 23 de setembro a 1º de outubro e nos dias de aridez espiritual.",
    texto:
      "Ó pequena Teresa do Menino Jesus, que prometestes fazer cair do Céu uma chuva de rosas: alcançai-me a simplicidade do amor confiante, para que eu ofereça a Deus as coisas pequenas do meu dia com grande amor. Rogai por todos os missionários e por aqueles que perderam a esperança. Amém.",
  },
  {
    slug: "sao-judas-tadeu",
    titulo: "A São Judas Tadeu",
    categoria: "Aos Santos",
    paraQue: "Invocar o apóstolo das causas difíceis e desesperadas, sem cair em superstição.",
    quando: "Todo dia 28 do mês e na festa de 28 de outubro.",
    texto:
      "Glorioso Apóstolo São Judas Tadeu, fiel servo e amigo de Jesus, intercedei por mim nesta necessidade que apresento ao Senhor. Alcançai-me fé viva para crer que Deus jamais abandona quem nele espera, e ajudai-me a aceitar com paz a resposta que vier da sua vontade. Amém.",
  },
  {
    slug: "sao-pio-de-pietrelcina",
    titulo: "A São Pio de Pietrelcina",
    categoria: "Aos Santos",
    paraQue: "Pedir amor à Confissão, à Eucaristia e paciência nas provações do corpo.",
    quando: "Antes ou depois da Confissão e na festa de 23 de setembro.",
    texto:
      "São Pio de Pietrelcina, que carregastes no corpo as chagas do Senhor e passastes a vida no confessionário reconciliando pecadores: obtende-me contrição sincera, horror ao pecado e confiança na misericórdia. Ensinai-me o vosso lema: rezar, esperar e não se preocupar. Amém.",
  },

  // ===== LITANIAS =====
  {
    slug: "ladainha-de-loreto",
    titulo: "Ladainha de Nossa Senhora (excerto)",
    latim: "Litaniae Lauretanae",
    categoria: "Litanias",
    nota: "Rezada em Loreto desde o século XVI; aprovada por Sisto V em 1587.",
    paraQue: "Louvar Maria em seus títulos e pedir sua intercessão maternal ponto por ponto.",
    quando: "Ao final do Rosário, especialmente em maio e outubro.",
    texto:
      "Senhor, tende piedade de nós. Cristo, tende piedade de nós.\nSanta Maria — rogai por nós. Santa Mãe de Deus — rogai por nós. Santa Virgem das virgens — rogai por nós.\nMãe de Cristo — rogai por nós. Mãe da Igreja — rogai por nós. Mãe da divina graça — rogai por nós. Mãe puríssima — rogai por nós. Mãe do bom conselho — rogai por nós.\nVirgem prudentíssima — rogai por nós. Espelho de justiça — rogai por nós. Sede da sabedoria — rogai por nós. Causa da nossa alegria — rogai por nós.\nTorre de Davi — rogai por nós. Arca da aliança — rogai por nós. Porta do céu — rogai por nós. Estrela da manhã — rogai por nós.\nSaúde dos enfermos — rogai por nós. Refúgio dos pecadores — rogai por nós. Consoladora dos aflitos — rogai por nós. Auxílio dos cristãos — rogai por nós.\nRainha da paz — rogai por nós.\nCordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Senhor. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.",
  },
  {
    slug: "ladainha-do-sagrado-coracao",
    titulo: "Ladainha do Sagrado Coração de Jesus (excerto)",
    categoria: "Litanias",
    paraQue: "Reparar as ofensas ao Coração de Cristo e crescer no amor por Ele.",
    quando: "Nas primeiras sextas-feiras e no mês de junho.",
    texto:
      "Coração de Jesus, Filho do Pai Eterno — tende piedade de nós.\nCoração de Jesus, formado pelo Espírito Santo no seio da Virgem Mãe — tende piedade de nós.\nCoração de Jesus, templo santo de Deus — tende piedade de nós.\nCoração de Jesus, abrasada fornalha de caridade — tende piedade de nós.\nCoração de Jesus, cheio de bondade e amor — tende piedade de nós.\nCoração de Jesus, abismo de todas as virtudes — tende piedade de nós.\nCoração de Jesus, paciente e de muita misericórdia — tende piedade de nós.\nCoração de Jesus, vítima dos pecadores — tende piedade de nós.\nCoração de Jesus, salvação dos que em Vós esperam — tende piedade de nós.\nJesus, manso e humilde de coração, fazei o nosso coração semelhante ao vosso. Amém.",
  },
  {
    slug: "ladainha-de-sao-jose",
    titulo: "Ladainha de São José (excerto)",
    categoria: "Litanias",
    nota: "Aprovada por São Pio X em 1909 e ampliada pelo Papa Francisco em 2021.",
    paraQue: "Invocar o guardião da Sagrada Família em seus títulos de justo e protetor.",
    quando: "No mês de março, às quartas-feiras e nas novenas a São José.",
    texto:
      "São José — rogai por nós. Ilustre descendente de Davi — rogai por nós. Luz dos patriarcas — rogai por nós. Esposo da Mãe de Deus — rogai por nós. Castíssimo guarda da Virgem — rogai por nós. Sustentáculo das famílias — rogai por nós. José justíssimo — rogai por nós. José castíssimo — rogai por nós. José prudentíssimo — rogai por nós. Modelo dos trabalhadores — rogai por nós. Glória da vida doméstica — rogai por nós. Amparo dos aflitos — rogai por nós. Protetor da Santa Igreja — rogai por nós.\nEle o constituiu senhor de sua casa e chefe de toda a sua família. Amém.",
  },
  {
    slug: "ladainha-do-precioso-sangue",
    titulo: "Ladainha do Preciosíssimo Sangue (excerto)",
    categoria: "Litanias",
    paraQue: "Adorar o Sangue redentor e pedir por pecadores e pela paz do mundo.",
    quando: "No mês de julho, nas sextas-feiras e na Quaresma.",
    texto:
      "Sangue de Cristo, Unigênito do Pai Eterno — salvai-nos.\nSangue de Cristo, Verbo de Deus encarnado — salvai-nos.\nSangue de Cristo, derramado no Getsêmani — salvai-nos.\nSangue de Cristo, brotado na flagelação — salvai-nos.\nSangue de Cristo, vertido na Cruz — salvai-nos.\nSangue de Cristo, preço da nossa salvação — salvai-nos.\nSangue de Cristo, força dos mártires — salvai-nos.\nSangue de Cristo, esperança dos penitentes — salvai-nos.\nSangue de Cristo, alívio dos que trabalham — salvai-nos.\nRemistes-nos, Senhor, com o vosso Sangue e fizestes de nós um reino para o nosso Deus. Amém.",
  },

  // ===== OCASIÕES =====
  {
    slug: "oracao-pelos-enfermos",
    titulo: "Oração pelos enfermos",
    categoria: "Ocasiões",
    paraQue: "Pedir saúde, alívio da dor e sentido cristão para o sofrimento de um doente.",
    quando: "Ao visitar um enfermo, antes de cirurgias e no tratamento de doenças graves.",
    texto:
      "Senhor Jesus, que passastes pelo mundo curando os doentes e consolando os aflitos, olhai com bondade para (nome) que sofre. Aliviai suas dores, fortalecei sua esperança e, se for da vossa vontade, restituí-lhe a saúde. Dai aos que o cuidam paciência e ternura, e a todos nós a certeza de que nenhum sofrimento oferecido a Vós é perdido. Amém.",
  },
  {
    slug: "oracao-pela-familia",
    titulo: "Oração pela família",
    categoria: "Ocasiões",
    paraQue: "Consagrar o lar à Sagrada Família e pedir concórdia entre pais e filhos.",
    quando: "Na oração em família, à noite, e na festa da Sagrada Família.",
    texto:
      "Jesus, Maria e José, em vós contemplamos o esplendor do verdadeiro amor. Fazei da nossa família um lugar de comunhão e de oração, escola do Evangelho e pequena Igreja doméstica. Guardai-nos da divisão e do rancor, ensinai-nos a pedir perdão e a perdoar, e não permitais que a pressa e o egoísmo apaguem entre nós a ternura. Amém.",
  },
  {
    slug: "oracao-pelo-trabalho",
    titulo: "Oração pelo trabalho e pelo estudo",
    categoria: "Ocasiões",
    paraQue: "Santificar as tarefas do dia e pedir luz para decisões, provas e entrevistas.",
    quando: "Ao começar a jornada de trabalho ou uma sessão de estudo.",
    texto:
      "Vinde, Espírito Santo, iluminar a minha inteligência e ordenar as minhas forças. Que eu trabalhe com honestidade, sem ansiedade e sem vaidade, buscando servir e não apenas aparecer. Abençoai o fruto das minhas mãos, dai-me sabedoria nas decisões e humildade para aprender. São José operário, rogai por mim. Amém.",
  },
  {
    slug: "oracao-antes-da-leitura-biblica",
    titulo: "Oração antes da leitura da Sagrada Escritura",
    categoria: "Ocasiões",
    paraQue: "Dispor o coração para escutar a Palavra como Palavra de Deus, e não como texto qualquer.",
    quando: "Antes da Lectio Divina e de cada leitura bíblica.",
    texto:
      "Falai, Senhor, que o vosso servo escuta. Abri o meu coração à vossa Palavra, para que ela seja lâmpada aos meus passos e luz ao meu caminho. Dai-me o Espírito que inspirou os autores sagrados, a fim de que eu compreenda o que devo crer, ame o que compreendo e viva o que amo. Amém.",
  },
  {
    slug: "oracao-em-viagem",
    titulo: "Oração do viajante",
    latim: "Itinerarium",
    categoria: "Ocasiões",
    paraQue: "Pedir proteção no caminho, tomando o anjo Rafael e Tobias como modelo.",
    quando: "Ao iniciar uma viagem, ao volante ou antes de um voo.",
    texto:
      "Senhor Deus, que conduzistes Abraão e guardastes Tobias no caminho pelas mãos do anjo Rafael: acompanhai-nos nesta viagem. Afastai de nós todo perigo, dai-nos prudência e paciência, e conduzi-nos em segurança ao destino e, no fim da vida, à pátria do Céu. Amém.",
  },
  {
    slug: "oracao-pela-igreja-e-o-papa",
    titulo: "Oração pela Igreja e pelo Papa",
    categoria: "Ocasiões",
    paraQue: "Sustentar com a oração o Sumo Pontífice, os bispos e a unidade da Igreja.",
    quando: "Nas quintas-feiras, na Missa e nas intenções mensais.",
    texto:
      "Senhor, fonte de toda unidade, guardai a vossa Igreja na verdade e na caridade. Abençoai o Papa, os bispos, os sacerdotes e os diáconos; dai-lhes coragem apostólica e coração de pastores. Suscitai vocações santas, curai as feridas causadas pelo pecado dos vossos ministros e fazei de nós pedras vivas do vosso edifício. Amém.",
  },
  {
    slug: "oracao-pela-paz",
    titulo: "Oração pela paz",
    categoria: "Ocasiões",
    paraQue: "Interceder pelos povos em guerra e pedir a conversão dos corações violentos.",
    quando: "Em tempos de conflito, no dia 1º de janeiro e nas vigílias de oração.",
    texto:
      "Senhor Jesus, Príncipe da Paz, que reconciliastes o Céu e a terra pelo sangue da vossa Cruz: dai a paz aos povos em guerra, consolo aos refugiados e conversão aos que semeiam a violência. Fazei de mim instrumento da vossa paz, começando pela minha casa, pelas minhas palavras e pelos meus julgamentos. Amém.",
  },
  {
    slug: "oracao-pelas-vocacoes",
    titulo: "Oração pelas vocações",
    categoria: "Ocasiões",
    paraQue: "Pedir operários para a messe: sacerdotes, religiosos e famílias santas.",
    quando: "Nas quintas-feiras e no Domingo do Bom Pastor.",
    texto:
      "Senhor da messe, a colheita é grande e os trabalhadores são poucos: enviai operários à vossa messe. Chamai jovens generosos ao sacerdócio e à vida consagrada, dai-lhes ouvidos atentos e coração livre, e sustentai as famílias que acolhem esse chamado. Que eu também responda com fidelidade à vocação que me destes. Amém.",
  },
  {
    slug: "oracao-em-tempo-de-tentacao",
    titulo: "Oração em tempo de tentação",
    categoria: "Ocasiões",
    paraQue: "Pedir socorro imediato na hora da luta contra o pecado.",
    quando: "No instante da tentação, sem esperar que ela passe sozinha.",
    texto:
      "Jesus, Maria e José, socorrei-me agora. Coração de Jesus, sede a minha força; Virgem Imaculada, cobri-me com o vosso manto; São Miguel, defendei-me. Não permitais que eu me separe de Vós nem por um instante. Prefiro morrer a ofender-Vos. Amém.",
  },
  {
    slug: "oracao-de-gratidao",
    titulo: "Oração de gratidão",
    latim: "Te Deum (excerto)",
    categoria: "Ocasiões",
    nota: "Hino de louvor atribuído a Santo Ambrósio e Santo Agostinho; cantado em ações de graças solenes.",
    paraQue: "Agradecer graças recebidas e reconhecer que todo bem vem de Deus.",
    quando: "Ao fim do ano, em aniversários e após graças alcançadas.",
    texto:
      "A vós, ó Deus, louvamos; a vós, Senhor, confessamos. A vós, Pai eterno, toda a terra venera. A vós todos os anjos, os céus e todas as potestades, os querubins e serafins proclamam sem cessar: Santo, Santo, Santo é o Senhor, Deus do universo! Cheios estão o céu e a terra da majestade da vossa glória. Em vós, Senhor, esperei: não seja confundido eternamente. Amém.",
  },
  // ===== NOVAS: LITANIAS =====
  {
    slug: "ladainha-dos-santos",
    titulo: "Ladainha de Todos os Santos (excerto)",
    latim: "Litaniae Sanctorum",
    categoria: "Litanias",
    nota: "Uma das ladainhas mais antigas da liturgia romana, cantada nas Vigílias Pascais e ordenações.",
    paraQue: "Invocar a intercessão coletiva de toda a Igreja triunfante.",
    quando: "Na Vigília Pascal, em ordenações, consagrações e procissões solenes.",
    texto:
      "Senhor, tende piedade de nós. Cristo, tende piedade de nós.\nSanta Maria — rogai por nós. São Miguel — rogai por nós. Santo André — rogai por nós. São João Batista — rogai por nós. São José — rogai por nós. São Pedro e São Paulo — rogai por nós. Santa Maria Madalena — rogai por nós. Santo Estêvão — rogai por nós. Santo Agostinho — rogai por nós. São Francisco e São Domingos — rogai por nós. Santa Teresa d'Ávila — rogai por nós. Todos os santos e santas de Deus — rogai por nós.\nSede propício, livrai-nos, Senhor. De todo mal, livrai-nos, Senhor. Nós, pecadores, vos rogamos, ouvi-nos. Amém.",
  },
  {
    slug: "ladainha-de-defuntos",
    titulo: "Ladainha pelos falecidos (excerto)",
    categoria: "Litanias",
    paraQue: "Sufragar as almas dos fiéis defuntos invocando a misericórdia divina.",
    quando: "No Dia de Finados, em velórios e nos aniversários de falecimento.",
    texto:
      "Senhor, tende piedade deles. Cristo, tende piedade deles.\nSanta Maria — rogai por eles. São Miguel Arcanjo — rogai por eles. Todos os anjos e arcanjos — rogai por eles. Todos os santos e santas de Deus — rogai por eles.\nSede propício, perdoai-lhes, Senhor. Do fogo eterno, livrai-os, Senhor. Pela vossa Cruz e Paixão, livrai-os, Senhor. Nós, pecadores, vos rogamos: dai-lhes o descanso eterno. Cordeiro de Deus, que tirais o pecado do mundo, dai-lhes o descanso eterno. Amém.",
  },
  {
    slug: "ladainha-da-divina-misericordia",
    titulo: "Ladainha da Divina Misericórdia (excerto)",
    categoria: "Litanias",
    nota: "Nascida das revelações privadas relatadas por Santa Faustina Kowalska — que não pertencem ao depósito da fé; a devoção difundiu-se na Igreja e em 2000 São João Paulo II instituiu o II Domingo da Páscoa como Domingo da Divina Misericórdia.",
    paraQue: "Confiar na misericórdia de Deus para si e para o mundo inteiro.",
    quando: "No Domingo da Divina Misericórdia e às 15h, hora da misericórdia.",
    texto:
      "Misericórdia de Deus, brotada do seio do Pai — eu confio em Vós. Misericórdia de Deus, maior que todas as nossas culpas — eu confio em Vós. Misericórdia de Deus, revelada no Coração de Jesus — eu confio em Vós. Misericórdia de Deus, fonte de milagres e prodígios — eu confio em Vós. Misericórdia de Deus, esperança das almas desesperadas — eu confio em Vós. Jesus, em Vós eu confio. Amém.",
  },

  // ===== NOVAS: DEFUNTOS =====
  {
    slug: "oracao-pelos-fieis-defuntos",
    titulo: "Oração pelos fiéis defuntos",
    categoria: "Defuntos",
    paraQue: "Sufragar todas as almas do purgatório, especialmente as mais abandonadas.",
    quando: "No mês de novembro e em qualquer visita ao cemitério.",
    texto:
      "Senhor Jesus Cristo, Rei da glória, livrai as almas de todos os fiéis defuntos das penas do inferno e do abismo profundo. Livrai-as da boca do leão, para que o inferno não as devore, nem sejam lançadas nas trevas. Oferecei-lhes, Senhor, o sacrifício e as orações de louvor: recebei-as por elas, Senhor, e concedei-lhes o descanso eterno. Amém.",
  },
  {
    slug: "oracao-por-um-falecido-recente",
    titulo: "Oração por um falecido recente",
    categoria: "Defuntos",
    paraQue: "Confiar a Deus, logo após a morte, a alma de quem partiu.",
    quando: "No momento do óbito, no velório e nos primeiros dias de luto.",
    texto:
      "Ó Deus, que sois a ressurreição e a vida, recebei em vossa paz a alma de (nome), que hoje deixou este mundo. Perdoai-lhe as faltas, purificai-a de toda mancha e concedei-lhe a alegria eterna com os vossos santos. Consolai os que choram esta partida e dai-lhes a certeza de que a morte não tem a última palavra. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "oracao-do-luto",
    titulo: "Oração no luto",
    categoria: "Defuntos",
    paraQue: "Pedir consolo e esperança para quem sofre a perda de um ente querido.",
    quando: "Nos dias e meses seguintes a um falecimento.",
    texto:
      "Senhor, Vós que chorastes diante do túmulo de Lázaro, olhai para a minha dor. Não me deixeis sucumbir à tristeza sem esperança, mas ensinai-me a acreditar que a vida é transformada, não destruída. Guardai comigo a lembrança de quem parti amando, e concedei-me a paz de sabê-lo em vossas mãos. Amém.",
  },
  {
    slug: "oracao-pelas-almas-esquecidas",
    titulo: "Oração pelas almas mais abandonadas do Purgatório",
    categoria: "Defuntos",
    paraQue: "Interceder por aquelas almas que já não têm quem reze por elas.",
    quando: "Às segundas-feiras e no mês de novembro.",
    texto:
      "Ó meu Jesus, por vosso amor infinito, tende piedade das almas do Purgatório e, de modo especial, daquelas que ninguém mais recorda. Aplicai-lhes os méritos infinitos da vossa Paixão e concedei-lhes, quanto antes, a visão beatífica. Amém.",
  },

  // ===== NOVAS: OCASIÕES =====
  {
    slug: "oracao-antes-de-exame",
    titulo: "Oração antes de um exame ou prova",
    categoria: "Ocasiões",
    paraQue: "Pedir serenidade, memória e clareza mental diante de uma avaliação.",
    quando: "Antes de provas escolares, concursos e exames médicos.",
    texto:
      "Senhor, acalmai o meu coração e clareai a minha mente. Ajudai-me a lembrar o que estudei e a responder com serenidade, sem o peso do medo. Que o resultado, seja qual for, não abale a minha confiança em Vós, que cuidais de todos os meus passos. Amém.",
  },
  {
    slug: "oracao-antes-de-cirurgia",
    titulo: "Oração antes de uma cirurgia",
    categoria: "Ocasiões",
    paraQue: "Confiar a Deus o próprio corpo e a equipe médica antes de um procedimento.",
    quando: "Na véspera ou no dia de uma intervenção cirúrgica.",
    texto:
      "Senhor Jesus, médico das almas e dos corpos, ponho em vossas mãos esta cirurgia. Guiai as mãos dos médicos e enfermeiros, afastai de mim todo o temor e concedei que tudo corra segundo a vossa vontade. Nossa Senhora da Saúde, acompanhai-me nesta hora. Amém.",
  },
  {
    slug: "oracao-na-gestacao",
    titulo: "Oração pela mãe e o filho que vem",
    categoria: "Ocasiões",
    paraQue: "Confiar a Deus a gravidez, a saúde da mãe e a vida que se forma.",
    quando: "Ao longo da gestação e antes do parto.",
    texto:
      "Senhor da vida, que tecestes cada um de nós no seio materno, abençoai esta gestação. Protegei a saúde de (nome) e a vida que cresce dentro dela; afastai todo temor e toda complicação. Fazei desta criança um filho da luz, e concedei aos pais sabedoria para acolhê-la e educá-la no vosso amor. Amém.",
  },
  {
    slug: "oracao-pela-vida-nova-emprego",
    titulo: "Oração ao começar um novo trabalho",
    categoria: "Ocasiões",
    paraQue: "Pedir bênção sobre uma nova etapa profissional.",
    quando: "No primeiro dia de um novo emprego ou projeto.",
    texto:
      "São José operário, que trabalhastes com as próprias mãos para sustentar a Sagrada Família: abençoai este novo trabalho que começo. Dai-me competência, honestidade e espírito de serviço, e fazei que eu encontre nele ocasião de crescer e de servir ao próximo. Amém.",
  },
  {
    slug: "oracao-por-doenca-grave",
    titulo: "Oração diante de uma doença grave",
    categoria: "Ocasiões",
    paraQue: "Pedir fortaleza e sentido cristão diante de um diagnóstico difícil.",
    quando: "Ao receber uma notícia de doença séria, para si ou para alguém amado.",
    texto:
      "Senhor, diante desta notícia que me abala, recorro a Vós. Não me deixeis cair no desespero, mas dai-me fé para unir este sofrimento à vossa Cruz redentora. Concedei cura, se for para o meu bem; e, se não for, dai-me a graça de suportar com paciência e esperança inabaláveis. Amém.",
  },
  {
    slug: "oracao-antes-do-trabalho-pesado",
    titulo: "Oração antes de uma decisão importante",
    categoria: "Ocasiões",
    paraQue: "Pedir discernimento diante de uma escolha decisiva de vida.",
    quando: "Antes de decisões sobre vocação, mudança de cidade ou compromissos definitivos.",
    texto:
      "Espírito Santo, luz que tudo esclarece, iluminai a minha inteligência para que eu conheça o que Deus quer de mim. Livrai-me do medo e da precipitação; dai-me paz interior para reconhecer a vossa voz e coragem para segui-la, ainda que custe. Amém.",
  },

  // ===== NOVAS: EUCARÍSTICAS =====
  {
    slug: "oracao-antes-da-comunhao",
    titulo: "Oração antes da Comunhão",
    categoria: "Eucarísticas",
    nota: "Inspirada nas orações de preparação de São Tomás de Aquino para a Missa.",
    paraQue: "Preparar o coração para receber dignamente o Corpo de Cristo.",
    quando: "Nos instantes antes de comungar, durante a fila da comunhão.",
    texto:
      "Senhor, não sou digno de que entreis em minha morada, mas dizei uma palavra e serei salvo. Purificai meu coração de todo apego desordenado, para que eu vos receba com fé viva, esperança firme e amor ardente. Vinde, Jesus, e fazei de mim um só convosco. Amém.",
  },
  {
    slug: "oracao-depois-da-comunhao",
    titulo: "Oração depois da Comunhão",
    categoria: "Eucarísticas",
    paraQue: "Prolongar a ação de graças após receber a Eucaristia.",
    quando: "Logo após comungar, em silêncio ou de joelhos.",
    texto:
      "Fiquei convosco, Senhor, dentro de mim mesmo. Obrigado por vos dardes tão generosamente a este pecador. Fazei que esta Comunhão me transforme cada vez mais em Vós, que apague meus defeitos e acenda em mim o fogo da caridade. Que eu leve Cristo a todos os que hoje encontrar. Amém.",
  },
  {
    slug: "oracao-visita-ao-santissimo",
    titulo: "Oração de visita ao Santíssimo Sacramento",
    categoria: "Eucarísticas",
    nota: "Prática recomendada por Santo Afonso Maria de Ligório em suas 'Visitas ao Santíssimo Sacramento'.",
    paraQue: "Adorar Jesus realmente presente no Sacrário fora da Missa.",
    quando: "Em qualquer visita à igreja e nas horas de Adoração Eucarística.",
    texto:
      "Meu Senhor Jesus Cristo, aqui prostrado diante de Vós, presente no Santíssimo Sacramento, eu vos adoro com todo o meu ser. Agradeço-vos por permanecerdes conosco até o fim dos tempos. Ensinai-me a amar o silêncio da vossa presença mais do que o ruído do mundo. Amém.",
  },
  {
    slug: "oracao-de-santo-tomas-antes-da-missa",
    titulo: "Oração de Santo Tomás de Aquino antes da Missa",
    categoria: "Eucarísticas",
    nota: "Composta por Santo Tomás de Aquino para sua própria preparação antes de celebrar.",
    paraQue: "Pedir as virtudes necessárias para participar frutuosamente da Santa Missa.",
    quando: "Antes da Missa, sobretudo aos domingos.",
    texto:
      "Concedei-me, ó Deus de bondade, aproximar-me com pureza de coração deste admirável Sacramento, para que dele receba o remédio de salvação. Dai-me fé viva, esperança firme e caridade sincera, para que Cristo se torne a força da minha alma e o alimento no caminho para a pátria eterna. Amém.",
  },

  // ===== NOVAS: PENITENCIAIS =====
  {
    slug: "salmo-51-miserere",
    titulo: "Salmo 50/51 — Miserere",
    latim: "Miserere mei, Deus",
    categoria: "Penitenciais",
    nota: "O maior dos salmos penitenciais, atribuído a Davi após seu pecado com Betsabé (2Sm 11-12).",
    paraQue: "Suplicar perdão com contrição profunda diante de um pecado grave.",
    quando: "Na Quaresma, antes da Confissão e às sextas-feiras.",
    texto:
      "Tende piedade de mim, ó Deus, segundo a vossa grande misericórdia; conforme a imensidão de vossas graças, apagai a minha transgressão. Lavai-me completamente da minha culpa e purificai-me do meu pecado. Reconheço a minha transgressão e o meu pecado está sempre diante de mim. Criai em mim, ó Deus, um coração puro e renovai em mim um espírito firme. Não me expulseis da vossa face nem retireis de mim vosso Espírito Santo. Devolvei-me a alegria da vossa salvação e sustentai-me com espírito generoso. Amém.",
  },
  {
    slug: "salmos-penitenciais-sintese",
    titulo: "Síntese dos Sete Salmos Penitenciais",
    categoria: "Penitenciais",
    nota: "Tradição de rezar os Salmos 6, 31, 37, 50, 101, 129 e 142 juntos, muito usada na Idade Média.",
    paraQue: "Percorrer, em síntese, o itinerário bíblico do arrependimento e da confiança em Deus.",
    quando: "Na Quaresma e em retiros espirituais de penitência.",
    texto:
      "Senhor, não me repreendais na vossa ira (Sl 6). Bem-aventurado aquele cuja culpa é perdoada (Sl 31). Não me abandoneis no dia da vossa indignação (Sl 37). Tende piedade de mim, ó Deus (Sl 50). Ouvi, Senhor, a minha oração e chegue a Vós o meu clamor (Sl 101). Das profundezas clamo a Vós, Senhor (Sl 129). Ouvi depressa, Senhor, pois meu espírito desfalece (Sl 142). Em todos eles, uma só súplica: misericórdia e vida nova. Amém.",
  },
  {
    slug: "exame-de-consciencia",
    titulo: "Oração para o exame de consciência",
    categoria: "Penitenciais",
    paraQue: "Preparar-se seriamente para uma boa Confissão sacramental.",
    quando: "Antes de se confessar, de preferência na véspera.",
    texto:
      "Vinde, Espírito Santo, e iluminai minha consciência. Mostrai-me a verdade sobre mim mesmo, sem excessivo rigor nem falsa complacência. Ajudai-me a reconhecer meus pecados de pensamento, palavra, ação e omissão, para que eu os confesse com sinceridade e firme propósito de emenda. Amém.",
  },

  // ===== NOVAS: AOS SANTOS =====
  {
    slug: "sao-joao-paulo-ii",
    titulo: "A São João Paulo II",
    categoria: "Aos Santos",
    paraQue: "Pedir a intercessão do papa da Misericórdia Divina e da Juventude.",
    quando: "Na festa de 22 de outubro e para famílias e jovens.",
    texto:
      "São João Paulo II, que nos ensinastes a não ter medo de abrir as portas a Cristo: intercedei por nossas famílias, pelos jovens e pela Igreja inteira. Alcançai-nos a coragem da santidade no dia a dia e o amor à Virgem Maria, Totus Tuus, como foi o vosso. Amém.",
  },
  {
    slug: "santa-teresa-de-calcuta",
    titulo: "A Santa Teresa de Calcutá",
    categoria: "Aos Santos",
    paraQue: "Pedir amor concreto aos pobres e caridade nas pequenas ações do dia.",
    quando: "Na festa de 5 de setembro e ao servir os mais necessitados.",
    texto:
      "Santa Teresa de Calcutá, que reconhecestes o rosto de Cristo nos mais pobres entre os pobres: ensinai-me a servir sem esperar recompensa, a fazer pequenas coisas com grande amor e a nunca desviar o olhar de quem sofre. Amém.",
  },
  {
    slug: "santa-terezinha-oracao-simplicidade",
    titulo: "A Santa Teresinha (Caminhinho de confiança)",
    categoria: "Aos Santos",
    paraQue: "Aprender a espiritualidade da infância espiritual e da confiança total em Deus.",
    quando: "Nos dias de desânimo espiritual e escrúpulo.",
    texto:
      "Ó Santa Teresinha do Menino Jesus, que descobristes o pequeno caminho da confiança e do amor: ensinai-me a não me apoiar em minhas próprias forças, mas a lançar-me, como criança, nos braços de Deus, certo de que Ele suprirá o que me falta. Amém.",
  },
  {
    slug: "santo-expedito",
    titulo: "A Santo Expedito",
    categoria: "Aos Santos",
    paraQue: "Invocar o patrono das causas urgentes, sem substituir a paciência cristã pela pressa.",
    quando: "Diante de necessidades imediatas e prazos apertados.",
    texto:
      "Santo Expedito, venerado pela tradição popular como mártir e soldado de Cristo, que sempre respondestes prontamente ao chamado da fé: intercedei por esta minha necessidade urgente. Alcançai-me também a virtude de nunca adiar o bem que devo fazer hoje. Amém.",
  },
  {
    slug: "sao-francisco-de-assis-a",
    titulo: "A São Francisco de Assis",
    categoria: "Aos Santos",
    paraQue: "Pedir simplicidade, amor à criação e desapego dos bens materiais.",
    quando: "Na festa de 4 de outubro e no cuidado com a Casa Comum.",
    texto:
      "São Francisco de Assis, que abraçastes a Dama Pobreza e louvastes a Deus em todas as criaturas: ensinai-me a viver com simplicidade, a cuidar da criação como irmã e a encontrar em Cristo pobre e crucificado toda a minha riqueza. Amém.",
  },

  // ===== CÂNTICOS EVANGÉLICOS E HINOS ANTIGOS =====
  {
    slug: "magnificat",
    titulo: "Cântico de Maria",
    latim: "Magnificat",
    categoria: "Marianas",
    nota: "Cântico de Maria em Lc 1, 46-55, rezado todos os dias nas Vésperas da Liturgia das Horas.",
    paraQue: "Louvar a Deus reconhecendo suas obras nos humildes.",
    quando: "Ao fim da tarde, com a Igreja, nas Vésperas.",
    texto:
      "A minha alma engrandece o Senhor e o meu espírito se alegra em Deus, meu Salvador, porque olhou para a humildade de sua serva: desde agora todas as gerações me chamarão bem-aventurada. O Todo-Poderoso realizou em mim maravilhas, e santo é o seu nome. Sua misericórdia se estende de geração em geração sobre todos os que o temem. Manifestou o poder de seu braço, dispersou os soberbos. Derrubou os poderosos de seus tronos e elevou os humildes. Saciou de bens os famintos e despediu os ricos de mãos vazias. Acolheu Israel, seu servo, lembrando-se de sua misericórdia, como havia prometido a nossos pais, em favor de Abraão e de seus filhos, para sempre. Amém.",
  },
  {
    slug: "benedictus",
    titulo: "Cântico de Zacarias",
    latim: "Benedictus",
    categoria: "Diárias",
    nota: "Cântico de Zacarias em Lc 1, 68-79, rezado cada manhã nas Laudes.",
    paraQue: "Começar o dia agradecendo a visita salvadora de Deus.",
    quando: "De manhã, ao despertar.",
    texto:
      "Bendito seja o Senhor, Deus de Israel, que visitou e redimiu o seu povo, e nos deu um Salvador poderoso na casa de Davi, seu servo, como havia anunciado pela boca de seus santos profetas: que nos salvaria de nossos inimigos e de todos os que nos odeiam, para mostrar sua misericórdia a nossos pais, lembrando de sua santa aliança e do juramento que fez a Abraão, nosso pai, de nos conceder que, libertados de nossos inimigos, sem temor o sirvamos em santidade e justiça, na sua presença, todos os dias de nossa vida. E tu, menino, serás chamado profeta do Altíssimo, pois irás adiante do Senhor preparando os seus caminhos, para dar ao povo o conhecimento da salvação e o perdão de todos os pecados. É a ternura do coração de nosso Deus que nos visita como sol que nasce do alto, para iluminar os que jazem nas trevas e na sombra da morte e dirigir nossos passos no caminho da paz. Amém.",
  },
  {
    slug: "nunc-dimittis",
    titulo: "Cântico de Simeão",
    latim: "Nunc dimittis",
    categoria: "Diárias",
    nota: "Cântico de Simeão em Lc 2, 29-32, rezado cada noite nas Completas.",
    paraQue: "Entregar o dia terminado nas mãos de Deus e preparar-se para o descanso.",
    quando: "Antes de dormir.",
    texto:
      "Agora, Senhor, podes despedir em paz o teu servo, porque cumpriste a tua palavra: os meus olhos viram a tua salvação, que preparaste diante de todos os povos — luz para iluminar as nações e glória do teu povo Israel. Amém.",
  },
  {
    slug: "te-deum",
    titulo: "Hino de louvor e ação de graças",
    latim: "Te Deum laudamus",
    categoria: "Fundamentais",
    nota: "Hino latino do século IV, entoado pela Igreja em ações de graças solenes e no fim do ano civil.",
    paraQue: "Agradecer solenemente um bem recebido, pessoal ou comunitário.",
    quando: "Em aniversários, no último dia do ano e em toda ocasião de gratidão pública.",
    texto:
      "A vós, ó Deus, louvamos; a vós, Senhor, confessamos. A vós, Pai eterno, adora toda a terra. A vós cantam os anjos e todas as potestades dos céus: Santo, Santo, Santo é o Senhor, Deus do universo. Os céus e a terra estão cheios da majestade de vossa glória. A vós louva o coro glorioso dos Apóstolos, a multidão admirável dos Profetas, o exército radiante dos Mártires; a vós proclama por toda a terra a santa Igreja. Vós sois o Rei da glória, ó Cristo, Filho eterno do Pai. Para libertar o homem não hesitastes em nascer da Virgem. Vencido o aguilhão da morte, abristes aos que creem o Reino dos céus. Salvai, Senhor, o vosso povo e abençoai a vossa herança. Guiai-nos e conduzi-nos à glória eterna. Dia por dia vos bendizemos e louvamos vosso nome para sempre. Em vós, Senhor, esperei: não serei confundido eternamente. Amém.",
  },
  {
    slug: "ave-maris-stella",
    titulo: "Ave, estrela do mar",
    latim: "Ave maris stella",
    categoria: "Marianas",
    nota: "Hino mariano latino atestado desde o século IX, próprio das Vésperas nas festas de Nossa Senhora.",
    paraQue: "Pedir a Maria orientação segura nas travessias difíceis da vida.",
    quando: "Nas festas marianas e em tempos de incerteza.",
    texto:
      "Ave, estrela do mar, augusta Mãe de Deus e sempre Virgem, feliz porta do céu. Recebendo aquele Ave da boca de Gabriel, restabelece-nos na paz, mudando o nome de Eva. Rompe as cadeias dos culpados, traz luz aos cegos, afasta os nossos males e alcança-nos todo bem. Mostra que és Mãe: leve por ti as nossas preces aquele que, nascendo por nós, quis ser teu Filho. Virgem sem igual, mansa acima de todas, torna-nos livres de culpa, mansos e castos. Concede-nos vida pura, prepara-nos caminho seguro, para que, vendo Jesus, para sempre nos alegremos. Louvor a Deus Pai, glória a Cristo Altíssimo e ao Espírito Santo: aos três, uma só honra. Amém.",
  },
  {
    slug: "stabat-mater",
    titulo: "Estava a Mãe ao pé da cruz",
    latim: "Stabat Mater dolorosa",
    categoria: "Marianas",
    nota: "Sequência medieval, atribuída ao franciscano Jacopone da Todi (século XIII), usada na memória de Nossa Senhora das Dores e na Via-Sacra.",
    paraQue: "Unir a própria dor à compaixão de Maria junto à cruz.",
    quando: "Nas sextas-feiras da Quaresma, na Via-Sacra e em 15 de setembro.",
    texto:
      "Estava a Mãe dolorosa, em lágrimas, junto à cruz onde pendia o seu Filho. Sua alma, gemendo, entristecida e aflita, foi atravessada pela espada. Ó quão triste e afligida esteve aquela bendita Mãe do Unigênito, que sofria e tremia ao contemplar as penas de seu Filho glorioso! Que homem não choraria ao ver a Mãe de Cristo em tamanha desolação? Ó Mãe, fonte de amor, faz-me sentir a força da tua dor, para que contigo eu chore. Faz que meu coração arda no amor de Cristo, meu Deus, para que eu lhe seja agradável. Santa Mãe, imprime em meu coração as feridas do Crucificado. Faz-me chorar contigo e compadecer-me do Crucificado enquanto eu viver. Quando meu corpo morrer, dá-me, por tua Mãe, ó Cristo, a palma da vitória. Amém.",
  },
  {
    slug: "pange-lingua",
    titulo: "Canta, ó língua, o mistério",
    latim: "Pange lingua gloriosi",
    categoria: "Eucarísticas",
    nota: "Hino de Santo Tomás de Aquino (1264) para a festa de Corpus Christi; suas duas últimas estrofes formam o Tantum ergo.",
    paraQue: "Professar a fé na presença real de Cristo na Eucaristia.",
    quando: "Na procissão de Corpus Christi e na exposição do Santíssimo.",
    texto:
      "Canta, ó língua, o mistério do Corpo glorioso e do Sangue precioso, que o Rei das nações, fruto de nobre ventre, derramou como preço do mundo. Dado a nós, nascido para nós da Virgem sem mácula, viveu no mundo semeando a palavra e encerrou de modo admirável o tempo de sua morada. Na noite da última ceia, sentado com os irmãos, cumprida plenamente a lei antiga, deu-se em alimento com as próprias mãos aos doze. O Verbo feito carne faz do pão verdadeira carne, e o vinho torna-se sangue de Cristo; se o sentido não alcança, basta a fé para confirmar o coração sincero. Adoremos, prostrados, tão grande sacramento; ceda o rito antigo ao novo, e a fé supra o que os sentidos não podem ver. Ao Pai e ao Filho seja louvor e júbilo, saúde, honra, poder e bênção; e ao que de ambos procede, igual louvor. Amém.",
  },
  {
    slug: "o-salutaris-hostia",
    titulo: "Ó salutar Hóstia",
    latim: "O salutaris Hostia",
    categoria: "Eucarísticas",
    nota: "Últimas estrofes do hino Verbum supernum prodiens, de Santo Tomás de Aquino, cantadas na exposição do Santíssimo.",
    paraQue: "Adorar Cristo Eucarístico e pedir força na luta espiritual.",
    quando: "No início da adoração ao Santíssimo Sacramento.",
    texto:
      "Ó salutar Hóstia, que abris a porta do céu: as guerras nos assaltam, dai-nos força, trazei auxílio. Ao Senhor uno e trino seja glória sempiterna; que ele nos dê na pátria a vida sem fim. Amém.",
  },
  {
    slug: "panis-angelicus",
    titulo: "Pão dos anjos",
    latim: "Panis angelicus",
    categoria: "Eucarísticas",
    nota: "Estrofes do hino Sacris solemniis, de Santo Tomás de Aquino, para o Ofício de Corpus Christi.",
    paraQue: "Admirar-se de que Deus se faça alimento dos pobres e pequenos.",
    quando: "Na ação de graças depois da comunhão.",
    texto:
      "O pão dos anjos torna-se pão dos homens; o pão do céu põe fim às figuras antigas. Ó realidade admirável: come o Senhor o servo pobre, humilde e pequeno. A vós, Deus uno e trino, nós pedimos: visitai-nos, como vos adoramos; conduzi-nos por vossos caminhos até a luz que habitais. Amém.",
  },
  {
    slug: "ave-verum-corpus",
    titulo: "Ave, verdadeiro Corpo",
    latim: "Ave verum Corpus",
    categoria: "Eucarísticas",
    nota: "Antífona eucarística do século XIV, tradicionalmente rezada na elevação e na comunhão.",
    paraQue: "Adorar o Corpo nascido de Maria e imolado na cruz.",
    quando: "Na elevação da Hóstia e depois de comungar.",
    texto:
      "Ave, verdadeiro Corpo nascido da Virgem Maria, que verdadeiramente padecestes e fostes imolado na cruz pelo homem; de cujo lado transpassado correu água e sangue: sede nosso alimento na provação da morte. Ó Jesus doce, ó Jesus piedoso, ó Jesus, Filho de Maria, tende piedade de mim. Amém.",
  },
  {
    slug: "jesus-eu-confio-em-vos",
    titulo: "Invocação da Divina Misericórdia",
    categoria: "Penitenciais",
    nota: "Jaculatória ligada à devoção difundida por Santa Faustina Kowalska e aprovada pela Igreja.",
    paraQue: "Renovar a confiança na misericórdia divina em momentos de angústia ou culpa.",
    quando: "Às três da tarde, hora da morte do Senhor, e sempre que faltar a paz.",
    texto:
      "Ó Sangue e Água que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós. Jesus, eu confio em Vós. Jesus, eu confio em Vós. Jesus, eu confio em Vós. Amém.",
  },
  {
    slug: "oracao-de-fatima-do-rosario",
    titulo: "Oração de Fátima",
    categoria: "Marianas",
    nota: "Oração transmitida pelos pastorinhos de Fátima em 1917 e habitualmente rezada ao fim de cada mistério do Rosário.",
    paraQue: "Pedir perdão pelos pecados e a salvação de todos.",
    quando: "Ao final de cada dezena do Rosário.",
    texto:
      "Ó meu Jesus, perdoai-nos e livrai-nos do fogo do inferno; levai as almas todas para o céu, principalmente as que mais precisarem de vossa misericórdia. Amém.",
  },
  {
    slug: "tres-ave-marias",
    titulo: "As três Ave-Marias",
    categoria: "Marianas",
    nota: "Prática devocional difundida a partir da Idade Média, recomendada por vários santos, em honra do poder, da sabedoria e da misericórdia recebidos por Maria.",
    paraQue: "Pedir a Maria a graça de conservar a pureza de vida ao longo do dia.",
    quando: "De manhã ao levantar e à noite antes de dormir.",
    texto:
      "Ó minha Senhora e minha Mãe, eu me ofereço todo a vós e, em prova de minha devoção, consagro-vos hoje meus olhos, meus ouvidos, minha boca, meu coração e todo o meu ser. Já que sou vosso, boa Mãe, guardai-me e defendei-me como coisa e propriedade vossa. Rezam-se então três Ave-Marias, pedindo pureza de corpo e de alma.",
  },
  {
    slug: "salmo-23",
    titulo: "O Senhor é meu pastor (Salmo 22/23)",
    categoria: "Diárias",
    nota: "Salmo davídico, um dos mais rezados pelos cristãos desde a antiguidade.",
    paraQue: "Recobrar confiança quando falta segurança ou direção.",
    quando: "Em momentos de medo, doença ou luto.",
    texto:
      "O Senhor é o meu pastor, nada me faltará. Em verdes pastagens me faz repousar, conduz-me a águas tranquilas e restaura as minhas forças. Guia-me pelos caminhos retos, por amor do seu nome. Ainda que eu atravesse o vale escuro, nada temerei, porque estás comigo: teu bordão e teu cajado me dão segurança. Preparas para mim uma mesa à vista de meus adversários, unges com óleo a minha cabeça, e minha taça transborda. Bondade e fidelidade me acompanharão todos os dias da minha vida, e habitarei na casa do Senhor por longos anos. Amém.",
  },
  {
    slug: "salmo-91",
    titulo: "Quem habita à sombra do Altíssimo (Salmo 90/91)",
    categoria: "Proteção",
    nota: "Salmo de confiança, rezado pela Igreja nas Completas do domingo.",
    paraQue: "Pedir proteção contra todo perigo do corpo e da alma.",
    quando: "Antes de dormir e em tempos de ameaça ou temor.",
    texto:
      "Quem habita à sombra do Altíssimo e mora à proteção do Onipotente diz ao Senhor: sois meu refúgio e minha cidadela, meu Deus, em quem confio. Ele te livrará do laço do caçador e da peste destruidora. Sob suas asas encontrarás refúgio, e sua fidelidade será teu escudo. Não temerás o terror da noite, nem a flecha que voa de dia. Nenhum mal te atingirá, porque ele deu ordem a seus anjos para que te guardem em todos os teus caminhos. Porque esperaste em mim, eu te salvarei; ao invocar meu nome, eu te responderei: estarei contigo na tribulação e te mostrarei a minha salvação. Amém.",
  },
  {
    slug: "ladainha-do-espirito-santo",
    titulo: "Ladainha do Espírito Santo",
    categoria: "Litanias",
    nota: "Ladainha de uso devocional aprovada para a piedade popular, rezada especialmente na novena de Pentecostes.",
    paraQue: "Invocar os dons do Espírito Santo sobre a própria vida e sobre a Igreja.",
    quando: "Entre a Ascensão e Pentecostes e antes de decisões importantes.",
    texto:
      "Senhor, tende piedade de nós. Cristo, tende piedade de nós. Senhor, tende piedade de nós. Espírito Santo, que procedeis do Pai e do Filho, — vinde a nós. Espírito do Senhor, que enchestes o mundo desde o princípio, — vinde a nós. Espírito de sabedoria e de entendimento, — vinde a nós. Espírito de conselho e de fortaleza, — vinde a nós. Espírito de ciência e de piedade, — vinde a nós. Espírito de temor do Senhor, — vinde a nós. Espírito de verdade, que nos guiais à verdade plena, — vinde a nós. Espírito consolador dos aflitos, — vinde a nós. Espírito que intercedeis por nós com gemidos inefáveis, — vinde a nós. Espírito de caridade derramado em nossos corações, — vinde a nós. Cordeiro de Deus, que tirais o pecado do mundo, enviai-nos o vosso Espírito. Amém.",
  },
  {
    slug: "ladainha-do-santissimo-nome-de-jesus",
    titulo: "Ladainha do Santíssimo Nome de Jesus",
    categoria: "Litanias",
    nota: "Ladainha de origem medieval, ligada à pregação de São Bernardino de Sena, aprovada para o culto público em 1886.",
    paraQue: "Adorar o nome de Jesus, único em que há salvação.",
    quando: "No mês de janeiro e em tempos de tentação.",
    texto:
      "Senhor, tende piedade de nós. Cristo, tende piedade de nós. Senhor, tende piedade de nós. Jesus, ouvi-nos. Jesus, atendei-nos. Jesus, Filho de Deus vivo, — tende piedade de nós. Jesus, esplendor do Pai, — tende piedade de nós. Jesus, rei da glória, — tende piedade de nós. Jesus, sol de justiça, — tende piedade de nós. Jesus, Filho da Virgem Maria, — tende piedade de nós. Jesus admirável, — tende piedade de nós. Jesus, Deus forte, — tende piedade de nós. Jesus, pai do século futuro, — tende piedade de nós. Jesus, pacientíssimo, — tende piedade de nós. Jesus, obedientíssimo, — tende piedade de nós. Jesus, manso e humilde de coração, — tende piedade de nós. Jesus, amante da castidade, — tende piedade de nós. Jesus, refúgio dos pobres, — tende piedade de nós. Jesus, bom pastor, — tende piedade de nós. Jesus, nossa vida e ressurreição, — tende piedade de nós. Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós. Amém.",
  },
  {
    slug: "oracao-pelos-sacerdotes",
    titulo: "Oração pelos sacerdotes",
    categoria: "Ocasiões",
    paraQue: "Sustentar com a oração os que administram os sacramentos.",
    quando: "Nas quintas-feiras, dia da instituição do sacerdócio, e na Missa.",
    texto:
      "Senhor Jesus, sumo e eterno Sacerdote, guardai os vossos sacerdotes na proteção de vosso Coração. Conservai puras as suas mãos que tocam cada dia o vosso Corpo santíssimo, puros os seus lábios que anunciam a vossa palavra, puro e desprendido o seu coração, marcado com o selo do vosso sacerdócio. Fazei que cresçam no amor por vós e afastai deles o contágio do mundo. Dai-lhes, com o poder de transformar o pão e o vinho, a força de transformar corações. Abençoai os seus trabalhos e conduzi-os um dia ao rebanho eterno. Amém.",
  },
  {
    slug: "oracao-pelos-governantes",
    titulo: "Oração pelos governantes",
    categoria: "Ocasiões",
    nota: "Responde à recomendação de 1Tm 2, 1-2, de orar por reis e por todos os que exercem autoridade.",
    paraQue: "Pedir retidão, prudência e serviço ao bem comum a quem governa.",
    quando: "Em tempos de eleição, crise pública ou decisões que afetam muitos.",
    texto:
      "Ó Deus, de quem procede toda autoridade legítima, iluminai os que governam a nossa nação: dai-lhes retidão de intenção, coragem para servir o bem comum, respeito pela vida e pela dignidade de cada pessoa e desprendimento de todo interesse próprio. Livrai-nos da violência, da corrupção e da mentira, e concedei ao nosso povo a paz que nasce da justiça. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "oracao-pelos-migrantes",
    titulo: "Oração pelos migrantes e refugiados",
    categoria: "Ocasiões",
    paraQue: "Interceder por quem deixou a própria terra em busca de vida e segurança.",
    quando: "No Dia Mundial do Migrante e do Refugiado e ao acolher alguém de fora.",
    texto:
      "Senhor Jesus, que fostes menino refugiado no Egito com Maria e José, olhai por todos os que hoje deixam sua terra por causa da guerra, da fome ou da perseguição. Guardai-os nos caminhos perigosos, reuni as famílias separadas, consolai os que perderam alguém e abri em nós o coração para acolher sem medo. Que ninguém seja tratado como estrangeiro na casa do Pai. Amém.",
  },
  {
    slug: "oracao-pelo-batismo-de-um-filho",
    titulo: "Oração pelo batismo de um filho",
    categoria: "Ocasiões",
    paraQue: "Agradecer o dom do batismo e assumir a responsabilidade da educação na fé.",
    quando: "No dia do batismo e em cada aniversário dele.",
    texto:
      "Pai santo, que pelo batismo tornastes este filho vossa criatura nova e membro de vossa Igreja, dai-nos a graça de sermos, para ele, os primeiros mestres da fé. Que nossa casa lhe ensine a rezar, nossa palavra lhe mostre a verdade e nossa vida lhe torne crível o Evangelho. Guardai nele a veste branca da graça até o dia em que vos contemple face a face. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "bencao-da-casa",
    titulo: "Bênção da casa",
    categoria: "Ocasiões",
    nota: "Fórmula de bênção que qualquer fiel pode rezar; a bênção solene com aspersão pertence ao ministro ordenado, conforme o Ritual.",
    paraQue: "Colocar o lar sob a proteção de Deus.",
    quando: "Na mudança para uma nova casa e no tempo do Natal e da Epifania.",
    texto:
      "Senhor Deus, visitai esta casa e afastai dela todas as ciladas do inimigo. Habitem aqui os vossos anjos, que nos guardem em paz, e desça sobre nós, sobre esta família e sobre tudo o que aqui vivemos a vossa bênção. Fazei desta casa lugar de perdão, de trabalho honesto, de acolhida ao visitante e de oração. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "oracao-do-casal",
    titulo: "Oração dos esposos",
    categoria: "Ocasiões",
    paraQue: "Pedir fidelidade, paciência e alegria na vida conjugal.",
    quando: "No aniversário de casamento e à noite, juntos.",
    texto:
      "Senhor, que quisestes elevar a união dos esposos à dignidade de sacramento, dai-nos amar-nos como vós amais a vossa Igreja. Ensinai-nos a pedir perdão antes que a noite caia, a guardar a confiança que nos une, a carregar juntos o que é pesado e a repartir juntos o que é bom. Que nosso amor seja fiel na saúde e na doença, fecundo em obras de caridade e sinal visível da vossa fidelidade. Amém.",
  },
  {
    slug: "oracao-pela-conversao-dos-pecadores",
    titulo: "Oração pela conversão dos pecadores",
    categoria: "Penitenciais",
    paraQue: "Interceder por quem se afastou de Deus, inclusive por si mesmo.",
    quando: "Na Quaresma, nas sextas-feiras e ao rezar por alguém amado que se afastou.",
    texto:
      "Ó Deus, que não quereis a morte do pecador, mas que se converta e viva, olhai com misericórdia todos os que hoje estão longe de vós — e primeiro a mim. Tocai os corações endurecidos, devolvei a esperança aos que se julgam perdidos, dai coragem aos que temem confessar-se e sustentai os que recomeçam. Que ninguém morra sem ter conhecido a vossa misericórdia. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "oracao-de-santo-agostinho-tarde-te-amei",
    titulo: "Tarde vos amei — Santo Agostinho",
    categoria: "Fundamentais",
    nota: "Passagem das Confissões (livro X, 27), obra do século IV, em domínio público.",
    paraQue: "Reconhecer que Deus antecede todas as nossas buscas.",
    quando: "Na oração pessoal e depois da confissão.",
    texto:
      "Tarde vos amei, ó beleza tão antiga e tão nova, tarde vos amei! Eis que estáveis dentro de mim e eu estava fora, e fora vos procurava; deformado, lançava-me sobre as coisas belas que criastes. Estáveis comigo e eu não estava convosco. Retinham-me longe de vós as coisas que não existiriam se não existissem em vós. Chamastes e clamastes, e rompestes a minha surdez; brilhastes e dissipastes a minha cegueira; exalastes o vosso perfume e eu respirei, e agora suspiro por vós. Tocastes-me, e ardi de desejo da vossa paz. Amém.",
  },
  {
    slug: "oracao-de-sao-tomas-pelo-estudo",
    titulo: "Oração do estudante — Santo Tomás de Aquino",
    latim: "Creator ineffabilis",
    categoria: "Ocasiões",
    nota: "Oração atribuída a Santo Tomás de Aquino, tradicionalmente rezada antes do estudo.",
    paraQue: "Pedir luz para compreender e retidão para usar bem o que se aprende.",
    quando: "Antes de estudar, escrever ou ensinar.",
    texto:
      "Criador inefável, que dos tesouros de vossa sabedoria constituístes as ordens dos anjos e dispusestes admiravelmente o universo: vós que sois chamado a verdadeira fonte da luz e da sabedoria, dignai-vos infundir sobre a escuridão do meu entendimento um raio de vossa claridade. Dai-me agudeza para compreender, capacidade para retermos, método e facilidade para aprender, sutileza para interpretar e graça abundante para falar. Guiai o início do meu trabalho, orientai o seu progresso e coroai o seu fim. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "oracao-de-newman-pela-luz",
    titulo: "Conduz-me, luz benigna — São John Henry Newman",
    categoria: "Fundamentais",
    nota: "Versão em prosa do poema Lead, Kindly Light (1833), de São John Henry Newman; texto em domínio público.",
    paraQue: "Pedir a Deus o passo seguinte quando o caminho inteiro não se vê.",
    quando: "Em decisões difíceis e em tempos de escuridão interior.",
    texto:
      "Conduz-me, luz benigna, entre a treva que me cerca: conduz-me tu adiante. Não peço ver o horizonte distante; basta-me um passo. Não fui sempre assim, nem sempre rezei que me conduzisses: escolhia e via o meu caminho; mas agora, conduz-me tu. Amava o dia brilhante e, apesar do temor, o orgulho governava a minha vontade: não te lembres dos anos passados. Tanto tempo tua bondade me abençoou: ela me conduzirá ainda, por charneca e pântano, por rocha e torrente, até que a noite passe e amanheçam os rostos dos anjos que amei e perdi por um tempo. Amém.",
  },
  {
    slug: "sao-cristovao",
    titulo: "A São Cristóvão",
    categoria: "Aos Santos",
    nota: "Mártir de culto antigo no Oriente; os episódios sobre a travessia do rio pertencem à tradição hagiográfica medieval.",
    paraQue: "Pedir proteção nas estradas e prudência no volante.",
    quando: "Antes de viagens e no dia 25 de julho.",
    texto:
      "Glorioso São Cristóvão, que carregastes Cristo no caminho, alcançai-nos das mãos de Deus prudência e serenidade nas estradas. Guardai-nos dos acidentes, dos excessos e da pressa que mata; que nossa viagem não traga dano a ninguém e que Cristo, verdadeiro peso e verdadeira alegria, seja levado por nós a toda parte. Amém.",
  },
  {
    slug: "sao-sebastiao",
    titulo: "A São Sebastião",
    categoria: "Aos Santos",
    nota: "Mártir romano do século III, mencionado na Depositio martyrum de 354; padroeiro do Rio de Janeiro.",
    paraQue: "Pedir fortaleza na perseguição e proteção contra pestes e violências.",
    quando: "Em 20 de janeiro e em tempos de epidemia ou insegurança.",
    texto:
      "Ó glorioso São Sebastião, soldado de Cristo, que preferistes as flechas dos homens à traição da fé: alcançai-nos coragem para confessar o Evangelho no meio hostil, paciência na dor e fortaleza nas provações. Defendei nossa cidade das pestes, das guerras e da violência, e obtende-nos a graça de perseverar até o fim. Amém.",
  },
  {
    slug: "santa-luzia",
    titulo: "A Santa Luzia",
    categoria: "Aos Santos",
    nota: "Mártir de Siracusa venerada desde o século IV e nomeada no Canon Romano.",
    paraQue: "Pedir a saúde dos olhos e a luz interior da fé.",
    quando: "Em 13 de dezembro e em doenças da visão.",
    texto:
      "Santa Luzia, virgem e mártir, que ofereceste a vida antes que a luz da fé: obtende-nos a saúde dos olhos do corpo e, sobretudo, a clareza dos olhos da alma, para vermos o bem e escolhê-lo. Iluminai os que caminham na escuridão da dúvida e sustentai os que perdem a vista. Amém.",
  },
  {
    slug: "oracao-pela-patria",
    titulo: "Oração pela pátria",
    categoria: "Ocasiões",
    paraQue: "Confiar a Deus a vida do próprio povo.",
    quando: "Em datas nacionais e em tempos de divisão social.",
    texto:
      "Senhor, Deus de todas as nações, abençoai o nosso país. Curai as suas feridas de desigualdade e violência, dai pão e trabalho a quem falta, escola às crianças, cuidado aos doentes e voz aos esquecidos. Reconciliai os que a política dividiu, sustentai os que servem com honestidade e fazei-nos um povo de irmãos, capaz de reconhecer em cada rosto a vossa imagem. Por Cristo, nosso Senhor. Amém.",
  },
];


export function oracoesPorCategoria(categoria: CategoriaOracao): Oracao[] {
  return ORACOES.filter((o) => o.categoria === categoria);
}
