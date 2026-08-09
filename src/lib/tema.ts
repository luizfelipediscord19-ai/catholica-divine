export type Tema = "claro" | "escuro";

const CHAVE = "portal:tema";

/** Script inline aplicado antes da hidratação para evitar piscar de tema. */
export const SCRIPT_TEMA = `(function(){try{var t=localStorage.getItem("${CHAVE}");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"claro":"escuro";}document.documentElement.classList.toggle("light",t==="claro");document.documentElement.dataset.tema=t;}catch(e){}})();`;

export function lerTema(): Tema {
  if (typeof document === "undefined") return "escuro";
  return document.documentElement.classList.contains("light") ? "claro" : "escuro";
}

export function aplicarTema(tema: Tema) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("light", tema === "claro");
  document.documentElement.dataset.tema = tema;
  try {
    localStorage.setItem(CHAVE, tema);
  } catch {
    /* armazenamento indisponível */
  }
}
