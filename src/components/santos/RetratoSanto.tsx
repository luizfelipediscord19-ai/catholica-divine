import { useEffect, useRef, useState } from "react";

/**
 * Miniaturas do Wikimedia Commons aceitam a largura no próprio caminho
 * (`/1600px-arquivo.jpg`). Quando a fonte é uma dessas URLs, entregamos um
 * `srcset` de várias larguras: telas comuns baixam o arquivo leve e telas
 * retina recebem a arte em alta definição, sem recorte nem borrão.
 */
const LARGURAS_RETRATO = [480, 800, 1200, 1600, 2000];

function srcSetDe(url: string): string | undefined {
  if (!/upload\.wikimedia\.org\/.+\/thumb\/.+\/\d+px-/.test(url)) return undefined;
  return LARGURAS_RETRATO.map((w) => `${url.replace(/\/\d+px-/, `/${w}px-`)} ${w}w`).join(", ");
}


/**
 * Retrato de santo com carregamento otimizado: lazy por padrão, dimensões
 * declaradas (sem salto de layout), reserva na fonte pública de domínio
 * público quando a cópia do CDN não está disponível, entrada suave quando a
 * imagem termina de carregar e, só em último caso, um marcador sóbrio com a
 * inicial do santo — assim nenhuma página fica com espaço quebrado.
 */
export function RetratoSanto({
  url,
  reserva,
  nome,
  className = "",
  prioridade = false,
  sizes = "(max-width: 768px) 100vw, 400px",
  largura = 700,
  altura = 875,
  posicao = "50% 22%",
}: {
  url?: string;
  reserva?: string;
  nome: string;
  className?: string;
  prioridade?: boolean;
  sizes?: string;
  largura?: number;
  altura?: number;
  /** Ponto focal do recorte: por padrão puxa para o alto, onde está o rosto. */
  posicao?: string;
}) {
  const [tentativa, setTentativa] = useState(0);
  const [carregada, setCarregada] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Imagem vinda do cache pode terminar antes da hidratação: confere no mount.
  useEffect(() => {
    if (ref.current?.complete) setCarregada(true);
  }, [tentativa]);
  const fontes = [url, reserva].filter((f): f is string => Boolean(f));
  const atual = fontes[tentativa];

  if (!atual) {
    const inicial = nome.replace(/^(São|Santo|Santa)\s+/i, "").trim().charAt(0) || "✝";
    return (
      <div
        role="img"
        aria-label={`Sem retrato disponível de ${nome}`}
        className={`grid place-items-center bg-linear-to-br from-deep via-deep to-background ${className}`}
      >
        <span className="grid size-14 place-items-center rounded-full border border-gold/25 font-display text-2xl text-gold/50">
          {inicial}
        </span>
      </div>
    );
  }

  return (
    <img
      key={atual}
      ref={ref}
      src={atual}
      srcSet={srcSetDe(atual)}
      alt={`Representação de ${nome}`}
      width={largura}
      height={altura}
      sizes={sizes}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : "low"}
      decoding="async"
      referrerPolicy="no-referrer"
      data-carregada={carregada || prioridade ? "sim" : "nao"}
      onLoad={() => setCarregada(true)}
      onError={() => {
        setCarregada(false);
        setTentativa((t) => t + 1);
      }}
      style={{ objectPosition: posicao }}
      className={`media-fade bg-muted/40 ${className}`}
    />
  );
}
