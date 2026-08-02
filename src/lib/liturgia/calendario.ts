/**
 * Calendário litúrgico — cálculo real (nenhum dado fixo).
 *
 * Baseia-se nas Normas Universais sobre o Ano Litúrgico e o Calendário
 * (Paulo VI, motu proprio *Mysterii Paschalis*, 14.02.1969) e no computus
 * gregoriano da Páscoa (algoritmo de Meeus/Jones/Butcher).
 */

export type TempoLiturgico =
  | "advento"
  | "natal"
  | "quaresma"
  | "triduo"
  | "pascal"
  | "comum";

export type CorLiturgica = "verde" | "roxo" | "branco" | "vermelho" | "rosa";

export type DiaLiturgico = {
  /** ISO yyyy-mm-dd da data local consultada. */
  iso: string;
  tempo: TempoLiturgico;
  tempoNome: string;
  cor: CorLiturgica;
  corNome: string;
  /** Ciclo dominical do Lecionário: A, B ou C. */
  anoLiturgico: "A" | "B" | "C";
  /** Ciclo ferial do Lecionário: I (anos ímpares) ou II (anos pares). */
  cicloFerial: "I" | "II";
  /** Semana do tempo (ex.: 18 no Tempo Comum, 2 no Advento). */
  semana: number;
  /** Nome calculado da celebração — usado como fallback da API. */
  celebracao: string;
  /** Datas-chave do ano litúrgico corrente. */
  pascoa: string;
  cinzas: string;
  pentecostes: string;
  advento: string;
};

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const DIAS = [
  "Domingo", "2ª feira", "3ª feira", "4ª feira", "5ª feira", "6ª feira", "Sábado",
];

const TEMPO_NOME: Record<TempoLiturgico, string> = {
  advento: "Advento",
  natal: "Tempo do Natal",
  quaresma: "Quaresma",
  triduo: "Tríduo Pascal",
  pascal: "Tempo Pascal",
  comum: "Tempo Comum",
};

const COR_NOME: Record<CorLiturgica, string> = {
  verde: "Verde",
  roxo: "Roxo",
  branco: "Branco",
  vermelho: "Vermelho",
  rosa: "Rosa",
};

/** Data em UTC-neutro (meia-noite) para aritmética segura de dias. */
function d(y: number, m: number, day: number): Date {
  return new Date(Date.UTC(y, m - 1, day));
}

function addDays(base: Date, n: number): Date {
  return new Date(base.getTime() + n * 86400000);
}

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

