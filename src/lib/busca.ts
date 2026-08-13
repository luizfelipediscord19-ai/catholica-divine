// Índice da busca global inteligente. Puramente estático: nenhum acesso a rede.
import { LIVROS } from "./data/biblia/index";
import { PARTES, SECOES } from "./data/catecismo/index";
import { GLOSSARIO } from "./data/glossario";
import { NOVENAS } from "./data/devocoes/novenas";
import { ORACOES } from "./data/oracoes";
import { OBJECOES } from "./data/apologetica-objecoes";
import { SANTOS_LISTA } from "./santos-lista";
import { TRILHAS } from "./data/trilhas/index";

export type Categoria =
  | "Página"
  | "Bíblia"
  | "Catecismo"
  | "Santo"
  | "Glossário"
  | "Oração"
  | "Apologética"
  | "Trilha";

export type ItemBusca = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  /** Rota interna do portal. */
  href: string;
};

export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const PAGINAS: ItemBusca[] = [
  { id: "p-fe", titulo: "A Fé Católica", descricao: "Credo, Revelação, Tradição e Magistério", categoria: "Página", href: "/fe-catolica" },
  { id: "p-biblia", titulo: "Bíblia Católica", descricao: "73 livros com introdução e texto por capítulo", categoria: "Página", href: "/biblia" },
  { id: "p-leituras", titulo: "Leituras da Bíblia", descricao: "Planos e roteiros de leitura bíblica", categoria: "Página", href: "/biblia/leituras" },
  { id: "p-catecismo", titulo: "Catecismo da Igreja Católica", descricao: "As quatro partes do CIC", categoria: "Página", href: "/catecismo" },
  { id: "p-sacramentos", titulo: "Sacramentos", descricao: "Os sete sacramentos da Igreja", categoria: "Página", href: "/sacramentos" },
  { id: "p-santos", titulo: "Santos", descricao: "Vidas dos santos e bem-aventurados", categoria: "Página", href: "/santos" },
  { id: "p-doutores", titulo: "Doutores da Igreja", descricao: "Os 37 doutores e suas obras", categoria: "Página", href: "/doutores-da-igreja" },
  { id: "p-maria", titulo: "Maria", descricao: "Dogmas marianos, aparições e devoções", categoria: "Página", href: "/maria" },
  { id: "p-oracoes", titulo: "Orações", descricao: "Rosário, Via-Sacra, novenas, Liturgia das Horas", categoria: "Página", href: "/oracoes" },
  { id: "p-rosario", titulo: "Santo Rosário", descricao: "Mistérios gozosos, luminosos, dolorosos e gloriosos", categoria: "Oração", href: "/oracoes/rosario" },
  { id: "p-viasacra", titulo: "Via-Sacra", descricao: "As catorze estações da Paixão", categoria: "Oração", href: "/oracoes/via-sacra" },
  { id: "p-misericordia", titulo: "Terço da Divina Misericórdia", descricao: "Devoção revelada a Santa Faustina", categoria: "Oração", href: "/oracoes/terco-misericordia" },
  { id: "p-horas", titulo: "Liturgia das Horas", descricao: "Ofício Divino: Laudes, Vésperas, Completas", categoria: "Oração", href: "/oracoes/liturgia-das-horas" },
  { id: "p-novenas", titulo: "Novenas", descricao: "Novenas tradicionais dia por dia", categoria: "Oração", href: "/oracoes/novenas" },
  { id: "p-apologetica", titulo: "Apologética", descricao: "Respostas às objeções mais comuns", categoria: "Página", href: "/apologetica" },
  { id: "p-calendario", titulo: "Calendário Litúrgico", descricao: "Tempos, cores e solenidades do ano", categoria: "Página", href: "/calendario-liturgico" },
  { id: "p-liturgia", titulo: "Liturgia Diária", descricao: "Leituras e Evangelho de hoje", categoria: "Página", href: "/liturgia-diaria" },
  { id: "p-coroinhas", titulo: "Coroinhas", descricao: "Formação para acólitos e ministrantes", categoria: "Página", href: "/coroinhas" },
  { id: "p-glossario", titulo: "Glossário Católico", descricao: "Termos doutrinais explicados", categoria: "Página", href: "/glossario" },
  { id: "p-forum", titulo: "Fórum Agora Ecclesiae", descricao: "Conversas da comunidade", categoria: "Página", href: "/forum" },
  { id: "p-painel", titulo: "Meu Painel", descricao: "Progresso espiritual, diário e conquistas", categoria: "Página", href: "/painel" },
  { id: "p-busca", titulo: "Busca Avançada", descricao: "Cruze Bíblia, Catecismo e Magistério em uma consulta", categoria: "Página", href: "/busca" },
  { id: "p-sobre", titulo: "Sobre o Portal", descricao: "Critérios teológicos, fontes e processo de revisão editorial", categoria: "Página", href: "/sobre" },
  { id: "p-sophia", titulo: "Sophia IA", descricao: "Assistente católico para suas dúvidas", categoria: "Página", href: "/assistente" },
];

