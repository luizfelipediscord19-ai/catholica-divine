import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import {
  PERIODOS,
  TAREFAS_DIARIAS,
  lerConfigTarefas,
  salvarConfigTarefas,
  type ConfigTarefas,
} from "@/lib/tarefas-horarios";

/** Deixa o membro escolher o horário de cada lembrete diário. */
export function HorariosTarefas() {
  const [config, setConfig] = useState<ConfigTarefas | null>(null);

  useEffect(() => setConfig(lerConfigTarefas()), []);

  if (!config) return null;

  const atualizar = (proximo: ConfigTarefas) => {
    setConfig(proximo);
    salvarConfigTarefas(proximo);
  };

  return (
    <section className="border border-gold/20 bg-background/60 p-5 sm:p-6">
      <header className="flex items-center gap-2">
        <Clock className="size-4 text-gold" aria-hidden="true" />
        <h2 className="text-[11px] uppercase tracking-[0.22em] text-gold">
          Horários dos lembretes
        </h2>
      </header>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Escolha o período de cada tarefa diária. O aviso aparece automaticamente no horário
        marcado — e também no telefone, se você ativou os avisos no aparelho.
      </p>

      <ul className="mt-4 space-y-4">
        {TAREFAS_DIARIAS.map((tarefa) => {
          const item = config[tarefa.id];
          return (
            <li key={tarefa.id} className="border-t border-gold/10 pt-4 first:border-0 first:pt-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{tarefa.titulo}</p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {tarefa.mensagem}
                  </p>
                </div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={item.ativa}
                    onChange={(e) =>
                      atualizar({
                        ...config,
                        [tarefa.id]: { ...item, ativa: e.target.checked },
                      })
                    }
                    className="size-4 accent-[hsl(var(--gold,45_70%_55%))]"
                  />
                  Ativo
                </label>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {PERIODOS.map((p) => (
                  <button
                    key={p.hora}
                    type="button"
                    onClick={() =>
                      atualizar({ ...config, [tarefa.id]: { ...item, hora: p.hora } })
                    }
                    aria-pressed={item.hora === p.hora}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                      item.hora === p.hora
                        ? "bg-gold text-deep"
                        : "border border-gold/25 text-muted-foreground hover:border-gold/60 hover:text-foreground"
                    }`}
                  >
                    {p.rotulo}
                  </button>
                ))}
                <label className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Hora
                  <input
                    type="time"
                    value={item.hora}
                    onChange={(e) =>
                      atualizar({
                        ...config,
                        [tarefa.id]: { ...item, hora: e.target.value || tarefa.padrao },
                      })
                    }
                    className="border border-gold/25 bg-background px-2 py-1 text-xs text-foreground"
                    aria-label={`Horário de ${tarefa.titulo}`}
                  />
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
