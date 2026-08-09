/**
 * Domínio público do portal. Os links enviados por e-mail (confirmação de
 * conta e redefinição de senha) precisam apontar sempre para o site — nunca
 * para o editor ou para uma pré-visualização temporária.
 */
export const SITE_URL = "https://portalcatolico.vercel.app";

/** Base a usar nos links de e-mail do Supabase Auth. */
export function baseParaEmails(): string {
  if (typeof window === "undefined") return SITE_URL;
  const origem = window.location.origin;
  // Desenvolvimento local continua útil para testes.
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origem)) return origem;
  return SITE_URL;
}
