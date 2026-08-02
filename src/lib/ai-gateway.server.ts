import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Fallback: Lovable AI Gateway (usado quando GROQ_API_KEY não está definida
// no ambiente de deploy). A chave nunca chega ao cliente.
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable-gateway",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
    },
  });
}

export const GATEWAY_MODEL = "google/gemini-3.6-flash";
