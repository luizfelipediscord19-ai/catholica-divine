import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLivro, LIVROS } from "../lib/data/biblia";
import { getIntroducao } from "../lib/data/biblia/introducoes";
import { ArrowLeft, BookOpen } from "lucide-react";

export const Route = createFileRoute("/biblia/$livro/")({
  loader: ({ params }) => {
    const l = getLivro(params.livro);
    if (!l) throw notFound();
    return { livro: l };
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.livro.nome ?? "Livro"} — Bíblia — Portal Católico` },
      {
        name: "description",
        content: loaderData?.livro.resumo ?? "",
      },
      { property: "og:title", content: `${loaderData?.livro.nome ?? "Livro"} — Bíblia Católica` },
      { property: "og:description", content: loaderData?.livro.resumo ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://portalcatolico.vercel.app/biblia/${params.livro}` },
    ],
    links: [{ rel: "canonical", href: `https://portalcatolico.vercel.app/biblia/${params.livro}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          name: loaderData?.livro.nome,
          isPartOf: { "@type": "Book", name: "Bíblia Sagrada Católica" },
          inLanguage: "pt-BR",
          url: `https://portalcatolico.vercel.app/biblia/${params.livro}`,
          description: loaderData?.livro.resumo ?? undefined,
        }),
      },
    ],
  }),

  component: Page,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="text-gold">Livro não encontrado.</p>
      <Link to="/biblia" className="text-sm underline mt-4 inline-block">
        ← Voltar à Bíblia
      </Link>
    </div>
  ),
});

function Page() {
  const { livro } = Route.useLoaderData();
  const intro = getIntroducao(livro.slug);
  const idx = LIVROS.findIndex((l) => l.slug === livro.slug);
  const anterior = idx > 0 ? LIVROS[idx - 1] : null;
  const proximo = idx < LIVROS.length - 1 ? LIVROS[idx + 1] : null;

  return (
    <div>
      <div className="border-b border-gold/20 bg-card">
        <div className="max-w-5xl mx-auto px-6 py-[var(--space-lg)]">
          <Link
            to="/biblia"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold/80 hover:text-gold mb-6"
          >
            <ArrowLeft className="size-3" /> Bíblia
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
            {livro.testamento === "AT" ? "Antigo Testamento" : "Novo Testamento"} · {livro.grupo}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            {livro.nome}
            <span className="ml-4 text-2xl text-muted-foreground italic">({livro.abrev})</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {livro.resumo}
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-px bg-gold/15 max-w-2xl">
            <div className="bg-background p-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/60 mb-1">Autor</p>
              <p className="text-sm text-foreground">{livro.autor}</p>
            </div>
            <div className="bg-background p-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/60 mb-1">Data</p>
              <p className="text-sm text-foreground">{livro.data}</p>
            </div>
            <div className="bg-background p-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/60 mb-1">Capítulos</p>
              <p className="text-sm text-foreground">{livro.capitulos}</p>
            </div>
          </div>
        </div>
      </div>

      {intro ? (
        <section className="max-w-5xl mx-auto px-6 py-16 border-b border-gold/15">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Introdução</p>
                <p className="text-base leading-relaxed text-foreground/90">{intro.contexto}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Passagens-chave</p>
                <ul className="space-y-2">
                  {intro.passagens.map((p) => (
                    <li key={p} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-gold/40 pl-3">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Sentido cristológico</p>
                <p className="text-sm italic text-foreground/85 leading-relaxed">{intro.cristo}</p>
              </div>
            </div>
            <aside>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Temas centrais</p>
              <ul className="space-y-3">
                {intro.temas.map((t) => (
                  <li key={t} className="text-sm text-foreground/90 border border-gold/20 bg-card p-3">
                    {t}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      ) : null}

      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <h2 className="font-display text-2xl text-foreground flex items-center gap-3">
            <BookOpen className="size-5 text-gold" /> Capítulos
          </h2>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map((c) => (
            <Link
              key={c}
              to="/biblia/$livro/$capitulo"
              params={{ livro: livro.slug, capitulo: String(c) }}
              className="aspect-square grid place-items-center border text-sm font-display transition-colors border-gold/25 text-foreground hover:border-gold hover:bg-gold/10"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 border-t border-gold/15 pt-10 flex flex-wrap justify-between gap-4">
        {anterior ? (
          <Link to="/biblia/$livro" params={{ livro: anterior.slug }} className="text-sm text-muted-foreground hover:text-gold">
            ← {anterior.nome}
          </Link>
        ) : <span />}
        {proximo ? (
          <Link to="/biblia/$livro" params={{ livro: proximo.slug }} className="text-sm text-muted-foreground hover:text-gold ml-auto">
            {proximo.nome} →
          </Link>
        ) : null}
      </section>
    </div>
  );
}
