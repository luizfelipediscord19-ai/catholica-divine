import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard, Prose, Sources, Pullquote } from "../components/PageShell";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";
import { NOVENAS } from "../lib/data/devocoes/novenas";
import velas from "@/assets/velas.jpg";
import { keywordsPara } from "@/lib/seo/palavras-chave";

export const Route = createFileRoute("/oracoes/novenas/")({
  head: () => ({
    meta: [
      { title: "Novenas Católicas — origem, sentido e como rezar" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/novenas" },
      { name: "description", content: "Novenas católicas com textos, origem histórica, sentido teológico e critérios de discernimento." },
      { name: "keywords", content: keywordsPara(["oracoes", "santos"]) },
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
  { title: "Novenas de preparação", body: "Antecedem uma solenidade ou festa — Natal, Pentecostes, Imaculada Conceição ou o padroeiro da paróquia — e conduzem à liturgia." },
  { title: "Novenas de intercessão", body: "Pedem uma graça pela intercessão de Maria ou de um santo. A graça é sempre de Deus; o santo intercede (CIC §§ 956, 2683)." },
  { title: "Novenas de luto e sufrágio", body: "Nove dias de oração pelos fiéis defuntos, prática de caridade recomendada pela Igreja (2Mc 12,46; CIC § 1032)." },
  { title: "Novenas de reparação", body: "Oferecem oração, jejum e obras de misericórdia em desagravo aos pecados, unidos ao sacrifício de Cristo (Cl 1,24)." },
];

function Page() {
  return (
    <div>
      <PageHero autoridade={["devocao"]} image={velas} eyebrow="Novendialia" title="Novenas" intro="Nove dias de oração perseverante, à imagem do Cenáculo: Maria e os Apóstolos unânimes na oração entre a Ascensão e Pentecostes (At 1,14)." />

      <Section kicker="Selecione uma novena" title="Tradição viva da Igreja">
        <CardGrid cols={2}>
          {NOVENAS.map((n) => (
            <Link key={n.slug} to="/oracoes/novenas/$slug" params={{ slug: n.slug }}>
              <ContentCard title={n.titulo} subtitle={n.ocasiao}>{n.resumo}</ContentCard>
            </Link>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Fundamento" title="Por que nove dias?">
        <Prose>
          <p><strong>Novena</strong> (do latim <em>novem</em>, nove) é o exercício de oração continuada por nove dias. Seu arquétipo é o Cenáculo: depois da Ascensão, os discípulos “perseveravam unânimes na oração, com as mulheres, com Maria, a Mãe de Jesus, e com os irmãos dele” (At 1,14), até Pentecostes. A novena é, antes de tudo, <strong>escola de perseverança</strong> — a virtude pedida por Cristo nas parábolas do amigo importuno e da viúva insistente (Lc 11,5–13; 18,1–8).</p>
          <Pullquote cite="Catecismo da Igreja Católica, § 2742">Orar é sempre possível… Orar é uma necessidade vital. A oração e a vida cristã são inseparáveis.</Pullquote>

          <h3>Origem histórica</h3>
          <NotaConfiabilidade nivel="historia">A prática tem raízes documentadas; a fixação do número nove combina a memória do Cenáculo com costumes funerários antigos assumidos e purificados pelos cristãos.</NotaConfiabilidade>
          <ul>
            <li><strong>Antiguidade romana</strong> — havia o <em>novendiale sacrum</em>, nove dias de luto; os cristãos substituíram o rito pagão pela oração de sufrágio.</li>
            <li><strong>Idade Média</strong> — difundiram-se novenas preparatórias ao Natal na Espanha, França e Itália, ligadas ao Advento.</li>
            <li><strong>Séculos XVII–XIX</strong> — multiplicaram-se com as devoções ao Sagrado Coração, a São José e a Nossa Senhora.</li>
            <li><strong>Século XIX</strong> — Leão XIII, na encíclica <em>Divinum illud munus</em> (1897), prescreveu a novena ao Espírito Santo antes de Pentecostes.</li>
          </ul>

          <h3>Como rezar com fruto</h3>
          <ul>
            <li><strong>Continuidade</strong> — reze por nove dias seguidos; se interromper, retome com paz.</li>
            <li><strong>Intenção clara</strong> — formule o pedido e peça discernimento para acolher a resposta de Deus.</li>
            <li><strong>Ancoragem sacramental</strong> — una a novena à Missa, à confissão e à caridade concreta (Tg 2,14–17).</li>
            <li><strong>Escritura</strong> — inclua em cada dia um texto bíblico breve; a oração cristã nasce da Palavra (<em>Dei Verbum</em> 25).</li>
          </ul>

          <h3>Discernimento: o que evitar</h3>
          <NotaConfiabilidade nivel="devocao">A novena é prática piedosa livre. Não é sacramento, não obriga em consciência e não produz efeito automático.</NotaConfiabilidade>
          <ul>
            <li><strong>Nada de garantias infalíveis.</strong> Atribuir eficácia mágica a fórmulas ou repetições é superstição (CIC § 2111).</li>
            <li><strong>Nada de correntes.</strong> Exigências de repasse, ameaças ou prazos não pertencem à tradição da Igreja.</li>
            <li><strong>Primazia da liturgia.</strong> Novenas devem ser bíblicas e ordenadas à celebração que preparam, nunca substitutas da Missa.</li>
            <li><strong>Indulgências</strong> seguem as condições da Igreja e não são automáticas.</li>
          </ul>
        </Prose>
        <Sources items={[
          { label: "Bíblia Sagrada — At 1,14; Lc 11,5–13; Lc 18,1–8; Tg 2,14–17; 2Mc 12,46", ref: "fundamento escriturístico" },
          { label: "Catecismo da Igreja Católica", ref: "§§ 956, 1032, 2098, 2111, 2683, 2742" },
          { label: "Concílio Vaticano II, Sacrosanctum Concilium (1963)", ref: "nn. 12–13" },
          { label: "Concílio Vaticano II, Dei Verbum (1965)", ref: "n. 25" },
          { label: "Leão XIII, Divinum illud munus (1897)", ref: "novena ao Espírito Santo" },
          { label: "Diretório sobre Piedade Popular e Liturgia (2002)", ref: "nn. 10–13, 239" },
        ]} />
      </Section>

      <Section kicker="Tipologia" title="Quatro famílias de novenas">
        <CardGrid cols={2}>{TIPOS.map((t) => <ContentCard key={t.title} title={t.title}>{t.body}</ContentCard>)}</CardGrid>
      </Section>
      <Section><div className="flex flex-wrap items-center gap-3"><Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold">← Todas as orações</Link><Link to="/oracoes/rosario" className="px-5 py-3 btn-base btn-outline-gold">Rosário →</Link></div></Section>
    </div>
  );
}