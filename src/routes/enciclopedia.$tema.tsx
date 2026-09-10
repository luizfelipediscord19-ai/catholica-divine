import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { CitacoesLinkadas } from "@/components/CitacoesLinkadas";
import { TEMAS_ENCICLOPEDIA, temaPorSlug } from "@/lib/data/enciclopedia-temas";
import { VERBETES_ENCICLOPEDIA } from "@/lib/data/enciclopedia";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/enciclopedia/$tema")({
  loader: ({ params }) => {
    const tema = temaPorSlug(params.tema);
    if (!tema) throw notFound();
    return { tema };
  },
  head: ({ params, loaderData }) => {
    const nome = loaderData?.tema.nome ?? "Enciclopédia";
    const descricao = loaderData?.tema.resumo ?? "";
    const url = `https://portalcatolico.vercel.app/enciclopedia/${params.tema}`;
    return {
      meta: [
        { title: `${nome} — Enciclopédia Católica | Portal Católico` },
        { name: "description", content: descricao.slice(0, 300) },
        { name: "keywords", content: keywordsPara(["catecismo", "formacao", "biblia"]) },
        { property: "og:title", content: `${nome} — Enciclopédia Católica` },
        { property: "og:description", content: descricao.slice(0, 200) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="shell-narrow py-block text-center">
      <p className="text-gold">Tema não encontrado.</p>
      <Link to="/enciclopedia" className="mt-4 inline-block text-sm underline">
        ← Enciclopédia
      </Link>
    </div>
  ),
});

function Page() {
  const { tema } = Route.useLoaderData();
  const outros = TEMAS_ENCICLOPEDIA.filter((t) => t.slug !== tema.slug);

  return (
    <div className="shell py-block">
      <Link
        to="/enciclopedia"
        className="kicker mb-6 inline-flex items-center gap-2 hover:text-gold print:hidden"
      >
        <ArrowLeft className="size-3" /> Enciclopédia
      </Link>

      <p className="kicker mb-4">{tema.kicker}</p>
      <h1 className="title-page leading-tight text-foreground">{tema.nome}</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">{tema.resumo}</p>

      <FaixaAutoridade
        niveis={["oficial", "teologia"]}
        nota="Sínteses próprias do Portal Católico, fiéis ao Catecismo, aos concílios e aos documentos citados em cada seção. As referências permitem conferir a fonte."
        className="mt-6 max-w-3xl"
      />

      <div className="mt-12 space-y-12">
        {tema.secoes.map((secao, i) => (
          <section key={secao.id} id={secao.id} className="scroll-mt-28">
            <p className="num-secao">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="title-section mt-2 text-foreground">{secao.titulo}</h2>
            <div className="mt-4 space-y-4">
              {secao.paragrafos.map((p) => (
                <p key={p.slice(0, 32)} className="body-base measure text-muted-foreground">
                  <CitacoesLinkadas>{p}</CitacoesLinkadas>
                </p>
              ))}
            </div>

            {secao.pontos ? (
              <ul className="mt-6 space-y-2">
                {secao.pontos.map((ponto) => (
                  <li
                    key={ponto}
                    className="body-sm border-l-2 border-gold/30 pl-4 text-muted-foreground"
                  >
                    <CitacoesLinkadas>{ponto}</CitacoesLinkadas>
                  </li>
                ))}
              </ul>
            ) : null}

            {secao.referencias ? (
              <p className="mt-5 text-step--2 text-foreground/75">
                <span className="label-btn text-gold">Referências: </span>
                <CitacoesLinkadas>{secao.referencias.join(" · ")}</CitacoesLinkadas>
              </p>
            ) : null}
          </section>
        ))}
      </div>

      {tema.verbetes.length ? (
        <section id="verbetes-do-tema" className="mt-16 scroll-mt-28">
          <h2 className="title-section text-foreground">Verbetes ligados a este tema</h2>
          <div className="mt-5 grid gap-px border-y border-gold/15 bg-gold/15 lg:grid-cols-2">
            {tema.verbetes.map((slug) => {
              const verbete = VERBETES_ENCICLOPEDIA.find((v) => v.slug === slug);
              return verbete ? (
                <article key={slug} className="bg-background p-card">
                  <p className="kicker">{verbete.categoria}</p>
                  <h3 className="title-card mt-2 text-foreground">{verbete.termo}</h3>
                  <p className="body-sm mt-3 text-muted-foreground">{verbete.sintese}</p>
                  <Link
                    to="/enciclopedia"
                    hash={verbete.slug}
                    className="btn-base btn-quiet btn-sm label-btn mt-4 print:hidden"
                  >
                    Abrir verbete
                  </Link>
                </article>
              ) : null;
            })}
          </div>
        </section>
      ) : null}

      <section id="outros-temas" className="mt-16 scroll-mt-28 print:hidden">
        <h2 className="title-section text-foreground">Continuar o estudo</h2>
        <div className="action-tray mt-6">
          {outros.map((t) => (
            <Link
              key={t.slug}
              to="/enciclopedia/$tema"
              params={{ tema: t.slug }}
              className="btn-base btn-outline-gold btn-md"
            >
              {t.nome}
            </Link>
          ))}
          <Link to="/catecismo/artigos" className="btn-base btn-gold btn-md gap-2">
            <BookOpen className="size-4" /> Catecismo por artigos
          </Link>
          <a
            href="https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html"
            target="_blank"
            rel="noopener"
            className="btn-base btn-quiet btn-md gap-2"
          >
            Texto oficial <ExternalLink className="size-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