let cache: ItemBusca[] | null = null;

export function indiceBusca(): ItemBusca[] {
  if (cache) return cache;

  const itens: ItemBusca[] = [...PAGINAS];

  for (const livro of LIVROS) {
    itens.push({
      id: `b-${livro.slug}`,
      titulo: livro.nome,
      descricao: `${livro.abrev} · ${livro.capitulos} capítulos · ${livro.grupo}`,
      categoria: "Bíblia",
      href: `/biblia/${livro.slug}`,
    });
  }

  for (const parte of PARTES) {
    itens.push({
      id: `c-${parte.slug}`,
      titulo: `${parte.titulo}`,
      descricao: `Parte ${parte.num} do CIC · ${parte.paragrafos}`,
      categoria: "Catecismo",
      href: `/catecismo/${parte.slug}`,
    });
  }

  const slugPorParte: Record<number, string> = { 1: "credo", 2: "liturgia", 3: "vida-em-cristo", 4: "oracao" };
  for (const secao of SECOES) {
    itens.push({
      id: `cs-${secao.slug}`,
      titulo: secao.titulo,
      descricao: `Catecismo ${secao.paragrafos}`,
      categoria: "Catecismo",
      href: `/catecismo/${slugPorParte[secao.parte]}`,
    });
  }

  for (const santo of SANTOS_LISTA) {
    itens.push({
      id: `s-${santo.slug}`,
      titulo: santo.nome,
      descricao: `${santo.data} · ${santo.body.slice(0, 90)}`,
      categoria: "Santo",
      href: `/santos/${santo.slug}`,
    });
  }

  for (const [chave, entrada] of Object.entries(GLOSSARIO)) {
    itens.push({
      id: `g-${chave}`,
      titulo: entrada.termo,
      descricao: entrada.definicao.slice(0, 110),
      categoria: "Glossário",
      href: `/glossario#${normalizar(entrada.termo).replace(/\s+/g, "-")}`,
    });
  }

  for (const novena of NOVENAS) {
    itens.push({
      id: `n-${novena.slug}`,
      titulo: novena.titulo,
      descricao: novena.ocasiao,
      categoria: "Oração",
      href: `/oracoes/novenas/${novena.slug}`,
    });
  }

  for (const oracao of ORACOES) {
    itens.push({
      id: `o-${oracao.slug}`,
      titulo: oracao.titulo,
      descricao: `${oracao.categoria} · ${oracao.latim ? `${oracao.latim} · ` : ""}${oracao.texto.slice(0, 80)}`,
      categoria: "Oração",
      href: `/oracoes#${oracao.slug}`,
    });
  }

  for (const objecao of OBJECOES) {
    itens.push({
      id: `ap-${objecao.slug}`,
      titulo: objecao.objecao,
      descricao: `${objecao.categoria} · ${objecao.resposta[0]?.slice(0, 100) ?? ""}`,
      categoria: "Apologética",
      href: `/apologetica#objecao-${objecao.slug}`,
    });
  }

  for (const trilha of TRILHAS) {
    itens.push({
      id: `t-${trilha.slug}`,
      titulo: trilha.titulo,
      descricao: `${trilha.nivel} · ${trilha.licoes.length} lições · ${trilha.subtitulo}`,
      categoria: "Trilha",
      href: `/trilhas/${trilha.slug}`,
    });
    for (const licao of trilha.licoes) {
      itens.push({
        id: `t-${trilha.slug}-${licao.slug}`,
        titulo: licao.titulo,
        descricao: `${trilha.titulo} · ${licao.resumo.slice(0, 90)}`,
        categoria: "Trilha",
        href: `/trilhas/${trilha.slug}/${licao.slug}`,
      });
    }
  }

  cache = itens;
  return itens;
}

