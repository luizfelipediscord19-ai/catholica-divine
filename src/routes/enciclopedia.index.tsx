import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, ExternalLink, Search } from "lucide-react";

import { PageHero } from "@/components/PageShell";
import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { VERBETES_ENCICLOPEDIA } from "@/lib/data/enciclopedia";
import { normalizar } from "@/lib/busca";
import { keywordsPara } from "@/lib/seo/palavras-chave";
import manuscrito from "@/assets/manuscrito.jpg";

const URL = "https://portalcatolico.vercel.app/enciclopedia";
const DESCRICAO =
  "Enciclopédia Católica interligada: doutrina, Escritura, liturgia e vida espiritual com sínteses próprias, referências ao Catecismo e ligações temáticas.";

export const Route = createFileRoute("/enciclopedia/")({
  head: () => ({
    meta: [
      { title: "Enciclopédia Católica — Doutrina e Fontes" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["catecismo", "formacao", "biblia"]) },
      { property: "og:title", content: "Enciclopédia Católica Interligada" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: EnciclopediaPage,
});

function EnciclopediaPage() {
  const [busca, setBusca] = useState("");
  const verbetes = useMemo(() => {
    const termo = normalizar(busca);
    if (!termo) return VERBETES_ENCICLOPEDIA;
    return VERBETES_ENCICLOPEDIA.filter((verbete) =>
      normalizar(
        `${verbete.termo} ${verbete.categoria} ${verbete.sintese} ${verbete.referencias.join(" ")}`,
      ).includes(termo),
    );
  }, [busca]);

  return (
    <div>
      <PageHero
        eyebrow="Scientia fidei"
        title={
          <>
            Enciclopédia Católica <span className="italic text-gold/80">Interligada</span>
          </>
        }
        intro="Um mapa de conceitos para estudar a fé sem perder o vínculo entre Escritura, Tradição, liturgia e vida cristã."
        image={manuscrito}
        autoridade={["oficial", "teologia"]}
        notaAutoridade="Sínteses próprias baseadas no Catecismo, em documentos conciliares e na Escritura. As referências permitem conferir cada tema na fonte."
      />

      <main className="eixo-nave shell py-section">
        <section className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="num-secao justify-center">Consulta temática</p>
          <h2 className="title-section mt-3">Da pergunta à fonte</h2>
          <div className="filete-ouro mx-auto my-5 max-w-xs" aria-hidden="true" />
          <p className="body-base mx-auto measure text-muted-foreground">
            Cada verbete resume o sentido católico do termo, aponta as referências principais e
            conduz aos assuntos que completam o estudo.
          </p>

          <label className="mx-auto mt-8 block w-full max-w-xl text-left">
            <span className="kicker">Buscar na enciclopédia</span>
            <span className="field-base mt-2 flex w-full items-center gap-2">
              <Search className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <input
                type="search"
                aria-label="Buscar na Enciclopédia Católica"
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
                placeholder="Ex.: Eucaristia, graça, Trindade"
                className="min-w-0 flex-1 bg-transparent outline-none"
              />
            </span>
          </label>
        </section>

        <section className="relative z-[1] mt-16 grid gap-px border-y border-gold/15 bg-gold/15 lg:grid-cols-2">
          {verbetes.map((verbete) => (
            <article
              id={verbete.slug}
              key={verbete.slug}
              className="scroll-mt-28 bg-background p-card transition-premium hover:bg-card/70"
            >
              <p className="kicker">{verbete.categoria}</p>
              <h2 className="title-card mt-2 text-foreground">{verbete.termo}</h2>
              <p className="body-base mt-4 text-muted-foreground">{verbete.sintese}</p>
              <div className="mt-5 border-l border-gold/35 pl-4">
                <p className="label-btn text-gold">Referências para conferir</p>
                <p className="body-sm mt-2 text-foreground/75">{verbete.referencias.join(" · ")}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-gold/10 pt-4">
                {verbete.relacionados.map((slug) => {
                  const relacionado = VERBETES_ENCICLOPEDIA.find((item) => item.slug === slug);
                  return relacionado ? (
                    <a key={slug} href={`#${slug}`} className="chip chip-gold hover:text-paper">
                      {relacionado.termo}
                    </a>
                  ) : null;
                })}
              </div>
            </article>
          ))}
        </section>

        {verbetes.length === 0 ? (
          <p className="relative z-[1] py-section text-center text-muted-foreground">
            Nenhum verbete encontrado para “{busca}”.
          </p>
        ) : null}

        <section className="santuario-editorial relative z-[1] mt-16 px-6 py-12 text-center">
          <BookOpen className="mx-auto size-6 text-gold" aria-hidden="true" />
          <h2 className="title-section mt-4">Continue pela fonte primária</h2>
          <p className="body-base mx-auto mt-4 measure text-muted-foreground">
            Consulte a organização completa do Catecismo ou leia os documentos oficiais da Santa Sé.
          </p>
          <div className="action-tray mt-7 justify-center">
            <Link to="/catecismo/artigos" className="btn-base btn-gold btn-md">
              Catecismo por artigos <ArrowRight className="size-4" />
            </Link>
            <a
              href="https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html"
              target="_blank"
              rel="noopener"
              className="btn-base btn-outline-gold btn-md"
            >
              Texto oficial <ExternalLink className="size-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
