// Texto bíblico hospedado no próprio portal (cópias de domínio público).
// Carregamento sob demanda: nada é baixado até o capítulo ser aberto.

export type VersoTexto = { v: number; t: string };
type LivroJson = { slug: string; nome: string; capitulos: Record<string, VersoTexto[]> };

const ARQUIVOS = import.meta.glob<{ default: LivroJson }>(
  "../data/biblia/*/*.json",
);

const cache = new Map<string, VersoTexto[] | null>();

function chaveArquivo(versao: string, slug: string): string {
  return `../data/biblia/${versao}/${slug}.json`;
}

/** Existe cópia local desta versão para este livro? */
export function temTextoLocal(versao: string, slug: string): boolean {
  return chaveArquivo(versao, slug) in ARQUIVOS;
}

/** Capítulo servido da cópia local; `null` quando não hospedamos este texto. */
export async function capituloLocal(
  versao: string,
  slug: string,
  capitulo: number,
): Promise<VersoTexto[] | null> {
  const chave = `${versao}:${slug}:${capitulo}`;
  if (cache.has(chave)) return cache.get(chave)!;

  const carregar = ARQUIVOS[chaveArquivo(versao, slug)];
  if (!carregar) {
    cache.set(chave, null);
    return null;
  }

  try {
    const mod = await carregar();
    const versos = mod.default.capitulos[String(capitulo)] ?? null;
    cache.set(chave, versos);
    return versos;
  } catch {
    cache.set(chave, null);
    return null;
  }
}
