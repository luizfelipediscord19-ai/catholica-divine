import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, Calendar, RefreshCw } from "lucide-react";
import { liturgiaQueryOptions } from "../lib/liturgia/query";
import { COR_CLASSE } from "../lib/liturgia/calendario";
import type { LeituraLiturgica } from "../lib/liturgia.functions";

const SITE_URL = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/liturgia-diaria")({
  loader: ({ context }) => context.queryClient.ensureQueryData(liturgiaQueryOptions()),
  head: () => ({
    meta: [
      { title: "Liturgia Diária — Leituras e Evangelho do Dia" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/liturgia-diaria" },
      {
        name: "description",
        content:
          "As leituras litúrgicas de hoje: primeira leitura, salmo responsorial, segunda leitura e Evangelho do dia, com tempo litúrgico, cor e ciclo do Lecionário.",
      },
      { property: "og:title", content: "Liturgia Diária — Portal Católico" },
      { property: "og:description", content: "Leituras da Missa do dia, salmo responsorial e Evangelho, atualizados diariamente." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/liturgia-diaria` }],
  }),
  component: Page,
  errorComponent: ({ error }) => (
    <div className="shell-narrow py-block text-center" role="alert">
      <p className="text-gold">Não foi possível carregar a liturgia de hoje.</p>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="shell-narrow py-block text-center">
      <p className="text-gold">Liturgia não encontrada para esta data.</p>
    </div>
  ),
});

function Bloco({ kicker, itens }: { kicker: string; itens: LeituraLiturgica[] }) {
  if (itens.length === 0) return null;
  return (
    <section className="border-t border-gold/15 pt-8">
      <p className="label-btn text-gold mb-3">{kicker}</p>
      {itens.map((l, i) => (
        <article key={`${l.referencia}-${i}`} className="mb-8 last:mb-0">
          {l.titulo ? <h2 className="font-display text-2xl text-foreground">{l.titulo}</h2> : null}
          {l.referencia ? (
            <p className="mt-1 label-btn text-muted-foreground">{l.referencia}</p>
          ) : null}
          {l.refrao ? (
            <p className="mt-4 font-display italic text-lg text-gold/90 border-l-2 border-gold/50 pl-4">
              R. {l.refrao}
            </p>
          ) : null}
          <div className="mt-4 space-y-3 text-foreground/85 leading-relaxed whitespace-pre-line">
            {l.texto}
          </div>
        </article>
      ))}
    </section>
  );
}

function Page() {
  const { data: lit } = useSuspenseQuery(liturgiaQueryOptions());

  return (
    <div className="shell-narrow py-block">
      <Link
        to="/calendario-liturgico"
        className="inline-flex items-center gap-2 kicker hover:text-gold mb-6"
      >
        <ArrowLeft className="size-3" aria-hidden="true" /> Calendário litúrgico
      </Link>

      <p className="kicker mb-3 capitalize">{lit.dataExtenso}</p>
      <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">{lit.celebracao}</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3 label-btn">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 border ${COR_CLASSE[lit.cor]}`}>
          <span className="size-2 rounded-full bg-current" aria-hidden="true" /> Cor {lit.corNome}
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/25 text-muted-foreground">
          <Calendar className="size-3 text-gold/70" aria-hidden="true" /> {lit.tempoNome}
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/25 text-muted-foreground">
          Ano {lit.anoLiturgico} · Ciclo ferial {lit.cicloFerial}
        </span>
      </div>

      {lit.fonte === "local" ? (
        <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground surface-card p-4">
          <RefreshCw className="size-3.5 text-gold/70 mt-0.5 shrink-0" aria-hidden="true" />
          As leituras completas não puderam ser obtidas agora. O tempo litúrgico, a cor e o ciclo
          acima foram calculados localmente. Tente novamente em instantes.
        </p>
      ) : null}

      <div className="mt-12 space-y-10">
        <Bloco kicker="Primeira leitura" itens={lit.primeiraLeitura} />
        <Bloco kicker="Salmo responsorial" itens={lit.salmo} />
        <Bloco kicker="Segunda leitura" itens={lit.segundaLeitura} />
        <Bloco kicker="Evangelho" itens={lit.evangelho} />
      </div>

      <div className="mt-14 pt-8 border-t border-gold/15 flex flex-wrap gap-3">
        <Link
          to="/biblia"
          className="btn-base btn-outline-gold gap-2 label-btn"
        >
          <BookOpen className="size-3.5" aria-hidden="true" /> Ler a Bíblia
        </Link>
        <Link
          to="/oracoes"
          className="btn-base btn-outline-gold gap-2 label-btn"
        >
          Orações do dia
        </Link>
      </div>

      <p className="mt-8 text-step--2 text-muted-foreground leading-relaxed">
        Tempo litúrgico, cor e ciclo do Lecionário calculados segundo as Normas Universais sobre o
        Ano Litúrgico e o Calendário (Paulo VI, <em>Mysterii Paschalis</em>, 1969). Textos das
        leituras conforme a tradução liturgica em uso no Brasil.
      </p>
    </div>
  );
}
