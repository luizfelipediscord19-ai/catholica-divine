/**
 * Cadastro dos aparelhos que recebem avisos e envio dos lembretes diários.
 * Server-only.
 */

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { TAREFAS_DIARIAS, emMinutos } from "@/lib/tarefas-horarios";
import { enviarPush, type AvisoPush } from "./envio.server";

export type Assinatura = {
  endpoint: string;
  p256dh: string;
  auth: string;
  fusoOffset: number;
  horarios: Record<string, { hora: string; ativa: boolean }>;
};

function horaValida(v: unknown): v is string {
  return typeof v === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
}

function limparHorarios(entrada: Assinatura["horarios"]) {
  const saida: Record<string, { hora: string; ativa: boolean }> = {};
  for (const tarefa of TAREFAS_DIARIAS) {
    const item = entrada?.[tarefa.id];
    saida[tarefa.id] = {
      hora: horaValida(item?.hora) ? item!.hora : tarefa.padrao,
      ativa: typeof item?.ativa === "boolean" ? item.ativa : true,
    };
  }
  return saida;
}

export async function salvarAssinatura(dados: Assinatura) {
  if (!/^https:\/\//.test(dados.endpoint)) throw new Error("Endereço de aviso inválido.");

  const { error } = await supabaseAdmin.from("push_dispositivos").upsert(
    {
      endpoint: dados.endpoint,
      p256dh: dados.p256dh,
      auth: dados.auth,
      fuso_offset: Math.max(-840, Math.min(840, Math.trunc(dados.fusoOffset || 0))),
      horarios: limparHorarios(dados.horarios),
      ativo: true,
      falhas: 0,
    },
    { onConflict: "endpoint" },
  );

  if (error) throw new Error("Não foi possível registrar os avisos neste aparelho.");
  return { ok: true as const };
}

export async function removerAssinatura(endpoint: string) {
  await supabaseAdmin.from("push_dispositivos").delete().eq("endpoint", endpoint);
  return { ok: true as const };
}

type Registro = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  fuso_offset: number;
  horarios: Record<string, { hora?: string; ativa?: boolean }> | null;
  ultimo_envio: Record<string, string> | null;
  falhas: number;
};

/** Data local (YYYY-MM-DD) e minutos do dia para um deslocamento de fuso. */
function agoraLocal(offsetMinutos: number) {
  const local = new Date(Date.now() - offsetMinutos * 60_000);
  return {
    data: local.toISOString().slice(0, 10),
    minutos: local.getUTCHours() * 60 + local.getUTCMinutes(),
  };
}

/**
 * Percorre os aparelhos inscritos e envia os lembretes cujo horário já passou
 * no fuso do aparelho, no máximo uma vez por dia para cada tarefa.
 */
export async function despacharLembretes() {
  const { data, error } = await supabaseAdmin
    .from("push_dispositivos")
    .select("id, endpoint, p256dh, auth, fuso_offset, horarios, ultimo_envio, falhas")
    .eq("ativo", true)
    .limit(2000);

  if (error) throw new Error("Não foi possível listar os aparelhos inscritos.");

  let enviados = 0;
  let removidos = 0;

  for (const registro of (data ?? []) as Registro[]) {
    const { data: hoje, minutos } = agoraLocal(registro.fuso_offset ?? 0);
    const ultimo = registro.ultimo_envio ?? {};
    const pendentes: AvisoPush[] = [];
    const atualizado = { ...ultimo };

    for (const tarefa of TAREFAS_DIARIAS) {
      const item = registro.horarios?.[tarefa.id];
      const hora = horaValida(item?.hora) ? item!.hora : tarefa.padrao;
      if (item?.ativa === false) continue;
      if (minutos < emMinutos(hora)) continue;
      if (ultimo[tarefa.id] === hoje) continue;

      pendentes.push({
        titulo: tarefa.titulo,
        mensagem: `${tarefa.mensagem} (lembrete das ${hora})`,
        href: tarefa.href,
        tipo: "tarefa",
        tag: `tarefa-${tarefa.id}`,
      });
      atualizado[tarefa.id] = hoje;
    }

    if (pendentes.length === 0) continue;

    let falhou = false;
    let expirado = false;

    for (const aviso of pendentes) {
      const r = await enviarPush(registro, aviso);
      if (r.ok) enviados += 1;
      else if (r.expirado) expirado = true;
      else falhou = true;
    }

    if (expirado) {
      await supabaseAdmin.from("push_dispositivos").delete().eq("id", registro.id);
      removidos += 1;
      continue;
    }

    await supabaseAdmin
      .from("push_dispositivos")
      .update({
        ultimo_envio: atualizado,
        falhas: falhou ? (registro.falhas ?? 0) + 1 : 0,
        ativo: falhou ? (registro.falhas ?? 0) + 1 < 10 : true,
      })
      .eq("id", registro.id);
  }

  return { enviados, removidos, aparelhos: (data ?? []).length };
}
