import { useCallback, useEffect, useRef, useState } from "react";

const PREFIXO = "portal-catolico:rascunho:";

function ler<T>(chave: string): { valor: T; salvoEm: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const bruto = window.localStorage.getItem(PREFIXO + chave);
    if (!bruto) return null;
    const dados = JSON.parse(bruto) as { valor: T; salvoEm: number };
    return dados && typeof dados.salvoEm === "number" ? dados : null;
  } catch {
    return null;
  }
}

/**
 * Rascunho automático guardado neste navegador: o visitante pode fechar a
 * página e voltar depois sem perder o que escreveu.
 */
export function useRascunho<T extends Record<string, unknown>>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(inicial);
  const [salvoEm, setSalvoEm] = useState<number | null>(null);
  const [restaurado, setRestaurado] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restaura uma única vez, após a hidratação.
  useEffect(() => {
    const guardado = ler<T>(chave);
    if (guardado) {
      setValor({ ...inicial, ...guardado.valor });
      setSalvoEm(guardado.salvoEm);
      setRestaurado(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  const atualizar = useCallback((parcial: Partial<T>) => {
    setValor((atual) => ({ ...atual, ...parcial }));
  }, []);

  const limpar = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    try {
      window.localStorage.removeItem(PREFIXO + chave);
    } catch {
      /* navegação privada */
    }
    setValor(inicial);
    setSalvoEm(null);
    setRestaurado(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  // Salva com atraso curto para não escrever a cada tecla.
  useEffect(() => {
    const vazio = Object.values(valor).every((v) => typeof v !== "string" || v.trim() === "");
    if (vazio) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const agora = Date.now();
      try {
        window.localStorage.setItem(PREFIXO + chave, JSON.stringify({ valor, salvoEm: agora }));
        setSalvoEm(agora);
      } catch {
        /* navegação privada */
      }
    }, 600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [chave, valor]);

  return { valor, atualizar, limpar, salvoEm, restaurado };
}

export function formatarSalvo(salvoEm: number | null) {
  if (!salvoEm) return null;
  return new Date(salvoEm).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
