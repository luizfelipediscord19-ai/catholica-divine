import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLivro, getUrlOficial } from "../lib/data/biblia";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/biblia/$livro/$capitulo")({
  loader: ({ params }) => {
    const l = getLivro(params.livro);
    const c = Number(params.capitulo);
    if (!l || !Number.isFinite(c) || c < 1 || c > l.capitulos) throw notFound();
    return { livro: l, capitulo: c };
  },
  head: ({ loaderData }) => {
    const titulo = loaderData ? `${loaderData.livro.nome} ${loaderData.capitulo}` : "Bíblia";
    return {
      meta: [
        { title: `${titulo} — Bíblia Católica — Portal Católico` },
        { name: "description", content: `Leitura de ${titulo}. ${loaderData?.livro.resumo ?? ""}` },
        { property: "og:title", content: `${titulo} — Bíblia Católica` },
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
  const { livro, capitulo } = Route.useLoaderData();
  const urlOficial = getUrlOficial(livro, capitulo);
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

      <div className="mt-10 border border-gold/25 bg-card p-8 md:p-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Texto integral oficial</p>
        <p className="text-foreground leading-relaxed">
          O texto desta passagem está disponível na edição{" "}
          <strong className="text-gold">Ave-Maria</strong> (Tradução dos originais mediante a Versão dos
          Monges Beneditinos de Maredsous, Bélgica), em fonte oficial:
        </p>
        <a
          href={urlOficial}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors"
        >
          <ExternalLink className="size-3.5" /> Ler {livro.abrev} {capitulo} integralmente
        </a>
        <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
          A íntegra dos textos bíblicos em português, em traduções modernas como Ave-Maria, CNBB,
          Bíblia de Jerusalém e Pastoral, é protegida por direito autoral das respectivas editoras.
          Este portal disponibiliza a estrutura completa de leitura e remete ao texto oficial nas
          fontes legítimas. Para o latim integral, consulte a{" "}
          <a
            className="text-gold underline"
            target="_blank"
            rel="noopener"
            href="https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_index_lt.html"
          >
            Nova Vulgata em vatican.va
          </a>
          .
        </p>
      </div>

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
