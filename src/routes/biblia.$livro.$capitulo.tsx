import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLivro, getUrlOficial } from "../lib/data/biblia";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";

type Verso = { v: number; t: string };
type LivroJson = { slug: string; nome: string; capitulos: Record<string, Verso[]> };

const CAPITULO_CACHE = new Map<string, Verso[]>();

async function carregarCapitulo(slug: string, cap: number): Promise<Verso[] | null> {
  const cacheKey = `${slug}-${cap}`;
  if (CAPITULO_CACHE.has(cacheKey)) return CAPITULO_CACHE.get(cacheKey)!;
  
  try {
    const mod = (await import(`../lib/data/biblia/almeida/${slug}.json`)) as { default: LivroJson };
    const versos = mod.default.capitulos[String(cap)] ?? null;
    if (versos) CAPITULO_CACHE.set(cacheKey, versos);
    return versos;
  } catch (error) {
    console.error(`Falha ao carregar capítulo: ${slug} ${cap}`, error);
    return null;
  }
}

type Search = { vi?: number; vf?: number };

export const Route = createFileRoute("/biblia/$livro/$capitulo")({
  validateSearch: (raw: Record<string, unknown>): Search => {
    const toNum = (x: unknown) => {
      const n = Number(x);
      return Number.isFinite(n) && n > 0 ? Math.floor(n) : undefined;
    };
    return { vi: toNum(raw.vi), vf: toNum(raw.vf) };
  },
  loader: async ({ params, context: { queryClient } }) => {
    const l = getLivro(params.livro);
    const c = Number(params.capitulo);
    if (!l || !Number.isFinite(c) || c < 1 || c > l.capitulos) throw notFound();
    
    // Use React Query for caching to prevent redundant imports on re-navigation
    return queryClient.ensureQueryData({
      queryKey: ["biblia", l.slug, c],
      queryFn: async () => {
        const versos = await carregarCapitulo(l.slug, c);
        return { livro: l, capitulo: c, versos };
      },
    });
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
  return `https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_${testamento === "AT" ? "vt" : "nt"}_${slug}_lt.html#${cap}`;
}
function urlOriginal(testamento: string, slug: string, cap: number) {
  return testamento === "NT"
    ? `https://biblehub.com/interlinear/${slug}/${cap}.htm`
    : `https://mechon-mamre.org/p/pt/pt0.htm`;
}

function Page() {
  const loaderData = Route.useLoaderData();
  if (!loaderData) return null;
  const { livro, capitulo, versos } = loaderData;
  const { vi, vf } = Route.useSearch();
  const navigate = useNavigate();
  const [fonte, setFonte] = useState<FonteId>("almeida");
  const anterior = capitulo > 1 ? capitulo - 1 : null;
  const proximo = capitulo < livro.capitulos ? capitulo + 1 : null;
  const fonteAtual = FONTES.find((f) => f.id === fonte)!;

  // Estado local para o seletor de passagens
  const [inicio, setInicio] = useState<string>(vi ? String(vi) : "");
  const [fim, setFim] = useState<string>(vf ? String(vf) : "");
  useEffect(() => {
    setInicio(vi ? String(vi) : "");
    setFim(vf ? String(vf) : "");
  }, [vi, vf]);

  const aplicarPassagem = (e: React.FormEvent) => {
    e.preventDefault();
    const i = Number(inicio);
    const f = Number(fim);
    navigate({
      to: "/biblia/$livro/$capitulo",
      params: { livro: livro.slug, capitulo: String(capitulo) },
      search: {
        vi: Number.isFinite(i) && i > 0 ? i : undefined,
        vf: Number.isFinite(f) && f > 0 ? f : undefined,
      },
    });
  };

  const limparPassagem = () => {
    setInicio(""); setFim("");
    navigate({
      to: "/biblia/$livro/$capitulo",
      params: { livro: livro.slug, capitulo: String(capitulo) },
      search: {},
    });
  };

  // Filtragem
  const versosFiltrados = (() => {
    if (!versos) return null;
    if (!vi) return versos;
    const start = vi;
    const end = vf && vf >= vi ? vf : vi;
    return versos.filter((v: Verso) => v.v >= start && v.v <= end);
  })();

  const passagemAtiva = !!vi;
  const refPassagem = vi
    ? `${livro.abrev} ${capitulo}:${vi}${vf && vf !== vi ? `-${vf}` : ""}`
    : null;

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
        {refPassagem && <span className="text-gold/80 text-3xl md:text-4xl">:{vi}{vf && vf !== vi ? `-${vf}` : ""}</span>}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground tracking-wider uppercase">
        {livro.abrev} {capitulo} · Capítulo {capitulo} de {livro.capitulos}
      </p>

      {/* Seletor de passagens */}
      <form onSubmit={aplicarPassagem} className="mt-12 flex flex-wrap items-end gap-6 border border-gold/10 bg-card/40 backdrop-blur-sm p-8 transition-smooth hover:border-gold/20">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold">
          <Filter className="size-3" /> Passagem
        </div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          Versículo inicial
          <input
            type="number" min={1}
            value={inicio} onChange={(e) => setInicio(e.target.value)}
            placeholder="ex. 16"
            className="block mt-1 w-24 bg-background border border-gold/25 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
          />
        </label>
        <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          Final (opcional)
          <input
            type="number" min={1}
            value={fim} onChange={(e) => setFim(e.target.value)}
            placeholder="ex. 18"
            className="block mt-1 w-24 bg-background border border-gold/25 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
          />
        </label>
        <button type="submit" className="px-6 py-3 bg-gold text-deep text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-paper transition-smooth hover:scale-[1.02] active:scale-[0.98]">
          Abrir passagem
        </button>
        {passagemAtiva && (
          <button type="button" onClick={limparPassagem} className="inline-flex items-center gap-1 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-gold">
            <X className="size-3" /> Capítulo inteiro
          </button>
        )}
      </form>

      {/* Seletor de fonte */}
      <div className="mt-6 flex flex-wrap gap-2">
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
      {fonte === "almeida" && versosFiltrados ? (
        <article className="mt-12 border border-gold/10 bg-card/30 backdrop-blur-sm p-10 md:p-16 shadow-2xl shadow-gold/5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
            Almeida (João Ferreira de Almeida) · Domínio público
            {passagemAtiva && <span className="ml-2 text-gold/70">· passagem {refPassagem}</span>}
          </p>
          {versosFiltrados.length === 0 ? (
            <p className="text-muted-foreground">Nenhum versículo encontrado nesse intervalo.</p>
          ) : (
            <div className="space-y-6 font-display text-xl leading-[1.8] text-foreground/90 selection:bg-gold/30">
              {versosFiltrados.map((v: Verso) => (
                <p key={v.v} id={`v${v.v}`} className="group relative pl-12 transition-smooth hover:text-foreground">
                  <a
                    href={`#v${v.v}`}
                    className="absolute left-0 top-0 w-10 text-right pr-4 text-[10px] font-sans align-top text-gold/30 group-hover:text-gold transition-smooth"
                  >
                    {v.v}
                  </a>
                  <span className="block animate-content-fade" style={{ animationDelay: `${(v.v % 10) * 50}ms` }}>{v.t}</span>
                </p>
              ))}
            </div>
          )}
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
  fonte, url, livro, capitulo,
}: { fonte: { nome: string; lingua: string }; url: string; livro: string; capitulo: number }) {
  return (
    <article className="mt-6 border border-gold/25 bg-card p-8 md:p-10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">{fonte.nome} · {fonte.lingua}</p>
      <p className="text-foreground/90 leading-relaxed">
        A integração do texto integral de <strong>{fonte.nome}</strong> em <strong>{livro} {capitulo}</strong> está
        sendo preparada. Por enquanto, consulte diretamente a fonte oficial:
      </p>
      <a href={url} target="_blank" rel="noopener"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors">
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
      <a href={url} target="_blank" rel="noopener"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors">
        <ExternalLink className="size-3.5" /> Ler {abrev} {capitulo}
      </a>
    </div>
  );
}
