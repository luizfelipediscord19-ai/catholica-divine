// Server-only. Diagnóstico do backend usado pelo painel espiritual.
import type { Verificacao } from "../diagnostico.functions";

function mascarar(valor: string | undefined) {
  if (!valor) return "ausente";
  return `${valor.slice(0, 6)}… (${valor.length} caracteres)`;
}

/** Lê o "ref" e o "role" de uma chave legada (JWT) sem validar assinatura. */
function lerChaveJwt(valor: string | undefined): { ref?: string; role?: string } {
  if (!valor) return {};
  const partes = valor.split(".");
  if (partes.length !== 3) return {};
  try {
    const json = JSON.parse(
      typeof atob === "function"
        ? atob(partes[1].replace(/-/g, "+").replace(/_/g, "/"))
        : Buffer.from(partes[1], "base64").toString("utf8"),
    ) as { ref?: string; role?: string };
    return { ref: json.ref, role: json.role };
  } catch {
    return {};
  }
}

function refDaUrl(url: string | undefined) {
  return url?.match(/^https:\/\/([a-z0-9-]+)\.supabase\.co/)?.[1];
}


export async function verificarBackend(): Promise<{
  verificacoes: Verificacao[];
  saudavel: boolean;
  geradoEm: string;
}> {
  const verificacoes: Verificacao[] = [];
  const url = process.env["SUPABASE_URL"];
  const publicavel = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const servico = process.env["SUPABASE_SERVICE_ROLE_KEY"];

  verificacoes.push({
    chave: "url",
    titulo: "SUPABASE_URL",
    ok: Boolean(url && /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)),
    detalhe: url ? url : "não configurada na hospedagem",
  });
  verificacoes.push({
    chave: "publicavel",
    titulo: "SUPABASE_PUBLISHABLE_KEY",
    ok: Boolean(publicavel),
    detalhe: mascarar(publicavel),
  });
  verificacoes.push({
    chave: "servico",
    titulo: "SUPABASE_SERVICE_ROLE_KEY",
    ok: Boolean(servico),
    detalhe: servico
      ? mascarar(servico)
      : "ausente — o painel espiritual não consegue ler identidade, favoritos e progresso",
  });

  const podeConsultar = Boolean(url && servico);

  if (!podeConsultar) {
    verificacoes.push({
      chave: "consultas",
      titulo: "Consultas do painel",
      ok: false,
      detalhe: "Ignoradas: configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY na hospedagem.",
    });
    return {
      verificacoes,
      saudavel: false,
      geradoEm: new Date().toISOString(),
    };
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  async function testar(chave: string, titulo: string, executar: () => Promise<string>) {
    try {
      verificacoes.push({ chave, titulo, ok: true, detalhe: await executar() });
    } catch (erro) {
      verificacoes.push({
        chave,
        titulo,
        ok: false,
        detalhe: erro instanceof Error ? erro.message : "falha desconhecida",
      });
    }
  }

  await testar("identidade", "Consulta de identidade", async () => {
    const { count, error } = await supabaseAdmin
      .from("identidades")
      .select("id", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    return `tabela acessível — ${count ?? 0} identidade(s)`;
  });

  await testar("favoritos", "Consulta de favoritos", async () => {
    const { count, error } = await supabaseAdmin
      .from("favoritos")
      .select("id", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    return `tabela acessível — ${count ?? 0} versículo(s) guardado(s)`;
  });

  await testar("progresso", "Progresso de leitura e diário", async () => {
    const [leituras, diario] = await Promise.all([
      supabaseAdmin.from("leituras_biblia").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("diario_espiritual").select("id", { count: "exact", head: true }),
    ]);
    if (leituras.error) throw new Error(leituras.error.message);
    if (diario.error) throw new Error(diario.error.message);
    return `${leituras.count ?? 0} capítulo(s) lido(s) • ${diario.count ?? 0} registro(s) de oração`;
  });

  await testar("conquistas", "Catálogo de conquistas", async () => {
    const { count, error } = await supabaseAdmin
      .from("conquistas_catalogo")
      .select("slug", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    if (!count) throw new Error("catálogo vazio — as conquistas não aparecerão no painel");
    return `${count} conquista(s) cadastrada(s)`;
  });

  await testar("reconciliacao", "Sincronizar identidade com conta", async () => {
    const { error } = await supabaseAdmin.rpc("reconciliar_identidade_conta", {
      _user_id: "00000000-0000-0000-0000-000000000001",
      _token_anonimo: "00000000-0000-0000-0000-000000000000",
    });
    if (error) throw new Error(error.message);
    return "função de sincronização disponível";
  });

  return {
    verificacoes,
    saudavel: verificacoes.every((v) => v.ok),
    geradoEm: new Date().toISOString(),
  };
}
