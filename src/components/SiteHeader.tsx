import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Sparkles, Menu, X, Church } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/fe-catolica", label: "A Fé" },
  { to: "/biblia", label: "Bíblia" },
  { to: "/catecismo", label: "Catecismo" },
  { to: "/sacramentos", label: "Sacramentos" },
  { to: "/coroinhas", label: "Coroinhas" },
  { to: "/santos", label: "Santos" },
  { to: "/maria", label: "Maria" },
  { to: "/oracoes", label: "Orações" },
  { to: "/apologetica", label: "Apologética" },
  { to: "/calendario-liturgico", label: "Calendário" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 md:h-24 flex items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <div className="size-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-premium">
            <Church className="size-5 text-gold" aria-hidden="true" />
          </div>
          <span className="font-display text-xl sm:text-2xl tracking-[0.05em] text-paper group-hover:text-gold transition-colors">
            PORTAL <span className="font-light italic text-gold/90">CATÓLICO</span>
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden 2xl:flex items-center gap-5 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] font-medium text-paper/80"
        >
          {NAV.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`relative py-3 hover:text-paper focus-visible:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-colors ${active ? "text-gold" : ""}`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/assistente"
            className="hidden sm:inline-flex items-center gap-2 min-h-11 px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-bold text-deep bg-gold hover:bg-paper focus-visible:bg-paper transition-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
          >
            <Sparkles className="size-3.5" aria-hidden="true" /> Sophia IA
          </Link>
          <Link
            to="/glossario"
            aria-label="Buscar termos no glossário católico"
            className="hidden lg:grid size-11 place-items-center rounded-full border border-gold/20 hover:border-gold/60 focus-visible:border-gold transition-premium text-paper/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Search className="size-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="2xl:hidden grid size-11 place-items-center rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="2xl:hidden border-t border-gold/20 bg-background">
          <nav
            aria-label="Navegação mobile"
            className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-x-6 gap-y-1 text-[12px] uppercase tracking-[0.18em] font-medium"
          >
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center py-2 hover:text-gold focus-visible:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${active ? "text-gold" : "text-foreground/85"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/assistente"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center py-2 text-gold"
            >
              Sophia IA
            </Link>
            <Link
              to="/glossario"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center py-2 text-foreground/85 hover:text-gold"
            >
              Glossário
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
