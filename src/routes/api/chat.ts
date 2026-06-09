import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { ChatRequestSchema } from "../../lib/types/chat";
import { isAllowedBrowserRequest, handleChatError } from "../../lib/api/chat-utils.server";
import { SYSTEM_PROMPT, COROINHAS_PROMPT } from "../../lib/prompts/sophia";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        if (!isAllowedBrowserRequest(request)) {
          return new Response("Forbidden", { status: 403 });
        }

        try {
          const body = await request.json();
          const parsed = ChatRequestSchema.safeParse(body);
          
          if (!parsed.success) {
            return new Response(`Invalid request: ${parsed.error.message}`, { status: 400 });
          }

          const { messages, mode } = parsed.data;
          const apiKey = process.env.LOVABLE_API_KEY;

          if (!apiKey) {
            return new Response("AI Credentials Missing", { status: 500 });
          }

          const systemPrompt = mode === "coroinhas" ? COROINHAS_PROMPT : SYSTEM_PROMPT;
          const gateway = createLovableAiGatewayProvider(apiKey);

          const result = streamText({
            model: gateway("google/gemini-2.0-flash-exp"),
            system: systemPrompt,
            messages: await convertToModelMessages(messages as UIMessage[]),
            // Otimização de rede: reduzir frequência de chunks se necessário
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
