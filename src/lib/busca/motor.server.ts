// Motor de busca indexada do portal. Roda só no servidor: varre o texto
// integral hospedado localmente (Bíblia) e os corpora doutrinais em memória,
// devolvendo trechos ranqueados com destaque.

import { LIVROS } from "@/lib/data/biblia/index";
import { INTRODUCOES } from "@/lib/data/biblia/introducoes";
import { PARTES, SECOES } from "@/lib/data/catecismo/index";
import { ARTIGOS } from "@/lib/data/catecismo/artigos";
import { AULAS } from "@/lib/data/catecismo/aulas";
import { GLOSSARIO } from "@/lib/data/glossario";
import { OBJECOES } from "@/lib/data/apologetica-objecoes";
import { ORACOES } from "@/lib/data/oracoes";
import { SANTOS_LISTA } from "@/lib/santos-lista";
import { SACRAMENTOS } from "@/lib/data/sacramentos";
import { TRILHAS } from "@/lib/data/trilhas/index";
import { VERBETES_ENCICLOPEDIA } from "@/lib/data/enciclopedia";
import { TEMAS_ENCICLOPEDIA } from "@/lib/data/enciclopedia-temas";
import { TEMAS_DOUTRINA } from "@/lib/data/doutrina-temas";
import { TEMAS_APOLOGETICA } from "@/lib/data/apologetica-temas";
import { TEMAS_SACRAMENTAIS } from "@/lib/data/sacramentos-temas";
import { PADRES, ERA_NOME } from "@/lib/data/padres";
import { CONCILIOS } from "@/lib/data/concilios";
import { SANTORAL, GRAU_NOME, dataFixaExtenso } from "@/lib/liturgia/santoral";
import { expandirTermos, palavrasChave } from "@/lib/busca/linguagem";

export type EscopoBusca =
  | "biblia"
  | "catecismo"
  | "sacramentos"
  | "magisterio"
  | "enciclopedia"
  | "glossario"
  | "padres"
  | "concilios"
  | "liturgia"
  | "santos"
  | "oracoes"
  | "formacao";

export const ESCOPOS: { id: EscopoBusca; label: string; descricao: string }[] = [
  { id: "biblia", label: "Bíblia", descricao: "Texto integral dos 73 livros" },
  { id: "catecismo", label: "Catecismo", descricao: "Partes, artigos, aulas e sínteses do CIC" },
  { id: "sacramentos", label: "Sacramentos", descricao: "Os sete sacramentos, sacramentais e rituais" },
  { id: "magisterio", label: "Magistério e apologética", descricao: "Banco apologético e razões para crer com fontes" },
  { id: "enciclopedia", label: "Enciclopédia", descricao: "Verbetes e páginas temáticas interligadas" },
  { id: "glossario", label: "Glossário", descricao: "Termos doutrinais definidos com referência" },
  { id: "padres", label: "Padres da Igreja", descricao: "Padres apostólicos, gregos, latinos e do deserto" },
  { id: "concilios", label: "Concílios", descricao: "Os vinte e um concílios ecumênicos e suas definições" },
  { id: "liturgia", label: "Liturgia e calendário", descricao: "Celebrações do Calendário Romano e do Brasil" },
  { id: "santos", label: "Santos", descricao: "Vidas, títulos e patronatos" },
  { id: "oracoes", label: "Orações", descricao: "Textos orantes da tradição" },
  { id: "formacao", label: "Trilhas de formação", descricao: "Lições das trilhas de estudo do portal" },
];

export type Resultado = {
  id: string;
  escopo: EscopoBusca;
  titulo: string;
  referencia: string;
  trecho: string;
  href: string;
  pontos: number;
};

export type RespostaBusca = {
  termo: string;
  total: number;
  duracaoMs: number;
  porEscopo: Record<EscopoBusca, number>;
  resultados: Resultado[];
};

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Palavras significativas: aceita perguntas inteiras em linguagem natural. */
function tokens(termo: string): string[] {
  const chaves = palavrasChave(termo);
  if (chaves.length) return chaves;
  return normalizar(termo)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 2)
    .slice(0, 8);
}

