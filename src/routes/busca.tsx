import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowLeft,
  Search,
  Loader2,
  Sparkles,
  BookOpen,
  Library,
  Landmark,
  Crown,
  Heart,
  Droplets,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { buscarNoPortal } from "@/lib/busca/avancada.functions";
import type { EscopoBusca, Resultado } from "@/lib/busca/motor.server";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const ESCOPOS: { id: EscopoBusca; label: string }[] = [
  { id: "biblia", label: "Bíblia" },
  { id: "catecismo", label: "Catecismo" },
  { id: "sacramentos", label: "Sacramentos" },
  { id: "magisterio", label: "Magistério e doutrina" },
  { id: "santos", label: "Santos" },
  { id: "oracoes", label: "Orações" },
  { id: "formacao", label: "Trilhas de formação" },
];

const ICONES: Record<EscopoBusca, LucideIcon> = {
  biblia: BookOpen,
  catecismo: Library,
  magisterio: Landmark,
  sacramentos: Droplets,
  santos: Crown,
  oracoes: Heart,
  formacao: GraduationCap,
};

const SUGESTOES = [
  "misericórdia",
  "transubstanciação",
  "reino dos céus",
  "primado de Pedro",
  "graça santificante",
];

export const Route = createFileRoute("/busca")({
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === "string" && search.q.trim() ? search.q.trim() : undefined,
  }),

  head: () => ({
    meta: [
      { title: "Busca Avançada — Bíblia, Catecismo e Magistério | Portal Católico" },
      {
        name: "description",
        content:
          "Pesquise um termo e cruze instantaneamente o texto integral da Bíblia, o Catecismo, o glossário doutrinal, o banco apologético, os santos e as orações da tradição.",
      },
      { name: "keywords", content: keywordsPara(["marca", "formacao"]) },
      { property: "og:title", content: "Busca Avançada do Portal Católico" },
      {
        property: "og:description",
        content:
          "Motor de busca indexado que cruza Bíblia, Catecismo e Magistério em uma única consulta.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/busca" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/busca" }],
  }),
  component: BuscaAvancadaPage,
});

function Destaque({ texto, termo }: { texto: string; termo: string }) {
  const partes = useMemo(() => {
    const toks = termo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((t) => t.length >= 2);
    if (!toks.length) return [texto];
    const alvo = texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const marcas: [number, number][] = [];
    for (const tok of toks) {
      let i = alvo.indexOf(tok);
      while (i >= 0 && marcas.length < 40) {
        marcas.push([i, i + tok.length]);
        i = alvo.indexOf(tok, i + tok.length);
      }
    }
    marcas.sort((a, b) => a[0] - b[0]);
    const saida: (string | { m: string })[] = [];
    let cursor = 0;
    for (const [ini, fim] of marcas) {
      if (ini < cursor) continue;
      saida.push(texto.slice(cursor, ini), { m: texto.slice(ini, fim) });
      cursor = fim;
    }
    saida.push(texto.slice(cursor));
    return saida;
  }, [texto, termo]);

  return (
    <>
      {partes.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <mark key={i} className="bg-gold/25 text-foreground rounded-sm px-0.5">
            {p.m}
          </mark>
        ),
      )}
    </>
  );
}

