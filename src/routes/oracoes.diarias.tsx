import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CalendarDays } from "lucide-react";

import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { dayOfYear } from "@/lib/data/biblia/leituras";
import { ORACOES, type Oracao } from "@/lib/data/oracoes";
import { VERBETES_ENCICLOPEDIA } from "@/lib/data/enciclopedia";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const URL = "https://portalcatolico.vercel.app/oracoes/diarias";
const DESCRICAO =
  "Uma oração católica para cada dia do ano: texto integral, finalidade, momento indicado e ligação com o Catecismo e a Enciclopédia Católica. Com sumário e impressão em PDF.";

/** Parágrafos do Catecismo sobre a oração, por categoria de oração. */
const CIC_POR_CATEGORIA: Record<string, number[]> = {
  Fundamentais: [2759, 2803, 2857],
  Marianas: [2673, 2676, 2677],
  "Ao Espírito Santo": [2670, 2671],
  Eucarísticas: [1324, 1418],
  Penitenciais: [1451, 1452],
  Proteção: [2626, 2629],
  Diárias: [2659, 2698],
  "Aos Santos": [2683, 2684],
  Litanias: [2678, 2692],
  Ocasiões: [2626, 2644],
  Defuntos: [1032, 958],
};

export const Route = createFileRoute("/oracoes/diarias")({
  head: () => ({
    meta: [
      { title: "Orações Diárias — Uma Oração por Dia | Portal Católico" },
      { name: "description", content: DESCRICAO },
      { name: "keywords", content: keywordsPara(["oracoes", "catecismo"]) },
      { property: "og:title", content: "Orações Diárias Católicas" },
      { property: "og:description", content: DESCRICAO.slice(0, 200) },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Page,
});

function oracaoDoDia(d: Date = new Date()): Oracao {
  return ORACOES[(dayOfYear(d) - 1 + ORACOES.length * 1000) % ORACOES.length];
}

function fmt(d: Date) {
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
}

function Page() {
  const hoje = new Date();
  const oracao = oracaoDoDia(hoje);
  const cic = CIC_POR_CATEGORIA[oracao.categoria] ?? [2559, 2565];

  const proximos = Array.from({ length: 7 }, (_, i) => {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i + 1);
    return { data, oracao: oracaoDoDia(data) };
  });

  const verbetes = VERBETES_ENCICLOPEDIA.filter((v) =>
    ["oracao-crista", "liturgia", "graca", "comunhao-dos-santos"].includes(v.slug),
  );

  return (
    <div className="shell-narrow py-block">
      <Link
        to="/oracoes"
        className="kicker mb-6 inline-flex items-center gap-2 hover:text-gold print:hidden"
      >
        <ArrowLeft className="size-3 shrink-0" /> Orações
      </Link>

      <p className="kicker mb-4 inline-flex items-center gap-2">
        <CalendarDays className="size-3 shrink-0" />{" "}
        {hoje.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
      </p>
      <h1 className="title-page leading-tight text-foreground">Orações Diárias</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">
        Uma oração da tradição da Igreja para cada dia, com o texto integral, a finalidade e o
        momento indicado. Use o botão “Sumário” para navegar ou para imprimir em PDF, em cores ou em
        preto e branco.
      </p>

      <FaixaAutoridade
        niveis={["oficial", "devocao"]}
        nota="Orações tradicionais em uso corrente no Brasil, com o incipit latino quando clássico. A sequência diária é seleção editorial do portal; as referências ao Catecismo indicam a doutrina sobre cada forma de oração."
        className="mt-6 max-w-3xl"
      />

      <section id="oracao-de-hoje" className="mt-14 scroll-mt-28">
        <p className="num-secao">01</p>
        <h2 className="title-section mt-2 text-foreground">Oração de hoje — {oracao.titulo}</h2>
        <p className="mt-2 text-step--2 tracking-wider text-gold uppercase">
          {oracao.categoria}
          {oracao.latim ? ` · ${oracao.latim}` : ""}
        </p>
        <div className="mt-5 border-l-2 border-gold/30 pl-5 font-display text-lg leading-[1.9] whitespace-pre-line text-foreground/90">
          {oracao.texto}
        </div>
        <dl className="mt-6 space-y-3">
          {oracao.paraQue ? (
            <div>
              <dt className="kicker">Para que serve</dt>
              <dd className="body-sm mt-1 text-muted-foreground">{oracao.paraQue}</dd>
            </div>
          ) : null}
          {oracao.quando ? (
            <div>
              <dt className="kicker">Quando rezar</dt>
              <dd className="body-sm mt-1 text-muted-foreground">{oracao.quando}</dd>
            </div>
          ) : null}
          {oracao.nota ? (
            <div>
              <dt className="kicker">Origem</dt>
              <dd className="body-sm mt-1 text-muted-foreground">{oracao.nota}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section id="no-catecismo" className="mt-16 scroll-mt-28">
        <p className="num-secao">02</p>
        <h2 className="title-section mt-2 text-foreground">Esta oração no Catecismo</h2>
        <p className="body-base measure mt-4 text-muted-foreground">
          A quarta parte do Catecismo trata inteiramente da oração cristã: o que é orar, as formas
          de oração da Tradição, as dificuldades e o Pai-Nosso comentado petição por petição. Os
          parágrafos abaixo tratam da forma de oração a que a oração de hoje pertence.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 print:hidden">
          {cic.map((p) => (
            <Link
              key={p}
              to="/catecismo/artigos"
              search={{ p }}
              className="chip chip-gold hover:text-paper"
            >
              § {p}
            </Link>
          ))}
        </div>
        <p className="mt-5 text-step--2 text-foreground/75">
          <span className="label-btn text-gold">Referências: </span>
          CIC §§ 2558-2865 · Catecismo, Parte IV · Mateus 6,5-15
        </p>
      </section>

      <section id="na-enciclopedia" className="mt-16 scroll-mt-28">
        <p className="num-secao">03</p>
        <h2 className="title-section mt-2 text-foreground">Na Enciclopédia Católica</h2>
        <div className="mt-5 grid gap-px border-y border-gold/15 bg-gold/15 lg:grid-cols-2">
          {verbetes.map((v) => (
            <article key={v.slug} className="bg-background p-card">
              <p className="kicker">{v.categoria}</p>
              <h3 className="title-card mt-2 text-foreground">{v.termo}</h3>
              <p className="body-sm mt-3 text-muted-foreground">{v.sintese}</p>
              <Link
                to="/enciclopedia"
                hash={v.slug}
                className="btn-base btn-quiet btn-sm label-btn mt-4 print:hidden"
              >
                Abrir verbete
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="proximos-dias" className="mt-16 scroll-mt-28">
        <p className="num-secao">04</p>
        <h2 className="title-section mt-2 text-foreground">Próximos sete dias</h2>
        <div className="mt-5 divide-y divide-gold/15 border border-gold/20">
          {proximos.map(({ data, oracao: o }) => (
            <div
              key={data.toISOString()}
              className="flex flex-col gap-1 p-4 md:flex-row md:items-baseline md:gap-4"
            >
              <div className="kicker md:w-56">{fmt(data)}</div>
              <div className="flex-1">
                <p className="font-display text-lg text-foreground">{o.titulo}</p>
                <p className="text-step--2 text-muted-foreground">{o.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="continuar" className="mt-16 scroll-mt-28 print:hidden" data-sem-sumario>
        <h2 className="title-section text-foreground">Continuar</h2>
        <div className="action-tray mt-6">
          <Link to="/oracoes" className="btn-base btn-gold btn-md gap-2">
            <BookOpen className="size-4 shrink-0" /> Todas as orações
          </Link>
          <Link to="/leitura-diaria" className="btn-base btn-outline-gold btn-md">
            Leitura diária
          </Link>
          <Link to="/catecismo/artigos" className="btn-base btn-quiet btn-md">
            Catecismo por artigos
          </Link>
        </div>
      </section>
    </div>
  );
}
