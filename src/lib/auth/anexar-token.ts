import { createMiddleware } from "@tanstack/react-start";

import { supabase } from "@/integrations/supabase/client";

/**
 * Anexa o token da sessão às chamadas de servidor. Diferente do anexador
 * gerado, renova a sessão quando o token está perto de expirar — era essa
 * janela que fazia o fórum responder "não autorizado" depois de algum tempo
 * com a aba aberta.
 */
export const anexarTokenDaConta = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    let token: string | undefined;
    try {
      const { data } = await supabase.auth.getSession();
      const sessao = data.session;
      const expiraEm = sessao?.expires_at ? sessao.expires_at * 1000 : 0;
      const faltaPouco = expiraEm > 0 && expiraEm - Date.now() < 60_000;

      if (sessao && faltaPouco) {
        const { data: renovada } = await supabase.auth.refreshSession();
        token = renovada.session?.access_token ?? sessao.access_token;
      } else {
        token = sessao?.access_token;
      }
    } catch {
      token = undefined;
    }

    return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
  },
);
