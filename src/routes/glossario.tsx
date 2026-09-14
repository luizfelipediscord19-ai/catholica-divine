import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import {
  categoriaDoTermo,
  listarTermos,
  pontuarTermo,
  ROTULO_CATEGORIA_GLOSSARIO,
  type CategoriaGlossario,
} from "@/lib/data/glossario";
import { normalizar } from "@/lib/busca";
import { PageHero } from "@/components/PageShell";
import manuscrito from "@/assets/manuscrito.jpg";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/glossario")({
  head: () => ({
    meta: [
      { title: "Glossário Católico — Termos Doutrinais Explicados" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/glossario" },
      {
        name: "description",
        content:
          "Dicionário dos termos centrais da fé católica: graça, dogma, transubstanciação, magistério, Trindade, sacramento e mais — com referências ao Catecismo.",
      },
      { name: "keywords", content: keywordsPara(["formacao", "catecismo"]) },
      { property: "og:title", content: "Glossário Católico" },
      {
        property: "og:description",
        content:
          "Definições breves e fiéis dos principais termos doutrinais da Igreja Católica, com referências ao Catecismo.",
      },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/glossario" }],
  }),
  component: GlossarioPage,
});

function GlossarioPage() {
  const todos = useMemo(() => listarTermos(), []);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<CategoriaGlossario | "todas">("todas");

  const filtrados = useMemo(() => {
    return todos
      .filter((termo) => categoria === "todas" || categoriaDoTermo(termo) === categoria)
      .map((termo) => ({ termo, pontos: pontuarTermo(termo, busca) }))
      .filter((item) => item.pontos > 0)
      .sort((a, b) => b.pontos - a.pontos || a.termo.termo.localeCompare(b.termo.termo, "pt-BR"))
      .map((item) => item.termo);
  }, [busca, categoria, todos]);

  return (
    <div>
      <PageHero
        autoridade={["oficial", "teologia"]}
        image={manuscrito}
        eyebrow="Lexicon Fidei"
        title={
          <>
            Glossário <span className="italic text-gold/70">Católico</span>
          </>
        }
        intro="Definições breves e fiéis dos termos centrais da fé católica, todas com referência ao Catecismo da Igreja Católica ou ao Magistério."
      />

      <div className="shell py-block">
        <Link
          to="/"
          className="inline-flex items-center gap-2 kicker hover:text-gold mb-12 transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Voltar
        </Link>

        <div className="mb-12">
          <input
            aria-label="Buscar termo no glossário"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar termo (graça, dogma, Eucaristia…)"
            className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-4 px-2 text-foreground placeholder:text-muted-foreground/60 text-lg focus:outline-none transition-colors"
          />
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtrar o glossário por categoria">
            <button
              type="button"
              onClick={() => setCategoria("todas")}
              aria-pressed={categoria === "todas"}
              className={`chip ${categoria === "todas" ? "chip-gold" : ""}`}
            >
              Todas
            </button>
            {(Object.entries(ROTULO_CATEGORIA_GLOSSARIO) as [CategoriaGlossario, string][]).map(
              ([chave, rotulo]) => (
                <button
                  key={chave}
                  type="button"
                  onClick={() => setCategoria(chave)}
                  aria-pressed={categoria === chave}
                  className={`chip ${categoria === chave ? "chip-gold" : ""}`}
                >
                  {rotulo}
                </button>
              ),
            )}
          </div>
          <p className="mt-4 text-step--2 text-muted-foreground" aria-live="polite">
            {filtrados.length} verbetes encontrados
          </p>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {filtrados.map((t) => (
            <div
              id={normalizar(t.termo).replace(/\s+/g, "-")}
              key={t.termo}
              className="scroll-mt-32 border-l-2 border-gold/20 pl-6 hover:border-gold transition-colors"
            >
              <dt className="font-display text-2xl text-foreground mb-2">{t.termo}</dt>
              <dd className="mb-2 text-step--2 uppercase tracking-wider text-gold/70">
                {ROTULO_CATEGORIA_GLOSSARIO[categoriaDoTermo(t)]}
              </dd>
              <dd className="text-sm text-muted-foreground leading-relaxed font-light">
                {t.definicao}
                {t.ref ? <span className="block mt-3 kicker">{t.ref}</span> : null}
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
    </div>
  );
}
