import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, X } from "lucide-react";

import {
  lerMarcador,
  limparMarcador,
  rotuloMarcador,
  salvarMarcador,
  type MarcadorLeitura,
} from "@/lib/leitura-local";

/** Faixa discreta "Retomar leitura" — só aparece se houver marcador local. */
export function RetomarLeitura({ className = "" }: { className?: string }) {
  const [marcador, setMarcador] = useState<MarcadorLeitura | null>(null);

  useEffect(() => {
    setMarcador(lerMarcador());
  }, []);

  if (!marcador) return <RetomarPlano className={className} />;

  return (
    <div
      className={`surface-card flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 ${className}`}
    >
      <div className="min-w-0">
        <p className="kicker">Retomar leitura</p>
        <p className="mt-1 truncate text-sm text-foreground/90">
          Você parou em <span className="text-gold">{rotuloMarcador(marcador)}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/biblia/$livro/$capitulo"
          params={{ livro: marcador.livro, capitulo: String(marcador.capitulo) }}
          hash={marcador.versiculo > 1 ? `v${marcador.versiculo}` : undefined}
          className="btn-base btn-gold label-btn px-5"
        >
          <BookOpen className="size-3.5" aria-hidden="true" />
          Continuar
        </Link>
        <button
          type="button"
          onClick={() => {
            limparMarcador();
            setMarcador(null);
          }}
          aria-label="Dispensar marcador de leitura"
          className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-gold transition-premium"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/**
 * Registra o capítulo aberto e acompanha o versículo visível no topo,
 * salvando o marcador local (com throttle).
 */
export function useMarcadorCapitulo(
  livro: string,
  livroNome: string,
  capitulo: number,
): { versiculoSalvo: number | null } {
  const [versiculoSalvo] = useState<number | null>(() => {
    const m = lerMarcador();
    return m && m.livro === livro && m.capitulo === capitulo && m.versiculo > 1
      ? m.versiculo
      : null;
  });
  const ultimo = useRef(0);

  useEffect(() => {
    salvarMarcador({ livro, livroNome, capitulo, versiculo: 1 });

    const registrar = () => {
      const agora = Date.now();
      if (agora - ultimo.current < 1200) return;
      ultimo.current = agora;
      const versos = document.querySelectorAll<HTMLElement>(
        "[data-leitura-texto] p[id^='v']",
      );
      let atual = 1;
      for (const el of versos) {
        if (el.getBoundingClientRect().top > 120) break;
        const n = Number(el.id.slice(1));
        if (Number.isFinite(n) && n > 0) atual = n;
      }
      salvarMarcador({ livro, livroNome, capitulo, versiculo: atual });
    };

    window.addEventListener("scroll", registrar, { passive: true });
    return () => window.removeEventListener("scroll", registrar);
  }, [livro, livroNome, capitulo]);

  return { versiculoSalvo };
}
