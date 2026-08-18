import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BASE_URL } from "@/lib/seo/sitemap-entries";

/**
 * Índice de sitemaps. Dividir por seção ajuda o Google a rastrear e a
 * relatar a cobertura de cada bloco separadamente, em vez de tratar
 * 1.500+ URLs como um único arquivo monolítico.
 */
const SITEMAPS = [
  "/sitemap-paginas.xml",
  "/sitemap-biblia-livros.xml",
  "/sitemap-santos.xml",
  "/sitemap-noticias.xml",
  "/sitemap-biblia-capitulos.xml",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...SITEMAPS.map((p) => `  <sitemap>\n    <loc>${BASE_URL}${p}</loc>\n  </sitemap>`),
          `</sitemapindex>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
