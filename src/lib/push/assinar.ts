/**
 * Inscrição do navegador nos avisos enviados pelo servidor (Web Push).
 *
 * É isso que faz o aviso chegar no telefone mesmo com o site fechado: o
 * service worker recebe a mensagem do servidor e mostra a notificação.
 */

import { chavePushFn, registrarPushFn, removerPushFn } from "@/lib/push.functions";
import { lerConfigTarefas } from "@/lib/tarefas-horarios";

function b64ParaBytes(base64url: string) {
  const base64 = (base64url + "=".repeat((4 - (base64url.length % 4)) % 4))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const bruto = atob(base64);
  return Uint8Array.from(bruto, (c) => c.charCodeAt(0));
}

function bytesParaB64(buffer: ArrayBuffer | null) {
  if (!buffer) return "";
  let texto = "";
  for (const byte of new Uint8Array(buffer)) texto += String.fromCharCode(byte);
  return btoa(texto).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function suportaPushServidor() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

async function registroSW() {
  if (!suportaPushServidor()) return null;
  try {
    return (await navigator.serviceWorker.getRegistration()) ?? null;
  } catch {
    return null;
  }
}

function corpo(assinatura: PushSubscription) {
  const json = assinatura.toJSON();
  return {
    endpoint: assinatura.endpoint,
    p256dh: json.keys?.["p256dh"] ?? bytesParaB64(assinatura.getKey("p256dh")),
    auth: json.keys?.["auth"] ?? bytesParaB64(assinatura.getKey("auth")),
    fusoOffset: new Date().getTimezoneOffset(),
    horarios: lerConfigTarefas() as unknown as Record<string, { hora: string; ativa: boolean }>,
  };
}

/**
 * Inscreve este aparelho nos avisos do servidor. Silencioso: se algo faltar
 * (service worker ainda não ativo, chave ausente), o portal segue com os
 * avisos internos.
 */
export async function inscreverAvisosServidor(): Promise<boolean> {
  const registro = await registroSW();
  if (!registro || Notification.permission !== "granted") return false;

  try {
    const { chave } = await chavePushFn();
    if (!chave) return false;

    const existente = await registro.pushManager.getSubscription();
    const assinatura =
      existente ??
      (await registro.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: b64ParaBytes(chave) as unknown as BufferSource,
      }));

    await registrarPushFn({ data: corpo(assinatura) });
    return true;
  } catch {
    return false;
  }
}

/** Atualiza no servidor os horários escolhidos, se o aparelho já está inscrito. */
export async function sincronizarHorariosServidor(): Promise<void> {
  const registro = await registroSW();
  if (!registro) return;
  try {
    const assinatura = await registro.pushManager.getSubscription();
    if (!assinatura) return;
    await registrarPushFn({ data: corpo(assinatura) });
  } catch {
    /* sem conexão: a próxima abertura sincroniza */
  }
}

/** Cancela a inscrição deste aparelho. */
export async function cancelarAvisosServidor(): Promise<void> {
  const registro = await registroSW();
  if (!registro) return;
  try {
    const assinatura = await registro.pushManager.getSubscription();
    if (!assinatura) return;
    await removerPushFn({ data: { endpoint: assinatura.endpoint } }).catch(() => {});
    await assinatura.unsubscribe().catch(() => {});
  } catch {
    /* nada a cancelar */
  }
}
