import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SUGESTOES_GERAL } from "../lib/data/sophia-perguntas";
import { SophiaChat } from "../components/SophiaChat";


export const Route = createFileRoute("/assistente")({
  head: () => ({
    meta: [
      { title: "Assistente IA Católica — Portal Católico" },
      { property: "og:url", content: "https://catholica-divine.lovable.app/assistente" },
      { name: "description", content: "Sophia, IA fiel ao Magistério: tire suas dúvidas sobre a fé católica com base na Bíblia, Catecismo e documentos oficiais." },
      { property: "og:title", content: "Assistente IA Católica" },
      { property: "og:description", content: "IA católica baseada na Bíblia, Catecismo e documentos oficiais." },
    ],
    links: [{ rel: "canonical", href: "https://catholica-divine.lovable.app/assistente" }],
  }),
  component: Page,
});

const SUGESTOES = SUGESTOES_GERAL;

function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <div className="text-center mb-10">
        <Sparkles className="size-8 text-gold mx-auto mb-4" />
        <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Sophia · IA Católica</p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground">
          Pergunte sobre a Fé Católica
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Respostas fundamentadas na Bíblia, no Catecismo e nos documentos oficiais da Igreja.
        </p>
      </div>

      <SophiaChat 
        mode="geral"
        suggestions={SUGESTOES_GERAL}
        placeholder="Sua pergunta sobre a fé..."
      />
    </div>
  );
}
