import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SUGESTOES_GERAL } from "../lib/data/sophia-perguntas";
import { SophiaChat } from "../components/SophiaChat";
import { FAQ_SOPHIA as FAQ } from "../lib/data/sophia-faq";

const URL_PAGINA = "https://portalcatolico.vercel.app/assistente";
const TITULO = "Sophia — Assistente de IA Católica fiel ao Magistério";
const DESCRICAO =
  "Sophia é a IA católica do Portal Católico: responde dúvidas de fé, doutrina, liturgia e Escritura citando a Bíblia, o Catecismo e documentos do Magistério.";


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
    <div className="shell py-[var(--space-md)]">
      <div className="text-center mb-10">
        <Sparkles className="size-8 text-gold mx-auto mb-4" aria-hidden="true" />
        <p className="kicker mb-3">Sophia · IA Católica</p>
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
        <h2 className="kicker mb-4">Continue o estudo</h2>
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
