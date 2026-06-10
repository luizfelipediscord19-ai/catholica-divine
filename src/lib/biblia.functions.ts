import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type BibleProgress = {
  total_read: number;
  total_chapters: number;
  by_book: Record<string, number[]>; // slug -> capítulos lidos
};

export const getBibleProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<BibleProgress> => {
    const { supabase, userId } = context;
    const [{ data: progress }, { data: books }] = await Promise.all([
      supabase.from("reading_progress").select("book_slug, chapter").eq("user_id", userId),
      supabase.from("bible_books").select("chapter_count"),
    ]);
    const by_book: Record<string, number[]> = {};
    for (const row of progress ?? []) {
      (by_book[row.book_slug] ??= []).push(row.chapter);
    }
    for (const k of Object.keys(by_book)) by_book[k].sort((a, b) => a - b);
    const total_chapters = (books ?? []).reduce((s, b) => s + b.chapter_count, 0);
    const total_read = (progress ?? []).length;
    return { total_read, total_chapters, by_book };
  });

export type ChapterMeta = {
  read: boolean;
  note: string | null;
  bookmarks: { verse: number; verse_text: string | null; note: string | null }[];
};

const inputBookChapter = (raw: unknown) => {
  const o = raw as { book: string; chapter: number };
  if (!o?.book || !Number.isFinite(o?.chapter)) throw new Error("Parâmetros inválidos");
  return { book: o.book, chapter: Math.floor(o.chapter) };
};

export const getChapterMeta = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(inputBookChapter)
  .handler(async ({ context, data }): Promise<ChapterMeta> => {
    const { supabase, userId } = context;
    const [{ data: r }, { data: n }, { data: bm }] = await Promise.all([
      supabase.from("reading_progress").select("chapter").eq("user_id", userId)
        .eq("book_slug", data.book).eq("chapter", data.chapter).maybeSingle(),
      supabase.from("bible_notes").select("content").eq("user_id", userId)
        .eq("book_slug", data.book).eq("chapter", data.chapter).maybeSingle(),
      supabase.from("bible_bookmarks").select("verse, verse_text, note").eq("user_id", userId)
        .eq("book_slug", data.book).eq("chapter", data.chapter).order("verse"),
    ]);
    return {
      read: !!r,
      note: n?.content ?? null,
      bookmarks: bm ?? [],
    };
  });

export type MarkReadResult = {
  already_read: boolean;
  xp_gained: number;
  total_read: number;
  new_achievements: { code: string; title: string; description: string; tier: string }[];
};

