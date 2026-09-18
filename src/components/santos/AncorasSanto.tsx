import { Link } from "@tanstack/react-router";
import { MagisterialAnchor } from "@/components/MagisterialAnchor";
import { ancorasDoSanto, verbetesDoSanto } from "@/lib/santos/ancoras";

/**
 * Liga a vida do santo ao vocabulário teológico e ao Catecismo: os verbetes
 * levam ao Glossário e cada âncora abre a síntese com o caminho para o texto
 * oficial, sem tirar o leitor da página.
 */
export function AncorasSanto({ nome, texto }: { nome: string; texto: string }) {
  const verbetes = verbetesDoSanto(texto);
  const ancoras = ancorasDoSanto(texto);

  return (
    <section aria-label={`Referências doutrinais de ${nome}`} className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-foreground mb-2">Para aprofundar</h2>
        <p className="text-sm text-muted-foreground">
          Termos e referências oficiais ligados a esta vida. Toque para ler a definição no Glossário
          ou abrir a síntese do Catecismo e do Direito Canônico.
        </p>
      </div>

      {verbetes.length > 0 ? (
        <div>
          <p className="kicker mb-3">Glossário teológico</p>
          <ul className="flex flex-wrap gap-2">
            {verbetes.map((v) => (
              <li key={v.chave}>
                <Link
                  to={v.caminho}
                  className="chip hover:border-gold hover:text-gold transition-colors"
                  title={v.definicao}
                >
                  {v.termo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <p className="kicker mb-3">Fundamentos no Magistério</p>
        <div className="flex flex-wrap items-center gap-2">
          {ancoras.map((a) => (
            <MagisterialAnchor
              key={`${a.tipo}-${a.numero}`}
              tipo={a.tipo}
              numero={a.numero}
              titulo={a.titulo}
              sintese={a.sintese}
              contexto={a.contexto}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
