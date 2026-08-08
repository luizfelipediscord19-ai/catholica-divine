// Captura o evento `beforeinstallprompt` o mais cedo possível: o navegador
// costuma dispará-lo antes de o React montar o banner, e o evento não repete.

export type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: string }>;
};

let eventoCapturado: PromptEvent | null = null;
const ouvintes = new Set<(e: PromptEvent | null) => void>();

export function iniciarCapturaInstalacao() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __pwaCapturaIniciada?: boolean };
  if (w.__pwaCapturaIniciada) return;
  w.__pwaCapturaIniciada = true;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoCapturado = e as PromptEvent;
    ouvintes.forEach((fn) => fn(eventoCapturado));
  });

  window.addEventListener("appinstalled", () => {
    eventoCapturado = null;
    ouvintes.forEach((fn) => fn(null));
  });
}

export function obterPromptInstalacao() {
  return eventoCapturado;
}

export function ouvirPromptInstalacao(fn: (e: PromptEvent | null) => void) {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

/** Reconhece telefones e tablets pelo user agent, ponteiro e tamanho de tela. */
export function ehDispositivoMovel() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & {
    userAgentData?: { mobile?: boolean; platform?: string };
    maxTouchPoints?: number;
  };
  const ua = nav.userAgent || "";

  if (nav.userAgentData?.mobile) return true;

  const uaMovel =
    /Android|iPhone|iPod|iPad|webOS|BlackBerry|IEMobile|Opera Mini|Mobile Safari|Silk|Kindle/i.test(ua) ||
    (/Macintosh/.test(ua) && (nav.maxTouchPoints ?? 0) > 1);
  if (uaMovel) return true;

  // Sem pistas no UA: aceita telas de toque estreitas (Android com UA reduzido).
  const toqueGrosso = window.matchMedia("(pointer: coarse)").matches;
  const semHover = window.matchMedia("(hover: none)").matches;
  const telaEstreita = Math.min(window.screen?.width || window.innerWidth, window.innerWidth) <= 900;
  return toqueGrosso && semHover && telaEstreita;
}

export function ehIos() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { maxTouchPoints?: number };
  const ua = nav.userAgent || "";
  return (
    /iPhone|iPod|iPad/i.test(ua) ||
    (/Macintosh/.test(ua) && (nav.maxTouchPoints ?? 0) > 1)
  );
}

export function jaInstalado() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}
