import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getBibleProgress } from "@/lib/biblia.functions";
import { BookOpen } from "lucide-react";

export function BibleProgressBar({ bookSlug }: { bookSlug?: string }) {
  const { user, loading } = useAuth();
  const fetchProgress = useServerFn(getBibleProgress);
  const { data } = useQuery({
    queryKey: ["bible-progress"],
    queryFn: () => fetchProgress(),
    enabled: !!user,
  });

  if (loading) return null;
  if (!user) {
    return (
      <div className="border border-gold/20 bg-card/40 p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <BookOpen className="size-4 text-gold" />
          <span>Entre para registrar sua leitura e ganhar XP/conquistas.</span>
        </div>
        <Link to="/auth" className="text-[10px] uppercase tracking-[0.25em] px-4 py-2 bg-gold text-deep font-medium hover:bg-paper transition-colors">
          Entrar
        </Link>
      </div>
    );
  }
  if (!data) {
    return <div className="h-16 border border-gold/10 bg-card/20 animate-pulse" />;
  }

  if (bookSlug) {
    const read = data.by_book[bookSlug]?.length ?? 0;
    return <Bar label="Progresso neste livro" read={read} total={undefined} bookSlug={bookSlug} byBook={data.by_book} />;
  }

  const pct = data.total_chapters > 0 ? (data.total_read / data.total_chapters) * 100 : 0;
  return (
    <div className="border border-gold/25 bg-card/40 p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Seu progresso na Bíblia</div>
        <div className="text-sm text-foreground/80">
          <span className="font-display text-gold">{data.total_read}</span> de {data.total_chapters} capítulos · {pct.toFixed(1)}%
        </div>
      </div>
      <div className="h-2 bg-background border border-gold/15 overflow-hidden">
        <div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Bar({ label, read, bookSlug, byBook }: {
  label: string; read: number; total?: number; bookSlug: string;
  byBook: Record<string, number[]>;
}) {
  void byBook;
  return (
    <div className="border border-gold/25 bg-card/40 p-5">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{label}</div>
        <div className="text-sm text-foreground/80">
          <span className="font-display text-gold">{read}</span> capítulo(s) lido(s)
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Livro: {bookSlug}</p>
    </div>
  );
}
