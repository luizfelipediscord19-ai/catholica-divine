import { useEffect } from "react";

import { notificar } from "@/lib/notificacoes";
import { ativadoPeloUsuario } from "@/lib/notificacoes-dispositivo";
import { inscreverAvisosServidor } from "@/lib/push/assinar";
import {
  EVENTO_HORARIOS,
  TAREFAS_DIARIAS,
  emMinutos,
  lerConfigTarefas,
  rotuloDoPeriodo,
} from "@/lib/tarefas-horarios";

const CHAVE_DISPAROS = "portal-catolico:tarefas-disparadas";

type Disparos = { data: string; ids: string[] };

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

function lerDisparos(): Disparos {
  const vazio = { data: hojeISO(), ids: [] as string[] };
  try {
    const bruto = window.localStorage.getItem(CHAVE_DISPAROS);
    if (!bruto) return vazio;
    const salvo = JSON.parse(bruto) as Disparos;
    if (salvo?.data !== vazio.data || !Array.isArray(salvo.ids)) return vazio;
    return salvo;
  } catch {
    return vazio;
  }
}

function salvarDisparos(d: Disparos) {
  try {
    window.localStorage.setItem(CHAVE_DISPAROS, JSON.stringify(d));
  } catch {
    /* navegação privada */
  }
}

/** Dispara os lembretes das tarefas espirituais no horário escolhido pelo membro. */
export function TarefasDoDia() {
  // Reforça a inscrição nos avisos do servidor (o navegador pode expirá-la).
  useEffect(() => {
    if (!ativadoPeloUsuario()) return;
    const t = window.setTimeout(() => void inscreverAvisosServidor(), 2500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    let ativo = true;

    const verificar = () => {
      if (!ativo) return;
      const config = lerConfigTarefas();
      const agora = new Date();
      const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
      const disparos = lerDisparos();
      const feitos = new Set(disparos.ids);
      let mudou = false;

      for (const tarefa of TAREFAS_DIARIAS) {
        const item = config[tarefa.id];
        if (!item.ativa) continue;
        if (feitos.has(tarefa.id)) continue;
        if (minutosAgora < emMinutos(item.hora)) continue;

        notificar({
          tipo: "tarefa",
          titulo: tarefa.titulo,
          mensagem: `${tarefa.mensagem} (lembrete da ${rotuloDoPeriodo(item.hora)}, ${item.hora})`,
          href: tarefa.href,
          chave: `tarefa:${disparos.data}:${tarefa.id}`,
        });
        feitos.add(tarefa.id);
        mudou = true;
      }

      if (mudou) salvarDisparos({ data: disparos.data, ids: [...feitos] });
    };

    const inicial = window.setTimeout(verificar, 1500);
    const intervalo = window.setInterval(verificar, 30_000);
    const aoVoltar = () => document.visibilityState === "visible" && verificar();
    document.addEventListener("visibilitychange", aoVoltar);
    window.addEventListener(EVENTO_HORARIOS, verificar);

    return () => {
      ativo = false;
      window.clearTimeout(inicial);
      window.clearInterval(intervalo);
      document.removeEventListener("visibilitychange", aoVoltar);
      window.removeEventListener(EVENTO_HORARIOS, verificar);
    };
  }, []);

  return null;
}
