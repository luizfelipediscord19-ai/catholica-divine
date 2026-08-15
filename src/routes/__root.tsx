import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Toaster } from "../components/ui/sonner";
import { ScrollToTop } from "../components/ScrollToTop";
import { CelebracaoProvider } from "../components/portal/Celebracao";
import { InstalarApp } from "../components/portal/InstalarApp";
import { AtualizacaoApp } from "../components/portal/AtualizacaoApp";
import { TarefasDoDia } from "../components/portal/TarefasDoDia";
import { ConsentimentoLGPD } from "../components/portal/ConsentimentoLGPD";
import { NotificacoesProvider } from "../hooks/use-notificacoes";
import { SCRIPT_TEMA } from "../lib/tema";



function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-[28rem] text-center">
        <h1 className="font-display text-[length:var(--step-5)] text-gold">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">Página não encontrada</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          O caminho que buscas não existe ou foi movido. Que o teu estudo te conduza adiante.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-base btn-gold px-6 py-3 label-btn"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-[28rem] text-center">
        <h1 className="font-display text-3xl text-foreground">Esta página não carregou</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Algo correu mal. Tente recarregar ou regresse ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-base btn-gold px-5 py-2.5 label-btn"
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="btn-base btn-outline-gold px-5 py-2.5 label-btn"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://portalcatolico.vercel.app";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portal Católico — Biblioteca digital da Fé Católica" },
      {
        name: "description",
        content:
          "Biblioteca completa da fé católica: Bíblia, Catecismo, Sacramentos, Santos, Maria, orações, apologética e assistente de IA fiel ao Magistério.",
      },
      { name: "author", content: "Portal Católico" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Portal Católico" },
      { name: "application-name", content: "Portal Católico" },

      { property: "og:site_name", content: "Portal Católico" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },

    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Portal Católico",
              inLanguage: "pt-BR",
              description:
                "Biblioteca digital da fé católica: Bíblia, Catecismo, santos, sacramentos, orações e apologética.",
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": ["Organization", "ReligiousOrganization"],
              "@id": `${SITE_URL}/#organization`,
              name: "Portal Católico",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.png`,
              description:
                "Portal de formação católica fiel ao Magistério da Igreja.",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <NotificacoesProvider>
      <CelebracaoProvider>
        <div className="min-h-dvh flex flex-col">
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:text-step--2 focus:uppercase focus:tracking-[0.16em] focus:text-deep"
          >
            Pular para o conteúdo principal
          </a>
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <ScrollToTop />
          <InstalarApp />
          <AtualizacaoApp />
          <div data-leitura-oculto>
            <TarefasDoDia />
          </div>
          <ConsentimentoLGPD />

          <Toaster />
        </div>
      </CelebracaoProvider>
      </NotificacoesProvider>
    </QueryClientProvider>

  );
}

