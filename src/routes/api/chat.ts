import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { ChatRequestSchema } from "../../lib/types/chat";
import { isAllowedBrowserRequest, handleChatError } from "../../lib/api/chat-utils.server";
import { SYSTEM_PROMPT, COROINHAS_PROMPT } from "../../lib/prompts/sophia";
import { createLovableAiGatewayProvider } from "../../lib/ai-gateway.server";

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
          const apiKey = process.env.GROQ_API_KEY;

          if (!apiKey) {
            return new Response("GROQ_API_KEY não configurada", { status: 500 });
          }

          const systemPrompt = mode === "coroinhas" ? COROINHAS_PROMPT : SYSTEM_PROMPT;

          const groq = createOpenAICompatible({
            name: "groq",
            baseURL: "https://api.groq.com/openai/v1",
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });

          const result = streamText({
            model: groq("llama-3.3-70b-versatile"),
            system: systemPrompt,
            messages: await convertToModelMessages(messages as UIMessage[]),
            temperature: 0.7,
            maxOutputTokens: 1500,
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
