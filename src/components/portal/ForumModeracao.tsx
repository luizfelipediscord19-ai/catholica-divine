import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Flag, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";

import { Painel, Rotulo, botaoClass, botaoGhostClass, inputClass } from "@/components/portal/comuns";
import { garantirTokenAgora } from "@/hooks/use-identidade";
import { MOTIVOS_DENUNCIA, REGRAS_FORUM } from "@/lib/data/forum-regras";
import { denunciarFn } from "@/lib/portal.functions";

/** Regras de conduta do fórum. */
export function RegrasForum() {
  return (
    <Painel>
      <Rotulo>
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-gold" aria-hidden="true" /> Regras de conduta
        </span>
      </Rotulo>
      <ul className="space-y-4">
        {REGRAS_FORUM.map((regra) => (
          <li key={regra.titulo}>
            <p className="text-sm text-foreground">{regra.titulo}</p>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">{regra.texto}</p>
          </li>
        ))}
      </ul>
    </Painel>
  );
}

/** Marca conteúdo que aguarda revisão (visível só para o autor). */
export function SeloRevisao({ status }: { status?: string | null }) {
  if (status === "aprovado" || !status) return null;
  return (
    <span className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
      <Clock className="size-3" aria-hidden="true" /> Em revisão
    </span>
  );
}

/** Denúncia de conversa ou resposta, com motivo e comentário opcional. */
export function DenunciarBotao({
  topicoId,
  respostaId,
  compacto,
}: {
  topicoId?: string;
  respostaId?: string;
  compacto?: boolean;
}) {
  const [aberto, setAberto] = useState(false);
  const [motivo, setMotivo] = useState<string>(MOTIVOS_DENUNCIA[0].valor);
  const [comentario, setComentario] = useState("");

  const enviar = useMutation({
    mutationFn: async () => {
      const token = await garantirTokenAgora();
      return denunciarFn({
        data: { token, topicoId, respostaId, motivo, comentario: comentario || undefined },
      });
    },
    onSuccess: (res) => {
      setAberto(false);
      setComentario("");
      toast.success(
        res.repetida
          ? "Você já havia denunciado este conteúdo."
          : "Denúncia registrada. A moderação vai revisar.",
      );
    },
    onError: () => toast.error("Não foi possível registrar a denúncia."),
  });

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className={`inline-flex items-center gap-2 uppercase tracking-[0.25em] text-paper/50 hover:text-gold transition-colors ${
          compacto ? "text-[10px]" : "text-[10px]"
        }`}
      >
        <Flag className="size-3" aria-hidden="true" /> Denunciar
      </button>

      {aberto ? (
        <form
          className="space-y-4 border border-gold/15 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            enviar.mutate();
          }}
        >
          <fieldset className="space-y-2">
            <legend className="text-[10px] uppercase tracking-[0.25em] text-paper/60 mb-2">
              Motivo
            </legend>
            <div className="flex flex-wrap gap-2">
              {MOTIVOS_DENUNCIA.map((m) => (
                <button
                  key={m.valor}
                  type="button"
                  onClick={() => setMotivo(m.valor)}
                  aria-pressed={motivo === m.valor}
                  className={`px-3 py-2 text-[10px] uppercase tracking-[0.15em] border transition-premium ${
                    motivo === m.valor
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/15 text-paper/60 hover:text-paper hover:border-gold/40"
                  }`}
                >
                  {m.rotulo}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60">
              Comentário (opcional)
            </span>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              maxLength={600}
              placeholder="Explique brevemente o problema."
              className={inputClass}
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={enviar.isPending} className={botaoClass}>
              {enviar.isPending ? "Enviando…" : "Enviar denúncia"}
            </button>
            <button type="button" onClick={() => setAberto(false)} className={botaoGhostClass}>
              Cancelar
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
