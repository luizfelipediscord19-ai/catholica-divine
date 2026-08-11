/**
 * Referências verificáveis.
 *
 * Componente reutilizável para exibir as fontes de qualquer afirmação
 * doutrinária — respostas da Sophia, verbetes do glossário, apologética.
 * Quando não há fonte suficiente, mostra o aviso em vez de silenciar.
 */

export type SourceReference = {
  /** Nome da obra ou documento (ex.: "Catecismo da Igreja Católica"). */
  label: string;
  /** Endereço da fonte. Links externos abrem em nova aba. */
  href: string;
  /** Localizador: parágrafo, capítulo, versículo, seção. */
  locator?: string;
  /** Trecho curto ou descrição do que a fonte diz. */
  excerpt?: string;
};

function externo(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function SourceReferences({
  references,
  updatedAt,
  titulo = "Fontes consultadas",
  avisoSemFonte = "Esta resposta não traz fonte citada. Confirme no Catecismo, na Escritura ou com um sacerdote antes de usá-la como referência.",
}: {
  references: SourceReference[];
  updatedAt?: string;
  titulo?: string;
  avisoSemFonte?: string;
}) {
  if (references.length === 0) {
    return (
      <p className="mt-4 border-t border-gold/15 pt-3 text-xs leading-relaxed text-muted-foreground">
        {avisoSemFonte}
      </p>
    );
  }

  return (
    <aside className="mt-4 border-t border-gold/15 pt-3">
      <p className="kicker mb-2">{titulo}</p>
      <ul className="space-y-2">
        {references.map((r, i) => (
          <li key={`${r.href}-${i}`} className="text-xs leading-relaxed">
            <a
              href={r.href}
              {...(externo(r.href) ? { target: "_blank", rel: "noreferrer" } : {})}
              className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            >
              {r.label}
              {r.locator ? <span className="text-gold/70"> · {r.locator}</span> : null}
              {externo(r.href) ? <span className="sr-only"> (abre em nova aba)</span> : null}
            </a>
            {r.excerpt ? (
              <span className="block text-muted-foreground">“{r.excerpt}”</span>
            ) : null}
          </li>
        ))}
      </ul>
      {updatedAt ? (
        <p className="mt-2 text-[11px] text-muted-foreground/70">Atualizado em {updatedAt}</p>
      ) : null}
    </aside>
  );
}

/**
 * Extrai referências de um texto em Markdown produzido pela Sophia:
 * links explícitos `[rótulo](url)` e citações do Catecismo (§NNNN).
 */
export function extrairFontes(markdown: string): SourceReference[] {
  const encontradas = new Map<string, SourceReference>();

  const links = markdown.matchAll(/\[([^\]]{2,120})\]\((https?:\/\/[^\s)]+)\)/g);
  for (const m of links) {
    const label = m[1]!.trim();
    const href = m[2]!;
    if (!encontradas.has(href)) encontradas.set(href, { label, href });
  }

  const catecismo = markdown.matchAll(/(?:CIC|Catecismo)[^\d§]{0,20}§?\s?(\d{1,4})/gi);
  for (const m of catecismo) {
    const n = m[1]!;
    const href = `https://www.vatican.va/archive/cathechism_po/index_new/p1s1c1_po.html`;
    const chave = `cic-${n}`;
    if (!encontradas.has(chave)) {
      encontradas.set(chave, {
        label: "Catecismo da Igreja Católica",
        locator: `§${n}`,
        href,
      });
    }
  }

  return [...encontradas.values()].slice(0, 8);
}
