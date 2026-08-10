import { PRIMEIROS_PASSOS } from "./primeiros-passos";
import { CATEQUESE_INTERMEDIARIA } from "./catequese-intermediaria";
import { APOLOGETICA } from "./apologetica";
import { VIDA_ESPIRITUAL } from "./vida-espiritual";
import { TEOLOGIA } from "./teologia";
import type { Licao, Trilha } from "./tipos";

export * from "./tipos";

export const TRILHAS: Trilha[] = [
  PRIMEIROS_PASSOS,
  VIDA_ESPIRITUAL,
  CATEQUESE_INTERMEDIARIA,
  APOLOGETICA,
  TEOLOGIA,
];

export function acharTrilha(slug: string): Trilha | undefined {
  return TRILHAS.find((t) => t.slug === slug);
}

export function acharLicao(
  trilhaSlug: string,
  licaoSlug: string,
): { trilha: Trilha; licao: Licao; indice: number } | undefined {
  const trilha = acharTrilha(trilhaSlug);
  if (!trilha) return undefined;
  const indice = trilha.licoes.findIndex((l) => l.slug === licaoSlug);
  if (indice < 0) return undefined;
  return { trilha, licao: trilha.licoes[indice]!, indice };
}

export function totalLicoes(): number {
  return TRILHAS.reduce((n, t) => n + t.licoes.length, 0);
}
