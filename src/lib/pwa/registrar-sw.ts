/**
 * Registro único e protegido do service worker.
 *
 * Nunca registra em desenvolvimento, dentro de iframe ou nos domínios de
 * pré-visualização da Lovable — nesses casos remove registros antigos.
 * `?sw=off` funciona como interruptor de emergência.
 */

const CAMINHO_SW = "/sw.js";

function contextoProibido(): boolean {
  if (typeof window === "undefined") return true;
  if (!import.meta.env.PROD) return true;
  if (window.self !== window.top) return true;

  const h = window.location.hostname;
  if (h.startsWith("id-preview--") || h.startsWith("preview--")) return true;
  if (h === "lovableproject.com" || h.endsWith(".lovableproject.com")) return true;
  if (h === "lovableproject-dev.com" || h.endsWith(".lovableproject-dev.com")) return true;
  if (h === "beta.lovable.dev" || h.endsWith(".beta.lovable.dev")) return true;
  if (new URLSearchParams(window.location.search).get("sw") === "off") return true;

  return false;
}

async function removerRegistros() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const registros = await navigator.serviceWorker.getRegistrations();
  await Promise.allSettled(
    registros
      .filter((r) => (r.active?.scriptURL ?? r.installing?.scriptURL ?? "").includes(CAMINHO_SW))
      .map((r) => r.unregister()),
  );
}

export type ControleSW = {
  /** Aplica a versão em espera e recarrega a página. */
  atualizar: () => void;
};

/**
 * Registra o service worker e chama `onNovaVersao` quando há uma versão nova
 * aguardando ativação.
 */
export async function registrarServiceWorker(
  onNovaVersao: (controle: ControleSW) => void,
): Promise<void> {
  if (contextoProibido()) {
    await removerRegistros().catch(() => {});
    return;
  }
  if (!("serviceWorker" in navigator)) return;

  try {
    const registro = await navigator.serviceWorker.register(CAMINHO_SW, { scope: "/" });

    const anunciar = (esperando: ServiceWorker | null) => {
      if (!esperando) return;
      onNovaVersao({
        atualizar: () => {
          esperando.postMessage({ type: "SKIP_WAITING" });
          const recarregar = () => window.location.reload();
          navigator.serviceWorker.addEventListener("controllerchange", recarregar, { once: true });
          // Rede lenta: recarrega mesmo assim depois de um instante.
          window.setTimeout(recarregar, 2500);
        },
      });
    };

    if (registro.waiting && navigator.serviceWorker.controller) anunciar(registro.waiting);

    registro.addEventListener("updatefound", () => {
      const instalando = registro.installing;
      if (!instalando) return;
      instalando.addEventListener("statechange", () => {
        if (instalando.state === "installed" && navigator.serviceWorker.controller) {
          anunciar(registro.waiting ?? instalando);
        }
      });
    });

    // Procura atualizações ao voltar para a aba.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") registro.update().catch(() => {});
    });
    window.setInterval(() => registro.update().catch(() => {}), 60 * 60 * 1000);
  } catch {
    /* registro indisponível: o site segue funcionando normalmente */
  }
}
