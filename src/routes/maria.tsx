import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CardGrid, ContentCard, Prose, Pullquote } from "../components/PageShell";
import { ReadingMode, FnRef } from "../components/ReadingMode";
import { Termo } from "../components/Termo";
import maria from "../assets/maria.jpg";

export const Route = createFileRoute("/maria")({
  head: () => ({
    meta: [
      { title: "Maria, Mãe de Deus — Mariologia católica completa" },
      { name: "description", content: "Mariologia católica: quatro dogmas marianos, títulos, aparições aprovadas, devoções e o lugar de Maria na economia da salvação, com fontes magisteriais oficiais." },
      { property: "og:title", content: "Maria, Mãe de Deus" },
      { property: "og:description", content: "Dogmas marianos, aparições aprovadas e devoções segundo o Magistério." },
    ],
  }),
  component: Page,
});

const TOC = [
  { id: "introducao", label: "Maria na economia da salvação" },
  { id: "dogmas", label: "Os quatro dogmas marianos" },
  { id: "theotokos", label: "Maternidade Divina (431)" },
  { id: "virgindade", label: "Virgindade Perpétua (649)" },
  { id: "imaculada", label: "Imaculada Conceição (1854)" },
  { id: "assuncao", label: "Assunção (1950)" },
  { id: "titulos", label: "Títulos marianos" },
  { id: "mediacao", label: "Mediação e cooperação" },
  { id: "aparicoes", label: "Aparições aprovadas" },
  { id: "devocoes", label: "Devoções marianas" },
  { id: "notas", label: "Notas e fontes" },
];

const FOOTNOTES = [
  { id: "efeso", label: "Concílio de Éfeso (431), Anátemas de Cirilo de Alexandria", ref: "DH 250–264 — definição de Theotókos" },
  { id: "latrao", label: "Concílio de Latrão I (649), Cân. 3", ref: "DH 503 — virgindade perpétua de Maria" },
  { id: "ineffabilis", label: "Pio IX, Bula Ineffabilis Deus (08.12.1854)", ref: "DH 2803 — definição da Imaculada Conceição" },
  { id: "munificentissimus", label: "Pio XII, Constituição Apostólica Munificentissimus Deus (01.11.1950)", ref: "DH 3903 — definição da Assunção" },
  { id: "lg8", label: "Concílio Vaticano II, Lumen Gentium (1964), cap. VIII", ref: "nn. 52–69 — “Bem-aventurada Virgem Maria, Mãe de Deus, no mistério de Cristo e da Igreja”" },
  { id: "marialis", label: "Paulo VI, Exortação Apostólica Marialis Cultus (02.02.1974)", ref: "sobre o reto culto à Virgem" },
  { id: "redmater", label: "São João Paulo II, Encíclica Redemptoris Mater (25.03.1987)", ref: "Maria na vida da Igreja peregrina" },
  { id: "rosarium", label: "São João Paulo II, Carta Apostólica Rosarium Virginis Mariae (16.10.2002)", ref: "instituição dos Mistérios Luminosos" },
  { id: "cic", label: "Catecismo da Igreja Católica", ref: "§§ 484–511 (Encarnação); 963–975 (Maternidade espiritual); 484–507; 2673–2682 (oração mariana)" },
  { id: "cdf-aparicoes", label: "Congregação para a Doutrina da Fé, Normæ Sacrae Congregationis pro Doctrina Fidei de modo procedendi in diudicandis praesumptis apparitionibus ac revelationibus (25.02.1978)", ref: "publicadas em 2011; substituídas pelas Normas de 17.05.2024 (Dicastério para a Doutrina da Fé)" },
];

const DOGMAS_CARDS = [
  { title: "Maternidade Divina (Theotókos)", year: "Éfeso, 431", body: "Maria é verdadeiramente Mãe de Deus, pois gerou segundo a carne o Verbo eterno do Pai." },
  { title: "Virgindade Perpétua", year: "Latrão I, 649", body: "Antes, durante e depois do parto, Maria permaneceu sempre Virgem (ante partum, in partu, post partum)." },
  { title: "Imaculada Conceição", year: "Pio IX, 1854", body: "Por singular privilégio, preservada de todo pecado original desde o primeiro instante de sua concepção." },
  { title: "Assunção", year: "Pio XII, 1950", body: "Terminado o curso de sua vida terrena, foi assunta de corpo e alma à glória celeste." },
];

