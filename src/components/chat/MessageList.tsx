import { memo, useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Check, Copy } from "lucide-react";
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
          <button
            type="button"
            onClick={copiar}
            aria-label="Copiar resposta"
            title="Copiar resposta"
            className="mt-3 inline-flex items-center gap-2 kicker hover:text-gold transition-colors"
          >
            {copiado ? <Check className="size-3" aria-hidden="true" /> : <Copy className="size-3" aria-hidden="true" />}
            {copiado ? "Copiado" : "Copiar"}
          </button>
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
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gold/20">
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
