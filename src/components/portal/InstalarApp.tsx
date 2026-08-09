import { useEffect, useState } from "react";
import { X, Smartphone, MoreVertical } from "lucide-react";
import {
  ehDispositivoMovel,
  ehIos,
  iniciarCapturaInstalacao,
  jaInstalado,
  obterPromptInstalacao,
  ouvirPromptInstalacao,
  type PromptEvent,
} from "@/lib/pwa/instalacao";
import {
  ATRASO_MS,
  conviteSilenciado,
  registrarInstalado,
  registrarRecusa,
} from "@/lib/pwa/preferencias-instalacao";

// Começa a escutar antes de qualquer render: o navegador dispara o evento uma única vez.
iniciarCapturaInstalacao();

export function InstalarApp() {
  const [visivel, setVisivel] = useState(false);
  const [evento, setEvento] = useState<PromptEvent | null>(null);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (jaInstalado() || !ehDispositivoMovel() || conviteSilenciado()) return;

    setIos(ehIos());
    setEvento(obterPromptInstalacao());
    const parar = ouvirPromptInstalacao((e) => {
      setEvento(e);
      if (e && !conviteSilenciado()) setVisivel(true);
    });

    // Mesmo sem `beforeinstallprompt` (iOS, navegadores alternativos, preview em
    // iframe) mostramos o aviso com as instruções manuais.
    const timer = window.setTimeout(() => {
      if (!conviteSilenciado()) setVisivel(true);
    }, ATRASO_MS);

    return () => {
      parar();
      window.clearTimeout(timer);
    };
  }, []);

  const dispensar = () => {
    registrarRecusa();
    setVisivel(false);
  };

  const instalar = async () => {
    if (!evento) return;
    await evento.prompt();
    const escolha = await evento.userChoice;
    if (escolha?.outcome === "accepted") registrarInstalado();
    else registrarRecusa();
    setVisivel(false);
  };

  // iOS não possui API de instalação: abrir a folha de compartilhamento do
  // Safari deixa "Adicionar à Tela de Início" a um toque, sem passo a passo.
  const instalarIos = async () => {
    try {
      await navigator.share?.({
        title: "Portal Católico",
        url: window.location.origin,
      });
    } catch {
      /* usuário cancelou */
    }
    registrarRecusa();
    setVisivel(false);
  };


  if (!visivel) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      {/* Fundo escurecido: fechar tocando fora. */}
      <button
        aria-label="Fechar aviso de instalação"
        onClick={dispensar}
        className="absolute inset-0 bg-deep/80 backdrop-blur-sm animate-in fade-in duration-300"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Instalar o Portal Católico no telefone"
        className="relative w-full max-w-sm border border-gold/30 bg-card px-6 pb-6 pt-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300"
      >
        <button
          onClick={dispensar}
          aria-label="Dispensar"
          className="absolute right-3 top-3 p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gold/15 to-transparent" />

        <img
          src="/pwa-192.png"
          alt="Ícone do Portal Católico"
          width={72}
          height={72}
          className="relative mx-auto rounded-2xl border border-gold/30 shadow-lg"
          style={{ height: 72, width: 72 }}
        />

        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gold">Portal Católico</p>
        <h2 className="mt-2 font-display text-xl text-foreground">Instale o aplicativo</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Tenha a Bíblia, a liturgia do dia e o seu painel espiritual num toque — em tela cheia,
          com notificações e funcionando até sem internet.
        </p>

        {evento || ios ? (
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={ios ? instalarIos : instalar}
              className="inline-flex items-center justify-center gap-2 bg-gold px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-deep transition-colors hover:bg-paper"
            >
              <Smartphone className="h-4 w-4" /> Instalar agora
            </button>
            <button
              onClick={dispensar}
              className="py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              Agora não
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="border border-border/60 bg-background/60 px-4 py-3 text-left text-[11px] leading-relaxed text-muted-foreground">
              <span className="flex flex-wrap items-center gap-1">
                Abra o menu <MoreVertical className="h-3.5 w-3.5 text-gold" /> do navegador e
                toque em “Instalar aplicativo” ou “Adicionar à tela inicial”.
              </span>
            </div>
            <button
              onClick={dispensar}
              className="mt-3 w-full py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              Entendi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

