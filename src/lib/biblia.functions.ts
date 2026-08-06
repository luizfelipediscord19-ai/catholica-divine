import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Entrada = z.object({
  versao: z.enum(["almeida", "douay", "vulgata", "grego", "hebraico"]),
  livro: z
    .string()
    .min(2)
    .max(24)
    .regex(/^[a-z0-9]+$/, "Livro inválido"),
  capitulo: z.number().int().min(1).max(150),
});

export type CapituloVersao = {
  versao: string;
  versos: { v: number; t: string }[] | null;
};

/** Texto integral de um capítulo em uma edição de domínio público, servido pelo próprio site. */
export const obterCapituloVersao = createServerFn({ method: "GET" })
  .inputValidator((entrada: unknown) => Entrada.parse(entrada))
  .handler(async ({ data }): Promise<CapituloVersao> => {
    const { buscarCapitulo } = await import("@/lib/biblia/fonte.server");
    const versos = await buscarCapitulo(data.versao, data.livro, data.capitulo);
    return { versao: data.versao, versos };
  });
