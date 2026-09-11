// Páginas de doutrina específica.
//
// VERACIDADE: as sínteses são redação própria do Portal Católico, fiéis ao
// Catecismo da Igreja Católica, aos concílios e aos documentos citados em cada
// seção. Nenhuma tradução protegida é reproduzida; as referências permitem
// conferir a fonte oficial.

import type { SecaoTema } from "./enciclopedia-temas";

export type TemaDoutrina = {
  slug: string;
  nome: string;
  kicker: string;
  resumo: string;
  secoes: SecaoTema[];
  /** Parágrafos do Catecismo que abrem direto no artigo correspondente. */
  paragrafosCIC: number[];
  /** Slugs de verbetes da Enciclopédia ligados ao tema. */
  verbetes: string[];
};

export const TEMAS_DOUTRINA: TemaDoutrina[] = [
  {
    slug: "atraves-do-coracao",
    nome: "Através do Coração",
    kicker: "Cor ad cor loquitur",
    resumo:
      "O coração na Escritura e na doutrina católica: por que a fé se decide no centro da pessoa, o que a Igreja professa sobre o Sagrado Coração de Jesus e o Imaculado Coração de Maria, e como essa devoção é lida à luz do Catecismo.",
    paragrafosCIC: [368, 478, 1697, 2562, 2563, 2669, 2708],
    verbetes: ["graca", "oracao-crista", "eucaristia", "virtudes-teologais"],
    secoes: [
      {
        id: "o-coracao-na-escritura",
        titulo: "O coração na linguagem bíblica",
        paragrafos: [
          "Na Escritura, “coração” não designa o sentimento em oposição à razão: designa o centro da pessoa, o lugar onde ela decide, ama, delibera e responde a Deus. É ali que se encontram a memória, a vontade e a consciência. Por isso a Lei é dada para ser escrita no coração, e a conversão prometida pelos profetas é a troca de um coração de pedra por um coração de carne.",
          "O Catecismo recolhe essa linguagem quando afirma que o coração é o lugar da verdade da pessoa, onde ela se decide por Deus ou contra Ele, e que a oração cristã brota do coração, não da mera repetição de palavras. Compreender isso evita dois erros simétricos: reduzir a fé a emoção e reduzi-la a doutrina memorizada.",
          "Daí a insistência dos Padres: quem lê a Escritura procurando apenas informação lê pouco; quem a lê com o coração aberto encontra Aquele que fala. A leitura orante — a lectio divina — nasce dessa convicção.",
        ],
        pontos: [
          "O coração é o centro da pessoa, não uma emoção passageira (CIC § 2563).",
          "A oração cristã brota do coração, sede da aliança (CIC §§ 2562-2564).",
          "A conversão pedida pelos profetas é a de um coração novo (Ez 36,26).",
        ],
        referencias: [
          "CIC §§ 368; 1697; 2562-2564",
          "Ezequiel 36,26",
          "Jeremias 31,33",
          "Mateus 5,8",
        ],
      },
      {
        id: "o-coracao-de-cristo",
        titulo: "O Coração de Cristo, verdadeiro homem",
        paragrafos: [
          "A devoção ao Sagrado Coração não adora um órgão isolado: adora a Pessoa do Verbo encarnado, tomando seu coração humano como sinal do amor com que Ele nos amou. Porque Jesus é verdadeiro Deus e verdadeiro homem, tem uma vontade humana, uma sensibilidade humana e um coração humano real — e é precisamente esse coração que foi transpassado na cruz.",
          "O Catecismo diz expressamente que Jesus nos conheceu e nos amou com um coração humano, e que esse coração, ferido pelos nossos pecados, é adorado como sinal do amor divino. A base é a fé de Calcedônia: as duas naturezas, sem confusão e sem separação, na única Pessoa do Filho.",
          "Daí decorre uma consequência prática: o amor de Deus não é uma ideia abstrata a ser deduzida, mas um fato histórico que se pode contemplar — o lado aberto de Cristo, de onde brotam sangue e água, imagem antiga dos sacramentos da Igreja.",
        ],
        pontos: [
          "Cristo nos amou com um coração humano verdadeiro (CIC § 478).",
          "Calcedônia (451) fundamenta a devoção: uma Pessoa, duas naturezas.",
          "O lado transpassado é lido pelos Padres como origem dos sacramentos (Jo 19,34).",
        ],
        referencias: [
          "CIC §§ 470-478",
          "Concílio de Calcedônia (451)",
          "João 19,34",
          "Haurietis Aquas (Pio XII, 1956)",
        ],
      },
      {
        id: "historia-da-devocao",
        titulo: "História da devoção",
        paragrafos: [
          "A contemplação do lado aberto de Cristo é antiga: aparece em Orígenes, em Santo Agostinho, em São Boaventura e em toda a mística medieval — Santa Gertrudes, Santa Matilde, Santa Catarina de Sena. Não se trata de invenção moderna, mas de um filão constante da espiritualidade cristã.",
          "A forma litúrgica hoje conhecida ganha impulso com as manifestações relatadas por Santa Margarida Maria Alacoque em Paray-le-Monial (1673-1675), difundidas por São Cláudio de la Colombière. A Igreja, ao aprovar a devoção, distinguiu com cuidado o que é doutrina — o amor de Cristo, verdadeiro Deus e verdadeiro homem — daquilo que pertence à revelação privada, que ninguém é obrigado a aceitar pela fé.",
          "Em 1856, Pio IX estendeu a festa à Igreja universal; em 1899, Leão XIII consagrou o gênero humano ao Sagrado Coração com a encíclica Annum Sacrum; em 1956, Pio XII expôs a fundamentação bíblica e teológica em Haurietis Aquas. A festa é celebrada na sexta-feira depois da oitava de Pentecostes.",
        ],
        pontos: [
          "Revelações privadas nunca acrescentam nada ao depósito da fé (CIC § 67).",
          "Festa do Sagrado Coração: solenidade na sexta-feira após a oitava de Pentecostes.",
          "Memória do Imaculado Coração de Maria: sábado seguinte.",
        ],
        referencias: [
          "CIC § 67",
          "Annum Sacrum (Leão XIII, 1899)",
          "Haurietis Aquas (Pio XII, 1956)",
          "Calendário Romano Geral",
        ],
      },
      {
        id: "coracao-imaculado-de-maria",
        titulo: "O Imaculado Coração de Maria",
        paragrafos: [
          "A devoção ao Coração de Maria segue o mesmo princípio, num grau distinto: não se adora Maria — adora-se somente Deus. A Maria se presta veneração, e ao seu coração se olha como ao coração da primeira discípula, aquela que guardava todas essas coisas, meditando-as em seu coração.",
          "O Catecismo situa Maria dentro do mistério de Cristo e da Igreja: sua cooperação é inteiramente dependente da mediação única de Cristo e a ela subordinada. Distinguir adoração (latria), devida só a Deus, de veneração (dulia), prestada aos santos, e de veneração especial a Maria (hiperdulia), é essencial para que a devoção não se deforme.",
          "A consagração ao Coração Imaculado — praticada por Pio XII em 1942 e retomada por seus sucessores — é entendida como entrega da própria vida ao serviço de Cristo com a companhia e o exemplo de sua Mãe, e não como transferência de confiança de Deus para uma criatura.",
        ],
        pontos: [
          "Adoração é devida só a Deus; a Maria se presta veneração (CIC §§ 971; 2132).",
          "A cooperação de Maria depende inteiramente de Cristo (CIC §§ 970-975).",
          "Lucas 2,19.51 é a raiz bíblica da devoção ao seu coração.",
        ],
        referencias: ["CIC §§ 963-975; 2132", "Lumen Gentium 60-62", "Lucas 2,19.51"],
      },
      {
        id: "pratica-crista",
        titulo: "Como se vive na prática",
        paragrafos: [
          "A devoção não substitui a vida sacramental: conduz a ela. Suas expressões clássicas são a comunhão frequente e bem preparada, a confissão regular, a adoração eucarística, a oração de reparação e a caridade concreta com os pobres — porque o amor contemplado exige ser imitado.",
          "As chamadas “nove primeiras sextas-feiras” pertencem à piedade popular ligada às revelações privadas: são um caminho recomendável de conversão, não uma garantia mecânica de salvação. O Diretório sobre Piedade Popular e Liturgia (2002) pede exatamente esse cuidado, para que a devoção não descambe em superstição.",
          "O critério católico é simples e verificável: uma devoção é sadia quando leva à Eucaristia, à conversão dos costumes e à caridade; é doentia quando produz medo, cálculo ou dispensa dos mandamentos.",
        ],
        pontos: [
          "Nenhuma prática devocional dispensa os mandamentos ou os sacramentos (CIC § 2111).",
          "A piedade popular deve ser purificada e orientada pela liturgia (SC 13).",
          "Sinal de devoção autêntica: mais caridade, não mais medo (1Jo 4,18).",
        ],
        referencias: [
          "CIC §§ 2111; 1389",
          "Sacrosanctum Concilium 13",
          "Diretório sobre Piedade Popular e Liturgia (2002)",
        ],
      },
    ],
  },
  {
    slug: "pecado-original",
    nome: "Pecado Original",
    kicker: "Felix culpa",
    resumo:
      "O que a Igreja ensina e o que não ensina sobre o pecado das origens: a queda narrada em Gênesis, a doutrina definida em Trento, a diferença entre pecado original originante e originado, e por que o Batismo é a resposta.",
    paragrafosCIC: [385, 390, 396, 402, 404, 405, 412, 418],
    verbetes: ["graca", "justificacao", "revelacao", "sagrada-escritura"],
    secoes: [
      {
        id: "o-relato-da-queda",
        titulo: "O relato de Gênesis 3",
        paragrafos: [
          "Gênesis 3 usa linguagem figurada — a serpente, a árvore, o jardim — para narrar um acontecimento primordial real. O Catecismo é explícito nesse ponto: o relato utiliza linguagem imaginativa, mas afirma um fato que se deu no princípio da história do homem. Não é mito no sentido de ficção explicativa, nem crônica jornalística.",
          "O conteúdo do pecado não é a curiosidade nem o sexo: é a desconfiança em Deus e a pretensão de decidir por si mesmo o que é bem e mal, recusando a condição de criatura. O homem, tentado, preferiu-se a Deus e desprezou o mandamento.",
          "Por isso a doutrina do pecado original não é pessimismo sobre a natureza humana: é realismo sobre a liberdade. Deus criou tudo bom; o mal moral entrou no mundo por uma decisão livre da criatura, não por defeito do Criador.",
        ],
        pontos: [
          "Gênesis 3 usa linguagem figurada sobre um acontecimento real (CIC § 390).",
          "O pecado é desobediência e desconfiança, não ignorância (CIC § 397).",
          "Deus não criou a morte nem o mal moral (Sb 1,13; CIC § 413).",
        ],
        referencias: ["CIC §§ 385-390; 396-401", "Gênesis 3", "Sabedoria 1,13"],
      },
      {
        id: "o-que-a-igreja-define",
        titulo: "O que foi definido em Trento",
        paragrafos: [
          "O Decreto sobre o pecado original (Concílio de Trento, sessão V, 1546) fixou os pontos essenciais: Adão perdeu a santidade e a justiça em que havia sido constituído; essa perda passou a toda a descendência por propagação, não por imitação; o pecado original é removido unicamente pelos méritos de Cristo aplicados no Batismo.",
          "Trento respondia a duas deformações opostas: a de quem negava qualquer efeito hereditário da queda (pelagianismo) e a de quem sustentava que a natureza humana ficara intrinsecamente corrompida e incapaz de qualquer bem. A posição católica afirma uma natureza ferida, enfraquecida e inclinada ao pecado, mas não substancialmente má.",
          "É importante o vocabulário: chama-se pecado original originante o ato pessoal dos primeiros pais; pecado original originado, o estado de privação da santidade original em que cada um de nós nasce. Esse estado é pecado em sentido analógico — privação, não culpa pessoal cometida por nós.",
        ],
        pontos: [
          "Transmite-se por propagação, não por imitação (Trento, sessão V).",
          "É pecado em sentido analógico: estado, não ato pessoal nosso (CIC § 404).",
          "A natureza fica ferida, não totalmente corrompida (CIC §§ 405; 1707).",
        ],
        referencias: [
          "Concílio de Trento, sessão V (1546)",
          "CIC §§ 402-406",
          "Concílio de Orange II (529)",
          "Romanos 5,12-21",
        ],
      },
      {
        id: "consequencias",
        titulo: "Consequências: concupiscência, sofrimento e morte",
        paragrafos: [
          "A perda da santidade original trouxe consequências concretas: a inclinação desordenada dos apetites (concupiscência), a ignorância, o sofrimento, o domínio da morte e a ruptura da harmonia entre homem e criação. O Catecismo enumera essas feridas com sobriedade, sem exagerar nem minimizar.",
          "A concupiscência, precisa notar, não é ela mesma pecado: é a inclinação que resta após o Batismo e que se torna pecado apenas quando a vontade consente. Confundir tentação com pecado gera escrúpulo; negar a inclinação gera presunção.",
          "A história humana confirma experimentalmente o que a fé afirma: não sabemos explicar a persistência do mal apenas por más estruturas sociais ou pela ignorância. A doutrina da queda dá conta do enigma sem culpar Deus nem absolver o homem.",
        ],
        pontos: [
          "Feridas: ignorância, sofrimento, morte, inclinação ao pecado (CIC § 405).",
          "A concupiscência não é pecado; consentir nela, sim (CIC §§ 1264; 1426).",
          "A criação inteira está sujeita à corrupção (Rm 8,20-22).",
        ],
        referencias: ["CIC §§ 405; 407-409; 1264", "Romanos 8,20-22", "Gaudium et Spes 13"],
      },
      {
        id: "maria-e-a-imaculada-conceicao",
        titulo: "A exceção: a Imaculada Conceição",
        paragrafos: [
          "Se todos nascem privados da santidade original, o dogma de 1854 afirma que Maria foi preservada desse estado desde o primeiro instante de sua concepção, por singular graça de Deus e em previsão dos méritos de Jesus Cristo. Trata-se, portanto, de uma redenção mais perfeita — preservativa, e não curativa —, não de uma independência de Cristo.",
          "A bula Ineffabilis Deus (Pio IX) define exatamente isso, e o Catecismo o repete. Daí a saudação do anjo: “cheia de graça” — na leitura da Igreja, um estado, não um elogio de circunstância.",
          "Confundir Imaculada Conceição com concepção virginal de Jesus é o equívoco mais comum: o dogma de 1854 trata da concepção de Maria; a concepção virginal, professada no Credo, trata da de Jesus por obra do Espírito Santo.",
        ],
        pontos: [
          "Maria foi preservada do pecado original desde o primeiro instante (CIC §§ 490-493).",
          "É redenção preservativa: depende inteiramente de Cristo.",
          "Solenidade em 8 de dezembro; dogma definido em 1854.",
        ],
        referencias: [
          "Ineffabilis Deus (Pio IX, 1854)",
          "CIC §§ 490-493",
          "Lucas 1,28",
          "Lumen Gentium 56",
        ],
      },
      {
        id: "batismo-e-esperanca",
        titulo: "A resposta: Batismo, graça e esperança",
        paragrafos: [
          "A doutrina do pecado original só é compreendida corretamente a partir de Cristo: não se entende a queda para depois procurar remédio, mas se conhece o Redentor e, à sua luz, se mede o que foi curado. O Catecismo diz que só à luz da Revelação em Cristo se pode conhecer o pecado das origens.",
          "O Batismo apaga o pecado original, incorpora a Cristo, dá a vida da graça santificante e faz do batizado filho adotivo de Deus. Restam as consequências da ferida — luta, sofrimento, morte —, agora dentro de uma vida que tem destino.",
          "Sobre as crianças mortas sem Batismo, a Igreja não define condenação alguma: confia-as à misericórdia de Deus, como o Catecismo afirma expressamente. A doutrina protege ao mesmo tempo a necessidade do Batismo e a bondade de Deus.",
          "É nesse sentido que a liturgia da Vigília Pascal canta a “feliz culpa que mereceu tão grande Redentor”: não elogio ao pecado, mas espanto diante de uma redenção que superou a queda.",
        ],
        pontos: [
          "O Batismo apaga o pecado original e dá a graça santificante (CIC §§ 1263-1266).",
          "As crianças mortas sem Batismo são confiadas à misericórdia de Deus (CIC § 1261).",
          "Onde o pecado abundou, superabundou a graça (Rm 5,20).",
        ],
        referencias: ["CIC §§ 388; 1261-1266; 412", "Romanos 5,20", "Exsultet (Vigília Pascal)"],
      },
    ],
  },
  {
    slug: "morte-e-ressurreicao",
    nome: "Morte e Ressurreição",
    kicker: "Novissima",
    resumo:
      "O que a fé católica professa sobre a morte, o juízo particular, o purgatório, o céu, o inferno e a ressurreição da carne — com o que é dogma, o que é doutrina comum e o que a Igreja deliberadamente não define.",
    paragrafosCIC: [1005, 1013, 1022, 1023, 1030, 1033, 1038, 997],
    verbetes: ["comunhao-dos-santos", "graca", "virtudes-teologais", "eucaristia"],
    secoes: [
      {
        id: "a-morte-crista",
        titulo: "A morte à luz de Cristo",
        paragrafos: [
          "A morte é o fim da vida terrena e o termo do tempo de escolha: por isso a Igreja fala de um caráter definitivo da existência humana, sem reencarnações sucessivas. O Catecismo cita a Escritura: está estabelecido que os homens morram uma só vez, e depois vem o juízo.",
          "A fé não banaliza a morte nem a divide do drama humano: ela é consequência do pecado, e ao mesmo tempo foi transformada por Cristo, que a assumiu em obediência ao Pai e a converteu em passagem. Morrer em Cristo Jesus é o sentido cristão da morte.",
          "Daí a atitude prática da Igreja: preparar-se para bem morrer não é mórbido, é lúcido. A unção dos enfermos, o viático, a confissão e a oração pelos agonizantes existem exatamente para esse momento.",
        ],
        pontos: [
          "Uma só morte, depois o juízo — não há reencarnação (CIC § 1013; Hb 9,27).",
          "A morte foi transformada por Cristo (CIC §§ 1005-1014).",
          "A unção dos enfermos e o viático preparam a passagem (CIC §§ 1523-1525).",
        ],
        referencias: ["CIC §§ 1005-1014; 1523-1525", "Hebreus 9,27", "Romanos 6,3-9"],
      },
      {
        id: "juizo-particular",
        titulo: "Juízo particular e estados definitivos",
        paragrafos: [
          "Cada um recebe, imediatamente após a morte, a retribuição eterna em um juízo particular que refere sua vida a Cristo. Isso não anula o juízo final: aquele manifestará publicamente, no fim da história, o que este já decidiu para cada pessoa.",
          "Os estados possíveis são três: a purificação (purgatório), a comunhão plena com Deus (céu) e a separação definitiva por escolha livre (inferno). A Igreja professa a existência dos três; não afirma quem, nominalmente, esteja no inferno, e canoniza declarando que determinadas pessoas estão no céu.",
          "Nada aqui é fatalismo: o juízo não é sorteio nem cálculo de méritos acumulados, mas a verdade de uma vida diante de quem é o Amor. A doutrina existe para sustentar a esperança e a seriedade da liberdade, não para alimentar terror.",
        ],
        pontos: [
          "O juízo particular ocorre imediatamente após a morte (CIC § 1022).",
          "O juízo final manifestará publicamente essa verdade (CIC §§ 1038-1041).",
          "A canonização declara que alguém está no céu; nunca se declara o inverso.",
        ],
        referencias: [
          "CIC §§ 1021-1022; 1038-1041",
          "Benedictus Deus (Bento XII, 1336)",
          "2Cor 5,10",
        ],
      },
      {
        id: "purgatorio",
        titulo: "Purgatório: purificação, não segunda chance",
        paragrafos: [
          "O purgatório é o estado de purificação daqueles que morrem na graça e na amizade de Deus, mas ainda imperfeitamente purificados. Não é um lugar intermediário entre salvação e condenação, nem uma nova oportunidade de conversão: quem está no purgatório está salvo e caminha para o céu.",
          "A doutrina foi formulada nos Concílios de Florença (1439) e de Trento (1563), com base na prática antiquíssima de orar pelos mortos, atestada em 2Macabeus 12,46 e nas liturgias mais antigas. É por isso que a Igreja oferece sufrágios: Missas, orações, esmolas e indulgências.",
          "Trento também pediu sobriedade: que se ensine a doutrina verdadeira e se evitem curiosidades, especulações sobre duração e representações que escandalizem os fiéis. A insistência da Igreja está na comunhão dos santos, não em geografia do além.",
        ],
        pontos: [
          "Quem está no purgatório morreu na graça e será salvo (CIC §§ 1030-1031).",
          "Orar pelos mortos é prática antiquíssima (2Mac 12,46; CIC § 1032).",
          "Evitem-se especulações sobre tempo e lugar (Trento, sessão XXV).",
        ],
        referencias: [
          "CIC §§ 1030-1032",
          "Concílio de Florença (1439)",
          "Concílio de Trento, sessão XXV (1563)",
          "2Macabeus 12,46",
        ],
      },
      {
        id: "ceu-e-inferno",
        titulo: "Céu e inferno",
        paragrafos: [
          "O céu é a comunhão perfeita de vida e amor com a Trindade, com Maria, os anjos e os bem-aventurados — a visão de Deus que a tradição chama visão beatífica. Não é premiação por desempenho, mas plenitude do que o Batismo começou; e não é tédio contemplativo, mas o cumprimento de todo desejo humano de verdade e beleza.",
          "O inferno é a autoexclusão definitiva da comunhão com Deus. O Catecismo é preciso: Deus não predestina ninguém ao inferno; para tanto é necessária uma aversão voluntária a Deus, persistida até o fim. A pena principal é a separação eterna de Deus, na qual está a única felicidade do homem.",
          "A Igreja professa a possibilidade real da condenação — as advertências de Cristo são explícitas — e ao mesmo tempo não declara a condenação de indivíduo algum. O ensinamento serve à conversão e à liberdade responsável, não ao desespero.",
        ],
        pontos: [
          "Céu: visão beatífica, comunhão plena com a Trindade (CIC §§ 1023-1029).",
          "Inferno: autoexclusão livre e definitiva; Deus não o predestina (CIC §§ 1033-1037).",
          "A pena principal do inferno é a separação eterna de Deus (CIC § 1035).",
        ],
        referencias: ["CIC §§ 1023-1037", "Mateus 25,31-46", "Lumen Gentium 48"],
      },
      {
        id: "ressurreicao-da-carne",
        titulo: "A ressurreição da carne e a vida eterna",
        paragrafos: [
          "O Credo não professa apenas a imortalidade da alma: professa a ressurreição da carne. Cristo ressuscitou corporalmente, primícias dos que ressuscitarão; no último dia, todos ressuscitarão com o próprio corpo, transformado e incorruptível. É a diferença decisiva entre a esperança cristã e as filosofias que desprezam a matéria.",
          "Como isso se dá excede a imaginação e a fé não o descreve: São Paulo fala de corpo espiritual, semeado na corrupção e ressuscitado na glória. O Catecismo mantém a reserva: o modo ultrapassa nossa imaginação e nosso entendimento, e só é acessível na fé.",
          "Consequências práticas seguem de imediato: a Igreja trata o corpo dos defuntos com respeito, permite a cremação quando não expressa negação da fé na ressurreição, prefere a sepultura e pede que as cinzas sejam conservadas em lugar sagrado, não divididas nem espalhadas.",
          "A última palavra da fé sobre a morte não é a morte. É a nova criação: um novo céu e uma nova terra, onde Deus enxugará toda lágrima e não haverá mais morte.",
        ],
        pontos: [
          "Professamos a ressurreição da carne, não só a imortalidade da alma (CIC §§ 988-991).",
          "A cremação é permitida se não nega a fé na ressurreição (CIC § 2301).",
          "Ad resurgendum cum Christo (2016): cinzas em lugar sagrado, não espalhadas.",
        ],
        referencias: [
          "CIC §§ 988-1004; 2300-2301",
          "1Coríntios 15,35-55",
          "Apocalipse 21,1-4",
          "Ad resurgendum cum Christo (2016)",
        ],
      },
    ],
  },
];

export function temaDoutrinaPorSlug(slug: string): TemaDoutrina | undefined {
  return TEMAS_DOUTRINA.find((t) => t.slug === slug);
}
