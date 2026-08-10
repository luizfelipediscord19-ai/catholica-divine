import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { acharTrilha } from "@/lib/data/trilhas";
import { chaveLicao, lerProgresso, percentual, type ProgressoTrilhas } from "@/lib/trilhas/progresso";

const BASE = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/trilhas/$trilha/")({
  head: ({ params }) => {
    const trilha = acharTrilha(params.trilha);
    const titulo = trilha ? `${trilha.titulo} — Trilha de Estudo Católico` : "Trilha não encontrada";
    const desc = trilha?.descricao ?? "Trilha de estudo do Portal Católico.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${BASE}/trilhas/${params.trilha}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${BASE}/trilhas/${params.trilha}` }],
    };
  },
  component: TrilhaPagina,
});

function TrilhaPagina() {
  const { trilha: slug } = Route.useParams();
  const trilha = acharTrilha(slug);
  const [progresso, setProgresso] = useState<ProgressoTrilhas>({ concluidas: [] });

  useEffect(() => {
    const ler = () => setProgresso(lerProgresso());
    ler();
    window.addEventListener("portal:trilhas", ler);
    return () => window.removeEventListener("portal:trilhas", ler);
  }, []);

  if (!trilha) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-3xl text-paper">Trilha não encontrada</h1>
        <Link to="/trilhas" className="mt-6 inline-block text-gold hover:underline">
          Ver todas as trilhas
        </Link>
      </div>
    );
  }

  const pct = percentual(trilha.slug, trilha.licoes, progresso);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/trilhas" className="inline-flex items-center gap-2 text-sm text-paper/70 hover:text-gold">
        <ArrowLeft className="size-4" aria-hidden="true" /> Trilhas
      </Link>
      <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-gold">
        {trilha.nivel} · {trilha.licoes.length} lições
      </p>
      <h1 className="mt-3 font-display text-4xl text-paper">{trilha.titulo}</h1>
      <p className="mt-2 text-paper/60 italic">{trilha.subtitulo}</p>
      <p className="mt-6 text-paper/75 leading-relaxed">{trilha.descricao}</p>
      <p className="mt-4 text-sm text-paper/65">
        <strong className="text-paper/80">Para quem:</strong> {trilha.paraQuem}
      </p>

      <div className="mt-8 h-1 w-full bg-paper/10">
        <div className="h-1 bg-gold" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-paper/55">{pct}% concluído</p>

      <ol className="mt-10 space-y-3">
        {trilha.licoes.map((licao, i) => {
          const feita = progresso.concluidas.includes(chaveLicao(trilha.slug, licao.slug));
          return (
            <li key={licao.slug}>
              <Link
                to="/trilhas/$trilha/$licao"
                params={{ trilha: trilha.slug, licao: licao.slug }}
                className="flex items-start gap-4 border border-gold/15 p-4 transition-colors hover:border-gold/50"
              >
                <span
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border text-xs ${
                    feita ? "border-gold bg-gold/15 text-gold" : "border-paper/25 text-paper/60"
                  }`}
                  aria-hidden="true"
                >
                  {feita ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg text-paper">{licao.titulo}</span>
                  <span className="mt-1 block text-sm text-paper/70 leading-relaxed">{licao.resumo}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-paper/50">
                    {licao.minutos} min de leitura
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
