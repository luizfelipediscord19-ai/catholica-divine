import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, Section, CardGrid } from "@/components/PageShell";

const URL_PAGINA = "https://portalcatolico.vercel.app/explorar";
const TITULO = "Explorar o Portal — Mapa da Biblioteca Católica | Portal Católico";
const DESCRICAO =
  "Mapa completo do Portal Católico: doutrina, vida espiritual e formação reunidos em um único índice — Bíblia, Catecismo, sacramentos, santos, orações, trilhas e documentos.";

type Item = { to: string; label: string; nota: string };
type Bloco = { titulo: string; kicker: string; itens: Item[] };

const BLOCOS: Bloco[] = [
  {
    titulo: "Doutrina",
    kicker: "O que a Igreja crê",
    itens: [
      { to: "/biblia", label: "Bíblia Sagrada", nota: "73 livros com texto integral e introduções" },
      { to: "/catecismo", label: "Catecismo", nota: "As quatro partes do CIC com sínteses" },
      { to: "/sacramentos", label: "Sacramentos", nota: "Os sete sinais eficazes da graça" },
      { to: "/fe-catolica", label: "Fé Católica", nota: "Tradição, Magistério e o Credo" },
      { to: "/apologetica", label: "Apologética", nota: "Objeções respondidas com fontes" },
      { to: "/glossario", label: "Glossário", nota: "Termos doutrinais explicados" },
    ],
  },
  {
    titulo: "Vida espiritual",
    kicker: "Como a Igreja reza",
    itens: [
      { to: "/oracoes", label: "Orações", nota: "Biblioteca orante da tradição" },
      { to: "/oracoes/rosario", label: "Rosário", nota: "Mistérios e modo de rezar" },
      { to: "/oracoes/liturgia-das-horas", label: "Liturgia das Horas", nota: "A oração do dia inteiro" },
      { to: "/santos", label: "Santos", nota: "Biografias e memórias litúrgicas" },
      { to: "/maria", label: "Maria Santíssima", nota: "Dogmas, devoções e títulos" },
      { to: "/liturgia-diaria", label: "Liturgia diária", nota: "Leituras, salmo e Evangelho" },
      { to: "/calendario-liturgico", label: "Calendário litúrgico", nota: "Tempos, cores e solenidades" },
    ],
  },
  {
    titulo: "Formação",
    kicker: "Como estudar",
    itens: [
      { to: "/trilhas", label: "Trilhas de formação", nota: "Percursos guiados, do início à teologia" },
      { to: "/estudar", label: "Estudar", nota: "Continuar de onde você parou" },
      { to: "/doutores-da-igreja", label: "Doutores da Igreja", nota: "Padres e Doutores e suas obras" },
      { to: "/assistente", label: "Sophia — IA católica", nota: "Respostas com fontes citadas" },
      { to: "/busca", label: "Busca avançada", nota: "Cruza Bíblia, Catecismo e Magistério" },
      { to: "/favoritos", label: "Meus favoritos", nota: "O que você salvou no portal" },
    ],
  },
  {
    titulo: "Institucional",
    kicker: "Transparência",
    itens: [
      { to: "/sobre", label: "Sobre o Portal", nota: "Propósito e equipe editorial" },
      { to: "/fontes", label: "Fontes e metodologia", nota: "Como o conteúdo é verificado" },
      { to: "/forum", label: "Agora Ecclesiae", nota: "Comunidade moderada de estudo" },
      { to: "/privacidade", label: "Privacidade", nota: "Dados e consentimento" },
      { to: "/termos", label: "Termos de uso", nota: "Condições de utilização" },
    ],
  },
];

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: "Explorar o Portal Católico" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL_PAGINA },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Explorar o Portal Católico",
          url: URL_PAGINA,
          inLanguage: "pt-BR",
          description: DESCRICAO,
          hasPart: BLOCOS.map((b) => ({
            "@type": "ItemList",
            name: b.titulo,
            itemListElement: b.itens.map((i, n) => ({
              "@type": "ListItem",
              position: n + 1,
              name: i.label,
              url: `https://portalcatolico.vercel.app${i.to}`,
            })),
          })),
        }),
      },
    ],
  }),
  component: ExplorarPage,
});

function ExplorarPage() {
  return (
    <>
      <PageHero
        eyebrow="Mapa do portal"
        title="Explorar o Portal"
        intro="Todo o acervo em um único índice: a doutrina que a Igreja ensina, a oração que ela reza e os caminhos de formação para estudar com ordem."
      />

      {BLOCOS.map((bloco) => (
        <Section key={bloco.titulo} kicker={bloco.kicker} title={bloco.titulo}>
          <CardGrid cols={3}>
            {bloco.itens.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex min-w-0 flex-col border border-gold/10 bg-card/40 p-card transition-premium hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5"
              >
                <span className="title-card group-hover:text-gold transition-colors">
                  {item.label}
                </span>
                <span className="mt-xs body-sm">{item.nota}</span>
              </Link>
            ))}
          </CardGrid>
        </Section>
      ))}
    </>
  );
}
