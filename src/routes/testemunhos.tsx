import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, MessageSquare, ArrowRight } from "lucide-react";
import santosGloria from "@/assets/santos-gloria.jpg";

import { PageHero, Section } from "@/components/PageShell";
import { AutorSelo, Painel, Rotulo, autorDe, botaoClass, formatarData } from "@/components/portal/comuns";
import { useIdentidade } from "@/hooks/use-identidade";
import { listarTopicosFn } from "@/lib/portal.functions";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const SECAO = "santos-e-testemunhos";
const URL = "https://portalcatolico.vercel.app/testemunhos";

export const Route = createFileRoute("/testemunhos")({
  head: () => ({
    meta: [
      { title: "Testemunhos de Fé — Graças e Conversões | Portal Católico" },
      {
        name: "description",
        content:
          "Depoimentos de visitantes do Portal Católico: graças recebidas, conversões e a intercessão dos santos. Leia, reze e diga o seu Amém.",
      },
      { name: "keywords", content: keywordsPara(["formacao", "marca"]) },
      { property: "og:title", content: "Testemunhos de Fé — Portal Católico" },
      {
        property: "og:description",
        content:
          "Graças recebidas, conversões e intercessão dos santos, partilhadas pela comunidade do fórum Agora Ecclesiae.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: TestemunhosPage,
});

function TestemunhosPage() {
  const { token } = useIdentidade();
  const testemunhos = useQuery({
    queryKey: ["forum", "topicos", SECAO, token ?? "anon"],
    queryFn: () => listarTopicosFn({ data: { secaoSlug: SECAO, token } }),
  });

  const lista = testemunhos.data ?? [];
  const totalAmens = lista.reduce((soma, t) => soma + (t.amens ?? 0), 0);
  const totalRespostas = lista.reduce((soma, t) => soma + (t.respostas_count ?? 0), 0);

  return (
    <div>
      <PageHero
        eyebrow="Comunidade"
        title={
          <>
            Testemunhos <span className="italic font-light text-gold">de fé</span>
          </>
        }
        intro="Graças recebidas, conversões e a intercessão dos santos, partilhadas por visitantes do Portal. Cada testemunho vem da seção “Santos e Testemunhos” do fórum Agora Ecclesiae — e o “Amém” é a oração da comunidade por quem escreveu."
        image={santosGloria}
      />

      <Section kicker="Panorama" title="A voz da comunidade">
        <div className="grid gap-[var(--space-sm)] sm:grid-cols-3">
          <Painel>
            <Rotulo>Testemunhos</Rotulo>
            <p className="font-display text-4xl text-gold">{lista.length}</p>
          </Painel>
          <Painel>
            <Rotulo>Améns rezados</Rotulo>
            <p className="font-display text-4xl text-gold">{totalAmens}</p>
          </Painel>
          <Painel>
            <Rotulo>Respostas</Rotulo>
            <p className="font-display text-4xl text-gold">{totalRespostas}</p>
          </Painel>
        </div>

        <div className="mt-md flex flex-wrap items-center gap-3">
          <Link to="/forum" className={botaoClass}>
            Partilhar meu testemunho no fórum <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            to="/contato"
            className="label-btn text-paper/70 underline decoration-gold/40 underline-offset-4 hover:text-gold"
          >
            Enviar dúvida ou sugestão
          </Link>
        </div>
      </Section>

      <Section kicker="Depoimentos" title="O que a comunidade partilha">
        {testemunhos.isPending ? (
          <p className="text-sm text-muted-foreground">Carregando testemunhos…</p>
        ) : lista.length === 0 ? (
          <Painel>
            <p className="text-sm text-muted-foreground">
              Ainda não há testemunhos publicados. Seja o primeiro a partilhar uma graça recebida no
              fórum — sua identidade pública continua sendo um santo padroeiro sorteado.
            </p>
          </Painel>
        ) : (
          <ul className="grid gap-[var(--space-sm)] md:grid-cols-2">
            {lista.map((t) => {
              const autor = autorDe(t as never);
              return (
                <li key={t.id}>
                  <Link
                    to="/forum/$slug"
                    params={{ slug: t.slug }}
                    className="flex h-full flex-col border border-gold/15 bg-card/40 p-6 backdrop-blur-md transition-premium hover:-translate-y-0.5 hover:border-gold/40"
                  >
                    <p className="kicker mb-3">{formatarData(t.ultima_atividade)}</p>
                    <h3 className="mb-3 font-display text-2xl leading-tight text-foreground">
                      {t.titulo}
                    </h3>
                    <blockquote className="mb-5 border-l border-gold/40 pl-4 text-sm font-light italic leading-relaxed text-muted-foreground line-clamp-4">
                      {t.corpo}
                    </blockquote>
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <AutorSelo autor={autor} />
                      <span className="flex items-center gap-4 text-xs text-paper/60">
                        <span className="inline-flex items-center gap-2">
                          <MessageSquare className="size-3.5" aria-hidden="true" />
                          {t.respostas_count}
                        </span>
                        <span className={`inline-flex items-center gap-2 ${t.reagi ? "text-gold" : ""}`}>
                          <Heart
                            className={`size-3.5 ${t.reagi ? "fill-current" : ""}`}
                            aria-hidden="true"
                          />
                          {t.amens}
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </div>
  );
}
