import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/sacramentos")({
  head: () => ({
    meta: [
      { title: "Os Sete Sacramentos — Portal Católico" },
      { name: "description", content: "Os sete sacramentos da Igreja Católica: sinais eficazes da graça instituídos por Cristo." },
      { property: "og:title", content: "Os Sete Sacramentos" },
      { property: "og:description", content: "Iniciação, cura e serviço: os sete sacramentos da Igreja Católica." },
    ],
  }),
  component: Page,
});

const SACRAMENTOS = [
  { grupo: "Iniciação Cristã", title: "Batismo", cic: "§§ 1213–1284", body: "Porta da vida no Espírito. Apaga o pecado original e nos torna filhos de Deus." },
  { grupo: "Iniciação Cristã", title: "Confirmação", cic: "§§ 1285–1321", body: "Aperfeiçoa a graça batismal e sela com o dom do Espírito Santo." },
  { grupo: "Iniciação Cristã", title: "Eucaristia", cic: "§§ 1322–1419", body: "Fonte e ápice da vida cristã. Corpo, Sangue, Alma e Divindade de Cristo." },
  { grupo: "Cura", title: "Penitência", cic: "§§ 1422–1498", body: "Reconciliação com Deus e com a Igreja após o pecado, pela confissão e absolvição." },
  { grupo: "Cura", title: "Unção dos Enfermos", cic: "§§ 1499–1532", body: "Graça, conforto e fortaleza para os que sofrem doença grave ou se aproximam da morte." },
  { grupo: "Serviço", title: "Ordem", cic: "§§ 1536–1600", body: "Bispos, presbíteros e diáconos configurados a Cristo Cabeça e Servo." },
  { grupo: "Serviço", title: "Matrimônio", cic: "§§ 1601–1666", body: "Aliança conjugal entre homem e mulher, elevada por Cristo à dignidade de sacramento." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Septem Sacramenta"
        title="Os Sete Sacramentos"
        intro="Sinais eficazes da graça, instituídos por Cristo e confiados à Igreja, pelos quais nos é dispensada a vida divina."
      />
      <Section kicker="Os sete" title="Iniciação, Cura e Serviço">
        <CardGrid cols={3}>
          {SACRAMENTOS.map((s) => (
            <ContentCard key={s.title} title={s.title} subtitle={`${s.grupo} · ${s.cic}`}>
              {s.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