export function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Normaliza uma data local para meia-noite UTC do mesmo dia civil. */
export function normalizar(date: Date): Date {
  return d(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/** Domingo de Páscoa (computus gregoriano — Meeus/Jones/Butcher). */
export function pascoa(ano: number): Date {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const e = Math.floor(b / 4);
  const f = b % 4;
  const g = Math.floor((b + 8) / 25);
  const h = Math.floor((b - g + 1) / 3);
  const i = (19 * a + b - e - h + 15) % 30;
  const k = Math.floor(c / 4);
  const l = c % 4;
  const m = Math.floor((a + 11 * i) / 319);
  const n = (2 * f + 2 * k - i - l + 32) % 7;
  const mes = Math.floor((i - m + n + 90) / 25);
  const dia = ((i - m + n + mes + 19) % 32);
  return d(ano, mes, dia);
}

/** 1º Domingo do Advento do ano civil informado (início do ano litúrgico). */
export function primeiroDomingoAdvento(ano: number): Date {
  const natal = d(ano, 12, 25);
  // 4º domingo antes do Natal.
  return addDays(natal, -(natal.getUTCDay() || 7) - 21);
}

/** Batismo do Senhor: domingo após 6 de janeiro (ou 7/8 de janeiro se coincidir). */
export function batismoDoSenhor(ano: number): Date {
  const epifania = d(ano, 1, 6);
  const dow = epifania.getUTCDay();
  return dow === 0 ? addDays(epifania, 1) : addDays(epifania, 7 - dow);
}

export function festasMoveis(ano: number) {
  const p = pascoa(ano);
  return {
    pascoa: p,
    cinzas: addDays(p, -46),
    ramos: addDays(p, -7),
    ceia: addDays(p, -3),
    paixao: addDays(p, -2),
    ascensao: addDays(p, 39),
    pentecostes: addDays(p, 49),
    trindade: addDays(p, 56),
    corpusChristi: addDays(p, 60),
    sagradoCoracao: addDays(p, 68),
    cristoRei: addDays(primeiroDomingoAdvento(ano), -7),
  };
}

/** Ciclo dominical A/B/C do ano litúrgico que termina no ano civil informado. */
function cicloDominical(anoFinal: number): "A" | "B" | "C" {
  const r = anoFinal % 3;
  return r === 1 ? "A" : r === 2 ? "B" : "C";
}

function ordinal(n: number): string {
  return `${n}º`;
}

/**
 * Determina tempo litúrgico, cor, ciclo e semana para qualquer data.
 */
export function diaLiturgico(date: Date = new Date()): DiaLiturgico {
  const hoje = normalizar(date);
  const anoCivil = hoje.getUTCFullYear();

  const adventoEste = primeiroDomingoAdvento(anoCivil);
  // Ano litúrgico corrente: começa no Advento anterior a `hoje`.
  const inicioAno = hoje >= adventoEste ? adventoEste : primeiroDomingoAdvento(anoCivil - 1);
  const anoFinal = inicioAno.getUTCFullYear() + 1;

  const fPascal = festasMoveis(anoFinal);
  const batismo = batismoDoSenhor(anoFinal);
  const natal = d(inicioAno.getUTCFullYear(), 12, 25);

  let tempo: TempoLiturgico;
  let cor: CorLiturgica;
  let semana = 0;

  if (hoje >= inicioAno && hoje < natal) {
    tempo = "advento";
    cor = "roxo";
    semana = Math.floor(diffDays(hoje, inicioAno) / 7) + 1;
  } else if (hoje >= natal && hoje <= batismo) {
    tempo = "natal";
    cor = "branco";
    semana = Math.floor(diffDays(hoje, natal) / 7) + 1;
  } else if (hoje >= fPascal.cinzas && hoje < fPascal.ceia) {
    tempo = "quaresma";
    cor = "roxo";
    semana = Math.floor((diffDays(hoje, fPascal.cinzas) + 4) / 7) + 1;
  } else if (hoje >= fPascal.ceia && hoje < fPascal.pascoa) {
    tempo = "triduo";
    cor = hoje.getTime() === fPascal.paixao.getTime() ? "vermelho" : "branco";
    semana = 0;
  } else if (hoje >= fPascal.pascoa && hoje <= fPascal.pentecostes) {
    tempo = "pascal";
    cor = hoje.getTime() === fPascal.pentecostes.getTime() ? "vermelho" : "branco";
    semana = Math.floor(diffDays(hoje, fPascal.pascoa) / 7) + 1;
  } else {
    tempo = "comum";
    cor = "verde";
    // Semanas do Tempo Comum: contadas do Batismo; retomadas após Pentecostes.
    const semanasAntes = Math.floor(diffDays(fPascal.cinzas, batismo) / 7) + 1;
    if (hoje < fPascal.cinzas) {
      semana = Math.floor(diffDays(hoje, batismo) / 7) + 1;
    } else {
      const cristoRei = festasMoveis(anoFinal).cristoRei;
      const semanasRestantes = Math.floor(diffDays(cristoRei, hoje) / 7);
      semana = 34 - semanasRestantes;
      if (semana < semanasAntes) semana = semanasAntes;
    }
  }

  const dow = hoje.getUTCDay();
  const nomeDia = DIAS[dow];
  const celebracao =
    dow === 0
      ? `${ordinal(semana)} Domingo do ${TEMPO_NOME[tempo]}`
      : `${nomeDia} da ${ordinal(semana)} Semana do ${TEMPO_NOME[tempo]}`;

  return {
    iso: toIso(hoje),
    tempo,
    tempoNome: TEMPO_NOME[tempo],
    cor,
    corNome: COR_NOME[cor],
    anoLiturgico: cicloDominical(anoFinal),
    cicloFerial: anoFinal % 2 === 1 ? "I" : "II",
    semana,
    celebracao,
    pascoa: toIso(fPascal.pascoa),
    cinzas: toIso(fPascal.cinzas),
    pentecostes: toIso(fPascal.pentecostes),
    advento: toIso(inicioAno),
  };
}

/** Data em português: "domingo, 2 de agosto de 2026". */
export function dataExtenso(date: Date = new Date()): string {
  const dia = date.getDate();
  const mes = MESES[date.getMonth()];
  const semana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][date.getDay()];
  return `${semana}, ${dia} de ${mes} de ${date.getFullYear()}`;
}

/** Classe de cor Tailwind (tokens do design system) por cor litúrgica. */
export const COR_CLASSE: Record<CorLiturgica, string> = {
  verde: "text-emerald-400 border-emerald-400/40",
  roxo: "text-violet-400 border-violet-400/40",
  branco: "text-paper border-paper/40",
  vermelho: "text-red-400 border-red-400/40",
  rosa: "text-pink-400 border-pink-400/40",
};
