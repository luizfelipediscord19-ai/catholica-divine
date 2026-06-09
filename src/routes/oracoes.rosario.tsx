import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, Section } from "../components/PageShell";
import { CONJUNTOS, ORACOES_BASE, conjuntoDoDia, type ConjuntoMisterios } from "../lib/data/devocoes/rosario";

export const Route = createFileRoute("/oracoes/rosario")({
  head: () => ({
    meta: [
      { title: "Santo Rosário Interativo — Portal Católico" },
      { name: "description", content: "Reze o Santo Rosário guiado, com os quatro mistérios, orações e referências bíblicas." },
      { property: "og:title", content: "Santo Rosário Interativo" },
      { property: "og:description", content: "Mistérios Gozosos, Luminosos, Dolorosos e Gloriosos." },
    ],
  }),
  component: Page,
});

function Page() {
  const sugestao = useMemo(() => conjuntoDoDia(), []);
  const [conjunto, setConjunto] = useState<ConjuntoMisterios>(sugestao);
  const [etapa, setEtapa] = useState(0);

  const etapas = useMemo(() => buildEtapas(conjunto), [conjunto]);
  const atual = etapas[etapa];

  return (
    <div>
      <PageHero
        eyebrow="Devotio"
        title="Santo Rosário"
        intro={`Hoje, ${dayName()}: sugestão de ${sugestao.nome.toLowerCase()}. Escolha um conjunto de mistérios e acompanhe a oração passo a passo.`}
      />

      <Section kicker="Escolha os mistérios" title="Quatro conjuntos, um só Cristo contemplado com Maria">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CONJUNTOS.map((c) => {
            const active = c.slug === conjunto.slug;
            return (
              <button
                key={c.slug}
                onClick={() => { setConjunto(c); setEtapa(0); }}
                className={`text-left p-4 border transition-colors ${active ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/60"}`}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80">{c.dia}</p>
                <p className="font-display text-lg mt-1">{c.nome}</p>
              </button>
            );
          })}
        </div>

        <div className="border border-gold/30 bg-card p-8 md:p-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold">
              Etapa {etapa + 1} de {etapas.length} · {conjunto.nome}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setEtapa((n) => Math.max(0, n - 1))}
                disabled={etapa === 0}
                className="px-4 py-2 border border-gold/40 text-sm hover:bg-gold/10 disabled:opacity-30"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setEtapa((n) => Math.min(etapas.length - 1, n + 1))}
                disabled={etapa === etapas.length - 1}
                className="px-4 py-2 border border-gold/40 text-sm hover:bg-gold/10 disabled:opacity-30"
              >
                Próximo →
              </button>
            </div>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">{atual.titulo}</h2>
          {atual.subtitle ? <p className="text-sm text-gold/80 mb-6">{atual.subtitle}</p> : null}
          <p className="text-lg leading-relaxed text-foreground/90 font-light whitespace-pre-line">
            {atual.texto}
          </p>
          {atual.repeticao ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Repita {atual.repeticao} vez(es).
            </p>
          ) : null}
        </div>

        <div className="mt-6 h-1 bg-gold/15 rounded">
          <div className="h-1 bg-gold rounded transition-all" style={{ width: `${((etapa + 1) / etapas.length) * 100}%` }} />
        </div>
      </Section>

      <Section kicker="Mais devoções" title="Continue na vida de oração">
        <div className="flex flex-wrap gap-3">
          <Link to="/oracoes" className="px-5 py-3 border border-gold/40 hover:bg-gold/10">← Todas as orações</Link>
          <Link to="/oracoes/via-sacra" className="px-5 py-3 border border-gold/40 hover:bg-gold/10">Via-Sacra</Link>
          <Link to="/oracoes/novenas" className="px-5 py-3 border border-gold/40 hover:bg-gold/10">Novenas</Link>
          <Link to="/oracoes/liturgia-das-horas" className="px-5 py-3 border border-gold/40 hover:bg-gold/10">Liturgia das Horas</Link>
        </div>
      </Section>
    </div>
  );
}

type Etapa = { titulo: string; subtitle?: string; texto: string; repeticao?: number };

function buildEtapas(c: ConjuntoMisterios): Etapa[] {
  const e: Etapa[] = [
    { titulo: "Sinal da Cruz", texto: ORACOES_BASE.sinalCruz },
    { titulo: "Credo dos Apóstolos", texto: ORACOES_BASE.credo },
    { titulo: "Pai-Nosso", texto: ORACOES_BASE.paiNosso },
    { titulo: "Três Ave-Marias", texto: ORACOES_BASE.aveMaria, repeticao: 3 },
    { titulo: "Glória", texto: ORACOES_BASE.gloria },
  ];
  for (const m of c.misterios) {
    e.push({
      titulo: `${m.num}º Mistério — ${m.titulo}`,
      subtitle: `${m.referencia} · Fruto: ${m.fruto}`,
      texto: `Anunciamos o ${m.num}º mistério ${c.slug === "luminosos" ? "luminoso" : c.slug.slice(0, -1)}: ${m.titulo}.\n\n(Pause para meditar a passagem ${m.referencia}.)`,
    });
    e.push({ titulo: "Pai-Nosso", texto: ORACOES_BASE.paiNosso });
    e.push({ titulo: "Dez Ave-Marias", texto: ORACOES_BASE.aveMaria, repeticao: 10 });
    e.push({ titulo: "Glória", texto: ORACOES_BASE.gloria });
    e.push({ titulo: "Oração de Fátima", texto: ORACOES_BASE.fatima });
  }
  e.push({ titulo: "Salve-Rainha", texto: ORACOES_BASE.salveRainha });
  e.push({ titulo: "Sinal da Cruz", texto: ORACOES_BASE.sinalCruz });
  return e;
}

function dayName() {
  return new Date().toLocaleDateString("pt-BR", { weekday: "long" });
}
