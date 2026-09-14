import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, GraduationCap } from "lucide-react";

import { Botao } from "@/components/ds";
import { lerToken } from "@/hooks/use-identidade";
import { corrigirQuizFn } from "@/lib/portal.functions";
import type { QuizLicao as Quiz } from "@/lib/data/trilhas/tipos";

export function QuizLicao({ quiz, trilha, licao }: { quiz: Quiz; trilha: string; licao: string }) {
  const corrigir = useServerFn(corrigirQuizFn);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [resultado, setResultado] = useState<{ nota: number; aprovado: boolean } | null>(null);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar() {
    if (respostas.length !== quiz.questoes.length || respostas.some((r) => r === undefined)) {
      setErro("Responda a todas as questões antes de corrigir.");
      return;
    }
    setEnviando(true);
    setErro("");
    try {
      const retorno = await corrigir({
        data: { token: lerToken(), trilha, licao, respostas },
      });
      setResultado(retorno);
      window.dispatchEvent(new Event("portal:trilhas"));
    } catch {
      setErro("Entre na sua conta para corrigir o quiz e salvar o progresso.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="mt-12 border border-gold/25 bg-gold/5 p-6" aria-labelledby="quiz-titulo">
      <p className="kicker">Avaliação formativa</p>
      <h2
        id="quiz-titulo"
        className="mt-2 flex items-center gap-2 font-display text-2xl text-paper"
      >
        <GraduationCap className="size-5 text-gold" aria-hidden="true" /> Quiz da lição
      </h2>
      <p className="mt-2 text-sm text-paper/70">
        A correção acontece no servidor. Nota mínima: {quiz.notaMinima}%.
      </p>
      <ol className="mt-7 space-y-8">
        {quiz.questoes.map((questao, indice) => (
          <li key={questao.pergunta}>
            <fieldset>
              <legend className="font-semibold text-paper">
                {indice + 1}. {questao.pergunta}
              </legend>
              <div className="mt-3 grid gap-2">
                {questao.alternativas.map((alternativa, alternativaIndice) => (
                  <label
                    key={alternativa.texto}
                    className="flex cursor-pointer gap-3 border border-gold/15 p-3 text-sm text-paper/80 hover:border-gold/40"
                  >
                    <input
                      type="radio"
                      name={`${quiz.slug}-${indice}`}
                      checked={respostas[indice] === alternativaIndice}
                      onChange={() =>
                        setRespostas((atual) => {
                          const proxima = [...atual];
                          proxima[indice] = alternativaIndice;
                          return proxima;
                        })
                      }
                    />
                    <span>{alternativa.texto}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      {erro && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {erro}
        </p>
      )}
      {resultado && (
        <p className="mt-4 flex items-center gap-2 text-paper" role="status">
          <CheckCircle2
            className={`size-5 ${resultado.aprovado ? "text-emerald-400" : "text-gold"}`}
            aria-hidden="true"
          />
          Nota {resultado.nota}% —{" "}
          {resultado.aprovado ? "aprovado e progresso salvo" : "revise a lição e tente novamente"}.
        </p>
      )}
      <Botao className="mt-6" variante="ouro" onClick={enviar} disabled={enviando}>
        {enviando ? "Corrigindo…" : "Corrigir respostas"}
      </Botao>
    </section>
  );
}
