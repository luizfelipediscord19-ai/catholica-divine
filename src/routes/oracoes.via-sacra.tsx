import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "../components/PageShell";
import { ESTACOES } from "../lib/data/devocoes/viasacra";
import { Relacionados } from "../components/Relacionados";


export const Route = createFileRoute("/oracoes/via-sacra")({
  head: () => ({
    meta: [
      { title: "Via-Sacra — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/via-sacra" },
      { name: "description", content: "As catorze estações da Via-Sacra com meditações e referências bíblicas." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/via-sacra" }],
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
        <div className="surface-card p-card">
          <p className="kicker mb-4">Em todas as estações:</p>
          <p className="italic text-foreground/80 mb-6">V. Nós Vos adoramos, Senhor Jesus Cristo, e Vos bendizemos. <br />R. Porque pela vossa santa Cruz remistes o mundo.</p>
          {e.referencia ? <p className="text-sm text-gold/80 mb-3">{e.referencia}</p> : null}
          <p className="text-lg leading-relaxed text-foreground/90 font-light">{e.meditacao}</p>
          <p className="mt-8 italic text-foreground/70">Pai-Nosso · Ave-Maria · Glória ao Pai</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0} className="min-h-11 flex-1 border border-gold/40 px-5 py-3 text-sm hover:bg-gold/10 disabled:opacity-30 sm:flex-none">← Estação anterior</button>
          <div className="text-sm text-muted-foreground">{i + 1} / 14</div>
          <button onClick={() => setI((n) => Math.min(13, n + 1))} disabled={i === 13} className="min-h-11 flex-1 border border-gold/40 px-5 py-3 text-sm hover:bg-gold/10 disabled:opacity-30 sm:flex-none">Próxima estação →</button>
        </div>

        <div className="mt-6 h-1 bg-gold/15"><div className="h-1 bg-gold" style={{ width: `${((i + 1) / 14) * 100}%` }} /></div>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(2.75rem,1fr))] gap-2">
          {ESTACOES.map((s, idx) => (
            <button key={s.num} onClick={() => setI(idx)} className={`grid min-h-11 place-items-center border text-xs ${idx === i ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/50"}`}>
              {s.num}
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold">← Todas as orações</Link>
        </div>
        <Relacionados topic="via-sacra" className="mt-8" />
      </Section>

    </div>
  );
}