function BuscaAvancadaPage() {
  const { q } = Route.useSearch();
  const [termo, setTermo] = useState(q ?? "");
  const [ativos, setAtivos] = useState<EscopoBusca[]>(ESCOPOS.map((e) => e.id));
  const [consulta, setConsulta] = useState(q ?? "");

  const buscar = useServerFn(buscarNoPortal);

  const mutation = useMutation({
    mutationFn: (dados: { termo: string; escopos: EscopoBusca[] }) =>
      buscar({ data: { ...dados, limite: 60 } }),
  });

  useEffect(() => {
    if (!q) return;
    setTermo(q);
    setConsulta(q);
  }, [q]);


  useEffect(() => {
    if (consulta.trim().length < 2) return;
    mutation.mutate({ termo: consulta, escopos: ativos });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consulta, ativos.join(",")]);

  const dados = mutation.data;

  /** Resultados agrupados por escopo, preservando a ordem de relevância. */
  const grupos = useMemo(() => {
    const mapa = new Map<EscopoBusca, Resultado[]>();
    for (const r of dados?.resultados ?? []) {
      const lista = mapa.get(r.escopo);
      if (lista) lista.push(r);
      else mapa.set(r.escopo, [r]);
    }
    return mapa;
  }, [dados]);

  function alternar(id: EscopoBusca) {
    setAtivos((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((e) => e !== id) : prev) : [...prev, id],
    );
  }

  return (
    <div className="shell py-block">
      <Link
        to="/"
        className="inline-flex items-center gap-2 kicker hover:text-gold mb-10 transition-colors"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" /> Voltar
      </Link>

      <header className="mb-10">
        <p className="kicker mb-5 flex items-center gap-3">
          <Search className="size-4" aria-hidden="true" /> Quaerite et invenietis
        </p>
        <h1 className="title-page text-foreground leading-[1.05] mb-5">
          Busca <span className="text-gold/70 italic">Avançada</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
          Um só termo cruzando o texto integral da Bíblia (73 livros), o Catecismo,
          os sete sacramentos, o glossário doutrinal, o banco apologético com fontes,
          os santos, as orações da tradição e as trilhas de formação. A varredura roda
          no servidor — nada pesa no seu aparelho.
        </p>
      </header>

      <form
        role="search"
        aria-label="Busca avançada no portal"
        onSubmit={(e) => {
          e.preventDefault();
          setConsulta(termo);
        }}
        className="space-y-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="busca-termo">
            Termo pesquisado no acervo
          </label>
          <input
            id="busca-termo"
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Ex.: misericórdia, primado de Pedro, Eucaristia…"
            className="flex-1 min-h-11 rounded-md surface-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-6 label-btn text-gold transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Search className="size-4" aria-hidden="true" />
            )}
            Buscar
          </button>
        </div>

        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Escopos da busca</legend>
          {ESCOPOS.map((escopo) => {
            const on = ativos.includes(escopo.id);
            return (
              <button
                key={escopo.id}
                type="button"
                aria-pressed={on}
                onClick={() => alternar(escopo.id)}
                className={`min-h-9 rounded-full border px-4 py-1.5 label-btn transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  on
                    ? "border-gold/50 bg-gold/15 text-gold"
                    : "border-gold/15 text-muted-foreground hover:text-foreground"
                }`}
              >
                {escopo.label}
                {dados ? (
                  <span className="ml-2 text-foreground/60">{dados.porEscopo[escopo.id]}</span>
                ) : null}
              </button>
            );
          })}
        </fieldset>
      </form>

      {!consulta ? (
        <div className="mt-12">
          <p className="kicker mb-4">
            Comece por aqui
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGESTOES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setTermo(s);
                  setConsulta(s);
                }}
                className="min-h-9 rounded-full border border-gold/20 px-4 text-sm text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div aria-live="polite" className="mt-12">
        {mutation.isPending ? (
          <p className="text-sm text-muted-foreground">Varrendo o acervo…</p>
        ) : null}

        {mutation.isError ? (
          <p role="alert" className="text-sm text-destructive-text">
            Não foi possível concluir a busca agora. Tente novamente em instantes.
          </p>
        ) : null}

        {dados && !mutation.isPending ? (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              {dados.total === 0
                ? `Nenhuma ocorrência de “${dados.termo}” nos escopos selecionados.`
                : `${dados.total} ocorrência${dados.total > 1 ? "s" : ""} de “${dados.termo}” · ${dados.duracaoMs} ms · exibindo ${dados.resultados.length}`}
            </p>

            <Link
              to="/assistente"
              search={{ q: dados.termo }}
              className="mb-8 flex items-start gap-3 surface-card p-4 sm:p-5 transition-colors hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block kicker mb-1">Sophia IA</span>
                <span className="block text-sm text-foreground">
                  Perguntar à Sophia sobre “{dados.termo}”
                </span>
                <span className="block text-xs text-muted-foreground">
                  Resposta explicada, com as fontes do Catecismo e da Escritura citadas.
                </span>
              </span>
            </Link>

            {ESCOPOS.filter((e) => grupos.get(e.id)?.length).map((escopo) => {
              const itens = grupos.get(escopo.id)!;
              const Icone = ICONES[escopo.id];
              return (
                <section key={escopo.id} aria-label={escopo.label} className="mb-10">
                  <h2 className="mb-3 flex items-center gap-2 kicker">
                    <Icone className="size-3.5 text-gold" aria-hidden="true" />
                    {escopo.label}
                    <span className="text-muted-foreground">{itens.length}</span>
                  </h2>
                  <ol className="space-y-3">
                    {itens.map((r) => (
                      <li key={r.id}>
                        <Link
                          to={r.href}
                          className="block surface-card p-4 sm:p-5 transition-colors hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                        >
                          <p className="mb-1.5 kicker text-muted-foreground">{r.referencia}</p>
                          <h3 className="font-display text-lg sm:text-xl text-foreground mb-2 leading-snug">
                            <Destaque texto={r.titulo} termo={dados.termo} />
                          </h3>
                          <p className="text-sm leading-[1.7] text-muted-foreground">
                            <Destaque texto={r.trecho} termo={dados.termo} />
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </>
        ) : null}
      </div>

      <p className="mt-16 border-t border-gold/15 pt-6 text-xs leading-relaxed text-muted-foreground">
        Texto bíblico de domínio público hospedado no próprio portal. Os verbetes doutrinais
        citam Catecismo, concílios e Padres — os critérios de curadoria estão descritos em{" "}
        <Link to="/sobre" className="text-gold hover:underline">
          Sobre o Portal
        </Link>
        .
      </p>
    </div>
  );
}
