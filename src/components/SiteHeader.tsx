import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles, Menu, X, Church, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success("Até logo.");
    navigate({ to: "/" });
  }

  const initial = (user?.user_metadata?.display_name as string | undefined)?.[0]
    ?? user?.email?.[0]
    ?? "?";

  return (
    <header className="sticky top-0 z-50 glass border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="size-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-premium">
            <Church className="size-5 text-gold" />
          </div>
          <span className="font-display text-2xl tracking-[0.05em] text-paper group-hover:text-gold transition-colors">
            PORTAL <span className="font-light italic text-gold/80">CATÓLICO</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-medium text-paper/60">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-2 hover:text-paper transition-colors ${active ? "text-gold" : ""}`}
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
            className="hidden sm:inline-flex items-center gap-2 px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-bold text-deep bg-gold hover:bg-paper transition-premium hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <Sparkles className="size-3.5" /> IA
          </Link>
          <Link
            to="/oracoes"
            aria-label="Buscar"
            className="hidden lg:grid size-12 place-items-center rounded-full border border-gold/10 hover:border-gold/40 transition-premium text-paper/40 hover:text-gold"
          >
            <Search className="size-4" />
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="size-11 rounded-full border border-gold/30 text-gold font-display text-sm flex items-center justify-center hover:bg-gold/10 transition uppercase">
                {initial}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/painel" className="cursor-pointer">
                    <LayoutDashboard className="size-4 mr-2" /> Meu painel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="size-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/auth"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-3 text-[10px] uppercase tracking-[0.25em] font-medium text-paper border border-gold/30 hover:border-gold hover:text-gold transition"
            >
              <User className="size-3.5" /> Entrar
            </Link>
          )}

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden grid size-12 place-items-center rounded-full border border-gold/10 text-gold hover:bg-gold/5 transition-premium"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
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
            <Link to="/assistente" onClick={() => setOpen(false)} className="py-2 text-gold">
              Assistente IA
            </Link>
            {user ? (
              <Link to="/painel" onClick={() => setOpen(false)} className="py-2 text-gold">
                Meu painel
              </Link>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="py-2 text-gold">
                Entrar
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
