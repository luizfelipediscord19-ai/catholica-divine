/**
 * Citações clicáveis dentro do texto corrido.
 *
 * Percorre o conteúdo renderizado e transforma citações escritas em texto
 * ("CIC §495", "LG 60", "cân. 915", "Jo 6, 51") em links para a fonte:
 * passagens bíblicas abrem a Bíblia do portal; documentos do Magistério e o
 * Catecismo abrem o texto oficial em vatican.va.
 */
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { caminhoEscritura } from "@/lib/referencias";
import {
  DOCUMENTOS_MAGISTERIO,
  SIGLAS_MAGISTERIO,
  URL_CDC,
  urlCatecismoOficial,
} from "@/lib/fontes/magisterio";

const RE_CIC =
  /(?:CIC|Catecismo(?:\s+da\s+Igreja\s+Cat[óo]lica)?)\s*§{1,2}\s?(\d{1,4})(?:\s?[-–]\s?\d{1,4})?/g;
const RE_CANON = /c[âa]n\.\s?(\d{1,4})(?:\s?,\s?§\s?\d)?/gi;
const RE_DOC = new RegExp(`\\b(${SIGLAS_MAGISTERIO.join("|")})\\s(\\d{1,3})\\b`, "g");
const RE_BIBLIA =
  /\b((?:[1-3]\s?)?[A-ZÁÂÃÉÊÍÓÔÕÚÇ][a-záâãéêíóôõúç]{1,14}\.?)\s(\d{1,3})\s?[,:]\s?(\d{1,3})(?:\s?[-–]\s?\d{1,3})?/g;

const CLASSE =
  "underline decoration-gold/40 decoration-dotted underline-offset-[3px] hover:decoration-gold hover:text-gold transition-colors";

type Achado = { inicio: number; fim: number; no: ReactNode };

function achados(texto: string): Achado[] {
  const lista: Achado[] = [];

  for (const m of texto.matchAll(RE_CIC)) {
    const n = Number(m[1]);
    if (!n) continue;
    lista.push({
      inicio: m.index!,
      fim: m.index! + m[0].length,
      no: (
        <a
          href={urlCatecismoOficial(n)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Abrir o Catecismo da Igreja Católica, §${n} (texto oficial, vatican.va)`}
          className={CLASSE}
        >
          {m[0]}
        </a>
      ),
    });
  }

  for (const m of texto.matchAll(RE_CANON)) {
    // "Trento, Sess. VII, cân. 9" é cânon conciliar, não do Código de 1983.
    const antes = texto.slice(Math.max(0, m.index! - 60), m.index!);
    if (/Trento|Sess\.|Nice(ia|ia)|Nicéia|Calced[óo]nia|Latr[ãa]o|Vaticano I\b|Constantinopla|[ÉE]feso|Orange|Trullo|Florença|Li[ãa]o/i.test(antes))
      continue;
    lista.push({
      inicio: m.index!,
      fim: m.index! + m[0].length,
      no: (
        <a
          href={URL_CDC}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir o Código de Direito Canônico de 1983 (texto oficial em português, vatican.va)"
          className={CLASSE}
        >
          {m[0]}
        </a>
      ),
    });
  }

  for (const m of texto.matchAll(RE_DOC)) {
    const doc = DOCUMENTOS_MAGISTERIO[m[1]!];
    if (!doc) continue;
    // "DH 1310" é Denzinger-Hünermann, não Dignitatis Humanae.
    if (Number(m[2]) < 1 || Number(m[2]) > doc.maxNumero) continue;
    lista.push({
      inicio: m.index!,
      fim: m.index! + m[0].length,
      no: (
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${doc.nome} ${m[2]} — ${doc.grau}, ${doc.autoria}. Abrir o texto oficial (vatican.va)`}
          className={CLASSE}
        >
          {m[0]}
        </a>
      ),
    });
  }

  for (const m of texto.matchAll(RE_BIBLIA)) {
    const livro = m[1]!.replace(/\./g, "").trim();
    const caminho = caminhoEscritura(livro, Number(m[2]), Number(m[3]));
    if (!caminho) continue;
    lista.push({
      inicio: m.index!,
      fim: m.index! + m[0].length,
      no: (
        <Link to={caminho} title={`Ler ${m[0]} na Bíblia do portal`} className={CLASSE}>
          {m[0]}
        </Link>
      ),
    });
  }

  // remove sobreposições, mantendo a primeira ocorrência de cada trecho
  lista.sort((a, b) => a.inicio - b.inicio || b.fim - a.fim);
  const limpa: Achado[] = [];
  let ultimoFim = -1;
  for (const a of lista) {
    if (a.inicio < ultimoFim) continue;
    limpa.push(a);
    ultimoFim = a.fim;
  }
  return limpa;
}

function linkificarTexto(texto: string, chave: string): ReactNode {
  const marcas = achados(texto);
  if (!marcas.length) return texto;
  const partes: ReactNode[] = [];
  let cursor = 0;
  marcas.forEach((m, i) => {
    if (m.inicio > cursor) partes.push(texto.slice(cursor, m.inicio));
    partes.push(
      <span key={`${chave}-${i}`}>{m.no}</span>,
    );
    cursor = m.fim;
  });
  if (cursor < texto.length) partes.push(texto.slice(cursor));
  return <>{partes}</>;
}

/** Tags cujo conteúdo nunca deve receber links automáticos. */
const IGNORAR = new Set(["a", "code", "pre", "h1", "button"]);

/** Aplica os links a todos os nós de texto de uma árvore React. */
export function linkificarNos(no: ReactNode, chave = "c"): ReactNode {
  if (typeof no === "string") return linkificarTexto(no, chave);
  if (Array.isArray(no))
    return Children.map(no, (filho, i) => linkificarNos(filho, `${chave}-${i}`));
  if (isValidElement(no)) {
    const props = no.props as { children?: ReactNode; [k: string]: unknown };
    if (typeof no.type === "string" && IGNORAR.has(no.type)) return no;
    if (props["data-sem-fontes"]) return no;
    if (props.children === undefined) return no;
    return cloneElement(
      no,
      undefined,
      linkificarNos(props.children, chave),
    );
  }
  return no;
}
