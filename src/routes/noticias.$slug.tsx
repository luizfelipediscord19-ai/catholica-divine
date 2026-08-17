import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { obterNoticiaFn } from "@/lib/noticias.functions";

const SITE_URL = "https://portalcatolico.vercel.app";

const noticiaQuery = (slug: string) =>
  queryOptions({
    queryKey: ["noticias", "item", slug],
    queryFn: () => obterNoticiaFn({ data: { slug } }),
    staleTime: 5 * 60 * 1000,
  });

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ context, params }) => {
    const noticia = await context.queryClient.ensureQueryData(noticiaQuery(params.slug));
    if (!noticia) throw notFound();
    return noticia;
  },
  head: ({ loaderData }) => {
    const n = loaderData;
    const url = `${SITE_URL}/noticias/${n?.slug ?? ""}`;
    return {
      meta: [
        { title: `${n?.titulo ?? "Notícia"} | Notícias Católicas` },
        { name: "description", content: n?.resumo ?? "Notícia da Igreja Católica." },
        { property: "og:title", content: n?.titulo ?? "Notícia Católica" },
        { property: "og:description", content: n?.resumo ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(n?.imagem_url
          ? [
              { property: "og:image", content: n.imagem_url },
              { name: "twitter:image", content: n.imagem_url },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: n
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: n.titulo.slice(0, 110),
                description: n.resumo,
                articleSection: n.categoria,
                inLanguage: "pt-BR",
                datePublished: n.publicado_em,
                dateModified: n.publicado_em,
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                url,
                ...(n.imagem_url ? { image: [n.imagem_url] } : {}),
                ...(n.autor ? { author: { "@type": "Person", name: n.autor } } : {}),
                publisher: {
                  "@type": "Organization",
                  name: "Portal Católico",
                  url: SITE_URL,
                  logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
                },
                ...(n.tags?.length ? { keywords: n.tags.join(", ") } : {}),
                ...(n.fonte_url ? { isBasedOn: n.fonte_url } : {}),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Notícias", item: `${SITE_URL}/noticias` },
                  { "@type": "ListItem", position: 3, name: n.titulo, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="shell-narrow py-block text-center">
      <p className="text-gold">Notícia não encontrada.</p>
      <Link to="/noticias" className="mt-4 inline-flex kicker hover:text-gold">
        Ver todas as notícias →
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="shell-narrow py-block text-center" role="alert">
      <p className="font-display text-lg text-gold">Notícia indisponível agora</p>
      <p className="measure mx-auto mt-3 text-sm leading-relaxed text-muted-foreground">
        Não conseguimos abrir esta notícia neste momento. Tente de novo em instantes.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="btn-base btn-gold px-5 py-2.5 label-btn"
        >
          Tentar de novo
        </button>
        <Link to="/noticias" className="btn-base btn-outline-gold px-5 py-2.5 label-btn">
          Ver todas
        </Link>
      </div>
    </div>
  ),
  component: NoticiaPage,
});

function NoticiaPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(noticiaQuery(slug));
  if (!data) return null;

  const data_pub = new Date(data.publicado_em).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });

  return (
    <article className="shell-narrow py-block">
      <Link to="/noticias" className="inline-flex items-center gap-2 kicker hover:text-gold transition-colors">
        <ArrowLeft className="size-3.5" aria-hidden="true" /> Notícias
      </Link>

      <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 label-btn text-gold/80 sm:mt-8">
        <span>{data.categoria}</span>
        <span aria-hidden className="size-1 rounded-full bg-gold/40" />
        <span>{data_pub}</span>
      </p>
      <h1 className="mt-3 font-display text-[length:var(--step-3)] leading-[1.14] tracking-tight text-balance text-foreground sm:text-[length:var(--step-4)] sm:leading-[1.08]">
        {data.titulo}
      </h1>
      <p className="measure mt-5 body-lead text-foreground/80">{data.resumo}</p>

      {data.imagem_url ? (
        <img
          src={data.imagem_url}
          alt={data.titulo}
          loading="lazy"
          className="art-plate mt-[var(--space-md)] aspect-16/10 w-full border border-gold/10 object-cover sm:aspect-auto"
        />
      ) : null}

      <div className="measure mt-[var(--space-md)] space-y-[var(--space-sm)] body-base font-light">
        {data.corpo
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </div>

      <footer className="mt-[var(--space-lg)] border-t border-gold/10 pt-6">
        {data.autor ? (
          <p className="kicker text-muted-foreground">Edição: {data.autor}</p>
        ) : null}
        {data.fonte_url ? (
          <a
            href={data.fonte_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-3 inline-flex min-h-11 items-center gap-2 label-btn text-gold hover:text-gold/80"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0">
              Ver na fonte original{data.fonte_nome ? ` — ${data.fonte_nome}` : ""}
            </span>
          </a>
        ) : data.fonte_nome ? (
          <p className="mt-3 kicker text-muted-foreground">Fonte: {data.fonte_nome}</p>
        ) : null}

        <Link
          to="/noticias"
          className="btn-base btn-outline-gold mt-[var(--space-sm)] w-full px-5 py-3 label-btn sm:w-auto"
        >
          Ver todas as notícias
        </Link>
      </footer>
    </article>
  );
}