const APARICOES = [
  { local: "Guadalupe (México)", ano: "1531", body: "À São Juan Diego: a Virgem morena, imagem milagrosa na tilma. Reconhecida pelos Papas; coroada por Pio X (1910)." },
  { local: "Rue du Bac (Paris)", ano: "1830", body: "A Santa Catarina Labouré: a Medalha Milagrosa, antecipando o dogma da Imaculada." },
  { local: "Lourdes (França)", ano: "1858", body: "A Santa Bernadette: ‘Eu sou a Imaculada Conceição.’ Reconhecida pelo bispo de Tarbes em 1862." },
  { local: "Fátima (Portugal)", ano: "1917", body: "Aos três pastorinhos: oração, penitência e consagração ao Imaculado Coração. Aprovada pelo bispo de Leiria em 1930." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Beata Maria Virgo"
        title="Maria, Mãe de Deus"
        intro="Filha do Pai, Mãe do Filho, Esposa do Espírito Santo. A primeira discípula, modelo da Igreja, caminho seguro a Cristo."
        image={maria}
      />

      <ReadingMode title="Maria, Mãe de Deus" toc={TOC} footnotes={FOOTNOTES}>
        <Prose>
          <section id="introducao" className="scroll-mt-24">
            <h3>Maria na economia da salvação</h3>
            <p>
              A mariologia católica não é um tratado autônomo, mas um capítulo da cristologia e da eclesiologia.
              O Concílio Vaticano II quis evidenciá-lo colocando toda a doutrina sobre a Virgem no
              <em> capítulo VIII de Lumen Gentium</em>, intitulado <em>“A Bem-aventurada Virgem Maria, Mãe de Deus,
              no mistério de Cristo e da Igreja”</em><FnRef n="lg8" />. A função de Maria <em>nasce e tira a sua
              eficácia da plenitude dos méritos de Cristo, apoia-se neles, depende inteiramente deles, e deles
              haure toda a sua virtude</em> (<em>LG</em> 60).
            </p>

            <Pullquote cite="Lumen Gentium 53 — Concílio Vaticano II">
              Maria é verdadeiramente Mãe dos membros de Cristo, porque cooperou com a caridade para que
              nascessem na Igreja os fiéis, que são membros daquela Cabeça.
            </Pullquote>
          </section>

          <section id="dogmas" className="scroll-mt-24">
            <h3>Os quatro dogmas marianos</h3>
            <p>
              A Igreja Católica define solenemente quatro verdades sobre a Virgem Maria, que devem ser cridas
              com fé divina e católica (<em>de fide divina et catholica</em>): a Maternidade Divina, a Virgindade
              Perpétua, a Imaculada Conceição e a Assunção.
            </p>
          </section>

          <section id="theotokos" className="scroll-mt-24">
            <h4>I. Maternidade Divina — Theotókos (Éfeso, 431)</h4>
            <p>
              Contra Nestório, que distinguia em Cristo duas pessoas (uma humana, outra divina) e queria chamar
              Maria apenas <em>Christotókos</em> (Mãe de Cristo), o Concílio de Éfeso, sob a presidência de São
              Cirilo de Alexandria, definiu que Maria é verdadeiramente <strong><Termo termo="theotokos">Theotókos</Termo></strong> (<em>Mãe de
              Deus</em>), pois gerou segundo a carne o Verbo eterno feito carne<FnRef n="efeso" />. O Catecismo
              recolhe: <em>O que ela concebeu como homem do Espírito Santo, esse mesmo é verdadeiramente seu
              Filho segundo a carne. É o Filho do Pai eterno na natureza divina, e o Filho de Maria na natureza
              humana, mas é propriamente Filho de Deus em ambas as naturezas</em> (<em>CIC</em> § 495).
            </p>
          </section>

          <section id="virgindade" className="scroll-mt-24">
            <h4>II. Virgindade Perpétua (Latrão I, 649)</h4>
            <p>
              A Igreja confessa que Maria foi e permaneceu Virgem <em>antes, durante e depois do parto</em>
              (<em>ante partum, in partu, post partum</em>). O dogma foi solenemente definido no Sínodo de Latrão
              de 649 sob o Papa São Martinho I<FnRef n="latrao" />, confirmando uma fé já atestada por Santo
              Inácio, São Justino, Santo Ireneu e os Concílios de Constantinopla II (553) e III (680–681). O
              Catecismo trata do tema em <em>CIC</em> §§ 496–507<FnRef n="cic" />, explicando que os “irmãos de
              Jesus” mencionados pelos Evangelhos são parentes próximos, segundo o uso semítico.
            </p>
          </section>

          <section id="imaculada" className="scroll-mt-24">
            <h4>III. Imaculada Conceição (Pio IX, 1854)</h4>
            <p>
              Pelo Papa <strong>Pio IX</strong>, na Bula <em>Ineffabilis Deus</em>, de 8 de dezembro de 1854,
              foi definido que <em>a beatíssima Virgem Maria, no primeiro instante da sua concepção, por
              singular graça e privilégio de Deus onipotente, em vista dos méritos de Cristo Jesus Salvador do
              gênero humano, foi preservada imune de toda mancha do pecado original</em><FnRef n="ineffabilis" />.
              É preservação <em>per modum redemptionis</em>: Maria foi salva por Cristo, antecipadamente
              (<em>CIC</em> §§ 490–493).
            </p>
          </section>

          <section id="assuncao" className="scroll-mt-24">
            <h4>IV. Assunção corporal (Pio XII, 1950)</h4>
            <p>
              Pelo Papa <strong>Pio XII</strong>, na Constituição Apostólica <em>Munificentissimus Deus</em>, de
              1.º de novembro de 1950, foi definido que <em>a Imaculada Mãe de Deus, sempre Virgem Maria,
              terminado o curso da sua vida terrena, foi assunta em corpo e alma à glória celeste</em>
              <FnRef n="munificentissimus" />. A definição é eco final do mistério pascal: a primeira redimida
              já participa, em alma e corpo, da ressurreição do Filho (<em>LG</em> 59; <em>CIC</em> §§ 966–967).
            </p>
          </section>

          <section id="titulos" className="scroll-mt-24">
            <h3>Títulos marianos</h3>
            <p>
              A liturgia e o magistério atribuem a Maria, entre muitos, os seguintes títulos: <em>Mãe da Igreja</em>
              (Paulo VI, 1964; memória obrigatória instituída por Francisco em 2018), <em>Mediadora de todas as
              graças</em>, <em>Auxílio dos cristãos</em>, <em>Causa da nossa alegria</em>, <em>Rainha do Céu</em>,
              <em> Mãe da Misericórdia</em>. Todos esses títulos, ensina <em>Lumen Gentium</em> 62,
              <em> nada acrescentam nem subtraem à dignidade e eficácia de Cristo, único Mediador</em>.
            </p>
          </section>

          <section id="mediacao" className="scroll-mt-24">
            <h3>Mediação e cooperação maternal</h3>
            <p>
              Maria coopera de modo singular na obra da Redenção pela obediência, fé, esperança e ardente
              caridade (<em>LG</em> 61). Sua cooperação não compete com a única mediação de Cristo, mas é
              <em> participação</em> dela (<em>LG</em> 62). É o que Paulo VI desenvolveu em <em>Marialis Cultus</em>
              <FnRef n="marialis" /> e São João Paulo II em <em>Redemptoris Mater</em><FnRef n="redmater" />.
            </p>
          </section>
        </Prose>

        <section id="aparicoes" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-2xl text-foreground mb-3">Aparições aprovadas pela Igreja</h3>
          <p className="text-sm text-muted-foreground max-w-3xl mb-6 leading-relaxed">
            Diferentemente da Revelação pública (encerrada com a morte do último Apóstolo, <em>DV</em> 4), as
            <em> revelações privadas</em> não pertencem ao depósito da fé. Quando aprovadas pelo Magistério,
            podem auxiliar a vivê-lo, segundo as <em>Normas</em> do Dicastério para a Doutrina da Fé<FnRef n="cdf-aparicoes" />.
          </p>
          <CardGrid cols={2}>
            {APARICOES.map((a) => (
              <ContentCard key={a.local} title={a.local} subtitle={a.ano}>{a.body}</ContentCard>
            ))}
          </CardGrid>
        </section>

        <section id="devocoes" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-2xl text-foreground mb-3">Devoções marianas recomendadas</h3>
          <CardGrid cols={3}>
            <ContentCard title="Santo Rosário" subtitle="Compêndio do Evangelho">
              Quinze mistérios tradicionais (gozosos, dolorosos, gloriosos); São João Paulo II acrescentou os
              luminosos em <em>Rosarium Virginis Mariae</em> (2002)<FnRef n="rosarium" />.
            </ContentCard>
            <ContentCard title="Angelus / Regina Cæli" subtitle="Oração tríplice diária">
              Recitado às 6h, 12h e 18h; substituído pelo <em>Regina Cæli</em> no tempo pascal.
            </ContentCard>
            <ContentCard title="Consagração mariana" subtitle="São Luís Maria Grignion de Montfort">
              <em>Tratado da Verdadeira Devoção</em>; renovada e proposta por São João Paulo II (lema
              <em> Totus Tuus</em>).
            </ContentCard>
            <ContentCard title="Escapulário do Carmo" subtitle="Aparecimento a São Simão Stock (1251)">
              Sinal sacramental da pertença a Nossa Senhora; festa em 16 de julho.
            </ContentCard>
            <ContentCard title="Medalha Milagrosa" subtitle="Rue du Bac, 1830">
              Originada das aparições a Santa Catarina Labouré; cunhada por ordem do arcebispo de Paris em 1832.
            </ContentCard>
            <ContentCard title="Consagração ao Imaculado Coração" subtitle="Fátima, 1917">
              Proposta pela própria Virgem aos pastorinhos; realizada universalmente por Pio XII (1942), São João
              Paulo II (1984) e Francisco (2022).
            </ContentCard>
          </CardGrid>
        </section>
      </ReadingMode>
    </div>
  );
}
