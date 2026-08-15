/**
 * Catálogo de variantes otimizadas (AVIF/WebP em 640/1024/1600px) geradas a
 * partir dos JPEG originais em `src/assets`. O Vite resolve e versiona cada
 * arquivo em build; aqui só montamos os `srcset` por imagem.
 */
const VARIANTES = import.meta.glob("../assets/otim/*.{avif,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type Fontes = { avif: string; webp: string; larguras: number[] };

const CATALOGO: Record<string, { avif: [number, string][]; webp: [number, string][] }> = {};

for (const [caminho, url] of Object.entries(VARIANTES)) {
  const arquivo = caminho.split("/").pop()!;
  const casa = /^(.+)-(\d+)\.(avif|webp)$/.exec(arquivo);
  if (!casa) continue;
  const [, base, largura, formato] = casa;
  const item = (CATALOGO[base!] ??= { avif: [], webp: [] });
  item[formato as "avif" | "webp"].push([Number(largura), url]);
}

for (const item of Object.values(CATALOGO)) {
  item.avif.sort((a, b) => a[0] - b[0]);
  item.webp.sort((a, b) => a[0] - b[0]);
}

const BASES = Object.keys(CATALOGO).sort((a, b) => b.length - a.length);

/** Descobre a base ("velas") a partir da URL versionada do JPEG importado. */
function baseDaUrl(url: string): string | undefined {
  const arquivo = url.split("/").pop()?.split("?")[0] ?? "";
  const semExt = arquivo.replace(/\.[a-z0-9]+$/i, "");
  return BASES.find((b) => semExt === b || semExt.startsWith(`${b}-`));
}

/** Retorna os srcset otimizados para um JPEG importado, ou null se não houver. */
export function fontesDe(url: string): Fontes | null {
  const base = baseDaUrl(url);
  if (!base) return null;
  const item = CATALOGO[base]!;
  const montar = (lista: [number, string][]) => lista.map(([w, u]) => `${u} ${w}w`).join(", ");
  return {
    avif: montar(item.avif),
    webp: montar(item.webp),
    larguras: item.webp.map(([w]) => w),
  };
}
