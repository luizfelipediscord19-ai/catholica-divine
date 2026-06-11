import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const XP_RULES = {
  login: 5,
  artigo: 10,
  evangelho_dia: 15,
  oracao: 10,
  novena: 50,
  curso: 200,
} as const;

export type XpKind = keyof typeof XP_RULES;

const ALLOWED: XpKind[] = ["login", "artigo", "evangelho_dia", "oracao", "novena", "curso"];

export type AwardXpResult = {
  awarded: boolean;
  reason?: "already_today" | "invalid_kind";
  xp_gained: number;
  new_xp: number;
  new_level: number;
  level_up: boolean;
  kind: XpKind | null;
};

function levelForXp(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

const inputAward = (raw: unknown) => {
  const o = (raw ?? {}) as { kind?: string; ref?: string };
  return {
    kind: String(o.kind ?? "") as XpKind,
    ref: o.ref ? String(o.ref).slice(0, 120) : null,
  };
};

export const awardXp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(inputAward)
  .handler(async ({ context, data }): Promise<AwardXpResult> => {
    const { supabase, userId } = context;

    if (!ALLOWED.includes(data.kind)) {
      return {
        awarded: false,
        reason: "invalid_kind",
        xp_gained: 0,
        new_xp: 0,
        new_level: 1,
        level_up: false,
        kind: null,
      };
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Idempotência diária por (kind, ref)
    const { data: existing } = await supabase
      .from("xp_events")
      .select("id, metadata")
      .eq("user_id", userId)
      .eq("kind", data.kind)
      .gte("created_at", todayStart.toISOString());

    const dupKey = data.ref ?? "_";
    const already = (existing ?? []).some((e) => {
      const m = (e.metadata as { ref?: string } | null) ?? {};
      return (m.ref ?? "_") === dupKey;
    });

    const { data: prog } = await supabase
      .from("user_progress")
      .select("xp, level")
      .eq("user_id", userId)
      .single();

    if (already) {
      return {
        awarded: false,
        reason: "already_today",
        xp_gained: 0,
        new_xp: prog?.xp ?? 0,
        new_level: prog?.level ?? 1,
        level_up: false,
        kind: data.kind,
      };
    }

    const amount = XP_RULES[data.kind];
    const oldXp = prog?.xp ?? 0;
    const oldLevel = prog?.level ?? 1;
    const newXp = oldXp + amount;
    const newLevel = levelForXp(newXp);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("user_progress")
      .update({ xp: newXp, level: newLevel, updated_at: new Date().toISOString() })
      .eq("user_id", userId);
    await supabaseAdmin.from("xp_events").insert({
      user_id: userId,
      kind: data.kind,
      amount,
      metadata: data.ref ? { ref: data.ref } : {},
    });

    return {
      awarded: true,
      xp_gained: amount,
      new_xp: newXp,
      new_level: newLevel,
      level_up: newLevel > oldLevel,
      kind: data.kind,
    };
  });
