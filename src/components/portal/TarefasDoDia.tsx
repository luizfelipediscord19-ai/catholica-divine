import { useEffect } from "react";

import { notificar } from "@/lib/notificacoes";

const CHAVE_DIA = "portal-catolico:tarefas-do-dia";

const TAREFAS: { id: string; titulo: string; mensagem: string; href: string }[] = [
  {
    id: "evangelho",
    titulo: "Evangelho do dia",
    mensagem: "Reserve um instante para a liturgia de hoje.",
    href: "/liturgia-diaria",
  },
  {
    id: "leitura",
    titulo: "Continuar a leitura bíblica",
    mensagem: "Retome o capítulo onde parou e marque como lido.",
    href: "/biblia",
  },
  {
    id: "oracao",
    titulo: "Oração do dia",
    mensagem: "Registre sua oração no painel espiritual e mantenha a sequência.",
    href: "/painel",
  },
];

/** Cria as tarefas espirituais do dia uma única vez por data. */
export function TarefasDoDia() {
  useEffect(() => {
    const hoje = new Date().toISOString().slice(0, 10);
    let ultima: string | null = null;
    try {
      ultima = window.localStorage.getItem(CHAVE_DIA);
    } catch {
      ultima = null;
    }
    if (ultima === hoje) return;
    try {
      window.localStorage.setItem(CHAVE_DIA, hoje);
    } catch {
      /* navegação privada */
    }

    TAREFAS.forEach((t, i) => {
      window.setTimeout(() => {
        notificar({
          tipo: "tarefa",
          titulo: t.titulo,
          mensagem: t.mensagem,
          href: t.href,
          chave: `tarefa:${hoje}:${t.id}`,
        });
      }, 1200 + i * 900);
    });
  }, []);

  return null;
}
