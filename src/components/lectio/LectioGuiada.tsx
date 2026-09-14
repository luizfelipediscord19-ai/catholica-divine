import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  Clock3,
  Download,
  Pause,
  Play,
  Printer,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { Botao } from "@/components/ds";

const CHAVE = "portal:lectio-divina:privada:v1";

type EtapaId = "lectio" | "meditatio" | "oratio" | "contemplatio";
type Registro = Record<EtapaId, string>;

const ETAPAS: { id: EtapaId; titulo: string; pergunta: string; instrucao: string }[] = [
  {
    id: "lectio",
    titulo: "Lectio — leitura",
    pergunta: "O que o texto diz em si mesmo?",
    instrucao:
      "Leia devagar, mais de uma vez. Observe pessoas, verbos, repetições e o contexto; evite começar por suas impressões.",
  },
  {
    id: "meditatio",
    titulo: "Meditatio — meditação",
    pergunta: "O que Deus me diz por este texto?",
    instrucao:
      "Confronte a passagem com sua vida à luz da fé da Igreja. Registre uma palavra, um chamado ou uma verdade a acolher.",
  },
  {
    id: "oratio",
    titulo: "Oratio — oração",
    pergunta: "O que respondo a Deus?",
    instrucao:
      "Transforme a Palavra em louvor, súplica, contrição ou ação de graças. Fale com simplicidade e verdade.",
  },
  {
    id: "contemplatio",
    titulo: "Contemplatio — contemplação",
    pergunta: "Como permaneço com Deus e levo a Palavra à vida?",
    instrucao:
      "Silencie. Não procure produzir ideias. Termine escolhendo uma resolução concreta, pequena e possível.",
  },
];

const VAZIO: Registro = { lectio: "", meditatio: "", oratio: "", contemplatio: "" };

