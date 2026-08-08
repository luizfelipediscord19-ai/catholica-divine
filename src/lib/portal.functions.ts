import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Camada RPC do portal. Toda a lógica vive em *.server.ts — este arquivo
// contém apenas declarações de server functions (exigência do splitter).

const Token = z.object({ token: z.string().uuid().nullable() });
const TokenObrigatorio = z.object({ token: z.string().uuid() });
const TokenOpcional = z.object({ token: z.string().uuid().nullish() });

export const garantirIdentidadeFn = createServerFn({ method: "POST" })
  .inputValidator(Token)
  .handler(async ({ data }) => {
    const { garantirIdentidade } = await import("./portal/identidade.server");
    return garantirIdentidade(data.token);
  });

export const escolherSantoFn = createServerFn({ method: "POST" })
  .inputValidator(TokenObrigatorio.extend({ slug: z.string().trim().min(1).max(120) }))
  .handler(async ({ data }) => {
    const { escolherSanto } = await import("./portal/identidade.server");
    return escolherSanto(data.token, data.slug);
  });

export const obterPainelFn = createServerFn({ method: "POST" })
  .inputValidator(TokenObrigatorio)
  .handler(async ({ data }) => {
    const { obterPainel } = await import("./portal/identidade.server");
    return obterPainel(data.token);
  });

/** Painel da conta: a identidade é derivada exclusivamente da sessão validada. */
export const obterPainelContaFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(TokenOpcional)
  .handler(async ({ data, context }) => {
    const { tokenDaConta } = await import("./portal/conta.server");
    const { obterPainel } = await import("./portal/identidade.server");
    const token = await tokenDaConta(
      context.userId,
      (context.claims["email"] as string | undefined) ?? null,
      data.token ?? null,
    );
    return obterPainel(token);
  });

