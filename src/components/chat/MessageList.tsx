import { memo, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "../../lib/types/chat";

interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessageItem = memo(({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

  return (
    <div
      className={`flex animate-content-fade ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed transition-smooth ${
          isUser
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
