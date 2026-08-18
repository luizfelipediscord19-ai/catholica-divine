/**
 * AUDITORIA AUTOMÁTICA DE CONTEÚDO — Portal Católico
 *
 * Varre todo o conteúdo textual do portal (rotas e bases de dados em src/)
 * e aponta problemas editoriais e de referência:
 *
 *  - espaços duplicados e espaços antes de pontuação;
 *  - palavras grudadas (minúscula colada em maiúscula, texto colado em pontuação);
 *  - parágrafos do Catecismo inexistentes (fora de 1–2865);
 *  - siglas magisteriais desconhecidas ou com número acima do documento;
 *  - cânones fora do Código de 1983 (1–1752);
 *  - links internos apontando para rotas que não existem;
 *  - links externos quebrados (apenas com --links, faz requisições HTTP);
 *  - santos com dados conflitantes (mesma festa/datas divergentes);
 *  - datas inconsistentes (nascimento depois da morte, canonização antes da morte).
 *
 * Uso:
 *   bun scripts/auditoria-conteudo.ts            # auditoria offline
 *   bun scripts/auditoria-conteudo.ts --links    # inclui checagem de links externos
 *   bun scripts/auditoria-conteudo.ts --json out.json
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

import { DOCUMENTOS_MAGISTERIO } from "../src/lib/fontes/magisterio";

const RAIZ = join(import.meta.dir, "..");
const SRC = join(RAIZ, "src");
const MAX_CIC = 2865;
const MAX_CANON = 1752;

type Achado = {
  tipo: string;
  gravidade: "erro" | "aviso";
  arquivo: string;
  linha: number;
  detalhe: string;
};

const achados: Achado[] = [];
function add(a: Achado) {
  achados.push(a);
}

function arquivos(dir: string, saida: string[] = []): string[] {
  for (const nome of readdirSync(dir)) {
    if (nome === "node_modules" || nome.startsWith(".")) continue;
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) arquivos(caminho, saida);
    else if (/\.(ts|tsx)$/.test(nome) && !/\.gen\.ts$/.test(nome)) saida.push(caminho);
  }
  return saida;
}

/** Rotas existentes, derivadas dos nomes de arquivo em src/routes. */
function rotasExistentes(): Set<string> {
  const rotas = new Set<string>(["/"]);
  const base = join(SRC, "routes");
  for (const caminho of arquivos(base)) {
    const rel = relative(base, caminho).replace(/\.(ts|tsx)$/, "");
    if (rel.startsWith("api/") || rel.includes("__root")) continue;
    const partes = rel
      .split(/[./]/)
      .filter((p) => p && p !== "index" && p !== "route" && !p.startsWith("_"));
    rotas.add("/" + partes.join("/"));
  }
  return rotas;
}

const ROTAS = rotasExistentes();
const SIGLAS = new Set(Object.keys(DOCUMENTOS_MAGISTERIO));

