import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, CornerDownLeft } from "lucide-react";

import { agrupar, buscar, normalizar, type Categoria, type ItemBusca } from "@/lib/busca";

const CORES: Record<Categoria, string> = {
  Página: "text-gold/80",
  Bíblia: "text-emerald-400/80",
  Catecismo: "text-sky-400/80",
  Santo: "text-amber-300/80",
  Glossário: "text-violet-300/80",
  Oração: "text-rose-300/80",
  Apologética: "text-cyan-300/80",
  Trilha: "text-teal-300/80",
};

const SUGESTOES = ["Eucaristia", "Jo 3", "São Bento", "graça", "rosário", "purgatório"];

/** Destaca a ocorrência do termo buscado, sem depender de HTML bruto. */
function Realce({ texto, termo }: { texto: string; termo: string }) {
  const alvo = normalizar(termo);
  if (alvo.length < 2) return <>{texto}</>;
  const inicio = normalizar(texto).indexOf(alvo);
  if (inicio < 0) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, inicio)}
      <mark className="bg-gold/25 text-gold">{texto.slice(inicio, inicio + alvo.length)}</mark>
      {texto.slice(inicio + alvo.length)}
    </>
  );
}

export function BuscaGlobal({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState("");
  const [indice, setIndice] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);

  const resultados = useMemo(() => buscar(consulta), [consulta]);
  const grupos = useMemo(() => agrupar(resultados), [resultados]);
  // Ordem achatada na mesma sequência em que os grupos são exibidos.
  const planos = useMemo(() => grupos.flatMap((g) => g.itens), [grupos]);

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
    const item = listaRef.current?.querySelector(`[data-indice="${indice}"]`) as HTMLElement | null;
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
      className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-16 sm:px-4 sm:pt-28"
    >
      <button
        type="button"
        aria-label="Fechar busca"
        onClick={onFechar}
        className="absolute inset-0 bg-deep/80 backdrop-blur-sm"
      />

      <div
        className="relative w-full max-w-2xl animate-content-fade border border-gold/25 bg-background shadow-2xl"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            onFechar();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setIndice((i) => (planos.length ? (i + 1) % planos.length : 0));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setIndice((i) => (planos.length ? (i - 1 + planos.length) % planos.length : 0));
          } else if (e.key === "Enter" && planos[indice]) {
            e.preventDefault();
            abrir(planos[indice]!);
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-gold/15 px-4 sm:px-5">
          <Search className="size-4 shrink-0 text-gold" aria-hidden="true" />
          <input
            ref={inputRef}
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="O que você procura?"
            aria-label="Termo de busca"
            className="min-h-14 w-full bg-transparent text-base text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
          {consulta ? (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => {
                setConsulta("");
                inputRef.current?.focus();
              }}
              className="shrink-0 label-btn text-foreground/50 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              Limpar
            </button>
          ) : null}
          <button
            type="button"
            aria-label="Fechar busca"
            onClick={onFechar}
            className="grid size-11 shrink-0 place-items-center rounded-full text-foreground/50 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div ref={listaRef} className="max-h-[65vh] overflow-y-auto sm:max-h-[60vh]">
          {consulta.trim().length < 2 ? (
            <div className="px-4 py-6 sm:px-5">
              <p className="label-btn text-foreground/50">Sugestões</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGESTOES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setConsulta(s)}
                    className="min-h-11 border border-gold/20 px-3 text-xs text-foreground/80 transition-premium hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
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
          ) : planos.length === 0 ? (
            <p className="px-4 py-8 text-sm text-foreground/60 sm:px-5">
              Nada encontrado para “{consulta}”. Tente outro termo ou pergunte à Sophia IA.
            </p>
          ) : (
            <div role="listbox" aria-label={`Resultados para ${consulta}`}>
              {grupos.map((grupo) => (
                <section key={grupo.categoria} aria-label={grupo.categoria}>
                  <p
                    className={`sticky top-0 z-10 border-b border-gold/10 bg-background/95 px-4 py-2 label-btn backdrop-blur sm:px-5 ${
                      CORES[grupo.categoria]
                    }`}
                  >
                    {grupo.categoria}
                    <span className="ml-2 text-foreground/35">{grupo.itens.length}</span>
                  </p>
                  <ul>
                    {grupo.itens.map((item) => {
                      const i = planos.indexOf(item);
                      const ativo = i === indice;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            role="option"
                            data-indice={i}
                            aria-selected={ativo}
                            onMouseEnter={() => setIndice(i)}
                            onClick={() => abrir(item)}
                            className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors sm:px-5 ${
                              ativo ? "bg-gold/10" : "hover:bg-gold/5"
                            }`}
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium text-foreground">
                                <Realce texto={item.titulo} termo={consulta} />
                              </span>
                              <span className="block truncate text-xs text-foreground/55">
                                <Realce texto={item.descricao} termo={consulta} />
                              </span>
                            </span>
                            {ativo ? (
                              <CornerDownLeft
                                className="mt-1 size-3.5 shrink-0 text-gold/70"
                                aria-hidden="true"
                              />
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gold/15 px-4 py-2.5 label-btn text-foreground/45 sm:px-5">
          <span className="hidden sm:inline">↑ ↓ navegar · Enter abrir · Esc fechar</span>
          <span className="sm:hidden">Toque para abrir</span>
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
