import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LIVROS } from "@/lib/data/biblia/index";
import { SANTOS_LISTA } from "@/lib/santos-lista";
import { PARTES } from "@/lib/data/catecismo/index";
import { NOVENAS } from "@/lib/data/devocoes/novenas";

const BASE_URL = "https://catholica-divine.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const STATIC_PATHS: SitemapEntry[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/fe-catolica", changefreq: "monthly", priority: "0.8" },
  { path: "/biblia", changefreq: "weekly", priority: "0.9" },
  { path: "/biblia/leituras", changefreq: "daily", priority: "0.8" },
  { path: "/catecismo", changefreq: "monthly", priority: "0.9" },
  { path: "/sacramentos", changefreq: "monthly", priority: "0.8" },
  { path: "/santos", changefreq: "weekly", priority: "0.8" },
  { path: "/maria", changefreq: "monthly", priority: "0.8" },
  { path: "/oracoes", changefreq: "monthly", priority: "0.8" },
  { path: "/oracoes/rosario", changefreq: "monthly", priority: "0.7" },
  { path: "/oracoes/via-sacra", changefreq: "monthly", priority: "0.7" },
  { path: "/oracoes/terco-misericordia", changefreq: "monthly", priority: "0.7" },
  { path: "/oracoes/novenas", changefreq: "monthly", priority: "0.7" },
  { path: "/oracoes/liturgia-das-horas", changefreq: "daily", priority: "0.7" },
  { path: "/apologetica", changefreq: "monthly", priority: "0.8" },
  { path: "/doutores-da-igreja", changefreq: "monthly", priority: "0.7" },
  { path: "/coroinhas", changefreq: "monthly", priority: "0.6" },
  { path: "/glossario", changefreq: "monthly", priority: "0.7" },
  { path: "/calendario-liturgico", changefreq: "weekly", priority: "0.7" },
  { path: "/liturgia-diaria", changefreq: "daily", priority: "0.9" },
  { path: "/forum", changefreq: "hourly", priority: "0.8" },
  { path: "/painel", changefreq: "monthly", priority: "0.3" },
  { path: "/assistente", changefreq: "monthly", priority: "0.7" },
  { path: "/busca", changefreq: "monthly", priority: "0.7" },
  { path: "/sobre", changefreq: "monthly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          ...STATIC_PATHS,
          ...LIVROS.map((l) => ({
            path: `/biblia/${l.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
          ...LIVROS.flatMap((l) =>
            Array.from({ length: l.capitulos }, (_, i) => ({
              path: `/biblia/${l.slug}/${i + 1}`,
              changefreq: "yearly" as const,
              priority: "0.5",
            })),
          ),
          ...PARTES.map((parte) => ({
            path: `/catecismo/${parte.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          ...NOVENAS.map((n) => ({
            path: `/oracoes/novenas/${n.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
          ...SANTOS_LISTA.map((s) => ({
            path: `/santos/${s.slug}`,
            changefreq: "yearly" as const,
            priority: "0.5",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
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
