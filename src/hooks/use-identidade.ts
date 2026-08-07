import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import {
  garantirIdentidadeFn,
  obterPainelContaFn,
  obterPainelFn,
} from "@/lib/portal.functions";

const CHAVE = "portal-catolico:identidade";
const EVENTO_IDENTIDADE = "portal-catolico:identidade-atualizada";
export const CHAVE_IDENTIDADE = CHAVE;

function guardarToken(token: string) {
  try {
    window.localStorage.setItem(CHAVE, token);
    window.dispatchEvent(new CustomEvent(EVENTO_IDENTIDADE, { detail: token }));
  } catch {
    /* navegação privada */
  }
}

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
    guardarToken(res.token);
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
    const sincronizar = (evento: Event) => {
      const proximo = (evento as CustomEvent<string>).detail ?? lerToken();
      setToken(proximo);
    };
    window.addEventListener(EVENTO_IDENTIDADE, sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener(EVENTO_IDENTIDADE, sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const query = useQuery({
    queryKey: ["identidade", token],
    enabled: hidratado,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await garantirIdentidadeFn({ data: { token } });
      if (res.token !== token) {
        guardarToken(res.token);
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
  const { token, carregando } = useIdentidade();
  return useQuery({
    queryKey: ["painel", token],
    enabled: !carregando,
    retry: 2,
    queryFn: async () => {
      // Garante um token mesmo que o navegador ainda não tenha nenhum.
      const atual = token ?? (await garantirTokenAgora());
      const { data: sessao } = await supabase.auth.getSession();
      let dados;
      if (sessao.session) {
        try {
          // Esta chamada também reconcilia a identidade anônima antiga com a
          // conta antes de montar o painel.
          dados = await obterPainelContaFn({ data: { token: atual } });
        } catch {
          // Se a sessão ainda estiver sendo propagada ao backend, o painel
          // continua funcional com os dados locais e tenta reconciliar de
          // novo na próxima invalidação/recarregamento.
          dados = await obterPainelFn({ data: { token: atual } });
        }
      } else {
        dados = await obterPainelFn({ data: { token: atual } });
      }
      if (dados.tokenAtual && dados.tokenAtual !== atual) {
        guardarToken(dados.tokenAtual);
      }
      return dados;
    },
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


