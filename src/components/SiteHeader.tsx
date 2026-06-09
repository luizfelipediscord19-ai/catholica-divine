import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Sparkles, Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="font-display text-xl md:text-2xl tracking-tighter text-gold">
            PORTAL CATÓLICO
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-[11px] uppercase tracking-[0.18em] font-medium text-foreground/65">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`hover:text-gold transition-colors ${
                  active ? "text-gold" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/assistente"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.18em] font-medium text-deep bg-gold hover:bg-paper transition-colors"
          >
            <Sparkles className="size-3.5" /> Assistente IA
          </Link>
          <Link
            to="/oracoes"
            aria-label="Buscar"
            className="hidden md:grid size-10 place-items-center border border-gold/30 hover:border-gold transition-colors"
          >
            <Search className="size-4 text-gold/80" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid size-10 place-items-center border border-gold/30 text-gold"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-gold/20 bg-background">
          <nav className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.18em] font-medium">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/75 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/assistente"
              onClick={() => setOpen(false)}
              className="py-2 text-gold"
            >
              Assistente IA
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
