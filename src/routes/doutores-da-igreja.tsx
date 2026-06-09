import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard, Prose, Sources, Pullquote } from "../components/PageShell";

export const Route = createFileRoute("/doutores-da-igreja")({
  head: () => ({
    meta: [
      { title: "Doutores da Igreja — Os 37 mestres reconhecidos pela Igreja Católica" },
      { name: "description", content: "Doutores da Igreja: critérios canônicos (eminens doctrina, insignis vitae sanctitas, Ecclesiae declaratio), história, lista completa dos 37 e síntese da obra de cada um, com fontes magisteriais." },
      { property: "og:title", content: "Doutores da Igreja Católica" },
      { property: "og:description", content: "Os 37 santos reconhecidos pela eminência de doutrina e santidade de vida." },
    ],
  }),
  component: Page,
});

const PRIMORDIAIS = [
  { nome: "Santo Ambrósio", titulo: "Doctor Mellifluus", body: "Bispo de Milão († 397). De Mysteriis, De Sacramentis, De Officiis Ministrorum. Catequista de Santo Agostinho. Proclamado Doutor por Bonifácio VIII em 1295." },
  { nome: "Santo Agostinho", titulo: "Doctor Gratiae", body: "Bispo de Hipona († 430). Confissões, De Trinitate, De Civitate Dei, De Doctrina Christiana. Doutor em 1295 (Bonifácio VIII). Mais citado pelo Catecismo." },
  { nome: "São Jerônimo", titulo: "Doctor Maximus", body: "Presbítero († 420). Tradutor da Vulgata, comentários bíblicos. ‘O desconhecimento das Escrituras é desconhecimento de Cristo’ (DV 25). Doutor em 1295." },
  { nome: "São Gregório Magno", titulo: "Doctor Optimus", body: "Papa († 604). Regra Pastoral, Diálogos, Morais sobre Jó. Reformou liturgia e canto. Doutor em 1295." },
];

const ORIENTAIS = [
  { nome: "Santo Atanásio", titulo: "Pater Orthodoxiae", body: "Bispo de Alexandria († 373). De Incarnatione, Vita Antonii. Defensor de Niceia contra o arianismo. Doutor em 1568." },
  { nome: "São Basílio Magno", titulo: "Magnus", body: "Bispo de Cesareia († 379). Regras monásticas, De Spiritu Sancto. Capadócio. Doutor em 1568." },
  { nome: "São Gregório de Nazianzo", titulo: "Theologus", body: "Patriarca de Constantinopla († 390). Cinco Discursos Teológicos. Doutor em 1568." },
  { nome: "São João Crisóstomo", titulo: "Os Áureo", body: "Patriarca de Constantinopla († 407). Homilias bíblicas, Sobre o Sacerdócio. Doutor em 1568." },
];

