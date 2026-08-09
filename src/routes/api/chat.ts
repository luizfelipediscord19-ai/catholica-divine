import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { ChatRequestSchema } from "../../lib/types/chat";
import { isAllowedBrowserRequest, handleChatError } from "../../lib/api/chat-utils.server";
import { SYSTEM_PROMPT, COROINHAS_PROMPT } from "../../lib/prompts/sophia";
import { createGroqProvider, GROQ_MODEL } from "../../lib/groq.server";
import { createLovableAiGatewayProvider, GATEWAY_MODEL } from "../../lib/ai-gateway.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        if (!isAllowedBrowserRequest(request)) {
          return new Response("Forbidden", { status: 403 });
        }

        const { chaveCliente, dentroDoLimitePersistido } = await import(
          "../../lib/seguranca/limite.server"
        );
        // 20 mensagens por minuto por origem (contagem no banco).
        if (!(await dentroDoLimitePersistido("chat", chaveCliente(request), 20, 60_000))) {
          return new Response(
            "Muitas perguntas em pouco tempo. Aguarde um instante e tente de novo.",
            { status: 429, headers: { "retry-after": "30" } },
          );
        }


        try {
          const body = await request.json();
          const parsed = ChatRequestSchema.safeParse(body);

          if (!parsed.success) {
            return new Response(`Invalid request: ${parsed.error.message}`, { status: 400 });
          }

          const { messages, mode } = parsed.data;
          const groqKey = process.env.GROQ_API_KEY;
          const gatewayKey = process.env.LOVABLE_API_KEY;

          if (!groqKey && !gatewayKey) {
            return new Response(
              "Assistente indisponível: nenhuma chave de IA configurada no servidor.",
              { status: 500 },
            );
          }

          const systemPrompt = mode === "coroinhas" ? COROINHAS_PROMPT : SYSTEM_PROMPT;

          const model = groqKey
            ? createGroqProvider(groqKey)(GROQ_MODEL)
            : createLovableAiGatewayProvider(gatewayKey!)(GATEWAY_MODEL);

          const result = streamText({
            model,
            system: systemPrompt,
            messages: await convertToModelMessages(messages as UIMessage[]),
            temperature: 0.7,
            maxOutputTokens: 3000,
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (err) {
          return handleChatError(err);
        }
      },
    },
  },
});
