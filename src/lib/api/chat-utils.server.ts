import { SophiaMode } from "../types/chat";

const DOMINIOS_PERMITIDOS = [
  "localhost",
  ".lovable.app",
  ".lovableproject.com",
  ".lovable.dev",
];

export function isAllowedBrowserRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const secFetchSite = request.headers.get("sec-fetch-site");

  // Allow same-origin/site or requests with no fetch metadata (direct nav)
  if (secFetchSite === "same-origin" || secFetchSite === "same-site" || secFetchSite === "none") {
    return true;
  }

  const source = origin || referer;
  if (!source) return true;

  try {
    const hostname = new URL(source).hostname;
    return DOMINIOS_PERMITIDOS.some((domain) => hostname === domain || hostname.endsWith(domain));
  } catch {
    return false;
  }
}

function origemPermitida(origin: string | null): string | null {
  if (!origin) return null;
  try {
    const hostname = new URL(origin).hostname;
    return DOMINIOS_PERMITIDOS.some((d) => hostname === d || hostname.endsWith(d)) ? origin : null;
  } catch {
    return null;
  }
}

/**
 * CORS restrito: apenas o próprio site (e os domínios de pré-visualização) são
 * autorizados. Nunca usamos `Access-Control-Allow-Origin: *`, para que nenhum
 * site de terceiros consuma a IA em nome do portal.
 */
export function cabecalhosCors(request: Request): Record<string, string> {
  const permitida = origemPermitida(request.headers.get("origin"));
  const base: Record<string, string> = {
    Vary: "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
  };
  if (permitida) base["Access-Control-Allow-Origin"] = permitida;
  return base;
}

/** Acrescenta os cabeçalhos de CORS a qualquer resposta, inclusive as de erro. */
export function comCors(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  for (const [chave, valor] of Object.entries(cabecalhosCors(request))) headers.set(chave, valor);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function handleChatError(err: unknown): Response {
  console.error("[AI_CHAT_ERROR]", err);
  const message = err instanceof Error ? err.message : "Erro interno no servidor";

  let status = 500;
  // Não devolvemos a mensagem crua do provedor: ela pode revelar detalhes internos.
  let userMessage = "Não foi possível responder agora. Tente novamente em instantes.";

  if (/too large|413|context_length|tokens per minute|TPM/i.test(message)) {
    status = 429;
    userMessage =
      "A conversa ficou longa demais para a Sophia responder agora. Comece uma nova conversa ou faça a pergunta de forma mais curta.";
  } else if (message.includes("429")) {
    status = 429;
    userMessage = "Muitas requisições. Aguarde um instante e tente novamente.";
  } else if (message.includes("402")) {
    status = 402;
    userMessage = "Créditos de IA esgotados. Adicione créditos no painel da Lovable.";
  }

  return new Response(userMessage, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
