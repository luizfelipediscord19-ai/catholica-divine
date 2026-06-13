import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Heart, Sparkles, Church, Crown, ScrollText, Compass, Calendar } from "lucide-react";
import hero from "../assets/hero-catedral.jpg";
import maria from "../assets/maria.jpg";
import cristo from "../assets/cristo.jpg";
import { versoDoDia, evangelhoDoDia, santoDoDia } from "../lib/data/hoje";
import { ScrollReveal } from "../components/ScrollReveal";


export const Route = createFileRoute("/")({
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
    ],
  }),
  component: Home,
});

const PILLARS = [
  { to: "/biblia", icon: BookOpen, title: "Bíblia Sagrada", desc: "73 livros, comentários patrísticos, mapas e leitura em áudio." },
  { to: "/catecismo", icon: ScrollText, title: "Catecismo", desc: "Os 2.865 parágrafos da fé católica, comentados e pesquisáveis." },
  { to: "/sacramentos", icon: Church, title: "Sacramentos", desc: "Os 7 sinais eficazes da graça instituídos por Cristo." },
  { to: "/santos", icon: Crown, title: "Santos", desc: "Vidas, virtudes e ensinamentos dos amigos de Deus." },
  { to: "/maria", icon: Heart, title: "Mariologia", desc: "A Mãe de Deus, suas aparições e dogmas marianos." },
  { to: "/oracoes", icon: Sparkles, title: "Orações", desc: "Rosário, Liturgia das Horas, novenas e ladainhas." },
  { to: "/apologetica", icon: Compass, title: "Apologética", desc: "Defesa racional da fé contra objeções modernas." },
  { to: "/calendario-liturgico", icon: Calendar, title: "Calendário", desc: "Tempo litúrgico, festas e memórias dos santos." },
  { to: "/assistente", icon: Sparkles, title: "Sophia IA", desc: "Tire dúvidas com respostas fundamentadas no Magistério." },
];

const DAILY = [
  {
    kicker: "Versículo do dia",
    text: "“Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por mim.”",
    ref: "João 14, 6",
  },
  {
    kicker: "Santo do dia",
    text: "Santa Teresa de Ávila — doutora da Igreja, reformadora do Carmelo, mestra da oração contemplativa.",
    ref: "Memória — 15 de Outubro",
  },
  {
    kicker: "Evangelho do dia",
    text: "“Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei.”",
    ref: "Mateus 11, 28",
  },
];

function refTexto(r: { nome: string; capitulo: number; vi?: number; vf?: number }) {
  if (r.vi && r.vf && r.vi !== r.vf) return `${r.nome} ${r.capitulo}, ${r.vi}-${r.vf}`;
  if (r.vi) return `${r.nome} ${r.capitulo}, ${r.vi}`;
  return `${r.nome} ${r.capitulo}`;
}

