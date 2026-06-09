import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Mode = "geral" | "coroinhas";

export function SophiaChat({
  mode = "geral",
  suggestions,
  placeholder = "Sua pergunta...",
  height = "60vh",
}: {
  mode?: Mode;
  suggestions: string[];
  placeholder?: string;
  height?: string;
}) {
  const [input, setInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { mode },
    }),
    onError: (err) => {
      console.error("[SophiaChat] error:", err);
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
    sendMessage({ text: text.trim() });
    setInput("");
  }

  return (
    <div className="border border-gold/20 bg-card/80 backdrop-blur-xl flex flex-col shadow-2xl shadow-black/50 overflow-hidden" style={{ height }}>
      <div className={`flex items-center justify-between px-6 py-4 text-[11px] tracking-[0.2em] uppercase border-b border-gold/10 ${statusColor}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <StatusIcon className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            {!isLoading && !hasError && (
              <span className="absolute inset-0 bg-emerald-400 blur-sm opacity-50" />
            )}
          </div>
          <span className="font-bold">Sophia · {statusLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-gold/50">
          <span className="size-1 rounded-full bg-gold/40" />
          <span>v2.0 Flash</span>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-6 py-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 text-center mb-2">Sugestões de estudo</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="group text-left p-6 border border-gold/10 hover:border-gold/40 text-sm text-foreground/80 hover:text-foreground transition-premium bg-gold/[0.02] hover:bg-gold/[0.08] animate-content-fade flex items-start gap-4"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-gold/40 group-hover:text-gold transition-colors mt-1">†</span>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => {
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
                  <div className="prose prose-sm prose-invert max-w-none [&_p]:my-2 [&_strong]:text-gold [&_blockquote]:border-gold/30 [&_blockquote]:text-paper/80 [&_h2]:text-gold [&_h2]:font-display [&_h3]:text-gold/90 [&_em]:text-gold/80">
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
        className="border-t border-gold/10 p-6 flex gap-4 bg-black/20"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-white/[0.03] border border-gold/10 px-6 py-4 text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-premium focus:bg-white/[0.05]"
          style={{ fontSize: "16px" }}
          disabled={isLoading}
          autoComplete="off"
          autoCorrect="off"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-8 bg-gold text-deep disabled:opacity-30 hover:bg-paper transition-premium shadow-lg shadow-gold/5 flex items-center justify-center group"
        >
          <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
