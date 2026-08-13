/**
 * Graus de formação ligados ao nível de XP.
 *
 * O XP deixa de ser um número solto: cada faixa recebe um título que descreve
 * o estágio de formação do peregrino e o que se espera dele naquele degrau.
 */

export type GrauFormacao = {
  /** Nível mínimo para receber o título. */
  de: number;
  titulo: string;
  /** Símbolo curto usado nos selos. */
  simbolo: string;
  descricao: string;
};

export const GRAUS: GrauFormacao[] = [
  {
    de: 1,
    titulo: "Iniciante",
    simbolo: "🌱",
    descricao: "Primeiros passos: oração diária e leitura dos Evangelhos.",
  },
  {
    de: 2,
    titulo: "Discípulo",
    simbolo: "📖",
    descricao: "Escuta constante da Palavra e hábito de oração firmado.",
  },
  {
    de: 4,
    titulo: "Estudante da Fé",
    simbolo: "✝️",
    descricao: "Estudo regular do Catecismo e das trilhas de formação.",
  },
  {
    de: 7,
    titulo: "Aprofundado",
    simbolo: "🎓",
    descricao: "Leitura ampla da Escritura e domínio das trilhas intermediárias.",
  },
  {
    de: 11,
    titulo: "Conhecedor da Doutrina",
    simbolo: "🕊️",
    descricao: "Formação madura: doutrina, apologética e vida espiritual integradas.",
  },
  {
    de: 16,
    titulo: "Mestre de Oração",
    simbolo: "🏛️",
    descricao: "Constância longa na oração e na formação; pronto para ajudar outros.",
  },
];

export function grauDoNivel(nivel: number): GrauFormacao {
  let atual = GRAUS[0]!;
  for (const grau of GRAUS) if (nivel >= grau.de) atual = grau;
  return atual;
}

/** Próximo grau ainda não alcançado, quando existir. */
export function proximoGrau(nivel: number): GrauFormacao | null {
  return GRAUS.find((g) => g.de > nivel) ?? null;
}
