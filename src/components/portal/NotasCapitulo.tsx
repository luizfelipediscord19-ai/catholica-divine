import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotebookPen, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useCelebracao } from "@/components/portal/Celebracao";
import { useIdentidade } from "@/hooks/use-identidade";
import { notificar } from "@/lib/notificacoes";
import { apagarNotaFn, obterCapituloFn, salvarNotaFn } from "@/lib/portal.functions";


type Nota = { id: string; versiculo: number | null; conteudo: string; updated_at: string };

/** Anotações pessoais do capítulo — modo estudo, sem cadastro. */
export function NotasCapitulo({
  livro,
  capitulo,
  className = "",
}: {
  livro: string;
  capitulo: number;
  className?: string;
}) {
  const { token } = useIdentidade();
  const queryClient = useQueryClient();
  const { celebrarConquistas } = useCelebracao();
  const chave = ["capitulo-pessoal", token, livro, capitulo];

  const [conteudo, setConteudo] = useState("");
  const [versiculo, setVersiculo] = useState("");

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

  const salvar = useMutation({
    mutationFn: () =>
      salvarNotaFn({
        data: {
          token: token!,
          livro,
          capitulo,
          versiculo: versiculo ? Number(versiculo) : undefined,
          conteudo: conteudo.trim(),
        },
      }),
    onSuccess: (res) => {
      setConteudo("");
      setVersiculo("");
      invalidar();
      toast.success("Anotação guardada. +10 XP");
      notificar({
        tipo: "nota",
        titulo: `Anotação guardada em ${livro} ${capitulo}`,
        mensagem: "Suas notas de estudo ficam reunidas em Favoritos.",
        href: "/favoritos",
      });
      celebrarConquistas(res.novasConquistas);

    },
    onError: () => toast.error("Não foi possível guardar a anotação."),
  });

  const apagar = useMutation({
    mutationFn: (id: string) => apagarNotaFn({ data: { token: token!, id } }),
    onSuccess: () => {
      invalidar();
      toast.success("Anotação removida.");
    },
    onError: () => toast.error("Não foi possível remover a anotação."),
  });

  const notas = (estado.data?.notas ?? []) as Nota[];
  const podeSalvar = Boolean(token) && conteudo.trim().length > 0 && !salvar.isPending;

  return (
    <section
      className={`surface-card backdrop-blur-sm p-8 md:p-10 space-y-6 ${className}`}
    >
      <div className="flex items-center gap-2 kicker">
        <NotebookPen className="size-3.5" aria-hidden="true" /> Minhas anotações
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (podeSalvar) salvar.mutate();
        }}
      >
        <div className="flex flex-wrap items-end gap-4">
          <label className="label-btn text-muted-foreground">
            Versículo (opcional)
            <input
              type="number"
              min={1}
              value={versiculo}
              onChange={(e) => setVersiculo(e.target.value)}
              placeholder="ex. 16"
              className="block mt-1 w-24 bg-background border border-gold/25 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
            />
          </label>
        </div>
        <label className="block label-btn text-muted-foreground">
          Reflexão
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            rows={4}
            maxLength={4000}
            placeholder="O que este capítulo diz ao seu coração hoje?"
            className="block mt-1 w-full bg-background border border-gold/25 px-4 py-3 text-sm font-light leading-relaxed text-foreground focus:outline-none focus:border-gold"
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={!podeSalvar}
            className="btn-base btn-gold px-6 py-2 label-btn"
          >
            {salvar.isPending ? "Salvando…" : "Guardar anotação"}
          </button>
          <p className="text-[11px] text-muted-foreground font-light">
            Guardado na sua identidade anônima deste navegador. +10 XP por anotação.
          </p>
        </div>
      </form>

      {notas.length > 0 && (
        <ul className="space-y-4 pt-2">
          {notas.map((n) => (
            <li key={n.id} className="border-t border-gold/10 pt-4 flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <p className="kicker">
                  {n.versiculo ? `Versículo ${n.versiculo}` : "Capítulo"} ·{" "}
                  {new Date(n.updated_at).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-sm text-foreground/85 font-light leading-relaxed whitespace-pre-wrap">
                  {n.conteudo}
                </p>
              </div>
              <button
                type="button"
                onClick={() => apagar.mutate(n.id)}
                disabled={apagar.isPending}
                aria-label="Apagar anotação"
                className="mt-1 grid size-9 place-items-center text-gold/40 hover:text-gold transition-premium disabled:opacity-40"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
