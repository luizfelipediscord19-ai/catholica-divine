import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLivro } from "../lib/data/biblia";
import { ArrowLeft, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { Relacionados } from "../components/Relacionados";
import { VERSOES, type VersaoId } from "../lib/biblia/versoes";
import { obterCapituloVersao } from "../lib/biblia.functions";
import {
  BarraLeitura,
  EstrelaVersiculo,
  useCapituloPessoal,
} from "../components/portal/AcoesCapitulo";
import { NotasCapitulo } from "../components/portal/NotasCapitulo";

import { capituloLocal, temTextoLocal } from "../lib/biblia/local";

type Verso = { v: number; t: string };

async function carregarCapitulo(
  versao: string,
  slug: string,
  cap: number,
): Promise<Verso[] | null> {
  return capituloLocal(versao, slug, cap);
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

    return queryClient.ensureQueryData({
      queryKey: ["biblia", l.slug, c],
      queryFn: async () => {
        const versos = await carregarCapitulo("almeida", l.slug, c);
        return { livro: l, capitulo: c, versos };
      },
    });
  },
  head: ({ params, loaderData }) => {
    const titulo = loaderData ? `${loaderData.livro.nome} ${loaderData.capitulo}` : "Bíblia";
    const url = `https://portalcatolico.vercel.app/biblia/${params.livro}/${params.capitulo}`;
    return {
      meta: [
        { title: `${titulo} — Bíblia — Portal Católico` },
        { name: "description", content: `Leitura de ${titulo} em português, latim, grego e hebraico. ${loaderData?.livro.resumo ?? ""}`.slice(0, 158) },
        { property: "og:title", content: `${titulo} — Bíblia` },
        { property: "og:description", content: loaderData?.livro.resumo ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Chapter",
            name: titulo,
            inLanguage: "pt-BR",
            url,
            isPartOf: { "@type": "Book", name: loaderData?.livro.nome ?? "Bíblia" },
          }),
        },
      ],
    };
  },

  component: Page,
  notFoundComponent: () => (
    <div className="shell-narrow py-block text-center">
      <p className="text-gold">Capítulo não encontrado.</p>
      <Link to="/biblia" className="text-sm underline mt-4 inline-block">← Voltar</Link>
    </div>
  ),
});

