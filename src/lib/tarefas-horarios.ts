/**
 * Horários configuráveis das tarefas espirituais diárias.
 *
 * O membro escolhe o período (manhã, tarde, noite ou hora exata) de cada
 * tarefa; o lembrete é disparado automaticamente quando o horário chega.
 */

export type TarefaDiariaId = "evangelho" | "leitura" | "oracao";

export type TarefaDiaria = {
  id: TarefaDiariaId;
  titulo: string;
  mensagem: string;
  href: string;
  /** Horário padrão (HH:MM). */
  padrao: string;
};

export const TAREFAS_DIARIAS: TarefaDiaria[] = [
  {
    id: "evangelho",
    titulo: "Evangelho do dia",
    mensagem: "Reserve um instante para a liturgia de hoje.",
    href: "/liturgia-diaria",
    padrao: "07:00",
  },
  {
    id: "leitura",
    titulo: "Continuar a leitura bíblica",
    mensagem: "Retome o capítulo onde parou e marque como lido.",
    href: "/biblia",
    padrao: "12:30",
  },
  {
    id: "oracao",
    titulo: "Oração do dia",
    mensagem: "Registre sua oração no painel espiritual e mantenha a sequência.",
    href: "/painel",
    padrao: "20:00",
  },
];

/** Períodos sugeridos para escolha rápida. */
export const PERIODOS = [
  { rotulo: "Manhã", hora: "07:00" },
  { rotulo: "Meio-dia", hora: "12:30" },
  { rotulo: "Tarde", hora: "16:00" },
  { rotulo: "Noite", hora: "20:00" },
] as const;

export type ConfigTarefa = { hora: string; ativa: boolean };
export type ConfigTarefas = Record<TarefaDiariaId, ConfigTarefa>;

const CHAVE = "portal:tarefas-horarios";
export const EVENTO_HORARIOS = "portal:tarefas-horarios-alterados";

function horaValida(valor: unknown): valor is string {
  return typeof valor === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(valor);
}

export function configPadrao(): ConfigTarefas {
  return TAREFAS_DIARIAS.reduce((acc, t) => {
    acc[t.id] = { hora: t.padrao, ativa: true };
    return acc;
  }, {} as ConfigTarefas);
}

export function lerConfigTarefas(): ConfigTarefas {
  const base = configPadrao();
  if (typeof window === "undefined") return base;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return base;
    const salvo = JSON.parse(bruto) as Partial<Record<TarefaDiariaId, Partial<ConfigTarefa>>>;
    for (const t of TAREFAS_DIARIAS) {
      const item = salvo?.[t.id];
      if (!item) continue;
      if (horaValida(item.hora)) base[t.id].hora = item.hora;
      if (typeof item.ativa === "boolean") base[t.id].ativa = item.ativa;
    }
  } catch {
    /* dado corrompido ou navegação privada */
  }
  return base;
}

export function salvarConfigTarefas(config: ConfigTarefas) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(config));
  } catch {
    /* navegação privada */
  }
  window.dispatchEvent(new CustomEvent(EVENTO_HORARIOS));
}

export function rotuloDoPeriodo(hora: string) {
  const h = Number(hora.slice(0, 2));
  if (h < 12) return "manhã";
  if (h < 18) return "tarde";
  return "noite";
}

/** Minutos desde a meia-noite de uma hora HH:MM. */
export function emMinutos(hora: string) {
  const [h, m] = hora.split(":");
  return Number(h) * 60 + Number(m);
}
