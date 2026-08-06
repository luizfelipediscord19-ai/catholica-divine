// Metadados das versões bíblicas servidas DENTRO do portal (sem redirecionamento).
// Todas as edições abaixo estão em domínio público.

export type VersaoId =
  | "almeida"
  | "douay"
  | "vulgata"
  | "grego"
  | "hebraico";

export type Versao = {
  id: VersaoId;
  nome: string;
  lingua: string;
  fonte: string;
  /** Código da tradução na fonte de domínio público (getbible.net v2). */
  codigo: string;
  /** Código alternativo para o Antigo Testamento, quando aplicável. */
  codigoAt?: string;
  direcao?: "rtl";
  /** Fonte serifada/monoespaçada para línguas originais. */
  classeTexto?: string;
};

export const VERSOES: Versao[] = [
  {
    id: "almeida",
    nome: "Almeida",
    lingua: "Português",
    fonte: "João Ferreira de Almeida · domínio público",
    codigo: "almeida",
  },
  {
    id: "douay",
    nome: "Douay-Rheims",
    lingua: "Inglês (católica)",
    fonte: "Douay-Rheims 1899 · domínio público",
    codigo: "douayrheims",
  },
  {
    id: "vulgata",
    nome: "Vulgata Clementina",
    lingua: "Latim",
    fonte: "Vulgata Clementina · domínio público",
    codigo: "vulgate",
  },
  {
    id: "grego",
    nome: "Grego",
    lingua: "Textus Receptus / Septuaginta",
    fonte: "Textus Receptus (NT) e Septuaginta (AT) · domínio público",
    codigo: "textusreceptus",
    codigoAt: "lxx",
    classeTexto: "font-sans",
  },
  {
    id: "hebraico",
    nome: "Hebraico",
    lingua: "Códice de Alepo",
    fonte: "Aleppo Codex · domínio público",
    codigo: "aleppo",
    direcao: "rtl",
    classeTexto: "font-sans",
  },
];

export function getVersao(id: string): Versao | undefined {
  return VERSOES.find((v) => v.id === id);
}

/** Número canônico do livro na fonte de domínio público (numeração Vulgata/Douay). */
export const NUMERO_LIVRO: Record<string, number> = {
  genesis: 1, exodo: 2, levitico: 3, numeros: 4, deuteronomio: 5,
  josue: 6, juizes: 7, rute: 8, "1samuel": 9, "2samuel": 10,
  "1reis": 11, "2reis": 12, "1cronicas": 13, "2cronicas": 14,
  esdras: 15, neemias: 16, tobias: 69, judite: 70, ester: 17,
  "1macabeus": 80, "2macabeus": 81, jo: 18, salmos: 19, proverbios: 20,
  eclesiastes: 21, cantico: 22, sabedoria: 73, eclesiastico: 74,
  isaias: 23, jeremias: 24, lamentacoes: 25, baruc: 75, ezequiel: 26,
  daniel: 27, oseias: 28, joel: 29, amos: 30, abdias: 31, jonas: 32,
  miqueias: 33, naum: 34, habacuc: 35, sofonias: 36, ageu: 37,
  zacarias: 38, malaquias: 39,
  mateus: 40, marcos: 41, lucas: 42, joao: 43, atos: 44, romanos: 45,
  "1corintios": 46, "2corintios": 47, galatas: 48, efesios: 49,
  filipenses: 50, colossenses: 51, "1tessalonicenses": 52,
  "2tessalonicenses": 53, "1timoteo": 54, "2timoteo": 55, tito: 56,
  filemon: 57, hebreus: 58, tiago: 59, "1pedro": 60, "2pedro": 61,
  "1joao": 62, "2joao": 63, "3joao": 64, judas: 65, apocalipse: 66,
};
