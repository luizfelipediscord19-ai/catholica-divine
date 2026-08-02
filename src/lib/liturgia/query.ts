import { queryOptions } from "@tanstack/react-query";
import { getLiturgiaDoDia } from "../liturgia.functions";

/** Chave/opções compartilhadas da liturgia do dia (cache de 1 hora). */
export function liturgiaQueryOptions(iso?: string) {
  return queryOptions({
    queryKey: ["liturgia", iso ?? "hoje"],
    queryFn: () => getLiturgiaDoDia({ data: iso ? { iso } : {} }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });
}
