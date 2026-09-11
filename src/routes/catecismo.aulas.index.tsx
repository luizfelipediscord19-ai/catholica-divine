import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";

import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { AULAS, NOME_PILAR } from "@/lib/data/catecismo/aulas";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const URL = "https://portalcatolico.vercel.app/catecismo/aulas";
const DESCRICAO =
  "Curso de catecismo em 16 semanas: uma aula por semana com exposição, perguntas e respostas e links diretos para os parágrafos do Catecismo da Igreja Católica, seguindo os quatro pilares — Credo, Sacramentos, Vida em Cristo e Oração.";

export const Route = createFileRoute("/catecismo/aulas/")({
  head: () => ({
    meta: [
      { title: "Aulas de Catecismo por Semana — Curso em 16 Semanas | Portal Católico" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["catecismo", "formacao"]) },
      { property: "og:title", content: "Aulas de Catecismo por Semana" },
      { property: "og:description", content: DESCRICAO.slice(0, 200) },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Page,
});

const PILARES = [1, 2, 3, 4] as const;

function Page() {
  return (
    <div className="shell py-block">
      <p className="kicker mb-4">Catechesis</p>
      <h1 className="title-page leading-tight text-foreground">Aulas de catecismo por semana</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">{DESCRICAO}</p>

      <FaixaAutoridade
        niveis={["oficial", "teologia"]}
        nota="As perguntas e respostas são redação própria do Portal Católico, fiéis ao Catecismo; cada resposta indica os parágrafos oficiais onde conferir o texto."
        className="mt-6 max-w-3xl"
      />

      <div className="mt-12 space-y-12">
        {PILARES.map((pilar) => {
          const aulas = AULAS.filter((a) => a.parte === pilar);
          return (
            <section key={pilar} className="space-y-5">
              <header>
                <p className="kicker">Pilar {pilar}</p>
                <h2 className="title-section mt-1 text-foreground">{NOME_PILAR[pilar]}</h2>
              </header>
              <div className="grid gap-px border-y border-gold/15 bg-gold/15 md:grid-cols-2">
                {aulas.map((aula) => (
                  <article key={aula.slug} className="bg-background p-card" data-sem-sumario>
                    <p className="kicker flex items-center gap-2">
                      <CalendarDays className="size-3.5 shrink-0" /> Semana {aula.semana}
                    </p>
                    <h3 className="title-card mt-2 text-foreground">{aula.titulo}</h3>
                    <p className="body-sm mt-3 text-muted-foreground">{aula.objetivo}</p>
                    <p className="text-step--2 mt-3 text-gold">{aula.estudo}</p>
                    <Link
                      to="/catecismo/aulas/$semana"
                      params={{ semana: aula.slug }}
                      className="btn-base btn-outline-gold btn-sm label-btn mt-5 gap-2 print:hidden"
                    >
                      Abrir a aula <ArrowRight className="size-3.5 shrink-0" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="action-tray mt-12 print:hidden">
        <Link to="/catecismo" className="btn-base btn-quiet btn-md">
          Catecismo completo
        </Link>
        <Link to="/leitura-diaria" className="btn-base btn-quiet btn-md">
          Leitura diária
        </Link>
        <Link to="/doutrina" className="btn-base btn-quiet btn-md">
          Estudos de doutrina
        </Link>
      </div>
    </div>
  );
}
