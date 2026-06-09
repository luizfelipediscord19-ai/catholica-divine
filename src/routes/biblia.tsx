import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CardGrid, ContentCard } from "../components/PageShell";
import manuscrito from "../assets/manuscrito.jpg";

export const Route = createFileRoute("/biblia")({
  head: () => ({
    meta: [
      { title: "Bíblia Sagrada — Portal Católico" },
      { name: "description", content: "Os 73 livros da Bíblia Católica: Antigo e Novo Testamento, com contexto histórico, teológico e patrístico." },
      { property: "og:title", content: "Bíblia Sagrada — Portal Católico" },
      { property: "og:description", content: "Antigo e Novo Testamento — os 73 livros da Sagrada Escritura católica." },
    ],
  }),
  component: Page,
});

const AT_PENTATEUCO = ["Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio"];
const AT_HISTORICOS = ["Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Tobias", "Judite", "Ester", "1 Macabeus", "2 Macabeus"];
const AT_SAPIENCIAIS = ["Jó", "Salmos", "Provérbios", "Eclesiastes", "Cântico dos Cânticos", "Sabedoria", "Eclesiástico"];
const AT_PROFETICOS = ["Isaías", "Jeremias", "Lamentações", "Baruc", "Ezequiel", "Daniel", "Oseias", "Joel", "Amós", "Abdias", "Jonas", "Miqueias", "Naum", "Habacuc", "Sofonias", "Ageu", "Zacarias", "Malaquias"];
const NT_EVANGELHOS = ["Mateus", "Marcos", "Lucas", "João"];
const NT_ATOS = ["Atos dos Apóstolos"];
const NT_PAULINAS = ["Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filêmon", "Hebreus"];
const NT_CATOLICAS = ["Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas"];
const NT_APOCALIPSE = ["Apocalipse"];

function Grupo({ titulo, livros }: { titulo: string; livros: string[] }) {
  return (
    <div className="border border-gold/20 bg-card p-6">
      <h3 className="font-display text-lg text-gold mb-4">{titulo}</h3>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        {livros.map((l) => (
          <li key={l} className="hover:text-foreground transition-colors">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Page() {
  return (
    <div>
      <PageHero
        eyebrow="Sacra Scriptura"
        title="A Bíblia Sagrada"
        intro="Os 73 livros inspirados pelo Espírito Santo. A Palavra de Deus, transmitida pela Igreja, lida em meio à comunidade dos crentes desde os primeiros séculos."
        image={manuscrito}
      />

      <Section kicker="Antigo Testamento" title="46 livros — Da Criação ao Messias">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Grupo titulo="Pentateuco" livros={AT_PENTATEUCO} />
          <Grupo titulo="Livros Históricos" livros={AT_HISTORICOS} />
          <Grupo titulo="Livros Sapienciais" livros={AT_SAPIENCIAIS} />
          <Grupo titulo="Livros Proféticos" livros={AT_PROFETICOS} />
        </div>
      </Section>

      <Section kicker="Novo Testamento" title="27 livros — A Boa Nova de Cristo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Grupo titulo="Evangelhos" livros={NT_EVANGELHOS} />
          <Grupo titulo="Atos" livros={NT_ATOS} />
          <Grupo titulo="Cartas Paulinas" livros={NT_PAULINAS} />
          <Grupo titulo="Cartas Católicas" livros={NT_CATOLICAS} />
          <Grupo titulo="Apocalipse" livros={NT_APOCALIPSE} />
        </div>
      </Section>

      <Section kicker="Como ler a Bíblia" title="Princípios católicos de interpretação">
        <CardGrid cols={3}>
          <ContentCard title="Tradição e Escritura" subtitle="Dei Verbum §10">
            A Sagrada Escritura e a Sagrada Tradição formam um único depósito da Palavra de
            Deus, confiado à Igreja.
          </ContentCard>
          <ContentCard title="Sentidos da Escritura" subtitle="CIC §115-119">
            Sentido literal e sentido espiritual (alegórico, moral, anagógico).
          </ContentCard>
          <ContentCard title="Analogia da fé" subtitle="CIC §114">
            Toda passagem deve ser lida na unidade de toda a Escritura e da fé professada
            pela Igreja.
          </ContentCard>
        </CardGrid>
      </Section>
    </div>
  );
}
