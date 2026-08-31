// Server-only. Criação de conta pelo servidor.
//
// O cadastro direto pelo Auth dependia do envio do e-mail de confirmação; com
// o serviço de e-mail indisponível a chamada ficava pendurada por mais de 30s
// e devolvia tempo esgotado, deixando o visitante sem conta. Aqui a conta é
// criada pelo servidor já confirmada, e o cliente apenas entra com a senha.

export type ResultadoCriarConta = { ok: true } | { ok: false; motivo: string };

export async function criarConta(email: string, senha: string): Promise<ResultadoCriarConta> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
  });

  if (error) {
    const texto = `${error.message ?? ""}`.toLowerCase();
    if (texto.includes("already") || texto.includes("registered") || texto.includes("exists")) {
      return { ok: false, motivo: "Já existe uma conta com este e-mail. Tente entrar." };
    }
    if (texto.includes("password")) {
      return { ok: false, motivo: "Use uma senha com pelo menos 6 caracteres." };
    }
    return { ok: false, motivo: "Não foi possível criar a conta agora. Tente novamente em instantes." };
  }

  if (!data?.user) {
    return { ok: false, motivo: "Não foi possível criar a conta agora. Tente novamente em instantes." };
  }
  return { ok: true };
}
