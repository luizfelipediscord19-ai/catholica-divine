import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";

export const Route = createFileRoute("/santos")({
  head: () => ({
    meta: [
      { title: "Santos — Portal Católico" },
      { name: "description", content: "Vidas e ensinamentos dos santos: testemunhas da fé e amigos de Deus." },
      { property: "og:title", content: "Os Santos da Igreja" },
      { property: "og:description", content: "Vidas, virtudes e ensinamentos dos santos católicos." },
    ],
  }),
  component: Page,
});

const SANTOS = [
  { nome: "São Pedro", data: "29 de junho", body: "Príncipe dos Apóstolos, primeiro Papa, mártir em Roma sob Nero." },
  { nome: "São Paulo", data: "29 de junho", body: "Apóstolo dos gentios, autor de treze epístolas, mártir em Roma." },
  { nome: "Santo Agostinho", data: "28 de agosto", body: "Bispo de Hipona, doutor da graça, autor das Confissões e da Cidade de Deus." },
  { nome: "São Tomás de Aquino", data: "28 de janeiro", body: "Doutor Angélico, autor da Suma Teológica, síntese máxima da teologia escolástica." },
  { nome: "São Francisco de Assis", data: "4 de outubro", body: "Pobre de Assis, alter Christus, fundador da Ordem dos Frades Menores." },
  { nome: "Santa Teresa de Ávila", data: "15 de outubro", body: "Doutora da Igreja, reformadora do Carmelo, mestra do Castelo Interior." },
  { nome: "Santa Teresinha do Menino Jesus", data: "1º de outubro", body: "Doutora da Igreja, mestra do pequeno caminho da infância espiritual." },
  { nome: "São João Paulo II", data: "22 de outubro", body: "Papa que percorreu o mundo, testemunha da liberdade e da dignidade humana." },
  { nome: "Santo Inácio de Loyola", data: "31 de julho", body: "Fundador da Companhia de Jesus, mestre dos Exercícios Espirituais." },
  { nome: "São Maximiliano Kolbe", data: "14 de agosto", body: "Mártir da caridade em Auschwitz, apóstolo da Imaculada." },
  { nome: "Santo Atanásio", data: "2 de maio", body: "Bispo de Alexandria, defensor da divindade de Cristo contra o arianismo." },
  { nome: "São Jerônimo", data: "30 de setembro", body: "Tradutor da Vulgata, doutor máximo nas Escrituras." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Communio Sanctorum"
        title="Os Santos da Igreja"
        intro="As testemunhas vivas do Evangelho — homens e mulheres que, em todas as épocas, deixaram-se transformar pela graça de Cristo."
      />
      <Section kicker="Galeria dos santos" title="Os amigos de Deus">
        <CardGrid cols={3}>
          {SANTOS.map((s) => (
            <ContentCard key={s.nome} title={s.nome} subtitle={`Memória · ${s.data}`}>
              {s.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>
    </div>
  );
}
