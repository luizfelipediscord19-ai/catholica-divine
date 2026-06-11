import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Garante que o usuário tem profile + user_progress criados.
// Chamado após signup e no carregamento do dashboard (idempotente).
export const ensureUserSetup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId, claims } = context;

    const email = (claims as { email?: string }).email ?? "";
    const defaultName =
      (claims as { user_metadata?: { display_name?: string } }).user_metadata
        ?.display_name ?? email.split("@")[0] ?? "Irmão(ã)";

    await supabase
      .from("profiles")
      .upsert({ id: userId, display_name: defaultName }, { onConflict: "id", ignoreDuplicates: true });

    await supabase
      .from("user_progress")
      .upsert({ user_id: userId }, { onConflict: "user_id", ignoreDuplicates: true });

    return { ok: true };
  });

export type DashboardData = {
  profile: { display_name: string | null; created_at: string };
  progress: {
    xp: number;
    level: number;
    current_streak: number;
    best_streak: number;
    last_check_in: string | null;
    total_check_ins: number;
  };
  last_reading: { book_slug: string; chapter: number; read_at: string } | null;
  achievements_count: number;
  achievements: { code: string; title: string; description: string; tier: string; icon: string | null; unlocked_at: string }[];
  weekly_check_ins: number;
  weekly_goal: number;
  bible_reading_streak: number;
  bible_chapters_read: number;
  member_days: number;
};


export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DashboardData> => {
    const { supabase, userId, claims } = context;

    // Garante setup (idempotente, custo baixo)
    const email = (claims as { email?: string }).email ?? "";
    const defaultName = email.split("@")[0] || "Irmão(ã)";
    await supabase
      .from("profiles")
      .upsert({ id: userId, display_name: defaultName }, { onConflict: "id", ignoreDuplicates: true });
    await supabase
      .from("user_progress")
      .upsert({ user_id: userId }, { onConflict: "user_id", ignoreDuplicates: true });

    const [{ data: profile }, { data: progress }, { data: lastReading }, { count: achCount }] =
      await Promise.all([
        supabase.from("profiles").select("display_name, created_at").eq("id", userId).single(),
        supabase
          .from("user_progress")
          .select("xp, level, current_streak, best_streak, last_check_in, total_check_ins")
          .eq("user_id", userId)
          .single(),
        supabase
          .from("reading_progress")
          .select("book_slug, chapter, read_at")
          .eq("user_id", userId)
          .order("read_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("user_achievements")
          .select("achievement_code", { count: "exact", head: true })
          .eq("user_id", userId),
      ]);

    return {
      profile: {
        display_name: profile?.display_name ?? "Irmão(ã)",
        created_at: profile?.created_at ?? new Date().toISOString(),
      },
      progress: {
        xp: progress?.xp ?? 0,
        level: progress?.level ?? 1,
        current_streak: progress?.current_streak ?? 0,
        best_streak: progress?.best_streak ?? 0,
        last_check_in: progress?.last_check_in ?? null,
        total_check_ins: progress?.total_check_ins ?? 0,
      },
      last_reading: lastReading
        ? { book_slug: lastReading.book_slug, chapter: lastReading.chapter, read_at: lastReading.read_at }
        : null,
      achievements_count: achCount ?? 0,
    };
  });

function levelForXp(xp: number): number {
  // 100 XP por nível, com crescimento leve
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

export type CheckInResult = {
  already_checked_in: boolean;
  xp_gained: number;
  new_xp: number;
  new_streak: number;
  new_level: number;
  level_up: boolean;
  new_achievements: { code: string; title: string; description: string; tier: string }[];
};

export const performCheckIn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CheckInResult> => {
    const { supabase, userId } = context;

    const { data: current } = await supabase
      .from("user_progress")
      .select("xp, level, current_streak, best_streak, last_check_in, total_check_ins")
      .eq("user_id", userId)
      .single();

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (current?.last_check_in === todayStr) {
      return {
        already_checked_in: true,
        xp_gained: 0,
        new_xp: current.xp,
        new_streak: current.current_streak,
        new_level: current.level,
        level_up: false,
        new_achievements: [],
      };
    }

    const prevStreak = current?.current_streak ?? 0;
    const newStreak = current?.last_check_in === yesterdayStr ? prevStreak + 1 : 1;
    const xpGained = 10 + Math.min(20, newStreak); // bônus por sequência
    const newXp = (current?.xp ?? 0) + xpGained;
    const oldLevel = current?.level ?? 1;
    const newLevel = levelForXp(newXp);
    const bestStreak = Math.max(current?.best_streak ?? 0, newStreak);
    const totalCheckIns = (current?.total_check_ins ?? 0) + 1;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await supabaseAdmin
      .from("user_progress")
      .update({
        xp: newXp,
        level: newLevel,
        current_streak: newStreak,
        best_streak: bestStreak,
        last_check_in: todayStr,
        total_check_ins: totalCheckIns,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    await supabaseAdmin.from("xp_events").insert({
      user_id: userId,
      kind: "daily_check_in",
      amount: xpGained,
      metadata: { streak: newStreak },
    });

    // Conquistas baseadas em sequência
    const candidates: string[] = ["first_check_in"];
    if (newStreak >= 3) candidates.push("streak_3");
    if (newStreak >= 7) candidates.push("streak_7");
    if (newStreak >= 30) candidates.push("streak_30");
    if (newStreak >= 100) candidates.push("streak_100");

    const { data: alreadyUnlocked } = await supabase
      .from("user_achievements")
      .select("achievement_code")
      .eq("user_id", userId)
      .in("achievement_code", candidates);

    const unlockedSet = new Set((alreadyUnlocked ?? []).map((r) => r.achievement_code));
    const toUnlock = candidates.filter((c) => !unlockedSet.has(c));

    let newAchievements: CheckInResult["new_achievements"] = [];
    if (toUnlock.length > 0) {
      await supabaseAdmin
        .from("user_achievements")
        .insert(toUnlock.map((code) => ({ user_id: userId, achievement_code: code })));

      const { data: details } = await supabase
        .from("achievements")
        .select("code, title, description, tier")
        .in("code", toUnlock);
      newAchievements = details ?? [];
    }

    return {
      already_checked_in: false,
      xp_gained: xpGained,
      new_xp: newXp,
      new_streak: newStreak,
      new_level: newLevel,
      level_up: newLevel > oldLevel,
      new_achievements: newAchievements,
    };
  });
