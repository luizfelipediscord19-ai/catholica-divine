/**
 * Elo Escritura → Catecismo.
 *
 * Ao lado do versículo, mostra os parágrafos do Catecismo que tratam daquela
 * passagem. Cada número abre o artigo correspondente na árvore do Catecismo do
 * portal, já posicionado no parágrafo.
 */
import { Link } from "@tanstack/react-router";
import { elosDoVersiculo } from "@/lib/data/catecismo/indice-escritura";

export function CatecismoDoVersiculo({
  livro,
  capitulo,
  versiculo,
}: {
  livro: string;
  capitulo: number;
  versiculo: number;
}) {
  const elos = elosDoVersiculo(livro, capitulo, versiculo);
  if (elos.length === 0) return null;

  return (
    <span data-leitura-oculto className="ml-2 inline-flex flex-wrap items-baseline gap-1.5 align-baseline">
      {elos.map((elo) =>
        elo.paragrafos.map((p) => (
          <Link
            key={`${elo.tema}-${p}`}
            to="/catecismo/artigos"
            search={{ p }}
            title={`Catecismo § ${p} — ${elo.tema}`}
            className="rounded-full border border-gold/30 px-2 py-0.5 font-sans text-[0.62em] tracking-wide text-gold/80 transition-premium hover:border-gold hover:text-gold"
          >
            CIC §{p}
          </Link>
        )),
      )}
    </span>
  );
}
