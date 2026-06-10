import { describe, it, expect } from "vitest";
import { traduzirErro } from "./traduzir-erro";

// Cada caso simula um erro real retornado por @supabase/supabase-js durante
// o fluxo de criação de conta / login e verifica o título amigável exibido.
const casos: Array<{
  nome: string;
  erro: { message?: string; code?: string; status?: number; name?: string };
  tituloEsperado: string;
}> = [
  {
    nome: "rede / fetch falhou (AuthRetryableFetchError)",
    erro: { name: "AuthRetryableFetchError", message: "Failed to fetch" },
    tituloEsperado: "Não foi possível conectar ao servidor.",
  },
  {
    nome: "rede - NetworkError",
    erro: { message: "NetworkError when attempting to fetch resource" },
    tituloEsperado: "Não foi possível conectar ao servidor.",
  },
  {
    nome: "credenciais inválidas no login",
    erro: { code: "invalid_credentials", status: 400, message: "Invalid login credentials" },
    tituloEsperado: "E-mail ou senha incorretos.",
  },
  {
    nome: "conta já existe (user_already_exists)",
    erro: { code: "user_already_exists", status: 422, message: "User already registered" },
    tituloEsperado: "Este e-mail já está cadastrado.",
  },
  {
    nome: "conta já existe (email_exists)",
    erro: { code: "email_exists", status: 422, message: "A user with this email address has already been registered" },
    tituloEsperado: "Este e-mail já está cadastrado.",
  },
  {
    nome: "e-mail não confirmado",
    erro: { code: "email_not_confirmed", status: 400, message: "Email not confirmed" },
    tituloEsperado: "Confirme seu e-mail antes de entrar.",
  },
  {
    nome: "conta não encontrada",
    erro: { code: "user_not_found", status: 400, message: "User not found" },
    tituloEsperado: "Conta não encontrada.",
  },
  {
    nome: "conta banida",
    erro: { code: "user_banned", status: 403, message: "User is banned" },
    tituloEsperado: "Conta bloqueada.",
  },
  {
    nome: "senha vazada (HIBP / pwned)",
    erro: { code: "weak_password", status: 422, message: "Password has been found in a data breach (pwned)" },
    tituloEsperado: "Senha muito fraca ou vazada.",
  },
  {
    nome: "senha vazada (pwned_password)",
    erro: { code: "pwned_password", status: 422, message: "This password has been compromised" },
    tituloEsperado: "Senha muito fraca ou vazada.",
  },
  {
    nome: "senha curta",
    erro: { status: 422, message: "Password should be at least 6 characters" },
    tituloEsperado: "Senha curta demais.",
  },
  {
    nome: "nova senha igual à antiga",
    erro: { code: "same_password", status: 422, message: "New password should be different from the old password" },
    tituloEsperado: "A nova senha precisa ser diferente da anterior.",
  },
  {
    nome: "e-mail inválido (validation_failed)",
    erro: { code: "validation_failed", status: 400, message: "Unable to validate email address: invalid format" },
    tituloEsperado: "E-mail inválido.",
  },
  {
    nome: "e-mail inválido (email_address_invalid)",
    erro: { code: "email_address_invalid", status: 400, message: "Email address is invalid" },
    tituloEsperado: "E-mail inválido.",
  },
  {
    nome: "rate limit de envio de e-mail",
    erro: { code: "over_email_send_rate_limit", status: 429, message: "Email rate limit exceeded" },
    tituloEsperado: "Muitas tentativas seguidas.",
  },
  {
    nome: "rate limit por segurança",
    erro: { status: 429, message: "For security purposes, you can only request this after 60 seconds" },
    tituloEsperado: "Muitas tentativas seguidas.",
  },
  {
    nome: "cadastro desativado",
    erro: { code: "signup_disabled", status: 422, message: "Signups not allowed for this instance" },
    tituloEsperado: "Cadastro temporariamente indisponível.",
  },
  {
    nome: "provedor OAuth não suportado",
    erro: { code: "unsupported_provider", status: 400, message: "Unsupported provider: google" },
    tituloEsperado: "Método de login indisponível.",
  },
  {
    nome: "sessão expirada (jwt)",
    erro: { message: "JWT expired" },
    tituloEsperado: "Sua sessão expirou.",
  },
  {
    nome: "link de confirmação expirado",
    erro: { code: "otp_expired", status: 401, message: "Token has expired or is invalid" },
    tituloEsperado: "Link expirado.",
  },
  {
    nome: "captcha falhou",
    erro: { code: "captcha_failed", status: 400, message: "Captcha verification failed" },
    tituloEsperado: "Verificação anti-robô falhou.",
  },
  {
    nome: "erro 500 genérico",
    erro: { status: 500, message: "Internal Server Error" },
    tituloEsperado: "Erro no servidor. Tente novamente em instantes.",
  },
  {
    nome: "erro 401 genérico",
    erro: { status: 401, message: "Unauthorized" },
    tituloEsperado: "Acesso não autorizado.",
  },
  {
    nome: "fallback (erro desconhecido)",
    erro: { message: "Algo bizarro aconteceu" },
    tituloEsperado: "Não foi possível concluir.",
  },
];

describe("traduzirErro - mensagens amigáveis para criação de conta", () => {
  for (const caso of casos) {
    it(`traduz: ${caso.nome}`, () => {
      const { titulo, detalhe } = traduzirErro(caso.erro);
      expect(titulo).toBe(caso.tituloEsperado);
      expect(typeof titulo).toBe("string");
      expect(titulo.length).toBeGreaterThan(0);
      if (detalhe !== undefined) expect(typeof detalhe).toBe("string");
    });
  }

  it("aceita string como erro", () => {
    expect(traduzirErro("qualquer coisa").titulo).toBe("Não foi possível concluir.");
  });

  it("aceita null sem quebrar", () => {
    expect(traduzirErro(null).titulo).toBe("Não foi possível concluir.");
  });
});
