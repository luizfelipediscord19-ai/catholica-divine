// Mapa de referências cruzadas tipo enciclopédia.
// Chave = "topic slug" (ex: "eucaristia", "biblia:joao", "santo:tomas-aquino").
// Cada categoria tem itens com label + rota (TanStack params).

export type RefItem = {
  label: string;
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  hint?: string;
};

export type RelatedSet = {
  sacramentos?: RefItem[];
  catecismo?: RefItem[];
  biblia?: RefItem[];
  santos?: RefItem[];
  oracoes?: RefItem[];
};

// Helpers
const bib = (livro: string, cap: number, vi?: number, vf?: number, label?: string): RefItem => ({
  label: label ?? `${livro} ${cap}${vi ? `,${vi}${vf && vf !== vi ? `-${vf}` : ""}` : ""}`,
  to: "/biblia/$livro/$capitulo",
  params: { livro, capitulo: String(cap) },
  search: vi ? { vi: String(vi), ...(vf ? { vf: String(vf) } : {}) } : undefined,
});

const cat = (parte: string, label: string, hint?: string): RefItem => ({
  label,
  to: "/catecismo/$parte",
  params: { parte },
  hint,
});

const santo = (slug: string, label: string): RefItem => ({
  label,
  to: "/santos/$slug",
  params: { slug },
});

const oracao = (to: string, label: string): RefItem => ({ label, to });
const sacramento = (label: string): RefItem => ({ label, to: "/sacramentos" });

