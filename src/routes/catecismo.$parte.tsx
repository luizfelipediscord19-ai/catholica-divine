import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  PARTES,
  SECOES,
  VATICAN_URL,
  capitulosDaSecao,
  type SecaoCIC,
} from "../lib/data/catecismo";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Relacionados } from "../components/Relacionados";
import { MarcarEstudo } from "../components/portal/MarcarEstudo";
import { PerguntarSophia } from "../components/portal/PerguntarSophia";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/catecismo/$parte")({
  loader: ({ params }) => {
    const p = PARTES.find((x) => x.slug === params.parte);
    if (!p) throw notFound();
    return { parte: p, secoes: SECOES.filter((s) => s.parte === p.num) };
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.parte.titulo ?? "Catecismo"} — Catecismo — Portal Católico` },
      { name: "description", content: loaderData?.parte.resumo ?? "" },
      { name: "keywords", content: keywordsPara(["catecismo"]) },
      { property: "og:title", content: `${loaderData?.parte.titulo ?? "Catecismo"} — CIC` },
      { property: "og:description", content: loaderData?.parte.resumo ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://portalcatolico.vercel.app/catecismo/${params.parte}` },
    ],
    links: [{ rel: "canonical", href: `https://portalcatolico.vercel.app/catecismo/${params.parte}` }],
  }),

  component: Page,
  notFoundComponent: () => (
    <div className="shell-narrow py-block text-center">
      <p className="text-gold">Parte não encontrada.</p>
      <Link to="/catecismo" className="text-sm underline mt-4 inline-block">← Catecismo</Link>
    </div>
  ),
});

function Page() {
  const { parte, secoes } = Route.useLoaderData();
  return (
    <div className="shell py-block">
      <Link
        to="/catecismo"
        className="inline-flex items-center gap-2 kicker hover:text-gold mb-6"
      >
        <ArrowLeft className="size-3" /> Catecismo
      </Link>
      <p className="kicker mb-4">
        Parte {parte.num} · {parte.paragrafos}
      </p>
      <h1 className="title-page text-foreground leading-tight">
        {parte.titulo}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{parte.resumo}</p>

      <div className="mt-12 space-y-4">
        {secoes.map((s: SecaoCIC) => {
          const capitulos = capitulosDaSecao(s.slug);
          return (
            <section key={s.slug} className="surface-card p-5 sm:p-6">
              <MarcarEstudo tipo="catecismo" chave={s.slug} />
              <p className="kicker mb-2">
                {s.paragrafos}
              </p>
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{s.titulo}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.resumo}</p>

              <PerguntarSophia
                pergunta={`Explique a seção "${s.titulo}" do Catecismo (${s.paragrafos}) com citações do próprio Catecismo e da Escritura.`}
                rotulo="Estudar com a Sophia"
                className="mt-4"
              />

              {capitulos.length > 0 && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {capitulos.map((c) => (
                    <div key={c.titulo} className="border-l-2 border-gold/30 pl-4">
                      <h3 className="font-display text-base text-foreground leading-snug">
                        {c.titulo}
                      </h3>
                      <p className="kicker mt-1">
                        {c.paragrafos}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {c.itens.map((item) => (
                          <li
                            key={item}
                            className="text-step--1 text-muted-foreground leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>


      <Relacionados topic={`catecismo:${parte.slug}`} className="mt-10" />

      <a
        href={VATICAN_URL}
        target="_blank"
        rel="noopener"
        className="mt-10 btn-base btn-outline-gold gap-2 label-btn"
      >
        <ExternalLink className="size-3.5" /> Ler o texto integral
      </a>
    </div>
  );
}
