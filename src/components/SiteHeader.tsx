import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Search, Sparkles, Menu, X, Church } from "lucide-react";

import { SinoNotificacoes } from "@/components/portal/SinoNotificacoes";
import { useCallback, useEffect, useState } from "react";

import { BuscaGlobal, useAtalhoBusca } from "@/components/BuscaGlobal";
import { TemaToggle } from "@/components/TemaToggle";

/** Menu completo, agrupado por blocos temáticos (usado no painel do menu). */
const GRUPOS: { titulo: string; itens: { to: string; label: string }[] }[] = [
  {
    titulo: "Estudar",
    itens: [
      { to: "/estudar", label: "Começar a estudar" },
      { to: "/trilhas", label: "Trilhas de estudo" },
      { to: "/fe-catolica", label: "A Fé Católica" },
      { to: "/catecismo", label: "Catecismo" },
      { to: "/apologetica", label: "Apologética" },
      { to: "/glossario", label: "Glossário" },
    ],
  },
  {
    titulo: "Escrituras & Liturgia",
    itens: [
      { to: "/biblia", label: "Bíblia" },
      { to: "/liturgia-diaria", label: "Liturgia do dia" },
      { to: "/calendario-liturgico", label: "Calendário litúrgico" },
      { to: "/sacramentos", label: "Sacramentos" },
      { to: "/coroinhas", label: "Coroinhas" },
    ],
  },
  {
    titulo: "Devoção",
    itens: [
      { to: "/oracoes", label: "Orações" },
      { to: "/santos", label: "Santos" },
      { to: "/maria", label: "Maria" },
    ],
  },
  {
    titulo: "Comunidade",
    itens: [
      { to: "/forum", label: "Fórum" },
      { to: "/assistente", label: "Sophia IA" },
      { to: "/sobre", label: "Sobre o Portal" },
    ],
  },
  {
    titulo: "Minha conta",
    itens: [
      { to: "/painel", label: "Meu painel" },
      { to: "/favoritos", label: "Favoritos" },
      { to: "/busca", label: "Busca avançada" },
      { to: "/auth", label: "Entrar / criar conta" },
    ],
  },
];

const NAV_PRINCIPAL: { to: string; label: string; desde: "lg" | "xl" | "2xl" }[] = [
  { to: "/estudar", label: "Estudar", desde: "lg" },
  { to: "/biblia", label: "Bíblia", desde: "lg" },
  { to: "/santos", label: "Santos", desde: "lg" },
  { to: "/oracoes", label: "Orações", desde: "xl" },
  { to: "/forum", label: "Fórum", desde: "xl" },
  { to: "/trilhas", label: "Trilhas", desde: "2xl" },
  { to: "/catecismo", label: "Catecismo", desde: "2xl" },
];

const VISIVEL_DESDE = {
  lg: "hidden lg:inline-flex",
  xl: "hidden xl:inline-flex",
  "2xl": "hidden 2xl:inline-flex",
} as const;

const ICONE_REDONDO =
  "btn-base grid size-10 shrink-0 place-items-center rounded-full border border-gold/20 bg-transparent p-0 text-paper/70 transition-premium hover:border-gold/60 hover:text-gold sm:size-11";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState(false);
  const [rolou, setRolou] = useState(false);
  useAtalhoBusca(useCallback(() => setBusca(true), []));

  // Sombra discreta só depois de sair do topo: dá profundidade sem pesar.
  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao trocar de rota e com a tecla Esc.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-chrome="site"
      data-rolou={rolou ? "sim" : "nao"}
      className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl transition-premium ${
        rolou ? "border-gold/20 shadow-[var(--shadow-card-hover)]" : "border-gold/10"
      }`}
    >
      <div className="shell grid h-16 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:h-20 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-5 xl:gap-7">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:gap-3 lg:shrink-0"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/30 transition-premium group-hover:border-gold group-hover:bg-gold/10 sm:size-10">
            <Church className="size-4 text-gold sm:size-5" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-base text-paper transition-colors group-hover:text-gold sm:text-lg xl:text-xl">
            PORTAL <span className="font-light italic text-gold/90">CATÓLICO</span>
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden min-w-0 items-center justify-center gap-3 overflow-hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.12em] text-paper/75 lg:flex xl:gap-5"
        >
          {NAV_PRINCIPAL.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`${VISIVEL_DESDE[item.desde]} relative items-center py-3 transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                  active ? "text-gold" : ""
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2 lg:gap-3">
          <ContaBotao />

          {/* Sophia: botão completo no desktop, ícone no celular. */}
          <Link
            to="/assistente"
            className="btn-base btn-gold hidden px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] lg:inline-flex xl:px-5"
          >
            <Sparkles className="size-3.5" aria-hidden="true" /> Sophia IA
          </Link>
          <Link
            to="/assistente"
            aria-label="Falar com a Sophia IA"
            title="Sophia IA"
            className="btn-base grid size-10 shrink-0 place-items-center rounded-full border border-gold/50 bg-gold/10 p-0 text-gold transition-premium hover:bg-gold hover:text-deep sm:size-11 lg:hidden"
          >
            <Sparkles className="size-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setBusca(true)}
            aria-label="Buscar no portal (Ctrl + K)"
            title="Buscar (Ctrl + K)"
            className={ICONE_REDONDO}
          >
            <Search className="size-4" aria-hidden="true" />
          </button>

          <span className="hidden sm:contents">
            <TemaToggle />
            <SinoNotificacoes />
          </span>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((v) => !v)}
            className="btn-base grid size-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-transparent p-0 text-gold transition-premium hover:bg-gold/10 sm:size-11"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="menu-principal"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gold/20 bg-background sm:max-h-[calc(100dvh-5rem)]"
        >
          <nav
            aria-label="Menu completo"
            className="shell py-block-sm grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3"
          >
            {GRUPOS.map((grupo) => (
              <div key={grupo.titulo} className="min-w-0">
                <p className="kicker mb-2xs">{grupo.titulo}</p>
                <ul className="grid gap-0.5">
                  {grupo.itens.map((item) => {
                    const active =
                      pathname === item.to || pathname.startsWith(`${item.to}/`);
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-11 items-center gap-2 rounded-[var(--radius-btn)] px-2 text-[13px] transition-premium hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
                            active ? "bg-gold/10 text-gold" : "text-foreground/85"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`h-3 w-px shrink-0 ${active ? "bg-gold" : "bg-gold/30"}`}
                          />
                          <span className="min-w-0 truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <p className="kicker mb-2xs">Atalhos</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setBusca(true);
                  }}
                  className="btn-base btn-outline-gold px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
                >
                  <Search className="size-3.5" aria-hidden="true" /> Buscar
                </button>
                <span className="sm:hidden">
                  <TemaToggle />
                </span>
                <span className="sm:hidden">
                  <SinoNotificacoes />
                </span>
              </div>
            </div>
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
      className="btn-base btn-outline-gold hidden px-4 py-3 text-[10px] uppercase tracking-[0.2em] 2xl:inline-flex"
    >
      Sair
    </button>
  ) : (
    <Link
      to="/auth"
      className="btn-base btn-outline-gold hidden px-4 py-3 text-[10px] uppercase tracking-[0.2em] 2xl:inline-flex"
    >
      Entrar
    </Link>
  );
}
