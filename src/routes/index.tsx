import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Heart, Sparkles, Church, Crown, ScrollText, Compass, Calendar } from "lucide-react";
import hero from "../assets/hero-catedral.jpg";
import maria from "../assets/maria.jpg";
import cristo from "../assets/cristo.jpg";
import { versoDoDia, evangelhoDoDia, santoDoDia } from "../lib/data/hoje";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal Católico — Biblioteca Digital da Fé" },
      {
        name: "description",
        content:
          "A maior biblioteca digital católica em português: Bíblia, Catecismo, Sacramentos, Santos, Maria, orações, apologética e IA fiel ao Magistério.",
      },
      { property: "og:title", content: "Portal Católico — Biblioteca Digital da Fé" },
      {
        property: "og:description",
        content: "Estudo, oração e formação na fé católica — fiel ao Magistério da Igreja.",
      },
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
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold/80 mb-8 flex items-center gap-4">
              <span className="h-px w-8 bg-gold/30" /> Una · Sancta · Catholica · Apostolica
            </p>
            <h1 className="font-display text-7xl md:text-9xl lg:text-[11rem] leading-[0.8] text-paper tracking-tighter mb-10">
              A biblioteca <br/>
              <span className="text-gold italic font-medium relative inline-block">
                da Fé
                <span className="absolute -bottom-4 left-0 w-full h-1 bg-gold/20 blur-sm" />
              </span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-paper/70 leading-relaxed font-light mb-12">
              Bíblia, Catecismo, Magistério, santos e orações — em uma experiência
              cinematográfica, fiel à doutrina da Igreja de Cristo.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/biblia"
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gold text-deep text-[11px] uppercase tracking-[0.4em] font-bold overflow-hidden transition-premium hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <BookOpen className="size-4 relative z-10" /> <span className="relative z-10">Começar a estudar</span>
              </Link>
              <Link
                to="/assistente"
                className="inline-flex items-center gap-3 px-8 py-6 border border-gold/30 text-paper text-[11px] uppercase tracking-[0.3em] font-medium hover:border-gold hover:bg-gold/5 transition-premium"
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
      <section className="border-y border-gold/20 bg-card">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold/15">
          {DAILY_ITEMS.map((d, i) => {
            const inner = (
              <>
                <p className="text-[9px] tracking-[0.4em] uppercase text-gold/60 mb-4">{d.kicker}</p>
                <p className="font-display italic text-xl text-foreground leading-[1.4] mb-4">{d.text}</p>
                <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">{d.ref}</p>
              </>
            );
            return (
              <div 
                key={d.kicker} 
                className={`px-8 py-10 transition-smooth ${d.link ? "hover:bg-gold/5 cursor-pointer" : ""}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {d.link ? (
                  <Link to={d.link.to} params={d.link.params} search={d.link.search} className="block animate-content-fade">
                    {inner}
                  </Link>
                ) : (
                  <div className="animate-content-fade">{inner}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Os pilares</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-12 max-w-3xl">
          Toda a fé católica, organizada para o seu estudo.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/5 border border-gold/10">
          {PILLARS.map((p, i) => (
            <Link
              key={p.to}
              to={p.to}
              className="group bg-background hover:bg-card/80 transition-smooth p-10 flex flex-col gap-6 animate-content-fade"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="size-12 rounded-full bg-gold/5 flex items-center justify-center group-hover:bg-gold/10 transition-smooth">
                <p.icon className="size-6 text-gold group-hover:scale-110 transition-smooth" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-gold transition-smooth">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{p.desc}</p>
              </div>
              <span className="mt-auto text-[9px] tracking-[0.4em] uppercase text-gold/50 group-hover:text-gold group-hover:translate-x-2 transition-smooth">
                Explorar →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial split */}
      <section className="bg-card border-y border-gold/20">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className="aspect-[4/5] bg-cover bg-center border border-gold/30"
            style={{ backgroundImage: `url(${maria})` }}
          />
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Maria, Mater Ecclesiae</p>
            <h2 className="font-display text-5xl md:text-7xl text-foreground leading-[0.9] tracking-tight">
              “Faça-se em mim <br/> <span className="text-gold">segundo a tua palavra.</span>”
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              A Virgem Maria é o caminho mais seguro a Cristo. Conheça os dogmas marianos,
              as aparições aprovadas pela Igreja, as ladainhas, o Rosário e a teologia da
              Mãe de Deus segundo os Padres e Doutores.
            </p>
            <Link
              to="/maria"
              className="inline-block mt-10 px-10 py-5 border border-gold/30 text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-deep transition-smooth hover:scale-105"
            >
              Estudar Mariologia
            </Link>
          </div>
        </div>
      </section>

      {/* AI feature */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${cristo})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
        <div className="relative max-w-5xl mx-auto px-6 py-32 md:py-48 text-center animate-content-fade">
          <div className="size-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-10 border border-gold/20 shadow-2xl shadow-gold/10">
            <Sparkles className="size-8 text-gold animate-pulse" />
          </div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold/60 mb-6">Sophia · Logos</p>
          <h2 className="font-display text-5xl md:text-8xl text-foreground leading-[0.85] tracking-tighter mb-10">
            Inteligência Artificial <br/> <em className="text-gold italic font-medium">ao serviço da Verdade</em>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Respostas fundamentadas na Bíblia, no Catecismo e nos documentos oficiais da
            Igreja — com citações, contexto e referências.
          </p>
          <Link
            to="/assistente"
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-gold text-deep text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-paper transition-colors"
          >
            <Sparkles className="size-4" /> Conversar agora
          </Link>
        </div>
      </section>
    </div>
  );
}
