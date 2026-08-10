import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const assinaturaSchema = z.object({
  endpoint: z.string().url().max(600),
  p256dh: z.string().min(10).max(300),
  auth: z.string().min(4).max(300),
  fusoOffset: z.number().int().min(-840).max(840),
  horarios: z.record(
    z.string(),
    z.object({ hora: z.string(), ativa: z.boolean() }),
  ),
});

/** Chave pública usada pelo navegador para se inscrever nos avisos. */
export const chavePushFn = createServerFn({ method: "GET" }).handler(async () => {
  const { chavePublicaVapid } = await import("./push/envio.server");
  return { chave: chavePublicaVapid() };
});

/** Registra (ou atualiza) este aparelho para receber avisos fora do site. */
export const registrarPushFn = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown) => assinaturaSchema.parse(entrada))
  .handler(async ({ data }) => {
    const { salvarAssinatura } = await import("./push/registro.server");
    return salvarAssinatura(data);
  });

/** Remove este aparelho da lista de avisos. */
export const removerPushFn = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown) => z.object({ endpoint: z.string().url() }).parse(entrada))
  .handler(async ({ data }) => {
    const { removerAssinatura } = await import("./push/registro.server");
    return removerAssinatura(data.endpoint);
  });