const MEDIEVAIS = [
  { nome: "São Tomás de Aquino", titulo: "Doctor Angelicus / Communis", body: "Dominicano († 1274). Summa Theologiae, Summa contra Gentiles. Síntese escolástica. Doutor por Pio V em 1567; ‘mestre comum’ por Leão XIII (Aeterni Patris, 1879)." },
  { nome: "São Boaventura", titulo: "Doctor Seraphicus", body: "Franciscano († 1274). Itinerarium Mentis in Deum, Breviloquium. Doutor por Sisto V em 1588." },
  { nome: "São Bernardo de Claraval", titulo: "Doctor Mellifluus", body: "Cisterciense († 1153). Sermões sobre o Cântico, De Diligendo Deo. Doutor por Pio VIII em 1830." },
  { nome: "Santo Anselmo de Cantuária", titulo: "Doctor Magnificus", body: "Beneditino († 1109). Proslogion (argumento ontológico), Cur Deus Homo. Doutor por Clemente XI em 1720." },
  { nome: "Santo Isidoro de Sevilha", titulo: "Doctor Hispaniae", body: "Bispo († 636). Etymologiae, enciclopédia da Antiguidade tardia. Doutor por Inocêncio XIII em 1722." },
  { nome: "São Pedro Crisólogo", titulo: "Crisólogo", body: "Bispo de Ravena († 450). Sermões. Doutor por Bento XIII em 1729." },
  { nome: "São Leão Magno", titulo: "Magnus", body: "Papa († 461). Tomo a Flaviano, base de Calcedônia. Doutor por Bento XIV em 1754." },
  { nome: "São Pedro Damião", titulo: "Reformator", body: "Cardeal beneditino († 1072). Liber Gomorrhianus. Doutor por Leão XII em 1828." },
  { nome: "Santo Hilário de Poitiers", titulo: "Malleus Arianorum", body: "Bispo († 367). De Trinitate. Doutor por Pio IX em 1851." },
  { nome: "São Cirilo de Alexandria", titulo: "Doctor Incarnationis", body: "Patriarca († 444). Defensor da Theotókos em Éfeso (431). Doutor por Leão XIII em 1882." },
  { nome: "São Cirilo de Jerusalém", titulo: "Catequista", body: "Bispo († 386). Catequeses Batismais e Mistagógicas. Doutor por Leão XIII em 1882." },
  { nome: "São João Damasceno", titulo: "Doctor Mariae", body: "Monge († 749). De Fide Orthodoxa, defensor das imagens. Doutor por Leão XIII em 1890." },
  { nome: "Venerável Beda", titulo: "Doctor Anglorum", body: "Beneditino († 735). História Eclesiástica do Povo Inglês. Doutor por Leão XIII em 1899." },
  { nome: "Santo Efrém Sírio", titulo: "Cítara do Espírito", body: "Diácono († 373). Hinos teológicos em siríaco. Doutor por Bento XV em 1920." },
];

const MODERNOS = [
  { nome: "São Pedro Canísio", titulo: "Doutor da Contrarreforma", body: "Jesuíta († 1597). Catecismos. Doutor por Pio XI em 1925." },
  { nome: "São João da Cruz", titulo: "Doctor Mysticus", body: "Carmelita Descalço († 1591). Subida do Monte Carmelo, Noite Escura, Cântico Espiritual, Chama Viva de Amor. Doutor por Pio XI em 1926." },
  { nome: "São Roberto Belarmino", titulo: "Doctor Ecclesiae", body: "Jesuíta cardeal († 1621). Disputationes de Controversiis. Doutor por Pio XI em 1931." },
  { nome: "Santo Alberto Magno", titulo: "Doctor Universalis", body: "Dominicano († 1280). Mestre de Tomás de Aquino. Doutor por Pio XI em 1931." },
  { nome: "Santo Antônio de Pádua", titulo: "Doctor Evangelicus", body: "Franciscano († 1231). Sermões. Doutor por Pio XII em 1946." },
  { nome: "São Lourenço de Bríndisi", titulo: "Doctor Apostolicus", body: "Capuchinho († 1619). Doutor por João XXIII em 1959." },
  { nome: "Santo Afonso de Ligório", titulo: "Doctor Zelantissimus", body: "Fundador dos Redentoristas († 1787). Theologia Moralis, Glórias de Maria. Doutor por Pio IX em 1871." },
  { nome: "São Francisco de Sales", titulo: "Doctor Caritatis", body: "Bispo de Genebra († 1622). Introdução à Vida Devota, Tratado do Amor de Deus. Doutor por Pio IX em 1877." },
];

