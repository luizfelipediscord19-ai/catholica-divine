/**
 * Porteiro dos recursos pessoais.
 *
 * Missões, tarefas do dia, sequências, XP e progresso de leitura só aparecem
 * para quem entrou na conta: são dados da pessoa, não conteúdo público do
 * portal. Quem não entrou vê um convite (ou nada, no modo silencioso).
 */
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import type { ReactNode } from "react";

import { useAuth } from "@/hooks/use-auth";

export function ConviteEntrar({
  titulo = "Recurso da sua conta",
  texto = "Entre na sua conta para acompanhar missões, tarefas do dia, sequência de oração e progresso de leitura. Tudo fica guardado e volta em qualquer aparelho.",
  className = "",
}: {
  titulo?: string;
  texto?: string;
  className?: string;
}) {
  return (
    <section className={`surface-card space-y-4 p-6 md:p-8 ${className}`} data-sem-sumario>
      <p className="kicker">Área de membros</p>
      <h2 className="font-display text-2xl leading-tight text-foreground md:text-3xl">{titulo}</h2>
      <p className="body-sm measure text-muted-foreground">{texto}</p>
      <div className="action-tray">
        <Link to="/auth" className="btn-base btn-gold btn-md gap-2">
          <LogIn className="size-4 shrink-0" /> Entrar ou criar conta
        </Link>
        <Link to="/explorar" className="btn-base btn-quiet btn-md">
          Explorar o conteúdo livre
        </Link>
      </div>
    </section>
  );
}

export function SomenteMembros({
  children,
  /** Não mostra convite algum quando ninguém entrou — apenas oculta o bloco. */
  silencioso = false,
  titulo,
  texto,
  className,
}: {
  children: ReactNode;
  silencioso?: boolean;
  titulo?: string;
  texto?: string;
  className?: string;
}) {
  const { autenticado, carregando } = useAuth();
  if (carregando || !autenticado) {
    if (carregando || silencioso) return null;
    return <ConviteEntrar titulo={titulo} texto={texto} className={className} />;
  }
  return <>{children}</>;
}
