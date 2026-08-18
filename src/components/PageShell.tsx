import type { ReactNode } from "react";
import { ImagemOtimizada } from "./ImagemOtimizada";
import { obraDaUrl } from "@/lib/data/obras";
import { linkificarNos } from "./CitacoesLinkadas";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  image?: string;
}) {
  const obra = obraDaUrl(image);
  return (
    <section data-leitura-oculto className="relative overflow-hidden bg-deep">
      {image ? (
        <div className="absolute inset-0 scale-105 opacity-45" aria-hidden>
          <ImagemOtimizada
            src={image}
            alt=""
            width={1536}
            height={1024}
            prioridade
            sizes="100vw"
            posicao="50% 22%"
            className="art-plate size-full object-cover"
          />

        </div>
      ) : null}
      <div
        className={
          image
            ? "absolute inset-0 bg-linear-to-r from-background via-background/88 to-background/45"
            : "absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background"
        }
      />
      {image ? (
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent" />
      ) : null}

      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />


      <div className="shell relative w-full py-[var(--space-lg)] animate-reveal">
        <p className="mb-xs flex items-center gap-2 kicker">
          <span aria-hidden className="h-px w-6 shrink-0 bg-gold/40" />
          <span className="min-w-0">{eyebrow}</span>
        </p>
        <h1 className="mb-sm title-page text-paper">{title}</h1>
        <p className="measure body-lead text-paper/70">{intro}</p>

        {obra ? (
          <p className="mt-md text-step--2 text-paper/45">
            <span className="text-paper/60">{obra.titulo}</span> — {obra.autor}, {obra.ano}
            {obra.local ? ` · ${obra.local}` : ""} ·{" "}
            <a
              href={obra.fonte}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
            >
              domínio público
            </a>
          </p>
        ) : null}
      </div>

    </section>
  );
}



export function Section({
  title,
  kicker,
  children,
  id,
}: {
  title?: string;
  kicker?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="shell w-full py-block scroll-mt-28">
      {kicker ? (
        <p className="mb-2xs flex items-center gap-2 kicker">
          <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold/40" />
          <span className="min-w-0">{kicker}</span>
        </p>
      ) : null}
      {title ? <h2 className="mb-md title-section">{title}</h2> : null}
      {children}

    </section>
  );
}

export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const min = cols === 2 ? "22rem" : cols === 4 ? "14rem" : "17rem";
  return (
    <div
      className="grid gap-[var(--space-sm)]"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }}
    >
      {children}
    </div>
  );
}

export function ContentCard({
  title,
  subtitle,
  children,
  media,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  media?: ReactNode;
}) {
  return (
    <article className="surface-card surface-card-interactive group flex min-w-0 flex-col overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
      <div className="pointer-events-none absolute top-0 right-0 size-32 -translate-y-1/2 translate-x-1/2 bg-gold/5 blur-3xl transition-premium group-hover:bg-gold/10" />
      {media ? <div className="relative">{media}</div> : null}
      <div className="relative min-w-0 p-card">
        {subtitle ? (
          <p className="mb-xs kicker group-hover:text-gold transition-colors">
            {subtitle}
          </p>
        ) : null}
        <h3 className="mb-[var(--space-xs)] title-card group-hover:text-paper transition-colors">
          {title}
        </h3>
        {children ? (
          <div className="body-sm group-hover:text-foreground/80 transition-colors">
            {linkificarNos(children)}
          </div>
        ) : null}
      </div>
    </article>
  );
}



