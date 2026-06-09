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
    <section className="relative overflow-hidden border-b border-gold/20">
      {image ? (
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/85 to-background" />
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
    <article className="group border border-gold/20 hover:border-gold/60 transition-colors bg-card p-7">
      {subtitle ? (
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">{subtitle}</p>
      ) : null}
      <h3 className="font-display text-xl text-foreground mb-3 leading-snug">{title}</h3>
      {children ? <div className="text-sm text-muted-foreground leading-relaxed">{children}</div> : null}
    </article>
  );
}
