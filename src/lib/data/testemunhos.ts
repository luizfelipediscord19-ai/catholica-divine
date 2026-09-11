/**
 * Depoimentos editoriais do Portal: cada testemunho tem foto, data, cidade e
 * texto, e pode apontar para a conversa correspondente no fórum.
 *
 * Somente relatos realmente enviados por leitores entram aqui — nada de
 * exemplos fictícios. Para publicar um novo depoimento, acrescente um item.
 */
export type Testemunho = {
  /** Identificador na URL: /testemunhos/{slug} */
  slug: string;
  titulo: string;
  /** Nome como o autor deseja aparecer. */
  autor: string;
  cidade: string;
  /** Data do relato em ISO (AAAA-MM-DD). */
  data: string;
  /** Foto do autor ou da graça recebida (URL absoluta ou asset importado). */
  foto?: string;
  fotoCredito?: string;
  /** Frase curta de abertura, usada nas listas e no compartilhamento. */
  resumo: string;
  /** Texto do depoimento, um parágrafo por item. */
  paragrafos: string[];
  /** Slug do tópico no fórum, quando o relato também está lá. */
  forumSlug?: string;
};

export const TESTEMUNHOS: Testemunho[] = [];

export function testemunhoPorSlug(slug: string): Testemunho | undefined {
  return TESTEMUNHOS.find((t) => t.slug === slug);
}

export function testemunhosOrdenados(): Testemunho[] {
  return [...TESTEMUNHOS].sort((a, b) => b.data.localeCompare(a.data));
}

export function dataTestemunho(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(Date.UTC(ano ?? 2026, (mes ?? 1) - 1, dia ?? 1)).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
