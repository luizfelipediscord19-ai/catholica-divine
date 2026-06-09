import { SANTOS as RICOS, type Santo as SantoRico } from "@/lib/data/santos";

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

export function findRico(slugUrl: string): SantoRico | undefined {
  const a = slugUrl;
  const b = semPrefixo(slugUrl);
  return RICOS.find((r) => {
    const rs = r.slug;
    const rsBare = semPrefixo(rs);
    return rs === a || rs === b || rsBare === a || rsBare === b;
  });
}

export function buildSantoView(slugUrl: string, basico?: SantoBasico) {
  const rico = findRico(slugUrl);
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
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];
  return `${dia} de ${meses[mes - 1] ?? ""}`.trim();
}
