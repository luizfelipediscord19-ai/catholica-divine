import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import { SophiaChat } from "../components/SophiaChat";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/coroinhas")({
  head: () => ({
    meta: [
      { title: "Coroinhas — Serviço ao Altar | Portal Católico" },
      { name: "description", content: "Formação completa para Coroinhas e Acólitos: espiritualidade, postura, paramentos, vasos sagrados e o ministério do Serviço ao Altar." },
      { property: "og:title", content: "Coroinhas — O Serviço ao Altar" },
      { property: "og:description", content: "Guia de formação para servir ao altar com reverência, conhecimento litúrgico e zelo pela Casa de Deus." },
    ],
  }),
  component: Page,
});

const PARAMENTOS = [
  { title: "Batina", body: "Veste talar preta (ou vermelha em certas solenidades) usada sob a sobrepeliz. Símbolo da renúncia ao mundo e do serviço sagrado." },
  { title: "Sobrepeliz (Cotta)", body: "Veste branca de linho usada sobre a batina. Recorda a alvura batismal e a pureza exigida de quem se aproxima do altar." },
  { title: "Alva", body: "Túnica branca longa, símbolo da pureza batismal. Usada por todos os ministros sagrados." },
  { title: "Cíngulo", body: "Cordão que cinge a alva. Sinal da castidade e do domínio das paixões." },
  { title: "Estola e Casula", body: "Próprias do sacerdote celebrante: a estola é sinal da autoridade, e a casula é o paramento próprio da Santa Missa." },
];

const VASOS = [
  { title: "Cálice", body: "Recipiente sagrado que contém o Sangue Precioso de Nosso Senhor após a Consagração." },
  { title: "Patena", body: "Pequeno prato dourado sobre o qual repousa a Hóstia Sagrada — Corpo de Cristo." },
  { title: "Cibório", body: "Vaso com tampa que guarda as partículas consagradas distribuídas na Comunhão e reservadas no Sacrário." },
  { title: "Galhetas", body: "Pequenas jarras contendo água e vinho, apresentadas ao celebrante no Ofertório." },
  { title: "Turíbulo e Naveta", body: "O turíbulo queima o incenso; a naveta o contém. Símbolo da oração que sobe a Deus (Sl 140,2)." },
  { title: "Manustérgio e Sanguíneo", body: "Linhos sagrados: o manustérgio enxuga as mãos do sacerdote; o sanguíneo purifica o cálice." },
];

const REGRAS = [
  { title: "Pontualidade", body: "Chega com pelo menos 20 minutos de antecedência. O coroinha é o primeiro a chegar e o último a sair da sacristia." },
  { title: "Silêncio Sagrado", body: "Na sacristia e no presbitério, mantém silêncio absoluto. Estamos em diálogo com Deus, não com os homens." },
  { title: "Mãos Juntas", body: "Ao caminhar e estar parado, mantém as mãos unidas à altura do peito, dedos esticados, polegar direito sobre o esquerdo em cruz." },
  { title: "Reverência", body: "Genuflexão simples diante do Sacrário; profunda inclinação diante do altar quando o Sacrário não está no presbitério." },
  { title: "Movimentos Lentos", body: "Anda com passos curtos, dignos, sem pressa. Nunca corras na Casa de Deus." },
  { title: "Vida de Graça", body: "Confessa-te regularmente. Quem serve ao Santíssimo deve viver em estado de graça santificante." },
];

const ESPIRITUALIDADE = [
  { title: "Imitar os Anjos", body: "O coroinha é imagem viva dos anjos que servem ao Trono de Deus (Ap 7,11). A tua postura deve refletir essa dignidade celeste." },
  { title: "Cuidar da Casa do Senhor", body: "Como Samuel no Templo (1Sm 3), zela pelos vasos, paramentos e alfaias com amor de filho." },
  { title: "Oração antes e depois", body: "Antes da Missa, recolhe-te diante do Sacrário. Depois, faz a ação de graças por teres servido a Cristo." },
  { title: "Devoção a São Tarcísio", body: "Padroeiro dos coroinhas — mártir que morreu defendendo a Eucaristia. Invoca-o todos os dias." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Ministerium Altaris"
        title="Coroinhas — O Serviço ao Altar"
        intro="Servir ao altar é participar do ministério dos anjos. Não é função decorativa, mas vocação sagrada de quem cuida das coisas santas com reverência, ciência e amor."
      />

      <Section kicker="Fundamento" title="O que é o Serviço ao Altar">
        <div className="prose prose-invert max-w-3xl text-muted-foreground leading-relaxed">
          <p>
            O Serviço ao Altar — ou <em>Ministerium Altaris</em> — é a participação direta dos fiéis leigos no auxílio
            ao celebrante durante as ações litúrgicas. Os <strong>Coroinhas</strong> (chamados também de Acólitos
            instituídos quando recebem o ministério formal) representam, simbolicamente, os anjos que circundam o Trono
            de Deus, conforme a visão do Apocalipse: <em>"Vi muitos anjos ao redor do trono... e eram milhares de milhares"</em> (Ap 5,11).
          </p>
          <p className="mt-4">
            Servir ao altar não é mero ofício utilitário. É <strong>ministério sagrado</strong> que exige santidade de
            vida, conhecimento litúrgico e domínio técnico dos gestos, objetos e tempos da celebração. O coroinha é
            chamado a uma vida de oração, pureza e zelo pela Casa de Deus — pois <em>"é santa a Casa do Senhor"</em>
            (Sl 92,5).
          </p>
        </div>
      </Section>

      <Section kicker="Disciplina" title="Regras de Ouro do Coroinha">
        <CardGrid cols={3}>
          {REGRAS.map((r) => (
            <ContentCard key={r.title} title={r.title}>{r.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Indumentária Sagrada" title="Os Paramentos">
        <CardGrid cols={3}>
          {PARAMENTOS.map((p) => (
            <ContentCard key={p.title} title={p.title}>{p.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Sacra Vasa" title="Vasos e Objetos Sagrados">
        <CardGrid cols={3}>
          {VASOS.map((v) => (
            <ContentCard key={v.title} title={v.title}>{v.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Espiritualidade" title="A Alma do Coroinha">
        <CardGrid cols={2}>
          {ESPIRITUALIDADE.map((e) => (
            <ContentCard key={e.title} title={e.title}>{e.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Oração" title="Oração do Coroinha antes da Missa">
        <div className="border border-gold/20 bg-card/40 p-8 md:p-12 max-w-3xl">
          <p className="font-display italic text-lg md:text-xl text-paper/90 leading-relaxed">
            "Senhor Jesus Cristo, que te dignaste descer ao altar para te entregares por nós,
            faz que eu te sirva hoje com a pureza dos anjos, a reverência dos santos e o amor
            de um filho. Que meus gestos sejam dignos, meu silêncio profundo e meu coração
            inteiramente voltado para Ti. Por intercessão de São Tarcísio, mártir da Eucaristia,
            concede-me a graça de jamais profanar o que é santo. Amém."
          </p>
        </div>
      </Section>
    </div>
  );
}
