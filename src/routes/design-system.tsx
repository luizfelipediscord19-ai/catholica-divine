import { createFileRoute } from "@tanstack/react-router";
import {
  Aviso,
  Chip,
  Divisor,
  EstadoVazio,
  Grid,
  Kicker,
  ListaDefinicoes,
  Metrica,
  Painel,
  Row,
  Secao,
  Texto,
  Titulo,
} from "@/components/ds";
import { PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/design-system")({
  component: DesignSystem,
  head: () => ({
    meta: [
      { title: "Design System | Portal Católico" },
      {
        name: "description",
        content:
          "Referência viva dos tokens de cor, tipografia e espaçamento e dos componentes reutilizáveis que padronizam todas as páginas do Portal Católico.",
      },
      { property: "og:title", content: "Design System | Portal Católico" },
      {
        property: "og:description",
        content:
          "Tokens de cor, escala tipográfica fluida, espaçamentos e componentes reutilizáveis do Portal Católico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

const CORES: { nome: string; token: string; classe: string }[] = [
  { nome: "Background", token: "--background", classe: "bg-background" },
  { nome: "Card", token: "--card", classe: "bg-card" },
  { nome: "Muted", token: "--muted", classe: "bg-muted" },
  { nome: "Ouro (primary)", token: "--gold", classe: "bg-gold" },
  { nome: "Mariano", token: "--marian", classe: "bg-marian" },
  { nome: "Cardinal", token: "--cardinal", classe: "bg-cardinal" },
  { nome: "Sucesso", token: "--success", classe: "bg-success" },
  { nome: "Atenção", token: "--warning", classe: "bg-warning" },
  { nome: "Informação", token: "--info", classe: "bg-info" },
];

const TIPOGRAFIA: { classe: string; nome: string; uso: string }[] = [
  { classe: "title-page", nome: "Título de página", uso: "H1 único por rota" },
  { classe: "title-section", nome: "Título de seção", uso: "H2 dos blocos" },
  { classe: "title-card", nome: "Título de card", uso: "H3 em cards e subseções" },
  { classe: "title-sub", nome: "Subtítulo", uso: "H4 e rótulos maiores" },
  { classe: "body-lead", nome: "Parágrafo de abertura", uso: "Introduções" },
  { classe: "body-base", nome: "Texto corrente", uso: "Conteúdo padrão" },
  { classe: "body-sm", nome: "Texto auxiliar", uso: "Legendas e apoio" },
];

const ESPACOS = [
  { token: "--space-2xs", classe: "w-2xs" },
  { token: "--space-xs", classe: "w-xs" },
  { token: "--space-sm", classe: "w-sm" },
  { token: "--space-md", classe: "w-md" },
  { token: "--space-lg", classe: "w-lg" },
  { token: "--space-xl", classe: "w-xl" },
];

function DesignSystem() {
  return (
    <>
      <PageHero
        eyebrow="Fundamentos"
        title="Design System"
        intro="Tokens e componentes que padronizam cor, tipografia, espaçamento e interação em todas as páginas do portal. Nada de valores soltos: cada página compõe estes primitivos."
      />

      <Secao
        kicker="Cor"
        titulo="Paleta semântica"
        descricao="Todas as cores vêm de tokens CSS remapeados no tema claro e escuro. Componentes nunca usam cores fixas."
      >
        <Grid min="12rem">
          {CORES.map((c) => (
            <Painel key={c.token} className="stack-sm">
              <div className={`h-16 w-full rounded-[var(--radius-btn)] border hairline ${c.classe}`} />
              <p className="title-sub">{c.nome}</p>
              <code className="body-meta font-mono normal-case">{c.token}</code>
            </Painel>
          ))}
        </Grid>
      </Secao>

      <Secao
        kicker="Tipografia"
        titulo="Escala fluida"
        descricao="Playfair Display nos títulos, Inter no texto. Os tamanhos escalam por clamp() entre 360px e 1440px, sem breakpoints manuais."
      >
        <div className="stack">
          {TIPOGRAFIA.map((t) => (
            <Painel key={t.classe}>
              <Row align="between" className="mb-xs">
                <code className="body-meta font-mono normal-case">.{t.classe}</code>
                <Chip>{t.uso}</Chip>
              </Row>
              <p className={t.classe}>{t.nome} — Verbum Domini manet in aeternum</p>
            </Painel>
          ))}
        </div>
      </Secao>

      <Secao
        kicker="Espaçamento"
        titulo="Ritmo de 6 degraus"
        descricao="Um único conjunto de espaçamentos fluidos controla gutters, ritmo vertical e padding interno de cards."
      >
        <Painel className="stack-sm">
          {ESPACOS.map((e) => (
            <div key={e.token} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-xs">
              <div className="flex min-w-0 items-center gap-xs">
                <span className={`h-3 shrink-0 rounded-full bg-gold/60 ${e.classe}`} />
                <code className="body-meta truncate font-mono normal-case">{e.token}</code>
              </div>
              <Chip tom="ouro">fluido</Chip>
            </div>
          ))}
        </Painel>
      </Secao>

      <Secao
        kicker="Componentes"
        titulo="Blocos reutilizáveis"
        descricao="Importados de @/components/ds. Qualquer página nova deve ser montada apenas com estes elementos."
      >
        <div className="stack-lg">
          <div className="stack">
            <Kicker>Botões</Kicker>
            <Row>
              <Button>Ação primária</Button>
              <Button variant="outline">Secundária</Button>
              <Button variant="ghost">Discreta</Button>
              <Button size="sm">Pequena</Button>
              <Button disabled>Desativada</Button>
            </Row>
          </div>

          <div className="stack">
            <Kicker>Etiquetas</Kicker>
            <Row>
              <Chip>Neutra</Chip>
              <Chip tom="ouro">Destaque</Chip>
              <Chip tom="sucesso">Concluído</Chip>
              <Chip tom="atencao">Em revisão</Chip>
              <Chip tom="info">Informação</Chip>
            </Row>
          </div>

          <div className="stack">
            <Kicker>Métricas</Kicker>
            <Grid min="13rem">
              <Metrica rotulo="Sequência" valor="12 dias" detalhe="Oração diária" />
              <Metrica rotulo="Nível" valor="7" detalhe="1.240 XP acumulados" />
              <Metrica rotulo="Capítulos lidos" valor="83" detalhe="de 1.334" />
            </Grid>
          </div>

          <div className="stack">
            <Kicker>Avisos</Kicker>
            <Grid min="18rem">
              <Aviso tom="info" titulo="Nota editorial">
                Todo conteúdo doutrinal cita Catecismo, Escritura ou documento magisterial.
              </Aviso>
              <Aviso tom="atencao" titulo="Revelação privada">
                Aprovada pela Igreja, não obriga como dogma.
              </Aviso>
            </Grid>
          </div>

          <div className="stack">
            <Kicker>Listas de definição</Kicker>
            <Painel>
              <ListaDefinicoes
                itens={[
                  { termo: "Memória", valor: "Celebração de grau mais simples do calendário." },
                  { termo: "Festa", valor: "Grau intermediário, com Glória na Missa." },
                  { termo: "Solenidade", valor: "Grau máximo, com Glória e Credo." },
                ]}
              />
            </Painel>
          </div>

          <div className="stack">
            <Kicker>Estado vazio</Kicker>
            <EstadoVazio
              titulo="Nenhum favorito ainda"
              descricao="Salve capítulos, orações e santos para encontrá-los aqui depois."
              acao={<Button variant="outline">Explorar a Bíblia</Button>}
            />
          </div>

          <Divisor />

          <Texto variante="sm">
            Regras de uso: um H1 por página, containers sempre via Container/Secao, cores apenas por
            token, alvos de toque de 44px e foco visível em todo elemento interativo.
          </Texto>
        </div>
      </Secao>
    </>
  );
}
