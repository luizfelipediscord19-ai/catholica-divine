import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard, Prose, Sources, Pullquote } from "../components/PageShell";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";
import { NOVENAS } from "../lib/data/devocoes/novenas";
import velas from "@/assets/velas.jpg";

export const Route = createFileRoute("/oracoes/novenas")({
  head: () => ({
    meta: [
      { title: "Novenas Católicas — origem, sentido e como rezar" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/novenas" },
      { name: "description", content: "Novenas ao Espírito Santo, a Nossa Senhora Aparecida, a São José, ao Sagrado Coração e outras: textos, origem histórica no Cenáculo, sentido teológico e critérios de discernimento." },
      { property: "og:title", content: "Novenas Católicas" },
      { property: "og:description", content: "Nove dias de oração perseverante, com textos, origem histórica e fontes magisteriais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/novenas" }],
  }),
  component: Page,
});

const TIPOS = [
  { title: "Novenas de preparação", body: "Antecedem uma solenidade ou festa — Natal, Pentecostes, Imaculada Conceição, o padroeiro da paróquia. São as mais antigas e as mais recomendadas pela Igreja, porque conduzem à liturgia." },
  { title: "Novenas de intercessão", body: "Pedem uma graça determinada pela intercessão de Maria ou de um santo. A graça é sempre de Deus; o santo intercede (cf. CIC §§ 956, 2683)." },
  { title: "Novenas de luto e sufrágio", body: "Nove dias de oração pelos fiéis defuntos, uso antigo do Ocidente cristão e prática de caridade recomendada (2Mc 12,46; CIC § 1032)." },
  { title: "Novenas de reparação", body: "Oferecem oração, jejum e obras de misericórdia em desagravo aos pecados, unidas ao sacrifício de Cristo (Cl 1,24)." },
];

function Page() {
  return (
    <div>
      <PageHero
        autoridade={["devocao"]}
        image={velas}
        eyebrow="Novendialia"
        title="Novenas"
        intro="Nove dias de oração perseverante, à imagem do Cenáculo: Maria e os Apóstolos unânimes na oração entre a Ascensão e Pentecostes (At 1,14)."
      />

      <Section kicker="Selecione uma novena" title="Tradição viva da Igreja">
        <CardGrid cols={2}>
          {NOVENAS.map((n) => (
            <Link key={n.slug} to="/oracoes/novenas/$slug" params={{ slug: n.slug }}>
              <ContentCard title={n.titulo} subtitle={n.ocasiao}>
                {n.resumo}
              </ContentCard>
            </Link>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Fundamento" title="Por que nove dias?">
        <Prose>
          <p>
            <strong>Novena</strong> (do latim <em>novem</em>, nove) é o exercício de oração continuada por nove
            dias. Seu arquétipo é o Cenáculo: depois da Ascensão, os discípulos <em>“perseveravam unânimes na
            oração, com as mulheres, com Maria, a Mãe de Jesus, e com os irmãos dele”</em> (At 1,14), até o dia
            de Pentecostes. A novena é, portanto, antes de tudo <strong>escola de perseverança</strong> — a
            virtude que Cristo pede na parábola do amigo importuno e da viúva insistente (Lc 11,5–13; 18,1–8).
          </p>

          <Pullquote cite="Catecismo da Igreja Católica, § 2742">
            Orar é sempre possível… Orar é uma necessidade vital. A oração e a vida cristã são inseparáveis.
          </Pullquote>

          <h3>Origem histórica</h3>
          <NotaConfiabilidade nivel="historia">
            A prática tem raízes documentadas; a fixação do número nove combina a memória do Cenáculo com
            costumes funerários antigos assumidos e purificados pelos cristãos.
          </NotaConfiabilidade>
          <ul>
            <li><strong>Antiguidade romana</strong> — havia o <em>novendiale sacrum</em>, nove dias de luto após a morte; os cristãos assumiram o intervalo, substituindo o rito pagão pela oração de sufrágio pelos defuntos.</li>
            <li><strong>Idade Média</strong> — difundem-se as novenas preparatórias ao Natal na Espanha, na França e na Itália, ligadas às nove antífonas e ao tempo do Advento.</li>
            <li><strong>Séculos XVII–XIX</strong> — as novenas multiplicam-se com o florescimento das devoções ao Sagrado Coração, a São José e a Nossa Senhora, muitas delas enriquecidas com indulgências.</li>
            <li><strong>Século XX</strong> — Leão XIII, na encíclica <em>Divinum illud munus</em> (09.05.1897), prescreveu para toda a Igreja a novena ao Espírito Santo antes de Pentecostes: é a novena de maior autoridade litúrgica.</li>
          </ul>

          <h3>Como rezar com fruto</h3>
          <ul>
            <li><strong>Continuidade</strong> — nove dias seguidos, no mesmo horário quando possível. Interromper não invalida nada: retome com paz.</li>
            <li><strong>Intenção clara</strong> — formule o pedido e, sobretudo, peça o discernimento para aceitar a resposta de Deus, que às vezes concede algo melhor que o pedido.</li>
            <li><strong>Ancoragem sacramental</strong> — una a novena à Missa, à confissão e à caridade concreta. A oração que não gera obras permanece estéril (Tg 2,14–17).</li>
            <li><strong>Escritura</strong> — inclua cada dia um texto bíblico breve; a oração cristã nasce da Palavra (<em>Dei Verbum</em> 25).</li>
          </ul>

          <h3>Discernimento: o que evitar</h3>
          <NotaConfiabilidade nivel="devocao">
            A novena é prática piedosa livre. Não é sacramento, não obriga em consciência e não produz efeito
            automático.
          </NotaConfiabilidade>
          <ul>
            <li><strong>Nada de garantias infalíveis.</strong> Fórmulas como “nunca se soube falhar” ou “graça certa em nove dias” beiram a superstição, que o Catecismo condena expressamente: atribuir eficácia mágica a orações ou a certo número de repetições (<em>CIC</em> § 2111).</li>
            <li><strong>Nada de correntes.</strong> Textos que exigem repasse, prometem castigo a quem interromper ou impõem prazos não pertencem à tradição da Igreja.</li>
            <li><strong>Primazia da liturgia.</strong> O <em>Diretório sobre piedade popular e liturgia</em> (2002) pede que as novenas sejam sóbrias, bíblicas e ordenadas à celebração que preparam — nunca substitutas da Missa (nn. 10–13, 239).</li>
            <li><strong>Indulgências</strong> ligadas a certas novenas seguem as condições do <em>Enchiridion Indulgentiarum</em> e não são automáticas.</li>
          </ul>
        </Prose>

        <Sources
          items={[
            { label: "Bíblia Sagrada — At 1,14; Lc 11,5–13; Lc 18,1–8; Tg 2,14–17; 2Mc 12,46", ref: "fundamento escriturístico" },
            { label: "Catecismo da Igreja Católica", ref: "§§ 956, 1032, 2098, 2111, 2683, 2742" },
            { label: "Concílio Vaticano II, Sacrosanctum Concilium (1963)", ref: "nn. 12–13" },
            { label: "Concílio Vaticano II, Dei Verbum (1965)", ref: "n. 25" },
            { label: "Leão XIII, Encíclica Divinum illud munus (09.05.1897)", ref: "novena ao Espírito Santo" },
            { label: "Congregação para o Culto Divino, Diretório sobre Piedade Popular e Liturgia (2002)", ref: "nn. 10–13, 239" },
            { label: "Penitenciaria Apostólica, Enchiridion Indulgentiarum, 4ª ed. (1999)", ref: "condições das indulgências" },
          ]}
        />
      </Section>

      <Section kicker="Tipologia" title="Quatro famílias de novenas">
        <CardGrid cols={2}>
          {TIPOS.map((t) => (
            <ContentCard key={t.title} title={t.title}>{t.body}</ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold">← Todas as orações</Link>
          <Link to="/oracoes/rosario" className="px-5 py-3 btn-base btn-outline-gold">Rosário →</Link>
        </div>
      </Section>
    </div>
  );
}
