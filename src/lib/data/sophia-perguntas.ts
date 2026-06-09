export type SophiaMode = "geral" | "coroinhas";

export const SUGESTOES_GERAL: string[] = [
  "O que é a Santíssima Trindade?",
  "Por que os católicos veneram Maria?",
  "Como funciona a confissão?",
  "O que é a Eucaristia?",
];

export const SUGESTOES_COROINHAS: string[] = [
  "Como deve ser a genuflexão diante do Sacrário?",
  "Qual a função do turiferário na Missa solene?",
  "Quando se usa a cor rosa nas vestes litúrgicas?",
  "O que diz a IGMR sobre o manuseio do cálice?",
];

export const PERGUNTAS_POR_MODO: Record<SophiaMode, string[]> = {
  geral: SUGESTOES_GERAL,
  coroinhas: SUGESTOES_COROINHAS,
};
