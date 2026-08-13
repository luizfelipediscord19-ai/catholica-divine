/**
 * Referências verificáveis.
 *
 * Componente reutilizável para exibir as fontes de qualquer afirmação
 * doutrinária — respostas da Sophia, verbetes do glossário, apologética.
 * Quando não há fonte suficiente, mostra o aviso em vez de silenciar.
 */

import { ExternalLink } from "lucide-react";

import { caminhoEscritura, caminhoCatecismo, encontrarReferencias } from "@/lib/referencias";

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
  titulo = "Fontes utilizadas",
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
              className="inline-flex min-h-9 flex-wrap items-center gap-1.5 text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            >
              <span>
                {r.label}
                {r.locator ? <span className="text-gold/70"> · {r.locator}</span> : null}
              </span>
              {externo(r.href) ? (
                <>
                  <span className="text-gold/60">Ver fonte original</span>
                  <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
                  <span className="sr-only">(abre em nova aba)</span>
                </>
              ) : null}
            </a>
            {r.excerpt ? (
              <span className="block text-muted-foreground">“{r.excerpt}”</span>
            ) : null}
          </li>
        ))}
      </ul>
      {updatedAt ? (
        <p className="mt-2 text-step--2 text-muted-foreground/70">Atualizado em {updatedAt}</p>
      ) : null}
    </aside>
  );
}

/** Documentos do Magistério reconhecidos no texto, com o original no vatican.va. */
const DOCUMENTOS: { padrao: RegExp; label: string; href: string }[] = [
  {
    padrao: /sacrosanctum\s+concilium/i,
    label: "Concílio Vaticano II — Sacrosanctum Concilium",
    href: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_po.html",
  },
  {
    padrao: /lumen\s+gentium/i,
    label: "Concílio Vaticano II — Lumen Gentium",
    href: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
  },
  {
    padrao: /dei\s+verbum/i,
    label: "Concílio Vaticano II — Dei Verbum",
    href: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
  },
  {
    padrao: /gaudium\s+et\s+spes/i,
    label: "Concílio Vaticano II — Gaudium et Spes",
    href: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_po.html",
  },
  {
    padrao: /conc[ií]lio\s+de\s+trento/i,
    label: "Concílio de Trento",
    href: "https://www.vatican.va/content/vatican/it.html",
  },
  {
    padrao: /(direito\s+can[oô]nico|c[aâ]n\.?\s?\d{1,4})/i,
    label: "Código de Direito Canônico",
    href: "https://www.vatican.va/archive/cod-iuris-canonici/portuguese/codex-iuris-canonici_po.pdf",
  },
];

/**
 * Extrai referências de um texto em Markdown produzido pela Sophia:
 * links explícitos, citações do Catecismo (§NNNN), passagens bíblicas
 * e documentos do Magistério.
 */
export function extrairFontes(markdown: string): SourceReference[] {
  const encontradas = new Map<string, SourceReference>();

  const links = markdown.matchAll(/\[([^\]]{2,120})\]\((https?:\/\/[^\s)]+)\)/g);
  for (const m of links) {
    const label = m[1]!.trim();
    const href = m[2]!;
    if (!encontradas.has(href)) encontradas.set(href, { label, href });
  }

  // Catecismo e Escritura: aponta para a leitura dentro do próprio portal.
  for (const ref of encontrarReferencias(markdown, 12)) {
    if (ref.tipo === "catecismo") {
      const chave = `cic-${ref.paragrafo}`;
      if (!encontradas.has(chave)) {
        encontradas.set(chave, {
          label: "Catecismo da Igreja Católica",
          locator: `§${ref.paragrafo}`,
          href: ref.caminho,
        });
      }
    } else {
      const chave = `bib-${ref.caminho}`;
      if (!encontradas.has(chave)) {
        encontradas.set(chave, {
          label: "Sagrada Escritura",
          locator: ref.texto,
          href: ref.caminho,
        });
      }
    }
  }

  for (const doc of DOCUMENTOS) {
    if (!doc.padrao.test(markdown)) continue;
    if (!encontradas.has(doc.href)) {
      encontradas.set(doc.href, { label: doc.label, href: doc.href });
    }
  }

  return [...encontradas.values()].slice(0, 8);
}
