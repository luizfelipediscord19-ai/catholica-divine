import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

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

    const { data: sub } = supabase.auth.onAuthStateChange((evento, nova) => {
      if (!vivo) return;
      setSession(nova);
      setCarregando(false);
      if (evento === "SIGNED_IN" || evento === "USER_UPDATED") {
        // Ao voltar para a mesma conta, o navegador volta a montar a
        // identidade — o servidor devolve todo o progresso guardado.
        reconectarIdentidadeLocal();
        void queryClient.invalidateQueries({ queryKey: ["identidade"] });
        void queryClient.invalidateQueries({ queryKey: ["painel"] });
      }
      if (evento === "SIGNED_OUT") {
        desconectarIdentidadeLocal();
        void queryClient.invalidateQueries({ queryKey: ["painel"] });
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!vivo) return;
      setSession(data.session);
      setCarregando(false);
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
    // O painel espiritual sai junto com a conta: o token desta aba é apagado.
    desconectarIdentidadeLocal();
    setSession(null);
  }, [queryClient]);


  const user: User | null = session?.user ?? null;

  return { session, user, autenticado: Boolean(user), carregando, sair };
}
