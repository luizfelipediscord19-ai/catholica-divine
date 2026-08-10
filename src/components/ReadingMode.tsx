import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Printer, List } from "lucide-react";

export type TocItem = { id: string; label: string };
export type Footnote = { id: string; label: string; ref?: string };

/** Maps footnote ids to their 1-based position so <FnRef> can show a number. */
const FootnoteIndex = createContext<Record<string, number>>({});

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

  const indice = useMemo(
    () => Object.fromEntries(footnotes.map((f, i) => [f.id, i + 1])),
    [footnotes],
  );

  return (
    <FootnoteIndex.Provider value={indice}>
    <div className="shell py-block reading-mode grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-[var(--space-lg)]">
      {/* Mobile TOC trigger */}
      <div className="lg:hidden flex items-center justify-between gap-4 print:hidden mb-8">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 glass text-[10px] uppercase tracking-[0.3em] text-paper font-bold"
        >
          <List className="size-4" /> Sumário
        </button>
        <button
          onClick={() => window.print()}
          className="size-14 grid place-items-center bg-gold text-deep hover:bg-paper transition-premium"
        >
          <Printer className="size-5" />
        </button>
      </div>

      {/* Sidebar TOC */}
      <aside
        className={`${open ? "block" : "hidden"} lg:block lg:sticky lg:top-32 lg:self-start print:hidden`}
      >
        <div className="p-8 border-l border-gold/10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold/40 mb-8">Navegação</p>
          <nav>
            <ul className="space-y-6">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    onClick={() => setOpen(false)}
                    className={`group block text-[13px] tracking-wide transition-premium ${
                      active === t.id
                        ? "text-gold translate-x-2"
                        : "text-paper/40 hover:text-paper hover:translate-x-1"
                    }`}
                  >
                    <span className={`inline-block w-4 h-px mr-3 transition-colors ${active === t.id ? "bg-gold" : "bg-gold/10 group-hover:bg-gold/30"}`} />
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => window.print()}
            className="mt-12 w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gold text-deep text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-paper transition-premium"
          >
            <Printer className="size-4" /> Imprimir / PDF
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
    </FootnoteIndex.Provider>
  );
}

/** Inline footnote reference: <FnRef n="dv" />. Renders a numbered superscript
 * link to the matching footnote in the ReadingMode footer. */
export function FnRef({ n }: { n: string }) {
  const indice = useContext(FootnoteIndex);
  const numero = indice[n];
  return (
    <sup id={`fnref-${n}`} className="ml-0.5">
      <a
        href={`#fn-${n}`}
        aria-label={`Ver nota ${numero ?? n}`}
        className="text-gold/90 hover:text-gold no-underline text-[10px] font-medium align-super"
      >
        {numero ?? "•"}
      </a>
    </sup>
  );
}
