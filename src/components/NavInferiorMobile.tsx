import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, GraduationCap, Sparkles, Menu } from "lucide-react";
import { useCallback, useState } from "react";

import { BuscaGlobal, useAtalhoBusca } from "@/components/BuscaGlobal";

const LINKS = [
  { to: "/", label: "Início", icon: Home },
  { to: "/estudar", label: "Estudar", icon: GraduationCap },
  { to: "/assistente", label: "Sophia", icon: Sparkles },
] as const;

const MENU = [
  { to: "/biblia", label: "Bíblia" },
  { to: "/catecismo", label: "Catecismo" },
  { to: "/trilhas", label: "Trilhas" },
  { to: "/sacramentos", label: "Sacramentos" },
  { to: "/santos", label: "Santos" },
  { to: "/maria", label: "Maria" },
  { to: "/oracoes", label: "Orações" },
  { to: "/apologetica", label: "Apologética" },
  { to: "/liturgia-diaria", label: "Liturgia do dia" },
  { to: "/calendario-liturgico", label: "Calendário" },
  { to: "/forum", label: "Fórum" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/painel", label: "Meu painel" },
  { to: "/glossario", label: "Glossário" },
  { to: "/sobre", label: "Sobre" },
] as const;

const ITEM =
  "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 px-1 text-[10px] uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold";

/** Navegação inferior discreta, apenas no mobile. */
export function NavInferiorMobile() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [busca, setBusca] = useState(false);
  const [menu, setMenu] = useState(false);
  useAtalhoBusca(useCallback(() => setBusca(true), []));

  return (
    <>
      {menu ? (
        <div
          id="menu-inferior"
          className="fixed inset-x-0 bottom-14 z-40 max-h-[60vh] overflow-y-auto border-t border-gold/20 bg-background/98 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Menu completo" className="shell grid grid-cols-2 gap-x-4 py-block-sm">
            {MENU.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                onClick={() => setMenu(false)}
                className="flex min-h-11 items-center py-2 text-[12px] uppercase tracking-[0.08em] text-foreground/85 hover:text-gold"
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}

      <nav
        aria-label="Navegação rápida"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/15 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <div className="flex items-stretch">
          {LINKS.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenu(false)}
                aria-current={active ? "page" : undefined}
                className={`${ITEM} ${active ? "text-gold" : "text-foreground/70"}`}
              >
                <l.icon className="size-5" aria-hidden="true" />
                {l.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMenu(false);
              setBusca(true);
            }}
            aria-label="Buscar no portal"
            className={`${ITEM} text-foreground/70`}
          >
            <Search className="size-5" aria-hidden="true" />
            Buscar
          </button>
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="menu-inferior"
            className={`${ITEM} ${menu ? "text-gold" : "text-foreground/70"}`}
          >
            <Menu className="size-5" aria-hidden="true" />
            Menu
          </button>
        </div>
      </nav>

      <BuscaGlobal aberto={busca} onFechar={() => setBusca(false)} />
    </>
  );
}
