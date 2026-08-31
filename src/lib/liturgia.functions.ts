import { createServerFn } from "@tanstack/react-start";
import { diaLiturgico } from "./liturgia/calendario";
import { dataDoIso, isoHoje } from "./liturgia/hoje";
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

/** Cliente do banco com chave publicável (leitura pública do cache). */
async function clientePublico() {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

type CacheLeituras = {
  primeiraLeitura?: LeituraLiturgica[];
  salmo?: LeituraLiturgica[];
  segundaLeitura?: LeituraLiturgica[];
  evangelho?: LeituraLiturgica[];
};

async function lerCache(iso: string): Promise<{ celebracao: string; leituras: CacheLeituras; verificado_em: string } | null> {
  const sb = await clientePublico();
  if (!sb) return null;
  const { data, error } = await sb
    .from("liturgia_dia")
    .select("celebracao, leituras, verificado_em")
    .eq("iso", iso)
    .maybeSingle();
  if (error || !data) return null;
  return data as { celebracao: string; leituras: CacheLeituras; verificado_em: string };
}

async function gravarCache(iso: string, lit: LiturgiaDoDia): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("liturgia_dia").upsert(
      {
        iso,
        celebracao: lit.celebracao,
        tempo: lit.tempo,
        cor: lit.cor,
        ano_liturgico: lit.anoLiturgico,
        leituras: {
          primeiraLeitura: lit.primeiraLeitura,
          salmo: lit.salmo,
          segundaLeitura: lit.segundaLeitura,
          evangelho: lit.evangelho,
        },
        fonte: "cnbb",
        verificado_em: new Date().toISOString(),
      },
      { onConflict: "iso" },
    );
  } catch {
    // Cache é otimização: falha de gravação nunca quebra a página.
  }
}

/**
 * Liturgia do dia: busca as leituras oficiais (1ª leitura, salmo responsorial,
 * 2ª leitura e Evangelho) na fonte litúrgica brasileira, guarda-as no banco e
 * complementa com o cálculo local do tempo litúrgico, cor e ciclo A/B/C.
 *
 * Ordem: fonte oficial → cache do portal (leituras já verificadas) → cálculo
 * local sem leituras. Nunca inventa nem repete conteúdo de outro dia.
 */
export const getLiturgiaDoDia = createServerFn({ method: "GET" })
  .inputValidator((input: { iso?: string } | undefined) => ({
    iso: typeof input?.iso === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input.iso) ? input.iso : undefined,
  }))
  .handler(async ({ data }): Promise<LiturgiaDoDia> => {
    const iso = data.iso ?? isoHoje();
    const [ano, mes, dia] = iso.split("-");
    const base = diaLiturgico(dataDoIso(iso));

    const vazio: LiturgiaDoDia = {
      ...base,
      dataExtenso: extenso(iso),
      primeiraLeitura: [],
      salmo: [],
      segundaLeitura: [],
      evangelho: [],
      fonte: "local",
    };

    const doCache = async (): Promise<LiturgiaDoDia> => {
      const c = await lerCache(iso);
      if (!c || !c.leituras?.evangelho?.length) return vazio;
      return {
        ...vazio,
        celebracao: c.celebracao || base.celebracao,
        primeiraLeitura: c.leituras.primeiraLeitura ?? [],
        salmo: c.leituras.salmo ?? [],
        segundaLeitura: c.leituras.segundaLeitura ?? [],
        evangelho: c.leituras.evangelho ?? [],
        fonte: "cnbb",
        verificadoEm: c.verificado_em,
      };
    };

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(`${API}?dia=${dia}&mes=${mes}&ano=${ano}`, {
        signal: ctrl.signal,
        headers: { accept: "application/json" },
      });
      clearTimeout(timer);
      if (!res.ok) return await doCache();

      const json = (await res.json()) as ApiResp;
      const evangelho = mapear(json.leituras?.evangelho);
      if (evangelho.length === 0) return await doCache();

      const resultado: LiturgiaDoDia = {
        ...vazio,
        celebracao: json.liturgia?.trim() || base.celebracao,
        primeiraLeitura: mapear(json.leituras?.primeiraLeitura),
        salmo: mapear(json.leituras?.salmo),
        segundaLeitura: mapear(json.leituras?.segundaLeitura),
        evangelho,
        fonte: "cnbb",
        verificadoEm: new Date().toISOString(),
      };
      await gravarCache(iso, resultado);
      return resultado;
    } catch {
      return await doCache();
    }
  });

