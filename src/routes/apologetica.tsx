import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Prose, Sources, Pullquote } from "../components/PageShell";
import { BancoObjecoes } from "../components/portal/BancoObjecoes";

export const Route = createFileRoute("/apologetica")({
  head: () => ({
    meta: [
      { title: "Apologética Católica — Razões para crer com fundamento" },
      { name: "description", content: "Defesa racional da fé católica: existência de Deus, divindade e ressurreição de Cristo, autoridade da Igreja, Tradição, Eucaristia, Papado, Maria — fundamentada em Escritura, Padres, concílios e Magistério." },
      { property: "og:title", content: "Apologética Católica" },
      { property: "og:description", content: "Defesa racional da fé católica com fontes magisteriais." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Apologia Fidei"
        title="Razões para Crer"
        intro="‘Estai sempre prontos a responder a todo aquele que vos pedir razão da esperança que há em vós’ (1Pd 3,15). A apologética é o serviço da razão à fé."
      />

      <Section kicker="Fundamento" title="O que é, e o que não é, apologética">
        <Prose>
          <p>
            <strong>Apologética</strong> (do grego <em>apología</em>, “defesa”) é a disciplina teológica que
            apresenta os <em>motivos de credibilidade</em> da fé católica e responde, com caridade e firmeza, às
            objeções contra ela. Sua carta-magna escriturística está em <strong>1Pedro 3,15</strong>: <em>“Estai
            sempre prontos a dar razão da vossa esperança a todo aquele que vo-la pedir, mas fazei-o com mansidão
            e respeito”</em>.
          </p>
          <p>
            A apologética não é, contudo, uma “prova matemática” da fé. A fé é dom sobrenatural de Deus
            (<em>CIC</em> §§ 153–155), e <em>os motivos de credibilidade mostram que o assentimento da fé não é
            de modo nenhum um movimento cego do espírito</em> (Concílio Vaticano I, <em>Dei Filius</em>, cap. 3;
            DH 3008–3010; <em>CIC</em> § 156). A razão prepara o caminho à fé e mostra que crer <em>é conforme à
            razão</em> (cf. São João Paulo II, <em>Fides et Ratio</em>, 14.09.1998, nn. 13, 67).
          </p>

          <Pullquote cite="Concílio Vaticano I — Dei Filius, cap. 4 (DH 3017)">
            Embora a fé esteja acima da razão, jamais pode haver verdadeiro desacordo entre a fé e a razão, pois
            o mesmo Deus que revela os mistérios e infunde a fé pôs no espírito humano a luz da razão.
          </Pullquote>

          <h3>1. A existência de Deus</h3>
          <p>
            A Igreja ensina, com o Concílio Vaticano I, que <em>Deus, princípio e fim de todas as coisas, pode
            ser conhecido com certeza pela luz natural da razão humana, a partir das coisas criadas</em>
            (<em>Dei Filius</em>, cap. 2; DH 3004; <em>CIC</em> §§ 31–36). Esta verdade é também doutrina bíblica
            (Sb 13,1–9; Rm 1,19–20).
          </p>
          <ul>
            <li><strong>As cinco vias</strong> de Santo Tomás de Aquino (<em>Summa Theologiae</em>, I, q. 2, a. 3): movimento, causalidade eficiente, contingência, graus de ser e finalidade.</li>
            <li><strong>Argumento moral</strong> (cf. C. S. Lewis, <em>Mero Cristianismo</em>, livro I): a experiência universal da lei moral aponta a um Legislador transcendente.</li>
            <li><strong>Argumento contingencial</strong> e <strong>cosmológico</strong>: o universo, sendo contingente e tendo início (cf. cosmologia atual), exige uma causa não causada.</li>
          </ul>

          <h3>2. A historicidade dos Evangelhos</h3>
          <p>
            O Concílio Vaticano II afirma, sem equívoco: <em>A Santa Mãe Igreja firmemente sustentou e sustenta
            que os quatro Evangelhos mencionados, cuja historicidade afirma sem hesitação, transmitem fielmente o
            que Jesus, Filho de Deus, vivendo entre os homens, realmente fez e ensinou para a salvação deles</em>
            (<em>Dei Verbum</em> 19). A Pontifícia Comissão Bíblica explicitou os critérios histórico-críticos em
            <em> Sancta Mater Ecclesia</em> (1964) e em <em>A Interpretação da Bíblia na Igreja</em> (1993).
          </p>
          <p>
            Os manuscritos do Novo Testamento contam-se aos milhares (mais de 5.800 em grego, segundo o catálogo
            do Institut für Neutestamentliche Textforschung de Münster), com o <em>papiro P52</em> datado por
            volta de 125 d.C. — proximidade incomparável a qualquer outra obra da Antiguidade.
          </p>

          <h3>3. A divindade de Cristo</h3>
          <p>
            Jesus reivindicou, em palavras e obras, a condição divina: o título <em>Filho do Homem</em> com
            atribuições divinas (Mt 26,64; Dn 7,13–14); o nome <em>EGO EIMI</em> (“Eu Sou”, Jo 8,58, ecoando Ex 3,14);
            o poder de perdoar pecados (Mc 2,5–10); a recepção da adoração (Jo 20,28; Mt 28,17). O Concílio de
            Niceia (325) definiu Cristo <em>consubstancial (homoousios) ao Pai</em>, e Calcedônia (451) precisou as
            <em> duas naturezas, divina e humana, sem confusão, sem mudança, sem divisão, sem separação</em>
            (DH 125–126, 301–302; <em>CIC</em> §§ 464–469).
          </p>

          <h3>4. A Ressurreição</h3>
          <p>
            <em>“Se Cristo não ressuscitou, é vã a nossa pregação e vã a vossa fé”</em> (1Cor 15,14). A
            Ressurreição é, ao mesmo tempo, <em>acontecimento histórico verificável</em> e <em>mistério
            transcendente</em> (<em>CIC</em> §§ 639–647). Quatro dados histórico-críticos convergem:
          </p>
          <ol>
            <li><strong>Túmulo vazio</strong>, atestado até pelos adversários (Mt 28,11–15).</li>
            <li><strong>Aparições do Ressuscitado</strong> a Pedro, aos Doze, a mais de 500 testemunhas (1Cor 15,3–8, credo paulino datado dos anos 30–35 d.C.).</li>
            <li><strong>Transformação radical dos discípulos</strong>, do medo à pregação pública até o martírio.</li>
            <li><strong>Surgimento da Igreja</strong> e o culto ao Senhor Jesus já no séc. I (Plínio, o Jovem, <em>Ep. ad Trajanum</em> X, 96).</li>
          </ol>

          <h3>5. A autoridade da Igreja</h3>
          <p>
            Cristo fundou <em>uma só Igreja</em>, edificada sobre Pedro (Mt 16,18–19) e os Apóstolos (Ef 2,20), à
            qual confiou a missão de ensinar (Mt 28,19–20), governar (Jo 21,15–17) e santificar (Jo 20,21–23). A
            sucessão apostólica é documentada já em São Clemente Romano (<em>Carta aos Coríntios</em>, c. 96 d.C.,
            nn. 42–44) e em Santo Ireneu (<em>Adversus Haereses</em> III, 3, 1–3, c. 180 d.C.), que recita a
            lista dos bispos de Roma desde Pedro. O Vaticano II reafirma: <em>esta Igreja, constituída e
            organizada neste mundo como uma sociedade, subsiste na Igreja Católica, governada pelo sucessor de
            Pedro e pelos bispos em comunhão com ele</em> (<em>Lumen Gentium</em> 8).
          </p>

          <h3>6. Escritura e Tradição — contra o <em>sola Scriptura</em></h3>
          <p>
            A própria Bíblia testemunha que a Palavra de Deus se transmite <em>escrita ou de viva voz</em>:
            <em> “Mantende firmes as tradições que aprendestes, seja por palavra, seja por carta nossa”</em>
            (2Ts 2,15; cf. 1Cor 11,2; 2Tm 2,2). A Igreja é <em>coluna e fundamento da verdade</em> (1Tm 3,15),
            e foi ela quem, sob inspiração do Espírito Santo, discerniu o cânon das Escrituras nos sínodos de
            Hipona (393), Cartago (397) e na carta de Inocêncio I a Exupério (405) — séculos antes de qualquer
            edição protestante. Por isso o Concílio de Trento definiu que a Igreja venera <em>com igual sentimento
            de piedade e reverência</em> a Sagrada Escritura e a Sagrada Tradição (Sessão IV, 1546; DH 1501;
            <em> Dei Verbum</em> 9; <em>CIC</em> §§ 80–82).
          </p>

          <h3>7. A Eucaristia: presença real</h3>
          <p>
            <em>“Quem come a minha carne e bebe o meu sangue tem a vida eterna”</em> (Jo 6,54). As palavras da
            instituição (<em>“Isto é o meu corpo… isto é o meu sangue”</em>, Mt 26,26–28; Mc 14,22–24;
            Lc 22,19–20; 1Cor 11,23–25) são unânimes nos quatro estratos do Novo Testamento. Os Padres da Igreja
            atestam, desde o início, a fé na presença real:
          </p>
          <ul>
            <li><strong>Santo Inácio de Antioquia</strong> († c. 107): <em>“A Eucaristia é a carne de nosso Salvador Jesus Cristo”</em> (<em>Carta aos Esmirniotas</em> 7,1).</li>
            <li><strong>São Justino</strong> († c. 165): <em>“Não recebemos esse alimento como pão comum nem como bebida comum…”</em> (<em>I Apologia</em> 66).</li>
            <li><strong>Santo Ambrósio</strong> († 397): <em>De Mysteriis</em> 9, 50–58.</li>
          </ul>
          <p>
            O Concílio de Trento, na Sessão XIII (1551), definiu solenemente a doutrina da
            <strong> transubstanciação</strong> (DH 1640–1642; <em>CIC</em> §§ 1373–1377).
          </p>

          <h3>8. O Papado e o primado de Pedro</h3>
          <p>
            Três textos petrinos fundamentam o primado: <em>“Tu és Pedro, e sobre esta pedra edificarei a minha
            Igreja… Eu te darei as chaves do Reino dos Céus”</em> (Mt 16,18–19); <em>“Confirma os teus irmãos”</em>
            (Lc 22,32); <em>“Apascenta as minhas ovelhas”</em> (Jo 21,15–17). O Concílio Vaticano I, em
            <em> Pastor Aeternus</em> (1870), definiu o primado de jurisdição e a infalibilidade do Romano
            Pontífice quando, <em>ex cathedra</em>, define doutrina sobre fé ou costumes (DH 3050–3075;
            <em> Lumen Gentium</em> 25; <em>CIC</em> §§ 880–892).
          </p>

          <h3>9. Maria e os santos: comunhão, não idolatria</h3>
          <p>
            A teologia católica distingue, desde os Padres, três níveis de culto: <em>latria</em> (adoração,
            devida só a Deus), <em>hiperdulia</em> (veneração singular à Virgem Maria, Mãe de Deus —
            <em> Theotókos</em>, definida em Éfeso, 431; DH 251) e <em>dulia</em> (veneração dos santos). A
            comunhão dos santos é artigo do Credo Apostólico e é fundamentada na unidade do Corpo Místico
            (1Cor 12; Ap 5,8; Hb 12,1; <em>Lumen Gentium</em> 49–51; <em>CIC</em> §§ 946–962). Pedir a oração dos
            santos é, por analogia, o mesmo que pedir a oração de um irmão vivo (cf. Tg 5,16).
          </p>

          <h3>10. Fé e ciência</h3>
          <p>
            A Igreja sustenta a inexistência de conflito real entre fé e ciência (<em>Dei Filius</em>, cap. 4;
            <em> Gaudium et Spes</em> 36; <em>Fides et Ratio</em>, nn. 16–48). São João Paulo II reabilitou
            publicamente Galileu (Discurso à Pontifícia Academia das Ciências, 31.10.1992) e reafirmou:
            <em> “A verdade não pode contradizer a verdade”</em> (Leão XIII, <em>Providentissimus Deus</em>, 1893).
          </p>
        </Prose>

        <Sources
          items={[
            { label: "Bíblia Sagrada — 1Pedro 3,15; 1Cor 15,3–8; Mt 16,18–19; Jo 6; 2Ts 2,15", ref: "fontes escriturísticas" },
            { label: "Concílio Vaticano I, Constituição Dogmática Dei Filius (1870)", ref: "DH 3004, 3008–3010, 3017" },
            { label: "Concílio Vaticano II, Dei Verbum (1965)", ref: "nn. 9, 19" },
            { label: "Concílio Vaticano II, Lumen Gentium (1964)", ref: "nn. 8, 25, 49–51" },
            { label: "Concílio de Trento, Sessão IV (1546) e XIII (1551)", ref: "DH 1501; 1640–1642" },
            { label: "Concílio de Niceia (325) e Concílio de Calcedônia (451)", ref: "DH 125–126, 301–302" },
            { label: "Catecismo da Igreja Católica", ref: "§§ 31–36, 153–165, 464–469, 639–647, 880–892, 946–962, 1373–1377" },
            { label: "São João Paulo II, Encíclica Fides et Ratio (14.09.1998)", ref: "nn. 13, 16–48, 67" },
            { label: "Leão XIII, Encíclica Providentissimus Deus (18.11.1893)", ref: "sobre estudos bíblicos" },
            { label: "Santo Tomás de Aquino, Summa Theologiae", ref: "I, q. 2, a. 3 (cinco vias)" },
            { label: "Santo Ireneu, Adversus Haereses III, 3, 1–3", ref: "sucessão apostólica" },
            { label: "São Clemente Romano, Carta aos Coríntios (c. 96 d.C.)", ref: "nn. 42–44" },
            { label: "Santo Inácio de Antioquia, Carta aos Esmirniotas 7,1", ref: "presença real" },
            { label: "São Justino, I Apologia 66", ref: "Eucaristia" },
            { label: "Pontifícia Comissão Bíblica, A Interpretação da Bíblia na Igreja (1993)", ref: "métodos exegéticos" },
          ]}
        />
      </Section>
    </div>
  );
}
