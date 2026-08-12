/**
 * Marcador de leitura local (localStorage).
 *
 * Guarda o último capítulo aberto e o versículo em que a pessoa parou,
 * de forma independente da identidade/conta — funciona offline e antes de
 * qualquer carregamento do painel.
 */

const CHAVE = "portal:marcador-leitura";

export type MarcadorLeitura = {
  livro: string;
  livroNome: string;
  capitulo: number;
  versiculo: number;
  em: number;
};

function valido(x: unknown): x is MarcadorLeitura {
  if (!x || typeof x !== "object") return false;
  const m = x as Record<string, unknown>;
  return (
    typeof m.livro === "string" &&
    typeof m.livroNome === "string" &&
    typeof m.capitulo === "number" &&
    typeof m.versiculo === "number" &&
    typeof m.em === "number"
  );
}

export function lerMarcador(): MarcadorLeitura | null {
  if (typeof window === "undefined") return null;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const dados = JSON.parse(bruto) as unknown;
    return valido(dados) ? dados : null;
  } catch {
    return null;
  }
}

export function salvarMarcador(m: Omit<MarcadorLeitura, "em">): void {
  if (typeof window === "undefined") return;
  try {
    const atual = lerMarcador();
    // Não regride o versículo dentro do mesmo capítulo por rolagem para cima
    // acidental logo após abrir a página.
    window.localStorage.setItem(
      CHAVE,
      JSON.stringify({ ...m, em: Date.now() } satisfies MarcadorLeitura),
    );
    void atual;
  } catch {
    /* armazenamento indisponível — segue sem marcador */
  }
}

export function limparMarcador(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CHAVE);
  } catch {
    /* ignora */
  }
}

/** Rótulo curto tipo "Jo 3:16" para exibir em botões. */
export function rotuloMarcador(m: MarcadorLeitura): string {
  return `${m.livroNome} ${m.capitulo}${m.versiculo > 1 ? `:${m.versiculo}` : ""}`;
}
