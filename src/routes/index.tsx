import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BookOpen, Heart, Sparkles, Church, Crown, ScrollText, Compass, Calendar, MessageCircle } from "lucide-react";
import hero from "../assets/hero-catedral.jpg";
import maria from "../assets/maria.jpg";
import cristo from "../assets/cristo.jpg";
import eucaristia from "../assets/eucaristia.jpg";
import rosario from "../assets/rosario.jpg";
import biblioteca from "../assets/biblioteca.jpg";

import { santoDoDia } from "../lib/data/hoje";
import { dataDoIso } from "../lib/liturgia/hoje";
import { liturgiaQueryOptions } from "../lib/liturgia/query";
import { COR_CLASSE } from "../lib/liturgia/calendario";
import { ScrollReveal } from "../components/ScrollReveal";
import { BuscaAprender, ComeceAqui } from "../components/portal/AprenderHome";
import { RetomarLeitura } from "../components/portal/RetomarLeitura";
import { UltimosArtigos, TrilhasIlustradas } from "../components/portal/DestaquesHome";
import { ImagemOtimizada } from "../components/ImagemOtimizada";



const SITE_URL = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(liturgiaQueryOptions()),
  errorComponent: ({ error }) => (
    <div className="shell-narrow py-block text-center" role="alert">
      <p className="text-gold">Não foi possível carregar o conteúdo do dia.</p>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="shell-narrow py-block text-center">
      <p className="text-gold">Página não encontrada.</p>
    </div>
  ),
  head: () => ({

    meta: [
      { title: "Portal Católico — Bíblia, Catecismo e a Tradição da Igreja" },
      {
        name: "description",
        content:
          "Biblioteca digital da fé católica em português: Bíblia comentada, os 2.865 parágrafos do Catecismo, vidas dos santos, mariologia, sacramentos, orações tradicionais e assistente de IA fiel ao Magistério.",
      },
      { name: "keywords", content: "Bíblia católica, Catecismo da Igreja Católica, santos, Maria, sacramentos, orações católicas, apologética, magistério" },
      { property: "og:title", content: "Portal Católico — Biblioteca Digital da Fé" },
      {
        property: "og:description",
        content: "Estudo, oração e formação na fé católica — fiel ao Magistério da Igreja, de Pedro a Francisco.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});


const PILLARS = [
  { to: "/biblia", icon: BookOpen, title: "Bíblia Sagrada", desc: "Os 73 livros canônicos com introduções, contexto histórico e leituras litúrgicas do dia." },
  { to: "/catecismo", icon: ScrollText, title: "Catecismo", desc: "Os 2.865 parágrafos da fé católica, com referências cruzadas à Escritura e aos Padres." },
  { to: "/sacramentos", icon: Church, title: "Sacramentos", desc: "Os 7 sinais sensíveis e eficazes da graça instituídos por Cristo — matéria, forma e efeitos." },
  { to: "/santos", icon: Crown, title: "Santos", desc: "Vidas, virtudes heroicas e escritos dos amigos de Deus, de Estêvão até os mártires do séc. XXI." },
  { to: "/maria", icon: Heart, title: "Mariologia", desc: "Os quatro dogmas marianos, aparições aprovadas e a maternidade espiritual de Maria." },
  { to: "/oracoes", icon: Sparkles, title: "Orações", desc: "Rosário, Via-Sacra, Liturgia das Horas, novenas, ladainhas e devoções tradicionais." },
  { to: "/apologetica", icon: Compass, title: "Apologética", desc: "Defesa racional da fé: existência de Deus, autoridade da Igreja, Bíblia e Tradição." },
  { to: "/calendario-liturgico", icon: Calendar, title: "Calendário", desc: "Tempo litúrgico, festas, solenidades e memórias dos santos celebradas pela Igreja." },
  { to: "/assistente", icon: Sparkles, title: "Sophia IA", desc: "Assistente que responde com base no Catecismo, na Escritura e nos documentos do Magistério." },
];

/** Três portas de entrada com imagem — pouca palavra, muito contexto. */
const PERCURSOS = [
  {
    to: "/sacramentos" as const,
    img: eucaristia,
    kicker: "Vida sacramental",
    titulo: "Onde a graça se torna visível",
    desc:
      "Os sete sacramentos, um a um: matéria, forma, ministro e efeitos, com o texto do Catecismo e do Direito Canônico ao lado.",
    nota: "7 sacramentos · CIC §§ 1113–1666",
  },
  {
    to: "/oracoes" as const,
    img: rosario,
    kicker: "Vida de oração",
    titulo: "Rezar com a Igreja de sempre",
    desc:
      "Rosário, Via-Sacra, Liturgia das Horas, novenas e ladainhas — com a origem histórica de cada devoção e o modo de rezá-la.",
    nota: "Rosário · Via-Sacra · Horas · Novenas",
  },
  {
    to: "/catecismo" as const,
    img: biblioteca,
    kicker: "Formação doutrinal",
    titulo: "Estudar com ordem e fontes",
    desc:
      "As quatro partes do Catecismo, os Padres da Igreja e os documentos conciliares, sempre com a referência para conferir na fonte.",
    nota: "2.865 parágrafos · 4 partes",
  },
];



const PADRES = [
  {
    quote: "Onde está Pedro, ali está a Igreja.",
    author: "Santo Ambrósio",
    ref: "Comentário ao Salmo 40, séc. IV",
  },
  {
    quote: "Tarde te amei, ó beleza tão antiga e tão nova, tarde te amei.",
    author: "Santo Agostinho",
    ref: "Confissões X, 27",
  },
  {
    quote: "Recebei o que sois; tornai-vos o que recebeis: o Corpo de Cristo.",
    author: "Santo Agostinho",
    ref: "Sermão 272, sobre a Eucaristia",
  },
];


function primeiraFrase(texto: string, max = 220): string {
  const limpo = texto
    .replace(/(^|[\s“‘"(])\d+(?=\p{L})/gu, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (limpo.length <= max) return limpo;
  const corte = limpo.slice(0, max);
  const fim = Math.max(corte.lastIndexOf(". "), corte.lastIndexOf("; "));
  return (fim > 80 ? corte.slice(0, fim + 1) : `${corte.trimEnd()}…`);
}

/** A celebração é uma memória de santo (e não apenas o dia da semana/domingo)? */
function ehMemoriaDeSanto(celebracao: string): boolean {
  return !/(domingo|feira|sábado|sabado|semana)/i.test(celebracao);
}

function Home() {
  const { data: lit } = useSuspenseQuery(liturgiaQueryOptions());
  const santo = santoDoDia(dataDoIso(lit.iso));

  const salmo = lit.salmo[0];
  const evangelho = lit.evangelho[0];
  const memoriaOficial = ehMemoriaDeSanto(lit.celebracao) ? lit.celebracao : null;

  const DAILY_ITEMS: {
    kicker: string;
    text: string;
    ref: string;
    linkTo?: "/liturgia-diaria" | "/santos";
  }[] = [
    {
      kicker: "Versículo do dia",
      text: `“${salmo?.refrao ?? primeiraFrase(salmo?.texto ?? lit.celebracao)}”`,
      ref: salmo?.referencia ? `Salmo responsorial — ${salmo.referencia}` : lit.tempoNome,
      linkTo: "/liturgia-diaria",
    },
    memoriaOficial
      ? {
          kicker: "Santo do dia",
          text: memoriaOficial,
          ref: `Celebração de hoje · ${lit.tempoNome}`,
          linkTo: "/santos" as const,
        }
      : {
          kicker: "Santo do dia",
          text: `${santo.nome} — ${santo.resumo}`,
          ref: santo.celebradoHoje
            ? `Memória — ${santo.data}`
            : `Santo lembrado hoje · Memória em ${santo.data}`,
          linkTo: "/santos" as const,
        },

    {
      kicker: "Evangelho do dia",
      text: evangelho ? `“${primeiraFrase(evangelho.texto)}”` : lit.celebracao,
      ref: evangelho?.referencia ? `${evangelho.referencia} · Ano ${lit.anoLiturgico}` : `Ano ${lit.anoLiturgico}`,
      linkTo: "/liturgia-diaria",
    },
  ];



  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[34rem] items-center overflow-hidden py-section sm:min-h-[calc(100svh-4.5rem)] sm:max-h-[46rem]">
        <div className="absolute inset-0" aria-hidden>
          <ImagemOtimizada
            src={hero}
            alt=""
            width={1920}
            height={1080}
            prioridade
            sizes="100vw"
            className="size-full object-cover"
          />
        </div>
        {/* Noir editorial: escurece da esquerda para a direita, preservando a luz da nave */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/10" />
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

        <div className="shell relative w-full">
          <div className="max-w-2xl animate-reveal">
            <p className="mb-6 flex items-center gap-3 kicker text-gold sm:gap-4">
              <span className="hidden h-px w-10 shrink-0 bg-gold/50 sm:block" />
              <span className="min-w-0 tracking-[0.32em]">Una · Sancta · Catholica · Apostolica</span>
            </p>
            <h1 className="mb-6 font-display text-[length:var(--step-5)] font-bold leading-[1.08] tracking-tight text-balance text-foreground">
              A biblioteca{" "}
              <span className="block font-normal italic text-gold-accent">da Fé</span>
            </h1>
            <p className="measure mb-10 text-[length:var(--step-1)] font-light leading-relaxed text-foreground/70">
              Escritura, Catecismo, Padres da Igreja, santos e devoções tradicionais —
              reunidos em uma única referência de estudo, fiel ao Magistério desde
              Pedro até hoje.
            </p>
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to="/estudar"
                className="btn-base btn-gold px-8 py-4 label-btn"
              >
                <BookOpen className="size-4 shrink-0" />
                <span className="whitespace-nowrap">Começar a estudar</span>
              </Link>
              <Link
                to="/assistente"
                className="btn-base btn-outline-gold px-8 py-4 label-btn"
              >
                <Sparkles className="size-4 shrink-0" />
                <span className="whitespace-nowrap">Falar com a IA</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filete de ouro: assinatura vertical do hero */}
        <div
          aria-hidden
          className="absolute bottom-0 right-12 hidden h-64 w-px bg-linear-to-t from-gold to-transparent lg:block"
        />
      </section>


      {/* Tempo litúrgico em tempo real */}
      <section className="bg-background relative z-10 border-y border-gold/10">
        <div className="shell flex flex-col gap-2 py-block-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 label-btn text-muted-foreground">
            <span className={`chip ${COR_CLASSE[lit.cor]}`}>
              <span className="size-2 rounded-full bg-current" aria-hidden="true" /> {lit.corNome}
            </span>
            <span className="text-foreground/90">{lit.celebracao}</span>
            <span className="text-gold/70">Ano {lit.anoLiturgico}</span>
          </p>
          <Link
            to="/liturgia-diaria"
            className="kicker hover:text-paper transition-colors"
          >
            Liturgia diária →
          </Link>
        </div>
      </section>

      {/* Retomar leitura */}
      <section className="bg-background relative z-10">
        <div className="shell pt-block-sm">
          <RetomarLeitura />
        </div>
      </section>

      {/* Daily */}
      <section aria-labelledby="hoje-na-igreja" className="bg-background relative z-10">
        <div className="shell pt-block-sm pb-[var(--space-sm)]">
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-4">
            <h2
              id="hoje-na-igreja"
              className="title-card"
            >
              Hoje na Igreja
            </h2>
            <p className="label-btn text-muted-foreground">
              {dataDoIso(lit.iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" })}
            </p>
          </div>
        </div>
        <div className="shell">
          <div className="grid grid-cols-1 gap-px bg-gold/10 md:grid-cols-3 sm:border-x sm:border-gold/10">
            {DAILY_ITEMS.map((d, i) => {
              const inner = (
                <div className="group h-full flex flex-col py-[var(--space-sm)] sm:p-card transition-premium hover:bg-gold/[0.03]">
                  <p className="label-btn text-gold/80 mb-3 group-hover:text-gold transition-colors">{d.kicker}</p>
                  <p className="font-display italic text-[length:var(--step-1)] text-foreground/90 leading-relaxed mb-4 flex-1">
                    {d.text}
                  </p>
                  <p className="kicker text-muted-foreground group-hover:text-gold/80 transition-colors">
                    {d.ref}
                  </p>
                </div>
              );
              return (
                <ScrollReveal 
                  key={d.kicker} 
                  delay={i * 150}
                  threshold={0.05}
                >
                  {d.linkTo ? (
                    <Link to={d.linkTo} className="block h-full">
                      {inner}
                    </Link>
                  ) : (
                    <div className="h-full">{inner}</div>
                  )}
                </ScrollReveal>
              );

            })}
          </div>
        </div>
        <div className="shell pb-block-sm">
          <Link
            to="/liturgia-diaria"
            className="inline-flex min-h-11 items-center kicker hover:text-paper transition-colors"
          >
            Ver liturgia completa →
          </Link>
        </div>
      </section>

      <BuscaAprender />

      <ComeceAqui />

      {/* Percursos ilustrados */}
      <section aria-labelledby="percursos" className="shell py-section">
        <ScrollReveal className="mb-[var(--space-lg)] max-w-2xl">
          <p className="kicker mb-4">Três portas de entrada</p>
          <h2 id="percursos" className="title-page text-balance leading-[1.08] text-foreground">
            Fé vivida, <span className="text-gold/80 italic">rezada e estudada.</span>
          </h2>
          <p className="measure mt-6 font-light leading-relaxed text-muted-foreground">
            A mesma Revelação chega até nós por três caminhos que se sustentam: os sacramentos que
            nos dão a graça, a oração que a acolhe e o estudo que a compreende.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-[var(--space-sm)] md:grid-cols-3">
          {PERCURSOS.map((p, i) => (
            <ScrollReveal key={p.to} delay={i * 120}>
              <Link
                to={p.to}
                className="group flex h-full flex-col overflow-hidden border border-gold/10 bg-card/40 transition-premium hover:-translate-y-1 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImagemOtimizada
                    src={p.img}
                    alt=""
                    width={1536}
                    height={1024}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="size-full object-cover opacity-80 transition-transform duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/25 to-transparent" />
                  <p className="absolute bottom-4 left-4 kicker text-gold">{p.kicker}</p>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-card">
                  <h3 className="title-card text-foreground transition-colors group-hover:text-gold">
                    {p.titulo}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">{p.desc}</p>
                  <p className="mt-auto border-t border-gold/10 pt-4 kicker">{p.nota}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>


      <UltimosArtigos />

      <TrilhasIlustradas />

      {/* Pillars - Bento Grid Style */}
      <section className="shell py-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[var(--space-lg)] gap-[var(--space-sm)]">
          <ScrollReveal className="max-w-2xl">
            <p className="kicker mb-4">Os pilares da verdade</p>
            <h2 className="title-page text-foreground leading-[1.08] text-balance">
              Duas mil anos de fé, <span className="text-gold/75">em um só lugar.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200} className="max-w-[24rem]">
            <p className="text-foreground/70 text-sm leading-relaxed mb-2 font-light">
              Escritura, Tradição e Magistério — os três canais pelos quais a Revelação chega até nós —
              organizados com referências cruzadas para um estudo sério e contemplativo.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-sm)]">
          {PILLARS.map((p, i) => (
            <ScrollReveal
              key={p.to}
              delay={i * 100}
              className={`${i === 0 || i === 5 ? "lg:col-span-2" : ""}`}
            >
              <Link
                to={p.to}
                className="group glass p-card flex flex-col gap-[var(--space-sm)] card-premium-hover h-full"
              >
              <div className="size-14 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/30 transition-premium">
                <p.icon className="size-6 text-gold group-hover:scale-110 transition-premium" />
              </div>
              <div className="flex-1">
                <h3 className="title-card text-foreground mb-3 group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light group-hover:text-foreground/70 transition-colors">{p.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gold/5">
                <span className="label-btn text-gold/40 group-hover:text-gold transition-colors">
                  Explorar
                </span>
                <div className="size-8 rounded-full border border-gold/10 flex items-center justify-center group-hover:border-gold/30 transition-premium">
                  <span className="text-gold text-lg group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Editorial split */}
      <section className="bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
        <div className="shell py-section grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-lg)] items-center">
          <ScrollReveal direction="left" className="relative">
            <div className="absolute -inset-4 border border-gold/10 -z-10 translate-x-4 translate-y-4" />
            <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <ImagemOtimizada
                src={maria}
                alt="Imagem devocional de Nossa Senhora"
                width={1024}
                height={1280}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="size-full object-cover"
              />
            </div>
            <div className="absolute bottom-8 right-8 bg-background/80 backdrop-blur-md px-6 py-4 border border-gold/20">
              <p className="label-btn text-gold">Regina Caeli</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={200}>
            <p className="kicker mb-6 flex items-center gap-4">
              <span className="h-px w-6 bg-gold/40" /> Maria, Mater Ecclesiae
            </p>
            <h2 className="title-page text-foreground leading-[0.98] tracking-tight text-balance mb-6">
              “Faça-se em mim <span className="text-gold italic">segundo a tua palavra.</span>”
            </h2>
            <p className="measure text-[length:var(--step-0)] text-muted-foreground leading-relaxed font-light mb-[var(--space-md)]">
              "De Maria nunquam satis" — sobre Maria, nunca o suficiente, dizia São Bernardo.
              Conheça os quatro dogmas marianos, as aparições aprovadas pela Igreja e a
              teologia da Theotokos segundo os Padres e Doutores.
            </p>
            <Link
              to="/maria"
              className="group inline-flex items-center gap-4 px-7 py-4 min-h-12 border border-gold/30 text-gold label-btn hover:bg-gold hover:text-deep transition-premium"
            >
              <span>Estudar Mariologia</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* Padres da Igreja — vozes da Tradição */}
      <section className="bg-background py-section">
        <div className="shell">
          <ScrollReveal className="max-w-3xl mb-[var(--space-lg)]">
            <p className="kicker mb-4 flex items-center gap-4">
              <span className="h-px w-6 bg-gold/40" /> Vox Patrum · A voz dos Padres
            </p>
            <h2 className="title-page text-foreground leading-[1.08] text-balance">
              O que recebemos{" "}
              <span className="text-gold/85 italic">dos primeiros séculos.</span>
            </h2>
            <p className="measure text-[length:var(--step-0)] text-muted-foreground leading-relaxed font-light mt-6">
              A fé católica não nasceu ontem. Dos Padres Apostólicos aos Doutores medievais,
              uma mesma voz atravessa vinte séculos confessando o mesmo Cristo.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
            {PADRES.map((p, i) => (
              <ScrollReveal key={p.author + i} delay={i * 120}>
                <figure className="h-full p-card bg-background flex flex-col gap-[var(--space-sm)]">
                  <span className="text-gold/40 font-display text-6xl leading-none">"</span>
                  <blockquote className="font-display italic text-[length:var(--step-2)] text-foreground/90 leading-snug flex-1">
                    {p.quote}
                  </blockquote>
                  <figcaption className="border-t border-gold/10 pt-6">
                    <p className="text-sm font-medium text-gold tracking-wide">{p.author}</p>
                    <p className="label-btn text-muted-foreground mt-2">{p.ref}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400} className="mt-[var(--space-md)] flex justify-center">
            <Link
              to="/doutores-da-igreja"
              className="group inline-flex items-center gap-4 kicker hover:text-gold transition-colors"
            >
              <span>Ver os 37 Doutores da Igreja</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* AI feature */}
      <section className="relative overflow-hidden bg-deep">
        <div
          className="absolute inset-0 opacity-[0.12] bg-cover bg-center transition-transform duration-[20s] scale-125 hover:scale-100"
          style={{ backgroundImage: `url(${cristo})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--deep)_80%)]" />
        
        <ScrollReveal className="shell py-section relative text-center">
          <div className="relative inline-block mb-[var(--space-md)]">
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
            <div className="relative size-24 rounded-full glass border border-gold/30 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.15)]">
              <Sparkles className="size-10 text-gold animate-pulse" />
            </div>
          </div>
          
          <p className="kicker mb-6">Sophia · Logos</p>
          <h2 className="font-display text-[length:var(--step-5)] text-paper leading-[0.95] tracking-tight text-balance mb-[var(--space-md)]">
            Inteligência Artificial <em className="text-gold italic font-medium">ao serviço da Verdade</em>
          </h2>
          <p className="measure mx-auto text-[length:var(--step-0)] text-paper/75 leading-relaxed font-light mb-[var(--space-md)]">
            Treinada exclusivamente sobre a Bíblia, o Catecismo e os documentos do Magistério.
            Cada resposta vem com referências verificáveis — Escritura, parágrafos do CIC,
            concílios e Padres da Igreja. Nada de opinião; só o que a Igreja ensina.
          </p>
          <Link
            to="/assistente"
            className="group relative inline-flex items-center gap-4 px-8 py-4 min-h-12 bg-paper text-deep text-step--2 sm:label-btn transition-premium hover:shadow-[0_0_50px_rgba(252,250,247,0.2)]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            <span>Conversar agora</span>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
