// Server-only. Ponte entre a conta de e-mail/senha e a identidade do portal.
import { supabaseAdmin } from "@/integrations/supabase/client.server";

import { COLUNAS, garantirIdentidade, toPublica } from "./identidade.server";

type Linha = Parameters<typeof toPublica>[0] & { token: string };

/**
 * Devolve (criando ou vinculando) a identidade da conta autenticada.
 * Se o visitante já tinha uma identidade anônima neste navegador, ela é
 * adotada pela conta — o progresso e o santo padroeiro são preservados.
 */
export async function identidadeDaConta(
  userId: string,
  email: string | null,
  tokenAnonimo: string | null,
) {
  const seleto = `token, ${COLUNAS}`;

  const { data: existente } = await supabaseAdmin
    .from("identidades")
    .select(seleto)
    .eq("user_id", userId)
    .maybeSingle();
  if (existente) {
    const linha = existente as unknown as Linha;
    return { token: linha.token, identidade: toPublica(linha) };
  }

  if (tokenAnonimo) {
    const { data: livre } = await supabaseAdmin
      .from("identidades")
      .select("id")
      .eq("token", tokenAnonimo)
      .is("user_id", null)
      .maybeSingle();
    if (livre) {
      const { data } = await supabaseAdmin
        .from("identidades")
        .update({ user_id: userId, email })
        .eq("id", livre.id)
        .select(seleto)
        .single();
      if (data) {
        const linha = data as unknown as Linha;
        return { token: linha.token, identidade: toPublica(linha) };
      }
    }
  }

  const nova = await garantirIdentidade(null);
  const { data } = await supabaseAdmin
    .from("identidades")
    .update({ user_id: userId, email })
    .eq("token", nova.token)
    .select(seleto)
    .single();
  if (data) {
    const linha = data as unknown as Linha;
    return { token: linha.token, identidade: toPublica(linha) };
  }
  return nova;
}

/** Token da identidade da conta — usado pelas ações protegidas do fórum. */
export async function tokenDaConta(
  userId: string,
  email: string | null,
  tokenAnonimo: string | null,
) {
  const { token } = await identidadeDaConta(userId, email, tokenAnonimo);
  return token;
}
