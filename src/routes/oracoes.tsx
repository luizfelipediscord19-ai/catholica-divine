import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/oracoes")({
  head: () => ({
    meta: [
      { title: "Orações Católicas — Portal Católico" },
      { name: "description", content: "Rosário interativo, Liturgia das Horas, novenas, Via-Sacra, Terço da Misericórdia e orações tradicionais." },
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
  { title: "Salve-Rainha", body: "Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas..." },
  { title: "Anjo do Senhor", body: "O Anjo do Senhor anunciou a Maria. E ela concebeu do Espírito Santo. Ave Maria... Eis aqui a serva do Senhor. Faça-se em mim segundo a vossa palavra..." },
  { title: "Vinde, Espírito Santo", body: "Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Enviai o vosso Espírito e tudo será criado, e renovareis a face da terra." },
];

const DEVOCOES = [
  { to: "/oracoes/rosario" as const, title: "Santo Rosário (interativo)", body: "Mistérios Gozosos, Luminosos, Dolorosos e Gloriosos — guiado etapa a etapa." },
  { to: "/oracoes/terco-misericordia" as const, title: "Terço da Misericórdia", body: "Revelado a Santa Faustina — rezado especialmente às 15h." },
  { to: "/oracoes/via-sacra" as const, title: "Via-Sacra", body: "Catorze estações que acompanham os passos de Cristo até o Calvário." },
  { to: "/oracoes/liturgia-das-horas" as const, title: "Liturgia das Horas", body: "Laudes, Vésperas, Completas e demais Horas — a oração oficial da Igreja." },
  { to: "/oracoes/novenas" as const, title: "Novenas", body: "Ao Espírito Santo, à Aparecida, a São José, ao Sagrado Coração e outras." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Oratio"
        title="A Vida de Oração"
        intro="A oração é a respiração da alma cristã. Aqui você encontra a tradição orante da Igreja, das fórmulas mais antigas às devoções consagradas pelos séculos."
      />
      <Section kicker="Devoções" title="Caminhos consagrados pela Igreja">
        <CardGrid cols={3}>
          {DEVOCOES.map((d, i) => (
            <Link 
              key={d.to} 
              to={d.to} 
              className="animate-content-fade"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <ContentCard title={d.title}>{d.body}</ContentCard>
            </Link>
          ))}
        </CardGrid>
      </Section>
      <Section kicker="Orações fundamentais" title="As orações que todo católico conhece">
        <CardGrid cols={2}>
          {ORACOES.map((o, i) => (
            <div 
              key={o.title}
              className="animate-content-fade"
              style={{ animationDelay: `${(i + DEVOCOES.length) * 100}ms` }}
            >
              <ContentCard title={o.title}>
                <p className="italic font-display text-base text-foreground leading-relaxed">{o.body}</p>
              </ContentCard>
            </div>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
