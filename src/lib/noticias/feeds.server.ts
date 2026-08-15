// Server-only. Leitura dos feeds RSS das fontes católicas oficiais.
//
// Nenhuma notícia é inventada: cada item vem de um feed real e guarda o link
// original da fonte, que o portal exibe no rodapé do artigo.

export interface FonteFeed {
  nome: string;
  url: string;
  categoria: string;
}

export const FONTES: FonteFeed[] = [
  { nome: "Vatican News", url: "https://www.vaticannews.va/pt.rss.xml", categoria: "Vaticano" },
  { nome: "ACI Digital", url: "https://feeds.feedburner.com/acidigital", categoria: "Igreja" },
  { nome: "CNBB", url: "https://www.cnbb.org.br/feed/", categoria: "Brasil" },
];

export interface ItemFeed {
  titulo: string;
  link: string;
  resumo: string;
  publicado_em: string;
  imagem_url: string | null;
  fonte_nome: string;
  categoria: string;
}

function decodificar(texto: string): string {
  return texto
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function campo(bloco: string, tag: string): string {
  const m = bloco.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m?.[1] ? decodificar(m[1]) : "";
}

function imagem(bloco: string): string | null {
  const padroes = [
    /<media:content[^>]+url="([^"]+)"/i,
    /<media:thumbnail[^>]+url="([^"]+)"/i,
    /<enclosure[^>]+url="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i,
    /<img[^>]+src="([^"]+)"/i,
  ];
  for (const p of padroes) {
    const m = bloco.match(p);
    if (m?.[1]?.startsWith("http")) return m[1];
  }
  return null;
}

/** Lê um feed RSS e devolve os itens mais recentes. */
export async function lerFeed(fonte: FonteFeed, limite = 6): Promise<ItemFeed[]> {
  const resposta = await fetch(fonte.url, {
    headers: { "User-Agent": "PortalCatolico/1.0 (+https://portalcatolico.vercel.app)" },
  });
  if (!resposta.ok) throw new Error(`${fonte.nome}: HTTP ${resposta.status}`);
  const xml = await resposta.text();

  const blocos = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const itens: ItemFeed[] = [];

  for (const bloco of blocos.slice(0, limite)) {
    const titulo = campo(bloco, "title");
    const link = campo(bloco, "link") || (bloco.match(/<link[^>]+href="([^"]+)"/i)?.[1] ?? "");
    if (!titulo || !link.startsWith("http")) continue;

    const dataBruta = campo(bloco, "pubDate") || campo(bloco, "dc:date");
    const data = dataBruta ? new Date(dataBruta) : new Date();

    itens.push({
      titulo,
      link,
      resumo: campo(bloco, "description") || campo(bloco, "content:encoded"),
      publicado_em: Number.isNaN(data.getTime()) ? new Date().toISOString() : data.toISOString(),
      imagem_url: imagem(bloco),
      fonte_nome: fonte.nome,
      categoria: fonte.categoria,
    });
  }

  return itens;
}

/** Lê todas as fontes; falha de uma não derruba as outras. */
export async function lerTodasAsFontes(porFonte = 5): Promise<ItemFeed[]> {
  const resultados = await Promise.allSettled(FONTES.map((f) => lerFeed(f, porFonte)));
  const itens: ItemFeed[] = [];
  resultados.forEach((r, i) => {
    if (r.status === "fulfilled") itens.push(...r.value);
    else console.error("[noticias:feed]", FONTES[i]?.nome, r.reason);
  });
  return itens.sort((a, b) => b.publicado_em.localeCompare(a.publicado_em));
}
