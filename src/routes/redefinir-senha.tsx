import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/PageShell";
import { Painel, Rotulo, botaoClass, inputClass } from "@/components/portal/comuns";
import { supabase } from "@/integrations/supabase/client";
import { traduzirErroAuth } from "@/lib/auth/traduzir-erro";

export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({
    meta: [
      { title: "Criar nova senha — Portal Católico" },
      { property: "og:url", content: "https://catholica-divine.lovable.app/redefinir-senha" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Defina uma nova senha para a sua conta do Portal Católico.",
      },
      { property: "og:title", content: "Criar nova senha — Portal Católico" },
      { property: "og:description", content: "Defina uma nova senha para a sua conta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RedefinirSenhaPage,
});

function RedefinirSenhaPage() {
  const [senha, setSenha] = useState("");
  const [pronto, setPronto] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // O link de recuperação chega com a sessão temporária no hash da URL.
    const { data: sub } = supabase.auth.onAuthStateChange((evento, sessao) => {
      if (evento === "PASSWORD_RECOVERY" || sessao) setPronto(true);
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) setPronto(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: senha });
      if (error) throw error;
      toast.success("Senha atualizada. Você já está conectado.");
      void navigate({ to: "/forum" });
    } catch (err) {
      setErro(traduzirErroAuth(err));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <PageHero
        eyebrow="Sua conta"
        title={
          <>
            Criar <span className="italic font-light text-gold">nova senha</span>
          </>
        }
        intro="Escolha uma senha forte, com pelo menos 8 caracteres, que você não use em outros sites."
      />

      <div className="max-w-xl mx-auto px-6 py-16">
        <Painel>
          <Rotulo>Nova senha</Rotulo>
          {pronto ? (
            <form className="space-y-5" onSubmit={enviar} noValidate>
              <label className="block space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60">Senha</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  maxLength={72}
                  className={inputClass}
                />
              </label>
              <button
                type="submit"
                disabled={senha.length < 8 || enviando}
                className={botaoClass}
              >
                {enviando ? "Salvando…" : "Salvar senha"}
              </button>
              {erro ? (
                <p role="alert" className="text-sm text-destructive-text">
                  {erro}
                </p>
              ) : null}
            </form>
          ) : (
            <p className="text-sm text-muted-foreground font-light">
              Abra esta página pelo link que enviamos no e-mail de recuperação. Se o link expirou,
              peça um novo na página de conta.
            </p>
          )}
        </Painel>
      </div>
    </div>
  );
}
