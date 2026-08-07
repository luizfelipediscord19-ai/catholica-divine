import { useMemo, useState } from "react";
import {
  CATEGORIAS_OBJECAO,
  OBJECOES,
  type CategoriaObjecao,
} from "@/lib/data/apologetica-objecoes";
import { normalizar } from "@/lib/busca";

/**
 * Banco de objeções: filtro por categoria + busca textual,
 * com respostas expansíveis e fontes citadas.
 */
export function BancoObjecoes() {
  const [categoria, setCategoria] = useState<CategoriaObjecao | "todas">("todas");
  const [termo, setTermo] = useState("");
  const [aberto, setAberto] = useState<string | null>(null);

  const lista = useMemo(() => {
    const t = normalizar(termo);
    return OBJECOES.filter((o) => {
      if (categoria !== "todas" && o.categoria !== categoria) return false;
      if (t.length < 2) return true;
      return (
        normalizar(o.objecao).includes(t) ||
        o.resposta.some((r) => normalizar(r).includes(t)) ||
        o.fontes.some((f) => normalizar(f).includes(t))
      );
    });
  }, [categoria, termo]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="sr-only">Buscar objeção</span>
          <input
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar objeção, tema ou fonte…"
            className="w-full min-h-11 bg-transparent border border-gold/25 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:border-gold"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          {(["todas", ...CATEGORIAS_OBJECAO] as const).map((c) => {
            const ativo = categoria === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategoria(c as CategoriaObjecao | "todas")}
                aria-pressed={ativo}
                className={`min-h-11 px-4 py-2 text-[10px] uppercase tracking-[0.18em] border transition-premium ${
                  ativo
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-gold/20 text-foreground/70 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {c === "todas" ? "Todas" : c}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-foreground/50">
          {lista.length} {lista.length === 1 ? "objeção" : "objeções"} · respostas com fontes verificáveis
        </p>
      </div>

      <ul className="divide-y divide-gold/10 border-y border-gold/10">
        {lista.map((o) => {
          const expandido = aberto === o.slug;
          return (
            <li key={o.slug} id={`objecao-${o.slug}`} className="py-2">
              <button
                type="button"
                onClick={() => setAberto(expandido ? null : o.slug)}
                aria-expanded={expandido}
                aria-controls={`resposta-${o.slug}`}
                className="w-full flex items-start justify-between gap-4 py-3 text-left group"
              >
                <span className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-gold/70">
                    {o.categoria}
                  </span>
                  <span className="block mt-1 font-display text-base sm:text-lg text-foreground group-hover:text-gold transition-colors">
                    “{o.objecao}”
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 mt-2 text-gold transition-transform ${expandido ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>

              {expandido ? (
                <div id={`resposta-${o.slug}`} className="pb-5 pr-2 space-y-3">
                  {o.resposta.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-foreground/80">
                      {p}
                    </p>
                  ))}
                  <p className="text-xs text-foreground/55">
                    <span className="uppercase tracking-[0.18em] text-gold/70">Fontes: </span>
                    {o.fontes.join(" · ")}
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {lista.length === 0 ? (
        <p className="text-sm text-foreground/60">
          Nenhuma objeção encontrada. Tente outro termo ou pergunte à Sophia IA.
        </p>
      ) : null}
    </div>
  );
}
