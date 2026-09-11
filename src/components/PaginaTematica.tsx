/**
 * Página temática de leitura longa (Enciclopédia, Apologética, Sacramentos).
 *
 * Estrutura em seções com h2, o que ativa automaticamente o sumário global
 * (`SumarioPagina`) e a impressão em cores ou em preto e branco.
 */
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookMarked, BookOpen, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import { FaixaAutoridade } from "@/components/SeloConfiabilidade";
import { linkificarNos } from "@/components/CitacoesLinkadas";
import { VERBETES_ENCICLOPEDIA } from "@/lib/data/enciclopedia";
import type { SecaoTema } from "@/lib/data/enciclopedia-temas";

export function PaginaTematica({
  voltar,
  kicker,
  nome,
  resumo,
  secoes,
  paragrafosCIC = [],
  verbetes = [],
  nota,
  children,
}: {
  voltar: { to: string; label: string };
  kicker: string;
  nome: string;
  resumo: string;
  secoes: SecaoTema[];
  paragrafosCIC?: number[];
  verbetes?: string[];
  nota?: string;
  children?: ReactNode;
}) {
  const ligados = verbetes
    .map((slug) => VERBETES_ENCICLOPEDIA.find((v) => v.slug === slug))
    .filter((v): v is (typeof VERBETES_ENCICLOPEDIA)[number] => !!v);

  return (
    <div className="shell py-block">
      <Link
        to={voltar.to}
        className="kicker mb-6 inline-flex items-center gap-2 hover:text-gold print:hidden"
      >
        <ArrowLeft className="size-3 shrink-0" /> {voltar.label}
      </Link>

      <p className="kicker mb-4">{kicker}</p>
      <h1 className="title-page leading-tight text-foreground">{nome}</h1>
      <div className="filete-ouro my-6" />
      <p className="body-lead measure text-muted-foreground">{resumo}</p>

      <FaixaAutoridade
        niveis={["oficial", "teologia"]}
        nota={
          nota ??
          "Sínteses próprias do Portal Católico, fiéis ao Catecismo, aos concílios e aos documentos citados em cada seção. As referências permitem conferir a fonte."
        }
        className="mt-6 max-w-3xl"
      />

      {paragrafosCIC.length ? (
        <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden" data-sem-sumario>
          <span className="kicker flex items-center gap-2">
            <BookMarked className="size-3.5 text-gold" aria-hidden="true" /> No Catecismo
          </span>
          {paragrafosCIC.map((p) => (
            <Link
              key={p}
              to="/catecismo/artigos"
              search={{ p }}
              className="chip chip-gold hover:text-paper"
            >
              § {p}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-12 space-y-12">
        {secoes.map((secao, i) => (
          <section key={secao.id} id={secao.id} className="scroll-mt-28">
            <p className="num-secao">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="title-section mt-2 text-foreground">{secao.titulo}</h2>
            <div className="mt-4 space-y-4">
              {secao.paragrafos.map((p) => (
                <p key={p.slice(0, 32)} className="body-base measure text-muted-foreground">
                  {linkificarNos(p)}
                </p>
              ))}
            </div>

            {secao.pontos ? (
              <ul className="mt-6 space-y-2">
                {secao.pontos.map((ponto) => (
                  <li
                    key={ponto}
                    className="body-sm border-l-2 border-gold/30 pl-4 text-muted-foreground"
                  >
                    {linkificarNos(ponto)}
                  </li>
                ))}
              </ul>
            ) : null}

            {secao.referencias ? (
              <p className="mt-5 text-step--2 text-foreground/75">
                <span className="label-btn text-gold">Referências: </span>
                {linkificarNos(secao.referencias.join(" · "))}
              </p>
            ) : null}
          </section>
        ))}
      </div>

      {ligados.length ? (
        <section id="na-enciclopedia" className="mt-16 scroll-mt-28">
          <h2 className="title-section text-foreground">Na Enciclopédia Católica</h2>
          <div
            data-sem-sumario
            className="mt-5 grid gap-px border-y border-gold/15 bg-gold/15 lg:grid-cols-2"
          >
            {ligados.map((verbete) => (
              <article key={verbete.slug} className="bg-background p-card">
                <p className="kicker">{verbete.categoria}</p>
                <h3 className="title-card mt-2 text-foreground">{verbete.termo}</h3>
                <p className="body-sm mt-3 text-muted-foreground">{verbete.sintese}</p>
                <Link
                  to="/enciclopedia"
                  hash={verbete.slug}
                  className="btn-base btn-quiet btn-sm label-btn mt-4 print:hidden"
                >
                  Abrir verbete
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section id="continuar" className="mt-16 scroll-mt-28 print:hidden" data-sem-sumario>
        <h2 className="title-section text-foreground">Continuar o estudo</h2>
        <div className="action-tray mt-6">
          {children}
          <Link to="/catecismo/artigos" className="btn-base btn-gold btn-md gap-2">
            <BookOpen className="size-4 shrink-0" /> Catecismo por artigos
          </Link>
          <Link to="/enciclopedia" className="btn-base btn-outline-gold btn-md">
            Enciclopédia Católica
          </Link>
          <a
            href="https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html"
            target="_blank"
            rel="noopener"
            className="btn-base btn-quiet btn-md gap-2"
          >
            Texto oficial <ExternalLink className="size-4 shrink-0" />
          </a>
        </div>
      </section>
    </div>
  );
}
