import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  PlayCircle,
  AlertCircle,
  Clock,
  FileText,
} from "lucide-react";
import {
  PERGUNTAS_POR_MODO,
  type SophiaMode,
} from "../lib/data/sophia-perguntas";

export const Route = createFileRoute("/sophia-diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico Sophia — Checklist automático" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/sophia-diagnostico" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Validação automática de todas as perguntas pré-formuladas da IA Sophia (modos Geral e Coroinhas), com teste de pergunta livre.",
      },
    ],
  }),
  component: Page,
});

type Status = "pendente" | "executando" | "ok" | "falha";

type ItemTeste = {
  id: string;
  mode: SophiaMode;
  pergunta: string;
  fonte: "pré-formulada" | "humana";
  status: Status;
  latencia?: number;
  caracteres?: number;
  erro?: string;
  preview?: string;
};

const MODOS: { id: SophiaMode; label: string }[] = [
  { id: "geral", label: "Modo Geral" },
  { id: "coroinhas", label: "Modo Coroinhas" },
];

function montaItensIniciais(): ItemTeste[] {
  const itens: ItemTeste[] = [];
  for (const m of MODOS) {
    for (const p of PERGUNTAS_POR_MODO[m.id]) {
      itens.push({
        id: `${m.id}::${p}`,
        mode: m.id,
        pergunta: p,
        fonte: "pré-formulada",
        status: "pendente",
      });
    }
  }
  return itens;
}

/**
 * Envia a pergunta ao /api/chat exatamente como a UI faria
 * e consome o stream UIMessage até o fim, captando texto e erros.
 */
async function testarPergunta(mode: SophiaMode, pergunta: string) {
  const inicio = performance.now();
  const userMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: "user" as const,
    parts: [{ type: "text" as const, text: pergunta }],
  };

  const resp = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, messages: [userMessage] }),
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(`HTTP ${resp.status} — ${txt || resp.statusText}`);
  }
  if (!resp.body) throw new Error("Resposta sem corpo (stream vazio).");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let bruto = "";
  let texto = "";
  let erroStream: string | null = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    bruto += decoder.decode(value, { stream: true });

    // O UI Message Stream do AI SDK envia linhas "data: {...}\n\n"
    const linhas = bruto.split("\n");
    bruto = linhas.pop() ?? "";
    for (const linha of linhas) {
      const l = linha.trim();
      if (!l.startsWith("data:")) continue;
      const payload = l.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const ev = JSON.parse(payload);
        if (ev?.type === "text-delta" && typeof ev.delta === "string") {
          texto += ev.delta;
        } else if (ev?.type === "text" && typeof ev.text === "string") {
          texto += ev.text;
        } else if (ev?.type === "error") {
          erroStream =
            typeof ev.errorText === "string"
              ? ev.errorText
              : typeof ev.error === "string"
                ? ev.error
                : "Erro retornado pelo stream";
        }
      } catch {
        // ignora linhas que não são JSON válido
      }
    }
  }

  const latencia = Math.round(performance.now() - inicio);
  if (erroStream) throw new Error(erroStream);
  if (!texto.trim()) throw new Error("Stream finalizou sem produzir texto.");
  return { latencia, texto };
}

