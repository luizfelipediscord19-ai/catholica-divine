/**
 * Fontes oficiais do Magistério.
 *
 * Cada citação abreviada usada no portal ("CIC §495", "LG 60", "cân. 915")
 * aponta para o texto oficial publicado em vatican.va, para que o leitor possa
 * conferir a fonte primária. Todos os endereços abaixo foram verificados.
 */

const CCC_BASE = "https://www.vatican.va/archive/cathechism_po/index_new/";

/** Seções do Catecismo em português, com a faixa de parágrafos de cada página. */
const SECOES_CCC: { de: number; ate: number; arquivo: string }[] = [
  { de: 1, ate: 25, arquivo: "prologo%201-25_po.html" },
  { de: 26, ate: 49, arquivo: "p1s1c1_26-49_po.html" },
  { de: 50, ate: 141, arquivo: "p1s1c2_50-141_po.html" },
  { de: 142, ate: 184, arquivo: "p1s1c3_142-184_po.html" },
  { de: 185, ate: 197, arquivo: "p1s2_185-197_po.html" },
  { de: 198, ate: 421, arquivo: "p1s2c1_198-421_po.html" },
  { de: 422, ate: 682, arquivo: "p1s2cap2_422-682_po.html" },
  { de: 683, ate: 1065, arquivo: "p1s2cap3_683-1065_po.html" },
  { de: 1066, ate: 1075, arquivo: "p2s1cap1_1066-1075_po.html" },
  { de: 1076, ate: 1134, arquivo: "p2s1cap1_1076-1134_po.html" },
  { de: 1135, ate: 1209, arquivo: "p2s1cap2_1135-1209_po.html" },
  { de: 1210, ate: 1419, arquivo: "p2s2cap1_1210-1419_po.html" },
  { de: 1420, ate: 1532, arquivo: "p2s2cap1_1420-1532_po.html" },
  { de: 1533, ate: 1666, arquivo: "p2s2cap3_1533-1666_po.html" },
  { de: 1667, ate: 1690, arquivo: "p2s2cap4_1667-1690_po.html" },
  { de: 1691, ate: 1698, arquivo: "p3-intr_1691-1698_po.html" },
  { de: 1699, ate: 1876, arquivo: "p3s1cap1_1699-1876_po.html" },
  { de: 1877, ate: 1948, arquivo: "p3s1cap2_1877-1948_po.html" },
  { de: 1949, ate: 2051, arquivo: "p3s1cap3_1949-2051_po.html" },
  { de: 2052, ate: 2082, arquivo: "p3s2-intr_2052-2082_po.html" },
  { de: 2083, ate: 2195, arquivo: "p3s2cap1_2083-2195_po.html" },
  { de: 2196, ate: 2557, arquivo: "p3s2cap2_2196-2557_po.html" },
  { de: 2558, ate: 2565, arquivo: "p4-intr_2558-2565_po.html" },
  { de: 2566, ate: 2649, arquivo: "p4s1cap1_2566-2649_po.html" },
  { de: 2650, ate: 2696, arquivo: "p4s1cap2_2650-2696_po.html" },
  { de: 2697, ate: 2758, arquivo: "p4s1cap3_2697-2758_po.html" },
  { de: 2759, ate: 2865, arquivo: "p4s2_2759-2865_po.html" },
];

/** URL oficial (vatican.va, em português) da seção que contém o parágrafo. */
export function urlCatecismoOficial(paragrafo: number): string {
  const secao = SECOES_CCC.find((s) => paragrafo >= s.de && paragrafo <= s.ate);
  return secao
    ? `${CCC_BASE}${secao.arquivo}`
    : `${CCC_BASE}prima-pagina-cic_po.html`;
}

/** Código de Direito Canônico de 1983, texto oficial em português (PDF). */
export const URL_CDC =
  "https://www.vatican.va/archive/cod-iuris-canonici/portuguese/codex-iuris-canonici_po.pdf";

export type DocumentoMagisterio = {
  /** Nome completo do documento. */
  nome: string;
  /** Autor e ano, para o rótulo do link. */
  autoria: string;
  /** Grau de autoridade, exibido ao leitor. */
  /** Maior número de parágrafo do documento — evita links falsos. */
  maxNumero: number;
  grau:
    | "Concílio Ecumênico"
    | "Encíclica"
    | "Exortação Apostólica"
    | "Catecismo"
    | "Direito Canônico";
  url: string;
};

