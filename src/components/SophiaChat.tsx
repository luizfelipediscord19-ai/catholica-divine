import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Send, Loader2, AlertCircle, CheckCircle2, Trash2, Mic, Square } from "lucide-react";
import { toast } from "sonner";
import { SophiaMode } from "../lib/types/chat";
import { useSophiaChat } from "../hooks/api/use-sophia-chat";
import { useDitado } from "../hooks/use-ditado";
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
    setUltima(text.trim());
    sendMessage({ text: text.trim() });
    setInput("");
  };

  // Ditado por voz: grava o microfone e transcreve no servidor (Whisper).
  const submitRef = useRef(handleSubmit);
  submitRef.current = handleSubmit;

  const aoTranscrever = useCallback((texto: string) => {
    const limpo = texto.slice(0, LIMITE);
    setInput(limpo);
    submitRef.current(limpo);
  }, []);

  const ditado = useDitado(aoTranscrever);

  useEffect(() => {
    if (ditado.erro) {
      toast.error(ditado.erro);
      ditado.limparErro();
    }
  }, [ditado]);


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
      <div className={`flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5 label-btn border-b border-gold/10 ${statusColor}`}>
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <p className="kicker mb-3 text-center">Sugestões de estudo</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {suggestions.map((s, i) => (
              <button
                key={s}
                onClick={() => handleSubmit(s)}
                className="group flex min-w-0 items-start gap-3 border border-gold/10 bg-gold/[0.02] p-4 text-left text-step--1 text-foreground/80 transition-premium animate-content-fade hover:border-gold/40 hover:bg-gold/[0.08] hover:text-foreground"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="mt-0.5 shrink-0 text-gold/40 transition-colors group-hover:text-gold">†</span>
                <span className="min-w-0">{s}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <MessageList messages={messages as any} isLoading={isLoading} />
      )}

      <form
        onSubmit={onFormSubmit}
        className="flex items-center gap-2 border-t border-gold/10 bg-muted/20 p-4 sm:gap-3 sm:p-5"
      >
        <input
          aria-label="Sua pergunta para a Sophia"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ditado.estado === "gravando" ? "Ouvindo… fale a sua pergunta" : placeholder}
          className="field-base min-w-0 flex-1 text-step-0"
          style={{ fontSize: "16px" }}
          disabled={isLoading || ditado.estado !== "inativo"}
          maxLength={LIMITE}
          aria-describedby="sophia-estado"
          autoComplete="off"
          autoCorrect="off"
        />

        {ditado.suportado ? (
          <button
            type="button"
            onClick={ditado.alternar}
            disabled={isLoading || ditado.estado === "transcrevendo"}
            aria-label={
              ditado.estado === "gravando" ? "Parar gravação e enviar" : "Ditar pergunta por voz"
            }
            aria-pressed={ditado.estado === "gravando"}
            title={ditado.estado === "gravando" ? "Parar e transcrever" : "Falar com a Sophia"}
            className={`btn-base btn-icon shrink-0 border transition-premium ${
              ditado.estado === "gravando"
                ? "animate-pulse border-destructive/60 bg-destructive/15 text-destructive-text"
                : "border-gold/25 bg-transparent text-gold/70 hover:border-gold/60 hover:text-gold"
            }`}
          >
            {ditado.estado === "transcrevendo" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : ditado.estado === "gravando" ? (
              <Square className="size-4" aria-hidden="true" />
            ) : (
              <Mic className="size-4" aria-hidden="true" />
            )}
          </button>
        ) : null}

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label="Enviar pergunta"
          title="Enviar pergunta"
          className="btn-base btn-gold btn-md group shrink-0"
        >
          <Send
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="hidden sm:inline">Enviar</span>
        </button>
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

