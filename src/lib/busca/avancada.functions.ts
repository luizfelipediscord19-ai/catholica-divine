import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const esquema = z.object({
  termo: z.string().min(2).max(120),
  escopos: z
    .array(z.enum(["biblia", "catecismo", "magisterio", "santos", "oracoes"]))
    .optional(),
  limite: z.number().int().optional(),
});

export const buscarNoPortal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => esquema.parse(data))
  .handler(async ({ data }) => {
    const { buscarIndexado } = await import("@/lib/busca/motor.server");
    return buscarIndexado(data);
  });
