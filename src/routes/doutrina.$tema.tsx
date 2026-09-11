import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PaginaTematica } from "@/components/PaginaTematica";
import { TEMAS_DOUTRINA, temaDoutrinaPorSlug } from "@/lib/data/doutrina-temas";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/doutrina/$tema")({
  loader: ({ params }) => {
    const tema = temaDoutrinaPorSlug(params.tema);
    if (!tema) throw notFound();
    return { tema };
  },
  head: ({ params, loaderData }) => {
    const nome = loaderData?.tema.nome ?? "Doutrina";
    const descricao = loaderData?.tema.resumo ?? "";
    const url = `https://portalcatolico.vercel.app/doutrina/${params.tema}`;
    return {
      meta: [
        { title: `${nome} — Doutrina Católica | Portal Católico` },
        { name: "description", content: descricao.slice(0, 300) },
        { name: "keywords", content: keywordsPara(["catecismo", "formacao"]) },
        { property: "og:title", content: `${nome} — Doutrina Católica` },
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
      <p className="text-gold">Estudo não encontrado.</p>
      <Link to="/doutrina" className="mt-4 inline-block text-sm underline">
        ← Doutrina
      </Link>
    </div>
  ),
});

function Page() {
  const { tema } = Route.useLoaderData();
  const outros = TEMAS_DOUTRINA.filter((t) => t.slug !== tema.slug);

  return (
    <PaginaTematica
      voltar={{ to: "/doutrina", label: "Doutrina" }}
      kicker={tema.kicker}
      nome={tema.nome}
      resumo={tema.resumo}
      secoes={tema.secoes}
      paragrafosCIC={tema.paragrafosCIC}
      verbetes={tema.verbetes}
    >
      {outros.map((t) => (
        <Link
          key={t.slug}
          to="/doutrina/$tema"
          params={{ tema: t.slug }}
          className="btn-base btn-outline-gold btn-md"
        >
          {t.nome}
        </Link>
      ))}
    </PaginaTematica>
  );
}
