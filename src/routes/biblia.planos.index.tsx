import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero, Section, Prose, CardGrid } from "../components/PageShell";
import { PLANOS, rotuloDia } from "../lib/data/biblia/planos";
import {
  EVENTO_PLANOS,
  lerPlanos,
  percentualPlano,
  proximoDia,
  type ProgressoPlanos,
} from "../lib/biblia/planos-progresso";
import manuscrito from "../assets/manuscrito.jpg";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/biblia/planos/")({
  head: () => ({
    meta: [
      { title: "Planos de Leitura da Bíblia — Portal Católico" },
      {
        name: "description",
        content:
          "Planos guiados de leitura da Bíblia Católica: Evangelhos em 30 dias, Salmos em 30 dias, Novo Testamento em 90 dias e a Bíblia inteira em um ano, com progresso salvo.",
      },
      { name: "keywords", content: keywordsPara(["biblia", "formacao"]) },
      { property: "og:title", content: "Planos de leitura bíblica guiada" },
      {
        property: "og:description",
        content:
          "Escolha um plano, leia alguns capítulos por dia e acompanhe seu progresso nos 73 livros do cânon católico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/biblia/planos" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/biblia/planos" }],
  }),
  component: Page,
});

function Page() {
  const [progresso, setProgresso] = useState<ProgressoPlanos>({ concluidos: [] });

  useEffect(() => {
    const atualizar = () => setProgresso(lerPlanos());
    atualizar();
    window.addEventListener(EVENTO_PLANOS, atualizar);
    return () => window.removeEventListener(EVENTO_PLANOS, atualizar);
  }, []);

  return (
    <div>
      <PageHero
        autoridade={["oficial"]}
        notaAutoridade="A divisão dos dias é uma proposta pastoral do portal; o texto lido é sempre o das versões em domínio público disponíveis no leitor."
        eyebrow="Lectio continua"
        title="Planos de leitura da Bíblia"
        intro="Escolha um caminho, leia alguns capítulos por dia e acompanhe o progresso. Ignorar as Escrituras é ignorar Cristo (São Jerônimo, citado em CIC §133)."
        image={manuscrito}
      />

      <Section kicker="Escolha o seu ritmo" title="Quatro planos, um só objetivo">
        <Prose>
          <p>
            Não há pressa: há constância. Cada plano marca os capítulos do dia e guarda o que você
            já leu neste dispositivo — se parar no meio, você volta exatamente de onde saiu.
          </p>
        </Prose>

        <div className="mt-[var(--space-md)]">
          <CardGrid cols={2}>
            {PLANOS.map((p) => {
              const pct = percentualPlano(p.slug, p.dias.length, progresso);
              const proximo = proximoDia(p.slug, p.dias.length, progresso);
              const dia = proximo ? p.dias[proximo - 1] : undefined;
              return (
                <article
                  key={p.slug}
                  className="surface-card surface-card-interactive flex min-w-0 flex-col p-card"
                >
                  <p className="kicker">{p.subtitulo}</p>
                  <h3 className="mt-2xs title-card">{p.titulo}</h3>
                  <p className="mt-xs body-sm">{p.paraQuem}</p>

                  <dl className="mt-sm flex flex-wrap gap-x-6 gap-y-1 text-step--2 text-muted-foreground">
                    <div>
                      <dt className="sr-only">Dias</dt>
                      <dd>{p.dias.length} dias</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Capítulos</dt>
                      <dd>{p.capitulos} capítulos</dd>
                    </div>
                  </dl>

                  <div className="mt-sm">
                    <div
                      className="h-1 w-full overflow-hidden bg-gold/10"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progresso em ${p.titulo}`}
                    >
                      <div className="h-full bg-gold/70" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-2xs text-step--2 text-muted-foreground">
                      {pct}% concluído
                      {dia ? ` · próximo: dia ${dia.dia} (${rotuloDia(dia)})` : " · plano completo"}
                    </p>
                  </div>

                  <Link
                    to="/biblia/planos/$slug"
                    params={{ slug: p.slug }}
                    className="btn-base mt-auto self-start border border-gold/30 px-5 py-2.5 label-btn text-foreground/85 transition-premium hover:border-gold hover:text-gold"
                  >
                    {pct > 0 ? "Continuar plano" : "Começar plano"}
                  </Link>
                </article>
              );
            })}
          </CardGrid>
        </div>
      </Section>
    </div>
  );
}
