import { URL_CDC, urlCatecismoOficial } from "@/lib/fontes/magisterio";

export type TipoAncoraMagisterial = "CIC" | "CDC" | "DH";

export type AncoraMagisterial = {
  tipo: TipoAncoraMagisterial;
  numero: number;
  rotulo: string;
  titulo: string;
  sintese: string;
  contexto: string;
  fonte: string;
  url: string;
};

const CIC_SINTESES: Record<number, Omit<AncoraMagisterial, "tipo" | "numero" | "rotulo" | "url">> = {
  828: {
    titulo: "Santidade e canonização",
    sintese:
      "A Igreja reconhece em alguns fiéis o exercício heroico das virtudes e os propõe como modelos e intercessores.",
    contexto: "Comunhão dos santos e vocação universal à santidade.",
    fonte: "Catecismo da Igreja Católica",
  },
  1213: {
    titulo: "O santo Batismo",
    sintese:
      "O Batismo é o fundamento da vida cristã, porta da vida no Espírito e acesso aos demais sacramentos.",
    contexto: "Sacramento da iniciação cristã e novo nascimento em Cristo.",
    fonte: "Catecismo da Igreja Católica",
  },
  1451: {
    titulo: "A contrição",
    sintese:
      "A contrição é dor da alma e rejeição do pecado cometido, acompanhada do propósito de não voltar a pecar.",
    contexto: "Atos do penitente no sacramento da Reconciliação.",
    fonte: "Catecismo da Igreja Católica",
  },
  1674: {
    titulo: "Piedade popular",
    sintese:
      "A vida cristã também se expressa em formas de piedade que prolongam a vida litúrgica sem substituí-la.",
    contexto: "Rosário, Via-Sacra, peregrinações e outras devoções legítimas.",
    fonte: "Catecismo da Igreja Católica",
  },
  2683: {
    titulo: "Testemunhas da oração",
    sintese:
      "As testemunhas que chegaram ao Reino contemplam Deus, louvam-no e continuam cuidando daqueles que deixaram na terra.",
    contexto: "Intercessão dos santos na comunhão da Igreja.",
    fonte: "Catecismo da Igreja Católica",
  },
};

const CDC_SINTESES: Record<number, { titulo: string; sintese: string; contexto: string }> = {
  849: {
    titulo: "Batismo no direito da Igreja",
    sintese:
      "O cânon apresenta o Batismo como necessário à salvação e como porta dos sacramentos, conferido com água e a fórmula trinitária.",
    contexto: "Disciplina sacramental do Batismo no Código de 1983.",
  },
  983: {
    titulo: "Sigilo sacramental",
    sintese:
      "O sigilo da Confissão é inviolável; o confessor não pode revelar o penitente por palavras nem por qualquer outro modo.",
    contexto: "Proteção absoluta do sacramento da Penitência.",
  },
  1186: {
    titulo: "Veneração dos santos",
    sintese:
      "A Igreja recomenda a veneração da Virgem Maria e dos santos para favorecer a santificação do povo de Deus.",
    contexto: "Culto dos santos, imagens e relíquias.",
  },
};

const DH_SINTESES: Record<number, { titulo: string; sintese: string; contexto: string }> = {
  1520: {
    titulo: "Justificação e vida nova",
    sintese:
      "A referência reúne a formulação dogmática tridentina sobre a graça justificante e a renovação interior do fiel.",
    contexto: "Concílio de Trento, doutrina sobre a justificação.",
  },
};

export function criarAncoraMagisterial(
  tipo: TipoAncoraMagisterial,
  numero: number,
  substituicao?: Partial<Pick<AncoraMagisterial, "titulo" | "sintese" | "contexto">>,
): AncoraMagisterial {
  if (tipo === "CIC") {
    const base = CIC_SINTESES[numero];
    return {
      tipo,
      numero,
      rotulo: `CIC §${numero}`,
      titulo: substituicao?.titulo ?? base?.titulo ?? "Catecismo da Igreja Católica",
      sintese:
        substituicao?.sintese ??
        base?.sintese ??
        "Consulte o parágrafo indicado para ler a formulação completa no texto oficial da Santa Sé.",
      contexto: substituicao?.contexto ?? base?.contexto ?? "Referência doutrinal do Catecismo.",
      fonte: base?.fonte ?? "Catecismo da Igreja Católica",
      url: urlCatecismoOficial(numero),
    };
  }

  if (tipo === "CDC") {
    const base = CDC_SINTESES[numero];
    return {
      tipo,
      numero,
      rotulo: `Cân. ${numero}`,
      titulo: substituicao?.titulo ?? base?.titulo ?? "Código de Direito Canônico",
      sintese:
        substituicao?.sintese ??
        base?.sintese ??
        "Consulte o cânon indicado no Código oficial para conhecer sua redação e contexto completos.",
      contexto: substituicao?.contexto ?? base?.contexto ?? "Norma do Código de Direito Canônico de 1983.",
      fonte: "Código de Direito Canônico (1983)",
      url: URL_CDC,
    };
  }

  const base = DH_SINTESES[numero];
  return {
    tipo,
    numero,
    rotulo: `DH ${numero}`,
    titulo: substituicao?.titulo ?? base?.titulo ?? "Denzinger-Hünermann",
    sintese:
      substituicao?.sintese ??
      base?.sintese ??
      "Referência catalográfica a uma formulação histórica da fé; confira a edição crítica para o texto e o contexto completos.",
    contexto:
      substituicao?.contexto ?? base?.contexto ?? "Enchiridion Symbolorum, definição e declaração magisterial catalogada.",
    fonte: "Denzinger-Hünermann, Enchiridion Symbolorum",
    url: "https://www.vatican.va/content/vatican/pt.html",
  };
}
