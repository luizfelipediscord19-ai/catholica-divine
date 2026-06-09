import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-8 py-32 md:py-48 animate-reveal">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold/60 mb-8 flex items-center gap-4">
          <span className="h-px w-8 bg-gold/20" /> {eyebrow}
        </p>
        <h1 className="font-display text-6xl md:text-9xl leading-[0.9] text-paper mb-10 tracking-tighter">
          {title}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-paper/60 leading-relaxed font-light">
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
}: {
  title?: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      {kicker ? (
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">{kicker}</p>
      ) : null}
      {title ? (
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const c =
    cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return <div className={`grid grid-cols-1 ${c} gap-6`}>{children}</div>;
}

export function ContentCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <article className="group relative border border-gold/10 hover:border-gold/40 bg-card/40 backdrop-blur-md p-10 transition-premium hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/10 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/10 transition-premium" />
      {subtitle ? (
        <p className="text-[11px] tracking-[0.4em] uppercase text-gold/60 mb-4 group-hover:text-gold transition-colors">{subtitle}</p>
      ) : null}
      <h3 className="font-display text-2xl text-foreground mb-6 leading-tight group-hover:text-paper transition-colors">{title}</h3>
      {children ? <div className="text-sm text-muted-foreground leading-relaxed font-light group-hover:text-foreground/80 transition-colors">{children}</div> : null}
    </article>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-deep max-w-4xl mx-auto text-foreground/80 leading-[1.8] text-[16px] md:text-[18px] font-light space-y-8 [&>h3]:font-display [&>h3]:text-4xl [&>h3]:text-paper [&>h3]:mt-20 [&>h3]:mb-6 [&>h3]:tracking-tight [&>h4]:uppercase [&>h4]:tracking-[0.3em] [&>h4]:text-[12px] [&>h4]:text-gold [&>h4]:mt-12 [&>h4]:mb-4 [&>blockquote]:border-l-[1px] [&>blockquote]:border-gold/40 [&>blockquote]:pl-8 [&>blockquote]:py-2 [&>blockquote]:italic [&>blockquote]:text-paper/70 [&>ul]:list-none [&>ul]:space-y-4 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-[0.6em] [&>ul>li::before]:size-1.5 [&>ul>li::before]:bg-gold/40 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-4 [&_strong]:text-paper [&_strong]:font-medium [&_em]:text-gold/80">
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
    <figure className="max-w-3xl mx-auto my-12 border-y border-gold/25 py-8 px-2 text-center">
      <blockquote className="font-display text-2xl md:text-3xl leading-snug text-foreground italic">
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
