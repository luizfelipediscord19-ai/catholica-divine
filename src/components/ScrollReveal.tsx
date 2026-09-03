import { useEffect, useLayoutEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right";
}

/** useLayoutEffect só existe no cliente; no servidor cai em no-op. */
const useEfeitoDeLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Revela o conteúdo ao entrar na viewport — mas nunca esconde conteúdo
 * enquanto o JavaScript não assumiu a página. O HTML servido já vem visível;
 * apenas depois da hidratação os blocos que estão fora da tela são escondidos
 * (antes da pintura, via layout effect) para então animarem na rolagem.
 * Isso evita o bug em que cartões ficavam em branco no celular durante a
 * hidratação lenta.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(true);
  const [animar, setAnimar] = useState(false);

  useEfeitoDeLayout(() => {
    const el = ref.current;
    if (!el) return;

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento || typeof IntersectionObserver === "undefined") return;

    const retangulo = el.getBoundingClientRect();
    const foraDaTela = retangulo.top > window.innerHeight * 0.95;
    if (!foraDaTela) return; // já visível: nada a animar, nada a esconder

    setAnimar(true);
    setVisivel(false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animar || visivel) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    observador.observe(el);

    // Rede de segurança: o conteúdo nunca fica invisível por engano.
    const reserva = window.setTimeout(() => setVisivel(true), 2500);

    return () => {
      window.clearTimeout(reserva);
      observador.disconnect();
    };
  }, [animar, visivel, threshold]);

  const escondido = direction === "down" ? "opacity-0 -translate-y-3" : "opacity-0 translate-y-3";

  // Escalonamento discreto: nenhum bloco espera mais de 240 ms para aparecer.
  const atraso = Math.min(delay, 240);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out ${
        visivel ? "opacity-100 translate-y-0" : escondido
      } ${className}`}
      style={{
        transitionDelay: visivel && animar ? `${atraso}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
