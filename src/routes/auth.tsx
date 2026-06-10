import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Church, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { traduzirErro as traduzirErroAuth } from "@/lib/auth/traduzir-erro";

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
      const { titulo, detalhe } = traduzirErroAuth(err);
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
      const { titulo, detalhe } = traduzirErroAuth(error);
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

