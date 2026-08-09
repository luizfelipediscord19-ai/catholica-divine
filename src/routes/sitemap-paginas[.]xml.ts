import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PAGINAS, respostaSitemap } from "@/lib/seo/sitemap-entries";

export const Route = createFileRoute("/sitemap-paginas.xml")({
  server: { handlers: { GET: async () => respostaSitemap(PAGINAS) } },
});
