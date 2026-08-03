import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, CornerDownLeft } from "lucide-react";

import { buscar, type Categoria, type ItemBusca } from "@/lib/busca";

const CORES: Record<Categoria, string> = {
  Página: "text-gold/80",
  Bíblia: "text-emerald-400/80",
  Catecismo: "text-sky-400/80",
  Santo: "text-amber-300/80",
  Glossário: "text-violet-300/80",
  Oração: "text-rose-300/80",
};

const SUGESTOES = ["Eucaristia", "Jo 3", "São Bento", "graça", "rosário", "purgatório"];

export function BuscaGlobal({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState("");
  const [indice, setIndice] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  const resultados = useMemo(() => buscar(consulta), [consulta]);

  useEffect(() => {
    if (aberto) {
      setConsulta("");
      setIndice(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [aberto]);

  useEffect(() => setIndice(0), [consulta]);

  useEffect(() => {
    const item = listaRef.current?.children[indice] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [indice]);

  if (!aberto) return null;

  function abrir(item: ItemBusca) {
    onFechar();
    void navigate({ to: item.href });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Busca global do portal"
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 sm:pt-28"
    >
      <button
        type="button"
        aria-label="Fechar busca"
        onClick={onFechar}
        className="absolute inset-0 bg-deep/80 backdrop-blur-sm"
      />

      <div
        className="relative w-full max-w-2xl border border-gold/25 bg-background shadow-2xl"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            onFechar();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setIndice((i) => (resultados.length ? (i + 1) % resultados.length : 0));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setIndice((i) => (resultados.length ? (i - 1 + resultados.length) % resultados.length : 0));
          } else if (e.key === "Enter" && resultados[indice]) {
            e.preventDefault();
            abrir(resultados[indice]!);
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-gold/15 px-5">
          <Search className="size-4 shrink-0 text-gold" aria-hidden="true" />
          <input
            ref={inputRef}
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Buscar em toda a enciclopédia: santos, versículos, catecismo, termos…"
            aria-label="Termo de busca"
            className="min-h-14 w-full bg-transparent text-base text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Fechar busca"
            onClick={onFechar}
            className="grid size-9 shrink-0 place-items-center rounded-full text-foreground/50 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {consulta.trim().length < 2 ? (
            <div className="px-5 py-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Sugestões</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGESTOES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setConsulta(s)}
                    className="min-h-9 border border-gold/20 px-3 text-xs text-foreground/80 hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-xs text-foreground/50">
                Dica: digite uma referência bíblica como <span className="text-gold">Jo 3</span> para abrir o capítulo
                direto.
              </p>
            </div>
          ) : resultados.length === 0 ? (
            <p className="px-5 py-8 text-sm text-foreground/60">
              Nada encontrado para “{consulta}”. Tente outro termo ou pergunte à Sophia IA.
            </p>
          ) : (
            <ul ref={listaRef} role="listbox" aria-label="Resultados">
              {resultados.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === indice}
                    onMouseEnter={() => setIndice(i)}
                    onClick={() => abrir(item)}
                    className={`flex w-full items-start gap-4 px-5 py-3 text-left transition-colors ${
                      i === indice ? "bg-gold/10" : "hover:bg-gold/5"
                    }`}
                  >
                    <span
                      className={`mt-0.5 w-24 shrink-0 text-[9px] uppercase tracking-[0.2em] ${CORES[item.categoria]}`}
                    >
                      {item.categoria}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">{item.titulo}</span>
                      <span className="block truncate text-xs text-foreground/55">{item.descricao}</span>
                    </span>
                    {i === indice ? (
                      <CornerDownLeft className="ml-auto mt-1 size-3.5 shrink-0 text-gold/70" aria-hidden="true" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gold/15 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-foreground/45">
          <span>↑ ↓ navegar · Enter abrir · Esc fechar</span>
          <span className="hidden sm:inline">Ctrl / ⌘ + K</span>
        </div>
      </div>
    </div>
  );
}

/** Atalho global Ctrl/⌘ + K e "/" para abrir a busca. */
export function useAtalhoBusca(abrir: () => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const alvo = e.target as HTMLElement | null;
      const digitando =
        alvo?.tagName === "INPUT" || alvo?.tagName === "TEXTAREA" || alvo?.isContentEditable === true;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        abrir();
      } else if (e.key === "/" && !digitando && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        abrir();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abrir]);
}
