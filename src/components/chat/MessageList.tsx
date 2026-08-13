import { memo, useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy, Share2 } from "lucide-react";
import { ChatMessage } from "../../lib/types/chat";
import { SourceReferences, extrairFontes } from "../SourceReferences";

interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessageItem = memo(({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* clipboard indisponível */
    }
  };

  const compartilhar = async () => {
    const dados = { title: "Sophia — Assistente de estudo católico", text };
    const podeCompartilhar = typeof navigator !== "undefined" && typeof navigator.share === "function";
    try {
      if (podeCompartilhar) {
        await navigator.share(dados);
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* usuário cancelou ou API indisponível */
    }
  };

  return (
    <div
      className={`flex animate-content-fade ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`group relative max-w-[85%] px-5 py-4 text-sm leading-relaxed transition-smooth ${
          isUser
            ? "bg-gold text-deep shadow-lg shadow-gold/20"
            : "bg-card border border-gold/15 text-foreground backdrop-blur-sm"
        }`}
      >
        <div className="prose prose-sm prose-invert max-w-none [&_p]:my-2 [&_strong]:text-gold [&_blockquote]:border-gold/30 [&_blockquote]:text-paper/80 [&_h2]:text-gold [&_h2]:font-display [&_h3]:text-gold/90 [&_em]:text-gold/80">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        {!isUser && text ? <SourceReferences references={extrairFontes(text)} /> : null}
        {!isUser && text ? (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gold/10 pt-3">
            <button
              type="button"
              onClick={copiar}
              aria-label="Copiar resposta"
              className="inline-flex min-h-9 items-center gap-2 kicker transition-colors hover:text-gold"
            >
              {copiado ? (
                <Check className="size-3" aria-hidden="true" />
              ) : (
                <Copy className="size-3" aria-hidden="true" />
              )}
              {copiado ? "Copiado" : "Copiar"}
            </button>
            <button
              type="button"
              onClick={compartilhar}
              aria-label="Compartilhar resposta"
              className="inline-flex min-h-9 items-center gap-2 kicker transition-colors hover:text-gold"
            >
              <Share2 className="size-3" aria-hidden="true" /> Compartilhar
            </button>
            <Link
              to="/estudar"
              className="inline-flex min-h-9 items-center gap-2 kicker transition-colors hover:text-gold"
            >
              Continuar estudando <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
});

ChatMessageItem.displayName = "ChatMessageItem";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export const MessageList = memo(({ messages, isLoading }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior: "smooth" 
      });
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      role="log"
      aria-label="Conversa com a Sophia"
      aria-live="polite"
      aria-busy={isLoading}
      className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gold/20"
    >
      {messages.map((m) => (
        <ChatMessageItem key={m.id || Math.random().toString()} message={m as ChatMessage} />
      ))}
      {isLoading && (
        <div className="text-xs text-gold/70 tracking-wider uppercase animate-pulse">
          Sophia está respondendo…
        </div>
      )}
    </div>
  );
});

MessageList.displayName = "MessageList";
