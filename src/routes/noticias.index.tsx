import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { ImagemOtimizada } from "@/components/ImagemOtimizada";
import { Newspaper, ExternalLink, ArrowRight } from "lucide-react";

import { PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { listarNoticiasFn } from "@/lib/noticias.functions";
import concilio from "@/assets/concilio-trento.jpg";
import claustro from "@/assets/claustro.jpg";
import manuscrito from "@/assets/manuscrito.jpg";
import emaus from "@/assets/emaus.jpg";
import doutores from "@/assets/doutores.jpg";
import sacramentosArte from "@/assets/sacramentos.jpg";

const SITE_URL = "https://portalcatolico.vercel.app";
/** Só obras em formato paisagem: evitam recortes que decapitam as figuras. */
const CAPAS_EDITORIAIS = [concilio, emaus, doutores, manuscrito, sacramentosArte];


function imagemPublicavel(url: string | null): string | null {
  if (!url || !/^https:\/\//i.test(url)) return null;
  if (/youtube\.com|youtu\.be|\.svg(?:$|\?)/i.test(url)) return null;
  return url;
}

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

function NoticiasIndisponiveis() {
  return (
    <div>
      <PageHero
        image={claustro}
        eyebrow="Acta Ecclesiae · Edição diária"
        title={
          <>
            Notícias <span className="italic font-light text-gold">da Igreja</span>
          </>
        }
        intro="A edição de hoje não pôde ser carregada agora."
      />
      <div className="shell py-block">
        <div className="glass p-card text-center" role="alert">
          <Newspaper className="mx-auto mb-4 size-8 text-gold/70" aria-hidden="true" />
          <p className="measure mx-auto text-foreground/80">
            As notícias não estão acessíveis neste momento. Se estiveres sem internet, verás aqui as
            edições já lidas; caso contrário, tenta de novo em alguns instantes.
          </p>
          <Button onClick={() => window.location.reload()} className="mt-6 label-btn">
            Tentar de novo
          </Button>
        </div>
      </div>
    </div>
  );
}

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
        image={claustro}
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
            <p className="measure mx-auto text-foreground/80">
              A edição de hoje está sendo preparada. Enquanto isso, acompanhe a vida da Igreja pela
              liturgia do dia e pelo santo celebrado hoje.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/liturgia-diaria" className="btn-base btn-gold px-5 py-2.5 label-btn">
                Liturgia de hoje
              </Link>
              <Link to="/santos" className="btn-base btn-outline-gold px-5 py-2.5 label-btn">
                Santo do dia
              </Link>
            </div>
          </div>
        ) : (

          <div className="space-y-[var(--space-lg)]">
            <p className="kicker">
              {noticias.length} {noticias.length === 1 ? "notícia" : "notícias"} no acervo
            </p>

            {/* Destaque: o cartão inteiro é área de toque no celular. */}
            <Link
              to="/noticias/$slug"
              params={{ slug: destaque.slug }}
              className="glass group grid overflow-hidden transition-premium active:scale-[0.995] hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:grid-cols-[1.1fr_1fr]"
            >
              <div className="relative min-h-64 overflow-hidden lg:min-h-full">
                <ImagemOtimizada
                  src={imagemPublicavel(destaque.imagem_url) ?? pentecostes}
                  alt={`Imagem de abertura: ${destaque.titulo}`}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="art-plate absolute inset-0 size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-deep/80 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-deep/45" />
              </div>
              <div className="flex flex-col justify-center p-card lg:p-[var(--space-md)]">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 label-btn text-gold/80">
                  <span>{destaque.categoria}</span>
                  <span aria-hidden className="size-1 rounded-full bg-gold/40" />
                  <span>{formatar(destaque.publicado_em)}</span>
                </p>
                <h2 className="mt-3 font-display text-[length:var(--step-2)] leading-[1.18] text-balance text-foreground transition-colors group-hover:text-gold sm:text-[length:var(--step-4)] sm:leading-[1.08]">
                  {destaque.titulo}
                </h2>
                <p className="measure mt-4 body-base text-muted-foreground">{destaque.resumo}</p>
                <span className="mt-5 inline-flex min-h-11 items-center gap-2 kicker group-hover:text-gold">
                  Ler a notícia <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
            {/* Editorial Intermezzo News */}
            <section className="relative my-[var(--space-lg)] p-card border border-gold/20 overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <ImagemOtimizada src={concilio} alt="" width={1536} height={1024} className="size-full object-cover opacity-10 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <p className="kicker text-gold mb-3">Magistério e Tradição</p>
                <h3 className="font-display text-[length:var(--step-2)] text-foreground leading-tight mb-4">
                  “A Igreja é a coluna e o fundamento da verdade.”
                </h3>
                <p className="text-sm font-light text-muted-foreground italic mb-6">
                  Cada notícia aqui publicada é um fragmento da história da Igreja no tempo, 
                  sempre iluminada pela luz eterna do Magistério.
                </p>
                <Link to="/catecismo" className="inline-flex items-center gap-2 kicker hover:text-gold transition-colors">
                  Consultar o Catecismo →
                </Link>
              </div>
            </section>


            <div className="grid grid-cols-1 gap-[var(--space-sm)] md:grid-cols-2 lg:grid-cols-3">
              {resto.map((n, index) => (
                <Link
                  key={n.id}
                  to="/noticias/$slug"
                  params={{ slug: n.slug }}
                  className="surface-card surface-card-interactive group flex h-full min-h-[6rem] flex-col overflow-hidden focus-visible:outline-none"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ImagemOtimizada
                      src={imagemPublicavel(n.imagem_url) ?? CAPAS_EDITORIAIS[index % CAPAS_EDITORIAIS.length]!}
                      alt={`Imagem de abertura: ${n.titulo}`}
                      width={1536}
                      height={1024}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="art-plate size-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-deep/75 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-card">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 label-btn text-gold/80">
                      <span>{n.categoria}</span>
                      <span aria-hidden className="size-1 rounded-full bg-gold/40" />
                      <span>{formatar(n.publicado_em)}</span>
                    </p>
                    <h3 className="mt-3 title-card text-balance text-foreground transition-colors group-hover:text-gold">{n.titulo}</h3>
                    <p className="mt-3 line-clamp-4 flex-1 body-sm">{n.resumo}</p>
                    {n.fonte_nome ? (
                      <p className="mt-4 flex min-w-0 items-center gap-2 border-t border-gold/10 pt-4 kicker text-muted-foreground">
                        <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{n.fonte_nome}</span>
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
