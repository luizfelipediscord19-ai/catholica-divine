import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { PageHero } from "@/components/PageShell";
import { Painel, Rotulo, botaoClass, botaoGhostClass } from "@/components/portal/comuns";
import { supabase } from "@/integrations/supabase/client";
import { traduzirErroAuth } from "@/lib/auth/traduzir-erro";

export const Route = createFileRoute("/email-confirmado")({
  head: () => ({
    meta: [
      { title: "E-mail confirmado — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/email-confirmado" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Sua conta do Portal Católico foi confirmada. Entre no fórum Agora Ecclesiae e continue seu caminho espiritual.",
      },
      { property: "og:title", content: "E-mail confirmado — Portal Católico" },
      {
        property: "og:description",
        content: "Conta confirmada com sucesso. Bem-vindo ao Portal Católico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailConfirmadoPage,
});

type Estado = "verificando" | "ok" | "erro";

function EmailConfirmadoPage() {
  const [estado, setEstado] = useState<Estado>("verificando");
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let vivo = true;

    async function confirmar() {
      try {
        const url = new URL(window.location.href);
        const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
        const erroDescricao = url.searchParams.get("error_description") ?? hash.get("error_description");
        if (erroDescricao) throw new Error(erroDescricao);

        const code = url.searchParams.get("code");
        const tokenHash = url.searchParams.get("token_hash");
        const tipo = url.searchParams.get("type");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (tokenHash) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: (tipo as "signup" | "email" | "email_change") ?? "signup",
          });
          if (error) throw error;
        } else if (!hash.get("access_token")) {
          // Sem parâmetros: pode ser um acesso direto à página. Só confirmamos
          // se já existir sessão ativa.
          const { data } = await supabase.auth.getSession();
          if (!data.session) throw new Error("O link expirou ou já foi usado.");
        }

        if (!vivo) return;
        setEstado("ok");
        // Limpa os parâmetros sensíveis da barra de endereço.
        window.history.replaceState({}, "", "/email-confirmado");
      } catch (e) {
        if (!vivo) return;
        setErro(traduzirErroAuth(e));
        setEstado("erro");
      }
    }

    void confirmar();
    return () => {
      vivo = false;
    };
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Sua conta"
        title={
          <>
            E-mail <span className="italic font-light text-gold">confirmado</span>
          </>
        }
        intro="Obrigado por confirmar seu endereço. Sua conta está pronta para participar do fórum e guardar seu progresso espiritual."
      />

      <div className="max-w-xl mx-auto px-6 py-16">
        <Painel>
          {estado === "verificando" ? (
            <p className="text-sm text-muted-foreground">Confirmando seu e-mail…</p>
          ) : estado === "ok" ? (
            <>
              <Rotulo>Tudo certo</Rotulo>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                Seja bem-vindo ao Portal Católico. Você já pode escrever no fórum{" "}
                <span className="text-gold">Agora Ecclesiae</span> e acompanhar seu caminho no painel
                espiritual.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void navigate({ to: "/painel" })}
                  className={botaoClass}
                >
                  Ir para o painel espiritual
                </button>
                <Link to="/forum" className={botaoGhostClass}>
                  Entrar no fórum
                </Link>
                <Link to="/" className={botaoGhostClass}>
                  Página inicial
                </Link>
              </div>
            </>
          ) : (
            <>
              <Rotulo>Não conseguimos confirmar</Rotulo>
              <p role="alert" className="text-sm text-destructive-text mb-6">
                {erro ?? "O link expirou ou já foi usado."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/auth" className={botaoClass}>
                  Entrar ou pedir novo link
                </Link>
                <Link to="/" className={botaoGhostClass}>
                  Página inicial
                </Link>
              </div>
            </>
          )}
        </Painel>
      </div>
    </div>
  );
}
