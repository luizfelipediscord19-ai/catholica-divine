import { useMemo, useState } from "react";
import { INDICE_HORAS, type TipoItem } from "../lib/data/devocoes/horas-indice";

const TIPOS: { id: TipoItem | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "salmo", label: "Salmos" },
  { id: "cantico", label: "Cânticos" },
  { id: "leitura", label: "Leituras" },
];

const TEMAS_DESTAQUE = [
  "louvor", "manhã", "noite", "esperança", "perdão", "confiança",
  "maria", "páscoa", "advento", "criação", "paz", "messias",
];

export function BuscaHoras() {
  const [tipo, setTipo] = useState<TipoItem | "todos">("todos");
  const [q, setQ] = useState("");
  const [tema, setTema] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const termo = q.trim().toLowerCase();
    return INDICE_HORAS.filter((it) => {
      if (tipo !== "todos" && it.tipo !== tipo) return false;
      if (tema && !it.tema.includes(tema)) return false;
      if (!termo) return true;
      return (
        it.titulo.toLowerCase().includes(termo) ||
        it.ref.toLowerCase().includes(termo) ||
        it.incipit.toLowerCase().includes(termo) ||
        it.tema.some((t) => t.toLowerCase().includes(termo)) ||
        it.hora.toLowerCase().includes(termo)
      );
    });
  }, [tipo, q, tema]);

  return (
    <section id="buscador" className="scroll-mt-24 mt-12 print:hidden">
      <div className="surface-card backdrop-blur-sm p-6 md:p-8">
        <p className="kicker mb-2">Buscador temático</p>
        <h3 className="font-display text-2xl md:text-3xl text-foreground">
          Encontre salmos, cânticos e leituras
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Busque por palavra-chave (ex.: <em>misericórdia</em>, <em>aurora</em>, <em>Magnificat</em>),
          por referência (ex.: <em>Sl 50</em>, <em>Lc 1</em>) ou filtre por tipo e tema.
        </p>

        {/* Campo de busca */}
        <div className="mt-6">
          <div className="relative">
            <input
              aria-label="Buscar na Liturgia das Horas"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por palavra, referência ou tema…"
              className="field-base text-base sm:text-sm"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filtros por tipo */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TIPOS.map((t) => {
            const active = tipo === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTipo(t.id)}
                className={`btn-base btn-sm border transition-colors ${
                  active
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-gold/20 text-foreground/70 hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Filtros por tema */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setTema(null)}
            className={`px-2.5 py-1 text-step--2 tracking-wide border rounded-full transition-colors ${
              !tema
                ? "border-gold bg-gold/10 text-gold"
                : "border-foreground/15 text-foreground/60 hover:border-foreground/40"
            }`}
          >
            todos os temas
          </button>
          {TEMAS_DESTAQUE.map((t) => {
            const active = tema === t;
            return (
              <button
                key={t}
                onClick={() => setTema(active ? null : t)}
                className={`px-2.5 py-1 text-step--2 tracking-wide border rounded-full transition-colors ${
                  active
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-foreground/15 text-foreground/60 hover:border-foreground/40"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Contagem */}
        <p className="mt-5 label-btn text-muted-foreground">
          {filtrados.length} {filtrados.length === 1 ? "resultado" : "resultados"}
          {tipo !== "todos" && ` · ${TIPOS.find((x) => x.id === tipo)?.label.toLowerCase()}`}
          {tema && ` · tema: ${tema}`}
        </p>

        {/* Resultados */}
        <div className="mt-5 space-y-3 max-h-[min(65dvh,520px)] overflow-y-auto overscroll-contain pr-1">
          {filtrados.length === 0 && (
            <div className="border border-dashed border-gold/20 p-6 text-center text-sm text-muted-foreground">
              Nenhum item corresponde aos filtros. Tente outra palavra-chave.
            </div>
          )}
          {filtrados.map((it, i) => (
            <article
              key={`${it.tipo}-${it.ref}-${i}`}
              className="border border-gold/15 bg-background/40 p-4 md:p-5 hover:border-gold/40 transition-colors"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className={`label-btn px-2 py-0.5 border ${
                    it.tipo === "salmo"
                      ? "border-gold/40 text-gold"
                      : it.tipo === "cantico"
                        ? "border-emerald-400/40 text-emerald-300"
                        : "border-sky-400/40 text-sky-300"
                  }`}
                >
                  {it.tipo === "salmo" ? "Salmo" : it.tipo === "cantico" ? "Cântico" : "Leitura"}
                </span>
                <span className="text-xs text-muted-foreground">{it.ref}</span>
                <span className="label-btn text-foreground/40 ml-auto">
                  {it.hora}
                </span>
              </div>
              <h4 className="font-display text-base md:text-lg text-foreground mt-2">{it.titulo}</h4>
              <p className="text-sm text-foreground/75 italic leading-relaxed mt-2">"{it.incipit}"</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {it.tema.map((tg) => (
                  <button
                    key={tg}
                    onClick={() => setTema(tg)}
                    className="chip-action"
                  >
                    #{tg}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
