import { createFileRoute } from "@tanstack/react-router";

/**
 * Proxy de arte sacra de domínio público.
 *
 * Servir os retratos direto do Wikimedia falhava em parte dos navegadores
 * (bloqueio de recurso entre origens, ORB/hotlink), e era isso que deixava
 * cartões de santos sem imagem. Aqui a imagem é buscada pelo servidor e
 * devolvida pela nossa própria origem, com a largura pedida e cache longo:
 * mesma arte, resolução melhor e nenhuma dependência de terceiros no cliente.
 */

const HOSTS_PERMITIDOS = new Set(["upload.wikimedia.org"]);
const LARGURAS = new Set([320, 480, 640, 800, 1024, 1280, 1600, 2000]);

export const Route = createFileRoute("/api/public/imagem")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const params = new URL(request.url).searchParams;
        const bruto = params.get("u");
        if (!bruto) return new Response("Parâmetro 'u' ausente", { status: 400 });

        let alvo: URL;
        try {
          alvo = new URL(bruto);
        } catch {
          return new Response("URL inválida", { status: 400 });
        }
        if (alvo.protocol !== "https:" || !HOSTS_PERMITIDOS.has(alvo.hostname)) {
          return new Response("Origem não permitida", { status: 403 });
        }

        // Miniaturas do Commons trazem a largura no caminho: /960px-arquivo.jpg
        const largura = Number(params.get("w"));
        if (LARGURAS.has(largura) && /\/\d+px-/.test(alvo.pathname)) {
          alvo.pathname = alvo.pathname.replace(/\/\d+px-/, `/${largura}px-`);
        }

        let resposta: Response;
        try {
          resposta = await fetch(alvo.toString(), {
            headers: {
              // O Commons exige identificação do agente para servir arquivos.
              "user-agent": "PortalCatolico/1.0 (https://portalcatolico.vercel.app)",
              accept: "image/avif,image/webp,image/jpeg,image/png,*/*",
            },
          });
        } catch {
          return new Response("Falha ao obter a imagem", { status: 502 });
        }

        // Se a largura pedida for maior que o original, o Commons devolve erro:
        // nesse caso vale voltar à URL original informada.
        if (!resposta.ok && alvo.toString() !== bruto) {
          resposta = await fetch(bruto, {
            headers: { "user-agent": "PortalCatolico/1.0 (https://portalcatolico.vercel.app)" },
          });
        }
        if (!resposta.ok) return new Response("Imagem indisponível", { status: 404 });

        const tipo = resposta.headers.get("content-type") ?? "";
        if (!tipo.startsWith("image/")) return new Response("Conteúdo não é imagem", { status: 415 });

        return new Response(resposta.body, {
          headers: {
            "content-type": tipo,
            "cache-control": "public, max-age=31536000, immutable",
            "x-content-type-options": "nosniff",
            "content-security-policy": "default-src 'none'; sandbox",
          },
        });
      },
    },
  },
});
