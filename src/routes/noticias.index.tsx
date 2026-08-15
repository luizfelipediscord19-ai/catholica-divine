import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { Newspaper, ExternalLink } from "lucide-react";

import { PageHero } from "@/components/PageShell";
import { listarNoticiasFn } from "@/lib/noticias.functions";

const SITE_URL = "https://portalcatolico.vercel.app";

const noticiasQuery = queryOptions({
  queryKey: ["noticias", "lista"],
  queryFn: () => listarNoticiasFn({ data: { limite: 40 } }),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/noticias/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(noticiasQuery),
  head: () => ({
    meta: [
      { title: "Notícias Católicas — atualizadas todos os dias | Portal Católico" },
      {
        name: "description",
        content:
          "Notícias da Igreja Católica revisadas e publicadas diariamente ao meio-dia (horário de Brasília): Vaticano, Papa, liturgia, santos e a vida da Igreja no Brasil e no mundo.",
      },
      { property: "og:title", content: "Notícias Católicas — Portal Católico" },
      {
        property: "og:description",
        content:
          "A vida da Igreja em edição diária: Vaticano, Papa, liturgia e comunidade — com fonte citada em cada notícia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/noticias` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/noticias` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Notícias", item: `${SITE_URL}/noticias` },
          ],
        }),
      },
    ],
  }),
  errorComponent: () => <NoticiasIndisponiveis />,
  component: NoticiasPage,
});

function formatar(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}

function NoticiasPage() {
  const { data: noticias } = useSuspenseQuery(noticiasQuery);
  const [destaque, ...resto] = noticias;

  return (
    <div>
      <PageHero
        eyebrow="Acta Ecclesiae · Edição diária"
        title={
          <>
            Notícias <span className="italic font-light text-gold">da Igreja</span>
          </>
        }
        intro="A vida da Igreja em edição diária, publicada todos os dias ao meio-dia (horário de Brasília). Cada notícia traz a fonte original para consulta."
      />

      <div className="shell py-block">
        {noticias.length === 0 ? (
          <div className="glass p-card text-center">
            <Newspaper className="mx-auto mb-4 size-8 text-gold/70" aria-hidden="true" />
            <p className="text-foreground/80">
              A primeira edição está sendo preparada. Volte ao meio-dia para a atualização de hoje.
            </p>
          </div>
        ) : (
          <div className="space-y-[var(--space-lg)]">
            <article className="glass p-card">
              <p className="label-btn text-gold/80">
                {destaque.categoria} · {formatar(destaque.publicado_em)}
              </p>
              <h2 className="mt-3 title-page text-foreground">
                <Link to="/noticias/$slug" params={{ slug: destaque.slug }} className="hover:text-gold transition-colors">
                  {destaque.titulo}
                </Link>
              </h2>
              <p className="measure mt-4 text-[length:var(--step-0)] font-light leading-relaxed text-muted-foreground">
                {destaque.resumo}
              </p>
              <Link
                to="/noticias/$slug"
                params={{ slug: destaque.slug }}
                className="mt-6 inline-flex min-h-11 items-center kicker hover:text-gold transition-colors"
              >
                Ler a notícia →
              </Link>
            </article>

            <div className="grid grid-cols-1 gap-px bg-gold/10 md:grid-cols-2 lg:grid-cols-3">
              {resto.map((n) => (
                <article key={n.id} className="flex h-full flex-col bg-background p-card">
                  <p className="label-btn text-gold/80">
                    {n.categoria} · {formatar(n.publicado_em)}
                  </p>
                  <h3 className="mt-3 title-card text-foreground">
                    <Link to="/noticias/$slug" params={{ slug: n.slug }} className="hover:text-gold transition-colors">
                      {n.titulo}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
                    {n.resumo}
                  </p>
                  {n.fonte_nome ? (
                    <p className="mt-4 flex items-center gap-2 kicker text-muted-foreground">
                      <ExternalLink className="size-3.5" aria-hidden="true" /> {n.fonte_nome}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
