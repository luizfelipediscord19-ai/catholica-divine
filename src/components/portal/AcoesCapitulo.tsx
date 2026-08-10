import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Star } from "lucide-react";
import { toast } from "sonner";

import { useCelebracao } from "@/components/portal/Celebracao";
import { useIdentidade } from "@/hooks/use-identidade";
import { notificar } from "@/lib/notificacoes";
import {
  alternarFavoritoFn,
  marcarCapituloFn,
  obterCapituloFn,
} from "@/lib/portal.functions";


/** Estado pessoal (leitura/favoritos) de um capítulo, para a identidade anônima. */
export function useCapituloPessoal(livro: string, capitulo: number) {
  const { token } = useIdentidade();
  const queryClient = useQueryClient();
  const { celebrarConquistas } = useCelebracao();
  const chave = ["capitulo-pessoal", token, livro, capitulo];

  const estado = useQuery({
    queryKey: chave,
    enabled: Boolean(token),
    queryFn: () => obterCapituloFn({ data: { token: token!, livro, capitulo } }),
  });

  const invalidar = () => {
    void queryClient.invalidateQueries({ queryKey: chave });
    void queryClient.invalidateQueries({ queryKey: ["painel"] });
    void queryClient.invalidateQueries({ queryKey: ["identidade"] });
  };

  const marcar = useMutation({
    mutationFn: (lido: boolean) =>
      marcarCapituloFn({ data: { token: token!, livro, capitulo, lido } }),
    onSuccess: (res) => {
      invalidar();
      toast.success(res.lido ? "Capítulo marcado como lido. +10 XP" : "Marcação removida.");
      if (res.lido) {
        notificar({
          tipo: "leitura",
          titulo: `Leitura concluída: ${livro} ${capitulo}`,
          mensagem: "+10 XP somados ao seu caminho espiritual.",
          href: "/painel",
        });
      }
      celebrarConquistas(res.novasConquistas);
    },
    onError: () => toast.error("Não foi possível salvar sua leitura."),
  });

  const favoritar = useMutation({
    mutationFn: (v: { versiculo: number; texto?: string }) =>
      alternarFavoritoFn({ data: { token: token!, livro, capitulo, ...v } }),
    onSuccess: (res) => {
      invalidar();
      toast.success(res.favorito ? "Versículo guardado. +5 XP" : "Versículo removido.");
      if (res.favorito) {
        notificar({
          tipo: "nota",
          titulo: "Versículo guardado nos favoritos",
          mensagem: `${livro} ${capitulo} — disponível em Favoritos.`,
          href: "/favoritos",
        });
      }
      celebrarConquistas(res.novasConquistas);
    },

    onError: () => toast.error("Não foi possível guardar o versículo."),
  });

  return {
    pronto: Boolean(token),
    lido: estado.data?.lido ?? false,
    favoritos: estado.data?.favoritos ?? [],
    marcar,
    favoritar,
  };
}

export function BarraLeitura({
  lido,
  pronto,
  pendente,
  onAlternar,
}: {
  lido: boolean;
  pronto: boolean;
  pendente: boolean;
  onAlternar: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4 surface-card backdrop-blur-sm px-6 py-4">
      <button
        type="button"
        disabled={!pronto || pendente}
        onClick={onAlternar}
        className={`inline-flex items-center gap-2 min-h-11 px-5 py-2 text-[10px] uppercase tracking-[0.25em] font-bold transition-premium disabled:opacity-50 ${
          lido
            ? "bg-gold/15 text-gold border border-gold/40"
            : "bg-gold text-deep hover:bg-paper"
        }`}
      >
        <Check className="size-3.5" aria-hidden="true" />
        {lido ? "Capítulo lido" : pendente ? "Salvando…" : "Marcar como lido"}
      </button>
      <p className="text-[11px] text-muted-foreground font-light">
        Progresso salvo na sua identidade anônima — veja tudo no seu painel espiritual.
      </p>
    </div>
  );
}

export function EstrelaVersiculo({
  ativa,
  onClick,
  disabled,
}: {
  ativa: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ativa ? "Remover dos versículos guardados" : "Guardar este versículo"}
      className={`absolute -left-1 top-6 grid size-7 place-items-center rounded-full transition-premium disabled:opacity-40 ${
        ativa ? "text-gold" : "text-gold/20 hover:text-gold/70"
      }`}
    >
      <Star className={`size-3.5 ${ativa ? "fill-current" : ""}`} aria-hidden="true" />
    </button>
  );
}
