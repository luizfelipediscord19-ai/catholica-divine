import { useEffect, useState } from "react";
import { X, Share, Plus, Smartphone } from "lucide-react";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice?: Promise<{ outcome: string }> };

const CHAVE_DISPENSADO = "portal:pwa-dispensado";

function ehTelefone() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const uaMobile =
    /Android|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
    (/iPad|Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const toqueGrosso = window.matchMedia("(pointer: coarse)").matches;
  const telaPequena = Math.min(window.innerWidth, window.innerHeight) <= 820;
  return uaMobile && toqueGrosso && telaPequena;
}

function jaInstalado() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function InstalarApp() {
  const [visivel, setVisivel] = useState(false);
  const [evento, setEvento] = useState<PromptEvent | null>(null);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (jaInstalado() || !ehTelefone()) return;
    if (localStorage.getItem(CHAVE_DISPENSADO) === "1") return;

    const ua = navigator.userAgent || "";
    const eIos = /iPhone|iPod|iPad/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);
    setIos(eIos);

    const aoPrompt = (e: Event) => {
      e.preventDefault();
      setEvento(e as PromptEvent);
      setVisivel(true);
    };
    window.addEventListener("beforeinstallprompt", aoPrompt);

    // iOS não emite beforeinstallprompt: mostramos as instruções manuais.
    const timer = eIos ? window.setTimeout(() => setVisivel(true), 2500) : undefined;

    return () => {
      window.removeEventListener("beforeinstallprompt", aoPrompt);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const dispensar = () => {
    localStorage.setItem(CHAVE_DISPENSADO, "1");
    setVisivel(false);
  };

  const instalar = async () => {
    if (!evento) return;
    await evento.prompt();
    const escolha = await evento.userChoice;
    if (escolha?.outcome === "accepted") localStorage.setItem(CHAVE_DISPENSADO, "1");
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-label="Instalar o Portal Católico no telefone"
      className="fixed inset-x-3 bottom-3 z-[90] border border-gold/30 bg-background/95 backdrop-blur px-4 py-4 shadow-2xl md:hidden"
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
            Tenha a Bíblia, a liturgia e o seu painel espiritual num toque, em tela cheia.
          </p>

          {ios ? (
            <p className="mt-3 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
              Toque em <Share className="h-3.5 w-3.5 text-gold" /> Compartilhar e depois
              <Plus className="h-3.5 w-3.5 text-gold" /> “Adicionar à Tela de Início”.
            </p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
