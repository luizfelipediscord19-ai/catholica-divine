import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SUGESTOES_GERAL } from "../lib/data/sophia-perguntas";
import { SophiaChat } from "../components/SophiaChat";

const URL_PAGINA = "https://portalcatolico.vercel.app/assistente";
const TITULO = "Sophia — Assistente de IA Católica fiel ao Magistério";
const DESCRICAO =
  "Sophia é a IA católica do Portal Católico: responde dúvidas de fé, doutrina, liturgia e Escritura citando a Bíblia, o Catecismo e documentos do Magistério.";

const FAQ = [
  {
    pergunta: "O que é a Sophia, a IA católica do Portal?",
    resposta:
      "Sophia é o assistente de inteligência artificial do Portal Católico. Ela responde perguntas sobre fé, doutrina, liturgia e Sagrada Escritura sempre ancorada em fontes oficiais: Bíblia, Catecismo da Igreja Católica, concílios, Magistério papal e Direito Canônico.",
  },
  {
    pergunta: "As respostas da Sophia substituem um sacerdote?",
    resposta:
      "Não. Sophia serve à formação e ao estudo, mas não substitui o acompanhamento de um sacerdote, a confissão sacramental nem a orientação espiritual pessoal. Em matéria de foro íntimo, procure sempre um confessor.",
  },
  {
    pergunta: "Quais fontes a Sophia utiliza para responder?",
    resposta:
      "Ela segue a hierarquia das fontes católicas: Sagrada Escritura, Catecismo da Igreja Católica, concílios ecumênicos, encíclicas e exortações papais, o Código de Direito Canônico de 1983 e os Padres e Doutores da Igreja. As referências aparecem citadas nas próprias respostas.",
  },
  {
    pergunta: "Preciso criar conta para usar a Sophia?",
    resposta:
      "Não. A conversa com a Sophia é aberta a qualquer visitante. A conta serve apenas para guardar progresso de leitura, favoritos e o diário espiritual do painel.",
  },
  {
    pergunta: "Sophia pode ajudar coroinhas e servidores do altar?",
    resposta:
      "Sim. A formação de coroinhas é uma área de especialização do Portal: rubricas, paramentos, vasos sagrados e o modo de servir na Missa. Há também a seção dedicada em /coroinhas.",
  },
];

export const Route = createFileRoute("/assistente")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: "Sophia — Assistente de IA Católica" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL_PAGINA },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "Sophia — IA Católica",
              url: URL_PAGINA,
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              inLanguage: "pt-BR",
              description: DESCRICAO,
              isAccessibleForFree: true,
              offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.pergunta,
                acceptedAnswer: { "@type": "Answer", text: f.resposta },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-[var(--space-md)]">
      <div className="text-center mb-10">
        <Sparkles className="size-8 text-gold mx-auto mb-4" aria-hidden="true" />
        <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Sophia · IA Católica</p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground">
          Assistente de IA Católica
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Pergunte sobre fé, doutrina, liturgia e Escritura. As respostas da Sophia são
          fundamentadas na Bíblia, no Catecismo da Igreja Católica e nos documentos oficiais do
          Magistério, com as referências sempre citadas.
        </p>
      </div>

      <SophiaChat
        mode="geral"
        suggestions={SUGESTOES_GERAL}
        placeholder="Sua pergunta sobre a fé..."
      />

      <section aria-labelledby="faq-sophia" className="mt-16">
        <h2 id="faq-sophia" className="font-display text-2xl md:text-3xl text-foreground">
          Perguntas frequentes sobre a Sophia
        </h2>
        <dl className="mt-8 divide-y divide-gold/10 border-t border-gold/10">
          {FAQ.map((f) => (
            <div key={f.pergunta} className="py-6">
              <dt className="text-base font-medium text-foreground">{f.pergunta}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.resposta}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav aria-label="Continue o estudo" className="mt-14">
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Continue o estudo</h2>
        <ul className="flex flex-wrap gap-3 text-sm">
          {[
            { to: "/biblia", label: "Bíblia Sagrada" },
            { to: "/catecismo", label: "Catecismo" },
            { to: "/apologetica", label: "Apologética" },
            { to: "/oracoes", label: "Orações" },
            { to: "/coroinhas", label: "Coroinhas" },
            { to: "/glossario", label: "Glossário" },
          ].map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="inline-flex border border-gold/20 px-4 py-2 text-foreground/80 hover:border-gold/50 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
