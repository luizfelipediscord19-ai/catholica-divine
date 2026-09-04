import { toast } from "sonner";

import { traduzirErroAuth } from "./traduzir-erro";

/**
 * Erros de conta no fórum precisam explicar o que fazer, não só o que falhou.
 * Quando a falha é de sessão/autorização, mostramos um aviso com atalhos para
 * entrar, criar conta e recuperar a senha.
 */
export function ehErroDeConta(erro: unknown): boolean {
  const bruto =
    typeof erro === "string"
      ? erro
      : erro && typeof erro === "object" && "message" in erro
        ? String((erro as { message: unknown }).message)
        : "";
  const m = bruto.toLowerCase();
  return (
    m.includes("sessão") ||
    m.includes("sessao") ||
    m.includes("unauthorized") ||
    m.includes("não autorizado") ||
    m.includes("entre na sua conta") ||
    m.includes("precisa entrar") ||
    m.includes("auth session missing") ||
    m.includes("session_not_found") ||
    m.includes("sincronizar seu progresso") ||
    m.includes("jwt")
  );
}

/**
 * @param erro erro da mutation
 * @param irParaEntrar callback que leva o peregrino à tela de conta
 * @param padrao mensagem usada quando o erro não é de conta
 */
export function avisarErroDeConta(
  erro: unknown,
  irParaEntrar: (modo?: "entrar" | "criar" | "recuperar") => void,
  padrao = "Não foi possível concluir. Tente novamente em instantes.",
) {
  if (!ehErroDeConta(erro)) {
    toast.error(traduzirErroAuth(erro) || padrao);
    return;
  }

  toast.error("É preciso estar logado para participar do fórum", {
    description:
      "Entre com e-mail e senha (ou crie uma conta). Se esqueceu a senha, use “Esqueci a senha” na tela de conta — enviamos um link para criar uma nova.",
    duration: 12_000,
    action: { label: "Entrar", onClick: () => irParaEntrar("entrar") },
    cancel: { label: "Esqueci a senha", onClick: () => irParaEntrar("recuperar") },
  });
}
