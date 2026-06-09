import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CardGrid, ContentCard, Prose, Pullquote } from "../components/PageShell";
import { ReadingMode, FnRef } from "../components/ReadingMode";
import { VersiculoDoDia } from "../components/VersiculoDoDia";
import { MapaAnoLiturgico } from "../components/MapaAnoLiturgico";

export const Route = createFileRoute("/calendario-liturgico")({
  head: () => ({
    meta: [
      { title: "Calendário Litúrgico — Tempos do Ano da Igreja Católica" },
      { name: "description", content: "O Ano Litúrgico católico em profundidade: Advento, Natal, Quaresma, Tríduo, Páscoa, Pentecostes e Tempo Comum, com cores litúrgicas, datas, espiritualidade e fontes oficiais (SC, Normas Universais, Missal Romano)." },
      { property: "og:title", content: "Calendário Litúrgico Católico" },
      { property: "og:description", content: "Os tempos do Ano Litúrgico segundo a Igreja, com fontes magisteriais." },
    ],
  }),
  component: Page,
});

const TOC = [
  { id: "introducao", label: "O Ano Litúrgico" },
  { id: "cores", label: "Cores litúrgicas" },
  { id: "estrutura", label: "Estrutura do ano" },
  { id: "advento", label: "I. Advento" },
  { id: "natal", label: "II. Natal" },
  { id: "comum-1", label: "III. Tempo Comum (I)" },
  { id: "quaresma", label: "IV. Quaresma" },
  { id: "semana-santa", label: "V. Semana Santa" },
  { id: "triduo", label: "VI. Tríduo Pascal" },
  { id: "pascoa", label: "VII. Tempo Pascal" },
  { id: "comum-2", label: "VIII. Tempo Comum (II)" },
  { id: "solenidades", label: "Solenidades do Senhor" },
  { id: "mapa", label: "Mapa do Ano (interativo)" },
  { id: "versiculo", label: "Versículo do dia" },
  { id: "notas", label: "Notas e fontes" },
];

