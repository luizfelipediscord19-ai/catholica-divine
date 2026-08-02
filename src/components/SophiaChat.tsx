import { memo, useEffect, useState } from "react";
import { Send, Loader2, AlertCircle, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { SophiaMode } from "../lib/types/chat";
import { useSophiaChat } from "../hooks/api/use-sophia-chat";
import { MessageList } from "./chat/MessageList";

interface SophiaChatProps {
  mode?: SophiaMode;
  suggestions: string[];
  placeholder?: string;
  height?: string;
}

export const SophiaChat = memo(({
  mode = "geral",
  suggestions,
  placeholder = "Sua pergunta...",
  height = "60vh",
}: SophiaChatProps) => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, setMessages, clearError } = useSophiaChat(mode);

  const isLoading = status === "submitted" || status === "streaming";
  const hasError = !!error || status === "error";

  const statusLabel = hasError ? "Erro" : isLoading ? "Carregando" : "Conectado";
  const StatusIcon = hasError ? AlertCircle : isLoading ? Loader2 : CheckCircle2;
  const statusColor = hasError
    ? "text-red-400 bg-red-400/10 border-red-400/20"
    : isLoading
      ? "text-gold bg-gold/10 border-gold/20"
      : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";

  const handleSubmit = (text: string) => {
    if (!text.trim() || isLoading) return;
    
    // Suporte a comandos de voz via Web Speech API se disponível
    if (text === "___VOICE___") {
      startVoiceRecognition();
      return;
    }

    sendMessage({ text: text.trim() });
    setInput("");
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Seu navegador não suporta reconhecimento de voz.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.start();
    toast.info("Ouvindo...");
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSubmit(transcript);
    };
    recognition.onerror = () => toast.error("Erro ao capturar voz.");
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(input);
  };

  useEffect(() => {
    if (!error) return;
    toast.error(typeof error === "string" ? error : error.message || "Erro desconhecido");
  }, [error]);

  const limparHistorico = () => {
    setMessages([]);
    clearError?.();
    setInput("");
  };

  return (
    <div className="border border-gold/20 bg-card/80 backdrop-blur-xl flex flex-col shadow-2xl shadow-black/50 overflow-hidden" style={{ height }}>
      <div className={`flex items-center justify-between px-6 py-4 text-[11px] tracking-[0.2em] uppercase border-b border-gold/10 ${statusColor}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <StatusIcon className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} aria-hidden="true" />
            {!isLoading && !hasError && (
              <span className="absolute inset-0 bg-emerald-400 blur-sm opacity-50" />
            )}
          </div>
          <span className="font-bold">Sophia · {statusLabel}</span>
        </div>
        <div className="flex items-center gap-4 text-gold/50">
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={limparHistorico}
              className="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors"
              aria-label="Limpar histórico da conversa"
              title="Limpar histórico"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Limpar</span>
            </button>
          ) : null}
          <span className="hidden sm:inline">v2.0</span>
        </div>
      </div>


      {messages.length === 0 ? (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 py-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 text-center mb-2">Sugestões de estudo</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((s, i) => (
              <button
                key={s}
                onClick={() => handleSubmit(s)}
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
        <MessageList messages={messages as any} isLoading={isLoading} />
      )}

      <form
        onSubmit={onFormSubmit}
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleSubmit("___VOICE___")}
            className="px-4 border border-gold/10 hover:border-gold/40 text-gold/60 hover:text-gold transition-premium bg-white/[0.02]"
            aria-label="Ditar pergunta por voz"
            title="Falar com a IA"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Enviar pergunta"
            title="Enviar pergunta"
            className="px-8 bg-gold text-deep disabled:opacity-30 hover:bg-paper transition-premium shadow-lg shadow-gold/5 flex items-center justify-center group"
          >
            <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
});

SophiaChat.displayName = "SophiaChat";

