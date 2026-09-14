import { createOpenAI } from "@ai-sdk/openai";

const CABECALHO_RUN_ID = "X-Lovable-AIG-Run-ID";

export function getLovableAiGatewayRunId(request: Request) {
  return request.headers.get(CABECALHO_RUN_ID)?.trim() || undefined;
}

export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim() || undefined;
  let resolver: (value: string | undefined) => void = () => {};
  let resolvido = false;
  const pronto = new Promise<string | undefined>((resolve) => { resolver = resolve; });
  const publicar = (value?: string) => {
    const recebido = value?.trim() || undefined;
    if (!runId && recebido) runId = recebido;
    if (!resolvido) { resolvido = true; resolver(runId); }
  };
  if (runId) publicar(runId);

  return {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(CABECALHO_RUN_ID)) headers.set(CABECALHO_RUN_ID, runId);
      try {
        const response = await fetch(input, { ...init, headers });
        publicar(response.headers.get(CABECALHO_RUN_ID) ?? undefined);
        return response;
      } catch (error) {
        publicar(undefined);
        throw error;
      }
    },
    getRunId: () => runId,
    waitForRunId: () => (runId ? Promise.resolve(runId) : pronto),
  };
}

export function createLovableResponsesProvider(apiKey: string, initialRunId?: string) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });
  return { model: provider.responses("openai/gpt-6-astra"), ...runIdFetch };
}

export function getLovableAiGatewayResponseHeaders(init?: HeadersInit) {
  const headers = new Headers(init);
  const expostos = new Set(
    (headers.get("Access-Control-Expose-Headers") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
  headers.forEach((_, name) => {
    if (name.toLowerCase().startsWith("x-lovable-aig-")) expostos.add(name);
  });
  if (expostos.size) headers.set("Access-Control-Expose-Headers", [...expostos].join(", "));
  return headers;
}

export async function withLovableAiGatewayRunIdHeader(
  response: Response,
  gateway: { getRunId: () => string | undefined; waitForRunId: () => Promise<string | undefined> },
  init?: HeadersInit,
) {
  const headers = getLovableAiGatewayResponseHeaders(response.headers);
  new Headers(init).forEach((value, name) => headers.set(name, value));
  if (!response.body) {
    const runId = gateway.getRunId();
    if (runId) headers.set(CABECALHO_RUN_ID, runId);
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
  const reader = response.body.getReader();
  const primeiro = reader.read();
  const runId = await gateway.waitForRunId();
  if (runId) headers.set(CABECALHO_RUN_ID, runId);
  const body = new ReadableStream({
    async start(controller) {
      try {
        const inicial = await primeiro;
        if (!inicial.done) controller.enqueue(inicial.value);
        while (!inicial.done) {
          const parte = await reader.read();
          if (parte.done) break;
          controller.enqueue(parte.value);
        }
        controller.close();
      } catch (error) { controller.error(error); }
    },
    cancel(reason) { return reader.cancel(reason); },
  });
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

export const GATEWAY_MODEL = "openai/gpt-6-astra";