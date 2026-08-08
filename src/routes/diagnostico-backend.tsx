import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { PageHero } from "@/components/PageShell";
import { Painel, Rotulo } from "@/components/portal/comuns";
import { verificarBackendFn } from "@/lib/diagnostico.functions";

export const Route = createFileRoute("/diagnostico-backend")({
  head: () => ({
    meta: [
      { title: "Diagnóstico do backend — Portal Católico" },
      {
        name: "description",
        content:
          "Página interna de verificação: valida a conexão do banco e as consultas mínimas do painel espiritual.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Diagnóstico do backend — Portal Católico" },
      {
        property: "og:description",
        content: "Verificação interna da conexão e das consultas do painel espiritual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiagnosticoBackendPage,
});

function DiagnosticoBackendPage() {
  const check = useQuery({
    queryKey: ["diagnostico-backend"],
    queryFn: () => verificarBackendFn(),
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <PageHero
        eyebrow="Página interna"
        title={
          <>
            Diagnóstico do <span className="italic font-light text-gold">backend</span>
          </>
        }
        intro="Verifica as variáveis de conexão e executa as consultas mínimas do painel espiritual: identidade, favoritos e progresso de leitura."
      />

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <Painel>
          <Rotulo>Status detalhado</Rotulo>

          {check.isPending ? (
            <p className="text-sm text-muted-foreground font-light">Executando verificações…</p>
          ) : check.isError || !check.data ? (
            <p className="text-sm text-destructive">
              O servidor não respondeu ao diagnóstico:{" "}
              {check.error instanceof Error ? check.error.message : "erro desconhecido"}
            </p>
          ) : (
            <div className="space-y-6">
              <p
                className={`text-[10px] uppercase tracking-[0.25em] ${
                  check.data.saudavel ? "text-gold" : "text-destructive"
                }`}
              >
                {check.data.saudavel
                  ? "Tudo operacional"
                  : "Há itens que precisam de atenção"}
              </p>

              <ul className="divide-y divide-border/60">
                {check.data.verificacoes.map((v) => (
                  <li key={v.chave} className="py-4 flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className={`mt-1 size-2 shrink-0 rounded-full ${
                        v.ok ? "bg-gold" : "bg-destructive"
                      }`}
                    />
                    <div className="space-y-1">
                      <p className="text-sm text-foreground">
                        {v.titulo}{" "}
                        <span className="sr-only">{v.ok ? "— aprovado" : "— com falha"}</span>
                      </p>
                      <p className="text-xs text-muted-foreground font-light break-words">
                        {v.detalhe}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => void check.refetch()}
                  className="min-h-11 px-5 text-[10px] uppercase tracking-[0.2em] border border-gold/40 text-foreground/80 hover:text-gold hover:border-gold transition-colors"
                >
                  Verificar de novo
                </button>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {new Date(check.data.geradoEm).toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          )}
        </Painel>
      </div>
    </div>
  );
}
