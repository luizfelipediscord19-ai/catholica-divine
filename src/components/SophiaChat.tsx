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
    <div className="border border-gold/25 bg-card flex flex-col" style={{ height }}>
      <div className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-wider uppercase border-b ${statusColor}`}>
        <StatusIcon className={`size-3 ${isLoading ? "animate-spin" : ""}`} />
        <span>Sophia · {statusLabel}</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((s, i) => (
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
        className="border-t border-gold/20 p-4 flex gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
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
  );
}
