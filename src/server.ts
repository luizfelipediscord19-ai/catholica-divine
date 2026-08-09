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
async function applySecurityHeaders(response: Response, nonce?: string): Promise<Response> {
  const newHeaders = new Headers(response.headers);

  // O navegador precisa falar com o backend (contas, fórum, painel) e com a IA.
  const backend = process.env["VITE_SUPABASE_URL"] ?? process.env["SUPABASE_URL"] ?? "";
  const backendWs = backend.replace(/^https:/, "wss:");
  const conexoes = ["'self'", "https://api.groq.com", backend, backendWs]
    .filter(Boolean)
    .join(" ");

  // Em produção não há necessidade de eval nem de inline liberado: cada <script>
  // do documento recebe um nonce por requisição e 'strict-dynamic' cobre os
  // módulos carregados por eles. O dev server (HMR) ainda precisa do modo antigo.
  const dev = process.env["NODE_ENV"] !== "production";
  const scripts = dev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
    : nonce
      ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; `
      : "script-src 'self'; ";

  const comuns =
    "default-src 'self'; " +
    "base-uri 'self'; " +
    "object-src 'none'; " +
    "form-action 'self'; " +
    "font-src 'self' data: https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    `connect-src ${conexoes}; ` +
    "frame-src 'none'; " +
    "worker-src 'self' blob:; " +
    "manifest-src 'self'; " +
    "frame-ancestors 'self' https://*.lovable.app https://*.lovable.dev; " +
    "upgrade-insecure-requests;";

  // Content Security Policy (Strict but allows required fonts and AI gateway)
  newHeaders.set(
    "Content-Security-Policy",
    comuns +
      " " +
      scripts +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  );

  // Modo report-only: política mais rígida (sem 'unsafe-inline' em estilos e
  // sem 'unsafe-eval') apenas monitorada, para medirmos o que ainda quebraria
  // antes de aplicá-la de verdade.
  const nonceRelatorio = nonce ? ` 'nonce-${nonce}' 'strict-dynamic'` : "";
  newHeaders.set(
    "Content-Security-Policy-Report-Only",
    comuns.replace("upgrade-insecure-requests;", "") +
      ` script-src 'self'${nonceRelatorio}; ` +
      "style-src 'self' https://fonts.googleapis.com; " +
      "style-src-attr 'unsafe-inline'; " +
      "require-trusted-types-for 'script'; " +
      "report-uri /api/public/csp-report; " +
      "report-to csp-endpoint;",
  );
  newHeaders.set(
    "Reporting-Endpoints",
    'csp-endpoint="/api/public/csp-report"',
  );




  // Prevention of Clickjacking
  newHeaders.set("X-Frame-Options", "SAMEORIGIN");

  // Prevent MIME sniffing
  newHeaders.set("X-Content-Type-Options", "nosniff");

  // Referrer Policy
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Recursos sensíveis do navegador ficam desligados.
  newHeaders.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), midi=()",
  );
  newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
  newHeaders.set("Cross-Origin-Resource-Policy", "same-origin");
  newHeaders.set("X-Permitted-Cross-Domain-Policies", "none");
  newHeaders.set("Origin-Agent-Cluster", "?1");
  newHeaders.set("X-DNS-Prefetch-Control", "off");
  newHeaders.set("X-Download-Options", "noopen");

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

/** Nonce aleatório por requisição (base64 curto). */
function gerarNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/=+$/, "");
}

/**
 * Aplica o nonce a todo <script> do documento HTML. Assim o CSP de produção
 * dispensa 'unsafe-inline' em script-src: só executa o que este servidor marcou.
 */
async function aplicarNonceNoHtml(
  response: Response,
  nonce: string,
): Promise<Response> {
  const tipo = response.headers.get("content-type") ?? "";
  if (!tipo.includes("text/html")) return response;

  const html = await response.text();
  const marcado = html.replace(/<script(?![^>]*\snonce=)/gi, `<script nonce="${nonce}"`);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(marcado, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const dev = process.env["NODE_ENV"] !== "production";
    const nonce = dev ? undefined : gerarNonce();
    try {
      await garantirWebSocket();
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalizedResponse = await normalizeCatastrophicSsrResponse(response);
      const comNonce = nonce
        ? await aplicarNonceNoHtml(normalizedResponse, nonce)
        : normalizedResponse;
      return await applySecurityHeaders(comNonce, nonce);
    } catch (error) {
      console.error(error);
      const errorResponse = new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
      const comNonce = nonce ? await aplicarNonceNoHtml(errorResponse, nonce) : errorResponse;
      return await applySecurityHeaders(comNonce, nonce);
    }
  },

};
