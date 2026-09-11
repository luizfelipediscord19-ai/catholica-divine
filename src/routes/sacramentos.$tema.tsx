import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PaginaTematica } from "@/components/PaginaTematica";
import type { SecaoTema } from "@/lib/data/enciclopedia-temas";
import { SACRAMENTOS, getSacramento, type Sacramento } from "@/lib/data/sacramentos";
import { TEMAS_SACRAMENTAIS, temaSacramentalPorSlug } from "@/lib/data/sacramentos-temas";
import { keywordsPara } from "@/lib/seo/palavras-chave";

type Conteudo = {
  slug: string;
  nome: string;
  kicker: string;
  resumo: string;
  secoes: SecaoTema[];
  paragrafosCIC: number[];
  verbetes: string[];
};

/** Números de parágrafo do Catecismo citados no texto (para os atalhos). */
function paragrafosCitados(texto: string): number[] {
  const achados = new Set<number>();
  for (const m of texto.matchAll(/§+\s?(\d{1,4})/g)) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 2865) achados.add(n);
  }
  return [...achados].slice(0, 6);
}

/** Converte a ficha de um sacramento em página de leitura longa com seções. */
function conteudoDoSacramento(s: Sacramento): Conteudo {
  const secoes: SecaoTema[] = [
    {
      id: "o-que-e",
      titulo: `O que é o sacramento: ${s.nome}`,
      paragrafos: [s.resumo, s.catecismo],
      referencias: [`Grupo: ${s.grupo}`],
    },
    {
      id: "fundamento-biblico",
      titulo: "Fundamento bíblico",
      paragrafos: [
        "As passagens abaixo são as que a Igreja lê como fundamento deste sacramento. Cada referência abre o capítulo correspondente na Bíblia do portal, onde os versículos aparecem em ordem e ligados ao Catecismo.",
      ],
      pontos: s.baseBiblica.map((b) => `${b.ref} — ${b.texto}`),
      referencias: s.baseBiblica.map((b) => b.ref),
    },
    {
      id: "historia-do-rito",
      titulo: "História e desenvolvimento do rito",
      paragrafos: [s.historia],
    },
    {
      id: "efeitos",
      titulo: "Efeitos da graça sacramental",
      paragrafos: [
        "Os efeitos abaixo são os que o Catecismo atribui a este sacramento. Não são resultados automáticos independentes da fé: o sacramento age pela força do rito instituído por Cristo, e frutifica na medida da disposição de quem o recebe.",
      ],
      pontos: s.efeitos,
      referencias: ["CIC §§ 1127-1134"],
    },
  ];

  if (s.faq.length) {
    secoes.push({
      id: "perguntas-frequentes",
      titulo: "Perguntas frequentes",
      paragrafos: s.faq.map((f) => `${f.q} — ${f.a}`),
    });
  }

  secoes.push({
    id: "celebracao",
    titulo: "Como se celebra",
    paragrafos: [
      "A celebração deste sacramento segue o ritual oficial próprio, com liturgia da Palavra, rito essencial e orações que explicitam seu sentido. A página de rituais reúne a estrutura comum de todos os ritos, as exigências de validade e os livros litúrgicos em vigor.",
    ],
    referencias: ["CIC §§ 1145-1162", "Sacrosanctum Concilium 59-63"],
  });

  return {
    slug: s.slug,
    nome: s.nome,
    kicker: `Sacramento ${s.numero} · ${s.grupo}`,
    resumo: s.resumo,
    secoes,
    paragrafosCIC: paragrafosCitados(s.catecismo),
    verbetes: s.slug === "eucaristia" ? ["eucaristia", "liturgia"] : ["graca", "liturgia"],
  };
}

function conteudoPorSlug(slug: string): Conteudo | undefined {
  const tema = temaSacramentalPorSlug(slug);
  if (tema) return tema;
  const sacramento = getSacramento(slug);
  return sacramento ? conteudoDoSacramento(sacramento) : undefined;
}

export const Route = createFileRoute("/sacramentos/$tema")({
  loader: ({ params }) => {
    const conteudo = conteudoPorSlug(params.tema);
    if (!conteudo) throw notFound();
    return { conteudo };
  },
  head: ({ params, loaderData }) => {
    const nome = loaderData?.conteudo.nome ?? "Sacramentos";
    const descricao = loaderData?.conteudo.resumo ?? "";
    const url = `https://portalcatolico.vercel.app/sacramentos/${params.tema}`;
    return {
      meta: [
        { title: `${nome} — Sacramentos e rituais | Portal Católico` },
        { name: "description", content: descricao.slice(0, 300) },
        { name: "keywords", content: keywordsPara(["sacramentos"]) },
        { property: "og:title", content: `${nome} — Sacramentos da Igreja Católica` },
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
      <p className="text-gold">Página não encontrada.</p>
      <Link to="/sacramentos" className="mt-4 inline-block text-sm underline">
        ← Sacramentos
      </Link>
    </div>
  ),
});

function Page() {
  const { conteudo } = Route.useLoaderData();
  const temas = TEMAS_SACRAMENTAIS.filter((t) => t.slug !== conteudo.slug);
  const sacramentos = SACRAMENTOS.filter((s) => s.slug !== conteudo.slug).slice(0, 4);

  return (
    <PaginaTematica
      voltar={{ to: "/sacramentos", label: "Os sete sacramentos" }}
      kicker={conteudo.kicker}
      nome={conteudo.nome}
      resumo={conteudo.resumo}
      secoes={conteudo.secoes}
      paragrafosCIC={conteudo.paragrafosCIC}
      verbetes={conteudo.verbetes}
      nota="Doutrina definida, disciplina canônica mutável e categoria teológica tradicional são distinguidas no texto. As referências indicam o Catecismo, os concílios e os rituais oficiais."
    >
      {temas.map((t) => (
        <Link
          key={t.slug}
          to="/sacramentos/$tema"
          params={{ tema: t.slug }}
          className="btn-base btn-outline-gold btn-md"
        >
          {t.nome}
        </Link>
      ))}
      {sacramentos.map((s) => (
        <Link
          key={s.slug}
          to="/sacramentos/$tema"
          params={{ tema: s.slug }}
          className="btn-base btn-quiet btn-md"
        >
          {s.nome}
        </Link>
      ))}
    </PaginaTematica>
  );
}
