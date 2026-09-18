/**
 * Liga cada santo ao vocabulário teológico e ao Catecismo.
 *
 * A partir do que a própria ficha diz (título, virtudes, padroado e biografia),
 * indicamos os verbetes do Glossário que ajudam a ler aquela vida e os
 * parágrafos do Catecismo / cânones que fundamentam o culto correspondente.
 * Tudo é derivado do conteúdo já publicado: nada é inventado.
 */
import { GLOSSARIO, type EntradaGlossario } from "@/lib/data/glossario";

export type VerbeteLigado = EntradaGlossario & { chave: string; caminho: string };

export type AncoraSanto = {
  tipo: "CIC" | "CDC";
  numero: number;
  titulo?: string;
  sintese?: string;
  contexto?: string;
};

function normalizar(v: string): string {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Âncoras comuns a toda ficha de santo: canonização, intercessão e culto. */
const ANCORAS_BASE: AncoraSanto[] = [
  { tipo: "CIC", numero: 828 },
  { tipo: "CIC", numero: 2683 },
  { tipo: "CDC", numero: 1186 },
];

/** Palavras da ficha → parágrafos do Catecismo pertinentes àquele estado de vida. */
const REGRAS: { chaves: string[]; ancoras: AncoraSanto[] }[] = [
  {
    chaves: ["martir", "martirio", "martires"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 2473,
        titulo: "O martírio",
        sintese:
          "O martírio é o testemunho supremo da verdade da fé: o mártir dá a vida por Cristo, unindo-se à sua morte.",
        contexto: "Testemunho da fé até o dom da vida.",
      },
    ],
  },
  {
    chaves: ["virgem", "virgens", "virgindade", "consagrada", "consagrado"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 922,
        titulo: "Virgens e viúvas consagradas",
        sintese:
          "A Igreja consagra mulheres que, vivendo no mundo ou na clausura, se entregam a Cristo com um propósito de virgindade.",
        contexto: "Formas de vida consagrada reconhecidas pela Igreja.",
      },
    ],
  },
  {
    chaves: ["monge", "monja", "abade", "abadessa", "eremita", "mosteiro", "beneditin"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 925,
        titulo: "Vida religiosa",
        sintese:
          "A vida religiosa é vivida em comunidade, com votos públicos e um estilo de vida estável reconhecido pela Igreja.",
        contexto: "Institutos religiosos e profissão dos conselhos evangélicos.",
      },
    ],
  },
  {
    chaves: ["bispo", "arcebispo", "papa", "pontifice", "patriarca"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 886,
        titulo: "Os bispos e a Igreja particular",
        sintese:
          "Cada bispo é princípio visível de unidade na sua Igreja particular e, com o Colégio episcopal, cuida de toda a Igreja.",
        contexto: "Colegialidade episcopal e comunhão com o Bispo de Roma.",
      },
    ],
  },
  {
    chaves: ["presbitero", "sacerdote", "padre", "paroco", "capelao"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 1548,
        titulo: "O ministro age em nome de Cristo",
        sintese:
          "No exercício do ministério ordenado, o sacerdote age na pessoa de Cristo Cabeça, servindo à Igreja.",
        contexto: "Sacramento da Ordem e representação de Cristo.",
      },
    ],
  },
  {
    chaves: ["doutor", "doutora", "teologo", "teologia", "escritos"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 2033,
        titulo: "Doutrina e ensino dos pastores",
        sintese:
          "O ensino moral e doutrinal transmitido pelos pastores e doutores serve à fé recebida dos Apóstolos.",
        contexto: "Magistério e transmissão da doutrina cristã.",
      },
    ],
  },
  {
    chaves: ["missionario", "missionaria", "missoes", "evangeliza"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 849,
        titulo: "O mandato missionário",
        sintese:
          "A Igreja é missionária por natureza: recebeu de Cristo o mandato de anunciar o Evangelho a todos os povos.",
        contexto: "Missão universal da Igreja.",
      },
    ],
  },
  {
    chaves: ["caridade", "pobres", "doentes", "hospital", "enfermos", "misericordia"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 2447,
        titulo: "Obras de misericórdia",
        sintese:
          "As obras de misericórdia socorrem o próximo nas suas necessidades corporais e espirituais, como exigência da caridade.",
        contexto: "Caridade concreta e opção pelos pobres.",
      },
    ],
  },
  {
    chaves: ["mistica", "mistico", "oracao", "contemplacao", "contemplativa"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 2709,
        titulo: "A oração contemplativa",
        sintese:
          "A contemplação é um olhar de fé fixado em Jesus, escuta silenciosa e entrega do coração a Deus.",
        contexto: "Formas da oração cristã.",
      },
    ],
  },
  {
    chaves: ["fundador", "fundadora", "ordem", "congregacao", "instituto"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 917,
        titulo: "Diversidade de carismas",
        sintese:
          "Do tronco da vida consagrada brotaram formas diversas de seguimento de Cristo, todas em benefício de toda a Igreja.",
        contexto: "Carismas fundacionais na vida da Igreja.",
      },
    ],
  },
  {
    chaves: ["maria", "nossa senhora", "rosario", "imaculada"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 971,
        titulo: "O culto à Santíssima Virgem",
        sintese:
          "A devoção a Maria é intrínseca ao culto cristão, mas essencialmente distinta da adoração devida a Deus.",
        contexto: "Veneração mariana na Igreja.",
      },
    ],
  },
  {
    chaves: ["milagre", "milagres", "reliquia", "reliquias", "santuario", "peregrin"],
    ancoras: [
      {
        tipo: "CIC",
        numero: 1674,
        titulo: "Piedade popular",
        sintese:
          "Romarias, relíquias e devoções prolongam a vida litúrgica sem a substituir, quando bem ordenadas.",
        contexto: "Expressões legítimas de piedade popular.",
      },
    ],
  },
];

/** Verbetes do Glossário citados explicitamente pelo texto da ficha. */
export function verbetesDoSanto(texto: string, limite = 6): VerbeteLigado[] {
  const alvo = normalizar(texto);
  const achados: VerbeteLigado[] = [];

  for (const [chave, entrada] of Object.entries(GLOSSARIO)) {
    const termo = normalizar(entrada.termo);
    if (termo.length < 5) continue;
    if (!alvo.includes(termo)) continue;
    achados.push({
      ...entrada,
      chave,
      caminho: `/glossario#${normalizar(entrada.termo).replace(/\s+/g, "-")}`,
    });
    if (achados.length >= limite) break;
  }

  return achados;
}

export function ancorasDoSanto(texto: string, limite = 6): AncoraSanto[] {
  const alvo = normalizar(texto);
  const saida = [...ANCORAS_BASE];
  const vistas = new Set(saida.map((a) => `${a.tipo}-${a.numero}`));

  for (const regra of REGRAS) {
    if (!regra.chaves.some((c) => alvo.includes(c))) continue;
    for (const ancora of regra.ancoras) {
      const id = `${ancora.tipo}-${ancora.numero}`;
      if (vistas.has(id)) continue;
      vistas.add(id);
      saida.push(ancora);
    }
    if (saida.length >= limite) break;
  }

  return saida.slice(0, limite);
}
