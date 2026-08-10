/*
 * Avisos enviados pelo servidor (Web Push).
 *
 * Este arquivo é carregado dentro do service worker gerado pelo build
 * (workbox `importScripts`). Ele é o que permite o aviso aparecer no telefone
 * mesmo com o site fechado.
 */

self.addEventListener("push", (event) => {
  let dados = {};
  try {
    dados = event.data ? event.data.json() : {};
  } catch {
    dados = { titulo: "Portal Católico", mensagem: event.data ? event.data.text() : "" };
  }

  const titulo = dados.titulo || "Portal Católico";
  const href = dados.href || "/painel";

  event.waitUntil(
    self.registration.showNotification(titulo, {
      body: dados.mensagem || "",
      icon: "/pwa-192.png",
      badge: "/pwa-192.png",
      tag: dados.tag || `portal-${dados.tipo || "sistema"}`,
      renotify: true,
      data: { href },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const href = (event.notification.data && event.notification.data.href) || "/painel";

  event.waitUntil(
    (async () => {
      const destino = new URL(href, self.location.origin).href;
      const janelas = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const janela of janelas) {
        if (janela.url === destino && "focus" in janela) return janela.focus();
      }
      for (const janela of janelas) {
        if ("navigate" in janela) {
          await janela.focus();
          return janela.navigate(destino);
        }
      }
      return self.clients.openWindow(destino);
    })(),
  );
});
