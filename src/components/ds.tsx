/**
 * DESIGN SYSTEM — Portal Católico
 *
 * Ponto único de entrada para os primitivos de layout, tipografia e superfície.
 * Regra do projeto: páginas importam daqui em vez de repetir combinações soltas
 * de classes. Todos os valores vêm dos tokens definidos em `src/styles.css`
 * (cores, escala tipográfica `--step-*`, espaçamentos `--space-*`, raios e sombras).
 */
import type { ElementType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/* ============================================================
   LAYOUT
   ============================================================ */

type Largura = "narrow" | "mid" | "default" | "wide";

const SHELL: Record<Largura, string> = {
  narrow: "shell-narrow",
  mid: "shell-mid",
  default: "shell",
  wide: "shell-wide",
};

/** Container padrão: mesma gutter lateral em todo o portal. */
export function Container({
  largura = "default",
  className,
  children,
}: {
  largura?: Largura;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn(SHELL[largura], className)}>{children}</div>;
}

/** Empilhamento vertical com ritmo padronizado. */
export function Stack({
  espaco = "sm",
  className,
  children,
}: {
  espaco?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        espaco === "sm" ? "stack-sm" : espaco === "lg" ? "stack-lg" : "stack",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Linha horizontal segura em telas estreitas (texto encolhe, ícones não). */
export function Row({
  className,
  children,
  align = "center",
}: {
  className?: string;
  children: ReactNode;
  align?: "start" | "center" | "between";
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap gap-xs",
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "between" && "items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Grid responsivo por largura mínima de coluna — nunca quebra em mobile. */
export function Grid({
  min = "17rem",
  className,
  children,
}: {
  min?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("grid gap-sm", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }}
    >
      {children}
    </div>
  );
}

/** Seção de página com ritmo vertical, kicker e título opcionais. */
export function Secao({
  id,
  kicker,
  titulo,
  descricao,
  acao,
  largura = "default",
  ritmo = "block",
  className,
  children,
}: {
  id?: string;
  kicker?: ReactNode;
  titulo?: ReactNode;
  descricao?: ReactNode;
  acao?: ReactNode;
  largura?: Largura;
  ritmo?: "block" | "section" | "compacto";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        SHELL[largura],
        ritmo === "section" ? "py-section" : ritmo === "compacto" ? "py-block-sm" : "py-block",
        "scroll-mt-28",
        className,
      )}
    >
      {(kicker || titulo || descricao || acao) && (
        <TituloSecao kicker={kicker} titulo={titulo} descricao={descricao} acao={acao} />
      )}
      {children}
    </section>
  );
}

/** Cabeçalho de bloco reutilizável (também serve dentro de cards e painéis). */
export function TituloSecao({
  kicker,
  titulo,
  descricao,
  acao,
  nivel = "h2",
  className,
}: {
  kicker?: ReactNode;
  titulo?: ReactNode;
  descricao?: ReactNode;
  acao?: ReactNode;
  nivel?: "h2" | "h3";
  className?: string;
}) {
  const Tag = nivel as ElementType;
  return (
    <header
      className={cn(
        "mb-md grid grid-cols-[minmax(0,1fr)_auto] items-end gap-xs sm:flex sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 stack-sm">
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        {titulo ? (
          <Tag className={nivel === "h2" ? "title-section" : "title-card"}>{titulo}</Tag>
        ) : null}
        {descricao ? <p className="body-sm measure">{descricao}</p> : null}
      </div>
      {acao ? <div className="shrink-0 self-end">{acao}</div> : null}
    </header>
  );
}

/* ============================================================
   TIPOGRAFIA
   ============================================================ */

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("kicker inline-flex items-center gap-2", className)}>
      <span aria-hidden className="h-px w-5 shrink-0 bg-gold/40" />
      <span className="min-w-0">{children}</span>
    </span>
  );
}

export function Titulo({
  nivel = 2,
  children,
  className,
}: {
  nivel?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}) {
  const Tag = `h${nivel}` as ElementType;
  const estilo =
    nivel === 1 ? "title-page" : nivel === 2 ? "title-section" : nivel === 3 ? "title-card" : "title-sub";
  return <Tag className={cn(estilo, className)}>{children}</Tag>;
}

export function Texto({
  variante = "base",
  children,
  className,
}: {
  variante?: "lead" | "base" | "sm" | "meta";
  children: ReactNode;
  className?: string;
}) {
  const estilo =
    variante === "lead"
      ? "body-lead"
      : variante === "sm"
        ? "body-sm"
        : variante === "meta"
          ? "body-meta uppercase"
          : "body-base";
  return <p className={cn(estilo, className)}>{children}</p>;
}

/* ============================================================
   SUPERFÍCIES
   ============================================================ */

/** Painel/card padrão. Use `como="a"`/`para` para versão clicável. */
export function Painel({
  children,
  className,
  interativo = false,
  para,
  href,
}: {
  children: ReactNode;
  className?: string;
  interativo?: boolean;
  para?: string;
  href?: string;
}) {
  const classes = cn(
    "surface-card p-card min-w-0",
    (interativo || para || href) && "surface-card-interactive focus-ring",
    className,
  );

  if (para) {
    return (
      <Link to={para} className={cn("block", classes)}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cn("block", classes)}>
        {children}
      </a>
    );
  }
  return <div className={classes}>{children}</div>;
}

