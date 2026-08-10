import { useCallback, useEffect, useState } from "react";

const CHAVE = "portal:modo-leitura";

/**
 * Modo leitura: marca <html data-leitura="on"> para o CSS esconder as
 * distrações (cabeçalho, rodapé, barras, cards laterais) e ampliar o conforto
 * de leitura do texto. A escolha fica salva no aparelho.
 */
export function useModoLeitura() {
  const [ativo, setAtivo] = useState(false);

  // Só lê o armazenamento depois da hidratação, para não divergir do SSR.
  useEffect(() => {
    try {
      setAtivo(localStorage.getItem(CHAVE) === "1");
    } catch {
      /* armazenamento indisponível: segue desligado */
    }
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    if (ativo) raiz.setAttribute("data-leitura", "on");
    else raiz.removeAttribute("data-leitura");
    return () => raiz.removeAttribute("data-leitura");
  }, [ativo]);

  const alternar = useCallback(() => {
    setAtivo((v) => {
      const novo = !v;
      try {
        localStorage.setItem(CHAVE, novo ? "1" : "0");
      } catch {
        /* ignora */
      }
      return novo;
    });
  }, []);

  // Atalho de teclado: R (fora de campos de texto).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "r" && e.key !== "R") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const alvo = e.target as HTMLElement | null;
      if (alvo && /^(input|textarea|select)$/i.test(alvo.tagName)) return;
      if (alvo?.isContentEditable) return;
      e.preventDefault();
      alternar();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [alternar]);

  return { ativo, alternar };
}
