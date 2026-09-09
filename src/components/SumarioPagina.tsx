import { useCallback, useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { List, Printer, X, Palette, Contrast } from "lucide-react";

type Item = { id: string; label: string; nivel: number };

/**
 * Sumário automático de qualquer página de conteúdo.
 *
 * Lê os títulos (h2/h3) dentro de <main id="conteudo">, gera âncoras quando
 * faltam, destaca a seção em leitura e oferece impressão em cores ou em preto
 * e branco. Não aparece em páginas que já usam <ReadingMode>, que traz o seu
 * próprio sumário, nem em páginas curtas (menos de três títulos).
 */
export function SumarioPagina() {
  const rota = useRouterState({ select: (s) => s.location.pathname });
  const [itens, setItens] = useState<Item[]>([]);
  const [ativo, setAtivo] = useState<string | null>(null);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    setAberto(false);
    const montar = () => {
      const raiz = document.getElementById("conteudo");
      if (!raiz || raiz.querySelector(".reading-mode")) {
        setItens([]);
        return;
      }
      const titulos = Array.from(raiz.querySelectorAll("h2, h3")).filter(
        (h) => (h.textContent ?? "").trim().length > 2 && !h.closest("[data-sem-sumario]"),
      ) as HTMLElement[];
      const lista: Item[] = [];
      titulos.forEach((h, i) => {
        const alvo = h.closest("section[id]") as HTMLElement | null;
        let id = alvo?.id || h.id;
        if (!id) {
          id = `secao-${i + 1}`;
          h.id = id;
        }
        (h.closest("section") ?? h).classList.add("scroll-mt-28");
        lista.push({
          id,
          label: (h.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 72),
          nivel: h.tagName === "H3" ? 3 : 2,
        });
      });
      setItens(lista.length >= 3 ? lista : []);
    };
    const t = setTimeout(montar, 220);
    return () => clearTimeout(t);
  }, [rota]);

  useEffect(() => {
    if (itens.length === 0) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    itens.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [itens]);

  const imprimir = useCallback((pretoEBranco: boolean) => {
    const raiz = document.documentElement;
    raiz.classList.toggle("imprimir-pb", pretoEBranco);
    setAberto(false);
    const limpar = () => raiz.classList.remove("imprimir-pb");
    window.addEventListener("afterprint", limpar, { once: true });
    setTimeout(() => window.print(), 60);
  }, []);

  if (itens.length === 0) return null;

  return (
    <div data-leitura-oculto className="print:hidden">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="sumario-pagina"
        title="Sumário e impressão"
        className="fixed right-4 bottom-[calc(9.5rem+env(safe-area-inset-bottom))] z-[60] inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/90 px-4 py-3 text-gold label-btn shadow-[var(--shadow-card)] backdrop-blur-md transition-premium hover:border-gold"
      >
        {aberto ? <X className="size-4 shrink-0" /> : <List className="size-4 shrink-0" />}
        <span>{aberto ? "Fechar" : "Sumário"}</span>
      </button>

      {aberto ? (
        <aside
          id="sumario-pagina"
          className="fixed right-4 bottom-[calc(13.5rem+env(safe-area-inset-bottom))] z-[60] flex max-h-[60vh] w-[min(21rem,calc(100vw-2rem))] flex-col border border-gold/25 bg-background/95 p-5 shadow-[var(--shadow-elegant)] backdrop-blur-md"
        >
          <p className="kicker mb-4 shrink-0">Nesta página</p>
          <nav className="min-h-0 flex-1 overflow-y-auto pr-1">
            <ul className="space-y-1">
              {itens.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={() => setAberto(false)}
                    aria-current={ativo === i.id ? "true" : undefined}
                    className={`group flex min-h-9 items-center gap-2 py-1 text-step--1 leading-snug transition-premium ${
                      i.nivel === 3 ? "pl-4" : ""
                    } ${ativo === i.id ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <span
                      className={`inline-block h-px shrink-0 transition-all ${
                        ativo === i.id
                          ? "w-5 bg-gold"
                          : "w-3 bg-gold/30 group-hover:w-4 group-hover:bg-gold/60"
                      }`}
                    />
                    <span className="min-w-0">{i.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 space-y-2 border-t border-gold/20 pt-4">
            <p className="kicker flex items-center gap-2">
              <Printer className="size-3.5" /> Imprimir ou salvar em PDF
            </p>
            <button
              type="button"
              onClick={() => imprimir(false)}
              className="btn-base btn-gold w-full gap-2 label-btn"
            >
              <Palette className="size-4 shrink-0" /> Em cores
            </button>
            <button
              type="button"
              onClick={() => imprimir(true)}
              className="btn-base btn-outline-gold w-full gap-2 label-btn"
            >
              <Contrast className="size-4 shrink-0" /> Preto e branco
            </button>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
