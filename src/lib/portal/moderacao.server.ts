// Server-only. Triagem automática e rígida do conteúdo do fórum.

const PALAVRAS_BLOQUEADAS = [
  // ofensas e vulgaridades
  "porra",
  "caralho",
  "merda",
  "bosta",
  "puta",
  "putaria",
  "puto",
  "viado",
  "bicha",
  "veado",
  "idiota",
  "imbecil",
  "burro",
  "retardado",
  "otario",
  "vagabundo",
  "vagabunda",
  "corno",
  "arrombado",
  "desgracado",
  "fdp",
  "filho da puta",
  "vai se fuder",
  "foder",
  "fudido",
  "cuzao",
  "escroto",
  "piranha",
  "buceta",
  "pinto",
  "rola",
  "punheta",
  "pau no cu",
  "chupa",
  // ódio / violência
  "macaco",
  "preto imundo",
  "judeu sujo",
  "morra",
  "te mato",
  "matar voce",
  "suicidio metodo",
  "nazista",
  "heil hitler",
  "hereges devem morrer",
  "herege maldito",
  "queimem",
  "estupro",
  "pedofilo",
  // inglês comum
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "nigger",
  "faggot",
  "cunt",
  "whore",
  "kill yourself",
  "kys",
];

const PADROES_SUSPEITOS: { regex: RegExp; motivo: string }[] = [
  { regex: /(https?:\/\/|www\.)\S+/gi, motivo: "link externo" },
  {
    regex: /\b[\w-]+\.(?:com|net|org|br|io|xyz|top|ru|shop)(?:\/|\b)/gi,
    motivo: "endereço externo",
  },
  { regex: /\b(?:\+?55\s?)?\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b/g, motivo: "telefone" },
  { regex: /[\w.+-]+@[\w-]+\.[\w.]+/g, motivo: "e-mail" },
  {
    regex:
      /\b(pix|whatsapp|whats|telegram|compre|promo[çc][ãa]o|desconto|ganhe dinheiro|invista|bitcoin|cripto|apostas?|bet)\b/gi,
    motivo: "spam",
  },
  // tentativas de injeção / XSS / SQL
  { regex: /<\s*(script|iframe|img|svg|object|embed|style|link|meta)\b/gi, motivo: "código HTML" },
  { regex: /(javascript:|data:text\/html|on\w+\s*=)/gi, motivo: "script embutido" },
  {
    regex:
      /(\bunion\b[\s\S]{0,20}\bselect\b|\bdrop\s+table\b|\binsert\s+into\b|--\s*$|\/\*[\s\S]*\*\/)/gi,
    motivo: "injeção SQL",
  },
  { regex: /\{\{[\s\S]*\}\}|\$\{[\s\S]*\}/g, motivo: "template injection" },
  // prompt injection contra a IA
  {
    regex:
      /\b(ignore (as )?(instru[çc][õo]es|previous instructions)|system prompt|voc[êe] agora [ée])\b/gi,
    motivo: "manipulação da IA",
  },
];

const PADROES_GRAVES: { regex: RegExp; motivo: string }[] = [
  {
    regex:
      /\b(?:matar|assassinar|agredir|atacar|explodir)\b[\s\S]{0,40}\b(?:papa|bispo|padre|freira|cat[oó]lico|igreja)\b/gi,
    motivo: "ameaça dirigida",
  },
  {
    regex:
      /\b(?:dados pessoais|endere[cç]o|cpf|telefone)\b[\s\S]{0,30}\b(?:divulgar|expor|publicar)\b/gi,
    motivo: "risco de exposição pessoal",
  },
  { regex: /\b(?:nazismo|supremacia racial|limpeza [ée]tnica)\b/gi, motivo: "extremismo ou ódio" },
];

const PADROES_TEOLOGICOS: { regex: RegExp; motivo: string }[] = [
  {
    regex:
      /\b(?:o papa|o magist[ée]rio|o conc[ií]lio)\b[\s\S]{0,45}\b(?:maldito|sat[aâ]nico|demon[ií]aco|ileg[ií]timo)\b/gi,
    motivo: "ofensa ao Papa ou ao Magistério",
  },
  {
    regex:
      /\b(?:trindade|divindade de cristo|ressurrei[cç][aã]o)\b[\s\S]{0,35}\b(?:fraude|mentira|inven[cç][aã]o)\b/gi,
    motivo: "afirmação doutrinal grave",
  },
];

/** Reduz disfarces (l33t, repetições, espaçamento) antes de comparar palavras. */
function normalizarAgressivo(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[0@]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5\$/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z\s]/g, " ")
    .replace(/(.)\1{2,}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export type ResultadoRevisao = {
  status: "aprovado" | "em_revisao";
  motivo: string | null;
  risco: "baixo" | "medio" | "alto";
};

/**
 * Decide se o texto pode ficar visível na hora ou se aguarda revisão humana.
 * Nunca recusa em definitivo: na dúvida, retém.
 */
export function revisarTexto(...partes: (string | undefined)[]): ResultadoRevisao {
  const texto = partes.filter(Boolean).join("\n");
  const normalizado = normalizarAgressivo(texto);
  const compacto = normalizado.replace(/\s/g, "");

  for (const { regex, motivo } of PADROES_GRAVES) {
    if (new RegExp(regex.source, regex.flags).test(texto)) {
      return { status: "em_revisao", motivo, risco: "alto" };
    }
  }

  for (const { regex, motivo } of PADROES_TEOLOGICOS) {
    if (new RegExp(regex.source, regex.flags).test(texto)) {
      return { status: "em_revisao", motivo, risco: "medio" };
    }
  }

  for (const palavra of PALAVRAS_BLOQUEADAS) {
    const alvo = normalizarAgressivo(palavra);
    if (!alvo) continue;
    if (alvo.includes(" ")) {
      if (normalizado.includes(alvo)) {
        return { status: "em_revisao", motivo: "linguagem ofensiva", risco: "alto" };
      }
    } else if (compacto.includes(alvo.replace(/\s/g, ""))) {
      return { status: "em_revisao", motivo: "linguagem ofensiva", risco: "alto" };
    }
  }

  for (const { regex, motivo } of PADROES_SUSPEITOS) {
    if (new RegExp(regex.source, regex.flags).test(texto)) {
      return { status: "em_revisao", motivo, risco: motivo === "link externo" ? "medio" : "alto" };
    }
  }

  // Texto quase todo em maiúsculas costuma ser grito ou spam.
  const letras = texto.replace(/[^A-Za-zÀ-ÿ]/g, "");
  if (letras.length > 40) {
    const maiusculas = letras.replace(/[^A-ZÀ-Þ]/g, "").length;
    if (maiusculas / letras.length > 0.7) {
      return { status: "em_revisao", motivo: "texto em maiúsculas", risco: "medio" };
    }
  }

  // Caracteres de controle / invisíveis usados para burlar filtros.
  if (/[\u0000-\u0008\u000b-\u001f\u200b-\u200f\u202a-\u202e]/.test(texto)) {
    return { status: "em_revisao", motivo: "caracteres invisíveis", risco: "alto" };
  }

  if (texto.length > 6000) {
    return { status: "em_revisao", motivo: "texto muito longo", risco: "medio" };
  }

  return { status: "aprovado", motivo: null, risco: "baixo" };
}

/** Remove qualquer marcação/controle antes de persistir o texto do usuário. */
export function sanitizarTexto(texto: string, limite = 6000): string {
  return texto
    .replace(/[\u0000-\u0008\u000b-\u001f\u200b-\u200f\u202a-\u202e]/g, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, limite);
}