export const markChapterRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(inputBookChapter)
  .handler(async ({ context, data }): Promise<MarkReadResult> => {
    const { supabase, userId } = context;

    // Já lido?
    const { data: existing } = await supabase.from("reading_progress")
      .select("chapter").eq("user_id", userId)
      .eq("book_slug", data.book).eq("chapter", data.chapter).maybeSingle();
    if (existing) {
      const { count } = await supabase.from("reading_progress")
        .select("chapter", { count: "exact", head: true }).eq("user_id", userId);
      return { already_read: true, xp_gained: 0, total_read: count ?? 0, new_achievements: [] };
    }

    await supabase.from("reading_progress").insert({
      user_id: userId, book_slug: data.book, chapter: data.chapter,
    });

    const xp = 5;
    const { data: prog } = await supabase.from("user_progress")
      .select("xp").eq("user_id", userId).single();
    const newXp = (prog?.xp ?? 0) + xp;
    await supabase.from("user_progress")
      .update({ xp: newXp, updated_at: new Date().toISOString() })
      .eq("user_id", userId);
    await supabase.from("xp_events").insert({
      user_id: userId, kind: "chapter_read", amount: xp,
      metadata: { book: data.book, chapter: data.chapter },
    });

    // Total + por livro
    const { data: allReads } = await supabase.from("reading_progress")
      .select("book_slug, chapter").eq("user_id", userId);
    const total = allReads?.length ?? 0;
    const perBook = new Map<string, Set<number>>();
    for (const r of allReads ?? []) {
      if (!perBook.has(r.book_slug)) perBook.set(r.book_slug, new Set());
      perBook.get(r.book_slug)!.add(r.chapter);
    }

    const { data: books } = await supabase.from("bible_books")
      .select("slug, testament, chapter_count");

    const candidates: string[] = [];
    if (total >= 1) candidates.push("bible_first_chapter");
    if (total >= 10) candidates.push("bible_10_chapters");
    if (total >= 50) candidates.push("bible_50_chapters");
    if (total >= 100) candidates.push("bible_100_chapters");

    const isBookComplete = (slug: string) => {
      const b = books?.find((x) => x.slug === slug);
      return !!b && (perBook.get(slug)?.size ?? 0) >= b.chapter_count;
    };
    if (isBookComplete("joao")) candidates.push("bible_book_joao");
    if (isBookComplete("salmos")) candidates.push("bible_book_salmos");

    const ntBooks = (books ?? []).filter((b) => b.testament === "NT");
    const ntComplete = ntBooks.every((b) => (perBook.get(b.slug)?.size ?? 0) >= b.chapter_count);
    if (ntComplete) candidates.push("bible_nt_complete");

    const allComplete = (books ?? []).every((b) => (perBook.get(b.slug)?.size ?? 0) >= b.chapter_count);
    if (allComplete) candidates.push("bible_complete");

    const { data: have } = await supabase.from("user_achievements")
      .select("achievement_code").eq("user_id", userId).in("achievement_code", candidates);
    const haveSet = new Set((have ?? []).map((r) => r.achievement_code));
    const toUnlock = candidates.filter((c) => !haveSet.has(c));
    let unlockedDetails: MarkReadResult["new_achievements"] = [];
    if (toUnlock.length > 0) {
      await supabase.from("user_achievements")
        .insert(toUnlock.map((code) => ({ user_id: userId, achievement_code: code })));
      const { data: details } = await supabase.from("achievements")
        .select("code, title, description, tier").in("code", toUnlock);
      unlockedDetails = details ?? [];
    }

    return { already_read: false, xp_gained: xp, total_read: total, new_achievements: unlockedDetails };
  });

const inputBookmark = (raw: unknown) => {
  const o = raw as { book: string; chapter: number; verse: number; verse_text?: string };
  if (!o?.book || !Number.isFinite(o?.chapter) || !Number.isFinite(o?.verse))
    throw new Error("Parâmetros inválidos");
  return {
    book: o.book,
    chapter: Math.floor(o.chapter),
    verse: Math.floor(o.verse),
    verse_text: (o.verse_text ?? "").slice(0, 1000) || null,
  };
};

export const toggleBookmark = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(inputBookmark)
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase.from("bible_bookmarks")
      .select("id").eq("user_id", userId).eq("book_slug", data.book)
      .eq("chapter", data.chapter).eq("verse", data.verse).maybeSingle();
    if (existing) {
      await supabase.from("bible_bookmarks").delete().eq("id", existing.id);
      return { bookmarked: false };
    }
    await supabase.from("bible_bookmarks").insert({
      user_id: userId, book_slug: data.book, chapter: data.chapter,
      verse: data.verse, verse_text: data.verse_text,
    });
    return { bookmarked: true };
  });

export const listBookmarks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("bible_bookmarks")
      .select("book_slug, chapter, verse, verse_text, note, created_at")
      .eq("user_id", userId).order("created_at", { ascending: false });
    return data ?? [];
  });

const inputNote = (raw: unknown) => {
  const o = raw as { book: string; chapter: number; content: string };
  if (!o?.book || !Number.isFinite(o?.chapter)) throw new Error("Parâmetros inválidos");
  return {
    book: o.book,
    chapter: Math.floor(o.chapter),
    content: String(o.content ?? "").slice(0, 5000),
  };
};

export const saveNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(inputNote)
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    if (!data.content.trim()) {
      await supabase.from("bible_notes").delete().eq("user_id", userId)
        .eq("book_slug", data.book).eq("chapter", data.chapter);
      return { ok: true, content: "" };
    }
    await supabase.from("bible_notes").upsert(
      { user_id: userId, book_slug: data.book, chapter: data.chapter, content: data.content },
      { onConflict: "user_id,book_slug,chapter" },
    );
    return { ok: true, content: data.content };
  });
