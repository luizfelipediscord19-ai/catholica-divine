import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import { imagemSanto } from "@/lib/data/santos-imagens";

/**
 * Pré-carregamento inteligente dos santos: quando um cartão (ou link) se
 * aproxima da viewport, já buscamos a imagem e a rota de detalhe, de modo que
 * abrir o santo seja instantâneo. Cada slug é preparado uma única vez por
 * sessão e nada acontece em conexões lentas ou com economia de dados.
 */
const jaFeitos = new Set<string>();

type Conexao = { saveData?: boolean; effectiveType?: string };

function conexaoRuim(): boolean {
  if (typeof navigator === "undefined") return true;
  const c = (navigator as Navigator & { connection?: Conexao }).connection;
  if (!c) return false;
  if (c.saveData) return true;
  return c.effectiveType === "slow-2g" || c.effectiveType === "2g";
}

function agendar(fn: () => void) {
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
  if (w.requestIdleCallback) w.requestIdleCallback(fn);
  else window.setTimeout(fn, 200);
}

type RouterLike = { preloadRoute: (opts: unknown) => Promise<unknown> };

export function prefetchSanto(router: RouterLike | null, slug: string) {
  if (typeof window === "undefined" || jaFeitos.has(slug) || conexaoRuim()) return;
  jaFeitos.add(slug);

  agendar(() => {
    const url = imagemSanto(slug)?.url;
    if (url) {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
    }
    router
      ?.preloadRoute({ to: "/santos/$slug", params: { slug } })
      .catch(() => {});
  });
}

/**
 * Devolve um ref para anexar ao cartão/link do santo. Ao entrar na margem de
 * observação (antes de ficar visível), dispara o pré-carregamento.
 */
export function usePrefetchSanto<T extends HTMLElement>(
  slug: string,
  rootMargin = "500px"
) {
  const router = useRouter();
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || jaFeitos.has(slug)) return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        io.disconnect();
        prefetchSanto(router, slug);
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slug, router, rootMargin]);

  return ref;
}

/** Prepara em lote os próximos santos da lista (ex.: página seguinte). */
export function usePrefetchLote(slugs: string[], ativo = true) {
  const router = useRouter();
  useEffect(() => {
    if (!ativo) return;
    slugs.slice(0, 8).forEach((s) => prefetchSanto(router, s));
  }, [slugs.join("|"), ativo, router]);
}
