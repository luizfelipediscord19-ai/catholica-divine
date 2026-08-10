/**
 * Estrutura das trilhas de aprendizado do Portal Católico.
 *
 * Cada lição é composta por blocos tipados, para que o leitor sempre saiba
 * de onde vem cada afirmação: Escritura, Catecismo, Padres, Magistério,
 * prática pastoral ou dúvidas frequentes.
 */

export type TipoBloco =
  | "texto"
  | "escritura"
  | "catecismo"
  | "padres"
  | "magisterio"
  | "pratica"
  | "duvidas";

export interface Citacao {
  /** Referência curta, ex.: "Jo 6, 51-58" ou "CIC §1324" */
  ref: string;
  /** Texto citado ou paráfrase identificada como tal. */
  texto: string;
}

export interface Duvida {
  pergunta: string;
  resposta: string;
}

export interface Bloco {
  tipo: TipoBloco;
  titulo: string;
  /** Parágrafos de texto corrido. */
  paragrafos?: string[];
  /** Citações com referência verificável. */
  citacoes?: Citacao[];
  /** Lista de passos ou pontos. */
  pontos?: string[];
  /** Perguntas frequentes (usado com tipo "duvidas"). */
  duvidas?: Duvida[];
}

export interface Fonte {
  obra: string;
  ref: string;
  url?: string;
}

export interface LinkRelacionado {
  label: string;
  to: string;
  params?: Record<string, string>;
}

export interface Licao {
  slug: string;
  titulo: string;
  resumo: string;
  /** Minutos estimados de leitura. */
  minutos: number;
  blocos: Bloco[];
  fontes: Fonte[];
  relacionados?: LinkRelacionado[];
}

export interface Trilha {
  slug: string;
  titulo: string;
  subtitulo: string;
  nivel: "Iniciante" | "Intermediário" | "Avançado";
  /** Emoji sóbrio usado como marcador discreto. */
  marcador: string;
  descricao: string;
  paraQuem: string;
  licoes: Licao[];
}

export const ROTULO_BLOCO: Record<TipoBloco, string> = {
  texto: "Explicação",
  escritura: "O que diz a Escritura",
  catecismo: "O que diz o Catecismo",
  padres: "O que ensinaram os Padres e Doutores",
  magisterio: "O que diz o Magistério",
  pratica: "Na prática",
  duvidas: "Principais dúvidas",
};
