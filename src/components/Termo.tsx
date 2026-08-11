import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getTermo } from "@/lib/data/glossario";

/**
 * Envolve uma palavra/expressão num texto e exibe a definição
 * do Glossário Católico em hover (desktop) ou tap (mobile).
 *
 * @example
 *   A <Termo termo="graca">graça</Termo> santificante é dom de Deus.
 */
export function Termo({
  termo,
  children,
}: {
  termo: string;
  children: ReactNode;
}) {
  const entrada = getTermo(termo);

  if (!entrada) {
    // Fallback gracioso: se a chave não existir, renderiza o texto cru.
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            className="cursor-help underline decoration-gold/40 decoration-dotted underline-offset-4 hover:decoration-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 rounded-sm transition-colors"
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="max-w-[20rem] bg-deep border border-gold/30 text-paper px-5 py-4 shadow-2xl"
        >
          <p className="kicker mb-2">
            {entrada.termo}
          </p>
          <p className="text-sm leading-relaxed text-paper/90 font-light">
            {entrada.definicao}
          </p>
          {entrada.ref ? (
            <p className="text-[11px] text-gold/60 mt-3 italic">{entrada.ref}</p>
          ) : null}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
