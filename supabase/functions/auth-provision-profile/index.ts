// Edge Function: auth-provision-profile
// Recebe eventos de Auth Hook (Send Webhook) do Supabase e provisiona
// automaticamente um registro em `profiles` e `user_progress` para o usuário.
//
// Configure como Auth Hook do tipo "Send HTTP Hook" no painel do backend,
// apontando para a URL desta função. O hook envia um header
// `webhook-signature` (HMAC) — defina o secret em AUTH_HOOK_SECRET.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const HOOK_SECRET = Deno.env.get("AUTH_HOOK_SECRET") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, webhook-signature, webhook-id, webhook-timestamp",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function verifySignature(body: string, signature: string | null): Promise<boolean> {
  if (!HOOK_SECRET) return true; // sem secret configurado, aceita (use apenas em dev)
  if (!signature) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(HOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // comparação em tempo constante
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const raw = await req.text();
  const sig = req.headers.get("webhook-signature");
  const ok = await verifySignature(raw, sig);
  if (!ok) {
    return new Response(JSON.stringify({ error: "invalid signature" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: any;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // O hook do Supabase entrega: { type, record: { id, email, raw_user_meta_data, ... } }
  // Aceita também formato alternativo { user: {...} }.
  const user = payload?.record ?? payload?.user ?? payload;
  const userId: string | undefined = user?.id;
  const email: string | undefined = user?.email;
  const displayName: string =
    user?.raw_user_meta_data?.display_name ??
    user?.user_metadata?.display_name ??
    (email ? email.split("@")[0] : "Usuário");

  if (!userId) {
    return new Response(JSON.stringify({ error: "missing user id" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: profileErr } = await admin
    .from("profiles")
    .upsert({ id: userId, display_name: displayName }, { onConflict: "id" });

  if (profileErr) {
    console.error("profile upsert failed", profileErr);
    return new Response(JSON.stringify({ error: profileErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { error: progressErr } = await admin
    .from("user_progress")
    .upsert({ user_id: userId }, { onConflict: "user_id" });

  if (progressErr) {
    console.error("user_progress upsert failed", progressErr);
    return new Response(JSON.stringify({ error: progressErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, userId }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
