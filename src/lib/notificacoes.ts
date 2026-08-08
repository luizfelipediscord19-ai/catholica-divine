/** Tipos e utilitário global para disparar notificações internas do portal. */

export type TipoNotificacao =
  | "conquista"
  | "nivel"
  | "leitura"
  | "tarefa"
  | "oracao"
  | "nota"
  | "forum"
  | "sistema";

export type Notificacao = {
  id: string;
  tipo: TipoNotificacao;
  titulo: string;
  mensagem?: string;
  href?: string;
  /** Impede duplicatas (ex.: mesma tarefa no mesmo dia). */
  chave?: string;
  criadaEm: number;
  lida: boolean;
};

export type NovaNotificacao = Omit<Notificacao, "id" | "criadaEm" | "lida">;

export const EVENTO_NOTIFICAR = "portal:notificar";

/** Dispara uma notificação de qualquer lugar do app (sem precisar do contexto). */
export function notificar(nova: NovaNotificacao) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<NovaNotificacao>(EVENTO_NOTIFICAR, { detail: nova }));
}
