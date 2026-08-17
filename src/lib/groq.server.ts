import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Groq expõe uma API compatível com OpenAI em /openai/v1.
// A chave (GROQ_API_KEY) é lida dentro do handler e nunca chega ao cliente.
export function createGroqProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "groq",
    baseURL: "https://api.groq.com/openai/v1",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

// llama-3.3-70b-versatile foi desativado pela Groq; gpt-oss-120b é o substituto atual.
export const GROQ_MODEL = "openai/gpt-oss-120b";
