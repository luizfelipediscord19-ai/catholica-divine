/**
 * Acervo de orações tradicionais da Igreja Católica.
 * Textos em português (uso corrente no Brasil) e, quando clássicos, o incipit latino.
 */

export type CategoriaOracao =
  | "Fundamentais"
  | "Marianas"
  | "Ao Espírito Santo"
  | "Eucarísticas"
  | "Penitenciais"
  | "Proteção"
  | "Diárias"
  | "Defuntos";

export type Oracao = {
  slug: string;
  titulo: string;
  latim?: string;
  categoria: CategoriaOracao;
  /** Contexto histórico/litúrgico em uma frase. */
  nota?: string;
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
  "Defuntos",
];

export const ORACOES: Oracao[] = [
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
    nota: "A mais antiga oração mariana conhecida (papiro egípcio do séc. III).",
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
    nota: "Composta por Leão XIII em 1886, após uma visão sobre as provações da Igreja.",
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
];

export function oracoesPorCategoria(categoria: CategoriaOracao): Oracao[] {
  return ORACOES.filter((o) => o.categoria === categoria);
}
