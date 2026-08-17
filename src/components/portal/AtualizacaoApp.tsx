import { useEffect, useState } from "react";
import { RefreshCw, WifiOff, X } from "lucide-react";

import { registrarServiceWorker, type ControleSW } from "@/lib/pwa/registrar-sw";
import { notificar } from "@/lib/notificacoes";

/**
 * Registra o service worker (modo offline) e avisa quando existe uma versão
 * nova do aplicativo, permitindo atualizar com um clique.
 */
export function AtualizacaoApp() {
  const [controle, setControle] = useState<ControleSW | null>(null);
  const [atualizando, setAtualizando] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    registrarServiceWorker((c) => {
      setControle(c);
      notificar({
        tipo: "sistema",
        titulo: "Nova versão disponível",
        mensagem: "Atualize para receber as melhorias mais recentes do portal.",
        chave: "atualizacao-pendente",
      });
    });
  }, []);

  useEffect(() => {
    const sincronizar = () => setOffline(!navigator.onLine);
    sincronizar();
    window.addEventListener("online", sincronizar);
    window.addEventListener("offline", sincronizar);
    return () => {
      window.removeEventListener("online", sincronizar);
      window.removeEventListener("offline", sincronizar);
    };
  }, []);

  return (
    <>
      {offline ? (
        <div
          role="status"
          className="fixed left-1/2 top-[4.75rem] z-[85] flex -translate-x-1/2 items-center gap-2 border border-gold/30 bg-background/95 px-3 py-2 text-step--2 text-muted-foreground shadow-lg backdrop-blur"
        >
          <WifiOff className="size-3.5 text-gold" aria-hidden="true" />
          Sem internet — mostrando páginas e textos já lidos.
        </div>
      ) : null}

      {controle ? (
        <div
          role="dialog"
          aria-label="Nova versão disponível"
          className="fixed inset-x-3 bottom-3 z-[95] border border-gold/30 bg-background/97 px-4 py-4 shadow-2xl backdrop-blur sm:left-auto sm:right-4 sm:w-80"
        >
          <button
            onClick={() => setControle(null)}
            aria-label="Fechar aviso de atualização"
            className="absolute right-2 top-2 p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
          <p className="font-display text-base text-foreground">Nova versão disponível</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Atualize para carregar as melhorias mais recentes do Portal Católico.
          </p>
          <button
            onClick={() => {
              setAtualizando(true);
              controle.atualizar();
            }}
            disabled={atualizando}
            className="btn-base btn-sm btn-gold mt-3 gap-2 hover:bg-paper"
          >
            <RefreshCw
              className={`size-3.5 ${atualizando ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {atualizando ? "Atualizando…" : "Atualizar agora"}
          </button>
        </div>
      ) : null}
    </>
  );
}
