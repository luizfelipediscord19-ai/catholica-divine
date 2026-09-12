import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";

import { PageHero } from "@/components/PageShell";
import { linkificarNos } from "@/components/CitacoesLinkadas";
import { ERA_NOME, PADRES, type EraPadre } from "@/lib/data/padres";
import { keywordsPara } from "@/lib/seo/palavras-chave";
import doutores from "@/assets/doutores.jpg";

const URL = "https://portalcatolico.vercel.app/padres-da-igreja";
const DESCRICAO =
  "Padres da Igreja: apostólicos, gregos, latinos e do deserto — datas, obras principais e contribuição doutrinal, com referências ao Catecismo.";

const ORDEM: EraPadre[] = ["apostolicos", "gregos", "latinos", "desertos"];

const INTRO: Record<EraPadre, string> = {
  apostolicos:
    "Escreveram na geração imediatamente seguinte aos apóstolos; seu testemunho mostra a Igreja já organizada em torno do bispo e da Eucaristia.",
  gregos:
    "No Oriente de língua grega, precisaram a linguagem da fé trinitária e cristológica que os concílios definiram.",
  latinos:
    "No Ocidente, criaram o vocabulário teológico latino e formaram a catequese, a exegese e a pastoral da Igreja.",
  desertos:
    "Do Egito à Palestina, ensinaram o combate espiritual, o discernimento e a oração contínua que atravessaram toda a tradição monástica.",
};

export const Route = createFileRoute("/padres-da-igreja")({
  head: () => ({
    meta: [
      { title: "Padres da Igreja — Testemunhas da Tradição | Portal Católico" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["catecismo", "formacao"]) },
      { property: "og:title", content: "Padres da Igreja" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: PadresPage,
});

function PadresPage() {
  return (
    <div>
      <PageHero
        eyebrow="Patres Ecclesiae"
        title={
          <>
            Padres da <span className="italic text-gold/80">Igreja</span>
          </>
        }
        intro="Os autores dos primeiros séculos que receberam a fé dos apóstolos e a transmitiram por escrito: quem foram, o que escreveram e o que a Igreja aprendeu com eles."
        image={doutores}
        autoridade={["padres", "historia"]}
        notaAutoridade="Datas e obras são fatos verificáveis. As sínteses são redação própria; as referências indicam onde conferir o ensinamento."
      />

      <main className="eixo-nave shell py-section">
        <section className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="num-secao justify-center">Tradição viva</p>
          <h2 className="title-section mt-3">Por que ler os Padres</h2>
          <div className="filete-ouro mx-auto my-5 max-w-xs" aria-hidden="true" />
          <p className="body-base measure mx-auto text-muted-foreground">
            A Igreja chama Padres os autores antigos que uniram ortodoxia da fé, santidade de vida,
            antiguidade e reconhecimento eclesial. Lê-los é ouvir como a Escritura foi compreendida
            antes de qualquer divisão posterior.
          </p>
        </section>

        {ORDEM.map((era) => {
          const grupo = PADRES.filter((p) => p.era === era);
          if (!grupo.length) return null;
          return (
            <section key={era} className="mt-section" aria-label={ERA_NOME[era]}>
              <h2 className="title-section flex items-center gap-2">
                <ScrollText className="size-5 text-gold" aria-hidden="true" />
                {ERA_NOME[era]}
              </h2>
              <p className="mt-xs body-base measure text-muted-foreground">{INTRO[era]}</p>

              <ul className="mt-md space-y-md">
                {grupo.map((p) => (
                  <li key={p.slug} id={p.slug} className="surface-card scroll-mt-24 p-card">
                    <h3 className="font-display text-step-1 text-foreground">{p.nome}</h3>
                    <p className="mt-2xs text-step--1 text-muted-foreground">
                      {p.datas} · {p.sede}
                    </p>
                    <p className="mt-xs body-base text-muted-foreground">
                      {linkificarNos(p.contribuicao)}
                    </p>
                    <p className="mt-sm text-step--2 text-muted-foreground">
                      <span className="text-foreground/80">Obras principais:</span>{" "}
                      {p.obras.join(" · ")}
                    </p>
                    <p className="mt-2xs text-step--2 text-muted-foreground">
                      Conferir em: {linkificarNos(p.referencias.join(" · "))}
                    </p>
                    {p.santo ? (
                      <Link
                        to="/santos/$slug"
                        params={{ slug: p.santo }}
                        className="mt-sm inline-block text-step--1 text-gold hover:underline"
                      >
                        Ficha do santo →
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <p className="mt-section border-t border-gold/15 pt-6 text-step--2 leading-relaxed text-muted-foreground">
          Veja também os{" "}
          <Link to="/doutores-da-igreja" className="text-gold hover:underline">
            Doutores da Igreja
          </Link>
          , os{" "}
          <Link to="/concilios" className="text-gold hover:underline">
            concílios ecumênicos
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
