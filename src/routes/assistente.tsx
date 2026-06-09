import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { SUGESTOES_GERAL } from "../lib/data/sophia-perguntas";

export const Route = createFileRoute("/assistente")({
  head: () => ({
    meta: [
      { title: "Assistente IA Católica — Portal Católico" },
      { name: "description", content: "Sophia, IA fiel ao Magistério: tire suas dúvidas sobre a fé católica com base na Bíblia, Catecismo e documentos oficiais." },
      { property: "og:title", content: "Assistente IA Católica" },
      { property: "og:description", content: "IA católica baseada na Bíblia, Catecismo e documentos oficiais." },
    ],
  }),
  component: Page,
});

const SUGESTOES = SUGESTOES_GERAL;

function Page() {
  const [input, setInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (err) => {
      console.error("[Assistente] error:", err);
      setHasError(true);
      toast.error("Sophia não conseguiu responder. Tente novamente em instantes.");
    },
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  const statusLabel = hasError
    ? "Erro"
    : isLoading
      ? "Carregando"
      : "Conectado";
  const StatusIcon = hasError ? AlertCircle : isLoading ? Loader2 : CheckCircle2;
  const statusColor = hasError
    ? "text-red-400 bg-red-400/10 border-red-400/20"
    : isLoading
      ? "text-gold bg-gold/10 border-gold/20"
      : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function submit(text: string) {
    if (!text.trim() || isLoading) return;
    setHasError(false);
    sendMessage({ 
      text: text.trim(),
    });
    setInput("");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <div className="text-center mb-10">
        <Sparkles className="size-8 text-gold mx-auto mb-4" />
        <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Sophia · IA Católica</p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground">
          Pergunte sobre a Fé Católica
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Respostas fundamentadas na Bíblia, no Catecismo e nos documentos oficiais da Igreja.
        </p>
      </div>

      <div className="border border-gold/25 bg-card flex flex-col h-[60vh]">
        <div className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-wider uppercase border-b ${statusColor}`}>
          <StatusIcon className={`size-3 ${isLoading ? "animate-spin" : ""}`} />
          <span>Sophia · {statusLabel}</span>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGESTOES.map((s, i) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="text-left p-4 border border-gold/20 hover:border-gold/60 text-sm text-foreground transition-smooth hover:bg-gold/5 animate-content-fade"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            messages.map((m, i) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              return (
                <div
                  key={m.id}
                  className={`flex animate-content-fade ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed transition-smooth ${
                      m.role === "user"
                        ? "bg-gold text-deep shadow-lg shadow-gold/20"
                        : "bg-card border border-gold/15 text-foreground backdrop-blur-sm"
                    }`}
                  >
                    <div className="prose prose-sm prose-invert max-w-none [&_p]:my-2 [&_strong]:text-gold [&_blockquote]:border-gold/30 [&_blockquote]:text-paper/80">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {isLoading ? (
            <div className="text-xs text-gold/70 tracking-wider uppercase">Sophia está respondendo…</div>
          ) : null}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="border-t border-gold/20 p-4 flex gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sua pergunta sobre a fé..."
            className="flex-1 bg-background border border-gold/20 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
            style={{ fontSize: "16px" }}
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-5 bg-gold text-deep disabled:opacity-40 hover:bg-paper transition-colors"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
