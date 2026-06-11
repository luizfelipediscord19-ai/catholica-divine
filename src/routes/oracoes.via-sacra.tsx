import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "../components/PageShell";
import { ESTACOES } from "../lib/data/devocoes/viasacra";
import { MarcarConcluidoButton } from "../components/MarcarConcluidoButton";


export const Route = createFileRoute("/oracoes/via-sacra")({
  head: () => ({
    meta: [
      { title: "Via-Sacra — Portal Católico" },
      { name: "description", content: "As catorze estações da Via-Sacra com meditações e referências bíblicas." },
    ],
  }),
  component: Page,
});

function Page() {
  const [i, setI] = useState(0);
  const e = ESTACOES[i];
  return (
    <div>
      <PageHero
        eyebrow="Crux"
        title="Via-Sacra"
        intro="Acompanhe os passos de Cristo até o Calvário em catorze estações. Tradição firmada por São Leonardo de Porto Maurício no século XVIII."
      />
      <Section kicker={`Estação ${e.num} de 14`} title={e.titulo}>
        <div className="border border-gold/30 bg-card p-8 md:p-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Em todas as estações:</p>
          <p className="italic text-foreground/80 mb-6">V. Nós Vos adoramos, Senhor Jesus Cristo, e Vos bendizemos. <br />R. Porque pela vossa santa Cruz remistes o mundo.</p>
          {e.referencia ? <p className="text-sm text-gold/80 mb-3">{e.referencia}</p> : null}
          <p className="text-lg leading-relaxed text-foreground/90 font-light">{e.meditacao}</p>
          <p className="mt-8 italic text-foreground/70">Pai-Nosso · Ave-Maria · Glória ao Pai</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0} className="px-5 py-3 border border-gold/40 hover:bg-gold/10 disabled:opacity-30">← Estação anterior</button>
          <div className="text-sm text-muted-foreground">{i + 1} / 14</div>
          <button onClick={() => setI((n) => Math.min(13, n + 1))} disabled={i === 13} className="px-5 py-3 border border-gold/40 hover:bg-gold/10 disabled:opacity-30">Próxima estação →</button>
        </div>

        <div className="mt-6 h-1 bg-gold/15"><div className="h-1 bg-gold" style={{ width: `${((i + 1) / 14) * 100}%` }} /></div>

        <div className="mt-10 grid grid-cols-7 gap-2">
          {ESTACOES.map((s, idx) => (
            <button key={s.num} onClick={() => setI(idx)} className={`p-2 border text-xs text-center ${idx === i ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/50"}`}>
              {s.num}
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-3">
          {i === 13 && <MarcarConcluidoButton kind="oracao" ref="via-sacra" />}
          <Link to="/oracoes" className="px-5 py-3 border border-gold/40 hover:bg-gold/10">← Todas as orações</Link>
        </div>
      </Section>

    </div>
  );
}
