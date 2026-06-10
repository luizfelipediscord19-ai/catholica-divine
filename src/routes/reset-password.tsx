import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{ title: "Redefinir senha — Portal Católico" }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Senha atualizada com sucesso.");
      navigate({ to: "/painel" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar senha");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex size-14 rounded-full border border-gold/30 items-center justify-center mb-4">
            <KeyRound className="size-6 text-gold" />
          </div>
          <h1 className="font-display text-3xl text-foreground">Nova senha</h1>
          <p className="mt-2 text-sm text-muted-foreground">Defina sua nova senha de acesso.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 glass p-8 border border-gold/15">
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-paper/60 font-bold">Nova senha</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-transparent border-b border-gold/20 py-3 text-paper focus:outline-none focus:border-gold transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold text-deep text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-paper transition-premium disabled:opacity-50"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            Atualizar senha
          </button>
        </form>
      </div>
    </div>
  );
}
