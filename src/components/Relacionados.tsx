import { Link } from "@tanstack/react-router";
import { BookOpen, Church, ScrollText, Crown, Sparkles, Link as LinkIcon } from "lucide-react";
import { getRelacionados, type RelatedSet, type RefItem } from "@/lib/data/relacionados";

type Props = {
  topic: string;
  className?: string;
  /** "card" (default) ocupa largura total. "aside" é compacto, p/ sidebar. */
  variant?: "card" | "aside";
};

const SECOES: Array<{
  key: keyof RelatedSet;
  label: string;
  icon: typeof BookOpen;
}> = [
  { key: "sacramentos", label: "Sacramentos relacionados", icon: Church },
  { key: "catecismo", label: "Catecismo relacionado", icon: ScrollText },
  { key: "biblia", label: "Passagens bíblicas", icon: BookOpen },
  { key: "santos", label: "Santos relacionados", icon: Crown },
  { key: "oracoes", label: "Orações relacionadas", icon: Sparkles },
];

export function Relacionados({ topic, className = "", variant = "card" }: Props) {
  const data = getRelacionados(topic);
  if (!data) return null;

  const sections = SECOES.filter((s) => (data[s.key] ?? []).length > 0);
  if (sections.length === 0) return null;

  return (
    <aside
      className={`surface-card ${variant === "aside" ? "p-5" : "p-6 md:p-8"} ${className}`}
      aria-label="Referências cruzadas"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="size-9 rounded-full border border-gold/30 grid place-items-center">
          <LinkIcon className="size-4 text-gold" />
        </div>
        <p className="kicker">Enciclopédia · ligações</p>
      </div>

      <div className={variant === "aside" ? "space-y-6" : "grid md:grid-cols-2 gap-x-10 gap-y-6"}>
        {sections.map((s) => {
          const items = data[s.key] as RefItem[];
          const Icon = s.icon;
          return (
            <div key={s.key}>
              <p className="flex items-center gap-2 kicker mb-3">
                <Icon className="size-3.5" /> {s.label}
              </p>
              <ul className="space-y-2">
                {items.map((it, i) => (
                  <li key={`${s.key}-${i}`}>
                    <RefLink item={it} />
                    {it.hint ? (
                      <span className="block text-step--2 text-muted-foreground mt-0.5">{it.hint}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function RefLink({ item }: { item: RefItem }) {
  return (
    <Link
      to={item.to as never}
      params={item.params as never}
      search={item.search as never}
      className="text-sm text-foreground hover:text-gold transition-colors inline-flex items-center gap-2 group"
    >
      <span className="text-gold/40 group-hover:text-gold transition-colors">→</span>
      <span>{item.label}</span>
    </Link>
  );
}
