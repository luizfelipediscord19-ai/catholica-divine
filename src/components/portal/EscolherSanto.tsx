import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Search } from "lucide-react";
import { toast } from "sonner";

import { Rotulo, botaoClass, inputClass } from "@/components/portal/comuns";
import { garantirTokenAgora } from "@/hooks/use-identidade";
import { SANTOS_LISTA } from "@/lib/santos-lista";
import { SANTOS } from "@/lib/data/santos";
import { imagemSanto } from "@/lib/data/santos-imagens";
import { escolherSantoFn } from "@/lib/portal.functions";

function imagemDe(slug: string): { url: string; remoto?: string } | null {
  const propria = imagemSanto(slug);
  if (propria) return { url: propria.url, remoto: propria.remoto };
  const rico = SANTOS.find((s) => s.slug === slug)?.imagem;
  return rico ? { url: rico } : null;
}

function normalizar(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Aba de escolha do santo padroeiro: o membro pesquisa e escolhe entre todos
 * os santos do portal, em vez de receber um sorteado.
 */
export function EscolherSanto({
  atual,
  onEscolhido,
  titulo = "Escolha seu santo padroeiro",
  descricao = "Ele acompanhará seu caminho espiritual, aparecerá no seu painel e nas suas conversas no fórum.",
}: {
  atual?: string | null;
  onEscolhido?: () => void;
  titulo?: string;
  descricao?: string;
}) {
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<string | null>(atual ?? null);
  const queryClient = useQueryClient();

  const lista = useMemo(() => {
    const termo = normalizar(busca.trim());
    const base = [...SANTOS_LISTA].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    if (!termo) return base;
    return base.filter(
      (s) => normalizar(s.nome).includes(termo) || normalizar(s.body).includes(termo),
    );
  }, [busca]);

  const salvar = useMutation({
    mutationFn: async (slug: string) => {
      const token = await garantirTokenAgora();
      return escolherSantoFn({ data: { token, slug } });
    },
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: ["painel"] });
      void queryClient.invalidateQueries({ queryKey: ["identidade"] });
      toast.success(`${res.santoNome} agora é seu padroeiro.`);
      onEscolhido?.();
    },
    onError: (erro: Error) => toast.error(erro.message || "Não foi possível salvar."),
  });

  return (
    <section className="border border-gold/15 bg-card/40 backdrop-blur-md p-6 md:p-10 space-y-8">
      <header className="space-y-3">
        <Rotulo>{titulo}</Rotulo>
        <p className="text-sm text-muted-foreground font-light max-w-2xl leading-relaxed">
          {descricao}
        </p>
      </header>

      <label className="block relative max-w-md">
        <Search
          className="size-4 text-gold/70 absolute left-3 top-1/2 -translate-y-1/2"
          aria-hidden="true"
        />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar entre os santos…"
          aria-label="Buscar santo"
          className={`${inputClass} pl-10`}
        />
      </label>

      <div className="max-h-[26rem] overflow-y-auto pr-1">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((s) => {
            const ativo = selecionado === s.slug;
            const imagem = imagemDe(s.slug);
            return (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => setSelecionado(s.slug)}
                  aria-pressed={ativo}
                  className={`w-full h-full text-left flex items-start gap-3 border p-4 transition-premium ${
                    ativo
                      ? "border-gold bg-gold/10"
                      : "border-gold/10 bg-background/30 hover:border-gold/40"
                  }`}
                >
                  {imagem ? (
                    <img
                      src={imagem}
                      alt=""
                      loading="lazy"
                      className="size-10 rounded-full object-cover border border-gold/30 shrink-0"
                    />
                  ) : (
                    <span className="size-10 rounded-full border border-gold/25 grid place-items-center font-display text-gold shrink-0">
                      {s.nome.replace(/^(São|Santo|Santa)\s+/i, "").slice(0, 1)}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base text-foreground leading-snug">
                      {s.nome}
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gold/70 mt-1">
                      {s.data}
                    </span>
                  </span>
                  {ativo ? <Check className="size-4 text-gold shrink-0" aria-hidden="true" /> : null}
                </button>
              </li>
            );
          })}
          {lista.length === 0 ? (
            <li className="text-sm text-muted-foreground font-light">
              Nenhum santo encontrado com esse nome.
            </li>
          ) : null}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={!selecionado || salvar.isPending}
          onClick={() => selecionado && salvar.mutate(selecionado)}
          className={botaoClass}
        >
          {salvar.isPending ? "Salvando…" : "Confirmar padroeiro"}
        </button>
        <p className="text-xs text-muted-foreground font-light">
          {selecionado
            ? `Selecionado: ${SANTOS_LISTA.find((s) => s.slug === selecionado)?.nome ?? ""}`
            : "Selecione um santo para continuar."}
        </p>
      </div>
    </section>
  );
}
