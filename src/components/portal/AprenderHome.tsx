import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sprout, BookOpen, Church, Bird, Shield, Library } from "lucide-react";

const EXEMPLOS = [
  "O que é a Eucaristia?",
  "Por que os católicos rezam para Maria?",
  "O que é o purgatório?",
  "Como fazer uma boa confissão?",
  "O que a Igreja ensina sobre os sacramentos?",
];

/** Busca central da home: "O que você gostaria de aprender?" */
export function BuscaAprender() {
  const navigate = useNavigate();
  const [termo, setTermo] = useState("");

  function ir(q: string) {
    const limpo = q.trim();
    if (limpo.length < 2) return;
    void navigate({ to: "/busca", search: { q: limpo } });
  }

  return (
    <section aria-labelledby="aprender-titulo" className="shell py-block">
      <div className="measure mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">Comece pela sua dúvida</p>
        <h2
          id="aprender-titulo"
          className="mt-4 font-display leading-tight text-foreground text-[length:var(--step-3)]"
        >
          O que você gostaria de aprender?
        </h2>
      </div>

      <form
        role="search"
        aria-label="Buscar um assunto da fé"
        onSubmit={(e) => {
          e.preventDefault();
          ir(termo);
        }}
        className="mx-auto mt-[var(--space-sm)] flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
      >
        <label className="sr-only" htmlFor="home-busca">
          Digite uma dúvida sobre a fé
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold/70"
            aria-hidden="true"
          />
          <input
            id="home-busca"
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Digite uma dúvida sobre a fé..."
            className="min-h-13 w-full border border-gold/25 bg-card/50 py-4 pl-11 pr-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
        </div>
        <button
          type="submit"
          className="inline-flex min-h-13 items-center justify-center gap-2 bg-gold px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-deep transition-premium hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Buscar
        </button>
      </form>

      <ul className="mx-auto mt-[var(--space-sm)] flex max-w-3xl flex-wrap justify-center gap-2">
        {EXEMPLOS.map((ex) => (
          <li key={ex}>
            <Link
              to="/busca"
              search={{ q: ex }}
              className="inline-flex min-h-9 items-center border border-gold/15 px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {ex}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const CAMINHOS = [
  {
    to: "/trilhas/primeiros-passos",
    icon: Sprout,
    titulo: "Sou novo na fé",
    desc: "Aprenda os fundamentos do catolicismo, passo a passo.",
  },
  {
    to: "/biblia",
    icon: BookOpen,
    titulo: "Quero conhecer a Bíblia",
    desc: "Descubra como começar a ler e compreender a Sagrada Escritura.",
  },
  {
    to: "/sacramentos",
    icon: Church,
    titulo: "Quero conhecer os Sacramentos",
    desc: "Entenda os sete sacramentos e sua importância.",
  },
  {
    to: "/santos",
    icon: Bird,
    titulo: "Quero conhecer os Santos",
    desc: "Conheça a vida e os ensinamentos dos santos.",
  },
  {
    to: "/apologetica",
    icon: Shield,
    titulo: "Tenho dúvidas sobre a Igreja",
    desc: "Encontre respostas fundamentadas na fé católica.",
  },
  {
    to: "/catecismo",
    icon: Library,
    titulo: "Quero aprofundar minha fé",
    desc: "Catecismo, Tradição, Padres da Igreja, apologética e Magistério.",
  },
] as const;

/** Área "Comece aqui" — entrada para quem não sabe por onde começar. */
export function ComeceAqui() {
  return (
    <section aria-labelledby="comece-aqui" className="border-y border-gold/10 bg-muted/20">
      <div className="shell py-block">
        <div className="measure">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">Comece aqui</p>
          <h2
            id="comece-aqui"
            className="mt-4 font-display leading-tight text-foreground text-[length:var(--step-3)]"
          >
            Não sabe por onde começar?
          </h2>
          <p className="mt-4 font-light leading-relaxed text-muted-foreground">
            Escolha o ponto de partida mais próximo do seu momento — cada caminho leva direto ao
            conteúdo certo.
          </p>
        </div>

        <ul
          className="mt-[var(--space-md)] grid gap-[var(--space-sm)]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17rem), 1fr))" }}
        >
          {CAMINHOS.map((c) => (
            <li key={c.titulo} className="min-w-0">
              <Link
                to={c.to}
                className="group flex h-full min-h-11 flex-col gap-3 border border-gold/15 bg-card/40 p-card transition-premium hover:-translate-y-1 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <c.icon className="size-6 text-gold" aria-hidden="true" />
                <h3 className="font-display text-foreground text-[length:var(--step-1)] group-hover:text-gold transition-colors">
                  {c.titulo}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">{c.desc}</p>
                <span className="mt-auto pt-2 text-[10px] uppercase tracking-[0.3em] text-gold/60 group-hover:text-gold">
                  Começar →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
