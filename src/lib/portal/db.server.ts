// Server-only. Cliente de LEITURA pública do fórum.
// Usa a service role quando disponível; caso contrário cai para a chave
// publicável (as políticas de leitura pública cobrem seções, conversas e
// respostas aprovadas), para o site continuar funcionando na hospedagem
// mesmo sem a SUPABASE_SERVICE_ROLE_KEY configurada.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

let _leitura: ReturnType<typeof createClient<Database>> | undefined;

export function dbLeitura() {
  if (_leitura) return _leitura;

  const url = process.env["SUPABASE_URL"];
  const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const key = serviceKey || publishableKey;

  if (!url || !key) {
    throw new Error(
      "Configuração do backend ausente: defina SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY (ou SUPABASE_SERVICE_ROLE_KEY).",
    );
  }

  if (!serviceKey) {
    console.warn(
      "[Portal] SUPABASE_SERVICE_ROLE_KEY ausente — leitura pública do fórum via chave publicável.",
    );
  }

  _leitura = createClient<Database>(url, key, {
    global: {
      fetch: (input, init) => {
        const headers = new Headers(
          typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
        );
        if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  return _leitura;
}