export const registrarOracaoFn = createServerFn({ method: "POST" })
  .inputValidator(
    TokenObrigatorio.extend({
      intencao: z.string().trim().max(500).optional(),
      reflexao: z.string().trim().max(2000).optional(),
      minutos: z.number().int().min(0).max(600).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { registrarOracao } = await import("./portal/identidade.server");
    return registrarOracao(data.token, data);
  });

export const marcarCapituloFn = createServerFn({ method: "POST" })
  .inputValidator(
    TokenObrigatorio.extend({
      livro: z.string().min(1).max(60),
      capitulo: z.number().int().min(1).max(150),
      lido: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const { marcarCapitulo } = await import("./portal/identidade.server");
    return marcarCapitulo(data.token, data.livro, data.capitulo, data.lido);
  });

export const obterCapituloFn = createServerFn({ method: "POST" })
  .inputValidator(
    TokenObrigatorio.extend({
      livro: z.string().min(1).max(60),
      capitulo: z.number().int().min(1).max(150),
    }),
  )
  .handler(async ({ data }) => {
    const { obterCapitulo } = await import("./portal/identidade.server");
    return obterCapitulo(data.token, data.livro, data.capitulo);
  });

export const alternarFavoritoFn = createServerFn({ method: "POST" })
  .inputValidator(
    TokenObrigatorio.extend({
      livro: z.string().min(1).max(60),
      capitulo: z.number().int().min(1).max(150),
      versiculo: z.number().int().min(1).max(200),
      texto: z.string().max(1000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { alternarFavorito } = await import("./portal/identidade.server");
    return alternarFavorito(data.token, data.livro, data.capitulo, data.versiculo, data.texto);
  });

export const salvarNotaFn = createServerFn({ method: "POST" })
  .inputValidator(
    TokenObrigatorio.extend({
      id: z.string().uuid().optional(),
      livro: z.string().min(1).max(60),
      capitulo: z.number().int().min(1).max(150),
      versiculo: z.number().int().min(1).max(200).optional(),
      conteudo: z.string().trim().min(1).max(4000),
    }),
  )
  .handler(async ({ data }) => {
    const { salvarNota } = await import("./portal/identidade.server");
    return salvarNota(data.token, data);
  });

export const apagarNotaFn = createServerFn({ method: "POST" })
  .inputValidator(TokenObrigatorio.extend({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { apagarNota } = await import("./portal/identidade.server");
    await apagarNota(data.token, data.id);
    return { ok: true };
  });

// ---------- Fórum Agora Ecclesiae ----------

export const listarSecoesFn = createServerFn({ method: "GET" }).handler(async () => {
  const { listarSecoes } = await import("./portal/forum.server");
  return listarSecoes();
});

export const listarTopicosFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      secaoSlug: z.string().max(60).optional(),
      token: z.string().uuid().nullish(),
    }),
  )
  .handler(async ({ data }) => {
    const { listarTopicos } = await import("./portal/forum.server");
    return listarTopicos(data.secaoSlug, data.token ?? null);
  });

export const obterTopicoFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({ slug: z.string().min(1).max(120), token: z.string().uuid().nullish() }),
  )
  .handler(async ({ data }) => {
    const { obterTopico } = await import("./portal/forum.server");
    return obterTopico(data.slug, data.token ?? null);
  });

// ---------- Ações que exigem conta (e-mail e senha) ----------
// O `token` recebido é apenas a identidade anônima deste navegador: ela é
// adotada pela conta no primeiro login. A identidade usada nas escritas vem
// sempre do usuário autenticado, nunca do que o cliente enviou.

/** Vincula (ou cria) a identidade do portal para a conta autenticada. */
export const vincularContaFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(TokenOpcional)
  .handler(async ({ data, context }) => {
    const { identidadeDaConta } = await import("./portal/conta.server");
    return identidadeDaConta(
      context.userId,
      (context.claims["email"] as string | undefined) ?? null,
      data.token ?? null,
    );
  });

export const criarTopicoFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    TokenOpcional.extend({
      secaoSlug: z.string().min(1).max(60),
      titulo: z.string().trim().min(5).max(140),
      corpo: z.string().trim().min(10).max(8000),
    }),
  )
  .handler(async ({ data, context }) => {
    const { tokenDaConta } = await import("./portal/conta.server");
    const { criarTopico } = await import("./portal/forum.server");
    const token = await tokenDaConta(
      context.userId,
      (context.claims["email"] as string | undefined) ?? null,
      data.token ?? null,
    );
    return criarTopico(token, data);
  });

export const responderTopicoFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    TokenOpcional.extend({
      topicoSlug: z.string().min(1).max(120),
      corpo: z.string().trim().min(2).max(8000),
    }),
  )
  .handler(async ({ data, context }) => {
    const { tokenDaConta } = await import("./portal/conta.server");
    const { responderTopico } = await import("./portal/forum.server");
    const token = await tokenDaConta(
      context.userId,
      (context.claims["email"] as string | undefined) ?? null,
      data.token ?? null,
    );
    return responderTopico(token, data.topicoSlug, data.corpo);
  });

export const reagirFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    TokenOpcional.extend({
      topicoId: z.string().uuid().optional(),
      respostaId: z.string().uuid().optional(),
      tipo: z.string().max(20).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const { tokenDaConta } = await import("./portal/conta.server");
    const { reagir } = await import("./portal/forum.server");
    const token = await tokenDaConta(
      context.userId,
      (context.claims["email"] as string | undefined) ?? null,
      data.token ?? null,
    );
    return reagir(token, { topicoId: data.topicoId, respostaId: data.respostaId }, data.tipo);
  });

export const denunciarFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    TokenOpcional.extend({
      topicoId: z.string().uuid().optional(),
      respostaId: z.string().uuid().optional(),
      motivo: z.string().min(2).max(40),
      comentario: z.string().trim().max(600).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const { tokenDaConta } = await import("./portal/conta.server");
    const { denunciar } = await import("./portal/forum.server");
    const token = await tokenDaConta(
      context.userId,
      (context.claims["email"] as string | undefined) ?? null,
      data.token ?? null,
    );
    return denunciar(
      token,
      { topicoId: data.topicoId, respostaId: data.respostaId },
      data.motivo,
      data.comentario,
    );
  });
