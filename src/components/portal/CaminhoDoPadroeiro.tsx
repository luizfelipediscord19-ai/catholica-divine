import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, HeartHandshake, Quote, Sparkles } from "lucide-react";

import { Painel, Rotulo } from "@/components/portal/comuns";
import { planoDoPadroeiro } from "@/lib/portal/padroeiro";

/**
 * Caminho espiritual personalizado pelo santo padroeiro salvo no perfil:
 * temas, virtudes, orações e leituras bíblicas sugeridas.
 */
export function CaminhoDoPadroeiro({
  slug,
  nome,
}: {
  slug: string;
  nome?: string | null;
}) {
  const plano = planoDoPadroeiro(slug, nome);
  const [aberta, setAberta] = useState<string | null>(null);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <Rotulo>Seu caminho com {plano.nome}</Rotulo>
        <p className="text-sm text-muted-foreground font-light max-w-2xl leading-relaxed">
          {plano.titulo ? `${plano.titulo}. ` : ""}
          {plano.convite}
        </p>
      </header>

      {plano.frase ? (
        <blockquote className="border-l-2 border-gold/50 pl-5 py-1 flex gap-3">
          <Quote className="size-4 text-gold shrink-0 mt-1" aria-hidden="true" />
          <p className="font-display text-lg text-foreground/90 leading-relaxed italic">
            “{plano.frase}”
          </p>
        </blockquote>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <Painel>
          <div className="flex items-start justify-between gap-4 mb-4">
            <Rotulo>Virtudes para imitar</Rotulo>
            <Sparkles className="size-4 text-gold shrink-0" aria-hidden="true" />
          </div>
          <ul className="space-y-2">
            {(plano.virtudes.length > 0 ? plano.virtudes : plano.temas).map((v) => (
              <li key={v} className="text-sm text-foreground/85 font-light">
                <span className="text-gold mr-2">✦</span>
                {v}
              </li>
            ))}
          </ul>
          {plano.padroeiro ? (
            <p className="text-xs text-muted-foreground font-light mt-5 leading-relaxed">
              Padroeiro de {plano.padroeiro}
              {plano.festa ? ` · Festa em ${plano.festa}` : ""}
            </p>
          ) : null}
        </Painel>

        <Painel>
          <div className="flex items-start justify-between gap-4 mb-4">
            <Rotulo>Orações sugeridas</Rotulo>
            <HeartHandshake className="size-4 text-gold shrink-0" aria-hidden="true" />
          </div>
          <ul className="space-y-3">
            {plano.oracoes.map((o) => {
              const ativo = aberta === o.slug;
              return (
                <li key={o.slug} className="border-b border-gold/10 pb-3 last:border-0">
                  <button
                    type="button"
                    onClick={() => setAberta(ativo ? null : o.slug)}
                    aria-expanded={ativo}
                    className="w-full text-left text-sm text-foreground/90 font-light hover:text-gold transition-colors"
                  >
                    {o.titulo}
                  </button>
                  {ativo ? (
                    <div className="mt-2 space-y-2">
                      {o.paraQue ? (
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">
                          {o.paraQue}
                        </p>
                      ) : null}
                      <p className="text-sm text-foreground/80 font-light leading-relaxed whitespace-pre-line">
                        {o.texto}
                      </p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <Link
            to="/oracoes"
            className="inline-block mt-5 kicker hover:text-paper transition-colors"
          >
            Ver todas as orações
          </Link>
        </Painel>

        <Painel>
          <div className="flex items-start justify-between gap-4 mb-4">
            <Rotulo>Leituras sugeridas</Rotulo>
            <BookOpen className="size-4 text-gold shrink-0" aria-hidden="true" />
          </div>
          <ul className="space-y-4">
            {plano.leituras.map((l) => (
              <li key={`${l.livroSlug}-${l.capitulo}`} className="space-y-1">
                <Link
                  to="/biblia/$livro/$capitulo"
                  params={{ livro: l.livroSlug, capitulo: String(l.capitulo) }}
                  className="text-sm text-gold hover:underline"
                >
                  {l.livroNome} {l.capitulo}
                </Link>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {l.motivo}
                </p>
              </li>
            ))}
          </ul>
        </Painel>
      </div>
    </section>
  );
}
