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

  // Sempre tenta reconciliar primeiro. Diferente do fluxo anterior, isso
  // também mescla o progresso anônimo quando a conta já possui identidade.
  // A função SQL é transacional e só pode ser chamada pelo cliente admin.
  const { data: tokenReconciliado, error: erroReconciliacao } = await supabaseAdmin.rpc(
    "reconciliar_identidade_conta",
    {
      _user_id: userId,
      _token_anonimo: tokenAnonimo,
      _email: email,
    },
  );

  if (erroReconciliacao) {
    console.error("[conta] Falha ao reconciliar identidade:", erroReconciliacao.message);
    throw new Error("Não foi possível sincronizar seu progresso espiritual.");
  }

  if (tokenReconciliado) {
    const { data: reconciliada, error } = await supabaseAdmin
      .from("identidades")
      .select(seleto)
      .eq("token", tokenReconciliado)
      .eq("user_id", userId)
      .single();
    if (error || !reconciliada) {
      throw new Error("Não foi possível carregar a identidade sincronizada.");
    }
    const linha = reconciliada as unknown as Linha;
    return { token: linha.token, identidade: toPublica(linha) };
  }

  const { data: existente, error: erroExistente } = await supabaseAdmin
    .from("identidades")
    .select(seleto)
    .eq("user_id", userId)
    .maybeSingle();
  if (erroExistente) throw new Error("Não foi possível consultar sua identidade.");
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
      const { data, error } = await supabaseAdmin
        .from("identidades")
        .update({ user_id: userId, email })
        .eq("id", livre.id)
        .select(seleto)
        .single();
      if (error) throw new Error("Não foi possível vincular seu progresso à conta.");
      if (data) {
        const linha = data as unknown as Linha;
        return { token: linha.token, identidade: toPublica(linha) };
      }
    }
  }

  const nova = await garantirIdentidade(null);
  const { data, error } = await supabaseAdmin
    .from("identidades")
    .update({ user_id: userId, email })
    .eq("token", nova.token)
    .select(seleto)
    .single();
  if (error) throw new Error("Não foi possível criar a identidade da conta.");
  if (data) {
    const linha = data as unknown as Linha;
    return { token: linha.token, identidade: toPublica(linha) };
  }
  throw new Error("Não foi possível preparar sua identidade espiritual.");
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
