import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import {
  EVENTO_NOTIFICAR,
  type Notificacao,
  type NovaNotificacao,
} from "@/lib/notificacoes";

const CHAVE = "portal-catolico:notificacoes";
const LIMITE = 60;

type Api = {
  notificacoes: Notificacao[];
  naoLidas: number;
  adicionar: (nova: NovaNotificacao) => void;
  marcarTodasLidas: () => void;
  marcarLida: (id: string) => void;
  limpar: () => void;
};

const Ctx = createContext<Api | null>(null);

function ler(): Notificacao[] {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    return bruto ? (JSON.parse(bruto) as Notificacao[]) : [];
  } catch {
    return [];
  }
}

function gravar(lista: Notificacao[]) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(lista.slice(0, LIMITE)));
  } catch {
    /* navegação privada */
  }
}

export function NotificacoesProvider({ children }: { children: ReactNode }) {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  useEffect(() => {
    setNotificacoes(ler());
  }, []);

  const adicionar = useCallback((nova: NovaNotificacao) => {
    setNotificacoes((atual) => {
      if (nova.chave && atual.some((n) => n.chave === nova.chave)) return atual;
      const item: Notificacao = {
        ...nova,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        criadaEm: Date.now(),
        lida: false,
      };
      const proxima = [item, ...atual].slice(0, LIMITE);
      gravar(proxima);
      toast(item.titulo, { description: item.mensagem });
      return proxima;
    });
  }, []);

  // Ponte para o utilitário global `notificar()`.
  useEffect(() => {
    const ouvir = (e: Event) => adicionar((e as CustomEvent<NovaNotificacao>).detail);
    window.addEventListener(EVENTO_NOTIFICAR, ouvir);
    return () => window.removeEventListener(EVENTO_NOTIFICAR, ouvir);
  }, [adicionar]);

  const marcarTodasLidas = useCallback(() => {
    setNotificacoes((atual) => {
      const proxima = atual.map((n) => ({ ...n, lida: true }));
      gravar(proxima);
      return proxima;
    });
  }, []);

  const marcarLida = useCallback((id: string) => {
    setNotificacoes((atual) => {
      const proxima = atual.map((n) => (n.id === id ? { ...n, lida: true } : n));
      gravar(proxima);
      return proxima;
    });
  }, []);

  const limpar = useCallback(() => {
    gravar([]);
    setNotificacoes([]);
  }, []);

  const api = useMemo<Api>(
    () => ({
      notificacoes,
      naoLidas: notificacoes.filter((n) => !n.lida).length,
      adicionar,
      marcarTodasLidas,
      marcarLida,
      limpar,
    }),
    [notificacoes, adicionar, marcarTodasLidas, marcarLida, limpar],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useNotificacoes(): Api {
  return (
    useContext(Ctx) ?? {
      notificacoes: [],
      naoLidas: 0,
      adicionar: () => {},
      marcarTodasLidas: () => {},
      marcarLida: () => {},
      limpar: () => {},
    }
  );
}
