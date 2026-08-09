import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { aplicarTema, lerTema, type Tema } from "@/lib/tema";

/** Alternador entre o tema escuro (padrão) e o tema claro de leitura. */
export function TemaToggle() {
  const [tema, setTema] = useState<Tema>("escuro");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setTema(lerTema());
    setMontado(true);
  }, []);

  const alternar = () => {
    const proximo: Tema = tema === "claro" ? "escuro" : "claro";
    aplicarTema(proximo);
    setTema(proximo);
  };

  const rotulo = tema === "claro" ? "Ativar tema escuro" : "Ativar tema claro";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={rotulo}
      title={rotulo}
      className="grid size-11 place-items-center rounded-full border border-gold/20 text-paper/70 transition-premium hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {montado && tema === "claro" ? (
        <Moon className="size-4" aria-hidden="true" />
      ) : (
        <Sun className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
