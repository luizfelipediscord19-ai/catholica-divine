import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Flame, NotebookPen, Sparkles, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Painel,
  Rotulo,
  botaoClass,
  inputClass,
} from "@/components/portal/comuns";
import { useIdentidade, usePainel } from "@/hooks/use-identidade";
import { registrarOracaoFn } from "@/lib/portal.functions";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Meu Painel Espiritual — Portal Católico" },
      {
        name: "description",
        content:
          "Acompanhe sua sequência de oração, diário espiritual, capítulos lidos da Bíblia, versículos favoritos, anotações e conquistas — sem cadastro.",
      },
      { property: "og:title", content: "Meu Painel Espiritual" },
      {
        property: "og:description",
        content:
          "Sequência de oração, diário espiritual, leituras da Bíblia e conquistas do seu caminho de fé.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PainelPage,
});

function xpDoNivel(nivel: number) {
  return 50 * (nivel - 1) ** 2;
}

function PainelPage() {
  const { identidade, carregando, esquecer } = useIdentidade();
  const painel = usePainel();

  if (carregando || painel.isPending) {
    return (
      <p className="max-w-5xl mx-auto px-6 py-32 text-sm text-muted-foreground">
        Preparando seu painel…
      </p>
    );
  }

  const dados = painel.data;
  if (!identidade || !dados) {
    return (
      <p className="max-w-5xl mx-auto px-6 py-32 text-sm text-muted-foreground">
        Não foi possível carregar seu painel agora. Recarregue a página.
      </p>
    );
  }

  const nivel = dados.identidade.nivel;
  const base = xpDoNivel(nivel);
  const proximo = xpDoNivel(nivel + 1);
  const progresso = Math.min(
    100,
    Math.round(((dados.identidade.xp - base) / Math.max(proximo - base, 1)) * 100),
  );
  const conquistadas = dados.conquistas.filter((c) => c.desbloqueada).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center gap-8">
        {dados.identidade.santoImagem ? (
          <img
            src={dados.identidade.santoImagem}
            alt={`Imagem de ${dados.identidade.santoNome}`}
            className="size-24 rounded-full object-cover border border-gold/30"
          />
        ) : (
          <span className="size-24 rounded-full border border-gold/30 grid place-items-center font-display text-3xl text-gold">
            {dados.identidade.santoNome.slice(0, 1)}
          </span>
        )}
        <div className="flex-1 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/70">
            Seu padroeiro sorteado
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
            {dados.identidade.apelido ?? dados.identidade.santoNome}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            <span className="text-gold">Nível {nivel}</span>
            <span>{dados.identidade.xp} XP</span>
            <span>Melhor sequência: {dados.identidade.melhorStreak} dias</span>
            {dados.identidade.santoSlug ? (
              <Link
                to="/santos/$slug"
                params={{ slug: dados.identidade.santoSlug }}
                className="text-gold hover:underline"
              >
                Conhecer o santo
              </Link>
            ) : null}
          </div>
          <div className="h-1 w-full max-w-md bg-gold/10">
            <div className="h-full bg-gold transition-all" style={{ width: `${progresso}%` }} />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {proximo - dados.identidade.xp} XP para o nível {nivel + 1}
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Metrica icone={Flame} rotulo="Sequência" valor={`${dados.identidade.streak} dias`} />
        <Metrica icone={BookOpen} rotulo="Capítulos lidos" valor={String(dados.leituras.length)} />
        <Metrica icone={Star} rotulo="Favoritos" valor={String(dados.favoritos.length)} />
        <Metrica
          icone={Trophy}
          rotulo="Conquistas"
          valor={`${conquistadas}/${dados.conquistas.length}`}
        />
      </div>

      <ContinuarLeitura />

      <DiarioHoje
        rezouHoje={dados.rezouHoje}
        inicial={dados.diarioHoje}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <Painel>
          <Rotulo>Progresso na Bíblia</Rotulo>
          <ProgressoPorLivro leituras={dados.leituras} />
        </Painel>

        <Painel>
          <Rotulo>Conquistas recentes</Rotulo>
          <ul className="space-y-3">
            {dados.conquistas
              .filter((c) => c.desbloqueada)
              .slice(0, 6)
              .map((c) => (
                <li key={c.slug} className="text-sm text-foreground/85 font-light">
                  <span className="text-gold">{c.icone ?? "✦"}</span> {c.titulo}
                </li>
              ))}
            {conquistadas === 0 ? (
              <li className="text-sm text-muted-foreground font-light">
                Reze, leia e anote para desbloquear suas primeiras conquistas.
              </li>
            ) : null}
          </ul>
        </Painel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">

        <Painel>
          <Rotulo>Versículos guardados</Rotulo>
          {dados.favoritos.length === 0 ? (
            <p className="text-sm text-muted-foreground font-light">
              Marque versículos com a estrela durante a leitura da{" "}
              <Link to="/biblia" className="text-gold hover:underline">
                Bíblia
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-4">
              {dados.favoritos.slice(0, 8).map((f) => (
                <li key={`${f.livro}-${f.capitulo}-${f.versiculo}`} className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70">
                    {f.livro} {f.capitulo},{f.versiculo}
                  </p>
                  {f.texto ? (
                    <p className="text-sm text-foreground/80 font-light leading-relaxed">
                      {f.texto}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Painel>

        <Painel>
          <Rotulo>Suas anotações</Rotulo>
          {dados.notas.length === 0 ? (
            <p className="text-sm text-muted-foreground font-light">
              Nenhuma anotação ainda. Você pode anotar reflexões nos capítulos da Bíblia.
            </p>
          ) : (
            <ul className="space-y-4">
              {dados.notas.slice(0, 8).map((n) => (
                <li key={n.id} className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70">
                    {n.livro} {n.capitulo}
                    {n.versiculo ? `,${n.versiculo}` : ""}
                  </p>
                  <p className="text-sm text-foreground/80 font-light leading-relaxed">
                    {n.conteudo}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Painel>
      </section>

      <section className="space-y-6">
        <Rotulo>Conquistas</Rotulo>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dados.conquistas.map((c) => (
            <div
              key={c.slug}
              className={`border p-6 transition-premium ${
                c.desbloqueada
                  ? "border-gold/40 bg-gold/5"
                  : "border-gold/10 bg-card/30 opacity-60"
              }`}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70 mb-2">
                {c.xp} XP
              </p>
              <h3 className="font-display text-xl text-foreground mb-2">{c.titulo}</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {c.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gold/15 pt-8 flex flex-wrap items-center gap-4">
        <p className="text-xs text-muted-foreground max-w-xl font-light">
          Seu progresso é anônimo: nenhum e-mail, nenhuma senha. O código da sua identidade fica
          guardado apenas neste navegador — se você limpar os dados do site, ele será perdido.
        </p>
        <button
          type="button"
          onClick={() => {
            esquecer();
            toast.success("Identidade esquecida neste navegador.");
          }}
          className="ml-auto text-[10px] uppercase tracking-[0.25em] text-paper/60 hover:text-gold transition-colors"
        >
          Esquecer identidade
        </button>
      </footer>
    </div>
  );
}

function Metrica({
  icone: Icone,
  rotulo,
  valor,
}: {
  icone: typeof Flame;
  rotulo: string;
  valor: string;
}) {
  return (
    <div className="border border-gold/15 bg-card/40 backdrop-blur-md p-6">
      <Icone className="size-5 text-gold mb-4" aria-hidden="true" />
      <p className="font-display text-3xl text-foreground">{valor}</p>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{rotulo}</p>
    </div>
  );
}

function DiarioHoje({
  rezouHoje,
  inicial,
}: {
  rezouHoje: boolean;
  inicial: { intencao: string | null; reflexao: string | null; minutos: number } | null;
}) {
  const { token } = useIdentidade();
  const queryClient = useQueryClient();
  const [intencao, setIntencao] = useState(inicial?.intencao ?? "");
  const [reflexao, setReflexao] = useState(inicial?.reflexao ?? "");
  const [minutos, setMinutos] = useState(inicial?.minutos ?? 10);

  useEffect(() => {
    setIntencao(inicial?.intencao ?? "");
    setReflexao(inicial?.reflexao ?? "");
    setMinutos(inicial?.minutos ?? 10);
  }, [inicial]);

  const registrar = useMutation({
    mutationFn: () =>
      registrarOracaoFn({
        data: {
          token: token!,
          intencao: intencao.trim() || undefined,
          reflexao: reflexao.trim() || undefined,
          minutos,
        },
      }),
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: ["painel"] });
      void queryClient.invalidateQueries({ queryKey: ["identidade"] });
      toast.success(
        res.jaRezouHoje
          ? "Diário de hoje atualizado."
          : `Oração registrada. Sequência: ${res.streak} dia(s).`,
      );
      if (res.novasConquistas.length > 0) {
        toast.success(`Nova conquista desbloqueada (${res.novasConquistas.length}).`);
      }
    },
    onError: (erro: Error) => toast.error(erro.message || "Não foi possível registrar."),
  });

  return (
    <Painel>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <Rotulo>Diário espiritual de hoje</Rotulo>
          <p className="text-sm text-muted-foreground font-light">
            {rezouHoje
              ? "Você já registrou sua oração hoje — pode editar a intenção e a reflexão."
              : "Registre sua oração para manter a sequência e ganhar XP."}
          </p>
        </div>
        <Sparkles className="size-5 text-gold shrink-0" aria-hidden="true" />
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (token) registrar.mutate();
        }}
      >
        <label className="block space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60">
            Intenção do dia
          </span>
          <input
            value={intencao}
            onChange={(e) => setIntencao(e.target.value)}
            maxLength={500}
            placeholder="Por quem ou por que você reza hoje?"
            className={inputClass}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60">
            Reflexão curta
          </span>
          <textarea
            value={reflexao}
            onChange={(e) => setReflexao(e.target.value)}
            rows={4}
            maxLength={2000}
            placeholder="O que Deus lhe disse hoje na oração ou na leitura?"
            className={inputClass}
          />
        </label>
        <label className="block space-y-2 max-w-xs">
          <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60">
            Tempo de oração (minutos)
          </span>
          <input
            type="number"
            min={0}
            max={600}
            value={minutos}
            onChange={(e) => setMinutos(Number(e.target.value))}
            className={inputClass}
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={!token || registrar.isPending} className={botaoClass}>
            <NotebookPen className="size-3.5" aria-hidden="true" />
            {registrar.isPending ? "Salvando…" : rezouHoje ? "Atualizar diário" : "Já rezei hoje"}
          </button>
          <Link
            to="/liturgia-diaria"
            className="text-[10px] uppercase tracking-[0.25em] text-gold hover:text-paper transition-colors"
          >
            Ler a liturgia do dia
          </Link>
        </div>
      </form>
    </Painel>
  );
}
