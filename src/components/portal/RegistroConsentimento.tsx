import { Check, Minus, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { useConsentimento } from "../../hooks/use-consentimento";
import {
  CATEGORIAS,
  VERSAO_CONSENTIMENTO,
  abrirPreferencias,
  formatarData,
} from "../../lib/consentimento";

const ROTULO: Record<string, string> = {
  todos: "Aceitou todas as categorias",
  essencial: "Aceitou apenas o essencial",
  personalizado: "Escolha personalizada",
};

export function RegistroConsentimento() {
  const { registro, pronto, revogar } = useConsentimento();

  return (
    <section
      id="consentimento"
      className="space-y-4 rounded-2xl border border-gold/25 bg-card/60 p-5 sm:p-6"
      aria-labelledby="registro-consentimento-titulo"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
        <div className="space-y-1">
          <h2
            id="registro-consentimento-titulo"
            className="font-display text-step-2 leading-snug text-foreground"
          >
            Seu consentimento
          </h2>
          <p className="text-sm font-light leading-relaxed text-muted-foreground">
            O registro do aceite fica no seu próprio aparelho, com data, versão do aviso e as
            categorias autorizadas. Você pode revisar ou revogar a qualquer momento.
          </p>
        </div>
      </div>

      {!pronto ? (
        <p className="text-sm font-light text-muted-foreground">Carregando registro…</p>
      ) : registro ? (
        <div className="space-y-4">
          <dl className="grid gap-3 sm:grid-cols-3">
            <div>
              <dt className="kicker">Decisão</dt>
              <dd className="mt-1 text-sm text-foreground">
                {ROTULO[registro.decisao] ?? registro.decisao}
              </dd>
            </div>
            <div>
              <dt className="kicker">Data do aceite</dt>
              <dd className="mt-1 text-sm text-foreground">{formatarData(registro.data)}</dd>
            </div>
            <div>
              <dt className="kicker">Versão do aviso</dt>
              <dd className="mt-1 text-sm text-foreground">
                {registro.versao}
                {registro.versao !== VERSAO_CONSENTIMENTO && " (desatualizada)"}
              </dd>
            </div>
          </dl>

          <ul className="space-y-2 border-t border-gold/15 pt-4">
            {CATEGORIAS.map((cat) => {
              const ativo = cat.obrigatoria || registro.preferencias[cat.id];
              return (
                <li key={cat.id} className="flex items-start gap-2.5 text-sm">
                  {ativo ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  ) : (
                    <Minus
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-foreground/85 font-light">
                    <span className="font-medium text-foreground">{cat.nome}</span>{" "}
                    — {ativo ? "autorizado" : "recusado"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="text-sm font-light text-muted-foreground">
          Nenhum consentimento registrado neste aparelho. O aviso será exibido para que você escolha.
        </p>
      )}

      <div className="flex flex-wrap gap-2.5 pt-1">
        <button
          type="button"
          onClick={abrirPreferencias}
          className="btn-base btn-outline-gold inline-flex items-center gap-2 px-5 py-2.5 label-btn"
        >
          <SlidersHorizontal className="size-3.5" aria-hidden="true" />
          Gerenciar preferências
        </button>
        {registro && (
          <button
            type="button"
            onClick={revogar}
            className="px-2 py-2 text-sm font-light text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Revogar consentimento
          </button>
        )}
      </div>
    </section>
  );
}
