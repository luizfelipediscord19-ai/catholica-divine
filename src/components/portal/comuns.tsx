import type { ReactNode } from "react";

type AutorBruto =
  | {
      santo_nome?: string | null;
      santo_slug?: string | null;
      santo_imagem?: string | null;
      nivel?: number | null;
      apelido?: string | null;
    }
  | null
  | undefined;

export type Autor = {
  nome: string;
  slug: string | null;
  imagem: string | null;
  nivel: number;
};

/** O join do Supabase pode vir como objeto ou array; normaliza os dois casos. */
export function autorDe(linha: { identidades?: AutorBruto | AutorBruto[] }): Autor {
  const bruto = Array.isArray(linha.identidades) ? linha.identidades[0] : linha.identidades;
  return {
    nome: bruto?.apelido || bruto?.santo_nome || "Peregrino anônimo",
    slug: bruto?.santo_slug ?? null,
    imagem: bruto?.santo_imagem ?? null,
    nivel: bruto?.nivel ?? 1,
  };
}

export function AutorSelo({ autor, data }: { autor: Autor; data?: string | null }) {
  return (
    <div className="flex items-center gap-3">
      {autor.imagem ? (
        <img
          src={autor.imagem}
          alt=""
          loading="lazy"
          className="size-9 rounded-full object-cover border border-gold/30"
        />
      ) : (
        <span className="size-9 rounded-full border border-gold/30 grid place-items-center text-[11px] text-gold">
          {autor.nome.slice(0, 2).toUpperCase()}
        </span>
      )}
      <div className="leading-tight">
        <p className="text-xs text-paper/90">{autor.nome}</p>
        <p className="kicker">
          Nível {autor.nivel}
          {data ? ` · ${formatarData(data)}` : ""}
        </p>
      </div>
    </div>
  );
}

export function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function Painel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`surface-card p-card backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <p className="kicker mb-3">{children}</p>
  );
}

export const inputClass =
  "w-full min-h-11 rounded-[var(--radius-btn)] bg-background/60 border border-gold/20 transition-premium hover:border-gold/40 focus:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/70";


export const botaoClass =
  "btn-base btn-gold px-6 py-3 text-[11px] uppercase tracking-[0.16em] font-bold";

export const botaoGhostClass =
  "btn-base btn-outline-gold px-6 py-3 text-[11px] uppercase tracking-[0.16em] font-medium";

