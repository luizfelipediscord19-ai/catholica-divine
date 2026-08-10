/**
 * Envio de avisos pelo servidor (Web Push com chaves VAPID).
 *
 * Server-only. Funciona no runtime de borda porque a assinatura e a
 * criptografia usam apenas Web Crypto.
 */

import { buildPushPayload } from "@block65/webcrypto-web-push";

export type DispositivoPush = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
};

export type AvisoPush = {
  titulo: string;
  mensagem?: string;
  href?: string;
  tipo?: string;
  tag?: string;
};

export function chavePublicaVapid() {
  return process.env["VAPID_PUBLIC_KEY"] ?? "";
}

function vapid() {
  const publicKey = process.env["VAPID_PUBLIC_KEY"];
  const privateKey = process.env["VAPID_PRIVATE_KEY"];
  const subject = process.env["VAPID_SUBJECT"] || "mailto:contato@portalcatolico.vercel.app";
  if (!publicKey || !privateKey) {
    throw new Error("Chaves de aviso ausentes (VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY).");
  }
  return { publicKey, privateKey, subject };
}

export type ResultadoEnvio = { ok: boolean; expirado: boolean; status: number };

/** Entrega um aviso a um aparelho. `expirado` indica inscrição a remover. */
export async function enviarPush(
  dispositivo: DispositivoPush,
  aviso: AvisoPush,
): Promise<ResultadoEnvio> {
  const assinatura = {
    endpoint: dispositivo.endpoint,
    expirationTime: null,
    keys: { p256dh: dispositivo.p256dh, auth: dispositivo.auth },
  };

  const payload = await buildPushPayload(
    { data: aviso, options: { ttl: 60 * 60 * 12, urgency: "normal" } },
    assinatura,
    vapid(),
  );

  try {
    const resposta = await fetch(dispositivo.endpoint, {
      method: payload.method,
      headers: payload.headers,
      body: payload.body as unknown as BodyInit,
    });
    return {
      ok: resposta.ok,
      expirado: resposta.status === 404 || resposta.status === 410,
      status: resposta.status,
    };
  } catch {
    return { ok: false, expirado: false, status: 0 };
  }
}
