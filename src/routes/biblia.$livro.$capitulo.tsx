import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
        { title: `${titulo} — Bíblia — Portal Católico` },
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

type FonteId = "almeida" | "vulgata" | "novavulgata" | "original";

const FONTES: { id: FonteId; nome: string; lingua: string; dominio: string }[] = [
  { id: "almeida", nome: "Almeida", lingua: "Português", dominio: "Domínio público" },
  { id: "vulgata", nome: "Vulgata Clementina", lingua: "Latim", dominio: "Domínio público" },
  { id: "novavulgata", nome: "Nova Vulgata", lingua: "Latim oficial", dominio: "© Vaticano (leitura)" },
  { id: "original", nome: "Originais", lingua: "Hebraico / Grego", dominio: "Domínio público" },
];

function urlVulgata(slug: string, cap: number) {
  return `https://www.sacred-texts.com/bib/vul/index.htm#${slug}_${cap}`;
}
function urlNovaVulgata(testamento: string, slug: string, cap: number) {
  // vatican.va mantém Nova Vulgata por livro
  return `https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_${testamento === "AT" ? "vt" : "nt"}_${slug}_lt.html#${cap}`;
}
function urlOriginal(testamento: string, slug: string, cap: number) {
  return testamento === "NT"
    ? `https://biblehub.com/interlinear/${slug}/${cap}.htm`
    : `https://mechon-mamre.org/p/pt/pt0.htm`;
}

function Page() {
  const { livro, capitulo, versos } = Route.useLoaderData();
  const [fonte, setFonte] = useState<FonteId>("almeida");
  const anterior = capitulo > 1 ? capitulo - 1 : null;
  const proximo = capitulo < livro.capitulos ? capitulo + 1 : null;
  const fonteAtual = FONTES.find((f) => f.id === fonte)!;

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

      {/* Seletor de fonte */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FONTES.map((f) => {
          const ativo = f.id === fonte;
          return (
            <button
              key={f.id}
              onClick={() => setFonte(f.id)}
              className={
                "px-4 py-2 text-[10px] tracking-[0.25em] uppercase border transition-colors " +
                (ativo
                  ? "border-gold bg-gold text-deep"
                  : "border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60")
              }
            >
              {f.nome}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Fonte: <span className="text-gold">{fonteAtual.nome}</span> — {fonteAtual.lingua} · {fonteAtual.dominio}
      </p>

      {/* Conteúdo conforme fonte */}
      {fonte === "almeida" && versos ? (
        <article className="mt-6 border border-gold/25 bg-card p-8 md:p-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
            Almeida (João Ferreira de Almeida) · Domínio público
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
            Para comparar com a tradução católica Ave-Maria, consulte a{" "}
            <a className="text-gold underline" target="_blank" rel="noopener" href={getUrlOficial(livro, capitulo)}>
              versão oficial em bibliacatolica.com.br
            </a>.
          </p>
        </article>
      ) : fonte === "almeida" ? (
        <FallbackOficial slug={livro.slug} nome={livro.nome} abrev={livro.abrev} capitulo={capitulo} />
      ) : (
        <FonteExterna
          fonte={fonteAtual}
          url={
            fonte === "vulgata"
              ? urlVulgata(livro.slug, capitulo)
              : fonte === "novavulgata"
              ? urlNovaVulgata(livro.testamento, livro.slug, capitulo)
              : urlOriginal(livro.testamento, livro.slug, capitulo)
          }
          livro={livro.nome}
          capitulo={capitulo}
        />
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

function FonteExterna({
  fonte,
  url,
  livro,
  capitulo,
}: {
  fonte: { nome: string; lingua: string };
  url: string;
  livro: string;
  capitulo: number;
}) {
  return (
    <article className="mt-6 border border-gold/25 bg-card p-8 md:p-10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
        {fonte.nome} · {fonte.lingua}
      </p>
      <p className="text-foreground/90 leading-relaxed">
        A integração do texto integral de <strong>{fonte.nome}</strong> em <strong>{livro} {capitulo}</strong> está
        sendo preparada. Por enquanto, consulte diretamente a fonte oficial:
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors"
      >
        <ExternalLink className="size-3.5" /> Abrir {fonte.nome}
      </a>
    </article>
  );
}

function FallbackOficial({ slug, nome, abrev, capitulo }: { slug: string; nome: string; abrev: string; capitulo: number }) {
  const url = `https://www.bibliacatolica.com.br/biblia-ave-maria/${slug}/${capitulo}/`;
  return (
    <div className="mt-6 border border-gold/25 bg-card p-8 md:p-10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Em processamento</p>
      <p className="text-foreground leading-relaxed">
        O texto Almeida de <strong>{nome} {capitulo}</strong> ainda está sendo carregado.
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
