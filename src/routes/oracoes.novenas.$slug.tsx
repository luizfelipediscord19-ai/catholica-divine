import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Section } from "../components/PageShell";
import { NOVENAS, type Novena } from "../lib/data/devocoes/novenas";
import velas from "@/assets/velas.jpg";



export const Route = createFileRoute("/oracoes/novenas/$slug")({
  head: ({ params }) => {
    const n = NOVENAS.find((x) => x.slug === params.slug);
    const url = `https://portalcatolico.vercel.app/oracoes/novenas/${params.slug}`;
    return {
      meta: [
        { title: `${n?.titulo ?? "Novena"} — Portal Católico` },
        { name: "description", content: n?.resumo ?? "Novena católica" },
        { property: "og:title", content: `${n?.titulo ?? "Novena"} — Novena Católica` },
        { property: "og:description", content: n?.resumo ?? "Novena católica" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
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
      <PageHero
        eyebrow="Novena"
        title={n.titulo}
        intro={n.ocasiao}
        autoridade={["devocao", "tradicao"]}
        notaAutoridade="Novenas são práticas piedosas aprovadas pelo uso na Igreja; a adesão é livre e não constitui obrigação de fé."
      />

      <Section kicker="Estrutura" title="Como rezar esta novena">
        <div className="surface-card p-8 mb-8">
          <p className="kicker mb-2">Oração inicial — todos os dias</p>
          <p className="italic text-foreground/90 leading-relaxed">{n.oracaoInicial}</p>
        </div>

        <div className="grid gap-4">
          {n.dias.map((d) => (
            <div key={d.dia} className="surface-card p-6">
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

        <div className="surface-card p-8 mt-8">
          <p className="kicker mb-2">Oração final — todos os dias</p>
          <p className="italic text-foreground/90 leading-relaxed">{n.oracaoFinal}</p>
        </div>

        {n.fonte ? <p className="mt-6 text-xs text-muted-foreground">Fonte: {n.fonte}</p> : null}
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/oracoes/novenas" className="px-5 py-3 btn-base btn-outline-gold">← Outras novenas</Link>
        </div>
      </Section>

    </div>
  );
}
