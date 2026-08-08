import { createServerFn } from "@tanstack/react-start";

export type Verificacao = {
  chave: string;
  titulo: string;
  ok: boolean;
  detalhe: string;
};

/**
 * Health check interno do backend do painel espiritual.
 * Nunca devolve chaves — apenas presença, formato e o resultado das
 * consultas mínimas (identidade, favoritos e progresso de leitura).
 */
export const verificarBackendFn = createServerFn({ method: "POST" }).handler(async () => {
  const { verificarBackend } = await import("./portal/diagnostico.server");
  return verificarBackend();
});
