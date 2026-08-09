// Server-only. Limite simples de requisições por origem (anti-abuso/DoS leve).
type Janela = { inicio: number; contagem: number };
const mapas = new Map<string, Map<string, Janela>>();

export function chaveCliente(request: Request): string {
  const h = request.headers;
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    (h.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ??
    "desconhecido"
  );
}

/**
 * Retorna true quando a requisição está dentro do limite.
 * @param escopo nome do recurso protegido (ex.: "chat")
 * @param limite número máximo de chamadas na janela
 * @param janelaMs duração da janela em milissegundos
 */
export function dentroDoLimite(
  escopo: string,
  chave: string,
  limite: number,
  janelaMs: number,
): boolean {
  let escopoMap = mapas.get(escopo);
  if (!escopoMap) {
    escopoMap = new Map();
    mapas.set(escopo, escopoMap);
  }

  const agora = Date.now();
  const atual = escopoMap.get(chave);

  if (!atual || agora - atual.inicio > janelaMs) {
    escopoMap.set(chave, { inicio: agora, contagem: 1 });
    // Limpeza preguiçosa para não crescer indefinidamente.
    if (escopoMap.size > 5000) {
      for (const [k, v] of escopoMap) if (agora - v.inicio > janelaMs) escopoMap.delete(k);
    }
    return true;
  }

  atual.contagem += 1;
  return atual.contagem <= limite;
}

/**
 * Igual a `dentroDoLimite`, mas contando no banco: o teto vale para todas as
 * instâncias do servidor e sobrevive a reinícios. Se o banco falhar, cai no
 * limite em memória para não derrubar o recurso.
 */
export async function dentroDoLimitePersistido(
  escopo: string,
  chave: string,
  limite: number,
  janelaMs: number,
): Promise<boolean> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const janela = new Date(Math.floor(Date.now() / janelaMs) * janelaMs).toISOString();
    const { data, error } = await supabaseAdmin.rpc("registrar_uso_ia", {
      _chave: `${escopo}:${chave}`,
      _janela: janela,
    });
    if (error) throw error;
    return (data ?? 0) <= limite;
  } catch {
    return dentroDoLimite(escopo, chave, limite, janelaMs);
  }
}

