import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Sparkles, Flame, Trophy, BookOpen, Crown, Star, Loader2, Check, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { getDashboard, performCheckIn } from "@/lib/dashboard.functions";
import { santoDoDia, evangelhoDoDia, versoDoDia } from "@/lib/data/hoje";
import { leituraDoDia } from "@/lib/data/biblia/leituras";

export const Route = createFileRoute("/_authenticated/painel")({
  head: () => ({
    meta: [{ title: "Meu Painel — Portal Católico" }],
  }),
  component: PainelPage,
});

function PainelPage() {
  const fetchDashboard = useServerFn(getDashboard);
  const checkIn = useServerFn(performCheckIn);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboard(),
  });

  const checkInMutation = useMutation({
    mutationFn: () => checkIn(),
    onSuccess: (result) => {
      if (result.already_checked_in) {
        toast("Você já rezou hoje. Pax tecum.", { icon: "🕊️" });
      } else {
        toast.success(`+${result.xp_gained} XP · Sequência de ${result.new_streak} dia(s)`);
        if (result.level_up) {
          toast.success(`Subiu para o nível ${result.new_level}!`, { duration: 5000 });
        }
        result.new_achievements.forEach((a) => {
          toast.success(`Conquista desbloqueada: ${a.title}`, {
            description: a.description, duration: 6000,
          });
        });
      }
      qc.invalidateQueries({ queryKey: ["dashboard"] });
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

      {/* Check-in + Progresso */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 glass p-8 border border-gold/15">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Check-in diário</p>
              <h2 className="mt-2 font-display text-2xl text-paper">Já rezei hoje</h2>
              <p className="mt-1 text-sm text-paper/50">
                Marque sua oração diária para manter a sequência e ganhar XP.
              </p>
            </div>
            <button
              onClick={() => checkInMutation.mutate()}
              disabled={checkInMutation.isPending || jaRezouHoje}
              className={`inline-flex items-center gap-2 px-6 py-4 text-[11px] uppercase tracking-[0.3em] font-bold transition-premium ${
                jaRezouHoje
                  ? "bg-paper/5 text-paper/40 border border-gold/10"
                  : "bg-gold text-deep hover:bg-paper"
              }`}
            >
              {checkInMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : jaRezouHoje ? (
                <Check className="size-4" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {jaRezouHoje ? "Feito hoje" : "Já rezei hoje"}
            </button>
          </div>

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
        </div>

        <div className="glass p-8 border border-gold/15 flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Conquistas</p>
          <div className="mt-4 flex items-baseline gap-3">
            <Trophy className="size-8 text-gold" />
            <span className="font-display text-5xl text-paper">{data.achievements_count}</span>
            <span className="text-sm text-paper/40">desbloqueadas</span>
          </div>
          <p className="mt-2 text-xs text-paper/50">
            Melhor sequência: {data.progress.best_streak} dia(s) · {data.progress.total_check_ins} check-in(s) totais
          </p>
          <p className="mt-auto pt-6 text-xs text-paper/40">
            Em breve: vitrine de medalhas no perfil.
          </p>
        </div>
      </section>

      {/* Conteúdo do dia */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

      {/* Continue lendo / Próxima meta */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-8 border border-gold/15">
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
                params={{
                  livro: data.last_reading.book_slug,
                  capitulo: String(data.last_reading.chapter + 1),
                }}
                className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-paper transition"
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
                className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-paper transition"
              >
                Abrir leitura <ChevronRight className="size-4" />
              </Link>
            </>
          )}
        </div>

        <div className="glass p-8 border border-gold/15">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Próxima meta</p>
          <h3 className="mt-3 font-display text-2xl text-paper">
            {proximaMeta(data.progress.current_streak)}
          </h3>
          <p className="mt-1 text-sm text-paper/60">
            Continue rezando todos os dias para desbloquear novas conquistas.
          </p>
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
    <div className="glass p-7 border border-gold/15 flex flex-col">
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
  if (streak < 3) return `Alcançar 3 dias seguidos (${streak}/3)`;
  if (streak < 7) return `Completar uma semana santa (${streak}/7)`;
  if (streak < 30) return `Mês perseverante (${streak}/30)`;
  if (streak < 100) return `Cêntuplo de graças (${streak}/100)`;
  return "Você é um exemplo de perseverança.";
}
