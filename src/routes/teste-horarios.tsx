import { createFileRoute } from "@tanstack/react-router";
import { HorariosTarefas } from "@/components/portal/HorariosTarefas";
export const Route = createFileRoute("/teste-horarios")({ component: () => <div className="p-6"><HorariosTarefas /></div> });