export const RELACIONADOS: Record<string, RelatedSet> = {
  // ============ SACRAMENTOS ============
  eucaristia: {
    sacramentos: [sacramento("Batismo (iniciação)"), sacramento("Confirmação"), sacramento("Ordem (ministro)")],
    catecismo: [
      cat("liturgia", "Parte II — A Celebração do Mistério", "§§ 1322–1419"),
      cat("vida-em-cristo", "Vida em Cristo — culto eucarístico"),
    ],
    biblia: [
      bib("joao", 6, 22, 71, "João 6 — Discurso do Pão da Vida"),
      bib("mateus", 26, 26, 30, "Mt 26,26-30 — Última Ceia"),
      bib("1corintios", 11, 23, 29, "1Cor 11,23-29 — Tradição paulina"),
      bib("lucas", 22, 14, 20, "Lc 22,14-20 — Instituição"),
    ],
    santos: [
      santo("santo-tomas-de-aquino", "São Tomás de Aquino — Pange Lingua"),
      santo("sao-joao-paulo-ii", "São João Paulo II — Ecclesia de Eucharistia"),
    ],
    oracoes: [
      oracao("/oracoes", "Anima Christi"),
      oracao("/oracoes/rosario", "Mistérios Luminosos — Instituição"),
    ],
  },

  confissao: {
    sacramentos: [sacramento("Batismo"), sacramento("Unção dos Enfermos"), sacramento("Eucaristia")],
    catecismo: [cat("vida-em-cristo", "Vida em Cristo — Conversão e penitência", "§§ 1422–1498")],
    biblia: [
      bib("joao", 20, 19, 23, "Jo 20,22-23 — “A quem perdoardes…”"),
      bib("mateus", 16, 19, undefined, "Mt 16,19 — Poder das chaves"),
      bib("1joao", 1, 8, 10, "1Jo 1,8-10 — Confessar os pecados"),
      bib("lucas", 15, 11, 32, "Lc 15 — Filho pródigo"),
    ],
    santos: [
      santo("sao-joao-maria-vianney", "São João Maria Vianney"),
      santo("sao-padre-pio-de-pietrelcina", "São Pio de Pietrelcina"),
    ],
    oracoes: [oracao("/oracoes", "Ato de Contrição"), oracao("/oracoes/terco-misericordia", "Terço da Misericórdia")],
  },
  penitencia: { /* alias */ },

  batismo: {
    sacramentos: [sacramento("Confirmação"), sacramento("Eucaristia")],
    catecismo: [cat("liturgia", "Os sete sacramentos — Batismo", "§§ 1213–1284")],
    biblia: [
      bib("mateus", 28, 19, 20, "Mt 28,19 — Mandato batismal"),
      bib("joao", 3, 1, 8, "Jo 3,5 — Nascer da água e do Espírito"),
      bib("atos", 2, 38, 41, "At 2,38 — Pregação de Pedro"),
      bib("romanos", 6, 3, 11, "Rm 6,3-11 — Batizados em sua morte"),
    ],
    santos: [santo("sao-joao-batista", "São João Batista")],
    oracoes: [oracao("/oracoes", "Renovação das promessas batismais")],
  },

  confirmacao: {
    sacramentos: [sacramento("Batismo"), sacramento("Eucaristia")],
    catecismo: [cat("liturgia", "Confirmação", "§§ 1285–1321")],
    biblia: [
      bib("atos", 2, 1, 13, "At 2 — Pentecostes"),
      bib("atos", 8, 14, 17, "At 8,14-17 — Imposição das mãos"),
      bib("isaias", 11, 1, 3, "Is 11,2-3 — Sete dons do Espírito"),
    ],
    santos: [],
    oracoes: [oracao("/oracoes", "Vinde, Espírito Santo")],
  },

  matrimonio: {
    sacramentos: [sacramento("Ordem"), sacramento("Eucaristia")],
    catecismo: [cat("liturgia", "Matrimônio", "§§ 1601–1666")],
    biblia: [
      bib("genesis", 2, 18, 24, "Gn 2,24 — Os dois numa só carne"),
      bib("mateus", 19, 3, 12, "Mt 19,6 — Não separe o homem"),
      bib("efesios", 5, 21, 33, "Ef 5,21-33 — Cristo e a Igreja"),
    ],
    santos: [santo("sao-joao-paulo-ii", "São João Paulo II — Familiaris Consortio")],
    oracoes: [],
  },

  ordem: {
    sacramentos: [sacramento("Eucaristia"), sacramento("Confissão")],
    catecismo: [cat("liturgia", "Sacramento da Ordem", "§§ 1536–1600")],
    biblia: [
      bib("lucas", 22, 19, 20, "Lc 22,19 — “Fazei isto…”"),
      bib("1timoteo", 4, 14, undefined, "1Tm 4,14 — Imposição das mãos"),
      bib("hebreus", 5, 1, 10, "Hb 5,1-10 — Sumo Sacerdote"),
    ],
    santos: [santo("sao-joao-maria-vianney", "Cura d'Ars"), santo("sao-paulo", "São Paulo")],
    oracoes: [oracao("/oracoes", "Oração pelos sacerdotes")],
  },

  "uncao-dos-enfermos": {
    sacramentos: [sacramento("Confissão"), sacramento("Eucaristia (Viático)")],
    catecismo: [cat("liturgia", "Unção dos Enfermos", "§§ 1499–1532")],
    biblia: [
      bib("tiago", 5, 13, 16, "Tg 5,14-15 — Unção com óleo"),
      bib("marcos", 6, 7, 13, "Mc 6,13 — Os Doze ungiam"),
    ],
    santos: [santo("sao-camilo-de-lellis", "São Camilo de Lélis")],
    oracoes: [],
  },

  // ============ DEVOÇÕES / ORAÇÕES ============
  rosario: {
    sacramentos: [sacramento("Eucaristia")],
    catecismo: [cat("oracao", "Parte IV — A Oração Cristã"), cat("credo", "Maria, Mãe de Deus")],
    biblia: [
      bib("lucas", 1, 26, 38, "Lc 1,26-38 — Anunciação"),
      bib("lucas", 1, 39, 56, "Lc 1,39-56 — Magnificat"),
      bib("lucas", 2, 1, 20, "Lc 2,1-20 — Natividade"),
      bib("joao", 2, 1, 11, "Jo 2,1-11 — Caná"),
    ],
    santos: [
      santo("santo-domingos-de-gusmao", "São Domingos de Gusmão"),
      santo("sao-joao-paulo-ii", "São João Paulo II — Rosarium Virginis Mariae"),
      santo("sao-padre-pio-de-pietrelcina", "São Pio de Pietrelcina"),
    ],
    oracoes: [
      oracao("/oracoes/novenas", "Novenas marianas"),
      oracao("/oracoes/terco-misericordia", "Terço da Misericórdia"),
    ],
  },

  "via-sacra": {
    sacramentos: [sacramento("Eucaristia"), sacramento("Confissão")],
    catecismo: [cat("credo", "Paixão, morte e sepultura")],
    biblia: [
      bib("mateus", 27, 27, 56, "Mt 27 — Paixão"),
      bib("marcos", 15, 16, 41, "Mc 15 — Crucificação"),
      bib("lucas", 23, 26, 49, "Lc 23 — Calvário"),
      bib("joao", 19, 16, 37, "Jo 19 — Aos pés da Cruz"),
    ],
    santos: [
      santo("sao-francisco-de-assis", "São Francisco de Assis"),
      santo("sao-francisco-de-sales", "São Francisco de Sales"),
    ],
    oracoes: [oracao("/oracoes/rosario", "Mistérios Dolorosos")],
  },

  misericordia: {
    sacramentos: [sacramento("Confissão"), sacramento("Eucaristia")],
    catecismo: [cat("oracao", "Oração de petição e misericórdia")],
    biblia: [
      bib("lucas", 15, 1, 32, "Lc 15 — Parábolas da misericórdia"),
      bib("joao", 20, 19, 23, "Jo 20,19-23 — Domingo da Misericórdia"),
      bib("salmos", 51, 1, 19, "Sl 51 — Miserere"),
    ],
    santos: [santo("santa-faustina-kowalska", "Santa Faustina Kowalska"), santo("sao-joao-paulo-ii", "São João Paulo II")],
    oracoes: [oracao("/oracoes/rosario", "Santo Rosário")],
  },

  // ============ BÍBLIA — POR LIVRO ============
  "biblia:joao": {
    catecismo: [cat("credo", "Encarnação do Verbo — Jo 1"), cat("liturgia", "Discurso eucarístico — Jo 6")],
    sacramentos: [sacramento("Eucaristia (Jo 6)"), sacramento("Batismo (Jo 3)"), sacramento("Confissão (Jo 20)")],
    santos: [santo("sao-joao-evangelista", "São João Evangelista"), santo("santo-agostinho", "Santo Agostinho — Comentário ao Evangelho de João")],
    oracoes: [],
  },
  "biblia:mateus": {
    catecismo: [cat("vida-em-cristo", "Sermão da Montanha"), cat("oracao", "Pai-Nosso — Mt 6,9-13")],
    sacramentos: [sacramento("Batismo (Mt 28,19)"), sacramento("Eucaristia (Mt 26)")],
    santos: [santo("sao-mateus", "São Mateus Evangelista")],
    oracoes: [oracao("/oracoes", "Pai-Nosso")],
  },
  "biblia:salmos": {
    catecismo: [cat("oracao", "Os Salmos na oração da Igreja", "§§ 2585–2589")],
    sacramentos: [],
    santos: [santo("santo-agostinho", "Santo Agostinho — Enarrationes in Psalmos")],
    oracoes: [oracao("/oracoes/liturgia-das-horas", "Liturgia das Horas")],
  },
  "biblia:genesis": {
    catecismo: [cat("credo", "Criação e queda", "§§ 279–421")],
    sacramentos: [sacramento("Matrimônio (Gn 2,24)")],
    santos: [],
    oracoes: [],
  },
  "biblia:apocalipse": {
    catecismo: [cat("credo", "Cristo, Senhor da história"), cat("liturgia", "Liturgia celestial")],
    sacramentos: [sacramento("Eucaristia (Cordeiro imolado)")],
    santos: [santo("sao-joao-evangelista", "São João Evangelista")],
    oracoes: [],
  },

  // ============ SANTOS — referências por slug ============
  "santo:tomas-aquino": {
    catecismo: [cat("credo", "Suma Teológica como fonte do CIC")],
    sacramentos: [sacramento("Eucaristia — Pange Lingua")],
    biblia: [bib("joao", 6, 51, 58, "Jo 6,51-58")],
    oracoes: [oracao("/oracoes", "Adoro Te devote")],
  },
  "santo:faustina": {
    sacramentos: [sacramento("Confissão"), sacramento("Eucaristia")],
    catecismo: [cat("credo", "Misericórdia de Deus")],
    biblia: [bib("lucas", 15, 11, 32, "Lc 15 — Pai misericordioso")],
    oracoes: [oracao("/oracoes/terco-misericordia", "Terço da Misericórdia"), oracao("/oracoes/rosario", "Santo Rosário")],
  },

  // ============ CATECISMO — por parte ============
  "catecismo:credo": {
    biblia: [bib("joao", 1, 1, 18, "Jo 1,1-18 — Prólogo"), bib("mateus", 16, 13, 20, "Mt 16,13-20 — Pedro confessa Cristo")],
    sacramentos: [sacramento("Batismo (profissão de fé)")],
    santos: [santo("santo-agostinho", "Santo Agostinho"), santo("santo-atanasio", "Santo Atanásio")],
    oracoes: [oracao("/oracoes", "Credo Apostólico"), oracao("/oracoes", "Credo Niceno-Constantinopolitano")],
  },
  "catecismo:liturgia": {
    biblia: [bib("hebreus", 9, 11, 28, "Hb 9 — Sacrifício de Cristo"), bib("joao", 6, 22, 71, "Jo 6")],
    sacramentos: [sacramento("Os sete sacramentos")],
    santos: [],
    oracoes: [oracao("/oracoes/liturgia-das-horas", "Liturgia das Horas")],
  },
  "catecismo:vida-em-cristo": {
    biblia: [bib("exodo", 20, 1, 17, "Ex 20 — Decálogo"), bib("mateus", 5, 1, 12, "Mt 5,1-12 — Bem-aventuranças")],
    sacramentos: [sacramento("Confissão"), sacramento("Eucaristia")],
    santos: [],
    oracoes: [],
  },
  "catecismo:oracao": {
    biblia: [bib("mateus", 6, 5, 15, "Mt 6,5-15 — Pai-Nosso"), bib("salmos", 1, 1, 6, "Sl 1")],
    sacramentos: [sacramento("Eucaristia")],
    santos: [santo("santa-teresa-de-avila", "Santa Teresa de Ávila"), santo("sao-joao-da-cruz", "São João da Cruz")],
    oracoes: [oracao("/oracoes/rosario", "Santo Rosário"), oracao("/oracoes/liturgia-das-horas", "Liturgia das Horas")],
  },
};

