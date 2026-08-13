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
        </Prose>
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
        </Prose>
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
