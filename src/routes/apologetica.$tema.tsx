import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PaginaTematica } from "@/components/PaginaTematica";
import { TEMAS_APOLOGETICA, temaApologeticaPorSlug } from "@/lib/data/apologetica-temas";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/apologetica/$tema")({
  loader: ({ params }) => {
    const tema = temaApologeticaPorSlug(params.tema);
    if (!tema) throw notFound();
    return { tema };
  },
  head: ({ params, loaderData }) => {
    const nome = loaderData?.tema.nome ?? "Apologética";
    const descricao = loaderData?.tema.resumo ?? "";
    const url = `https://portalcatolico.vercel.app/apologetica/${params.tema}`;
    return {
      meta: [
        { title: `${nome} — Razões para Crer | Portal Católico` },
        { name: "description", content: descricao.slice(0, 300) },
        { name: "keywords", content: keywordsPara(["apologetica"]) },
        { property: "og:title", content: `${nome} — Razões para Crer` },
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
      <Link to="/apologetica" className="mt-4 inline-block text-sm underline">
        ← Razões para crer
      </Link>
    </div>
  ),
});

function Page() {
  const { tema } = Route.useLoaderData();
  const outros = TEMAS_APOLOGETICA.filter((t) => t.slug !== tema.slug);

  return (
    <PaginaTematica
      voltar={{ to: "/apologetica", label: "Razões para crer" }}
      kicker={tema.kicker}
      nome={tema.nome}
      resumo={tema.resumo}
      secoes={tema.secoes}
      paragrafosCIC={tema.paragrafosCIC}
      verbetes={tema.verbetes}
      nota="Argumentos de razão, dados históricos e doutrina definida são distinguidos no próprio texto. Cada seção indica onde conferir a fonte."
    >
      {outros.map((t) => (
        <Link
          key={t.slug}
          to="/apologetica/$tema"
          params={{ tema: t.slug }}
          className="btn-base btn-outline-gold btn-md"
        >
          {t.nome}
        </Link>
      ))}
    </PaginaTematica>
  );
}