const MULHERES = [
  { nome: "Santa Teresa de Ávila", titulo: "Doctora Mystica", body: "Carmelita Descalça († 1582). Castelo Interior, Caminho de Perfeição, Livro da Vida. Primeira mulher Doutora, por Paulo VI em 27.09.1970." },
  { nome: "Santa Catarina de Sena", titulo: "Doctora Ecclesiae", body: "Dominicana terciária († 1380). Diálogo da Divina Providência. Doutora por Paulo VI em 04.10.1970." },
  { nome: "Santa Teresinha do Menino Jesus", titulo: "Doctora Amoris", body: "Carmelita († 1897). História de uma Alma. ‘Pequeno caminho’ da infância espiritual. Doutora por São João Paulo II em 19.10.1997 (Divini Amoris Scientia)." },
  { nome: "Santa Hildegarda de Bingen", titulo: "Doctora Symphonialis", body: "Beneditina († 1179). Scivias, Liber Divinorum Operum. Doutora por Bento XVI em 07.10.2012." },
  { nome: "São João de Ávila", titulo: "Mestre dos Pregadores", body: "Presbítero († 1569). Audi Filia. Doutor por Bento XVI em 07.10.2012." },
  { nome: "São Gregório de Narek", titulo: "Doutor Armênio", body: "Monge († c. 1003). Livro das Lamentações. Doutor por Francisco em 21.02.2015." },
  { nome: "Santo Irineu de Lião", titulo: "Doctor Unitatis", body: "Bispo († c. 202). Adversus Haereses. Doutor por Francisco em 21.01.2022." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Doctores Ecclesiae"
        title="Os Doutores da Igreja"
        intro="Santos cuja eminente doutrina e cuja santidade de vida foram reconhecidas solenemente pela Igreja como guias seguros para todos os fiéis. Hoje são trinta e sete."
      />

      <Section kicker="Introdução" title="O que é um Doutor da Igreja">
        <Prose>
          <p>
            O título de <strong>Doutor da Igreja</strong> (<em>Doctor Ecclesiae</em>) é concedido pelo Romano
            Pontífice — ou, em casos antigos, por um concílio ecumênico — a santos cuja obra teológica e
            espiritual constitui patrimônio doutrinal universal. Não se trata de honra meramente honorífica: é
            ato do Magistério que propõe esses mestres à <em>imitação</em> e ao <em>estudo</em> de toda a Igreja.
          </p>
          <p>
            Três critérios canônicos, fixados pela tradição e codificados a partir do Papa Bento XIV
            (<em>De Servorum Dei Beatificatione et Beatorum Canonizatione</em>, livro IV, parte II, cap. 11),
            são exigidos para a proclamação:
          </p>
          <ol>
            <li><strong><em>Eminens doctrina</em></strong> — doutrina eminente, conforme à fé católica e útil a toda a Igreja.</li>
            <li><strong><em>Insignis vitae sanctitas</em></strong> — santidade de vida insigne, atestada pela canonização.</li>
            <li><strong><em>Ecclesiae declaratio</em></strong> — declaração expressa do Romano Pontífice ou de concílio legítimo.</li>
          </ol>
          <p>
            O título distingue-se da <em>canonização</em> (que reconhece a santidade) e da função de
            <em> Padre da Igreja</em> (que se refere à proximidade temporal com a Tradição apostólica, à
            ortodoxia, à santidade e à aprovação eclesial nos primeiros séculos). Todos os Doutores são santos
            canonizados, mas nem todos os Padres são Doutores, e nem todos os Doutores são Padres.
          </p>

          <Pullquote cite="São João Paulo II — Divini Amoris Scientia (19.10.1997)">
            Sempre que a Igreja proclama Doutor um santo ou uma santa, quer reconhecer um carisma de sabedoria
            concedido pelo Espírito Santo para o bem de todo o Povo de Deus.
          </Pullquote>

          <h3>História do título</h3>
          <p>
            A primeira proclamação formal data de <strong>1295</strong>, quando o Papa <strong>Bonifácio VIII</strong>,
            pela bula <em>Gloriosus Deus</em>, elevou os quatro grandes Padres ocidentais —
            <em> Ambrósio, Agostinho, Jerônimo e Gregório Magno</em> — à dignidade de Doutores. Em
            <strong> 1568</strong>, São <strong>Pio V</strong>, ao reformar o Breviário, incluiu os quatro
            grandes Padres orientais: <em>Atanásio, Basílio, Gregório de Nazianzo e João Crisóstomo</em>.
            Tomás de Aquino foi proclamado por <strong>Pio V em 1567</strong> e <strong>Boaventura por Sisto V
            em 1588</strong>, formando os clássicos “oito Doutores”.
          </p>
          <p>
            A primeira proclamação de uma mulher ocorreu apenas em <strong>27 de setembro de 1970</strong>, quando
            o Papa <strong>Paulo VI</strong>, com a Carta Apostólica <em>Multiformis Sapientia Dei</em>, declarou
            <strong> Santa Teresa de Ávila</strong> Doutora — seguida, uma semana depois (04.10.1970), por
            <strong> Santa Catarina de Sena</strong> (<em>Mirabilis in Ecclesia Deus</em>). São João Paulo II
            acrescentou <strong>Santa Teresinha do Menino Jesus</strong> (1997, <em>Divini Amoris Scientia</em>).
            Bento XVI proclamou <strong>São João de Ávila</strong> e <strong>Santa Hildegarda de Bingen</strong>
            em 7 de outubro de 2012. Francisco proclamou <strong>São Gregório de Narek</strong> em 2015 e
            <strong> Santo Irineu de Lião</strong> em 2022, com o título inédito de <em>Doctor Unitatis</em>.
          </p>

          <h3>Os quatro Grandes Doutores do Ocidente (1295)</h3>
        </Prose>
        <div className="mt-10">
          <CardGrid cols={2}>
            {PRIMORDIAIS.map((d) => (
              <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
            ))}
          </CardGrid>
        </div>
      </Section>

      <Section kicker="Patrística oriental" title="Os quatro Grandes Doutores do Oriente (1568)">
        <CardGrid cols={2}>
          {ORIENTAIS.map((d) => (
            <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Escolástica e Idade Média" title="Doutores medievais e patrísticos posteriores">
        <CardGrid cols={3}>
          {MEDIEVAIS.map((d) => (
            <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Idade Moderna" title="Doutores da Reforma Católica e da modernidade">
        <CardGrid cols={3}>
          {MODERNOS.map((d) => (
            <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Século XX–XXI" title="Mulheres Doutoras e proclamações recentes">
        <CardGrid cols={3}>
          {MULHERES.map((d) => (
            <ContentCard key={d.nome} title={d.nome} subtitle={d.titulo}>{d.body}</ContentCard>
          ))}
        </CardGrid>

        <div className="mt-12">
          <Prose>
            <h3>Síntese: por que estudar os Doutores</h3>
            <p>
              Os Doutores não substituem a Escritura nem o Magistério vivo; iluminam-nos. Cada um responde, em
              seu tempo, a uma necessidade da Igreja: Atanásio à crise ariana, Agostinho à pelagiana, Tomás à
              síntese fé-razão, Teresa e João da Cruz à renovação mística, Teresinha à espiritualidade da
              confiança. <em>Lumen Gentium</em> 50 lembra que <em>a comunhão com os santos não nos une apenas a
              Cristo… mas robustece nossa fraqueza com o testemunho de tantos santos</em>.
            </p>
          </Prose>
        </div>

        <Sources
          items={[
            { label: "Bonifácio VIII, Bula Gloriosus Deus (1295)", ref: "primeira proclamação de Doutores" },
            { label: "Pio V, reforma do Breviário (1568)", ref: "inclusão dos quatro Doutores orientais" },
            { label: "Bento XIV, De Servorum Dei Beatificatione et Beatorum Canonizatione", ref: "Livro IV, parte II, cap. 11 — critérios" },
            { label: "Leão XIII, Encíclica Aeterni Patris (04.08.1879)", ref: "Tomás de Aquino como Doctor Communis" },
            { label: "Paulo VI, Carta Apostólica Multiformis Sapientia Dei (27.09.1970)", ref: "Santa Teresa de Ávila Doutora" },
            { label: "Paulo VI, Carta Apostólica Mirabilis in Ecclesia Deus (04.10.1970)", ref: "Santa Catarina de Sena Doutora" },
            { label: "São João Paulo II, Carta Apostólica Divini Amoris Scientia (19.10.1997)", ref: "Santa Teresinha do Menino Jesus Doutora" },
            { label: "Bento XVI, proclamações de 07.10.2012", ref: "São João de Ávila e Santa Hildegarda de Bingen" },
            { label: "Francisco, Decretos de 21.02.2015 e 21.01.2022", ref: "Gregório de Narek; Irineu de Lião (Doctor Unitatis)" },
            { label: "Concílio Vaticano II, Lumen Gentium", ref: "nn. 49–51" },
            { label: "Catecismo da Igreja Católica", ref: "§§ 688, 2030 (Doutores na Tradição viva)" },
          ]}
        />
      </Section>
    </div>
  );
}
