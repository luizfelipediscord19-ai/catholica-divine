import { BookMarked, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  comentariosDoCapitulo,
  FAMILIA_PATRISTICA,
  type FamiliaPatristica,
} from "@/lib/data/biblia/patristica";

const ORDEM: FamiliaPatristica[] = ["apostolicos", "apologistas", "doutores"];

export function ComentariosPatristicos({ livro, capitulo }: { livro: string; capitulo: number }) {
  const comentarios = comentariosDoCapitulo(livro, capitulo);
  if (comentarios.length === 0) return null;
  const primeira = ORDEM.find((familia) => comentarios.some((item) => item.familia === familia));
  if (!primeira) return null;

  return (
    <section className="mt-10 border-y border-gold/15 py-8" aria-labelledby="titulo-patristica">
      <div className="mb-5 flex items-start gap-3">
        <BookMarked className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
        <div>
          <p className="kicker">Catena do capítulo</p>
          <h2 id="titulo-patristica" className="title-sub mt-1">
            Comentários dos Santos Padres
          </h2>
          <p className="body-sm mt-2 max-w-3xl">
            Sínteses próprias de leituras patrísticas identificadas por autor, século e obra. Não
            são traduções integrais dos textos antigos.
          </p>
        </div>
      </div>

      <Tabs defaultValue={primeira}>
        <TabsList className="h-auto w-full justify-start overflow-x-auto bg-card/40 p-1">
          {ORDEM.map((familia) => {
            const quantidade = comentarios.filter((item) => item.familia === familia).length;
            if (!quantidade) return null;
            return (
              <TabsTrigger key={familia} value={familia} className="min-h-10 whitespace-nowrap">
                {FAMILIA_PATRISTICA[familia]} ({quantidade})
              </TabsTrigger>
            );
          })}
        </TabsList>
        {ORDEM.map((familia) => (
          <TabsContent key={familia} value={familia} className="space-y-4 pt-4">
            {comentarios
              .filter((item) => item.familia === familia)
              .map((item) => (
                <article key={`${item.autor}-${item.obra}`} className="surface-card p-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="title-card">{item.autor}</h3>
                      <p className="kicker mt-1">
                        Século {item.seculo} · {item.obra}
                      </p>
                    </div>
                    {item.versiculos ? (
                      <a
                        href={`#v${item.versiculos[0]}`}
                        className="text-step--2 text-gold hover:underline"
                      >
                        vv. {item.versiculos[0]}–{item.versiculos[1]}
                      </a>
                    ) : null}
                  </div>
                  <p className="body-sm mt-4 text-foreground/85">{item.nota}</p>
                  <p className="mt-4 text-step--2 text-muted-foreground">Fonte: {item.fonte}</p>
                </article>
              ))}
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link to="/padres-da-igreja" className="btn-base btn-outline-gold btn-sm gap-2">
          Biblioteca patrística <ExternalLink className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
