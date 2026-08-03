// Runtimes Node < 22 (ex.: funções serverless da Netlify) não têm WebSocket
// global. O cliente Supabase cria um RealtimeClient no construtor e lança
// erro sem esse global — o que derrubava o carregamento do conteúdo do dia.
if (typeof (globalThis as { WebSocket?: unknown }).WebSocket === "undefined") {
  try {
    const { WebSocket } = require("ws") as { WebSocket: unknown };
    (globalThis as { WebSocket?: unknown }).WebSocket = WebSocket;
  } catch {
    /* runtime sem 'ws' (Workers já tem WebSocket nativo) */
  }
}

export {};
