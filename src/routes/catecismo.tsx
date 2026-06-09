import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/catecismo")({
  head: () => ({
    meta: [
      { title: "Catecismo da Igreja Católica — Portal Católico" },
      { name: "description", content: "As quatro partes do Catecismo da Igreja Católica: o Credo, os Sacramentos, a Vida em Cristo e a Oração." },
      { property: "og:title", content: "Catecismo da Igreja Católica" },
      { property: "og:description", content: "Os 2.865 parágrafos da fé católica, organizados em quatro partes." },
    ],
  }),
  component: Page,
});

const PARTES = [
  { num: "I", title: "A Profissão da Fé", range: "§§ 26–1065", body: "O Credo: o que cremos sobre Deus, a Criação, Jesus Cristo, o Espírito Santo, a Igreja e os Novíssimos." },
  { num: "II", title: "A Celebração do Mistério Cristão", range: "§§ 1066–1690", body: "A liturgia e os sete sacramentos: como o mistério pascal é celebrado e atualizado na Igreja." },
  { num: "III", title: "A Vida em Cristo", range: "§§ 1691–2557", body: "A vocação à bem-aventurança, a moral cristã, os Dez Mandamentos, a consciência e a graça." },
  { num: "IV", title: "A Oração Cristã", range: "§§ 2558–2865", body: "A vida de oração na Igreja, a tradição orante e o Pai-Nosso comentado petição por petição." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Catechismus Catholicae Ecclesiae"
        title="O Catecismo"
        intro="Promulgado por São João Paulo II em 1992, o Catecismo da Igreja Católica é a exposição completa, orgânica e sistemática da fé católica."
      />
      <Section kicker="As quatro partes" title="A estrutura do Catecismo">
        <CardGrid cols={2}>
          {PARTES.map((p) => (
            <ContentCard key={p.num} title={`${p.num}. ${p.title}`} subtitle={p.range}>
              {p.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
      <Section kicker="Fonte oficial">
        <div className="border border-gold/30 bg-card p-8">
          <p className="text-foreground leading-relaxed">
            Para o texto integral em português, consulte a edição oficial publicada pela
            Santa Sé em{" "}
            <a
              href="https://www.vatican.va/archive/cathechism_po/index_new/prefacio.html"
              target="_blank"
              rel="noopener"
              className="text-gold underline underline-offset-4 hover:no-underline"
            >
              vatican.va
            </a>
            .
          </p>
        </div>
      </Section>
    </div>
  );
}
