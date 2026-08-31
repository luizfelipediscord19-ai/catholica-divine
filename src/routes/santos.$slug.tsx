import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Section } from "../components/PageShell";
import { SANTOS_LISTA, getSantoBasicoBySlug } from "@/lib/santos-lista";
import { buildSantoView } from "@/lib/santos-helpers";
import { Relacionados } from "@/components/Relacionados";
import { RetratoSanto } from "@/components/santos/RetratoSanto";
import { usePrefetchSanto } from "@/lib/santos/prefetch";
import { BotaoSalvar } from "@/components/portal/BotaoSalvar";
import { keywordsPara } from "@/lib/seo/palavras-chave";


const SITE = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/santos/$slug")({
  head: ({ params }) => {
    const basico = getSantoBasicoBySlug(params.slug);
    const view = buildSantoView(params.slug, basico);
    const title = `${view.nome} — Portal Católico`;
    const desc = (view.resumo ?? "Vida, virtudes e ensinamentos do santo.").slice(0, 160);
    const url = `${SITE}/santos/${params.slug}`;
    const imagem = view.imagem
      ? view.imagem.startsWith("http")
        ? view.imagem
        : `${SITE}${view.imagem}`
      : undefined;

    const pessoa: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: view.nome,
      url,
      description: desc,
      honorificPrefix: view.titulo,
      jobTitle: view.titulo,
      knowsAbout: "Fé católica",
      subjectOf: {
        "@type": "WebPage",
        url,
        name: title,
        inLanguage: "pt-BR",
      },
    };
    if (imagem) pessoa.image = imagem;
    if (view.padroeiro) pessoa.description = `${desc} Padroeiro de ${view.padroeiro}.`.slice(0, 300);

    const trilha = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE },
        { "@type": "ListItem", position: 2, name: "Santos", item: `${SITE}/santos` },
        { "@type": "ListItem", position: 3, name: view.nome, item: url },
      ],
    };

    const artigo: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: desc,
      inLanguage: "pt-BR",
      mainEntityOfPage: url,
      about: { "@type": "Person", name: view.nome },
      isPartOf: { "@type": "WebSite", name: "Portal Católico", url: SITE },
    };
    if (imagem) artigo.image = imagem;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: keywordsPara(["santos"]) },
        { property: "og:title", content: view.nome },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(imagem
          ? [
              { property: "og:image", content: imagem },
              { name: "twitter:image", content: imagem },
            ]
          : []),
      ],
      links: [
        { rel: "canonical", href: url },
        ...(imagem ? [{ rel: "preload", as: "image", href: view.imagem! }] : []),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(pessoa) },
        { type: "application/ld+json", children: JSON.stringify(artigo) },
        { type: "application/ld+json", children: JSON.stringify(trilha) },
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
        image={v.imagem}
        autoridade={["tradicao", "historia", "oficial"]}
        notaAutoridade="Datas de canonização e culto litúrgico seguem os atos da Santa Sé; episódios da vida podem pertencer à tradição hagiográfica, nem sempre documentada por fontes históricas."
      />


      <Section>
        <div className="grid md:grid-cols-[1fr_280px] gap-12">
          <article className="space-y-10">
            <div className="flex flex-wrap items-center gap-3">
              <BotaoSalvar
                tipo="santo"
                slug={slug}
                titulo={v.nome}
                descricao={v.data ? `Memória · ${v.data}` : v.titulo}
                href={`/santos/${slug}`}
              />
              <Link to="/favoritos" className="btn-base btn-outline-gold btn-sm inline-flex">
                Minha biblioteca
              </Link>
            </div>

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
            <figure className="border border-gold/20 bg-deep overflow-hidden">
              <RetratoSanto
                url={v.imagem}
                reserva={v.imagemReserva}
                nome={v.nome}
                prioridade
                sizes="(max-width: 768px) 100vw, 280px"
                className="h-72 w-full object-cover object-top"
              />
              {v.creditoImagem ? (
                <figcaption className="px-3 py-2 kicker text-muted-foreground/70">
                  Imagem: domínio público · {v.creditoImagem}
                </figcaption>
              ) : null}
            </figure>

            <div className="surface-card p-5">
              <p className="kicker mb-3">
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

            <Relacionados topic={`santo:${slug}`} variant="aside" />

            <div>
              <p className="kicker mb-3">
                Outros santos
              </p>
              <ul className="space-y-2">
                {irmaos.map((s) => (
                  <LinkSantoPrefetch key={s.slug} slug={s.slug} nome={s.nome} />
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}

/** Link para outro santo que se pré-carrega ao aparecer na tela. */
function LinkSantoPrefetch({ slug, nome }: { slug: string; nome: string }) {
  const ref = usePrefetchSanto<HTMLLIElement>(slug, "300px");
  return (
    <li ref={ref}>
      <Link
        to="/santos/$slug"
        params={{ slug }}
        preload="intent"
        className="text-foreground hover:text-gold transition-colors"
      >
        {nome}
      </Link>
    </li>
  );
}
