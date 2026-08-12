import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const BASE = "https://portalcatolico.vercel.app";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Portal Católico" },
      {
        name: "description",
        content:
          "Regras de uso do Portal Católico: natureza catequética do conteúdo, limites da assistente Sophia, conduta no fórum, direitos autorais das traduções e responsabilidade editorial.",
      },
      { property: "og:title", content: "Termos de Uso do Portal Católico" },
      {
        property: "og:description",
        content:
          "Condições de uso, conduta no fórum, limites da inteligência artificial e política de conteúdo e direitos autorais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE}/termos` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/termos` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Termos de Uso — Portal Católico",
          url: `${BASE}/termos`,
          description:
            "Condições de uso do Portal Católico, conduta no fórum e limites da assistente de inteligência artificial.",
          publisher: { "@type": "Organization", name: "Portal Católico", url: BASE },
        }),
      },
    ],
  }),
  component: TermosPage,
});

const SECOES: { titulo: string; itens: string[] }[] = [
  {
    titulo: "1. Natureza do serviço",
    itens: [
      "O Portal Católico é uma obra leiga de formação e catequese digital, gratuita, que reúne Escritura, Catecismo, Magistério, hagiografia e orações aprovadas.",
      "O portal não é órgão oficial da Santa Sé, de diocese, paróquia ou instituto religioso, nem fala em nome deles.",
      "Nada aqui substitui os sacramentos, a Santa Missa, a confissão, a direção espiritual pessoal ou o discernimento do seu pároco e bispo.",
    ],
  },
  {
    titulo: "2. A assistente Sophia",
    itens: [
      "A Sophia é um recurso de estudo baseado em modelo de linguagem, restrito a temas de fé católica. Ela pode errar, simplificar ou omitir; sempre confira as fontes citadas.",
      "As respostas não são pronunciamento doutrinal nem parecer canônico. Para casos concretos de consciência, matrimônio, nulidade, sacramentos ou moral pessoal, procure um sacerdote.",
      "O uso é limitado por cotas para manter o serviço gratuito e disponível. Tentativas de burlar limites, automatizar chamadas ou extrair instruções do sistema podem levar ao bloqueio.",
      "Não use a Sophia para emergências. Em risco de vida ou sofrimento grave, procure imediatamente ajuda profissional e presencial.",
    ],
  },
  {
    titulo: "3. Conduta no fórum",
    itens: [
      "Escreva com caridade: o fórum é espaço de comunhão, não de disputa. Ataques pessoais, ironia hostil e julgamento do estado de alma dos outros não são tolerados.",
      "É proibido difundir heresia apresentada como doutrina, cisma, ocultismo, superstição, proselitismo contra a fé católica, discurso de ódio, conteúdo obsceno, spam ou propaganda comercial.",
      "Não publique dados pessoais seus ou de terceiros, nem relatos que identifiquem pessoas em situações delicadas.",
      "Você é responsável pelo que publica. A moderação pode editar, ocultar ou remover conteúdo e suspender contas que descumpram estas regras.",
    ],
  },
  {
    titulo: "4. Conta e segurança",
    itens: [
      "A conta é pessoal: mantenha a senha em sigilo e avise-nos se suspeitar de acesso indevido.",
      "É vedado criar contas para se passar por clérigo, religioso ou autoridade eclesiástica.",
      "Você pode pedir a exclusão da conta a qualquer momento; publicações no fórum podem ser mantidas de forma anônima para preservar o sentido das conversas.",
    ],
  },
  {
    titulo: "5. Conteúdo e direitos autorais",
    itens: [
      "Os textos bíblicos usados são de domínio público, identificados por versão. Traduções protegidas por direitos autorais não são reproduzidas no portal.",
      "Citações do Catecismo e de documentos pontifícios seguem o texto oficial, com indicação de parágrafo ou número para verificação.",
      "As imagens de santos são obras de domínio público ou de licença livre, com crédito à origem.",
      "Os textos redacionais do portal podem ser copiados e distribuídos para fins catequéticos e sem fins lucrativos, desde que citada a fonte e sem alteração do sentido doutrinal.",
      "Encontrou uso indevido de material seu? Avise-nos e a remoção ou o crédito correto será providenciado.",
    ],
  },
  {
    titulo: "6. Disponibilidade e limitações",
    itens: [
      "O serviço é oferecido no estado em que se encontra, sem garantia de disponibilidade contínua. Recursos podem mudar, e o modo offline guarda apenas parte do conteúdo já visitado.",
      "Erros de conteúdo são corrigidos assim que verificados; a responsabilidade do portal se limita à correção do material publicado.",
    ],
  },
  {
    titulo: "7. Alterações destes termos",
    itens: [
      "Mudanças relevantes passam a valer a partir da publicação nesta página, e o uso continuado do portal indica concordância.",
    ],
  },
];

function TermosPage() {
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
        <h1 className="title-page text-foreground leading-tight">Termos de Uso</h1>
        <p className="text-sm md:text-base text-muted-foreground font-light max-w-[42rem] leading-relaxed">
          Ao usar o Portal Católico você concorda com as condições abaixo, escritas para proteger a
          fidelidade do conteúdo e a caridade entre os leitores.
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

      <section className="space-y-3">
        <h2 className="font-display text-step-2 text-foreground leading-snug">8. Contato</h2>
        <p className="text-sm md:text-base text-foreground/85 font-light leading-relaxed max-w-[42rem]">
          Correções doutrinais, pedidos de remoção e dúvidas sobre estes termos: veja os canais em{" "}
          <Link to="/sobre" className="text-gold hover:underline">
            Sobre o Portal
          </Link>{" "}
          e a{" "}
          <Link to="/privacidade" className="text-gold hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
