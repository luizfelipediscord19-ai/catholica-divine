import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import maria from "../assets/maria.jpg";

export const Route = createFileRoute("/maria")({
  head: () => ({
    meta: [
      { title: "Maria, Mãe de Deus — Portal Católico" },
      { name: "description", content: "Mariologia católica: dogmas, aparições aprovadas, devoções e o lugar de Maria na economia da salvação." },
      { property: "og:title", content: "Maria, Mãe de Deus" },
      { property: "og:description", content: "Dogmas marianos, aparições e devoções." },
    ],
  }),
  component: Page,
});

const DOGMAS = [
  { title: "Maternidade Divina", year: "Éfeso, 431", body: "Maria é verdadeiramente Theotókos, Mãe de Deus, pois gerou segundo a carne o Verbo eterno do Pai." },
  { title: "Virgindade Perpétua", year: "Latrão, 649", body: "Antes, durante e depois do parto, Maria permaneceu sempre Virgem." },
  { title: "Imaculada Conceição", year: "Pio IX, 1854", body: "Por singular privilégio, Maria foi preservada de todo pecado original desde o primeiro instante de sua concepção." },
  { title: "Assunção", year: "Pio XII, 1950", body: "Terminado o curso de sua vida terrena, foi assunta de corpo e alma à glória celeste." },
];

const APARICOES = [
  { local: "Guadalupe (México)", ano: "1531", body: "À Juan Diego: a Virgem morena, imagem milagrosa na tilma." },
  { local: "Lourdes (França)", ano: "1858", body: "A Santa Bernadette: ‘Eu sou a Imaculada Conceição.’" },
  { local: "Fátima (Portugal)", ano: "1917", body: "Aos três pastorinhos: o chamado à oração, penitência e consagração." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Beata Maria Virgo"
        title="Maria, Mãe de Deus"
        intro="Filha do Pai, Mãe do Filho, Esposa do Espírito Santo. A primeira discípula, modelo da Igreja, caminho seguro a Cristo."
        image={maria}
      />
      <Section kicker="Dogmas marianos" title="Os quatro dogmas">
        <CardGrid cols={2}>
          {DOGMAS.map((d) => (
            <ContentCard key={d.title} title={d.title} subtitle={d.year}>
              {d.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
      <Section kicker="Aparições aprovadas" title="As principais aparições">
        <CardGrid cols={3}>
          {APARICOES.map((a) => (
            <ContentCard key={a.local} title={a.local} subtitle={a.ano}>
              {a.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
