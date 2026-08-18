import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { PageHero, Section, Prose } from "../components/PageShell";
import { acharPlano, capitulosDoDia, rotuloDia } from "../lib/data/biblia/planos";
import {
  alternarDia,
  chaveDia,
  diasFeitos,
  EVENTO_PLANOS,
  lerPlanos,
  marcarPlanoAberto,
  percentualPlano,
  proximoDia,
  type ProgressoPlanos,
} from "../lib/biblia/planos-progresso";

export const Route = createFileRoute("/biblia/planos/$slug")({
  loader: ({ params }) => {
    const plano = acharPlano(params.slug);
    if (!plano) throw notFound();
    return { slug: plano.slug };
  },
  head: ({ params }) => {
    const plano = acharPlano(params.slug);
    if (!plano) {
      return {
        meta: [{ title: "Plano não encontrado" }, { name: "robots", content: "noindex" }],
      };
    }
    const url = `https://portalcatolico.vercel.app/biblia/planos/${plano.slug}`;
    return {
      meta: [
        { title: `${plano.titulo} — Plano de Leitura Bíblica — Portal Católico` },
        { name: "description", content: plano.descricao.slice(0, 158) },
        { property: "og:title", content: plano.titulo },
        { property: "og:description", content: plano.subtitulo },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const plano = acharPlano(slug)!;
  const [progresso, setProgresso] = useState<ProgressoPlanos>({ concluidos: [] });

  useEffect(() => {
    const atualizar = () => setProgresso(lerPlanos());
    atualizar();
    marcarPlanoAberto(slug);
    window.addEventListener(EVENTO_PLANOS, atualizar);
    return () => window.removeEventListener(EVENTO_PLANOS, atualizar);
  }, [slug]);

  const pct = percentualPlano(plano.slug, plano.dias.length, progresso);
  const feitos = diasFeitos(plano.slug, progresso);
  const proximo = proximoDia(plano.slug, plano.dias.length, progresso);

  return (
    <div>
      <PageHero
        autoridade={["oficial"]}
        notaAutoridade="A distribuição dos dias é uma proposta pastoral do portal, elaborada sobre a ordem canônica dos 73 livros."
        eyebrow="Plano de leitura"
        title={plano.titulo}
        intro={plano.descricao}
      />

      <Section kicker="Seu progresso" title={`${feitos} de ${plano.dias.length} dias concluídos`}>
        <div className="measure">
          <div
            className="h-1.5 w-full overflow-hidden bg-gold/10"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso em ${plano.titulo}`}
          >
            <div className="h-full bg-gold/70 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2xs text-step--2 text-muted-foreground">
            {pct}% · {plano.capitulos} capítulos no total
            {proximo ? ` · continue pelo dia ${proximo}` : " · plano concluído, Deus seja louvado"}
          </p>
        </div>

        <Prose>
          <p>{plano.paraQuem}</p>
        </Prose>

        <ol className="mt-[var(--space-md)] space-y-2">
          {plano.dias.map((dia) => {
            const feito = progresso.concluidos.includes(chaveDia(plano.slug, dia.dia));
            const atual = dia.dia === proximo;
            return (
              <li
                key={dia.dia}
                className={[
                  "flex min-w-0 flex-col gap-3 border p-[var(--space-sm)] transition-premium sm:flex-row sm:items-center sm:justify-between",
                  feito
                    ? "border-gold/40 bg-gold/5"
                    : atual
                      ? "border-gold/30 bg-card/60"
                      : "border-gold/10 bg-card/30",
                ].join(" ")}
              >
                <div className="min-w-0">
                  <p className="kicker">
                    Dia {dia.dia}
                    {atual && !feito ? " · continue aqui" : ""}
                  </p>
                  <p className="mt-1 title-sub">{rotuloDia(dia)}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {capitulosDoDia(dia).map((c) => (
                      <li key={`${c.livro}-${c.cap}`}>
                        <Link
                          to="/biblia/$livro/$capitulo"
                          params={{ livro: c.livro, capitulo: String(c.cap) }}
                          className="inline-flex min-h-9 items-center border border-gold/15 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
                        >
                          {c.nome} {c.cap}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => alternarDia(plano.slug, dia.dia)}
                  aria-pressed={feito}
                  className={[
                    "btn-base shrink-0 self-start border px-4 py-2 label-btn transition-premium sm:self-center",
                    feito
                      ? "border-gold bg-gold text-deep"
                      : "border-gold/30 text-foreground/85 hover:border-gold hover:text-gold",
                  ].join(" ")}
                >
                  {feito ? (
                    <span className="inline-flex items-center gap-2">
                      <Check className="size-3.5" aria-hidden="true" /> Lido
                    </span>
                  ) : (
                    "Marcar como lido"
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        <p className="mt-[var(--space-md)]">
          <Link
            to="/biblia/planos"
            className="kicker transition-colors hover:text-gold"
          >
            ← Todos os planos
          </Link>
        </p>
      </Section>
    </div>
  );
}
