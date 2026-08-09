import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/PageShell";
import { Painel, Rotulo, botaoClass, botaoGhostClass, inputClass } from "@/components/portal/comuns";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { baseParaEmails } from "@/lib/auth/site-url";
import { traduzirErroAuth } from "@/lib/auth/traduzir-erro";

export const Route = createFileRoute("/auth")({
  validateSearch: (busca: Record<string, unknown>): { modo?: "entrar" | "criar" | "recuperar" } => {
    const valor = busca["modo"];
    return valor === "criar" || valor === "recuperar" || valor === "entrar"
      ? { modo: valor }
      : {};
  },

  head: () => ({
    meta: [
      { title: "Entrar ou criar conta — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/auth" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Entre com e-mail e senha para participar do fórum Agora Ecclesiae e guardar seu progresso espiritual no Portal Católico.",
      },
      { property: "og:title", content: "Entrar ou criar conta — Portal Católico" },
      {
        property: "og:description",
        content: "Conta de e-mail e senha para participar do fórum e guardar seu progresso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

type Modo = "entrar" | "criar" | "recuperar";

function AuthPage() {
  const { modo: modoInicial } = Route.useSearch();
  const [modo, setModo] = useState<Modo>(modoInicial ?? "entrar");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const { autenticado, user, carregando, sair } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setErro(null);
    setAviso(null);
  }, [modo]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    setEnviando(true);
    try {
      if (modo === "recuperar") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${baseParaEmails()}/redefinir-senha`,
        });
        if (error) throw error;
        setAviso(
          "Se existir uma conta com este e-mail, enviamos um link para criar uma nova senha.",
        );
      } else if (modo === "criar") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: senha,
          options: { emailRedirectTo: `${baseParaEmails()}/email-confirmado` },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Conta criada. Bem-vindo!");
          void navigate({ to: "/forum" });
        } else {
          setAviso(
            "Conta criada. Confirme seu e-mail pelo link que enviamos (verifique também o spam) e depois entre.",
          );
          setModo("entrar");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: senha,
        });
        if (error) throw error;
        toast.success("Bem-vindo de volta.");
        void navigate({ to: "/forum" });
      }
    } catch (e) {
      setErro(traduzirErroAuth(e));
    } finally {
      setEnviando(false);
    }
  }

  const senhaCurta = modo !== "recuperar" && senha.length > 0 && senha.length < 8;
  const valido =
    /.+@.+\..+/.test(email.trim()) && (modo === "recuperar" || senha.length >= 8);

  return (
    <div>
      <PageHero
        eyebrow="Sua conta"
        title={
          <>
            Entre no <span className="italic font-light text-gold">portal</span>
          </>
        }
        intro="Uma conta simples, com e-mail e senha, para participar do fórum com responsabilidade e guardar seu progresso espiritual em qualquer aparelho."
      />

      <div className="max-w-xl mx-auto px-6 py-16 space-y-8">
        {carregando ? (
          <Painel>
            <p className="text-sm text-muted-foreground">Verificando sua sessão…</p>
          </Painel>
        ) : autenticado ? (
          <Painel>
            <Rotulo>Você já está conectado</Rotulo>
            <p className="text-sm text-muted-foreground font-light mb-6">
              Conectado como <span className="text-gold">{user?.email}</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/forum" className={botaoClass}>
                Ir para o fórum
              </Link>
              <Link to="/painel" className={botaoGhostClass}>
                Painel espiritual
              </Link>
              <button type="button" onClick={() => void sair()} className={botaoGhostClass}>
                Sair
              </button>
            </div>
          </Painel>
        ) : (
          <Painel>
            <div className="flex flex-wrap gap-2 mb-8">
              {(
                [
                  ["entrar", "Entrar"],
                  ["criar", "Criar conta"],
                  ["recuperar", "Esqueci a senha"],
                ] as [Modo, string][]
              ).map(([valor, rotulo]) => (
                <button
                  key={valor}
                  type="button"
                  onClick={() => setModo(valor)}
                  aria-pressed={modo === valor}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] border transition-premium ${
                    modo === valor
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/15 text-paper/60 hover:text-paper hover:border-gold/40"
                  }`}
                >
                  {rotulo}
                </button>
              ))}
            </div>

            <form className="space-y-5" onSubmit={enviar} noValidate>
              <label className="block space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60">E-mail</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  maxLength={255}
                  className={inputClass}
                />
              </label>

              {modo === "recuperar" ? null : (
                <label className="block space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60">Senha</span>
                  <input
                    type="password"
                    autoComplete={modo === "criar" ? "new-password" : "current-password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Pelo menos 8 caracteres"
                    maxLength={72}
                    className={inputClass}
                  />
                  {senhaCurta ? (
                    <span className="block text-xs text-muted-foreground/80">
                      Use pelo menos 8 caracteres, evitando senhas comuns.
                    </span>
                  ) : null}
                </label>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" disabled={!valido || enviando} className={botaoClass}>
                  {enviando
                    ? "Enviando…"
                    : modo === "criar"
                      ? "Criar conta"
                      : modo === "recuperar"
                        ? "Enviar link"
                        : "Entrar"}
                </button>
                {modo === "entrar" ? (
                  <button
                    type="button"
                    onClick={() => setModo("recuperar")}
                    className={botaoGhostClass}
                  >
                    Esqueci a senha
                  </button>
                ) : null}
              </div>

              {erro ? (
                <p role="alert" className="text-sm text-destructive-text">
                  {erro}
                </p>
              ) : null}
              {aviso ? <p className="text-sm text-gold/90">{aviso}</p> : null}
            </form>

            <p className="text-xs text-muted-foreground/80 font-light leading-relaxed mt-8">
              Sua identidade pública no fórum continua sendo o santo padroeiro sorteado — o e-mail
              nunca aparece para outros peregrinos.
            </p>
          </Painel>
        )}
      </div>
    </div>
  );
}
