import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import { NOVENAS } from "../lib/data/devocoes/novenas";

export const Route = createFileRoute("/oracoes/novenas")({
  head: () => ({
    meta: [
      { title: "Novenas Católicas — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/novenas" },
      { name: "description", content: "Novena ao Espírito Santo, Nossa Senhora Aparecida, São José, Sagrado Coração e outras." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/novenas" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Novendialia"
        title="Novenas"
        intro="Nove dias de oração — fundamentada no Cenáculo, quando Maria e os Apóstolos perseveravam em oração à espera do Espírito Santo (At 1,14)."
      />
      <Section kicker="Selecione uma novena" title="Tradição viva da Igreja">
        <CardGrid cols={2}>
          {NOVENAS.map((n) => (
            <Link key={n.slug} to="/oracoes/novenas/$slug" params={{ slug: n.slug }}>
              <ContentCard title={n.titulo} subtitle={n.ocasiao}>
                {n.resumo}
              </ContentCard>
            </Link>
          ))}
        </CardGrid>
      </Section>
      <Section>
        <Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold">← Todas as orações</Link>
      </Section>
    </div>
  );
}