export function LectioGuiada() {
  const [registro, setRegistro] = useState<Registro>(VAZIO);
  const [etapa, setEtapa] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE);
      if (salvo) setRegistro({ ...VAZIO, ...(JSON.parse(salvo) as Partial<Registro>) });
    } catch {
      /* dispositivo sem armazenamento disponível */
    }
  }, []);

  useEffect(() => {
    if (!rodando) return;
    const id = window.setInterval(() => setSegundos((valor) => valor + 1), 1000);
    return () => window.clearInterval(id);
  }, [rodando]);

  const salvar = useCallback((novo: Registro) => {
    setRegistro(novo);
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(novo));
    } catch {
      /* privado e local */
    }
  }, []);

  const tempo = useMemo(
    () =>
      `${String(Math.floor(segundos / 60)).padStart(2, "0")}:${String(segundos % 60).padStart(2, "0")}`,
    [segundos],
  );

  const exportarMarkdown = () => {
    const conteudo = [
      "# Minha Lectio Divina",
      `\n_Data: ${new Date().toLocaleDateString("pt-BR")}_`,
      ...ETAPAS.flatMap((item) => [`\n## ${item.titulo}`, registro[item.id] || "—"]),
      "\n---\nRegistro pessoal exportado pelo Portal Católico.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([conteudo], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `lectio-divina-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const limpar = () => {
    if (!window.confirm("Apagar definitivamente suas anotações desta Lectio?")) return;
    salvar(VAZIO);
    setSegundos(0);
    setRodando(false);
  };

  return (
    <div className="mt-10 space-y-8">
      <section className="surface-card p-5 sm:p-7" data-sem-sumario>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="kicker flex items-center gap-2">
              <Clock3 className="size-3.5" /> Cronômetro opcional
            </p>
            <p className="mt-2 font-mono text-3xl tabular-nums text-foreground" aria-live="polite">
              {tempo}
            </p>
          </div>
          <div className="action-tray">
            <Botao
              type="button"
              tamanho="md"
              variante="contorno"
              onClick={() => setRodando((valor) => !valor)}
            >
              {rodando ? <Pause className="size-4" /> : <Play className="size-4" />}
              {rodando ? "Pausar" : "Iniciar"}
            </Botao>
            <Botao
              type="button"
              tamanho="md"
              variante="discreto"
              onClick={() => {
                setRodando(false);
                setSegundos(0);
              }}
            >
              <RotateCcw className="size-4" /> Zerar
            </Botao>
          </div>
        </div>
      </section>

      <nav aria-label="Etapas da Lectio Divina" className="grid gap-2 sm:grid-cols-4 print:hidden">
        {ETAPAS.map((item, indice) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setEtapa(indice)}
            aria-current={etapa === indice ? "step" : undefined}
            className={`min-h-12 border px-3 py-2 text-left text-step--2 transition-premium ${etapa === indice ? "border-gold bg-gold/10 text-gold" : "border-gold/15 text-muted-foreground hover:border-gold/50"}`}
          >
            <span className="mr-2 text-gold/60">0{indice + 1}</span>
            {item.titulo.split(" — ")[0]}
            {registro[item.id].trim() ? (
              <Check className="ml-2 inline size-3.5" aria-label="Preenchida" />
            ) : null}
          </button>
        ))}
      </nav>

      <div className="space-y-7">
        {ETAPAS.map((item, indice) => (
          <section
            key={item.id}
            id={item.id}
            className={`${indice === etapa ? "block" : "hidden print:block"} surface-card scroll-mt-28 p-5 sm:p-8`}
          >
            <p className="num-secao">0{indice + 1}</p>
            <h2 className="title-section mt-2 text-foreground">{item.titulo}</h2>
            <p className="body-sm mt-3 text-muted-foreground">{item.instrucao}</p>
            <label
              htmlFor={`nota-${item.id}`}
              className="mt-6 block text-step--1 font-medium text-foreground"
            >
              {item.pergunta}
            </label>
            <textarea
              id={`nota-${item.id}`}
              value={registro[item.id]}
              onChange={(evento) =>
                salvar({ ...registro, [item.id]: evento.target.value.slice(0, 6000) })
              }
              rows={8}
              placeholder="Escreva somente o que deseja guardar neste aparelho…"
              className="mt-2 w-full resize-y border border-gold/20 bg-background/65 p-4 leading-relaxed text-foreground outline-none transition-premium placeholder:text-muted-foreground/50 focus:border-gold"
            />
            <div className="mt-5 flex justify-between gap-3 print:hidden">
              <Botao
                type="button"
                variante="discreto"
                tamanho="sm"
                disabled={indice === 0}
                onClick={() => setEtapa(indice - 1)}
              >
                Anterior
              </Botao>
              <Botao
                type="button"
                variante="ouro"
                tamanho="sm"
                disabled={indice === ETAPAS.length - 1}
                onClick={() => setEtapa(indice + 1)}
              >
                Próxima etapa
              </Botao>
            </div>
          </section>
        ))}
      </div>

      <aside className="surface-card border-gold/25 p-5 sm:p-7" data-sem-sumario>
        <p className="kicker flex items-center gap-2">
          <ShieldCheck className="size-4" /> Privacidade espiritual
        </p>
        <p className="body-sm mt-3 text-muted-foreground">
          Estas anotações permanecem somente no armazenamento deste aparelho. Não são enviadas à
          Sophia, ao fórum ou ao banco do Portal.
        </p>
        <div className="action-tray mt-5 print:hidden">
          <Botao type="button" tamanho="md" variante="contorno" onClick={exportarMarkdown}>
            <Download className="size-4" /> Baixar Markdown
          </Botao>
          <Botao type="button" tamanho="md" variante="contorno" onClick={() => window.print()}>
            <Printer className="size-4" /> Imprimir ou PDF
          </Botao>
          <Botao type="button" tamanho="md" variante="discreto" onClick={limpar}>
            Apagar anotações
          </Botao>
        </div>
      </aside>
    </div>
  );
}
