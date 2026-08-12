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
import {
  ContinuarLeitura,
  ProgressoPorLivro,
} from "@/components/portal/ContinuarLeitura";
import { CaminhoDoPadroeiro } from "@/components/portal/CaminhoDoPadroeiro";
import { HorariosTarefas } from "@/components/portal/HorariosTarefas";

import { useCelebracao } from "@/components/portal/Celebracao";
import { EscolherSanto } from "@/components/portal/EscolherSanto";
import { useIdentidade, usePainel } from "@/hooks/use-identidade";
import { useAuth } from "@/hooks/use-auth";
import { registrarOracaoFn } from "@/lib/portal.functions";
import {
  metaDaConquista,
  textoRestante,
  type Totais,
} from "@/lib/portal/metas-conquistas";


export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Meu Painel Espiritual — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/painel" },
      { name: "robots", content: "noindex, nofollow" },
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
  const { carregando, esquecer, desconectado } = useIdentidade();
  const { autenticado } = useAuth();
  const painel = usePainel();
  const [trocando, setTrocando] = useState(false);
  const { celebrarNivel } = useCelebracao();

  const nivelAtual = painel.data?.identidade.nivel;
  useEffect(() => {
    if (nivelAtual) celebrarNivel(nivelAtual);
  }, [nivelAtual, celebrarNivel]);


  if (desconectado && !autenticado) {
    return (
      <div className="shell py-block space-y-6">
        <h1 className="font-display text-step-4 text-foreground leading-tight">
          Painel desconectado
        </h1>
        <p className="text-sm text-muted-foreground font-light max-w-[36rem]">
          Você saiu da sua conta, então seu painel espiritual também foi desconectado deste
          navegador. Entre novamente com a mesma conta para recuperar sequência de oração,
          diário, leituras, favoritos e conquistas — tudo continua guardado.
        </p>
        <Link
          to="/auth"
          className="btn-base btn-gold px-6 py-3 label-btn inline-flex w-fit"
        >
          Entrar na minha conta
        </Link>
      </div>
    );
  }

  if (carregando || painel.isPending) {
    return (
      <p className="shell py-block text-sm text-muted-foreground">
        Preparando seu painel…
      </p>
    );
  }


  const dados = painel.data;
  if (!dados || painel.isError) {
    const motivo =
      painel.error instanceof Error ? painel.error.message : "Falha de comunicação com o servidor.";
    return (
      <div className="shell py-block space-y-6">
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar seu painel agora. Vamos tentar sincronizar novamente.
        </p>
        <p className="text-xs text-destructive-text font-light break-words">{motivo}</p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => void painel.refetch()}
            className="min-h-11 px-5 label-btn border border-gold/40 text-foreground/80 hover:text-gold hover:border-gold transition-colors"
          >
            Tentar de novo
          </button>
        </div>

      </div>
    );
  }

  if (!dados.identidade.santoEscolhido && !trocando) {
    return (
      <div className="shell py-block space-y-8">
        <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
          Bem-vindo ao seu painel espiritual
        </h1>
        <EscolherSanto atual={dados.identidade.santoSlug} />
      </div>
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
  const totais: Totais = {
    ...dados.totais,
    streak: dados.identidade.streak,
    melhorStreak: dados.identidade.melhorStreak,
    santoEscolhido: Boolean(dados.identidade.santoEscolhido),
  };

  return (
    <div className="shell w-full py-[var(--space-lg)] space-y-[var(--space-md)]">
      <header className="flex flex-col gap-[var(--space-sm)] md:flex-row md:items-center">
        {dados.identidade.santoImagem ? (
          <img
            src={dados.identidade.santoImagem}
            alt={`Imagem de ${dados.identidade.santoNome}`}
            width={96}
            height={96}
            loading="lazy"
            className="size-24 shrink-0 rounded-full object-cover border border-gold/30"
          />
        ) : (
          <span className="size-24 shrink-0 rounded-full border border-gold/30 grid place-items-center font-display text-3xl text-gold">
            {dados.identidade.santoNome.slice(0, 1)}
          </span>
        )}
        <div className="min-w-0 flex-1 space-y-3">
          <p className="kicker">
            {dados.identidade.santoEscolhido ? "Seu padroeiro escolhido" : "Seu padroeiro sorteado"}
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
            <button
              type="button"
              onClick={() => setTrocando((v) => !v)}
              className="text-gold hover:text-paper transition-colors"
            >
              {trocando ? "Fechar escolha" : "Trocar padroeiro"}
            </button>
          </div>

          <div className="h-1 w-full max-w-[28rem] bg-gold/10">
            <div className="h-full bg-gold transition-all" style={{ width: `${progresso}%` }} />
          </div>
          <p className="label-btn text-muted-foreground">
            {proximo - dados.identidade.xp} XP para o nível {nivel + 1}
          </p>
        </div>
      </header>

      {trocando ? (
        <EscolherSanto
          atual={dados.identidade.santoSlug}
          onEscolhido={() => setTrocando(false)}
          titulo="Trocar seu santo padroeiro"
          descricao="Escolha outro santo para acompanhar seu caminho. Seu progresso, favoritos e anotações são mantidos."
        />
      ) : null}

      {!trocando && dados.identidade.santoSlug ? (
        <CaminhoDoPadroeiro
          slug={dados.identidade.santoSlug}
          nome={dados.identidade.santoNome}
        />
      ) : null}


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
          <div className="flex items-start justify-between gap-4">
            <Rotulo>Versículos guardados</Rotulo>
            <Link
              to="/favoritos"
              className="kicker hover:text-paper transition-colors"
            >
              Ver todos
            </Link>
          </div>
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
                  <p className="kicker">
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
          <div className="flex items-start justify-between gap-4">
            <Rotulo>Suas anotações</Rotulo>
            <Link
              to="/favoritos"
              className="kicker hover:text-paper transition-colors"
            >
              Ver todas
            </Link>
          </div>
          {dados.notas.length === 0 ? (
            <p className="text-sm text-muted-foreground font-light">
              Nenhuma anotação ainda. Você pode anotar reflexões nos capítulos da Bíblia.
            </p>
          ) : (
            <ul className="space-y-4">
              {dados.notas.slice(0, 8).map((n) => (
                <li key={n.id} className="space-y-1">
                  <p className="kicker">
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
          {dados.conquistas.map((c) => {
            const meta = metaDaConquista(c.slug, totais);
            const percentual = meta ? Math.round((meta.atual / Math.max(meta.alvo, 1)) * 100) : 0;
            return (
              <div
                key={c.slug}
                className={`border p-6 transition-premium ${
                  c.desbloqueada
                    ? "border-gold/40 bg-gold/5"
                    : "border-gold/10 bg-card/30 opacity-80"
                }`}
              >
                <p className="kicker mb-2">
                  {c.xp} XP
                </p>
                <h3 className="font-display text-xl text-foreground mb-2">{c.titulo}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {c.descricao}
                </p>

                {meta ? (
                  <div className="mt-4 space-y-2">
                    <div
                      className="h-1 w-full bg-gold/10"
                      role="progressbar"
                      aria-valuenow={percentual}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progresso de ${c.titulo}`}
                    >
                      <div
                        className={`h-full transition-all ${c.desbloqueada ? "bg-gold" : "bg-gold/60"}`}
                        style={{ width: `${c.desbloqueada ? 100 : percentual}%` }}
                      />
                    </div>
                    <p className="label-btn text-muted-foreground">
                      {c.desbloqueada
                        ? "Concluída"
                        : `${meta.atual}/${meta.alvo} — ${textoRestante(meta)}`}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <HorariosTarefas />




      <footer className="border-t border-gold/15 pt-8 flex flex-wrap items-center gap-4">
        <p className="text-xs text-muted-foreground max-w-[36rem] font-light">
          {autenticado
            ? "Seu progresso está vinculado com segurança à sua conta e acompanha você em outros dispositivos."
            : "Seu progresso está salvo apenas neste navegador. Entre em sua conta para protegê-lo e acessá-lo em outros dispositivos."}
        </p>
        {!autenticado ? (
          <button
            type="button"
            onClick={() => {
              esquecer();
              toast.success("Identidade esquecida neste navegador.");
            }}
            className="ml-auto label-btn text-paper/60 hover:text-gold transition-colors"
          >
            Esquecer identidade
          </button>
        ) : null}
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
    <div className="surface-card backdrop-blur-md p-6">
      <Icone className="size-5 text-gold mb-4" aria-hidden="true" />
      <p className="font-display text-3xl text-foreground">{valor}</p>
      <p className="label-btn text-muted-foreground mt-1">{rotulo}</p>
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
  const { celebrarConquistas } = useCelebracao();
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
      celebrarConquistas(res.novasConquistas);
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
          <span className="label-btn text-paper/60">
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
          <span className="label-btn text-paper/60">
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
        <label className="block space-y-2 max-w-[20rem]">
          <span className="label-btn text-paper/60">
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
            className="kicker hover:text-paper transition-colors"
          >
            Ler a liturgia do dia
          </Link>
        </div>
      </form>
    </Painel>
  );
}
