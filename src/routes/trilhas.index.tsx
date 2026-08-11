import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { TRILHAS } from "@/lib/data/trilhas";
import { lerProgresso, percentual, type ProgressoTrilhas } from "@/lib/trilhas/progresso";

const BASE = "https://portalcatolico.vercel.app";
const TITULO = "Trilhas de Aprendizado — Formação Católica Passo a Passo";
const DESC =
  "Trilhas de estudo católico com lições estruturadas, citações do Catecismo, da Escritura, dos Padres da Igreja e do Magistério. Comece pelos fundamentos da fé.";

export const Route = createFileRoute("/trilhas/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE}/trilhas` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/trilhas` }],
  }),
  component: TrilhasIndex,
});

function TrilhasIndex() {
  const [progresso, setProgresso] = useState<ProgressoTrilhas>({ concluidas: [] });
  useEffect(() => {
    const ler = () => setProgresso(lerProgresso());
    ler();
    window.addEventListener("portal:trilhas", ler);
    return () => window.removeEventListener("portal:trilhas", ler);
  }, []);

  const ultima = progresso.ultima;
  const trilhaUltima = ultima ? TRILHAS.find((t) => t.slug === ultima.trilha) : undefined;
  const licaoUltima = trilhaUltima?.licoes.find((l) => l.slug === ultima?.licao);

  return (
    <div className="shell py-block">
      <p className="kicker">Plataforma de formação</p>
      <h1 className="mt-3 font-display text-4xl text-paper sm:text-5xl">Trilhas de aprendizado</h1>
      <p className="mt-5 max-w-2xl text-paper/75 leading-relaxed">
        Cada trilha é um caminho ordenado de lições. Toda afirmação doutrinal vem acompanhada da
        fonte: Escritura, Catecismo, Padres da Igreja, concílios e documentos pontifícios.
      </p>

      {trilhaUltima && licaoUltima && (
        <Link
          to="/trilhas/$trilha/$licao"
          params={{ trilha: trilhaUltima.slug, licao: licaoUltima.slug }}
          className="mt-10 flex items-center justify-between gap-4 border border-gold/30 bg-gold/5 p-5 transition-colors hover:border-gold"
        >
          <span>
            <span className="block kicker">
              Continuar estudando
            </span>
            <span className="mt-1 block font-display text-lg text-paper">{licaoUltima.titulo}</span>
            <span className="text-sm text-paper/65">
              {trilhaUltima.titulo} · {percentual(trilhaUltima.slug, trilhaUltima.licoes, progresso)}% concluído
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-gold" aria-hidden="true" />
        </Link>
      )}

      <div className="mt-12 space-y-6">
        {TRILHAS.map((trilha) => {
          const pct = percentual(trilha.slug, trilha.licoes, progresso);
          return (
            <Link
              key={trilha.slug}
              to="/trilhas/$trilha"
              params={{ trilha: trilha.slug }}
              className="block border border-gold/15 p-6 transition-colors hover:border-gold/50"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="size-5 text-gold" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.16em] text-paper/60">
                  {trilha.nivel} · {trilha.licoes.length} lições
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl text-paper">{trilha.titulo}</h2>
              <p className="mt-2 text-sm text-paper/75 leading-relaxed">{trilha.descricao}</p>
              <div className="mt-4 h-1 w-full bg-paper/10">
                <div className="h-1 bg-gold" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-paper/55">
                {pct}% concluído
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
