import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { listarTermos } from "@/lib/data/glossario";
import { normalizar } from "@/lib/busca";

export const Route = createFileRoute("/glossario")({
  head: () => ({
    meta: [
      { title: "Glossário Católico — Termos Doutrinais Explicados" },
      {
        name: "description",
        content:
          "Dicionário dos termos centrais da fé católica: graça, dogma, transubstanciação, magistério, Trindade, sacramento e mais — com referências ao Catecismo.",
      },
      { property: "og:title", content: "Glossário Católico" },
      {
        property: "og:description",
        content:
          "Definições breves e fiéis dos principais termos doutrinais da Igreja Católica, com referências ao Catecismo.",
      },
    ],
  }),
  component: GlossarioPage,
});

function GlossarioPage() {
  const todos = useMemo(() => listarTermos(), []);
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return todos;
    return todos.filter(
      (t) =>
        t.termo.toLowerCase().includes(q) ||
        t.definicao.toLowerCase().includes(q),
    );
  }, [busca, todos]);

  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold/70 hover:text-gold mb-12 transition-colors"
      >
        <ArrowLeft className="size-3.5" /> Voltar
      </Link>

      <header className="mb-16">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-6 flex items-center gap-4">
          <BookOpen className="size-4" /> Lexicon Fidei
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-foreground leading-[1.05] mb-6">
          Glossário <span className="text-gold/60 italic">Católico</span>
        </h1>
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
          Definições breves e fiéis dos termos centrais da fé católica, todas
          com referência ao Catecismo da Igreja Católica ou ao Magistério.
        </p>
      </header>

      <div className="mb-12">
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar termo (graça, dogma, Eucaristia…)"
          className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-4 px-2 text-foreground placeholder:text-muted-foreground/60 text-lg focus:outline-none transition-colors"
        />
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {filtrados.map((t) => (
          <div id={normalizar(t.termo).replace(/\s+/g, "-")} key={t.termo} className="scroll-mt-32 border-l-2 border-gold/20 pl-6 hover:border-gold transition-colors">
            <dt className="font-display text-2xl text-foreground mb-2">
              {t.termo}
            </dt>
            <dd className="text-sm text-muted-foreground leading-relaxed font-light">
              {t.definicao}
              {t.ref ? (
                <span className="block mt-3 text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  {t.ref}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      {filtrados.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">
          Nenhum termo encontrado para "{busca}".
        </p>
      ) : null}
    </div>
  );
}
