import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { GraduationCap, Newspaper } from "lucide-react";

import { ImagemOtimizada } from "@/components/ImagemOtimizada";
import { ScrollReveal } from "@/components/ScrollReveal";
import { listarNoticiasFn } from "@/lib/noticias.functions";
import { TRILHAS } from "@/lib/data/trilhas";

import velas from "@/assets/velas.jpg";
import claustro from "@/assets/claustro.jpg";
import cristo from "@/assets/cristo.jpg";
import sacramentos from "@/assets/sacramentos.jpg";
import rosario from "@/assets/rosario.jpg";
import vitral from "@/assets/vitral.jpg";
import manuscrito from "@/assets/manuscrito.jpg";
import biblioteca from "@/assets/biblioteca.jpg";

/** Uma imagem por card; ciclo fixo para que a grade fique estável entre visitas. */
const CAPAS_NOTICIA = [velas, claustro, cristo];

const CAPAS_TRILHA: Record<string, string> = {
  "primeiros-passos": sacramentos,
  "vida-espiritual": rosario,
  "catequese-intermediaria": vitral,
  apologetica: manuscrito,
  teologia: biblioteca,
};

const SIZES_CARD = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

const noticiasHomeQuery = queryOptions({
  queryKey: ["noticias", "home"],
  queryFn: () => listarNoticiasFn({ data: { limite: 3 } }),
  staleTime: 10 * 60 * 1000,
});

function formatar(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}

/** Últimos artigos da edição diária, com capa ilustrada e fonte citada. */
export function UltimosArtigos() {
  const { data } = useQuery(noticiasHomeQuery);
  const noticias = data ?? [];
  if (noticias.length === 0) return null;

  return (
    <section aria-labelledby="ultimos-artigos" className="bg-background py-section">
      <div className="shell">
        <ScrollReveal className="mb-[var(--space-lg)] flex flex-col gap-[var(--space-sm)] md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 kicker">
              <Newspaper className="size-4 shrink-0" aria-hidden="true" /> Acta Ecclesiae · Edição diária
            </p>
            <h2 id="ultimos-artigos" className="title-page text-balance leading-[1.08] text-foreground">
              Últimos <span className="italic text-gold/85">artigos.</span>
            </h2>
            <p className="measure mt-6 font-light leading-relaxed text-muted-foreground">
              A vida da Igreja lida com calma: cada texto guarda a fonte original para conferência.
            </p>
          </div>
          <Link to="/noticias" className="kicker whitespace-nowrap hover:text-gold transition-colors">
            Ver todas as notícias →
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-[var(--space-sm)] md:grid-cols-3">
          {noticias.map((n, i) => (
            <ScrollReveal key={n.id} delay={i * 120}>
              <Link
                to="/noticias/$slug"
                params={{ slug: n.slug }}
                className="group flex h-full flex-col overflow-hidden border border-gold/10 bg-card/40 transition-premium hover:-translate-y-1 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImagemOtimizada
                    src={CAPAS_NOTICIA[i % CAPAS_NOTICIA.length]!}
                    alt=""
                    width={1536}
                    height={1024}
                    sizes={SIZES_CARD}
                    className="size-full object-cover opacity-75 transition-transform duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/25 to-transparent" />
                  <p className="absolute bottom-4 left-4 kicker text-gold">{n.categoria}</p>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-card">
                  <h3 className="title-card text-foreground transition-colors group-hover:text-gold">
                    {n.titulo}
                  </h3>
                  <p className="line-clamp-3 text-sm font-light leading-relaxed text-muted-foreground">
                    {n.resumo}
                  </p>
                  <p className="mt-auto border-t border-gold/10 pt-4 kicker">
                    {formatar(n.publicado_em)}
                    {n.fonte_nome ? ` · ${n.fonte_nome}` : ""}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Trilhas de estudo com capa ilustrada e número de lições. */
export function TrilhasIlustradas() {
  return (
    <section aria-labelledby="trilhas-estudo" className="bg-muted/20 py-section">
      <div className="shell">
        <ScrollReveal className="mb-[var(--space-lg)] flex flex-col gap-[var(--space-sm)] md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 kicker">
              <GraduationCap className="size-4 shrink-0" aria-hidden="true" /> Percursos guiados
            </p>
            <h2 id="trilhas-estudo" className="title-page text-balance leading-[1.08] text-foreground">
              Trilhas de <span className="italic text-gold/85">estudo.</span>
            </h2>
            <p className="measure mt-6 font-light leading-relaxed text-muted-foreground">
              Lição por lição, do primeiro passo ao estudo teológico — com Escritura, Catecismo e
              Padres citados em cada etapa e o seu progresso guardado.
            </p>
          </div>
          <Link to="/estudar" className="kicker whitespace-nowrap hover:text-gold transition-colors">
            Ver todos os percursos →
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-3">
          {TRILHAS.map((t, i) => (
            <ScrollReveal key={t.slug} delay={i * 100}>
              <Link
                to="/trilhas/$trilha"
                params={{ trilha: t.slug }}
                className="group flex h-full flex-col overflow-hidden border border-gold/10 bg-background transition-premium hover:-translate-y-1 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ImagemOtimizada
                    src={CAPAS_TRILHA[t.slug] ?? biblioteca}
                    alt=""
                    width={1536}
                    height={1024}
                    sizes={SIZES_CARD}
                    className="size-full object-cover opacity-75 transition-transform duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/20 to-transparent" />
                  <p className="absolute bottom-4 left-4 kicker text-gold">
                    {t.licoes.length} {t.licoes.length === 1 ? "lição" : "lições"}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-card">
                  <h3 className="title-card text-foreground transition-colors group-hover:text-gold">
                    {t.titulo}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">
                    {t.subtitulo}
                  </p>
                  <p className="mt-auto border-t border-gold/10 pt-4 kicker">Começar a trilha →</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
