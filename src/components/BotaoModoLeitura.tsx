import { BookOpen, X } from "lucide-react";
import { useModoLeitura } from "../lib/modo-leitura";

/**
 * Botão flutuante que liga/desliga o modo leitura da página de conteúdo.
 * Fica visível também com o modo ativo, para o leitor poder sair.
 */
export function BotaoModoLeitura({ className = "" }: { className?: string }) {
  const { ativo, alternar } = useModoLeitura();

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={ativo}
      title={ativo ? "Sair do modo leitura (R)" : "Modo leitura (R)"}
      className={
        "fixed right-4 bottom-20 lg:bottom-6 z-[60] inline-flex items-center gap-2 min-h-11 px-4 py-3 border text-[10px] uppercase tracking-[0.25em] font-semibold transition-smooth print:hidden " +
        (ativo
          ? "border-gold bg-gold text-deep hover:bg-paper"
          : "border-gold/30 bg-background/90 text-gold backdrop-blur-md hover:border-gold") +
        " " +
        className
      }
    >
      {ativo ? <X className="size-4 shrink-0" /> : <BookOpen className="size-4 shrink-0" />}
      <span>{ativo ? "Sair" : "Leitura"}</span>
    </button>
  );
}
