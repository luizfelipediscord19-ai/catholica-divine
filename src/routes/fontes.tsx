import trento from "@/assets/concilio-trento.jpg";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, Section, Prose, CardGrid, Prancha } from "@/components/PageShell";
import { LegendaConfiabilidade } from "@/components/SeloConfiabilidade";
import biblioteca from "@/assets/biblioteca.jpg";

const URL_PAGINA = "https://portalcatolico.vercel.app/fontes";
const TITULO = "Fontes e Metodologia — Como verificamos o conteúdo | Portal Católico";
const DESCRICAO =
  "As fontes que sustentam o Portal Católico — Sagrada Escritura, Catecismo, Concílios, Magistério, Padres e Doutores da Igreja — e a metodologia editorial de verificação e citação.";

const FONTES = [
  {
    titulo: "Sagrada Escritura",
    nota: "Traduções em domínio público hospedadas no próprio portal, com indicação de versão em cada livro. Nunca reproduzimos traduções protegidas por direitos autorais.",
  },
  {
    titulo: "Catecismo da Igreja Católica",
    nota: "Estrutura, parágrafos e sínteses referenciados por número (§), sempre indicando a parte e a seção correspondentes.",
  },
  {
    titulo: "Concílios e Magistério",
    nota: "Documentos conciliares, encíclicas, exortações e constituições apostólicas citados por título e número de parágrafo.",
  },
  {
    titulo: "Padres e Doutores da Igreja",
    nota: "Obras patrísticas e escolásticas citadas com autor e obra; passagens usadas apenas quando a atribuição é segura.",
  },
  {
    titulo: "Calendário e liturgia",
    nota: "Tempos litúrgicos, cores e memórias calculados a partir das normas universais do calendário romano.",
  },
  {
    titulo: "Imagens e arte sacra",
    nota: "Reproduções de obras em domínio público ou sob licença livre, com crédito à fonte original.",
  },
];

const METODO = [
  "Toda afirmação doutrinária recebe referência explícita à Escritura, ao Catecismo ou a um documento do Magistério.",
  "Quando não existe fonte suficientemente segura, o portal informa a limitação em vez de preencher a lacuna.",
  "Frases atribuídas a santos só são publicadas quando há obra ou documento identificável.",
  "Textos de formação são revisados para conformidade com o Magistério antes da publicação.",
  "Correções são bem-vindas: o conteúdo é revisto continuamente conforme novas verificações.",
];

export const Route = createFileRoute("/fontes")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: "Fontes e Metodologia — Portal Católico" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL_PAGINA },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Fontes e Metodologia do Portal Católico",
          url: URL_PAGINA,
          inLanguage: "pt-BR",
          description: DESCRICAO,
        }),
      },
    ],
  }),
  component: FontesPage,
});

function FontesPage() {
  return (
    <>
      <PageHero
        image={biblioteca}
        eyebrow="Transparência editorial"
        title="Fontes e Metodologia"
        intro="O Portal Católico existe para auxiliar no estudo da fé — e estudo exige fontes. Aqui está o que usamos e como verificamos cada conteúdo publicado."
      />

      <Section kicker="O que sustenta o acervo" title="Fontes utilizadas">
        <CardGrid cols={3}>
          {FONTES.map((f) => (
            <article
              key={f.titulo}
              className="min-w-0 border border-gold/10 bg-card/40 p-card"
            >
              <h3 className="title-card">{f.titulo}</h3>
              <p className="mt-xs body-sm">{f.nota}</p>
            </article>
          ))}
        </CardGrid>
      </Section>

      <Section
        kicker="Níveis de autoridade"
        title="Sistema de confiabilidade"
      >
        <Prose>

        <Prancha
          image={trento}
          alt="Bispos reunidos em sessão conciliar no século XVI."
          legenda="Concílios, encíclicas e catecismos são as fontes verificáveis que sustentam cada página deste portal — sempre com referência ao texto original."
        />
          <p>
            Nem toda informação católica tem o mesmo peso: um dogma não é uma disciplina, e uma
            tradição hagiográfica não é um fato historicamente documentado. Por isso o portal
            classifica o conteúdo sensível com estes indicadores:
          </p>
        </Prose>
        <LegendaConfiabilidade className="mt-sm" />
        <div className="mt-sm"><Prose>
          <p>
            O Portal Católico diferencia ensinamento oficial, tradição da Igreja, contexto histórico e
            explicação teológica. Informações hagiográficas ou tradicionalmente transmitidas não são
            apresentadas como fatos históricos comprovados quando as fontes não permitem tal certeza.
          </p>
          <p>
            Quando houver divergência entre tradições históricas, o portal procurará apresentar essa
            divergência em vez de escolher arbitrariamente uma versão como fato.
          </p>
          <p>
            Onde a documentação histórica é insuficiente, o portal escreve
            <em> “segundo a tradição”</em> ou <em>“segundo a tradição hagiográfica”</em> em vez de afirmar
            certeza. Revelações privadas — mesmo as reconhecidas pela Igreja — não pertencem ao depósito da fé
            (Catecismo da Igreja Católica, § 67).
          </p>
        </Prose></div>

      </Section>


      <Section kicker="Como trabalhamos" title="Metodologia editorial">
        <Prose>
          <ul>
            {METODO.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Prose>
      </Section>

      <Section kicker="Limites" title="Sobre a Sophia e o uso de IA">
        <Prose>
          <p>
            A Sophia é uma assistente de estudo. Suas respostas se apoiam no acervo do portal e
            citam as referências correspondentes, mas <strong>não constituem autoridade
            doutrinária</strong>. Diante de qualquer dúvida relevante, prevalecem a Sagrada
            Escritura, o Catecismo, os documentos do Magistério e a orientação do seu pastor.
          </p>
          <p>
            Quando não há fonte suficiente para fundamentar uma resposta, a Sophia deve declarar
            isso abertamente em vez de improvisar uma citação.
          </p>
          <p>
            Conteúdo desenvolvido para auxiliar no estudo e conhecimento da fé católica. Para
            navegar o acervo por área, veja o <Link to="/explorar">mapa do portal</Link>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
