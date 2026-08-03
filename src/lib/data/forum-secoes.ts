/**
 * Seções fixas do fórum Agora Ecclesiae.
 * Ficam no código (e não só no banco) para que o formulário de nova conversa
 * nunca apareça com o campo de seção vazio, mesmo se a rede falhar.
 */
export type SecaoForum = { slug: string; nome: string; descricao: string };

export const SECOES_FORUM: SecaoForum[] = [
  {
    slug: "fe-e-doutrina",
    nome: "Fé e Doutrina",
    descricao: "Dúvidas sobre dogmas, Catecismo e magistério.",
  },
  {
    slug: "sagrada-escritura",
    nome: "Sagrada Escritura",
    descricao: "Estudo e partilha da Palavra de Deus.",
  },
  {
    slug: "vida-de-oracao",
    nome: "Vida de Oração",
    descricao: "Rosário, Liturgia das Horas, devoções e silêncio.",
  },
  {
    slug: "santos-e-testemunhos",
    nome: "Santos e Testemunhos",
    descricao: "Vidas dos santos e graças recebidas.",
  },
  {
    slug: "apologetica",
    nome: "Apologética",
    descricao: "Como responder às objeções à fé católica.",
  },
];

export const SECAO_PADRAO = SECOES_FORUM[0]!.slug;
