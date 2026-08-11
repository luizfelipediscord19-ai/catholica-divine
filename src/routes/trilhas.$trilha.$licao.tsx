import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check } from "lucide-react";
import { acharLicao, ROTULO_BLOCO } from "@/lib/data/trilhas";
import {
  alternarConclusao,
  chaveLicao,
  lerProgresso,
  marcarVisita,
  type ProgressoTrilhas,
} from "@/lib/trilhas/progresso";

const BASE = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/trilhas/$trilha/$licao")({
  head: ({ params }) => {
    const achado = acharLicao(params.trilha, params.licao);
    const titulo = achado
      ? `${achado.licao.titulo} — ${achado.trilha.titulo}`
      : "Lição não encontrada";
    const desc = achado?.licao.resumo ?? "Lição de estudo do Portal Católico.";
    const url = `${BASE}/trilhas/${params.trilha}/${params.licao}`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: achado
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LearningResource",
                name: achado.licao.titulo,
                description: achado.licao.resumo,
                url,
                educationalLevel: achado.trilha.nivel,
                inLanguage: "pt-BR",
                isPartOf: { "@type": "Course", name: achado.trilha.titulo },
                publisher: { "@type": "Organization", name: "Portal Católico", url: BASE },
              }),
            },
          ]
        : undefined,
    };
  },
  component: LicaoPagina,
});

function LicaoPagina() {
  const params = Route.useParams();
  const achado = acharLicao(params.trilha, params.licao);
  const [progresso, setProgresso] = useState<ProgressoTrilhas>({ concluidas: [] });

  useEffect(() => {
    const ler = () => setProgresso(lerProgresso());
    ler();
    window.addEventListener("portal:trilhas", ler);
    return () => window.removeEventListener("portal:trilhas", ler);
  }, []);

  useEffect(() => {
    if (achado) marcarVisita(params.trilha, params.licao);
  }, [achado, params.trilha, params.licao]);

  if (!achado) {
    return (
      <div className="shell-narrow py-block">
        <h1 className="font-display text-3xl text-paper">Lição não encontrada</h1>
        <Link to="/trilhas" className="mt-6 inline-block text-gold hover:underline">
          Ver todas as trilhas
        </Link>
      </div>
    );
  }

  const { trilha, licao, indice } = achado;
  const proxima = trilha.licoes[indice + 1];
  const anterior = trilha.licoes[indice - 1];
  const feita = progresso.concluidas.includes(chaveLicao(trilha.slug, licao.slug));

  return (
    <article className="shell-narrow py-block">
      <Link
        to="/trilhas/$trilha"
        params={{ trilha: trilha.slug }}
        className="inline-flex items-center gap-2 text-sm text-paper/70 hover:text-gold"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> {trilha.titulo}
      </Link>

      <p className="mt-8 kicker">
        Lição {indice + 1} de {trilha.licoes.length} · {licao.minutos} min
      </p>
      <h1 className="mt-3 font-display text-4xl text-paper">{licao.titulo}</h1>
      <p className="mt-4 text-lg text-paper/75 leading-relaxed">{licao.resumo}</p>

      <div className="mt-12 space-y-12">
        {licao.blocos.map((bloco, i) => (
          <section key={i}>
            <p className="kicker">
              {ROTULO_BLOCO[bloco.tipo]}
            </p>
            <h2 className="mt-2 font-display text-2xl text-paper">{bloco.titulo}</h2>

            {bloco.paragrafos && (
              <div className="mt-4 space-y-4 text-[17px] leading-[1.85] text-paper/80">
                {bloco.paragrafos.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            )}

            {bloco.citacoes && (
              <ul className="mt-5 space-y-4">
                {bloco.citacoes.map((c, j) => (
                  <li key={j} className="border-l-2 border-gold/40 pl-4">
                    <p className="text-[17px] italic leading-[1.8] text-paper/85">{c.texto}</p>
                    <p className="mt-1 kicker">{c.ref}</p>
                  </li>
                ))}
              </ul>
            )}

            {bloco.pontos && (
              <ul className="mt-5 space-y-2 text-[17px] leading-[1.8] text-paper/80">
                {bloco.pontos.map((p, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}

            {bloco.duvidas && (
              <dl className="mt-5 space-y-5">
                {bloco.duvidas.map((d, j) => (
                  <div key={j} className="border border-gold/15 p-4">
                    <dt className="font-display text-lg text-paper">{d.pergunta}</dt>
                    <dd className="mt-2 text-[16px] leading-[1.8] text-paper/78">{d.resposta}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </div>

      <section className="mt-14 border border-gold/25 bg-gold/5 p-6">
        <h2 className="flex items-center gap-2 font-display text-xl text-paper">
          <BookOpen className="size-4 text-gold" aria-hidden="true" /> Fontes desta lição
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-paper/78">
          {licao.fontes.map((f, i) => (
            <li key={i}>
              <span className="text-paper">{f.obra}</span> — {f.ref}
              {f.url && (
                <>
                  {" "}
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    [ver documento original]
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {licao.relacionados && licao.relacionados.length > 0 && (
        <section className="mt-10">
          <h2 className="kicker">Aprofundar</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {licao.relacionados.map((r) => (
              <li key={r.to}>
                <a href={r.to} className="text-paper/80 hover:text-gold">
                  {r.label} →
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => alternarConclusao(trilha.slug, licao.slug)}
          aria-pressed={feita}
          className={`btn-base px-5 text-[11px] font-bold uppercase tracking-widest ${
            feita ? "btn-outline-gold border-gold text-gold" : "btn-gold"
          }`}
        >
          <Check className="size-4" aria-hidden="true" />
          {feita ? "Concluída" : "Marcar como concluída"}
        </button>

        <div className="flex flex-wrap gap-4 text-sm">
          {anterior && (
            <Link
              to="/trilhas/$trilha/$licao"
              params={{ trilha: trilha.slug, licao: anterior.slug }}
              className="inline-flex items-center gap-2 text-paper/70 hover:text-gold"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> {anterior.titulo}
            </Link>
          )}
          {proxima && (
            <Link
              to="/trilhas/$trilha/$licao"
              params={{ trilha: trilha.slug, licao: proxima.slug }}
              className="inline-flex items-center gap-2 text-gold hover:underline"
            >
              {proxima.titulo} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
