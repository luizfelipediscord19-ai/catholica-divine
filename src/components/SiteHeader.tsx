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
      { to: "/noticias", label: "Notícias" },
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

/** Navegação principal: poucos destinos, sempre os mesmos, um só estilo. */
const NAV_PRINCIPAL: { to: string; label: string }[] = [
  { to: "/estudar", label: "Estudar" },
  { to: "/biblia", label: "Bíblia" },
  { to: "/oracoes", label: "Orações" },
  { to: "/santos", label: "Santos" },
  { to: "/noticias", label: "Notícias" },
  { to: "/forum", label: "Fórum" },
];

const ICONE_REDONDO =
  "btn-base btn-icon shrink-0 border border-gold/20 bg-transparent text-foreground/65 transition-premium hover:border-gold/50 hover:text-gold";

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
      <div className="shell flex h-16 w-full items-center gap-3 sm:h-[4.5rem] lg:gap-5">
        <Link
          to="/"
          aria-label="Portal Católico — início"
          className="group flex min-w-0 items-center gap-2.5 rounded-[var(--radius-btn)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:shrink-0"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/30 transition-premium group-hover:border-gold group-hover:bg-gold/10">
            <Church className="size-4 text-gold" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-[1.0625rem] leading-none tracking-tight text-foreground transition-colors group-hover:text-gold sm:text-xl">
            Portal <span className="italic font-normal text-gold">Católico</span>
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden min-w-0 flex-1 items-center gap-0.5 overflow-hidden whitespace-nowrap lg:ml-3 lg:flex xl:ml-6 xl:gap-1"
        >

          {NAV_PRINCIPAL.map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className="nav-link shrink-0"
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1 h-px bg-gold/70"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
          {/* Campo de busca visível no desktop; ícone no celular. */}
          <button
            type="button"
            onClick={() => setBusca(true)}
            aria-label="Buscar no portal (Ctrl + K)"
            className="hidden min-h-10 w-44 items-center gap-2 rounded-[var(--radius-btn)] border border-gold/20 bg-transparent px-3 text-left text-step--1 text-foreground/55 transition-premium hover:border-gold/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold xl:flex xl:w-52"

          >
            <Search className="size-4 shrink-0 text-gold" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">O que você procura?</span>
            <span aria-hidden="true" className="label-btn shrink-0 text-foreground/35">
              ⌘K
            </span>
          </button>
          <button
            type="button"
            onClick={() => setBusca(true)}
            aria-label="Buscar no portal"
            title="Buscar"
            className={`${ICONE_REDONDO} lg:hidden`}
          >
            <Search className="size-4" aria-hidden="true" />
          </button>

          <span className="hidden sm:contents">
            <TemaToggle />
            <SinoNotificacoes />
          </span>

          {/* Sophia: rótulo no desktop, ícone no celular. */}
          <Link
            to="/assistente"
            className="btn-base btn-gold btn-sm hidden md:inline-flex"
          >
            <Sparkles className="size-3.5" aria-hidden="true" /> Sophia
          </Link>
          <Link
            to="/assistente"
            aria-label="Falar com a Sophia IA"
            title="Sophia IA"
            className="btn-base btn-icon shrink-0 border border-gold/50 bg-gold/10 text-gold transition-premium hover:bg-gold hover:text-deep md:hidden"
          >
            <Sparkles className="size-4" aria-hidden="true" />
          </Link>

          <ContaBotao />

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((v) => !v)}
            className="btn-base btn-icon shrink-0 border border-gold/30 bg-transparent text-gold transition-premium hover:bg-gold/10"
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
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gold/20 bg-background sm:max-h-[calc(100dvh-4.5rem)]"
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
                          className={`flex min-h-11 items-center gap-2 rounded-[var(--radius-btn)] px-2 text-step--1 transition-premium hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
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
                  className="btn-base btn-outline-gold btn-md"
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
      className="btn-base btn-outline-gold btn-sm hidden lg:inline-flex"
    >
      Sair
    </button>
  ) : (
    <Link
      to="/auth"
      className="btn-base btn-outline-gold btn-sm hidden lg:inline-flex"
    >
      Entrar
    </Link>
  );
}
