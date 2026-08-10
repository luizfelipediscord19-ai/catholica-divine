import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { ChatRequestSchema } from "../../lib/types/chat";
import {
  isAllowedBrowserRequest,
  handleChatError,
  cabecalhosCors,
  comCors,
} from "../../lib/api/chat-utils.server";
import { SYSTEM_PROMPT, COROINHAS_PROMPT } from "../../lib/prompts/sophia";
import { createGroqProvider, GROQ_MODEL } from "../../lib/groq.server";
import { createLovableAiGatewayProvider, GATEWAY_MODEL } from "../../lib/ai-gateway.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      // Pré-voo do navegador: responde só com CORS restrito ao próprio domínio.
      OPTIONS: async ({ request }: { request: Request }) =>
        new Response(null, { status: 204, headers: cabecalhosCors(request) }),

      POST: async ({ request }: { request: Request }) => {
        if (!isAllowedBrowserRequest(request)) {
          return comCors(new Response("Forbidden", { status: 403 }), request);
        }

        const { chaveCliente, dentroDoLimitePersistido } = await import(
          "../../lib/seguranca/limite.server"
        );
        const cliente = chaveCliente(request);

        // 20 mensagens por minuto por origem (contagem no banco).
        if (!(await dentroDoLimitePersistido("chat", cliente, 20, 60_000))) {
          return comCors(
            new Response(
              "Muitas perguntas em pouco tempo. Aguarde um instante e tente de novo.",
              { status: 429, headers: { "retry-after": "30" } },
            ),
            request,
          );
        }

        // Teto diário por visitante: impede que um script consuma a cota inteira.
        if (!(await dentroDoLimitePersistido("chat-dia", cliente, 120, 86_400_000))) {
          return comCors(
            new Response("Você atingiu o limite diário de perguntas à Sophia. Volte amanhã.", {
              status: 429,
              headers: { "retry-after": "3600" },
            }),
            request,
          );
        }

        // Teto diário global: protege o crédito mensal de IA do portal.
        if (!(await dentroDoLimitePersistido("chat-global", "todos", 3000, 86_400_000))) {
          return comCors(
            new Response("A Sophia atingiu o limite de uso de hoje. Tente novamente amanhã.", {
              status: 429,
              headers: { "retry-after": "3600" },
            }),
            request,
          );
        }

        try {
          const body = await request.json();
          const parsed = ChatRequestSchema.safeParse(body);

          if (!parsed.success) {
            return comCors(new Response("Requisição inválida.", { status: 400 }), request);
          }

          const { messages, mode } = parsed.data;
          // As chaves vivem apenas no servidor (variáveis de ambiente), nunca no navegador.
          const groqKey = process.env["GROQ_API_KEY"];
          const gatewayKey = process.env["LOVABLE_API_KEY"];

          if (!groqKey && !gatewayKey) {
            return comCors(
              new Response(
                "Assistente indisponível: nenhuma chave de IA configurada no servidor.",
                { status: 500 },
              ),
              request,
            );
          }

          const systemPrompt = mode === "coroinhas" ? COROINHAS_PROMPT : SYSTEM_PROMPT;

          // Aterramento local: injeta o acervo real do portal ligado à pergunta.
          const ultimaPergunta = [...(messages as UIMessage[])]
            .reverse()
            .find((m) => m.role === "user");
          const textoPergunta = (ultimaPergunta?.parts ?? [])
            .filter((p): p is { type: "text"; text: string } => p.type === "text")
            .map((p) => p.text)
            .join(" ");

          let contexto = "";
          if (textoPergunta.trim().length > 2) {
            const { contextoDoPortal } = await import("../../lib/prompts/contexto.server");
            contexto = contextoDoPortal(textoPergunta);
          }

          const model = groqKey
            ? createGroqProvider(groqKey)(GROQ_MODEL)
            : createLovableAiGatewayProvider(gatewayKey!)(GATEWAY_MODEL);

          const result = streamText({
            model,
            system: systemPrompt + contexto,
            messages: await convertToModelMessages(messages as UIMessage[]),
            // Menos criatividade, mais fidelidade doutrinal e às citações.
            temperature: 0.45,
            topP: 0.9,
            maxOutputTokens: 3600,
          });


          return comCors(
            result.toUIMessageStreamResponse({
              originalMessages: messages as UIMessage[],
            }),
            request,
          );
        } catch (err) {
          return comCors(handleChatError(err), request);
        }
      },
    },
  },
});