// ============ BÍBLIA — DEUTEROCANÔNICOS E OUTROS LIVROS ============
Object.assign(RELACIONADOS, {
  "biblia:tobias": {
    catecismo: [cat("credo", "Os anjos na vida da Igreja", "§§ 328–336"), cat("liturgia", "Matrimônio e oração dos esposos")],
    sacramentos: [sacramento("Matrimônio (Tb 8,4-9)")],
    biblia: [bib("tobias", 12, 6, 15, "Tb 12 — Rafael revela sua missão"), bib("tobias", 8, 4, 9, "Tb 8,4-9 — Oração dos noivos")],
    santos: [santo("sao-rafael-arcanjo", "São Rafael Arcanjo")],
    oracoes: [oracao("/oracoes", "Oração ao Anjo da Guarda")],
  },
  "biblia:judite": {
    catecismo: [cat("credo", "Maria, nova Judite — a mulher forte")],
    sacramentos: [],
    biblia: [bib("judite", 13, 1, 20, "Jt 13 — A vitória de Judite"), bib("lucas", 1, 42, 45, "Lc 1,42 — “Bendita sois vós”")],
    santos: [santo("santa-joana-darc", "Santa Joana d'Arc")],
    oracoes: [oracao("/oracoes/rosario", "Santo Rosário")],
  },
  "biblia:sabedoria": {
    catecismo: [cat("credo", "A imortalidade da alma", "§§ 362–368"), cat("oracao", "A Sabedoria que se dá a conhecer")],
    sacramentos: [],
    biblia: [bib("sabedoria", 2, 12, 24, "Sb 2,12-24 — O justo perseguido"), bib("sabedoria", 7, 22, 30, "Sb 7,22-30 — Hino à Sabedoria")],
    santos: [santo("santo-tomas-de-aquino", "São Tomás de Aquino")],
    oracoes: [],
  },
  "biblia:eclesiastico": {
    catecismo: [cat("vida-em-cristo", "Honrar pai e mãe — 4º mandamento", "§§ 2196–2257")],
    sacramentos: [sacramento("Unção dos Enfermos (Eclo 38,9-14)")],
    biblia: [bib("eclesiastico", 3, 1, 16, "Eclo 3,1-16 — Honra aos pais"), bib("eclesiastico", 44, 1, 15, "Eclo 44 — Elogio dos antepassados")],
    santos: [],
    oracoes: [oracao("/oracoes", "Orações pela família")],
  },
  "biblia:baruc": {
    catecismo: [cat("credo", "A Sabedoria e a Lei como caminho de vida")],
    sacramentos: [],
    biblia: [bib("baruc", 3, 9, 38, "Br 3,9-38 — Israel e a Sabedoria"), bib("baruc", 6, 1, 72, "Br 6 — Contra a idolatria")],
    santos: [],
    oracoes: [],
  },
  "biblia:1macabeus": {
    catecismo: [cat("vida-em-cristo", "O martírio e a fidelidade à fé", "§§ 2473–2474")],
    sacramentos: [],
    biblia: [bib("1macabeus", 2, 15, 28, "1Mc 2 — A revolta de Matatias"), bib("1macabeus", 4, 36, 61, "1Mc 4 — Purificação do Templo")],
    santos: [],
    oracoes: [],
  },
  "biblia:2macabeus": {
    catecismo: [cat("credo", "Oração pelos defuntos e purgatório", "§§ 1030–1032")],
    sacramentos: [sacramento("Eucaristia (sufrágio pelos mortos)")],
    biblia: [bib("2macabeus", 7, 1, 42, "2Mc 7 — Os sete irmãos mártires"), bib("2macabeus", 12, 38, 46, "2Mc 12,46 — Orar pelos mortos")],
    santos: [],
    oracoes: [oracao("/oracoes", "Oração pelos fiéis defuntos")],
  },
  "biblia:isaias": {
    catecismo: [cat("credo", "As profecias messiânicas", "§§ 522–524")],
    sacramentos: [sacramento("Confirmação (Is 11,2-3)")],
    biblia: [bib("isaias", 7, 10, 16, "Is 7,14 — O Emanuel"), bib("isaias", 53, 1, 12, "Is 53 — O Servo Sofredor")],
    santos: [],
    oracoes: [oracao("/oracoes", "Sanctus — Is 6,3")],
  },
  "biblia:atos": {
    catecismo: [cat("credo", "A Igreja apostólica", "§§ 857–865")],
    sacramentos: [sacramento("Batismo (At 2,38)"), sacramento("Confirmação (At 8,14-17)"), sacramento("Ordem (At 6,6)")],
    biblia: [bib("atos", 2, 1, 13, "At 2 — Pentecostes"), bib("atos", 15, 1, 29, "At 15 — Concílio de Jerusalém")],
    santos: [santo("sao-pedro", "São Pedro"), santo("sao-paulo", "São Paulo")],
    oracoes: [oracao("/oracoes", "Vinde, Espírito Santo")],
  },
  "biblia:romanos": {
    catecismo: [cat("vida-em-cristo", "Graça e justificação", "§§ 1987–2029")],
    sacramentos: [sacramento("Batismo (Rm 6,3-11)")],
    biblia: [bib("romanos", 5, 1, 11, "Rm 5 — Reconciliados por Cristo"), bib("romanos", 8, 28, 39, "Rm 8 — Nada nos separará")],
    santos: [santo("santo-agostinho", "Santo Agostinho")],
    oracoes: [],
  },
  "biblia:hebreus": {
    catecismo: [cat("liturgia", "O sacerdócio de Cristo", "§§ 1544–1545")],
    sacramentos: [sacramento("Ordem"), sacramento("Eucaristia")],
    biblia: [bib("hebreus", 9, 11, 28, "Hb 9 — O sacrifício definitivo"), bib("hebreus", 11, 1, 40, "Hb 11 — A fé dos antigos")],
    santos: [],
    oracoes: [],
  },
} satisfies Record<string, RelatedSet>);

// Aliases
RELACIONADOS.penitencia = RELACIONADOS.confissao;


export function getRelacionados(topic: string): RelatedSet | null {
  return RELACIONADOS[topic] ?? null;
}
