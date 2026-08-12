import { Link } from "@tanstack/react-router";
import { Cloud, Smartphone, UserX } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useIdentidade } from "@/hooks/use-identidade";

/**
 * Fonte única de verdade visual sobre onde o progresso está guardado.
 * Aparece no Painel e na Biblioteca para que o visitante nunca precise
 * adivinhar se está usando identidade do aparelho, conta ou nada.
 */
export function EstadoSessao({ className = "" }: { className?: string }) {
  const { autenticado, user, carregando: carregandoConta } = useAuth();
  const { token, desconectado, carregando } = useIdentidade();

  if (carregando || carregandoConta) return null;

  const estado = autenticado
    ? ("conta" as const)
    : desconectado || !token
      ? ("nenhum" as const)
      : ("aparelho" as const);

  const Icone = estado === "conta" ? Cloud : estado === "aparelho" ? Smartphone : UserX;

  const titulo =
    estado === "conta"
      ? "Progresso sincronizado na sua conta"
      : estado === "aparelho"
        ? "Progresso guardado neste aparelho"
        : "Nenhum progresso sendo guardado";

  const texto =
    estado === "conta"
      ? `Conectado como ${user?.email ?? "sua conta"}. Leituras, favoritos, anotações e conquistas acompanham você em qualquer aparelho.`
      : estado === "aparelho"
        ? "Seu caminho está salvo sob uma identidade anônima deste navegador. Criar uma conta leva tudo isso para outros aparelhos — nada é perdido na migração."
        : "Você saiu da conta e este navegador não está guardando dados novos. Entre de novo para recuperar tudo o que já estava salvo.";

  return (
    <aside
      className={`surface-card p-5 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5 ${className}`}
      aria-label="Estado da sua sessão"
    >
      <span className="size-9 shrink-0 grid place-items-center rounded-full border border-gold/30 text-gold">
        <Icone className="size-4" aria-hidden="true" />
      </span>
      <div className="space-y-2 min-w-0">
        <p className="kicker">{titulo}</p>
        <p className="text-sm text-muted-foreground font-light leading-relaxed">{texto}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          {estado === "conta" ? null : (
            <Link to="/auth" className="kicker text-gold hover:underline">
              {estado === "aparelho" ? "Criar conta e sincronizar" : "Entrar na minha conta"}
            </Link>
          )}
          <Link to="/privacidade" className="kicker hover:underline">
            Onde ficam meus dados
          </Link>
        </div>
      </div>
    </aside>
  );
}
