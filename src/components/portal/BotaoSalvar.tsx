import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

import { useItemSalvo } from "@/hooks/use-salvos";
import { ROTULO_TIPO, type TipoSalvo } from "@/lib/salvos";

type Props = {
  tipo: TipoSalvo;
  slug: string;
  titulo: string;
  descricao?: string;
  href: string;
  /** `compacto` mostra apenas o ícone (galerias e listas). */
  compacto?: boolean;
  className?: string;
};

/**
 * Botão de salvar qualquer conteúdo do portal na biblioteca pessoal.
 * Local, imediato e disponível sem conta.
 */
export function BotaoSalvar({
  tipo,
  slug,
  titulo,
  descricao,
  href,
  compacto = false,
  className = "",
}: Props) {
  const { salvo, alternar } = useItemSalvo(tipo, slug);
  const rotulo = salvo ? "Remover dos salvos" : `Salvar ${ROTULO_TIPO[tipo].toLowerCase()}`;

  return (
    <button
      type="button"
      aria-pressed={salvo}
      aria-label={rotulo}
      title={rotulo}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const agora = alternar({ tipo, slug, titulo, descricao, href });
        toast.success(agora ? "Salvo na sua biblioteca." : "Removido dos salvos.");
      }}
      className={
        compacto
          ? `btn-base btn-icon shrink-0 border transition-premium ${
              salvo
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold/25 text-foreground/60 hover:border-gold/60 hover:text-gold"
            } ${className}`
          : `btn-base btn-sm inline-flex ${
              salvo ? "btn-gold" : "btn-outline-gold"
            } ${className}`
      }
    >
      {salvo ? (
        <BookmarkCheck className="size-4" aria-hidden="true" />
      ) : (
        <Bookmark className="size-4" aria-hidden="true" />
      )}
      {compacto ? null : <span>{salvo ? "Salvo" : "Salvar"}</span>}
    </button>
  );
}
