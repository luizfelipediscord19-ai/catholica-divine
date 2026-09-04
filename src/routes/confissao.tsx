import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Prose, Pullquote, CardGrid, Sources, Prancha } from "../components/PageShell";
import { PerguntarSophia } from "../components/portal/PerguntarSophia";
import velas from "../assets/velas.jpg";
import bomPastor from "@/assets/bom-pastor.jpg";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/confissao")({
  head: () => ({
    meta: [
      { title: "Confissão: Exame de Consciência e Como se Confessar — Portal Católico" },
      {
        name: "description",
        content:
          "Guia completo da Confissão sacramental: exame de consciência pelos Dez Mandamentos, passo a passo do rito, Ato de Contrição e dúvidas frequentes, com base no Catecismo (§§1422–1498).",
      },
      { name: "keywords", content: keywordsPara(["sacramentos", "oracoes"]) },
      { property: "og:title", content: "Confissão — exame de consciência e passo a passo" },
      {
        property: "og:description",
        content:
          "Prepare-se para a Confissão com um exame de consciência pelos Dez Mandamentos, o rito completo e o Ato de Contrição.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/confissao" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/confissao" }],
  }),
  component: Page,
});

const PASSOS = [
  {
    titulo: "1. Examinar a consciência",
    texto:
      "Antes de entrar, reserve alguns minutos em silêncio. Peça luz ao Espírito Santo e percorra sua vida desde a última confissão, sem exageros nem desculpas. O exame abaixo serve de roteiro.",
  },
  {
    titulo: "2. Arrepender-se",
    texto:
      "A contrição é o mais importante de todos os atos do penitente: a dor da alma e a detestação do pecado cometido, com o propósito de não mais pecar (CIC §1451).",
  },
  {
    titulo: "3. Propor a emenda",
    texto:
      "Não basta lamentar: é preciso querer mudar, evitando também as ocasiões que costumam levar ao mesmo pecado.",
  },
  {
    titulo: "4. Confessar os pecados",
    texto:
      "Diga ao sacerdote, com simplicidade, os pecados de que se lembra — todos os pecados graves devem ser confessados (CIC §1456). Se esquecer algum sem má-fé, o perdão continua válido.",
  },
  {
    titulo: "5. Cumprir a penitência",
    texto:
      "A penitência dada pelo confessor repara, na medida do possível, o dano causado pelo pecado. Cumpra-a assim que puder.",
  },
];

const EXAME: { mandamento: string; titulo: string; perguntas: string[] }[] = [
  {
    mandamento: "1º",
    titulo: "Amar a Deus sobre todas as coisas",
    perguntas: [
      "Deixei a oração de lado por descuido ou preguiça?",
      "Coloquei dinheiro, trabalho, prazer ou a opinião dos outros acima de Deus?",
      "Duvidei voluntariamente da fé, ou me expus a coisas que a enfraquecem?",
      "Recorri a superstições, horóscopos, magia ou consultas espirituais alheias à fé?",
    ],
  },
  {
    mandamento: "2º",
    titulo: "Não tomar o santo nome de Deus em vão",
    perguntas: [
      "Usei o nome de Deus, de Nossa Senhora ou dos santos com irreverência, raiva ou brincadeira?",
      "Jurei falsamente, ou fiz promessas a Deus que não procurei cumprir?",
      "Falei do sagrado com desprezo diante de outros?",
    ],
  },
  {
    mandamento: "3º",
    titulo: "Guardar os domingos e festas de guarda",
    perguntas: [
      "Faltei à Missa dominical ou de festa de preceito por culpa minha?",
      "Cheguei atrasado por descuido habitual, ou fiquei distraído deliberadamente?",
      "Fiz do domingo um dia igual aos outros, sem descanso, caridade e família?",
    ],
  },
  {
    mandamento: "4º",
    titulo: "Honrar pai e mãe",
    perguntas: [
      "Fui desrespeitoso, ingrato ou indiferente com meus pais e mais velhos?",
      "Descuidei dos meus filhos, do seu sustento ou da sua formação na fé?",
      "Fui injusto ou negligente no trabalho, com quem depende de mim ou com a autoridade legítima?",
    ],
  },
  {
    mandamento: "5º",
    titulo: "Não matar",
    perguntas: [
      "Guardei ódio, desejei mal a alguém, ou me recusei a perdoar?",
      "Feri alguém com palavras, humilhações ou violência?",
      "Cooperei com o aborto, a eutanásia ou com atentados à vida humana?",
      "Descuidei gravemente da minha saúde, ou abusei de álcool e drogas?",
    ],
  },
  {
    mandamento: "6º e 9º",
    titulo: "Castidade no corpo e no coração",
    perguntas: [
      "Consenti em pensamentos, olhares ou conversas impuras?",
      "Usei pornografia, ou pratiquei atos contrários à castidade do meu estado de vida?",
      "Fui infiel ao meu cônjuge, em atos ou em desejos alimentados?",
      "Tratei alguém como objeto, e não como pessoa amada por Deus?",
    ],
  },
  {
    mandamento: "7º e 10º",
    titulo: "Justiça e desapego",
    perguntas: [
      "Tomei, danifiquei ou retive o que é dos outros, sem restituir?",
      "Fui desonesto no trabalho, nas contas, nos impostos ou nos estudos?",
      "Deixei de socorrer quem precisava, podendo fazê-lo?",
      "Cultivei inveja, ganância ou insatisfação permanente?",
    ],
  },
  {
    mandamento: "8º",
    titulo: "Não levantar falso testemunho",
    perguntas: [
      "Menti, exagerei ou omiti a verdade para me proteger?",
      "Falei da vida alheia sem necessidade, difamei ou espalhei o que não sabia ser verdade?",
      "Julguei intenções que não me cabia julgar?",
      "Calei quando devia defender alguém injustamente acusado?",
    ],
  },
];

