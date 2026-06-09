import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Section } from "../components/PageShell";
import { SANTOS_LISTA, getSantoBasicoBySlug } from "@/lib/santos-lista";
import { buildSantoView } from "@/lib/santos-helpers";

export const Route = createFileRoute("/santos/$slug")({
  head: ({ params }) => {
    const basico = getSantoBasicoBySlug(params.slug);
    const view = buildSantoView(params.slug, basico);
    const title = `${view.nome} — Portal Católico`;
    const desc = (view.resumo ?? "Vida, virtudes e ensinamentos do santo.").slice(0, 160);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: view.nome },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["santo", params.slug],
      queryFn: () => {
        const basico = getSantoBasicoBySlug(params.slug);
        if (!basico) throw notFound();
        return { basico };
      },
    });
  },
  notFoundComponent: () => (
    <div>
      <PageHero
        eyebrow="Santo não encontrado"
        title="Não localizamos esse santo"
        intro="O endereço pode estar incorreto ou esse santo ainda não está em nossa galeria."
      />
      <Section>
        <Link to="/santos" className="text-gold underline">
          ← Voltar para todos os santos
        </Link>
      </Section>
    </div>
  ),
  component: SantoPage,
});

function SantoPage() {
  const { slug } = Route.useParams();
  const loaderData = Route.useLoaderData();
  
  if (!loaderData) return null;
  const { basico } = loaderData;
  const v = buildSantoView(slug, basico);

  const irmaos = SANTOS_LISTA
    .filter((s) => s.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <div>
      <PageHero
        eyebrow={v.titulo ?? "Vida de santo"}
        title={v.nome}
        intro={v.resumo ?? ""}
      />

      <Section>
        <div className="grid md:grid-cols-[1fr_280px] gap-12">
          <article className="space-y-10">
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">Biografia</h2>
              <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                {v.biografia}
              </p>
              {!v.temRico ? (
                <p className="mt-4 text-xs text-muted-foreground/70 italic">
                  Resumo breve. Em breve aprofundaremos a biografia deste santo com
                  fontes hagiográficas tradicionais.
                </p>
              ) : null}
            </div>

            {v.virtudes && v.virtudes.length > 0 ? (
              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">
                  Virtudes e motivos de veneração
                </h2>
                <ul className="space-y-2">
                  {v.virtudes.map((virt) => (
                    <li key={virt} className="flex gap-3 text-muted-foreground">
                      <span className="text-gold mt-1">✦</span>
                      <span>{virt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {v.frase ? (
              <blockquote className="border-l-2 border-gold pl-6 py-2 italic text-lg text-foreground/90">
                “{v.frase}”
                <footer className="mt-3 text-sm not-italic text-muted-foreground">
                  — {v.nome}
                </footer>
              </blockquote>
            ) : null}

            <div className="pt-6 border-t border-gold/20">
              <Link to="/santos" className="text-sm text-gold hover:underline">
                ← Voltar para todos os santos
              </Link>
            </div>
          </article>

          <aside className="space-y-6 text-sm">
            <div className="border border-gold/20 bg-card p-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-3">
                Ficha
              </p>
              <dl className="space-y-3">
                {v.data ? (
                  <div>
                    <dt className="text-xs text-muted-foreground">Memória litúrgica</dt>
                    <dd className="text-foreground">{v.data}</dd>
                  </div>
                ) : null}
                {v.seculo ? (
                  <div>
                    <dt className="text-xs text-muted-foreground">Época</dt>
                    <dd className="text-foreground">Século {v.seculo}</dd>
                  </div>
                ) : null}
                {v.padroeiro ? (
                  <div>
                    <dt className="text-xs text-muted-foreground">Padroeiro de</dt>
                    <dd className="text-foreground">{v.padroeiro}</dd>
                  </div>
                ) : null}
                {v.titulo ? (
                  <div>
                    <dt className="text-xs text-muted-foreground">Título</dt>
                    <dd className="text-foreground">{v.titulo}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-3">
                Outros santos
              </p>
              <ul className="space-y-2">
                {irmaos.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/santos/$slug"
                      params={{ slug: s.slug }}
                      className="text-foreground hover:text-gold transition-colors"
                    >
                      {s.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
