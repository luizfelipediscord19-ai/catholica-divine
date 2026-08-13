import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

/**
 * Sophia contextual: leva a dúvida do conteúdo que o fiel está lendo
 * diretamente ao assistente, já com a pergunta formulada.
 */
export function PerguntarSophia({
  pergunta,
  rotulo = "Perguntar à Sophia",
  className = "",
}: {
  pergunta: string;
  rotulo?: string;
  className?: string;
}) {
  return (
    <Link
      to="/assistente"
      search={{ q: pergunta.slice(0, 400) }}
      className={`inline-flex min-h-11 items-center gap-2 border border-gold/25 px-3 text-step--2 text-muted-foreground transition-premium hover:border-gold/60 hover:text-gold ${className}`}
    >
      <Sparkles className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
      <span className="truncate">{rotulo}</span>
    </Link>
  );
}

/** Ícone discreto ao lado de um versículo. */
export function SophiaVersiculo({
  livro,
  capitulo,
  versiculo,
}: {
  livro: string;
  capitulo: number;
  versiculo: number;
}) {
  const ref = `${livro} ${capitulo},${versiculo}`;
  return (
    <Link
      to="/assistente"
      search={{ q: `O que ${ref} ensina? Explique à luz da Bíblia, do Catecismo e dos Padres da Igreja.` }}
      aria-label={`Perguntar à Sophia sobre ${ref}`}
      title={`Perguntar à Sophia sobre ${ref}`}
      className="ml-2 inline-flex size-6 translate-y-[2px] items-center justify-center rounded-full text-gold/0 transition-colors group-hover:text-gold/60 hover:!text-gold focus-visible:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
    >
      <Sparkles className="size-3.5" aria-hidden="true" />
    </Link>
  );
}

/** Bloco de estudo guiado no fim de um capítulo da Bíblia. */
export function EstudarComSophia({
  titulo,
  perguntas,
  className = "",
}: {
  titulo: string;
  perguntas: string[];
  className?: string;
}) {
  return (
    <section
      aria-labelledby="estudar-sophia"
      className={`surface-card p-5 sm:p-8 ${className}`}
    >
      <p className="kicker mb-2 flex items-center gap-2">
        <Sparkles className="size-3.5 text-gold" aria-hidden="true" /> Sophia · guia de estudos
      </p>
      <h2 id="estudar-sophia" className="font-display text-step-2 text-foreground">
        Estudar {titulo} com a Sophia
      </h2>
      <p className="mt-2 text-step--1 text-muted-foreground">
        As respostas citam a Sagrada Escritura, o Catecismo, documentos do Magistério e os Padres
        da Igreja.
      </p>
      <div className="mt-5 grid gap-3">
        {perguntas.map((p) => (
          <Link
            key={p}
            to="/assistente"
            search={{ q: p }}
            className="flex min-h-11 items-center gap-3 border border-gold/15 bg-gold/[0.02] px-4 py-3 text-left text-step--1 text-foreground/85 transition-premium hover:border-gold/50 hover:bg-gold/[0.07] hover:text-foreground"
          >
            <Sparkles className="size-3.5 shrink-0 text-gold/70" aria-hidden="true" />
            <span className="min-w-0">{p}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
