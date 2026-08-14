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
    const { listarNoticias } = await import("./noticias/db.server");
    return listarNoticias({ categoria: data.categoria ?? null, limite: data.limite });
  });

export const obterNoticiaFn = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().trim().min(1).max(120) }))
  .handler(async ({ data }) => {
    const { obterNoticia } = await import("./noticias/db.server");
    return obterNoticia(data.slug);
  });
