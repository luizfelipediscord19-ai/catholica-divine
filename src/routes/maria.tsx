import anunciacao from "../assets/anunciacao.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CardGrid, ContentCard, Prose, Pullquote, Prancha } from "../components/PageShell";
import { ReadingMode, FnRef } from "../components/ReadingMode";
import { Termo } from "../components/Termo";
import maria from "../assets/maria.jpg";
import { MarcarEstudo } from "../components/portal/MarcarEstudo";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";

export const Route = createFileRoute("/maria")({
  head: () => ({
    meta: [
      { title: "Maria, Mãe de Deus — Mariologia católica completa" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/maria" },
      { name: "description", content: "Mariologia católica: quatro dogmas marianos, títulos, aparições aprovadas, devoções e o lugar de Maria na economia da salvação, com fontes magisteriais oficiais." },
      { property: "og:title", content: "Maria, Mãe de Deus" },
      { property: "og:description", content: "Dogmas marianos, aparições aprovadas e devoções segundo o Magistério." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/maria" }],
  }),
  component: Page,
});

const TOC = [
  { id: "introducao", label: "Maria na economia da salvação" },
  { id: "escrituras", label: "Maria nas Escrituras" },
  { id: "patristica", label: "Os Padres: a nova Eva" },

  { id: "dogmas", label: "Os quatro dogmas marianos" },
  { id: "theotokos", label: "Maternidade Divina (431)" },
  { id: "virgindade", label: "Virgindade Perpétua (Sínodo de Latrão, 649)" },
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
  { id: "latrao", label: "Sínodo de Latrão (649), Cân. 3, sob o Papa São Martinho I", ref: "DH 503 — virgindade perpétua de Maria. Trata-se de um sínodo romano, não do Concílio Ecumênico de Latrão I (1123); a doutrina é constante na Tradição e no magistério ordinário e universal." },
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
  { title: "Virgindade Perpétua", year: "Sínodo de Latrão, 649", body: "Antes, durante e depois do parto, Maria permaneceu sempre Virgem (ante partum, in partu, post partum)." },
  { title: "Imaculada Conceição", year: "Pio IX, 1854", body: "Por singular privilégio, preservada de todo pecado original desde o primeiro instante de sua concepção." },
  { title: "Assunção", year: "Pio XII, 1950", body: "Terminado o curso de sua vida terrena, foi assunta de corpo e alma à glória celeste." },
];

const APARICOES = [
  { local: "Guadalupe (México)", ano: "1531", body: "A São Juan Diego: a Virgem morena, imagem impressa na tilma. O culto goza de aprovação e incentivo papal contínuo desde o séc. XVIII (Bento XIV, 1754); Pio X a proclamou Padroeira da América Latina e a coroou canonicamente em 1895/1910. Não há um decreto formal único de 'reconhecimento da sobrenaturalidade' nos moldes modernos, mas séculos de aprovação litúrgica e devocional pela Santa Sé." },
  { local: "Rue du Bac (Paris)", ano: "1830", body: "A Santa Catarina Labouré: origem da Medalha Milagrosa, que antecipou em linguagem popular o dogma da Imaculada Conceição (1854). O arcebispo de Paris autorizou a cunhagem da medalha em 1832, reconhecendo a devoção; não houve declaração dogmática sobre a aparição em si." },
  { local: "Lourdes (França)", ano: "1858", body: "A Santa Bernadette Soubirous: ‘Eu sou a Imaculada Conceição.’ O bispo de Tarbes declarou em 1862 que a aparição reveste 'os caracteres da verdade' e autorizou o culto, reconhecimento formal raro entre as aparições marianas." },
  { local: "Fátima (Portugal)", ano: "1917", body: "Aos três pastorinhos: oração, penitência e consagração ao Imaculado Coração. O bispo de Leiria declarou em 1930 as aparições 'dignas de fé' e aprovou o culto público." },
];

function Page() {
  return (
    <div>
      <PageHero
        autoridade={["oficial", "tradicao", "devocao"]}
        eyebrow="Beata Maria Virgo"
        title="Maria, Mãe de Deus"
        intro="Filha do Pai, Mãe do Filho, Esposa do Espírito Santo. A primeira discípula, modelo da Igreja, caminho seguro a Cristo."
        image={maria}
      />

      <ReadingMode title="Maria, Mãe de Deus" toc={TOC} footnotes={FOOTNOTES}>
        <Prose>
          <section id="introducao" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="introducao" />
            <h3>Maria na economia da salvação</h3>
            <p>
              A mariologia católica não é um tratado autônomo, mas um capítulo da cristologia e da eclesiologia.
              O Concílio Vaticano II quis evidenciá-lo colocando toda a doutrina sobre a Virgem no{" "}
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

          <section id="escrituras" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="escrituras" />
            <h3>Maria nas Escrituras</h3>
            <p>
              O Novo Testamento fala de Maria com sobriedade, mas em momentos decisivos. Lucas narra a{" "}
              <strong> Anunciação</strong> (Lc 1,26-38), em que o <em>“faça-se em mim segundo a tua palavra”</em>{" "}
              inaugura a obediência da fé; a <strong>Visitação</strong> e o <em>Magnificat</em> (Lc 1,39-56), o
              cântico dos pobres de Deus; o <strong>Natal</strong> e a apresentação no Templo, com a profecia da
              espada de Simeão (Lc 2,35). João apresenta-a em <strong>Caná</strong> (Jo 2,1-11), onde intercede e
              remete os discípulos a Cristo (<em>“fazei tudo o que ele vos disser”</em>), e junto à{" "}
              <strong> Cruz</strong> (Jo 19,25-27), onde é entregue como mãe ao discípulo amado — texto que a
              Tradição lê como fundamento da maternidade espiritual de Maria sobre a Igreja. Atos 1,14 mostra-a
              em oração com os Apóstolos à espera do Espírito, e Ap 12 apresenta a <em>Mulher</em> cujo sentido
              primeiro é eclesial e que a tradição aplica também à Virgem.
            </p>
            <p>
              No Antigo Testamento, a leitura tipológica reconhece prefigurações: o <em>protoevangelho</em> de
              Gn 3,15, o <em>“eis que a virgem conceberá”</em> de Is 7,14 lido pelo Novo Testamento à luz da
              tradição grega (Mt 1,22-23), a Arca da Aliança, a Filha de Sião de Sf 3,14-17 e a rainha-mãe
              (<em>gebirah</em>) da corte davídica (1Rs 2,19). São figuras que iluminam o mistério; não
              substituem o sentido literal dos textos.
            </p>
            <NotaConfiabilidade nivel="teologia">
              A leitura mariana de Gn 3,15 e de Ap 12 é consagrada na liturgia e no magistério
              (<em>LG</em> 55; <em>CIC</em> §§ 410-411, 501), mas pertence ao sentido espiritual da Escritura:
              é interpretação teológica autorizada, não definição dogmática do sentido literal desses versículos.
            </NotaConfiabilidade>
          </section>

          <section id="patristica" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="patristica" />
            <h3>Os Padres: Maria, a nova Eva</h3>
            <p>
              Já no século II, Santo Ireneu de Lião formula o paralelo que atravessará toda a tradição:{" "}
              <em> “o nó da desobediência de Eva foi desfeito pela obediência de Maria”</em>{" "}
              (<em>Adversus Haereses</em> III, 22, 4) — texto retomado por <em>Lumen Gentium</em> 56
              <FnRef n="lg8" />. São Justino (<em>Diálogo com Trifão</em> 100) desenvolve a mesma antítese
              Eva/Maria, e Tertuliano insiste na realidade da carne recebida da Virgem, contra o docetismo.
            </p>
            <p>
              O testemunho litúrgico é igualmente antigo: o <em>Sub tuum praesidium</em> (“À vossa proteção
              recorremos, Santa Mãe de Deus”), conservado num papiro grego habitualmente datado entre os
              séculos III e IV, atesta que já então se rezava a Maria com o título de <em>Theotókos</em>. Santo
              Ambrósio a chama <em>tipo da Igreja</em> na fé, na caridade e na perfeita união com Cristo, tema
              que o Vaticano II recolherá em <em>LG</em> 63-65.
            </p>
            <NotaConfiabilidade nivel="historia">
              A datação do papiro do <em>Sub tuum praesidium</em> é discutida entre especialistas (propostas
              variam do séc. III ao séc. V). O que é seguro é a antiguidade da invocação da Virgem como Mãe de
              Deus, anterior ao Concílio de Éfeso (431).
            </NotaConfiabilidade>
          </section>


          <section id="dogmas" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="dogmas" />
            <h3>Os quatro dogmas marianos</h3>
            <p>
              A Igreja Católica define solenemente quatro verdades sobre a Virgem Maria, que devem ser cridas
              com fé divina e católica (<em>de fide divina et catholica</em>): a Maternidade Divina, a Virgindade
              Perpétua, a Imaculada Conceição e a Assunção.
            </p>
          </section>

          <section id="theotokos" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="theotokos" />
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
          <MarcarEstudo tipo="maria" chave="virgindade" />
            <h4>II. Virgindade Perpétua (Sínodo de Latrão, 649)</h4>
            <p>
              A Igreja confessa que Maria foi e permaneceu Virgem <em>antes, durante e depois do parto</em>{" "}
              (<em>ante partum, in partu, post partum</em>). Essa verdade foi solenemente formulada pelo Sínodo
              de Latrão de 649, convocado pelo Papa São Martinho I<FnRef n="latrao" /> — um sínodo romano, não o
              Concílio Ecumênico de Latrão I (1123) —, confirmando uma fé já atestada por Santo Inácio, São
              Justino, Santo Ireneu e retomada pelos Concílios Ecumênicos de Constantinopla II (553) e III
              (680–681). A perpétua virgindade de Maria é ensinada de modo constante e unânime pela Tradição e
              pelo magistério ordinário e universal da Igreja (<em>LG</em> 57; <em>CIC</em> § 499). O Catecismo
              trata do tema em <em>CIC</em> §§ 496–507<FnRef n="cic" />, explicando que os “irmãos de Jesus”
              mencionados pelos Evangelhos são parentes próximos, segundo o uso semítico.
            </p>
          </section>

          <section id="imaculada" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="imaculada" />
            <h4>III. <Termo termo="imaculada_conceicao">Imaculada Conceição</Termo> (Pio IX, 1854)</h4>
            <p>
              Pelo Papa <strong>Pio IX</strong>, na Bula <em>Ineffabilis Deus</em>, de 8 de dezembro de 1854,
              foi definido que <em>a beatíssima Virgem Maria, no primeiro instante da sua concepção, por
              singular <Termo termo="graca">graça</Termo> e privilégio de Deus onipotente, em vista dos méritos de Cristo Jesus Salvador do
              gênero humano, foi preservada imune de toda mancha do <Termo termo="pecado_original">pecado original</Termo></em><FnRef n="ineffabilis" />.
              É preservação <em>per modum redemptionis</em>: Maria foi salva por Cristo, antecipadamente
              (<em>CIC</em> §§ 490–493).
            </p>
          </section>

          <section id="assuncao" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="assuncao" />
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
          <MarcarEstudo tipo="maria" chave="titulos" />
            <h3>Títulos marianos</h3>
            <p>
              A liturgia e o magistério atribuem a Maria, entre muitos, os seguintes títulos: <em>Mãe da Igreja</em>{" "}
              (Paulo VI, 1964; memória obrigatória instituída por Francisco em 2018), <em>Mediadora de todas as
              graças</em>, <em>Auxílio dos cristãos</em>, <em>Causa da nossa alegria</em>, <em>Rainha do Céu</em>,{" "}
              <em> Mãe da Misericórdia</em>. Todos esses títulos, ensina <em>Lumen Gentium</em> 62,{" "}
              <em> nada acrescentam nem subtraem à dignidade e eficácia de Cristo, único Mediador</em>.
            </p>
            <NotaConfiabilidade nivel="teologia">
              “Mediadora de todas as graças” é um título devocional e teológico, não um quinto dogma mariano —
              a Igreja Católica define solenemente apenas quatro dogmas marianos (Maternidade Divina, Virgindade
              Perpétua, Imaculada Conceição e Assunção). O Concílio Vaticano II, embora reconheça a cooperação
              singular de Maria na obra da salvação, evitou deliberadamente proclamar essa expressão como
              definição dogmática, preferindo a linguagem de “mediação materna” sempre subordinada e
              participada (<em>LG</em> 60-62). Como recorda São Paulo, “há um só Deus e um só mediador entre
              Deus e os homens, Cristo Jesus” (1Tm 2,5); toda intercessão de Maria e dos santos deriva
              inteiramente dessa única mediação e nela se apoia.
            </NotaConfiabilidade>
          </section>

          <section id="mediacao" className="scroll-mt-24">
          <MarcarEstudo tipo="maria" chave="mediacao" />
            <h3>Mediação e cooperação maternal</h3>
            <p>
              Maria coopera de modo singular na obra da Redenção pela obediência, fé, esperança e ardente
              caridade (<em>LG</em> 61). Sua cooperação não compete com a única mediação de Cristo, mas é{" "}
              <em> participação</em> dela (<em>LG</em> 62). É o que Paulo VI desenvolveu em <em>Marialis Cultus</em>
              <FnRef n="marialis" /> e São João Paulo II em <em>Redemptoris Mater</em><FnRef n="redmater" />.
            </p>
          </section>
        </Prose>

        <Prancha
          image={anunciacao}
          alt="Anunciação: o anjo Gabriel se inclina diante de Maria sob os arcos de um pórtico."
          legenda="“Faça-se em mim segundo a tua palavra” (Lc 1,38): o consentimento livre de Maria abre a Encarnação (CIC §§ 484–494)."
        />

        <section id="aparicoes" className="scroll-mt-24 mt-12">
          <MarcarEstudo tipo="maria" chave="aparicoes" />
          <h3 className="font-display text-2xl text-foreground mb-3">Aparições aprovadas pela Igreja</h3>
          <p className="text-sm text-muted-foreground max-w-3xl mb-6 leading-relaxed">
            Diferentemente da Revelação pública (encerrada com a morte do último Apóstolo, <em>DV</em> 4), as{" "}
            <em> revelações privadas</em> não pertencem ao depósito da fé e não obrigam à fé divina e católica
            (<em>CIC</em> §§ 66-67). O reconhecimento eclesiástico admite graus distintos — declaração de que
            "nada obsta" à devoção (<em>nihil obstat</em>), constatação de que a aparição não contradiz a fé e
            a moral, ou, mais raramente, afirmação de que os fatos revestem "caracteres de verdade" — segundo as{" "}
            <em> Normas</em> do Dicastério para a Doutrina da Fé<FnRef n="cdf-aparicoes" />. Nenhuma aprovação
            eclesiástica equivale a uma declaração de que a aparição é "comprovadamente sobrenatural"; trata-se
            sempre de um juízo prudencial e pastoral, ao qual os fiéis podem aderir com fé humana e prudente,
            nunca com o assentimento devido ao dogma.
          </p>
          <NotaConfiabilidade nivel="privada" className="mb-6 max-w-3xl">
            As aparições abaixo têm graus de reconhecimento eclesial diversos, do simples incentivo à devoção
            até a declaração formal de que os fatos são "dignos de fé". Em nenhum caso a Igreja obriga os fiéis
            a crer nelas.
          </NotaConfiabilidade>
          <CardGrid cols={2}>
            {APARICOES.map((a) => (
              <ContentCard key={a.local} title={a.local} subtitle={a.ano}>{a.body}</ContentCard>
            ))}
          </CardGrid>
        </section>

        <section id="devocoes" className="scroll-mt-24 mt-12">
          <MarcarEstudo tipo="maria" chave="devocoes" />
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
              <em>Tratado da Verdadeira Devoção</em>; renovada e proposta por São João Paulo II (lema{" "}
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
