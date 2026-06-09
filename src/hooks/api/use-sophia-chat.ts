import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SophiaMode } from "../lib/types/chat";
import { useMemo } from "react";

/**
 * Hook customizado para encapsular a lógica de comunicação com a IA Sophia.
 * Utiliza TanStack Query (via ai-sdk) para gerenciamento de estado e cache.
 */
export function useSophiaChat(mode: SophiaMode = "geral") {
  const transport = useMemo(() => new DefaultChatTransport({
    api: "/api/chat",
    body: { mode },
  }), [mode]);

  const chat = useChat({
    transport,
    // IDs de mensagens estáveis para evitar re-renders desnecessários
    generateId: () => crypto.randomUUID(),
  });

  return chat;
}
