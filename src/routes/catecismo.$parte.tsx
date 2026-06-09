import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PARTES, SECOES, VATICAN_URL, type SecaoCIC } from "../lib/data/catecismo";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/catecismo/$parte")({
  loader: ({ params }) => {
    const p = PARTES.find((x) => x.slug === params.parte);
    if (!p) throw notFound();
    return { parte: p, secoes: SECOES.filter((s) => s.parte === p.num) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.parte.titulo ?? "Catecismo"} — Catecismo — Portal Católico` },
      { name: "description", content: loaderData?.parte.resumo ?? "" },
      { property: "og:title", content: `${loaderData?.parte.titulo ?? "Catecismo"} — CIC` },
      { property: "og:description", content: loaderData?.parte.resumo ?? "" },
    ],
  }),
  component: Page,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="text-gold">Parte não encontrada.</p>
      <Link to="/catecismo" className="text-sm underline mt-4 inline-block">← Catecismo</Link>
    </div>
  ),
});

function Page() {
  const { parte, secoes } = Route.useLoaderData();
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        to="/catecismo"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold/80 hover:text-gold mb-6"
      >
        <ArrowLeft className="size-3" /> Catecismo
      </Link>
      <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">
        Parte {parte.num} · {parte.paragrafos}
      </p>
      <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
        {parte.titulo}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{parte.resumo}</p>

      <div className="mt-12 space-y-4">
        {secoes.map((s: SecaoCIC) => (
          <div key={s.slug} className="border border-gold/20 bg-card p-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">{s.paragrafos}</p>
            <h3 className="font-display text-xl text-foreground">{s.titulo}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.resumo}</p>
          </div>
        ))}
      </div>

      <a
        href={VATICAN_URL}
        target="_blank"
        rel="noopener"
        className="mt-10 inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-gold hover:text-deep transition-colors"
      >
        <ExternalLink className="size-3.5" /> Ler o texto integral
      </a>
    </div>
  );
}
