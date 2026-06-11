import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { awardXp, XP_RULES, type XpKind } from "@/lib/xp.functions";

type Props = {
  kind: XpKind;
  ref?: string;
  label?: string;
  doneLabel?: string;
  className?: string;
};

export function MarcarConcluidoButton({ kind, ref, label, doneLabel, className }: Props) {
  const award = useServerFn(awardXp);
  const qc = useQueryClient();

  const mut = useMutation({
    mutationFn: () => award({ data: { kind, ref } }),
    onSuccess: (res) => {
      if (res.awarded) {
        toast.success(`+${res.xp_gained} XP`, {
          description: res.level_up ? `Subiu para o nível ${res.new_level}!` : undefined,
        });
        qc.invalidateQueries({ queryKey: ["dashboard"] });
      } else if (res.reason === "already_today") {
        toast("Já contabilizado hoje.", { icon: "✓" });
      }
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro"),
  });

  const xp = XP_RULES[kind];

  return (
    <button
      type="button"
      onClick={() => mut.mutate()}
      disabled={mut.isPending}
      className={
        className ??
        "inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.3em] font-bold bg-gold text-deep hover:bg-paper transition-premium disabled:opacity-60"
      }
    >
      {mut.isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Check className="size-4" />
      )}
      {mut.data?.awarded ? doneLabel ?? "Concluído" : label ?? `Marcar como concluído (+${xp} XP)`}
    </button>
  );
}
