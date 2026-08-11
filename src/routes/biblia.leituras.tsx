import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, BookOpen, ArrowLeft, Check, RotateCcw } from "lucide-react";
import { leituraDoDia, proximosDias, PLANO, dayOfYear } from "../lib/data/biblia/leituras";

export const Route = createFileRoute("/biblia/leituras")({
  head: () => ({
    meta: [
      { title: "Leituras Diárias — Bíblia — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/biblia/leituras" },
      { name: "description", content: "Plano de leitura bíblica diária com passagens e marcação de progresso." },
      { property: "og:title", content: "Leituras Diárias da Bíblia" },
      { property: "og:description", content: "Um capítulo ou passagem da Sagrada Escritura para cada dia." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/biblia/leituras" }],
  }),
  component: Page,
});

const STORAGE_KEY = "biblia.leituras.concluidas";

function fmtData(d: Date) {
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
}

function isoDia(d: Date) {
  return d.toISOString().slice(0, 10);
}

function linkParaLeitura(l: { livro: string; capitulo: number; vi?: number; vf?: number }) {
  const search: Record<string, string> = {};
  if (l.vi) search.vi = String(l.vi);
  if (l.vf) search.vf = String(l.vf);
  return {
    to: "/biblia/$livro/$capitulo" as const,
    params: { livro: l.livro, capitulo: String(l.capitulo) },
    search,
  };
}

function refTexto(l: { nome: string; capitulo: number; vi?: number; vf?: number }) {
  if (l.vi && l.vf && l.vi !== l.vf) return `${l.nome} ${l.capitulo}:${l.vi}-${l.vf}`;
  if (l.vi) return `${l.nome} ${l.capitulo}:${l.vi}`;
  return `${l.nome} ${l.capitulo}`;
}

function useConcluidas() {
  const [set, setSet] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSet(new Set(JSON.parse(raw)));
    } catch { /* noop */ }
  }, []);
  const persist = (next: Set<string>) => {
    setSet(new Set(next));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* noop */ }
  };
  const toggle = (id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id); else next.add(id);
    persist(next);
  };
  const reset = () => persist(new Set());
  return { set, toggle, reset };
}

function Page() {
  const hoje = leituraDoDia();
  const proximos = proximosDias(7);
  const { set: concluidas, toggle, reset } = useConcluidas();

  const idHoje = isoDia(new Date());
  const total = PLANO.length;
  const feitas = concluidas.size;
  const pct = total ? Math.min(100, Math.round((feitas / total) * 100)) : 0;

  return (
    <div className="shell py-[var(--space-md)]">
      <Link to="/biblia" className="inline-flex items-center gap-2 kicker hover:text-gold mb-6">
        <ArrowLeft className="size-3" /> Bíblia
      </Link>
      <p className="kicker mb-3">Lectio Divina · Plano Diário</p>
      <h1 className="title-page text-foreground">Leituras Diárias</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Uma passagem da Sagrada Escritura para cada dia, ligada diretamente ao texto carregado em Almeida.
        Marque como concluído para acompanhar seu progresso.
      </p>

      {/* Progresso */}
      <div className="mt-8 surface-card p-5">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="kicker">Progresso</p>
          <button onClick={reset} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-gold">
            <RotateCcw className="size-3" /> Reiniciar
          </button>
        </div>
        <div className="h-1.5 bg-gold/10 overflow-hidden">
          <div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">{feitas} de {total} leituras concluídas ({pct}%)</p>
      </div>

      {/* Hoje */}
      <article className="mt-10 surface-card p-8 md:p-10">
        <div className="flex items-center gap-2 kicker mb-3">
          <CalendarDays className="size-3" /> Hoje · {fmtData(new Date())}
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-foreground">{hoje.tema}</h2>
        <p className="mt-2 text-gold text-sm tracking-wider uppercase">{refTexto(hoje)}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            {...linkParaLeitura(hoje)}
            className="btn-base btn-gold gap-2 text-[11px] uppercase tracking-[0.25em]"
          >
            <BookOpen className="size-3.5" /> Ler agora
          </Link>
          <button
            onClick={() => toggle(idHoje)}
            className={
              "inline-flex items-center gap-2 px-5 py-3 border text-[11px] uppercase tracking-[0.25em] transition-colors " +
              (concluidas.has(idHoje)
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold/30 text-muted-foreground hover:text-gold hover:border-gold/60")
            }
          >
            <Check className="size-3.5" /> {concluidas.has(idHoje) ? "Concluído hoje" : "Marcar concluído"}
          </button>
        </div>
      </article>

      {/* Próximos dias */}
      <section className="mt-14">
        <h3 className="kicker mb-4">Próximos 7 dias</h3>
        <div className="divide-y divide-gold/15 border border-gold/20">
          {proximos.map(({ data, leitura }, i) => {
            const id = isoDia(data);
            const feita = concluidas.has(id);
            return (
              <div 
                key={id} 
                className="flex flex-col md:flex-row md:items-center gap-3 p-5 hover:bg-gold/5 transition-smooth animate-content-fade"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <button
                  onClick={() => toggle(id)}
                  aria-label={feita ? "Marcar como pendente" : "Marcar como concluído"}
                  className={
                    "size-7 grid place-items-center border shrink-0 transition-smooth " +
                    (feita ? "bg-gold border-gold text-deep" : "border-gold/40 hover:border-gold hover:bg-gold/5")
                  }
                >
                  {feita ? <Check className="size-4" /> : null}
                </button>
                <Link {...linkParaLeitura(leitura)} className="flex-1 group">
                  <div className="kicker">{fmtData(data)}</div>
                  <div className={"font-display text-lg group-hover:text-gold transition-smooth " + (feita ? "line-through text-muted-foreground" : "text-foreground")}>
                    {leitura.tema}
                  </div>
                </Link>
                <div className="text-sm text-muted-foreground tracking-wider uppercase">{refTexto(leitura)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Plano completo */}
      <section className="mt-14">
        <h3 className="kicker mb-4">
          Plano completo · ciclo de {PLANO.length} dias
        </h3>
        <div className="grid sm:grid-cols-2 gap-px bg-gold/15">
          {PLANO.map((l, i) => {
            // Identificador estável por posição no plano (independe da data).
            const id = `plano-${i}`;
            const feita = concluidas.has(id);
            const ehHoje = ((dayOfYear() - 1) % PLANO.length) === i;
            return (
              <div key={i} className="bg-background hover:bg-card p-4 group flex items-start gap-3">
                <button
                  onClick={() => toggle(id)}
                  aria-label={feita ? "Marcar como pendente" : "Marcar como concluído"}
                  className={
                    "size-5 grid place-items-center border shrink-0 mt-1 transition-colors " +
                    (feita ? "bg-gold border-gold text-deep" : "border-gold/40 hover:border-gold")
                  }
                >
                  {feita ? <Check className="size-3" /> : null}
                </button>
                <Link {...linkParaLeitura(l)} className="flex-1">
                  <div className="kicker">
                    Dia {i + 1} {ehHoje && <span className="text-gold">· hoje</span>}
                  </div>
                  <div className={"font-display text-base group-hover:text-gold " + (feita ? "line-through text-muted-foreground" : "text-foreground")}>
                    {l.tema}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">{refTexto(l)}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
