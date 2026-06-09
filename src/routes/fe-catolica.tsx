import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import vitral from "../assets/vitral.jpg";

export const Route = createFileRoute("/fe-catolica")({
  head: () => ({
    meta: [
      { title: "A Fé Católica — Portal Católico" },
      { name: "description", content: "O essencial da fé católica: o Credo, os mandamentos, os sacramentos e a vida em Cristo." },
      { property: "og:title", content: "A Fé Católica — Portal Católico" },
      { property: "og:description", content: "O essencial da fé católica em quatro pilares: Credo, Sacramentos, Mandamentos e Oração." },
    ],
  }),
  component: Page,
});

const PILLARS = [
  { title: "I. O Credo", subtitle: "O que a Igreja crê", body: "O Símbolo dos Apóstolos e o Credo Niceno-Constantinopolitano: a fé professada desde os primeiros séculos. Deus uno e trino, a Encarnação, a Ressurreição, a Igreja, a vida eterna." },
  { title: "II. Os Sacramentos", subtitle: "Como a graça nos alcança", body: "Sete sinais eficazes instituídos por Cristo: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem e Matrimônio. A vida sacramental é a vida em Cristo." },
  { title: "III. Os Mandamentos", subtitle: "Como viver a fé", body: "O Decálogo, as Bem-aventuranças e o duplo mandamento do amor. A lei moral natural, a consciência e as virtudes — cardeais e teologais." },
  { title: "IV. A Oração", subtitle: "Como falar com Deus", body: "O Pai-Nosso como síntese de toda oração. Oração vocal, meditação e contemplação. A vida espiritual nutrida pela liturgia e pela devoção." },
];

const NOTES = [
  { title: "Una", body: "Una só fé, um só Senhor, um só Batismo (Ef 4,5)." },
  { title: "Santa", body: "Santificada por Cristo, sua Cabeça, e pelo Espírito que nela habita." },
  { title: "Católica", body: "Universal — para todos os povos, em todos os tempos." },
  { title: "Apostólica", body: "Fundada sobre Pedro e os Apóstolos, em sucessão ininterrupta." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Fides Catholica"
        title="A Fé Católica"
        intro="A fé recebida dos Apóstolos, transmitida pela Tradição viva da Igreja e proclamada pelo Magistério — uma, santa, católica e apostólica."
        image={vitral}
      />
      <Section kicker="Os quatro pilares" title="A estrutura da fé católica">
        <CardGrid cols={2}>
          {PILLARS.map((p) => (
            <ContentCard key={p.title} title={p.title} subtitle={p.subtitle}>
              {p.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
      <Section kicker="Notas da Igreja" title="As quatro marcas da Igreja de Cristo">
        <CardGrid cols={4}>
          {NOTES.map((n) => (
            <ContentCard key={n.title} title={n.title}>
              {n.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