/** Reconhece referências como "Jo 3", "joao 3,16", "salmos 23". */
function referenciaBiblica(consulta: string): ItemBusca | null {
  const match = consulta.match(/^([1-3]?\s*[a-zà-ú]+(?:\s+[a-zà-ú]+)?)\s+(\d{1,3})/i);
  if (!match) return null;
  const bruto = match[1]!.replace(/\s+/g, "").toLowerCase();
  const alvo = normalizar(bruto);
  const capitulo = Number(match[2]);

  const livro =
    // abreviação com acento (Jo = João, Jó = Jó)
    LIVROS.find((l) => l.abrev.toLowerCase() === bruto) ??
    LIVROS.find((l) => normalizar(l.abrev) === alvo) ??
    LIVROS.find((l) => normalizar(l.nome).replace(/\s+/g, "") === alvo) ??
    LIVROS.find((l) => normalizar(l.nome).replace(/\s+/g, "").startsWith(alvo) && alvo.length >= 3);

  if (!livro || capitulo < 1 || capitulo > livro.capitulos) return null;

  return {
    id: `ref-${livro.slug}-${capitulo}`,
    titulo: `${livro.nome} ${capitulo}`,
    descricao: "Abrir o capítulo na Bíblia",
    categoria: "Bíblia",
    href: `/biblia/${livro.slug}/${capitulo}`,
  };
}

export const ORDEM_CATEGORIAS: Categoria[] = [
  "Bíblia",
  "Catecismo",
  "Santo",
  "Oração",
  "Trilha",
  "Apologética",
  "Glossário",
  "Página",
];

/** Agrupa os resultados por categoria, mantendo a ordem editorial do portal. */
export function agrupar(resultados: ItemBusca[]): { categoria: Categoria; itens: ItemBusca[] }[] {
  const mapa = new Map<Categoria, ItemBusca[]>();
  for (const item of resultados) {
    const lista = mapa.get(item.categoria);
    if (lista) lista.push(item);
    else mapa.set(item.categoria, [item]);
  }
  return ORDEM_CATEGORIAS.filter((c) => mapa.has(c)).map((categoria) => ({
    categoria,
    itens: mapa.get(categoria)!,
  }));
}

export function buscar(consulta: string, limite = 24): ItemBusca[] {
  const termo = normalizar(consulta);
  if (termo.length < 2) return [];

  const resultados: { item: ItemBusca; peso: number }[] = [];
  const referencia = referenciaBiblica(consulta);

  for (const item of indiceBusca()) {
    const titulo = normalizar(item.titulo);
    const descricao = normalizar(item.descricao);
    let peso = -1;
    if (titulo === termo) peso = 0;
    else if (titulo.startsWith(termo)) peso = 1;
    else if (titulo.includes(termo)) peso = 2;
    else if (descricao.includes(termo)) peso = 3;
    if (peso >= 0) resultados.push({ item, peso });
  }

  resultados.sort((a, b) => a.peso - b.peso || a.item.titulo.localeCompare(b.item.titulo));
  const lista = resultados.slice(0, limite).map((r) => r.item);
  return referencia ? [referencia, ...lista.filter((i) => i.id !== referencia.id)] : lista;
}
