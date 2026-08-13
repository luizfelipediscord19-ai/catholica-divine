import { useEffect, useRef, useState } from "react";

import { useRegistrarEstudo } from "@/hooks/use-estudo";

type Tipo = "catecismo" | "maria" | "trilha-avancada";

/**
 * Marca um conteúdo como estudado quando ele realmente permanece visível na
 * tela — base das conquistas de formação (Catecismo, conteúdos marianos).
 */
export function MarcarEstudo({
  tipo,
  chave,
  segundos = 4,
}: {
  tipo: Tipo;
  chave: string;
  segundos?: number;
}) {
  const alvo = useRef<HTMLSpanElement>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = alvo.current;
    if (!el || visto || typeof IntersectionObserver === "undefined") return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting) {
          timer = setTimeout(() => setVisto(true), segundos * 1000);
        } else if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      if (timer) clearTimeout(timer);
      obs.disconnect();
    };
  }, [visto, segundos]);

  useRegistrarEstudo(tipo, visto ? chave : null);

  return <span ref={alvo} aria-hidden="true" className="block h-0" />;
}
