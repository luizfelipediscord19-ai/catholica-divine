/**
 * "Este capítulo no Catecismo" — reúne, ao fim do capítulo bíblico, todas as
 * passagens dele que o Catecismo comenta, com o assunto de cada uma.
 */
import { Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";
import { elosDoCapitulo, faixaElo } from "@/lib/data/catecismo/indice-escritura";

export function CapituloNoCatecismo({
  livro,
  capitulo,
  className = "",
}: {
  livro: string;
  capitulo: number;
  className?: string;
}) {
  const elos = elosDoCapitulo(livro, capitulo);
  if (elos.length === 0) return null;

  return (
    <section className={`surface-card p-card ${className}`}>
      <p className="kicker flex items-center gap-2">
        <BookMarked className="size-3.5 text-gold" aria-hidden="true" /> Este capítulo no Catecismo
      </p>
      <h2 className="title-card mt-2 text-foreground">Da Escritura à doutrina</h2>
      <p className="body-sm mt-3 text-muted-foreground">
        Passagens deste capítulo citadas ou comentadas pelo Catecismo da Igreja Católica. Cada
        número abre o artigo correspondente.
      </p>
      <ul className="mt-5 space-y-3">
        {elos.map((elo) => (
          <li key={`${elo.de}-${elo.tema}`} className="border-l-2 border-gold/30 pl-4">
            <p className="body-sm text-foreground">
              <span className="text-gold">v. {faixaElo(elo)}</span> — {elo.tema}
            </p>
            <span className="mt-2 flex flex-wrap gap-2">
              {elo.paragrafos.map((p) => (
                <Link
                  key={p}
                  to="/catecismo/artigos"
                  search={{ p }}
                  className="chip chip-gold hover:text-paper"
                >
                  § {p}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
