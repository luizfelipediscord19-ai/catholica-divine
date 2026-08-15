// Server-only. Acesso ao acervo de notícias do Portal.
//
// Leitura: chave publicável (a política pública cobre notícias publicadas).
// Escrita (agente Hermes): exige a service role.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface Noticia {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  corpo: string;
  categoria: string;
  tags: string[];
  fonte_nome: string | null;
  fonte_url: string | null;
  imagem_url: string | null;
  autor: string | null;
  publicado_em: string;
  destaque: boolean;
}

const CAMPOS =
  "id, slug, titulo, resumo, corpo, categoria, tags, fonte_nome, fonte_url, imagem_url, autor, publicado_em, destaque";

function cliente(chave: string, urlPreferida?: string): SupabaseClient {
  const url = urlPreferida ?? process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  if (!url) throw new Error("Configuração do backend ausente: SUPABASE_URL.");

  return createClient(url, chave, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (chave.startsWith("sb_") && headers.get("Authorization") === `Bearer ${chave}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", chave);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function leitura(): SupabaseClient {
  // O par (URL, chave) precisa pertencer ao mesmo projeto. Quando as variáveis
  // do servidor estão desatualizadas em relação às do site (VITE_*), usamos o
  // par publicável do site — é ele que a plataforma mantém sincronizado.
  const urlServidor = process.env["SUPABASE_URL"];
  const urlSite = process.env["VITE_SUPABASE_URL"];
  const chaveSite = process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  if (urlSite && chaveSite && urlServidor && urlServidor !== urlSite) {
    return cliente(chaveSite, urlSite);
  }

  const chave =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    chaveSite;
  if (!chave) throw new Error("Configuração do backend ausente: chave do Supabase.");
  return cliente(chave, urlServidor ?? urlSite);
}

function escrita(): SupabaseClient {
  const chave = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!chave) throw new Error("Ingestão indisponível: SUPABASE_SERVICE_ROLE_KEY ausente.");
  return cliente(chave);
}

/** Transforma um título em slug estável e legível. */
export function gerarSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export async function listarNoticias(opcoes: {
  categoria?: string | null;
  limite?: number;
}): Promise<Noticia[]> {
  const limite = Math.min(Math.max(opcoes.limite ?? 30, 1), 60);
  let consulta = leitura()
    .from("noticias")
    .select(CAMPOS)
    .eq("publicada", true)
    .lte("publicado_em", new Date().toISOString())
    .order("publicado_em", { ascending: false })
    .limit(limite);

  if (opcoes.categoria) consulta = consulta.eq("categoria", opcoes.categoria);

  const { data, error } = await consulta;
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Noticia[];
}

export async function obterNoticia(slug: string): Promise<Noticia | null> {
  const { data, error } = await leitura()
    .from("noticias")
    .select(CAMPOS)
    .eq("slug", slug)
    .eq("publicada", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as unknown as Noticia) ?? null;
}

export interface NoticiaEntrada {
  titulo: string;
  resumo: string;
  corpo: string;
  slug?: string;
  categoria?: string;
  tags?: string[];
  fonte_nome?: string | null;
  fonte_url?: string | null;
  imagem_url?: string | null;
  autor?: string | null;
  publicado_em?: string | null;
  destaque?: boolean;
  publicada?: boolean;
}

/** Publica (ou atualiza pelo slug) as notícias enviadas pelo agente Hermes. */
export async function publicarNoticias(
  entradas: NoticiaEntrada[],
): Promise<{ gravadas: number; slugs: string[] }> {
  const linhas = entradas.map((n) => ({
    slug: (n.slug && gerarSlug(n.slug)) || gerarSlug(n.titulo),
    titulo: n.titulo.trim(),
    resumo: n.resumo.trim(),
    corpo: n.corpo.trim(),
    categoria: (n.categoria ?? "Igreja").trim(),
    tags: n.tags ?? [],
    fonte_nome: n.fonte_nome ?? null,
    fonte_url: n.fonte_url ?? null,
    imagem_url: n.imagem_url ?? null,
    autor: n.autor ?? "Hermes",
    publicado_em: n.publicado_em ?? new Date().toISOString(),
    destaque: n.destaque ?? false,
    publicada: n.publicada ?? true,
  }));

  const { data, error } = await escrita()
    .from("noticias")
    .upsert(linhas, { onConflict: "slug" })
    .select("slug");

  if (error) throw new Error(error.message);
  return { gravadas: data?.length ?? 0, slugs: (data ?? []).map((l) => (l as { slug: string }).slug) };
}
