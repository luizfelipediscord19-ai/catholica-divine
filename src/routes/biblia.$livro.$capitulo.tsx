import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLivro, getUrlOficial } from "../lib/data/biblia";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

type Verso = { v: number; t: string };
type LivroJson = { slug: string; nome: string; capitulos: Record<string, Verso[]> };

async function carregarCapitulo(slug: string, cap: number): Promise<Verso[] | null> {
  try {
    const mod = (await import(`../lib/data/biblia/almeida/${slug}.json`)) as { default: LivroJson };
    return mod.default.capitulos[String(cap)] ?? null;
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/biblia/$livro/$capitulo")({
  loader: async ({ params }) => {
    const l = getLivro(params.livro);
    const c = Number(params.capitulo);
    if (!l || !Number.isFinite(c) || c < 1 || c > l.capitulos) throw notFound();
    const versos = await carregarCapitulo(l.slug, c);
    return { livro: l, capitulo: c, versos };
  },
  head: ({ loaderData }) => {
    const titulo = loaderData ? `${loaderData.livro.nome} ${loaderData.capitulo}` : "Bíblia";
    return {
      meta: [
        { title: `${titulo} — Bíblia (Almeida) — Portal Católico` },
        { name: "description", content: `Leitura de ${titulo}. ${loaderData?.livro.resumo ?? ""}` },
        { property: "og:title", content: `${titulo} — Bíblia` },
        { property: "og:description", content: loaderData?.livro.resumo ?? "" },
      ],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="text-gold">Capítulo não encontrado.</p>
      <Link to="/biblia" className="text-sm underline mt-4 inline-block">← Voltar</Link>
    </div>
  ),
});

function Page() {
  const { livro, capitulo, versos } = Route.useLoaderData();
  const anterior = capitulo > 1 ? capitulo - 1 : null;
  const proximo = capitulo < livro.capitulos ? capitulo + 1 : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Link
        to="/biblia/$livro"
        params={{ livro: livro.slug }}
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold/80 hover:text-gold mb-6"
      >
        <ArrowLeft className="size-3" /> {livro.nome}
      </Link>

      <h1 className="font-display text-5xl md:text-6xl text-foreground">
        {livro.nome} <span className="text-gold">{capitulo}</span>
      </h1>
      <p className="mt-3 text-sm text-muted-foreground tracking-wider uppercase">
        {livro.abrev} {capitulo} · Capítulo {capitulo} de {livro.capitulos}
      </p>

      {versos ? (
        <article className="mt-10 border border-gold/25 bg-card p-8 md:p-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
            Tradução · Almeida (domínio público)
          </p>
          <div className="space-y-3 font-display text-lg leading-relaxed text-foreground/95">
            {versos.map((v: Verso) => (
              <p key={v.v} id={`v${v.v}`} className="group">
                <a
                  href={`#v${v.v}`}
                  className="inline-block w-8 text-right pr-3 text-[11px] font-sans align-top text-gold/70 group-hover:text-gold"
                >
                  {v.v}
                </a>
                <span>{v.t}</span>
              </p>
            ))}
          </div>
          <p className="mt-8 pt-6 border-t border-gold/15 text-[11px] text-muted-foreground leading-relaxed">
            Texto: João Ferreira de Almeida, edição em domínio público.
            Para comparar com a tradução católica Ave-Maria, consulte a{" "}
            <a className="text-gold underline" target="_blank" rel="noopener" href={getUrlOficial(livro, capitulo)}>
              versão oficial em bibliacatolica.com.br
            </a>.
          </p>
        </article>
      ) : (
        <FallbackOficial slug={livro.slug} nome={livro.nome} abrev={livro.abrev} capitulo={capitulo} />
      )}

      <nav className="mt-10 flex items-center justify-between gap-4">
        {anterior ? (
          <Link
            to="/biblia/$livro/$capitulo"
            params={{ livro: livro.slug, capitulo: String(anterior) }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
          >
            <ChevronLeft className="size-4" /> {livro.nome} {anterior}
          </Link>
        ) : <span />}
        {proximo ? (
          <Link
            to="/biblia/$livro/$capitulo"
            params={{ livro: livro.slug, capitulo: String(proximo) }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold ml-auto"
          >
            {livro.nome} {proximo} <ChevronRight className="size-4" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

function FallbackOficial({ slug, nome, abrev, capitulo }: { slug: string; nome: string; abrev: string; capitulo: number }) {
  const url = `https://www.bibliacatolica.com.br/biblia-ave-maria/${slug}/${capitulo}/`;
  return (
    <div className="mt-10 border border-gold/25 bg-card p-8 md:p-10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Em processamento</p>
      <p className="text-foreground leading-relaxed">
        O texto de <strong>{nome} {capitulo}</strong> ainda está sendo carregado neste portal.
        Enquanto isso, leia na fonte oficial Ave-Maria:
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors"
      >
        <ExternalLink className="size-3.5" /> Ler {abrev} {capitulo}
      </a>
    </div>
  );
}