const DUVIDAS = [
  {
    p: "Faz muitos anos que não me confesso. E agora?",
    r: "Diga isso ao sacerdote na primeira frase: “Padre, faz X anos que não me confesso.” Ele conduzirá o resto. Nenhum confessor se assusta com o tempo — a Igreja existe justamente para receber quem volta.",
  },
  {
    p: "Preciso confessar pecados leves?",
    r: "Não é obrigatório, mas a Igreja recomenda vivamente a confissão dos pecados veniais: ela forma a consciência, combate as más inclinações e faz crescer na vida do Espírito (CIC §1458).",
  },
  {
    p: "O sacerdote pode contar o que eu disse?",
    r: "Nunca. O sigilo sacramental é absoluto e não admite exceção alguma (CIC §1467; cân. 983).",
  },
  {
    p: "Com que frequência devo me confessar?",
    r: "A Igreja obriga a confessar os pecados graves ao menos uma vez por ano (cân. 989). Uma confissão mensal é o ritmo mais recomendado por mestres espirituais para quem busca vida interior estável.",
  },
  {
    p: "Esqueci um pecado durante a confissão.",
    r: "Se o esquecimento foi involuntário, a absolvição vale integralmente. Mencione o pecado na próxima confissão, quando lembrar.",
  },
];

