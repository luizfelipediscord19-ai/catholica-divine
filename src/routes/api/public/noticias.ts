import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Porta de entrada das notícias diárias (agente Hermes).
 *
 * POST /api/public/noticias
 *   Cabeçalhos: `Authorization: Bearer $HERMES_TOKEN` (ou `x-hermes-token`)
 *   Corpo: { "noticias": [ { titulo, resumo, corpo, categoria?, tags?,
 *            fonte_nome?, fonte_url?, imagem_url?, autor?, publicado_em?,
 *            destaque?, slug? } ] }
 *
 * GET /api/public/noticias  → últimas notícias publicadas (JSON público).
 */

const Entrada = z.object({
  titulo: z.string().trim().min(6).max(200),
  resumo: z.string().trim().min(10).max(600),
  corpo: z.string().trim().min(20).max(20000),
  slug: z.string().trim().max(120).optional(),
  categoria: z.string().trim().max(60).optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(10).optional(),
  fonte_nome: z.string().trim().max(120).nullish(),
  fonte_url: z.string().trim().url().max(500).nullish(),
  imagem_url: z.string().trim().url().max(500).nullish(),
  autor: z.string().trim().max(120).nullish(),
  publicado_em: z.string().trim().datetime().nullish(),
  destaque: z.boolean().optional(),
  publicada: z.boolean().optional(),
});

const Corpo = z.union([
  z.object({ noticias: z.array(Entrada).min(1).max(30) }),
  Entrada.transform((n) => ({ noticias: [n] })),
]);

function autorizado(request: Request): boolean {
  const segredo = process.env["HERMES_TOKEN"];
  const enviado =
    request.headers.get("x-hermes-token") ??
    (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return Boolean(segredo && enviado && enviado === segredo);
}

export const Route = createFileRoute("/api/public/noticias")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { listarNoticias } = await import("@/lib/noticias/db.server");
          const noticias = await listarNoticias({ limite: 20 });
          return Response.json(
            { ok: true, noticias },
            { headers: { "Cache-Control": "public, max-age=300" } },
          );
        } catch (erro) {
          console.error("[noticias:get]", erro);
          return Response.json({ ok: false }, { status: 500 });
        }
      },

      POST: async ({ request }) => {
        if (!autorizado(request)) {
          return Response.json({ ok: false, erro: "Não autorizado" }, { status: 401 });
        }

        let bruto: unknown;
        try {
          bruto = await request.json();
        } catch {
          return Response.json({ ok: false, erro: "JSON inválido" }, { status: 400 });
        }

        const analise = Corpo.safeParse(bruto);
        if (!analise.success) {
          return Response.json(
            { ok: false, erro: "Dados inválidos", detalhes: analise.error.issues.slice(0, 8) },
            { status: 422 },
          );
        }

        try {
          const { publicarNoticias } = await import("@/lib/noticias/db.server");
          const resultado = await publicarNoticias(analise.data.noticias);
          return Response.json({ ok: true, ...resultado });
        } catch (erro) {
          console.error("[noticias:post]", erro);
          return Response.json({ ok: false, erro: "Falha ao gravar" }, { status: 500 });
        }
      },
    },
  },
});