function Page() {
  const [itens, setItens] = useState<ItemTeste[]>(montaItensIniciais);
  const [executando, setExecutando] = useState(false);
  const [perguntaHumana, setPerguntaHumana] = useState("");
  const [modoHumano, setModoHumano] = useState<SophiaMode>("geral");

  function atualizar(id: string, patch: Partial<ItemTeste>) {
    setItens((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  async function rodarUm(item: ItemTeste) {
    atualizar(item.id, { status: "executando", erro: undefined, preview: undefined });
    try {
      const { latencia, texto } = await testarPergunta(item.mode, item.pergunta);
      atualizar(item.id, {
        status: "ok",
        latencia,
        caracteres: texto.length,
        preview: texto.slice(0, 280),
      });
    } catch (e) {
      atualizar(item.id, {
        status: "falha",
        erro: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async function rodarTodos() {
    setExecutando(true);
    // reset
    setItens((prev) =>
      prev.map((x) =>
        x.fonte === "pré-formulada"
          ? { ...x, status: "pendente", erro: undefined, preview: undefined, latencia: undefined }
          : x,
      ),
    );
    // executa em série para não estourar rate-limit
    const lista = montaItensIniciais();
    for (const it of lista) {
      // garantir estado executando
      await rodarUm(it);
    }
    setExecutando(false);
  }

  async function rodarHumano() {
    const texto = perguntaHumana.trim();
    if (!texto) return;
    const id = `humana::${modoHumano}::${Date.now()}`;
    const novo: ItemTeste = {
      id,
      mode: modoHumano,
      pergunta: texto,
      fonte: "humana",
      status: "executando",
    };
    setItens((prev) => [novo, ...prev]);
    try {
      const { latencia, texto: resp } = await testarPergunta(modoHumano, texto);
      atualizar(id, {
        status: "ok",
        latencia,
        caracteres: resp.length,
        preview: resp.slice(0, 280),
      });
    } catch (e) {
      atualizar(id, {
        status: "falha",
        erro: e instanceof Error ? e.message : String(e),
      });
    }
    setPerguntaHumana("");
  }

  const totais = {
    total: itens.length,
    ok: itens.filter((x) => x.status === "ok").length,
    falha: itens.filter((x) => x.status === "falha").length,
    pendente: itens.filter((x) => x.status === "pendente").length,
    executando: itens.filter((x) => x.status === "executando").length,
  };

  return (
    <div className="shell-mid py-[var(--space-md)]">
      <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">
        Sophia · Quality Assurance
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-foreground">
        Checklist automático da Sophia
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Valida todas as perguntas pré-formuladas dos dois modos (Geral e Coroinhas) chamando a mesma
        rota da IA em produção (<code className="text-gold">/api/chat</code>) e mede latência, texto
        retornado e erros. Também aceita uma pergunta livre escrita por humano.
      </p>

      {/* Painel de controle */}
      <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-4 items-stretch">
        <div className="border border-gold/20 bg-card/40 p-5 flex flex-wrap gap-3 text-xs">
          <Pill icon={<FileText className="size-3" />} label={`${totais.total} testes`} />
          <Pill
            icon={<CheckCircle2 className="size-3" />}
            label={`${totais.ok} ok`}
            tone="ok"
          />
          <Pill icon={<XCircle className="size-3" />} label={`${totais.falha} falhas`} tone="erro" />
          <Pill icon={<Clock className="size-3" />} label={`${totais.pendente} pendentes`} />
        </div>
        <button
          onClick={rodarTodos}
          disabled={executando}
          className="px-6 py-3 bg-gold text-deep text-xs uppercase tracking-[0.25em] flex items-center gap-2 disabled:opacity-40 hover:bg-paper transition-colors"
        >
          {executando ? <Loader2 className="size-4 animate-spin" /> : <PlayCircle className="size-4" />}
          {executando ? "Executando…" : "Rodar checklist completo"}
        </button>
      </div>

      {/* Pergunta humana */}
      <div className="mt-8 border border-gold/20 bg-card/40 p-5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
          Teste uma pergunta escrita por humano
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {MODOS.map((m) => (
            <button
              key={m.id}
              onClick={() => setModoHumano(m.id)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border transition-colors ${
                modoHumano === m.id
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold/20 text-foreground/70 hover:border-gold/50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            aria-label="Pergunta de teste"
            value={perguntaHumana}
            onChange={(e) => setPerguntaHumana(e.target.value)}
            placeholder="Escreva uma pergunta livre para testar a Sophia…"
            className="flex-1 bg-background border border-gold/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
            onKeyDown={(e) => {
              if (e.key === "Enter") rodarHumano();
            }}
          />
          <button
            onClick={rodarHumano}
            disabled={!perguntaHumana.trim()}
            className="px-5 py-3 border border-gold text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold/10 disabled:opacity-40"
          >
            Testar
          </button>
        </div>
      </div>

      {/* Lista de testes agrupados */}
      <div className="mt-10 space-y-10">
        {MODOS.map((m) => {
          const lista = itens.filter((x) => x.mode === m.id);
          return (
            <section key={m.id}>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="font-display text-2xl text-foreground">{m.label}</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {lista.length} {lista.length === 1 ? "pergunta" : "perguntas"}
                </span>
              </div>
              <div className="space-y-3">
                {lista.map((it) => (
                  <ItemLinha key={it.id} item={it} onRun={() => rodarUm(it)} />
                ))}
                {lista.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    Nenhuma pergunta nesse modo ainda.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12">
        <Link
          to="/assistente"
          className="px-5 py-3 border border-gold/40 hover:bg-gold/10 text-xs uppercase tracking-[0.25em]"
        >
          ← Voltar para a Sophia
        </Link>
      </div>
    </div>
  );
}

function Pill({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone?: "ok" | "erro";
}) {
  const cls =
    tone === "ok"
      ? "text-emerald-300 border-emerald-400/30 bg-emerald-400/10"
      : tone === "erro"
        ? "text-red-300 border-red-400/30 bg-red-400/10"
        : "text-foreground/70 border-gold/20 bg-background/40";
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 border uppercase tracking-[0.2em] text-[10px] ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

function ItemLinha({ item, onRun }: { item: ItemTeste; onRun: () => void }) {
  const cor =
    item.status === "ok"
      ? "border-emerald-400/30"
      : item.status === "falha"
        ? "border-red-400/40"
        : item.status === "executando"
          ? "border-gold/50"
          : "border-gold/15";
  const Icon =
    item.status === "ok"
      ? CheckCircle2
      : item.status === "falha"
        ? XCircle
        : item.status === "executando"
          ? Loader2
          : AlertCircle;
  const iconCor =
    item.status === "ok"
      ? "text-emerald-400"
      : item.status === "falha"
        ? "text-red-400"
        : item.status === "executando"
          ? "text-gold animate-spin"
          : "text-foreground/40";

  return (
    <article className={`border ${cor} bg-background/40 p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`size-5 mt-0.5 shrink-0 ${iconCor}`} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[9px] uppercase tracking-[0.25em] px-2 py-0.5 border border-gold/30 text-gold">
              {item.fonte}
            </span>
            {item.latencia !== undefined && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {item.latencia}ms · {item.caracteres ?? 0} chars
              </span>
            )}
          </div>
          <p className="text-sm text-foreground mt-2 font-medium">{item.pergunta}</p>
          {item.preview && (
            <p className="text-xs text-foreground/65 italic mt-2 line-clamp-3">"{item.preview}…"</p>
          )}
          {item.erro && (
            <p className="text-xs text-red-300 mt-2 break-words">
              <strong>Erro:</strong> {item.erro}
            </p>
          )}
        </div>
        <button
          onClick={onRun}
          disabled={item.status === "executando"}
          className="text-[10px] uppercase tracking-[0.2em] px-3 py-2 border border-gold/30 text-gold hover:bg-gold/10 disabled:opacity-40 shrink-0"
        >
          Testar
        </button>
      </div>
    </article>
  );
}
