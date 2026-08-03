// Runtimes Node < 22 (ex.: funções serverless da Netlify) não têm WebSocket
// global. O cliente Supabase cria um RealtimeClient no construtor e lança
// erro sem esse global — o que derrubava o carregamento do conteúdo do dia.
let pronto: Promise<void> | undefined;

export function garantirWebSocket(): Promise<void> {
  if (!pronto) {
    pronto = (async () => {
      const alvo = globalThis as { WebSocket?: unknown };
      if (typeof alvo.WebSocket !== "undefined") return;
      try {
        const mod = (await import("ws")) as unknown as { WebSocket?: unknown; default?: unknown };
        alvo.WebSocket = mod.WebSocket ?? mod.default;
      } catch {
        /* runtime sem 'ws' (Workers já traz WebSocket nativo) */
      }
    })();
  }
  return pronto;
}