function Page() {
  return (
    <div>
      <PageHero
        autoridade={["oficial", "tradicao"]}
        notaAutoridade="Conteúdo ancorado no Catecismo (§§1422–1498), no Código de Direito Canônico e no Ritual da Penitência. O exame de consciência é um roteiro pastoral, não uma lista taxativa."
        eyebrow="Sacramentum Paenitentiae"
        title="Confissão: como se preparar"
        intro="Exame de consciência pelos Dez Mandamentos, o passo a passo do rito e o Ato de Contrição. Quem confessa e detesta os seus pecados alcança misericórdia (Pr 28, 13)."
        image={velas}
      />

      <Section kicker="O que é" title="O sacramento do reencontro">
        <Prose>
          <p>
            A Confissão não é um tribunal onde se vai para ser humilhado: é o lugar onde Deus
            devolve ao pecador a vida que ele perdeu. Cristo instituiu este sacramento na noite de
            Páscoa, ao dizer aos Apóstolos:{" "}
            <em>
              “Recebei o Espírito Santo. Àqueles a quem perdoardes os pecados, eles lhes serão
              perdoados”
            </em>{" "}
            (Jo 20, 22-23). É por isso que o perdão dos pecados, na Igreja, passa pelo ministério
            do sacerdote (CIC §1461).
          </p>
          <p>
            Quem se confessa recebe a reconciliação com Deus e com a Igreja, a paz da consciência,
            o crescimento das forças espirituais para o combate cristão e — nos pecados graves — a
            recuperação da graça santificante (CIC §1496).
          </p>
        </Prose>

        <Pullquote cite="Catecismo da Igreja Católica, §1468">
          Toda a força da penitência consiste em nos restituir à graça de Deus e a unir-nos a Ele
          numa grande amizade.
        </Pullquote>

        <Prancha
          image={bomPastor}
          alt="O Bom Pastor com o cajado, cercado por ovelhas."
          formato="retrato"
          legenda="A confissão é o Pastor que sai à procura da ovelha perdida e a traz de volta sobre os ombros (cf. Lc 15,4-7)."
        />
      </Section>

      <Section kicker="Passo a passo" title="Os cinco atos do penitente" id="rito">
        <CardGrid cols={2}>
          {PASSOS.map((p) => (
            <article key={p.titulo} className="surface-card p-card">
              <h3 className="title-card">{p.titulo}</h3>
              <p className="mt-xs body-sm">{p.texto}</p>
            </article>
          ))}
        </CardGrid>

        <Prose>
          <h3>Como começar a falar</h3>
          <p>
            Ao entrar, faça o sinal da cruz e diga:{" "}
            <em>
              “Abençoe-me, padre, porque pequei. Minha última confissão foi há [tempo]. Confesso
              estes pecados…”
            </em>{" "}
            Depois de acusar os pecados, acrescente:{" "}
            <em>“De todos estes pecados e dos que não recordo, peço perdão a Deus.”</em>
          </p>
        </Prose>
      </Section>

      <Section
        kicker="Exame de consciência"
        title="Roteiro pelos Dez Mandamentos"
        id="exame"
      >
        <Prose>
          <p>
            Leia sem ansiedade. O exame não serve para produzir angústia, mas verdade: reconhecer o
            que é pecado, distinguir o grave do leve e nomear as coisas com clareza (CIC §§1857–1862).
          </p>
        </Prose>

        <div className="mt-[var(--space-md)] space-y-[var(--space-sm)]">
          {EXAME.map((bloco) => (
            <article
              key={bloco.mandamento}
              className="border border-gold/15 bg-card/40 p-[var(--space-sm)]"
            >
              <p className="kicker">{bloco.mandamento} mandamento</p>
              <h3 className="mt-1 title-sub">{bloco.titulo}</h3>
              <ul className="mt-xs space-y-2">
                {bloco.perguntas.map((q) => (
                  <li key={q} className="relative pl-5 body-sm">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-gold/50"
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Prose>
          <h3>Preceitos da Igreja e caridade</h3>
          <p>
            Complete o exame perguntando também: cumpri o jejum e a abstinência prescritos? Ajudei
            a Igreja conforme minhas posses? Comunguei em estado de graça? Vivi as obras de
            misericórdia com quem estava ao meu alcance (Mt 25, 31-46)?
          </p>
        </Prose>
      </Section>

      <Section kicker="Oração" title="Ato de Contrição" id="ato-de-contricao">
        <Prose>
          <blockquote>
            Meu Deus, eu me arrependo de todo o coração de vos ter ofendido. Detesto os meus
            pecados, não só pelo castigo que mereci, mas principalmente porque ofendi a Vós, sumo
            Bem, digno de ser amado sobre todas as coisas. Proponho firmemente, com o auxílio da
            vossa graça, confessar-me, cumprir a penitência e nunca mais tornar a pecar. Amém.
          </blockquote>
          <p>
            Fórmula tradicional em uso corrente no Brasil, na linha do <em>Actus contritionis</em>{" "}
            do Ritual da Penitência. Rezada com contrição perfeita e com o propósito de se
            confessar, obtém o perdão dos pecados graves mesmo antes da absolvição (CIC §1452).
          </p>
        </Prose>
      </Section>

      <Section kicker="Dúvidas frequentes" title="O que as pessoas mais perguntam">
        <div className="measure space-y-[var(--space-sm)]">
          {DUVIDAS.map((d) => (
            <details key={d.p} className="border border-gold/15 bg-card/40 p-[var(--space-sm)]">
              <summary className="cursor-pointer title-sub">{d.p}</summary>
              <p className="mt-xs body-sm">{d.r}</p>
            </details>
          ))}
        </div>

        <div className="mt-[var(--space-md)]">
          <PerguntarSophia
            pergunta="Como me preparar bem para uma boa confissão?"
            rotulo="Perguntar à Sophia sobre a Confissão"
          />
        </div>

        <Prose>
          <h3>Continue por aqui</h3>
          <ul>
            <li>
              <Link to="/sacramentos" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">
                Os sete sacramentos
              </Link>
            </li>
            <li>
              <Link to="/oracoes" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">
                Biblioteca de orações
              </Link>
            </li>
            <li>
              <Link to="/trilhas" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">
                Trilhas de formação
              </Link>
            </li>
          </ul>
        </Prose>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§1422–1498 (o sacramento da Penitência e da Reconciliação)" },
            { label: "Catecismo da Igreja Católica", ref: "§§1854–1864 (pecado mortal e venial)" },
            { label: "Código de Direito Canônico (1983)", ref: "cân. 959–991 (disciplina da confissão e sigilo sacramental)" },
            { label: "Ritual da Penitência", ref: "Ato de contrição e fórmula da absolvição" },
            { label: "Concílio de Trento", ref: "Sessão XIV, Doutrina sobre o sacramento da Penitência" },
          ]}
        />
      </Section>
    </div>
  );
}
