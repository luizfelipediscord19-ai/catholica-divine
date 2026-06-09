import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero, Section } from "../components/PageShell";
import { CONJUNTOS, ORACOES_BASE, conjuntoDoDia, type ConjuntoMisterios } from "../lib/data/devocoes/rosario";

export const Route = createFileRoute("/oracoes/rosario")({
  head: () => ({
    meta: [
      { title: "Santo Rosário Interativo — Portal Católico" },
      { name: "description", content: "Reze o Santo Rosário guiado com contagem automática, cronômetro e marcação de progresso." },
      { property: "og:title", content: "Santo Rosário Interativo" },
      { property: "og:description", content: "Mistérios Gozosos, Luminosos, Dolorosos e Gloriosos." },
    ],
  }),
  component: Page,
});

type Etapa = { titulo: string; subtitle?: string; texto: string; repeticao?: number; misterioIdx?: number };

function Page() {
  const sugestao = useMemo(() => conjuntoDoDia(), []);
  const [conjunto, setConjunto] = useState<ConjuntoMisterios>(sugestao);
  const etapas = useMemo(() => buildEtapas(conjunto), [conjunto]);

  const [etapaIdx, setEtapaIdx] = useState(0);
  const [contagem, setContagem] = useState(0); // 0..repeticao
  const [playing, setPlaying] = useState(false);
  const [secPerBead, setSecPerBead] = useState(12);
  const [elapsed, setElapsed] = useState(0); // seconds

  const atual = etapas[etapaIdx];
  const total = atual.repeticao ?? 1;

  // cronômetro
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [playing]);

  // auto-advance contagem
  useEffect(() => {
    if (!playing) return;
    const step = setInterval(() => {
      avancarConta();
    }, secPerBead * 1000);
    return () => clearInterval(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, secPerBead, etapaIdx, contagem]);

  function avancarConta() {
    if (contagem + 1 < total) {
      setContagem((n) => n + 1);
    } else {
      // próxima etapa
      if (etapaIdx + 1 < etapas.length) {
        setEtapaIdx(etapaIdx + 1);
        setContagem(0);
      } else {
        setPlaying(false);
      }
    }
  }

  function irParaEtapa(i: number) {
    setEtapaIdx(i);
    setContagem(0);
  }

  function repetirMisterio() {
    const idx = atual.misterioIdx;
    if (idx === undefined) return;
    // achar primeira etapa com este misterioIdx
    const start = etapas.findIndex((e) => e.misterioIdx === idx);
    if (start >= 0) irParaEtapa(start);
  }

  function reiniciar() {
    setEtapaIdx(0);
    setContagem(0);
    setElapsed(0);
    setPlaying(false);
  }

  function mmss(s: number) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  const numMisterios = conjunto.misterios.length;
  const progressoMisterios = Array.from({ length: numMisterios }, (_, i) => {
    const mIdx = atual.misterioIdx;
    if (mIdx === undefined) return i < (etapaIdx === 0 ? 0 : numMisterios) ? "done" : "todo";
    if (i < mIdx) return "done";
    if (i === mIdx) return "current";
    return "todo";
  });

  return (
    <div>
      <PageHero
        eyebrow="Devotio"
        title="Santo Rosário"
        intro={`Hoje, ${dayName()}: sugestão de ${sugestao.nome.toLowerCase()}. Modo guiado com contagem automática e cronômetro.`}
      />

      <Section kicker="Escolha os mistérios" title="Quatro conjuntos, um só Cristo contemplado com Maria">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CONJUNTOS.map((c) => {
            const active = c.slug === conjunto.slug;
            return (
              <button
                key={c.slug}
                onClick={() => { setConjunto(c); reiniciar(); }}
                className={`text-left p-4 border transition-colors ${active ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/60"}`}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80">{c.dia}</p>
                <p className="font-display text-lg mt-1">{c.nome}</p>
              </button>
            );
          })}
        </div>

        {/* Controles de cronômetro */}
        <div className="border border-gold/30 bg-card/60 p-4 md:p-5 mb-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="px-5 py-2 bg-gold text-deep font-medium hover:bg-gold/90"
          >
            {playing ? "⏸ Pausar" : "▶ Iniciar"}
          </button>
          <button onClick={reiniciar} className="px-4 py-2 border border-gold/40 text-sm hover:bg-gold/10">↺ Reiniciar</button>
          <div className="font-mono text-xl text-gold tabular-nums">{mmss(elapsed)}</div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground ml-auto">
            Ritmo por conta:
            <input
              type="range" min={6} max={25} value={secPerBead}
              onChange={(e) => setSecPerBead(Number(e.target.value))}
              className="accent-gold"
            />
            <span className="font-mono text-gold w-10">{secPerBead}s</span>
          </label>
        </div>

        {/* Progresso de mistérios */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold/70">Mistérios</span>
          {progressoMisterios.map((st, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full border ${st === "done" ? "bg-gold border-gold" : st === "current" ? "bg-gold/40 border-gold animate-pulse" : "border-gold/30"}`}
              title={`${i + 1}º mistério`}
            />
          ))}
        </div>

        <div className="border border-gold/30 bg-card p-8 md:p-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold">
              Etapa {etapaIdx + 1} de {etapas.length} · {conjunto.nome}
            </p>
            <div className="flex gap-2">
              {atual.misterioIdx !== undefined ? (
                <button
                  onClick={repetirMisterio}
                  className="px-4 py-2 border border-gold/40 text-sm hover:bg-gold/10"
                  title="Reinicia este mistério"
                >
                  ↻ Repetir mistério
                </button>
              ) : null}
              <button
                onClick={() => { setEtapaIdx((n) => Math.max(0, n - 1)); setContagem(0); }}
                disabled={etapaIdx === 0}
                className="px-4 py-2 border border-gold/40 text-sm hover:bg-gold/10 disabled:opacity-30"
              >
                ← Anterior
              </button>
              <button
                onClick={() => { setEtapaIdx((n) => Math.min(etapas.length - 1, n + 1)); setContagem(0); }}
                disabled={etapaIdx === etapas.length - 1}
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

          {atual.repeticao && atual.repeticao > 1 ? (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">
                  Conta <span className="font-mono text-gold">{contagem + 1}</span> de {atual.repeticao}
                </span>
                <button
                  onClick={avancarConta}
                  className="px-4 py-2 border border-gold/40 text-sm hover:bg-gold/10"
                >
                  + 1 conta
                </button>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: atual.repeticao }, (_, i) => (
                  <span
                    key={i}
                    className={`flex-1 h-2 rounded ${i <= contagem ? "bg-gold" : "bg-gold/15"}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Progresso global */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-1 bg-gold/15 rounded">
            <div
              className="h-1 bg-gold rounded transition-all"
              style={{ width: `${((etapaIdx + (contagem + 1) / Math.max(1, total)) / etapas.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {Math.round(((etapaIdx + (contagem + 1) / Math.max(1, total)) / etapas.length) * 100)}%
          </span>
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

function buildEtapas(c: ConjuntoMisterios): Etapa[] {
  const e: Etapa[] = [
    { titulo: "Sinal da Cruz", texto: ORACOES_BASE.sinalCruz },
    { titulo: "Credo dos Apóstolos", texto: ORACOES_BASE.credo },
    { titulo: "Pai-Nosso", texto: ORACOES_BASE.paiNosso },
    { titulo: "Três Ave-Marias", texto: ORACOES_BASE.aveMaria, repeticao: 3 },
    { titulo: "Glória", texto: ORACOES_BASE.gloria },
  ];
  c.misterios.forEach((m, i) => {
    e.push({
      titulo: `${m.num}º Mistério — ${m.titulo}`,
      subtitle: `${m.referencia} · Fruto: ${m.fruto}`,
      texto: `Anunciamos o ${m.num}º mistério ${c.slug === "luminosos" ? "luminoso" : c.slug.slice(0, -1)}: ${m.titulo}.\n\n(Pause para meditar a passagem ${m.referencia}.)`,
      misterioIdx: i,
    });
    e.push({ titulo: "Pai-Nosso", texto: ORACOES_BASE.paiNosso, misterioIdx: i });
    e.push({ titulo: "Dez Ave-Marias", texto: ORACOES_BASE.aveMaria, repeticao: 10, misterioIdx: i });
    e.push({ titulo: "Glória", texto: ORACOES_BASE.gloria, misterioIdx: i });
    e.push({ titulo: "Oração de Fátima", texto: ORACOES_BASE.fatima, misterioIdx: i });
  });
  e.push({ titulo: "Salve-Rainha", texto: ORACOES_BASE.salveRainha });
  e.push({ titulo: "Sinal da Cruz", texto: ORACOES_BASE.sinalCruz });
  return e;
}

function dayName() {
  return new Date().toLocaleDateString("pt-BR", { weekday: "long" });
}
