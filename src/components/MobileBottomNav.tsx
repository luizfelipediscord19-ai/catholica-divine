import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, CalendarDays, Home, Search, Sparkles } from "lucide-react";

const ITENS = [
  { to: "/", label: "Início", icon: Home, exact: true },
  { to: "/estudar", label: "Estudar", icon: BookOpen },
  { to: "/liturgia-diaria", label: "Liturgia", icon: CalendarDays },
  { to: "/assistente", label: "Sophia", icon: Sparkles },
  { to: "/busca", label: "Buscar", icon: Search },
] as const;

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav
      aria-label="Navegação principal no celular"
      data-chrome="site"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden print:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {ITENS.map((item) => {
          const ativo = item.exact
            ? pathname === item.to
            : pathname === item.to || pathname.startsWith(`${item.to}/`);
          const Icone = item.icon;
          return (
            <li key={item.to} className="min-w-0">
              <Link
                to={item.to}
                aria-current={ativo ? "page" : undefined}
                className={`flex size-full min-h-11 min-w-11 flex-col items-center justify-center gap-1 px-1 text-[0.6875rem] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold ${
                  ativo ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icone className="size-5" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}