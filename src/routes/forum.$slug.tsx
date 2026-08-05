import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Heart, Lock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import {
  AutorSelo,
  Painel,
  Rotulo,
  autorDe,
  botaoClass,
  botaoGhostClass,
  formatarData,
  inputClass,
} from "@/components/portal/comuns";
import { DenunciarBotao, RegrasForum, SeloRevisao } from "@/components/portal/ForumModeracao";
import { useAuth } from "@/hooks/use-auth";
import { useIdentidade } from "@/hooks/use-identidade";
import { formatarSalvo, useRascunho } from "@/hooks/use-rascunho";
import { obterTopicoFn, reagirFn, responderTopicoFn } from "@/lib/portal.functions";


export const Route = createFileRoute("/forum/$slug")({
  head: () => ({
    meta: [
      { title: "Conversa no fórum — Agora Ecclesiae" },
      {
        name: "description",
        content:
          "Leia e responda a esta conversa do fórum católico Agora Ecclesiae: fé, doutrina, Escritura, oração e apologética.",
      },
      { property: "og:title", content: "Conversa no fórum — Agora Ecclesiae" },
      {
        property: "og:description",
        content: "Participe da conversa no fórum católico do Portal Católico.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TopicoPage,
});

function TopicoPage() {
  const { slug } = Route.useParams();
  const { token } = useIdentidade();
  const { autenticado } = useAuth();
  const queryClient = useQueryClient();
  const rascunho = useRascunho(`forum-resposta-${slug}`, { corpo: "" });
  const corpo = rascunho.valor.corpo;

  const topico = useQuery({
    queryKey: ["forum", "topico", slug, token ?? "anon"],
    queryFn: () => obterTopicoFn({ data: { slug, token } }),
  });

  const responder = useMutation({
    mutationFn: () => responderTopicoFn({ data: { token, topicoSlug: slug, corpo } }),
    onSuccess: (res) => {
      rascunho.limpar();
      void queryClient.invalidateQueries({ queryKey: ["forum"] });
      void queryClient.invalidateQueries({ queryKey: ["painel"] });
      toast.success(
        res.status === "aprovado"
          ? "Resposta publicada. +15 XP"
          : "Resposta enviada para revisão. +15 XP",
      );
    },
    onError: (erro: Error) => toast.error(erro.message || "Não foi possível responder."),
  });


  const reagir = useMutation({
    mutationFn: (alvo: { topicoId?: string; respostaId?: string }) =>
      reagirFn({ data: { token, ...alvo } }),
    onSuccess: (res) => toast.success(res.reagiu ? "Amém registrado." : "Amém removido."),
  });

  if (topico.isPending) {
    return <p className="max-w-3xl mx-auto px-6 py-24 text-sm text-muted-foreground">Carregando…</p>;
  }

  if (!topico.data) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-6">
        <h1 className="font-display text-4xl text-foreground">Conversa não encontrada</h1>
        <Link to="/forum" className="text-gold text-sm hover:underline">
          Voltar ao fórum
        </Link>
      </div>
    );
  }

  const { topico: t, respostas } = topico.data;
  const secaoNome = Array.isArray(t.forum_secoes)
    ? t.forum_secoes[0]?.nome
    : (t.forum_secoes as { nome?: string } | null)?.nome;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-10">
      <Link
        to="/forum"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold hover:text-paper transition-colors"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" /> Agora Ecclesiae
      </Link>

      <header className="space-y-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
          {secaoNome ?? "Fórum"} · {formatarData(t.created_at)}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
          {t.titulo}
        </h1>
        <AutorSelo autor={autorDe(t as never)} />
      </header>

      <SeloRevisao status={t.status} />

      <div className="border-y border-gold/15 py-8 text-[16px] leading-[1.8] text-foreground/85 font-light whitespace-pre-wrap">
        {t.corpo}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={!autenticado || reagir.isPending}
          onClick={() => reagir.mutate({ topicoId: t.id })}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-paper/70 hover:text-gold transition-colors disabled:opacity-50"
        >
          <Heart className="size-3.5" aria-hidden="true" /> Amém
        </button>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <MessageSquare className="size-3.5" aria-hidden="true" /> {respostas.length} respostas
        </span>
        <DenunciarBotao topicoId={t.id} />
      </div>


      <section className="space-y-6">
        <Rotulo>Respostas</Rotulo>
        {respostas.length === 0 ? (
          <p className="text-sm text-muted-foreground font-light">
            Ainda sem respostas. Seja o primeiro a contribuir.
          </p>
        ) : (
          <ul className="space-y-5">
            {respostas.map((r) => (
              <li key={r.id}>
                <Painel className="space-y-4">
                  <AutorSelo autor={autorDe(r as never)} data={r.created_at} />
                  <SeloRevisao status={r.status} />
                  <p className="text-[15px] leading-[1.8] text-foreground/85 font-light whitespace-pre-wrap">
                    {r.corpo}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      disabled={!autenticado || reagir.isPending}
                      onClick={() => reagir.mutate({ respostaId: r.id })}
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-paper/60 hover:text-gold transition-colors disabled:opacity-50"
                    >
                      <Heart className="size-3" aria-hidden="true" /> Amém
                    </button>
                    <DenunciarBotao respostaId={r.id} compacto />
                  </div>
                </Painel>

              </li>
            ))}
          </ul>
        )}
      </section>

      {t.trancado ? (
        <Painel>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="size-4 text-gold" aria-hidden="true" /> Este tópico está trancado para
            novas respostas.
          </p>
        </Painel>
      ) : (
        <Painel>
          <Rotulo>Sua resposta</Rotulo>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (autenticado && corpo.trim().length >= 2) responder.mutate();
            }}
          >
            <label className="block">
              <span className="sr-only">Resposta</span>
              <textarea
                value={corpo}
                onChange={(e) => rascunho.atualizar({ corpo: e.target.value })}
                rows={5}
                maxLength={8000}
                placeholder="Responda com caridade, fidelidade à doutrina e, se possível, com referências."
                className={inputClass}
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {!autenticado ? (
                <Link to="/auth" className={botaoClass}>
                  Entrar para responder
                </Link>
              ) : null}
              <button
                type="submit"
                disabled={!autenticado || corpo.trim().length < 2 || responder.isPending}
                className={botaoClass}
              >
                {responder.isPending ? "Publicando…" : "Responder"}
              </button>
              <button type="button" onClick={rascunho.limpar} className={botaoGhostClass}>
                Descartar rascunho
              </button>
              {rascunho.salvoEm ? (
                <span className="text-xs text-muted-foreground/70">
                  Rascunho salvo às {formatarSalvo(rascunho.salvoEm)}
                </span>
              ) : null}
            </div>
          </form>
        </Painel>
      )}

      <RegrasForum />
    </div>
  );

}
