import { createFileRoute } from "@tanstack/react-router";
import doutores from "@/assets/doutores.jpg";
import manuscrito from "@/assets/manuscrito.jpg";
import { PageHero, CardGrid, ContentCard, Prose, Pullquote, Prancha } from "../components/PageShell";
import { ReadingMode, FnRef } from "../components/ReadingMode";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/doutores-da-igreja")({
  head: () => ({
    meta: [
      { title: "Doutores da Igreja — Os 37 mestres da fé católica" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/doutores-da-igreja" },
      { name: "description", content: "Doutores da Igreja: critérios canônicos, história das proclamações de 1295 a 2022, e síntese da obra dos 37, com notas e fontes magisteriais." },
      { name: "keywords", content: keywordsPara(["santos", "formacao"]) },
      { property: "og:title", content: "Doutores da Igreja Católica" },
      { property: "og:description", content: "Os 37 santos reconhecidos pela eminência de doutrina e santidade." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/doutores-da-igreja" }],
  }),
  component: Page,
});

const TOC = [
  { id: "introducao", label: "Introdução" },
  { id: "criterios", label: "Critérios canônicos" },
  { id: "historia", label: "História do título" },
  { id: "ocidentais", label: "4 Doutores do Ocidente" },
  { id: "orientais", label: "4 Doutores do Oriente" },
  { id: "medievais", label: "Medievais e patrísticos" },
  { id: "modernos", label: "Idade Moderna" },
  { id: "mulheres", label: "Mulheres e proclamações recentes" },
  { id: "sintese", label: "Síntese final" },
  { id: "notas", label: "Notas e fontes" },
];

const FOOTNOTES = [
  { id: "bonifacio", label: "Bonifácio VIII, Bula Gloriosus Deus (1295)", ref: "primeira proclamação dos quatro Doutores ocidentais" },
  { id: "piov", label: "São Pio V, reforma do Breviário Romano (1568)", ref: "inclusão dos quatro Doutores orientais" },
  { id: "bento14", label: "Bento XIV, De Servorum Dei Beatificatione et Beatorum Canonizatione (1734–1738)", ref: "Livro IV, parte II, cap. 11 — eminens doctrina, insignis sanctitas, Ecclesiae declaratio" },
  { id: "aeterni", label: "Leão XIII, Encíclica Aeterni Patris (04.08.1879)", ref: "São Tomás de Aquino como Doctor Communis" },
  { id: "teresa", label: "Paulo VI, Carta Apostólica Multiformis Sapientia Dei (27.09.1970)", ref: "Santa Teresa de Ávila Doutora" },
  { id: "catarina", label: "Paulo VI, Carta Apostólica Mirabilis in Ecclesia Deus (04.10.1970)", ref: "Santa Catarina de Sena Doutora" },
  { id: "divini", label: "São João Paulo II, Carta Apostólica Divini Amoris Scientia (19.10.1997)", ref: "Santa Teresinha do Menino Jesus Doutora" },
  { id: "bento16", label: "Bento XVI, Decretos de 07.10.2012", ref: "São João de Ávila e Santa Hildegarda de Bingen" },
  { id: "francisco", label: "Francisco, Decretos de 21.02.2015 e 21.01.2022", ref: "Gregório de Narek; Santo Irineu de Lião (Doctor Unitatis)" },
  { id: "lg", label: "Concílio Vaticano II, Lumen Gentium (1964)", ref: "nn. 49–51, sobre a comunhão dos santos" },
  { id: "cic", label: "Catecismo da Igreja Católica", ref: "§§ 688, 2030 — Padres e Doutores na Tradição viva" },
];

const PRIMORDIAIS = [
  { nome: "Santo Ambrósio", titulo: "Doctor Mellifluus", body: "Bispo de Milão († 397). De Mysteriis, De Sacramentis. Catequista de Santo Agostinho." },
  { nome: "Santo Agostinho", titulo: "Doctor Gratiae", body: "Bispo de Hipona († 430). Confissões, De Trinitate, De Civitate Dei. O mais citado pelo Catecismo." },
  { nome: "São Jerônimo", titulo: "Doctor Maximus", body: "Presbítero († 420). Tradutor da Vulgata. ‘O desconhecimento das Escrituras é desconhecimento de Cristo’ (DV 25)." },
  { nome: "São Gregório Magno", titulo: "Doctor Optimus", body: "Papa († 604). Regra Pastoral, Diálogos, Morais sobre Jó. Reformador da liturgia romana." },
];
const ORIENTAIS = [
  { nome: "Santo Atanásio", titulo: "Pater Orthodoxiae", body: "Bispo de Alexandria († 373). De Incarnatione. Defensor de Niceia." },
  { nome: "São Basílio Magno", titulo: "Magnus", body: "Bispo de Cesareia († 379). De Spiritu Sancto, Regras monásticas." },
  { nome: "São Gregório de Nazianzo", titulo: "Theologus", body: "Patriarca de Constantinopla († 390). Cinco Discursos Teológicos." },
  { nome: "São João Crisóstomo", titulo: "Os Áureo", body: "Patriarca de Constantinopla († 407). Sobre o Sacerdócio, homilias." },
];
const MEDIEVAIS = [
  { nome: "São Tomás de Aquino", titulo: "Doctor Angelicus", body: "Dominicano († 1274). Summa Theologiae. Doutor por Pio V (1567)." },
  { nome: "São Boaventura", titulo: "Doctor Seraphicus", body: "Franciscano († 1274). Itinerarium Mentis in Deum. Sisto V (1588)." },
  { nome: "São Bernardo de Claraval", titulo: "Doctor Mellifluus", body: "Cisterciense († 1153). Sermões sobre o Cântico. Pio VIII (1830)." },
  { nome: "Santo Anselmo de Cantuária", titulo: "Doctor Magnificus", body: "Beneditino († 1109). Proslogion, Cur Deus Homo. Clemente XI (1720)." },
  { nome: "Santo Isidoro de Sevilha", titulo: "Doctor Hispaniae", body: "Bispo († 636). Etymologiae. Inocêncio XIII (1722)." },
  { nome: "São Pedro Crisólogo", titulo: "Crisólogo", body: "Bispo de Ravena († 450). Bento XIII (1729)." },
  { nome: "São Leão Magno", titulo: "Magnus", body: "Papa († 461). Tomo a Flaviano, base de Calcedônia. Bento XIV (1754)." },
  { nome: "São Pedro Damião", titulo: "Reformator", body: "Cardeal beneditino († 1072). Leão XII (1828)." },
  { nome: "Santo Hilário de Poitiers", titulo: "Malleus Arianorum", body: "Bispo († 367). De Trinitate. Pio IX (1851)." },
  { nome: "São Cirilo de Alexandria", titulo: "Doctor Incarnationis", body: "Patriarca († 444). Defensor da Theotókos em Éfeso. Leão XIII (1882)." },
  { nome: "São Cirilo de Jerusalém", titulo: "Catequista", body: "Bispo († 386). Catequeses Mistagógicas. Leão XIII (1882)." },
  { nome: "São João Damasceno", titulo: "Doctor Mariae", body: "Monge († 749). De Fide Orthodoxa. Leão XIII (1890)." },
  { nome: "Venerável Beda", titulo: "Doctor Anglorum", body: "Beneditino († 735). História Eclesiástica. Leão XIII (1899)." },
  { nome: "Santo Efrém Sírio", titulo: "Cítara do Espírito", body: "Diácono († 373). Hinos siríacos. Bento XV (1920)." },
];
const MODERNOS = [
  { nome: "São Pedro Canísio", titulo: "Da Contrarreforma", body: "Jesuíta († 1597). Catecismos. Pio XI (1925)." },
  { nome: "São João da Cruz", titulo: "Doctor Mysticus", body: "Carmelita Descalço († 1591). Noite Escura, Subida do Monte Carmelo. Pio XI (1926)." },
  { nome: "São Roberto Belarmino", titulo: "Doctor Ecclesiae", body: "Jesuíta cardeal († 1621). Disputationes de Controversiis. Pio XI (1931)." },
  { nome: "Santo Alberto Magno", titulo: "Doctor Universalis", body: "Dominicano († 1280). Mestre de Tomás. Pio XI (1931)." },
  { nome: "Santo Antônio de Pádua", titulo: "Doctor Evangelicus", body: "Franciscano († 1231). Pio XII (1946)." },
  { nome: "São Lourenço de Bríndisi", titulo: "Doctor Apostolicus", body: "Capuchinho († 1619). João XXIII (1959)." },
  { nome: "Santo Afonso de Ligório", titulo: "Doctor Zelantissimus", body: "Redentorista († 1787). Theologia Moralis. Pio IX (1871)." },
  { nome: "São Francisco de Sales", titulo: "Doctor Caritatis", body: "Bispo de Genebra († 1622). Introdução à Vida Devota. Pio IX (1877)." },
];
const MULHERES = [
  { nome: "Santa Teresa de Ávila", titulo: "Doctora Mystica", body: "Carmelita Descalça († 1582). Castelo Interior. Primeira mulher Doutora, Paulo VI (27.09.1970)." },
  { nome: "Santa Catarina de Sena", titulo: "Doctora Ecclesiae", body: "Dominicana terciária († 1380). Diálogo da Divina Providência. Paulo VI (04.10.1970)." },
  { nome: "Santa Teresinha do Menino Jesus", titulo: "Doctora Amoris", body: "Carmelita († 1897). História de uma Alma. São João Paulo II (19.10.1997)." },
  { nome: "Santa Hildegarda de Bingen", titulo: "Doctora Symphonialis", body: "Beneditina († 1179). Scivias. Bento XVI (07.10.2012)." },
  { nome: "São João de Ávila", titulo: "Mestre dos Pregadores", body: "Presbítero († 1569). Audi Filia. Bento XVI (07.10.2012)." },
  { nome: "São Gregório de Narek", titulo: "Doutor Armênio", body: "Monge († c. 1003). Livro das Lamentações. Francisco (21.02.2015)." },
  { nome: "Santo Irineu de Lião", titulo: "Doctor Unitatis", body: "Bispo († c. 202). Adversus Haereses. Francisco (21.01.2022)." },
];

function Page() {
  return (
    <div>
      <PageHero
        autoridade={["oficial", "padres", "teologia"]}
        eyebrow="Doctores Ecclesiae"
        title="Os Doutores da Igreja"
        intro="Santos cuja eminente doutrina e cuja santidade de vida foram reconhecidas pela Igreja como guias seguros para todos os fiéis. Hoje são trinta e sete."
      image={doutores}
      />

      <ReadingMode title="Os Doutores da Igreja" toc={TOC} footnotes={FOOTNOTES}>
        <Prose>
          <section id="introducao" className="scroll-mt-24">
            <h3>Introdução</h3>
            <p>
              O título de <strong>Doutor da Igreja</strong> (<em>Doctor Ecclesiae</em>) é concedido pelo Romano
              Pontífice a santos cuja obra teológica e espiritual constitui patrimônio doutrinal universal. É
              ato do Magistério que propõe esses mestres ao <em>estudo</em> e à <em>imitação</em> de toda a
              Igreja<FnRef n="cic" />. Distingue-se da canonização (que reconhece a santidade) e da função de{" "}
              <em> Padre da Igreja</em> (que se refere à proximidade temporal com a Tradição apostólica).
            </p>
          </section>

          <section id="criterios" className="scroll-mt-24">
            <h3>Critérios canônicos</h3>
            <p>
              Fixados pela tradição e codificados a partir do Papa Bento XIV<FnRef n="bento14" />, três
              requisitos são exigidos:
            </p>
            <ol>
              <li><strong><em>Eminens doctrina</em></strong> — doutrina eminente, conforme à fé católica e útil a toda a Igreja.</li>
              <li><strong><em>Insignis vitae sanctitas</em></strong> — santidade de vida insigne, atestada pela canonização.</li>
              <li><strong><em>Ecclesiae declaratio</em></strong> — declaração expressa do Romano Pontífice.</li>
            </ol>

            <Pullquote cite="São João Paulo II — Divini Amoris Scientia (1997)">
              Sempre que a Igreja proclama Doutor um santo ou uma santa, quer reconhecer um carisma de sabedoria
              concedido pelo Espírito Santo para o bem de todo o Povo de Deus.
            </Pullquote>
          </section>

          <section id="historia" className="scroll-mt-24">
            <h3>História do título</h3>
            <p>
              A primeira proclamação formal data de <strong>1295</strong>, quando <strong>Bonifácio VIII</strong>,
              pela bula <em>Gloriosus Deus</em><FnRef n="bonifacio" />, elevou os quatro grandes Padres ocidentais
              à dignidade de Doutores. Em <strong>1568</strong>, São Pio V incluiu os quatro grandes Padres
              orientais no Breviário<FnRef n="piov" />. Tomás de Aquino foi proclamado por Pio V (1567) e
              Boaventura por Sisto V (1588). Leão XIII reafirmou Tomás como <em>Doctor Communis</em> em{" "}
              <em> Aeterni Patris</em> (1879)<FnRef n="aeterni" />.
            </p>
            <p>
              A primeira proclamação de uma mulher ocorreu apenas em <strong>27 de setembro de 1970</strong>,
              com Santa Teresa de Ávila<FnRef n="teresa" />, seguida por Santa Catarina de Sena<FnRef n="catarina" />.
              São João Paulo II acrescentou Santa Teresinha em 1997<FnRef n="divini" />; Bento XVI proclamou São
              João de Ávila e Santa Hildegarda em 2012<FnRef n="bento16" />; Francisco proclamou São Gregório de
              Narek (2015) e Santo Irineu de Lião como <em>Doctor Unitatis</em> (2022)<FnRef n="francisco" />.
            </p>
          </section>
        </Prose>

        <section id="ocidentais" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-2xl text-foreground mb-6">Os quatro Grandes Doutores do Ocidente (1295)</h3>
          <CardGrid cols={2}>
            {PRIMORDIAIS.map((d) => (
              <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
            ))}
          </CardGrid>
        </section>

        <section id="orientais" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-2xl text-foreground mb-6">Os quatro Grandes Doutores do Oriente (1568)</h3>
          <CardGrid cols={2}>
            {ORIENTAIS.map((d) => (
              <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
            ))}
          </CardGrid>
        </section>

        <section id="medievais" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-2xl text-foreground mb-6">Doutores medievais e patrísticos posteriores</h3>
          <CardGrid cols={3}>
            {MEDIEVAIS.map((d) => (
              <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
            ))}
          </CardGrid>
        </section>

        <section id="modernos" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-2xl text-foreground mb-6">Doutores da Reforma Católica e da modernidade</h3>
          <CardGrid cols={3}>
            {MODERNOS.map((d) => (
              <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
            ))}
          </CardGrid>
        </section>

        <section id="mulheres" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-2xl text-foreground mb-6">Mulheres Doutoras e proclamações recentes</h3>
          <CardGrid cols={3}>
            {MULHERES.map((d) => (
              <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
            ))}
          </CardGrid>
        </section>

        <section id="sintese" className="scroll-mt-24 mt-16">
          <Prose>
            <h3>Síntese: por que estudar os Doutores</h3>
            <p>
              Os Doutores não substituem a Escritura nem o Magistério vivo: iluminam-nos. Cada um responde, em
              seu tempo, a uma necessidade da Igreja — Atanásio à crise ariana, Agostinho à pelagiana, Tomás à
              síntese fé-razão, Teresa e João da Cruz à renovação mística, Teresinha à espiritualidade da
              confiança. <em>Lumen Gentium</em> 50 lembra que <em>a comunhão com os santos robustece nossa
              fraqueza com o testemunho de tantos santos</em><FnRef n="lg" />.
            </p>
          </Prose>
        </section>
      </ReadingMode>

    </div>
  );
}
