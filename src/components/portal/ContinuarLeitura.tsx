import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { LIVROS, getLivro } from "@/lib/data/biblia";
import { usePainel } from "@/hooks/use-identidade";

export const TOTAL_CAPITULOS = LIVROS.reduce((s, l) => s + l.capitulos, 0);

type Leitura = { livro: string; capitulo: number };

/** Próximo capítulo a ler: continua o livro da última leitura ou sugere João. */
export function proximoCapitulo(ultima: Leitura | null, lidos: Leitura[]) {
  const lidosSet = new Set(lidos.map((l) => `${l.livro}:${l.capitulo}`));
  const base = ultima ? getLivro(ultima.livro) : undefined;

  if (base) {
    for (let c = ultima!.capitulo + 1; c <= base.capitulos; c += 1) {
      if (!lidosSet.has(`${base.slug}:${c}`)) return { livro: base, capitulo: c };
    }
    for (let c = 1; c <= base.capitulos; c += 1) {
      if (!lidosSet.has(`${base.slug}:${c}`)) return { livro: base, capitulo: c };
    }
  }

  const joao = getLivro("joao")!;
  for (let c = 1; c <= joao.capitulos; c += 1) {
    if (!lidosSet.has(`joao:${c}`)) return { livro: joao, capitulo: c };
  }
  return { livro: joao, capitulo: 1 };
}

/** Cartão "Continuar de onde parei" — usa o progresso da identidade anônima. */
export function ContinuarLeitura({ className = "" }: { className?: string }) {
  const painel = usePainel();
  const dados = painel.data;
  if (!dados) return null;

  const alvo = proximoCapitulo(dados.ultimaLeitura ?? null, dados.leituras);
  const lidos = dados.leituras.length;
  const pct = Math.round((lidos / TOTAL_CAPITULOS) * 100);
  const primeiraVez = lidos === 0;

  return (
    <section
      className={`surface-card backdrop-blur-sm p-6 md:p-8 space-y-5 ${className}`}
    >
      <p className="kicker">
        {primeiraVez ? "Comece sua leitura" : "Continuar de onde parei"}
      </p>
      <h2 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
        {alvo.livro.nome} <span className="text-gold">{alvo.capitulo}</span>
      </h2>
      <p className="text-sm text-muted-foreground font-light leading-relaxed">
        {primeiraVez
          ? "Sugerimos iniciar pelo Evangelho de São João — cada capítulo lido guarda seu progresso e rende XP."
          : `Você já leu ${lidos} de ${TOTAL_CAPITULOS} capítulos da Bíblia (${pct}%).`}
      </p>
      <div className="h-1 w-full bg-gold/10" aria-hidden="true">
        <div className="h-full bg-gold transition-all" style={{ width: `${Math.max(pct, 1)}%` }} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to="/biblia/$livro/$capitulo"
          params={{ livro: alvo.livro.slug, capitulo: String(alvo.capitulo) }}
          className="btn-base btn-gold px-6 py-2 label-btn"
        >
          <BookOpen className="size-3.5" aria-hidden="true" />
          {primeiraVez ? "Começar a ler" : "Continuar leitura"}
        </Link>
        <Link
          to="/biblia"
          className="kicker hover:underline"
        >
          Ver todos os livros
        </Link>
      </div>
    </section>
  );
}

/** Progresso por livro, mostrando apenas os livros já iniciados. */
export function ProgressoPorLivro({ leituras }: { leituras: Leitura[] }) {
  const porLivro = new Map<string, number>();
  for (const l of leituras) porLivro.set(l.livro, (porLivro.get(l.livro) ?? 0) + 1);

  const itens = [...porLivro.entries()]
    .map(([slug, qtd]) => ({ livro: getLivro(slug), qtd }))
    .filter((i): i is { livro: NonNullable<ReturnType<typeof getLivro>>; qtd: number } =>
      Boolean(i.livro),
    )
    .sort((a, b) => b.qtd / b.livro.capitulos - a.qtd / a.livro.capitulos)
    .slice(0, 8);

  if (itens.length === 0) {
    return (
      <p className="text-sm text-muted-foreground font-light">
        Nenhum capítulo marcado ainda. Cada leitura aparece aqui.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {itens.map(({ livro, qtd }) => {
        const pct = Math.round((qtd / livro.capitulos) * 100);
        return (
          <li key={livro.slug} className="space-y-2">
            <div className="flex items-baseline justify-between gap-4 text-xs">
              <Link
                to="/biblia/$livro"
                params={{ livro: livro.slug }}
                className="text-foreground/85 hover:text-gold transition-premium"
              >
                {livro.nome}
              </Link>
              <span className="text-muted-foreground tabular-nums">
                {qtd}/{livro.capitulos} · {pct}%
              </span>
            </div>
            <div className="h-1 w-full bg-gold/10" aria-hidden="true">
              <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