/** Etiqueta informativa. */
export function Chip({
  children,
  tom = "neutro",
  className,
  interativo = false,
}: {
  children: ReactNode;
  tom?: "neutro" | "ouro" | "sucesso" | "atencao" | "info";
  className?: string;
  interativo?: boolean;
}) {
  return (
    <span
      className={cn(
        "chip",
        tom === "ouro" && "chip-gold",
        tom === "sucesso" && "border-success/45 bg-success/12 text-success",
        tom === "atencao" && "border-warning/45 bg-warning/12 text-warning",
        tom === "info" && "border-info/45 bg-info/12 text-info",
        interativo && "chip-interactive",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Aviso/destaque contextual. */
export function Aviso({
  tom = "info",
  titulo,
  children,
  className,
}: {
  tom?: "info" | "sucesso" | "atencao" | "ouro";
  titulo?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const borda =
    tom === "sucesso"
      ? "border-success/40 bg-success/8"
      : tom === "atencao"
        ? "border-warning/40 bg-warning/8"
        : tom === "ouro"
          ? "border-gold/35 bg-gold/8"
          : "border-info/40 bg-info/8";
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border p-card stack-sm min-w-0",
        borda,
        className,
      )}
    >
      {titulo ? <p className="title-sub">{titulo}</p> : null}
      {children ? <div className="body-sm measure">{children}</div> : null}
    </div>
  );
}

/** Métrica destacada (painel espiritual, estatísticas, progresso). */
export function Metrica({
  rotulo,
  valor,
  detalhe,
  className,
}: {
  rotulo: ReactNode;
  valor: ReactNode;
  detalhe?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("surface-card p-card stack-sm min-w-0", className)}>
      <p className="kicker">{rotulo}</p>
      <p className="font-display text-step-3 leading-none text-gold">{valor}</p>
      {detalhe ? <p className="body-sm">{detalhe}</p> : null}
    </div>
  );
}

/** Estado vazio padronizado. */
export function EstadoVazio({
  titulo,
  descricao,
  acao,
  className,
}: {
  titulo: ReactNode;
  descricao?: ReactNode;
  acao?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-card p-card measure mx-auto stack text-center items-center",
        className,
      )}
    >
      <p className="title-card">{titulo}</p>
      {descricao ? <p className="body-sm">{descricao}</p> : null}
      {acao ? <div className="pt-2xs">{acao}</div> : null}
    </div>
  );
}

/** Divisória com respiro padronizado. */
export function Divisor({ className }: { className?: string }) {
  return <hr className={cn("hairline my-md border-t", className)} />;
}

/** Lista de definições (glossário, fichas de santos, referências). */
export function ListaDefinicoes({
  itens,
  className,
}: {
  itens: { termo: ReactNode; valor: ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={cn("stack-sm min-w-0", className)}>
      {itens.map((item, i) => (
        <div key={i} className="grid gap-2xs border-t hairline pt-xs first:border-t-0 first:pt-0">
          <dt className="kicker">{item.termo}</dt>
          <dd className="body-base min-w-0">{item.valor}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Reexporta os primitivos de conteúdo já existentes para que exista
   um único ponto de importação do design system. */
export { PageHero, Section, CardGrid, ContentCard, Prose, Sources, Pullquote } from "./PageShell";
