import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/oracoes")({
  head: () => ({
    meta: [
      { title: "Orações Católicas — Portal Católico" },
      { name: "description", content: "Rosário, Liturgia das Horas, novenas, ladainhas e orações tradicionais da Igreja." },
      { property: "og:title", content: "Orações Católicas" },
      { property: "og:description", content: "A tradição orante da Igreja em um só lugar." },
    ],
  }),
  component: Page,
});

const ORACOES = [
  { title: "Pai-Nosso", body: "Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém." },
  { title: "Ave-Maria", body: "Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém." },
  { title: "Glória", body: "Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém." },
  { title: "Credo dos Apóstolos", body: "Creio em Deus Pai todo-poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor..." },
  { title: "Salve-Rainha", body: "Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva..." },
  { title: "Anjo do Senhor", body: "O Anjo do Senhor anunciou a Maria. E ela concebeu do Espírito Santo..." },
];

const DEVOCOES = [
  { title: "Santo Rosário", body: "Mistérios Gozosos, Luminosos, Dolorosos e Gloriosos — meditando a vida de Cristo com Maria." },
  { title: "Terço da Misericórdia", body: "Revelado a Santa Faustina: 'Eterno Pai, eu vos ofereço o Corpo e Sangue...'" },
  { title: "Via-Sacra", body: "Quatorze estações que acompanham os passos de Cristo até o Calvário." },
  { title: "Liturgia das Horas", body: "A oração oficial da Igreja: Laudes, Vésperas, Completas e demais Horas." },
  { title: "Novenas", body: "Nove dias de oração — ao Espírito Santo, a Nossa Senhora, aos santos." },
  { title: "Ladainhas", body: "De Nossa Senhora, do Sagrado Coração, de São José, dos Santos." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Oratio"
        title="A Vida de Oração"
        intro="A oração é a respiração da alma cristã. Aqui você encontra a tradição orante da Igreja, das fórmulas mais antigas às devoções consagradas pelos séculos."
      />
      <Section kicker="Orações fundamentais" title="As orações que todo católico conhece">
        <CardGrid cols={2}>
          {ORACOES.map((o) => (
            <ContentCard key={o.title} title={o.title}>
              <p className="italic font-display text-base text-foreground leading-relaxed">{o.body}</p>
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
      <Section kicker="Devoções tradicionais" title="Caminhos consagrados pela Igreja">
        <CardGrid cols={3}>
          {DEVOCOES.map((d) => (
            <ContentCard key={d.title} title={d.title}>
              {d.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
