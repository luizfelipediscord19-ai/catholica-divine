import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { RegistroConsentimento } from "../components/portal/RegistroConsentimento";

const BASE = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Portal Católico" },
      {
        name: "description",
        content:
          "Quais dados o Portal Católico guarda, por quanto tempo, com quem são compartilhados e como pedir exclusão: identidade anônima, conta de e-mail, progresso espiritual, notificações e conversas com a Sophia.",
      },
      { property: "og:title", content: "Política de Privacidade do Portal Católico" },
      {
        property: "og:description",
        content:
          "Transparência sobre dados guardados, base legal, tempo de retenção e como exercer seus direitos (LGPD).",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE}/privacidade` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/privacidade` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Política de Privacidade — Portal Católico",
          url: `${BASE}/privacidade`,
          description:
            "Dados coletados, finalidade, retenção e direitos do usuário no Portal Católico.",
          publisher: { "@type": "Organization", name: "Portal Católico", url: BASE },
        }),
      },
    ],
  }),
  component: PrivacidadePage,
});

const SECOES: { titulo: string; itens: string[] }[] = [
  {
    titulo: "1. O que guardamos",
    itens: [
      "Identidade de leitura: ao usar recursos pessoais (favoritos, diário, progresso), o portal cria um identificador anônimo guardado no seu navegador. Ele não contém nome, telefone nem localização.",
      "Conta opcional: se você criar conta para participar do fórum, guardamos e-mail, senha em formato irreversível (hash) e a data de criação.",
      "Progresso espiritual: leituras concluídas, sequência de oração, anotações, favoritos, conquistas e experiência (XP), vinculados à identidade ou à conta.",
      "Fórum: apelido exibido, tópicos e respostas que você publica — conteúdo público por natureza.",
      "Notificações: se você autorizar, guardamos a assinatura técnica do navegador (endpoint e chaves) para enviar lembretes. Não temos acesso ao seu número nem a outros aplicativos.",
      "Conversas com a Sophia: a pergunta é enviada ao provedor de modelo para gerar a resposta e usada para aplicar limites de uso. Não montamos perfil publicitário com ela.",
    ],
  },
  {
    titulo: "2. O que NÃO fazemos",
    itens: [
      "Não vendemos, alugamos nem cedemos dados pessoais a terceiros.",
      "Não usamos rastreadores publicitários, remarketing ou perfis comportamentais para anúncios.",
      "Não pedimos dados sensíveis. Nunca escreva no diário, no fórum ou à Sophia informações que você trataria em confissão sacramental — o sigilo sacramental existe apenas no sacramento, com um sacerdote.",
    ],
  },
  {
    titulo: "3. Por que guardamos (finalidade e base legal)",
    itens: [
      "Execução do serviço: sem os registros de progresso não é possível devolver seus favoritos, sua sequência e suas anotações.",
      "Consentimento: notificações e criação de conta só ocorrem por ação sua, e podem ser revogadas a qualquer momento.",
      "Legítimo interesse em segurança: registros técnicos mínimos para conter abuso, spam e uso excessivo dos recursos de inteligência artificial.",
    ],
  },
  {
    titulo: "4. Com quem compartilhamos",
    itens: [
      "Infraestrutura de hospedagem e banco de dados, para executar o site e guardar seus registros.",
      "Provedor do modelo de linguagem, apenas o texto necessário para responder à sua pergunta e transcrever o áudio que você grava.",
      "Autoridades, exclusivamente quando houver obrigação legal.",
    ],
  },
  {
    titulo: "5. Por quanto tempo",
    itens: [
      "Progresso e anotações: enquanto a identidade ou a conta existir.",
      "Publicações do fórum: permanecem enquanto o tópico existir, para preservar o sentido das conversas.",
      "Assinatura de notificações: até você desativar os avisos ou desinstalar o aplicativo.",
      "Registros de limite de uso da Sophia: janelas curtas, descartadas depois do período de contagem.",
    ],
  },
  {
    titulo: "6. Seus direitos",
    itens: [
      "Ver e corrigir: o painel espiritual e a página de favoritos mostram tudo o que está guardado sobre você.",
      "Apagar: o painel permite esquecer a identidade deste navegador; para excluir a conta e todos os registros vinculados, basta pedir pelo canal de contato.",
      "Portabilidade e revogação de consentimento: pedidos são atendidos pelo mesmo canal, sem custo.",
    ],
  },
  {
    titulo: "7. Segurança",
    itens: [
      "Acesso aos dados é restrito por políticas no banco: cada identidade só alcança os próprios registros.",
      "O site é servido apenas por conexão criptografada, com cabeçalhos de segurança e política de conteúdo restritiva.",
      "Senhas nunca são armazenadas em texto legível e não podem ser recuperadas — apenas redefinidas por e-mail.",
    ],
  },
  {
    titulo: "8. Crianças e adolescentes",
    itens: [
      "O conteúdo é apropriado para catequese, mas a criação de conta e a participação no fórum devem acontecer com acompanhamento dos responsáveis.",
    ],
  },
];

function PrivacidadePage() {
  return (
    <div className="shell py-block space-y-10">
      <header className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 kicker hover:text-gold transition-colors"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Início
        </Link>
        <p className="kicker">Institucional</p>
        <h1 className="title-page text-foreground leading-tight">Política de Privacidade</h1>
        <p className="text-sm md:text-base text-muted-foreground font-light max-w-[42rem] leading-relaxed">
          O Portal Católico é um serviço gratuito de formação. Guardamos o mínimo necessário para
          devolver seu progresso espiritual e manter o fórum saudável — nada além disso.
        </p>
      </header>

      <div className="space-y-8">
        {SECOES.map((s) => (
          <section key={s.titulo} className="space-y-3">
            <h2 className="font-display text-step-2 text-foreground leading-snug">{s.titulo}</h2>
            <ul className="space-y-2">
              {s.itens.map((i) => (
                <li
                  key={i}
                  className="text-sm md:text-base text-foreground/85 font-light leading-relaxed border-l border-gold/25 pl-4"
                >
                  {i}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <RegistroConsentimento />

      <section className="space-y-3">
        <h2 className="font-display text-step-2 text-foreground leading-snug">9. Contato</h2>
        <p className="text-sm md:text-base text-foreground/85 font-light leading-relaxed max-w-[42rem]">
          Dúvidas, correções de conteúdo e pedidos sobre seus dados podem ser enviados pelo fórum,
          na categoria de avisos, ou pelo canal indicado na página{" "}
          <Link to="/sobre" className="text-gold hover:underline">
            Sobre o Portal
          </Link>
          . Também vale ler os{" "}
          <Link to="/termos" className="text-gold hover:underline">
            Termos de Uso
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