/** Abreviaturas magisteriais reconhecidas no texto do portal. */
export const DOCUMENTOS_MAGISTERIO: Record<string, DocumentoMagisterio> = {
  LG: {
    nome: "Lumen Gentium",
    maxNumero: 69,
    autoria: "Concílio Vaticano II, 1964",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
  },
  DV: {
    nome: "Dei Verbum",
    maxNumero: 26,
    autoria: "Concílio Vaticano II, 1965",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
  },
  SC: {
    nome: "Sacrosanctum Concilium",
    maxNumero: 130,
    autoria: "Concílio Vaticano II, 1963",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_po.html",
  },
  GS: {
    nome: "Gaudium et Spes",
    maxNumero: 93,
    autoria: "Concílio Vaticano II, 1965",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_po.html",
  },
  UR: {
    nome: "Unitatis Redintegratio",
    maxNumero: 24,
    autoria: "Concílio Vaticano II, 1964",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_decree_19641121_unitatis-redintegratio_po.html",
  },
  NA: {
    nome: "Nostra Aetate",
    maxNumero: 5,
    autoria: "Concílio Vaticano II, 1965",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_decl_19651028_nostra-aetate_po.html",
  },
  DH: {
    nome: "Dignitatis Humanae",
    maxNumero: 15,
    autoria: "Concílio Vaticano II, 1965",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_decl_19651207_dignitatis-humanae_po.html",
  },
  AG: {
    nome: "Ad Gentes",
    maxNumero: 42,
    autoria: "Concílio Vaticano II, 1965",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_decree_19651207_ad-gentes_po.html",
  },
  PO: {
    nome: "Presbyterorum Ordinis",
    maxNumero: 22,
    autoria: "Concílio Vaticano II, 1965",
    grau: "Concílio Ecumênico",
    url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_decree_19651207_presbyterorum-ordinis_po.html",
  },
  HV: {
    nome: "Humanae Vitae",
    maxNumero: 31,
    autoria: "Paulo VI, 1968",
    grau: "Encíclica",
    url: "https://www.vatican.va/content/paul-vi/pt/encyclicals/documents/hf_p-vi_enc_25071968_humanae-vitae.html",
  },
  VS: {
    nome: "Veritatis Splendor",
    maxNumero: 120,
    autoria: "João Paulo II, 1993",
    grau: "Encíclica",
    url: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_06081993_veritatis-splendor.html",
  },
  FR: {
    nome: "Fides et Ratio",
    maxNumero: 108,
    autoria: "João Paulo II, 1998",
    grau: "Encíclica",
    url: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html",
  },
  EV: {
    nome: "Evangelium Vitae",
    maxNumero: 105,
    autoria: "João Paulo II, 1995",
    grau: "Encíclica",
    url: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031995_evangelium-vitae.html",
  },
  DCE: {
    nome: "Deus Caritas Est",
    maxNumero: 42,
    autoria: "Bento XVI, 2005",
    grau: "Encíclica",
    url: "https://www.vatican.va/content/benedict-xvi/pt/encyclicals/documents/hf_ben-xvi_enc_20051225_deus-caritas-est.html",
  },
  LS: {
    nome: "Laudato Si’",
    maxNumero: 246,
    autoria: "Francisco, 2015",
    grau: "Encíclica",
    url: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html",
  },
  RN: {
    nome: "Rerum Novarum",
    maxNumero: 64,
    autoria: "Leão XIII, 1891",
    grau: "Encíclica",
    url: "https://www.vatican.va/content/leo-xiii/es/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html",
  },
  EG: {
    nome: "Evangelii Gaudium",
    maxNumero: 288,
    autoria: "Francisco, 2013",
    grau: "Exortação Apostólica",
    url: "https://www.vatican.va/content/francesco/pt/apost_exhortations/documents/papa-francesco_esortazione-ap_20131124_evangelii-gaudium.html",
  },
};

export const SIGLAS_MAGISTERIO = Object.keys(DOCUMENTOS_MAGISTERIO);
