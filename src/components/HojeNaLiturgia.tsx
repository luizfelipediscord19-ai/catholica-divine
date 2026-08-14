import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

import { dataLonga, situacaoLiturgica, type CorLiturgica } from "@/lib/liturgia/tempo";
import { dataHoje } from "@/lib/liturgia/hoje";
import { SANTOS_LISTA } from "@/lib/santos-lista";

const AMOSTRA_COR: Record<CorLiturgica, string> = {
  Roxo: "bg-[#6b3fa0]",
  Branco: "bg-[#f5f1e6]",
  Verde: "bg-[#2f7d4f]",
  Vermelho: "bg-[#a32a25]",
  Rosa: "bg-[#e3a3b8]",
};

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/** Santos cuja memória cai na data indicada (comparação textual “13 de junho”). */
function santosDoDia(d: Date) {
  const dia = d.getUTCDate();
  const mes = MESES[d.getUTCMonth()];
  const alvos = [`${dia} de ${mes}`, `${dia}º de ${mes}`, `1º de ${mes}`];
  return SANTOS_LISTA.filter((s) => {
    const data = s.data.toLowerCase();
    return alvos.some((a) => data === a) || (dia === 1 && data === `1º de ${mes}`);
  }).slice(0, 4);
}

/**
 * Cartão “hoje”: tempo litúrgico em curso, cor das vestes, data da Páscoa
 * do ciclo e a memória dos santos do dia.
 */
export function HojeNaLiturgia() {
  const { hoje, situacao, santos } = useMemo(() => {
    const agora = dataHoje();
    return {
      hoje: agora,
      situacao: situacaoLiturgica(agora),
      santos: santosDoDia(agora),
    };
  }, []);

  return (
    <aside className="surface-card p-6 md:p-8 space-y-5" aria-label="Situação litúrgica de hoje">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="kicker">Hoje na liturgia</p>
        <p className="text-step--1 text-muted-foreground font-light capitalize">
          {dataLonga(hoje)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div>
          <p className="label-btn text-gold/70">Tempo</p>
          <p className="font-display text-2xl text-foreground leading-tight">
            {situacao.tempo}
          </p>
        </div>
        <div>
          <p className="label-btn text-gold/70">Cor litúrgica</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-foreground">
            <span
              aria-hidden="true"
              className={`size-4 rounded-full border border-gold/30 ${AMOSTRA_COR[situacao.cor]}`}
            />
            {situacao.cor}
          </p>
        </div>
        <div>
          <p className="label-btn text-gold/70">Páscoa deste ciclo</p>
          <p className="mt-1 text-sm text-foreground capitalize">{dataLonga(situacao.pascoa)}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-[42rem]">
        {situacao.descricao}
      </p>

      {santos.length > 0 ? (
        <div>
          <p className="label-btn text-gold/70 mb-2">Memória de hoje</p>
          <ul className="flex flex-wrap gap-2">
            {santos.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/santos/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex min-h-9 items-center rounded-[var(--radius-btn)] border border-gold/25 px-3 text-step--1 text-foreground/85 transition-premium hover:border-gold hover:text-gold"
                >
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-1">
        <a href={`#${situacao.secao}`} className="btn-base btn-outline-gold btn-sm inline-flex">
          Ler sobre este tempo
        </a>
        <Link to="/liturgia-diaria" className="btn-base btn-outline-gold btn-sm inline-flex">
          Liturgia do dia
        </Link>
      </div>
    </aside>
  );
}
