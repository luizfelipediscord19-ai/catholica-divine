import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, Prose, Sources, Pullquote, CardGrid, ContentCard } from "../components/PageShell";
import { NotaConfiabilidade } from "../components/SeloConfiabilidade";
import { ESTACOES } from "../lib/data/devocoes/viasacra";
import { Relacionados } from "../components/Relacionados";
import cristo from "@/assets/cristo.jpg";


export const Route = createFileRoute("/oracoes/via-sacra")({
  head: () => ({
    meta: [
      { title: "Via-Sacra — as 14 estações, história, indulgências e fontes" },
      { property: "og:url", content: "https://portalcatolico.vercel.app/oracoes/via-sacra" },
      { name: "description", content: "As catorze estações da Via-Sacra com meditações e referências bíblicas, a história da devoção em Jerusalém e na tradição franciscana, as indulgências e a Via Crucis bíblica." },
      { property: "og:title", content: "Via-Sacra — Caminho da Cruz" },
      { property: "og:description", content: "Catorze estações com meditação, história da devoção e fontes magisteriais." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://portalcatolico.vercel.app/oracoes/via-sacra" }],
  }),
  component: Page,
});

const VIA_BIBLICA = [
  { title: "1. Jesus no Horto das Oliveiras", body: "Mt 26,36–41 — a agonia e o “não a minha, mas a vossa vontade”." },
  { title: "2. Jesus é traído por Judas e preso", body: "Mc 14,43–46 — o beijo da traição." },
  { title: "3. Jesus é condenado pelo Sanedrim", body: "Mc 14,55–64 — a confissão messiânica diante do sumo sacerdote." },
  { title: "4. Jesus é negado por Pedro", body: "Mt 26,69–75 — a queda e as lágrimas do primeiro Papa." },
  { title: "5. Jesus é julgado por Pilatos", body: "Mc 15,1–15 — “Que farei então do rei dos judeus?”." },
  { title: "6. Jesus é flagelado e coroado de espinhos", body: "Jo 19,1–3 — o Rei escarnecido." },
  { title: "7. Jesus carrega a cruz", body: "Jo 19,17 — o lenho da Redenção." },
  { title: "8. Simão de Cirene ajuda Jesus", body: "Mc 15,21 — a cooperação do discípulo." },
  { title: "9. Jesus encontra as mulheres de Jerusalém", body: "Lc 23,27–31 — “chorai por vós mesmas”." },
  { title: "10. Jesus é crucificado", body: "Lc 23,33–34 — “Pai, perdoa-lhes”." },
  { title: "11. Jesus promete o Reino ao bom ladrão", body: "Lc 23,39–43 — a canonização do Calvário." },
  { title: "12. Jesus na cruz, a Mãe e o discípulo", body: "Jo 19,25–27 — “Eis aí tua mãe”." },
  { title: "13. Jesus morre na cruz", body: "Lc 23,44–46 — “Está consumado”." },
  { title: "14. Jesus é sepultado", body: "Mt 27,57–60 — o silêncio do sábado santo." },
];

function Page() {
  const [i, setI] = useState(0);
  const e = ESTACOES[i];
  return (
    <div>
      <PageHero
        autoridade={["tradicao", "devocao"]}
        image={cristo}
        eyebrow="Crux"
        title="Via-Sacra"
        intro="Acompanhe os passos de Cristo até o Calvário em catorze estações. Tradição firmada por São Leonardo de Porto Maurício no século XVIII."
      />
      <Section kicker={`Estação ${e.num} de 14`} title={e.titulo}>
        <div className="surface-card p-card">
          <p className="kicker mb-4">Em todas as estações:</p>
          <p className="italic text-foreground/80 mb-6">V. Nós Vos adoramos, Senhor Jesus Cristo, e Vos bendizemos. <br />R. Porque pela vossa santa Cruz remistes o mundo.</p>
          {e.referencia ? <p className="text-sm text-gold/80 mb-3">{e.referencia}</p> : null}
          <p className="text-lg leading-relaxed text-foreground/90 font-light">{e.meditacao}</p>
          <p className="mt-8 italic text-foreground/70">Pai-Nosso · Ave-Maria · Glória ao Pai</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0} className="min-h-11 flex-1 border border-gold/40 px-5 py-3 text-sm hover:bg-gold/10 disabled:opacity-30 sm:flex-none">← Estação anterior</button>
          <div className="text-sm text-muted-foreground">{i + 1} / 14</div>
          <button onClick={() => setI((n) => Math.min(13, n + 1))} disabled={i === 13} className="min-h-11 flex-1 border border-gold/40 px-5 py-3 text-sm hover:bg-gold/10 disabled:opacity-30 sm:flex-none">Próxima estação →</button>
        </div>

        <div className="mt-6 h-1 bg-gold/15"><div className="h-1 bg-gold" style={{ width: `${((i + 1) / 14) * 100}%` }} /></div>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(2.75rem,1fr))] gap-2">
          {ESTACOES.map((s, idx) => (
            <button key={s.num} onClick={() => setI(idx)} className={`grid min-h-11 place-items-center border text-xs ${idx === i ? "border-gold bg-gold/10" : "border-gold/20 hover:border-gold/50"}`}>
              {s.num}
            </button>
          ))}
        </div>
      </Section>

      <Section kicker="Fundamento" title="Origem, sentido e indulgências">
        <Prose>
          <p>
            A Via-Sacra é a devoção que percorre, em estações, o caminho de Cristo da condenação ao sepulcro.
            Não é um espetáculo comemorativo, mas exercício de <em>compaixão</em> — no sentido literal de
            padecer com Ele — e de conversão: <em>“Se alguém quer vir após mim, renuncie a si mesmo, tome
            cada dia a sua cruz e siga-me”</em> (Lc 9,23).
          </p>

          <Pullquote cite="Concílio Vaticano II — Sacrosanctum Concilium 13">
            Recomendam-se muito os exercícios piedosos do povo cristão, desde que estejam em conformidade com
            as leis e normas da Igreja… mas devem harmonizar-se com a liturgia, dela derivar e a ela conduzir.
          </Pullquote>

          <h3>História da devoção</h3>
          <NotaConfiabilidade nivel="historia">
            Marcos historicamente documentados. A numeração e os títulos das catorze estações consolidaram-se
            aos poucos: não são de origem apostólica nem de definição dogmática.
          </NotaConfiabilidade>
          <ul>
            <li><strong>Séculos IV–V, Jerusalém</strong> — os peregrinos percorrem os lugares da Paixão; o diário de <em>Egéria</em> (c. 381–384) descreve as procissões da Semana Santa entre o Getsêmani, o Gólgota e a Anástasis.</li>
            <li><strong>Séculos XIV–XV</strong> — confiada à custódia dos Lugares Santos (1342), a Ordem Franciscana difunde na Europa a prática de reproduzir o caminho de Jerusalém em capelas e cruzeiros, para quem não podia peregrinar.</li>
            <li><strong>Séculos XVII–XVIII</strong> — fixa-se o número de <strong>catorze</strong> estações. <strong>São Leonardo de Porto Maurício</strong> († 1751) erige centenas de Via-Sacras, entre elas a do Coliseu, em Roma (1750).</li>
            <li><strong>Época contemporânea</strong> — a Via-Sacra do Coliseu, presidida pelo Papa na Sexta-feira Santa, tornou-se referência universal; São João Paulo II propôs em 1991 uma <em>Via Crucis bíblica</em>, com todas as estações atestadas nos Evangelhos.</li>
          </ul>

          <h3>Como rezar bem</h3>
          <ul>
            <li>Reza-se em qualquer época, e de modo especial nas <strong>sextas-feiras da Quaresma</strong> e na <strong>Sexta-feira Santa</strong>.</li>
            <li>Em cada estação: a aclamação <em>“Nós Vos adoramos, Senhor Jesus Cristo…”</em>, leitura ou meditação breve, silêncio, Pai-Nosso, Ave-Maria e Glória.</li>
            <li>Pode ser feita em igreja, com as imagens das estações, ou privadamente — o essencial é a meditação, não o deslocamento físico.</li>
            <li>Conclui-se ordinariamente com oração pelas intenções do Santo Padre e um ato de contrição.</li>
          </ul>

          <h3>Indulgências</h3>
          <NotaConfiabilidade nivel="oficial">
            O <em>Enchiridion Indulgentiarum</em> (4ª ed., 1999), concessão n. 13, atribui <strong>indulgência
            plenária</strong> ao exercício piedoso da Via-Sacra, nas condições habituais: confissão sacramental,
            comunhão eucarística, oração pelas intenções do Sumo Pontífice e ausência de apego ao pecado, ainda
            que venial (cf. <em>CIC</em> §§ 1471–1479; CDC, cân. 992–997).
          </NotaConfiabilidade>
          <ul>
            <li>Faz-se diante de estações legitimamente erigidas (ordinariamente catorze cruzes).</li>
            <li>Exige-se meditação sobre a Paixão, não a recitação de fórmulas determinadas.</li>
            <li>É preciso mover-se de estação em estação; quando feita publicamente e o deslocamento é difícil, basta que o dirigente se mova.</li>
            <li>Impedidos legitimamente (doentes, presos) podem lucrar a mesma indulgência dedicando pelo menos meia hora à leitura e meditação da Paixão.</li>
          </ul>
        </Prose>

        <Sources
          items={[
            { label: "Bíblia Sagrada — Lc 9,23; Jo 19; Mc 15; Mt 27", ref: "narrativas da Paixão" },
            { label: "Concílio Vaticano II, Sacrosanctum Concilium (1963)", ref: "n. 13" },
            { label: "Catecismo da Igreja Católica", ref: "§§ 618, 1471–1479, 2669" },
            { label: "Código de Direito Canônico (1983)", ref: "cân. 992–997 (indulgências)" },
            { label: "Penitenciaria Apostólica, Enchiridion Indulgentiarum, 4ª ed. (1999)", ref: "concessão n. 13" },
            { label: "Congregação para o Culto Divino, Diretório sobre Piedade Popular e Liturgia (2002)", ref: "nn. 131–135" },
            { label: "Itinerarium Egeriae (c. 381–384)", ref: "liturgia estacional de Jerusalém" },
            { label: "São João Paulo II, Via Crucis bíblica (Sexta-feira Santa de 1991)", ref: "estações com base evangélica" },
          ]}
        />
      </Section>

      <Section kicker="Variante aprovada" title="Via Crucis bíblica (1991)">
        <Prose>
          <p>
            Proposta por São João Paulo II para que cada estação tivesse apoio explícito nos Evangelhos.
            Convive com a forma tradicional, sem a substituir.
          </p>
        </Prose>
        <div className="mt-md">
          <CardGrid cols={3}>
            {VIA_BIBLICA.map((v) => (
              <ContentCard key={v.title} title={v.title}>{v.body}</ContentCard>
            ))}
          </CardGrid>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/oracoes" className="px-5 py-3 btn-base btn-outline-gold">← Todas as orações</Link>
          <Link to="/oracoes/terco-misericordia" className="px-5 py-3 btn-base btn-outline-gold">Terço da Misericórdia →</Link>
        </div>
        <Relacionados topic="via-sacra" className="mt-8" />
      </Section>

    </div>
  );
}
