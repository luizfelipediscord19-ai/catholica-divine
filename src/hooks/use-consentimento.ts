import { useCallback, useEffect, useState } from "react";

import {
  EVENTO_CONSENTIMENTO,
  PREFERENCIAS_MINIMAS,
  PREFERENCIAS_TOTAIS,
  gravarConsentimento,
  lerConsentimento,
  precisaDecidir,
  revogarConsentimento,
  type PreferenciasConsentimento,
  type RegistroConsentimento,
} from "../lib/consentimento";

export function useConsentimento() {
  const [registro, setRegistro] = useState<RegistroConsentimento | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setRegistro(lerConsentimento());
    setPronto(true);

    const sincronizar = () => setRegistro(lerConsentimento());
    window.addEventListener(EVENTO_CONSENTIMENTO, sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener(EVENTO_CONSENTIMENTO, sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const salvar = useCallback(
    (preferencias: PreferenciasConsentimento, decisao: RegistroConsentimento["decisao"]) => {
      setRegistro(gravarConsentimento(preferencias, decisao));
    },
    [],
  );

  const aceitarTudo = useCallback(() => salvar(PREFERENCIAS_TOTAIS, "todos"), [salvar]);
  const somenteEssenciais = useCallback(
    () => salvar(PREFERENCIAS_MINIMAS, "essencial"),
    [salvar],
  );
  const revogar = useCallback(() => {
    revogarConsentimento();
    setRegistro(null);
  }, []);

  return {
    registro,
    pronto,
    pendente: pronto && precisaDecidir(registro),
    salvar,
    aceitarTudo,
    somenteEssenciais,
    revogar,
  };
}
