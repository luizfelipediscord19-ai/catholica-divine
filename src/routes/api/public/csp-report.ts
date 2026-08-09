import { createFileRoute } from "@tanstack/react-router";

/**
 * Coletor de violações da CSP em modo report-only.
 * Só registra no log do servidor: nada é gravado no banco e nada é devolvido
 * ao chamador, para não criar superfície de abuso.
 */
export const Route = createFileRoute("/api/public/csp-report")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const bruto = await request.text();
          // Limite de tamanho: relatórios legítimos são pequenos.
          if (bruto.length > 8_000) return new Response(null, { status: 204 });

          const dados = JSON.parse(bruto) as
            | { "csp-report"?: Record<string, unknown> }
            | Array<{ body?: Record<string, unknown> }>;

          const relatorios = Array.isArray(dados)
            ? dados.map((r) => r.body ?? r)
            : [dados["csp-report"] ?? dados];

          for (const r of relatorios) {
            if (!r) continue;
            console.warn("[csp-report]", {
              diretiva: r["effective-directive"] ?? r["effectiveDirective"],
              bloqueado: r["blocked-uri"] ?? r["blockedURL"],
              documento: r["document-uri"] ?? r["documentURL"],
              amostra: r["script-sample"] ?? r["sample"],
            });
          }
        } catch {
          /* relatório inválido: ignora silenciosamente */
        }
        return new Response(null, { status: 204 });
      },
    },
  },
});
