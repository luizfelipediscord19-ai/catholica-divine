import { createServerFn } from "@tanstack/react-start";
import { diaLiturgico, normalizar, toIso } from "./liturgia/calendario";
import type { DiaLiturgico } from "./liturgia/calendario";

export type LeituraLiturgica = {
  referencia: string;
  titulo: string;
  texto: string;
  refrao?: string;
};

export type LiturgiaDoDia = DiaLiturgico & {
  /** Nome da celebração — da fonte oficial quando disponível. */
  celebracao: string;
  dataExtenso: string;
  primeiraLeitura: LeituraLiturgica[];
  salmo: LeituraLiturgica[];
  segundaLeitura: LeituraLiturgica[];
  evangelho: LeituraLiturgica[];
  /** "cnbb" quando vindo da fonte litúrgica externa; "local" no fallback. */
  fonte: "cnbb" | "local";
};

const API = "https://liturgia.up.railway.app/v2/";

type ApiLeitura = { referencia?: string; titulo?: string; texto?: string; refrao?: string };
type ApiResp = {
  data?: string;
  liturgia?: string;
  cor?: string;
  leituras?: {
    primeiraLeitura?: ApiLeitura[];
    salmo?: ApiLeitura[];
    segundaLeitura?: ApiLeitura[];
    evangelho?: ApiLeitura[];
  };
};

function mapear(itens: ApiLeitura[] | undefined): LeituraLiturgica[] {
  if (!Array.isArray(itens)) return [];
  return itens
    .filter((i) => i && (i.texto || i.referencia))
    .map((i) => ({
      referencia: i.referencia ?? "",
      titulo: i.titulo ?? "",
      texto: (i.texto ?? "").trim(),
      ...(i.refrao ? { refrao: i.refrao } : {}),
    }));
}

function extenso(iso: string): string {
  const [y, m, day] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const semanas = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const dow = new Date(Date.UTC(y, m - 1, day)).getUTCDay();
  return `${semanas[dow]}, ${day} de ${meses[m - 1]} de ${y}`;
}

/**
 * Liturgia do dia: busca as leituras oficiais (1ª leitura, salmo responsorial,
 * 2ª leitura e Evangelho) na fonte litúrgica brasileira e complementa com o
 * cálculo local do tempo litúrgico, cor e ciclo A/B/C. Se a fonte externa
 * falhar, devolve o cálculo local — nunca conteúdo fixo desatualizado.
 */
export const getLiturgiaDoDia = createServerFn({ method: "GET" })
  .inputValidator((input: { iso?: string } | undefined) => ({
    iso: typeof input?.iso === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input.iso) ? input.iso : undefined,
  }))
  .handler(async ({ data }): Promise<LiturgiaDoDia> => {
    const iso = data.iso ?? toIso(normalizar(new Date()));
    const [ano, mes, dia] = iso.split("-");
    const base = diaLiturgico(new Date(Date.UTC(Number(ano), Number(mes) - 1, Number(dia))));

    const vazio: LiturgiaDoDia = {
      ...base,
      dataExtenso: extenso(iso),
      primeiraLeitura: [],
      salmo: [],
      segundaLeitura: [],
      evangelho: [],
      fonte: "local",
    };

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(`${API}?dia=${dia}&mes=${mes}&ano=${ano}`, {
        signal: ctrl.signal,
        headers: { accept: "application/json" },
      });
      clearTimeout(timer);
      if (!res.ok) return vazio;

      const json = (await res.json()) as ApiResp;
      const evangelho = mapear(json.leituras?.evangelho);
      if (evangelho.length === 0) return vazio;

      return {
        ...vazio,
        celebracao: json.liturgia?.trim() || base.celebracao,
        primeiraLeitura: mapear(json.leituras?.primeiraLeitura),
        salmo: mapear(json.leituras?.salmo),
        segundaLeitura: mapear(json.leituras?.segundaLeitura),
        evangelho,
        fonte: "cnbb",
      };
    } catch {
      return vazio;
    }
  });