/**
 * Pontuação tolerante: basta uma palavra-chave aparecer, mas quanto mais
 * palavras (e sinônimos católicos) o trecho contém, mais alto ele fica.
 * A frase exata continua valendo muito.
 */
function pontuar(alvo: string, termoNorm: string, toks: string[], equivalentes: string[] = []): number {
  let pontos = 0;
  let achados = 0;
  for (const tok of toks) {
    const i = alvo.indexOf(tok);
    if (i < 0) continue;
    achados += 1;
    pontos += 3;
    if (i === 0 || !/[a-z0-9]/.test(alvo[i - 1] ?? "")) pontos += 2; // início de palavra
  }
  if (achados === 0) {
    // Nenhuma palavra literal: tenta o vocabulário equivalente.
    let extras = 0;
    for (const eq of equivalentes) if (alvo.includes(eq)) extras += 1;
    if (extras === 0) return 0;
    return Math.min(extras, 4) * 2;
  }
  if (achados === toks.length && toks.length > 1) pontos += 6; // cobertura total
  for (const eq of equivalentes) if (alvo.includes(eq)) pontos += 2;
  if (toks.length > 1 && alvo.includes(termoNorm)) pontos += 12;
  return pontos;
}

/** Recorta ~220 caracteres ao redor da primeira ocorrência. */
function trechoDe(original: string, alvoNorm: string, toks: string[]): string {
  const primeiro = toks
    .map((t) => alvoNorm.indexOf(t))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];
  if (primeiro === undefined || original.length <= 240) return original;
  const inicio = Math.max(0, primeiro - 90);
  const fim = Math.min(original.length, inicio + 240);
  return `${inicio > 0 ? "… " : ""}${original.slice(inicio, fim).trim()}${fim < original.length ? " …" : ""}`;
}

// ── Corpus doutrinal (leve, fica em memória) ────────────────────────────────

type Documento = {
  id: string;
  escopo: EscopoBusca;
  titulo: string;
  referencia: string;
  texto: string;
  href: string;
  peso: number;
};

let corpus: Documento[] | null = null;

