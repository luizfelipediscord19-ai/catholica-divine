import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/apologetica")({
  head: () => ({
    meta: [
      { title: "Apologética Católica — Portal Católico" },
      { name: "description", content: "Defesa racional da fé católica: respostas às principais objeções contra a Igreja." },
      { property: "og:title", content: "Apologética Católica" },
      { property: "og:description", content: "Razões para crer — a defesa racional da fé." },
    ],
  }),
  component: Page,
});

const TEMAS = [
  { title: "Existência de Deus", body: "As cinco vias de Santo Tomás, o argumento moral, o argumento contingencial." },
  { title: "Divindade de Cristo", body: "Trilema clássico, profecias messiânicas cumpridas, testemunho dos Evangelhos." },
  { title: "Ressurreição", body: "Túmulo vazio, aparições, transformação dos discípulos, surgimento da Igreja." },
  { title: "Autoridade da Igreja", body: "Mt 16,18; sucessão apostólica; permanência ininterrupta por vinte séculos." },
  { title: "Sola Scriptura", body: "A Bíblia mesma testemunha a Tradição (2Ts 2,15) e a Igreja como coluna da verdade (1Tm 3,15)." },
  { title: "Maria e os santos", body: "Comunhão dos santos, intercessão, distinção entre culto a Deus (latria) e veneração (dulia)." },
  { title: "Eucaristia", body: "Jo 6, instituição na Última Ceia, testemunho unânime dos Padres da Igreja." },
  { title: "Papado", body: "Primado de Pedro, sucessão romana, infalibilidade nas definições solenes." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Apologia Fidei"
        title="Razões para Crer"
        intro="‘Estai sempre prontos a responder a todo aquele que vos pedir razão da esperança que há em vós’ (1Pd 3,15). A apologética é o serviço da razão à fé."
      />
      <Section kicker="Principais temas" title="Respostas às objeções mais comuns">
        <CardGrid cols={2}>
          {TEMAS.map((t) => (
            <ContentCard key={t.title} title={t.title}>
              {t.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
