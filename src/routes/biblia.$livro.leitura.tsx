import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookMarked, BookOpen } from "lucide-react";

import { CatecismoDoVersiculo } from "@/components/biblia/CatecismoDoVersiculo";
import { getLivro } from "@/lib/data/biblia";
import { capituloLocal, temTextoLocal, type VersoTexto } from "@/lib/biblia/local";
import { elosDoCapitulo, faixaElo } from "@/lib/data/catecismo/indice-escritura";
import { VERSOES } from "@/lib/biblia/versoes";

type CapituloLido = { numero: number; versos: VersoTexto[] };

export const Route = createFileRoute("/biblia/$livro/leitura")({
  loader: async ({ params, context: { queryClient } }) => {
    const livro = getLivro(params.livro);
    if (!livro) throw notFound();

    // Almeida (domínio público) não traz os deuterocanônicos: nesses livros a
    // leitura contínua é servida na Vulgata Clementina.
    const versaoId = temTextoLocal("almeida", livro.slug) ? "almeida" : "vulgata";

    return queryClient.ensureQueryData({
      queryKey: ["biblia-leitura-livro", versaoId, livro.slug],
      queryFn: async () => {
        const capitulos: CapituloLido[] = [];
        for (let n = 1; n <= livro.capitulos; n++) {
          const versos = await capituloLocal(versaoId, livro.slug, n);
          if (versos && versos.length) capitulos.push({ numero: n, versos });
        }
        return { livro, versaoId, capitulos };
      },
    });
  },
  head: ({ params, loaderData }) => {
    const nome = loaderData?.livro.nome ?? "Bíblia";
    const url = `https://portalcatolico.vercel.app/biblia/${params.livro}/leitura`;
    const descricao = `Leia ${nome} inteiro, capítulo por capítulo e versículo por versículo, em uma só página: sumário de todos os capítulos, impressão em PDF colorido ou preto e branco e ligação direta aos parágrafos do Catecismo.`;
    return {
      meta: [
        { title: `${nome} — leitura completa do livro | Portal Católico` },
        { name: "description", content: descricao.slice(0, 300) },
        { property: "og:title", content: `${nome} — leitura completa` },
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
      <p className="text-gold">Livro não encontrado.</p>
      <Link to="/biblia" className="mt-4 inline-block text-sm underline">
        ← Bíblia
      </Link>
    </div>
  ),
});

function Page() {
  const dados = Route.useLoaderData();
  if (!dados) return null;
  const { livro, versaoId, capitulos } = dados;
  const versao = VERSOES.find((v) => v.id === versaoId)!;

  return (
    <div className="shell-narrow py-block">
      <Link
        to="/biblia/$livro"
        params={{ livro: livro.slug }}
        className="kicker mb-6 inline-flex items-center gap-2 hover:text-gold print:hidden"
      >
        <ArrowLeft className="size-3 shrink-0" /> <span className="truncate">{livro.nome}</span>
      </Link>

      <p className="kicker mb-4">Leitura contínua</p>
      <h1 className="title-page leading-tight text-foreground break-words">{livro.nome}</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">
        Todo o livro em uma só página, com os versículos em ordem. Use o botão “Sumário” para saltar
        entre os capítulos ou para salvar em PDF, em cores ou em preto e branco.
      </p>
      <p className="mt-4 text-step--2 text-muted-foreground">
        Versão: <span className="text-gold">{versao.nome}</span> — {versao.lingua} · {versao.fonte}
      </p>
      {versaoId === "vulgata" ? (
        <p className="mt-2 text-step--2 leading-relaxed text-muted-foreground">
          Livro deuterocanônico: reconhecido pela Igreja Católica (Concílio de Trento, 1546) e
          ausente das edições protestantes de domínio público. Por isso a leitura contínua é servida
          aqui na Vulgata Clementina.
        </p>
      ) : null}

      <div className="mt-12 space-y-14">
        {capitulos.map((cap) => {
          const elos = elosDoCapitulo(livro.slug, cap.numero);
          return (
            <section key={cap.numero} id={`capitulo-${cap.numero}`} className="scroll-mt-28">
              <h2 className="title-section text-foreground">
                Capítulo <span className="text-gold">{cap.numero}</span>
              </h2>
              <p className="mt-2 text-step--2 tracking-wider text-muted-foreground uppercase">
                {livro.abrev} {cap.numero} · {cap.versos.length} versículos
              </p>

              <div className="mt-6 space-y-4 font-display text-lg leading-[1.85] text-foreground/90 selection:bg-gold/30">
                {cap.versos.map((v) => (
                  <p key={v.v} id={`c${cap.numero}v${v.v}`} className="group relative pl-9">
                    <span className="absolute top-1 left-0 w-7 pr-3 text-right font-sans text-step--2 text-gold/50">
                      {v.v}
                    </span>
                    <span className="block">
                      {v.t}
                      <CatecismoDoVersiculo
                        livro={livro.slug}
                        capitulo={cap.numero}
                        versiculo={v.v}
                        somenteInicio
                      />
                    </span>
                  </p>
                ))}
              </div>

              {elos.length ? (
                <div className="mt-6 border-l-2 border-gold/30 pl-4">
                  <p className="kicker flex items-center gap-2">
                    <BookMarked className="size-3.5 text-gold" aria-hidden="true" /> Este capítulo
                    no Catecismo
                  </p>
                  <ul className="mt-3 space-y-2">
                    {elos.map((elo) => (
                      <li key={`${elo.de}-${elo.tema}`} className="body-sm text-muted-foreground">
                        <span className="text-gold">v. {faixaElo(elo)}</span> — {elo.tema}
                        <span className="mt-2 flex flex-wrap gap-2 print:hidden">
                          {elo.paragrafos.map((p) => (
                            <Link
                              key={p}
                              to="/catecismo/artigos"
                              search={{ p }}
                              className="chip chip-gold hover:text-paper"
                            >
                              § {p}
                            </Link>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Link
                to="/biblia/$livro/$capitulo"
                params={{ livro: livro.slug, capitulo: String(cap.numero) }}
                className="btn-base btn-quiet btn-sm label-btn mt-6 print:hidden"
              >
                Abrir capítulo com notas e versões
              </Link>
            </section>
          );
        })}
      </div>

      {capitulos.length === 0 ? (
        <p className="mt-10 body-sm text-muted-foreground">
          Ainda não hospedamos uma edição de domínio público deste livro para leitura contínua. Abra
          os capítulos avulsos para ler nas outras versões disponíveis.
        </p>
      ) : null}

      <div className="action-tray mt-16 print:hidden" data-sem-sumario>
        <Link
          to="/biblia/$livro"
          params={{ livro: livro.slug }}
          className="btn-base btn-outline-gold btn-md"
        >
          Índice de {livro.nome}
        </Link>
        <Link to="/catecismo/artigos" className="btn-base btn-gold btn-md gap-2">
          <BookOpen className="size-4 shrink-0" /> Catecismo por artigos
        </Link>
        <Link to="/biblia" className="btn-base btn-quiet btn-md">
          Todos os 73 livros
        </Link>
      </div>
    </div>
  );
}
