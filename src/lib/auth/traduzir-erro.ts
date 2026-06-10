/**
 * Traduz erros do Supabase Auth para mensagens amigáveis em português.
 * Retorna sempre { titulo, detalhe? } para uso com toast.error(titulo, { description: detalhe }).
 */
export function traduzirErro(err: unknown): { titulo: string; detalhe?: string } {
  const anyErr = err as { message?: string; code?: string; status?: number; name?: string } | null;
  const rawMsg = (anyErr?.message ?? (typeof err === "string" ? err : "Erro desconhecido")).toString();
  const code = (anyErr?.code ?? "").toString().toLowerCase();
  const status = anyErr?.status;
  const m = rawMsg.toLowerCase();
  const detalhe = `${code ? `[${code}] ` : status ? `[${status}] ` : ""}${rawMsg}`;

  // Network / fetch failure
  if (
    anyErr?.name === "AuthRetryableFetchError" ||
    m.includes("failed to fetch") ||
    m.includes("networkerror") ||
    m.includes("network request failed") ||
    m.includes("load failed") ||
    m.includes("fetch failed")
  ) {
    return {
      titulo: "Não foi possível conectar ao servidor.",
      detalhe: "Verifique sua internet, desative bloqueadores/VPN e tente de novo. Se persistir, recarregue a página.",
    };
  }

  if (code === "invalid_credentials" || m.includes("invalid login credentials"))
    return { titulo: "E-mail ou senha incorretos.", detalhe: "Confira os dados ou use ‘Esqueci a senha’ para redefinir." };

  if (
    code === "user_already_exists" ||
    code === "email_exists" ||
    m.includes("already registered") ||
    m.includes("already exists") ||
    m.includes("user already") ||
    m.includes("duplicate key")
  )
    return { titulo: "Este e-mail já está cadastrado.", detalhe: "Faça login ou use ‘Esqueci a senha’ para recuperar o acesso." };

  if (code === "email_not_confirmed" || m.includes("email not confirmed") || m.includes("confirm your email"))
    return { titulo: "Confirme seu e-mail antes de entrar.", detalhe: "Procure o link de confirmação na sua caixa de entrada (e em spam)." };

  if (code === "user_not_found" || m.includes("user not found"))
    return { titulo: "Conta não encontrada.", detalhe: "Verifique o e-mail digitado ou crie uma nova conta." };

  if (code === "user_banned" || m.includes("user is banned") || m.includes("banned"))
    return { titulo: "Conta bloqueada.", detalhe: "Entre em contato com o suporte para mais informações." };

  if (
    code === "weak_password" ||
    code === "pwned_password" ||
    m.includes("pwned") ||
    m.includes("weak password") ||
    m.includes("compromised") ||
    m.includes("has been found in") ||
    m.includes("data breach")
  )
    return {
      titulo: "Senha muito fraca ou vazada.",
      detalhe: "Esta senha já apareceu em vazamentos públicos. Use ao menos 8 caracteres misturando letras, números e símbolos.",
    };

  if (m.includes("password should be at least") || m.includes("password should contain") || m.includes("password is too short"))
    return { titulo: "Senha curta demais.", detalhe: "Use ao menos 8 caracteres, com letras e números." };
  if (code === "same_password" || m.includes("new password should be different"))
    return { titulo: "A nova senha precisa ser diferente da anterior." };

  if (
    code === "validation_failed" ||
    code === "email_address_invalid" ||
    code === "email_address_not_authorized" ||
    m.includes("invalid email") ||
    (m.includes("email") && m.includes("invalid")) ||
    (m.includes("email address") && m.includes("is invalid"))
  )
    return { titulo: "E-mail inválido.", detalhe: "Confira se digitou corretamente (ex.: nome@dominio.com)." };

  if (
    code.includes("rate_limit") ||
    code === "over_email_send_rate_limit" ||
    code === "over_request_rate_limit" ||
    code === "too_many_requests" ||
    m.includes("rate limit") ||
    m.includes("too many") ||
    m.includes("for security purposes") ||
    status === 429
  )
    return { titulo: "Muitas tentativas seguidas.", detalhe: "Aguarde alguns minutos antes de tentar novamente." };

  if (code === "signup_disabled" || (m.includes("signup") && m.includes("disabled")) || m.includes("signups not allowed"))
    return { titulo: "Cadastro temporariamente indisponível.", detalhe: "Tente novamente mais tarde." };

  if (code === "unsupported_provider" || m.includes("unsupported provider"))
    return { titulo: "Método de login indisponível.", detalhe: "Use e-mail e senha por enquanto." };
  if (code === "provider_email_needs_verification")
    return { titulo: "Verifique o e-mail do provedor antes de continuar." };

  if (code === "session_not_found" || code === "no_authorization" || m.includes("jwt expired") || m.includes("invalid token"))
    return { titulo: "Sua sessão expirou.", detalhe: "Faça login novamente para continuar." };
  if (code === "otp_expired" || m.includes("token has expired") || m.includes("link is invalid"))
    return { titulo: "Link expirado.", detalhe: "Solicite um novo e-mail de confirmação ou redefinição." };

  if (code === "captcha_failed" || m.includes("captcha"))
    return { titulo: "Verificação anti-robô falhou.", detalhe: "Recarregue a página e tente outra vez." };

  if (status === 400) return { titulo: "Dados inválidos.", detalhe };
  if (status === 401 || status === 403) return { titulo: "Acesso não autorizado.", detalhe };
  if (status === 422) return { titulo: "Dados não aceitos pelo servidor.", detalhe };
  if (status && status >= 500) return { titulo: "Erro no servidor. Tente novamente em instantes.", detalhe };

  return { titulo: "Não foi possível concluir.", detalhe };
}
