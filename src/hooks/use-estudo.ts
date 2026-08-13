import { useEffect, useRef } from "react";

import { registrarEstudoFn } from "@/lib/portal.functions";
import { useIdentidade, useInvalidarProgresso } from "@/hooks/use-identidade";
import { useCelebracao } from "@/components/portal/Celebracao";

type Tipo = "catecismo" | "maria" | "trilha-avancada";

/**
 * Registra, uma única vez por visita, que a identidade estudou um conteúdo
 * (seção do Catecismo, página mariana, trilha avançada concluída) — base das
 * conquistas de formação.
 */
export function useRegistrarEstudo(tipo: Tipo, chave: string | null | undefined) {
  const { token, desconectado } = useIdentidade();
  const invalidar = useInvalidarProgresso();
  const { celebrarConquistas } = useCelebracao();
  const jaEnviado = useRef<string | null>(null);

  useEffect(() => {
    if (!token || desconectado || !chave) return;
    const marca = `${tipo}:${chave}`;
    if (jaEnviado.current === marca) return;
    jaEnviado.current = marca;

    void registrarEstudoFn({ data: { token, tipo, chave } })
      .then((res) => {
        if (res?.novasConquistas?.length) {
          celebrarConquistas(res.novasConquistas);
          invalidar();
        }
      })
      .catch(() => {
        // Registro de progresso é secundário: nunca interrompe a leitura.
        jaEnviado.current = null;
      });
  }, [token, desconectado, tipo, chave, celebrarConquistas, invalidar]);
}
