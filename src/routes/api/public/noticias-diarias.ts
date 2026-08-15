import { createFileRoute } from "@tanstack/react-router";

/**
 * Edição diária automática de notícias.
 *
 * Fluxo: feeds RSS reais (Vatican News, ACI Digital, CNBB) → Groq redige em
 * português → grava no acervo com o link da fonte original.
 *
 * Chamada pelo agendador (Vercel Cron às 15:00 UTC = 12:00 em Brasília, com
 * `Authorization: Bearer $CRON_SECRET`) ou manualmente com `x-cron-secret`.
 * O `HERMES_TOKEN` também é aceito, para disparo pelo agente.
 */
function autorizado(request: Request): boolean {
  const enviado =
    request.headers.get("x-cron-secret") ??
    request.headers.get("x-hermes-token") ??
    (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!enviado) return false;

  const aceitos = [process.env["CRON_SECRET"], process.env["HERMES_TOKEN"]].filter(
    (s): s is string => Boolean(s),
  );
  return aceitos.some((s) => s === enviado);
}

async function executar(request: Request) {
  if (!autorizado(request)) {
    return Response.json({ ok: false, erro: "Não autorizado" }, { status: 401 });
  }

  try {
    const { ingerirEdicaoDoDia } = await import("@/lib/noticias/ingestao.server");
    const resultado = await ingerirEdicaoDoDia();
    return Response.json(resultado, { status: resultado.ok ? 200 : 500 });
  } catch (erro) {
    console.error("[noticias:ingestao]", erro);
    return Response.json({ ok: false, erro: "Falha na edição do dia" }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/public/noticias-diarias")({
  server: {
    handlers: {
      GET: ({ request }) => executar(request),
      POST: ({ request }) => executar(request),
    },
  },
});
