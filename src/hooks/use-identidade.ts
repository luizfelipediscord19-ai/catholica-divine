import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { garantirIdentidadeFn, obterPainelFn } from "@/lib/portal.functions";

const CHAVE = "portal-catolico:identidade";
export const CHAVE_IDENTIDADE = CHAVE;

export function lerToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
}

/**
 * Garante um token de identidade sob demanda (ex.: no momento de publicar),
 * sem depender do carregamento em segundo plano.
 */
export async function garantirTokenAgora(): Promise<string> {
  const atual = lerToken();
  const res = await garantirIdentidadeFn({ data: { token: atual } });
  if (res.token !== atual) {
    try {
      window.localStorage.setItem(CHAVE, res.token);
    } catch {
      /* navegação privada */
    }
  }
  return res.token;
}

/**
 * Identidade anônima do visitante: um santo padroeiro sorteado e um código
 * secreto guardado apenas neste navegador. Sem login, sem e-mail.
 */
export function useIdentidade() {
  const [token, setToken] = useState<string | null>(null);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    setToken(lerToken());
    setHidratado(true);
  }, []);

  const query = useQuery({
    queryKey: ["identidade", token],
    enabled: hidratado,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await garantirIdentidadeFn({ data: { token } });
      if (res.token !== token) {
        try {
          window.localStorage.setItem(CHAVE, res.token);
        } catch {
          /* navegação privada: a identidade dura só esta sessão */
        }
        setToken(res.token);
      }
      return res;
    },
  });

  const esquecer = useCallback(() => {
    try {
      window.localStorage.removeItem(CHAVE);
    } catch {
      /* ignore */
    }
    setToken(null);
  }, []);

  return {
    token: query.data?.token ?? token,
    identidade: query.data?.identidade ?? null,
    carregando: !hidratado || query.isPending,
    esquecer,
  };
}

/** Painel espiritual completo (XP, streak, leituras, favoritos, conquistas). */
export function usePainel() {
  const { token } = useIdentidade();
  return useQuery({
    queryKey: ["painel", token],
    enabled: Boolean(token),
    queryFn: () => obterPainelFn({ data: { token: token! } }),
  });
}

/** Invalida painel e identidade após qualquer ação que dê XP. */
export function useInvalidarProgresso() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["painel"] });
    void queryClient.invalidateQueries({ queryKey: ["identidade"] });
  }, [queryClient]);
}

export { useMutation };


