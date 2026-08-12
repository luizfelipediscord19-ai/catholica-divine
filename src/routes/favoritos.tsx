import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotebookPen, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Painel, Rotulo, botaoGhostClass, inputClass } from "@/components/portal/comuns";
import { useAuth } from "@/hooks/use-auth";
import { useIdentidade, usePainel } from "@/hooks/use-identidade";
import { LIVROS, getLivro } from "@/lib/data/biblia";
import { apagarNotaFn } from "@/lib/portal.functions";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus Favoritos e Anotações — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/favoritos" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Biblioteca pessoal do Portal Católico: pesquise seus versículos guardados e suas anotações da Bíblia por livro, capítulo ou palavra — sem cadastro.",
      },
      { property: "og:title", content: "Meus Favoritos e Anotações" },
      {
        property: "og:description",
        content: "Todos os versículos guardados e anotações do seu estudo bíblico em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritosPage,
});

function normalizar(v: string) {
  return v
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function nomeLivro(slug: string) {
  return getLivro(slug)?.nome ?? slug;
}

type Aba = "favoritos" | "notas";

function FavoritosPage() {
  const { carregando, desconectado } = useIdentidade();
  const { autenticado } = useAuth();
  const painel = usePainel();
  const [aba, setAba] = useState<Aba>("favoritos");
  const [busca, setBusca] = useState("");
  const [livroFiltro, setLivroFiltro] = useState("");

  const dados = painel.data;

  const favoritos = useMemo(() => {
    const q = normalizar(busca.trim());
    return (dados?.favoritos ?? []).filter(
      (f) =>
        (!livroFiltro || f.livro === livroFiltro) &&
        (!q ||
          normalizar(`${nomeLivro(f.livro)} ${f.capitulo} ${f.versiculo} ${f.texto ?? ""}`).includes(
            q,
          )),
    );
  }, [dados?.favoritos, busca, livroFiltro]);

  const notas = useMemo(() => {
    const q = normalizar(busca.trim());
    return (dados?.notas ?? []).filter(
      (n) =>
        (!livroFiltro || n.livro === livroFiltro) &&
        (!q || normalizar(`${nomeLivro(n.livro)} ${n.capitulo} ${n.conteudo}`).includes(q)),
    );
  }, [dados?.notas, busca, livroFiltro]);

  const livrosUsados = useMemo(() => {
    const slugs = new Set([
      ...(dados?.favoritos ?? []).map((f) => f.livro),
      ...(dados?.notas ?? []).map((n) => n.livro),
    ]);
    return LIVROS.filter((l) => slugs.has(l.slug));
  }, [dados]);

  if (desconectado) {
    return (
      <div className="shell py-block space-y-6">
        <h1 className="title-page text-foreground leading-tight">Biblioteca desconectada</h1>
        <p className="text-sm text-muted-foreground font-light max-w-[36rem] leading-relaxed">
          {autenticado
            ? "Sua conta já está ativa, mas esta aba ainda não reconectou a biblioteca. Recarregue a página para trazer de volta favoritos e anotações."
            : "Você saiu da sua conta, então seus favoritos e anotações também foram desconectados deste navegador. Entre de novo com a mesma conta e tudo volta exatamente como estava."}
        </p>
        <div className="flex flex-wrap gap-3">
          {autenticado ? (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-base btn-gold px-6 py-3 label-btn inline-flex w-fit"
            >
              Recarregar biblioteca
            </button>
          ) : (
            <Link to="/auth" className="btn-base btn-gold px-6 py-3 label-btn inline-flex w-fit">
              Entrar na minha conta
            </Link>
          )}
          <Link
            to="/biblia"
            className="btn-base btn-outline-gold px-6 py-3 label-btn inline-flex w-fit"
          >
            Ler a Bíblia
          </Link>
        </div>
      </div>
    );
  }

  if (!dados && (carregando || painel.isPending || painel.isFetching)) {
    return (
      <div className="shell py-block space-y-6" aria-busy="true">
        <h1 className="title-page text-foreground leading-tight">Favoritos e anotações</h1>
        <p className="text-sm text-muted-foreground font-light max-w-[36rem] leading-relaxed">
          Abrindo sua biblioteca pessoal…
        </p>
        <div className="grid gap-4 md:grid-cols-2" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-gold/15 bg-card/60" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground font-light">
          Demorando?{" "}
          <Link to="/biblia" className="text-gold hover:underline">
            Volte à Bíblia
          </Link>{" "}
          ou{" "}
          <Link to="/auth" className="text-gold hover:underline">
            entre na sua conta
          </Link>{" "}
          para sincronizar seus itens.
        </p>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="shell py-block space-y-6">
        <h1 className="title-page text-foreground leading-tight">Biblioteca indisponível</h1>
        <p className="text-sm text-muted-foreground font-light max-w-[36rem] leading-relaxed">
          Não conseguimos abrir seus favoritos e anotações agora. Tente novamente; se persistir,
          entre na sua conta para recuperar tudo o que já foi guardado.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void painel.refetch()}
            className="btn-base btn-gold px-6 py-3 label-btn inline-flex w-fit"
          >
            Tentar de novo
          </button>
          <Link to="/auth" className="btn-base btn-outline-gold px-6 py-3 label-btn inline-flex w-fit">
            Entrar na minha conta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-block space-y-10">
      <header className="space-y-4">
        <p className="kicker">Biblioteca pessoal</p>
        <h1 className="title-page text-foreground leading-tight">
          Favoritos e anotações
        </h1>
        <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl leading-relaxed">
          {dados.favoritos.length} versículo(s) guardado(s) e {dados.notas.length} anotação(ões).
          Pesquise por palavra ou filtre por livro; cada item leva de volta ao capítulo.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        {(["favoritos", "notas"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAba(v)}
            aria-pressed={aba === v}
            className={`inline-flex items-center gap-2 min-h-11 px-6 py-3 label-btn border transition-premium ${
              aba === v
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold/20 text-paper/70 hover:text-gold hover:border-gold/50"
            }`}
          >
            {v === "favoritos" ? (
              <Star className="size-3.5" aria-hidden="true" />
            ) : (
              <NotebookPen className="size-3.5" aria-hidden="true" />
            )}
            {v === "favoritos" ? `Versículos (${favoritos.length})` : `Anotações (${notas.length})`}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Pesquisar nos seus itens</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gold/60"
            aria-hidden="true"
          />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar por palavra, livro ou capítulo…"
            className={`${inputClass} pl-11`}
          />
        </label>
        <label className="block">
          <span className="sr-only">Filtrar por livro</span>
          <select
            value={livroFiltro}
            onChange={(e) => setLivroFiltro(e.target.value)}
            className={`${inputClass} bg-background text-foreground`}
          >
            <option value="">Todos os livros</option>
            {livrosUsados.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.nome}
              </option>
            ))}
          </select>
        </label>
      </div>

      {aba === "favoritos" ? (
        favoritos.length === 0 ? (
          <Vazio>
            Nenhum versículo encontrado. Toque na estrela ao lado de um versículo na{" "}
            <Link to="/biblia" className="text-gold hover:underline">
              Bíblia
            </Link>{" "}
            para guardá-lo aqui.
          </Vazio>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {favoritos.map((f) => (
              <li key={`${f.livro}-${f.capitulo}-${f.versiculo}`}>
                <Painel className="h-full flex flex-col gap-4">
                  <Rotulo>
                    {nomeLivro(f.livro)} {f.capitulo},{f.versiculo}
                  </Rotulo>
                  {f.texto ? (
                    <p className="text-sm text-foreground/85 font-light leading-relaxed flex-1">
                      {f.texto}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground font-light flex-1">
                      Versículo guardado.
                    </p>
                  )}
                  <Link
                    to="/biblia/$livro/$capitulo"
                    params={{ livro: f.livro, capitulo: String(f.capitulo) }}
                    className="kicker hover:text-paper transition-colors"
                  >
                    Abrir capítulo →
                  </Link>
                </Painel>
              </li>
            ))}
          </ul>
        )
      ) : notas.length === 0 ? (
        <Vazio>
          Nenhuma anotação encontrada. Use o Modo Estudo em qualquer capítulo da{" "}
          <Link to="/biblia" className="text-gold hover:underline">
            Bíblia
          </Link>{" "}
          para registrar suas reflexões.
        </Vazio>
      ) : (
        <ul className="space-y-4">
          {notas.map((n) => (
            <li key={n.id}>
              <NotaCard nota={n} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Vazio({ children }: { children: React.ReactNode }) {
  return (
    <Painel>
      <p className="text-sm text-muted-foreground font-light leading-relaxed">{children}</p>
    </Painel>
  );
}

function NotaCard({
  nota,
}: {
  nota: {
    id: string;
    livro: string;
    capitulo: number;
    versiculo: number | null;
    conteudo: string;
    updated_at?: string | null;
  };
}) {
  const { token } = useIdentidade();
  const queryClient = useQueryClient();

  const apagar = useMutation({
    mutationFn: () => apagarNotaFn({ data: { token: token!, id: nota.id } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["painel"] });
      toast.success("Anotação apagada.");
    },
    onError: () => toast.error("Não foi possível apagar a anotação."),
  });

  return (
    <Painel className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Rotulo>
          {nomeLivro(nota.livro)} {nota.capitulo}
          {nota.versiculo ? `,${nota.versiculo}` : ""}
        </Rotulo>
        <button
          type="button"
          onClick={() => apagar.mutate()}
          disabled={!token || apagar.isPending}
          className="inline-flex items-center gap-2 label-btn text-paper/60 hover:text-gold transition-colors disabled:opacity-50"
        >
          <Trash2 className="size-3.5" aria-hidden="true" /> Apagar
        </button>
      </div>
      <p className="text-sm text-foreground/85 font-light leading-relaxed whitespace-pre-line">
        {nota.conteudo}
      </p>
      <Link
        to="/biblia/$livro/$capitulo"
        params={{ livro: nota.livro, capitulo: String(nota.capitulo) }}
        className={`${botaoGhostClass} self-start`}
      >
        Abrir capítulo
      </Link>
    </Painel>
  );
}
