import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard, Prose, Sources, Pullquote } from "../components/PageShell";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";
import vitral from "../assets/vitral.jpg";

export const Route = createFileRoute("/fe-catolica")({
  head: () => ({
    meta: [
      { title: "A Fé Católica — Credo, Sacramentos, Mandamentos e Oração" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/fe-catolica" },
      { name: "description", content: "Tratado aprofundado sobre a fé católica: a Revelação, a Tradição, o Magistério, o Credo Niceno-Constantinopolitano, os quatro pilares do Catecismo e as notas da Igreja, com citações do CIC, Dei Verbum e Lumen Gentium." },
      { property: "og:title", content: "A Fé Católica — Portal Católico" },
      { property: "og:description", content: "Exposição completa e fundamentada da fé católica segundo o Magistério da Igreja." },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/fe-catolica" }],
  }),
  component: Page,
});

const PILLARS = [
  {
    title: "I. A Profissão da Fé",
    subtitle: "CIC §§ 26-1065",
    body: "O Credo expõe o que a Igreja crê: o mistério do Deus Uno e Trino, a criação do mundo, a Encarnação do Verbo, a Paixão, Morte e Ressurreição de Cristo, a vinda do Espírito Santo, a Igreja, o perdão dos pecados, a ressurreição da carne e a vida eterna. Os dois Símbolos principais — o dos Apóstolos (regula fidei batismal romana) e o Niceno-Constantinopolitano (Concílios de Niceia 325 e Constantinopla I 381) — exprimem a mesma fé única.",
  },
  {
    title: "II. Os Sacramentos da Fé",
    subtitle: "CIC §§ 1066-1690",
    body: "Sete sinais sensíveis e eficazes da graça, instituídos por Cristo e confiados à Igreja, pelos quais nos é dispensada a vida divina: Batismo, Confirmação, Eucaristia (sacramentos da iniciação cristã); Penitência e Unção dos Enfermos (sacramentos de cura); Ordem e Matrimônio (sacramentos ao serviço da comunhão). Operam ex opere operato (Concílio de Trento, Sess. VII, can. 8).",
  },
  {
    title: "III. A Vida em Cristo",
    subtitle: "CIC §§ 1691-2557",
    body: "A moral cristã: dignidade da pessoa criada à imagem de Deus, liberdade, lei moral natural e Lei nova do Espírito; as virtudes teologais (fé, esperança, caridade) e cardeais (prudência, justiça, fortaleza, temperança); o Decálogo iluminado pelas Bem-aventuranças (Mt 5,1-12) e pelo mandamento novo do amor (Jo 13,34).",
  },
  {
    title: "IV. A Oração Cristã",
    subtitle: "CIC §§ 2558-2865",
    body: "A oração como dom de Deus, aliança e comunhão. Suas formas — bênção, adoração, súplica, intercessão, ação de graças, louvor — e suas três grandes expressões: vocal, meditativa e contemplativa. O Pai-Nosso, ensinado por Cristo (Mt 6,9-13; Lc 11,2-4), é a síntese de todo o Evangelho (Tertuliano, De oratione 1).",
  },
];

const NOTES = [
  { title: "Una", body: "Uma só fé, um só Senhor, um só Batismo (Ef 4,5). A unidade visível subsiste na Igreja Católica (LG 8), edificada sobre a comunhão de fé, sacramentos e governo apostólico." },
  { title: "Santa", body: "Santa porque Cristo, sua Cabeça, é santo; santa pelo Espírito que a habita e pela presença dos santos. Comporta pecadores em seu seio chamados à conversão (LG 8; CIC 823-829)." },
  { title: "Católica", body: "‘Kath’ holon’ — segundo a totalidade. Universal pela missão a todos os povos (Mt 28,19) e pela plenitude dos meios de salvação que possui (CIC 830-831; AG 1)." },
  { title: "Apostólica", body: "Fundada sobre os doze Apóstolos (Ef 2,20), guarda seu ensino e é governada por seus sucessores — os bispos em comunhão com o Sucessor de Pedro (LG 19-20; CIC 857)." },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Fides Catholica"
        title="A Fé Católica"
        intro="A fé recebida dos Apóstolos, transmitida pela Tradição viva da Igreja e proclamada pelo Magistério — uma, santa, católica e apostólica."
        image={vitral}
      />

      <Section kicker="Fundamentos" title="O que é a fé?">
        <Prose>
          <p>
            A fé católica é, antes de tudo, <strong>resposta livre do homem a Deus que se revela</strong>. O Catecismo da Igreja Católica define-a como “adesão pessoal de todo o homem a Deus que se revela” e, ao mesmo tempo, “assentimento livre a toda a verdade por Deus revelada” (CIC §§ 142, 150). É virtude teologal: pelo Batismo, “é-nos dada como dom sobrenatural” (CIC § 153), e, segundo São Paulo, vive-se “pela caridade” (Gl 5,6).
          </p>
          <p>
            A Constituição dogmática <em>Dei Verbum</em> do Concílio Vaticano II ensina que “a Deus que revela deve prestar-se a ‘obediência da fé’ (Rm 16,26), pela qual o homem livremente se entrega todo a Deus” (DV 5). Essa obediência não é cega, mas razoável: o Concílio Vaticano I (Dei Filius, cap. 3) afirmou que “a fé é em si mesma sobrenatural, mas conforme à razão, jamais contrária a ela”.
          </p>

          <h3>Revelação, Escritura e Tradição</h3>
          <p>
            Deus se revelou progressivamente — a Adão, a Noé, aos Patriarcas, a Moisés, aos Profetas — culminando em <strong>Cristo, Verbo encarnado, plenitude da Revelação</strong> (Hb 1,1-2; DV 2-4). Não haverá nova Revelação pública até a manifestação gloriosa de Nosso Senhor (CIC § 66).
          </p>
          <p>
            A Revelação chega-nos por dois canais inseparáveis: a <strong>Sagrada Escritura</strong>, que é “a palavra de Deus enquanto, sob a inspiração do Espírito Santo, foi consignada por escrito” (DV 9), e a <strong>Sagrada Tradição</strong>, que “transmite integralmente aos sucessores dos Apóstolos a Palavra de Deus por eles recebida” (DV 9). Ambas “estão estreitamente unidas e se comunicam entre si” e formam “um só sagrado depósito da Palavra de Deus” (DV 10).
          </p>

          <h3>O Magistério: guardião e intérprete</h3>
          <p>
            Cabe ao Magistério vivo da Igreja — o Papa e os Bispos em comunhão com ele — “interpretar autenticamente a Palavra de Deus, escrita ou transmitida” (DV 10). Esse serviço não é superior à Palavra, mas a serve, ensinando “somente o que foi transmitido” (DV 10). Suas formas vão do Magistério ordinário e universal ao infalível, quando o Romano Pontífice define ex cathedra uma doutrina de fé ou moral (Pastor Aeternus, cap. 4; LG 25; CIC § 891).
          </p>
          <h3>Fé e razão: dois caminhos, uma verdade</h3>
          <p>
            A tradição católica jamais opôs fé e razão. O Concílio Vaticano I definiu que Deus pode ser
            conhecido <em>com certeza</em> pela luz natural da razão a partir das criaturas (<em>Dei Filius</em>,
            cap. 2; cân. 1 — DH 3004, 3026), e que, ainda assim, foi conveniente que se revelasse também sobre
            verdades acessíveis à razão. Ao mesmo tempo declarou que existem mistérios <em>estritamente
            sobrenaturais</em> — Trindade, Encarnação, graça — que a razão jamais alcançaria por si (DH 3015-3017).
            São João Paulo II sintetizou esse equilíbrio na encíclica <em>Fides et Ratio</em> (1998, n. 1):
            <em>“a fé e a razão são como as duas asas pelas quais o espírito humano se eleva à contemplação da
            verdade”</em>.
          </p>
          <p>
            Daí a distinção clássica entre os <strong>preâmbulos da fé</strong> (existência de Deus, sua unidade,
            a espiritualidade e imortalidade da alma, a credibilidade dos sinais da Revelação) e os
            <strong> mistérios da fé</strong> propriamente ditos. Milagres e profecias são apresentados pela
            teologia fundamental como <em>sinais de credibilidade</em> — motivos que tornam a fé razoável — nunca
            como demonstrações que a substituam (CIC §§ 156, 159; DV 5).
          </p>

          <h3>Desenvolvimento homogêneo da doutrina</h3>
          <p>
            A Igreja não recebe novas revelações, mas cresce na compreensão do depósito recebido. <em>Dei Verbum</em>
            8 ensina que <em>“esta Tradição, que vem dos Apóstolos, progride na Igreja sob a assistência do
            Espírito Santo”</em>, pela contemplação e estudo dos fiéis, pela inteligência espiritual das coisas
            divinas e pela pregação dos bispos. São Vicente de Lérins já formulara o critério: crescimento
            <em> in eodem sensu eodemque sententia</em> — no mesmo sentido e no mesmo juízo
            (<em>Commonitorium</em> XXIII). O beato John Henry Newman, no <em>Ensaio sobre o Desenvolvimento da
            Doutrina Cristã</em> (1845), propôs sete notas para distinguir desenvolvimento legítimo de corrupção
            — entre elas a preservação do tipo, a continuidade dos princípios e o poder de assimilação.
          </p>
        </Prose>

        <NotaConfiabilidade nivel="oficial">
          As definições citadas nesta seção — a possibilidade do conhecimento natural de Deus, a obediência da fé
          e a inspiração da Escritura — são ensino magisterial definido (Vaticano I, <em>Dei Filius</em>;
          Vaticano II, <em>Dei Verbum</em>). As sete notas de Newman, por sua vez, são contribuição teológica
          recebida com estima, não definição dogmática.
        </NotaConfiabilidade>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 26-49 (capacidade de Deus), 50-141 (Revelação), 142-184 (a resposta da fé)" },
            { label: "Concílio Vaticano II, Dei Verbum (18.11.1965)", ref: "nn. 2-10 (Revelação, Tradição, Escritura, Magistério)" },
            { label: "Concílio Vaticano I, Dei Filius (24.04.1870)", ref: "capp. 2-4; DH 3004-3020, 3026-3043" },
            { label: "São João Paulo II, Encíclica Fides et Ratio (14.09.1998)", ref: "nn. 1, 9, 43-48 (fé, razão e filosofia)" },
            { label: "São Vicente de Lérins, Commonitorium (c. 434)", ref: "cap. XXIII (progresso homogêneo da doutrina)" },
            { label: "J. H. Newman, An Essay on the Development of Christian Doctrine (1845)", ref: "as sete notas do desenvolvimento legítimo" },
          ]}
        />
      </Section>


      <Pullquote cite="São Tomás de Aquino, Summa Theologiae II-II, q.2, a.9">
        Crer é um ato do intelecto que assente à verdade divina por imperativo da vontade movida por Deus mediante a graça.
      </Pullquote>

      <Section kicker="Estrutura" title="Os quatro pilares do Catecismo">
        <p className="max-w-3xl mx-auto text-muted-foreground mb-10 leading-relaxed">
          Promulgado pela Constituição Apostólica <em>Fidei Depositum</em> de São João Paulo II (1992) e revisto em 1997, o Catecismo da Igreja Católica organiza a totalidade da fé católica em quatro grandes partes — a profissão da fé, a celebração do mistério cristão, a vida em Cristo e a oração cristã — espelhando estrutura clássica desde o <em>Catecismo Romano</em> de São Pio V (1566).
        </p>
        <CardGrid cols={2}>
          {PILLARS.map((p) => (
            <ContentCard key={p.title} title={p.title} subtitle={p.subtitle}>
              {p.body}
            </ContentCard>
          ))}
        </CardGrid>
      </Section>

      <Section kicker="Símbolo da Fé" title="O Credo Niceno-Constantinopolitano">
        <Prose>
          <p>
            Proclamado nos Concílios de <strong>Niceia (325)</strong> e <strong>Constantinopla I (381)</strong> contra as heresias arianas e pneumatomáquias, o Credo niceno-constantinopolitano expressa a fé una compartilhada por católicos, ortodoxos e boa parte das comunidades cristãs do Oriente. É recitado na Liturgia Eucarística aos domingos e solenidades (IGMR 68). O texto grego aprovado em 381 não continha a expressão <em>Filioque</em>; a versão abaixo traz a redação litúrgica latina, hoje usada na Igreja Católica de rito romano.
          </p>
          <blockquote>
            Creio em um só Deus, Pai todo-poderoso, criador do céu e da terra, de todas as coisas visíveis e invisíveis. Creio em um só Senhor, Jesus Cristo, Filho Unigênito de Deus, nascido do Pai antes de todos os séculos: Deus de Deus, luz da luz, Deus verdadeiro de Deus verdadeiro, gerado, não criado, consubstancial ao Pai. Por Ele todas as coisas foram feitas. E por nós, homens, e para nossa salvação, desceu dos céus, e se encarnou pelo Espírito Santo, no seio da Virgem Maria, e se fez homem. Também por nós foi crucificado sob Pôncio Pilatos; padeceu e foi sepultado. Ressuscitou ao terceiro dia, conforme as Escrituras, e subiu aos céus, onde está sentado à direita do Pai. E de novo há de vir, em sua glória, para julgar os vivos e os mortos; e o seu reino não terá fim. Creio no Espírito Santo, Senhor que dá a vida, e procede do Pai e do Filho; e com o Pai e o Filho é adorado e glorificado: Ele que falou pelos profetas. Creio na Igreja, una, santa, católica e apostólica. Professo um só batismo para a remissão dos pecados. E espero a ressurreição dos mortos e a vida do mundo que há de vir. Amém.
          </blockquote>
          <h3>Chave de leitura</h3>
          <p>
            O Credo está estruturado em <strong>doze artigos</strong>, agrupados em três grandes seções trinitárias — Pai, Filho, Espírito Santo —, refletindo a fórmula batismal de Mt 28,19. A expressão <em>homoousios tô Patrí</em> (“consubstancial ao Pai”) cunhada em Niceia é o termo dogmático que exclui qualquer subordinacionismo do Filho.
          </p>
          <NotaConfiabilidade nivel="historia">
            O <em>Filioque</em> (“procede do Pai <strong>e do Filho</strong>”) não integrava o texto grego aprovado em Constantinopla I (381), que confessava apenas “procede do Pai” (cf. Jo 15,26). A fórmula foi acolhida progressivamente no Ocidente a partir dos Sínodos hispânicos do séc. VI (Toledo III, 589) como explicitação teológica contra o arianismo residual, difundiu-se na liturgia franco-germânica e foi finalmente incorporada ao Credo romano no início do séc. XI. A Igreja Católica ensina que o Espírito Santo procede eternamente do Pai e do Filho, como de um único princípio (CIC §§ 246-248), e essa doutrina foi reafirmada pelo II Concílio de Lyon (1274) e pelo Concílio de Florença (1439). As Igrejas Orientais mantêm a fórmula bíblica original — o Espírito procede “do Pai” e é comunicado ou manifestado “pelo Filho” (<em>dia tou Hyiou</em>) —, tradição legítima e teologicamente equivalente quando bem entendida. A Congregação para a Doutrina da Fé recorda (1995) que o acréscimo unilateral ao texto conciliar comum, sem consenso ecumênico, foi um gesto disciplinarmente problemático, ainda que a doutrina nele contida seja ortodoxa; por isso a Santa Sé, em ocasiões solenes, tem recitado o Credo em grego sem o Filioque, como sinal de comunhão com o Oriente.
          </NotaConfiabilidade>
          <h3>Os doze artigos e o que cada um exclui</h3>
          <p>
            Cada afirmação do Símbolo nasceu para excluir um erro determinado. <em>“Criador do céu e da terra”</em>
            exclui o dualismo gnóstico e maniqueu, que atribuía a matéria a um princípio mau; <em>“gerado, não
            criado”</em> exclui o arianismo; <em>“consubstancial ao Pai”</em> exclui o subordinacionismo;
            <em> “se fez homem”</em> exclui o docetismo, para o qual o corpo de Cristo seria aparente;
            <em> “padeceu e foi sepultado”</em> afirma a realidade da morte; <em>“ressuscitou ao terceiro dia”</em>
            afirma um acontecimento e não um símbolo; <em>“Senhor que dá a vida”</em> afirma a divindade do
            Espírito Santo; <em>“professo um só batismo”</em> exclui a reiteração do sacramento
            (CIC §§ 194-195, 232-1065).
          </p>
          <h3>Símbolo dos Apóstolos e Símbolo de Niceia</h3>
          <p>
            O <strong>Símbolo dos Apóstolos</strong> é a antiga profissão batismal da Igreja de Roma, cuja forma
            recebida é atestada em fórmulas dos sécs. II-IV e fixada na redação atual em torno do séc. VIII; a
            tradição de atribuir um artigo a cada Apóstolo é lenda medieval piedosa, não dado histórico. O
            <strong> Niceno-Constantinopolitano</strong> é conciliar e por isso goza de autoridade ecumênica
            singular: é o único credo comum a católicos, ortodoxos e a boa parte das comunidades reformadas
            (CIC §§ 193-195).
          </p>
        </Prose>

        <NotaConfiabilidade nivel="tradicao">
          O texto e a autoridade conciliar dos dois Símbolos são certos. A atribuição de cada artigo do Credo a um
          Apóstolo específico é tradição piedosa medieval, sem base documental antiga.
        </NotaConfiabilidade>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 185-197 (os Símbolos da fé)" },
            { label: "Concílios de Niceia I (325) e Constantinopla I (381)", ref: "DH 125, 150 (texto do Símbolo)" },
            { label: "Missal Romano, Ordinário da Missa", ref: "uso litúrgico do Credo aos domingos e solenidades (IGMR 68)" },
            { label: "Denzinger-Hünermann, Enchiridion Symbolorum", ref: "coleção crítica das profissões de fé" },
          ]}
        />
      </Section>


      <Section kicker="Notas da Igreja" title="As quatro marcas da Igreja de Cristo">
        <p className="max-w-3xl mx-auto text-muted-foreground mb-10 leading-relaxed">
          “Creio na Igreja, una, santa, católica e apostólica”: as quatro notas (<em>notae Ecclesiae</em>) — fixadas pelos Padres e definidas pelo Concílio de Constantinopla I — são propriedades inseparáveis da única Igreja de Cristo, que <em>subsistit in</em> Ecclesia Catholica (LG 8; CDF, <em>Dominus Iesus</em>, 16).
        </p>
        <CardGrid cols={4}>
          {NOTES.map((n) => (
            <ContentCard key={n.title} title={n.title}>
              {n.body}
            </ContentCard>
          ))}
        </CardGrid>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 811-870 (as quatro notas da Igreja)" },
            { label: "Concílio Vaticano II, Lumen Gentium (21.11.1964)", ref: "nn. 8, 14-16, 19-20, 23 (subsistit in; colegialidade)" },
            { label: "Concílio Vaticano II, Unitatis Redintegratio (1964)", ref: "nn. 3, 22 (elementos de santificação fora dos limites visíveis)" },
            { label: "Congregação para a Doutrina da Fé, Dominus Iesus (06.08.2000)", ref: "nn. 16-17 (unicidade e unidade da Igreja de Cristo)" },
            { label: "Símbolo Niceno-Constantinopolitano (381)", ref: "DH 150 — “una, sancta, catholica et apostolica Ecclesia”" },
          ]}
        />
      </Section>

      <Section kicker="Dogma trinitário" title="O Deus Uno e Trino">
        <Prose>
          <p>
            <em>“O mistério da Santíssima Trindade é o mistério central da fé e da vida cristã”</em> (CIC § 234).
            A Igreja crê em <strong>um só Deus em três Pessoas realmente distintas</strong> — Pai, Filho e
            Espírito Santo — de uma só substância, natureza e essência (Concílio de Latrão IV, 1215 — DH 800).
            Não há três deuses, nem um só Deus com três máscaras ou modos: <em>“As Pessoas divinas são
            realmente distintas entre si… distinguem-se apenas pelas relações de origem”</em> (CIC §§ 254-255).
          </p>
          <h3>A elaboração do vocabulário</h3>
          <p>
            O dogma foi formulado em resposta a crises concretas. Contra o <strong>arianismo</strong>, que negava
            a divindade do Filho, <strong>Niceia I (325)</strong> proclamou o Verbo <em>homooúsios tô Patrí</em> —
            consubstancial ao Pai (DH 125). Contra os <em>pneumatómacos</em>, que negavam a divindade do Espírito,
            <strong> Constantinopla I (381)</strong> confessou o Espírito Santo <em>“Senhor que dá a vida”</em>,
            adorado e glorificado com o Pai e o Filho (DH 150). A distinção grega entre <em>ousía</em> (essência,
            o que é comum) e <em>hypóstasis</em> (subsistência, o que é próprio), consolidada pelos Padres
            Capadócios — Basílio, Gregório de Nazianzo, Gregório de Nissa —, permitiu dizer <em>“uma essência,
            três hipóstases”</em> sem cair no triteísmo nem no modalismo.
          </p>
          <h3>Missões, relações e inabitação</h3>
          <p>
            O Pai é a fonte sem origem; o Filho é gerado eternamente; o Espírito procede. As Pessoas são
            <em> subsistentes relações</em> (São Tomás, <em>Summa Theologiae</em> I, q. 29, a. 4). Vale o axioma
            patrístico da <em>perichóresis</em> ou circumincessão: cada Pessoa está inteiramente nas outras
            (Jo 14,10-11; CIC § 255). Nas obras <em>ad extra</em>, toda a Trindade age inseparavelmente, ainda que
            cada Pessoa manifeste o que lhe é próprio (CIC § 258) — a criação atribuída ao Pai, a redenção ao
            Filho, a santificação ao Espírito, por <em>apropriação</em>, não por divisão de operações.
          </p>
          <h3>O <em>Filioque</em>: nota histórica precisa</h3>
          <p>
            O texto grego de 381 diz que o Espírito <em>procede do Pai</em>. A adição latina <em>Filioque</em>
            — “e do Filho” — difundiu-se na Espanha visigótica (Toledo, sécs. VI-VII) e foi inserida no Credo
            recitado em Roma no século XI. Os concílios de <strong>Lyon II (1274)</strong> e de
            <strong> Florença (1439)</strong> a professaram, esclarecendo que o Espírito procede <em>tamquam ab uno
            principio</em> — de um único princípio (DH 850, 1300-1302). O Conselho Pontifício para a Unidade dos
            Cristãos, no esclarecimento de 1995, reconheceu que a fórmula grega <em>“procede do Pai por meio do
            Filho”</em> exprime a mesma fé e que o <em>Filioque</em> não deve ser lido como afirmação de dois
            princípios. Nas celebrações em grego, a Igreja Católica usa o texto conciliar sem a adição.
          </p>
        </Prose>

        <NotaConfiabilidade nivel="oficial">
          Consubstancialidade, distinção real das Pessoas e unidade de essência são dogmas definidos (Niceia I,
          Constantinopla I, Latrão IV). A explicação das Pessoas como “relações subsistentes” é doutrina teológica
          tomista, largamente recebida, mas não uma definição conciliar em si mesma.
        </NotaConfiabilidade>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 232-267 (o mistério trinitário); 683-747 (o Espírito Santo)" },
            { label: "Concílio de Niceia I (325)", ref: "DH 125-126 (homooúsios)" },
            { label: "Concílio de Constantinopla I (381)", ref: "DH 150 (divindade do Espírito Santo)" },
            { label: "Concílio de Latrão IV (1215)", ref: "DH 800-804 (Firmiter credimus)" },
            { label: "Concílio de Florença, Bula Laetentur caeli (06.07.1439)", ref: "DH 1300-1302 (tamquam ab uno principio)" },
            { label: "Pontifício Conselho para a Unidade dos Cristãos, Esclarecimento sobre o Filioque (1995)", ref: "recepção da fórmula grega" },
            { label: "São Tomás de Aquino, Summa Theologiae", ref: "I, qq. 27-43 (tratado trinitário)" },
          ]}
        />
      </Section>

      <Section kicker="Cristologia" title="Jesus Cristo, verdadeiro Deus e verdadeiro homem">
        <Prose>
          <p>
            O centro da fé é uma pessoa: <strong>Jesus de Nazaré, o Verbo eterno feito carne</strong> (Jo 1,14).
            A fé católica confessa nele <em>uma só Pessoa divina em duas naturezas, divina e humana</em> — a
            <strong> união hipostática</strong>. Esse enunciado é fruto de cinco séculos de precisão dogmática.
          </p>
          <h3>Os concílios cristológicos</h3>
          <ul>
            <li><strong>Éfeso (431)</strong> — contra Nestório, proclama Maria <em>Theotókos</em>, Mãe de Deus, porque um só é o sujeito, o Verbo encarnado (DH 250-252).</li>
            <li><strong>Calcedônia (451)</strong> — define o Cristo <em>“em duas naturezas, sem confusão, sem mudança, sem divisão, sem separação”</em>, subsistentes numa só pessoa e hipóstase (DH 301-302).</li>
            <li><strong>Constantinopla II (553)</strong> — precisa que o sujeito da encarnação é a própria Pessoa do Verbo, uma das da Trindade (DH 421-438).</li>
            <li><strong>Constantinopla III (681)</strong> — contra o monotelismo, afirma <strong>duas vontades e duas operações</strong>, com a vontade humana livremente conforme à divina (DH 553-559).</li>
            <li><strong>Niceia II (787)</strong> — legitima a veneração das imagens, porque o Verbo assumiu carne visível: a honra à imagem passa ao protótipo (DH 600-603).</li>
          </ul>
          <h3>Consequências vitais</h3>
          <p>
            Da união hipostática decorre a <em>communicatio idiomatum</em>: pode-se dizer com verdade que o Filho
            de Deus sofreu e morreu, e que o filho de Maria é adorado. Cristo possui verdadeira alma humana,
            inteligência e liberdade humanas (CIC §§ 470-478), foi tentado sem pecado (Hb 4,15) e cresceu em
            sabedoria segundo sua ciência experimental (Lc 2,52). Sua obra redentora é ao mesmo tempo
            <strong> sacrifício, expiação e nova aliança</strong> (CIC §§ 599-618), livremente oferecida
            (Jo 10,18) e coroada pela <strong>Ressurreição</strong>, que não é metáfora nem experiência interior
            dos discípulos, mas acontecimento real e transcendente atestado pelo túmulo vazio e pelas aparições
            (1Cor 15,3-8; CIC §§ 638-658).
          </p>
        </Prose>

        <NotaConfiabilidade nivel="oficial">
          Todos os enunciados desta seção são definições conciliares dogmáticas. Reconstruções históricas sobre a
          cronologia exata dos eventos da vida pública de Jesus pertencem ao campo da exegese e não vinculam a fé.
        </NotaConfiabilidade>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 422-682 (Creio em Jesus Cristo)" },
            { label: "Concílio de Éfeso (431)", ref: "DH 250-252 (Theotókos)" },
            { label: "Concílio de Calcedônia (451)", ref: "DH 300-303 (símbolo cristológico)" },
            { label: "Concílio de Constantinopla III (680-681)", ref: "DH 553-559 (duas vontades)" },
            { label: "Concílio de Niceia II (787)", ref: "DH 600-609 (veneração das imagens)" },
            { label: "Bento XVI, Jesus de Nazaré (2007-2012)", ref: "leitura teológica dos Evangelhos — obra de estudo, não ato magisterial" },
          ]}
        />
      </Section>

      <Section kicker="Graça e salvação" title="Justificação, graça e mérito">
        <Prose>
          <p>
            <em>“A graça é o auxílio que Deus nos dá para responder ao nosso chamado”</em> (CIC § 1996). Ela é
            <strong> absolutamente gratuita</strong>: nada no homem, nem sequer o início da fé, precede o dom
            divino. O <strong>II Concílio de Orange (529)</strong> condenou o semipelagianismo e definiu que até o
            desejo de crer é obra da graça preveniente (DH 373-377).
          </p>
          <h3>O decreto de Trento sobre a justificação</h3>
          <p>
            A <strong>Sessão VI (1547)</strong> é o texto magisterial mais completo sobre o tema (DH 1520-1583).
            Ensina que a justificação é <em>“não só remissão dos pecados, mas também santificação e renovação
            interior do homem”</em> (DH 1528) — isto é, não uma declaração extrínseca, mas transformação real pela
            graça santificante infusa. O homem coopera livremente, podendo dissentir (DH 1554), e as boas obras
            realizadas na graça são <strong>verdadeiramente meritórias</strong>, ainda que todo mérito seja dom de
            Deus: <em>“a graça precede o mérito”</em>, dirá o CIC § 2008, retomando Santo Agostinho — Deus coroa
            em nós os seus próprios dons.
          </p>
          <h3>Distinções que evitam confusões</h3>
          <ul>
            <li><strong>Graça santificante (habitual)</strong> — dom permanente que nos torna participantes da vida divina (CIC §§ 1999-2000; 2Pd 1,4).</li>
            <li><strong>Graças atuais</strong> — intervenções pontuais para agir ou converter-se.</li>
            <li><strong>Graças sacramentais e carismas</strong> — próprios de cada sacramento; os carismas ordenam-se ao bem comum (1Cor 12,7; CIC § 2003).</li>
            <li><strong>Pecado mortal e venial</strong> — o primeiro destrói a caridade e a graça santificante, exigindo matéria grave, plena advertência e consentimento deliberado (CIC §§ 1854-1864).</li>
          </ul>
          <h3>Sobre o diálogo ecumênico</h3>
          <p>
            A <em>Declaração Conjunta sobre a Doutrina da Justificação</em> (Igreja Católica e Federação Luterana
            Mundial, Augsburgo, 31.10.1999) reconheceu um consenso sobre verdades fundamentais e afirmou que as
            condenações de Trento não atingem o ensino apresentado na Declaração. Não é uma revogação de Trento:
            trata-se de documento de diálogo, cuja recepção católica foi acompanhada de um <em>Anexo</em>
            esclarecedor. O ensino vinculante permanece o da Sessão VI.
          </p>
        </Prose>

        <NotaConfiabilidade nivel="oficial">
          Gratuidade da graça, justificação transformadora e realidade do mérito sob a graça são doutrina definida
          (Orange II; Trento, Sess. VI). Já a <em>Declaração Conjunta</em> de 1999 é documento de diálogo
          ecumênico com aprovação da Santa Sé, de peso distinto de uma definição conciliar.
        </NotaConfiabilidade>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 1987-2029 (graça e justificação); 1846-1876 (pecado)" },
            { label: "II Concílio de Orange (529)", ref: "DH 370-397 (graça preveniente)" },
            { label: "Concílio de Trento, Sessão VI (13.01.1547)", ref: "DH 1520-1583 (decreto e cânones sobre a justificação)" },
            { label: "Igreja Católica e FLM, Declaração Conjunta sobre a Justificação (31.10.1999)", ref: "com o Anexo oficial de esclarecimento" },
            { label: "Santo Agostinho, De gratia et libero arbitrio", ref: "os méritos como dons de Deus" },
          ]}
        />
      </Section>

      <Section kicker="Novíssimos" title="Morte, juízo, céu, purgatório e inferno">
        <Prose>
          <p>
            A escatologia católica é sóbria e precisa. <strong>Cada homem</strong>, ao morrer, recebe no
            <em> juízo particular</em> a retribuição eterna (CIC § 1022; Hb 9,27). A constituição
            <em> Benedictus Deus</em> de Bento XII (1336) definiu que as almas plenamente purificadas veem a
            essência divina <strong>imediatamente</strong>, antes da ressurreição dos corpos, e que as que morrem
            em pecado mortal descem logo ao inferno (DH 1000-1002).
          </p>
          <ul>
            <li><strong>Céu</strong> — visão beatífica, comunhão perfeita de vida e amor com a Trindade (CIC §§ 1023-1029).</li>
            <li><strong>Purgatório</strong> — purificação dos que morrem na graça mas ainda imperfeitamente purificados; definido em Lyon II (1274), Florença (1439) e Trento, Sess. XXV (DH 856, 1304, 1820). A Igreja define a <em>existência</em> da purificação e a utilidade dos sufrágios, não sua duração nem imagens de fogo material.</li>
            <li><strong>Inferno</strong> — estado de autoexclusão definitiva da comunhão com Deus, cuja pena principal é a separação eterna (CIC §§ 1033-1037). A Igreja ensina sua realidade e eternidade; nunca declarou que qualquer pessoa concreta esteja nele.</li>
            <li><strong>Juízo final e ressurreição da carne</strong> — na vinda glorificada de Cristo, todos ressuscitarão com o próprio corpo transfigurado (1Cor 15,42-44; CIC §§ 988-1004, 1038-1050).</li>
          </ul>
          <h3>Limbo, oração pelos defuntos e indulgências</h3>
          <p>
            O <em>limbo</em> das crianças mortas sem batismo nunca foi definido como dogma: foi hipótese
            teológica escolástica. A Comissão Teológica Internacional, no documento <em>A esperança da salvação
            para as crianças que morrem sem batismo</em> (2007), aprovado por Bento XVI para publicação, conclui
            que há razões teológicas e litúrgicas para esperar sua salvação, confiando-as à misericórdia divina —
            sem afirmar certeza doutrinal. A oração pelos defuntos é atestada desde 2Mac 12,44-46 e pela liturgia
            antiga; as <strong>indulgências</strong> são a remissão da pena temporal, regulada pelo <em>Enchiridion
            Indulgentiarum</em> e pelos cân. 992-997, e nunca perdão de pecados não arrependidos.
          </p>
        </Prose>

        <NotaConfiabilidade nivel="oficial">
          Juízo particular, céu, purgatório, inferno e ressurreição da carne são dogmas. Representações populares
          (fogo material, contagem de tempo no purgatório) e a hipótese do limbo não são ensino definido e são aqui
          apresentadas como tradição teológica.
        </NotaConfiabilidade>

        <Sources
          items={[
            { label: "Catecismo da Igreja Católica", ref: "§§ 988-1065 (ressurreição e vida eterna); 1020-1060 (novíssimos)" },
            { label: "Bento XII, Constituição Benedictus Deus (29.01.1336)", ref: "DH 1000-1002" },
            { label: "II Concílio de Lyon (1274) e Concílio de Florença (1439)", ref: "DH 856, 1304-1306 (purgatório e sufrágios)" },
            { label: "Concílio de Trento, Sessão XXV (1563)", ref: "DH 1820 (decreto sobre o purgatório)" },
            { label: "Comissão Teológica Internacional, A esperança da salvação para as crianças que morrem sem batismo (2007)", ref: "documento de estudo aprovado para publicação" },
            { label: "Paulo VI, Constituição Apostólica Indulgentiarum Doctrina (01.01.1967)", ref: "doutrina e disciplina das indulgências" },
          ]}
        />
      </Section>



      <Section kicker="Síntese" title="Para meditar">
        <Prose>
          <p>
            “A fé é a substância das coisas que se esperam, a prova das que não se veem” (Hb 11,1). Ela não é sentimento vago nem mera adesão intelectual a proposições: é <strong>encontro pessoal com o Deus vivo</strong>, conhecimento amoroso de Cristo, vida nova no Espírito. Crer e viver são, na fé católica, inseparáveis: <em>fides quae</em> (o conteúdo crido) e <em>fides qua</em> (o ato de crer) sustentam-se mutuamente.
          </p>
          <p>
            Por isso a Igreja transmite, em cada geração, “o depósito da fé” (1Tm 6,20) na sua integridade — <em>nec plus, nec minus, nec aliter</em>, dizia São Vicente de Lérins (<em>Commonitorium</em> XXIII): nada se acrescenta, nada se subtrai, nada se altera, ainda que cresça em compreensão sob a ação do Espírito Santo.
          </p>
        </Prose>
        <Sources
          items={[
            { label: "Catecismo da Igreja Católica (1997)", ref: "§§ 26-1065 (Profissão da Fé); 142-184 (a fé do homem); 74-100 (Tradição e Escritura)" },
            { label: "Concílio Vaticano II — Constituição Dogmática Dei Verbum (1965)", ref: "Sobre a Divina Revelação" },
            { label: "Concílio Vaticano II — Constituição Dogmática Lumen Gentium (1964)", ref: "Sobre a Igreja, especialmente §§ 8, 19-20, 25" },
            { label: "Concílio Vaticano I — Constituição Dogmática Dei Filius (1870)", ref: "Sobre a fé católica e a relação fé-razão" },
            { label: "São João Paulo II — Constituição Apostólica Fidei Depositum (1992)", ref: "Promulgação do CIC" },
            { label: "Concílio de Trento", ref: "Sessões IV (Escritura e Tradição) e VII (Sacramentos)" },
            { label: "Congregação para a Doutrina da Fé", ref: "Nota sobre o Filioque (1995), sobre a doutrina trinitária e sua expressão originária" },
            { label: "II Concílio de Lyon (1274) e Concílio de Florença (1439)", ref: "Reafirmação da procedência do Espírito Santo do Pai e do Filho" },
            { label: "São Vicente de Lérins — Commonitorium (séc. V)", ref: "Critério da catolicidade da doutrina" },
            { label: "São Tomás de Aquino — Summa Theologiae", ref: "II-II, qq. 1-16 (tratado da fé)" },
          ]}
        />
      </Section>
    </div>
  );
}
