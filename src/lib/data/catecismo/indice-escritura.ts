// Índice de citações: Escritura → Catecismo da Igreja Católica.
//
// VERACIDADE: a correspondência abaixo reproduz apenas dados de referência —
// quais parágrafos do Catecismo citam ou comentam cada passagem bíblica, segundo
// o índice de citações da edição típica (1997). Nenhum texto do Catecismo é
// reproduzido: o "tema" é rótulo próprio do Portal Católico, e o parágrafo
// integral abre no site da Santa Sé ou na síntese do artigo correspondente.

export type EloCIC = {
  /** Slug do livro bíblico no portal (ex.: "joao"). */
  livro: string;
  capitulo: number;
  /** Primeiro versículo da passagem. */
  de: number;
  /** Último versículo (igual a `de` quando é um só). */
  ate: number;
  /** Parágrafos do Catecismo que tratam da passagem. */
  paragrafos: number[];
  /** Rótulo curto do assunto — redação do portal. */
  tema: string;
};

export const ELOS_CIC: EloCIC[] = [
  // ── Antigo Testamento ──────────────────────────────────────────────
  { livro: "genesis", capitulo: 1, de: 1, ate: 1, paragrafos: [279, 290], tema: "A criação do céu e da terra" },
  { livro: "genesis", capitulo: 1, de: 26, ate: 27, paragrafos: [355, 1700], tema: "O homem, imagem de Deus" },
  { livro: "genesis", capitulo: 2, de: 24, ate: 24, paragrafos: [1605, 1614], tema: "O matrimônio no desígnio de Deus" },
  { livro: "genesis", capitulo: 3, de: 5, ate: 5, paragrafos: [398], tema: "A raiz do pecado original" },
  { livro: "genesis", capitulo: 3, de: 15, ate: 15, paragrafos: [410, 411], tema: "O Protoevangelho e a nova Eva" },
  { livro: "genesis", capitulo: 14, de: 18, ate: 18, paragrafos: [1333], tema: "Melquisedec, figura da oferta eucarística" },
  { livro: "exodo", capitulo: 3, de: 14, ate: 14, paragrafos: [203, 206], tema: "O nome divino revelado a Moisés" },
  { livro: "exodo", capitulo: 20, de: 1, ate: 17, paragrafos: [2056, 2058], tema: "O Decálogo" },
  { livro: "deuteronomio", capitulo: 6, de: 4, ate: 5, paragrafos: [201, 2083], tema: "Shemá: um só Deus, amado de todo o coração" },
  { livro: "tobias", capitulo: 12, de: 12, ate: 12, paragrafos: [336], tema: "Os anjos na vida dos fiéis" },
  { livro: "2macabeus", capitulo: 12, de: 45, ate: 46, paragrafos: [958, 1032], tema: "Oração e sufrágios pelos falecidos" },
  { livro: "salmos", capitulo: 22, de: 2, ate: 2, paragrafos: [603], tema: "O grito de Cristo na cruz" },
  { livro: "salmos", capitulo: 130, de: 1, ate: 1, paragrafos: [2559], tema: "A oração brota das profundezas" },
  { livro: "isaias", capitulo: 6, de: 3, ate: 3, paragrafos: [1352], tema: "O Sanctus da liturgia" },
  { livro: "isaias", capitulo: 53, de: 4, ate: 12, paragrafos: [601, 615], tema: "O Servo sofredor e a expiação" },
  { livro: "jeremias", capitulo: 31, de: 31, ate: 34, paragrafos: [64, 1965], tema: "A Nova Aliança anunciada" },
  { livro: "ezequiel", capitulo: 36, de: 25, ate: 27, paragrafos: [715], tema: "O coração novo e o Espírito prometido" },

  // ── Evangelhos ─────────────────────────────────────────────────────
  { livro: "mateus", capitulo: 1, de: 20, ate: 21, paragrafos: [437, 497], tema: "A concepção virginal de Jesus" },
  { livro: "mateus", capitulo: 5, de: 3, ate: 12, paragrafos: [1716, 1717], tema: "As Bem-aventuranças" },
  { livro: "mateus", capitulo: 6, de: 9, ate: 13, paragrafos: [2759, 2761], tema: "O Pai-Nosso, resumo do Evangelho" },
  { livro: "mateus", capitulo: 16, de: 18, ate: 19, paragrafos: [552, 881], tema: "Pedro, rocha e chaves do Reino" },
  { livro: "mateus", capitulo: 18, de: 18, ate: 18, paragrafos: [553], tema: "O poder de ligar e desligar" },
  { livro: "mateus", capitulo: 19, de: 6, ate: 6, paragrafos: [1614, 2364], tema: "A indissolubilidade do matrimônio" },
  { livro: "mateus", capitulo: 25, de: 31, ate: 46, paragrafos: [678, 1033, 2447], tema: "Juízo final e obras de misericórdia" },
  { livro: "mateus", capitulo: 26, de: 26, ate: 28, paragrafos: [1339], tema: "A instituição da Eucaristia" },
  { livro: "mateus", capitulo: 28, de: 19, ate: 20, paragrafos: [232, 849, 1257], tema: "Batizar em nome da Trindade" },
  { livro: "marcos", capitulo: 1, de: 15, ate: 15, paragrafos: [541], tema: "O Reino de Deus está próximo" },
  { livro: "marcos", capitulo: 10, de: 14, ate: 14, paragrafos: [1261], tema: "As crianças e o Reino" },
  { livro: "marcos", capitulo: 16, de: 16, ate: 16, paragrafos: [161, 1257], tema: "Fé e Batismo para a salvação" },
  { livro: "lucas", capitulo: 1, de: 26, ate: 38, paragrafos: [484, 494], tema: "A Anunciação e o sim de Maria" },
  { livro: "lucas", capitulo: 1, de: 48, ate: 48, paragrafos: [971], tema: "O culto de veneração a Maria" },
  { livro: "lucas", capitulo: 22, de: 19, ate: 20, paragrafos: [611, 1339], tema: "A Ceia e a nova aliança no sangue" },
  { livro: "lucas", capitulo: 23, de: 43, ate: 43, paragrafos: [1021], tema: "Hoje estarás no Paraíso" },
  { livro: "lucas", capitulo: 24, de: 26, ate: 27, paragrafos: [112, 572], tema: "Cristo, chave de toda a Escritura" },
  { livro: "joao", capitulo: 1, de: 1, ate: 14, paragrafos: [241, 291, 461], tema: "O Verbo, criador e encarnado" },
  { livro: "joao", capitulo: 3, de: 5, ate: 5, paragrafos: [1215, 1257], tema: "Nascer da água e do Espírito" },
  { livro: "joao", capitulo: 6, de: 51, ate: 58, paragrafos: [1384, 1406], tema: "O pão vivo descido do céu" },
  { livro: "joao", capitulo: 14, de: 6, ate: 6, paragrafos: [74, 2466], tema: "Caminho, verdade e vida" },
  { livro: "joao", capitulo: 17, de: 21, ate: 21, paragrafos: [820], tema: "A unidade dos cristãos" },
  { livro: "joao", capitulo: 19, de: 26, ate: 27, paragrafos: [964, 2618], tema: "Maria, mãe dada aos discípulos" },
  { livro: "joao", capitulo: 20, de: 22, ate: 23, paragrafos: [976, 1441, 1461], tema: "O perdão dos pecados na Igreja" },

  // ── Atos e cartas ──────────────────────────────────────────────────
  { livro: "atos", capitulo: 2, de: 42, ate: 42, paragrafos: [949, 1342], tema: "A vida da primeira comunidade" },
  { livro: "romanos", capitulo: 1, de: 19, ate: 20, paragrafos: [32, 36], tema: "Conhecer Deus pela criação" },
  { livro: "romanos", capitulo: 5, de: 12, ate: 12, paragrafos: [402], tema: "A transmissão do pecado original" },
  { livro: "romanos", capitulo: 6, de: 3, ate: 4, paragrafos: [628, 1227], tema: "Batizados na morte e ressurreição" },
  { livro: "romanos", capitulo: 8, de: 14, ate: 17, paragrafos: [693, 1996], tema: "Filhos no Espírito e graça" },
  { livro: "romanos", capitulo: 12, de: 1, ate: 1, paragrafos: [2031], tema: "A vida como culto espiritual" },
  { livro: "1corintios", capitulo: 10, de: 16, ate: 17, paragrafos: [1331, 1396], tema: "Comunhão e unidade do Corpo" },
  { livro: "1corintios", capitulo: 11, de: 23, ate: 29, paragrafos: [1339, 1355, 1385], tema: "Celebrar dignamente a Eucaristia" },
  { livro: "1corintios", capitulo: 13, de: 4, ate: 13, paragrafos: [1825, 2658], tema: "O primado da caridade" },
  { livro: "1corintios", capitulo: 15, de: 3, ate: 5, paragrafos: [639, 652], tema: "O anúncio da Ressurreição" },
  { livro: "1corintios", capitulo: 15, de: 14, ate: 14, paragrafos: [651], tema: "Sem a Ressurreição, a fé é vã" },
  { livro: "2corintios", capitulo: 5, de: 20, ate: 20, paragrafos: [1442], tema: "O ministério da reconciliação" },
  { livro: "galatas", capitulo: 4, de: 4, ate: 6, paragrafos: [422, 484], tema: "A plenitude do tempo" },
  { livro: "efesios", capitulo: 5, de: 25, ate: 32, paragrafos: [1616, 1659], tema: "O matrimônio, sinal do amor de Cristo" },
  { livro: "filipenses", capitulo: 2, de: 6, ate: 11, paragrafos: [449, 461], tema: "O rebaixamento e a glória de Cristo" },
  { livro: "colossenses", capitulo: 1, de: 15, ate: 20, paragrafos: [331, 792], tema: "Cristo, cabeça de tudo" },
  { livro: "1timoteo", capitulo: 2, de: 5, ate: 5, paragrafos: [618, 1544], tema: "Um só mediador" },
  { livro: "2timoteo", capitulo: 3, de: 16, ate: 17, paragrafos: [105, 107], tema: "A inspiração da Escritura" },
  { livro: "hebreus", capitulo: 1, de: 1, ate: 2, paragrafos: [65, 102], tema: "Deus falou pelo Filho" },
  { livro: "hebreus", capitulo: 4, de: 15, ate: 15, paragrafos: [612], tema: "Provado em tudo, sem pecado" },
  { livro: "hebreus", capitulo: 9, de: 27, ate: 27, paragrafos: [1013], tema: "A morte e o fim da peregrinação" },
  { livro: "hebreus", capitulo: 11, de: 1, ate: 1, paragrafos: [146], tema: "A definição da fé" },
  { livro: "tiago", capitulo: 2, de: 14, ate: 26, paragrafos: [162, 1815], tema: "Fé viva nas obras" },
  { livro: "tiago", capitulo: 5, de: 14, ate: 15, paragrafos: [1510, 1526], tema: "A unção dos enfermos" },
  { livro: "1pedro", capitulo: 2, de: 9, ate: 9, paragrafos: [784, 1546], tema: "Povo sacerdotal" },
  { livro: "1pedro", capitulo: 3, de: 20, ate: 21, paragrafos: [1219], tema: "A arca, figura do Batismo" },
  { livro: "1joao", capitulo: 4, de: 8, ate: 16, paragrafos: [221, 733], tema: "Deus é amor" },
  { livro: "apocalipse", capitulo: 4, de: 1, ate: 11, paragrafos: [1137, 1138], tema: "A liturgia celeste" },
  { livro: "apocalipse", capitulo: 21, de: 1, ate: 4, paragrafos: [1044, 1045], tema: "Céu novo e terra nova" },
];

/** Elos do capítulo inteiro, na ordem dos versículos. */
export function elosDoCapitulo(livro: string, capitulo: number): EloCIC[] {
  return ELOS_CIC.filter((e) => e.livro === livro && e.capitulo === capitulo).sort(
    (a, b) => a.de - b.de,
  );
}

/** Elos que cobrem um versículo específico. */
export function elosDoVersiculo(livro: string, capitulo: number, versiculo: number): EloCIC[] {
  return elosDoCapitulo(livro, capitulo).filter(
    (e) => versiculo >= e.de && versiculo <= e.ate,
  );
}

/** Rótulo da passagem coberta pelo elo, ex.: "51-58" ou "14". */
export function faixaElo(elo: EloCIC): string {
  return elo.de === elo.ate ? String(elo.de) : `${elo.de}-${elo.ate}`;
}
