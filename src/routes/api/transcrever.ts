import { createFileRoute } from "@tanstack/react-router";
import {
  isAllowedBrowserRequest,
  cabecalhosCors,
  comCors,
} from "../../lib/api/chat-utils.server";

/** Limite de tamanho do áudio recebido (~1 min de fala em opus/webm). */
const MAX_BYTES = 4 * 1024 * 1024;

/**
 * Transcrição de voz da Sophia (ditado).
 * O áudio é gravado no navegador e transcrito no servidor pelo Whisper
 * da Groq — a chave nunca chega ao cliente.
 */
export const Route = createFileRoute("/api/transcrever")({
  server: {
    handlers: {
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

        // 12 ditados por minuto e 150 por dia por visitante.
        if (!(await dentroDoLimitePersistido("voz", cliente, 12, 60_000))) {
          return comCors(
            new Response("Muitos ditados em pouco tempo. Aguarde um instante.", {
              status: 429,
              headers: { "retry-after": "30" },
            }),
            request,
          );
        }
        if (!(await dentroDoLimitePersistido("voz-dia", cliente, 150, 86_400_000))) {
          return comCors(
            new Response("Você atingiu o limite diário de ditados por voz.", {
              status: 429,
              headers: { "retry-after": "3600" },
            }),
            request,
          );
        }

        const apiKey = process.env["GROQ_API_KEY"];
        if (!apiKey) {
          return comCors(
            new Response("Transcrição de voz indisponível no servidor.", { status: 503 }),
            request,
          );
        }

        try {
          const entrada = await request.formData();
          const audio = entrada.get("audio");

          if (!(audio instanceof File) || audio.size === 0) {
            return comCors(new Response("Áudio ausente.", { status: 400 }), request);
          }
          if (audio.size > MAX_BYTES) {
            return comCors(
              new Response("Áudio muito longo. Fale por até um minuto.", { status: 413 }),
              request,
            );
          }

          const envio = new FormData();
          envio.append("file", audio, audio.name || "ditado.webm");
          envio.append("model", "whisper-large-v3-turbo");
          envio.append("language", "pt");
          envio.append("response_format", "json");
          envio.append(
            "prompt",
            "Pergunta sobre a fé católica: Bíblia, Catecismo, santos, sacramentos, liturgia, orações.",
          );

          const resposta = await fetch(
            "https://api.groq.com/openai/v1/audio/transcriptions",
            {
              method: "POST",
              headers: { Authorization: `Bearer ${apiKey}` },
              body: envio,
            },
          );

          if (!resposta.ok) {
            console.error("[AI_VOZ_ERROR]", resposta.status, await resposta.text());
            return comCors(
              new Response("Não foi possível transcrever o áudio agora.", { status: 502 }),
              request,
            );
          }

          const dados = (await resposta.json()) as { text?: string };
          const texto = (dados.text ?? "").trim();

          return comCors(
            new Response(JSON.stringify({ texto }), {
              status: 200,
              headers: { "content-type": "application/json" },
            }),
            request,
          );
        } catch (err) {
          console.error("[AI_VOZ_ERROR]", err);
          return comCors(
            new Response("Erro ao processar o áudio.", { status: 500 }),
            request,
          );
        }
      },
    },
  },
});
