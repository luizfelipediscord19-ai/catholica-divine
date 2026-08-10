/**
 * Aterramento (grounding) da Sophia no acervo real do Portal Católico.
 *
 * Antes de responder, procuramos no conteúdo estático do site (glossário,
 * catecismo, orações, santos, banco de objeções) os itens ligados à pergunta
 * e entregamos ao modelo um bloco de CONTEXTO com definições verificadas e
 * links internos existentes. Isso reduz alucinação de citações e garante que
 * os caminhos sugeridos (/glossario, /oracoes/...) realmente existam.
 *
 * É 100% local: nenhuma chamada de rede, nenhum custo adicional de IA.
 */
import { GLOSSARIO } from "../data/glossario";
import { OBJECOES } from "../data/apologetica-objecoes";
import { ORACOES } from "../data/oracoes";
import { SANTOS_LISTA } from "../santos-lista";
import { PARTES, SECOES } from "../data/catecismo/index";

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Palavras sem valor discriminante em português. */
const VAZIAS = new Set([
  "a","o","as","os","um","uma","de","do","da","dos","das","e","em","no","na","nos","nas",
  "para","por","que","qual","quais","como","quando","onde","porque","por que","se","sobre",
  "com","sem","ao","aos","à","às","eu","me","meu","minha","tu","voce","você","ele","ela",
  "isso","este","esta","esse","essa","ser","é","sao","são","foi","tem","ter","posso","pode",
  "devo","deve","quero","gostaria","sophia","igreja","catolica","católica","fe","fé","deus",
]);

function termos(pergunta: string): string[] {
  return normalizar(pergunta)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 4 && !VAZIAS.has(t))
    .slice(0, 14);
}

/** Pontua um texto pela quantidade de termos da pergunta que ele contém. */
function pontuar(texto: string, chaves: string[]): number {
  const alvo = normalizar(texto);
  let total = 0;
  for (const chave of chaves) {
    if (alvo.includes(chave)) total += 2;
    else if (chave.length > 5 && alvo.includes(chave.slice(0, chave.length - 2))) total += 1;
  }
  return total;
}

type Achado = { peso: number; linha: string };

function melhores(achados: Achado[], limite: number): string[] {
  return achados
    .filter((a) => a.peso > 0)
    .sort((a, b) => b.peso - a.peso)
    .slice(0, limite)
    .map((a) => a.linha);
}

/**
 * Monta o bloco de contexto para a última pergunta do usuário.
 * Retorna string vazia quando nada relevante é encontrado.
 */
export function contextoDoPortal(pergunta: string): string {
  const chaves = termos(pergunta);
  if (chaves.length === 0) return "";

  const glossario = melhores(
    Object.entries(GLOSSARIO).map(([slug, e]) => ({
      peso: pontuar(`${e.termo} ${e.definicao}`, chaves) + pontuar(slug, chaves),
      linha: `- **${e.termo}** — ${e.definicao}${e.ref ? ` (${e.ref})` : ""} · /glossario#${slug}`,
    })),
    5,
  );

  const catecismo = melhores(
    [
      ...PARTES.map((p) => ({
        peso: pontuar(`${p.titulo} ${p.resumo}`, chaves),
        linha: `- CIC, Parte ${p.num}: ${p.titulo} (${p.paragrafos}) · /catecismo/${p.slug}`,
      })),
      ...(SECOES as SecaoLike[]).map((s) => ({
        peso: pontuar(`${s.titulo} ${s.resumo}`, chaves),
        linha: `- CIC ${s.paragrafos} — ${s.titulo} · /catecismo/${partePorNumero(s.parte)}`,
      })),
    ],
    5,
  );

  const oracoes = melhores(
    ORACOES.map((o) => ({
      peso: pontuar(`${o.titulo} ${o.categoria} ${o.nota ?? ""}`, chaves),
      linha: `- **${o.titulo}** (${o.categoria})${o.nota ? ` — ${o.nota}` : ""} · /oracoes#oracao-${o.slug}`,
    })),
    4,
  );

  const santos = melhores(
    SANTOS_LISTA.map((s) => ({
      peso: pontuar(`${s.nome} ${s.body}`, chaves),
      linha: `- **${s.nome}** (${s.data}) — ${s.body} · /santos/${s.slug}`,
    })),
    4,
  );

  const objecoes = melhores(
    OBJECOES.map((o) => ({
      peso: pontuar(`${o.objecao} ${o.categoria} ${o.resposta.join(" ")}`, chaves),
      linha: `- Objeção “${o.objecao}” — fontes já verificadas no portal: ${o.fontes.slice(0, 3).join("; ")} · /apologetica#${o.slug}`,
    })),
    3,
  );

  const blocos: string[] = [];
  if (glossario.length) blocos.push(`## Glossário do portal\n${glossario.join("\n")}`);
  if (catecismo.length) blocos.push(`## Catecismo (estrutura oficial)\n${catecismo.join("\n")}`);
  if (santos.length) blocos.push(`## Santos no acervo\n${santos.join("\n")}`);
  if (oracoes.length) blocos.push(`## Orações disponíveis\n${oracoes.join("\n")}`);
  if (objecoes.length) blocos.push(`## Apologética já documentada\n${objecoes.join("\n")}`);

  if (blocos.length === 0) return "";

  return `\n\n# CONTEXTO VERIFICADO DO PORTAL (uso interno)
Os itens abaixo vêm do acervo real do Portal Católico e são factualmente confiáveis.
Regras: prefira estas definições e referências às da tua memória; use SOMENTE os
caminhos internos listados aqui ao indicar páginas; não cites este bloco como
se fosse um documento do Magistério; se nada aqui servir, ignora-o em silêncio.

${blocos.join("\n\n")}`;
}

type SecaoLike = { slug: string; parte: number; titulo: string; paragrafos: string; resumo: string };

function partePorNumero(num: number): string {
  return PARTES.find((p) => p.num === num)?.slug ?? "credo";
}
