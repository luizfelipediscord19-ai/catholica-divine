import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, BookOpen, ArrowLeft } from "lucide-react";
import { leituraDoDia, proximosDias, PLANO } from "../lib/data/biblia/leituras";

export const Route = createFileRoute("/biblia/leituras")({
  head: () => ({
    meta: [
      { title: "Leituras Diárias — Bíblia — Portal Católico" },
      { name: "description", content: "Plano de leitura bíblica diária com passagens selecionadas para cada dia do ano." },
      { property: "og:title", content: "Leituras Diárias da Bíblia" },
      { property: "og:description", content: "Um capítulo ou passagem da Sagrada Escritura para cada dia." },
    ],
  }),
  component: Page,
});

function fmtData(d: Date) {
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
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
  if (l.vi && l.vf) return `${l.nome} ${l.capitulo}:${l.vi}-${l.vf}`;
  if (l.vi) return `${l.nome} ${l.capitulo}:${l.vi}`;
  return `${l.nome} ${l.capitulo}`;
}

function Page() {
  const hoje = leituraDoDia();
  const proximos = proximosDias(7);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <Link to="/biblia" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold/80 hover:text-gold mb-6">
        <ArrowLeft className="size-3" /> Bíblia
      </Link>
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Lectio Divina · Plano Diário</p>
      <h1 className="font-display text-5xl md:text-6xl text-foreground">Leituras Diárias</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Uma passagem da Sagrada Escritura para cada dia, ligada diretamente ao texto carregado em Almeida.
      </p>

      {/* Hoje */}
      <article className="mt-10 border border-gold/40 bg-card p-8 md:p-10">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
          <CalendarDays className="size-3" /> Hoje · {fmtData(new Date())}
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-foreground">{hoje.tema}</h2>
        <p className="mt-2 text-gold text-sm tracking-wider uppercase">{refTexto(hoje)}</p>
        <Link
          {...linkParaLeitura(hoje)}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors"
        >
          <BookOpen className="size-3.5" /> Ler agora
        </Link>
      </article>

      {/* Próximos dias */}
      <section className="mt-14">
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">Próximos 7 dias</h3>
        <div className="divide-y divide-gold/15 border border-gold/20">
          {proximos.map(({ data, leitura }) => (
            <Link
              key={data.toISOString()}
              {...linkParaLeitura(leitura)}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-5 hover:bg-card transition-colors group"
            >
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold/70">{fmtData(data)}</div>
                <div className="font-display text-lg text-foreground group-hover:text-gold">{leitura.tema}</div>
              </div>
              <div className="text-sm text-muted-foreground tracking-wider uppercase">{refTexto(leitura)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Plano completo */}
      <section className="mt-14">
        <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">
          Plano completo · ciclo de {PLANO.length} dias
        </h3>
        <div className="grid sm:grid-cols-2 gap-px bg-gold/15">
          {PLANO.map((l, i) => (
            <Link
              key={i}
              {...linkParaLeitura(l)}
              className="bg-background hover:bg-card p-4 group"
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold/70">Dia {i + 1}</div>
              <div className="font-display text-base text-foreground group-hover:text-gold">{l.tema}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{refTexto(l)}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