function construirCorpus(): Documento[] {
  if (corpus) return corpus;
  const docs: Documento[] = [];

  for (const parte of PARTES) {
    docs.push({
      id: `cic-parte-${parte.slug}`,
      escopo: "catecismo",
      titulo: `Parte ${parte.num} — ${parte.titulo}`,
      referencia: parte.paragrafos,
      texto: parte.resumo,
      href: `/catecismo/${parte.slug}`,
      peso: 1.4,
    });
  }
  for (const secao of SECOES) {
    const parte = PARTES.find((p) => p.num === secao.parte);
    docs.push({
      id: `cic-secao-${secao.slug}`,
      escopo: "catecismo",
      titulo: secao.titulo,
      referencia: `CIC ${secao.paragrafos}`,
      texto: secao.resumo,
      href: `/catecismo/${parte?.slug ?? "credo"}`,
      peso: 1.2,
    });
  }

  for (const [slug, termo] of Object.entries(GLOSSARIO)) {
    docs.push({
      id: `glo-${slug}`,
      escopo: "glossario",
      titulo: termo.termo,
      referencia: termo.ref ?? "Glossário doutrinal",
      texto: `${termo.termo}. ${termo.definicao}`,
      href: `/glossario#${slug}`,
      peso: 1.3,
    });
  }

  for (const obj of OBJECOES) {
    docs.push({
      id: `apo-${obj.slug}`,
      escopo: "magisterio",
      titulo: obj.objecao,
      referencia: `${obj.categoria} · ${obj.fontes.slice(0, 2).join(" · ")}`,
      texto: `${obj.objecao} ${obj.resposta.join(" ")} ${obj.fontes.join(" ")}`,
      href: `/apologetica#${obj.slug}`,
      peso: 1.1,
    });
  }

  for (const artigo of ARTIGOS) {
    docs.push({
      id: `cic-art-${artigo.slug}`,
      escopo: "catecismo",
      titulo: artigo.titulo,
      referencia: `CIC §§ ${artigo.de}-${artigo.ate} · ${artigo.bloco}`,
      texto: `${artigo.sintese} ${artigo.pontos.join(" ")}`,
      href: `/catecismo/artigos#${artigo.slug}`,
      peso: 1.4,
    });
  }

  for (const aula of AULAS) {
    docs.push({
      id: `cic-aula-${aula.slug}`,
      escopo: "catecismo",
      titulo: `Semana ${aula.semana} — ${aula.titulo}`,
      referencia: `Aulas de catecismo · CIC ${aula.estudo}`,
      texto: [
        aula.objetivo,
        aula.exposicao.join(" "),
        aula.perguntas.map((p) => `${p.pergunta} ${p.resposta}`).join(" "),
      ].join(" "),
      href: `/catecismo/aulas/${aula.slug}`,
      peso: 1.2,
    });
  }

  for (const verbete of VERBETES_ENCICLOPEDIA) {
    docs.push({
      id: `enc-${verbete.slug}`,
      escopo: "enciclopedia",
      titulo: verbete.termo,
      referencia: `${verbete.categoria} · ${verbete.referencias.slice(0, 2).join(" · ")}`,
      texto: `${verbete.termo}. ${verbete.sintese} ${verbete.referencias.join(" ")}`,
      href: `/enciclopedia#${verbete.slug}`,
      peso: 1.3,
    });
  }

  const TEMAS: { base: string; rotulo: string; itens: { slug: string; nome: string; resumo: string; secoes: { titulo: string; paragrafos: string[] }[] }[] }[] = [
    { base: "/enciclopedia", rotulo: "Enciclopédia", itens: TEMAS_ENCICLOPEDIA },
    { base: "/doutrina", rotulo: "Doutrina", itens: TEMAS_DOUTRINA },
    { base: "/apologetica", rotulo: "Razões para crer", itens: TEMAS_APOLOGETICA },
    { base: "/sacramentos", rotulo: "Sacramentos", itens: TEMAS_SACRAMENTAIS },
  ];
  for (const grupo of TEMAS) {
    for (const tema of grupo.itens) {
      docs.push({
        id: `tema-${grupo.base}-${tema.slug}`,
        escopo: grupo.base === "/sacramentos" ? "sacramentos" : "enciclopedia",
        titulo: tema.nome,
        referencia: `${grupo.rotulo} · página temática`,
        texto: [
          tema.resumo,
          tema.secoes.map((s) => `${s.titulo} ${s.paragrafos.join(" ")}`).join(" "),
        ].join(" "),
        href: `${grupo.base}/${tema.slug}`,
        peso: 1.35,
      });
    }
  }

  for (const padre of PADRES) {
    docs.push({
      id: `pad-${padre.slug}`,
      escopo: "padres",
      titulo: padre.nome,
      referencia: `${ERA_NOME[padre.era]} · ${padre.datas}`,
      texto: `${padre.nome} ${padre.sede} ${padre.contribuicao} ${padre.obras.join(" ")} ${padre.referencias.join(" ")}`,
      href: `/padres-da-igreja#${padre.slug}`,
      peso: 1.25,
    });
  }

  for (const concilio of CONCILIOS) {
    docs.push({
      id: `con-${concilio.slug}`,
      escopo: "concilios",
      titulo: `${concilio.nome} (${concilio.anos})`,
      referencia: `${concilio.numero}º concílio ecumênico · ${concilio.local}`,
      texto: `${concilio.contexto} ${concilio.definicoes.join(" ")} ${concilio.papa} ${concilio.referencias.join(" ")}`,
      href: `/concilios#${concilio.slug}`,
      peso: 1.3,
    });
  }

  for (const celebracao of SANTORAL) {
    docs.push({
      id: `lit-${celebracao.data}-${celebracao.nome.slice(0, 20)}`,
      escopo: "liturgia",
      titulo: celebracao.nome,
      referencia: `${dataFixaExtenso(celebracao.data)} · ${GRAU_NOME[celebracao.grau]}${celebracao.brasil ? " · próprio do Brasil" : ""}`,
      texto: `${celebracao.nome} ${GRAU_NOME[celebracao.grau]} ${celebracao.nota ?? ""}`,
      href: celebracao.slug ? `/santos/${celebracao.slug}` : "/calendario-liturgico",
      peso: 1.05,
    });
  }

  for (const santo of SANTOS_LISTA) {
    docs.push({
      id: `san-${santo.slug}`,
      escopo: "santos",
      titulo: santo.nome,
      referencia: santo.data,
      texto: `${santo.nome} ${santo.data} ${santo.body}`,
      href: `/santos/${santo.slug}`,
      peso: 1.1,
    });
  }

  for (const oracao of ORACOES) {
    docs.push({
      id: `ora-${oracao.slug}`,
      escopo: "oracoes",
      titulo: oracao.titulo,
      referencia: [oracao.categoria, oracao.nota].filter(Boolean).join(" · "),
      texto: `${oracao.titulo} ${oracao.paraQue ?? ""} ${oracao.texto}`,
      href: `/oracoes#${oracao.slug}`,
      peso: 1,
    });
  }

  for (const sacramento of SACRAMENTOS) {
    docs.push({
      id: `sac-${sacramento.slug}`,
      escopo: "sacramentos",
      titulo: sacramento.nome,
      referencia: `${sacramento.grupo} · ${sacramento.catecismo.slice(0, 22)}`,
      texto: [
        sacramento.resumo,
        sacramento.catecismo,
        sacramento.historia,
        sacramento.efeitos.join(" "),
        sacramento.baseBiblica.map((b) => `${b.ref} ${b.texto}`).join(" "),
        sacramento.faq.map((f) => `${f.q} ${f.a}`).join(" "),
      ].join(" "),
      href: `/sacramentos#${sacramento.slug}`,
      peso: 1.4,
    });
  }

  for (const trilha of TRILHAS) {
    docs.push({
      id: `tri-${trilha.slug}`,
      escopo: "formacao",
      titulo: trilha.titulo,
      referencia: `Trilha ${trilha.nivel} · ${trilha.licoes.length} lições`,
      texto: `${trilha.subtitulo} ${trilha.licoes.map((l) => `${l.titulo} ${l.resumo}`).join(" ")}`,
      href: `/trilhas/${trilha.slug}`,
      peso: 1.2,
    });
    for (const licao of trilha.licoes) {
      docs.push({
        id: `tri-${trilha.slug}-${licao.slug}`,
        escopo: "formacao",
        titulo: licao.titulo,
        referencia: `${trilha.titulo} · ${trilha.nivel}`,
        texto: `${licao.titulo} ${licao.resumo}`,
        href: `/trilhas/${trilha.slug}/${licao.slug}`,
        peso: 1,
      });
    }
  }

  for (const livro of LIVROS) {
    const intro = INTRODUCOES[livro.slug];
    if (!intro) continue;
    const partesIntro = [
      intro.contexto,
      intro.temas.join(" "),
      intro.passagens.join(" "),
      intro.cristo,
    ]
      .filter(Boolean)
      .join(" ");
    docs.push({
      id: `intro-${livro.slug}`,
      escopo: "biblia",
      titulo: `Introdução a ${livro.nome}`,
      referencia: `${livro.abrev} · ${livro.grupo}`,
      texto: partesIntro,
      href: `/biblia/${livro.slug}`,
      peso: 1.2,
    });
  }

  corpus = docs;
  return docs;
}

