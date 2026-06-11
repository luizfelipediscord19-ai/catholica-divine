import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

function serverAuthClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Configuração de autenticação indisponível.");
  }
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const signupSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
  displayName: z.string().trim().max(80).optional(),
  redirectTo: z.string().url().max(2048),
});

export const signUpWithEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => signupSchema.parse(input))
  .handler(async ({ data }) => {
    const auth = serverAuthClient();
    const { data: result, error } = await auth.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: data.redirectTo,
        data: { display_name: data.displayName || data.email.split("@")[0] },
      },
    });
    if (error) throw error;
    return {
      ok: true,
      needsEmailConfirmation: !result.session,
      session: result.session
        ? {
            access_token: result.session.access_token,
            refresh_token: result.session.refresh_token,
          }
        : null,
    };
  });

const signinSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(128),
});

export const signInWithEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => signinSchema.parse(input))
  .handler(async ({ data }) => {
    const auth = serverAuthClient();
    const { data: result, error } = await auth.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    if (!result.session) {
      throw new Error("Sessão não pôde ser criada.");
    }
    return {
      ok: true,
      session: {
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token,
      },
    };
  });

const resetSchema = z.object({
  email: z.string().trim().email().max(255),
  redirectTo: z.string().url().max(2048),
});

export const requestPasswordReset = createServerFn({ method: "POST" })
  .inputValidator((input) => resetSchema.parse(input))
  .handler(async ({ data }) => {
    const auth = serverAuthClient();
    const { error } = await auth.auth.resetPasswordForEmail(data.email, {
      redirectTo: data.redirectTo,
    });
    if (error) throw error;
    return { ok: true };
  });
