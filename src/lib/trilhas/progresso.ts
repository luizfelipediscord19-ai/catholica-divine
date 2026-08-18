const CHAVE = "portal:trilhas:progresso";

export interface ProgressoTrilhas {
  /** licões concluídas: `${trilha}/${licao}` */
  concluidas: string[];
  /** última lição aberta */
  ultima?: { trilha: string; licao: string; em: number };
}

const VAZIO: ProgressoTrilhas = { concluidas: [] };

export function lerProgresso(): ProgressoTrilhas {
  if (typeof window === "undefined") return VAZIO;
  try {
    const raw = window.localStorage.getItem(CHAVE);
    if (!raw) return VAZIO;
    const dados = JSON.parse(raw) as ProgressoTrilhas;
    return { concluidas: Array.isArray(dados.concluidas) ? dados.concluidas : [], ultima: dados.ultima };
  } catch {
    return VAZIO;
  }
}

function salvar(dados: ProgressoTrilhas) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(dados));
    window.dispatchEvent(new Event("portal:trilhas"));
  } catch {
    /* armazenamento indisponível */
  }
}

export function chaveLicao(trilha: string, licao: string) {
  return `${trilha}/${licao}`;
}

export function marcarVisita(trilha: string, licao: string) {
  const atual = lerProgresso();
  salvar({ ...atual, ultima: { trilha, licao, em: Date.now() } });
}

export function alternarConclusao(trilha: string, licao: string): boolean {
  const atual = lerProgresso();
  const chave = chaveLicao(trilha, licao);
  const concluida = atual.concluidas.includes(chave);
  const concluidas = concluida
    ? atual.concluidas.filter((c) => c !== chave)
    : [...atual.concluidas, chave];
  salvar({ ...atual, concluidas });
  return !concluida;
}

export function percentual(trilhaSlug: string, licoes: { slug: string }[], progresso: ProgressoTrilhas) {
  if (licoes.length === 0) return 0;
  const feitas = licoes.filter((l) => progresso.concluidas.includes(chaveLicao(trilhaSlug, l.slug))).length;
  return Math.round((feitas / licoes.length) * 100);
}

/** Quantidade de lições concluídas de uma trilha. */
export function concluidasDe(
  trilhaSlug: string,
  licoes: { slug: string }[],
  progresso: ProgressoTrilhas,
): number {
  return licoes.filter((l) => progresso.concluidas.includes(chaveLicao(trilhaSlug, l.slug))).length;
}

/** Total de lições concluídas em todas as trilhas informadas. */
export function resumoGeral(
  trilhas: { slug: string; licoes: { slug: string }[] }[],
  progresso: ProgressoTrilhas,
): { feitas: number; total: number; percentual: number } {
  const total = trilhas.reduce((n, t) => n + t.licoes.length, 0);
  const feitas = trilhas.reduce((n, t) => n + concluidasDe(t.slug, t.licoes, progresso), 0);
  return { feitas, total, percentual: total ? Math.round((feitas / total) * 100) : 0 };
}
