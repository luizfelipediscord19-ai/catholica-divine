import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Botao, BotaoLink } from "@/components/ds";
import { PageHero } from "@/components/PageShell";
import { Painel, Rotulo, inputClass } from "@/components/portal/comuns";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { baseParaEmails } from "@/lib/auth/site-url";
import { traduzirErroAuth } from "@/lib/auth/traduzir-erro";
import { criarContaFn } from "@/lib/portal.functions";

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
        const resultado = await criarContaFn({
          data: { email: email.trim(), senha },
        });
        if (!resultado.ok) throw new Error(resultado.motivo);
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: senha,
        });
        if (error) throw error;
        toast.success("Conta criada. Bem-vindo!");
        void navigate({ to: "/forum" });
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

  const senhaCurta = modo !== "recuperar" && senha.length > 0 && senha.length < 6;
  const valido =
    /.+@.+\..+/.test(email.trim()) && (modo === "recuperar" || senha.length >= 6);

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

      <main className="shell-narrow py-block">
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
              <BotaoLink para="/forum">Ir para o fórum</BotaoLink>
              <BotaoLink para="/painel" variante="contorno">Painel espiritual</BotaoLink>
              <Botao variante="contorno" onClick={() => void sair()}>Sair</Botao>
            </div>
          </Painel>
        ) : (
          <Painel className="mx-auto max-w-[42rem]">
            <div className="filtro-trilho mb-8" role="tablist" aria-label="Acesso à conta">
              {(
                [
                  ["entrar", "Entrar"],
                  ["criar", "Criar conta"],
                  ["recuperar", "Esqueci a senha"],
                ] as [Modo, string][]
              ).map(([valor, rotulo]) => (
                <Botao
                  key={valor}
                  tamanho="sm"
                  variante="discreto"
                  onClick={() => setModo(valor)}
                  role="tab"
                  aria-pressed={modo === valor}
                  aria-selected={modo === valor}
                  className={modo === valor ? "border-gold bg-gold/10 text-gold" : "border-gold/15 text-paper/60 hover:text-paper hover:border-gold/40"}
                >
                  {rotulo}
                </Botao>
              ))}
            </div>

            <form className="space-y-5" onSubmit={enviar} noValidate>
              <label className="block space-y-2">
                <span className="label-btn text-paper/60">E-mail</span>
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
                  <span className="label-btn text-paper/60">Senha</span>
                  <input
                    type="password"
                    autoComplete={modo === "criar" ? "new-password" : "current-password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Pelo menos 6 caracteres"
                    maxLength={72}
                    className={inputClass}
                  />
                  {modo === "criar" ? (
                    <ForcaSenha senha={senha} />
                  ) : senhaCurta ? (
                    <span className="block text-xs text-muted-foreground/80">
                      Use pelo menos 6 caracteres.
                    </span>
                  ) : null}
                </label>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <Botao type="submit" disabled={!valido} carregando={enviando}>
                  {enviando
                    ? "Enviando…"
                    : modo === "criar"
                      ? "Criar conta"
                      : modo === "recuperar"
                        ? "Enviar link"
                        : "Entrar"}
                </Botao>
                {modo === "entrar" ? (
                  <Botao variante="contorno" onClick={() => setModo("recuperar")}>
                    Esqueci a senha
                  </Botao>
                ) : null}
              </div>

              {erro ? (
                <p role="alert" className="border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive-text">
                  {erro}
                </p>
              ) : null}
              {aviso ? <p role="status" className="border-l-2 border-gold bg-gold/5 px-4 py-3 text-sm text-gold/90">{aviso}</p> : null}
            </form>

            <p className="text-xs text-muted-foreground/80 font-light leading-relaxed mt-8">
              Sua identidade pública no fórum continua sendo o santo padroeiro sorteado — o e-mail
              nunca aparece para outros peregrinos.
            </p>
          </Painel>
        )}
      </main>
    </div>
  );
}

/** Regras legíveis + medidor de força, sem bloquear o cadastro. */
function ForcaSenha({ senha }: { senha: string }) {
  const regras = [
    { rotulo: "Pelo menos 6 caracteres", ok: senha.length >= 6 },
    { rotulo: "8 caracteres ou mais", ok: senha.length >= 8 },
    { rotulo: "Uma letra e um número", ok: /[a-zA-Z]/.test(senha) && /\d/.test(senha) },
    { rotulo: "Um símbolo (opcional)", ok: /[^a-zA-Z0-9]/.test(senha) },
  ];
  const pontos = regras.filter((r) => r.ok).length;
  const nivel = senha.length === 0 ? 0 : Math.max(pontos, 1);
  const nome = ["", "Fraca", "Razoável", "Boa", "Forte"][nivel] ?? "";

  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center gap-2" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 transition-premium ${
              i <= nivel ? "bg-gold" : "bg-gold/15"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground/80" aria-live="polite">
        {senha.length === 0 ? "Escolha uma senha de pelo menos 6 caracteres." : `Força: ${nome}`}
      </p>
      <ul className="text-xs text-muted-foreground/80 space-y-1">
        {regras.map((r) => (
          <li key={r.rotulo} className={r.ok ? "text-gold/90" : undefined}>
            {r.ok ? "✓" : "•"} {r.rotulo}
          </li>
        ))}
      </ul>
    </div>
  );
}
