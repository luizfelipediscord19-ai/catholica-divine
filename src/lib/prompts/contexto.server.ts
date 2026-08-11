/**
 * Aterramento (grounding) da Sophia no acervo real do Portal Católico.
 *
 * Antes de responder, procuramos no conteúdo estático do site (glossário,
 * catecismo, orações, santos, banco de objeções, livros da Bíblia) os itens
 * ligados à pergunta e entregamos ao modelo um bloco de CONTEXTO com
 * definições verificadas e links internos existentes. Isso reduz alucinação
 * de citações e garante que os caminhos sugeridos realmente existam.
 *
 * É 100% local: nenhuma chamada de rede, nenhum custo adicional de IA.
 */
import { GLOSSARIO } from "../data/glossario";
import { OBJECOES } from "../data/apologetica-objecoes";
import { ORACOES } from "../data/oracoes";
import { SANTOS_LISTA } from "../santos-lista";
import { PARTES, SECOES } from "../data/catecismo/index";
import { LIVROS } from "../data/biblia/index";

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
  "mais","muito","tudo","nada","entao","então","favor","explique","explica","fale","diga",
  "significa","significado","porq","pra","pro","ja","já","tambem","também","sempre","nunca",
]);

/**
 * Sinônimos, formas populares e termos latinos → palavras que realmente
 * aparecem no acervo. Permite que "hóstia" encontre "Eucaristia" e que
 * "extrema-unção" encontre "Unção dos Enfermos".
 */
const SINONIMOS: Record<string, string[]> = {
  hostia: ["eucaristia", "comunhao", "transubstanciacao"],
  missa: ["eucaristia", "liturgia", "sacrificio"],
  comungar: ["eucaristia", "comunhao"],
  confessar: ["confissao", "penitencia", "reconciliacao"],
  confissao: ["penitencia", "reconciliacao", "absolvicao"],
  pecado: ["penitencia", "graca", "contricao", "mortal", "venial"],
  "extrema-uncao": ["uncao", "enfermos"],
  extremauncao: ["uncao", "enfermos"],
  crisma: ["confirmacao"],
  batizar: ["batismo"],
  casamento: ["matrimonio"],
  padre: ["ordem", "sacerdocio", "presbitero"],
  ordenacao: ["ordem", "sacerdocio"],
  terco: ["rosario", "misterios"],
  rosario: ["misterios", "maria"],
  ave: ["maria", "ave-maria"],
  purgatorio: ["escatologia", "almas", "purificacao"],
  inferno: ["escatologia", "condenacao"],
  ceu: ["escatologia", "beatifica", "gloria"],
  papa: ["primado", "pedro", "infalibilidade", "magisterio"],
  biblia: ["escritura", "canon", "inspiracao"],
  trindade: ["trinidade", "pessoas", "hipostatica", "consubstancial"],
  jesus: ["cristo", "encarnacao", "hipostatica", "redencao"],
  espirito: ["pentecostes", "dons", "paraclito"],
  ansiedade: ["esperanca", "confianca", "oracao", "abandono"],
  depressao: ["esperanca", "consolacao", "cruz"],
  luto: ["esperanca", "ressurreicao", "sufragio"],
  medo: ["confianca", "fortaleza", "esperanca"],
  tentacao: ["virtude", "graca", "combate", "castidade"],
  vicio: ["virtude", "capitais", "temperanca"],
  jejum: ["penitencia", "quaresma", "abstinencia"],
  quaresma: ["penitencia", "jejum", "conversao"],
  advento: ["natal", "esperanca", "vinda"],
  santo: ["canonizacao", "virtude", "martir"],
  anjo: ["angelologia", "guarda", "arcanjo"],
  maria: ["mariologia", "imaculada", "assuncao", "theotokos"],
  latim: ["liturgia", "tridentina", "gregoriano"],
  vocacao: ["discernimento", "estado", "sacerdocio", "vida religiosa"],
};

function expandir(chaves: string[]): string[] {
  const saida = new Set(chaves);
  for (const c of chaves) {
    for (const extra of SINONIMOS[c] ?? []) saida.add(extra);
  }
  return [...saida].slice(0, 26);
}

function termos(pergunta: string): string[] {
  const base = normalizar(pergunta)
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 4 && !VAZIAS.has(t))
    .slice(0, 18);
  return expandir(base);
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

/** Corta um texto longo preservando frases inteiras. */
function trecho(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  const ponto = corte.lastIndexOf(". ");
  return (ponto > max * 0.5 ? corte.slice(0, ponto + 1) : corte.trimEnd() + "…");
}

/**
 * Reconhece referências bíblicas escritas de muitas formas:
 * "Jo 3,16", "João 3:16", "1 Cor 13", "salmo 23", "Mt 5,3-12".
 * Devolve linhas com o caminho interno real do capítulo.
 */
