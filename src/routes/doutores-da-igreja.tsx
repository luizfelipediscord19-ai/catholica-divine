import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/doutores-da-igreja")({
  head: () => ({
    meta: [
      { title: "Doutores da Igreja — Portal Católico" },
      { name: "description", content: "Os 37 Doutores da Igreja Católica: santos reconhecidos pela eminência de sua doutrina." },
      { property: "og:title", content: "Doutores da Igreja" },
      { property: "og:description", content: "Mestres reconhecidos pela Igreja pela santidade e profundidade doutrinal." },
    ],
  }),
  component: Page,
});

const DOUTORES = [
  { nome: "Santo Agostinho", titulo: "Doctor Gratiae", body: "Bispo de Hipona (†430). Confissões, De Trinitate, Cidade de Deus." },
  { nome: "São Tomás de Aquino", titulo: "Doctor Angelicus", body: "Dominicano (†1274). Suma Teológica, síntese da teologia escolástica." },
  { nome: "São Jerônimo", titulo: "Doctor Maximus", body: "(†420). Tradutor da Vulgata, mestre nas Escrituras." },
  { nome: "São Gregório Magno", titulo: "Doctor Optimus", body: "Papa (†604). Reformador da liturgia e da vida pastoral." },
  { nome: "Santo Ambrósio", titulo: "Doctor Mellifluus", body: "Bispo de Milão (†397). Defensor da fé contra o arianismo." },
  { nome: "São Boaventura", titulo: "Doctor Seraphicus", body: "Franciscano (†1274). Itinerário da mente para Deus." },
  { nome: "Santa Teresa de Ávila", titulo: "Doctora Mystica", body: "Carmelita (†1582). Castelo Interior, Caminho de Perfeição." },
  { nome: "São João da Cruz", titulo: "Doctor Mysticus", body: "Carmelita (†1591). Noite Escura, Subida do Monte Carmelo." },
  { nome: "Santa Catarina de Sena", titulo: "Doctora Ecclesiae", body: "Dominicana (†1380). Diálogo da Divina Providência." },
  { nome: "Santa Teresinha do Menino Jesus", titulo: "Doctora Amoris", body: "Carmelita (†1897). História de uma Alma, pequeno caminho." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Doctores Ecclesiae"
        title="Os Doutores da Igreja"
        intro="Santos cuja vida e cuja obra teológica foram reconhecidas pela Igreja como guias seguros para todos os fiéis. São hoje trinta e sete."
      />
      <Section kicker="Galeria" title="Mestres da fé">
        <CardGrid cols={3}>
          {DOUTORES.map((d) => (
            <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>
              {d.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
