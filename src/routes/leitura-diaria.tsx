import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, BookOpen, CalendarDays } from "lucide-react";

import { CatecismoDoVersiculo } from "@/components/biblia/CatecismoDoVersiculo";
import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { getLivro } from "@/lib/data/biblia";
import { capituloLocal, temTextoLocal, type VersoTexto } from "@/lib/biblia/local";
import { dayOfYear, leituraDoDia } from "@/lib/data/biblia/leituras";
import { elosDoCapitulo, faixaElo } from "@/lib/data/catecismo/indice-escritura";
import { artigoPorParagrafo, faixa } from "@/lib/data/catecismo/artigos";
import { TEMAS_ENCICLOPEDIA } from "@/lib/data/enciclopedia-temas";
import { ORACOES } from "@/lib/data/oracoes";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const URL = "https://portalcatolico.vercel.app/leitura-diaria";
const DESCRICAO =
  "Leitura diária completa: a passagem bíblica do dia versículo por versículo, os parágrafos do Catecismo que a comentam, um tema da Enciclopédia Católica e a oração do dia — com sumário e impressão em PDF.";

export const Route = createFileRoute("/leitura-diaria")({
  head: () => ({
    meta: [
      { title: "Leitura Diária — Escritura, Catecismo e Enciclopédia" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["biblia", "catecismo", "liturgia"]) },
      { property: "og:title", content: "Leitura Diária Católica" },
      { property: "og:description", content: DESCRICAO.slice(0, 200) },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  loader: async ({ context: { queryClient } }) => {
    const leitura = leituraDoDia();
    const dia = dayOfYear();
    return queryClient.ensureQueryData({
      queryKey: ["leitura-diaria", dia],
      queryFn: async () => {
        const livro = getLivro(leitura.livro);
        const versaoId =
          livro && temTextoLocal("almeida", livro.slug) ? "almeida" : "vulgata";
        let versos: VersoTexto[] = [];
        if (livro) {
          const todos = await capituloLocal(versaoId, livro.slug, leitura.capitulo);
          versos = (todos ?? []).filter(
            (v) => (!leitura.vi || v.v >= leitura.vi) && (!leitura.vf || v.v <= leitura.vf),
          );
        }
        return { dia, leitura, versos, versaoId };
      },
    });
  },
  component: Page,
});

function refTexto(l: { nome: string; capitulo: number; vi?: number; vf?: number }) {
  if (l.vi && l.vf && l.vi !== l.vf) return `${l.nome} ${l.capitulo}:${l.vi}-${l.vf}`;
  if (l.vi) return `${l.nome} ${l.capitulo}:${l.vi}`;
  return `${l.nome} ${l.capitulo}`;
}

function Page() {
  const dados = Route.useLoaderData();
  if (!dados) return null;
  const { dia, leitura, versos } = dados;

  const elos = elosDoCapitulo(leitura.livro, leitura.capitulo).filter(
    (e) => (!leitura.vi || e.ate >= leitura.vi) && (!leitura.vf || e.de <= leitura.vf),
  );
  const paragrafos = [...new Set(elos.flatMap((e) => e.paragrafos))].sort((a, b) => a - b);
  const artigos = [
    ...new Map(
      paragrafos
        .map((p) => artigoPorParagrafo(p))
        .filter((a): a is NonNullable<typeof a> => !!a)
        .map((a) => [a.slug, a]),
    ).values(),
  ];

  const tema = TEMAS_ENCICLOPEDIA[(dia - 1 + TEMAS_ENCICLOPEDIA.length * 1000) % TEMAS_ENCICLOPEDIA.length];
  const oracao = ORACOES[(dia - 1 + ORACOES.length * 1000) % ORACOES.length];
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="shell-narrow py-block">
      <p className="kicker mb-4 inline-flex items-center gap-2">
        <CalendarDays className="size-3 shrink-0" /> {hoje}
      </p>
      <h1 className="title-page leading-tight text-foreground">Leitura Diária</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">
        Um roteiro completo para hoje: a passagem da Escritura, os parágrafos do Catecismo que a
        comentam, um tema da Enciclopédia e a oração do dia. Use o botão “Sumário” para navegar ou
        para salvar em PDF, em cores ou em preto e branco.
      </p>

      <FaixaAutoridade
        niveis={["oficial", "devocao"]}
        nota="Seleção devocional do portal para leitura contínua — não são as leituras da Missa. Para o Lecionário do dia, veja a Liturgia Diária. O texto bíblico é edição de domínio público hospedada no portal."
        className="mt-6 max-w-3xl"
      />

      {/* 01 — Escritura */}
      <section id="escritura-do-dia" className="mt-14 scroll-mt-28">
        <p className="num-secao">01</p>
        <h2 className="title-section mt-2 text-foreground">
          A Escritura de hoje — {leitura.tema}
        </h2>
        <p className="mt-2 text-step--2 tracking-wider text-gold uppercase">
          {refTexto(leitura)}
        </p>

        {versos.length ? (
          <div className="mt-6 space-y-4 font-display text-lg leading-[1.85] text-foreground/90">
            {versos.map((v) => (
              <p key={v.v} className="relative pl-9">
                <span className="absolute top-1 left-0 w-7 pr-3 text-right font-sans text-step--2 text-gold/50">
                  {v.v}
                </span>
                <span className="block">
                  {v.t}
                  <CatecismoDoVersiculo
                    livro={leitura.livro}
                    capitulo={leitura.capitulo}
                    versiculo={v.v}
                  />
                </span>
              </p>
            ))}
          </div>
        ) : (
          <p className="body-sm mt-6 text-muted-foreground">
            Abra o capítulo para ler esta passagem nas versões disponíveis.
          </p>
        )}

        <div className="action-tray mt-6 print:hidden" data-sem-sumario>
          <Link
            to="/biblia/$livro/$capitulo"
            params={{ livro: leitura.livro, capitulo: String(leitura.capitulo) }}
            className="btn-base btn-outline-gold btn-sm label-btn"
          >
            Abrir o capítulo inteiro
          </Link>
          <Link
            to="/biblia/$livro/leitura"
            params={{ livro: leitura.livro }}
            className="btn-base btn-quiet btn-sm label-btn"
          >
            Ler {leitura.nome} inteiro
          </Link>
        </div>
      </section>

      {/* 02 — Catecismo */}
      <section id="catecismo-do-dia" className="mt-16 scroll-mt-28">
        <p className="num-secao">02</p>
        <h2 className="title-section mt-2 text-foreground">O Catecismo sobre esta passagem</h2>

        {elos.length ? (
          <>
            <ul className="mt-5 space-y-3">
              {elos.map((elo) => (
                <li
                  key={`${elo.de}-${elo.tema}`}
                  className="body-sm border-l-2 border-gold/30 pl-4 text-muted-foreground"
                >
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

            {artigos.length ? (
              <div className="mt-8 grid gap-px border-y border-gold/15 bg-gold/15">
                {artigos.map((a) => (
                  <article key={a.slug} className="bg-background p-card">
                    <p className="kicker flex items-center gap-2">
                      <BookMarked className="size-3.5 text-gold" aria-hidden="true" /> {faixa(a)}
                    </p>
                    <h3 className="title-card mt-2 text-foreground">{a.titulo}</h3>
                    <p className="body-sm mt-3 text-muted-foreground">{a.sintese}</p>
                    <Link
                      to="/catecismo/artigos"
                      search={{ p: a.de }}
                      className="btn-base btn-quiet btn-sm label-btn mt-4 print:hidden"
                    >
                      Abrir no Catecismo
                    </Link>
                  </article>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="body-sm mt-5 text-muted-foreground">
            Esta passagem ainda não consta do nosso índice de citações do Catecismo. Percorra a
            doutrina pelos artigos do Catecismo para encontrar o tema correspondente.
          </p>
        )}
      </section>

      {/* 03 — Enciclopédia */}
      <section id="tema-da-enciclopedia" className="mt-16 scroll-mt-28">
        <p className="num-secao">03</p>
        <h2 className="title-section mt-2 text-foreground">
          Tema de estudo — {tema.nome}
        </h2>
        <p className="mt-2 text-step--2 tracking-wider text-gold uppercase">{tema.kicker}</p>
        <p className="body-base measure mt-4 text-muted-foreground">{tema.resumo}</p>
        <ul className="mt-5 space-y-2">
          {tema.secoes.slice(0, 4).map((s) => (
            <li key={s.id} className="body-sm border-l-2 border-gold/30 pl-4 text-muted-foreground">
              {s.titulo}
            </li>
          ))}
        </ul>
        <Link
          to="/enciclopedia/$tema"
          params={{ tema: tema.slug }}
          className="btn-base btn-outline-gold btn-sm label-btn mt-6 print:hidden"
        >
          Estudar {tema.nome}
        </Link>
      </section>

      {/* 04 — Oração */}
      <section id="oracao-do-dia" className="mt-16 scroll-mt-28">
        <p className="num-secao">04</p>
        <h2 className="title-section mt-2 text-foreground">Oração de hoje — {oracao.titulo}</h2>
        {oracao.latim ? (
          <p className="mt-2 text-step--2 tracking-wider text-gold uppercase">{oracao.latim}</p>
        ) : null}
        <div className="mt-5 border-l-2 border-gold/30 pl-5 font-display text-lg leading-[1.9] whitespace-pre-line text-foreground/90">
          {oracao.texto}
        </div>
        {oracao.nota ? (
          <p className="body-sm mt-4 text-muted-foreground">{oracao.nota}</p>
        ) : null}
        <Link
          to="/oracoes/diarias"
          className="btn-base btn-quiet btn-sm label-btn mt-6 print:hidden"
        >
          Orações diárias — uma por dia
        </Link>
      </section>

      <section id="continuar" className="mt-16 scroll-mt-28 print:hidden" data-sem-sumario>
        <h2 className="title-section text-foreground">Continuar</h2>
        <div className="action-tray mt-6">
          <Link to="/liturgia-diaria" className="btn-base btn-gold btn-md gap-2">
            <BookOpen className="size-4 shrink-0" /> Liturgia do dia
          </Link>
          <Link to="/biblia/leituras" className="btn-base btn-outline-gold btn-md">
            Plano de leituras
          </Link>
          <Link to="/doutrina" className="btn-base btn-quiet btn-md">
            Estudos de doutrina
          </Link>
        </div>
      </section>
    </div>
  );
}
