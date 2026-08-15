// Server-only. Ponte automática de notícias: feeds reais + Groq como redator.
//
// O modelo NUNCA é a fonte do fato: ele só resume e reescreve em português o
// conteúdo que veio do feed, e o artigo publicado sempre aponta para a fonte
// original (fonte_nome + fonte_url).
import { generateText } from "ai";
import { createGroqProvider, GROQ_MODEL } from "@/lib/groq.server";
import { lerTodasAsFontes, type ItemFeed } from "./feeds.server";
import { gerarSlug, publicarNoticias, slugsExistentes, type NoticiaEntrada } from "./db.server";

const CATEGORIAS = ["Vaticano", "Igreja", "Brasil", "Santos", "Liturgia", "Cultura"] as const;

const INSTRUCAO = `Você é o redator de notícias do Portal Católico, um site católico em português do Brasil.

Receberá o título, o resumo e a fonte de uma notícia real já publicada. Sua tarefa é reescrevê-la como uma nota jornalística curta em português do Brasil.

REGRAS ABSOLUTAS:
- Use SOMENTE as informações contidas no material recebido. Nunca acrescente fatos, datas, números, nomes, falas ou citações que não estejam ali.
- Se o material for curto, escreva um texto curto. Não preencha com suposições.
- Tom: sóbrio, respeitoso, fiel ao Magistério da Igreja Católica. Sem opinião pessoal, sem sensacionalismo, sem emojis.
- Não copie frases longas literalmente: reescreva com suas palavras.
- Não invente o nome do autor nem da fonte.

Responda APENAS com um objeto JSON válido, sem cercas de código, no formato:
{"titulo":"...","resumo":"...","corpo":"...","categoria":"...","tags":["..."]}

titulo: até 110 caracteres, claro e sem clickbait.
resumo: 1 frase, 140 a 300 caracteres.
corpo: 2 a 4 parágrafos separados por uma linha em branco, entre 600 e 1600 caracteres no total.
categoria: exatamente uma de ${CATEGORIAS.join(", ")}.
tags: 2 a 5 palavras-chave em minúsculas.`;

interface Redacao {
  titulo: string;
  resumo: string;
  corpo: string;
  categoria: string;
  tags: string[];
}

function extrairJson(texto: string): Redacao | null {
  const limpo = texto.replace(/```json/gi, "").replace(/```/g, "").trim();
  const inicio = limpo.indexOf("{");
  const fim = limpo.lastIndexOf("}");
  if (inicio < 0 || fim <= inicio) return null;
  try {
    const bruto = JSON.parse(escaparQuebras(limpo.slice(inicio, fim + 1))) as Partial<Redacao>;

    if (!bruto.titulo || !bruto.resumo || !bruto.corpo) return null;
    return {
      titulo: String(bruto.titulo).slice(0, 190),
      resumo: String(bruto.resumo).slice(0, 590),
      corpo: String(bruto.corpo).slice(0, 19000),
      categoria: CATEGORIAS.includes(bruto.categoria as (typeof CATEGORIAS)[number])
        ? String(bruto.categoria)
        : "Igreja",
      tags: Array.isArray(bruto.tags)
        ? bruto.tags.map((t) => String(t).toLowerCase().slice(0, 40)).slice(0, 6)
        : [],
    };
  } catch {
    return null;
  }
}

async function redigir(item: ItemFeed, chave: string): Promise<Redacao | null> {
  const material = [
    `Título original: ${item.titulo}`,
    `Fonte: ${item.fonte_nome} (${item.link})`,
    `Data: ${item.publicado_em}`,
    `Conteúdo do feed: ${item.resumo || "(sem resumo; use apenas o título)"}`,
  ].join("\n");

  try {
    const { text } = await generateText({
      model: createGroqProvider(chave)(GROQ_MODEL),
      system: INSTRUCAO,
      prompt: material,
      temperature: 0.3,
      maxOutputTokens: 1400,
    });
    const r = extrairJson(text);
    if (!r) console.error("[noticias:bruto]", JSON.stringify(text).slice(0, 800));
    return r;
  } catch (erro) {
    console.error("[noticias:redigir]", item.titulo, erro);
    return null;
  }
}

export interface ResultadoIngestao {
  ok: boolean;
  lidas: number;
  novas: number;
  gravadas: number;
  slugs: string[];
  ignoradas: number;
  motivo?: string;
}

/**
 * Executa a edição do dia: lê os feeds, descarta o que já está no acervo,
 * manda o restante para o Groq redigir e publica.
 */
export async function ingerirEdicaoDoDia(maximo = 8): Promise<ResultadoIngestao> {
  const chave = process.env["GROQ_API_KEY"];
  const itens = await lerTodasAsFontes(5);

  const candidatos: ItemFeed[] = [];
  const vistos = new Set<string>();
  for (const item of itens) {
    const slug = gerarSlug(item.titulo);
    if (!slug || vistos.has(slug)) continue;
    vistos.add(slug);
    candidatos.push(item);
  }

  const jaExistem = await slugsExistentes(candidatos.map((i) => gerarSlug(i.titulo)));
  const novos = candidatos.filter((i) => !jaExistem.has(gerarSlug(i.titulo))).slice(0, maximo);

  if (novos.length === 0) {
    return { ok: true, lidas: itens.length, novas: 0, gravadas: 0, slugs: [], ignoradas: 0 };
  }

  if (!chave) {
    return {
      ok: false,
      lidas: itens.length,
      novas: novos.length,
      gravadas: 0,
      slugs: [],
      ignoradas: novos.length,
      motivo: "GROQ_API_KEY ausente no servidor.",
    };
  }

  const entradas: NoticiaEntrada[] = [];
  let ignoradas = 0;

  for (const item of novos) {
    const redacao = await redigir(item, chave);
    if (!redacao) {
      ignoradas += 1;
      continue;
    }
    entradas.push({
      slug: gerarSlug(item.titulo),
      titulo: redacao.titulo,
      resumo: redacao.resumo,
      corpo: redacao.corpo,
      categoria: redacao.categoria,
      tags: redacao.tags,
      fonte_nome: item.fonte_nome,
      fonte_url: item.link,
      imagem_url: item.imagem_url,
      autor: "Redação do Portal Católico",
      publicado_em: item.publicado_em,
      destaque: entradas.length === 0,
      publicada: true,
    });
  }

  if (entradas.length === 0) {
    return {
      ok: false,
      lidas: itens.length,
      novas: novos.length,
      gravadas: 0,
      slugs: [],
      ignoradas,
      motivo: "Nenhuma redação válida foi produzida.",
    };
  }

  const gravacao = await publicarNoticias(entradas);
  return {
    ok: true,
    lidas: itens.length,
    novas: novos.length,
    gravadas: gravacao.gravadas,
    slugs: gravacao.slugs,
    ignoradas,
  };
}
