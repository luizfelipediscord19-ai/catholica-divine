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
  const [aviso, setAviso] = useState<string | null>(null);
  const [ultima, setUltima] = useState("");

  const LIMITE = 800;
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
    if (isLoading) return;
    if (!text.trim()) {
      setAviso("Escreva a sua pergunta antes de enviar.");
      return;
    }
    if (text.trim().length > LIMITE) {
      setAviso(`A pergunta deve ter no máximo ${LIMITE} caracteres.`);
      return;
    }
    setAviso(null);
    
    // Suporte a comandos de voz via Web Speech API se disponível
    if (text === "___VOICE___") {
      startVoiceRecognition();
      return;
    }

    setUltima(text.trim());
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
    <div aria-busy={isLoading} className="surface-card backdrop-blur-xl flex flex-col shadow-2xl shadow-black/50 overflow-hidden" style={{ height }}>
      <div className={`flex items-center justify-between px-6 py-4 text-[11px] tracking-[0.16em] uppercase border-b border-gold/10 ${statusColor}`}>
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
          <p className="kicker text-center mb-2">Sugestões de estudo</p>
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
          aria-label="Sua pergunta para a Sophia"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="field-base flex-1 px-5 py-4 text-base"
          style={{ fontSize: "16px" }}
          disabled={isLoading}
          maxLength={LIMITE}
          aria-describedby="sophia-estado"
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
            className="btn-base btn-gold group px-8"
          >
            <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </form>

      <div
        id="sophia-estado"
        aria-live="polite"
        className="border-t border-gold/10 px-6 py-3 bg-black/10 text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2"
      >
        {aviso ? <span className="text-destructive-text">{aviso}</span> : null}
        {isLoading ? <span className="text-gold/80">Enviando…</span> : null}
        {hasError ? (
          <span className="flex items-center gap-3">
            <span className="text-destructive-text">
              Não foi possível consultar a Sophia agora.
            </span>
            {ultima ? (
              <button
                type="button"
                onClick={() => {
                  clearError?.();
                  handleSubmit(ultima);
                }}
                className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
              >
                Tentar novamente
              </button>
            ) : null}
          </span>
        ) : null}
        <span className="ml-auto">
          {input.length}/{LIMITE}
        </span>
        <span className="basis-full text-muted-foreground/80 leading-relaxed">
          A Sophia é um auxílio de estudo fiel ao Magistério: não substitui sacerdote, confissão nem
          direção espiritual.
        </span>
      </div>
    </div>
  );
});

SophiaChat.displayName = "SophiaChat";

