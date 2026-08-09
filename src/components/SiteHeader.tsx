import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Search, Sparkles, Menu, X, Church } from "lucide-react";

import { SinoNotificacoes } from "@/components/portal/SinoNotificacoes";
import { useCallback, useState } from "react";

import { BuscaGlobal, useAtalhoBusca } from "@/components/BuscaGlobal";
import { TemaToggle } from "@/components/TemaToggle";

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
  { to: "/busca", label: "Busca avançada" },
  { to: "/sobre", label: "Sobre o Portal" },
] as const;

const NAV_PRINCIPAL: { to: string; label: string; desde: "lg" | "xl" | "2xl" }[] = [
  { to: "/biblia", label: "Bíblia", desde: "lg" },
  { to: "/santos", label: "Santos", desde: "lg" },
  { to: "/oracoes", label: "Orações", desde: "lg" },
  { to: "/forum", label: "Fórum", desde: "lg" },
  { to: "/catecismo", label: "Catecismo", desde: "xl" },
  { to: "/liturgia-diaria", label: "Liturgia", desde: "2xl" },
];

const VISIVEL_DESDE = {
  lg: "hidden lg:inline-flex",
  xl: "hidden xl:inline-flex",
  "2xl": "hidden 2xl:inline-flex",
} as const;



export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState(false);
  useAtalhoBusca(useCallback(() => setBusca(true), []));

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto grid h-16 w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:h-20 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-5 lg:px-8 xl:gap-7">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:gap-3 lg:shrink-0"
        >
          <div className="size-9 sm:size-10 shrink-0 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-premium">
            <Church className="size-4 sm:size-5 text-gold" aria-hidden="true" />
          </div>
          <span className="truncate font-display text-base text-paper transition-colors group-hover:text-gold sm:text-xl xl:text-2xl">
            PORTAL <span className="font-light italic text-gold/90">CATÓLICO</span>
          </span>
        </Link>


        <nav
          aria-label="Navegação principal"
          className="hidden min-w-0 items-center justify-center gap-4 whitespace-nowrap text-[10px] font-medium uppercase text-paper/80 lg:flex xl:gap-5"
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


        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <ContaBotao />
          <Link
            to="/assistente"
            className="hidden min-h-11 items-center gap-2 bg-gold px-4 py-3 text-[10px] font-bold uppercase text-deep transition-premium hover:bg-paper focus-visible:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper sm:inline-flex xl:px-5"
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

          <TemaToggle />

          <SinoNotificacoes />




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
            className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-1 px-6 py-4 text-[12px] font-medium uppercase sm:grid-cols-3 sm:px-8 lg:grid-cols-4"
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
