import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";

import { PARTES } from "@/lib/data/catecismo/index";
import {
  ARTIGOS,
  VATICAN_INDICE,
  artigoPorParagrafo,
  artigosDaParte,
  blocosDaParte,
  faixa,
  type ArtigoCIC,
} from "@/lib/data/catecismo/artigos";
import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const URL_PAGINA = "https://portalcatolico.vercel.app/catecismo/artigos";
const DESCRICAO =
  "O Catecismo da Igreja Católica artigo por artigo: faixa de parágrafos, síntese de cada artigo, pontos-chave com referência e busca por número de parágrafo.";

export const Route = createFileRoute("/catecismo/artigos")({
  head: () => ({
    meta: [
      { title: "Catecismo artigo por artigo — buscar por parágrafo — Portal Católico" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["catecismo"]) },
      { property: "og:title", content: "Catecismo artigo por artigo — Portal Católico" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL_PAGINA },
    ],
    links: [{ rel: "canonical", href: URL_PAGINA }],
  }),
  component: Page,
});

function normalizar(t: string): string {
  return t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function Page() {
  const [consulta, setConsulta] = useState("");

  const { resultado, paragrafo } = useMemo(() => {
    const bruto = consulta.trim();
    if (!bruto) return { resultado: null as ArtigoCIC[] | null, paragrafo: null as number | null };

    const numero = bruto.match(/\d{1,4}/)?.[0];
    if (numero && /^[§\s]*\d{1,4}\s*$/.test(bruto.replace(/[^\d§\s]/g, ""))) {
      const n = Number(numero);
      const achado = artigoPorParagrafo(n);
      return { resultado: achado ? [achado] : [], paragrafo: n };
    }

    const chave = normalizar(bruto);
    return {
      resultado: ARTIGOS.filter((a) =>
        normalizar(`${a.titulo} ${a.bloco} ${a.sintese} ${a.pontos.join(" ")}`).includes(chave),
      ),
      paragrafo: null,
    };
  }, [consulta]);

  return (
    <div className="shell py-block">
      <Link to="/catecismo" className="inline-flex items-center gap-2 kicker hover:text-gold mb-6">
        <ArrowLeft className="size-3" /> Catecismo
      </Link>

      <p className="kicker mb-4">Árvore completa · §§ 27-2865</p>
      <h1 className="title-page text-foreground leading-tight">Catecismo artigo por artigo</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">
        Todos os artigos do Catecismo da Igreja Católica com sua faixa de parágrafos, uma síntese
        própria fiel ao conteúdo e os pontos-chave com a referência exata. Digite um número de
        parágrafo para saber onde ele está.
      </p>

      <FaixaAutoridade
        niveis={["oficial"]}
        nota="Estrutura e numeração conforme a edição típica latina de 1997. As sínteses são redação do Portal Católico; o texto integral dos parágrafos está no site da Santa Sé."
        className="mt-6 max-w-3xl"
      />

      <label className="mt-10 block max-w-xl">
        <span className="kicker">Buscar por parágrafo ou assunto</span>
        <span className="mt-2 flex items-center gap-2 field-base">
          <Search className="size-4 shrink-0 text-gold" aria-hidden />
          <input
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Ex.: 1324, transubstanciação, purgatório"
            className="w-full bg-transparent outline-none"
            aria-label="Buscar por número de parágrafo ou assunto"
          />
        </span>
      </label>

      {resultado ? (
        <section className="mt-8">
          <p className="body-sm text-muted-foreground">
            {paragrafo
              ? resultado.length
                ? `O § ${paragrafo} está no artigo abaixo.`
                : `Nenhum artigo cobre o § ${paragrafo} — a numeração do Catecismo vai de 1 a 2865.`
              : `${resultado.length} artigo(s) para “${consulta.trim()}”.`}
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {resultado.map((a) => (
              <Artigo key={a.slug} artigo={a} />
            ))}
          </div>
        </section>
      ) : (
        <div className="mt-12 space-y-16">
          {PARTES.map((p) => {
            const parte = p.num as 1 | 2 | 3 | 4;
            return (
              <section key={p.slug} id={`parte-${parte}`} className="scroll-mt-24">
                <p className="num-secao">
                  {String(parte).padStart(2, "0")} · Parte {parte}
                </p>
                <h2 className="title-section text-foreground mt-2">{p.titulo}</h2>
                <p className="kicker mt-2">{p.paragrafos}</p>
                <Link
                  to="/catecismo/$parte"
                  params={{ parte: p.slug }}
                  className="btn-base btn-quiet btn-sm label-btn mt-4"
                >
                  Ver a estrutura desta parte
                </Link>

                {blocosDaParte(parte).map((bloco) => (
                  <div key={bloco} className="mt-8">
                    <h3 className="title-sub text-gold">{bloco}</h3>
                    <div className="mt-4 grid gap-5 lg:grid-cols-2">
                      {artigosDaParte(parte)
                        .filter((a) => a.bloco === bloco)
                        .map((a) => (
                          <Artigo key={a.slug} artigo={a} />
                        ))}
                    </div>
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      )}

      <a
        href={VATICAN_INDICE}
        target="_blank"
        rel="noopener"
        className="mt-14 btn-base btn-outline-gold gap-2 label-btn"
      >
        <ExternalLink className="size-3.5" /> Ler o texto integral em vatican.va
      </a>
    </div>
  );
}

function Artigo({ artigo }: { artigo: ArtigoCIC }) {
  return (
    <article id={artigo.slug} className="surface-card p-card scroll-mt-24">
      <p className="kicker">{faixa(artigo)}</p>
      <h4 className="title-card text-foreground mt-2 leading-snug">{artigo.titulo}</h4>
      <p className="mt-3 body-base text-muted-foreground">{artigo.sintese}</p>
      <ul className="mt-4 space-y-2">
        {artigo.pontos.map((ponto) => (
          <li key={ponto} className="body-sm text-muted-foreground border-l-2 border-gold/30 pl-3">
            {ponto}
          </li>
        ))}
      </ul>
    </article>
  );
}
