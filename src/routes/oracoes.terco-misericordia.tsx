import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard, Prose, Sources, Pullquote } from "../components/PageShell";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";
import { Relacionados } from "../components/Relacionados";
import cristo from "@/assets/cristo.jpg";


export const Route = createFileRoute("/oracoes/terco-misericordia")({
  head: () => ({
    meta: [
      { title: "Terço da Divina Misericórdia — como rezar, história e fontes" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/terco-misericordia" },
      { name: "description", content: "Terço da Divina Misericórdia: modo de rezar passo a passo, a Hora da Misericórdia, a novena, a história de Santa Faustina e o que a Igreja de fato ensina sobre esta devoção." },
      { property: "og:title", content: "Terço da Divina Misericórdia" },
      { property: "og:description", content: "Modo de rezar, história, fundamento doutrinal e fontes magisteriais da devoção à Divina Misericórdia." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/terco-misericordia" }],
  }),
  component: Page,
});

const NOVENA_MISERICORDIA = [
  { dia: "1º dia (Sexta-feira Santa)", intencao: "Toda a humanidade, especialmente os pecadores." },
  { dia: "2º dia", intencao: "As almas dos sacerdotes e religiosos." },
  { dia: "3º dia", intencao: "Todas as almas devotas e fiéis." },
  { dia: "4º dia", intencao: "Os que não creem em Deus e os que ainda não conhecem Cristo." },
  { dia: "5º dia", intencao: "As almas dos que se separaram da Igreja." },
  { dia: "6º dia", intencao: "As almas mansas e humildes e as das crianças." },
  { dia: "7º dia", intencao: "As almas que veneram e glorificam a misericórdia divina." },
  { dia: "8º dia", intencao: "As almas detidas no purgatório." },
  { dia: "9º dia", intencao: "As almas tíbias." },
];

function Page() {
  return (
    <div>
      <PageHero
        image={cristo}
        eyebrow="Misericordia"
        title="Terço da Divina Misericórdia"
        intro="Oração breve, cristocêntrica e reparadora, difundida a partir do Diário de Santa Faustina Kowalska (1905–1938). Reza-se em qualquer hora, e de modo particular às 15h — a Hora da Misericórdia."
      />

      <Section kicker="Como rezar" title="Nas contas comuns do Rosário">
        <CardGrid cols={2}>
          <ContentCard title="Início">
            <p>Sinal da Cruz · Pai-Nosso · Ave-Maria · Credo dos Apóstolos.</p>
          </ContentCard>
          <ContentCard title="Nas contas grandes (5×)">
            <p className="italic">“Eterno Pai, eu Vos ofereço o Corpo e Sangue, Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.”</p>
          </ContentCard>
          <ContentCard title="Nas contas pequenas (10× por dezena)">
            <p className="italic">“Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.”</p>
          </ContentCard>
          <ContentCard title="No final (3×)">
            <p className="italic">“Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.”</p>
          </ContentCard>
        </CardGrid>
        <div className="surface-card-featured mt-8 p-card">
          <p className="kicker mb-2">Hora da Misericórdia · 15h</p>
          <p className="text-foreground/80 italic">“Nesta hora não recusarei nada à alma que Me pedir pela Minha Paixão.” (Diário, 1320)</p>
        </div>
      </Section>

      <Section kicker="Fundamento" title="O que a Igreja ensina sobre a misericórdia divina">
        <Prose>
          <NotaConfiabilidade nivel="oficial">
            A misericórdia de Deus é doutrina de fé, ensinada pela Escritura e pelo Catecismo. A{" "}
            <em> forma</em> desta devoção (terço, coroa, imagem, Hora da Misericórdia) nasce de uma
            revelação privada aprovada — o que é coisa distinta: nenhuma revelação privada acrescenta algo
            ao depósito da fé.
          </NotaConfiabilidade>

          <p>
            A misericórdia é o nome próprio do agir de Deus para com o pecador: <em>“Deus, sendo rico em
            misericórdia, pelo grande amor com que nos amou… deu-nos vida com Cristo”</em> (Ef 2,4–5). O
            Catecismo ensina que <em>Deus é fiel à sua promessa e não deixa de manifestar sua misericórdia</em>,
            e que a Paixão é a revelação suprema desse amor (<em>CIC</em> §§ 210–211, 604, 1846–1848).
            São João Paulo II dedicou à matéria a encíclica <em>Dives in Misericordia</em> (30.11.1980),
            onde define a misericórdia como <em>“a segunda dimensão do amor”</em>, aquela que se volta ao
            mal, ao sofrimento e à culpa (nn. 4–8).
          </p>

          <Pullquote cite="São João Paulo II — Homilia da canonização de Santa Faustina, 30.04.2000">
            Não há para o homem outra fonte de esperança senão a misericórdia de Deus.
          </Pullquote>

          <h3>Sentido teológico das quatro fórmulas</h3>
          <ul>
            <li><strong>“Eterno Pai, eu Vos ofereço…”</strong> — não é um novo sacrifício, mas a união da oração do fiel ao único sacrifício de Cristo, atualizado na Eucaristia (<em>CIC</em> §§ 1366–1368; Hb 9,11–14).</li>
            <li><strong>“Pela Sua dolorosa Paixão…”</strong> — intercessão fundada nos méritos da Cruz, e não em fórmula mágica; toda oração cristã é feita <em>por Cristo, com Cristo e em Cristo</em>.</li>
            <li><strong>“Deus Santo, Deus Forte, Deus Imortal…”</strong> — é o <em>Trisagion</em>, aclamação antiquíssima da liturgia oriental (séc. V), que ecoa Isaías 6,3 e Apocalipse 4,8.</li>
            <li><strong>“…e do mundo inteiro”</strong> — dimensão intercessória e universal: reza-se por si e pela Igreja e pelo mundo (1Tm 2,1–4).</li>
          </ul>

          <h3>História e reconhecimento eclesial</h3>
          <NotaConfiabilidade nivel="historia">
            Datas e documentos verificáveis do processo eclesial que levou ao reconhecimento da devoção.
          </NotaConfiabilidade>
          <ul>
            <li><strong>1931–1938</strong> — Helena Kowalska, religiosa da Congregação das Irmãs de Nossa Senhora da Misericórdia, em Płock, Vilna e Cracóvia, registra no <em>Diário</em> as experiências que originam a devoção.</li>
            <li><strong>1959</strong> — o Santo Ofício proíbe a difusão da devoção, sobretudo por problemas de tradução e de leitura dos escritos.</li>
            <li><strong>1978</strong> — a Congregação para a Doutrina da Fé revoga a proibição (notificação de 15.04.1978), após o exame promovido pelo cardeal Karol Wojtyła em Cracóvia.</li>
            <li><strong>1993</strong> — beatificação; <strong>30.04.2000</strong> — canonização de Santa Faustina por São João Paulo II, que na mesma ocasião instituiu para toda a Igreja o <strong>II Domingo da Páscoa como “Domingo da Divina Misericórdia”</strong>.</li>
            <li><strong>2002</strong> — a Penitenciaria Apostólica concede indulgência plenária aos fiéis que, nesse domingo, participarem das práticas de piedade em honra da Divina Misericórdia, nas condições habituais (confissão, comunhão e oração pelas intenções do Papa).</li>
          </ul>

          <h3>Discernimento: o que evitar</h3>
          <NotaConfiabilidade nivel="privada">
            As promessas registradas no <em>Diário</em> pertencem ao gênero da revelação privada. São
            objeto de fé humana prudente, não de fé divina; não obrigam ninguém e não funcionam
            automaticamente.
          </NotaConfiabilidade>
          <ul>
            <li>Não se trata de garantia mecânica de salvação: a eficácia de qualquer oração supõe conversão, estado de graça e caridade (<em>CIC</em> §§ 1451–1460, 2098).</li>
            <li>A devoção não substitui os sacramentos. Confissão e Eucaristia são as vias ordinárias da misericórdia (<em>CIC</em> §§ 1422, 1846–1848).</li>
            <li>Correntes de mensagens com ameaças, prazos ou exigência de repasse são alheias à devoção aprovada e devem ser rejeitadas.</li>
            <li>O <em>Diretório sobre piedade popular e liturgia</em> (2002) recorda que a piedade popular deve harmonizar-se com a liturgia, e nunca competir com ela (nn. 11–13, 71).</li>
          </ul>
        </Prose>

        <Sources
          items={[
            { label: "Bíblia Sagrada — Ef 2,4–5; Is 6,3; Hb 9,11–14; 1Tm 2,1–4", ref: "fundamento escriturístico" },
            { label: "Catecismo da Igreja Católica", ref: "§§ 210–211, 604, 1366–1368, 1422, 1846–1848, 2098" },
            { label: "São João Paulo II, Encíclica Dives in Misericordia (30.11.1980)", ref: "nn. 4–8" },
            { label: "Congregação para a Doutrina da Fé, Notificação de 15.04.1978", ref: "revogação da proibição de 1959" },
            { label: "São João Paulo II, Homilia da canonização de Santa Faustina (30.04.2000)", ref: "instituição do Domingo da Divina Misericórdia" },
            { label: "Penitenciaria Apostólica, Decreto Misericors et miserator (29.06.2002)", ref: "indulgências" },
            { label: "Congregação para o Culto Divino, Diretório sobre Piedade Popular e Liturgia (2002)", ref: "nn. 11–13, 71" },
            { label: "Santa Faustina Kowalska, Diário — Misericórdia Divina na minha alma", ref: "revelação privada aprovada (n. 1320 e ss.)" },
          ]}
        />
      </Section>

      <Section kicker="Nove dias" title="Novena da Divina Misericórdia">
        <Prose>
          <p>
            Reza-se de <strong>Sexta-feira Santa ao Sábado antes do II Domingo da Páscoa</strong>, um terço por
            dia, acrescentando a intenção própria de cada dia. Nada impede rezá-la em outra época do ano como
            devoção privada.
          </p>
        </Prose>
        <div className="mt-md grid gap-2xs">
          {NOVENA_MISERICORDIA.map((d) => (
            <div key={d.dia} className="flex flex-col gap-1 border-l-2 border-gold/25 py-2 pl-4 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="kicker shrink-0 sm:w-56">{d.dia}</span>
              <span className="body-sm">{d.intencao}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold">← Todas as orações</Link>
          <Link to="/oracoes/rosario" className="px-5 py-3 btn-base btn-outline-gold">Rosário →</Link>
        </div>
        <Relacionados topic="misericordia" className="mt-8" />
      </Section>

    </div>
  );
}
