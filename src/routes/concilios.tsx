import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

import { PageHero } from "@/components/PageShell";
import { linkificarNos } from "@/components/CitacoesLinkadas";
import { CONCILIOS } from "@/lib/data/concilios";
import { keywordsPara } from "@/lib/seo/palavras-chave";
import concilio from "@/assets/concilio-trento.jpg";

const URL = "https://portalcatolico.vercel.app/concilios";
const DESCRICAO =
  "Os vinte e um concílios ecumênicos da Igreja Católica: datas, local, papa, contexto histórico e as principais definições de fé, com referências ao Catecismo.";

export const Route = createFileRoute("/concilios")({
  head: () => ({
    meta: [
      { title: "Concílios Ecumênicos — Os 21 Concílios da Igreja | Portal Católico" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["catecismo", "formacao"]) },
      { property: "og:title", content: "Concílios Ecumênicos da Igreja Católica" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ConciliosPage,
});

function ConciliosPage() {
  return (
    <div>
      <PageHero
        eyebrow="Concilia Ecclesiae"
        title={
          <>
            Concílios <span className="italic text-gold/80">Ecumênicos</span>
          </>
        }
        intro="Vinte e um concílios reconhecidos pela Igreja Católica, de Niceia ao Vaticano II: o que estava em causa e o que ficou definido para sempre."
        image={concilio}
        autoridade={["oficial", "historia"]}
        notaAutoridade="Datas, locais e definições são fatos verificáveis. As sínteses são redação própria; as referências permitem conferir o texto oficial."
      />

      <main className="eixo-nave shell py-section">
        <section className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="num-secao justify-center">Vinte e um concílios</p>
          <h2 className="title-section mt-3">Da fé professada à fé definida</h2>
          <div className="filete-ouro mx-auto my-5 max-w-xs" aria-hidden="true" />
          <p className="body-base measure mx-auto text-muted-foreground">
            Um concílio ecumênico reúne o colégio dos bispos com o Papa e, nessa comunhão,
            exerce o Magistério da Igreja inteira. Nem todo concílio definiu dogmas: muitos
            trataram de disciplina, reforma e unidade.
          </p>
        </section>

        <ol className="mt-section space-y-md">
          {CONCILIOS.map((c) => (
            <li key={c.slug} id={c.slug} className="surface-card scroll-mt-24 p-card">
              <p className="kicker flex flex-wrap items-center gap-2">
                <Landmark className="size-3.5 text-gold" aria-hidden="true" />
                {c.numero}º concílio · {c.anos}
              </p>
              <h3 className="mt-2xs font-display text-step-1 text-foreground">{c.nome}</h3>
              <p className="mt-2xs text-step--1 text-muted-foreground">
                {c.local} · {c.papa}
              </p>
              <p className="mt-xs body-base text-muted-foreground">{linkificarNos(c.contexto)}</p>
              <ul className="mt-sm space-y-2xs">
                {c.definicoes.map((d) => (
                  <li key={d} className="flex gap-2 text-step--1 leading-relaxed text-foreground/85">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-gold/70" />
                    <span>{linkificarNos(d)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-sm text-step--2 text-muted-foreground">
                Conferir em: {linkificarNos(c.referencias.join(" · "))}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-section border-t border-gold/15 pt-6 text-step--2 leading-relaxed text-muted-foreground">
          Continue o estudo com os{" "}
          <Link to="/padres-da-igreja" className="text-gold hover:underline">
            Padres da Igreja
          </Link>
          , o{" "}
          <Link to="/catecismo" className="text-gold hover:underline">
            Catecismo
          </Link>{" "}
          e a{" "}
          <Link to="/enciclopedia" className="text-gold hover:underline">
            Enciclopédia Católica
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
