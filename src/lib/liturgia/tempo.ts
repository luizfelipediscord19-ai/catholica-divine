/**
 * Cálculo do tempo litúrgico do rito romano para uma data qualquer.
 *
 * Base: Normas Universais sobre o Ano Litúrgico (1969) e a regra de Niceia
 * para a data da Páscoa (algoritmo de Gauss/Meeus, calendário gregoriano).
 * Puro, sem rede: serve tanto no servidor quanto no navegador.
 */

export type TempoLiturgico =
  | "Advento"
  | "Natal"
  | "Tempo Comum"
  | "Quaresma"
  | "Semana Santa"
  | "Tríduo Pascal"
  | "Tempo Pascal";

export type CorLiturgica = "Roxo" | "Branco" | "Verde" | "Vermelho" | "Rosa";

export type SituacaoLiturgica = {
  tempo: TempoLiturgico;
  cor: CorLiturgica;
  /** Âncora do calendário na página (#id da seção). */
  secao: string;
  descricao: string;
  /** Domingo de Páscoa do ano litúrgico em curso. */
  pascoa: Date;
};

function utc(ano: number, mes: number, dia: number) {
  return new Date(Date.UTC(ano, mes - 1, dia));
}

function somarDias(d: Date, dias: number) {
  return new Date(d.getTime() + dias * 86400000);
}

function soData(d: Date) {
  return utc(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

/** Domingo de Páscoa (gregoriano) — algoritmo anônimo/Meeus. */
export function pascoaDe(ano: number): Date {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(ano, mes, dia);
}

/** Primeiro Domingo do Advento: 4º domingo antes de 25 de dezembro. */
export function primeiroDomingoAdvento(ano: number): Date {
  const natal = utc(ano, 12, 25);
  const diaSemana = natal.getUTCDay(); // 0 = domingo
  const quartoDomingoAntes = somarDias(natal, -(diaSemana === 0 ? 7 : diaSemana) - 21);
  return quartoDomingoAntes;
}

export function situacaoLiturgica(referencia: Date = new Date()): SituacaoLiturgica {
  const hoje = soData(referencia);
  const ano = hoje.getUTCFullYear();

  const adventoAtual = primeiroDomingoAdvento(ano);
  // Ano litúrgico começa no Advento: depois dele, a Páscoa de referência é a do ano seguinte.
  const anoPascal = hoje >= adventoAtual ? ano + 1 : ano;
  const pascoa = pascoaDe(anoPascal);

  const cinzas = somarDias(pascoaDe(ano), -46);
  const ramos = somarDias(pascoaDe(ano), -7);
  const quintaSanta = somarDias(pascoaDe(ano), -3);
  const pascoaDoAno = pascoaDe(ano);
  const pentecostes = somarDias(pascoaDoAno, 49);
  const batismo = (() => {
    // Batismo do Senhor: domingo após 6 de janeiro (ou 2ª feira seguinte, simplificado).
    const epifania = utc(ano, 1, 6);
    const dia = epifania.getUTCDay();
    return somarDias(epifania, dia === 0 ? 7 : 7 - dia);
  })();

  if (hoje >= adventoAtual && hoje <= utc(ano, 12, 24)) {
    return {
      tempo: "Advento",
      cor: "Roxo",
      secao: "advento",
      descricao: "Tempo de devota e alegre expectativa da vinda do Senhor.",
      pascoa,
    };
  }
  if (hoje >= utc(ano, 12, 25) || hoje <= batismo) {
    return {
      tempo: "Natal",
      cor: "Branco",
      secao: "natal",
      descricao: "A Igreja celebra a manifestação do Verbo encarnado entre nós.",
      pascoa,
    };
  }
  if (hoje >= quintaSanta && hoje < pascoaDoAno) {
    return {
      tempo: "Tríduo Pascal",
      cor: "Vermelho",
      secao: "triduo",
      descricao: "Ápice do ano: Paixão, Morte e Ressurreição do Senhor.",
      pascoa,
    };
  }
  if (hoje >= ramos && hoje < quintaSanta) {
    return {
      tempo: "Semana Santa",
      cor: "Roxo",
      secao: "semana-santa",
      descricao: "Da entrada messiânica em Jerusalém à Ceia do Senhor.",
      pascoa,
    };
  }
  if (hoje >= cinzas && hoje < ramos) {
    return {
      tempo: "Quaresma",
      cor: "Roxo",
      secao: "quaresma",
      descricao: "Quarenta dias de oração, jejum e esmola rumo à Páscoa.",
      pascoa,
    };
  }
  if (hoje >= pascoaDoAno && hoje <= pentecostes) {
    return {
      tempo: "Tempo Pascal",
      cor: "Branco",
      secao: "pascoa",
      descricao: "Cinquenta dias de júbilo pela Ressurreição, até Pentecostes.",
      pascoa,
    };
  }
  return {
    tempo: "Tempo Comum",
    cor: "Verde",
    secao: hoje < cinzas ? "comum-1" : "comum-2",
    descricao: "Tempo do crescimento na fé, à escuta contínua do Evangelho.",
    pascoa,
  };
}

const FORMATO = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function dataLonga(d: Date): string {
  return FORMATO.format(soData(d));
}