const FOOTNOTES = [
  { id: "sc", label: "Concílio Vaticano II, Sacrosanctum Concilium (04.12.1963)", ref: "cap. V (nn. 102–111) — “O Ano Litúrgico”" },
  { id: "normas", label: "Sagrada Congregação para o Culto Divino, Normas Universais sobre o Ano Litúrgico e o Calendário (Normæ Universales de Anno Liturgico et de Calendario)", ref: "Aprovadas por Paulo VI em 14.02.1969 (motu proprio Mysterii Paschalis)" },
  { id: "mp", label: "Paulo VI, Motu proprio Mysterii Paschalis (14.02.1969)", ref: "promulgação do novo Calendário Romano" },
  { id: "missal", label: "Missale Romanum, editio typica tertia (2002, reimpressa 2008)", ref: "calendário próprio do rito romano" },
  { id: "ig", label: "Instrução Geral do Missal Romano (IGMR)", ref: "Cap. VIII — “Missas e Orações para Diversas Necessidades”; nn. 345–347 sobre cores litúrgicas" },
  { id: "paschalis-sollemnitatis", label: "Congregação para o Culto Divino, Carta Circular Paschalis Sollemnitatis (16.01.1988)", ref: "sobre a preparação e celebração das festas pascais" },
  { id: "directorium", label: "Diretório sobre piedade popular e liturgia (Dicastério para o Culto Divino, 2002)", ref: "Princípios e orientações" },
  { id: "cic", label: "Catecismo da Igreja Católica", ref: "§§ 1163–1173 — O Ano Litúrgico" },
  { id: "nicea", label: "Concílio de Niceia (325) — fixação da data da Páscoa", ref: "primeiro domingo após a primeira lua cheia da primavera boreal" },
  { id: "cnbb-cores", label: "CNBB, Manual de Liturgia (orientações pastorais)", ref: "uso das cores no Brasil" },
];

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Annus Liturgicus"
        title={
          <>
            O Ano <br/> <span className="text-gold italic">Litúrgico</span>
          </>
        }
        intro="A Igreja desdobra ao longo do ano todo o mistério de Cristo, da Encarnação à Páscoa, do Pentecostes à espera escatológica."
      />

      <ReadingMode title="O Ano Litúrgico" toc={TOC} footnotes={FOOTNOTES}>
        <Prose>
          <section id="introducao" className="scroll-mt-24">
            <h3>O que é o Ano Litúrgico</h3>
            <p>
              O Concílio Vaticano II ensina que <em>“a Santa Mãe Igreja considera de seu dever celebrar, em
              certos dias do ano, com sagrada recordação, a obra salvífica do seu divino Esposo. Em cada semana,
              no dia que chamou Domingo, comemora a Ressurreição do Senhor… Desenvolvendo no decurso do ano todo
              o mistério de Cristo, desde a Encarnação e o Nascimento até a Ascensão, até o Pentecostes e a
              expectativa da feliz esperança e vinda do Senhor”</em> (<em>Sacrosanctum Concilium</em> 102<FnRef n="sc" />).
            </p>
            <p>
              A reforma promulgada por Paulo VI em <em>Mysterii Paschalis</em> (1969)<FnRef n="mp" /> fixou as
              atuais <em>Normas Universais sobre o Ano Litúrgico</em><FnRef n="normas" />, que regem o
              calendário do rito romano. O Catecismo dedica os §§ 1163–1173 ao tema<FnRef n="cic" />.
            </p>

            <Pullquote cite="Sacrosanctum Concilium 102 — Concílio Vaticano II">
              Recordando assim os mistérios da Redenção, abre aos fiéis as riquezas das virtudes e dos méritos
              do seu Senhor, de modo a torná-los como que presentes em todo o tempo.
            </Pullquote>
          </section>

          <section id="cores" className="scroll-mt-24">
            <h3>Cores litúrgicas</h3>
            <p>
              A <em>Instrução Geral do Missal Romano</em> (IGMR) nn. 345–347<FnRef n="ig" /> regula as cores
              das vestes sagradas, sinais visíveis do caráter de cada celebração:
            </p>
            <ul>
              <li><strong>Branco</strong> — alegria pascal; tempos de Natal e Páscoa, festas do Senhor (exceto da Paixão), de Nossa Senhora, dos anjos, dos santos não mártires.</li>
              <li><strong>Vermelho</strong> — Domingo de Ramos, Sexta-feira da Paixão, Pentecostes, festas dos Apóstolos e Evangelistas, dos mártires.</li>
              <li><strong>Verde</strong> — Tempo Comum.</li>
              <li><strong>Roxo</strong> — Advento e Quaresma; missas exequiais.</li>
              <li><strong>Rosa</strong> — opcional no III Domingo do Advento (<em>Gaudete</em>) e IV da Quaresma (<em>Lætare</em>).</li>
              <li><strong>Preto</strong> — pode usar-se nas missas dos defuntos (uso restaurado pela IGMR 346).</li>
              <li><strong>Dourado/prata</strong> — em solenidades muito festivas, em lugar das demais cores (exceto roxo, vermelho e preto).</li>
            </ul>
          </section>

          <section id="estrutura" className="scroll-mt-24">
            <h3>Estrutura do ano</h3>
            <p>
              Pelas <em>Normas Universais</em><FnRef n="normas" />, o Ano Litúrgico organiza-se em oito tempos
              ou ciclos:
            </p>
            <ol>
              <li><strong>Advento</strong> (4 semanas) — cor roxa.</li>
              <li><strong>Natal</strong> (Natividade ao Batismo do Senhor) — cor branca.</li>
              <li><strong>Tempo Comum</strong> primeira parte (do dia seguinte ao Batismo até a Quarta-feira de Cinzas) — cor verde.</li>
              <li><strong>Quaresma</strong> (40 dias, da Quarta-feira de Cinzas à Missa <em>in Cena Domini</em>) — cor roxa.</li>
              <li><strong>Tríduo Pascal</strong> (Quinta-feira Santa à tarde à Vigília Pascal) — vermelho/branco.</li>
              <li><strong>Tempo Pascal</strong> (Vigília Pascal a Pentecostes, 50 dias) — cor branca.</li>
              <li><strong>Tempo Comum</strong> segunda parte (até o sábado antes do I Domingo do Advento) — cor verde.</li>
              <li><strong>Solenidade de Cristo Rei do Universo</strong>, último domingo, encerra o Ano Litúrgico.</li>
            </ol>
          </section>

          <section id="advento" className="scroll-mt-24">
            <h3>I. Advento</h3>
            <p>
              <em>“O tempo do Advento tem dupla índole: é tempo de preparação para o Natal, em que se comemora a
              primeira vinda do Filho de Deus aos homens, e tempo em que, por essa recordação, as mentes se voltam
              para a expectativa da segunda vinda de Cristo no fim dos tempos”</em> (<em>Normas Universais</em>, n.
              39<FnRef n="normas" />). É <strong>tempo de devota e alegre expectativa</strong> (n. 39).
            </p>
            <ul>
              <li><strong>Duração</strong>: 4 domingos, do domingo entre 27 de novembro e 3 de dezembro até a tarde de 24 de dezembro.</li>
              <li><strong>Cor</strong>: roxa; rosa no III Domingo (<em>Gaudete</em>).</li>
              <li><strong>Características</strong>: ausência do <em>Glória</em> nas missas dominicais; órgão e instrumentos com sobriedade; ornamentação contida.</li>
              <li><strong>Ferias privilegiadas</strong>: 17 a 24 de dezembro — preparação imediata; antífonas <em>“Ó”</em> da Liturgia das Horas.</li>
            </ul>
          </section>

          <section id="natal" className="scroll-mt-24">
            <h3>II. Tempo do Natal</h3>
            <p>
              <em>“Depois da celebração anual do mistério pascal, nada têm a Igreja mais a peito do que recordar
              o Nascimento do Senhor e as suas primeiras manifestações; é o que se faz no Tempo do Natal”</em>
              (<em>Normas Universais</em>, n. 32). Estende-se das I Vésperas do Natal até o Domingo do Batismo
              do Senhor inclusive (n. 33).
            </p>
            <ul>
              <li><strong>25 de dezembro</strong> — Solenidade da Natividade do Senhor (três Missas: da Noite, da Aurora, do Dia).</li>
              <li><strong>Oitava do Natal</strong> — 26 a 31 de dezembro; <strong>1.º de janeiro</strong>: Solenidade de Santa Maria, Mãe de Deus (oitavo dia).</li>
              <li><strong>Epifania do Senhor</strong> — 6 de janeiro (ou domingo entre 2 e 8 de janeiro, conforme o calendário local).</li>
              <li><strong>Batismo do Senhor</strong> — domingo seguinte à Epifania; encerra o Tempo do Natal.</li>
              <li><strong>Sagrada Família</strong> — domingo entre Natal e o Ano-Novo (ou 30.12, se não houver).</li>
            </ul>
          </section>

          <section id="comum-1" className="scroll-mt-24">
            <h3>III. Tempo Comum — primeira parte</h3>
            <p>
              Inicia-se na segunda-feira após o Batismo do Senhor e prossegue até a Quarta-feira de Cinzas
              exclusivamente (<em>Normas Universais</em>, n. 44). Conta-se em <em>“Semanas do Tempo Comum”</em>
              (até 34 ao todo). Cor: verde, sinal de esperança e de vida nova.
            </p>
          </section>

          <section id="quaresma" className="scroll-mt-24">
            <h3>IV. Quaresma</h3>
            <p>
              <em>“A Quaresma destina-se a preparar a celebração da Páscoa: a liturgia quaresmal dispõe à
              celebração do Mistério Pascal tanto os catecúmenos, pelos vários graus da Iniciação Cristã, como
              os fiéis, recordando o seu Batismo e fazendo penitência”</em> (<em>Normas Universais</em>, n. 27).
              Os <strong>40 dias</strong> evocam o jejum de Cristo no deserto (Mt 4,1–11).
            </p>
            <ul>
              <li><strong>Duração</strong>: da Quarta-feira de Cinzas à Missa vespertina <em>in Cena Domini</em> (Quinta-feira Santa).</li>
              <li><strong>Cor</strong>: roxa; rosa no IV Domingo (<em>Lætare</em>).</li>
              <li><strong>Disciplina</strong>: jejum (na Cinzas e Sexta-feira Santa) e abstinência de carne em todas as sextas-feiras (CDC, c. 1251); supressão do <em>Aleluia</em> e do <em>Glória</em>.</li>
              <li><strong>Três obras</strong>: oração, jejum e esmola (Mt 6,1–18 — Evangelho da Quarta-feira de Cinzas).</li>
            </ul>
          </section>

          <section id="semana-santa" className="scroll-mt-24">
            <h3>V. Semana Santa</h3>
            <p>
              <em>“Os primeiros seis dias da Semana Santa dirigem-se à comemoração mais intensa da Paixão do
              Senhor”</em> (<em>Normas Universais</em>, n. 31). Tem como marcos:
            </p>
            <ul>
              <li><strong>Domingo de Ramos da Paixão do Senhor</strong> — bênção dos ramos, procissão e leitura solene da Paixão.</li>
              <li><strong>Segunda, Terça e Quarta-feira Santas</strong> — leituras dos cânticos do Servo Sofredor (Is 42; 49; 50).</li>
              <li><strong>Missa do Crisma</strong> (Quinta-feira Santa, manhã, na catedral) — bênção dos santos óleos; renovação das promessas sacerdotais.</li>
            </ul>
            <p>
              A celebração detalhada é normada pela Carta Circular <em>Paschalis Sollemnitatis</em>
              (1988)<FnRef n="paschalis-sollemnitatis" />.
            </p>
          </section>

          <section id="triduo" className="scroll-mt-24">
            <h3>VI. Sacro Tríduo Pascal</h3>
            <p>
              <em>“Cristo redimiu a humanidade e deu perfeita glória a Deus principalmente pelo seu Mistério
              Pascal, no qual, morrendo, destruiu a nossa morte e, ressuscitando, restaurou a vida. Por isso, o
              Tríduo da Paixão e da Ressurreição do Senhor brilha como ápice de todo o Ano Litúrgico”</em>
              (<em>Normas Universais</em>, n. 18). Inicia-se na Missa vespertina <em>in Cena Domini</em>, tem o
              seu centro na Vigília Pascal e encerra-se com as II Vésperas do Domingo da Ressurreição (n. 19).
            </p>
            <ul>
              <li><strong>Quinta-feira Santa, à tarde</strong> — Missa <em>in Cena Domini</em>: instituição da Eucaristia, do sacerdócio e do mandamento do amor (lava-pés). Cor branca.</li>
              <li><strong>Sexta-feira da Paixão do Senhor</strong> — única celebração não-eucarística: liturgia da Palavra, oração universal, adoração da Cruz e comunhão. Jejum e abstinência. Cor vermelha.</li>
              <li><strong>Sábado Santo</strong> — silêncio diante do sepulcro; nenhum sacramento, exceto Penitência e Unção.</li>
              <li><strong>Vigília Pascal na Noite Santa</strong> — “mãe de todas as Vigílias” (Santo Agostinho, <em>Sermo</em> 219). Lucernário, Liturgia da Palavra (até 9 leituras), Liturgia Batismal e Liturgia Eucarística. Cor branca.</li>
            </ul>
          </section>

          <section id="pascoa" className="scroll-mt-24">
            <h3>VII. Tempo Pascal</h3>
            <p>
              <em>“Os cinquenta dias que vão do Domingo da Ressurreição ao Domingo do Pentecostes celebram-se na
              alegria e na exultação como um só dia de festa, como um grande Domingo”</em> (<em>Normas
              Universais</em>, n. 22). Os primeiros oito dias formam a <strong>Oitava da Páscoa</strong>,
              celebrados como solenidades do Senhor (n. 24). Em todas as missas canta-se o <em>Aleluia</em>
              recuperado e o <em>Sequência</em> pascal <em>Victimæ Paschali Laudes</em>.
            </p>
            <ul>
              <li><strong>Domingo da Divina Misericórdia</strong> — II Domingo de Páscoa, instituído por São João Paulo II em 2000.</li>
              <li><strong>Ascensão do Senhor</strong> — 40 dias após a Páscoa (5.ª-feira), transferida para o 7.º Domingo em vários países.</li>
              <li><strong>Pentecostes</strong> — 50.º dia; conclusão do Tempo Pascal. Vigília alongada permitida no Missal.</li>
            </ul>
          </section>

          <section id="comum-2" className="scroll-mt-24">
            <h3>VIII. Tempo Comum — segunda parte</h3>
            <p>
              Retomado após o Pentecostes, estende-se até as I Vésperas do I Domingo do Advento. Concluise
              solenemente com <strong>Nosso Senhor Jesus Cristo, Rei do Universo</strong>, instituída por Pio XI
              na encíclica <em>Quas Primas</em> (11.12.1925), atualmente fixada no <strong>último domingo do
              Ano Litúrgico</strong>.
            </p>
          </section>

          <section id="solenidades" className="scroll-mt-24">
            <h3>Principais Solenidades do Senhor</h3>
            <ul>
              <li><strong>Santíssima Trindade</strong> — domingo após Pentecostes.</li>
              <li><strong>Santíssimo Corpo e Sangue de Cristo (Corpus Christi)</strong> — quinta-feira após a Trindade (ou domingo seguinte). Instituída por Urbano IV (bula <em>Transiturus</em>, 1264).</li>
              <li><strong>Sagrado Coração de Jesus</strong> — sexta-feira após o II Domingo depois de Pentecostes.</li>
              <li><strong>Anunciação do Senhor</strong> — 25 de março.</li>
              <li><strong>Natividade de São João Batista</strong> — 24 de junho.</li>
              <li><strong>Apresentação do Senhor</strong> — 2 de fevereiro.</li>
              <li><strong>Transfiguração do Senhor</strong> — 6 de agosto.</li>
              <li><strong>Exaltação da Santa Cruz</strong> — 14 de setembro.</li>
            </ul>
            <p>
              Para a piedade popular ligada aos tempos, consultar o <em>Diretório sobre Piedade Popular e
              Liturgia</em> (2002)<FnRef n="directorium" />. A data da Páscoa segue, desde o Concílio de
              Niceia (325)<FnRef n="nicea" />, o primeiro domingo após a primeira lua cheia da primavera boreal.
            </p>
          </section>
        </Prose>

        {/* Mapa interativo do Ano Litúrgico */}
        <section id="mapa" className="scroll-mt-24 mt-16 print:hidden">
          <h3 className="font-display text-2xl text-foreground mb-2">Mapa do Ano (interativo)</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Navegue pelos tempos do ano litúrgico — datas do ciclo 2025–2026, cores oficiais, destaques e
            favoritos salvos no seu dispositivo.
          </p>
          <MapaAnoLiturgico />
        </section>

        {/* Versículo do dia */}
        <section id="versiculo" className="scroll-mt-24 mt-16">
          <h3 className="font-display text-2xl text-foreground mb-2">Versículo do dia</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Uma palavra das Escrituras para meditar todos os dias. Escolha a data, copie, favorite ou imprima
            como cartão devocional.
          </p>
          <VersiculoDoDia />
        </section>

        {/* Quadro-síntese */}
        <section className="mt-16">
          <h3 className="font-display text-2xl text-foreground mb-6">Quadro-síntese dos tempos</h3>
          <CardGrid cols={3}>
            <ContentCard title="Advento" subtitle="Roxo / Rosa · 4 semanas">Expectativa da vinda do Senhor — gloriosa e na carne.</ContentCard>
            <ContentCard title="Natal" subtitle="Branco · ~3 semanas">Da Natividade ao Batismo do Senhor.</ContentCard>
            <ContentCard title="Tempo Comum (I)" subtitle="Verde">Do Batismo do Senhor às Cinzas.</ContentCard>
            <ContentCard title="Quaresma" subtitle="Roxo / Rosa · 40 dias">Conversão, jejum, oração e esmola.</ContentCard>
            <ContentCard title="Tríduo Pascal" subtitle="Vermelho / Branco · 3 dias">Ápice de todo o Ano Litúrgico.</ContentCard>
            <ContentCard title="Tempo Pascal" subtitle="Branco · 50 dias">Da Ressurreição a Pentecostes.</ContentCard>
            <ContentCard title="Tempo Comum (II)" subtitle="Verde">Até a Solenidade de Cristo Rei.</ContentCard>
            <ContentCard title="Cristo Rei" subtitle="Branco · último domingo">Conclusão do Ano Litúrgico.</ContentCard>
          </CardGrid>
        </section>
      </ReadingMode>
    </div>
  );
}
