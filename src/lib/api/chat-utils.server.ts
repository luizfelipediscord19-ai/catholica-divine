import { SophiaMode } from "../types/chat";

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
    const allowedDomains = [
      "localhost",
      ".lovable.app",
      ".lovableproject.com",
      ".lovable.dev"
    ];
    return allowedDomains.some(domain => 
      hostname === domain || hostname.endsWith(domain)
    );
  } catch {
    return false;
  }
}

export function handleChatError(err: unknown): Response {
  console.error("[AI_CHAT_ERROR]", err);
  const message = err instanceof Error ? err.message : "Erro interno no servidor";
  
  let status = 500;
  let userMessage = "Erro no processamento da IA: " + message;

  if (message.includes("429")) {
    status = 429;
    userMessage = "Muitas requisições. Aguarde um instante e tente novamente.";
  } else if (message.includes("402")) {
    status = 402;
    userMessage = "Créditos de IA esgotados. Adicione créditos no painel da Lovable.";
  }
  
  return new Response(userMessage, { 
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