function Home() {
  const verso = versoDoDia();
  const evangelho = evangelhoDoDia();
  const santo = santoDoDia();

  // Memoize daily items to prevent unnecessary recalculations
  const DAILY_ITEMS = [
    {
      kicker: "Versículo do dia",
      text: `“${verso.texto}”`,
      ref: refTexto(verso),
      link: {
        to: "/biblia/$livro/$capitulo",
        params: { livro: verso.livro, capitulo: String(verso.capitulo) },
        search: verso.vi ? { vi: String(verso.vi), ...(verso.vf ? { vf: String(verso.vf) } : {}) } : {},
      },
    },
    {
      kicker: "Santo do dia",
      text: `${santo.nome} — ${santo.resumo}`,
      ref: `Memória — ${santo.data}`,
    },
    {
      kicker: "Evangelho do dia",
      text: `${evangelho.titulo} — “${evangelho.texto}”`,
      ref: refTexto(evangelho),
      link: {
        to: "/biblia/$livro/$capitulo",
        params: { livro: evangelho.livro, capitulo: String(evangelho.capitulo) },
        search: evangelho.vi ? { vi: String(evangelho.vi), ...(evangelho.vf ? { vf: String(evangelho.vf) } : {}) } : {},
      },
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out scale-110 hover:scale-100"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/20 via-deep/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_100%)]" />

        <div className="relative max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-4xl animate-reveal">
            <p className="text-[11px] tracking-[0.6em] uppercase text-gold/80 mb-10 flex items-center gap-6">
              <span className="h-px w-12 bg-gold/40" /> 
              <span>Una · Sancta · Catholica · Apostolica</span>
            </p>
            <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] leading-[0.75] text-paper tracking-tighter mb-12">
              A biblioteca <br/>
              <span className="text-gold italic font-medium relative inline-block">
                da Fé
                <span className="absolute -bottom-6 left-0 w-full h-1 bg-gold/30 blur-md" />
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-2xl text-paper/70 leading-relaxed font-light mb-16 letter-spacing-wide">
              Bíblia, Catecismo, Magistério, santos e orações — em uma experiência
              cinematográfica, fiel à doutrina da Igreja de Cristo.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/biblia"
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gold text-deep text-[11px] uppercase tracking-[0.4em] font-bold overflow-hidden transition-premium hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] button-hover-effect"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <BookOpen className="size-4 relative z-10" /> <span className="relative z-10">Começar a estudar</span>
              </Link>
              <Link
                to="/assistente"
                className="inline-flex items-center gap-3 px-8 py-6 border border-gold/30 text-paper text-[11px] uppercase tracking-[0.3em] font-medium hover:border-gold hover:bg-gold/5 transition-premium button-hover-effect"
              >
                <Sparkles className="size-4 text-gold" /> Falar com a IA Católica
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-float opacity-50">
          <span className="text-[9px] uppercase tracking-[0.4em] text-gold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </section>

      {/* Daily */}
      <section className="bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10 border-x border-gold/10">
            {DAILY_ITEMS.map((d, i) => {
              const inner = (
                <div className="group h-full flex flex-col p-10 transition-premium hover:bg-gold/[0.03]">
                  <p className="text-[9px] tracking-[0.5em] uppercase text-gold/50 mb-6 group-hover:text-gold transition-colors">{d.kicker}</p>
                  <p className="font-display italic text-2xl text-foreground/90 leading-relaxed mb-8 flex-1">
                    {d.text}
                  </p>
                  <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase group-hover:text-gold/80 transition-colors">
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
                  {d.link ? (
                    <Link to={d.link.to} params={d.link.params} search={d.link.search} className="block h-full">
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
      </section>

      {/* Pillars - Bento Grid Style */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <ScrollReveal className="max-w-2xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Os pilares da verdade</p>
            <h2 className="font-display text-5xl md:text-7xl text-foreground leading-[1.1]">
              Toda a fé católica, organizada <br/> <span className="text-gold/50">para o seu estudo.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200} className="max-w-sm">
            <p className="text-muted-foreground text-sm leading-relaxed mb-2 font-light">
              Explore séculos de tradição, magistério e espiritualidade através de uma interface desenhada para a contemplação.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <ScrollReveal
              key={p.to}
              delay={i * 100}
              className={`${i === 0 || i === 5 ? "md:col-span-2" : ""}`}
            >
              <Link
                to={p.to}
                className="group glass p-10 flex flex-col gap-8 card-premium-hover h-full"
              >
              <div className="size-14 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/30 transition-premium">
                <p.icon className="size-6 text-gold group-hover:scale-110 transition-premium" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-3xl text-foreground mb-4 group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 group-hover:text-foreground/70 transition-colors">{p.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gold/5">
                <span className="text-[9px] tracking-[0.5em] uppercase text-gold/40 group-hover:text-gold transition-colors">
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
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-8 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal direction="left" className="relative">
            <div className="absolute -inset-4 border border-gold/10 -z-10 translate-x-4 translate-y-4" />
            <div
              className="aspect-[4/5] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              style={{ backgroundImage: `url(${maria})` }}
            />
            <div className="absolute bottom-8 right-8 bg-background/80 backdrop-blur-md px-6 py-4 border border-gold/20">
              <p className="text-[9px] tracking-[0.4em] uppercase text-gold">Regina Caeli</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={200}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-4">
              <span className="h-px w-6 bg-gold/40" /> Maria, Mater Ecclesiae
            </p>
            <h2 className="font-display text-6xl md:text-8xl text-foreground leading-[0.9] tracking-tight mb-8">
              “Faça-se em mim <br/> <span className="text-gold italic">segundo a tua palavra.</span>”
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light mb-12 max-w-lg">
              A Virgem Maria é o caminho mais seguro a Cristo. Conheça os dogmas marianos,
              as aparições aprovadas pela Igreja e a teologia da Mãe de Deus segundo os Padres e Doutores.
            </p>
            <Link
              to="/maria"
              className="group inline-flex items-center gap-4 px-10 py-5 border border-gold/30 text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-deep transition-premium"
            >
              <span>Estudar Mariologia</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* AI feature */}
      <section className="relative overflow-hidden bg-deep">
        <div
          className="absolute inset-0 opacity-[0.07] bg-cover bg-center transition-transform duration-[20s] scale-125 hover:scale-100"
          style={{ backgroundImage: `url(${cristo})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)]" />
        
        <ScrollReveal className="relative max-w-5xl mx-auto px-8 py-40 md:py-60 text-center">
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
            <div className="relative size-24 rounded-full glass border border-gold/30 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.15)]">
              <Sparkles className="size-10 text-gold animate-pulse" />
            </div>
          </div>
          
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-8">Sophia · Logos</p>
          <h2 className="font-display text-6xl md:text-9xl text-foreground leading-[0.85] tracking-tighter mb-12">
            Inteligência Artificial <br/> <em className="text-gold italic font-medium">ao serviço da Verdade</em>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mb-16">
            Respostas fundamentadas na Bíblia, no Catecismo e nos documentos oficiais da
            Igreja — com citações, contexto e referências.
          </p>
          <Link
            to="/assistente"
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-paper text-deep text-[11px] uppercase tracking-[0.4em] font-bold transition-premium hover:shadow-[0_0_50px_rgba(252,250,247,0.2)]"
          >
            <Sparkles className="size-4 group-hover:rotate-12 transition-transform" /> 
            <span>Conversar agora</span>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
