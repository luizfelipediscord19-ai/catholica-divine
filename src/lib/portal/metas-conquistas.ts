/**
 * Metas de cada conquista: quanto falta para desbloquear.
 * Calculado no cliente a partir dos dados que o painel já carrega.
 */

export type Totais = {
  oracoes: number;
  leituras: number;
  favoritos: number;
  notas: number;
  livrosCompletos: number;
  topicos: number;
  respostas: number;
  streak: number;
  melhorStreak: number;
  minutosMaximos: number;
  santoEscolhido: boolean;
  catecismo: number;
  maria: number;
  trilhasAvancadas: number;
};

export type Meta = { atual: number; alvo: number; unidade: string };

const META: Record<string, (t: Totais) => Meta> = {
  // Sequência de oração
  "primeira-oracao": (t) => ({ atual: t.oracoes, alvo: 1, unidade: "oração" }),
  "streak-3": (t) => ({ atual: t.melhorStreak, alvo: 3, unidade: "dias seguidos" }),
  "streak-7": (t) => ({ atual: t.melhorStreak, alvo: 7, unidade: "dias seguidos" }),
  "streak-14": (t) => ({ atual: t.melhorStreak, alvo: 14, unidade: "dias seguidos" }),
  "streak-30": (t) => ({ atual: t.melhorStreak, alvo: 30, unidade: "dias seguidos" }),
  "streak-60": (t) => ({ atual: t.melhorStreak, alvo: 60, unidade: "dias seguidos" }),
  "streak-100": (t) => ({ atual: t.melhorStreak, alvo: 100, unidade: "dias seguidos" }),
  "streak-365": (t) => ({ atual: t.melhorStreak, alvo: 365, unidade: "dias seguidos" }),

  // Volume de orações
  "oracoes-10": (t) => ({ atual: t.oracoes, alvo: 10, unidade: "orações" }),
  "oracoes-50": (t) => ({ atual: t.oracoes, alvo: 50, unidade: "orações" }),
  "oracoes-100": (t) => ({ atual: t.oracoes, alvo: 100, unidade: "orações" }),
  "oracao-30min": (t) => ({ atual: t.minutosMaximos, alvo: 30, unidade: "minutos num dia" }),
  vigilia: (t) => ({ atual: t.minutosMaximos, alvo: 60, unidade: "minutos num dia" }),

  // Leitura da Bíblia
  "primeira-leitura": (t) => ({ atual: t.leituras, alvo: 1, unidade: "capítulo" }),
  "capitulos-10": (t) => ({ atual: t.leituras, alvo: 10, unidade: "capítulos" }),
  "capitulos-25": (t) => ({ atual: t.leituras, alvo: 25, unidade: "capítulos" }),
  "capitulos-50": (t) => ({ atual: t.leituras, alvo: 50, unidade: "capítulos" }),
  "capitulos-100": (t) => ({ atual: t.leituras, alvo: 100, unidade: "capítulos" }),
  "capitulos-250": (t) => ({ atual: t.leituras, alvo: 250, unidade: "capítulos" }),
  "livro-completo": (t) => ({ atual: t.livrosCompletos, alvo: 1, unidade: "livro completo" }),
  "cinco-livros": (t) => ({ atual: t.livrosCompletos, alvo: 5, unidade: "livros completos" }),

  // Acervo pessoal
  "primeiro-favorito": (t) => ({ atual: t.favoritos, alvo: 1, unidade: "favorito" }),
  "favoritos-10": (t) => ({ atual: t.favoritos, alvo: 10, unidade: "favoritos" }),
  "favoritos-50": (t) => ({ atual: t.favoritos, alvo: 50, unidade: "favoritos" }),
  "primeira-nota": (t) => ({ atual: t.notas, alvo: 1, unidade: "anotação" }),
  "notas-5": (t) => ({ atual: t.notas, alvo: 5, unidade: "anotações" }),
  "notas-25": (t) => ({ atual: t.notas, alvo: 25, unidade: "anotações" }),
  "reflexao-profunda": (t) => ({ atual: t.notas, alvo: 10, unidade: "anotações" }),

  // Comunidade
  "primeiro-topico": (t) => ({ atual: t.topicos, alvo: 1, unidade: "tópico" }),
  "cinco-topicos": (t) => ({ atual: t.topicos, alvo: 5, unidade: "tópicos" }),
  "primeira-resposta": (t) => ({ atual: t.respostas, alvo: 1, unidade: "resposta" }),
  "cinquenta-respostas": (t) => ({ atual: t.respostas, alvo: 50, unidade: "respostas" }),

  // Formação doutrinal
  "catecismo-10": (t) => ({ atual: t.catecismo, alvo: 10, unidade: "seções do Catecismo" }),
  "conhecedor-catecismo": (t) => ({ atual: t.catecismo, alvo: 14, unidade: "seções do Catecismo" }),
  "filho-de-maria": (t) => ({ atual: t.maria, alvo: 10, unidade: "conteúdos marianos" }),
  "caminho-sao-tomas": (t) => ({
    atual: t.trilhasAvancadas,
    alvo: 1,
    unidade: "trilha avançada concluída",
  }),

  // Caminho
  "santo-padroeiro": (t) => ({ atual: t.santoEscolhido ? 1 : 0, alvo: 1, unidade: "padroeiro" }),
  "caminho-completo": (t) => ({
    atual: [t.oracoes, t.leituras, t.favoritos, t.notas].filter((v) => v > 0).length,
    alvo: 4,
    unidade: "práticas iniciadas",
  }),
};

/** Meta da conquista (ou null quando não há um contador claro). */
export function metaDaConquista(slug: string, totais: Totais): Meta | null {
  const fn = META[slug];
  if (!fn) return null;
  const meta = fn(totais);
  return { ...meta, atual: Math.min(meta.atual, meta.alvo) };
}

export function textoRestante(meta: Meta) {
  const falta = Math.max(meta.alvo - meta.atual, 0);
  if (falta === 0) return "Meta alcançada";
  return `Faltam ${falta} de ${meta.alvo} ${meta.unidade}`;
}
