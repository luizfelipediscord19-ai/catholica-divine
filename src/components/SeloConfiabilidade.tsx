/**
 * SELO DE CONFIABILIDADE — Portal Católico
 *
 * Indica ao leitor o nível de autoridade da informação apresentada, evitando
 * que dogma, disciplina, tradição, opinião teológica e devoção sejam
 * confundidos entre si.
 *
 * Categorias (cf. pedido editorial do portal):
 *  🟢 oficial    — Ensinamento oficial (dogma, doutrina, Magistério, CDC)
 *  🔵 tradicao   — Tradição da Igreja / tradição hagiográfica
 *  🟣 historia   — Contexto histórico
 *  🟡 teologia   — Explicação teológica (opinião de escolas teológicas)
 *  ⚪ devocao    — Devoção / prática piedosa
 *  🟠 privada    — Revelação privada (não pertence ao depósito da fé)
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type NivelConfiabilidade =
  | "oficial"
  | "tradicao"
  | "padres"
  | "historia"
  | "teologia"
  | "devocao"
  | "privada";

type Meta = {
  ponto: string;
  rotulo: string;
  nota: string;
  classe: string;
};

export const CONFIABILIDADE: Record<NivelConfiabilidade, Meta> = {
  oficial: {
    ponto: "🟢",
    rotulo: "Ensinamento oficial",
    nota: "Conteúdo fundado na Escritura, no Catecismo, no Direito Canônico ou em documentos do Magistério.",
    classe: "border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300",
  },
  tradicao: {
    ponto: "🔵",
    rotulo: "Tradição da Igreja",
    nota: "Informação transmitida pela tradição cristã ou hagiográfica, não definida como dogma.",
    classe: "border-sky-600/30 bg-sky-600/10 text-sky-700 dark:text-sky-300",
  },
  padres: {
    ponto: "🟣",
    rotulo: "Padres da Igreja",
    nota: "Testemunho dos Padres da Igreja: fonte da Tradição, de grande autoridade, embora nem toda opinião patrística seja definição da fé.",
    classe: "border-violet-600/30 bg-violet-600/10 text-violet-700 dark:text-violet-300",
  },
  historia: {
    ponto: "⚪",
    rotulo: "Contexto histórico",
    nota: "Dado histórico apoiado em fontes; sujeito ao debate próprio da pesquisa histórica.",
    classe: "border-border bg-muted/60 text-muted-foreground",
  },
  teologia: {
    ponto: "🟡",
    rotulo: "Explicação teológica",
    nota: "Formulação da teologia católica que explica a fé, sem constituir definição dogmática.",
    classe: "border-amber-600/30 bg-amber-600/10 text-amber-700 dark:text-amber-300",
  },
  devocao: {
    ponto: "🟠",
    rotulo: "Devoção",
    nota: "Prática piedosa aprovada ou consagrada pelo uso, de adesão livre aos fiéis.",
    classe: "border-orange-600/30 bg-orange-600/10 text-orange-700 dark:text-orange-300",
  },
  privada: {
    ponto: "🔴",
    rotulo: "Revelação privada",
    nota: "Revelações privadas não pertencem ao depósito da fé; a Igreja apenas as reconhece ou não se opõe a elas.",
    classe: "border-rose-600/30 bg-rose-600/10 text-rose-700 dark:text-rose-300",
  },
};

/** Selo compacto, para usar junto de títulos, cards e blocos de conteúdo. */
export function SeloConfiabilidade({
  nivel,
  detalhe,
  className,
}: {
  nivel: NivelConfiabilidade;
  detalhe?: string;
  className?: string;
}) {
  const meta = CONFIABILIDADE[nivel];
  return (
    <span
      title={detalhe ?? meta.nota}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        meta.classe,
        className,
      )}
    >
      <span aria-hidden="true">{meta.ponto}</span>
      <span>{meta.rotulo}</span>
    </span>
  );
}

/** Bloco com selo + explicação, para abrir seções sensíveis. */
export function NotaConfiabilidade({
  nivel,
  children,
  className,
}: {
  nivel: NivelConfiabilidade;
  children?: ReactNode;
  className?: string;
}) {
  const meta = CONFIABILIDADE[nivel];
  return (
    <aside
      className={cn(
        "rounded-lg border px-4 py-3 text-sm leading-relaxed",
        meta.classe,
        className,
      )}
    >
      <p className="font-semibold">
        <span aria-hidden="true">{meta.ponto}</span> {meta.rotulo}
      </p>
      <p className="mt-1 opacity-90">{children ?? meta.nota}</p>
    </aside>
  );
}

/** Legenda completa das categorias, para páginas institucionais. */
export function LegendaConfiabilidade({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-2 sm:grid-cols-2", className)}>
      {(Object.keys(CONFIABILIDADE) as NivelConfiabilidade[]).map((n) => (
        <li key={n} className="flex flex-col gap-1">
          <SeloConfiabilidade nivel={n} className="self-start" />
          <span className="text-sm text-muted-foreground">{CONFIABILIDADE[n].nota}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Faixa de autoridade — elemento visual fixo no alto de cada conteúdo,
 * declarando de onde vem o que o leitor vai ler.
 */
export function FaixaAutoridade({
  niveis,
  nota,
  className,
}: {
  niveis: NivelConfiabilidade[];
  nota?: string;
  className?: string;
}) {
  if (!niveis.length) return null;
  return (
    <div
      data-sem-fontes
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-xl border border-gold/15 bg-card/40 px-3 py-2",
        className,
      )}
    >
      <span className="kicker mr-1 shrink-0">Autoridade</span>
      {niveis.map((n) => (
        <SeloConfiabilidade key={n} nivel={n} />
      ))}
      {nota ? (
        <span className="w-full text-step--2 text-muted-foreground sm:w-auto">{nota}</span>
      ) : null}
    </div>
  );
}
