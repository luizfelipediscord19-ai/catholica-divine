import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard, Prose, Sources, Pullquote } from "../components/PageShell";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";
import { SophiaChat } from "../components/SophiaChat";
import { Sparkles } from "lucide-react";
import { SUGESTOES_COROINHAS } from "../lib/data/sophia-perguntas";

export const Route = createFileRoute("/coroinhas")({
  head: () => ({
    meta: [
      { title: "Coroinhas — Serviço ao Altar | Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/coroinhas" },
      { name: "description", content: "Formação completa para Coroinhas e Acólitos: espiritualidade, postura, paramentos, vasos sagrados e o ministério do Serviço ao Altar." },
      { property: "og:title", content: "Coroinhas — O Serviço ao Altar" },
      { property: "og:description", content: "Guia de formação para servir ao altar com reverência, conhecimento litúrgico e zelo pela Casa de Deus." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/coroinhas" }],
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
        <Prose>
          <p>
            O Serviço ao Altar — <em>ministerium altaris</em> — é a participação dos fiéis leigos no auxílio ao
            celebrante durante as ações litúrgicas. A Instrução Geral do Missal Romano recorda que
            <em> na celebração todos, ministros e fiéis, devem exercer apenas e integralmente a função que lhes é
            própria</em> (IGMR 91; cf. <em>Sacrosanctum Concilium</em> 28–29). O coroinha não “ajuda por falta de
            gente”: exerce um serviço litúrgico verdadeiro, ainda que não instituído.
          </p>
          <p>
            A tradição vê nos que servem ao altar uma imagem dos anjos que circundam o Trono de Deus
            (Ap 5,11; Is 6,1–3) e do menino Samuel, que <em>servia o Senhor diante de Eli</em> (1Sm 3,1). Por
            isso se exige do coroinha santidade de vida, conhecimento litúrgico e domínio sereno dos gestos:
            a liturgia é ação de Cristo e da Igreja (<em>CIC</em> §§ 1069–1070), não desempenho pessoal.
          </p>

          <Pullquote cite="Concílio Vaticano II — Sacrosanctum Concilium 29">
            Os acólitos, leitores, comentadores e os membros do coro desempenham também um verdadeiro
            ministério litúrgico. Exerçam, por isso, o seu ofício com aquela piedade sincera e ordem que
            convêm a tão grande ministério.
          </Pullquote>

          <h3>Coroinha, acólito e acólito instituído</h3>
          <NotaConfiabilidade nivel="oficial">
            Distinção jurídica estabelecida pelo Magistério recente. Confundir os três termos é o erro mais
            comum nas sacristias.
          </NotaConfiabilidade>
          <ul>
            <li><strong>Coroinha (ministrante)</strong> — leigo, geralmente criança ou adolescente, que serve ao altar sem instituição formal, por designação do pároco (IGMR 100, 187–193).</li>
            <li><strong>Acólito instituído</strong> — ministério laical estável, conferido por rito próprio. São Paulo VI reformou as antigas ordens menores no motu proprio <em>Ministeria quaedam</em> (15.08.1972), mantendo leitorado e acolitado como ministérios leigos.</li>
            <li><strong>Abertura às mulheres</strong> — o Papa Francisco alterou o cân. 230 § 1 do Código de Direito Canônico com o motu proprio <em>Spiritus Domini</em> (10.01.2021): leitorado e acolitado passam a ser conferidos também a mulheres.</li>
            <li><strong>Ministro extraordinário da Comunhão</strong> — função distinta, regida por <em>Immensae caritatis</em> (1973) e <em>Redemptionis Sacramentum</em> (2004, nn. 154–160); não se confunde com o serviço do coroinha.</li>
          </ul>

          <h3>História do serviço ao altar</h3>
          <NotaConfiabilidade nivel="historia">
            Marcos documentados na literatura patrística e canônica.
          </NotaConfiabilidade>
          <ul>
            <li><strong>Século III</strong> — a carta do Papa Cornélio a Fábio de Antioquia (251), citada por Eusébio (<em>História Eclesiástica</em> VI, 43), registra em Roma 42 acólitos entre o clero da cidade: é o primeiro testemunho claro do ofício.</li>
            <li><strong>Século III, Roma</strong> — <strong>São Tarcísio</strong>, acólito mártir venerado por levar a Eucaristia aos presos; o epitáfio do Papa São Dâmaso († 384) conserva sua memória. Padroeiro dos coroinhas.</li>
            <li><strong>Idade Média</strong> — o acolitado consolida-se como a mais alta das ordens menores, etapa do caminho ao sacerdócio.</li>
            <li><strong>1972</strong> — <em>Ministeria quaedam</em> suprime as ordens menores e restaura leitorado e acolitado como ministérios laicais.</li>
            <li><strong>2021</strong> — <em>Spiritus Domini</em> torna esses ministérios acessíveis a homens e mulheres.</li>
          </ul>

          <h3>Funções na celebração</h3>
          <ul>
            <li><strong>Cruciferário</strong> — leva a cruz processional, sempre à frente, entre dois turiferários ou ceroferários (IGMR 188).</li>
            <li><strong>Ceroferários</strong> — levam as velas acesas, em passo igual, uma ao lado da outra.</li>
            <li><strong>Turiferário</strong> — conduz o turíbulo; o naveteiro leva a naveta com o incenso (IGMR 276–277).</li>
            <li><strong>Ministro do livro</strong> — sustenta o Missal junto à cadeira do celebrante, na altura conveniente à leitura.</li>
            <li><strong>Serviço do Ofertório</strong> — apresenta as galhetas, o manustérgio e o lavabo; auxilia na preparação do altar com o corporal, o sanguíneo, a pala e o Missal.</li>
            <li><strong>Toque de campainha</strong> — onde é costume, na epiclese e nas elevações, para atenção dos fiéis (IGMR 150).</li>
          </ul>

          <h3>Posturas e reverências</h3>
          <ul>
            <li><strong>Genuflexão</strong> — joelho direito ao chão, diante do Santíssimo Sacramento reservado ou exposto (IGMR 274).</li>
            <li><strong>Inclinação profunda</strong> — diante do altar, quando o Sacrário não está no presbitério.</li>
            <li><strong>Inclinação de cabeça</strong> — aos nomes das três Pessoas divinas, de Jesus, de Maria e do santo do dia.</li>
            <li><strong>Mãos unidas</strong> — palmas juntas à altura do peito, dedos para cima, polegar direito cruzado sobre o esquerdo.</li>
            <li><strong>Silêncio sagrado</strong> — parte da própria celebração, não simples ausência de ruído (IGMR 45; <em>Sacrosanctum Concilium</em> 30).</li>
          </ul>

          <h3>Cuidado com os objetos sagrados</h3>
          <NotaConfiabilidade nivel="oficial">
            Normas de disciplina litúrgica em vigor, com sanção canônica em caso de profanação.
          </NotaConfiabilidade>
          <ul>
            <li>Os vasos sagrados são feitos de metal nobre ou material digno e devem ser bentos (IGMR 327–334; CDC, cân. 1171).</li>
            <li>Purificação dos vasos compete ao sacerdote, ao diácono ou ao acólito instituído (IGMR 279; <em>Redemptionis Sacramentum</em> 119).</li>
            <li>Fragmentos da Hóstia e gotas do Sangue Precioso exigem atenção extrema; qualquer incidente deve ser comunicado imediatamente ao celebrante (<em>Redemptionis Sacramentum</em> 92, 280).</li>
            <li>A profanação das espécies eucarísticas é delito gravíssimo, com excomunhão latae sententiae reservada à Sé Apostólica (CDC, cân. 1367).</li>
          </ul>
        </Prose>

        <Sources
          items={[
            { label: "Bíblia Sagrada — 1Sm 3,1; Is 6,1–3; Ap 5,11; Sl 141(140),2", ref: "fundamento escriturístico" },
            { label: "Concílio Vaticano II, Sacrosanctum Concilium (1963)", ref: "nn. 28–30" },
            { label: "Instrução Geral do Missal Romano (3ª ed., 2002)", ref: "nn. 45, 91, 100, 150, 187–193, 274–279, 327–334" },
            { label: "Catecismo da Igreja Católica", ref: "§§ 1069–1070, 1140–1144, 1378" },
            { label: "São Paulo VI, Motu proprio Ministeria quaedam (15.08.1972)", ref: "reforma das ordens menores" },
            { label: "Francisco, Motu proprio Spiritus Domini (10.01.2021)", ref: "cân. 230 § 1 — acolitado e leitorado" },
            { label: "Congregação para o Culto Divino, Redemptionis Sacramentum (25.03.2004)", ref: "nn. 92, 119, 154–160, 280" },
            { label: "Código de Direito Canônico (1983)", ref: "cân. 230, 906, 1171, 1367" },
            { label: "Cerimonial dos Bispos (1984)", ref: "reverências e serviço no presbitério" },
            { label: "Eusébio de Cesareia, História Eclesiástica VI, 43", ref: "42 acólitos em Roma, c. 251" },
          ]}
        />
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
        <div className="surface-card p-8 md:p-12 max-w-3xl">
          <p className="font-display italic text-lg md:text-xl text-paper/90 leading-relaxed">
            "Senhor Jesus Cristo, que te dignaste descer ao altar para te entregares por nós,
            faz que eu te sirva hoje com a pureza dos anjos, a reverência dos santos e o amor
            de um filho. Que meus gestos sejam dignos, meu silêncio profundo e meu coração
            inteiramente voltado para Ti. Por intercessão de São Tarcísio, mártir da Eucaristia,
            concede-me a graça de jamais profanar o que é santo. Amém."
          </p>
        </div>
      </Section>

      <Section kicker="Sophia · Modo Coroinhas" title="Consulta com fontes oficiais">
        <div className="max-w-3xl mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="size-5 text-gold mt-1 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Esta é a área dedicada de Sophia para o <strong className="text-gold">Serviço ao Altar</strong>.
              Toda resposta é fundamentada em documentos oficiais da Igreja — Catecismo, Instrução Geral do
              Missal Romano (IGMR), Direito Canônico, Redemptionis Sacramentum, Sacrosanctum Concilium e
              Cerimonial dos Bispos — com a fonte citada em cada resposta.
            </p>
          </div>
        </div>
        <SophiaChat
          mode="coroinhas"
          placeholder="Pergunte sobre rubricas, paramentos, vasos sagrados, posturas..."
          suggestions={SUGESTOES_COROINHAS}
        />
      </Section>
    </div>
  );
}
