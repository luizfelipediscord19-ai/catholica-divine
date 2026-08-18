import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  direction = "up"
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  /**
   * A entrada usa deslocamento curto e sempre vertical: transladar na
   * horizontal empurrava cartões e botões para fora da margem em telas
   * estreitas, o que aparecia como desalinhamento durante a animação.
   */
  const getDirectionClass = () => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return "opacity-100";
    }
    return direction === "down" ? "opacity-0 -translate-y-3" : "opacity-0 translate-y-3";
  };

  const getVisibleClass = () => "opacity-100 translate-y-0";

  // Escalonamento discreto: nenhum bloco espera mais de 240 ms para aparecer.
  const atraso = Math.min(delay, 240);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out ${
        isVisible ? getVisibleClass() : getDirectionClass()
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${atraso}ms` : "0ms",
        willChange: isVisible ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
