import emaus from "../assets/emaus.jpg";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Prose, Sources, Pullquote, Prancha } from "../components/PageShell";
import { LIVROS } from "../lib/data/biblia";
import manuscrito from "../assets/manuscrito.jpg";
import { useState } from "react";
import { Search } from "lucide-react";
import { ContinuarLeitura } from "@/components/portal/ContinuarLeitura";
import { RetomarLeitura } from "@/components/portal/RetomarLeitura";


export const Route = createFileRoute("/biblia/")({
  head: () => ({
    meta: [
      { title: "Bíblia Sagrada — 73 Livros Inspirados — Portal Católico" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/biblia" },
      { name: "description", content: "Os 73 livros da Bíblia Católica com introdução teológica completa: inspiração, cânon, Tradição, Magistério, exegese segundo o Catecismo, Dei Verbum e a Bíblia de Jerusalém." },
      { property: "og:title", content: "Bíblia Sagrada Católica — 73 livros inspirados" },
      { property: "og:description", content: "Antigo e Novo Testamento navegáveis, com introdução doutrinária baseada em Dei Verbum, Catecismo e Bíblia de Jerusalém." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/biblia" }],
  }),
  component: Page,
});

const GRUPOS_AT = ["Pentateuco", "Históricos", "Sapienciais", "Proféticos"];
const GRUPOS_NT = ["Evangelhos", "Atos", "Cartas Paulinas", "Cartas Católicas", "Apocalipse"];

function Page() {
  const [q, setQ] = useState("");
  const filtro = q.trim().toLowerCase();

  const filteredAT = GRUPOS_AT.map(g => ({
    grupo: g,
    livros: LIVROS.filter(l =>
      l.testamento === "AT" &&
      l.grupo === g &&
      (!filtro || l.nome.toLowerCase().includes(filtro) || l.abrev.toLowerCase().includes(filtro))
    )
  })).filter(g => g.livros.length > 0);

  const filteredNT = GRUPOS_NT.map(g => ({
    grupo: g,
    livros: LIVROS.filter(l =>
      l.testamento === "NT" &&
      l.grupo === g &&
      (!filtro || l.nome.toLowerCase().includes(filtro) || l.abrev.toLowerCase().includes(filtro))
    )
  })).filter(g => g.livros.length > 0);

  return (
    <div>
      <PageHero
        autoridade={["oficial", "historia"]}
        eyebrow="Sacra Scriptura"
        title="A Bíblia Sagrada"
        intro="Os 73 livros inspirados pelo Espírito Santo, transmitidos pela Igreja desde os Apóstolos. Palavra de Deus posta por escrito sob a moção do Espírito (CIC §§ 105–108)."
        image={manuscrito}
      />

      <div className="shell -mt-6 md:-mt-10">
        <RetomarLeitura className="mb-6" />
        <ContinuarLeitura />
      </div>


      <Section kicker="Introdução doutrinária" title="A Palavra de Deus posta por escrito">
        <Prose>
          <p>
            A Bíblia Sagrada é o conjunto dos <strong>73 livros</strong> que a Igreja Católica reconhece como{" "}
            <em> inspirados pelo Espírito Santo</em> e, por isso, tendo <em>Deus por autor</em> (Concílio Vaticano II,{" "}
            <em> Dei Verbum</em> 11). Não se trata de um livro entre outros, mas do testemunho escrito da única
            Revelação que Deus fez de Si mesmo e do seu desígnio salvífico, cuja plenitude é Jesus Cristo, Verbo
            encarnado (<em>DV</em> 2; <em>CIC</em> §§ 50–67).
          </p>
          <p>
            A Igreja venera as Escrituras como venera <em>o próprio Corpo do Senhor</em>, recebendo do altar único o{" "}
            <em> Pão da Vida tanto da Palavra de Deus quanto do Corpo de Cristo</em> (<em>DV</em> 21). Por isso o
            Catecismo ensina que <em>a fé cristã não é uma “religião do Livro”</em>; o cristianismo é a religião da
            Palavra de Deus, <em>Palavra não escrita e muda, mas Verbo encarnado e vivo</em> (<em>CIC</em> § 108,
            citando São Bernardo).
          </p>

          <Pullquote cite="Dei Verbum 21 — Concílio Vaticano II">
            A Igreja sempre venerou as divinas Escrituras como venera o próprio Corpo do Senhor.
          </Pullquote>

          <h3>1. Inspiração: Deus autor, o hagiógrafo verdadeiro autor</h3>
          <p>
            Inspiração não é ditado mecânico. Deus escolheu homens e <em>serviu-se deles em posse das suas próprias
            faculdades e capacidades</em>, agindo neles e por eles, para que escrevessem <em>como verdadeiros autores</em>{" "}
            tudo — e somente — o que Ele quis (<em>DV</em> 11; <em>CIC</em> § 106). Por isso os livros sagrados ensinam{" "}
            <em> com firmeza, fidelidade e sem erro a verdade que Deus, em vista da nossa salvação, quis fosse
            consignada nas Sagradas Letras</em> (<em>DV</em> 11; <em>CIC</em> § 107).
          </p>

          <h3>2. O Cânon dos 73 livros</h3>
          <p>
            <em>Cânon</em> (do grego <em>kanṓn</em>, “regra”) é a lista oficial dos livros inspirados. A Igreja
            Católica recebe <strong>46 livros</strong> no Antigo Testamento e <strong>27 livros</strong> no Novo
            Testamento. Essa lista já circulava como tradição canônica recebida pela Igreja antes de qualquer
            definição solene: é a mesma transmitida pelos concílios regionais africanos do final do séc. IV
            (Hipona 393, Cartago 397), pela carta do papa Inocêncio I a Exupério (405) e confirmada pelo Concílio
            de Florença (1442, <em>Cantate Domino</em>). Diante das controvérsias do séc. XVI sobre o cânon, o
            Concílio de Trento definiu-a solenemente como dogma de fé na <em>Sessão IV</em>, decreto{" "}
            <em> De Canonicis Scripturis</em> (8 de abril de 1546) — não criando um novo cânon, mas fechando com
            autoridade infalível o que já era a prática canônica recebida. A definição foi reafirmada pelo
            Concílio Vaticano I (<em> Dei Filius</em>, 1870) e pelo Vaticano II (<em>DV</em> 11).
          </p>
          <ul>
            <li><strong>Antigo Testamento (46):</strong> Pentateuco (5), Históricos (16, incluindo Tobias, Judite, 1–2 Macabeus), Sapienciais (7, incluindo Sabedoria e Eclesiástico/Sirácida) e Proféticos (18, incluindo Baruc).</li>
            <li><strong>Novo Testamento (27):</strong> 4 Evangelhos, Atos dos Apóstolos, 14 cartas reunidas sob o nome de Paulo no cânon latino (sendo Hebreus, de autoria anônima, tradicionalmente associada ao círculo paulino), 7 cartas católicas e o Apocalipse.</li>
          </ul>
          <p>
            Os sete livros que a tradição protestante chama de “apócrifos” são, para os católicos, os{" "}
            <em> deuterocanônicos</em>: Tobias, Judite, Sabedoria, Eclesiástico, Baruc, 1 e 2 Macabeus — além de
            partes de Ester e Daniel. Foram lidos pela Igreja desde a antiguidade sobretudo na tradição textual grega conhecida como{" "}
            <em> Septuaginta</em> (versão dos Setenta), de enorme importância no judaísmo de língua grega e de forte
            influência entre os primeiros cristãos. Diversas citações do Antigo Testamento presentes no Novo
            Testamento correspondem a essa tradição textual grega — o que não autoriza dizer, de modo simplificado,
            que a Septuaginta fosse “a Bíblia” única e uniforme da comunidade apostólica: o período conheceu real
            diversidade de textos, coleções e usos.
          </p>

          <h3>3. Escritura e Tradição: uma única fonte da Revelação</h3>
          <p>
            A Sagrada Escritura e a Sagrada Tradição <em>constituem um só sagrado depósito da Palavra de Deus
            confiado à Igreja</em> (<em>DV</em> 10). <em>Manam da mesma fonte divina</em>, formam <em>um só todo</em>{" "}
            e tendem ao mesmo fim (<em>DV</em> 9; <em>CIC</em> §§ 80–82). Interpretar a Escritura à margem da
            Tradição viva é, por isso, mutilá-la.
          </p>

          <h3>4. O Magistério, servo da Palavra</h3>
          <p>
            <em>O ofício de interpretar autenticamente a Palavra de Deus, escrita ou transmitida, foi confiado
            unicamente ao Magistério vivo da Igreja, cuja autoridade é exercida em nome de Jesus Cristo</em>{" "}
            (<em>DV</em> 10; <em>CIC</em> § 85). Este Magistério <em>não está acima da Palavra de Deus, mas a serve</em>:
            ensina apenas o que foi transmitido (<em>DV</em> 10; <em>CIC</em> § 86). Escritura, Tradição e Magistério
            estão de tal modo ligados que nenhum subsiste sem os outros (<em>DV</em> 10; <em>CIC</em> § 95).
          </p>

          <h3>5. Como ler a Sagrada Escritura</h3>
          <p>
            Para descobrir a intenção dos hagiógrafos, o leitor deve atender aos <em>gêneros literários</em>, ao
            contexto histórico e cultural, e aos modos de narrar próprios da época (<em>DV</em> 12; <em>CIC</em>
            §§ 109–110). Mas, sendo a Escritura <em>inspirada</em>, deve ser lida e interpretada <em>com o mesmo
            Espírito com que foi escrita</em> (<em>DV</em> 12; <em>CIC</em> § 111). O Catecismo recolhe três
            critérios fundamentais (<em>CIC</em> §§ 112–114):
          </p>
          <ol>
            <li><strong>A unidade de toda a Escritura</strong> — diversidade de livros, um só desígnio de Deus, do qual Cristo é o centro.</li>
            <li><strong>A Tradição viva de toda a Igreja</strong> — a Escritura é antes de tudo escrita no coração da Igreja do que em pergaminhos materiais.</li>
            <li><strong>A analogia da fé</strong> — a coesão das verdades da fé entre si e no projeto total da Revelação.</li>
          </ol>

          <h4>Sentidos da Escritura</h4>
          <p>
            A tradição patrística e medieval distingue, como recolhe o Catecismo (<em>CIC</em> §§ 115–119), dois
            grandes sentidos: o <strong>sentido literal</strong> (o significado das palavras, descoberto pela
            exegese segundo as regras da reta interpretação) e o <strong>sentido espiritual</strong>, que se
            subdivide em <em>alegórico</em> (Cristo), <em>moral</em> (como agir) e <em>anagógico</em>{" "}
            (realidades eternas), segundo o dístico medieval:
          </p>
          <blockquote>
            <em>Littera gesta docet, quid credas allegoria, moralis quid agas, quo tendas anagogia.</em>
            <br />
            “A letra ensina o que aconteceu; a alegoria, o que crer; a moral, o que fazer; a anagogia, para onde caminhar.”
          </blockquote>

          <h3>6. Antigo e Novo Testamento: uma só economia</h3>
          <p>
            <em>O Novo está oculto no Antigo, e o Antigo se torna claro no Novo</em> (Santo Agostinho,{" "}
            <em> Quaestiones in Heptateuchum</em> 2,73; citado em <em>DV</em> 16 e <em>CIC</em> § 129). A Igreja
            jamais rejeitou o Antigo Testamento, contra a antiga heresia marcionita: ele permanece{" "}
            <em> verdadeira Palavra de Deus</em> (<em>DV</em> 14; <em>CIC</em> § 121).
          </p>

          <h3>7. Da língua original ao texto que lemos</h3>
          <p>
            Os livros do Antigo Testamento foram escritos em <strong>hebraico</strong>, com seções em{" "}
            <strong> aramaico</strong> (partes de Daniel e Esdras) e alguns livros conservados em{" "}
            <strong> grego</strong> (Sabedoria, 2 Macabeus, entre outros). O Novo Testamento foi escrito em{" "}
            <strong> grego koiné</strong>. Nenhum autógrafo — o manuscrito original saído da mão do
            hagiógrafo — chegou até nós: o texto é reconstruído pela <em>crítica textual</em> a partir de
            milhares de testemunhos.
          </p>
          <ul>
            <li><strong>Texto Massorético</strong> — tradição hebraica fixada pelos massoretas entre os séculos VI e X (Códice de Alepo; Códice de Leningrado, 1008).</li>
            <li><strong>Manuscritos de Qumran</strong> — descobertos a partir de 1947, recuam em cerca de mil anos os testemunhos hebraicos e mostram a real pluralidade textual do judaísmo do Segundo Templo.</li>
            <li><strong>Tradição grega (Septuaginta)</strong> — conjunto de traduções e composições gregas de origens diversas, largamente usadas nas comunidades judaicas helenistas e pelos primeiros cristãos.</li>
            <li><strong>Grandes códices gregos do Novo Testamento</strong> — Vaticano (<em>B</em>, séc. IV), Sinaítico (<em>ℵ</em>, séc. IV), Alexandrino (<em>A</em>, séc. V), além de papiros anteriores (P<sup>52</sup>, P<sup>66</sup>, P<sup>75</sup>).</li>
            <li><strong>Vulgata</strong> — tradução latina em grande parte devida a São Jerônimo (a partir de 382), que para o Antigo Testamento recorreu ao hebraico (<em>veritas hebraica</em>).</li>
          </ul>
          <p>
            A Igreja não canoniza uma família textual, mas o <em>livro</em> inspirado; por isso encoraja o
            trabalho científico sobre os manuscritos e o recurso às línguas originais na tradução
            (<em>DV</em> 22; <em>Divino Afflante Spiritu</em>, Pio XII, 1943).
          </p>

          <h3>8. Inspiração, verdade e inerrância</h3>
          <p>
            A afirmação de que a Escritura ensina <em>sem erro</em> refere-se à <strong>verdade salvífica</strong>{" "}
            que Deus quis consignar (<em>DV</em> 11), não à precisão de um manual de ciências naturais ou de
            historiografia moderna. Pio XII já advertia que o hagiógrafo escreve segundo os modos de falar
            do seu tempo, e que os relatos populares e as aproximações da linguagem cotidiana não são erros,
            mas gêneros (<em>Divino Afflante Spiritu</em> 35–39). Do mesmo modo, os textos que narram
            violência ou práticas moralmente imperfeitas pertencem à pedagogia divina progressiva: são{" "}
            <em> imperfeitos e provisórios</em> (<em>DV</em> 15) e leem-se à luz de Cristo.
          </p>

          <h3>9. Tipologia: Cristo como chave de toda a Escritura</h3>
          <p>
            A leitura cristã reconhece nas figuras do Antigo Testamento <em>tipos</em> que anunciam Cristo e a
            Igreja (<em>CIC</em> §§ 128–130): o cordeiro pascal e a Cruz, o dilúvio e o Batismo, o maná e a
            Eucaristia, Isaac e o Filho entregue, Jonas e os três dias no sepulcro, a serpente de bronze e o
            Filho do Homem elevado (Jo 3,14-15). A tipologia não anula o sentido literal nem esvazia o valor
            próprio do Antigo Testamento: <em>as duas Alianças são iluminadas mutuamente</em>.
          </p>

          <h3>10. Os deuterocanônicos, livro por livro</h3>
          <ul>
            <li><strong>Tobias</strong> — piedade familiar, casamento, sepultura dos mortos e providência divina pela mediação angélica.</li>
            <li><strong>Judite</strong> — a libertação do povo pela mão de uma mulher fiel; narrativa edificante de forte estilização literária.</li>
            <li><strong>Sabedoria</strong> — composto em grego em Alexandria (séc. I a.C.); afirma explicitamente a imortalidade dos justos (Sb 3,1-4).</li>
            <li><strong>Eclesiástico (Sirácida)</strong> — ética sapiencial de Ben Sirá, traduzida ao grego pelo neto do autor (prólogo, c. 132 a.C.).</li>
            <li><strong>Baruc</strong> — inclui a Carta de Jeremias (cap. 6); confissão dos pecados e esperança do retorno do exílio.</li>
            <li><strong>1 Macabeus</strong> — história da resistência macabeia (167–134 a.C.), fonte histórica de primeira ordem.</li>
            <li><strong>2 Macabeus</strong> — teologia da ressurreição dos mortos (2Mc 7) e do sufrágio pelos defuntos (2Mc 12,43-46), base escriturística invocada pela Igreja a respeito da oração pelos mortos.</li>
            <li><strong>Acréscimos</strong> — trechos gregos de Ester e de Daniel (oração de Azarias, cântico dos três jovens, Susana, Bel e o dragão).</li>
          </ul>

          <h3>11. A Escritura na liturgia: o Lecionário</h3>
          <p>
            O lugar primeiro em que a Igreja lê a Bíblia é a liturgia. A reforma conciliar quis que{" "}
            <em> os tesouros da Bíblia fossem abertos com maior largueza</em> (<em>Sacrosanctum Concilium</em> 51),
            criando o Lecionário em ciclo dominical de três anos — <strong>Ano A</strong> (Mateus),{" "}
            <strong> B</strong> (Marcos), <strong>C</strong> (Lucas), com João distribuído nos tempos fortes —
            e um ciclo ferial de dois anos (I e II). Assim, a leitura orante pessoal caminha em harmonia com a
            leitura eclesial: a mesma Palavra proclamada no altar é ruminada no coração.
          </p>

          <h3>12. Versões oficiais e as edições deste portal</h3>
          <p>
            O texto oficial da Igreja latina é a <strong>Nova Vulgata</strong>, promulgada por São João Paulo II
            em 1979 (<em>Scripturarum Thesaurus</em>). Para o uso litúrgico em português brasileiro vigora a
            tradução aprovada pela <em>Conferência Nacional dos Bispos do Brasil</em> (3ª edição, 2023). Entre
            as edições católicas de estudo em português destacam-se a <strong>Bíblia de Jerusalém</strong>{" "}
            (Paulus), a <strong>Bíblia do Peregrino</strong> (Alonso Schökel) e a <strong>TEB</strong>.
          </p>
          <p>
            Neste portal, a leitura capítulo a capítulo é servida <strong>dentro do próprio site</strong>, a
            partir de edições em <strong>domínio público</strong> — Almeida (português), Douay-Rheims (inglês) e
            Vulgata latina, esta última cobrindo também os deuterocanônicos. Traduções ainda protegidas por
            direito autoral (como a Ave-Maria e a Nova Vulgata) não são reproduzidas: quando citadas, remete-se
            à edição oficial.
          </p>

          <h3>13. Lectio Divina: quatro degraus</h3>
          <ol>
            <li><strong>Lectio</strong> — ler o texto com atenção: o que diz o texto em si?</li>
            <li><strong>Meditatio</strong> — meditar: o que diz o texto a mim, hoje?</li>
            <li><strong>Oratio</strong> — responder a Deus com a própria Palavra recebida.</li>
            <li><strong>Contemplatio</strong> — permanecer em silêncio no olhar de Deus, deixando que a Palavra transforme o modo de ver e de agir (cf. Bento XVI, <em>Verbum Domini</em> 86–87).</li>
          </ol>

          <h3>14. A Bíblia na vida do fiel</h3>
          <p>
            <em>O desconhecimento das Escrituras é desconhecimento de Cristo</em> (São Jerônimo, <em>Comentário a
            Isaías</em>, Prólogo; citado em <em>DV</em> 25 e <em>CIC</em> § 133). Por isso a Igreja recomenda
            insistentemente a leitura assídua, pessoal e comunitária, sobretudo na forma da <em>Lectio Divina</em>
            — leitura, meditação, oração e contemplação — , e a frequência aos sacramentos, sobretudo à
            Eucaristia, em que a Palavra encontra a sua plenitude. Desde 2019, o <em>Domingo da Palavra de
            Deus</em> (III domingo do Tempo Comum), instituído por Francisco no motu proprio{" "}
            <em> Aperuit Illis</em>, dá a esse convite forma litúrgica anual.
          </p>

        </Prose>

        <Prancha
          image={emaus}
          alt="A Ceia em Emaús: Cristo abençoa o pão diante de dois discípulos surpresos."
          legenda="“Não estava ardendo o nosso coração quando ele nos explicava as Escrituras?” (Lc 24,32) — a Escritura se abre plenamente na liturgia e na Eucaristia (CIC § 1346)."
        />

        <Sources
          items={[
            { label: "Concílio Vaticano II, Constituição Dogmática Dei Verbum (1965)", ref: "nn. 2, 9–12, 14, 16, 21, 25" },
            { label: "Catecismo da Igreja Católica (1992/1997)", ref: "§§ 50–67, 80–141" },
            { label: "Concílio de Trento, Sessão IV (1546), Decreto De Canonicis Scripturis", ref: "DH 1501–1505" },
            { label: "Concílio Vaticano I, Constituição Dogmática Dei Filius (1870)", ref: "cap. 2" },
            { label: "São João Paulo II, Constituição Apostólica Scripturarum Thesaurus (1979)", ref: "promulgação da Nova Vulgata" },
            { label: "Pontifícia Comissão Bíblica, A Interpretação da Bíblia na Igreja (1993)", ref: "I–IV" },
            { label: "Pio XII, Encíclica Divino Afflante Spiritu (30.09.1943)", ref: "nn. 15–39 — línguas originais, gêneros literários e crítica textual" },
            { label: "Bento XVI, Exortação Apostólica Verbum Domini (30.09.2010)", ref: "nn. 86–87 — Lectio Divina" },
            { label: "Francisco, Motu proprio Aperuit Illis (30.09.2019)", ref: "instituição do Domingo da Palavra de Deus" },
            { label: "Concílio Vaticano II, Sacrosanctum Concilium (1963)", ref: "n. 51 — abertura dos tesouros bíblicos na liturgia" },
            { label: "Ordo Lectionum Missae, editio typica altera (1981)", ref: "ciclos dominicais A–B–C e ciclo ferial I–II" },

            { label: "Bíblia de Jerusalém, Nova edição revista e ampliada", ref: "Paulus, São Paulo" },
            { label: "São Jerônimo, Commentariorum in Isaiam Prologus", ref: "PL 24, 17" },
            { label: "Santo Agostinho, Quaestiones in Heptateuchum 2, 73", ref: "PL 34, 623" },
          ]}
        />
      </Section>

      <div className="shell pt-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="relative max-w-[28rem] w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gold/60" />
            <input
              aria-label="Buscar livro da Bíblia"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar livro... (ex: Salmos, Mt)"
              className="w-full pl-11 pr-4 py-3 bg-card border border-gold/25 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold"
            />
          </div>
          <Link
            to="/biblia/leituras"
            className="btn-base btn-gold gap-2 label-btn"
          >
            Leituras diárias
          </Link>
        </div>
      </div>

      <Section kicker="Antigo Testamento" title="46 livros — Da Criação ao Messias">
        <Prose>
          <p>
            O Antigo Testamento é <em>verdadeira Palavra de Deus</em> e parte irrenunciável da Sagrada Escritura
            (<em>DV</em> 14). Recolhe a longa pedagogia divina que prepara e profetiza a vinda de Cristo: a
            criação e a queda, a vocação dos patriarcas, o êxodo, a aliança no Sinai, a monarquia, o exílio, o
            retorno e a expectativa messiânica. Estruturalmente, agrupa-se em quatro blocos: <strong>Pentateuco</strong>{" "}
            (a <em>Torá</em>), <strong>Históricos</strong>, <strong>Sapienciais</strong> e <strong>Proféticos</strong>.
          </p>
        </Prose>
        <div className="space-y-10 mt-10">
          {filteredAT.map(({ grupo, livros }) => (
            <div key={grupo}>
              <h3 className="kicker mb-4">{grupo}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-gold/15">
                {livros.map((l) => (
                  <Link
                    key={l.slug}
                    to="/biblia/$livro"
                    params={{ livro: l.slug }}
                    className="bg-background hover:bg-card p-4 transition-colors group"
                  >
                    <div className="font-display text-base text-foreground group-hover:text-gold">
                      {l.nome}
                    </div>
                    <div className="text-step--2 mt-1 text-muted-foreground tracking-wider uppercase">
                      {l.abrev} · {l.capitulos} cap.
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Novo Testamento" title="27 livros — A Boa Nova de Cristo">
        <Prose>
          <p>
            O Novo Testamento é o <em>coração de todas as Escrituras</em>, porque tem por objeto central{" "}
            <em> Jesus Cristo, Verbo encarnado, nosso Salvador</em> (<em>CIC</em> § 124, citando <em>DV</em> 17).
            Entre todos os livros sagrados, mesmo do Novo Testamento, os <strong>Evangelhos</strong> ocupam um lugar
            único: <em>são o testemunho principal sobre a vida e a doutrina do Verbo encarnado</em> (<em>DV</em> 18;{" "}
            <em> CIC</em> § 125). Seguem-se os <strong>Atos dos Apóstolos</strong>, as <strong>Cartas paulinas</strong>{" "}
            (14 cartas reunidas sob o nome de Paulo no cânon latino, incluindo a anônima Hebreus), as{" "}
            <strong> Cartas católicas</strong> (7) e o <strong>Apocalipse</strong>.
          </p>
        </Prose>
        <div className="space-y-10 mt-10">
          {filteredNT.map(({ grupo, livros }) => (
            <div key={grupo}>
              <h3 className="kicker mb-4">{grupo}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-gold/15">
                {livros.map((l) => (
                  <Link
                    key={l.slug}
                    to="/biblia/$livro"
                    params={{ livro: l.slug }}
                    className="bg-background hover:bg-card p-4 transition-colors group"
                  >
                    <div className="font-display text-base text-foreground group-hover:text-gold">
                      {l.nome}
                    </div>
                    <div className="text-step--2 mt-1 text-muted-foreground tracking-wider uppercase">
                      {l.abrev} · {l.capitulos} cap.
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
