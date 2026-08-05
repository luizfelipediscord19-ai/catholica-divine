// Server-only. Triagem automática do conteúdo do fórum antes de ficar visível.

const PALAVRAS_BLOQUEADAS = [
  "porra",
  "caralho",
  "merda",
  "puta",
  "viado",
  "idiota",
  "imbecil",
  "burro",
  "retardado",
  "otário",
  "vagabundo",
  "herege maldito",
];

const PADROES_SUSPEITOS: { regex: RegExp; motivo: string }[] = [
  { regex: /(https?:\/\/|www\.)\S+/gi, motivo: "link externo" },
  { regex: /\b(?:\+?55\s?)?\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b/g, motivo: "telefone" },
  { regex: /[\w.+-]+@[\w-]+\.[\w.]+/g, motivo: "e-mail" },
  { regex: /\b(pix|whatsapp|whats|compre|promo[çc][ãa]o|desconto|ganhe dinheiro)\b/gi, motivo: "spam" },
];

export type ResultadoRevisao = {
  status: "aprovado" | "em_revisao";
  motivo: string | null;
};

/**
 * Decide se o texto pode ficar visível na hora ou se aguarda revisão humana.
 * Nunca recusa em definitivo: na dúvida, retém.
 */
export function revisarTexto(...partes: (string | undefined)[]): ResultadoRevisao {
  const texto = partes.filter(Boolean).join("\n");
  const normalizado = texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  for (const palavra of PALAVRAS_BLOQUEADAS) {
    const alvo = palavra
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    if (normalizado.includes(alvo)) {
      return { status: "em_revisao", motivo: "linguagem ofensiva" };
    }
  }

  for (const { regex, motivo } of PADROES_SUSPEITOS) {
    if (new RegExp(regex.source, regex.flags).test(texto)) {
      return { status: "em_revisao", motivo };
    }
  }

  // Texto quase todo em maiúsculas costuma ser grito ou spam.
  const letras = texto.replace(/[^A-Za-zÀ-ÿ]/g, "");
  if (letras.length > 40) {
    const maiusculas = letras.replace(/[^A-ZÀ-Þ]/g, "").length;
    if (maiusculas / letras.length > 0.7) {
      return { status: "em_revisao", motivo: "texto em maiúsculas" };
    }
  }

  if (texto.length > 6000) return { status: "em_revisao", motivo: "texto muito longo" };

  return { status: "aprovado", motivo: null };
}
