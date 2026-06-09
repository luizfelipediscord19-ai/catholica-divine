import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import { HORAS, FONTES_OFICIAIS } from "../lib/data/devocoes/horas";

export const Route = createFileRoute("/oracoes/liturgia-das-horas")({
  head: () => ({
    meta: [
      { title: "Liturgia das Horas — Portal Católico" },
      { name: "description", content: "A oração oficial da Igreja: Laudes, Vésperas, Completas e demais Horas Canônicas." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Officium Divinum"
        title="Liturgia das Horas"
        intro="A oração pública e oficial da Igreja, que santifica todas as horas do dia, continuando o cântico de louvor que o próprio Cristo introduziu no mundo (SC 83)."
      />

      <Section kicker="As cinco Horas" title="A estrutura do Ofício Divino">
        <CardGrid cols={2}>
          {HORAS.map((h) => (
            <ContentCard key={h.slug} title={h.nome} subtitle={h.horario}>
              <p className="mb-3">{h.descricao}</p>
              <ul className="text-xs space-y-1 text-foreground/70">
                {h.estrutura.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Rezar hoje" title="Onde acessar o ofício diário">
        <div className="grid md:grid-cols-3 gap-4">
          {FONTES_OFICIAIS.map((f) => (
            <a key={f.url} href={f.url} target="_blank" rel="noopener noreferrer"
              className="border border-gold/30 p-6 hover:border-gold hover:bg-gold/5 transition-colors">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Fonte oficial</p>
              <p className="font-display text-lg">{f.nome}</p>
              <p className="text-xs text-muted-foreground mt-2 break-all">{f.url}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <Link to="/oracoes" className="px-5 py-3 border border-gold/40 hover:bg-gold/10">← Todas as orações</Link>
      </Section>
    </div>
  );
}
