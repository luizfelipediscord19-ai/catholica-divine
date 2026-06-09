import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "../components/PageShell";
import { PARTES, SECOES, VATICAN_URL } from "../lib/data/catecismo";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/catecismo")({
  head: () => ({
    meta: [
      { title: "Catecismo da Igreja Católica — Portal Católico" },
      { name: "description", content: "As quatro partes do Catecismo: Credo, Sacramentos, Vida em Cristo e Oração. Estrutura navegável com link ao texto oficial em vatican.va." },
      { property: "og:title", content: "Catecismo da Igreja Católica" },
      { property: "og:description", content: "Os 2.865 parágrafos da fé católica, organizados em quatro partes." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Catechismus Catholicae Ecclesiae"
        title="O Catecismo"
        intro="Promulgado por São João Paulo II em 1992, revisado em 1997. A exposição orgânica e sistemática da fé católica, organizada em quatro partes."
      />

      <Section kicker="As quatro partes" title="A estrutura do Catecismo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/15">
          {PARTES.map((p) => (
            <Link
              key={p.slug}
              to="/catecismo/$parte"
              params={{ parte: p.slug }}
              className="group bg-card hover:bg-background p-8 transition-colors"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
                Parte {p.num} · {p.paragrafos}
              </p>
              <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-gold">
                {p.titulo}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.resumo}</p>
              <span className="mt-6 inline-block text-[10px] tracking-[0.3em] uppercase text-gold/70 group-hover:text-gold">
                Explorar →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section kicker="Seções principais" title="Mapa detalhado">
        <div className="space-y-4">
          {SECOES.map((s) => (
            <div key={s.slug} className="border border-gold/20 p-6 bg-card">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                Parte {s.parte} · {s.paragrafos}
              </p>
              <h4 className="font-display text-xl text-foreground">{s.titulo}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.resumo}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Fonte oficial">
        <a
          href={VATICAN_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-6 py-4 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors"
        >
          <ExternalLink className="size-4" /> Texto integral em vatican.va
        </a>
      </Section>
    </div>
  );
}
