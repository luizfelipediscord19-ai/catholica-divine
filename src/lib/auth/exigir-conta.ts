import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/**
 * Middleware de conta do portal.
 *
 * Substitui o `requireSupabaseAuth` gerado por dois motivos práticos:
 * 1. aceita tanto `SUPABASE_URL`/`SUPABASE_PUBLISHABLE_KEY` quanto as variáveis
 *    `VITE_*` — em produção (Vercel) só as `VITE_*` costumam estar definidas, e
 *    a falta delas fazia toda ação do fórum falhar como "não autorizado";
 * 2. valida o token com `auth.getUser`, que funciona com chaves legadas e novas,
 *    e devolve mensagens em português que a interface consegue mostrar.
 */

function ambiente(...nomes: string[]): string | undefined {
  for (const nome of nomes) {
    const valor = process.env[nome];
    if (valor) return valor;
  }
  return undefined;
}

function isChaveOpaca(valor: string): boolean {
  return valor.startsWith("sb_publishable_") || valor.startsWith("sb_secret_");
}

function fetchComApiKey(chave: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((valor, nome) => headers.set(nome, valor));
    }
    if (isChaveOpaca(chave) && headers.get("Authorization") === `Bearer ${chave}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", chave);
    return fetch(input, { ...init, headers });
  };
}

const SEM_SESSAO = "Você precisa estar logado na sua conta para participar do fórum.";

export const exigirConta = createMiddleware({ type: "function" }).server(async ({ next, context }) => {
  const SUPABASE_URL = ambiente("SUPABASE_URL", "VITE_SUPABASE_URL");
  const SUPABASE_KEY = ambiente(
    "SUPABASE_PUBLISHABLE_KEY",
    "VITE_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
  );

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("[conta] Variáveis de ambiente do backend ausentes no servidor.");
    throw new Error(
      "O servidor do portal está sem configuração de backend. Tente novamente em instantes.",
    );
  }

  let cabecalho: string | null = null;
  try {
    cabecalho = getRequest()?.headers?.get("authorization") ?? null;
  } catch {
    cabecalho = null;
  }

  // Caminho principal: cabeçalho Authorization. Caminho alternativo: token
  // enviado pelo contexto do middleware do cliente — usado quando o cabeçalho
  // não chega ao servidor (proxies de hospedagem). Ambos são validados igual.
  const doCabecalho = cabecalho?.startsWith("Bearer ") ? cabecalho.slice(7).trim() : "";
  const contexto = context as unknown as { tokenConta?: unknown } | undefined;
  const doContexto =
    typeof contexto?.tokenConta === "string" ? contexto.tokenConta.trim() : "";

  const token = doCabecalho || doContexto;

  if (!token || token.split(".").length !== 3) {
    throw new Error(SEM_SESSAO);
  }

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      fetch: fetchComApiKey(SUPABASE_KEY),
      headers: { Authorization: `Bearer ${token}` },
    },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user?.id) {
    throw new Error("Sua sessão expirou. Entre novamente na sua conta para continuar.");
  }


  return next({
    context: {
      supabase,
      userId: data.user.id,
      claims: { sub: data.user.id, email: data.user.email ?? null } as Record<string, unknown>,
    },
  });
});
