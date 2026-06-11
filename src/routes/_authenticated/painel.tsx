import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Sparkles, Flame, Trophy, BookOpen, Crown, Star, Loader2, Check, ChevronRight, Clock, Heart, CalendarDays, Target, Award,
} from "lucide-react";

import { toast } from "sonner";
import { getDashboard } from "@/lib/dashboard.functions";
import { getTodayJournal, saveJournalEntry } from "@/lib/diario.functions";
import { awardXp, XP_RULES } from "@/lib/xp.functions";
import { MarcarConcluidoButton } from "@/components/MarcarConcluidoButton";
import { santoDoDia, evangelhoDoDia, versoDoDia } from "@/lib/data/hoje";
import { leituraDoDia } from "@/lib/data/biblia/leituras";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


export const Route = createFileRoute("/_authenticated/painel")({
  head: () => ({ meta: [{ title: "Meu Painel — Portal Católico" }] }),
  component: PainelPage,
});

function PainelPage() {
  const fetchDashboard = useServerFn(getDashboard);
  const fetchJournal = useServerFn(getTodayJournal);
  const saveJournal = useServerFn(saveJournalEntry);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetchDashboard() });
  const { data: journal } = useQuery({ queryKey: ["journal-today"], queryFn: () => fetchJournal() });

  const [intention, setIntention] = useState("");
  const [reflection, setReflection] = useState("");
  const [minutes, setMinutes] = useState<number | "">("");

  useEffect(() => {
    if (journal) {
      setIntention(journal.intention ?? "");
      setReflection(journal.reflection ?? "");
      setMinutes(journal.prayer_minutes || "");
    }
  }, [journal]);

  // XP de login diário (idempotente)
  const fireLogin = useServerFn(awardXp);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fireLogin({ data: { kind: "login" } });
        if (!cancelled && res.awarded) {
          toast.success(`+${res.xp_gained} XP · Bem-vindo de volta`, {
            description: res.level_up ? `Subiu para o nível ${res.new_level}!` : undefined,
          });
          qc.invalidateQueries({ queryKey: ["dashboard"] });
        }
      } catch { /* silencioso */ }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const mutation = useMutation({
    mutationFn: () =>
      saveJournal({
        data: {
          intention,
          reflection,
          prayer_minutes: typeof minutes === "number" ? minutes : Number(minutes) || 0,
        },
      }),
    onSuccess: (result) => {
      if (result.was_new_today) {
        toast.success(`+${result.xp_gained} XP · Sequência de ${result.new_streak} dia(s)`);
        if (result.level_up) toast.success(`Subiu para o nível ${result.new_level}!`, { duration: 5000 });
        result.new_achievements.forEach((a) =>
          toast.success(`Conquista: ${a.title}`, { description: a.description, duration: 6000 }),
        );
      } else {
        toast("Diário atualizado. Pax tecum.", { icon: "🕊️" });
      }
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["journal-today"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro"),
  });

  if (isLoading || !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-gold" />
      </div>
    );
  }

  const hoje = new Date();
  const horas = hoje.getHours();
  const saudacao = horas < 12 ? "Bom dia" : horas < 18 ? "Boa tarde" : "Boa noite";
  const nome = data.profile.display_name || "Irmão(ã)";
  const santo = santoDoDia(hoje);
  const evangelho = evangelhoDoDia(hoje);
  const verso = versoDoDia(hoje);
  const leituraHoje = leituraDoDia(hoje);

  const todayStr = hoje.toISOString().slice(0, 10);
  const jaRezouHoje = data.progress.last_check_in === todayStr;

  const xpAtual = data.progress.xp;
  const proximoNivelXp = (data.progress.level) ** 2 * 50;
  const progressoNivel = Math.min(100, Math.round((xpAtual / proximoNivelXp) * 100));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
      {/* Saudação */}
      <header className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60">{saudacao}</p>
        <h1 className="mt-3 font-display text-4xl lg:text-6xl text-paper">
          {saudacao}, <span className="text-gold italic">{nome}</span>.
        </h1>
        <p className="mt-4 text-base text-paper/60 max-w-2xl">
          {jaRezouHoje
            ? `Você está há ${data.progress.current_streak} dia(s) rezando consecutivamente. Pax Christi.`
            : `Comece o dia com oração. ${data.progress.current_streak > 0 ? `Não quebre sua sequência de ${data.progress.current_streak} dia(s).` : "Faça seu primeiro check-in."}`}
        </p>
      </header>

      {/* Centro Espiritual */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60">Centro Espiritual</p>
            <h2 className="mt-2 font-display text-3xl text-paper">Sua jornada</h2>
          </div>
          <p className="text-xs text-paper/40">
            Membro há {data.member_days} {data.member_days === 1 ? "dia" : "dias"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard icon={Flame} label="Oração" value={data.progress.current_streak} suffix="dias seguidos" />
          <MetricCard icon={BookOpen} label="Bíblia" value={data.bible_reading_streak} suffix="dias seguidos" />
          <MetricCard icon={Star} label="XP" value={xpAtual} suffix={`Nível ${data.progress.level}`} />
          <MetricCard icon={Trophy} label="Medalhas" value={data.achievements_count} suffix="conquistas" />
          <MetricCard icon={CalendarDays} label="Capítulos" value={data.bible_chapters_read} suffix="lidos" />
          <MetricCard icon={Award} label="Melhor sequência" value={data.progress.best_streak} suffix="dias" />
        </div>

        {/* Meta semanal */}
        <div className="mt-6 glass p-6 border border-gold/15">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gold/70">
              <Target className="size-4" />
              <span className="text-[10px] uppercase tracking-[0.3em]">Meta semanal</span>
            </div>
            <span className="text-xs text-paper/60">
              {data.weekly_check_ins}/{data.weekly_goal} dias
            </span>
          </div>
          <div className="h-2 bg-gold/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-gold transition-all"
              style={{ width: `${Math.min(100, (data.weekly_check_ins / data.weekly_goal) * 100)}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-paper/50">
            {data.weekly_check_ins >= data.weekly_goal
              ? "Meta da semana cumprida. Deo gratias."
              : `Faltam ${data.weekly_goal - data.weekly_check_ins} dia(s) para completar a semana santa.`}
          </p>
        </div>

        {/* Medalhas */}
        {data.achievements.length > 0 && (
          <div className="mt-6 glass p-6 border border-gold/15">
            <div className="flex items-center gap-2 text-gold/70 mb-4">
              <Trophy className="size-4" />
              <span className="text-[10px] uppercase tracking-[0.3em]">Medalhas conquistadas</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {data.achievements.slice(0, 8).map((a) => (
                <div
                  key={a.code}
                  className={`p-4 border ${tierBorder(a.tier)} bg-deep/30 flex items-start gap-3`}
                  title={a.description}
                >
                  <div className={`text-2xl leading-none ${tierColor(a.tier)}`}>{a.icon ?? "✦"}</div>
                  <div className="min-w-0">
                    <p className="text-sm text-paper truncate">{a.title}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-paper/40 mt-0.5">{a.tier}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>


      {/* Diário Espiritual + Conquistas */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch">
        <form
          onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
          className="lg:col-span-2 glass p-8 border border-gold/15 flex flex-col"
        >
          <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Diário espiritual</p>
              <h2 className="mt-2 font-display text-2xl text-paper">Sua oração de hoje</h2>
              <p className="mt-1 text-sm text-paper/50">
                Registre intenção, reflexão e tempo de oração. Salvar mantém sua sequência e concede XP.
              </p>
            </div>
            {jaRezouHoje && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold border border-gold/30">
                <Check className="size-3.5" /> Rezou hoje
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <Label htmlFor="intention" className="text-[10px] uppercase tracking-[0.3em] text-paper/50">
                Intenção do dia
              </Label>
              <Input
                id="intention"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder="Por quem ou por quê você reza hoje?"
                maxLength={500}
                className="mt-2 bg-deep/40 border-gold/15 text-paper placeholder:text-paper/30 focus-visible:ring-gold/40"
              />
            </div>
            <div>
              <Label htmlFor="minutes" className="text-[10px] uppercase tracking-[0.3em] text-paper/50">
                <Clock className="inline size-3 mr-1 -mt-0.5" /> Minutos de oração
              </Label>
              <Input
                id="minutes"
                type="number"
                min={0}
                max={1440}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                placeholder="15"
                className="mt-2 bg-deep/40 border-gold/15 text-paper placeholder:text-paper/30 focus-visible:ring-gold/40"
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="reflection" className="text-[10px] uppercase tracking-[0.3em] text-paper/50">
              <Heart className="inline size-3 mr-1 -mt-0.5" /> Reflexão curta
            </Label>
            <Textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Uma palavra do Evangelho que tocou seu coração, uma graça, um pedido…"
              maxLength={2000}
              rows={4}
              className="mt-2 bg-deep/40 border-gold/15 text-paper placeholder:text-paper/30 focus-visible:ring-gold/40 resize-none"
            />
            <p className="mt-1 text-[10px] text-paper/30 text-right">{reflection.length}/2000</p>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="self-start inline-flex items-center gap-2 px-6 py-4 text-[11px] uppercase tracking-[0.3em] font-bold transition-premium bg-gold text-deep hover:bg-paper disabled:opacity-60"
          >
            {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {jaRezouHoje ? "Atualizar diário" : "Já rezei hoje"}
          </button>

          <div className="mt-8 grid grid-cols-3 gap-6 pt-6 border-t border-gold/10">
            <Stat icon={Flame} label="Sequência" value={data.progress.current_streak} suffix="dias" />
            <Stat icon={Star} label="XP" value={xpAtual} />
            <Stat icon={Crown} label="Nível" value={data.progress.level} />
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-paper/40 mb-2">
              <span>Próximo nível</span>
              <span>{progressoNivel}%</span>
            </div>
            <div className="h-1 bg-gold/10 overflow-hidden">
              <div className="h-full bg-gold transition-all" style={{ width: `${progressoNivel}%` }} />
            </div>
          </div>
        </form>

        <div className="glass p-8 border border-gold/15 flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Conquistas</p>
          <div className="mt-4 flex items-baseline gap-3">
            <Trophy className="size-8 text-gold self-center" />
            <span className="font-display text-5xl text-paper leading-none">{data.achievements_count}</span>
            <span className="text-sm text-paper/40">desbloqueadas</span>
          </div>
          <p className="mt-3 text-xs text-paper/50 leading-relaxed">
            Melhor sequência: {data.progress.best_streak} dia(s)
            <br />
            {data.progress.total_check_ins} check-in(s) totais
          </p>
          <div className="mt-auto pt-6 border-t border-gold/10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-2">Próxima meta</p>
            <p className="text-sm text-paper/80 leading-snug">{proximaMeta(data.progress.current_streak)}</p>
          </div>
        </div>
      </section>

      {/* Conteúdo do dia */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-stretch">
        <DailyCard
          kicker="Santo do dia"
          icon={Crown}
          title={santo.nome}
          subtitle={santo.data}
          body={santo.resumo}
        />
        <DailyCard
          kicker="Evangelho do dia"
          icon={BookOpen}
          title={evangelho.titulo}
          subtitle={`${evangelho.nome} ${evangelho.capitulo}${evangelho.vi ? `, ${evangelho.vi}-${evangelho.vf}` : ""}`}
          body={evangelho.texto}
          to="/biblia/$livro/$capitulo"
          params={{ livro: evangelho.livro, capitulo: String(evangelho.capitulo) }}
          cta="Ler na Bíblia"
        />
        <DailyCard
          kicker="Versículo"
          icon={Sparkles}
          title={`${verso.nome} ${verso.capitulo}, ${verso.vi}`}
          body={`"${verso.texto}"`}
        />
      </section>

      {/* Ação rápida: Evangelho lido + Regras de XP */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch">
        <div className="lg:col-span-2 glass p-7 border border-gold/15 flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Ação do dia</p>
          <h3 className="mt-2 font-display text-2xl text-paper">Já meditei no Evangelho de hoje</h3>
          <p className="mt-2 text-sm text-paper/60">
            {evangelho.nome} {evangelho.capitulo}{evangelho.vi ? `, ${evangelho.vi}-${evangelho.vf}` : ""}. Marque para registrar e ganhar XP.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <MarcarConcluidoButton
              kind="evangelho_dia"
              ref={hoje.toISOString().slice(0, 10)}
              label={`Marcar Evangelho lido (+${XP_RULES.evangelho_dia} XP)`}
              doneLabel="Evangelho de hoje registrado ✓"
            />
            <Link
              to="/biblia/$livro/$capitulo"
              params={{ livro: evangelho.livro, capitulo: String(evangelho.capitulo) }}
              className="inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.3em] border border-gold/30 text-gold hover:bg-gold/10 transition"
            >
              Abrir na Bíblia <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="glass p-7 border border-gold/15">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Como ganhar XP</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/70">
            <XpRule label="Login diário" xp={XP_RULES.login} />
            <XpRule label="Ler artigo" xp={XP_RULES.artigo} />
            <XpRule label="Evangelho do dia" xp={XP_RULES.evangelho_dia} />
            <XpRule label="Oração concluída" xp={XP_RULES.oracao} />
            <XpRule label="Novena concluída" xp={XP_RULES.novena} />
            <XpRule label="Curso finalizado" xp={XP_RULES.curso} />
          </ul>
        </div>
      </section>


      {/* Continue lendo */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="glass p-8 border border-gold/15 flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Continue a leitura</p>
          {data.last_reading ? (
            <>
              <h3 className="mt-3 font-display text-2xl text-paper capitalize">
                {data.last_reading.book_slug.replace(/(\d+)([a-z])/i, "$1 $2")}
              </h3>
              <p className="mt-1 text-sm text-paper/60">
                Último capítulo lido: {data.last_reading.chapter}
              </p>
              <Link
                to="/biblia/$livro/$capitulo"
                params={{ livro: data.last_reading.book_slug, capitulo: String(data.last_reading.chapter + 1) }}
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-paper transition"
              >
                Ler capítulo {data.last_reading.chapter + 1} <ChevronRight className="size-4" />
              </Link>
            </>
          ) : (
            <>
              <h3 className="mt-3 font-display text-2xl text-paper">Comece agora</h3>
              <p className="mt-1 text-sm text-paper/60">
                Sugestão de hoje: {leituraHoje.nome} {leituraHoje.capitulo} — {leituraHoje.tema}.
              </p>
              <Link
                to="/biblia/$livro/$capitulo"
                params={{ livro: leituraHoje.livro, capitulo: String(leituraHoje.capitulo) }}
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-paper transition"
              >
                Abrir leitura <ChevronRight className="size-4" />
              </Link>
            </>
          )}
        </div>

        <div className="glass p-8 border border-gold/15 flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Última reflexão</p>
          {journal?.reflection ? (
            <>
              <p className="mt-3 text-sm text-paper/80 italic leading-relaxed line-clamp-5">
                "{journal.reflection}"
              </p>
              {journal.intention && (
                <p className="mt-4 text-xs text-paper/50">
                  <span className="text-gold/70 uppercase tracking-[0.2em] text-[10px]">Intenção:</span>{" "}
                  {journal.intention}
                </p>
              )}
              <p className="mt-auto pt-6 text-[10px] uppercase tracking-[0.3em] text-paper/40">
                {journal.prayer_minutes} min de oração hoje
              </p>
            </>
          ) : (
            <>
              <h3 className="mt-3 font-display text-2xl text-paper">Diário vazio</h3>
              <p className="mt-1 text-sm text-paper/60">
                Registre acima a primeira reflexão do dia para começar seu diário espiritual.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, suffix }: { icon: typeof Sparkles; label: string; value: number; suffix?: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gold/60">
        <Icon className="size-4" />
        <span className="text-[10px] uppercase tracking-[0.3em]">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-3xl text-paper">{value}</span>
        {suffix && <span className="text-xs text-paper/40">{suffix}</span>}
      </div>
    </div>
  );
}

type DailyCardProps = {
  kicker: string;
  icon: typeof Sparkles;
  title: string;
  subtitle?: string;
  body: string;
  to?: "/biblia/$livro/$capitulo";
  params?: { livro: string; capitulo: string };
  cta?: string;
};

function DailyCard({ kicker, icon: Icon, title, subtitle, body, to, params, cta }: DailyCardProps) {
  return (
    <div className="glass p-7 border border-gold/15 flex flex-col h-full">
      <div className="flex items-center gap-3 text-gold/60">
        <Icon className="size-4" />
        <span className="text-[10px] uppercase tracking-[0.3em]">{kicker}</span>
      </div>
      <h3 className="mt-4 font-display text-xl text-paper">{title}</h3>
      {subtitle && <p className="mt-1 text-xs text-gold/60">{subtitle}</p>}
      <p className="mt-3 text-sm text-paper/60 leading-relaxed line-clamp-4 flex-1">{body}</p>
      {to && params && (
        <Link
          to={to}
          params={params}
          className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold hover:text-paper transition"
        >
          {cta} <ChevronRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}

function proximaMeta(streak: number): string {
  if (streak < 3) return `Três dias seguidos (${streak}/3)`;
  if (streak < 7) return `Uma semana santa (${streak}/7)`;
  if (streak < 30) return `Mês perseverante (${streak}/30)`;
  if (streak < 100) return `Cêntuplo de graças (${streak}/100)`;
  return "Você é exemplo de perseverança.";
}

function MetricCard({ icon: Icon, label, value, suffix }: { icon: typeof Sparkles; label: string; value: number; suffix?: string }) {
  return (
    <div className="glass p-4 border border-gold/15">
      <div className="flex items-center gap-2 text-gold/60">
        <Icon className="size-3.5" />
        <span className="text-[9px] uppercase tracking-[0.25em]">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl text-paper leading-none">{value}</p>
      {suffix && <p className="mt-1 text-[10px] text-paper/40">{suffix}</p>}
    </div>
  );
}

function tierBorder(tier: string): string {
  switch (tier) {
    case "gold": return "border-gold/50";
    case "silver": return "border-paper/30";
    case "platinum": return "border-blue-300/40";
    default: return "border-amber-700/40";
  }
}

function tierColor(tier: string): string {
  switch (tier) {
    case "gold": return "text-gold";
    case "silver": return "text-paper/80";
    case "platinum": return "text-blue-200";
    default: return "text-amber-500";
  }
}


function XpRule({ label, xp }: { label: string; xp: number }) {
  return (
    <li className="flex items-center justify-between border-b border-gold/10 pb-1.5">
      <span className="text-paper/70">{label}</span>
      <span className="text-gold font-semibold text-xs">+{xp} XP</span>
    </li>
  );
}
