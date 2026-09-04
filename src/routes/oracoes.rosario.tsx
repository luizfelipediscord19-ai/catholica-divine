import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Botao, BotaoLink } from "@/components/ds";
import { PageHero, Section, Prancha } from "../components/PageShell";
import { CONJUNTOS, ORACOES_BASE, conjuntoDoDia, type ConjuntoMisterios } from "../lib/data/devocoes/rosario";
import { Relacionados } from "../components/Relacionados";
import rosario from "@/assets/rosario.jpg";
import maria from "@/assets/maria.jpg";
import { keywordsPara } from "@/lib/seo/palavras-chave";


export const Route = createFileRoute("/oracoes/rosario")({
  head: () => ({
    meta: [
      { title: "Santo Rosário Interativo — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/rosario" },
      { name: "description", content: "Reze o Santo Rosário guiado com contagem automática, cronômetro e marcação de progresso." },
      { name: "keywords", content: keywordsPara(["oracoes", "maria"]) },
      { property: "og:title", content: "Santo Rosário Interativo" },
      { property: "og:description", content: "Mistérios Gozosos, Luminosos, Dolorosos e Gloriosos." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/rosario" }],
  }),
  component: Page,
});

type Etapa = { titulo: string; subtitle?: string; texto: string; repeticao?: number; misterioIdx?: number };

const STORAGE_KEY = "rosario:progresso:v1";
type Saved = {
  conjuntoSlug: ConjuntoMisterios["slug"];
  etapaIdx: number;
  contagem: number;
  elapsed: number;
  secPerBead: number;
  savedAt: number;
};

function Page() {
  const sugestao = useMemo(() => conjuntoDoDia(), []);
  const [conjunto, setConjunto] = useState<ConjuntoMisterios>(sugestao);
  const etapas = useMemo(() => buildEtapas(conjunto), [conjunto]);

  const [etapaIdx, setEtapaIdx] = useState(0);
  const [contagem, setContagem] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [secPerBead, setSecPerBead] = useState(12);
  const [elapsed, setElapsed] = useState(0);
  const [restored, setRestored] = useState<Saved | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restaurar progresso ao montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        const c = CONJUNTOS.find((x) => x.slug === s.conjuntoSlug);
        if (c) {
          setConjunto(c);
          setEtapaIdx(s.etapaIdx);
          setContagem(s.contagem);
          setElapsed(s.elapsed);
          setSecPerBead(s.secPerBead);
          setRestored(s);
        }
      }
    } catch {
      // localStorage indisponível — segue sem restaurar
    }
    setHydrated(true);
  }, []);

  // Salvamento automático (após hidratar, com debounce simples)
  useEffect(() => {
    if (!hydrated) return;
    const id = setTimeout(() => {
      try {
        const payload: Saved = {
          conjuntoSlug: conjunto.slug,
          etapaIdx,
          contagem,
          elapsed,
          secPerBead,
          savedAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // sem espaço / modo privado — ignora
      }
    }, 400);
    return () => clearTimeout(id);
  }, [hydrated, conjunto.slug, etapaIdx, contagem, elapsed, secPerBead]);

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
    setRestored(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
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
        autoridade={["tradicao", "devocao"]}
        image={rosario}
        eyebrow="Devotio"
        title="Santo Rosário"
        intro={`Hoje, ${dayName()}: sugestão de ${sugestao.nome.toLowerCase()}. Modo guiado com contagem automática e cronômetro.`}
      />

      <Section kicker="Escolha os mistérios" title="Quatro conjuntos, um só Cristo contemplado com Maria">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {CONJUNTOS.map((c) => {
            const active = c.slug === conjunto.slug;
            return (
              <Botao
                key={c.slug}
                variante="discreto"
                tamanho="lg"
                onClick={() => { setConjunto(c); reiniciar(); }}
                className={`h-auto min-h-0 justify-start p-4 text-left normal-case tracking-normal ${active ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/60"}`}
              >
                <span><span className="kicker block">{c.dia}</span><span className="mt-1 block font-display text-lg">{c.nome}</span></span>
              </Botao>
            );
          })}
        </div>

        {restored ? (
          <div className="border border-gold/40 bg-gold/5 p-4 mb-4 flex items-center justify-between gap-3 text-sm">
            <span>
              <span className="text-gold">●</span> Retomado de onde parou — etapa {restored.etapaIdx + 1}, conta {restored.contagem + 1}
              <span className="text-muted-foreground"> · salvo {tempoAtras(restored.savedAt)}</span>
            </span>
            <Botao tamanho="sm" variante="discreto" onClick={() => setRestored(null)} className="text-xs font-normal normal-case tracking-normal text-muted-foreground">dispensar</Botao>
          </div>
        ) : null}

        {/* Controles de cronômetro */}
        <div className="surface-card p-4 md:p-5 mb-4 flex flex-wrap items-center gap-4">
          <Botao tamanho="md" onClick={() => setPlaying((p) => !p)}>
            {playing ? "⏸ Pausar" : "▶ Iniciar"}
          </Botao>
          <Botao tamanho="md" variante="contorno" onClick={reiniciar}>↺ Reiniciar</Botao>
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
          <span className="kicker">Mistérios</span>
          {progressoMisterios.map((st, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full border ${st === "done" ? "bg-gold border-gold" : st === "current" ? "bg-gold/40 border-gold animate-pulse" : "border-gold/30"}`}
              title={`${i + 1}º mistério`}
            />
          ))}
        </div>

        <div className="surface-card p-8 md:p-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <p className="kicker">
              Etapa {etapaIdx + 1} de {etapas.length} · {conjunto.nome}
            </p>
            <div className="flex gap-2">
              {atual.misterioIdx !== undefined ? (
                <Botao tamanho="md" variante="contorno" onClick={repetirMisterio} title="Reinicia este mistério">
                  ↻ Repetir mistério
                </Botao>
              ) : null}
              <Botao tamanho="md" variante="contorno" onClick={() => { setEtapaIdx((n) => Math.max(0, n - 1)); setContagem(0); }} disabled={etapaIdx === 0}>
                ← Anterior
              </Botao>
              <Botao tamanho="md" variante="contorno" onClick={() => { setEtapaIdx((n) => Math.min(etapas.length - 1, n + 1)); setContagem(0); }} disabled={etapaIdx === etapas.length - 1}>
                Próximo →
              </Botao>
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
                <Botao tamanho="md" variante="contorno" onClick={avancarConta}>+ 1 conta</Botao>
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

      <div className="shell w-full">
        <Prancha
          image={maria}
          formato="retrato"
          alt="Imaculada Conceição: Maria envolta em luz, sustentada por anjos."
          legenda="O Rosário é escola mariana: com Maria contemplamos o rosto de Cristo, mistério por mistério (São João Paulo II, Rosarium Virginis Mariae 3)."
        />
      </div>



      <Section kicker="Mais devoções" title="Continue na vida de oração">
        <div className="flex flex-wrap gap-3">
          <BotaoLink para="/oracoes" variante="contorno" tamanho="lg">← Todas as orações</BotaoLink>
          <BotaoLink para="/oracoes/via-sacra" variante="contorno" tamanho="lg">Via-Sacra</BotaoLink>
          <BotaoLink para="/oracoes/novenas" variante="contorno" tamanho="lg">Novenas</BotaoLink>
          <BotaoLink para="/oracoes/liturgia-das-horas" variante="contorno" tamanho="lg">Liturgia das Horas</BotaoLink>
        </div>
        <Relacionados topic="rosario" className="mt-8" />
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

function tempoAtras(ts: number) {
  const diff = Math.max(0, Date.now() - ts);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "agora há pouco";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24);
  return `há ${d} d`;
}
