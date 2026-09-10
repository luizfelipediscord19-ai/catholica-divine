/**
 * Orações acrescentadas ao acervo principal (ver oracoes.ts).
 *
 * VERACIDADE: textos de domínio público (orações tradicionais latinas em
 * tradução própria, orações compostas por santos falecidos há mais de
 * setenta anos) ou redação própria do portal quando indicado na nota.
 * Nenhuma tradução litúrgica protegida é reproduzida.
 */

import type { Oracao } from "./oracoes";

export const ORACOES_ADICIONAIS: Oracao[] = [
  // ===== FUNDAMENTAIS =====
  {
    slug: "oferecimento-do-dia",
    titulo: "Oferecimento do dia",
    categoria: "Fundamentais",
    nota: "Fórmula difundida pelo Apostolado da Oração no séc. XIX; redação própria do portal.",
    paraQue: "Colocar cada trabalho, alegria e dor do dia dentro do sacrifício de Cristo.",
    quando: "Ao acordar, antes de qualquer tarefa.",
    texto:
      "Senhor Jesus, no começo deste dia eu vos ofereço tudo o que ele trouxer: o meu trabalho e o meu descanso, as pessoas que vou encontrar, o que me alegrar e o que me pesar. Unido ao vosso sacrifício, que nada seja perdido: nem o cansaço, nem o silêncio, nem a espera. Dai-me fazer bem as coisas pequenas e recomeçar sem tristeza quando eu falhar. Amém.",
  },
  {
    slug: "ato-de-humildade",
    titulo: "Ato de humildade",
    categoria: "Fundamentais",
    nota: "Redação própria a partir de temas clássicos da tradição espiritual (Lc 18,13).",
    paraQue: "Pedir a verdade sobre si mesmo, sem desespero nem vaidade.",
    quando: "Antes da confissão, ou depois de uma humilhação.",
    texto:
      "Meu Deus, sei o que sou e não me assusto, porque também sei quem sois. Não me deixeis medir-me pelos outros nem pela opinião que fazem de mim. Tirai de mim a pressa de aparecer, o gosto de ter razão e o medo de ser pequeno. Ensinai-me a servir sem ser visto e a ser corrigido sem me defender. Tende compaixão de mim, que sou pecador. Amém.",
  },
  {
    slug: "oracao-pela-perseveranca",
    titulo: "Oração pela perseverança final",
    categoria: "Fundamentais",
    nota: "Tema constante da tradição católica: a perseverança é dom, não conquista (Concílio de Trento, ses. VI).",
    paraQue: "Pedir a graça de morrer na amizade de Deus.",
    quando: "Ao fim do dia e nas doenças.",
    texto:
      "Deus fiel, dai-me a graça de perseverar até o fim. Não permitais que eu me afaste de vós por cansaço, por hábito ou por orgulho. Se eu cair, dai-me pressa em voltar; se eu esfriar, reacendei-me; se eu adoecer, sustentai-me. E na última hora, quando as forças e as palavras me faltarem, seja o vosso nome o último que eu pronuncie. Amém.",
  },

  // ===== MARIANAS =====
  {
    slug: "ave-maris-stella",
    titulo: "Ave, Estrela do Mar",
    latim: "Ave maris stella",
    categoria: "Marianas",
    nota: "Hino latino do séc. IX, usado nas Vésperas marianas; tradução própria em prosa.",
    paraQue: "Pedir a proteção de Maria em travessias difíceis.",
    quando: "Em viagens, mudanças e tempos de incerteza.",
    texto:
      "Salve, Estrela do mar, Mãe santa de Deus e sempre Virgem, porta feliz do céu. Recebendo aquele Ave dos lábios de Gabriel, firmai-nos na paz e desfazei o nome de Eva. Rompei as cadeias dos culpados, dai luz aos cegos, afastai de nós os males e alcançai-nos todos os bens. Mostrai-vos Mãe: aquele que por nós se fez vosso Filho acolha por vós as nossas preces. Virgem única entre todas, mansa acima de todas, livrai-nos das culpas e fazei-nos mansos e castos. Dai-nos vida pura, preparai um caminho seguro, para que, vendo Jesus, nos alegremos para sempre. Louvor a Deus Pai, glória a Cristo Altíssimo e ao Espírito Santo: aos três, uma só honra. Amém.",
  },
  {
    slug: "alma-redemptoris-mater",
    titulo: "Ó Mãe Redentora",
    latim: "Alma Redemptoris Mater",
    categoria: "Marianas",
    nota: "Antífona mariana do tempo do Advento e do Natal, atribuída ao séc. XI; tradução própria.",
    paraQue: "Rezar com a Igreja no tempo da espera do Natal.",
    quando: "Do primeiro domingo do Advento até a Apresentação do Senhor.",
    texto:
      "Ó Mãe do Redentor, que continuas a ser porta aberta do céu e estrela do mar, socorre o povo que cai e quer levantar-se. Tu que, no assombro de toda a criação, geraste o teu Criador, permanecendo Virgem antes e depois de receber do anjo aquele Ave: tem piedade de nós, pecadores. Amém.",
  },
  {
    slug: "ave-regina-caelorum",
    titulo: "Salve, Rainha dos Céus",
    latim: "Ave, Regina caelorum",
    categoria: "Marianas",
    nota: "Antífona mariana usada da Apresentação do Senhor à Quaresma; tradução própria.",
    paraQue: "Honrar Maria como raiz e porta da salvação.",
    quando: "No tempo comum de fevereiro e na Quaresma, ao fim do dia.",
    texto:
      "Salve, Rainha dos céus, salve, Senhora dos anjos, raiz santa e porta pela qual a luz nasceu para o mundo. Alegra-te, Virgem gloriosa, bela acima de todas: salve, ó cheia de beleza, e roga a Cristo por nós. Amém.",
  },
  {
    slug: "regina-caeli",
    titulo: "Rainha do Céu, alegrai-vos",
    latim: "Regina caeli",
    categoria: "Marianas",
    nota: "Antífona pascal que substitui o Angelus no tempo da Páscoa; tradução própria.",
    paraQue: "Unir-se à alegria de Maria pela Ressurreição.",
    quando: "Do Domingo de Páscoa a Pentecostes, em lugar do Angelus.",
    texto:
      "Rainha do céu, alegrai-vos, aleluia! Porque aquele que merecestes trazer em vosso seio, aleluia, ressuscitou como havia dito, aleluia. Rogai por nós a Deus, aleluia. Alegrai-vos e exultai, ó Virgem Maria, aleluia, porque o Senhor ressuscitou verdadeiramente, aleluia. Ó Deus, que vos alegrais em dar ao mundo a vida pela ressurreição de vosso Filho, concedei-nos, pela intercessão da Virgem Maria, alcançar as alegrias da vida eterna. Por Cristo, nosso Senhor. Amém.",
  },
  {
    slug: "tres-ave-marias",
    titulo: "As três Ave-Marias",
    categoria: "Marianas",
    nota: "Prática difundida por Santo Antônio Maria Claret e por São Leonardo de Porto Maurício.",
    paraQue: "Pedir a pureza do corpo e da alma sob a proteção de Maria.",
    quando: "Ao levantar e ao deitar, três Ave-Marias com esta jaculatória final.",
    texto:
      "Três vezes: Ave, Maria, cheia de graça, o Senhor é contigo; bendita és tu entre as mulheres e bendito é o fruto do teu ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém. Ao fim: Por vossa Imaculada Conceição, ó Maria, guardai puro o meu corpo e santa a minha alma.",
  },
  {
    slug: "oracao-nossa-senhora-do-carmo",
    titulo: "Oração a Nossa Senhora do Carmo",
    categoria: "Marianas",
    nota: "Devoção carmelita ligada ao escapulário; redação própria do portal. A promessa do escapulário é tradição devocional, não dogma.",
    paraQue: "Pedir proteção materna e fidelidade até a morte.",
    quando: "Na festa de 16 de julho e ao vestir o escapulário.",
    texto:
      "Ó Virgem do Carmo, flor do Carmelo, vinha florida, esplendor do céu, Mãe daquele que é o Filho e permanece Virgem: olhai por mim. Vestindo o vosso escapulário, quero vestir a vossa fidelidade e a vossa pureza de coração. Guardai a minha casa, sustentai a minha oração, e na hora da minha morte apresentai-me a Jesus, vosso Filho. Amém.",
  },

  // ===== AO ESPÍRITO SANTO =====
  {
    slug: "veni-creator-spiritus",
    titulo: "Vinde, Espírito Criador",
    latim: "Veni, Creator Spiritus",
    categoria: "Ao Espírito Santo",
    nota: "Hino do séc. IX atribuído a Rabano Mauro, cantado em Pentecostes, ordenações e Confirmação; tradução própria em prosa.",
    paraQue: "Invocar os sete dons antes de decisões e obras importantes.",
    quando: "Em Pentecostes, no início do ano, antes de exames, sínodos e escolhas graves.",
    texto:
      "Vinde, Espírito Criador, visitai as mentes dos vossos, enchei de graça do alto os corações que criastes. Vós sois chamado Consolador, dom do Deus altíssimo, fonte viva, fogo, caridade e unção espiritual. Sois o dom setiforme, dedo da mão de Deus, promessa do Pai, que dais às nossas bocas a palavra. Acendei a luz nos sentidos, infundi o amor nos corações, fortalecei com vossa força perpétua a fraqueza do nosso corpo. Afastai longe o inimigo, dai-nos sem demora a paz, e sob a vossa guia evitaremos todo mal. Por vós conheçamos o Pai, conheçamos também o Filho, e em vós, Espírito de ambos, creiamos em todo o tempo. Amém.",
  },
  {
    slug: "oracao-dos-sete-dons",
    titulo: "Oração pelos sete dons do Espírito Santo",
    categoria: "Ao Espírito Santo",
    nota: "Redação própria a partir de Is 11,2-3 e do CIC §1831.",
    paraQue: "Pedir um por um os dons que sustentam a vida cristã.",
    quando: "Na novena de Pentecostes e antes da Confirmação.",
    texto:
      "Espírito Santo, dai-me a sabedoria, para julgar as coisas pelo peso da eternidade. Dai-me a inteligência, para entender o que creio. Dai-me o conselho, para escolher o bem quando o caminho é confuso. Dai-me a fortaleza, para resistir sem endurecer. Dai-me a ciência, para reconhecer as vossas obras. Dai-me a piedade, para tratar Deus como Pai e os homens como irmãos. Dai-me o temor de Deus, não o medo do castigo, mas o cuidado de não ferir quem me amou primeiro. Amém.",
  },

  // ===== EUCARÍSTICAS =====
  {
    slug: "adoro-te-devote",
    titulo: "Eu vos adoro devotamente",
    latim: "Adoro te devote",
    categoria: "Eucarísticas",
    nota: "Hino atribuído a Santo Tomás de Aquino (séc. XIII); tradução própria em prosa.",
    paraQue: "Adorar Cristo presente sob os sinais do pão e do vinho.",
    quando: "Na adoração eucarística e depois da comunhão.",
    texto:
      "Eu vos adoro devotamente, Deus escondido, que verdadeiramente vos oculta sob estas figuras. A vós se rende todo o meu coração, porque, contemplando-vos, tudo em mim se reconhece pequeno. A vista, o tato e o gosto se enganam aqui; só pelo ouvido se crê com firmeza. Creio tudo o que disse o Filho de Deus: nada é mais verdadeiro do que esta palavra da verdade. Na cruz escondia-se só a divindade; aqui esconde-se também a humanidade. Crendo e confessando ambas, peço o que pediu o ladrão arrependido. Não vejo as chagas como Tomé, mas confesso que sois meu Deus: fazei que eu creia sempre mais em vós, que espere em vós e que vos ame. Ó memorial da morte do Senhor, pão vivo que dais a vida ao homem, concedei que a minha alma viva de vós e que em vós encontre sempre o seu sabor. Jesus, que agora vejo velado, quando será que se cumprirá o que tanto desejo: ver-vos face a face e ser feliz na visão da vossa glória? Amém.",
  },
  {
    slug: "anima-christi",
    titulo: "Alma de Cristo",
    latim: "Anima Christi",
    categoria: "Eucarísticas",
    nota: "Oração do séc. XIV, difundida por Santo Inácio de Loyola nos Exercícios Espirituais.",
    paraQue: "Pedir a união com Cristo imediatamente após a comunhão.",
    quando: "Na ação de graças depois da Missa.",
    texto:
      "Alma de Cristo, santificai-me. Corpo de Cristo, salvai-me. Sangue de Cristo, embriagai-me. Água do lado de Cristo, lavai-me. Paixão de Cristo, fortalecei-me. Ó bom Jesus, ouvi-me. Dentro das vossas chagas, escondei-me. Não permitais que eu me separe de vós. Do inimigo maligno, defendei-me. Na hora da minha morte, chamai-me e mandai-me ir a vós, para que com os vossos santos eu vos louve por todos os séculos. Amém.",
  },
  {
    slug: "comunhao-espiritual",
    titulo: "Comunhão espiritual",
    categoria: "Eucarísticas",
    nota: "Fórmula atribuída a Santo Afonso Maria de Ligório (séc. XVIII).",
    paraQue: "Unir-se a Cristo quando não é possível comungar sacramentalmente.",
    quando: "Em doença, viagem, impedimento ou fora da Missa.",
    texto:
      "Meu Jesus, creio que estais presente no Santíssimo Sacramento. Amo-vos sobre todas as coisas e desejo receber-vos na minha alma. Como não posso agora receber-vos sacramentalmente, vinde ao menos espiritualmente ao meu coração. Como se já viesses, eu vos abraço e me uno inteiramente a vós; não permitais que eu me separe de vós. Amém.",
  },
  {
    slug: "o-sacrum-convivium",
    titulo: "Ó sagrado banquete",
    latim: "O sacrum convivium",
    categoria: "Eucarísticas",
    nota: "Antífona de Corpus Christi atribuída a Santo Tomás de Aquino; tradução própria.",
    paraQue: "Resumir em poucas palavras o que a Eucaristia é.",
    quando: "Na bênção do Santíssimo e em Corpus Christi.",
    texto:
      "Ó sagrado banquete, em que Cristo é recebido: nele se celebra a memória da sua paixão, a alma se enche de graça e nos é dada a garantia da glória futura. Aleluia.",
  },

  // ===== PENITENCIAIS =====
  {
    slug: "salmo-51-miserere",
    titulo: "Salmo 51 — Misericórdia, meu Deus",
    latim: "Miserere mei, Deus",
    categoria: "Penitenciais",
    nota: "Salmo penitencial rezado nas Laudes de toda sexta-feira; tradução própria do texto hebraico e da Vulgata.",
    paraQue: "Reconhecer o pecado e pedir um coração novo.",
    quando: "Antes da confissão, nas sextas-feiras e na Quaresma.",
    texto:
      "Tende piedade de mim, ó Deus, segundo a vossa bondade; pela vossa grande misericórdia, apagai o meu delito. Lavai-me inteiramente da minha culpa e purificai-me do meu pecado, porque eu reconheço a minha falta e o meu pecado está sempre diante de mim. Contra vós, só contra vós, pequei, e fiz o que é mau aos vossos olhos. Criai em mim, ó Deus, um coração puro, e renovai no meu íntimo um espírito firme. Não me afasteis da vossa presença nem retireis de mim o vosso Espírito santo. Devolvei-me a alegria da salvação e sustentai-me com espírito generoso. Senhor, abri os meus lábios, e a minha boca anunciará o vosso louvor. Sacrifício não vos agrada; o sacrifício que vos ofereço é um coração contrito: um coração arrependido e humilhado vós não desprezais. Amém.",
  },
  {
    slug: "oracao-antes-da-confissao",
    titulo: "Oração antes da confissão",
    categoria: "Penitenciais",
    nota: "Redação própria do portal, conforme o Rito da Penitência e o CIC §§1450-1460.",
    paraQue: "Preparar o exame de consciência com verdade e sem angústia.",
    quando: "Minutos antes de entrar no confessionário.",
    texto:
      "Espírito Santo, dai-me luz para ver o que fiz e coragem para dizê-lo sem disfarce. Que eu não confunda vergonha com arrependimento, nem esconda por medo o que preciso entregar. Mostrai-me também a raiz dos meus pecados, os hábitos e as fugas que os alimentam, e o bem que deixei de fazer. Confio na misericórdia que espera por mim neste sacramento, e prometo o esforço da emenda. Amém.",
  },
  {
    slug: "oracao-depois-da-confissao",
    titulo: "Oração depois da confissão",
    categoria: "Penitenciais",
    nota: "Redação própria do portal.",
    paraQue: "Agradecer o perdão recebido e assumir a reparação.",
    quando: "Logo após a absolvição, antes de cumprir a penitência.",
    texto:
      "Senhor, eu estava perdido e fui reencontrado; estava sujo e fui lavado. Obrigado por não vos cansardes de mim. Dai-me agora reparar o que causei: pedir desculpa a quem ofendi, devolver o que tomei, cuidar de quem descuidei. Guardai-me da presunção de acreditar que não cairei mais, e da tristeza de pensar que não posso mudar. Que a vossa graça faça em mim o que a minha vontade sozinha não consegue. Amém.",
  },

  // ===== PROTEÇÃO =====
  {
    slug: "sub-tuum-praesidium",
    titulo: "À vossa proteção",
    latim: "Sub tuum praesidium",
    categoria: "Proteção",
    nota: "A mais antiga oração mariana conhecida: papiro grego egípcio do séc. III-IV; tradução própria.",
    paraQue: "Refugiar-se em Maria em perigo imediato.",
    quando: "Em aflições súbitas e ameaças.",
    texto:
      "À vossa proteção nos acolhemos, santa Mãe de Deus. Não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita. Amém.",
  },
  {
    slug: "oracao-de-sao-patricio",
    titulo: "Coraça de São Patrício",
    latim: "Lorica Sancti Patricii",
    categoria: "Proteção",
    nota: "Hino irlandês antigo atribuído a São Patrício (texto medieval de domínio público); tradução própria, em versão abreviada.",
    paraQue: "Colocar-se sob a força de Cristo em todas as direções da vida.",
    quando: "Ao começar viagens, tarefas difíceis ou tempos de medo.",
    texto:
      "Levanto-me hoje pela força do céu: luz do sol, brilho da lua, esplendor do fogo, rapidez do vento, profundidade do mar, firmeza da terra, dureza da rocha. Levanto-me hoje pela força de Deus que me guia: seu poder me sustenta, sua sabedoria me ensina, seu olhar vigia por mim, seu ouvido me escuta, sua palavra me fala, sua mão me guarda. Cristo comigo, Cristo diante de mim, Cristo atrás de mim, Cristo em mim, Cristo abaixo de mim, Cristo acima de mim, Cristo à minha direita, Cristo à minha esquerda, Cristo quando me deito, Cristo quando me levanto, Cristo no coração de quem pensa em mim, Cristo na boca de quem fala de mim, Cristo em cada olho que me vê, Cristo em cada ouvido que me escuta. Amém.",
  },
  {
    slug: "oracao-ao-anjo-da-guarda-adulto",
    titulo: "Ao Anjo da Guarda, oração dos adultos",
    categoria: "Proteção",
    nota: "Redação própria a partir do Angele Dei e do CIC §336.",
    paraQue: "Pedir a companhia do anjo custódio no trabalho e nas decisões.",
    quando: "Ao sair de casa e ao dirigir.",
    texto:
      "Santo Anjo do Senhor, que Deus deu para me acompanhar, guardai hoje o meu caminho e o meu juízo. Avisai-me quando eu estiver perto do que me faz mal, sustentai-me na tentação, defendei-me dos acidentes do corpo e das armadilhas da alma. Quando eu não ouvir a vossa voz, insisti; e conduzi-me, ao fim, ao encontro daquele que vos enviou. Amém.",
  },

  // ===== DIÁRIAS =====
  {
    slug: "oracao-antes-do-trabalho",
    titulo: "Oração antes do trabalho",
    categoria: "Diárias",
    nota: "Redação própria a partir de Laborem Exercens e do CIC §§2427-2428.",
    paraQue: "Dar sentido cristão à jornada de trabalho.",
    quando: "Ao começar o expediente ou o estudo.",
    texto:
      "Senhor, vós trabalhastes com as mãos e chamastes o trabalho de colaboração na vossa obra. Abençoai o que faço hoje: dai-me competência, honestidade e paciência com quem trabalha comigo. Que eu não meça o meu valor pelo que produzo, nem trate ninguém como instrumento. E ao fim do dia, que eu saiba parar e devolver-vos o que fiz. Amém.",
  },
  {
    slug: "oracao-antes-do-estudo",
    titulo: "Oração antes do estudo",
    categoria: "Diárias",
    nota: "Adaptação livre do Creator ineffabilis de Santo Tomás de Aquino.",
    paraQue: "Pedir clareza de inteligência e retidão de intenção no estudo.",
    quando: "Antes de estudar, escrever ou ensinar.",
    texto:
      "Criador inefável, fonte de toda luz e de toda sabedoria, derramai sobre a escuridão da minha inteligência um raio da vossa claridade. Dai-me agudeza para compreender, memória para retinir o que aprendo, método e facilidade no estudo, precisão ao interpretar e graça abundante ao falar. Ensinai-me a começar, guiai-me no percurso e levai a obra ao seu fim. Que eu estude não para brilhar, mas para servir à verdade. Amém.",
  },
  {
    slug: "bencao-da-mesa",
    titulo: "Bênção da mesa",
    latim: "Benedic, Domine",
    categoria: "Diárias",
    nota: "Fórmula tradicional latina; tradução própria, com ação de graças final.",
    paraQue: "Reconhecer que o alimento é dom e lembrar quem não o tem.",
    quando: "Antes e depois das refeições.",
    texto:
      "Antes: Abençoai, Senhor, a nós e a estes alimentos que da vossa bondade vamos receber, por Cristo, nosso Senhor. Amém. Dai pão a quem tem fome e fome de justiça a nós, que temos pão. Depois: Nós vos damos graças, Deus todo-poderoso, por todos os vossos benefícios, vós que viveis e reinais para sempre. Amém.",
  },
  {
    slug: "exame-de-consciencia-noturno",
    titulo: "Exame de consciência da noite",
    categoria: "Diárias",
    nota: "Estrutura em cinco pontos do exame inaciano (Exercícios Espirituais, n. 43); redação própria.",
    paraQue: "Rever o dia com Deus, em vez de julgar-se sozinho.",
    quando: "Antes de dormir, dez minutos.",
    texto:
      "Primeiro: agradeço, Senhor, os bens deste dia, mesmo os que não notei. Segundo: peço luz para ver o dia como vós o vistes. Terceiro: repasso as horas — o que fiz, o que evitei, com quem fui bom e com quem fui duro. Quarto: peço perdão pelo mal feito e pelo bem omitido, e ofereço-vos a minha vergonha sem desespero. Quinto: escolho um ponto concreto para amanhã, e entrego-vos o sono, o corpo cansado e as pessoas que amo. Amém.",
  },

  // ===== AOS SANTOS =====
  {
    slug: "oracao-a-sao-jose-operario",
    titulo: "Oração a São José operário",
    categoria: "Aos Santos",
    nota: "Devoção difundida por Pio XII em 1955, ao instituir a memória de 1º de maio.",
    paraQue: "Pedir trabalho digno e santificação do ofício.",
    quando: "No dia 1º de maio e em busca de emprego.",
    texto:
      "São José, operário de Nazaré, que ganhastes o pão com as vossas mãos e ensinastes um ofício ao Filho de Deus: alcançai-me trabalho digno e forças para cumpri-lo. Protegei quem está desempregado, quem é explorado e quem tem medo do amanhã. Ensinai-me a santificar o dia comum, sem barulho e sem vaidade, como vós o fizestes. Amém.",
  },
  {
    slug: "oracao-a-santa-teresinha",
    titulo: "Oração a Santa Teresinha do Menino Jesus",
    categoria: "Aos Santos",
    nota: "Redação própria a partir da História de uma Alma (domínio público).",
    paraQue: "Aprender o caminho da confiança nas coisas pequenas.",
    quando: "Em desânimo espiritual e ao pedir uma graça pequena.",
    texto:
      "Santa Teresinha, que descobristes o caminho da infância espiritual, ensinai-me a fazer com amor o que é pequeno e a não me irritar com a minha fraqueza. Pedi-me a confiança que não depende de sentimentos e a fidelidade que não busca prêmio. Vós que prometestes derramar rosas sobre a terra, alcançai-me esta graça que agora vos apresento, se ela for para o bem da minha alma. Amém.",
  },
  {
    slug: "oracao-a-santo-antonio",
    titulo: "Responsório a Santo Antônio",
    latim: "Si quaeris miracula",
    categoria: "Aos Santos",
    nota: "Responsório atribuído a frei Juliano de Espira (séc. XIII); tradução própria.",
    paraQue: "Pedir a Santo Antônio auxílio em perdas e aflições.",
    quando: "Nas terças-feiras e ao procurar o que se perdeu.",
    texto:
      "Se buscas milagres, vê: a morte, o erro, as calamidades, o demônio e a lepra fogem; os doentes se levantam. O mar se acalma, as cadeias se rompem; membros e bens perdidos são recuperados por jovens e por velhos. Cessam os perigos e a necessidade; digam-no os que o experimentaram. Rogai por nós, bem-aventurado Antônio, para que sejamos dignos das promessas de Cristo. Amém.",
  },
  {
    slug: "oracao-a-sao-miguel-longa",
    titulo: "Oração a São Miguel Arcanjo, para o combate espiritual",
    categoria: "Aos Santos",
    nota: "Redação própria a partir de Ap 12,7-9 e do CIC §§391-395.",
    paraQue: "Pedir defesa nas provações espirituais, sem cair em superstição.",
    quando: "Em tentação insistente e ao rezar por alguém atormentado.",
    texto:
      "São Miguel Arcanjo, que servis a Deus e não a vós mesmo, defendei-nos no combate. Que nenhuma mentira nos pareça razoável, nenhum medo nos pareça invencível, nenhum orgulho nos pareça merecido. Lembrai-nos de que a vitória é de Cristo e que o inimigo não tem poder algum sobre quem se entrega à graça. Guardai a nossa casa, a nossa família e a nossa fé, e apresentai a Deus a nossa oração. Amém.",
  },

  // ===== DEFUNTOS =====
  {
    slug: "de-profundis-salmo-130",
    titulo: "Salmo 130 — Das profundezas",
    latim: "De profundis",
    categoria: "Defuntos",
    nota: "Salmo penitencial usado desde a Antiguidade nos sufrágios pelos mortos; tradução própria.",
    paraQue: "Rezar pelos falecidos com esperança na misericórdia.",
    quando: "Em velórios, aniversários de morte e em novembro.",
    texto:
      "Das profundezas clamo a vós, Senhor; Senhor, escutai a minha voz. Estejam atentos os vossos ouvidos ao clamor da minha prece. Se levardes em conta as nossas faltas, Senhor, quem poderá subsistir? Mas em vós se encontra o perdão, e por isso vos servimos com temor. Espero no Senhor, a minha alma espera, confio na sua palavra. Como o vigia espera a aurora, a minha alma espera pelo Senhor, porque nele há misericórdia e redenção abundante. Ele redimirá o seu povo de todas as suas culpas. Dai-lhes, Senhor, o descanso eterno, e brilhe para eles a luz perpétua. Amém.",
  },
  {
    slug: "oracao-por-quem-morreu-de-repente",
    titulo: "Oração por quem morreu de repente",
    categoria: "Defuntos",
    nota: "Redação própria do portal, conforme o CIC §§1030-1032 sobre a oração pelos defuntos.",
    paraQue: "Confiar a Deus quem partiu sem despedida e consolar os que ficaram.",
    quando: "Em mortes súbitas, acidentes e tragédias.",
    texto:
      "Senhor da vida, entregamos-vos aquele que partiu sem que pudéssemos dizer adeus. Vós conheceis o último instante que nós não vimos e o coração que nós não sabíamos ler; nada do que fizestes por ele se perdeu. Purificai-o, acolhei-o e dai-lhe a paz. E a nós, que ficamos com perguntas sem resposta, dai a graça de não desesperar, de cuidar uns dos outros e de esperar o dia do reencontro. Amém.",
  },
];
