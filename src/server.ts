import "./lib/error-capture";
import { garantirWebSocket } from "./lib/websocket-polyfill";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";


type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function applySecurityHeaders(response: Response): Promise<Response> {
  const newHeaders = new Headers(response.headers);

  // O navegador precisa falar com o backend (contas, fórum, painel) e com a IA.
  const backend = process.env["VITE_SUPABASE_URL"] ?? process.env["SUPABASE_URL"] ?? "";
  const backendWs = backend.replace(/^https:/, "wss:");
  const conexoes = ["'self'", "https://api.groq.com", backend, backendWs]
    .filter(Boolean)
    .join(" ");

  // Content Security Policy (Strict but allows required fonts and AI gateway)
  newHeaders.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "img-src 'self' data: https://*; " +
    `connect-src ${conexoes}; ` +
    "frame-ancestors 'self' https://*.lovable.app https://*.lovable.dev; " +
    "upgrade-insecure-requests;"
  );


  // Prevention of Clickjacking
  newHeaders.set("X-Frame-Options", "SAMEORIGIN");
  
  // Prevent MIME sniffing
  newHeaders.set("X-Content-Type-Options", "nosniff");
  
  // Referrer Policy
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // HSTS (Strict-Transport-Security) - 1 year
  newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      await garantirWebSocket();
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalizedResponse = await normalizeCatastrophicSsrResponse(response);
      return await applySecurityHeaders(normalizedResponse);
    } catch (error) {
      console.error(error);
      const errorResponse = new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
      return await applySecurityHeaders(errorResponse);
    }
  },
};
