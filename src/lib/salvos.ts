/**
 * Itens salvos (biblioteca ampliada).
 *
 * Além dos versículos favoritos guardados no servidor, a pessoa pode salvar
 * qualquer conteúdo do portal — santos, orações, trilhas, verbetes, páginas.
 * Fica no localStorage: funciona offline, sem conta e sem custo de banco.
 */

const CHAVE = "portal:itens-salvos";
const LIMITE = 300;

export type TipoSalvo = "santo" | "oracao" | "trilha" | "verbete" | "pagina";

export type ItemSalvo = {
  /** Identificador estável: `${tipo}:${slug}`. */
  id: string;
  tipo: TipoSalvo;
  slug: string;
  titulo: string;
  descricao?: string;
  /** Caminho interno para reabrir o conteúdo. */
  href: string;
  em: number;
};

export const ROTULO_TIPO: Record<TipoSalvo, string> = {
  santo: "Santo",
  oracao: "Oração",
  trilha: "Trilha",
  verbete: "Verbete",
  pagina: "Página",
};

export function idSalvo(tipo: TipoSalvo, slug: string) {
  return `${tipo}:${slug}`;
}

function valido(x: unknown): x is ItemSalvo {
  if (!x || typeof x !== "object") return false;
  const i = x as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.slug === "string" &&
    typeof i.titulo === "string" &&
    typeof i.href === "string" &&
    typeof i.em === "number" &&
    typeof i.tipo === "string" &&
    i.tipo in ROTULO_TIPO
  );
}

let cache: ItemSalvo[] | null = null;
const ouvintes = new Set<() => void>();

function avisar() {
  cache = null;
  for (const fn of ouvintes) fn();
}

export function assinarSalvos(fn: () => void): () => void {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

export function lerSalvos(): ItemSalvo[] {
  if (typeof window === "undefined") return [];
  if (cache) return cache;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    const dados = bruto ? (JSON.parse(bruto) as unknown) : [];
    const lista = Array.isArray(dados) ? dados.filter(valido) : [];
    cache = lista.sort((a, b) => b.em - a.em);
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}

function gravar(lista: ItemSalvo[]) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(lista.slice(0, LIMITE)));
  } catch {
    /* armazenamento cheio ou bloqueado — segue sem persistir */
  }
  avisar();
}

export function estaSalvo(tipo: TipoSalvo, slug: string): boolean {
  const id = idSalvo(tipo, slug);
  return lerSalvos().some((i) => i.id === id);
}

export function salvarItem(item: Omit<ItemSalvo, "id" | "em">): void {
  if (typeof window === "undefined") return;
  const id = idSalvo(item.tipo, item.slug);
  const atual = lerSalvos().filter((i) => i.id !== id);
  gravar([{ ...item, id, em: Date.now() }, ...atual]);
}

export function removerItem(tipo: TipoSalvo, slug: string): void {
  if (typeof window === "undefined") return;
  const id = idSalvo(tipo, slug);
  gravar(lerSalvos().filter((i) => i.id !== id));
}

/** Alterna e devolve o novo estado (true = salvo). */
export function alternarItem(item: Omit<ItemSalvo, "id" | "em">): boolean {
  if (estaSalvo(item.tipo, item.slug)) {
    removerItem(item.tipo, item.slug);
    return false;
  }
  salvarItem(item);
  return true;
}

export function limparSalvos(): void {
  if (typeof window === "undefined") return;
  gravar([]);
}
