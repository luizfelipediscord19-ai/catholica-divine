import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import { Relacionados } from "../components/Relacionados";


export const Route = createFileRoute("/oracoes/terco-misericordia")({
  head: () => ({
    meta: [
      { title: "Terço da Misericórdia — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/terco-misericordia" },
      { name: "description", content: "Como rezar o Terço da Divina Misericórdia revelado a Santa Faustina." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/terco-misericordia" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Misericordia"
        title="Terço da Divina Misericórdia"
        intro="Revelado a Santa Faustina Kowalska (1905-1938). Reza-se em qualquer hora, mas especialmente às 15h — a Hora da Misericórdia."
      />
      <Section kicker="Como rezar" title="Em contas comuns do Rosário">
        <CardGrid cols={2}>
          <ContentCard title="Início">
            <p>Sinal da Cruz · Pai-Nosso · Ave-Maria · Credo dos Apóstolos.</p>
          </ContentCard>
          <ContentCard title="Nas contas grandes (5×)">
            <p className="italic">"Eterno Pai, eu Vos ofereço o Corpo e Sangue, Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro."</p>
          </ContentCard>
          <ContentCard title="Nas contas pequenas (10× por dezena)">
            <p className="italic">"Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro."</p>
          </ContentCard>
          <ContentCard title="No final (3×)">
            <p className="italic">"Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro."</p>
          </ContentCard>
        </CardGrid>
        <div className="surface-card-featured mt-8 p-card">
          <p className="kicker mb-2">Hora da Misericórdia · 15h</p>
          <p className="text-foreground/80 italic">"Nesta hora não recusarei nada à alma que Me pedir pela Minha Paixão." (Diário, 1320)</p>
        </div>
      </Section>
      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold">← Todas as orações</Link>
        </div>
        <Relacionados topic="misericordia" className="mt-8" />
      </Section>

    </div>
  );
}