function Page() {
  const loaderData = Route.useLoaderData();
  if (!loaderData) return null;
  const { livro, capitulo, versos } = loaderData;
  const { vi, vf } = Route.useSearch();
  const navigate = useNavigate();
  // Livros deuterocanônicos não existem na Almeida (edição protestante de
  // domínio público): abrimos direto na Vulgata Clementina.
  const almeidaTemLivro = temTextoLocal("almeida", livro.slug);
  const [versao, setVersao] = useState<VersaoId>(almeidaTemLivro ? "almeida" : "vulgata");
  const pessoal = useCapituloPessoal(livro.slug, capitulo);
  const anterior = capitulo > 1 ? capitulo - 1 : null;
  const proximo = capitulo < livro.capitulos ? capitulo + 1 : null;
  const versaoAtual = VERSOES.find((v) => v.id === versao)!;

  // Texto local hospedado no portal; senão o próprio servidor entrega.
  const temLocal = versao === "almeida" && !!versos;
  const localOutra = useQuery({
    queryKey: ["biblia-local", versao, livro.slug, capitulo],
    queryFn: () => carregarCapitulo(versao, livro.slug, capitulo),
    enabled: !temLocal && temTextoLocal(versao, livro.slug),
    staleTime: Infinity,
  });
  const buscar = useServerFn(obterCapituloVersao);
  const remoto = useQuery({
    queryKey: ["biblia-versao", versao, livro.slug, capitulo],
    queryFn: () => buscar({ data: { versao, livro: livro.slug, capitulo } }),
    enabled: !temLocal && !temTextoLocal(versao, livro.slug),
    staleTime: 1000 * 60 * 60,
  });

  const textoAtual: Verso[] | null = temLocal
    ? versos
    : (localOutra.data ?? remoto.data?.versos ?? null);
  const carregando =
    !temLocal &&
    !textoAtual &&
    (temTextoLocal(versao, livro.slug) ? !localOutra.isFetched : !remoto.isFetched);

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

  const versosFiltrados = (() => {
    if (!textoAtual) return null;
    if (!vi) return textoAtual;
    const start = vi;
    const end = vf && vf >= vi ? vf : vi;
    return textoAtual.filter((v) => v.v >= start && v.v <= end);
  })();

  const passagemAtiva = !!vi;
  const refPassagem = vi
    ? `${livro.abrev} ${capitulo}:${vi}${vf && vf !== vi ? `-${vf}` : ""}`
    : null;

  return (
    <div className="shell-narrow py-block">
      <Link
        to="/biblia/$livro"
        params={{ livro: livro.slug }}
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gold/80 hover:text-gold mb-6"
      >
        <ArrowLeft className="size-3 shrink-0" /> <span className="truncate">{livro.nome}</span>
      </Link>

      <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground break-words">
        {livro.nome} <span className="text-gold">{capitulo}</span>
        {refPassagem && (
          <span className="text-gold/80 text-2xl sm:text-4xl">
            :{vi}{vf && vf !== vi ? `-${vf}` : ""}
          </span>
        )}
      </h1>
      <p className="mt-3 text-xs sm:text-sm text-muted-foreground tracking-wider uppercase">
        {livro.abrev} {capitulo} · Capítulo {capitulo} de {livro.capitulos}
      </p>

      {/* Seletor de passagens */}
      <form
        onSubmit={aplicarPassagem}
        className="mt-8 md:mt-12 grid gap-4 sm:flex sm:flex-wrap sm:items-end sm:gap-6 border border-gold/10 bg-card/40 backdrop-blur-sm p-5 sm:p-8"
      >
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold">
          <Filter className="size-3 shrink-0" /> Passagem
        </div>
        <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-6">
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Versículo inicial
            <input
              type="number" min={1} inputMode="numeric"
              value={inicio} onChange={(e) => setInicio(e.target.value)}
              placeholder="ex. 16"
              className="block mt-1 w-full sm:w-24 bg-background border border-gold/25 px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:border-gold"
            />
          </label>
          <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Final (opcional)
            <input
              type="number" min={1} inputMode="numeric"
              value={fim} onChange={(e) => setFim(e.target.value)}
              placeholder="ex. 18"
              className="block mt-1 w-full sm:w-24 bg-background border border-gold/25 px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:border-gold"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="min-h-11 px-5 py-3 bg-gold text-deep text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-paper transition-smooth">
            Abrir passagem
          </button>
          {passagemAtiva && (
            <button type="button" onClick={limparPassagem} className="inline-flex items-center gap-1 min-h-11 px-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold">
              <X className="size-3" /> Capítulo inteiro
            </button>
          )}
        </div>
      </form>

      <BarraLeitura
        lido={pessoal.lido}
        pronto={pessoal.pronto}
        pendente={pessoal.marcar.isPending}
        onAlternar={() => pessoal.marcar.mutate(!pessoal.lido)}
      />

      {/* Seletor de versão — todas servidas pelo próprio portal */}
      <div className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {VERSOES.map((v) => {
          const ativo = v.id === versao;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setVersao(v.id)}
              aria-pressed={ativo}
              className={
                "shrink-0 min-h-11 px-4 py-2 text-[10px] tracking-[0.2em] uppercase border transition-colors " +
                (ativo
                  ? "border-gold bg-gold text-deep"
                  : "border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60")
              }
            >
              {v.nome}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Versão: <span className="text-gold">{versaoAtual.nome}</span> — {versaoAtual.lingua} · {versaoAtual.fonte}
      </p>
      {!almeidaTemLivro && (
        <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
          Livro deuterocanônico: reconhecido pela Igreja Católica (Concílio de Trento,
          1546) e ausente das edições protestantes de domínio público. Por isso o texto
          é servido aqui na Vulgata Clementina (latim) e na Douay-Rheims (inglês).
        </p>
      )}
      {livro.slug === "salmos" && (versao === "vulgata" || versao === "grego") ? (
        <p className="mt-1 text-[11px] text-muted-foreground">
          Atenção: na Vulgata e na Septuaginta a numeração dos Salmos é deslocada em uma unidade
          em boa parte do saltério.
        </p>
      ) : null}


      <article className="mt-8 md:mt-12 border border-gold/10 bg-card/30 backdrop-blur-sm p-5 sm:p-10 md:p-16 shadow-2xl shadow-gold/5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-6">
          {versaoAtual.fonte}
          {passagemAtiva && <span className="ml-2 text-gold/70">· passagem {refPassagem}</span>}
        </p>

        {carregando ? (
          <p className="text-muted-foreground text-sm">Carregando o texto…</p>
        ) : !versosFiltrados ? (
          <p className="text-muted-foreground text-sm">
            Esta edição não contém {livro.nome} {capitulo}. Escolha outra versão acima.
          </p>
        ) : versosFiltrados.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhum versículo encontrado nesse intervalo.</p>
        ) : (
          <div
            dir={versaoAtual.direcao ?? "ltr"}
            className={`space-y-5 sm:space-y-6 text-lg sm:text-xl leading-[1.85] text-foreground/90 selection:bg-gold/30 ${versaoAtual.classeTexto ?? "font-display"}`}
          >
            {versosFiltrados.map((v) => (
              <p key={v.v} id={`v${v.v}`} className="group relative pl-9 sm:pl-12">
                <a
                  href={`#v${v.v}`}
                  className="absolute left-0 top-1 w-7 sm:w-10 text-right pr-3 sm:pr-4 text-[10px] font-sans text-gold/40 group-hover:text-gold transition-smooth"
                  aria-label={`Versículo ${v.v}`}
                >
                  {v.v}
                </a>
                <EstrelaVersiculo
                  ativa={pessoal.favoritos.includes(v.v)}
                  disabled={!pessoal.pronto || pessoal.favoritar.isPending}
                  onClick={() => pessoal.favoritar.mutate({ versiculo: v.v, texto: v.t.slice(0, 900) })}
                />
                <span className="block">{v.t}</span>
              </p>
            ))}
          </div>
        )}

        <p className="mt-8 pt-6 border-t border-gold/15 text-[11px] text-muted-foreground leading-relaxed">
          Edições de domínio público hospedadas no próprio portal. Traduções protegidas por
          direito autoral (Ave-Maria, Nova Vulgata) não são reproduzidas aqui.
        </p>
      </article>

      <NotasCapitulo livro={livro.slug} capitulo={capitulo} className="mt-10" />

      <Relacionados topic={`biblia:${livro.slug}`} className="mt-10" />

      <nav className="mt-10 flex items-center justify-between gap-4">
        {anterior ? (
          <Link
            to="/biblia/$livro/$capitulo"
            params={{ livro: livro.slug, capitulo: String(anterior) }}
            className="inline-flex items-center gap-2 min-h-11 text-sm text-muted-foreground hover:text-gold"
          >
            <ChevronLeft className="size-4 shrink-0" /> <span className="truncate">{livro.abrev} {anterior}</span>
          </Link>
        ) : <span />}
        {proximo ? (
          <Link
            to="/biblia/$livro/$capitulo"
            params={{ livro: livro.slug, capitulo: String(proximo) }}
            className="inline-flex items-center gap-2 min-h-11 text-sm text-muted-foreground hover:text-gold ml-auto"
          >
            <span className="truncate">{livro.abrev} {proximo}</span> <ChevronRight className="size-4 shrink-0" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
