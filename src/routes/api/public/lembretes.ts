import { createFileRoute } from "@tanstack/react-router";

/**
 * Dispara os lembretes diários nos aparelhos inscritos.
 *
 * Chamada pelo agendador (Vercel Cron a cada 10 minutos, que envia
 * `Authorization: Bearer $CRON_SECRET`) ou por qualquer agendador externo com o
 * cabeçalho `x-cron-secret`. Sem o segredo correto a rota não faz nada.
 */
async function despachar(request: Request) {
  const segredo = process.env["CRON_SECRET"];
  const enviado =
    request.headers.get("x-cron-secret") ??
    (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");

  if (!segredo || !enviado || enviado !== segredo) {
    return new Response("Não autorizado", { status: 401 });
  }

  try {
    const { despacharLembretes } = await import("@/lib/push/registro.server");
    const resultado = await despacharLembretes();
    return Response.json({ ok: true, ...resultado });
  } catch (erro) {
    console.error("[lembretes]", erro);
    return Response.json({ ok: false }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/public/lembretes")({
  server: {
    handlers: {
      GET: ({ request }) => despachar(request),
      POST: ({ request }) => despachar(request),
    },
  },
});
