import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Church, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Portal Católico" },
      { name: "description", content: "Acesse sua conta para acompanhar seu progresso espiritual, leituras e conquistas." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!authLoading && user && pathname === "/auth") {
      navigate({ to: "/painel" });
    }
  }, [user, authLoading, navigate, pathname]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
        navigate({ to: "/painel" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/painel`,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu e-mail para confirmar.");
        navigate({ to: "/painel" });
      }
    } catch (err) {
      console.error("[auth] erro:", err);
      const { titulo, detalhe } = traduzirErro(err);
      toast.error(titulo, { description: detalhe });
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!email) {
      toast.error("Informe seu e-mail primeiro.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      const { titulo, detalhe } = traduzirErro(error);
      toast.error(titulo, { description: detalhe });
    } else toast.success("Enviamos um e-mail com instruções.");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex size-14 rounded-full border border-gold/30 items-center justify-center mb-4">
            <Church className="size-6 text-gold" />
          </div>
          <h1 className="font-display text-3xl text-foreground">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Continue sua jornada espiritual."
              : "Comece a acompanhar suas leituras, orações e conquistas."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 glass p-8 border border-gold/15">
          {mode === "signup" && (
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-paper/60 font-bold">Nome</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Como devemos te chamar"
                className="mt-2 w-full bg-transparent border-b border-gold/20 py-3 text-paper focus:outline-none focus:border-gold transition"
                maxLength={80}
              />
            </div>
          )}
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-paper/60 font-bold">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full bg-transparent border-b border-gold/20 py-3 text-paper focus:outline-none focus:border-gold transition"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-paper/60 font-bold">Senha</label>
            <input
              type="password"
              required
              minLength={mode === "signup" ? 8 : 6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-transparent border-b border-gold/20 py-3 text-paper focus:outline-none focus:border-gold transition"
            />
            {mode === "signup" && (
              <p className="mt-2 text-[11px] text-paper/40 leading-relaxed">
                Use ao menos 8 caracteres com letras e números. Evite senhas comuns (ex.: "123456", "senha123").
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold text-deep text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-paper transition-premium disabled:opacity-50"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {mode === "login" ? "Entrar" : "Criar conta"}
          </button>

          <div className="flex items-center justify-between pt-2 text-xs">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-paper/60 hover:text-gold transition"
            >
              {mode === "login" ? "Criar conta" : "Já tenho conta"}
            </button>
            {mode === "login" && (
              <button
                type="button"
                onClick={handleReset}
                className="text-paper/60 hover:text-gold transition"
              >
                Esqueci a senha
              </button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-gold transition">← Voltar ao início</Link>
        </p>
      </div>
    </div>
  );
}

function traduzirErro(err: unknown): { titulo: string; detalhe?: string } {
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

  // Credenciais
  if (code === "invalid_credentials" || m.includes("invalid login credentials"))
    return { titulo: "E-mail ou senha incorretos.", detalhe: "Confira os dados ou use ‘Esqueci a senha’ para redefinir." };

  // Conta já existe
  if (
    code === "user_already_exists" ||
    code === "email_exists" ||
    m.includes("already registered") ||
    m.includes("already exists") ||
    m.includes("user already") ||
    m.includes("duplicate key")
  )
    return { titulo: "Este e-mail já está cadastrado.", detalhe: "Faça login ou use ‘Esqueci a senha’ para recuperar o acesso." };

  // E-mail não confirmado
  if (code === "email_not_confirmed" || m.includes("email not confirmed") || m.includes("confirm your email"))
    return { titulo: "Confirme seu e-mail antes de entrar.", detalhe: "Procure o link de confirmação na sua caixa de entrada (e em spam)." };

  // Conta não encontrada
  if (code === "user_not_found" || m.includes("user not found"))
    return { titulo: "Conta não encontrada.", detalhe: "Verifique o e-mail digitado ou crie uma nova conta." };

  // Conta bloqueada / banida
  if (code === "user_banned" || m.includes("user is banned") || m.includes("banned"))
    return { titulo: "Conta bloqueada.", detalhe: "Entre em contato com o suporte para mais informações." };

  // Senha vazada (HIBP) ou fraca
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

  // Tamanho/complexidade de senha
  if (m.includes("password should be at least") || m.includes("password should contain") || m.includes("password is too short"))
    return { titulo: "Senha curta demais.", detalhe: "Use ao menos 8 caracteres, com letras e números." };
  if (code === "same_password" || m.includes("new password should be different"))
    return { titulo: "A nova senha precisa ser diferente da anterior." };

  // E-mail inválido
  if (
    code === "validation_failed" ||
    code === "email_address_invalid" ||
    code === "email_address_not_authorized" ||
    m.includes("invalid email") ||
    (m.includes("email") && m.includes("invalid")) ||
    m.includes("email address") && m.includes("is invalid")
  )
    return { titulo: "E-mail inválido.", detalhe: "Confira se digitou corretamente (ex.: nome@dominio.com)." };

  // Rate limit / muitas tentativas
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

  // Cadastro desativado
  if (code === "signup_disabled" || (m.includes("signup") && m.includes("disabled")) || m.includes("signups not allowed"))
    return { titulo: "Cadastro temporariamente indisponível.", detalhe: "Tente novamente mais tarde." };

  // Provedor / OAuth
  if (code === "unsupported_provider" || m.includes("unsupported provider"))
    return { titulo: "Método de login indisponível.", detalhe: "Use e-mail e senha por enquanto." };
  if (code === "provider_email_needs_verification")
    return { titulo: "Verifique o e-mail do provedor antes de continuar." };

  // Sessão / token
  if (code === "session_not_found" || code === "no_authorization" || m.includes("jwt expired") || m.includes("invalid token"))
    return { titulo: "Sua sessão expirou.", detalhe: "Faça login novamente para continuar." };
  if (code === "otp_expired" || m.includes("token has expired") || m.includes("link is invalid"))
    return { titulo: "Link expirado.", detalhe: "Solicite um novo e-mail de confirmação ou redefinição." };

  // Captcha
  if (code === "captcha_failed" || m.includes("captcha"))
    return { titulo: "Verificação anti-robô falhou.", detalhe: "Recarregue a página e tente outra vez." };

  // Status genéricos
  if (status === 400)
    return { titulo: "Dados inválidos.", detalhe };
  if (status === 401 || status === 403)
    return { titulo: "Acesso não autorizado.", detalhe };
  if (status === 422)
    return { titulo: "Dados não aceitos pelo servidor.", detalhe };
  if (status && status >= 500)
    return { titulo: "Erro no servidor. Tente novamente em instantes.", detalhe };

  return { titulo: "Não foi possível concluir.", detalhe };
}
