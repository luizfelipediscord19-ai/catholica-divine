import { useEffect, useMemo, useState } from "react";
import { Eraser, LockKeyhole } from "lucide-react";
import { Botao } from "@/components/ds";

type BlocoExame = { mandamento: string; titulo: string; perguntas: string[] };
type EstadoVida = "geral" | "casamento" | "pais" | "jovens" | "consagrados";

const CHAVE = "portal:exame-consciencia:privado:v1";
const CAPITAIS = ["Soberba", "Avareza", "Luxúria", "Inveja", "Gula", "Ira", "Preguiça espiritual"];
const ESTADOS: Record<EstadoVida, string[]> = {
  geral: [],
  casamento: ["Procurei o bem e a santificação do meu cônjuge?", "Fui fiel, paciente e verdadeiro no matrimônio?"],
  pais: ["Eduquei os filhos com presença, afeto, limites e testemunho de fé?", "Pedi perdão quando errei com minha família?"],
  jovens: ["Usei estudos, amizades, afetos e internet de modo responsável?", "Cedi à pressão dos outros contra minha consciência?"],
  consagrados: ["Fui fiel à oração, aos votos e ao serviço que recebi?", "Busquei comunhão e obediência segundo minha regra de vida?"],
};

export function ExamePrivado({ blocos }: { blocos: BlocoExame[] }) {
  const [marcados, setMarcados] = useState<string[]>([]);
  const [estado, setEstado] = useState<EstadoVida>("geral");
  const [pronto, setPronto] = useState(false);
  const perguntas = useMemo(
    () => [
      ...blocos.flatMap((bloco) => bloco.perguntas.map((pergunta) => ({ grupo: `${bloco.mandamento} mandamento`, pergunta }))),
      ...CAPITAIS.map((pecado) => ({ grupo: "Sete pecados capitais", pergunta: `Deixei o vício da ${pecado.toLowerCase()} governar escolhas concretas?` })),
      ...ESTADOS[estado].map((pergunta) => ({ grupo: "Estado de vida", pergunta })),
    ],
    [blocos, estado],
  );

  useEffect(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? "{}") as { marcados?: string[]; estado?: EstadoVida };
      setMarcados(Array.isArray(salvo.marcados) ? salvo.marcados : []);
      if (salvo.estado && Object.hasOwn(ESTADOS, salvo.estado)) setEstado(salvo.estado);
    } catch {
      setMarcados([]);
    }
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify({ marcados, estado }));
    } catch {
      // O exame continua utilizável mesmo quando o armazenamento local está indisponível.
    }
  }, [marcados, estado, pronto]);

  const alternar = (pergunta: string) =>
    setMarcados((atuais) =>
      atuais.includes(pergunta) ? atuais.filter((item) => item !== pergunta) : [...atuais, pergunta],
    );

  const limpar = () => {
    setMarcados([]);
    try { localStorage.removeItem(CHAVE); } catch { /* armazenamento indisponível */ }
  };

  return (
    <div className="mt-md space-y-5">
      <div className="flex flex-col gap-4 border border-gold/20 bg-card/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
          <div>
            <h3 className="title-sub">Exame privado neste aparelho</h3>
            <p className="body-sm mt-1">Suas marcações não são enviadas, sincronizadas, analisadas nem vistas pelo Portal.</p>
          </div>
        </div>
        <Botao variante="discreto" tamanho="md" onClick={limpar} disabled={marcados.length === 0} className="gap-2">
          <Eraser className="size-4" aria-hidden="true" /> Limpar tudo
        </Botao>
      </div>

      <label className="block max-w-md">
        <span className="kicker mb-2 block">Estado de vida</span>
        <select
          value={estado}
          onChange={(event) => setEstado(event.target.value as EstadoVida)}
          className="min-h-11 w-full border border-gold/25 bg-background px-3 text-sm text-foreground"
        >
          <option value="geral">Exame geral</option>
          <option value="casamento">Vida matrimonial</option>
          <option value="pais">Pais e responsáveis</option>
          <option value="jovens">Jovens e estudantes</option>
          <option value="consagrados">Vida consagrada e ministério</option>
        </select>
      </label>

      <div className="space-y-3">
        {perguntas.map(({ grupo, pergunta }) => {
          const id = `exame-${Math.abs(hash(pergunta))}`;
          return (
            <label key={pergunta} htmlFor={id} className="flex cursor-pointer items-start gap-3 border border-gold/15 bg-card/30 p-4 transition-colors hover:border-gold/35">
              <input
                id={id}
                type="checkbox"
                checked={marcados.includes(pergunta)}
                onChange={() => alternar(pergunta)}
                className="mt-1 size-4 shrink-0 accent-gold"
              />
              <span className="min-w-0">
                <span className="kicker block text-gold/65">{grupo}</span>
                <span className="body-sm mt-1 block text-foreground/85">{pergunta}</span>
              </span>
            </label>
          );
        })}
      </div>
      <p className="text-step--2 text-muted-foreground">
        {marcados.length} ponto{marcados.length === 1 ? "" : "s"} marcado{marcados.length === 1 ? "" : "s"}. Use este roteiro apenas como auxílio de memória; leve os pecados à Confissão com simplicidade, sem escrúpulo.
      </p>
    </div>
  );
}

function hash(valor: string) {
  let total = 0;
  for (let i = 0; i < valor.length; i += 1) total = (total * 31 + valor.charCodeAt(i)) | 0;
  return total;
}
