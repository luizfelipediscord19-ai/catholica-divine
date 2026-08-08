// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

// Inside a Lovable build, the preset is forced to Cloudflare and this override is ignored.
// Outside (your CI / Vercel), this pins Nitro to the Vercel preset so `npm run build`
// produces Vercel serverless functions and static assets under `.vercel/output`.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
  vite: {
    // seroval 1.6 reads `import.meta.env.PROD`; keeping it in Vite's SSR graph
    // ensures that value exists on the server (otherwise every RPC payload
    // parse crashes with "Cannot read properties of undefined (reading 'PROD')").
    ssr: {
      noExternal: ["seroval", "seroval-plugins"],
    },
    plugins: [
      VitePWA({
        strategies: "generateSW",
        registerType: "autoUpdate",
        // O registro acontece apenas no wrapper guardado (src/lib/pwa/registrar-sw.ts).
        injectRegister: null,
        filename: "sw.js",
        // O build do TanStack Start emite os arquivos públicos em dist/client.
        outDir: "dist/client",
        devOptions: { enabled: false },
        manifest: false,
        workbox: {
          globPatterns: ["**/*.{js,css,woff,woff2,png,svg,ico,webmanifest}"],
          navigateFallback: "/",
          navigateFallbackDenylist: [/^\/~oauth/, /^\/api\//, /^\/_serverFn\//, /^\/sitemap\.xml/],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              // Páginas: sempre tenta a rede; usa o cache só quando offline.
              urlPattern: ({ request, url }) =>
                request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
              handler: "NetworkFirst",
              options: {
                cacheName: "paginas",
                networkTimeoutSeconds: 4,
                expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
            {
              // Assets versionados do build.
              urlPattern: ({ request, url, sameOrigin }) =>
                Boolean(sameOrigin) &&
                ["script", "style", "font", "image"].includes(request.destination) &&
                !url.pathname.startsWith("/~oauth"),
              handler: "CacheFirst",
              options: {
                cacheName: "assets",
                expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 60 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              // Textos já lidos (Bíblia, liturgia, orações) via server functions GET.
              urlPattern: ({ url, request }) =>
                request.method === "GET" && url.pathname.startsWith("/_serverFn/"),
              handler: "NetworkFirst",
              options: {
                cacheName: "textos",
                networkTimeoutSeconds: 6,
                expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 60 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
      }),
    ],
  },
});
