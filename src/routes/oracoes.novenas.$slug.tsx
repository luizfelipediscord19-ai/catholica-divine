import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Section } from "../components/PageShell";
import { NOVENAS, type Novena } from "../lib/data/devocoes/novenas";

export const Route = createFileRoute("/oracoes/novenas/$slug")({
  head: ({ params }) => {
    const n = NOVENAS.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${n?.titulo ?? "Novena"} — Portal Católico` },
        { name: "description", content: n?.resumo ?? "Novena católica" },
      ],
    };
  },
  loader: ({ params }) => {
    const n = NOVENAS.find((x) => x.slug === params.slug);
    if (!n) throw notFound();
    return { n };
  },
  component: Page,
  notFoundComponent: () => <div className="p-10">Novena não encontrada. <Link to="/oracoes/novenas" className="underline">Voltar</Link></div>,
});

function Page() {
  const { n } = Route.useLoaderData() as { n: Novena };
  return (
    <div>
      <PageHero eyebrow="Novena" title={n.titulo} intro={n.ocasiao} />
      <Section kicker="Estrutura" title="Como rezar esta novena">
        <div className="border border-gold/30 bg-card p-8 mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Oração inicial — todos os dias</p>
          <p className="italic text-foreground/90 leading-relaxed">{n.oracaoInicial}</p>
        </div>

        <div className="grid gap-4">
          {n.dias.map((d) => (
            <div key={d.dia} className="border border-gold/20 bg-card p-6">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl text-gold">{d.dia}</span>
                <div>
                  <h3 className="font-display text-xl">{d.titulo}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{d.meditacao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gold/30 bg-card p-8 mt-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Oração final — todos os dias</p>
          <p className="italic text-foreground/90 leading-relaxed">{n.oracaoFinal}</p>
        </div>

        {n.fonte ? <p className="mt-6 text-xs text-muted-foreground">Fonte: {n.fonte}</p> : null}
      </Section>

      <Section>
        <Link to="/oracoes/novenas" className="px-5 py-3 border border-gold/40 hover:bg-gold/10">← Outras novenas</Link>
      </Section>
    </div>
  );
}
