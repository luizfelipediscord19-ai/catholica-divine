// Server-only. Busca capítulos das edições de domínio público e serve o texto
// DENTRO do portal (nenhum redirecionamento para fontes externas).
import { NUMERO_LIVRO, getVersao, type Versao } from "@/lib/biblia/versoes";

export type VersoTexto = { v: number; t: string };

const BASE = "https://api.getbible.net/v2";
const TTL_MS = 1000 * 60 * 60 * 12;

type Entrada = { em: number; versos: VersoTexto[] };
const cache = new Map<string, Entrada>();

function codigoPara(versao: Versao, numero: number): string {
  // AT vai até 39 na numeração protocanônica; deuterocanônicos usam 69+.
  const antigoTestamento = numero <= 39 || numero >= 67;
  if (antigoTestamento && versao.codigoAt) return versao.codigoAt;
  return versao.codigo;
}

export async function buscarCapitulo(
  versaoId: string,
  slug: string,
  capitulo: number,
): Promise<VersoTexto[] | null> {
  const versao = getVersao(versaoId);
  const numero = NUMERO_LIVRO[slug];
  if (!versao || !numero) return null;

  const codigo = codigoPara(versao, numero);
  const chave = `${codigo}:${numero}:${capitulo}`;
  const agora = Date.now();
  const guardado = cache.get(chave);
  if (guardado && agora - guardado.em < TTL_MS) return guardado.versos;

  try {
    const controlador = new AbortController();
    const t = setTimeout(() => controlador.abort(), 12000);
    const resposta = await fetch(`${BASE}/${codigo}/${numero}/${capitulo}.json`, {
      signal: controlador.signal,
      headers: { accept: "application/json" },
    });
    clearTimeout(t);
    if (!resposta.ok) return null;

    const dados = (await resposta.json()) as {
      verses?: { verse?: number; text?: string }[];
    };
    const versos: VersoTexto[] = (dados.verses ?? [])
      .filter((v) => typeof v.text === "string")
      .map((v, i) => ({ v: Number(v.verse ?? i + 1), t: (v.text ?? "").trim() }))
      .filter((v) => v.t.length > 0);

    if (versos.length === 0) return null;
    cache.set(chave, { em: agora, versos });
    return versos;
  } catch (erro) {
    console.error("[Bíblia] falha ao buscar capítulo", chave, erro);
    return null;
  }
}
