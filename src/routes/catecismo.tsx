import trento from "@/assets/concilio-trento.jpg";
import { createFileRoute, Link } from "@tanstack/react-router";
import biblioteca from "@/assets/biblioteca.jpg";
import { PageHero, Section, Prose, Sources, Pullquote, Prancha } from "../components/PageShell";
import { Termo } from "../components/Termo";
import { PARTES, SECOES, VATICAN_URL } from "../lib/data/catecismo";
import { ExternalLink } from "lucide-react";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/catecismo")({
  head: () => ({
    meta: [
      { title: "Catecismo da Igreja Católica — Exposição orgânica da fé" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/catecismo" },
      { name: "description", content: "Catecismo da Igreja Católica: história, estrutura, autoridade magisterial, as quatro partes (Credo, Sacramentos, Vida em Cristo, Oração) e fontes oficiais (Fidei Depositum, Laetamur Magnopere)." },
      { name: "keywords", content: keywordsPara(["catecismo"]) },
      { property: "og:title", content: "Catecismo da Igreja Católica" },
      { property: "og:description", content: "Os 2.865 parágrafos da fé católica, organizados em quatro partes — promulgado por São João Paulo II." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/catecismo" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHero
        autoridade={["oficial"]}
        eyebrow="Catechismus Catholicae Ecclesiae"
        title="O Catecismo"
        intro="Texto de referência seguro e autêntico para o ensino da doutrina católica. Promulgado por São João Paulo II em 1992 (Fidei Depositum) e revisado em 1997 (Laetamur Magnopere)."
      image={biblioteca}
      />

      <Section kicker="Introdução doutrinária" title="O que é o Catecismo da Igreja Católica">
        <Prose>
          <p>
            O <strong>Catecismo da Igreja Católica</strong> (CIC) é, nas palavras de São João Paulo II, <em>uma
            exposição da fé da Igreja e da doutrina católica, atestadas e iluminadas pela Sagrada Escritura, pela
            <Termo termo="tradicao"> Tradição</Termo> apostólica e pelo <Termo termo="magisterio">Magistério</Termo> da Igreja</em>, oferecido <em>como texto de referência seguro e
            autêntico para o ensino da doutrina católica</em> (Constituição Apostólica <em>Fidei Depositum</em>, 11
            de outubro de 1992, n. III–IV). É um <strong>texto oficial de referência para o ensino da doutrina
            católica</strong>, promulgado pelo Papa São João Paulo II e destinado a apresentar de maneira orgânica e
            sistemática os conteúdos fundamentais da fé e da moral católicas, sendo dirigido <em>a toda a Igreja</em>.
          </p>
          <p>
            Sua origem remonta ao <strong>Sínodo Extraordinário dos Bispos de 1985</strong>, no vigésimo
            aniversário do encerramento do Concílio Vaticano II, no qual os Padres pediram <em>um catecismo ou
            compêndio de toda a doutrina católica</em> que servisse de referência para os catecismos locais
            (Relatório final, II, B, a, 4). Em 1986, o Papa confiou a redação a uma comissão de doze cardeais e
            bispos presidida pelo então cardeal <strong>Joseph Ratzinger</strong>. Após seis anos de trabalho e
            consulta a todo o episcopado, o texto foi promulgado em latim como <em>editio typica</em> em 1997
            (<em>Laetamur Magnopere</em>, 15 de agosto de 1997), tornando-se a versão definitiva.
          </p>

          <Pullquote cite="Fidei Depositum, IV — São João Paulo II">
            Declaro-o um texto de referência seguro e autêntico para o ensino da doutrina católica e, muito
            particularmente, para a elaboração dos catecismos locais.
          </Pullquote>

          <h3>1. Estrutura quaternária — a “sinfonia” da fé</h3>
          <p>
            O Catecismo retoma a estrutura clássica dos grandes catecismos da Igreja, em particular do <em>Catecismo
            Romano</em> (1566), publicado após o Concílio de Trento. Organiza toda a vida cristã em quatro pilares
            inseparáveis (<em>CIC</em> §§ 13–17):
          </p>
          <ol>
            <li><strong>A profissão da fé</strong> — o que a Igreja crê (Credo, §§ 26–1065).</li>
            <li><strong>A celebração do mistério cristão</strong> — o que a Igreja celebra (Liturgia e Sacramentos, §§ 1066–1690).</li>
            <li><strong>A vida em Cristo</strong> — o que a Igreja vive (vida moral, Decálogo, §§ 1691–2557).</li>
            <li><strong>A oração cristã</strong> — o que a Igreja reza (oração e Pai-Nosso, §§ 2558–2865).</li>
          </ol>
          <p>
            São, ao todo, <strong>2.865 parágrafos</strong>, em uma exposição orgânica, na qual cada parte ilumina
            as outras: a fé professada se celebra nos sacramentos, se vive na caridade e se respira na oração
            (<em>CIC</em> § 2558).
          </p>

          <h3>2. Autoridade magisterial</h3>
          <p>
            O CIC <em>não é um símbolo de fé novo, mas, em fidelidade total à Tradição apostólica, uma exposição
            completa e sistemática da fé católica</em> (<em>Fidei Depositum</em>, III). Reflete, portanto, a
            doutrina da Igreja com a autoridade que cada uma das fontes citadas possui — Escritura, concílios
            ecumênicos, definições dogmáticas, magistério pontifício, Padres, Doutores, liturgias e cânones.
            A Congregação para a Doutrina da Fé esclareceu, em <em>Nota Doutrinal sobre o Catecismo</em> (1992),
            que o texto deve ser recebido <em>com religioso assentimento da vontade e da inteligência</em>{" "}
            (cf. <em>Lumen Gentium</em> 25).
          </p>

          <h3>3. As fontes do Catecismo</h3>
          <p>
            Cada parágrafo do CIC se sustenta em fontes magisteriais explicitamente citadas:
          </p>
          <ul>
            <li><strong>Sagrada Escritura</strong> — vista <em>como a alma da Sagrada Teologia</em> (<em>DV</em> 24; <em>CIC</em> § 132).</li>
            <li><strong>Padres da Igreja e Doutores</strong> — Agostinho, Crisóstomo, Atanásio, Cipriano, Cirilo, Tomás de Aquino, entre outros.</li>
            <li><strong>Concílios Ecumênicos</strong> — em particular Niceia I (325), Constantinopla I (381), Calcedônia (451), Trento (1545–1563), Vaticano I (1869–1870) e Vaticano II (1962–1965).</li>
            <li><strong>Magistério pontifício</strong> — encíclicas, constituições apostólicas e exortações.</li>
            <li><strong>Liturgia</strong> — segundo o princípio patrístico <em>lex orandi, lex credendi</em> (<em>CIC</em> § 1124).</li>
            <li><strong>Cânones da Igreja</strong> — Código de Direito Canônico (1983) e Código dos Cânones das Igrejas Orientais (1990).</li>
          </ul>

          <h3>4. Edições e revisão de 1997</h3>
          <p>
            A primeira edição foi publicada em francês em 1992. Após cinco anos de uso e tradução em diversas
            línguas, foi preparada a <em>editio typica</em> em latim (1997), revisada para garantir uniformidade
            doutrinal e linguística. As principais modificações concentraram-se em precisões teológicas; a
            mais conhecida é a do § 2267 (pena de morte). A nova redação desse parágrafo foi aprovada pelo Papa
            Francisco em 11 de maio de 2018 e promulgada pela autoridade competente da Santa Sé por{" "}
            <em>rescriptum</em> da Congregação para a Doutrina da Fé de 1º de agosto de 2018 — não por
            iniciativa própria do Dicastério. O texto atual ensina que a pena de morte é{" "}
            <em> inadmissível</em>, porque atenta contra a inviolabilidade e a dignidade da pessoa, e que a
            Igreja se empenha por sua abolição em todo o mundo.
          </p>

          <h3>5. Compêndio e Youcat</h3>
          <p>
            Para tornar o CIC mais acessível, Bento XVI promulgou em 2005 o <strong>Compêndio do Catecismo da
            Igreja Católica</strong> (<em>motu proprio</em> de 28 de junho de 2005), em forma de perguntas e
            respostas. Em 2011, com aprovação eclesiástica, foi publicado o <strong>Youcat</strong>, voltado aos
            jovens, com prefácio do próprio Bento XVI.
          </p>

          <h3>6. Como utilizar o Catecismo</h3>
          <p>
            O próprio prólogo do CIC (§§ 18–22) recomenda uma leitura que respeite a sua estrutura orgânica: os{" "}
            <em> remetimentos marginais</em> (entre parênteses) interligam parágrafos correlatos; os{" "}
            <em> in summa</em> ao final de cada bloco condensam a doutrina; e as citações em itálico, das fontes
            primárias, permitem ao leitor remontar à Escritura, aos Padres e aos documentos magisteriais. Para
            estudo aprofundado, recomenda-se sempre confrontar o texto com o original em{" "}
            <em> vatican.va</em> e com a tradução brasileira aprovada pela CNBB (Loyola/Vozes/Paulinas/Paulus, 1999).
          </p>
        </Prose>

        <Prancha
          image={trento}
          alt="Sessão do Concílio de Trento reunida na catedral, com bispos e teólogos."
          legenda="O Concílio de Trento (1545–1563) produziu o Catecismo Romano, antecessor direto do Catecismo de 1992 pedido pelo Sínodo de 1985."
        />

        <Sources
          items={[
            { label: "São João Paulo II, Constituição Apostólica Fidei Depositum (11.10.1992)", ref: "promulgação do CIC" },
            { label: "São João Paulo II, Carta Apostólica Laetamur Magnopere (15.08.1997)", ref: "aprovação da editio typica latina" },
            { label: "Catecismo da Igreja Católica, Prólogo", ref: "§§ 1–25" },
            { label: "Sínodo Extraordinário dos Bispos (1985), Relatório final", ref: "II, B, a, 4" },
            { label: "Concílio Vaticano II, Lumen Gentium", ref: "n. 25 (recepção do Magistério)" },
            { label: "Concílio Vaticano II, Dei Verbum", ref: "nn. 10, 24" },
            { label: "Catecismo Romano (Catechismus ex decreto Concilii Tridentini, 1566)", ref: "modelo estrutural" },
            { label: "Congregação para a Doutrina da Fé, Rescriptum sobre o § 2267 (01.08.2018)", ref: "pena de morte inadmissível" },
            { label: "Bento XVI, Motu proprio de promulgação do Compêndio (28.06.2005)", ref: "Compêndio do CIC" },
          ]}
        />
      </Section>


      <Section kicker="As quatro partes" title="A estrutura do Catecismo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/15">
          {PARTES.map((p) => (
            <Link
              key={p.slug}
              to="/catecismo/$parte"
              params={{ parte: p.slug }}
              className="group bg-card hover:bg-background p-8 transition-colors"
            >
              <p className="kicker mb-3">
                Parte {p.num} · {p.paragrafos}
              </p>
              <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-gold">
                {p.titulo}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.resumo}</p>
              <span className="mt-6 inline-block kicker group-hover:text-gold">
                Explorar →
              </span>
            </Link>
          ))}
        </div>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 13-17 (as quatro partes e sua unidade orgânica)" },
            { label: "São João Paulo II, Fidei Depositum (11.10.1992)", ref: "n. III (plano do Catecismo)" },
          ]}
        />
      </Section>


      <Section kicker="Seções principais" title="Mapa detalhado">
        <div className="space-y-4">
          {SECOES.map((s) => (
            <div key={s.slug} className="border border-gold/20 p-6 bg-card">
              <p className="kicker mb-2">
                Parte {s.parte} · {s.paragrafos}
              </p>
              <h4 className="font-display text-xl text-foreground">{s.titulo}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.resumo}</p>
            </div>
          ))}
        </div>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica (editio typica latina, 1997)", ref: "índice sistemático das quatro partes e seções" },
            { label: "Compêndio do Catecismo da Igreja Católica (2005)", ref: "correspondência abreviada com as seções do CIC" },
          ]}
        />
      </Section>

      <Section kicker="Recepção" title="Hierarquia das verdades e graus de assentimento">
        <Prose>
          <p>
            Nem toda afirmação contida no Catecismo tem o mesmo peso. O próprio Concílio Vaticano II lembra que{" "}
            <em> “existe uma ordem ou ‘hierarquia’ das verdades da doutrina católica”</em>{" "}
            (<em>Unitatis Redintegratio</em> 11) — todas verdadeiras, mas não todas igualmente centrais nem
            igualmente definidas. Ler o CIC com precisão exige distinguir os graus com que a Igreja propõe o que
            ensina.
          </p>
          <ol>
            <li>
              <strong>Dogmas de fé divina e católica</strong> — verdades reveladas propostas como tais pelo
              Magistério solene ou pelo ordinário e universal. Exigem o assentimento de <em>fé teologal</em>;
              negá-los é heresia (cân. 750 § 1; CIC § 88).
            </li>
            <li>
              <strong>Doutrinas definitivamente propostas</strong> — verdades necessariamente ligadas à Revelação,
              declaradas de modo definitivo. Requerem assentimento firme e definitivo (cân. 750 § 2, acrescido por
              São João Paulo II com o <em>motu proprio</em> <em>Ad Tuendam Fidem</em>, 18.05.1998).
            </li>
            <li>
              <strong>Ensino autêntico não definitivo</strong> — doutrina do Magistério ordinário que pede{" "}
              <em> obsequium religiosum</em>, assentimento religioso da vontade e da inteligência
              (<em>Lumen Gentium</em> 25; cân. 752).
            </li>
            <li>
              <strong>Disciplina e aplicações prudenciais</strong> — normas canônicas e liturgias, vinculantes
              enquanto vigentes, mas por natureza mutáveis (por exemplo, a duração do jejum eucarístico).
            </li>
          </ol>
          <p>
            A Congregação para a Doutrina da Fé explicou essa graduação na Instrução <em>Donum Veritatis</em>{" "}
            (24.05.1990) e na <em>Nota doutrinal ilustrativa da fórmula conclusiva da Professio fidei</em> (1998).
            Na prática: quando o CIC cita um concílio ecumênico definindo, estamos no primeiro nível; quando expõe
            uma tradição espiritual ou uma aplicação pastoral, estamos nos últimos. Por isso este portal marca cada
            bloco com selos de confiabilidade — para que o leitor saiba, em cada linha, se lê ensino definido,
            tradição, história ou opinião teológica.
          </p>
          <h3>O que o Catecismo não é</h3>
          <p>
            O CIC não é uma nova Revelação, não é um manual de teologia especulativa, nem substitui os catecismos
            locais e a catequese viva das dioceses — foi dado precisamente <em>como referência</em> para eles
            (<em>Fidei Depositum</em>, IV). Também não é um texto neutro de história das religiões: expõe a fé da
            Igreja com autoridade, remetendo sempre às fontes que a sustentam.
          </p>
        </Prose>

        <Sources
          items={[
            { label: "Concílio Vaticano II, Unitatis Redintegratio (1964)", ref: "n. 11 (hierarquia das verdades)" },
            { label: "Concílio Vaticano II, Lumen Gentium (1964)", ref: "n. 25 (Magistério e assentimento)" },
            { label: "Código de Direito Canônico (1983)", ref: "cân. 750-752 (graus de adesão)" },
            { label: "São João Paulo II, Motu proprio Ad Tuendam Fidem (18.05.1998)", ref: "acréscimo do cân. 750 § 2" },
            { label: "Congregação para a Doutrina da Fé, Instrução Donum Veritatis (24.05.1990)", ref: "vocação eclesial do teólogo" },
            { label: "Congregação para a Doutrina da Fé, Nota doutrinal sobre a Professio fidei (1998)", ref: "explicação dos três graus de assentimento" },
          ]}
        />
      </Section>


      <Section kicker="Fonte oficial">
        <a
          href={VATICAN_URL}
          target="_blank"
          rel="noopener"
          className="btn-base btn-gold h-auto min-h-11 max-w-full gap-2 whitespace-normal py-3 text-center label-btn"
        >
          <ExternalLink className="size-4" /> Texto integral em vatican.va
        </a>
      </Section>
    </div>
  );
}
