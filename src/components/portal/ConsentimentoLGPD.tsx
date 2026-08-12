import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";

import { useConsentimento } from "../../hooks/use-consentimento";
import {
  CATEGORIAS,
  PREFERENCIAS_MINIMAS,
  type PreferenciasConsentimento,
} from "../../lib/consentimento";

export function ConsentimentoLGPD() {
  const { registro, pendente, salvar, aceitarTudo, somenteEssenciais } = useConsentimento();
  const [aberto, setAberto] = useState(false);
  const [detalhes, setDetalhes] = useState(false);
  const [rascunho, setRascunho] = useState<PreferenciasConsentimento>(PREFERENCIAS_MINIMAS);

  useEffect(() => {
    const abrir = () => {
      setRascunho(registro?.preferencias ?? PREFERENCIAS_MINIMAS);
      setDetalhes(true);
      setAberto(true);
    };
    window.addEventListener("pc:abrir-consentimento", abrir);
    return () => window.removeEventListener("pc:abrir-consentimento", abrir);
  }, [registro]);

  useEffect(() => {
    if (pendente) {
      setRascunho(registro?.preferencias ?? PREFERENCIAS_MINIMAS);
      setAberto(true);
    }
  }, [pendente, registro]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (registro) setAberto(false);
      else somenteEssenciais();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto, registro, somenteEssenciais]);

  if (!aberto) return null;

  const decidido = registro !== null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consentimento-titulo"
      className="fixed inset-x-0 bottom-0 z-[95] px-3 pb-3 sm:px-5 sm:pb-5 print:hidden"
      data-leitura-oculto
    >
      <div className="mx-auto w-full max-w-[46rem] max-h-[80svh] overflow-y-auto overscroll-contain rounded-2xl border border-gold/25 bg-card/95 p-4 shadow-2xl backdrop-blur-md sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
          <div className="min-w-0 flex-1 space-y-2">
            <h2
              id="consentimento-titulo"
              className="font-display text-step-0 leading-snug text-foreground sm:text-step-1"
            >
              Privacidade e consentimento
            </h2>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              <span className="hidden sm:inline">
                Guardamos no seu aparelho apenas o necessário para o portal funcionar e para
                devolver seu progresso espiritual. Você escolhe o que permitir, e pode mudar quando
                quiser. Detalhes na{" "}
              </span>
              <span className="sm:hidden">
                Guardamos no seu aparelho só o necessário para o portal funcionar. Você escolhe o
                que permitir. Detalhes na{" "}
              </span>
              <Link to="/privacidade" className="text-gold hover:underline">
                Política de Privacidade
              </Link>{" "}
              e nos{" "}
              <Link to="/termos" className="text-gold hover:underline">
                Termos de Uso
              </Link>
              .
            </p>
          </div>
          {decidido && (
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar preferências de privacidade"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {detalhes && (
          <ul className="mt-4 space-y-3 border-t border-gold/15 pt-4">
            {CATEGORIAS.map((cat) => {
              const ativo = cat.obrigatoria || rascunho[cat.id];
              return (
                <li key={cat.id} className="flex items-start gap-3">
                  <input
                    id={`consent-${cat.id}`}
                    type="checkbox"
                    checked={ativo}
                    disabled={cat.obrigatoria}
                    onChange={(e) =>
                      setRascunho((p) => ({ ...p, [cat.id]: e.target.checked }))
                    }
                    className="mt-1 size-4 shrink-0 accent-gold disabled:opacity-60"
                  />
                  <label htmlFor={`consent-${cat.id}`} className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {cat.nome}
                      {cat.obrigatoria && (
                        <span className="ml-2 text-[0.7rem] uppercase tracking-[0.14em] text-gold">
                          sempre ativo
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-sm font-light leading-relaxed text-muted-foreground">
                      {cat.descricao}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              aceitarTudo();
              setAberto(false);
            }}
            className="btn-base btn-gold px-5 py-2.5 label-btn"
          >
            Aceitar tudo
          </button>
          {detalhes ? (
            <button
              type="button"
              onClick={() => {
                salvar(rascunho, "personalizado");
                setAberto(false);
              }}
              className="btn-base btn-outline-gold px-5 py-2.5 label-btn"
            >
              Salvar preferências
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDetalhes(true)}
              className="btn-base btn-outline-gold inline-flex items-center gap-2 px-5 py-2.5 label-btn"
            >
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Preferências
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              somenteEssenciais();
              setAberto(false);
            }}
            className="px-2 py-2 text-sm font-light text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Só o essencial
          </button>
        </div>
      </div>
    </div>
  );
}
