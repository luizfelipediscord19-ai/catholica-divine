import batismo from "@/assets/batismo.jpg";
import { createFileRoute } from "@tanstack/react-router";
import eucaristia from "@/assets/eucaristia.jpg";
import { PageHero, CardGrid, ContentCard, Prose, Pullquote, Prancha } from "../components/PageShell";
import { ReadingMode, FnRef } from "../components/ReadingMode";
import { Termo } from "../components/Termo";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";

export const Route = createFileRoute("/sacramentos")({
  head: () => ({
    meta: [
      { title: "Os Sete Sacramentos — Doutrina, matéria, forma e ministro" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/sacramentos" },
      { name: "description", content: "Os sete sacramentos da Igreja Católica em profundidade: definição, matéria, forma, ministro, sujeito e efeitos — segundo o CIC, Trento, Sacrosanctum Concilium e os rituais oficiais." },
      { property: "og:title", content: "Os Sete Sacramentos da Igreja Católica" },
      { property: "og:description", content: "Iniciação, Cura e Serviço — exposição doutrinária completa com fontes magisteriais." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/sacramentos" }],
  }),
  component: Page,
});

const TOC = [
  { id: "introducao", label: "O que é um sacramento" },
  { id: "elementos", label: "Matéria, forma, ministro" },
  { id: "septenario", label: "Por que sete" },
  { id: "iniciacao", label: "I. Iniciação Cristã" },
  { id: "batismo", label: "1. Batismo" },
  { id: "confirmacao", label: "2. Confirmação" },
  { id: "eucaristia", label: "3. Eucaristia" },
  { id: "cura", label: "II. Sacramentos de Cura" },
  { id: "penitencia", label: "4. Penitência" },
  { id: "uncao", label: "5. Unção dos Enfermos" },
  { id: "servico", label: "III. Sacramentos a Serviço da Comunhão" },
  { id: "ordem", label: "6. Ordem" },
  { id: "matrimonio", label: "7. Matrimônio" },
  { id: "sacramentais", label: "Sacramentais" },
  { id: "teologia", label: "Teologia sacramental" },

  { id: "notas", label: "Notas e fontes" },
];

const FOOTNOTES = [
  { id: "trento7", label: "Concílio de Trento, Sessão VII (03.03.1547), Decreto sobre os Sacramentos em geral", ref: "DH 1600–1613 — os sete sacramentos instituídos por Cristo" },
  { id: "trento13", label: "Concílio de Trento, Sessão XIII (11.10.1551), Decreto sobre a Santíssima Eucaristia", ref: "DH 1635–1661 — presença real e transubstanciação" },
  { id: "trento14p", label: "Concílio de Trento, Sessão XIV (25.11.1551), Decreto sobre o Sacramento da Penitência", ref: "DH 1667–1693" },
  { id: "trento14u", label: "Concílio de Trento, Sessão XIV, Decreto sobre a Extrema-Unção", ref: "DH 1694–1700" },
  { id: "trento22", label: "Concílio de Trento, Sessão XXII (17.09.1562), Doutrina sobre o Sacrifício da Missa", ref: "DH 1738–1759" },
  { id: "trento23", label: "Concílio de Trento, Sessão XXIII (15.07.1563), Decreto sobre o Sacramento da Ordem", ref: "DH 1763–1778" },
  { id: "trento24", label: "Concílio de Trento, Sessão XXIV (11.11.1563), Decreto sobre o Sacramento do Matrimônio", ref: "DH 1797–1812" },
  { id: "sc", label: "Concílio Vaticano II, Constituição Sacrosanctum Concilium (04.12.1963)", ref: "nn. 59–82 — os sacramentos e a liturgia" },
  { id: "lg11", label: "Concílio Vaticano II, Lumen Gentium 11", ref: "Eucaristia como “fonte e ápice de toda a vida cristã”" },
  { id: "cic", label: "Catecismo da Igreja Católica", ref: "§§ 1113–1666 — Os sete sacramentos da Igreja" },
  { id: "ee", label: "São João Paulo II, Encíclica Ecclesia de Eucharistia (17.04.2003)", ref: "" },
  { id: "ssc", label: "Bento XVI, Exortação Apostólica Sacramentum Caritatis (22.02.2007)", ref: "Eucaristia como mistério a ser crido, celebrado e vivido" },
  { id: "ms", label: "Pio XII, Constituição Apostólica Sacramentum Ordinis (30.11.1947)", ref: "matéria e forma da Ordem" },
  { id: "ds", label: "Paulo VI, Constituição Apostólica Divinæ Consortium Naturæ (15.08.1971)", ref: "rito da Confirmação" },
  { id: "rp", label: "São João Paulo II, Exortação Reconciliatio et Paenitentia (02.12.1984)", ref: "" },
  { id: "cic-can", label: "Código de Direito Canônico (1983)", ref: "cc. 840–1165 — disciplina sacramental" },
  { id: "rituais", label: "Rituais litúrgicos oficiais (Editio typica latina)", ref: "RICA (1972), Ordo Confirmationis (1971), Ordo Pænitentiæ (1973), Ordo Unctionis Infirmorum (1972), De Ordinatione (1990), Ordo Celebrandi Matrimonium (1991)" },
  { id: "ur", label: "Concílio Vaticano II, Decreto Unitatis Redintegratio (21.11.1964)", ref: "nn. 3, 22 — batismo válido e diferença quanto à Ordem e à Eucaristia" },
  { id: "di", label: "Congregação para a Doutrina da Fé, Declaração Dominus Iesus (06.08.2000)", ref: "nn. 20-22 — necessidade da Igreja e vias da graça" },
  { id: "resp2020", label: "Congregação para a Doutrina da Fé, Responsa ad dubia sobre a validade do Batismo (24.06.2020)", ref: "invalidade da fórmula “nós te batizamos”" },
  { id: "st62", label: "São Tomás de Aquino, Summa Theologiae", ref: "III, qq. 60-65 — causalidade instrumental e caráter sacramental" },
  { id: "ecum", label: "Pontifício Conselho para a Unidade dos Cristãos, Diretório Ecumênico (25.03.1993)", ref: "communicatio in sacris; cf. CDC, cân. 844" },
];


function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Septem Sacramenta"
        title="Os Sete Sacramentos"
        intro={<>Sinais eficazes da <Termo termo="graca">graça</Termo>, instituídos por Cristo e confiados à Igreja, pelos quais nos é dispensada a vida divina (CIC § 1131).</>}
      image={eucaristia}
      />

      <ReadingMode title="Os Sete Sacramentos" toc={TOC} footnotes={FOOTNOTES}>
        <Prose>
          <section id="introducao" className="scroll-mt-24">
            <h3>O que é um sacramento</h3>
            <p>
              O Catecismo da Igreja Católica define, com a tradição escolástica:{" "}
              <em> “Os sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja,
              pelos quais nos é dispensada a vida divina”</em> (<em>CIC</em> § 1131<FnRef n="cic" />). Três
              elementos compõem essa definição:
            </p>
            <ul>
              <li><strong>Sinais sensíveis</strong> — palavras e ações perceptíveis que <em>significam</em> uma realidade divina.</li>
              <li><strong>Eficazes</strong> — não apenas representam, mas <em>produzem</em> a graça que significam, <em>ex opere operato</em> (Trento, Sess. VII, cân. 8<FnRef n="trento7" />).</li>
              <li><strong>Instituídos por Cristo</strong> — todos os sete sacramentos foram instituídos por Cristo (Trento, DH 1601).</li>
            </ul>

            <Pullquote cite="Catecismo § 1084">
              Os sacramentos são <em>“forças que saem”</em> do Corpo de Cristo, sempre vivo e vivificante, e
              ações do Espírito Santo agindo em Seu Corpo, que é a Igreja.
            </Pullquote>
          </section>

          <section id="elementos" className="scroll-mt-24">
            <h3>Matéria, forma, ministro e sujeito</h3>
            <p>
              A escolástica recolheu, a partir de Santo Tomás (<em>ST</em> III, q. 60), quatro elementos
              constitutivos de cada sacramento:
            </p>
            <ol>
              <li><strong>Matéria</strong> — a realidade sensível (água no Batismo, pão e vinho na Eucaristia, óleo na Unção…).</li>
              <li><strong>Forma</strong> — as palavras sacramentais que determinam o sinal.</li>
              <li><strong>Ministro</strong> — quem o administra validamente (variável segundo o sacramento).</li>
              <li><strong>Sujeito</strong> — quem o recebe, com as disposições requeridas.</li>
            </ol>
            <p>
              Este esquema de "matéria e forma" é <strong>formulação tradicional da teologia sacramental</strong>,
              consolidada pela escolástica e recebida pelo Magistério (cf. Trento, DH 1671, sobre matéria e forma
              da Penitência) — não uma definição dogmática única e fechada para todos os sacramentos, mas
              instrumento explicativo que a própria Igreja aplica com as devidas nuances a cada caso. Para a
              validade exige-se a <em>matéria, forma, ministro com intenção mínima de fazer o que a
              Igreja faz, e sujeito capaz</em> (CIC §§ 1127–1128; <em>Código de Direito Canônico</em>, cc.
              840–848<FnRef n="cic-can" />). A frutuosidade depende ainda da fé e da disposição do sujeito.
            </p>
            <NotaConfiabilidade nivel="teologia">
              A linguagem "matéria, forma, ministro e sujeito" é categoria teológica tradicional (escolástica),
              útil para expor a doutrina sacramental — não uma fórmula dogmática definida em si mesma.
            </NotaConfiabilidade>

            <h4>Caráter sacramental</h4>
            <p>
              Três sacramentos — <strong>Batismo</strong>, <strong>Confirmação</strong> e <strong>Ordem</strong>
              — imprimem na alma um <em>caráter</em>, sinal espiritual indelével (CIC §§ 1121, 1272, 1304, 1582),
              razão pela qual <em>não podem ser repetidos</em> (Trento, Sess. VII, cân. 9; DH 1609).
            </p>
          </section>

          <section id="septenario" className="scroll-mt-24">
            <h3>Por que sete</h3>
            <p>
              O número setenário dos sacramentos foi fixado pelo Concílio de Lião II (1274), Concílio de Florença
              (Decreto <em>pro Armeniis</em>, 1439; DH 1310–1313) e definido infalivelmente pelo Concílio de
              Trento na Sessão VII (1547): <em>“Se alguém disser que os sacramentos da Nova Lei não foram todos
              instituídos por Jesus Cristo Nosso Senhor, ou que são mais ou menos do que sete… seja anátema”</em>{" "}
              (cân. 1; DH 1601<FnRef n="trento7" />). Agrupam-se classicamente em três blocos (CIC §§ 1210–1211):
            </p>
            <ul>
              <li><strong>Iniciação Cristã</strong> — Batismo, Confirmação, Eucaristia.</li>
              <li><strong>Cura</strong> — Penitência, Unção dos Enfermos.</li>
              <li><strong>Serviço da Comunhão e missão dos fiéis</strong> — Ordem, Matrimônio.</li>
            </ul>
          </section>
        </Prose>

        <Prancha
          image={batismo}
          alt="Batismo de Cristo no Jordão, com João Batista derramando a água e o Espírito em forma de pomba."
          legenda="No batismo de Cristo no Jordão a Igreja lê a origem do primeiro sacramento: a água santificada e o Espírito manifestado (CIC §§ 1223–1225)."
          formato="retrato"
        />

        {/* ============ INICIAÇÃO ============ */}
        <section id="iniciacao" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-3xl text-foreground mb-3">I. Sacramentos da Iniciação Cristã</h3>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Lançam os fundamentos de toda a vida cristã: o nascimento (Batismo), o crescimento (Confirmação) e
            o alimento (Eucaristia). Ver Rito da Iniciação Cristã de Adultos (RICA, 1972)<FnRef n="rituais" />.
          </p>
        </section>

        <Prose>
          <section id="batismo" className="scroll-mt-24">
            <h3>1. Batismo</h3>
            <p>
              <em>Porta dos sacramentos</em> (CIC § 1213), <strong>regeneração</strong> pela água e pelo
              Espírito (Jo 3,5). Apaga o <Termo termo="pecado_original">pecado original</Termo> e todos os pecados pessoais, incorpora a Cristo e à
              Igreja, imprime caráter indelével (<em>CIC</em> §§ 1213–1284).
            </p>
            <ul>
              <li><strong>Matéria</strong>: água natural, derramada ou por imersão.</li>
              <li><strong>Forma</strong>: <em>“N., eu te batizo em nome do Pai, e do Filho, e do Espírito Santo”</em>.</li>
              <li><strong>Ministro ordinário</strong>: bispo, presbítero ou diácono. <strong>Em caso de necessidade</strong>, qualquer pessoa, mesmo não batizada, com a intenção de fazer o que a Igreja faz (CIC § 1256; CDC, c. 861 § 2).</li>
              <li><strong>Sujeito</strong>: toda pessoa ainda não batizada (c. 864).</li>
              <li><strong>Efeitos</strong>: filiação divina, remissão do pecado original e atuais, infusão das virtudes teologais, inserção no Corpo Místico.</li>
            </ul>

            <h4>Batismo de desejo e de sangue</h4>
            <p>
              A doutrina católica reconhece, fora do batismo de água, o <em>batismo de sangue</em> (martírio
              antes de poder ser batizado) e o <em>batismo de desejo</em> (CIC §§ 1258–1260; Trento, Sess. VI,
              cap. 4; DH 1524).
            </p>
          </section>

          <section id="confirmacao" className="scroll-mt-24">
            <h3>2. Confirmação</h3>
            <p>
              Aperfeiçoa a graça batismal: <em>une mais perfeitamente à Igreja, enriquece de força especial do
              Espírito Santo</em> (CIC § 1285). Foi reformada por Paulo VI em <em>Divinæ Consortium Naturæ</em>{" "}
              (1971), com o novo <em>Ordo Confirmationis</em><FnRef n="ds" />.
            </p>
            <ul>
              <li><strong>Matéria</strong>: unção com o <em>Sagrado Crisma</em> (óleo de oliva consagrado pelo bispo na Missa Crismal) na fronte.</li>
              <li><strong>Forma</strong>: <em>“Recebe, por este sinal, o Espírito Santo, o Dom de Deus”</em> (versão latina: <em>“Accipe signaculum Doni Spiritus Sancti”</em>).</li>
              <li><strong>Ministro originário</strong>: o bispo; também o presbítero quando delegado, ou em perigo de morte (CIC § 1313; CDC, cc. 882–884).</li>
              <li><strong>Sujeito</strong>: todo batizado, ainda não confirmado, com idade de discrição (c. 891).</li>
              <li><strong>Efeitos</strong>: dom pleno do Espírito (cf. Pentecostes — At 2), aumento dos sete dons, caráter indelével.</li>
            </ul>
          </section>

          <section id="eucaristia" className="scroll-mt-24">
            <h3>3. Eucaristia</h3>
            <p>
              <em>“Fonte e ápice de toda a vida cristã”</em> (<em>Lumen Gentium</em> 11<FnRef n="lg11" />). É,
              simultaneamente, <strong>sacrifício</strong> (memorial do sacrifício único da Cruz), <strong>presença
              real</strong> de Cristo (corpo, sangue, alma e divindade) e <strong>comunhão</strong> com Ele e
              com o Corpo Místico (CIC §§ 1322–1419).
            </p>

            <Pullquote cite="Concílio de Trento — Sessão XIII, cap. 4 (DH 1642)">
              Pela consagração do pão e do vinho realiza-se a conversão de toda a substância do pão na
              substância do corpo de Cristo, e de toda a substância do vinho na substância do seu sangue. Esta
              conversão a Igreja chamou de modo conveniente e próprio <Termo termo="transubstanciacao"><em>transubstanciação</em></Termo>.
            </Pullquote>

            <ul>
              <li><strong>Matéria</strong>: pão de trigo ázimo (rito latino) e vinho de uva (CDC, c. 924).</li>
              <li><strong>Forma</strong>: as palavras da consagração: <em>“Isto é o meu Corpo… Este é o cálice do meu Sangue…”</em> (cf. Mt 26,26–28; 1Cor 11,23–25).</li>
              <li><strong>Ministro da consagração</strong>: somente o bispo ou presbítero validamente ordenado (Trento, Sess. XXII, DH 1752; CIC § 1411).</li>
              <li><strong>Sujeito</strong>: todo batizado em estado de graça. Quem tem consciência de pecado mortal não deve comungar sem prévia confissão sacramental, salvo grave necessidade sem possibilidade de confessar-se — e, nesse caso, com o propósito de fazê-lo o quanto antes (CIC § 1385; CDC, cân. 916).</li>
              <li><strong>Jejum eucarístico</strong>: em regra, quem recebe a Sagrada Comunhão observa o jejum de uma hora antes da Comunhão, salvo as exceções previstas pelo Direito Canônico — água e medicamentos não o quebram; idosos, enfermos e quem deles cuida estão dispensados (CDC, cân. 919). Trata-se de <strong>disciplina eclesiástica</strong>, mutável no tempo (já foi jejum da meia-noite), e não de doutrina imutável.</li>
              <li><strong>Magistério recente</strong>: <em>Ecclesia de Eucharistia</em> (2003)<FnRef n="ee" />; <em>Sacramentum Caritatis</em> (2007)<FnRef n="ssc" />.</li>
            </ul>

            <h4>Reserva e adoração eucarística</h4>
            <p>
              As espécies consagradas que restam da Missa são reservadas no <em>sacrário</em>, sobretudo para a
              comunhão dos enfermos e como centro vivo de adoração fora da Missa: já que Cristo permanece
              realmente presente enquanto subsistirem as espécies eucarísticas, é lícito e recomendável adorá-lo
              no Santíssimo Sacramento exposto ou reservado (CIC §§ 1378–1379). Diante do sacrário, guarda-se
              genuflexão como sinal de adoração.
            </p>

            <NotaConfiabilidade nivel="oficial">
              A presença real e a transubstanciação são doutrina definida (Trento, Sess. XIII; CIC §§ 1373–1381).
              Já o jejum eucarístico de uma hora, embora vinculante, é disciplina canônica que a Igreja pode
              alterar; não deve ser apresentado como preceito absoluto e sem exceções.
            </NotaConfiabilidade>
          </section>
        </Prose>

        {/* ============ CURA ============ */}
        <section id="cura" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-3xl text-foreground mb-3">II. Sacramentos de Cura</h3>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Cristo Médico continua a obra de cura da alma e do corpo na Igreja pelos sacramentos da Penitência
            e da Unção dos Enfermos (CIC §§ 1420–1421).
          </p>
        </section>

        <Prose>
          <section id="penitencia" className="scroll-mt-24">
            <h3>4. Penitência e Reconciliação</h3>
            <p>
              Sacramento da conversão, da Penitência, da Confissão, do Perdão e da Reconciliação (CIC § 1423).
              Instituído por Cristo na noite de Páscoa: <em>“Recebei o Espírito Santo. Àqueles a quem
              perdoardes os pecados serão perdoados…”</em> (Jo 20,22–23).
            </p>
            <ul>
              <li><strong>Atos do penitente</strong>: contrição, confissão e satisfação (CIC §§ 1450–1460; Trento DH 1673–1675).</li>
              <li><strong>Forma</strong>: <em>“Eu te absolvo dos teus pecados, em nome do Pai, e do Filho, e do Espírito Santo”</em>.</li>
              <li><strong>Ministro</strong>: somente o bispo ou presbítero com faculdade (CDC, cc. 965–986).</li>
              <li><strong>Sigilo sacramental</strong>: absolutamente inviolável (CDC, c. 983 § 1; CIC § 1467).</li>
              <li><strong>Efeitos</strong>: reconciliação com Deus e com a Igreja, remissão da pena eterna, paz e consolação.</li>
            </ul>
            <p>Magistério posterior: <em>Reconciliatio et Paenitentia</em> (1984)<FnRef n="rp" />.</p>
          </section>

          <section id="uncao" className="scroll-mt-24">
            <h3>5. Unção dos Enfermos</h3>
            <p>
              <em>“Está doente algum de vós? Chame os presbíteros da Igreja, e estes orem sobre ele, ungindo-o
              com óleo em nome do Senhor”</em> (Tg 5,14–15). Reformado por Paulo VI no <em>Ordo Unctionis
              Infirmorum</em> (1972); deixou de ser <em>extrema-unção</em> reservada à morte (CIC § 1499–1532).
            </p>
            <ul>
              <li><strong>Matéria</strong>: óleo bento (idealmente de oliva).</li>
              <li><strong>Forma</strong>: <em>“Por esta santa Unção, e pela sua infinita misericórdia, ajude-o o Senhor com a graça do Espírito Santo, para que, liberto dos pecados, o salve e, na sua bondade, alivie os seus sofrimentos. Amém.”</em></li>
              <li><strong>Ministro</strong>: somente o bispo ou presbítero (CDC, c. 1003).</li>
              <li><strong>Sujeito</strong>: fiel batizado em perigo por enfermidade grave ou velhice (c. 1004).</li>
              <li><strong>Efeitos</strong>: graça do Espírito Santo, conforto, perdão dos pecados se o doente não pôde confessar-se, restabelecimento da saúde se for útil à salvação (CIC § 1532).</li>
            </ul>
          </section>
        </Prose>

        {/* ============ SERVIÇO ============ */}
        <section id="servico" className="scroll-mt-24 mt-12">
          <h3 className="font-display text-3xl text-foreground mb-3">III. Sacramentos a Serviço da Comunhão</h3>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Ordenam-se à salvação dos outros e edificam o Povo de Deus, conferindo missão própria na Igreja
            (CIC § 1534).
          </p>
        </section>

        <Prose>
          <section id="ordem" className="scroll-mt-24">
            <h3>6. Ordem</h3>
            <p>
              Sacramento pelo qual a missão confiada por Cristo aos seus Apóstolos continua a ser exercida na
              Igreja (CIC § 1536). Compreende três graus: <strong>episcopado</strong> (plenitude do sacerdócio),{" "}
              <strong> presbiterado</strong> e <strong>diaconato</strong>.
            </p>
            <ul>
              <li><strong>Matéria</strong>: imposição das mãos do bispo sobre a cabeça do ordinando.</li>
              <li><strong>Forma</strong>: oração consecratória própria de cada grau, fixada por Pio XII em <em>Sacramentum Ordinis</em> (1947)<FnRef n="ms" />.</li>
              <li><strong>Ministro</strong>: somente o bispo validamente ordenado (Trento, Sess. XXIII, DH 1768<FnRef n="trento23" />); ordenações episcopais sem mandato pontifício são gravemente ilícitas (CDC, c. 1013).</li>
              <li><strong>Sujeito</strong>: <em>“Só o homem batizado recebe validamente a Sagrada Ordenação”</em> (CDC, c. 1024; cf. <em>Ordinatio Sacerdotalis</em>, 1994).</li>
              <li><strong>Efeitos</strong>: caráter indelével, configuração a Cristo Cabeça (sacerdócio ministerial), poder e missão específicos do grau.</li>
            </ul>
          </section>

          <section id="matrimonio" className="scroll-mt-24">
            <h3>7. Matrimônio</h3>
            <p>
              <em>“A aliança matrimonial, pela qual o homem e a mulher constituem entre si um consórcio íntimo de
              toda a vida, ordenado por sua natureza ao bem dos cônjuges e à geração e educação da prole, entre
              batizados foi elevada por Cristo Senhor à dignidade de sacramento”</em> (CDC, c. 1055 § 1; CIC §§
              1601–1666; Trento, Sess. XXIV<FnRef n="trento24" />).
            </p>
            <ul>
              <li><strong>Matéria e forma</strong>: o consentimento mútuo dos esposos, manifestado segundo a forma canônica.</li>
              <li><strong>Ministros</strong>: os próprios noivos (no rito latino); o presbítero ou diácono assiste em nome da Igreja como testemunha qualificada.</li>
              <li><strong>Propriedades essenciais</strong>: <em>unidade</em> e <em>indissolubilidade</em> (c. 1056; CIC § 1644). Fortalecidas no matrimônio cristão pela graça sacramental.</li>
              <li><strong>Fins</strong>: bem dos cônjuges e abertura à vida (CIC §§ 1652–1654; <em>Humanae Vitae</em>, 1968).</li>
              <li><strong>Forma canônica</strong>: presença do Ordinário do lugar, pároco ou seu delegado, e de duas testemunhas (c. 1108).</li>
            </ul>

            <Pullquote cite="Mt 19,6">
              O que Deus uniu, o homem não separe.
            </Pullquote>
          </section>

          <section id="sacramentais" className="scroll-mt-24">
            <h3>Sacramentais</h3>
            <p>
              Distintos dos sacramentos, os <strong>sacramentais</strong> são <em>sinais sagrados que, por uma
              certa imitação dos sacramentos, significam efeitos sobretudo espirituais</em> (Sacrosanctum
              Concilium 60<FnRef n="sc" />; CIC §§ 1667–1679). Incluem bênçãos (de pessoas, alimentos, objetos),
              exorcismos, água benta, escapulários, medalhas, terço, romarias. Não conferem graça{" "}
              <em> ex opere operato</em>, mas dispõem para a recepção dos sacramentos.
            </p>
          </section>

          <section id="teologia" className="scroll-mt-24">
            <h3>Teologia sacramental aprofundada</h3>
            <p>
              A doutrina dos sacramentos organiza-se em torno de algumas distinções técnicas que evitam tanto o
              magismo quanto o subjetivismo.
            </p>
            <h4>Causalidade e <em>ex opere operato</em></h4>
            <p>
              Os sacramentos causam a graça que significam. A tradição escolástica fala de{" "}
              <strong> causalidade instrumental</strong>: Cristo é a causa principal, o rito é o instrumento
              (São Tomás, <em>Summa Theologiae</em> III, q. 62). Por isso Trento definiu que a graça é conferida{" "}
              <em> ex opere operato</em> — pela obra realizada, e não pela santidade do ministro (Sess. VII, cân. 8
              <FnRef n="trento7" />; CIC §§ 1127-1128). Isso não dispensa a fé: <em>“os frutos dos sacramentos
              dependem também das disposições de quem os recebe”</em> (CIC § 1128) — o chamado{" "}
              <em> opus operantis</em>. Um sacramento pode ser <strong>válido</strong> e ainda assim{" "}
              <strong> infrutuoso</strong> se recebido sem as devidas disposições; nesse caso, a Igreja fala de
              graça que <em>revive</em> quando o obstáculo é removido pela conversão.
            </p>
            <h4>Validade, licitude e caráter</h4>
            <ul>
              <li><strong>Validade</strong> — depende de matéria, forma, ministro capaz e intenção de fazer o que faz a Igreja (CIC § 1256; CDC, cc. 840-848).</li>
              <li><strong>Licitude</strong> — depende do cumprimento das normas litúrgicas e canônicas: um sacramento pode ser válido, mas ilícito.</li>
              <li><strong>Caráter sacramental</strong> — Batismo, Confirmação e Ordem imprimem sinal espiritual indelével e por isso jamais se repetem (CIC §§ 1121, 1272, 1582; Trento, Sess. VII, cân. 9).</li>
              <li><strong>Fórmula fixa</strong> — a Congregação para a Doutrina da Fé, nas <em>Responsa ad dubia</em> de 24.06.2020, declarou inválidos batismos celebrados com a fórmula “nós te batizamos…”, porque o sujeito que batiza é Cristo pelo ministro, não a assembleia.</li>
            </ul>
            <h4>Necessidade, desejo e casos-limite</h4>
            <p>
              O Batismo é necessário à salvação para quem ouviu o Evangelho e pode pedi-lo (Jo 3,5; CIC § 1257),
              mas <em>“Deus não está vinculado aos seus sacramentos”</em> (CIC § 1257): a Tradição reconhece o{" "}
              <strong> batismo de sangue</strong> (martírio) e o <strong>batismo de desejo</strong>, explícito ou
              implícito, na busca sincera da verdade e no cumprimento da vontade de Deus segundo a consciência
              (CIC §§ 1258-1260; LG 16). Para os catecúmenos e para quem, sem culpa, ignora o Evangelho, a Igreja
              confia na misericórdia divina — o que nunca autoriza a indiferença missionária (AG 7;{" "}
              <em>Dominus Iesus</em> 20-22).
            </p>
            <h4>Sacramentos e outras confissões cristãs</h4>
            <p>
              O Batismo válido celebrado fora da Igreja Católica não se repete: constitui vínculo real de comunhão
              (UR 3, 22; CIC §§ 1271, 818). Já quanto à Eucaristia e à Ordem, o <em>Decreto Unitatis
              Redintegratio</em> 22 nota a diferença entre as Igrejas orientais, que conservam a sucessão apostólica
              e sacramentos válidos, e as comunidades eclesiais surgidas da Reforma, nas quais falta o sacramento da
              Ordem tal como a Igreja o entende. A <em>communicatio in sacris</em> é regulada pelos cân. 844 e pelo{" "}
              <em> Diretório para a Aplicação dos Princípios e Normas do Ecumenismo</em> (1993).
            </p>
            <h4>Ano litúrgico e economia sacramental</h4>
            <p>
              Os sacramentos não são atos privados: pertencem à <em>economia sacramental</em>, dispensação dos
              frutos da Páscoa de Cristo na liturgia da Igreja (CIC §§ 1076-1112). A Vigília Pascal é o tempo
              paradigmático da iniciação cristã; o Domingo, “dia do Senhor”, é o fundamento e o núcleo de todo o ano
              litúrgico (<em>Sacrosanctum Concilium</em> 106<FnRef n="sc" />).
            </p>

            <NotaConfiabilidade nivel="oficial">
              <em>Ex opere operato</em>, caráter indelével, necessidade do Batismo e a exigência de matéria, forma e
              intenção são doutrina definida (Trento, Sess. VII; CIC). A explicação por “causalidade instrumental” é
              elaboração teológica escolástica recebida pela Igreja, não um dogma em si; e a disciplina da{" "}
              <em> communicatio in sacris</em> é norma canônica, sujeita a determinação da autoridade.
            </NotaConfiabilidade>
          </section>
        </Prose>


        {/* ============ QUICK REFERENCE CARDS ============ */}
        <section className="mt-16">
          <h3 className="font-display text-2xl text-foreground mb-6">Quadro-síntese</h3>
          <CardGrid cols={3}>
            <ContentCard title="Batismo" subtitle="Iniciação · CIC §§ 1213–1284">Água; “N., eu te batizo…”; ministro ordinário: bispo, presbítero, diácono. Indelével.</ContentCard>
            <ContentCard title="Confirmação" subtitle="Iniciação · CIC §§ 1285–1321">Crisma na fronte; “Recebe…”; ministro: bispo. Indelével.</ContentCard>
            <ContentCard title="Eucaristia" subtitle="Iniciação · CIC §§ 1322–1419">Pão de trigo e vinho; palavras da consagração; ministro: presbítero/bispo.</ContentCard>
            <ContentCard title="Penitência" subtitle="Cura · CIC §§ 1422–1498">Contrição, confissão, satisfação; “Eu te absolvo…”; ministro: presbítero/bispo.</ContentCard>
            <ContentCard title="Unção dos Enfermos" subtitle="Cura · CIC §§ 1499–1532">Óleo bento; oração de unção; ministro: presbítero/bispo.</ContentCard>
            <ContentCard title="Ordem" subtitle="Serviço · CIC §§ 1536–1600">Imposição das mãos e oração consecratória; ministro: bispo. Indelével.</ContentCard>
            <ContentCard title="Matrimônio" subtitle="Serviço · CIC §§ 1601–1666">Consentimento dos noivos diante de testemunha qualificada da Igreja.</ContentCard>
          </CardGrid>
        </section>
      </ReadingMode>
    </div>
  );
}
