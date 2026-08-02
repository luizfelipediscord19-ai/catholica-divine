import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import { SANTOS_LISTA } from "@/lib/santos-lista";
import { buildSantoView } from "@/lib/santos-helpers";

export const Route = createFileRoute("/santos")({
  head: () => ({
    meta: [
      { title: "Santos — Portal Católico" },
      { name: "description", content: "Vidas e ensinamentos dos santos: testemunhas da fé e amigos de Deus." },
      { property: "og:title", content: "Os Santos da Igreja" },
      { property: "og:description", content: "Vidas, virtudes e ensinamentos dos santos católicos." },
    ],
  }),
  component: Page,
});

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2000&auto=format&fit=crop";

const PAGINA = 24;

function normalizar(v: string) {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function Page() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [limite, setLimite] = useState(PAGINA);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = normalizar(query);
    if (!q) return SANTOS_LISTA;
    const termos = q.split(" ");
    return SANTOS_LISTA.filter((s) => {
      const alvo = normalizar(`${s.nome} ${s.body} ${s.data}`);
      return termos.every((t) => alvo.includes(t));
    });
  }, [query]);

  const visiveis = useMemo(() => filtered.slice(0, limite), [filtered, limite]);

  useEffect(() => {
    setLimite(PAGINA);
  }, [query]);

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
      />

      <Section kicker="Galeria dos santos" title="Os amigos de Deus">
        <div ref={detailRef} className="scroll-mt-24">
          {selected ? (
            <SantoDetail
              key={selected.view.nome}
              view={selected.view}
              onClose={() => setSelectedSlug(null)}
            />
          ) : null}
        </div>

        <div className="mb-8 flex items-center gap-3 border border-gold/15 bg-card/30 backdrop-blur-md px-4 py-3" role="search">
          <label htmlFor="busca-santos" className="text-[10px] tracking-[0.3em] uppercase text-gold/90">
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
              className="min-h-11 px-2 text-[10px] tracking-[0.2em] uppercase text-foreground/70 hover:text-gold transition-colors"
            >
              limpar
            </button>
          ) : null}
        </div>

        <CardGrid cols={3}>
          {visiveis.map((s, i) => {
            const isActive = s.slug === selectedSlug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSelectedSlug(isActive ? null : s.slug)}
                aria-expanded={isActive}
                className={`text-left block group animate-content-fade focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 ${
                  isActive ? "ring-1 ring-gold/50" : ""
                }`}
                style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
              >
                <ContentCard title={s.nome} subtitle={`Memória · ${s.data}`}>
                  {s.body}
                  <span className="block mt-4 text-xs text-gold/80 group-hover:text-gold tracking-[0.2em] uppercase transition-smooth group-hover:translate-x-1">
                    {isActive ? "Fechar ↑" : "Ler biografia →"}
                  </span>
                </ContentCard>
              </button>
            );
          })}
        </CardGrid>

        {visiveis.length < filtered.length ? (
          <div className="mt-12 flex flex-col items-center gap-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Mostrando {visiveis.length} de {filtered.length} santos
            </p>
            <button
              type="button"
              onClick={() => setLimite((v) => v + PAGINA)}
              className="min-h-11 px-8 py-3 border border-gold/40 text-[10px] uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-deep transition-colors"
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

function SantoDetail({
  view,
  onClose,
}: {
  view: ReturnType<typeof buildSantoView>;
  onClose: () => void;
}) {
  const img = view.imagem ?? FALLBACK_IMG;
  return (
    <article className="mb-12 border border-gold/20 bg-card/40 backdrop-blur-xl overflow-hidden animate-content-fade shadow-2xl shadow-gold/5">
      <div className="grid md:grid-cols-[minmax(0,1fr)_1.2fr] gap-0">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px] bg-deep overflow-hidden">
          <img
            src={img}
            alt={view.nome}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-0 left-0 p-6 md:hidden">
            {view.titulo ? (
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold/80 mb-2">
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
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/80 mb-3">
                  {view.titulo}
                </p>
              ) : null}
              <h3 className="font-display text-4xl text-paper leading-tight tracking-tight">
                {view.nome}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar biografia"
              className="shrink-0 size-9 grid place-items-center border border-gold/30 text-gold hover:bg-gold hover:text-deep transition-colors"
            >
              ×
            </button>
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground">
            {view.data ? (
              <div>
                <dt className="uppercase tracking-[0.3em] text-[10px] text-gold/60">Memória</dt>
                <dd className="text-foreground mt-1">{view.data}</dd>
              </div>
            ) : null}
            {view.seculo ? (
              <div>
                <dt className="uppercase tracking-[0.3em] text-[10px] text-gold/60">Século</dt>
                <dd className="text-foreground mt-1">{view.seculo}</dd>
              </div>
            ) : null}
            {view.padroeiro ? (
              <div>
                <dt className="uppercase tracking-[0.3em] text-[10px] text-gold/60">Padroeiro</dt>
                <dd className="text-foreground mt-1">{view.padroeiro}</dd>
              </div>
            ) : null}
          </dl>

          <p className="text-base leading-relaxed text-foreground/85 whitespace-pre-line font-light">
            {view.biografia ?? view.resumo}
          </p>

          {view.virtudes && view.virtudes.length > 0 ? (
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-3">
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
