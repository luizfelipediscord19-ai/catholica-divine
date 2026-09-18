import { SANTOS as RICOS, type Santo as SantoRico } from "@/lib/data/santos";
import { imagemSanto } from "@/lib/data/santos-imagens";

export type SantoBasico = {
  nome: string;
  data: string;
  body: string;
};

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’`""]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const PREFIXOS = [
  "sao-",
  "santo-",
  "santa-",
  "bem-aventurado-",
  "bem-aventurada-",
  "beato-",
  "beata-",
  "nossa-senhora-",
];

function semPrefixo(slug: string): string {
  for (const p of PREFIXOS) if (slug.startsWith(p)) return slug.slice(p.length);
  return slug;
}

/**
 * Índice em memória dos santos com ficha completa. Com mais de 700 perfis,
 * varrer a lista a cada cartão deixava a galeria e a abertura da ficha lentas;
 * aqui a busca é imediata, aceitando o slug com ou sem o prefixo de título.
 */
const INDICE_RICOS = new Map<string, SantoRico>();
for (const r of RICOS) {
  for (const chave of [r.slug, semPrefixo(r.slug)]) {
    if (chave && !INDICE_RICOS.has(chave)) INDICE_RICOS.set(chave, r);
  }
}

export function findRico(slugUrl: string): SantoRico | undefined {
  return INDICE_RICOS.get(slugUrl) ?? INDICE_RICOS.get(semPrefixo(slugUrl));
}

/**
 * Retrato de um santo para listas e cartões: primeiro a arte catalogada no
 * portal, depois a arte da própria ficha (os perfis novos trazem a obra do
 * Wikimedia Commons). Sem isso, os santos recém-incluídos apareciam sem imagem.
 */
export function retratoDoSanto(slug: string): { url?: string; reserva?: string } {
  const propria = imagemSanto(slug);
  const rico = findRico(slug);
  const daFicha = rico?.imagem || (rico ? imagemSanto(rico.slug)?.url : undefined);
  return {
    url: propria?.url ?? daFicha,
    reserva: propria?.remoto ?? (propria ? daFicha : undefined),
  };
}

export function buildSantoView(slugUrl: string, basico?: SantoBasico) {
  const rico = findRico(slugUrl);
  const propria = imagemSanto(slugUrl) ?? (rico ? imagemSanto(rico.slug) : undefined);
  return {
    nome: rico?.nome ?? basico?.nome ?? "Santo",
    titulo: rico?.titulo,
    data: rico ? formatarData(rico.data) : basico?.data,
    seculo: rico?.seculo,
    padroeiro: rico?.padroeiro,
    resumo: rico?.resumo ?? basico?.body,
    biografia: rico?.biografia ?? basico?.body,
    virtudes: rico?.virtudes,
    frase: rico?.frase,
    imagem: rico?.imagem || propria?.url,
    imagemReserva: propria?.remoto,
    creditoImagem: rico?.creditoImagem ?? propria?.credito,
    licencaImagem: rico?.licencaImagem,
    fontes: rico?.fontes,
    temRico: Boolean(rico),
  };
}

function formatarData(dd_mm: string): string {
  // converte "04/10" → "4 de outubro"
  const m = dd_mm.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (!m) return dd_mm;
  const dia = parseInt(m[1], 10);
  const mes = parseInt(m[2], 10);
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  return `${dia} de ${meses[mes - 1] ?? ""}`.trim();
}
