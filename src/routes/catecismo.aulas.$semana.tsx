import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { AULAS, NOME_PILAR, aulaPorSlug } from "@/lib/data/catecismo/aulas";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/catecismo/aulas/$semana")({
  loader: ({ params }) => {
    const aula = aulaPorSlug(params.semana);
    if (!aula) throw notFound();
    return { aula };
  },
  head: ({ params, loaderData }) => {
    const aula = loaderData?.aula;
    const titulo = aula ? `Semana ${aula.semana}: ${aula.titulo}` : "Aula de catecismo";
    const descricao = aula?.objetivo ?? "Aula semanal de catecismo com perguntas e respostas.";
    const url = `https://portalcatolico.vercel.app/catecismo/aulas/${params.semana}`;
    return {
      meta: [
        { title: `${titulo} — Aulas de Catecismo | Portal Católico` },
        { name: "description", content: descricao.slice(0, 300) },
        { name: "keywords", content: keywordsPara(["catecismo", "formacao"]) },
        { property: "og:title", content: `${titulo} — Aulas de Catecismo` },
        { property: "og:description", content: descricao.slice(0, 200) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="shell-narrow py-block text-center">
      <p className="text-gold">Aula não encontrada.</p>
      <Link to="/catecismo/aulas" className="mt-4 inline-block text-sm underline">
        ← Todas as aulas
      </Link>
    </div>
  ),
});

function ChipCIC({ n }: { n: number }) {
  return (
    <Link
      to="/catecismo/artigos"
      search={{ p: n }}
      className="chip-gold text-step--2 whitespace-nowrap"
      title={`Abrir o Catecismo no parágrafo ${n}`}
    >
      CIC §{n}
    </Link>
  );
}

function Page() {
  const { aula } = Route.useLoaderData();
  const anterior = AULAS.find((a) => a.semana === aula.semana - 1);
  const proxima = AULAS.find((a) => a.semana === aula.semana + 1);

  return (
    <article className="shell-narrow py-block">
      <Link
        to="/catecismo/aulas"
        className="text-step--2 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold print:hidden"
      >
        <ArrowLeft className="size-3.5 shrink-0" /> Aulas de catecismo
      </Link>

      <p className="kicker mt-6">
        Semana {aula.semana} de {AULAS.length} · Pilar {aula.parte} — {NOME_PILAR[aula.parte]}
      </p>
      <h1 className="title-page mt-3 leading-tight text-foreground">{aula.titulo}</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">{aula.objetivo}</p>

      <FaixaAutoridade
        niveis={["oficial"]}
        nota="Perguntas e respostas de redação própria, fiéis ao Catecismo. Cada resposta indica os parágrafos oficiais para conferência."
        className="mt-6"
      />

      <section className="mt-12 space-y-4">
        <h2 className="title-section text-foreground">Exposição da aula</h2>
        {aula.exposicao.map((p, i) => (
          <p key={i} className="body-base measure text-foreground/85">
            {p}
          </p>
        ))}
        <div className="flex flex-wrap gap-2 pt-2">
          {aula.paragrafosCIC.map((n) => (
            <ChipCIC key={n} n={n} />
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="title-section text-foreground">Perguntas e respostas</h2>
        <ol className="space-y-px border-y border-gold/15 bg-gold/15">
          {aula.perguntas.map((q, i) => (
            <li key={i} className="bg-background p-card" data-sem-sumario>
              <p className="num-secao">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="title-card mt-2 text-foreground">{q.pergunta}</h3>
              <p className="body-sm mt-3 text-muted-foreground">{q.resposta}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {q.cic.map((n) => (
                  <ChipCIC key={n} n={n} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="title-section text-foreground">Leitura e tarefa da semana</h2>
        <div className="surface-card space-y-4 p-6" data-sem-sumario>
          <p className="body-sm text-muted-foreground">
            <span className="text-gold">Escritura:</span> {aula.leitura.ref}
          </p>
          <p className="body-sm text-muted-foreground">
            <span className="text-gold">Catecismo:</span> {aula.estudo}
          </p>
          <p className="body-sm text-muted-foreground">
            <span className="text-gold">Tarefa:</span> {aula.tarefa}
          </p>
          <div className="action-tray print:hidden">
            <Link
              to="/biblia/$livro/$capitulo"
              params={{ livro: aula.leitura.livro, capitulo: String(aula.leitura.capitulo) }}
              className="btn-base btn-outline-gold btn-sm label-btn gap-2"
            >
              <BookOpen className="size-3.5 shrink-0" /> Abrir a leitura
            </Link>
            <Link to="/catecismo/artigos" className="btn-base btn-quiet btn-sm label-btn">
              Catecismo artigo por artigo
            </Link>
          </div>
        </div>
      </section>

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gold/15 pt-6 print:hidden">
        {anterior ? (
          <Link
            to="/catecismo/aulas/$semana"
            params={{ semana: anterior.slug }}
            className="btn-base btn-quiet btn-sm label-btn gap-2"
          >
            <ArrowLeft className="size-3.5 shrink-0" /> Semana {anterior.semana}
          </Link>
        ) : (
          <span />
        )}
        {proxima ? (
          <Link
            to="/catecismo/aulas/$semana"
            params={{ semana: proxima.slug }}
            className="btn-base btn-outline-gold btn-sm label-btn gap-2"
          >
            Semana {proxima.semana} <ArrowRight className="size-3.5 shrink-0" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
