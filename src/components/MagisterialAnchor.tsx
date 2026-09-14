import { ExternalLink, Landmark } from "lucide-react";
import { Botao } from "@/components/ds";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  criarAncoraMagisterial,
  type TipoAncoraMagisterial,
} from "@/lib/data/magisterio-anchors";
import { cn } from "@/lib/utils";

export function MagisterialAnchor({
  tipo,
  numero,
  titulo,
  sintese,
  contexto,
  className,
}: {
  tipo: TipoAncoraMagisterial;
  numero: number;
  titulo?: string;
  sintese?: string;
  contexto?: string;
  className?: string;
}) {
  const ancora = criarAncoraMagisterial(tipo, numero, { titulo, sintese, contexto });

  return (
    <Drawer shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <Botao
          type="button"
          variante="discreto"
          tamanho="sm"
          className={cn(
            "inline-flex h-auto min-h-7 gap-1.5 border-gold/25 px-2 py-1 align-baseline text-step--2 normal-case tracking-normal text-gold hover:border-gold/60",
            className,
          )}
          aria-label={`Abrir síntese e fonte de ${ancora.rotulo}`}
        >
          <Landmark className="size-3" aria-hidden="true" />
          {ancora.rotulo}
        </Botao>
      </DrawerTrigger>
      <DrawerContent className="max-h-[88dvh] border-gold/30 bg-background">
        <div className="mx-auto w-full max-w-3xl overflow-y-auto px-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <DrawerHeader className="px-5 pt-7 text-left sm:px-8">
            <p className="kicker">Fonte primária · {ancora.rotulo}</p>
            <DrawerTitle className="font-display text-2xl text-foreground sm:text-3xl">
              {ancora.titulo}
            </DrawerTitle>
            <DrawerDescription className="leading-relaxed">{ancora.contexto}</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-5 px-5 py-4 sm:px-8">
            <div className="border-l-2 border-gold/50 bg-card/40 p-5">
              <p className="kicker mb-2">Síntese editorial</p>
              <p className="body-sm text-foreground/85">{ancora.sintese}</p>
            </div>
            <p className="text-step--2 leading-relaxed text-muted-foreground">
              Esta é uma síntese própria para orientação. A redação integral deve ser conferida na
              fonte indicada. “DH” aqui significa Denzinger-Hünermann; o documento conciliar
              <em> Dignitatis Humanae</em> é sempre escrito por extenso.
            </p>
          </div>
          <DrawerFooter className="px-5 sm:flex-row sm:justify-end sm:px-8">
            <DrawerClose asChild>
              <Botao variante="discreto" tamanho="md">Fechar</Botao>
            </DrawerClose>
            <a
              href={ancora.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-gold btn-md gap-2"
            >
              Conferir fonte <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
