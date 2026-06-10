import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Loader2, NotebookPen, Save } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getChapterMeta, markChapterRead, saveNote } from "@/lib/biblia.functions";

type Props = { book: string; chapter: number; bookName: string };

export function ChapterActions({ book, chapter, bookName }: Props) {
  const { user, loading } = useAuth();
  const qc = useQueryClient();
  const fetchMeta = useServerFn(getChapterMeta);
  const markRead = useServerFn(markChapterRead);
  const persistNote = useServerFn(saveNote);

  const queryKey = ["chapter-meta", book, chapter];
  const { data: meta } = useQuery({
    queryKey,
    queryFn: () => fetchMeta({ data: { book, chapter } }),
    enabled: !!user,
  });

  const [noteOpen, setNoteOpen] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  useEffect(() => {
    if (meta?.note != null) setNoteValue(meta.note);
  }, [meta?.note]);

  const markMutation = useMutation({
    mutationFn: () => markRead({ data: { book, chapter } }),
    onSuccess: (r) => {
      if (r.already_read) {
        toast(`${bookName} ${chapter} já estava marcado.`);
      } else {
        toast.success(`+${r.xp_gained} XP · ${r.total_read} capítulo(s) lido(s)`);
        r.new_achievements.forEach((a) =>
          toast.success(`Conquista: ${a.title}`, { description: a.description, duration: 6000 }),
        );
      }
      qc.invalidateQueries({ queryKey });
      qc.invalidateQueries({ queryKey: ["bible-progress"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro"),
  });

  const noteMutation = useMutation({
    mutationFn: () => persistNote({ data: { book, chapter, content: noteValue } }),
    onSuccess: () => {
      toast.success("Anotação salva.");
      qc.invalidateQueries({ queryKey });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro"),
  });

  if (loading) return null;
  if (!user) {
    return (
      <div className="mt-8 border border-gold/20 bg-card/40 p-5 flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-muted-foreground">
          Entre para marcar este capítulo como lido, salvar notas e favoritar versículos.
        </p>
        <Link to="/auth" className="px-4 py-2 bg-gold text-deep text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-paper">
          Entrar
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 border border-gold/25 bg-card/40 p-6 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => markMutation.mutate()}
          disabled={markMutation.isPending || meta?.read}
          className={
            "inline-flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] font-semibold border transition-colors disabled:opacity-60 " +
            (meta?.read
              ? "border-gold/40 text-gold bg-gold/10"
              : "border-gold bg-gold text-deep hover:bg-paper")
          }
        >
          {markMutation.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
          {meta?.read ? "Capítulo lido" : "Marcar como lido"}
        </button>
        <button
          type="button"
          onClick={() => setNoteOpen((v) => !v)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] border border-gold/30 text-foreground hover:border-gold hover:text-gold"
        >
          <NotebookPen className="size-3.5" />
          {meta?.note ? "Editar nota" : "Anotar capítulo"}
        </button>
        {meta?.bookmarks && meta.bookmarks.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {meta.bookmarks.length} versículo(s) favoritado(s)
          </span>
        )}
      </div>

      {noteOpen && (
        <div className="space-y-3 pt-2 border-t border-gold/10">
          <textarea
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            rows={5}
            maxLength={5000}
            placeholder="Suas reflexões sobre este capítulo (privado)..."
            className="w-full bg-background border border-gold/25 p-3 text-sm text-foreground focus:outline-none focus:border-gold resize-y"
          />
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted-foreground">{noteValue.length}/5000</span>
            <button
              type="button"
              onClick={() => noteMutation.mutate()}
              disabled={noteMutation.isPending}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-deep text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-paper disabled:opacity-60"
            >
              {noteMutation.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