// ── Texto bíblico integral (carregado sob demanda por livro) ────────────────

type VersoTexto = { v: number; t: string };
type LivroJson = { slug: string; nome: string; capitulos: Record<string, VersoTexto[]> };

const BRUTOS = import.meta.glob<{ default: LivroJson }>("../data/biblia/almeida/*.json");
const ARQUIVOS: Record<string, () => Promise<{ default: LivroJson }>> = {};
for (const [caminho, carregar] of Object.entries(BRUTOS)) {
  const slug = caminho.replace(/\.json$/, "").split("/").pop();
  if (slug) ARQUIVOS[slug] = carregar;
}

const cacheLivro = new Map<string, LivroJson | null>();

async function carregarLivro(slug: string): Promise<LivroJson | null> {
  if (cacheLivro.has(slug)) return cacheLivro.get(slug)!;
  const carregar = ARQUIVOS[slug];
  if (!carregar) {
    cacheLivro.set(slug, null);
    return null;
  }
  try {
    const mod = await carregar();
    cacheLivro.set(slug, mod.default);
    return mod.default;
  } catch {
    cacheLivro.set(slug, null);
    return null;
  }
}

async function buscarNaBiblia(
  termoNorm: string,
  toks: string[],
  limite: number,
): Promise<Resultado[]> {
  const achados: Resultado[] = [];

  for (const livro of LIVROS) {
    const dados = await carregarLivro(livro.slug);
    if (!dados) continue;
    for (const [cap, versos] of Object.entries(dados.capitulos)) {
      for (const verso of versos) {
        const alvo = normalizar(verso.t);
        // No texto bíblico mantemos o rigor: o versículo precisa conter todas
        // as palavras-chave, senão uma pergunta longa devolveria ruído.
        if (toks.length > 1 && !toks.every((t) => alvo.includes(t))) continue;
        const pontos = pontuar(alvo, termoNorm, toks);
        if (!pontos) continue;
        achados.push({
          id: `v-${livro.slug}-${cap}-${verso.v}`,
          escopo: "biblia",
          titulo: `${livro.nome} ${cap},${verso.v}`,
          referencia: `${livro.abrev} ${cap},${verso.v} · ${livro.grupo}`,
          trecho: trechoDe(verso.t, alvo, toks),
          href: `/biblia/${livro.slug}/${cap}`,
          pontos: pontos + 2,
        });
      }
    }
    if (achados.length > limite * 12) break; // já há material suficiente
  }

  return achados;
}

