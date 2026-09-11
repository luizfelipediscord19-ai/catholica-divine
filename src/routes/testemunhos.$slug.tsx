import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, CalendarDays, MessageSquare } from "lucide-react";

import { PageHero, Section, Prose } from "@/components/PageShell";
import { dataTestemunho, testemunhoPorSlug } from "@/lib/data/testemunhos";

const BASE = "https://portalcatolico.vercel.app/testemunhos";

export const Route = createFileRoute("/testemunhos/$slug")({
  loader: ({ params }) => {
    const testemunho = testemunhoPorSlug(params.slug);
    if (!testemunho) throw notFound();
    return { testemunho };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.testemunho;
    if (!t) return {};
    const titulo = `${t.titulo} — Testemunho de ${t.autor} | Portal Católico`;
    const url = `${BASE}/${t.slug}`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: t.resumo },
        { property: "og:title", content: `${t.titulo} — Testemunho de fé` },
        { property: "og:description", content: t.resumo },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(t.foto?.startsWith("https://")
          ? [
              { property: "og:image", content: t.foto },
              { name: "twitter:image", content: t.foto },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TestemunhoPage,
});

function TestemunhoPage() {
  const { testemunho: t } = Route.useLoaderData();

  return (
    <div>
      <PageHero
        eyebrow="Testemunho"
        title={t.titulo}
        intro={t.resumo}
        image={t.foto?.startsWith("https://") ? undefined : t.foto}
      />

      <Section>
        <div className="mb-md flex flex-wrap items-center gap-x-6 gap-y-2 body-meta">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
            {dataTestemunho(t.data)}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {t.cidade}
          </span>
          <span className="text-foreground/70">{t.autor}</span>
        </div>

        {t.foto ? (
          <figure className="mb-lg overflow-hidden rounded-[var(--radius-card)] border border-gold/20">
            <img
              src={t.foto}
              alt={`Foto enviada com o testemunho de ${t.autor}`}
              loading="lazy"
              className="w-full object-cover"
            />
            {t.fotoCredito ? (
              <figcaption className="border-t border-gold/15 px-[var(--space-sm)] py-[var(--space-xs)] body-meta">
                {t.fotoCredito}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <Prose>
          {t.paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>

        <div className="mt-lg flex flex-wrap items-center gap-4">
          <Link
            to="/testemunhos"
            className="inline-flex min-h-11 items-center gap-2 label-btn text-paper/70 hover:text-gold"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Todos os testemunhos
          </Link>
          {t.forumSlug ? (
            <Link
              to="/forum/$slug"
              params={{ slug: t.forumSlug }}
              className="inline-flex min-h-11 items-center gap-2 label-btn text-paper/70 hover:text-gold"
            >
              <MessageSquare className="size-3.5" aria-hidden="true" />
              Conversar sobre este relato no fórum
            </Link>
          ) : null}
        </div>
      </Section>
    </div>
  );
}
