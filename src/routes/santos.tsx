import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import { SANTOS_LISTA } from "@/lib/santos-lista";

export const Route = createFileRoute("/santos")({
  head: () => ({
    meta: [
      { title: "Santos — Portal Católico" },
      { name: "description", content: "Vidas e ensinamentos dos santos: testemunhas da fé e amigos de Deus." },
      { property: "og:title", content: "Os Santos da Igreja" },
      { property: "og:description", content: "Vidas, virtudes e ensinamentos dos santos católicos." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Communio Sanctorum"
        title="Os Santos da Igreja"
        intro="As testemunhas vivas do Evangelho — homens e mulheres que, em todas as épocas, deixaram-se transformar pela graça de Cristo. Clique em qualquer santo para ler a biografia completa."
      />
      <Section kicker="Galeria dos santos" title="Os amigos de Deus">
        <CardGrid cols={3}>
          {SANTOS_LISTA.map((s, i) => (
            <Link
              key={s.slug}
              to="/santos/$slug"
              params={{ slug: s.slug }}
              className="block group animate-content-fade"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <ContentCard title={s.nome} subtitle={`Memória · ${s.data}`}>
                {s.body}
                <span className="block mt-4 text-xs text-gold/80 group-hover:text-gold tracking-[0.2em] uppercase transition-smooth group-hover:translate-x-1">
                  Ler biografia →
                </span>
              </ContentCard>
            </Link>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
