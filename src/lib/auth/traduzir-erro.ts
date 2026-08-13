/**
 * Traduz erros do Supabase Auth para mensagens claras em português.
 * Nunca revela se um e-mail existe (evita enumeração de contas).
 */
export function traduzirErroAuth(erro: unknown): string {
  const bruto =
    typeof erro === "string"
      ? erro
      : erro && typeof erro === "object" && "message" in erro
        ? String((erro as { message: unknown }).message)
        : "";
  const m = bruto.toLowerCase();

  if (!m) return "Não foi possível concluir. Tente novamente em instantes.";

  if (m.includes("legacy api keys") || m.includes("legacy key"))
    return "A configuração de acesso do site está desatualizada (chave antiga desativada). Atualize as variáveis de ambiente da hospedagem com a chave publicável atual.";
  if (m.includes("invalid api key") || m.includes("no api key"))
    return "A configuração de acesso do site está incorreta. Atualize as variáveis de ambiente da hospedagem.";
  if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed"))
    return "Confirme seu e-mail antes de entrar. Verifique a caixa de entrada e o spam.";
  if (m.includes("user already registered") || m.includes("already been registered"))
    return "Já existe uma conta com este e-mail. Tente entrar ou recuperar a senha.";
  if (m.includes("password should be at least"))
    return "A senha é curta demais: use pelo menos 6 caracteres.";
  if (m.includes("pwned") || m.includes("compromised") || m.includes("weak password"))
    return "Esta senha aparece em vazamentos conhecidos. Escolha uma senha diferente e mais forte.";
  if (m.includes("unable to validate email") || m.includes("invalid email") || m.includes("email address") && m.includes("invalid"))
    return "E-mail inválido. Confira se digitou corretamente.";
  if (m.includes("rate limit") || m.includes("too many requests") || m.includes("429"))
    return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.";
  if (m.includes("signups not allowed") || m.includes("signup is disabled"))
    return "O cadastro está temporariamente desativado.";
  if (m.includes("token has expired") || m.includes("otp_expired") || m.includes("invalid or has expired"))
    return "O link expirou. Peça um novo e-mail de confirmação ou de redefinição.";
  if (m.includes("same password"))
    return "A nova senha precisa ser diferente da anterior.";
  if (m.includes("auth session missing") || m.includes("session_not_found"))
    return "Sua sessão expirou. Entre novamente.";
  if (m.includes("unauthorized")) return "Entre na sua conta para continuar.";
  if (m.includes("failed to fetch") || m.includes("networkerror") || m.includes("network"))
    return "Não conseguimos falar com o servidor. Verifique sua conexão e tente novamente.";

  return bruto;
}
