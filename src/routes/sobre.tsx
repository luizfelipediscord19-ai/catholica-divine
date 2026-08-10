import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ScrollText, ShieldCheck, BookMarked, Users } from "lucide-react";

const BASE = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o Portal — Curadoria, Critérios Teológicos e Fontes" },
      {
        name: "description",
        content:
          "Como o Portal Católico é feito: critérios teológicos de aprovação, hierarquia de fontes (Escritura, Magistério, Padres, Doutores), processo de revisão, política de traduções e canais de correção.",
      },
      { property: "og:title", content: "Sobre o Portal Católico — Governança Editorial" },
      {
        property: "og:description",
        content:
          "Critérios teológicos, hierarquia de fontes, processo de revisão e política de traduções que sustentam o conteúdo do portal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE}/sobre` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/sobre` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Sobre o Portal Católico",
          url: `${BASE}/sobre`,
          description:
            "Critérios teológicos, hierarquia de fontes e processo de revisão editorial do Portal Católico.",
          publisher: {
            "@type": "Organization",
            name: "Portal Católico",
            url: BASE,
          },
        }),
      },
    ],
  }),
  component: SobrePage,
});

const CRITERIOS = [
  {
    titulo: "Conformidade com o Magistério",
    texto:
      "Nenhuma afirmação doutrinal entra no portal sem lastro no Catecismo da Igreja Católica, em documento conciliar, encíclica, decreto da Santa Sé ou no Direito Canônico. Teses de teólogos particulares, quando citadas, são identificadas como opinião teológica e nunca apresentadas como doutrina.",
  },
  {
    titulo: "Distinção de graus de certeza",
    texto:
      "O conteúdo separa explicitamente dogma de fé, doutrina definitiva, ensinamento autêntico não definitivo, disciplina eclesiástica, devoção aprovada e piedade popular. Aparições privadas são sempre marcadas com o status canônico da aprovação diocesana ou da Santa Sé.",
  },
  {
    titulo: "Rastreabilidade das fontes",
    texto:
      "Cada verbete doutrinal, resposta apologética e ficha de santo aponta referência verificável: parágrafo do Catecismo, número de Denzinger, sigla do documento, capítulo da Suma ou passagem bíblica com capítulo e versículo.",
  },
  {
    titulo: "Respeito ao direito autoral",
    texto:
      "O portal só hospeda textos em domínio público. Traduções bíblicas protegidas (como a Ave-Maria e a Nova Vulgata) não são reproduzidas; nesses casos indicamos a edição e remetemos à fonte oficial. O texto integral do Catecismo permanece linkado ao vatican.va.",
  },
  {
    titulo: "Caridade e clareza pastoral",
    texto:
      "A apologética responde à objeção, não à pessoa. Temas morais são expostos com a doutrina íntegra e com o cuidado pastoral que a Igreja recomenda, sem ambiguidade e sem dureza.",
  },
  {
    titulo: "Correção pública de erros",
    texto:
      "Erro apontado e verificado é corrigido na própria página, e não silenciosamente descartado. Correções materialmente relevantes são registradas com data.",
  },
];

const HIERARQUIA = [
  {
    nivel: "1",
    fonte: "Sagrada Escritura",
    detalhe:
      "Cânon católico de 73 livros. Texto hospedado em edições de domínio público (português, Vulgata Clementina, Douay-Rheims), com capítulo e versículo sempre citados.",
  },
  {
    nivel: "2",
    fonte: "Magistério solene e ordinário",
    detalhe:
      "Concílios ecumênicos, definições dogmáticas, Catecismo da Igreja Católica (1992/1997), encíclicas, exortações, decretos e instruções dos dicastérios romanos.",
  },
  {
    nivel: "3",
    fonte: "Padres e Doutores da Igreja",
    detalhe:
      "Testemunho patrístico e as obras dos 37 Doutores, usados para mostrar a continuidade da fé — nunca como substitutos do Magistério.",
  },
  {
    nivel: "4",
    fonte: "Liturgia e Direito Canônico",
    detalhe:
      "Missal Romano, Liturgia das Horas, Martirológio Romano e o Código de Direito Canônico de 1983 para calendário, rubricas e disciplina.",
  },
  {
    nivel: "5",
    fonte: "Hagiografia e devoção aprovada",
    detalhe:
      "Vidas de santos apoiadas em causas de canonização, Martirológio e biografias reconhecidas; devoções com aprovação eclesiástica explícita.",
  },
];

const REVISAO = [
  {
    etapa: "Levantamento",
    texto:
      "Cada tema começa pela fonte primária: o documento magisterial ou o texto bíblico, não por resumos de terceiros.",
  },
  {
    etapa: "Redação com referência obrigatória",
    texto:
      "Nenhum parágrafo doutrinal é publicado sem a referência que o sustenta; sem fonte verificável, o trecho não é escrito.",
  },
  {
    etapa: "Conferência doutrinal",
    texto:
      "Releitura confrontando o texto redigido com o Catecismo e o documento citado, verificando se o grau de certeza declarado corresponde ao da fonte.",
  },
  {
    etapa: "Revisão de linguagem",
    texto:
      "Ajuste de clareza, precisão terminológica (com apoio do glossário) e legibilidade, preservando o vocabulário técnico próprio da teologia.",
  },
  {
    etapa: "Publicação e vigilância",
    texto:
      "Após a publicação, apontamentos de leitores e de sacerdotes são recebidos, verificados contra as fontes e aplicados quando procedentes.",
  },
];

