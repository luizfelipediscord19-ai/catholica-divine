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

const CHAVE_DESCONECTADO = "portal-catolico:desconectado";

/**
 * Ao sair da conta, o painel também deve sair: apagamos o token desta aba e
 * marcamos o navegador como "desconectado" para não criar uma identidade
 * anônima nova por baixo. Ao entrar de novo, a reconciliação no servidor
 * devolve todo o progresso guardado na conta.
 */
export function desconectarIdentidadeLocal() {
  try {
    window.localStorage.removeItem(CHAVE);
    window.localStorage.setItem(CHAVE_DESCONECTADO, "1");
    window.dispatchEvent(new CustomEvent(EVENTO_IDENTIDADE, { detail: null }));
  } catch {
    /* navegação privada */
  }
}

export function reconectarIdentidadeLocal() {
  try {
    window.localStorage.removeItem(CHAVE_DESCONECTADO);
    window.dispatchEvent(new CustomEvent(EVENTO_IDENTIDADE, { detail: null }));
  } catch {
    /* navegação privada */
  }
}

function lerDesconectado(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CHAVE_DESCONECTADO) === "1";
  } catch {
    return false;
  }
}

/** Reativo: o painel usa isso para mostrar o convite de entrar na conta. */
export function useDesconectado() {
  const [desconectado, setDesconectado] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    const sincronizar = () => setDesconectado(lerDesconectado());
    sincronizar();
    setHidratado(true);
    window.addEventListener(EVENTO_IDENTIDADE, sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener(EVENTO_IDENTIDADE, sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  return { desconectado, hidratado };
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

  const { desconectado, hidratado: hidratadoDesconexao } = useDesconectado();
  // Depois de sair da conta não recriamos identidade anônima automaticamente:
  // o painel fica desconectado até a pessoa entrar de novo.
  const pausado = desconectado && !token;

  const query = useQuery({
    queryKey: ["identidade", token],
    enabled: hidratado && hidratadoDesconexao && !pausado,
    staleTime: 5 * 60 * 1000,
    retry: false,
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
    carregando: !hidratado || !hidratadoDesconexao || (!pausado && query.isPending),
    desconectado: pausado,
    esquecer,
  };
}

/** Painel espiritual completo (XP, streak, leituras, favoritos, conquistas). */
export function usePainel() {
  const { token, carregando, desconectado } = useIdentidade();
  return useQuery({
    queryKey: ["painel", token],
    enabled: !carregando && !desconectado,
    retry: false,

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
          dados = await obterPainelAnonimoResiliente(atual);
        }
      } else {
        dados = await obterPainelAnonimoResiliente(atual);
      }
      if (dados.tokenAtual && dados.tokenAtual !== atual) {
        guardarToken(dados.tokenAtual);
      }
      return dados;
    },
  });
}

/**
 * Se o token guardado no navegador estiver corrompido ou apontar para uma
 * identidade que não existe mais, descartamos e recomeçamos com um token novo
 * em vez de deixar o painel na tela de erro.
 */
async function obterPainelAnonimoResiliente(token: string) {
  try {
    return await obterPainelFn({ data: { token } });
  } catch (erro) {
    let novo: string;
    try {
      const res = await garantirIdentidadeFn({ data: { token: null } });
      novo = res.token;
    } catch {
      throw erro;
    }
    guardarToken(novo);
    return await obterPainelFn({ data: { token: novo } });
  }
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


