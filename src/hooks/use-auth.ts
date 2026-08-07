import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { vincularContaFn } from "@/lib/portal.functions";
import { CHAVE_IDENTIDADE, lerToken } from "@/hooks/use-identidade";

/**
 * Sessão de e-mail/senha do portal. A identidade anônima deste navegador é
 * adotada pela conta no primeiro login, então o progresso não se perde.
 */
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    let vivo = true;

    const vincular = async () => {
      try {
        const res = await vincularContaFn({ data: { token: lerToken() } });
        window.localStorage.setItem(CHAVE_IDENTIDADE, res.token);
        void queryClient.invalidateQueries({ queryKey: ["identidade"] });
        void queryClient.invalidateQueries({ queryKey: ["painel"] });
      } catch {
        /* silencioso: a próxima ação tenta de novo */
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((evento, nova) => {
      if (!vivo) return;
      setSession(nova);
      setCarregando(false);
      if (nova && (evento === "SIGNED_IN" || evento === "INITIAL_SESSION")) void vincular();
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!vivo) return;
      setSession(data.session);
      setCarregando(false);
      // onAuthStateChange pode ter ocorrido antes da inscrição do componente.
      // Reconciliar aqui torna o fluxo idempotente e cobre refresh/login antigo.
      if (data.session) void vincular();
    });

    return () => {
      vivo = false;
      sub.subscription.unsubscribe();
    };
  }, [queryClient]);

  const sair = useCallback(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    setSession(null);
  }, [queryClient]);

  const user: User | null = session?.user ?? null;

  return { session, user, autenticado: Boolean(user), carregando, sair };
}
