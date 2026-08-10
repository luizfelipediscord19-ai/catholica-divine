import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Printer, List } from "lucide-react";
import { BotaoModoLeitura } from "./BotaoModoLeitura";

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
    <div className="shell py-block reading-mode grid grid-cols-1 items-start lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-x-[var(--space-lg)] gap-y-[var(--space-sm)]">
      {/* Mobile TOC trigger */}
      <div className="lg:hidden flex items-stretch gap-3 print:hidden mb-[var(--space-sm)]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="btn-base btn-outline-gold flex-1 min-w-0 gap-3 text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          <List className="size-4 shrink-0" /> Sumário
        </button>
        <button
          onClick={() => window.print()}
          aria-label="Imprimir ou salvar em PDF"
          className="btn-base btn-gold w-12 shrink-0 px-0"
        >
          <Printer className="size-4" />
        </button>
      </div>

      {/* Sidebar TOC */}
      <aside
        className={`${open ? "block" : "hidden"} min-w-0 lg:block lg:sticky lg:top-28 lg:self-start print:hidden`}
      >
        <div className="border-l border-gold/20 pl-[var(--space-sm)] py-[var(--space-2xs)]">
          <p className="kicker mb-[var(--space-sm)]">Navegação</p>
          <nav>
            <ul className="space-y-1">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === t.id ? "true" : undefined}
                    className={`group flex items-center gap-3 rounded-[var(--radius-btn)] py-2 pr-2 text-[13px] leading-snug transition-premium ${
                      active === t.id
                        ? "text-gold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`inline-block h-px shrink-0 transition-all ${active === t.id ? "w-6 bg-gold" : "w-3 bg-gold/30 group-hover:w-5 group-hover:bg-gold/60"}`} />
                    <span className="min-w-0">{t.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => window.print()}
            className="btn-base btn-gold mt-[var(--space-md)] w-full gap-3 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap"
          >
            <Printer className="size-4 shrink-0" /> Imprimir / PDF
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
      <BotaoModoLeitura />
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
