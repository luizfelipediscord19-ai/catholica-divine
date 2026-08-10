import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, ArrowRight, Check, Circle, CircleDot } from "lucide-react";

import { TRILHAS } from "@/lib/data/trilhas";
import { lerProgresso, percentual, chaveLicao, type ProgressoTrilhas } from "@/lib/trilhas/progresso";
import { ContinuarLeitura } from "@/components/portal/ContinuarLeitura";

const BASE = "https://portalcatolico.vercel.app";
const TITULO = "Começar a estudar — Percursos de formação católica | Portal Católico";
const DESC =
  "Escolha por onde estudar a fé católica: fundamentos, formação, aprofundamento, apologética, Tradição e Magistério — com trilhas guiadas e continuidade do seu progresso.";

export const Route = createFileRoute("/estudar")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:title", content: "Começar a estudar — Portal Católico" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE}/estudar` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/estudar` }],
  }),
  component: EstudarPage,
});

type Destino = { label: string; to: string };

const NIVEIS: {
  marcador: string;
  nome: string;
  descricao: string;
  trilha?: string;
  destinos: Destino[];
}[] = [
  {
    marcador: "🌱",
    nome: "Fundamentos",
    descricao: "Para quem está começando: Deus, Cristo, a Igreja, o Credo e os Sacramentos.",
    trilha: "primeiros-passos",
    destinos: [
      { label: "A Fé Católica", to: "/fe-catolica" },
      { label: "Sacramentos", to: "/sacramentos" },
      { label: "Orações essenciais", to: "/oracoes" },
    ],
  },
  {
    marcador: "📖",
    nome: "Formação",
    descricao: "Para quem já conhece os fundamentos e quer ler a Escritura com a Igreja.",
    trilha: "vida-espiritual",
    destinos: [
      { label: "Bíblia Sagrada", to: "/biblia" },
      { label: "Liturgia do dia", to: "/liturgia-diaria" },
      { label: "Calendário litúrgico", to: "/calendario-liturgico" },
    ],
  },
  {
    marcador: "📚",
    nome: "Aprofundamento",
    descricao: "Estudo sistemático do Catecismo, da mariologia e da vida dos santos.",
    trilha: "catequese-intermediaria",
    destinos: [
      { label: "Catecismo", to: "/catecismo" },
      { label: "Mariologia", to: "/maria" },
      { label: "Santos", to: "/santos" },
    ],
  },
  {
    marcador: "🛡️",
    nome: "Apologética",
    descricao: "Respostas fundamentadas às objeções mais comuns sobre a fé católica.",
    trilha: "apologetica",
    destinos: [
      { label: "Banco de objeções", to: "/apologetica" },
      { label: "Glossário doutrinal", to: "/glossario" },
      { label: "Perguntar à Sophia", to: "/assistente" },
    ],
  },
  {
    marcador: "🏛️",
    nome: "Tradição e Magistério",
    descricao: "Padres e Doutores da Igreja, concílios e documentos do Magistério.",
    trilha: "teologia",
    destinos: [
      { label: "Doutores da Igreja", to: "/doutores-da-igreja" },
      { label: "Busca avançada", to: "/busca" },
      { label: "Sobre o Portal", to: "/sobre" },
    ],
  },
];

function EstudarPage() {
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
    <div className="shell py-block space-y-[var(--space-lg)]">
      <nav aria-label="Você está aqui" className="text-[11px] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-gold transition-colors">
              Início
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="text-foreground/80">Começar a estudar</li>
        </ol>
      </nav>

      <header className="measure">
        <p className="flex items-center gap-3 kicker">
          <GraduationCap className="size-4" aria-hidden="true" /> Percursos de formação
        </p>
        <h1 className="mt-4 font-display leading-tight text-paper text-[length:var(--step-4)]">
          Começar a estudar
        </h1>
        <p className="mt-5 font-light leading-relaxed text-paper/75">
          Escolha o nível que corresponde ao seu momento. Cada percurso reúne uma trilha guiada e as
          seções do Portal ligadas ao tema — com fontes sempre citadas.
        </p>
      </header>

      {licaoUltima && trilhaUltima ? (
        <section
          aria-labelledby="continue-estudando"
          className="border border-gold/25 bg-card/40 p-card"
        >
          <p className="kicker">Continue estudando</p>
          <h2
            id="continue-estudando"
            className="mt-3 title-card"
          >
            {trilhaUltima.titulo} — {licaoUltima.titulo}
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
            {licaoUltima.resumo}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {percentual(trilhaUltima.slug, trilhaUltima.licoes, progresso)}% da trilha concluída
          </p>
          <Link
            to="/trilhas/$trilha/$licao"
            params={{ trilha: trilhaUltima.slug, licao: licaoUltima.slug }}
            className="btn-base btn-gold mt-5 gap-2 text-[10px] font-bold uppercase tracking-[0.25em]"
          >
            Continuar estudando <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </section>
      ) : null}

      <ContinuarLeitura />

      <div className="space-y-[var(--space-md)]">
        {NIVEIS.map((nivel) => {
          const trilha = nivel.trilha ? TRILHAS.find((t) => t.slug === nivel.trilha) : undefined;
          const pct = trilha ? percentual(trilha.slug, trilha.licoes, progresso) : 0;

          return (
            <section
              key={nivel.nome}
              aria-labelledby={`nivel-${nivel.nome}`}
              className="surface-card p-card"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id={`nivel-${nivel.nome}`}
                  className="title-card"
                >
                  <span aria-hidden="true" className="mr-3">
                    {nivel.marcador}
                  </span>
                  {nivel.nome}
                </h2>
                {trilha ? (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {pct}% concluído
                  </span>
                ) : null}
              </div>
              <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                {nivel.descricao}
              </p>

              {trilha ? (
                <>
                  <ol className="mt-[var(--space-sm)] space-y-2">
                    {trilha.licoes.slice(0, 5).map((licao) => {
                      const feita = progresso.concluidas.includes(
                        chaveLicao(trilha.slug, licao.slug),
                      );
                      const atual = ultima?.trilha === trilha.slug && ultima?.licao === licao.slug;
                      const Icone = feita ? Check : atual ? CircleDot : Circle;
                      return (
                        <li key={licao.slug}>
                          <Link
                            to="/trilhas/$trilha/$licao"
                            params={{ trilha: trilha.slug, licao: licao.slug }}
                            className="group flex min-h-11 items-center gap-3 border-b border-gold/5 py-2 text-sm text-foreground/85 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                          >
                            <Icone
                              className={`size-4 shrink-0 ${feita ? "text-gold" : atual ? "text-gold/80" : "text-muted-foreground"}`}
                              aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1 truncate">{licao.titulo}</span>
                            <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                              {feita ? "Concluído" : atual ? "Em andamento" : "Estudar"}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                  <Link
                    to="/trilhas/$trilha"
                    params={{ trilha: trilha.slug }}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 kicker hover:underline"
                  >
                    Ver a trilha completa <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </>
              ) : null}

              <ul className="mt-[var(--space-sm)] flex flex-wrap gap-2">
                {nivel.destinos.map((d) => (
                  <li key={d.to + d.label}>
                    <Link
                      to={d.to}
                      className="inline-flex min-h-9 items-center border border-gold/15 px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
                    >
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
