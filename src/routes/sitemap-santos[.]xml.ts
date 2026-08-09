import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SANTOS, respostaSitemap } from "@/lib/seo/sitemap-entries";

export const Route = createFileRoute("/sitemap-santos.xml")({
  server: { handlers: { GET: async () => respostaSitemap(SANTOS) } },
});
