import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { getChapterMeta, toggleBookmark } from "@/lib/biblia.functions";

type Props = { book: string; chapter: number; verse: number; verseText: string };

export function VerseBookmarkButton({ book, chapter, verse, verseText }: Props) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const fetchMeta = useServerFn(getChapterMeta);
  const toggle = useServerFn(toggleBookmark);

  const queryKey = ["chapter-meta", book, chapter];
  const { data: meta } = useQuery({
    queryKey,
    queryFn: () => fetchMeta({ data: { book, chapter } }),
    enabled: !!user,
  });
  const isMarked = meta?.bookmarks.some((b) => b.verse === verse) ?? false;

  const mutation = useMutation({
    mutationFn: () => toggle({ data: { book, chapter, verse, verse_text: verseText } }),
    onSuccess: (r) => {
      toast.success(r.bookmarked ? "Versículo favoritado." : "Favorito removido.");
      qc.invalidateQueries({ queryKey });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro"),
  });

  if (!user) return null;
  return (
    <button
      type="button"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      aria-label={isMarked ? "Remover favorito" : "Favoritar versículo"}
      className={
        "opacity-0 group-hover:opacity-100 transition-opacity p-1 -ml-1 " +
        (isMarked ? "text-gold opacity-100" : "text-muted-foreground hover:text-gold")
      }
    >
      {isMarked ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
    </button>
  );
}
