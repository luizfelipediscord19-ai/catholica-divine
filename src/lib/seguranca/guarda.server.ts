// Server-only. Guarda de abuso para server functions: limita a frequência de
// escritas por cliente e devolve um erro amigável ao atingir o teto.
import { getRequest } from "@tanstack/react-start/server";

import { chaveCliente, dentroDoLimite } from "./limite.server";

/**
 * @param escopo nome do recurso protegido (ex.: "escolher-santo")
 * @param limite chamadas permitidas na janela
 * @param janelaMs duração da janela em milissegundos
 */
export function limitarAbuso(escopo: string, limite: number, janelaMs = 60_000) {
  let chave = "desconhecido";
  try {
    chave = chaveCliente(getRequest());
  } catch {
    // Fora de um contexto de requisição (ex.: prerender): não limita.
    return;
  }
  if (!dentroDoLimite(escopo, chave, limite, janelaMs)) {
    throw new Error("Muitas tentativas em pouco tempo. Aguarde um minuto e tente de novo.");
  }
}