export function Card({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <article className="surface-card p-6">
      <h3 className="font-display text-xl text-foreground mb-3 leading-snug">{titulo}</h3>
      <p className="text-sm leading-[1.75] text-muted-foreground">{children}</p>
    </article>
  );
}

function SobrePage() {
  return (
    <div className="shell py-block">
      <Link
        to="/"
        className="inline-flex items-center gap-2 kicker hover:text-gold mb-10 transition-colors"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" /> Voltar
      </Link>

      <header className="mb-16">
        <p className="kicker mb-5 flex items-center gap-3">
          <ScrollText className="size-4" aria-hidden="true" /> Ratio Editionis
        </p>
        <h1 className="title-page text-foreground leading-[1.05] mb-6">
          Sobre o Portal <span className="text-gold/70 italic">e sua curadoria</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground font-light leading-[1.8] max-w-3xl">
          O Portal Católico é um acervo de formação e estudo: Bíblia completa, Catecismo,
          santos, orações, liturgia e apologética. Esta página descreve abertamente como o
          conteúdo é escolhido, escrito, conferido e corrigido — para que qualquer leitor,
          leigo, seminarista, pesquisador ou pastor, possa auditar o que lê aqui.
        </p>
      </header>

      <section aria-labelledby="criterios" className="mb-20">
        <h2
          id="criterios"
          className="font-display text-2xl md:text-3xl text-foreground mb-3 flex items-center gap-3"
        >
          <ShieldCheck className="size-5 text-gold" aria-hidden="true" /> Critérios teológicos de
          aprovação
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-[1.75]">
          Seis crivos aplicados a todo texto antes da publicação.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {CRITERIOS.map((c) => (
            <Card key={c.titulo} titulo={c.titulo}>
              {c.texto}
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="fontes" className="mb-20">
        <h2
          id="fontes"
          className="font-display text-2xl md:text-3xl text-foreground mb-3 flex items-center gap-3"
        >
          <BookMarked className="size-5 text-gold" aria-hidden="true" /> Hierarquia das fontes
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-[1.75]">
          Quando há tensão aparente entre fontes, prevalece sempre a de grau superior nesta ordem.
        </p>
        <ol className="space-y-4">
          {HIERARQUIA.map((h) => (
            <li
              key={h.nivel}
              className="flex gap-5 surface-card p-6"
            >
              <span
                aria-hidden="true"
                className="font-display text-2xl text-gold/70 leading-none pt-1"
              >
                {h.nivel}
              </span>
              <div>
                <h3 className="font-display text-lg text-foreground mb-2">{h.fonte}</h3>
                <p className="text-sm leading-[1.75] text-muted-foreground">{h.detalhe}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="revisao" className="mb-20">
        <h2
          id="revisao"
          className="font-display text-2xl md:text-3xl text-foreground mb-3 flex items-center gap-3"
        >
          <Users className="size-5 text-gold" aria-hidden="true" /> Processo de revisão
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-[1.75]">
          O portal é mantido por uma equipe editorial leiga, sem pretensão de autoridade
          magisterial. Onde a Igreja já falou, reproduzimos e referenciamos; não inovamos em
          doutrina.
        </p>
        <ol className="space-y-4">
          {REVISAO.map((r, i) => (
            <li key={r.etapa} className="surface-card p-6">
              <p className="kicker mb-2">
                Etapa {i + 1}
              </p>
              <h3 className="font-display text-lg text-foreground mb-2">{r.etapa}</h3>
              <p className="text-sm leading-[1.75] text-muted-foreground">{r.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="ia" className="mb-20">
        <h2 id="ia" className="font-display text-2xl md:text-3xl text-foreground mb-4">
          Uso de inteligência artificial
        </h2>
        <div className="space-y-4 text-sm leading-[1.8] text-muted-foreground max-w-3xl">
          <p>
            A assistente <strong className="text-foreground">Sophia</strong> é uma ferramenta de
            apoio ao estudo, orientada por instruções que a obrigam a permanecer dentro da
            doutrina católica, a citar Catecismo e Escritura e a recusar aconselhamento que
            pertença ao foro do sacerdote.
          </p>
          <p>
            Suas respostas <strong className="text-foreground">não são conteúdo revisado</strong>{" "}
            do portal e não substituem confissão, direção espiritual, orientação do pároco nem
            atendimento profissional em situações de risco. O conteúdo editorial das páginas —
            verbetes, fichas, introduções bíblicas e respostas apologéticas — é redigido e
            conferido contra as fontes pela equipe editorial.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="correcoes"
        className="rounded-md border border-gold/25 bg-gold/[0.04] p-7"
      >
        <h2 id="correcoes" className="font-display text-2xl text-foreground mb-4">
          Encontrou um erro doutrinal ou factual?
        </h2>
        <p className="text-sm leading-[1.8] text-muted-foreground mb-5 max-w-3xl">
          Correções são bem-vindas e tratadas com prioridade, especialmente quando vindas de
          sacerdotes, religiosos e professores de teologia. Abra um tópico no fórum indicando a
          página, o trecho e a fonte que o corrige — quanto mais precisa a referência, mais rápida
          a correção.
        </p>
        <Link
          to="/forum"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-6 text-xs uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Apontar correção no fórum
        </Link>
      </section>
    </div>
  );
}
