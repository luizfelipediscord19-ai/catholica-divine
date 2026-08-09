import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { anexarTokenDaConta } from "./lib/auth/anexar-token";
// O portal é público para leitura, mas o fórum e o painel podem ser usados com
// conta de e-mail/senha. Por isso registramos o middleware que anexa o token da
// sessão às chamadas de servidor — sem ele, as funções protegidas responderiam
// 401 e o progresso da conta não seria reconciliado.



const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [anexarTokenDaConta],
  requestMiddleware: [errorMiddleware],
}));
