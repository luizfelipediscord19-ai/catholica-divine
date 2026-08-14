/**
 * Data civil "de hoje" no fuso litúrgico de referência do Portal
 * (America/Sao_Paulo). O servidor roda em UTC: sem esta normalização,
 * das 21h à meia-noite no Brasil o site passaria a mostrar a celebração,
 * o santo e as leituras do dia seguinte.
 */

export const FUSO_LITURGICO = "America/Sao_Paulo";

/** ISO yyyy-mm-dd do dia civil corrente no fuso litúrgico. */
export function isoHoje(agora: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO_LITURGICO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(agora);
}

/** Converte ISO yyyy-mm-dd em Date à meia-noite UTC (aritmética segura). */
export function dataDoIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Date correspondente ao dia civil corrente no fuso litúrgico. */
export function dataHoje(agora: Date = new Date()): Date {
  return dataDoIso(isoHoje(agora));
}
