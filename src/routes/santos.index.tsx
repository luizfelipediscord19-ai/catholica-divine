import { createFileRoute } from "@tanstack/react-router";
import vitral from "@/assets/vitral.jpg";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import { SANTOS_LISTA } from "@/lib/santos-lista";
import { buildSantoView } from "@/lib/santos-helpers";
import { imagemSanto } from "@/lib/data/santos-imagens";
import { RetratoSanto } from "@/components/santos/RetratoSanto";
import { usePrefetchSanto, usePrefetchLote } from "@/lib/santos/prefetch";
import { BotaoSalvar } from "@/components/portal/BotaoSalvar";


export const Route = createFileRoute("/santos/")({
  head: () => ({
    meta: [
      { title: "Santos — Portal Católico" },
      { name: "description", content: "Vidas e ensinamentos dos santos: testemunhas da fé e amigos de Deus." },
      { property: "og:title", content: "Os Santos da Igreja" },
      { property: "og:description", content: "Vidas, virtudes e ensinamentos dos santos católicos." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/santos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/santos" }],
  }),
  component: Page,
});

const PAGINA = 24;

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function normalizar(v: string) {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Extrai o mês da memória litúrgica (“13 de junho” → “junho”). */
function mesDaMemoria(data: string): string | null {
  const alvo = normalizar(data);
  return MESES.find((m) => alvo.includes(normalizar(m))) ?? null;
}

function Page() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [mes, setMes] = useState<string>("");
  const [limite, setLimite] = useState(PAGINA);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = normalizar(query);
    const termos = q ? q.split(" ") : [];
    return SANTOS_LISTA.filter((s) => {
      if (mes && mesDaMemoria(s.data) !== mes) return false;
      if (termos.length === 0) return true;
      const alvo = normalizar(`${s.nome} ${s.body} ${s.data}`);
      return termos.every((t) => alvo.includes(t));
    });
  }, [query, mes]);


  const visiveis = useMemo(() => filtered.slice(0, limite), [filtered, limite]);

  // Prepara em segundo plano os primeiros santos da próxima página
  const proximos = useMemo(
    () => filtered.slice(limite, limite + 8).map((s) => s.slug),
    [filtered, limite]
  );
  usePrefetchLote(proximos);

  useEffect(() => {
    setLimite(PAGINA);
  }, [query, mes]);


  useEffect(() => {
    if (!selectedSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedSlug]);

  const selected = useMemo(() => {
    if (!selectedSlug) return null;
    const basico = SANTOS_LISTA.find((s) => s.slug === selectedSlug);
    return { basico, view: buildSantoView(selectedSlug, basico) };
  }, [selectedSlug]);

  useEffect(() => {
    if (selected && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedSlug]);

  return (
    <div>
      <PageHero
        eyebrow="Communio Sanctorum"
        title="Os Santos da Igreja"
        intro="As testemunhas vivas do Evangelho. Clique em qualquer santo para abrir a biografia e a imagem diretamente nesta página, sem recarregamento."
      image={vitral}
      />

      <Section kicker="Galeria dos santos" title="Os amigos de Deus">
        <div ref={detailRef} className="scroll-mt-24">
          {selected ? (
            <SantoDetail
              key={selected.view.nome}
              slug={selectedSlug!}
              view={selected.view}
              onClose={() => setSelectedSlug(null)}
            />

          ) : null}
        </div>

        <div className="mb-8 flex items-center gap-3 surface-card backdrop-blur-md px-4 py-3" role="search">
          <label htmlFor="busca-santos" className="kicker">
            Buscar
          </label>
          <input
            id="busca-santos"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome do santo, padroado, virtude…"
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpar busca de santos"
              className="min-h-11 px-2 label-btn text-foreground/70 hover:text-gold transition-colors"
            >
              limpar
            </button>
          ) : null}
        </div>

        <div className="mb-8 space-y-3">
          <p className="kicker">Memória por mês</p>
          <ul className="flex flex-wrap gap-2">
            {[{ v: "", r: "Todos" }, ...MESES.map((m) => ({ v: m, r: m }))].map((op) => (
              <li key={op.v || "todos"}>
                <button
                  type="button"
                  onClick={() => setMes(op.v)}
                  aria-pressed={mes === op.v}
                  className={`inline-flex min-h-9 items-center rounded-[var(--radius-btn)] border px-3 text-step--1 capitalize transition-premium ${
                    mes === op.v
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/20 text-foreground/70 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {op.r}
                </button>
              </li>
            ))}
          </ul>
        </div>



        <CardGrid cols={3}>
          {visiveis.map((s, i) => (
            <CartaoSanto
              key={s.slug}
              santo={s}
              indice={i}
              ativo={s.slug === selectedSlug}
              onSelect={() => setSelectedSlug(s.slug === selectedSlug ? null : s.slug)}
            />
          ))}
        </CardGrid>


        {visiveis.length < filtered.length ? (
          <div className="mt-12 flex flex-col items-center gap-3">
            <p className="label-btn text-muted-foreground">
              Mostrando {visiveis.length} de {filtered.length} santos
            </p>
            <button
              type="button"
              onClick={() => setLimite((v) => v + PAGINA)}
              className="btn-base btn-outline-gold px-8 label-btn"
            >
              Carregar mais santos
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-12">
            Nenhum santo encontrado para “{query}”.
          </p>
        ) : null}
      </Section>
    </div>
  );
}

/**
 * Cartão da galeria: observa a própria posição e pré-carrega a imagem e a rota
 * do santo pouco antes de entrar na tela, para a abertura ser imediata.
 */
function CartaoSanto({
  santo,
  indice,
  ativo,
  onSelect,
}: {
  santo: (typeof SANTOS_LISTA)[number];
  indice: number;
  ativo: boolean;
  onSelect: () => void;
}) {
  const ref = usePrefetchSanto<HTMLButtonElement>(santo.slug);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      aria-expanded={ativo}
      className={`text-left block group animate-content-fade focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 ${
        ativo ? "ring-1 ring-gold/50" : ""
      }`}
      style={{ animationDelay: `${Math.min(indice, 12) * 40}ms` }}
    >
      <ContentCard
        title={santo.nome}
        subtitle={`Memória · ${santo.data}`}
        media={
          <RetratoSanto
            url={imagemSanto(santo.slug)?.url}
            reserva={imagemSanto(santo.slug)?.remoto}
            nome={santo.nome}
            prioridade={indice < 3}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 380px"
            className="h-44 w-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
          />
        }
      >
        {santo.body}
        <span className="block mt-4 label-btn text-gold/80 group-hover:text-gold transition-smooth group-hover:translate-x-1">
          {ativo ? "Fechar ↑" : "Ler biografia →"}
        </span>
      </ContentCard>
    </button>
  );
}

function SantoDetail({
  slug,
  view,
  onClose,
}: {
  slug: string;
  view: ReturnType<typeof buildSantoView>;
  onClose: () => void;
}) {

  const img = view.imagem;
  return (
    <article className="mb-12 surface-card backdrop-blur-xl overflow-hidden animate-content-fade shadow-2xl shadow-gold/5">
      <div className="grid md:grid-cols-[minmax(0,1fr)_1.2fr] gap-0">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px] bg-deep overflow-hidden">
          <RetratoSanto
            url={img}
            reserva={view.imagemReserva}
            nome={view.nome}
            prioridade
            sizes="(max-width: 768px) 100vw, 480px"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent md:bg-linear-to-r" />
          <div className="absolute bottom-0 left-0 p-6 md:hidden">
            {view.titulo ? (
              <p className="kicker mb-2">
                {view.titulo}
              </p>
            ) : null}
            <h3 className="font-display text-3xl text-paper leading-tight">{view.nome}</h3>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="hidden md:block">
              {view.titulo ? (
                <p className="kicker mb-3">
                  {view.titulo}
                </p>
              ) : null}
              <h3 className="font-display text-4xl text-paper leading-tight tracking-tight">
                {view.nome}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <BotaoSalvar
                tipo="santo"
                slug={slug}
                titulo={view.nome}
                descricao={view.data ? `Memória · ${view.data}` : undefined}
                href={`/santos/${slug}`}
                compacto
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar biografia"
                className="shrink-0 size-9 grid place-items-center border border-gold/30 text-gold hover:bg-gold hover:text-deep transition-colors"
              >
                ×
              </button>
            </div>
          </div>


          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground">
            {view.data ? (
              <div>
                <dt className="label-btn text-gold/60">Memória</dt>
                <dd className="text-foreground mt-1">{view.data}</dd>
              </div>
            ) : null}
            {view.seculo ? (
              <div>
                <dt className="label-btn text-gold/60">Século</dt>
                <dd className="text-foreground mt-1">{view.seculo}</dd>
              </div>
            ) : null}
            {view.padroeiro ? (
              <div>
                <dt className="label-btn text-gold/60">Padroeiro</dt>
                <dd className="text-foreground mt-1">{view.padroeiro}</dd>
              </div>
            ) : null}
          </dl>

          <p className="text-base leading-relaxed text-foreground/85 whitespace-pre-line font-light">
            {view.biografia ?? view.resumo}
          </p>

          {view.virtudes && view.virtudes.length > 0 ? (
            <div>
              <p className="kicker mb-3">
                Virtudes
              </p>
              <ul className="flex flex-wrap gap-2">
                {view.virtudes.map((v) => (
                  <li
                    key={v}
                    className="text-xs px-3 py-1 border border-gold/25 text-foreground/80"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {view.frase ? (
            <blockquote className="border-l-2 border-gold/60 pl-5 italic text-paper/80">
              “{view.frase}”
            </blockquote>
          ) : null}

          {!view.temRico ? (
            <p className="text-xs text-muted-foreground/70 italic">
              Resumo breve — em breve aprofundaremos a biografia deste santo com fontes hagiográficas.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
