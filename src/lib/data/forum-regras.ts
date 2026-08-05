/** Regras de conduta e motivos de denúncia do fórum Agora Ecclesiae. */

export const REGRAS_FORUM = [
  {
    titulo: "Caridade antes de tudo",
    texto:
      "Fale com o irmão, não contra o irmão. Ataques pessoais, ironia humilhante e generalizações sobre grupos não são publicados.",
  },
  {
    titulo: "Fidelidade ao Magistério",
    texto:
      "Dúvidas sinceras são bem-vindas; propaganda contra a fé católica, cisma ou desprezo pelo Papa e pelos bispos, não.",
  },
  {
    titulo: "Cite as fontes",
    texto:
      "Ao afirmar algo de doutrina, indique Escritura, Catecismo ou documento conciliar. Isso eleva a conversa e ajuda quem lê depois.",
  },
  {
    titulo: "Sem spam nem divulgação",
    texto:
      "Links repetidos, correntes, vendas, pedidos de dinheiro e autopromoção são removidos sem aviso.",
  },
  {
    titulo: "Respeito à privacidade",
    texto:
      "Não publique dados pessoais (seus ou de outros): telefone, endereço, e-mail ou fotos de terceiros.",
  },
  {
    titulo: "Revisão antes de aparecer",
    texto:
      "Toda conversa e resposta passa por revisão. O conteúdo aprovado aparece para todos; o que fica em análise você continua vendo, marcado como “em revisão”.",
  },
] as const;

export const MOTIVOS_DENUNCIA = [
  { valor: "ofensa", rotulo: "Ofensa ou falta de caridade" },
  { valor: "doutrina", rotulo: "Erro doutrinal grave" },
  { valor: "spam", rotulo: "Spam ou divulgação" },
  { valor: "privacidade", rotulo: "Dados pessoais expostos" },
  { valor: "conteudo_impropio", rotulo: "Conteúdo impróprio" },
  { valor: "outro", rotulo: "Outro motivo" },
] as const;

export type MotivoDenuncia = (typeof MOTIVOS_DENUNCIA)[number]["valor"];
