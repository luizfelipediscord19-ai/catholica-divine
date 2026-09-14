import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { ChatRequestSchema } from "../../lib/types/chat";
import {
  isAllowedBrowserRequest,
  handleChatError,
  cabecalhosCors,
  comCors,
} from "../../lib/api/chat-utils.server";
import { SYSTEM_PROMPT, SYSTEM_PROMPT_COMPACTO, COROINHAS_PROMPT } from "../../lib/prompts/sophia";
import {
  createLovableResponsesProvider,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "../../lib/ai-gateway.server";

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

        const { chaveCliente, dentroDoLimitePersistido } =
          await import("../../lib/seguranca/limite.server");
        const cliente = chaveCliente(request);

        // 20 mensagens por minuto por origem (contagem no banco).
        if (!(await dentroDoLimitePersistido("chat", cliente, 20, 60_000))) {
          return comCors(
            new Response("Muitas perguntas em pouco tempo. Aguarde um instante e tente de novo.", {
              status: 429,
              headers: { "retry-after": "30" },
            }),
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
          const gatewayKey = process.env["LOVABLE_API_KEY"];

          if (!gatewayKey) {
            return comCors(
              new Response(
                "Assistente indisponível: nenhuma chave de IA configurada no servidor.",
                { status: 500 },
              ),
              request,
            );
          }

          const systemPrompt =
            mode === "coroinhas"
              ? COROINHAS_PROMPT
              : messages.length > 40
                ? SYSTEM_PROMPT_COMPACTO
                : SYSTEM_PROMPT;
          const orcamentoEntradaChars = 160_000 - systemPrompt.length;

          const textoDe = (m: UIMessage) =>
            (m.parts ?? [])
              .filter((p): p is { type: "text"; text: string } => p.type === "text")
              .map((p) => p.text)
              .join(" ");

          // A conversa completa é reenviada: o gateway não guarda estado entre turnos.
          const mensagens = (messages as UIMessage[])
            .map((m) => ({
              ...m,
              parts: (m.parts ?? []).filter((p) => p.type === "text" || p.type === "file"),
            }))
            .filter((m) => (m.parts ?? []).length > 0) as UIMessage[];

          const charsHistorico = mensagens.reduce((t, m) => t + textoDe(m).length, 0);

          // Aterramento local: injeta o acervo real do portal ligado à pergunta.
          // Incluímos as últimas mensagens do usuário para que perguntas curtas
          // de continuação ("e o purgatório?") mantenham o assunto anterior.
          const perguntasUsuario = mensagens
            .filter((m) => m.role === "user")
            .slice(-3)
            .map(textoDe)
            .filter((t) => t.trim().length > 0);

          const textoPergunta = perguntasUsuario.join(" \n ");

          // O que resta do orçamento depois do prompt e do histórico vai para o contexto.
          const espacoContexto = Math.max(
            0,
            orcamentoEntradaChars - systemPrompt.length - charsHistorico,
          );

          let contexto = "";
          if (textoPergunta.trim().length > 2 && espacoContexto > 800) {
            const { contextoDoPortal } = await import("../../lib/prompts/contexto.server");
            const completo = contextoDoPortal(textoPergunta);
            contexto =
              completo.length > espacoContexto
                ? `${completo.slice(0, espacoContexto)}\n(…contexto truncado)`
                : completo;
          }

          const initialRunId = getLovableAiGatewayRunId(request);
          const gateway = createLovableResponsesProvider(gatewayKey, initialRunId);

          const result = streamText({
            model: gateway.model,
            system: systemPrompt + contexto,
            messages: await convertToModelMessages(mensagens),
            abortSignal: request.signal,
            providerOptions: {
              openai: {
                store: false,
                include: ["reasoning.encrypted_content"],
                forceReasoning: true,
                reasoningEffort: "medium",
                reasoningSummary: "auto",
              },
            },
          });

          const response = result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
            sendReasoning: true,
            headers: getLovableAiGatewayResponseHeaders({
              ...cabecalhosCors(request),
              ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
            }),
          });
          return withLovableAiGatewayRunIdHeader(response, gateway, cabecalhosCors(request));
        } catch (err) {
          return comCors(handleChatError(err), request);
        }
      },
    },
  },
});
