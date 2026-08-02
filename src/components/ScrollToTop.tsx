import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo da página"
      className="fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border border-gold/40 bg-background/80 text-gold backdrop-blur-md transition-colors hover:bg-gold hover:text-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