function referenciasBiblicas(pergunta: string): string[] {
  const texto = normalizar(pergunta);
  const linhas: string[] = [];
  const vistos = new Set<string>();

  for (const livro of LIVROS) {
    const nome = normalizar(livro.nome);
    const abrev = normalizar(livro.abrev);
    // "1 joao" também escrito "1joao"; aceita ponto na abreviatura ("jo.")
    const nomeRe = nome.replace(/^(\d)\s*/, "$1\\s*");
    const padrao = new RegExp(
      `(?:${nomeRe}|${abrev.replace(/^(\d)\s*/, "$1\\s*")}\\.?)\\s*(\\d{1,3})(?:\\s*[,:.]\\s*(\\d{1,3}))?`,
      "g",
    );
    let m: RegExpExecArray | null;
    while ((m = padrao.exec(texto))) {
      const cap = Math.min(Math.max(Number(m[1]), 1), livro.capitulos);
      const chave = `${livro.slug}-${cap}`;
      if (vistos.has(chave)) continue;
      vistos.add(chave);
      linhas.push(
        `- **${livro.nome} ${cap}**${m[2] ? `,${m[2]}` : ""} (${livro.abrev}, ${livro.testamento}, ${livro.grupo}) · /biblia/${livro.slug}/${cap}`,
      );
    }
    if (linhas.length >= 4) break;
  }
  return linhas;
}

/**
 * Monta o bloco de contexto para a conversa.
 * `pergunta` deve conter a última mensagem do usuário e, se houver, um resumo
 * das anteriores — assim perguntas curtas de continuação não perdem o assunto.
 * Retorna string vazia quando nada relevante é encontrado.
 */
export function contextoDoPortal(pergunta: string): string {
  const chaves = termos(pergunta);
  if (chaves.length === 0) return "";

  const glossario = melhores(
    Object.entries(GLOSSARIO).map(([slug, e]) => ({
      peso: pontuar(`${e.termo} ${e.definicao}`, chaves) + pontuar(slug, chaves) * 2,
      linha: `- **${e.termo}** — ${trecho(e.definicao, 420)}${e.ref ? ` (${e.ref})` : ""} · /glossario#${slug}`,
    })),
    7,
  );

  const catecismo = melhores(
    [
      ...PARTES.map((p) => ({
        peso: pontuar(`${p.titulo} ${p.resumo}`, chaves),
        linha: `- CIC, Parte ${p.num}: ${p.titulo} (${p.paragrafos}) · /catecismo/${p.slug}`,
      })),
      ...(SECOES as SecaoLike[]).map((s) => ({
        peso: pontuar(`${s.titulo} ${s.resumo}`, chaves) * 2,
        linha: `- CIC ${s.paragrafos} — ${s.titulo}: ${trecho(s.resumo, 260)} · /catecismo/${partePorNumero(s.parte)}`,
      })),
    ],
    7,
  );

  const oracoes = melhores(
    ORACOES.map((o) => ({
      peso: pontuar(`${o.titulo} ${o.categoria} ${o.nota ?? ""}`, chaves),
      linha: `- **${o.titulo}** (${o.categoria})${o.nota ? ` — ${trecho(o.nota, 200)}` : ""} · /oracoes#oracao-${o.slug}`,
    })),
    6,
  );

  const santos = melhores(
    SANTOS_LISTA.map((s) => ({
      peso: pontuar(`${s.nome} ${s.body}`, chaves),
      linha: `- **${s.nome}** (${s.data}) — ${trecho(s.body, 300)} · /santos/${s.slug}`,
    })),
    5,
  );

  const objecoes = melhores(
    OBJECOES.map((o) => ({
      peso: pontuar(`${o.objecao} ${o.categoria} ${o.resposta.join(" ")}`, chaves),
      linha: `- Objeção “${o.objecao}” — resposta do portal: ${trecho(o.resposta.join(" "), 380)} (fontes: ${o.fontes.slice(0, 3).join("; ")}) · /apologetica#${o.slug}`,
    })),
    4,
  );

  const livros = melhores(
    LIVROS.map((l) => ({
      peso: pontuar(`${l.nome} ${l.grupo} ${l.resumo}`, chaves),
      linha: `- **${l.nome}** (${l.abrev}, ${l.capitulos} capítulos, ${l.testamento}) — ${trecho(l.resumo, 220)} · /biblia/${l.slug}`,
    })),
    4,
  );

  const referencias = referenciasBiblicas(pergunta);

  const blocos: string[] = [];
  if (referencias.length)
    blocos.push(`## Referências bíblicas citadas (caminhos reais)\n${referencias.join("\n")}`);
  if (glossario.length) blocos.push(`## Glossário do portal\n${glossario.join("\n")}`);
  if (catecismo.length) blocos.push(`## Catecismo (estrutura oficial)\n${catecismo.join("\n")}`);
  if (livros.length) blocos.push(`## Livros bíblicos no acervo\n${livros.join("\n")}`);
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
