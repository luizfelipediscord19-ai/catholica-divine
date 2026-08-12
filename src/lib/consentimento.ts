/**
 * Consentimento LGPD — armazenamento local do aceite e das preferências.
 *
 * Nada é enviado a servidores: o registro fica no próprio dispositivo,
 * e pode ser consultado e revogado em /privacidade e /termos.
 */

export const VERSAO_CONSENTIMENTO = "1.0";

export const CHAVE_CONSENTIMENTO = "pc:consentimento";

export const EVENTO_CONSENTIMENTO = "pc:consentimento-alterado";

export type CategoriaConsentimento = "essencial" | "preferencias" | "personalizacao";

export type PreferenciasConsentimento = Record<CategoriaConsentimento, boolean>;

export type RegistroConsentimento = {
  versao: string;
  decisao: "todos" | "essencial" | "personalizado";
  preferencias: PreferenciasConsentimento;
  /** ISO 8601 (UTC) */
  data: string;
};

export const CATEGORIAS: Array<{
  id: CategoriaConsentimento;
  nome: string;
  descricao: string;
  obrigatoria: boolean;
}> = [
  {
    id: "essencial",
    nome: "Essenciais",
    descricao:
      "Sessão de login, segurança do fórum e funcionamento offline do aplicativo. Sem estes dados o site não funciona.",
    obrigatoria: true,
  },
  {
    id: "preferencias",
    nome: "Preferências",
    descricao:
      "Tema claro/escuro, versão da Bíblia escolhida, modo leitura e ajustes de exibição guardados no seu aparelho.",
    obrigatoria: false,
  },
  {
    id: "personalizacao",
    nome: "Personalização espiritual",
    descricao:
      "Progresso de leitura, favoritos, diário, conquistas e o Caminho do Padroeiro do Painel Espiritual.",
    obrigatoria: false,
  },
];

export const PREFERENCIAS_MINIMAS: PreferenciasConsentimento = {
  essencial: true,
  preferencias: false,
  personalizacao: false,
};

export const PREFERENCIAS_TOTAIS: PreferenciasConsentimento = {
  essencial: true,
  preferencias: true,
  personalizacao: true,
};

function normalizar(valor: unknown): RegistroConsentimento | null {
  if (!valor || typeof valor !== "object") return null;
  const bruto = valor as Partial<RegistroConsentimento>;
  if (typeof bruto.data !== "string" || typeof bruto.versao !== "string") return null;
  const prefs = (bruto.preferencias ?? {}) as Partial<PreferenciasConsentimento>;
  return {
    versao: bruto.versao,
    decisao:
      bruto.decisao === "todos" || bruto.decisao === "essencial" || bruto.decisao === "personalizado"
        ? bruto.decisao
        : "personalizado",
    data: bruto.data,
    preferencias: {
      essencial: true,
      preferencias: prefs.preferencias === true,
      personalizacao: prefs.personalizacao === true,
    },
  };
}

export function lerConsentimento(): RegistroConsentimento | null {
  if (typeof window === "undefined") return null;
  try {
    const cru = window.localStorage.getItem(CHAVE_CONSENTIMENTO);
    if (!cru) return null;
    return normalizar(JSON.parse(cru));
  } catch {
    return null;
  }
}

export function precisaDecidir(registro: RegistroConsentimento | null): boolean {
  return !registro || registro.versao !== VERSAO_CONSENTIMENTO;
}

export function gravarConsentimento(
  preferencias: PreferenciasConsentimento,
  decisao: RegistroConsentimento["decisao"],
): RegistroConsentimento {
  const registro: RegistroConsentimento = {
    versao: VERSAO_CONSENTIMENTO,
    decisao,
    preferencias: { ...preferencias, essencial: true },
    data: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CHAVE_CONSENTIMENTO, JSON.stringify(registro));
    } catch {
      /* armazenamento indisponível: segue apenas em memória */
    }
    window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMENTO, { detail: registro }));
  }
  return registro;
}

export function revogarConsentimento() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CHAVE_CONSENTIMENTO);
  } catch {
    /* ignorado */
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMENTO, { detail: null }));
}

export function abrirPreferencias() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("pc:abrir-consentimento"));
}

export function formatarData(iso: string): string {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}
