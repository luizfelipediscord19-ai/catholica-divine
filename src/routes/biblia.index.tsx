import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "../components/PageShell";
import { LIVROS } from "../lib/data/biblia";
import manuscrito from "../assets/manuscrito.jpg";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/biblia/")({
  head: () => ({
    meta: [
      { title: "Bíblia Sagrada — 73 Livros — Portal Católico" },
      { name: "description", content: "Os 73 livros da Bíblia Católica, com navegação capítulo a capítulo e link para o texto oficial em português." },
      { property: "og:title", content: "Bíblia Sagrada Católica" },
      { property: "og:description", content: "Antigo e Novo Testamento — 73 livros navegáveis." },
    ],
  }),
  component: Page,
});

const GRUPOS_AT = ["Pentateuco", "Históricos", "Sapienciais", "Proféticos"];
const GRUPOS_NT = ["Evangelhos", "Atos", "Cartas Paulinas", "Cartas Católicas", "Apocalipse"];

function Page() {
  const [q, setQ] = useState("");
  const filtro = q.trim().toLowerCase();
  
  // Memoize filtered lists to prevent heavy calculations on every render
  const filteredAT = GRUPOS_AT.map(g => ({
    grupo: g,
    livros: LIVROS.filter(l => 
      l.testamento === "AT" && 
      l.grupo === g && 
      (!filtro || l.nome.toLowerCase().includes(filtro) || l.abrev.toLowerCase().includes(filtro))
    )
  })).filter(g => g.livros.length > 0);

  const filteredNT = GRUPOS_NT.map(g => ({
    grupo: g,
    livros: LIVROS.filter(l => 
      l.testamento === "NT" && 
      l.grupo === g && 
      (!filtro || l.nome.toLowerCase().includes(filtro) || l.abrev.toLowerCase().includes(filtro))
    )
  })).filter(g => g.livros.length > 0);

  return (
    <div>
      <PageHero
        eyebrow="Sacra Scriptura"
        title="A Bíblia Sagrada"
        intro="Os 73 livros inspirados pelo Espírito Santo, transmitidos pela Igreja desde os Apóstolos. Texto oficial servido pela Editora Ave-Maria via bibliacatolica.com.br."
        image={manuscrito}
      />

      <div className="max-w-6xl mx-auto px-6 pt-10 flex flex-wrap items-center gap-4 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gold/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar livro... (ex: Salmos, Mt)"
            className="w-full pl-11 pr-4 py-3 bg-card border border-gold/25 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
          />
        </div>
        <Link
          to="/biblia/leituras"
          className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-deep text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors"
        >
          Leituras diárias
        </Link>
      </div>

      <Section kicker="Antigo Testamento" title="46 livros — Da Criação ao Messias">
        <div className="space-y-10">
          {filteredAT.map(({ grupo, livros }) => (
            <div key={grupo}>
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">{grupo}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-gold/15">
                {livros.map((l) => (
                  <Link
                    key={l.slug}
                    to="/biblia/$livro"
                    params={{ livro: l.slug }}
                    className="bg-background hover:bg-card p-4 transition-colors group"
                  >
                    <div className="font-display text-base text-foreground group-hover:text-gold">
                      {l.nome}
                    </div>
                    <div className="text-[10px] mt-1 text-muted-foreground tracking-wider uppercase">
                      {l.abrev} · {l.capitulos} cap.
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Novo Testamento" title="27 livros — A Boa Nova de Cristo">
        <div className="space-y-10">
          {filteredNT.map(({ grupo, livros }) => (
            <div key={grupo}>
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-4">{grupo}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-gold/15">
                {livros.map((l) => (
                  <Link
                    key={l.slug}
                    to="/biblia/$livro"
                    params={{ livro: l.slug }}
                    className="bg-background hover:bg-card p-4 transition-colors group"
                  >
                    <div className="font-display text-base text-foreground group-hover:text-gold">
                      {l.nome}
                    </div>
                    <div className="text-[10px] mt-1 text-muted-foreground tracking-wider uppercase">
                      {l.abrev} · {l.capitulos} cap.
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
