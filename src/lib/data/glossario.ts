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
  santissima_trindade: {
    termo: "Santíssima Trindade",
    definicao:
      "Mistério central da fé: um só Deus em três Pessoas distintas — Pai, Filho e Espírito Santo — consubstanciais.",
    ref: "CIC §§ 232-260",
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
  pecado_original: {
    termo: "Pecado Original",
    definicao:
      "Estado de privação da santidade original transmitido a toda a humanidade pela queda de Adão; não é um ato pessoal, mas uma condição herdada, apagada pelo Batismo.",
    ref: "CIC §§ 396-412",
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
  dons_espirito: {
    termo: "Dons do Espírito Santo",
    definicao:
      "Sabedoria, entendimento, conselho, fortaleza, ciência, piedade e temor de Deus; disposições permanentes que tornam o fiel dócil às inspirações divinas.",
    ref: "CIC §§ 1830-1831",
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
  doutor_igreja: {
    termo: "Doutor da Igreja",
    definicao:
      "Título dado pela Igreja a santos cuja doutrina, eminente e segura, beneficiou toda a cristandade.",
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
  ex_cathedra: {
    termo: "Ex cathedra",
    definicao:
      "Modo solene em que o Papa, como pastor supremo, define uma doutrina de fé ou moral, com infalibilidade.",
    ref: "Vaticano I, Pastor Aeternus",
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
      "Tradução grega do Antigo Testamento (séc. III-II a.C.), usada pelos apóstolos e base do canon católico.",
  },
  deuterocanonicos: {
    termo: "Deuterocanônicos",
    definicao:
      "Sete livros do Antigo Testamento (Tobias, Judite, Sabedoria, Eclesiástico, Baruc, 1-2 Macabeus) reconhecidos como inspirados pela Igreja.",
    ref: "Trento, sess. IV",
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
};

export function getTermo(chave: string): EntradaGlossario | null {
  return GLOSSARIO[chave] ?? null;
}

export function listarTermos(): EntradaGlossario[] {
  return Object.values(GLOSSARIO).sort((a, b) =>
    a.termo.localeCompare(b.termo, "pt-BR"),
  );
}
