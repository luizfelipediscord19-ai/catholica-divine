import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import {
  CATEGORIAS_ORACAO,
  ORACOES,
  type CategoriaOracao,
  type Oracao,
} from "@/lib/data/oracoes";

export const Route = createFileRoute("/oracoes")({
  head: () => ({
    meta: [
      { title: "Orações Católicas Tradicionais — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes" },
      {
        name: "description",
        content:
          "Mais de 60 orações católicas com texto completo: Pai-Nosso, Credo, Salve-Rainha, Angelus, Anima Christi, São Miguel e mais. Rosário, novenas e Liturgia das Horas.",
      },
      { property: "og:title", content: "Orações Católicas Tradicionais" },
      {
        property: "og:description",
        content: "A tradição orante da Igreja reunida com texto integral e contexto histórico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes" }],
  }),
  component: Page,
});

const DEVOCOES = [
  { to: "/oracoes/rosario" as const, title: "Santo Rosário (interativo)", body: "Mistérios Gozosos, Luminosos, Dolorosos e Gloriosos — guiado etapa a etapa." },
  { to: "/oracoes/terco-misericordia" as const, title: "Terço da Misericórdia", body: "Revelado a Santa Faustina — rezado especialmente às 15h." },
  { to: "/oracoes/via-sacra" as const, title: "Via-Sacra", body: "Catorze estações que acompanham os passos de Cristo até o Calvário." },
  { to: "/oracoes/liturgia-das-horas" as const, title: "Liturgia das Horas", body: "Laudes, Vésperas, Completas e demais Horas — a oração oficial da Igreja." },
  { to: "/oracoes/novenas" as const, title: "Novenas", body: "Ao Espírito Santo, à Aparecida, a São José, ao Sagrado Coração e outras." },
];

function CartaoOracao({
  oracao,
  aberto,
  onAlternar,
}: {
  oracao: Oracao;
  aberto: boolean;
  onAlternar: () => void;
}) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(`${oracao.titulo}\n\n${oracao.texto}`);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <article
      id={oracao.slug}
      className={`scroll-mt-28 border bg-card/40 transition-colors ${
        aberto ? "border-gold/50" : "border-border/60 hover:border-gold/40"
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onAlternar}
          aria-expanded={aberto}
          aria-controls={`oracao-${oracao.slug}`}
          className="w-full grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-6 sm:p-8 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span className="min-w-0">
            <span className="block font-display text-lg sm:text-xl text-foreground group-hover:text-gold transition-colors">
              {oracao.titulo}
            </span>
            {oracao.latim ? (
              <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-gold/80">
                {oracao.latim}
              </span>
            ) : null}
            {!aberto && (oracao.paraQue ?? oracao.nota) ? (
              <span className="mt-3 block text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {oracao.paraQue ?? oracao.nota}
              </span>
            ) : null}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-xl text-gold transition-transform ${aberto ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </h3>

      {aberto ? (
        <div id={`oracao-${oracao.slug}`} className="px-6 pb-6 sm:px-8 sm:pb-8 space-y-5">
          {oracao.paraQue ? (
            <p className="text-sm leading-relaxed text-foreground/80">
              <span className="mr-2 text-[10px] uppercase tracking-[0.2em] text-gold">
                Para que serve
              </span>
              {oracao.paraQue}
            </p>
          ) : null}

          {oracao.quando ? (
            <p className="text-sm leading-relaxed text-foreground/80">
              <span className="mr-2 text-[10px] uppercase tracking-[0.2em] text-gold">
                Quando rezar
              </span>
              {oracao.quando}
            </p>
          ) : null}

          {oracao.nota ? (
            <p className="text-xs leading-relaxed text-muted-foreground">{oracao.nota}</p>
          ) : null}

          <div className="border-t border-gold/15 pt-5 space-y-3">
            {oracao.texto.split("\n").map((linha, i) => (
              <p
                key={i}
                className="font-display italic text-[15px] sm:text-base leading-relaxed text-foreground/90"
              >
                {linha}
              </p>
            ))}
          </div>

          <button
            type="button"
            onClick={() => void copiar()}
            className="min-h-11 px-4 text-[10px] uppercase tracking-[0.2em] border border-gold/30 text-foreground/70 hover:text-gold hover:border-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {copiado ? "Copiado" : "Copiar oração"}
          </button>
        </div>
      ) : null}
    </article>
  );
}


function Page() {
  const [filtro, setFiltro] = useState<CategoriaOracao | "Todas">("Todas");
  const [aberto, setAberto] = useState<string | null>(null);

  useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (!slug) return;
    setAberto(slug);
    requestAnimationFrame(() => {
      document.getElementById(slug)?.scrollIntoView({ block: "start" });
    });
  }, []);


  const visiveis = useMemo(
    () => (filtro === "Todas" ? ORACOES : ORACOES.filter((o) => o.categoria === filtro)),
    [filtro],
  );

  const grupos = useMemo(() => {
    const ordem = filtro === "Todas" ? CATEGORIAS_ORACAO : [filtro];
    return ordem
      .map((cat) => ({ cat, itens: visiveis.filter((o) => o.categoria === cat) }))
      .filter((g) => g.itens.length > 0);
  }, [filtro, visiveis]);

  return (
    <div>
      <PageHero
        eyebrow="Oratio"
        title="A Vida de Oração"
        intro="A oração é a respiração da alma cristã. Aqui você encontra a tradição orante da Igreja, das fórmulas mais antigas às devoções consagradas pelos séculos."
      />

      <Section kicker="Devoções" title="Caminhos consagrados pela Igreja">
        <CardGrid cols={3}>
          {DEVOCOES.map((d) => (
            <Link key={d.to} to={d.to}>
              <ContentCard title={d.title}>{d.body}</ContentCard>
            </Link>
          ))}
        </CardGrid>
      </Section>

      <Section
        kicker="Acervo de orações"
        title={`${ORACOES.length} orações com texto integral`}
      >
        <div
          role="group"
          aria-label="Filtrar orações por categoria"
          className="mb-10 flex flex-wrap gap-2"
        >
          {(["Todas", ...CATEGORIAS_ORACAO] as const).map((cat) => {
            const ativo = filtro === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={ativo}
                onClick={() => setFiltro(cat)}
                className={`min-h-11 px-4 text-[10px] uppercase tracking-[0.2em] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  ativo
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border/60 text-foreground/70 hover:text-gold hover:border-gold/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="space-y-14">
          {grupos.map((grupo) => (
            <div key={grupo.cat}>
              <h2 className="mb-6 text-[11px] uppercase tracking-[0.3em] text-gold">
                {grupo.cat}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {grupo.itens.map((o) => (
                  <CartaoOracao
                    key={o.slug}
                    oracao={o}
                    aberto={aberto === o.slug}
                    onAlternar={() => setAberto(aberto === o.slug ? null : o.slug)}
                  />
                ))}

              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
