import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-gold/15 bg-deep">
      {image ? (
        <div
          className="absolute inset-0 opacity-[0.15] bg-cover bg-center transition-transform duration-[2s] ease-out scale-105 hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
        <p className="text-[10px] tracking-[0.35em] uppercase text-gold/80">{eyebrow}</p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] text-paper">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-paper/75 leading-relaxed font-light">
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
    <article className="group relative border border-gold/10 hover:border-gold/30 bg-card/50 backdrop-blur-sm p-8 transition-smooth hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5">
      {subtitle ? (
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">{subtitle}</p>
      ) : null}
      <h3 className="font-display text-xl text-foreground mb-3 leading-snug">{title}</h3>
      {children ? <div className="text-sm text-muted-foreground leading-relaxed">{children}</div> : null}
    </article>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-deep max-w-3xl mx-auto text-foreground/85 leading-[1.85] text-[15px] md:text-base font-light space-y-5 [&>h3]:font-display [&>h3]:text-2xl [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:mb-3 [&>h4]:uppercase [&>h4]:tracking-[0.18em] [&>h4]:text-[11px] [&>h4]:text-gold [&>h4]:mt-8 [&>h4]:mb-2 [&>blockquote]:border-l-2 [&>blockquote]:border-gold/60 [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:text-foreground/75 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1 [&_strong]:text-foreground [&_em]:text-foreground/90">
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
