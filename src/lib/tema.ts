export type Tema = "escuro";

/**
 * O portal usa apenas o tema escuro (Noir & Ouro). O script inline garante que
 * nenhuma preferência antiga de tema claro continue aplicada no aparelho.
 */
export const SCRIPT_TEMA = `(function(){try{document.documentElement.classList.remove("light");document.documentElement.dataset.tema="escuro";localStorage.removeItem("portal:tema");}catch(e){}})();`;

export function lerTema(): Tema {
  return "escuro";
}
