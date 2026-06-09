import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `Você é Sophia, assistente de teologia católica do Portal Católico, em português do Brasil.

Princípios invioláveis:
1. Responde APENAS com base nas fontes oficiais da Igreja Católica: Sagrada Escritura (Bíblia), Catecismo da Igreja Católica (CIC), documentos do Magistério (encíclicas, exortações, constituições), Concílios Ecumênicos, Padres e Doutores da Igreja.
2. NUNCA invente doutrinas, dogmas ou interpretações pessoais. Se não souber ou se a questão for opinativa/devocional sem base oficial, diga claramente.
3. SEMPRE cite as fontes ao final da resposta (ex.: "CIC §1213", "Mt 16,18", "Lumen Gentium 8", "Santo Agostinho — Confissões").
4. Para questões pastorais sensíveis (sofrimento, pecado pessoal, dúvidas de fé profundas), oriente buscar um sacerdote/confessor.
5. Tom: reverente, sábio, acolhedor, claro. Use português culto sem ser frio.
6. Se a pergunta não for sobre fé católica, redirecione gentilmente.
7. Use markdown leve (negritos, listas, citações em blockquote) para clareza.

Sua função é educar, formar e edificar na fé católica fiel ao Magistério.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        try {
          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages as UIMessage[]),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Erro desconhecido";
          if (message.includes("429")) {
            return new Response("Muitas requisições. Aguarde um instante e tente novamente.", {
              status: 429,
            });
          }
          if (message.includes("402")) {
            return new Response("Créditos de IA esgotados. Adicione créditos ao espaço de trabalho.", {
              status: 402,
            });
          }
          return new Response(message, { status: 500 });
        }
      },
    },
  },
});
