import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BIBLIA_LIVROS, respostaSitemap } from "@/lib/seo/sitemap-entries";

export const Route = createFileRoute("/sitemap-biblia-livros.xml")({
  server: { handlers: { GET: async () => respostaSitemap(BIBLIA_LIVROS) } },
});
