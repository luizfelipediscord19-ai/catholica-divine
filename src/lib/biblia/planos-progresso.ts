/**
 * Progresso local dos planos de leitura bíblica.
 * Segue o mesmo padrão de `src/lib/trilhas/progresso.ts`: tudo em
 * localStorage, sem depender de conta.
 */
const CHAVE = "portal:biblia:planos";
const EVENTO = "portal:planos";

export interface ProgressoPlanos {
  /** dias concluídos, no formato `${plano}/${dia}` */
  concluidos: string[];
  /** último plano aberto */
  ultimo?: { plano: string; em: number };
}

const VAZIO: ProgressoPlanos = { concluidos: [] };

export function lerPlanos(): ProgressoPlanos {
  if (typeof window === "undefined") return VAZIO;
  try {
    const raw = window.localStorage.getItem(CHAVE);
    if (!raw) return VAZIO;
    const dados = JSON.parse(raw) as ProgressoPlanos;
    return {
      concluidos: Array.isArray(dados.concluidos) ? dados.concluidos : [],
      ultimo: dados.ultimo,
    };
  } catch {
    return VAZIO;
  }
}

function salvar(dados: ProgressoPlanos) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(dados));
    window.dispatchEvent(new Event(EVENTO));
  } catch {
    /* armazenamento indisponível */
  }
}

export function chaveDia(plano: string, dia: number) {
  return `${plano}/${dia}`;
}

export function marcarPlanoAberto(plano: string) {
  const atual = lerPlanos();
  salvar({ ...atual, ultimo: { plano, em: Date.now() } });
}

export function alternarDia(plano: string, dia: number): boolean {
  const atual = lerPlanos();
  const chave = chaveDia(plano, dia);
  const feito = atual.concluidos.includes(chave);
  const concluidos = feito
    ? atual.concluidos.filter((c) => c !== chave)
    : [...atual.concluidos, chave];
  salvar({ ...atual, concluidos });
  return !feito;
}

export function diasFeitos(plano: string, progresso: ProgressoPlanos): number {
  const prefixo = `${plano}/`;
  return progresso.concluidos.filter((c) => c.startsWith(prefixo)).length;
}

export function percentualPlano(
  plano: string,
  totalDias: number,
  progresso: ProgressoPlanos,
): number {
  if (totalDias === 0) return 0;
  return Math.round((diasFeitos(plano, progresso) / totalDias) * 100);
}

/** Primeiro dia ainda não concluído — usado para "continuar de onde parei". */
export function proximoDia(
  plano: string,
  totalDias: number,
  progresso: ProgressoPlanos,
): number | undefined {
  for (let d = 1; d <= totalDias; d++) {
    if (!progresso.concluidos.includes(chaveDia(plano, d))) return d;
  }
  return undefined;
}

export const EVENTO_PLANOS = EVENTO;
