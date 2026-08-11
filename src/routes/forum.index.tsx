import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Pin, Lock, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { avisarErroDeConta } from "@/lib/auth/aviso-sessao";

import { PageHero } from "@/components/PageShell";
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
import { RegrasForum, SeloRevisao } from "@/components/portal/ForumModeracao";
import { useAuth } from "@/hooks/use-auth";
import { garantirTokenAgora, useIdentidade } from "@/hooks/use-identidade";
import { formatarSalvo, useRascunho } from "@/hooks/use-rascunho";
import { SECAO_PADRAO, SECOES_FORUM } from "@/lib/data/forum-secoes";
import { criarTopicoFn, listarSecoesFn, listarTopicosFn } from "@/lib/portal.functions";


export const Route = createFileRoute("/forum/")({
  head: () => ({
    meta: [
      { title: "Agora Ecclesiae — Fórum Católico do Portal" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/forum" },
      {
        name: "description",
        content:
          "Fórum católico para perguntas de fé, doutrina, Escritura, vida de oração e apologética. Participe com sua identidade anônima e um santo padroeiro sorteado.",
      },
      { property: "og:title", content: "Agora Ecclesiae — Fórum Católico" },
      {
        property: "og:description",
        content:
          "Perguntas e conversas sobre fé, Escritura, oração, santos e apologética — sem cadastro, com identidade anônima.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/forum" }],
  }),
  component: ForumPage,
});

function ForumPage() {
  const [secao, setSecao] = useState<string | undefined>(undefined);
  const [abrirForm, setAbrirForm] = useState(false);
  const { token } = useIdentidade();

  const secoesQuery = useQuery({
    queryKey: ["forum", "secoes"],
    queryFn: () => listarSecoesFn(),
    staleTime: 10 * 60 * 1000,
  });
  // Seções fixas como base: a lista nunca aparece vazia.
  const secoes =
    (secoesQuery.data ?? []).length > 0 ? secoesQuery.data! : SECOES_FORUM.map((s) => ({ ...s, id: s.slug }));

  const topicos = useQuery({
    queryKey: ["forum", "topicos", secao ?? "todos", token ?? "anon"],
    queryFn: () => listarTopicosFn({ data: { secaoSlug: secao, token } }),

  });

  return (
    <div>
      <PageHero
        eyebrow="Agora Ecclesiae"
        title={
          <>
            O fórum <span className="italic font-light text-gold">da comunidade</span>
          </>
        }
        intro="Um pátio para perguntar, aprender e testemunhar. Para escrever, entre com e-mail e senha; sua identidade pública continua sendo um santo padroeiro sorteado."
      />

      <div className="shell py-block grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSecao(undefined)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] border transition-premium ${
                secao === undefined
                  ? "border-gold text-gold"
                  : "border-gold/15 text-paper/60 hover:text-paper"
              }`}
            >
              Todos
            </button>
            {secoes.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSecao(s.slug)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] border transition-premium ${
                  secao === s.slug
                    ? "border-gold text-gold"
                    : "border-gold/15 text-paper/60 hover:text-paper"
                }`}
              >
                {s.nome}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAbrirForm((v) => !v)}
              className={`${botaoClass} ml-auto`}
            >
              <Plus className="size-3.5" aria-hidden="true" /> Nova conversa
            </button>
          </div>

          {abrirForm ? (
            <NovoTopico
              secoes={secoes.map((s) => ({ slug: s.slug, nome: s.nome }))}
              secaoInicial={secao}
              onPronto={() => setAbrirForm(false)}
            />
          ) : null}

          {topicos.isPending ? (
            <p className="text-sm text-muted-foreground">Carregando conversas…</p>
          ) : (topicos.data ?? []).length === 0 ? (
            <Painel>
              <p className="text-sm text-muted-foreground">
                Nenhuma conversa nesta seção ainda. Seja o primeiro a abrir um tema.
              </p>
            </Painel>
          ) : (
            <ul className="space-y-4">
              {(topicos.data ?? []).map((t) => {
                const autor = autorDe(t as never);
                const secaoNome = Array.isArray(t.forum_secoes)
                  ? t.forum_secoes[0]?.nome
                  : (t.forum_secoes as { nome?: string } | null)?.nome;
                return (
                  <li key={t.id}>
                    <Link
                      to="/forum/$slug"
                      params={{ slug: t.slug }}
                      className="block border border-gold/15 hover:border-gold/40 bg-card/40 backdrop-blur-md p-6 transition-premium hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3 mb-3 kicker">
                        {t.fixado ? <Pin className="size-3" aria-hidden="true" /> : null}
                        {t.trancado ? <Lock className="size-3" aria-hidden="true" /> : null}
                        <span>{secaoNome ?? "Fórum"}</span>
                        <span className="text-muted-foreground/60">
                          · {formatarData(t.ultima_atividade)}
                        </span>
                        <SeloRevisao status={t.status} />
                      </div>

                      <h2 className="font-display text-2xl text-foreground mb-3 leading-tight">
                        {t.titulo}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-5 font-light">
                        {t.corpo}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <AutorSelo autor={autor} />
                        <span className="flex items-center gap-2 text-xs text-paper/60">
                          <MessageSquare className="size-3.5" aria-hidden="true" />
                          {t.respostas_count}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <aside className="space-y-6">
          <Painel>
            <Rotulo>Seções</Rotulo>
            <ul className="space-y-4">
              {secoes.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setSecao(s.slug)}
                    className="text-left w-full group"
                  >
                    <p className="text-sm text-foreground group-hover:text-gold transition-colors">
                      {s.nome}
                    </p>
                    {s.descricao ? (
                      <p className="text-xs text-muted-foreground font-light">{s.descricao}</p>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </Painel>
          <RegrasForum />
          <Painel>
            <Rotulo>Como funciona</Rotulo>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              Ler é livre. Para escrever, crie uma conta com e-mail e senha — o portal sorteia um
              santo padroeiro que será seu nome público, e o e-mail nunca aparece para ninguém. Todo
              conteúdo passa por revisão antes de aparecer para os outros. Cada
              participação rende XP e conquistas no seu{" "}
              <Link to="/painel" className="text-gold hover:underline">
                painel espiritual
              </Link>
              .
            </p>
          </Painel>
        </aside>

      </div>
    </div>
  );
}

function NovoTopico({
  secoes,
  secaoInicial,
  onPronto,
}: {
  secoes: { slug: string; nome: string }[];
  secaoInicial?: string;
  onPronto: () => void;
}) {
  const { identidade } = useIdentidade();
  const { autenticado } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lista = secoes.length > 0 ? secoes : SECOES_FORUM;

  // Rascunho automático: o texto sobrevive a fechar a página.
  const rascunho = useRascunho("forum-nova-conversa", {
    secaoSlug: secaoInicial ?? lista[0]?.slug ?? SECAO_PADRAO,
    titulo: "",
    corpo: "",
  });
  const { secaoSlug, titulo, corpo } = rascunho.valor;
  const setSecaoSlug = (valor: string) => rascunho.atualizar({ secaoSlug: valor });

  const criar = useMutation({
    mutationFn: async () => {
      // A identidade anônima é criada na hora, se ainda não existir.
      const token = await garantirTokenAgora();
      return criarTopicoFn({ data: { token, secaoSlug, titulo, corpo } });
    },
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: ["forum"] });
      void queryClient.invalidateQueries({ queryKey: ["painel"] });
      void queryClient.invalidateQueries({ queryKey: ["identidade"] });
      rascunho.limpar();
      toast.success(
        res.status === "aprovado"
          ? "Conversa publicada. +30 XP"
          : "Conversa enviada para revisão. Ela aparece para todos após aprovação. +30 XP",
      );
      onPronto();
      void navigate({ to: "/forum/$slug", params: { slug: res.slug } });
    },
    onError: (erro: Error) =>
      avisarErroDeConta(
        erro,
        (modo) => void navigate({ to: "/auth", search: modo ? { modo } : undefined }),
        "Não foi possível publicar.",
      ),

  });

  const valido = autenticado && titulo.trim().length >= 5 && corpo.trim().length >= 10;
  const motivo = !autenticado
    ? "Entre com e-mail e senha para publicar no fórum."
    : titulo.trim().length < 5
      ? "O título precisa de pelo menos 5 caracteres."
      : corpo.trim().length < 10
        ? "A mensagem precisa de pelo menos 10 caracteres."
        : null;


  return (
    <Painel>
      <Rotulo>Nova conversa</Rotulo>
      {!autenticado ? (
        <div
          role="status"
          className="mb-5 border border-gold/25 bg-gold/5 p-4 text-xs leading-relaxed text-muted-foreground"
        >
          <p className="text-gold mb-2">Para publicar é preciso ter conta.</p>
          <p>
            A leitura do fórum é pública e livre. Escrever exige entrar com e-mail e senha — o seu
            e-mail nunca aparece para ninguém. Pode escrever agora: o rascunho fica guardado neste
            navegador enquanto você cria a conta.
          </p>
          <span className="mt-3 flex flex-wrap items-center gap-3">
            <Link to="/auth" search={{ modo: "entrar" }} className={botaoGhostClass}>
              Entrar
            </Link>
            <Link to="/auth" search={{ modo: "criar" }} className={botaoGhostClass}>
              Criar conta
            </Link>
          </span>
        </div>
      ) : null}
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (valido) criar.mutate();
        }}
      >
        <fieldset className="space-y-3">
          <legend className="text-[11px] uppercase tracking-[0.16em] text-paper/60 mb-2">
            Seção
          </legend>
          <div className="flex flex-wrap gap-2">
            {lista.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSecaoSlug(s.slug)}
                aria-pressed={secaoSlug === s.slug}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] border transition-premium ${
                  secaoSlug === s.slug
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gold/15 text-paper/60 hover:text-paper hover:border-gold/40"
                }`}
              >
                {s.nome}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block space-y-2">
          <span className="text-[11px] uppercase tracking-[0.16em] text-paper/60">Título</span>
          <input
            value={titulo}
            onChange={(e) => rascunho.atualizar({ titulo: e.target.value })}
            placeholder="Título da sua pergunta ou tema"
            maxLength={140}
            className={inputClass}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[11px] uppercase tracking-[0.16em] text-paper/60">Mensagem</span>
          <textarea
            value={corpo}
            onChange={(e) => rascunho.atualizar({ corpo: e.target.value })}
            rows={6}
            maxLength={8000}
            placeholder="Escreva com caridade e clareza. Cite a Escritura ou o Catecismo quando puder."
            className={inputClass}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={!valido || criar.isPending} className={botaoClass}>
            {criar.isPending ? "Publicando…" : "Publicar"}
          </button>
          <button type="button" onClick={onPronto} className={botaoGhostClass}>
            Cancelar
          </button>
          <button type="button" onClick={rascunho.limpar} className={botaoGhostClass}>
            Descartar rascunho
          </button>
          {identidade ? (
            <span className="text-xs text-muted-foreground">
              como <span className="text-gold">{identidade.apelido ?? identidade.santoNome}</span>
            </span>
          ) : null}
          {rascunho.salvoEm ? (
            <span className="text-xs text-muted-foreground/70">
              Rascunho salvo às {formatarSalvo(rascunho.salvoEm)}
            </span>
          ) : null}
          {motivo ? <span className="text-xs text-muted-foreground/80">{motivo}</span> : null}
          {!autenticado ? (
            <span className="flex flex-wrap items-center gap-3">
              <Link to="/auth" search={{ modo: "entrar" }} className={botaoGhostClass}>
                Entrar
              </Link>
              <Link to="/auth" search={{ modo: "criar" }} className={botaoGhostClass}>
                Criar conta
              </Link>
              <Link
                to="/auth"
                search={{ modo: "recuperar" }}
                className="text-xs text-muted-foreground underline decoration-gold/40 underline-offset-4 hover:text-gold"
              >
                Esqueci a senha
              </Link>
            </span>
          ) : null}

        </div>
        {rascunho.restaurado ? (
          <p className="text-xs text-gold/80">
            Recuperamos o rascunho que você havia começado neste navegador.
          </p>
        ) : null}

      </form>
    </Painel>
  );
}