/** Heurística: a literal é prosa em português, não código nem classe CSS. */
function ehProsa(texto: string): boolean {
  if (!/\s/.test(texto)) return false;
  if (/[<>{}=|]|=>|\/\//.test(texto)) return false;
  if (/(?:^|\s)(?:[a-z-]+:)?(?:flex|grid|block|inline|hidden|absolute|relative|text|bg|border|px|py|pt|pb|mt|mb|mx|my|gap|size|w|h|min|max|rounded|shadow|font|leading|tracking|opacity|z|top|left|right|bottom|space|ring|outline|decoration|translate|scale|transition|animate|group|peer|from|via|to|col|row|items|justify|self|order|overflow|object|cursor|select|pointer|backdrop|aspect|content|data)[-[/]/.test(
      texto,
    )
  )
    return false;
  const palavras = texto.split(/\s+/).filter((p) => /^[A-Za-zÁÂÃÀÉÊÍÓÔÕÚÇáâãàéêíóôõúç'’(]/.test(p));
  if (palavras.length < 3) return false;
  // prosa em português costuma ter artigos/preposições
  return /(?:\b(?:de|da|do|das|dos|a|o|as|os|em|na|no|que|com|para|por|é|se|não|uma|um)\b)/i.test(texto);
}

/** Extrai as literais de texto de um arquivo, com o número da linha. */
function literais(conteudo: string): { linha: number; texto: string }[] {
  const saida: { linha: number; texto: string }[] = [];
  conteudo.split("\n").forEach((linha, i) => {
    for (const m of linha.matchAll(/"([^"\\]{12,})"|'([^'\\]{12,})'|`([^`\\$]{12,})`/g)) {
      const texto = m[1] ?? m[2] ?? m[3] ?? "";
      if (!ehProsa(texto)) continue;
      saida.push({ linha: i + 1, texto });
    }
  });
  return saida;
}

const externos = new Set<string>();

function auditarArquivo(caminho: string) {
  const arquivo = relative(RAIZ, caminho);
  // components/ui é código de biblioteca (shadcn), não conteúdo editorial
  if (arquivo.includes("components/ui/")) return;
  const conteudo = readFileSync(caminho, "utf8");

  // links internos
  conteudo.split("\n").forEach((linha, i) => {
    for (const m of linha.matchAll(/\bto=(?:"|')(\/[a-z0-9\-/$.]*)(?:"|')/gi)) {
      const rota = m[1]!.replace(/\/$/, "") || "/";
      if (rota.includes("$")) continue; // rota dinâmica
      if (!ROTAS.has(rota)) {
        add({
          tipo: "link interno inválido",
          gravidade: "erro",
          arquivo,
          linha: i + 1,
          detalhe: rota,
        });
      }
    }
    for (const m of linha.matchAll(/https?:\/\/[^\s"'`]+/g)) {
      // URLs de páginas do Commons trazem parênteses; retira só a pontuação final
      const url = m[0]!.replace(/[),.;]+$/, (fim) => (m[0]!.includes("(") ? fim.replace(/^\)/, "") : ""));
      externos.add(url.replace(/[.,;]+$/, ""));
    }
  });

  for (const { linha, texto } of literais(conteudo)) {
    if (/[^\s]  +[^\s]/.test(texto) || /\s{2,}$/.test(texto.trimStart())) {
      if (/\w {2,}\w/.test(texto))
        add({ tipo: "espaço duplicado", gravidade: "aviso", arquivo, linha, detalhe: texto.slice(0, 120) });
    }
    if (/\w\s+[,.;!?](?:\s|$)/.test(texto))
      add({ tipo: "espaço antes de pontuação", gravidade: "aviso", arquivo, linha, detalhe: texto.slice(0, 120) });

    // palavras grudadas: minúscula seguida de maiúscula dentro da palavra
    for (const m of texto.matchAll(/\b[a-záâãéêíóôõúç]{3,}[A-ZÁÂÃÉÊÍÓÔÕÚÇ][a-záâãéêíóôõúç]{2,}\b/g)) {
      if (/^(?:[A-Za-z]+(?:Id|Url|Js|Ts))$/.test(m[0]!)) continue;
      add({ tipo: "palavras grudadas", gravidade: "erro", arquivo, linha, detalhe: m[0]! });
    }
    // pontuação colada em palavra seguinte
    for (const m of texto.matchAll(/[a-záéíóúç][.,;:!?][a-záéíóúçA-ZÁÉÍÓÚÇ]{2,}/g)) {
      if (/\d/.test(m[0]!) || /(?:etc|ex|cf|séc|cân|pág|vol|op|cit)\./i.test(m[0]!)) continue;
      if (/^[a-z]\.[a-z]{2,}$/.test(m[0]!)) continue; // abreviações tipo a.C
      add({ tipo: "pontuação colada", gravidade: "aviso", arquivo, linha, detalhe: m[0]! });
    }

    // Catecismo inexistente
    for (const m of texto.matchAll(/(?:CIC|CCC|Catecismo(?:\s+da\s+Igreja\s+Cat[óo]lica)?)\s*(?:§{1,2}\s?)?(\d{1,5})(?:\s?[-–]\s?(\d{1,5}))?/g)) {
      for (const n of [m[1], m[2]]) {
        const v = Number(n);
        if (!n || !v) continue;
        if (v < 1 || v > MAX_CIC)
          add({ tipo: "CIC inexistente", gravidade: "erro", arquivo, linha, detalhe: `§${v}` });
      }
    }

    // cânones do Código de 1983
    for (const m of texto.matchAll(/c[âa]n\.\s?(\d{1,5})/gi)) {
      const v = Number(m[1]);
      if (v > MAX_CANON && !/Trento|Sess\.|Nice|Calced|Latr[ãa]o|[ÉE]feso/i.test(texto))
        add({ tipo: "cânon inexistente (CDC 1983)", gravidade: "erro", arquivo, linha, detalhe: m[0]! });
    }

    // siglas magisteriais
    for (const m of texto.matchAll(/\b([A-Z]{2,3})\s(\d{1,4})\b/g)) {
      const sigla = m[1]!;
      const num = Number(m[2]);
      if (!/^(?:LG|DV|SC|GS|DH|VS|EV|RM|FC|CA|EG|LF|AL|CT|SS|CV|LS|PT|MM|HV|RN|UR|AG|NA|GE|PO|OT|CD|IM|AA|DI|EN)$/.test(sigla))
        continue;
      const doc = DOCUMENTOS_MAGISTERIO[sigla];
      if (!doc) {
        add({ tipo: "documento não catalogado", gravidade: "aviso", arquivo, linha, detalhe: `${sigla} ${num}` });
        continue;
      }
      if (num > doc.maxNumero && sigla !== "DH")
        add({
          tipo: "referência fora do documento",
          gravidade: "erro",
          arquivo,
          linha,
          detalhe: `${sigla} ${num} (máx. ${doc.maxNumero})`,
        });
    }
  }
}

/** Santos: datas incoerentes e dados conflitantes entre entradas. */
async function auditarSantos() {
  let santos: unknown[] = [];
  try {
    const mod = (await import("../src/lib/data/santos")) as Record<string, unknown>;
    for (const v of Object.values(mod)) if (Array.isArray(v) && v.length > 5) santos = v as unknown[];
  } catch {
    return;
  }
  const porNome = new Map<string, Record<string, unknown>[]>();
  for (const s of santos as Record<string, unknown>[]) {
    const nome = String(s["nome"] ?? s["slug"] ?? "");
    if (!nome) continue;
    porNome.set(nome, [...(porNome.get(nome) ?? []), s]);

    const ano = (v: unknown) => {
      const m = String(v ?? "").match(/(\d{3,4})/);
      return m ? Number(m[1]) : undefined;
    };
    const nasc = ano(s["nascimento"]);
    const morte = ano(s["morte"] ?? s["falecimento"]);
    const canon = ano(s["canonizacao"]);
    const arquivo = "src/lib/data/santos";
    if (nasc && morte && nasc > morte)
      add({ tipo: "data inconsistente", gravidade: "erro", arquivo, linha: 0, detalhe: `${nome}: nascimento ${nasc} depois da morte ${morte}` });
    if (morte && canon && canon < morte)
      add({ tipo: "data inconsistente", gravidade: "erro", arquivo, linha: 0, detalhe: `${nome}: canonização ${canon} antes da morte ${morte}` });
    if (nasc && morte && morte - nasc > 110)
      add({ tipo: "data suspeita", gravidade: "aviso", arquivo, linha: 0, detalhe: `${nome}: ${morte - nasc} anos de vida` });
  }
  for (const [nome, lista] of porNome) {
    if (lista.length < 2) continue;
    const festas = new Set(lista.map((s) => String(s["festa"] ?? s["memoria"] ?? "")));
    if (festas.size > 1)
      add({ tipo: "santo com dados conflitantes", gravidade: "erro", arquivo: "src/lib/data/santos", linha: 0, detalhe: `${nome}: festas divergentes (${[...festas].join(" | ")})` });
  }
}

async function auditarLinksExternos() {
  const lista = [...externos].filter(
    (u) => !/localhost|example\.com|\{|\$|\*/.test(u), // ignora curingas de CSP e placeholders
  );
  let i = 0;
  const lote = 3; // Wikimedia responde 429 a rajadas grandes
  async function checar(url: string) {
    try {
      const r = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: {
          // sem User-Agent de navegador, Wikimedia e outros CDNs recusam a requisição
          "User-Agent":
            "Mozilla/5.0 (compatible; PortalCatolicoAuditoria/1.0; +https://portalcatolico.vercel.app)",
          Accept: "*/*",
        },
      });
      if (r.status === 429) {
        add({ tipo: "link com limite de requisições (429)", gravidade: "aviso", arquivo: "(externo)", linha: 0, detalhe: url });
        return;
      }
      if (r.status >= 400)
        add({ tipo: "link externo quebrado", gravidade: "erro", arquivo: "(externo)", linha: 0, detalhe: `${r.status} ${url}` });
    } catch (e) {
      add({ tipo: "link externo inacessível", gravidade: "aviso", arquivo: "(externo)", linha: 0, detalhe: `${url} — ${(e as Error).message}` });
    }
  }
  while (i < lista.length) {
    await Promise.all(lista.slice(i, i + lote).map(checar));
    i += lote;
    await new Promise((r) => setTimeout(r, 250)); // respeita os limites dos servidores
    process.stdout.write(`\r  links verificados: ${Math.min(i, lista.length)}/${lista.length}`);
  }
  process.stdout.write("\n");
}

const args = process.argv.slice(2);

for (const caminho of arquivos(SRC)) auditarArquivo(caminho);
await auditarSantos();
if (args.includes("--links")) await auditarLinksExternos();

const porTipo = new Map<string, Achado[]>();
for (const a of achados) porTipo.set(a.tipo, [...(porTipo.get(a.tipo) ?? []), a]);

console.log("\n=== AUDITORIA DE CONTEÚDO — PORTAL CATÓLICO ===\n");
for (const [tipo, lista] of [...porTipo.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${lista[0]!.gravidade === "erro" ? "🔴" : "🟠"} ${tipo}: ${lista.length}`);
  for (const a of lista.slice(0, 25)) console.log(`   ${a.arquivo}:${a.linha}  ${a.detalhe}`);
  if (lista.length > 25) console.log(`   … e mais ${lista.length - 25}`);
}
console.log(
  `\nTotal: ${achados.length} achado(s) — ${achados.filter((a) => a.gravidade === "erro").length} erro(s), ` +
    `${achados.filter((a) => a.gravidade === "aviso").length} aviso(s).`,
);

const idxJson = args.indexOf("--json");
if (idxJson >= 0) {
  const destino = args[idxJson + 1] ?? "auditoria-conteudo.json";
  writeFileSync(destino, JSON.stringify(achados, null, 2));
  console.log(`Relatório salvo em ${destino}`);
}

if (achados.some((a) => a.gravidade === "erro")) process.exitCode = 1;
