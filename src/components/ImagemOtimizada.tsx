import { fontesDe } from "@/lib/imagens";

/**
 * <picture> com AVIF → WebP → JPEG, tamanhos responsivos e lazy loading por
 * padrão. Use `prioridade` apenas na imagem principal acima da dobra.
 */
export function ImagemOtimizada({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className = "",
  prioridade = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  prioridade?: boolean;
}) {
  const fontes = fontesDe(src);
  return (
    <picture>
      {fontes ? <source type="image/avif" srcSet={fontes.avif} sizes={sizes} /> : null}
      {fontes ? <source type="image/webp" srcSet={fontes.webp} sizes={sizes} /> : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "low"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
