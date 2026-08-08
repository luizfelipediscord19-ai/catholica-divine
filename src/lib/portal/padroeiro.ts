// Lógica pura (client-safe): monta um caminho espiritual personalizado a
// partir do santo padroeiro escolhido pelo membro.
import { ORACOES, type Oracao } from "@/lib/data/oracoes";
import { LIVROS } from "@/lib/data/biblia";
import { findRico } from "@/lib/santos-helpers";
import { SANTOS_LISTA } from "@/lib/santos-lista";

export type LeituraSugerida = {
  livroSlug: string;
  livroNome: string;
  capitulo: number;
  motivo: string;
};

export type PlanoPadroeiro = {
  nome: string;
  titulo?: string;
  padroeiro?: string;
  frase?: string;
  virtudes: string[];
  temas: string[];
  festa?: string;
  oracoes: Oracao[];
  leituras: LeituraSugerida[];
  convite: string;
};

function normalizar(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Hash estável para variar sugestões por santo sem aleatoriedade. */
function semente(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

type Perfil = {
  chaves: string[];
  temas: string[];
  categorias: string[];
  leituras: { livro: string; capitulos: number[]; motivo: string }[];
};

const PERFIS: Perfil[] = [
  {
    chaves: ["apostolo", "apóstolo", "evangelista", "missionar", "papa"],
    temas: ["Zelo apostólico", "Anúncio do Evangelho", "Comunhão com a Igreja"],
    categorias: ["Fundamentais", "Ao Espírito Santo"],
    leituras: [
      { livro: "atos", capitulos: [1, 2, 4, 9], motivo: "A Igreja nascente e a coragem dos apóstolos" },
      { livro: "joao", capitulos: [15, 17, 21], motivo: "A intimidade com Cristo que sustenta a missão" },
    ],
  },
  {
    chaves: ["martir", "mártir", "virgem e martir", "protomartir"],
    temas: ["Fidelidade até o fim", "Coragem cristã", "Esperança na vida eterna"],
    categorias: ["Proteção", "Fundamentais"],
    leituras: [
      { livro: "apocalipse", capitulos: [7, 12, 21], motivo: "A vitória dos que lavaram as vestes no sangue do Cordeiro" },
      { livro: "2macabeus", capitulos: [7], motivo: "O testemunho heroico diante do sofrimento" },
      { livro: "romanos", capitulos: [8], motivo: "Nada nos separará do amor de Cristo" },
    ],
  },
  {
    chaves: ["doutor", "teolog", "bispo", "filosof", "apologista"],
    temas: ["Amor à verdade", "Estudo orante", "Doutrina segura"],
    categorias: ["Ao Espírito Santo", "Fundamentais"],
    leituras: [
      { livro: "proverbios", capitulos: [2, 8, 9], motivo: "A busca da Sabedoria que vem de Deus" },
      { livro: "romanos", capitulos: [5, 8, 12], motivo: "O coração da doutrina da graça" },
      { livro: "sabedoria", capitulos: [7], motivo: "A Sabedoria como dom e luz da inteligência" },
    ],
  },
  {
    chaves: ["mae", "mãe", "maria", "esposa", "familia", "família", "viuva", "viúva"],
    temas: ["Santidade na vida comum", "Oração pela família", "Paciência e perseverança"],
    categorias: ["Marianas", "Diárias"],
    leituras: [
      { livro: "lucas", capitulos: [1, 2, 11], motivo: "O sim de Maria e a oração confiante" },
      { livro: "tobias", capitulos: [4, 8], motivo: "A fé vivida dentro de casa" },
      { livro: "proverbios", capitulos: [31], motivo: "O elogio da mulher forte" },
    ],
  },
  {
    chaves: ["monge", "abade", "eremita", "fundador", "religios", "carmelit", "francisc", "domini", "jesuit"],
    temas: ["Silêncio e escuta", "Pobreza evangélica", "Regra de vida"],
    categorias: ["Penitenciais", "Eucarísticas"],
    leituras: [
      { livro: "mateus", capitulos: [5, 6, 19], motivo: "As bem-aventuranças e o chamado radical" },
      { livro: "salmos", capitulos: [1, 62, 118], motivo: "Salmos que estruturam a oração monástica" },
      { livro: "eclesiastes", capitulos: [3], motivo: "O tempo de Deus sobre o tempo do homem" },
    ],
  },
  {
    chaves: ["caridade", "pobres", "enfermos", "diacono", "diácono", "medico", "médico"],
    temas: ["Caridade concreta", "Serviço aos pobres", "Misericórdia"],
    categorias: ["Diárias", "Ocasiões"],
    leituras: [
      { livro: "mateus", capitulos: [25], motivo: "O juízo sobre as obras de misericórdia" },
      { livro: "tiago", capitulos: [2], motivo: "A fé que se mostra nas obras" },
      { livro: "1corintios", capitulos: [13], motivo: "O hino da caridade" },
    ],
  },
];

const PERFIL_PADRAO: Perfil = {
  chaves: [],
  temas: ["Vida de oração", "Escuta da Palavra", "Confiança na Providência"],
  categorias: ["Fundamentais", "Marianas"],
  leituras: [
    { livro: "joao", capitulos: [1, 6, 14], motivo: "O Evangelho da intimidade com Cristo" },
    { livro: "salmos", capitulos: [22, 41, 90], motivo: "Salmos para a oração de cada dia" },
    { livro: "filipenses", capitulos: [2, 4], motivo: "A alegria cristã e a humildade de Cristo" },
  ],
};

function perfilDo(texto: string): Perfil {
  const alvo = normalizar(texto);
  return PERFIS.find((p) => p.chaves.some((c) => alvo.includes(normalizar(c)))) ?? PERFIL_PADRAO;
}

function primeiroNome(nome: string) {
  return nome.replace(/^(São|Santo|Santa|Beato|Beata|Bem-aventurad[oa])\s+/i, "");
}

function oracoesDoSanto(nome: string): Oracao[] {
  const alvo = normalizar(primeiroNome(nome)).split(/\s+/)[0] ?? "";
  if (alvo.length < 3) return [];
  return ORACOES.filter(
    (o) => o.categoria === "Aos Santos" && normalizar(o.titulo).includes(alvo),
  );
}

/**
 * Monta conteúdos, orações e leituras sugeridas a partir do padroeiro.
 * Determinístico: o mesmo santo devolve sempre o mesmo caminho.
 */
export function planoDoPadroeiro(slug: string, nomeFallback?: string | null): PlanoPadroeiro {
  const rico = findRico(slug);
  const basico = SANTOS_LISTA.find((s) => s.slug === slug);
  const nome = rico?.nome ?? basico?.nome ?? nomeFallback ?? "Seu padroeiro";
  const descritor = [rico?.titulo, rico?.padroeiro, rico?.resumo, basico?.body]
    .filter(Boolean)
    .join(" ");
  const perfil = perfilDo(descritor);
  const s = semente(slug || nome);

  const proprias = oracoesDoSanto(nome);
  const daCategoria = ORACOES.filter((o) =>
    perfil.categorias.includes(o.categoria as string),
  );
  const escolhidas: Oracao[] = [...proprias];
  for (let i = 0; escolhidas.length < 4 && i < daCategoria.length; i += 1) {
    const cand = daCategoria[(s + i * 7) % daCategoria.length]!;
    if (!escolhidas.some((o) => o.slug === cand.slug)) escolhidas.push(cand);
  }

  const leituras: LeituraSugerida[] = [];
  perfil.leituras.forEach((item, idx) => {
    const livro = LIVROS.find((l) => l.slug === item.livro);
    if (!livro) return;
    const capitulo = item.capitulos[(s + idx) % item.capitulos.length] ?? 1;
    leituras.push({
      livroSlug: livro.slug,
      livroNome: livro.nome,
      capitulo: Math.min(capitulo, livro.capitulos),
      motivo: item.motivo,
    });
  });

  return {
    nome,
    titulo: rico?.titulo,
    padroeiro: rico?.padroeiro,
    frase: rico?.frase,
    virtudes: rico?.virtudes ?? [],
    temas: perfil.temas,
    festa: basico?.data,
    oracoes: escolhidas.slice(0, 4),
    leituras,
    convite: `Hoje, peça a ${nome} a graça de viver ${(rico?.virtudes?.[0] ?? perfil.temas[0] ?? "a fé").toLowerCase()} em algo bem concreto.`,
  };
}
