import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { anexarTokenDaConta } from "./lib/auth/anexar-token";
// O portal é público para leitura, mas o fórum e o painel podem ser usados com
// conta de e-mail/senha. Por isso registramos o middleware que anexa o token da
// sessão às chamadas de servidor — sem ele, as funções protegidas responderiam
// 401 e o progresso da conta não seria reconciliado.



const errorMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    // Chamadas de server function precisam receber o erro serializado, e não a
    // página HTML de falha: só assim a interface mostra a mensagem real
    // (ex.: "Sua sessão expirou. Entre novamente.") em vez de um erro genérico.
    const url = request?.url ?? "";
    if (url.includes("createServerFn") || url.includes("_serverFn")) {
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
