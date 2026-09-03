import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, Copy, Send, MessagesSquare } from "lucide-react";
import claustro from "@/assets/claustro.jpg";

import { Botao, BotaoLink } from "@/components/ds";
import { PageHero, Section } from "@/components/PageShell";
import { Painel, Rotulo, botaoClass, botaoGhostClass, inputClass } from "@/components/portal/comuns";
import { keywordsPara } from "@/lib/seo/palavras-chave";

const URL = "https://portalcatolico.vercel.app/contato";

/** Endereço de contato do Portal. Troque aqui se o e-mail mudar. */
const EMAIL_CONTATO = "portalcatolico2026@outlook.com";

const esquema = z.object({
  nome: z.string().trim().min(2, "Diga como podemos te chamar.").max(80, "Nome muito longo."),
  email: z.string().trim().email("E-mail inválido.").max(180),
  assunto: z.enum(["duvida", "sugestao", "critica", "correcao"]),
  mensagem: z
    .string()
    .trim()
    .min(20, "Escreva ao menos 20 caracteres.")
    .max(2000, "Máximo de 2000 caracteres."),
});

const ASSUNTOS: { valor: z.infer<typeof esquema>["assunto"]; nome: string }[] = [
  { valor: "duvida", nome: "Dúvida de fé ou doutrina" },
  { valor: "sugestao", nome: "Sugestão de conteúdo" },
  { valor: "critica", nome: "Crítica ao Portal" },
  { valor: "correcao", nome: "Correção de erro" },
];

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e Sugestões — Portal Católico" },
      {
        name: "description",
        content:
          "Envie dúvidas de fé, sugestões de conteúdo, críticas ou correções ao Portal Católico. Respondemos com fontes do Magistério e da Escritura.",
      },
      { name: "keywords", content: keywordsPara(["marca"]) },
      { property: "og:title", content: "Contato e Sugestões — Portal Católico" },
      {
        property: "og:description",
        content:
          "Fale com a equipe do Portal Católico: dúvidas, sugestões de conteúdo, críticas e correções editoriais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState<z.infer<typeof esquema>["assunto"]>("sugestao");
  const [mensagem, setMensagem] = useState("");

  function validar() {
    const r = esquema.safeParse({ nome, email, assunto, mensagem });
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Revise os campos.");
      return null;
    }
    return r.data;
  }

  function textoDe(d: z.infer<typeof esquema>) {
    const rotulo = ASSUNTOS.find((a) => a.valor === d.assunto)?.nome ?? d.assunto;
    return `Assunto: ${rotulo}\nNome: ${d.nome}\nE-mail: ${d.email}\n\n${d.mensagem}`;
  }

  function enviar() {
    const d = validar();
    if (!d) return;
    const rotulo = ASSUNTOS.find((a) => a.valor === d.assunto)?.nome ?? "Contato";
    const href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(
      `[Portal Católico] ${rotulo}`,
    )}&body=${encodeURIComponent(textoDe(d))}`;
    window.location.href = href;
    toast.success("Abrindo seu aplicativo de e-mail com a mensagem pronta.");
  }

  async function copiar() {
    const d = validar();
    if (!d) return;
    try {
      await navigator.clipboard.writeText(textoDe(d));
      toast.success("Mensagem copiada. Cole no e-mail ou no fórum.");
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto manualmente.");
    }
  }

  return (
    <div>
      <PageHero
        eyebrow="Fale com o Portal"
        title={
          <>
            Contato <span className="italic font-light text-gold">e sugestões</span>
          </>
        }
        intro="Dúvidas de fé, sugestões de conteúdo, críticas e correções editoriais são bem-vindas. Se encontrou um erro doutrinal ou histórico, avise: revisamos com as fontes primárias do Magistério."
        image={claustro}
      />

      <div className="shell grid gap-10 py-block lg:grid-cols-[1fr_300px]">
        <section aria-labelledby="sugestoes" className="space-y-6">
          <div>
            <p className="kicker mb-2xs">Sugestões e críticas</p>
            <h2 id="sugestoes" className="title-section mb-sm">
              Escreva sua mensagem
            </h2>
            <p className="measure body-sm">
              Preencha os campos e envie por e-mail com um clique — ou copie o texto e publique no
              fórum, onde a comunidade também pode responder.
            </p>
          </div>

          <Painel className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="kicker">Seu nome</span>
                <input
                  className={inputClass}
                  value={nome}
                  maxLength={80}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como podemos te chamar"
                />
              </label>
              <label className="block space-y-2">
                <span className="kicker">Seu e-mail</span>
                <input
                  className={inputClass}
                  type="email"
                  value={email}
                  maxLength={180}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="para podermos responder"
                />
              </label>
            </div>

            <div className="space-y-2">
              <span className="kicker">Assunto</span>
              <div className="flex flex-wrap gap-2">
                {ASSUNTOS.map((a) => (
                  <Botao
                    key={a.valor}
                    tamanho="sm"
                    variante="discreto"
                    onClick={() => setAssunto(a.valor)}
                    aria-pressed={assunto === a.valor}
                    className={assunto === a.valor ? "border-gold text-gold" : "border-gold/15 text-paper/60 hover:text-paper"}
                  >
                    {a.nome}
                  </Botao>
                ))}
              </div>
            </div>

            <label className="block space-y-2">
              <span className="kicker">Mensagem</span>
              <textarea
                className={`${inputClass} min-h-40`}
                value={mensagem}
                maxLength={2000}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Conte sua dúvida, sugestão ou crítica com o máximo de detalhe possível."
              />
              <span className="body-meta">{mensagem.trim().length}/2000</span>
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <Botao onClick={enviar}>
                <Send className="size-3.5" aria-hidden="true" /> Enviar por e-mail
              </Botao>
              <Botao variante="contorno" onClick={copiar}>
                <Copy className="size-3.5" aria-hidden="true" /> Copiar mensagem
              </Botao>
            </div>
            <p className="body-meta">
              Não guardamos sua mensagem em nossos servidores: o envio acontece pelo seu próprio
              aplicativo de e-mail.
            </p>
          </Painel>
        </section>

        <aside className="space-y-6">
          <Painel>
            <Rotulo>E-mail</Rotulo>
            <a
              href={`mailto:${EMAIL_CONTATO}`}
              className="inline-flex items-center gap-2 text-sm text-paper/80 underline decoration-gold/40 underline-offset-4 hover:text-gold"
            >
              <Mail className="size-3.5" aria-hidden="true" /> {EMAIL_CONTATO}
            </a>
          </Painel>

          <Painel>
            <Rotulo>Prefere perguntar em comunidade?</Rotulo>
            <p className="mb-4 body-sm">
              No fórum Agora Ecclesiae sua pergunta fica visível e outros fiéis podem responder.
            </p>
            <BotaoLink para="/forum" variante="contorno" tamanho="md">
              <MessagesSquare className="size-3.5" aria-hidden="true" /> Ir ao fórum
            </BotaoLink>
          </Painel>

          <Painel>
            <Rotulo>Correções editoriais</Rotulo>
            <p className="body-sm">
              Toda correção é conferida nas fontes primárias. Veja nossa{" "}
              <Link
                to="/fontes"
                className="underline decoration-gold/40 underline-offset-4 hover:text-gold"
              >
                metodologia e fontes
              </Link>
              .
            </p>
          </Painel>

          <Painel>
            <Rotulo>Testemunhos</Rotulo>
            <p className="body-sm">
              Recebeu uma graça? Partilhe em{" "}
              <Link
                to="/testemunhos"
                className="underline decoration-gold/40 underline-offset-4 hover:text-gold"
              >
                Testemunhos de fé
              </Link>
              .
            </p>
          </Painel>
        </aside>
      </div>
    </div>
  );
}
