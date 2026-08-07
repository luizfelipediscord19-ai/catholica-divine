import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Search, Sparkles, Menu, X, Church } from "lucide-react";
import { useCallback, useState } from "react";

import { BuscaGlobal, useAtalhoBusca } from "@/components/BuscaGlobal";

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
  { to: "/liturgia-diaria", label: "Liturgia do dia" },
  { to: "/forum", label: "Fórum" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/painel", label: "Meu painel" },
] as const;

/**
 * Itens da barra superior, com revelação progressiva:
 * `sempre` aparece a partir de md, os demais entram em lg / xl.
 */
const NAV_PRINCIPAL: { to: string; label: string; desde: "md" | "lg" | "xl" }[] = [
  { to: "/biblia", label: "Bíblia", desde: "md" },
  { to: "/santos", label: "Santos", desde: "md" },
  { to: "/oracoes", label: "Orações", desde: "md" },
  { to: "/catecismo", label: "Catecismo", desde: "lg" },
  { to: "/forum", label: "Fórum", desde: "lg" },
  { to: "/liturgia-diaria", label: "Liturgia do dia", desde: "xl" },
  { to: "/painel", label: "Meu painel", desde: "xl" },
];

const VISIVEL_DESDE = {
  md: "hidden md:inline-flex",
  lg: "hidden lg:inline-flex",
  xl: "hidden xl:inline-flex",
} as const;



export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState(false);
  useAtalhoBusca(useCallback(() => setBusca(true), []));

  return (
    <header className="sticky top-0 z-50 glass border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 md:h-24 flex items-center gap-4 xl:gap-6">
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <div className="size-9 sm:size-10 shrink-0 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-premium">
            <Church className="size-4 sm:size-5 text-gold" aria-hidden="true" />
          </div>
          <span className="truncate font-display text-base sm:text-2xl tracking-[0.05em] text-paper group-hover:text-gold transition-colors">
            PORTAL <span className="font-light italic text-gold/90">CATÓLICO</span>
          </span>
        </Link>


        <nav
          aria-label="Navegação principal"
          className="hidden md:flex flex-1 min-w-0 items-center justify-center gap-3 lg:gap-4 xl:gap-5 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] lg:tracking-[0.18em] xl:tracking-[0.22em] font-medium text-paper/80"
        >
          {NAV_PRINCIPAL.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`${VISIVEL_DESDE[item.desde]} relative items-center py-3 hover:text-paper focus-visible:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold transition-colors ${active ? "text-gold" : ""}`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>


        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <ContaBotao />
          <Link
            to="/assistente"
            className="hidden sm:inline-flex items-center gap-2 min-h-11 px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-bold text-deep bg-gold hover:bg-paper focus-visible:bg-paper transition-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
          >
            <Sparkles className="size-3.5" aria-hidden="true" /> Sophia IA
          </Link>
          <button
            type="button"
            onClick={() => setBusca(true)}
            aria-label="Buscar no portal (Ctrl + K)"
            title="Buscar (Ctrl + K)"
            className="grid size-11 place-items-center rounded-full border border-gold/20 hover:border-gold/60 focus-visible:border-gold transition-premium text-paper/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Search className="size-4" aria-hidden="true" />
          </button>


          <button
            type="button"
            aria-label={open ? "Fechar menu completo" : "Abrir menu completo"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-gold/20 text-gold hover:bg-gold/10 transition-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-gold/20 bg-background">
          <nav
            aria-label="Navegação mobile"
            className="max-w-7xl mx-auto px-6 sm:px-8 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-1 text-[12px] uppercase tracking-[0.18em] font-medium"
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
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setBusca(true);
              }}
              className="flex min-h-11 items-center py-2 text-left text-foreground/85 hover:text-gold"
            >
              Buscar
            </button>
            <Link
              to="/glossario"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center py-2 text-foreground/85 hover:text-gold"
            >
              Glossário
            </Link>
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center py-2 text-foreground/85 hover:text-gold"
            >
              Minha conta
            </Link>
          </nav>
        </div>
      ) : null}
      <BuscaGlobal aberto={busca} onFechar={() => setBusca(false)} />
    </header>
  );
}

/** Entrar / sair, sempre refletindo a sessão atual. */
function ContaBotao() {
  const { autenticado, carregando, sair } = useAuth();
  if (carregando) return null;
  return autenticado ? (
    <button
      type="button"
      onClick={() => void sair()}
      className="hidden 2xl:inline-flex items-center min-h-11 px-4 py-3 text-[10px] uppercase tracking-[0.25em] border border-gold/30 text-paper/80 hover:text-gold hover:border-gold transition-premium"
    >
      Sair
    </button>
  ) : (
    <Link
      to="/auth"
      className="hidden 2xl:inline-flex items-center min-h-11 px-4 py-3 text-[10px] uppercase tracking-[0.25em] border border-gold/30 text-paper/80 hover:text-gold hover:border-gold transition-premium"
    >
      Entrar
    </Link>
  );
}
