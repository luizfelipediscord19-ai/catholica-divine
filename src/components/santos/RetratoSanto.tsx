import { useState } from "react";

/**
 * Retrato de santo com carregamento otimizado: lazy por padrão, dimensões
 * declaradas (sem salto de layout) e um marcador sóbrio quando não há imagem
 * ou quando ela falha — assim nenhuma página fica com espaço quebrado.
 */
export function RetratoSanto({
  url,
  nome,
  className = "",
  prioridade = false,
  sizes = "(max-width: 768px) 100vw, 400px",
  largura = 700,
  altura = 875,
}: {
  url?: string;
  nome: string;
  className?: string;
  prioridade?: boolean;
  sizes?: string;
  largura?: number;
  altura?: number;
}) {
  const [falhou, setFalhou] = useState(false);

  if (!url || falhou) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-deep via-deep to-background ${className}`}
        aria-hidden="true"
      >
        <span className="font-display text-4xl text-gold/30">✝</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={`Representação de ${nome}`}
      width={largura}
      height={altura}
      sizes={sizes}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : "low"}
      decoding="async"
      onError={() => setFalhou(true)}
      className={className}
    />
  );
}
