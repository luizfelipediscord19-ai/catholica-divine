import { useCallback, useSyncExternalStore } from "react";

import {
  alternarItem,
  assinarSalvos,
  idSalvo,
  lerSalvos,
  removerItem,
  type ItemSalvo,
  type TipoSalvo,
} from "@/lib/salvos";

const VAZIO: ItemSalvo[] = [];

/** Lista reativa dos itens salvos neste navegador. */
export function useSalvos() {
  const itens = useSyncExternalStore(
    assinarSalvos,
    lerSalvos,
    () => VAZIO, // no servidor não há armazenamento local
  );

  return {
    itens,
    remover: useCallback((tipo: TipoSalvo, slug: string) => removerItem(tipo, slug), []),
  };
}

/** Estado + alternância de um item específico (usado pelo botão “Salvar”). */
export function useItemSalvo(tipo: TipoSalvo, slug: string) {
  const { itens } = useSalvos();
  const id = idSalvo(tipo, slug);
  const salvo = itens.some((i) => i.id === id);

  const alternar = useCallback(
    (dados: Omit<ItemSalvo, "id" | "em">) => alternarItem(dados),
    [],
  );

  return { salvo, alternar };
}