export async function buscarIndexado(input: {
  termo: string;
  escopos?: EscopoBusca[];
  limite?: number;
}): Promise<RespostaBusca> {
  const inicio = Date.now();
  const termo = input.termo.trim().slice(0, 120);
  const limite = Math.min(Math.max(input.limite ?? 40, 5), 80);
  const escopos = new Set<EscopoBusca>(
    input.escopos && input.escopos.length ? input.escopos : ESCOPOS.map((e) => e.id),
  );
  const toks = tokens(termo);
  const vazio: RespostaBusca = {
    termo,
    total: 0,
    duracaoMs: 0,
    porEscopo: Object.fromEntries(ESCOPOS.map((e) => [e.id, 0])) as Record<EscopoBusca, number>,
    resultados: [],
  };
  if (!toks.length) return vazio;

  const termoNorm = normalizar(termo);
  const achados: Resultado[] = [];

  const equivalentes = expandirTermos(toks);

  for (const doc of construirCorpus()) {
    if (!escopos.has(doc.escopo)) continue;
    const alvo = normalizar(`${doc.titulo} ${doc.referencia} ${doc.texto}`);
    const pontos = pontuar(alvo, termoNorm, toks, equivalentes);
    if (!pontos) continue;
    achados.push({
      id: doc.id,
      escopo: doc.escopo,
      titulo: doc.titulo,
      referencia: doc.referencia,
      trecho: trechoDe(doc.texto, normalizar(doc.texto), toks),
      href: doc.href,
      pontos: Math.round(pontos * doc.peso),
    });
  }

  if (escopos.has("biblia")) {
    achados.push(...(await buscarNaBiblia(termoNorm, toks, limite)));
  }

  achados.sort((a, b) => b.pontos - a.pontos || a.titulo.localeCompare(b.titulo, "pt-BR"));

  const porEscopo = { ...vazio.porEscopo };
  for (const a of achados) porEscopo[a.escopo] += 1;

  return {
    termo,
    total: achados.length,
    duracaoMs: Date.now() - inicio,
    porEscopo,
    resultados: achados.slice(0, limite),
  };
}
