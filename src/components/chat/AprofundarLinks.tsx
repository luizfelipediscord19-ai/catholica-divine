import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

import { buscar, type ItemBusca } from "@/lib/busca";
import { palavrasChave } from "@/lib/busca/linguagem";

/**
 * Camada de ligação entre a resposta da Sophia e a biblioteca do portal:
 * a partir do texto respondido, sugere páginas reais para aprofundar
 * (verbetes, sacramentos, santos, trilhas, capítulos bíblicos).
 */
export function AprofundarLinks({
  texto,
  pergunta,
  limite = 4,
}: {
  texto: string;
  pergunta?: string;
  limite?: number;
}) {
  const itens = useMemo(() => {
    const base = `${pergunta ?? ""} ${texto}`;
    const chaves = palavrasChave(base).slice(0, 6);
    const vistos = new Set<string>();
    const achados: ItemBusca[] = [];
    for (const chave of chaves) {
      for (const item of buscar(chave, 6)) {
        if (item.categoria === "Bíblia" && !/^\/biblia\//.test(item.href)) continue;
        if (vistos.has(item.href)) continue;
        vistos.add(item.href);
        achados.push(item);
        if (achados.length >= limite) return achados;
      }
    }
    return achados;
  }, [texto, pergunta, limite]);

  if (itens.length === 0) return null;

  return (
    <nav aria-label="Aprofundar no portal" className="mt-3 border-t border-gold/10 pt-3">
      <p className="kicker mb-2">Aprofunde no portal</p>
      <ul className="flex flex-wrap gap-2">
        {itens.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="inline-flex min-h-9 items-center gap-1.5 border border-gold/20 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-gold/50 hover:text-foreground"
            >
              <ArrowUpRight className="size-3 text-gold" aria-hidden="true" />
              {item.titulo}
              <span className="text-foreground/45">{item.categoria}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
