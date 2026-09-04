import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, Check, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-base relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-wide [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-gold font-semibold",
        gold: "btn-gold font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-btn)] hover:bg-destructive/90 hover:shadow-[0_8px_22px_-10px_rgba(139,0,0,0.7)] hover:-translate-y-px",
        outline: "btn-outline-gold",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[var(--shadow-btn)] hover:bg-secondary/85 hover:-translate-y-px",
        ghost: "text-foreground/80 hover:bg-gold/10 hover:text-gold",
        link: "min-h-0 text-primary underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        default: "btn-md",
        sm: "btn-sm",
        lg: "btn-lg",
        icon: "btn-icon",
        "icon-sm": "btn-icon",
      },
      estado: {
        idle: "",
        loading: "cursor-progress",
        success:
          "!bg-emerald-600 !text-white !border-transparent shadow-[var(--shadow-btn)] hover:!bg-emerald-600",
        error:
          "!bg-destructive !text-destructive-foreground !border-transparent hover:!bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      estado: "idle",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Atalho para o estado de carregamento (equivale a estado="loading"). */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, estado, asChild = false, loading, children, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const estadoFinal = loading ? "loading" : (estado ?? "idle");
    const bloqueado = disabled || estadoFinal === "loading";

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, estado: estadoFinal, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, estado: estadoFinal, className }))}
        ref={ref}
        disabled={bloqueado}
        aria-busy={estadoFinal === "loading" || undefined}
        {...props}
      >
        {estadoFinal === "loading" ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : estadoFinal === "success" ? (
          <Check aria-hidden="true" />
        ) : estadoFinal === "error" ? (
          <AlertCircle aria-hidden="true" />
        ) : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
