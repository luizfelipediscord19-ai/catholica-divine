import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";

import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { TEMAS_DOUTRINA } from "@/lib/data/doutrina-temas";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const URL = "https://portalcatolico.vercel.app/doutrina";
const DESCRICAO =
  "Páginas de doutrina específica do Portal Católico: o coração na fé cristã, o pecado original e os novíssimos — morte, juízo, purgatório, céu, inferno e ressurreição da carne.";

export const Route = createFileRoute("/doutrina/")({
  head: () => ({
    meta: [
      { title: "Doutrina Católica — Estudos Específicos | Portal Católico" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["catecismo", "formacao"]) },
      { property: "og:title", content: "Doutrina Católica — Estudos Específicos" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="shell py-block">
      <p className="kicker mb-4">Fides et Ratio</p>
      <h1 className="title-page leading-tight text-foreground">Doutrina</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">{DESCRICAO}</p>

      <FaixaAutoridade
        niveis={["oficial", "teologia"]}
        nota="Cada estudo distingue o que é dogma, o que é doutrina comum e o que a Igreja deliberadamente não define, com referências ao Catecismo, aos concílios e aos documentos oficiais."
        className="mt-6 max-w-3xl"
      />

      <div className="mt-12 grid gap-px border-y border-gold/15 bg-gold/15 lg:grid-cols-3">
        {TEMAS_DOUTRINA.map((tema) => (
          <article key={tema.slug} className="bg-background p-card">
            <p className="kicker">{tema.kicker}</p>
            <h2 className="title-card mt-2 text-foreground">{tema.nome}</h2>
            <p className="body-sm mt-3 text-muted-foreground">{tema.resumo}</p>
            <ul className="mt-4 space-y-1">
              {tema.secoes.map((s) => (
                <li key={s.id} className="text-step--2 text-muted-foreground">
                  · {s.titulo}
                </li>
              ))}
            </ul>
            <Link
              to="/doutrina/$tema"
              params={{ tema: tema.slug }}
              className="btn-base btn-outline-gold btn-sm label-btn mt-5 gap-2 print:hidden"
            >
              Abrir estudo <ArrowRight className="size-3.5 shrink-0" />
            </Link>
          </article>
        ))}
      </div>

      <div className="action-tray mt-14 print:hidden">
        <Link to="/catecismo/artigos" className="btn-base btn-gold btn-md gap-2">
          <BookOpen className="size-4 shrink-0" /> Catecismo por artigos
        </Link>
        <Link to="/enciclopedia" className="btn-base btn-outline-gold btn-md">
          Enciclopédia Católica
        </Link>
        <Link to="/apologetica" className="btn-base btn-quiet btn-md">
          Razões para crer
        </Link>
      </div>
    </div>
  );
}
