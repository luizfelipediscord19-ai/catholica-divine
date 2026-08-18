import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { respostaSitemap, type SitemapEntry } from "@/lib/seo/sitemap-entries";

/**
 * Sitemap das notícias publicadas. Espelha o mesmo filtro do leitor
 * (`publicada = true`, já publicadas), para que o Google descubra cada
 * edição diária no dia em que ela sai.
 */
export const Route = createFileRoute("/sitemap-noticias.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { listarNoticias } = await import("@/lib/noticias/db.server");
        let entries: SitemapEntry[] = [];
        try {
          const noticias = await listarNoticias({ limite: 60 });
          entries = noticias.map((n) => ({
            path: `/noticias/${n.slug}`,
            lastmod: n.publicado_em ? new Date(n.publicado_em).toISOString() : undefined,
            changefreq: "daily" as const,
            priority: "0.7",
          }));
        } catch {
          entries = [];
        }
        return respostaSitemap(entries);
      },
    },
  },
});
