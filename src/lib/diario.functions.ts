import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type JournalEntry = {
  id: string;
  entry_date: string;
  intention: string | null;
  reflection: string | null;
  prayer_minutes: number;
  mood: string | null;
  created_at: string;
  updated_at: string;
};

export type SaveJournalResult = {
  entry: JournalEntry;
  was_new_today: boolean;
  xp_gained: number;
  new_xp: number;
  new_level: number;
  level_up: boolean;
  new_streak: number;
  new_achievements: { code: string; title: string; description: string; tier: string }[];
};

function levelForXp(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export const getTodayJournal = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<JournalEntry | null> => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("prayer_journal")
      .select("id, entry_date, intention, reflection, prayer_minutes, mood, created_at, updated_at")
      .eq("user_id", userId)
      .eq("entry_date", todayISO())
      .maybeSingle();
    return data ?? null;
  });

export const getJournalHistory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<JournalEntry[]> => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("prayer_journal")
      .select("id, entry_date, intention, reflection, prayer_minutes, mood, created_at, updated_at")
      .eq("user_id", userId)
      .order("entry_date", { ascending: false })
      .limit(30);
    return data ?? [];
  });

export const saveJournalEntry = createServerFn({ method: "POST" })
  .inputValidator((d: { intention?: string; reflection?: string; prayer_minutes?: number; mood?: string }) => {
    const intention = (d.intention ?? "").toString().slice(0, 500).trim();
    const reflection = (d.reflection ?? "").toString().slice(0, 2000).trim();
    const mood = (d.mood ?? "").toString().slice(0, 40).trim();
    const minutes = Math.max(0, Math.min(1440, Math.floor(Number(d.prayer_minutes ?? 0) || 0)));
    return { intention, reflection, mood, prayer_minutes: minutes };
  })
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }): Promise<SaveJournalResult> => {
    const { supabase, userId } = context;
    const today = todayISO();

    // Verifica se já existia entrada hoje
    const { data: existing } = await supabase
      .from("prayer_journal")
      .select("id")
      .eq("user_id", userId)
      .eq("entry_date", today)
      .maybeSingle();
    const wasNewToday = !existing;

    // Upsert da entrada
    const { data: entry, error: upsertErr } = await supabase
      .from("prayer_journal")
      .upsert(
        {
          user_id: userId,
          entry_date: today,
          intention: data.intention || null,
          reflection: data.reflection || null,
          prayer_minutes: data.prayer_minutes,
          mood: data.mood || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,entry_date" },
      )
      .select("id, entry_date, intention, reflection, prayer_minutes, mood, created_at, updated_at")
      .single();
    if (upsertErr || !entry) throw new Error(upsertErr?.message ?? "Falha ao salvar diário");

    // Progresso atual
    const { data: current } = await supabase
      .from("user_progress")
      .select("xp, level, current_streak, best_streak, last_check_in, total_check_ins")
      .eq("user_id", userId)
      .single();

    let xpGained = 0;
    let newStreak = current?.current_streak ?? 0;
    let newXp = current?.xp ?? 0;
    let newLevel = current?.level ?? 1;
    let levelUp = false;
    const newAchievements: SaveJournalResult["new_achievements"] = [];

    if (wasNewToday) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      const prevStreak = current?.current_streak ?? 0;
      newStreak = current?.last_check_in === yesterdayStr ? prevStreak + 1 : 1;

      xpGained = 10 + Math.min(20, newStreak);
      if (data.reflection.length >= 20) xpGained += 5;
      if (data.intention.length >= 5) xpGained += 5;
      if (data.prayer_minutes >= 15) xpGained += 5;

      newXp = (current?.xp ?? 0) + xpGained;
      const oldLevel = current?.level ?? 1;
      newLevel = levelForXp(newXp);
      levelUp = newLevel > oldLevel;
      const bestStreak = Math.max(current?.best_streak ?? 0, newStreak);
      const totalCheckIns = (current?.total_check_ins ?? 0) + 1;

      await supabase
        .from("user_progress")
        .update({
          xp: newXp,
          level: newLevel,
          current_streak: newStreak,
          best_streak: bestStreak,
          last_check_in: today,
          total_check_ins: totalCheckIns,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      await supabase.from("xp_events").insert({
        user_id: userId,
        kind: "journal_entry",
        amount: xpGained,
        metadata: {
          streak: newStreak,
          minutes: data.prayer_minutes,
          has_reflection: data.reflection.length >= 20,
          has_intention: data.intention.length >= 5,
        },
      });

      // Candidatas a conquistas
      const candidates: string[] = ["first_check_in", "journal_first"];
      if (newStreak >= 3) candidates.push("streak_3");
      if (newStreak >= 7) candidates.push("streak_7");
      if (newStreak >= 30) candidates.push("streak_30");
      if (newStreak >= 100) candidates.push("streak_100");
      if (data.prayer_minutes >= 60) candidates.push("prayer_60min");

      // journal_week / journal_month: contar entradas totais
      const { count: journalCount } = await supabase
        .from("prayer_journal")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId);
      if ((journalCount ?? 0) >= 7) candidates.push("journal_week");
      if ((journalCount ?? 0) >= 30) candidates.push("journal_month");

      const { data: alreadyUnlocked } = await supabase
        .from("user_achievements")
        .select("achievement_code")
        .eq("user_id", userId)
        .in("achievement_code", candidates);
      const unlockedSet = new Set((alreadyUnlocked ?? []).map((r) => r.achievement_code));
      const toUnlock = candidates.filter((c) => !unlockedSet.has(c));

      if (toUnlock.length > 0) {
        await supabase
          .from("user_achievements")
          .insert(toUnlock.map((code) => ({ user_id: userId, achievement_code: code })));
        const { data: details } = await supabase
          .from("achievements")
          .select("code, title, description, tier")
          .in("code", toUnlock);
        details?.forEach((d) => newAchievements.push(d));
      }
    }

    return {
      entry: entry as JournalEntry,
      was_new_today: wasNewToday,
      xp_gained: xpGained,
      new_xp: newXp,
      new_level: newLevel,
      level_up: levelUp,
      new_streak: newStreak,
      new_achievements: newAchievements,
    };
  });
