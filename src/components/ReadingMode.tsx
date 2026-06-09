import { useEffect, useState, type ReactNode } from "react";
import { Printer, List } from "lucide-react";

export type TocItem = { id: string; label: string };
export type Footnote = { id: string; label: string; ref?: string };

/** Wraps a long article with a sticky table of contents, print button,
 * and a footnotes block. Use <FnRef n="..."/> inline to cite. */
export function ReadingMode({
  toc,
  footnotes,
  title,
  children,
}: {
  toc: TocItem[];
  footnotes: Footnote[];
  title: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(toc[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  return (
    <div className="reading-mode max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
      {/* Mobile TOC trigger */}
      <div className="lg:hidden flex items-center justify-between gap-3 print:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 text-[10px] uppercase tracking-[0.25em] text-foreground/80 hover:text-gold"
        >
          <List className="size-3.5" /> Sumário
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-deep text-[10px] uppercase tracking-[0.25em] hover:bg-paper"
        >
          <Printer className="size-3.5" /> Imprimir
        </button>
      </div>

      {/* Sidebar TOC */}
      <aside
        className={`${open ? "block" : "hidden"} lg:block lg:sticky lg:top-24 lg:self-start print:hidden`}
      >
        <div className="border border-gold/15 bg-card/40 backdrop-blur-sm p-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Sumário</p>
          <nav>
            <ul className="space-y-2">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    onClick={() => setOpen(false)}
                    className={`block text-[12px] leading-snug transition-colors border-l-2 pl-3 -ml-px ${
                      active === t.id
                        ? "border-gold text-gold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => window.print()}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gold text-deep text-[10px] uppercase tracking-[0.25em] hover:bg-paper transition-colors"
          >
            <Printer className="size-3.5" /> Imprimir / PDF
          </button>
        </div>
      </aside>

      {/* Article */}
      <article className="min-w-0">
        <h1 className="print:block hidden font-display text-3xl text-foreground mb-6">{title}</h1>
        {children}

        {footnotes.length > 0 ? (
          <section id="notas" className="mt-16 pt-8 border-t border-gold/25 scroll-mt-24">
            <h2 className="font-display text-2xl text-foreground mb-6">Notas e fontes oficiais</h2>
            <ol className="space-y-3 text-xs text-muted-foreground leading-relaxed list-decimal pl-5">
              {footnotes.map((f) => (
                <li key={f.id} id={`fn-${f.id}`} className="scroll-mt-24">
                  <span className="text-foreground/85">{f.label}</span>
                  {f.ref ? <span> — {f.ref}</span> : null}
                  {" "}
                  <a
                    href={`#fnref-${f.id}`}
                    aria-label="Voltar ao texto"
                    className="text-gold/80 hover:text-gold no-underline"
                  >
                    ↩
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </article>
    </div>
  );
}

/** Inline footnote reference: <FnRef n="dv" />. Renders a superscript link
 * to the matching footnote in the ReadingMode footer. */
export function FnRef({ n }: { n: string }) {
  return (
    <sup id={`fnref-${n}`} className="ml-0.5">
      <a
        href={`#fn-${n}`}
        className="text-gold/90 hover:text-gold no-underline text-[10px] font-medium align-super"
      >
        [{n}]
      </a>
    </sup>
  );
}
