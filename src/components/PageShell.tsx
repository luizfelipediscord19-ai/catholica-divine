import type { ReactNode } from "react";

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
  return (
    <section className="relative overflow-hidden bg-deep">
      {image ? (
        <div
          className="absolute inset-0 opacity-[0.1] bg-cover bg-center transition-transform duration-[5s] ease-out scale-110 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-gutter py-[var(--space-lg)] animate-reveal">
        <p className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold/60">
          <span className="h-px w-6 shrink-0 bg-gold/20" /> <span className="min-w-0">{eyebrow}</span>
        </p>
        <h1 className="mb-5 font-display leading-[1.05] tracking-tight text-paper text-[length:var(--step-4)]">
          {title}
        </h1>
        <p className="measure text-paper/60 font-light leading-relaxed text-[length:var(--step-1)]">
          {intro}
        </p>
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
    <section id={id} className="mx-auto w-full max-w-6xl px-gutter py-[var(--space-lg)]">
      {kicker ? (
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold">{kicker}</p>
      ) : null}
      {title ? (
        <h2 className="mb-[var(--space-md)] font-display text-foreground text-[length:var(--step-3)]">
          {title}
        </h2>
      ) : null}
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
    <article className="group relative flex min-w-0 flex-col border border-gold/10 hover:border-gold/40 bg-card/40 backdrop-blur-md transition-premium hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
      <div className="pointer-events-none absolute top-0 right-0 size-32 -translate-y-1/2 translate-x-1/2 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-premium" />
      {media ? <div className="relative">{media}</div> : null}
      <div className="relative min-w-0 p-card">
        {subtitle ? (
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-gold/60 group-hover:text-gold transition-colors">
            {subtitle}
          </p>
        ) : null}
        <h3 className="mb-[var(--space-xs)] font-display leading-tight text-foreground text-[length:var(--step-2)] group-hover:text-paper transition-colors">
          {title}
        </h3>
        {children ? (
          <div className="text-muted-foreground font-light leading-relaxed text-[length:var(--step--1)] group-hover:text-foreground/80 transition-colors">
            {children}
          </div>
        ) : null}
      </div>
    </article>
  );
}



export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-deep measure mx-auto text-foreground/80 leading-[1.8] text-[length:var(--step-0)] font-light space-y-[var(--space-sm)] [&>h3]:font-display [&>h3]:text-[length:var(--step-3)] [&>h3]:text-paper [&>h3]:mt-[var(--space-lg)] [&>h3]:mb-[var(--space-xs)] [&>h3]:tracking-tight [&>h4]:uppercase [&>h4]:tracking-[0.3em] [&>h4]:text-[12px] [&>h4]:text-gold [&>h4]:mt-[var(--space-md)] [&>h4]:mb-[var(--space-2xs)] [&>blockquote]:border-l-[1px] [&>blockquote]:border-gold/40 [&>blockquote]:pl-[var(--space-sm)] [&>blockquote]:py-2 [&>blockquote]:italic [&>blockquote]:text-paper/70 [&>ul]:list-none [&>ul]:space-y-4 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-[0.6em] [&>ul>li::before]:size-1.5 [&>ul>li::before]:bg-gold/40 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-4 [&_strong]:text-paper [&_strong]:font-medium [&_em]:text-gold/80 [&_pre]:scroll-x-contained [&_table]:block [&_table]:scroll-x-contained">
      {children}
    </div>
  );
}

export function Sources({ items }: { items: { label: string; ref: string }[] }) {
  return (
    <aside className="max-w-3xl mx-auto mt-12 border-t border-gold/20 pt-6">
      <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Fontes consultadas</p>
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
    <figure className="mx-auto my-[var(--space-lg)] max-w-3xl border-y border-gold/25 px-2 py-[var(--space-sm)] text-center">
      <blockquote className="font-display italic leading-snug text-foreground text-[length:var(--step-2)]">
        “{children}”
      </blockquote>

      {cite ? (
        <figcaption className="mt-4 text-[10px] tracking-[0.3em] uppercase text-gold/80">
          {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}
