import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Search, BookOpen, UserPlus, X, ArrowRight, ArrowLeft } from "lucide-react";

const STORAGE_KEY = "portal-catolico-onboarding-v1";

const STEPS = [
  {
    icon: Sparkles,
    title: "Sophia, sua assistente católica",
    desc: "Tire dúvidas sobre a fé com respostas fundamentadas na Bíblia, Catecismo e Magistério. Acesse no menu \"Assistente\".",
    cta: { label: "Conhecer Sophia", to: "/assistente" as const },
  },
  {
    icon: Search,
    title: "Busca global inteligente",
    desc: "Encontre versículos, santos, orações e tópicos do Catecismo em segundos. Use o ícone de lupa no topo de qualquer página.",
    cta: { label: "Explorar Bíblia", to: "/biblia" as const },
  },
  {
    icon: BookOpen,
    title: "Área de estudos e conta",
    desc: "Crie sua conta para acessar o Painel: Diário de Fé, progresso de leitura bíblica, conquistas (XP) e sequência de oração.",
    cta: { label: "Criar conta grátis", to: "/auth" as const },
    icon2: UserPlus,
  },
];

export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function close() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "1");
    }
    setOpen(false);
  }

  if (!open) return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-content-fade"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div
        className="relative w-full max-w-lg bg-card border border-gold/30 shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-paper/40 hover:text-gold transition p-1"
          aria-label="Fechar"
        >
          <X className="size-5" />
        </button>

        <div className="px-8 pt-12 pb-8 text-center">
          <div className="inline-flex size-16 rounded-full border border-gold/30 bg-gold/5 items-center justify-center mb-6">
            <Icon className="size-7 text-gold" />
          </div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-gold/70 mb-3">
            Passo {step + 1} de {STEPS.length}
          </p>
          <h2 id="onboarding-title" className="font-display text-2xl md:text-3xl text-foreground">
            {current.title}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {current.desc}
          </p>

          <Link
            to={current.cta.to}
            onClick={close}
            className="mt-7 inline-flex items-center justify-center gap-2 px-7 py-3 bg-gold text-deep text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-paper transition-premium"
          >
            {current.cta.label}
          </Link>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gold/15 bg-black/30">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-paper/60 hover:text-gold transition disabled:opacity-30 disabled:hover:text-paper/60"
          >
            <ArrowLeft className="size-3" /> Voltar
          </button>

          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Ir para passo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-gold" : "w-1.5 bg-gold/30 hover:bg-gold/60"
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <button
              onClick={close}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-gold hover:text-paper transition font-bold"
            >
              Começar
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-gold hover:text-paper transition"
            >
              Próximo <ArrowRight className="size-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
