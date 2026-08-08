import { useEffect, useState } from "react";
import { X, Share, Plus, Smartphone, MoreVertical } from "lucide-react";
import {
  ehDispositivoMovel,
  ehIos,
  iniciarCapturaInstalacao,
  jaInstalado,
  obterPromptInstalacao,
  ouvirPromptInstalacao,
  type PromptEvent,
} from "@/lib/pwa/instalacao";

const CHAVE_DISPENSADO = "portal:pwa-dispensado";
const DIAS_SILENCIO = 7;

// Começa a escutar antes de qualquer render: o navegador dispara o evento uma única vez.
iniciarCapturaInstalacao();

function silenciado() {
  try {
    const valor = localStorage.getItem(CHAVE_DISPENSADO);
    if (!valor) return false;
    if (valor === "instalado") return true;
    const quando = Number(valor);
    if (!Number.isFinite(quando)) return false;
    return Date.now() - quando < DIAS_SILENCIO * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function InstalarApp() {
  const [visivel, setVisivel] = useState(false);
  const [evento, setEvento] = useState<PromptEvent | null>(null);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (jaInstalado() || !ehDispositivoMovel() || silenciado()) return;

    setIos(ehIos());
    setEvento(obterPromptInstalacao());
    const parar = ouvirPromptInstalacao((e) => {
      setEvento(e);
      if (e) setVisivel(true);
    });

    // Mesmo sem `beforeinstallprompt` (iOS, navegadores alternativos, preview em
    // iframe) mostramos o aviso com as instruções manuais.
    const timer = window.setTimeout(() => setVisivel(true), 1800);

    return () => {
      parar();
      window.clearTimeout(timer);
    };
  }, []);

  const dispensar = () => {
    try {
      localStorage.setItem(CHAVE_DISPENSADO, String(Date.now()));
    } catch {
      /* ignora */
    }
    setVisivel(false);
  };

  const instalar = async () => {
    if (!evento) return;
    await evento.prompt();
    const escolha = await evento.userChoice;
    if (escolha?.outcome === "accepted") {
      try {
        localStorage.setItem(CHAVE_DISPENSADO, "instalado");
      } catch {
        /* ignora */
      }
    }
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-label="Instalar o Portal Católico no telefone"
      className="fixed inset-x-3 bottom-3 z-[90] border border-gold/30 bg-background/95 backdrop-blur px-4 py-4 shadow-2xl"
    >
      <button
        onClick={dispensar}
        aria-label="Dispensar"
        className="absolute right-2 top-2 p-1 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex gap-3">
        <img
          src="/pwa-192.png"
          alt="Ícone do Portal Católico"
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-lg border border-gold/20"
        />
        <div className="min-w-0">
          <p className="font-display text-base text-foreground">Instalar no seu telefone</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Tenha a Bíblia, a liturgia e o seu painel espiritual num toque, em tela cheia e também
            sem internet.
          </p>

          {evento ? (
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={instalar}
                className="inline-flex items-center gap-2 bg-gold px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-deep hover:bg-paper transition-colors"
              >
                <Smartphone className="h-3.5 w-3.5" /> Instalar
              </button>
              <button
                onClick={dispensar}
                className="px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Agora não
              </button>
            </div>
          ) : ios ? (
            <p className="mt-3 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
              No Safari, toque em <Share className="h-3.5 w-3.5 text-gold" /> Compartilhar e depois
              em <Plus className="h-3.5 w-3.5 text-gold" /> “Adicionar à Tela de Início”.
            </p>
          ) : (
            <p className="mt-3 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
              Abra o menu <MoreVertical className="h-3.5 w-3.5 text-gold" /> do navegador e toque em
              “Instalar aplicativo” ou “Adicionar à tela inicial”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
