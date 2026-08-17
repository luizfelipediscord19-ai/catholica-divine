import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Prose, Pullquote, CardGrid, ContentCard } from "../components/PageShell";
import { ReadingMode, FnRef } from "../components/ReadingMode";
import { HORAS, FONTES_OFICIAIS } from "../lib/data/devocoes/horas";
import { BuscaHoras } from "../components/BuscaHoras";
import biblioteca from "@/assets/biblioteca.jpg";

export const Route = createFileRoute("/oracoes/liturgia-das-horas")({
  head: () => ({
    meta: [
      { title: "Liturgia das Horas — Officium Divinum | Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/liturgia-das-horas" },
      {
        name: "description",
        content:
          "A oração pública e oficial da Igreja: Ofício das Leituras, Laudes, Hora Intermédia, Vésperas e Completas. Estrutura, espiritualidade e fontes magisteriais (SC, Laudis Canticum, IGLH).",
      },
      { property: "og:title", content: "Liturgia das Horas — Officium Divinum" },
      {
        property: "og:description",
        content:
          "Estrutura completa do Ofício Divino com fontes oficiais e modo de leitura otimizado para impressão.",
      },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/liturgia-das-horas" }],
  }),
  component: Page,
});

const TOC = [
  { id: "introducao", label: "Introdução" },
  { id: "natureza", label: "I. Natureza e dignidade" },
  { id: "horas", label: "II. As Horas Canônicas" },
  { id: "oficio-leituras", label: "III. Ofício de Leituras" },
  { id: "laudes", label: "IV. Laudes" },
  { id: "vesperas", label: "V. Vésperas" },
  { id: "saltério", label: "VI. O Saltério" },
  { id: "como-rezar", label: "VII. Como rezar" },
  { id: "buscador", label: "VIII. Buscar salmos e leituras" },
  { id: "fontes", label: "Fontes oficiais" },
  { id: "notas", label: "Notas e referências" },
];

const FOOTNOTES = [
  { id: "sc", label: "Concílio Vaticano II, Constituição Sacrosanctum Concilium (04.12.1963)", ref: "cap. IV — “O Ofício Divino”, nn. 83–101" },
  { id: "lc", label: "Paulo VI, Constituição Apostólica Laudis Canticum (01.11.1970)", ref: "promulgação do novo Ofício Divino segundo o Vaticano II" },
  { id: "iglh", label: "Instrução Geral sobre a Liturgia das Horas (IGLH)", ref: "Sagrada Congregação para o Culto Divino, 02.02.1971" },
  { id: "cic-loh", label: "Catecismo da Igreja Católica", ref: "§§ 1174–1178 — A Liturgia das Horas" },
  { id: "cdc-276", label: "Código de Direito Canônico (1983), cân. 276 §2, 3.º", ref: "obrigação dos clérigos de rezar diariamente o Ofício Divino" },
  { id: "cdc-1174", label: "Código de Direito Canônico (1983), cân. 1173–1175", ref: "natureza e estrutura da Liturgia das Horas" },
  { id: "ben", label: "Regra de São Bento (séc. VI), caps. 8–20", ref: "“Opus Dei nihil praeponatur” — nada se anteponha à Obra de Deus" },
  { id: "verbum", label: "Bento XVI, Exortação Verbum Domini (30.09.2010)", ref: "n. 62 — Liturgia das Horas como escola de oração com a Palavra" },
];

type HoraSlug = "oficio-leituras" | "laudes" | "vesperas";

const DETALHES: Record<
  HoraSlug,
  {
    nome: string;
    horario: string;
    abertura: string;
    salmodia: string;
    cantico: string;
    leitura: string;
    oracao: string;
    espiritualidade: string;
  }
> = {
  "oficio-leituras": {
    nome: "Ofício de Leituras",
    horario: "Em qualquer hora do dia — tradicionalmente à noite ou de madrugada",
    abertura:
      "Pode iniciar com o Invitatório (Sl 94/95, “Vinde, exultemos no Senhor”) quando é a primeira hora do dia; do contrário, começa com Deus, vinde em meu auxílio.",
    salmodia:
      "Três salmos (ou partes longas) com suas antífonas — uma extensa imersão no Saltério ao longo das quatro semanas.",
    cantico:
      "Após a salmodia, dois versículos preparam as leituras.",
    leitura:
      "Uma leitura bíblica longa (cursus contínuo) seguida de uma segunda leitura patrística, conciliar ou hagiográfica, ambas com seu respectivo responsório.",
    oracao:
      "Aos domingos, solenidades e festas conclui-se com o Hino Te Deum, seguido da oração própria do dia.",
    espiritualidade:
      "É a “vigília” da Igreja, herdeira do antigo Ofício Noturno monástico. Alimenta a lectio divina e une o orante à oração de Cristo no silêncio da noite (cf. Lc 6,12).",
  },
  laudes: {
    nome: "Laudes — Oração da Manhã",
    horario: "Ao raiar do dia, antes do trabalho",
    abertura:
      "Deus, vinde em meu auxílio / Senhor, tende pressa em socorrer-me. Glória ao Pai… Aleluia (omitido na Quaresma). Hino próprio do tempo.",
    salmodia:
      "Salmo matutino + Cântico do Antigo Testamento + Salmo de louvor — cada um com sua antífona.",
    cantico:
      "Cântico de Zacarias — Benedictus (Lc 1,68-79), com antífona própria de cada dia.",
    leitura:
      "Leitura breve com responsório (curto).",
    oracao:
      "Preces da manhã, Pai-Nosso, oração conclusiva e bênção (ou conclusão simples se rezada em particular).",
    espiritualidade:
      "Hora maior junto com as Vésperas. Consagra a Deus o primeiro movimento do espírito; recorda a Ressurreição do Senhor, “sol que nasce do alto” (Lc 1,78; SC 89a).",
  },
  vesperas: {
    nome: "Vésperas — Oração da Tarde",
    horario: "Ao entardecer, ao acender das lâmpadas",
    abertura:
      "Deus, vinde em meu auxílio. Hino vespertino (frequentemente o antiquíssimo Phos Hilaron na tradição oriental, ou hinos como Lucis Creator).",
    salmodia:
      "Dois salmos + um cântico do Novo Testamento (das cartas apostólicas ou do Apocalipse), com antífonas próprias.",
    cantico:
      "Cântico de Maria — Magnificat (Lc 1,46-55), incensação solene na liturgia comunitária.",
    leitura:
      "Leitura breve com responsório (curto).",
    oracao:
      "Preces da tarde com intenções pelo mundo e pelos defuntos, Pai-Nosso, oração e bênção.",
    espiritualidade:
      "Ação de graças pelo dia que termina e oferenda do “sacrifício vespertino” (Sl 140), recordando a instituição da Eucaristia na tarde da Quinta-feira Santa (SC 89b).",
  },
};

function Page() {
  const [hora, setHora] = useState<HoraSlug>("laudes");
  const d = DETALHES[hora];

  return (
    <div>
      <PageHero
        image={biblioteca}
        eyebrow="Officium Divinum"
        title="Liturgia das Horas"
        intro="A oração pública e oficial da Igreja, que santifica todas as horas do dia, prolongando o cântico de louvor que o próprio Cristo introduziu no mundo (SC 83)."
      />

      <ReadingMode title="Liturgia das Horas" toc={TOC} footnotes={FOOTNOTES}>
        <Prose>
          <section id="introducao" className="scroll-mt-24">
            <h3>O Ofício Divino na vida da Igreja</h3>
            <p>
              A <em>Liturgia das Horas</em> — também chamada <em>Ofício Divino</em> ou <em>Breviário</em> — é
              a oração oficial e pública da Igreja, instituída para que todo o curso do dia e da noite seja
              consagrado pelo louvor a Deus<FnRef n="sc" />. Não é devoção particular: é ato litúrgico, em que
              a Esposa de Cristo se une ao seu Esposo na oração ao Pai<FnRef n="cic-loh" />.
            </p>
            <Pullquote cite="Sacrosanctum Concilium 84 — Concílio Vaticano II">
              O Ofício Divino, segundo a antiga tradição cristã, é constituído de modo que todo o
              curso do dia e da noite seja consagrado pelo louvor a Deus.
            </Pullquote>
          </section>

          <section id="natureza" className="scroll-mt-24">
            <h3>I. Natureza e dignidade</h3>
            <p>
              Reformado por Paulo VI segundo as orientações conciliares, o atual Ofício foi promulgado pela
              constituição apostólica <em>Laudis Canticum</em> (1970)<FnRef n="lc" /> e regulado pela{" "}
              <em>Instrução Geral sobre a Liturgia das Horas</em><FnRef n="iglh" />. O Código de Direito
              Canônico estabelece sua natureza litúrgica (cân. 1173–1175)<FnRef n="cdc-1174" /> e a obrigação
              dos clérigos de rezá-lo todos os dias (cân. 276 §2, 3.º)<FnRef n="cdc-276" />. Religiosos
              professos seguem suas constituições; os leigos são vivamente recomendados a participar,
              sobretudo das Laudes e Vésperas (SC 100).
            </p>
            <p>
              Suas raízes remontam à oração das horas do judaísmo (Sl 118,164 — “sete vezes por dia te
              louvei”) e à prática monástica codificada por São Bento: <em>“Nihil operi Dei
              praeponatur”</em> — nada se anteponha à Obra de Deus<FnRef n="ben" />.
            </p>
          </section>

          <section id="horas" className="scroll-mt-24">
            <h3>II. As Horas Canônicas</h3>
            <p>
              O Ofício Divino se desdobra em <strong>cinco Horas</strong>: o Ofício de Leituras (em qualquer
              hora), as Laudes (manhã), a Hora Intermédia (Tércia/Sexta/Noa, durante o dia), as Vésperas
              (tarde) e as Completas (antes do repouso). Laudes e Vésperas são as <em>“duas charneiras do
              Ofício diário”</em> (SC 89a).
            </p>
            <CardGrid cols={2}>
              {HORAS.map((h) => (
                <ContentCard key={h.slug} title={h.nome} subtitle={h.horario}>
                  <p className="mb-3">{h.descricao}</p>
                  <ul className="text-xs space-y-1 text-foreground/70">
                    {h.estrutura.map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                </ContentCard>
              ))}
            </CardGrid>
          </section>
        </Prose>

        {/* Seletor de Hora — Laudes / Vésperas / Ofício de Leituras */}
        <section id="oficio-leituras" className="scroll-mt-24 mt-12 print:mt-6">
          <div className="surface-card backdrop-blur-sm">
            <div className="flex flex-wrap border-b border-gold/15 print:hidden">
              {(["laudes", "vesperas", "oficio-leituras"] as HoraSlug[]).map((s) => {
                const active = hora === s;
                const label =
                  s === "laudes" ? "Laudes" : s === "vesperas" ? "Vésperas" : "Ofício de Leituras";
                return (
                  <button
                    key={s}
                    onClick={() => setHora(s)}
                    className={`px-5 py-3 label-btn transition-colors border-r border-gold/10 ${
                      active ? "bg-gold/15 text-gold" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div id={hora === "laudes" ? "laudes" : hora === "vesperas" ? "vesperas" : "oficio-leituras-detalhe"} className="p-6 md:p-10 scroll-mt-24">
              <p className="kicker mb-2">Hora canônica</p>
              <h3 className="font-display text-3xl text-foreground">{d.nome}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{d.horario}</p>

              <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-6 text-sm leading-relaxed">
                <div>
                  <h4 className="kicker mb-2">1 · Abertura</h4>
                  <p className="text-foreground/85">{d.abertura}</p>
                </div>
                <div>
                  <h4 className="kicker mb-2">2 · Salmodia</h4>
                  <p className="text-foreground/85">{d.salmodia}</p>
                </div>
                <div>
                  <h4 className="kicker mb-2">3 · Cântico evangélico</h4>
                  <p className="text-foreground/85">{d.cantico}</p>
                </div>
                <div>
                  <h4 className="kicker mb-2">4 · Leitura</h4>
                  <p className="text-foreground/85">{d.leitura}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="kicker mb-2">5 · Preces, oração e conclusão</h4>
                  <p className="text-foreground/85">{d.oracao}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gold/15 pt-6">
                <h4 className="kicker mb-2">Espiritualidade da Hora</h4>
                <p className="text-sm text-foreground/85 leading-relaxed italic">{d.espiritualidade}</p>
              </div>
            </div>
          </div>
        </section>

        <Prose>
          <section id="laudes" className="scroll-mt-24">
            <h3>IV. Laudes — “consagrar ao Senhor o primeiro movimento do coração”</h3>
            <p>
              As Laudes santificam a manhã e celebram a Ressurreição do Senhor, verdadeira luz que ilumina
              todo homem (Jo 1,9). A IGLH 38 explica: <em>“Esta Hora é constituída de modo que se exprima e
              suscite a piedade matutina”</em>. Junto com as Vésperas, devem ser celebradas, quando possível,
              com o povo (SC 100).
            </p>
          </section>

          <section id="vesperas" className="scroll-mt-24">
            <h3>V. Vésperas — “sacrifício vespertino”</h3>
            <p>
              Na tarde, a Igreja oferece sacrifício de louvor pela jornada vivida. O <em>Magnificat</em>{" "}
              irrompe a cada Vésperas como cântico próprio da Esposa diante das maravilhas operadas por Deus
              em sua humilde serva. Tércia, Sexta e Noa — Horas Intermédias — pontuam o trabalho do dia
              recordando momentos da Paixão.
            </p>
          </section>

          <section id="saltério" className="scroll-mt-24">
            <h3>VI. O Saltério em quatro semanas</h3>
            <p>
              A reforma pós-conciliar distribui os 150 Salmos em um ciclo de <strong>quatro semanas</strong>,
              omitindo apenas as chamadas <em>imprecações</em> que poderiam ferir a sensibilidade cristã
              (IGLH 131). Os Salmos são lidos como oração de Cristo — “Cristo total, Cabeça e Membros” —
              segundo a clássica regra de Santo Agostinho: <em>“Christus orat pro nobis, orat in nobis,
              oratur a nobis”</em>.
            </p>
            <Pullquote cite="Verbum Domini 62 — Bento XVI">
              A Liturgia das Horas é uma escola privilegiada de oração com a Sagrada Escritura, que se torna
              voz da Esposa e do Esposo.
            </Pullquote>
          </section>

          <section id="como-rezar" className="scroll-mt-24">
            <h3>VII. Como rezar — prática</h3>
            <ul>
              <li><strong>Comece pelas Laudes e Vésperas</strong> — as “Horas maiores”, recomendadas a todos os fiéis (SC 100).</li>
              <li><strong>Use as antífonas e cantos</strong> — o Ofício foi feito para ser cantado, não apenas recitado.</li>
              <li><strong>Recolhimento de coração</strong> — mais importante que multiplicar palavras é a sintonia da mente com a voz (cf. <em>mens nostra concordet voci nostrae</em>, IGLH 19).</li>
              <li><strong>Use os recursos oficiais</strong> abaixo: as edições aprovadas pela CNBB e ferramentas em português atualizadas diariamente.</li>
            </ul>
          </section>
        </Prose>

        <BuscaHoras />


        <section id="fontes" className="scroll-mt-24 mt-12 print:hidden">
          <h3 className="font-display text-2xl text-foreground mb-6">Fontes oficiais para rezar hoje</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {FONTES_OFICIAIS.map((f) => (
              <a
                key={f.url}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gold/30 p-6 hover:border-gold hover:bg-gold/5 transition-colors"
              >
                <p className="kicker mb-2">Fonte oficial</p>
                <p className="font-display text-lg">{f.nome}</p>
                <p className="text-xs text-muted-foreground mt-2 break-all">{f.url}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 flex justify-between items-center print:hidden">
            <Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold label-btn">
              ← Todas as orações
            </Link>
            <Link to="/calendario-liturgico" className="px-5 py-3 btn-base btn-outline-gold label-btn">
              Calendário litúrgico →
            </Link>
          </div>
        </section>
      </ReadingMode>
    </div>
  );
}
