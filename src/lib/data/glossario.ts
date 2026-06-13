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
};

export function getTermo(chave: string): EntradaGlossario | null {
  return GLOSSARIO[chave] ?? null;
}

export function listarTermos(): EntradaGlossario[] {
  return Object.values(GLOSSARIO).sort((a, b) =>
    a.termo.localeCompare(b.termo, "pt-BR"),
  );
}