export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "prose-deep measure mx-auto text-foreground/80 leading-[1.8] text-[length:var(--step-0)] font-light",
        // vertical rhythm: works for direct children AND content wrapped in <section>
        "space-y-[var(--space-sm)] [&_section]:space-y-[var(--space-sm)] [&_section+section]:mt-[var(--space-lg)] [&_section]:scroll-mt-28",
        "[&_p]:max-w-none",
        // headings
        "[&_h2]:font-display [&_h2]:text-[length:var(--step-3)] [&_h2]:text-foreground [&_h2]:tracking-tight [&_h2]:leading-[1.12] [&_h2]:mt-[var(--space-lg)] [&_h2]:mb-[var(--space-xs)]",
        "[&_h3]:font-display [&_h3]:text-[length:var(--step-2)] [&_h3]:text-foreground [&_h3]:tracking-tight [&_h3]:leading-[1.2] [&_h3]:mt-[var(--space-md)] [&_h3]:mb-[var(--space-xs)] [&_section>h3:first-child]:mt-0",
        "[&_h4]:uppercase [&_h4]:tracking-[0.18em] [&_h4]:text-step--2 [&_h4]:text-gold [&_h4]:font-semibold [&_h4]:mt-[var(--space-md)] [&_h4]:mb-[var(--space-2xs)]",
        // quotes (Pullquote keeps its own look via .font-display)
        "[&_blockquote:not(.font-display)]:border-l [&_blockquote:not(.font-display)]:border-gold/40 [&_blockquote:not(.font-display)]:pl-[var(--space-sm)] [&_blockquote:not(.font-display)]:py-2 [&_blockquote:not(.font-display)]:italic [&_blockquote:not(.font-display)]:text-foreground/70",
        // lists
        "[&_ul]:list-none [&_ul]:space-y-3 [&_ul>li]:relative [&_ul>li]:pl-6",
        "[&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.65em] [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-gold/50",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3 [&_ol>li]:pl-1",
        // inline
        "[&_strong]:text-foreground [&_strong]:font-medium [&_em]:text-gold/80",
        "[&_hr]:my-[var(--space-lg)] [&_hr]:border-gold/20",
        "[&_pre]:scroll-x-contained [&_table]:block [&_table]:scroll-x-contained",
      ].join(" ")}
    >
      {linkificarNos(children)}
    </div>
  );
}


export function Sources({ items }: { items: { label: string; ref: string }[] }) {
  return (
    <aside className="measure mx-auto mt-[var(--space-lg)] border-t border-gold/20 pt-[var(--space-sm)]">
      <p className="kicker mb-4">Fontes consultadas</p>
      <ol className="space-y-2 text-xs text-muted-foreground leading-relaxed list-decimal pl-5">
        {items.map((s) => (
          <li key={s.label}>
            <span className="text-foreground/80">{s.label}</span>
            {s.ref ? <span className="text-muted-foreground"> — {s.ref}</span> : null}
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function Pullquote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="relative my-[var(--space-lg)] w-full border-y border-gold/25 py-[var(--space-md)] text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-3 font-display text-[length:var(--step-3)] leading-none text-gold/45"
      >
        ❞
      </span>
      <blockquote className="measure mx-auto font-display text-[length:var(--step-3)] italic leading-[1.32] tracking-[-0.006em] text-foreground/95">
        “{children}”
      </blockquote>

      {cite ? (
        <figcaption className="mt-[var(--space-xs)] kicker">
          {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Prancha ilustrada de meio de página: reprodução de arte sacra em domínio
 * público com legenda documentada (obra, autor, ano, acervo e link para a
 * fonte). Use dentro de <Prose> ou entre seções de conteúdo.
 */
export function Prancha({
  image,
  alt,
  legenda,
  formato = "largo",
}: {
  image: string;
  alt: string;
  /** Frase curta que liga a imagem ao texto ao redor. */
  legenda?: ReactNode;
  formato?: "largo" | "retrato";
}) {
  const obra = obraDaUrl(image);
  return (
    <figure
      data-leitura-oculto
      className="my-[var(--space-lg)] overflow-hidden rounded-[var(--radius-card)] border border-gold/20 bg-card/40"
    >
      <div
        className={[
          "art-frame relative overflow-hidden",
          formato === "retrato" ? "aspect-4/5 sm:aspect-3/2" : "aspect-16/10 sm:aspect-2/1",
        ].join(" ")}
      >
        <ImagemOtimizada
          src={image}
          alt={alt}
          width={1600}
          height={900}
          sizes="(max-width: 768px) 100vw, 70vw"
          posicao="50% 25%"
          className="art-plate size-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/55 via-transparent to-transparent" />
      </div>
      <figcaption className="space-y-1 border-t border-gold/15 px-[var(--space-sm)] py-[var(--space-xs)]">
        {legenda ? <p className="body-sm text-foreground/80">{legenda}</p> : null}
        {obra ? (
          <p className="body-meta">
            <span className="text-foreground/70 italic">{obra.titulo}</span> — {obra.autor},{" "}
            {obra.ano}
            {obra.local ? ` · ${obra.local}` : ""} ·{" "}
            <a
              href={obra.fonte}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
            >
              domínio público
            </a>
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
