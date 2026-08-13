import { Link } from "@tanstack/react-router";
import { BookOpen, Library } from "lucide-react";
import { encontrarReferencias } from "../../lib/referencias";

/**
 * Mostra, abaixo da resposta da Sophia, atalhos para conferir dentro do portal
 * cada passagem bíblica e cada parágrafo do Catecismo citados.
 */
export function ReferenciasInternas({ texto }: { texto: string }) {
  const referencias = encontrarReferencias(texto);
  if (referencias.length === 0) return null;

  return (
    <nav aria-label="Conferir as citações no portal" className="mt-3 border-t border-gold/10 pt-3">
      <p className="kicker mb-2">Conferir no portal</p>
      <ul className="flex flex-wrap gap-2">
        {referencias.map((r) => (
          <li key={r.caminho + r.texto}>
            <Link
              to={r.caminho}
              className="inline-flex min-h-9 items-center gap-1.5 border border-gold/20 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-gold/50 hover:text-foreground"
            >
              {r.tipo === "escritura" ? (
                <BookOpen className="size-3 text-gold" aria-hidden="true" />
              ) : (
                <Library className="size-3 text-gold" aria-hidden="true" />
              )}
              {r.texto}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
