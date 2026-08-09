import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BIBLIA_CAPITULOS, respostaSitemap } from "@/lib/seo/sitemap-entries";

export const Route = createFileRoute("/sitemap-biblia-capitulos.xml")({
  server: { handlers: { GET: async () => respostaSitemap(BIBLIA_CAPITULOS) } },
});
