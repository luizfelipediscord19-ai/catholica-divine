/**
 * Glossário Católico — termos doutrinais com definição curta
 * baseada no Catecismo da Igreja Católica (CIC) e no uso magisterial.
 *
 * Use o componente <Termo termo="graca">graça</Termo> para anexar
 * tooltips a palavras dentro de qualquer texto.
 */

export type EntradaGlossario = {
  termo: string;
  definicao: string;
  /** Referência opcional (parágrafo do CIC, concílio, doutor). */
  ref?: string;
};

export const GLOSSARIO: Record<string, EntradaGlossario> = {
  graca: {
    termo: "Graça",
    definicao:
      "Favor gratuito de Deus para nos tornar participantes de sua vida divina. Distingue-se em santificante (habitual, que nos justifica) e atual (auxílios pontuais).",
    ref: "CIC §§ 1996-2005",
  },
  dogma: {
    termo: "Dogma",
    definicao:
      "Verdade revelada por Deus e proposta pela Igreja como artigo de fé, com obrigação de assentimento irrevogável por parte do fiel.",
    ref: "CIC §§ 88-90",
  },
  transubstanciacao: {
    termo: "Transubstanciação",
    definicao:
      "Conversão de toda a substância do pão e do vinho na substância do Corpo e Sangue de Cristo na Eucaristia, permanecendo apenas as espécies sensíveis. Definida no Concílio de Trento.",
    ref: "CIC § 1376; Trento, sess. XIII",
  },
  magisterio: {
    termo: "Magistério",
    definicao:
      "Ofício de ensinar autenticamente a Palavra de Deus confiado por Cristo aos Apóstolos e seus sucessores — o Papa e os Bispos em comunhão com ele.",
    ref: "CIC §§ 85-87",
  },
  tradicao: {
    termo: "Tradição",
    definicao:
      "Transmissão viva da Revelação, recebida dos Apóstolos pela pregação, pelo exemplo e pelas instituições. Junto com a Escritura, forma o único depósito da fé.",
    ref: "CIC §§ 78, 80-83; Dei Verbum 9",
  },
  revelacao: {
    termo: "Revelação",
    definicao:
      "Manifestação livre que Deus faz de si mesmo e do seu plano de salvação, cuja plenitude se dá em Cristo. Encerrada com a morte do último Apóstolo.",
    ref: "CIC §§ 50-67",
  },
  encarnacao: {
    termo: "Encarnação",
    definicao:
      "Mistério pelo qual o Verbo eterno de Deus assumiu a natureza humana no seio da Virgem Maria, sem deixar de ser Deus.",
    ref: "CIC §§ 461-463",
  },
  hipostatica: {
    termo: "União Hipostática",
    definicao:
      "União das duas naturezas (divina e humana) na única Pessoa do Verbo encarnado, sem mistura nem separação. Definida em Calcedônia (451).",
    ref: "CIC §§ 464-469",
  },
  redencao: {
    termo: "Redenção",
    definicao:
      "Obra pela qual Cristo, pela sua Paixão, morte e Ressurreição, resgatou os homens do pecado e da morte, restituindo-lhes a graça.",
    ref: "CIC §§ 599-618",
  },
  imaculada_conceicao: {
    termo: "Imaculada Conceição",
    definicao:
      "Dogma segundo o qual Maria foi preservada do pecado original desde o primeiro instante de sua concepção, pelos méritos previstos de Cristo. Definido por Pio IX em 1854.",
    ref: "CIC § 491; Ineffabilis Deus",
  },
  assuncao: {
    termo: "Assunção",
    definicao:
      "Dogma segundo o qual Maria, terminado o curso da vida terrena, foi assunta em corpo e alma à glória celeste. Definido por Pio XII em 1950.",
    ref: "CIC § 966; Munificentissimus Deus",
  },
  theotokos: {
    termo: "Theotokos",
    definicao:
      "Termo grego que significa 'Mãe de Deus'. Título dado a Maria pelo Concílio de Éfeso (431) contra o nestorianismo.",
    ref: "CIC §§ 466, 495",
  },
  sacramento: {
    termo: "Sacramento",
    definicao:
      "Sinal sensível e eficaz da graça, instituído por Cristo e confiado à Igreja, pelo qual a vida divina nos é dispensada.",
    ref: "CIC §§ 1131, 1210",
  },
  eucaristia: {
    termo: "Eucaristia",
    definicao:
      "Sacramento do Corpo e Sangue de Cristo, memorial perpétuo da Páscoa do Senhor; fonte e ápice de toda a vida cristã.",
    ref: "CIC §§ 1322-1419",
  },
  liturgia: {
    termo: "Liturgia",
    definicao:
      "Celebração pública do culto divino pela Igreja. Obra de Cristo Sacerdote e do seu Corpo, na qual o céu e a terra se unem.",
    ref: "CIC §§ 1066-1075",
  },
  pecado_original: {
    termo: "Pecado Original",
    definicao:
      "Estado de privação da santidade e justiça originais em que nascemos, herdado de Adão. Não é um pecado pessoal, mas uma condição.",
    ref: "CIC §§ 396-409",
  },
  purgatorio: {
    termo: "Purgatório",
    definicao:
      "Estado de purificação final das almas que morrem em graça de Deus mas ainda imperfeitamente purificadas, antes de entrar na alegria do céu.",
    ref: "CIC §§ 1030-1032",
  },
  escatologia: {
    termo: "Escatologia",
    definicao:
      "Parte da teologia que trata das realidades últimas: morte, juízo, céu, inferno e a Parusia (segunda vinda de Cristo).",
    ref: "CIC §§ 1020-1060",
  },
  apostolico: {
    termo: "Apostólico",
    definicao:
      "Nota da Igreja: ela foi fundada sobre os Apóstolos, guarda seu ensinamento e é governada por seus sucessores legítimos — os Bispos em comunhão com o Papa.",
    ref: "CIC §§ 857-865",
  },
  primado: {
    termo: "Primado de Pedro",
    definicao:
      "Autoridade suprema, plena, imediata e universal que Cristo conferiu a Pedro e seus sucessores, os Bispos de Roma, sobre toda a Igreja.",
    ref: "CIC §§ 880-883; Mt 16,18-19",
  },
  infalibilidade: {
    termo: "Infalibilidade",
    definicao:
      "Carisma pelo qual o Papa, quando define ex cathedra uma doutrina de fé ou moral, ou o colégio episcopal em união com ele, é preservado de erro. Definida no Vaticano I.",
    ref: "CIC §§ 891-892",
  },
  comunhao_dos_santos: {
    termo: "Comunhão dos Santos",
    definicao:
      "União espiritual entre os fiéis da Igreja peregrina (na terra), padecente (no purgatório) e triunfante (no céu), nos bens espirituais.",
    ref: "CIC §§ 946-962",
  },
  concupiscencia: {
    termo: "Concupiscência",
    definicao:
      "Inclinação desordenada ao pecado que permanece no batizado como consequência do pecado original, sem ser ela mesma pecado.",
    ref: "CIC §§ 405, 1264",
  },
  pecado_mortal: {
    termo: "Pecado Mortal",
    definicao:
      "Transgressão de matéria grave cometida com plena consciência e deliberado consentimento; destrói a caridade e priva da graça santificante.",
    ref: "CIC §§ 1855-1861",
  },
  pecado_venial: {
    termo: "Pecado Venial",
    definicao:
      "Falta em matéria leve, ou em matéria grave sem plena advertência ou consentimento; enfraquece a caridade sem destruí-la.",
    ref: "CIC §§ 1862-1863",
  },
  indulgencia: {
    termo: "Indulgência",
    definicao:
      "Remissão diante de Deus da pena temporal devida por pecados já perdoados, concedida pela Igreja a partir do tesouro dos méritos de Cristo e dos santos.",
    ref: "CIC §§ 1471-1479",
  },
  simonia: {
    termo: "Simonia",
    definicao:
      "Compra ou venda de realidades espirituais (sacramentos, ofícios, graças). O nome vem de Simão, o mago (At 8,18-20).",
    ref: "CIC § 2121",
  },
  heresia: {
    termo: "Heresia",
    definicao:
      "Negação obstinada, depois de recebido o Batismo, de uma verdade que se deve crer com fé divina e católica, ou dúvida obstinada sobre ela.",
    ref: "CIC § 2089",
  },
  cisma: {
    termo: "Cisma",
    definicao:
      "Recusa de submissão ao Sumo Pontífice ou de comunhão com os membros da Igreja a ele sujeitos, sem necessária negação de dogma.",
    ref: "CIC § 2089",
  },
  apostasia: {
    termo: "Apostasia",
    definicao:
      "Repúdio total da fé cristã por quem foi batizado.",
    ref: "CIC § 2089",
  },
  anatema: {
    termo: "Anátema",
    definicao:
      "Fórmula solene de condenação usada por concílios contra doutrinas heréticas, acompanhada historicamente de excomunhão.",
    ref: "Trento; Vaticano I",
  },
  canonizacao: {
    termo: "Canonização",
    definicao:
      "Declaração definitiva do Papa de que um fiel está no céu, propondo-o ao culto público da Igreja universal.",
    ref: "CIC § 828",
  },
  beatificacao: {
    termo: "Beatificação",
    definicao:
      "Passo anterior à canonização; autoriza o culto público em âmbito restrito (diocese, país ou ordem religiosa).",
  },
  santificacao: {
    termo: "Santificação",
    definicao:
      "Obra do Espírito Santo que, pela graça, torna o fiel efetivamente santo, conformando-o a Cristo ao longo da vida.",
    ref: "CIC §§ 1995-2005",
  },
  justificacao: {
    termo: "Justificação",
    definicao:
      "Ato pelo qual Deus, por mérito de Cristo, remite os pecados e comunica a justiça interior ao homem, tornando-o justo e não apenas declarado justo.",
    ref: "CIC §§ 1987-1995; Trento, sess. VI",
  },
  virtudes_teologais: {
    termo: "Virtudes Teologais",
    definicao:
      "Fé, esperança e caridade — infundidas por Deus na alma, têm Deus por objeto e fundamentam toda a vida moral cristã.",
    ref: "CIC §§ 1812-1829",
  },
  virtudes_cardeais: {
    termo: "Virtudes Cardeais",
    definicao:
      "Prudência, justiça, fortaleza e temperança — hábitos adquiridos que ordenam as potências humanas ao bem.",
    ref: "CIC §§ 1805-1809",
  },
  caridade: {
    termo: "Caridade",
    definicao:
      "Virtude teologal pela qual amamos Deus por Ele mesmo e o próximo por amor de Deus; forma e raiz de todas as virtudes.",
    ref: "CIC §§ 1822-1829",
  },
  fe: {
    termo: "Fé",
    definicao:
      "Virtude teologal pela qual cremos em Deus e em tudo o que Ele revelou, pela autoridade do próprio Deus que revela.",
    ref: "CIC §§ 1814-1816",
  },
  esperanca: {
    termo: "Esperança",
    definicao:
      "Virtude teologal pela qual desejamos o Reino dos céus e a vida eterna, confiando nas promessas de Cristo.",
    ref: "CIC §§ 1817-1821",
  },
  oracao: {
    termo: "Oração",
    definicao:
      "Elevação da alma a Deus ou pedido de bens conformes à sua vontade; adoração, contrição, ação de graças e súplica.",
    ref: "CIC §§ 2559-2565",
  },
  contemplacao: {
    termo: "Contemplação Infusa",
    definicao:
      "Oração silenciosa em que a alma, movida por Deus, permanece em olhar amoroso, sem discurso da imaginação.",
    ref: "Santa Teresa de Ávila, Moradas IV",
  },
  meditacao: {
    termo: "Meditação",
    definicao:
      "Oração discursiva que busca, com o auxílio da razão e da imaginação, compreender e aplicar à vida o mistério considerado.",
    ref: "CIC §§ 2705-2708",
  },
  lectio_divina: {
    termo: "Lectio Divina",
    definicao:
      "Leitura orante da Escritura em quatro passos: leitura, meditação, oração e contemplação.",
    ref: "Verbum Domini 86",
  },
  liturgia_horas: {
    termo: "Liturgia das Horas",
    definicao:
      "Oração pública da Igreja que santifica as horas do dia (Ofício de Leituras, Laudes, Hora Média, Vésperas, Completas).",
    ref: "CIC §§ 1174-1178",
  },
  sacramentais: {
    termo: "Sacramentais",
    definicao:
      "Sinais sagrados instituídos pela Igreja (bênçãos, água benta, escapulário) que dispõem a receber a graça dos sacramentos.",
    ref: "CIC §§ 1667-1673",
  },
  ex_opere_operato: {
    termo: "Ex opere operato",
    definicao:
      "Eficácia do sacramento pela própria ação de Cristo, independentemente da santidade do ministro, exigindo do fiel apenas a devida disposição.",
    ref: "CIC § 1128",
  },
  materia_forma: {
    termo: "Matéria e Forma",
    definicao:
      "Elementos constitutivos do sacramento: a matéria (elemento sensível, p. ex. a água) e a forma (as palavras que a determinam).",
    ref: "Trento, sess. VII",
  },
  epiclese: {
    termo: "Epiclese",
    definicao:
      "Invocação do Espírito Santo na oração eucarística para que transforme os dons e santifique os fiéis.",
    ref: "CIC §§ 1105, 1353",
  },
  anamnese: {
    termo: "Anamnese",
    definicao:
      "Memorial que atualiza sacramentalmente a Paixão, Ressurreição e Ascensão de Cristo na celebração eucarística.",
    ref: "CIC § 1103",
  },
  presenca_real: {
    termo: "Presença Real",
    definicao:
      "Presença verdadeira, real e substancial de Cristo — corpo, sangue, alma e divindade — sob as espécies eucarísticas.",
    ref: "CIC §§ 1373-1381",
  },
  comunhao_espiritual: {
    termo: "Comunhão Espiritual",
    definicao:
      "Ato de desejo ardente de receber a Eucaristia quando não é possível comungar sacramentalmente.",
    ref: "Santo Afonso de Ligório",
  },
  adoracao: {
    termo: "Adoração Eucarística",
    definicao:
      "Culto de latria prestado a Cristo presente no Santíssimo Sacramento fora da Missa.",
    ref: "CIC § 1378",
  },
  latria: {
    termo: "Latria",
    definicao:
      "Culto de adoração devido somente a Deus.",
    ref: "CIC § 2096",
  },
  dulia: {
    termo: "Dulia",
    definicao:
      "Culto de veneração prestado aos santos, essencialmente distinto da adoração.",
    ref: "CIC § 971",
  },
  hiperdulia: {
    termo: "Hiperdulia",
    definicao:
      "Veneração especial devida à Virgem Maria, superior à dos santos e inferior à adoração de Deus.",
    ref: "CIC §§ 971, 2675",
  },
  comunhao_reparadora: {
    termo: "Reparação",
    definicao:
      "Ato de amor que compensa a ofensa feita a Deus pelo pecado, unindo-se ao sacrifício de Cristo.",
    ref: "CIC § 1459",
  },
  penitencia: {
    termo: "Penitência",
    definicao:
      "Sacramento pelo qual, pela absolvição do sacerdote, Deus perdoa os pecados cometidos após o Batismo; exige contrição, confissão e satisfação.",
    ref: "CIC §§ 1422-1470",
  },
  contricao: {
    termo: "Contrição",
    definicao:
      "Dor da alma e detestação do pecado cometido, com o propósito de não mais pecar. Perfeita quando nasce do amor de Deus; imperfeita (atrição) quando nasce do temor.",
    ref: "CIC §§ 1451-1453",
  },
  absolvicao: {
    termo: "Absolvição",
    definicao:
      "Palavras sacramentais pelas quais o sacerdote, em nome de Cristo, perdoa os pecados do penitente.",
    ref: "CIC § 1449",
  },
  sigilo: {
    termo: "Sigilo Sacramental",
    definicao:
      "Segredo absoluto e inviolável que obriga o confessor a nada revelar do que ouviu em confissão.",
    ref: "CIC § 1467",
  },
  viatico: {
    termo: "Viático",
    definicao:
      "Eucaristia dada ao fiel em perigo de morte, alimento para a passagem à vida eterna.",
    ref: "CIC § 1524",
  },
  uncao: {
    termo: "Unção dos Enfermos",
    definicao:
      "Sacramento que confere graça, força e paz ao fiel gravemente enfermo ou idoso, unindo seu sofrimento ao de Cristo.",
    ref: "CIC §§ 1499-1532",
  },
  ordem: {
    termo: "Ordem Sacra",
    definicao:
      "Sacramento em três graus — episcopado, presbiterado e diaconato — que configura o ministro a Cristo Cabeça e Pastor.",
    ref: "CIC §§ 1536-1600",
  },
  matrimonio: {
    termo: "Matrimônio",
    definicao:
      "Aliança pela qual homem e mulher constituem entre si consórcio de toda a vida, ordenado ao bem dos cônjuges e à geração e educação dos filhos; entre batizados, sacramento indissolúvel.",
    ref: "CIC §§ 1601-1666",
  },
  celibato: {
    termo: "Celibato",
    definicao:
      "Renúncia ao matrimônio pelo Reino dos céus, vivida na Igreja latina pelos ministros ordenados como sinal de entrega total.",
    ref: "CIC §§ 1579, 1618",
  },
  carater: {
    termo: "Caráter Sacramental",
    definicao:
      "Selo espiritual indelével impresso pelo Batismo, Confirmação e Ordem, razão pela qual não se repetem.",
    ref: "CIC § 1121",
  },
  batismo: {
    termo: "Batismo",
    definicao:
      "Primeiro sacramento, porta da vida espiritual: apaga o pecado original, incorpora a Cristo e à Igreja e imprime caráter.",
    ref: "CIC §§ 1213-1284",
  },
  confirmacao: {
    termo: "Confirmação",
    definicao:
      "Sacramento que perfaz a graça batismal com o dom pleno do Espírito Santo para a confissão pública da fé.",
    ref: "CIC §§ 1285-1321",
  },
  crisma: {
    termo: "Crisma / Santo Óleo",
    definicao:
      "Óleo perfumado consagrado pelo bispo, usado na Confirmação, no Batismo, na Ordem e na consagração de altares.",
    ref: "CIC § 1183",
  },
  igreja_militante: {
    termo: "Igreja Militante",
    definicao:
      "Os fiéis que ainda peregrinam na terra, em luta espiritual.",
    ref: "CIC §§ 954-956",
  },
  igreja_padecente: {
    termo: "Igreja Padecente",
    definicao:
      "As almas do purgatório, que se purificam antes da visão de Deus.",
    ref: "CIC §§ 1030-1032",
  },
  igreja_triunfante: {
    termo: "Igreja Triunfante",
    definicao:
      "Os bem-aventurados que já gozam da visão beatífica no céu.",
    ref: "CIC §§ 954, 1023",
  },
  visao_beatifica: {
    termo: "Visão Beatífica",
    definicao:
      "Contemplação imediata da essência divina, felicidade última e definitiva dos eleitos.",
    ref: "CIC §§ 1023-1029",
  },
  juizo_particular: {
    termo: "Juízo Particular",
    definicao:
      "Julgamento de cada alma imediatamente após a morte, que determina seu destino eterno.",
    ref: "CIC § 1022",
  },
  juizo_final: {
    termo: "Juízo Final",
    definicao:
      "Julgamento universal no fim dos tempos, quando Cristo voltar em glória e os corpos ressuscitarem.",
    ref: "CIC §§ 1038-1041",
  },
  inferno: {
    termo: "Inferno",
    definicao:
      "Estado de separação eterna e definitiva de Deus, escolhido pela morte em pecado mortal sem arrependimento.",
    ref: "CIC §§ 1033-1037",
  },
  ressurreicao_carne: {
    termo: "Ressurreição da Carne",
    definicao:
      "Verdade de fé segundo a qual, no último dia, todos ressuscitarão com seus próprios corpos, glorificados ou condenados.",
    ref: "CIC §§ 988-1019",
  },
  parusia: {
    termo: "Parusia",
    definicao:
      "Segunda vinda glorioso de Cristo no fim da história, para julgar vivos e mortos.",
    ref: "CIC §§ 668-682",
  },
  kerigma: {
    termo: "Querigma",
    definicao:
      "Anúncio primeiro e essencial da morte e ressurreição de Cristo, ponto de partida da evangelização.",
    ref: "Evangelii Nuntiandi 27",
  },
  catequese: {
    termo: "Catequese",
    definicao:
      "Educação sistemática e orgânica na fé, ordenada à maturidade cristã do batizado.",
    ref: "CIC §§ 4-10",
  },
  apologetica: {
    termo: "Apologética",
    definicao:
      "Disciplina que expõe e defende racionalmente a credibilidade da fé cristã.",
    ref: "1Pd 3,15",
  },
  teologia: {
    termo: "Teologia",
    definicao:
      "Ciência da fé: intelecto que busca compreender o que crê (fides quaerens intellectum).",
    ref: "Santo Anselmo",
  },
  escolastica: {
    termo: "Escolástica",
    definicao:
      "Método teológico medieval, de rigor lógico e disputa ordenada, cujo ápice é a Suma Teológica de São Tomás.",
  },
  patristica: {
    termo: "Patrística",
    definicao:
      "Conjunto dos escritos dos Padres da Igreja (séc. I-VIII), testemunhas privilegiadas da Tradição.",
    ref: "CIC § 78",
  },
  concilio: {
    termo: "Concílio Ecumênico",
    definicao:
      "Assembleia dos bispos do mundo, convocada e presidida pelo Papa, que exerce o Magistério supremo e solene.",
    ref: "CIC §§ 883-884",
  },
  colegialidade: {
    termo: "Colegialidade",
    definicao:
      "Comunhão do colégio episcopal com o Papa e sob sua autoridade, no governo da Igreja universal.",
    ref: "Lumen Gentium 22",
  },
  sinodo: {
    termo: "Sínodo",
    definicao:
      "Assembleia consultiva de bispos que assessora o Romano Pontífice em questões pastorais e doutrinais.",
  },
  curia: {
    termo: "Cúria Romana",
    definicao:
      "Conjunto de dicastérios pelos quais o Papa exerce o governo da Igreja universal.",
  },
  sede_vacante: {
    termo: "Sede Vacante",
    definicao:
      "Período entre a morte ou renúncia de um Papa e a eleição de seu sucessor.",
  },
  conclave: {
    termo: "Conclave",
    definicao:
      "Reunião fechada dos cardeais eleitores na Capela Sistina para a eleição do Romano Pontífice.",
  },
  depositum_fidei: {
    termo: "Depósito da Fé",
    definicao:
      "Conjunto da Revelação — Escritura e Tradição — confiado à Igreja para ser guardado e transmitido fielmente.",
    ref: "CIC §§ 84-86",
  },
  sensus_fidei: {
    termo: "Sensus Fidei",
    definicao:
      "Instinto sobrenatural da fé pelo qual o povo de Deus, no conjunto, não erra na adesão à verdade revelada.",
    ref: "Lumen Gentium 12",
  },
  desenvolvimento_dogmatico: {
    termo: "Desenvolvimento Dogmático",
    definicao:
      "Crescimento na compreensão da mesma verdade revelada, sem mudança de conteúdo, ao longo dos séculos.",
    ref: "Newman; CIC § 94",
  },
  analogia_entis: {
    termo: "Analogia do Ser",
    definicao:
      "Doutrina segundo a qual falamos de Deus por semelhança com as criaturas, sempre reconhecendo a dessemelhança maior.",
    ref: "Lateranense IV; CIC §§ 40-43",
  },
  providencia: {
    termo: "Providência Divina",
    definicao:
      "Disposição pela qual Deus conduz todas as criaturas ao seu fim último, respeitando a liberdade humana.",
    ref: "CIC §§ 302-314",
  },
  teodiceia: {
    termo: "Problema do Mal",
    definicao:
      "Questão da compatibilidade entre a bondade e a onipotência de Deus e a existência do mal, respondida à luz da cruz.",
    ref: "CIC §§ 309-314",
  },
  livre_arbitrio: {
    termo: "Livre-arbítrio",
    definicao:
      "Poder da vontade humana de determinar-se ao bem, fundamento da responsabilidade moral, não suprimido pela graça.",
    ref: "CIC §§ 1730-1742",
  },
  consciencia: {
    termo: "Consciência Moral",
    definicao:
      "Juízo da razão pelo qual a pessoa reconhece a qualidade moral de um ato concreto; deve ser formada e é norma próxima do agir.",
    ref: "CIC §§ 1776-1802",
  },
  lei_natural: {
    termo: "Lei Natural",
    definicao:
      "Participação da lei eterna na criatura racional, conhecida pela razão, que enuncia os preceitos primeiros da moral.",
    ref: "CIC §§ 1954-1960",
  },
  bem_comum: {
    termo: "Bem Comum",
    definicao:
      "Conjunto das condições sociais que permitem a pessoas e grupos alcançar sua perfeição; fim da vida política.",
    ref: "CIC §§ 1905-1912",
  },
  subsidiariedade: {
    termo: "Subsidiariedade",
    definicao:
      "Princípio social segundo o qual a instância superior não deve absorver o que a inferior pode realizar bem.",
    ref: "CIC § 1883",
  },
  solidariedade: {
    termo: "Solidariedade",
    definicao:
      "Virtude social que reconhece a interdependência dos homens e a destinação universal dos bens.",
    ref: "CIC §§ 1939-1942",
  },
  opcao_pobres: {
    termo: "Opção Preferencial pelos Pobres",
    definicao:
      "Exigência da caridade cristã de atenção prioritária aos que sofrem privação material e espiritual.",
    ref: "CIC §§ 2443-2449",
  },
  misericordia: {
    termo: "Obras de Misericórdia",
    definicao:
      "Ações de caridade corporais (alimentar, vestir, visitar) e espirituais (ensinar, aconselhar, perdoar, orar).",
    ref: "CIC § 2447",
  },
  jejum: {
    termo: "Jejum e Abstinência",
    definicao:
      "Práticas penitenciais da Igreja: reduzir o alimento e abster-se de carne em dias determinados, em vista da conversão.",
    ref: "CIC §§ 1434, 2043",
  },
  ano_liturgico: {
    termo: "Ano Litúrgico",
    definicao:
      "Ciclo anual em que a Igreja celebra o mistério de Cristo — Advento, Natal, Quaresma, Tríduo, Páscoa e Tempo Comum.",
    ref: "CIC §§ 1163-1173",
  },
  temporal_santoral: {
    termo: "Próprio do Tempo e dos Santos",
    definicao:
      "Duas séries de celebrações litúrgicas: os mistérios de Cristo e as memórias dos santos.",
  },
  solenidade: {
    termo: "Solenidade, Festa e Memória",
    definicao:
      "Graus de celebração litúrgica, em ordem decrescente de importância.",
  },
  vulgata: {
    termo: "Vulgata",
    definicao:
      "Tradução latina da Bíblia feita por São Jerônimo, versão oficial da Igreja latina por séculos.",
    ref: "Trento, sess. IV",
  },
  septuaginta: {
    termo: "Septuaginta",
    definicao:
      "Conjunto de traduções gregas do Antigo Testamento feitas entre os séc. III e I a.C., não uma edição única e fechada. Amplamente usada pelos judeus de língua grega e pelos primeiros cristãos; seus grandes códices (séc. IV-V) transmitem também os livros deuterocanônicos.",
  },
  deuterocanonicos: {
    termo: "Deuterocanônicos",
    definicao:
      "Sete livros do Antigo Testamento (Tobias, Judite, Sabedoria, Eclesiástico, Baruc, 1-2 Macabeus), com acréscimos gregos de Ester e Daniel, recebidos pela Igreja antiga, listados em Hipona (393) e Cartago (397), confirmados em Florença (1442) e definidos como inspirados por Trento (1546). 'Deutero' indica a segunda posição na discussão canônica, não um grau menor de inspiração.",
    ref: "Trento, sess. IV (DH 1502)",
  },
  canon: {
    termo: "Cânon das Escrituras",
    definicao:
      "Lista dos 73 livros inspirados reconhecidos pela Igreja como Palavra de Deus escrita.",
    ref: "CIC §§ 120-130",
  },
  inerrancia: {
    termo: "Inerrância",
    definicao:
      "Isenção de erro da Escritura naquilo que afirma para nossa salvação, por ter Deus como autor.",
    ref: "Dei Verbum 11",
  },
  sentidos_escritura: {
    termo: "Sentidos da Escritura",
    definicao:
      "Sentido literal e sentido espiritual (alegórico, moral e anagógico), que se apoia no literal.",
    ref: "CIC §§ 115-119",
  },
  tipologia: {
    termo: "Tipologia",
    definicao:
      "Leitura pela qual pessoas e eventos do Antigo Testamento prefiguram Cristo e a Igreja.",
    ref: "CIC §§ 128-130",
  },
  mistagogia: {
    termo: "Mistagogia",
    definicao:
      "Catequese que introduz nos mistérios celebrados, especialmente após os sacramentos da iniciação.",
    ref: "CIC § 1075",
  },
  epifania_graca: {
    termo: "Estado de Graça",
    definicao:
      "Condição da alma habitada pela graça santificante, requisito para receber dignamente a Eucaristia.",
    ref: "CIC §§ 1861, 1415",
  },
  mortificacao: {
    termo: "Mortificação",
    definicao:
      "Renúncia voluntária a satisfações legítimas para dominar as paixões e crescer na caridade.",
    ref: "CIC § 2015",
  },
  discernimento: {
    termo: "Discernimento Espiritual",
    definicao:
      "Arte de reconhecer, na oração e sob direção, as moções que vêm de Deus e as que dele afastam.",
    ref: "Santo Inácio, Exercícios",
  },
  direcao_espiritual: {
    termo: "Direção Espiritual",
    definicao:
      "Acompanhamento habitual de um fiel por um guia experiente, em ordem ao crescimento na santidade.",
  },
  trindade: {
    termo: "Santíssima Trindade",
    definicao:
      "Um só Deus em três Pessoas realmente distintas — Pai, Filho e Espírito Santo — consubstanciais, coeternas e coiguais. Mistério central da fé cristã.",
    ref: "CIC §§ 232-267",
  },
  homousios: {
    termo: "Homoousios (consubstancial)",
    definicao:
      "Termo grego definido em Niceia (325) para afirmar que o Filho é da mesma substância do Pai, contra o arianismo.",
    ref: "Niceia I, 325; CIC § 465",
  },
  filioque: {
    termo: "Filioque",
    definicao:
      "Cláusula latina acrescentada ao Credo de Niceia-Constantinopla (381), ausente do texto grego original, ensinando que o Espírito Santo procede do Pai e do Filho como de um único princípio. As Igrejas Orientais preservam a fórmula bíblica ‘procede do Pai’ (Jo 15,26), entendendo-a como comunicada ‘pelo Filho’ — tradição teológica legítima, distinta mas não contraditória.",
    ref: "CIC §§ 246-248; II Concílio de Lyon (1274); Concílio de Florença (1439)",
  },
  pecadooriginal: {
    termo: "Pecado original",
    definicao:
      "Estado de privação da santidade original transmitido a toda a humanidade pela queda de Adão; contraído, não cometido, por cada um.",
    ref: "CIC §§ 396-409",
  },
  virtudescardinais: {
    termo: "Virtudes cardinais",
    definicao:
      "Prudência, justiça, fortaleza e temperança: virtudes humanas em torno das quais se articula a vida moral.",
    ref: "CIC §§ 1805-1809",
  },
  donsdoespirito: {
    termo: "Dons do Espírito Santo",
    definicao:
      "Sabedoria, entendimento, conselho, fortaleza, ciência, piedade e temor de Deus — disposições permanentes que tornam o fiel dócil às inspirações divinas.",
    ref: "CIC §§ 1830-1831",
  },
  sucessaoapostolica: {
    termo: "Sucessão apostólica",
    definicao:
      "Transmissão ininterrupta, por imposição das mãos, do múnus apostólico aos bispos, garantindo a continuidade da missão da Igreja.",
    ref: "CIC §§ 861-862",
  },
  presencareal: {
    termo: "Presença real",
    definicao:
      "Presença verdadeira, real e substancial de Cristo — corpo, sangue, alma e divindade — sob as espécies eucarísticas.",
    ref: "CIC §§ 1373-1381",
  },
  sacrificioeucaristico: {
    termo: "Sacrifício eucarístico",
    definicao:
      "A Missa como re-presentação incruenta do único sacrifício da Cruz, oferecido pelo mesmo sacerdote, Cristo, por ministério do presbítero.",
    ref: "CIC §§ 1362-1372",
  },
  sacerdociocomum: {
    termo: "Sacerdócio comum dos fiéis",
    definicao:
      "Participação de todos os batizados no sacerdócio de Cristo pela oferta da própria vida; distingue-se essencialmente do sacerdócio ministerial.",
    ref: "CIC §§ 1546-1547",
  },
  excathedra: {
    termo: "Ex cathedra",
    definicao:
      "Ato pelo qual o Romano Pontífice, como pastor supremo, define uma doutrina de fé ou moral de modo infalível e definitivo.",
    ref: "Vaticano I, Pastor Aeternus; CIC § 891",
  },
  lexorandi: {
    termo: "Lex orandi, lex credendi",
    definicao:
      "Princípio de que a Igreja crê como reza: a liturgia é norma e expressão da fé professada.",
    ref: "CIC §§ 1124-1125",
  },
  enciclica: {
    termo: "Encíclica",
    definicao:
      "Carta doutrinal e pastoral do Papa dirigida a toda a Igreja, exercício ordinário do Magistério.",
  },
  motuproprio: {
    termo: "Motu proprio",
    definicao:
      "Documento pontifício promulgado por iniciativa própria do Papa, geralmente de caráter jurídico ou disciplinar.",
  },
  sensusfidei: {
    termo: "Sensus fidei",
    definicao:
      "Instinto sobrenatural da fé pelo qual o Povo de Deus, sob a guia do Magistério, reconhece e adere à verdade revelada.",
    ref: "CIC §§ 91-93",
  },
  doutordaigreja: {
    termo: "Doutor da Igreja",
    definicao:
      "Título dado a santos cuja doutrina se destaca por eminência, ortodoxia e utilidade para toda a Igreja. São 37 até hoje.",
  },
  martirio: {
    termo: "Martírio",
    definicao:
      "Testemunho supremo da verdade da fé, sofrendo a morte por Cristo; suprema prova da caridade.",
    ref: "CIC §§ 2473-2474",
  },
  ecumenismo: {
    termo: "Ecumenismo",
    definicao:
      "Esforço pela restauração da unidade de todos os cristãos, mediante oração, conversão e diálogo na verdade.",
    ref: "CIC §§ 820-822; Unitatis Redintegratio",
  },
  pentecostes: {
    termo: "Pentecostes",
    definicao:
      "Efusão do Espírito Santo sobre os Apóstolos cinquenta dias após a Páscoa; manifestação pública da Igreja.",
    ref: "At 2; CIC §§ 731-732",
  },
  ascensao: {
    termo: "Ascensão",
    definicao:
      "Entrada definitiva da humanidade de Jesus na glória divina, quarenta dias após a Ressurreição.",
    ref: "CIC §§ 659-667",
  },
  transfiguracao: {
    termo: "Transfiguração",
    definicao:
      "Manifestação antecipada da glória de Cristo no Tabor diante de Pedro, Tiago e João, confirmando a fé antes da Paixão.",
    ref: "CIC §§ 554-556",
  },
  kenosis: {
    termo: "Kénosis",
    definicao:
      "Anonadamento do Verbo que, sendo Deus, ‘esvaziou-se’ assumindo a condição de servo até a morte de cruz.",
    ref: "Fl 2,6-8; CIC § 461",
  },
  ressurreicaodacarne: {
    termo: "Ressurreição da carne",
    definicao:
      "Verdade de fé de que todos os mortos ressuscitarão em seus próprios corpos no último dia, para a vida ou para a condenação.",
    ref: "CIC §§ 988-1019",
  },
  juizoparticular: {
    termo: "Juízo particular",
    definicao:
      "Julgamento imediato de cada alma no instante da morte, que a destina ao céu, ao purgatório ou ao inferno.",
    ref: "CIC § 1022",
  },
  beatificavisao: {
    termo: "Visão beatífica",
    definicao:
      "Contemplação imediata de Deus face a face, que constitui a bem-aventurança eterna dos santos.",
    ref: "CIC §§ 1023-1029",
  },
  eclesiologia: {
    termo: "Eclesiologia",
    definicao:
      "Tratado teológico sobre a Igreja: sua natureza sacramental, notas (una, santa, católica, apostólica), estrutura e missão.",
    ref: "CIC §§ 748-870",
  },
  mariologia: {
    termo: "Mariologia",
    definicao:
      "Parte da teologia dedicada à Virgem Maria, seus privilégios e sua cooperação na obra da Redenção.",
    ref: "CIC §§ 963-975",
  },
  evangelizacao: {
    termo: "Evangelização",
    definicao:
      "Anúncio do Evangelho a todos os povos, missão essencial da Igreja em obediência ao mandato missionário de Cristo.",
    ref: "CIC §§ 849-856",
  },
  bemcomum: {
    termo: "Bem comum",
    definicao:
      "Conjunto das condições sociais que permitem a pessoas e grupos alcançar sua perfeição; exige respeito à pessoa, bem-estar social e paz.",
    ref: "CIC §§ 1905-1912",
  },
  destinouniversal: {
    termo: "Destino universal dos bens",
    definicao:
      "Princípio segundo o qual os bens da criação se destinam a todo o gênero humano, condicionando o direito de propriedade privada.",
    ref: "CIC §§ 2402-2406",
  },
  leinatural: {
    termo: "Lei natural",
    definicao:
      "Participação da criatura racional na lei eterna de Deus, inscrita na razão, universal e imutável em seus preceitos fundamentais.",
    ref: "CIC §§ 1954-1960",
  },
  apocatastase: {
    termo: "Apocatástase (doutrina refutada)",
    definicao:
      "Tese, associada a Orígenes e condenada pela Igreja, segundo a qual todas as criaturas racionais, incluindo os demônios, seriam finalmente restauradas e salvas. A Igreja mantém a possibilidade real da condenação eterna, embora nutra esperança e ore pela salvação de todos.",
    ref: "CIC §§ 1037, 1058; Const. dos Três Capítulos, 553",
  },
  circuncisao_espiritual: {
    termo: "Circuncisão Espiritual",
    definicao:
      "Figurada pela circuncisão carnal do Antigo Testamento, é a purificação interior do coração operada pelo Batismo e pela graça, tornando o fiel membro da nova Aliança sem necessidade do rito mosaico.",
    ref: "Rm 2,29; Cl 2,11-12; CIC § 527",
  },
  hipostase: {
    termo: "Hipóstase",
    definicao:
      "Termo grego que designa a subsistência individual e concreta de uma natureza; na teologia trinitária, cada uma das três Pessoas divinas é uma hipóstase da única substância divina.",
    ref: "CIC §§ 251-252; Concílio de Calcedônia, 451",
  },
  opus_operatum: {
    termo: "Opus Operatum",
    definicao:
      "Expressão latina que designa a eficácia objetiva do sacramento, realizada pela própria ação sacramental de Cristo, distinta do 'opus operantis' (mérito ou disposição subjetiva do ministro ou do sujeito).",
    ref: "CIC § 1128; Trento, sess. VII",
  },
  perigorese: {
    termo: "Perícorese (Circumincessão)",
    definicao:
      "Compenetração mútua e eterna das três Pessoas divinas, que habitam uma na outra em unidade de essência sem confusão de Pessoas.",
    ref: "CIC § 255; São João Damasceno",
  },
  monofisismo: {
    termo: "Monofisismo",
    definicao:
      "Heresia cristológica que afirma existir em Cristo uma só natureza, absorvida a humana pela divindade, negando a integridade da natureza humana de Jesus. Condenada em Calcedônia (451).",
    ref: "CIC § 467; Calcedônia, 451",
  },
  nestorianismo: {
    termo: "Nestorianismo",
    definicao:
      "Heresia que separava em Cristo duas pessoas — a divina e a humana — negando a unidade da Pessoa do Verbo encarnado e, por consequência, a maternidade divina de Maria. Condenada em Éfeso (431).",
    ref: "CIC §§ 466, 495; Éfeso, 431",
  },
  arianismo: {
    termo: "Arianismo",
    definicao:
      "Heresia do presbítero Ário, que negava a divindade plena do Filho, considerando-o a primeira e mais excelsa criatura, não consubstancial ao Pai. Condenada no Concílio de Niceia (325).",
    ref: "CIC § 465; Niceia, 325",
  },
  pelagianismo: {
    termo: "Pelagianismo",
    definicao:
      "Erro atribuído a Pelágio que negava a necessidade da graça para a salvação, sustentando que o homem poderia, por seu próprio esforço natural, evitar o pecado e alcançar a santidade.",
    ref: "CIC §§ 406, 2001-2002; Concílio de Cartago, 418",
  },
  jansenismo: {
    termo: "Jansenismo",
    definicao:
      "Corrente rigorista do séc. XVII que, exagerando a doutrina agostiniana da graça, propunha visão pessimista da natureza humana e restringia excessivamente o acesso à Eucaristia, sendo condenada pela Igreja.",
    ref: "Cum Occasione, Inocêncio X, 1653",
  },
  modernismo: {
    termo: "Modernismo",
    definicao:
      "Conjunto de correntes do início do séc. XX que subordinavam o dogma à evolução subjetiva da consciência religiosa, minando a objetividade da Revelação; condenado por São Pio X.",
    ref: "Pascendi Dominici Gregis, 1907",
  },
  relativismo_moral: {
    termo: "Relativismo Moral",
    definicao:
      "Postura que nega a existência de verdades morais objetivas e universais, reduzindo o bem e o mal a convenções culturais ou preferências subjetivas; contraposta à lei natural e à verdade sobre o bem.",
    ref: "Veritatis Splendor 84-101",
  },
  proporcionalismo: {
    termo: "Proporcionalismo",
    definicao:
      "Teoria ética que julga a moralidade do ato unicamente pelo balanço proporcional entre bens e males, negando a existência de atos intrinsecamente maus; rejeitada pelo Magistério.",
    ref: "Veritatis Splendor 75-77",
  },
  ato_intrinsecamente_mau: {
    termo: "Ato Intrinsecamente Mau",
    definicao:
      "Ato cuja espécie moral é má em si mesma, independentemente da intenção do agente ou das circunstâncias, não podendo jamais ser justificado por um fim bom.",
    ref: "CIC §§ 1755-1756; Veritatis Splendor 80",
  },
  principio_dupla_efeito: {
    termo: "Princípio do Duplo Efeito",
    definicao:
      "Critério moral clássico que permite um ato bom com efeito colateral mau não pretendido, desde que o ato em si seja bom ou indiferente, a intenção seja reta, o efeito mau não seja o meio para o bom e haja razão proporcionada.",
    ref: "Santo Tomás, Suma Teológica II-II, q.64, a.7",
  },
  restricao_mental: {
    termo: "Restrição Mental",
    definicao:
      "Reserva não manifestada que altera o sentido de uma afirmação; distingue-se a restrição estritamente mental (ilícita, equivale à mentira) da ampla (admissível em certas condições, por não induzir realmente ao erro).",
    ref: "CIC § 2483",
  },
  epieikeia: {
    termo: "Epiqueia",
    definicao:
      "Virtude que interpreta a lei segundo a intenção do legislador em casos particulares não previstos pela letra, evitando a injustiça de uma aplicação rígida e literal.",
    ref: "Aristóteles; Santo Tomás, Suma Teológica II-II, q.120",
  },
  economia_salvifica: {
    termo: "Economia da Salvação",
    definicao:
      "Plano divino de salvação realizado na história, culminando na Encarnação, morte e Ressurreição de Cristo, e continuado sacramentalmente pela Igreja.",
    ref: "CIC §§ 1-4, 1076",
  },
  protoevangelho: {
    termo: "Protoevangelho",
    definicao:
      "Primeiro anúncio da salvação após a queda (Gn 3,15), que promete a vitória da descendência da mulher sobre a serpente, lido pela Tradição como prefiguração de Cristo e de Maria.",
    ref: "CIC §§ 410-411",
  },
  alianca: {
    termo: "Aliança",
    definicao:
      "Vínculo estabelecido por Deus livremente com a humanidade em etapas sucessivas (Noé, Abraão, Moisés) até a Nova e Eterna Aliança selada no sangue de Cristo.",
    ref: "CIC §§ 56-73",
  },
  circumincessao_ver: {
    termo: "Missões Divinas",
    definicao:
      "Envio temporal do Filho e do Espírito Santo ao mundo, que manifesta e prolonga no tempo as processões eternas intratrinitárias.",
    ref: "CIC §§ 257-260",
  },
  processoes_trinitarias: {
    termo: "Processões Trinitárias",
    definicao:
      "Geração eterna do Filho pelo Pai e espiração do Espírito Santo pelo Pai e pelo Filho, que constituem as relações pessoais na única substância divina.",
    ref: "CIC §§ 245-248",
  },
  apropriacao: {
    termo: "Apropriação (teologia trinitária)",
    definicao:
      "Atribuição, na linguagem teológica, de certas operações comuns às três Pessoas divinas a uma delas em particular, por conveniência com suas propriedades pessoais (ex.: a criação ao Pai).",
    ref: "CIC § 258",
  },
  analogia_fidei: {
    termo: "Analogia da Fé",
    definicao:
      "Princípio hermenêutico segundo o qual cada passagem da Escritura deve ser lida em coerência com o conjunto do plano de Deus e das verdades da fé.",
    ref: "CIC § 114; Dei Verbum 12",
  },
  magisterio_ordinario: {
    termo: "Magistério Ordinário e Universal",
    definicao:
      "Ensino constante e concorde do Papa e dos bispos dispersos pelo mundo sobre uma verdade de fé ou moral a ser definitivamente sustentada, ainda que não proclamado em ato solene.",
    ref: "CIC § 892; Lumen Gentium 25",
  },
  fides_et_ratio: {
    termo: "Fé e Razão",
    definicao:
      "Relação de complementaridade entre a fé, que acolhe a Revelação, e a razão natural, capaz de conhecer verdades sobre Deus; 'duas asas com as quais o espírito humano se eleva' (João Paulo II).",
    ref: "CIC §§ 35-38; Fides et Ratio",
  },
  preambulos_fe: {
    termo: "Preâmbulos da Fé",
    definicao:
      "Verdades sobre Deus (sua existência, por exemplo) que a razão humana pode conhecer por si mesma, ainda que a fé as confirme e as eleve.",
    ref: "CIC §§ 35-36",
  },
  virtude_religiao: {
    termo: "Virtude da Religião",
    definicao:
      "Virtude moral, parte da justiça, pela qual o homem rende a Deus o culto e a honra que Lhe são devidos como Criador e Senhor.",
    ref: "CIC §§ 2095-2096",
  },
  sacrilegio: {
    termo: "Sacrilégio",
    definicao:
      "Profanação ou tratamento indigno de pessoas, coisas ou lugares consagrados a Deus, especialmente dos sacramentos; pecado grave contra a virtude da religião.",
    ref: "CIC § 2120",
  },
  superstição_ver: {
    termo: "Superstição",
    definicao:
      "Desvio do sentimento religioso que atribui importância excessiva a práticas exteriores em detrimento da disposição interior devida a Deus, ou dirige o culto a realidades que não O merecem.",
    ref: "CIC §§ 2110-2111",
  },
  idolatria: {
    termo: "Idolatria",
    definicao:
      "Pecado que consiste em divinizar o que não é Deus, prestando culto de adoração a criaturas, poder, dinheiro ou ideologias no lugar do Deus único e verdadeiro.",
    ref: "CIC §§ 2112-2114",
  },
  ateismo: {
    termo: "Ateísmo",
    definicao:
      "Negação da existência de Deus; a Igreja o julga com frequência como pecado grave contra a virtude da religião, embora reconheça circunstâncias atenuantes de responsabilidade em certos casos.",
    ref: "CIC §§ 2123-2126",
  },
  agnosticismo: {
    termo: "Agnosticismo",
    definicao:
      "Postura que declara impossível ou indecidível o conhecimento sobre a existência de Deus, frequentemente confundindo-se, na prática, com uma forma de ateísmo prático.",
    ref: "CIC §§ 2127-2128",
  },
  angelologia: {
    termo: "Angelologia",
    definicao:
      "Tratado teológico sobre os anjos, criaturas espirituais e pessoais dotadas de inteligência e vontade, criadas por Deus para Lhe servir e glorificar.",
    ref: "CIC §§ 328-336",
  },
  demonologia: {
    termo: "Demônios (queda angélica)",
    definicao:
      "Anjos que, por escolha livre e irrevogável, recusaram servir a Deus e se tornaram espíritos maus, tentadores da humanidade; sua ação é permitida por Deus mas limitada por sua Providência.",
    ref: "CIC §§ 391-395",
  },
  exorcismo: {
    termo: "Exorcismo",
    definicao:
      "Rito pelo qual a Igreja pede publicamente, em nome de Cristo, que uma pessoa ou objeto seja protegido ou libertado do poder do Maligno; reservado, na forma solene, ao bispo ou seu delegado.",
    ref: "CIC §§ 1673",
  },
  batismo_desejo: {
    termo: "Batismo de Desejo",
    definicao:
      "Salvação concedida por Deus a quem, ignorando sem culpa o Evangelho ou a Igreja, busca sinceramente a Deus e procura cumprir sua vontade, unindo-se assim implicitamente ao desejo do Batismo.",
    ref: "CIC §§ 1258-1260",
  },
  batismo_sangue: {
    termo: "Batismo de Sangue",
    definicao:
      "Efeito de graça equivalente ao Batismo de água concedido ao catecúmeno que sofre o martírio pela fé antes de poder ser batizado sacramentalmente.",
    ref: "CIC § 1258",
  },
  extra_ecclesiam: {
    termo: "Extra Ecclesiam Nulla Salus",
    definicao:
      "Axioma patrístico ('fora da Igreja não há salvação') que afirma a necessidade da Igreja para a salvação, entendido pelo Magistério não como exclusão dos que, sem culpa, a ignoram, mas como afirmação de que toda salvação vem por Cristo e seu Corpo.",
    ref: "CIC §§ 846-848; Lumen Gentium 16",
  },
  votos_religiosos: {
    termo: "Votos Religiosos (Conselhos Evangélicos)",
    definicao:
      "Promessas públicas e estáveis de castidade, pobreza e obediência, professadas por religiosos como resposta radical ao chamado de Cristo à perfeição da caridade.",
    ref: "CIC §§ 914-933",
  },
  vida_consagrada: {
    termo: "Vida Consagrada",
    definicao:
      "Estado de vida reconhecido pela Igreja em que o fiel professa os conselhos evangélicos, consagrando-se totalmente a Deus em institutos religiosos, seculares ou outras formas aprovadas.",
    ref: "CIC §§ 914-945",
  },
  clausura: {
    termo: "Clausura",
    definicao:
      "Disciplina de separação do mundo observada por religiosos contemplativos, especialmente monjas, como expressão de sua total consagração à oração e ao silêncio.",
  },
  primazia_consciencia_ver: {
    termo: "Formação da Consciência",
    definicao:
      "Dever de educar continuamente o juízo moral à luz da razão reta e da Palavra de Deus, submetendo-o ao ensinamento autorizado da Igreja para evitar erros de julgamento.",
    ref: "CIC §§ 1783-1785",
  },
  cooperacao_mal: {
    termo: "Cooperação ao Mal",
    definicao:
      "Participação, formal (compartilhando a intenção má) ou material (apenas concorrendo externamente ao ato), no pecado de outrem; a cooperação formal é sempre ilícita.",
    ref: "CIC § 1868",
  },
  escandalo: {
    termo: "Escândalo",
    definicao:
      "Atitude ou comportamento que leva outrem a praticar o mal, constituindo falta grave quando feito deliberadamente, sobretudo por quem tem autoridade ou influência.",
    ref: "CIC §§ 2284-2287",
  },
  restituicao: {
    termo: "Restituição",
    definicao:
      "Obrigação de justiça de reparar o dano causado injustamente a outrem, devolvendo o bem usurpado ou compensando o prejuízo antes de obter a plena remissão do pecado.",
    ref: "CIC §§ 2412-2413",
  },
  usura: {
    termo: "Usura",
    definicao:
      "Cobrança de juros excessivos ou injustos sobre empréstimos, condenada pela tradição moral da Igreja como violação da justiça e da caridade para com o necessitado.",
    ref: "CIC § 2269",
  },
  guerra_justa: {
    termo: "Guerra Justa (doutrina da)",
    definicao:
      "Conjunto de condições morais rigorosas — dano duradouro e grave, esgotamento de outros meios, sérias probabilidades de êxito, ausência de males maiores — que devem ser todas satisfeitas para que o recurso à força armada seja moralmente legítimo.",
    ref: "CIC §§ 2307-2317",
  },
  objecao_consciencia: {
    termo: "Objeção de Consciência",
    definicao:
      "Recusa legítima de cumprir uma lei ou ordem civil que contrarie a lei moral e os direitos fundamentais da pessoa, sobretudo quando envolve cooperação com o mal.",
    ref: "CIC § 2242",
  },

  // ——— Teologia fundamental e Revelação ———
  assentimento_religioso: {
    termo: "Assentimento Religioso",
    definicao:
      "Adesão devida ao ensinamento autêntico do Magistério que não é proposto como definitivo: exige submissão da inteligência e da vontade, distinta do assentimento de fé teologal dado aos dogmas.",
    ref: "Lumen Gentium 25; cân. 752-753",
  },
  nota_teologica: {
    termo: "Nota Teológica",
    definicao:
      "Grau de certeza de uma proposição na doutrina católica: de fide divina et catholica (dogma), doutrina definitiva, doutrina autêntica, sentença teologicamente certa, opinião provável. Serve para não confundir dogma com escola teológica.",
    ref: "Donum Veritatis 23-24",
  },

  // ——— Cristologia e Trindade ———
  comunicacao_idiomatum: {
    termo: "Communicatio Idiomatum",
    definicao:
      "Atribuição, à única pessoa de Cristo, das propriedades de ambas as naturezas: por isso se diz com verdade que o Filho de Deus sofreu e que o filho de Maria é adorado.",
    ref: "Concílio de Éfeso (431); CIC §§ 466-469",
  },
  perichorese: {
    termo: "Perichórese",
    definicao:
      "Inabitação mútua das três Pessoas divinas: cada Pessoa está inteiramente nas outras, sem se confundir com elas, porque a essência divina é única e indivisa.",
    ref: "CIC §§ 253-255; Jo 14,10-11",
  },
  processoes_divinas: {
    termo: "Processões Divinas",
    definicao:
      "As duas origens eternas na Trindade: a geração do Filho pelo Pai, por modo de intelecto, e a procissão do Espírito Santo, por modo de vontade e amor. As Pessoas distinguem-se apenas pelas relações de origem.",
    ref: "S. Tomás, Suma Teológica I, qq. 27-28; CIC §§ 254-256",
  },

  // ——— Graça, justificação e vida moral ———
  graca_atual: {
    termo: "Graça Atual",
    definicao:
      "Auxílio divino transitório que ilumina a inteligência e move a vontade para um ato bom concreto — distinta da graça santificante, que é dom habitual permanente na alma.",
    ref: "CIC §§ 2000, 2024",
  },
  merito: {
    termo: "Mérito",
    definicao:
      "Direito à recompensa por obras boas realizadas em estado de graça. Nada merecemos por nós mesmos: todo mérito cristão nasce da graça de Cristo em nós, e por isso Deus, coroando nossos méritos, coroa seus próprios dons.",
    ref: "CIC §§ 2006-2011; S. Agostinho, Ep. 194",
  },
  cooperacao_no_mal: {
    termo: "Cooperação no Mal",
    definicao:
      "Participação na ação pecaminosa de outro. É formal — e sempre ilícita — quando se aprova a intenção má; material, quando apenas se contribui de fato, podendo ser lícita se remota e por razão proporcionada.",
    ref: "CIC §§ 1868, 2272",
  },
  gradualidade: {
    termo: "Lei da Gradualidade",
    definicao:
      "Princípio pastoral segundo o qual a conversão é caminho progressivo, sem que se rebaixe a norma moral. Distingue-se da ‘gradualidade da lei’, que a Igreja rejeita por dissolver o próprio bem proposto.",
    ref: "Familiaris Consortio 34; Veritatis Splendor 103-105",
  },

  // ——— Sacramentos e liturgia ———
  concomitancia: {
    termo: "Concomitância",
    definicao:
      "Doutrina segundo a qual Cristo está inteiro — corpo, sangue, alma e divindade — sob cada espécie eucarística e em cada fragmento; por isso comungar apenas sob uma espécie nada subtrai ao dom.",
    ref: "Concílio de Trento, sessão XIII; CIC § 1377",
  },
  reserva_eucaristica: {
    termo: "Reserva Eucarística",
    definicao:
      "Conservação das hóstias consagradas no sacrário, ordenada primeiramente ao viático e, em consequência, à adoração e à comunhão fora da Missa.",
    ref: "CIC §§ 1379, 1418; cân. 934-944",
  },
  concelebracao: {
    termo: "Concelebração",
    definicao:
      "Celebração de uma única Missa por vários sacerdotes que pronunciam juntos a oração eucarística, manifestando a unidade do sacerdócio e do sacrifício.",
    ref: "Sacrosanctum Concilium 57-58; IGMR 199-251",
  },

  // ——— Igreja, hierarquia e direito ———
  subsistit_in: {
    termo: "Subsistit In",
    definicao:
      "Expressão de Lumen Gentium 8: a única Igreja de Cristo subsiste na Igreja Católica governada pelo Sucessor de Pedro, ainda que elementos de santificação e verdade existam fora de suas fronteiras visíveis.",
    ref: "Lumen Gentium 8; CIC §§ 816, 870",
  },
  sensus_ecclesiae: {
    termo: "Sentir com a Igreja",
    definicao:
      "Disposição interior de pensar, julgar e agir em harmonia com a fé e a disciplina da Igreja — critério clássico de discernimento espiritual e eclesial.",
    ref: "S. Inácio de Loyola, Exercícios Espirituais 352-370",
  },
  potestas: {
    termo: "Potestas Ordinis e Iurisdictionis",
    definicao:
      "Distinção entre o poder recebido pela Ordem sacra (santificar) e o poder de governo e jurisdição (ensinar e reger), que exige missão canônica além da ordenação válida.",
    ref: "cân. 129, 375; CIC §§ 1554-1561",
  },
  incardinacao: {
    termo: "Incardinação",
    definicao:
      "Vínculo jurídico permanente de todo clérigo a uma diocese, prelatura ou instituto, que garante missão e sustento e impede o clero acéfalo.",
    ref: "cân. 265-272",
  },
  dispensa: {
    termo: "Dispensa",
    definicao:
      "Relaxamento da lei meramente eclesiástica em caso particular, concedido pela autoridade competente por causa justa. Não se dispensa a lei divina nem os elementos essenciais dos sacramentos.",
    ref: "cân. 85-93",
  },
  excomunhao: {
    termo: "Excomunhão",
    definicao:
      "Censura medicinal que proíbe ao fiel receber sacramentos e exercer ofícios eclesiásticos. Não o expulsa da Igreja: visa à conversão e cessa com o arrependimento e a remissão canônica.",
    ref: "cân. 1331; CIC § 1463",
  },
  latae_sententiae: {
    termo: "Latae Sententiae",
    definicao:
      "Pena canônica que incide automaticamente no momento do delito, sem sentença declaratória — distinta da ferendae sententiae, imposta por decisão da autoridade.",
    ref: "cân. 1314",
  },

  // ——— Escatologia e piedade ———
  indulgencia_plenaria: {
    termo: "Indulgência Plenária",
    definicao:
      "Remissão total da pena temporal devida por pecados já perdoados, obtida sob as condições habituais: confissão sacramental, comunhão eucarística, oração pelas intenções do Papa e total desapego a qualquer pecado.",
    ref: "CIC §§ 1471-1479; Manual das Indulgências, normas 20-25",
  },
  sufragio: {
    termo: "Sufrágio",
    definicao:
      "Oração, esmola, indulgência ou Missa oferecida pelos fiéis defuntos, aplicando-lhes os frutos da comunhão dos santos para a purificação de suas penas.",
    ref: "CIC §§ 1032, 1479; 2Mc 12,46",
  },
  revelacao_privada: {
    termo: "Revelação Privada",
    definicao:
      "Manifestação sobrenatural particular (aparições, locuções) que nada acrescenta ao depósito da fé. Aprovada, é digna de crença humana e pode ajudar a viver o Evangelho; jamais obriga como dogma.",
    ref: "CIC §§ 66-67",
  },
  discernimento_espiritos: {
    termo: "Discernimento dos Espíritos",
    definicao:
      "Arte espiritual de distinguir a moção do bom espírito da do mau, pelos frutos de paz, humildade e caridade, ou de inquietação, orgulho e desespero.",
    ref: "S. Inácio de Loyola, Exercícios Espirituais 313-336; 1Jo 4,1",
  },
  desolacao_espiritual: {
    termo: "Desolação Espiritual",
    definicao:
      "Estado de aridez, escuridão e falta de gosto pelas coisas de Deus. Não é sinal de abandono: pede fidelidade aos exercícios de piedade, paciência e nunca mudança de decisões tomadas na consolação.",
    ref: "S. Inácio, Exercícios Espirituais 317-320; S. João da Cruz, Noite Escura I",
  },
  agere_contra: {
    termo: "Agere Contra",
    definicao:
      "Regra ascética de agir deliberadamente contra a inclinação desordenada — praticando o ato oposto ao vício — para reeducar a vontade e romper o hábito pecaminoso.",
    ref: "S. Inácio de Loyola, Exercícios Espirituais 13, 16",
  },
};


export function getTermo(chave: string): EntradaGlossario | null {
  return GLOSSARIO[chave] ?? null;
}

export function listarTermos(): EntradaGlossario[] {
  return Object.values(GLOSSARIO).sort((a, b) =>
    a.termo.localeCompare(b.termo, "pt-BR"),
  );
}
