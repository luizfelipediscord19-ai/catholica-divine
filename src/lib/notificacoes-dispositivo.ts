/**
 * Notificações do sistema (telefone e desktop).
 *
 * Usa a Notification API. No celular, o alerta só aparece fora do navegador
 * quando existe um service worker ativo — por isso preferimos
 * `registration.showNotification`, que é o único caminho aceito no Android e
 * no iOS (a partir do iOS 16.4, com o app instalado na tela de início).
 */

import type { Notificacao } from "@/lib/notificacoes";
import { cancelarAvisosServidor, inscreverAvisosServidor } from "@/lib/push/assinar";

const CHAVE = "portal:notificacoes-dispositivo";

export type SuporteNotificacao = "indisponivel" | "bloqueado" | "pendente" | "liberado";

export function suportaNotificacoesDispositivo() {
  return typeof window !== "undefined" && "Notification" in window;
}

export function estadoNotificacoesDispositivo(): SuporteNotificacao {
  if (!suportaNotificacoesDispositivo()) return "indisponivel";
  if (Notification.permission === "denied") return "bloqueado";
  if (Notification.permission === "granted") return ativadoPeloUsuario() ? "liberado" : "pendente";
  return "pendente";
}

export function ativadoPeloUsuario() {
  try {
    return localStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
}

function definirAtivado(valor: boolean) {
  try {
    localStorage.setItem(CHAVE, valor ? "1" : "0");
  } catch {
    /* navegação privada */
  }
}

/** Pede permissão ao usuário e liga o espelhamento no aparelho. */
export async function ativarNotificacoesDispositivo(): Promise<SuporteNotificacao> {
  if (!suportaNotificacoesDispositivo()) return "indisponivel";
  if (Notification.permission === "denied") return "bloqueado";

  const permissao =
    Notification.permission === "granted" ? "granted" : await Notification.requestPermission();

  if (permissao !== "granted") return permissao === "denied" ? "bloqueado" : "pendente";

  definirAtivado(true);
  // Inscreve o aparelho nos avisos enviados pelo servidor: é o que faz o
  // lembrete chegar no telefone mesmo com o site fechado.
  const noServidor = await inscreverAvisosServidor();
  await mostrarNoDispositivo({
    titulo: "Notificações ativadas",
    mensagem: noServidor
      ? "Os lembretes chegarão no seu aparelho mesmo com o site fechado."
      : "Você será avisado sobre orações, leituras e conquistas.",
    tipo: "sistema",
  });
  return "liberado";
}

export function desativarNotificacoesDispositivo() {
  definirAtivado(false);
  void cancelarAvisosServidor();
}

/** Exibe uma notificação no aparelho, se o usuário autorizou. */
export async function mostrarNoDispositivo(
  n: Pick<Notificacao, "titulo" | "tipo"> & { mensagem?: string; href?: string },
) {
  if (!suportaNotificacoesDispositivo()) return;
  if (Notification.permission !== "granted" || !ativadoPeloUsuario()) return;
  // Sem sentido interromper quem já está olhando a tela.
  if (typeof document !== "undefined" && document.visibilityState === "visible") return;

  const opcoes: NotificationOptions = {
    body: n.mensagem,
    icon: "/pwa-192.png",
    badge: "/pwa-192.png",
    tag: `portal-${n.tipo}`,
    data: { href: n.href ?? "/painel" },
  };

  try {
    if ("serviceWorker" in navigator) {
      const registro = await navigator.serviceWorker.getRegistration();
      if (registro) {
        await registro.showNotification(n.titulo, opcoes);
        return;
      }
    }
    new Notification(n.titulo, opcoes);
  } catch {
    /* aparelho recusou a exibição */
  }
}
