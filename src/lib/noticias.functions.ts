import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Camada RPC das notícias. A lógica vive em ./noticias/db.server.ts.

export const listarNoticiasFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      categoria: z.string().trim().min(1).max(60).nullish(),
      limite: z.number().int().min(1).max(60).optional(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const { listarNoticias } = await import("./noticias/db.server");
      return await listarNoticias({ categoria: data.categoria ?? null, limite: data.limite });
    } catch (erro) {
      // Falha de infraestrutura nunca deve virar erro 500 para o leitor:
      // a página mostra o estado "edição em preparação".
      console.error("[noticias:listar]", erro);
      return [];
    }
  });

export const obterNoticiaFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().trim().min(1).max(120) }))
  .handler(async ({ data }) => {
    try {
      const { obterNoticia } = await import("./noticias/db.server");
      return await obterNoticia(data.slug);
    } catch (erro) {
      console.error("[noticias:obter]", erro);
      return null;
    }
  });

