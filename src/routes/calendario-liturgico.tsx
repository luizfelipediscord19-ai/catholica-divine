import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/calendario-liturgico")({
  head: () => ({
    meta: [
      { title: "Calendário Litúrgico — Portal Católico" },
      { name: "description", content: "Os tempos litúrgicos da Igreja: Advento, Natal, Quaresma, Páscoa e Tempo Comum." },
      { property: "og:title", content: "Calendário Litúrgico" },
      { property: "og:description", content: "Os ciclos da vida da Igreja ao longo do ano." },
    ],
  }),
  component: Page,
});

const TEMPOS = [
  { title: "Advento", cor: "Roxo", body: "Quatro semanas de espera vigilante pela vinda do Senhor — em sua Encarnação e em sua glória." },
  { title: "Natal", cor: "Branco", body: "Da Solenidade da Natividade ao Batismo do Senhor. A celebração da Encarnação." },
  { title: "Quaresma", cor: "Roxo", body: "Quarenta dias de jejum, oração e esmola, preparando a Páscoa pela conversão." },
  { title: "Tríduo Pascal", cor: "Vermelho/Branco", body: "Quinta-feira Santa, Sexta-feira da Paixão e Vigília Pascal — o ápice do ano litúrgico." },
  { title: "Páscoa", cor: "Branco", body: "Cinquenta dias de júbilo da Ressurreição até Pentecostes." },
  { title: "Tempo Comum", cor: "Verde", body: "Trinta e quatro semanas que celebram o mistério de Cristo em toda sua amplitude." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Annus Liturgicus"
        title="O Ano Litúrgico"
        intro="A Igreja desdobra ao longo do ano todo o mistério de Cristo, da Encarnação à Páscoa, do Pentecostes à espera escatológica."
      />
      <Section kicker="Os tempos" title="Os ciclos do ano litúrgico">
        <CardGrid cols={3}>
          {TEMPOS.map((t) => (
            <ContentCard key={t.title} title={t.title} subtitle={`Cor litúrgica · ${t.cor}`}>
              {t.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
