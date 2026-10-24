import { describe, expect, it } from "vitest";
import { cabecalhosCors, isAllowedBrowserRequest } from "./chat-utils.server";

describe("Acesso da Sophia pelo portal", () => {
  it("aceita o domínio oficial sem depender de metadados do navegador", () => {
    const request = new Request("https://portalcatolico.vercel.app/api/chat", {
      headers: { Origin: "https://portalcatolico.vercel.app" },
    });
    expect(isAllowedBrowserRequest(request)).toBe(true);
    expect(cabecalhosCors(request)["Access-Control-Allow-Origin"]).toBe("https://portalcatolico.vercel.app");
  });
  it("nega origem externa que imita o domínio oficial", () => {
    const request = new Request("https://portalcatolico.vercel.app/api/chat", {
      headers: { Origin: "https://portalcatolico.vercel.app.example.com" },
    });
    expect(isAllowedBrowserRequest(request)).toBe(false);
    expect(cabecalhosCors(request)["Access-Control-Allow-Origin"]).toBeUndefined();
  });
});