import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ShieldCheck } from "lucide-react";

import { LectioGuiada } from "@/components/lectio/LectioGuiada";
import { SomenteMembros } from "@/components/portal/SomenteMembros";
import { FaixaAutoridade } from "@/components/SeloConfiabilidade";

const URL = "https://portalcatolico.vercel.app/lectio-divina";
const DESCRICAO =
  "Assistente católico de Lectio Divina em quatro etapas, com cronômetro, anotações privadas e exportação em Markdown ou PDF.";

export const Route = createFileRoute("/lectio-divina")({
  head: () => ({
    meta: [
      { title: "Lectio Divina Guiada — Leitura Orante da Bíblia" },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: "Lectio Divina Guiada" },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LectioPage,
});

function LectioPage() {
  return (
    <article className="shell-narrow py-block">
      <p className="kicker flex items-center gap-2">
        <BookOpen className="size-3.5" /> Leitura orante da Palavra
      </p>
      <h1 className="title-page mt-4 text-foreground">Lectio Divina guiada</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">
        Percorra as quatro etapas tradicionais: leia o texto, medite à luz da fé, responda em oração
        e permaneça na presença de Deus.
      </p>

      <FaixaAutoridade
        niveis={["oficial", "devocao"]}
        nota="Roteiro inspirado na tradição monástica e na apresentação da leitura orante em Verbum Domini, 87. Não substitui a liturgia nem o acompanhamento espiritual pessoal."
        className="mt-6"
      />

      <section id="como-preparar" className="mt-12 scroll-mt-28">
        <h2 className="title-section text-foreground">Como preparar este tempo</h2>
        <ol className="mt-5 space-y-3 text-muted-foreground">
          <li>Escolha uma passagem curta, preferencialmente o Evangelho da Liturgia do dia.</li>
          <li>Procure silêncio, faça o sinal da cruz e peça a luz do Espírito Santo.</li>
          <li>Avance sem pressa. O cronômetro é opcional e não mede o fruto da oração.</li>
        </ol>
        <div className="action-tray mt-6 print:hidden" data-sem-sumario>
          <Link to="/liturgia-diaria" className="btn-base btn-outline-gold btn-md">
            Abrir Liturgia do dia
          </Link>
          <Link to="/biblia" className="btn-base btn-quiet btn-md">
            Escolher passagem bíblica
          </Link>
        </div>
      </section>

      <SomenteMembros
        className="mt-10"
        titulo="Entre para iniciar sua Lectio privada"
        texto="O assistente e suas anotações aparecem somente após o login. O conteúdo escrito fica exclusivamente neste aparelho."
      >
        <LectioGuiada />
      </SomenteMembros>

      <section id="fontes-lectio" className="mt-14 scroll-mt-28">
        <h2 className="title-section text-foreground">Fontes e orientação</h2>
        <ul className="body-sm mt-5 space-y-3 text-muted-foreground">
          <li>Catecismo da Igreja Católica, §§ 2653–2654 — leitura espiritual da Escritura.</li>
          <li>
            Bento XVI, <em>Verbum Domini</em>, 86–87 — etapas da Lectio Divina.
          </li>
          <li>
            <ShieldCheck className="mr-2 inline size-4 text-gold" />
            Anotações privadas não devem conter dados de terceiros nem substituir Confissão ou
            direção espiritual.
          </li>
        </ul>
      </section>
    </article>
  );
}
