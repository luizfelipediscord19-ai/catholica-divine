/**
 * Preferências do convite de instalação do aplicativo (PWA).
 *
 * Regras:
 * - "Agora não" silencia o convite pelo intervalo configurado e nunca reaparece
 *   na mesma sessão de navegação.
 * - Cada nova recusa aumenta o intervalo (escalonamento configurável).
 * - "Instalado" silencia para sempre.
 */

const CHAVE = "portal:pwa-convite";
const CHAVE_SESSAO = "portal:pwa-convite-sessao";

/** Intervalos (em dias) aplicados a cada recusa consecutiva. */
export const INTERVALOS_DIAS = [3, 14, 45, 120];

/** Espera antes de abrir o modal, em milissegundos. */
export const ATRASO_MS = 1800;

type Estado = {
  /** Momento da última recusa (epoch ms). */
  dispensadoEm?: number;
  /** Quantas vezes o usuário já recusou. */
  recusas?: number;
  /** Aplicativo já instalado neste navegador. */
  instalado?: boolean;
};

function ler(): Estado {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) return JSON.parse(bruto) as Estado;

    // Migração do formato antigo ("instalado" ou timestamp em texto).
    const antigo = localStorage.getItem("portal:pwa-dispensado");
    if (!antigo) return {};
    if (antigo === "instalado") return { instalado: true };
    const quando = Number(antigo);
    return Number.isFinite(quando) ? { dispensadoEm: quando, recusas: 1 } : {};
  } catch {
    return {};
  }
}

function gravar(estado: Estado) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch {
    /* navegação privada */
  }
}

/** Dias de silêncio conforme o número de recusas já registradas. */
export function diasDeSilencio(recusas: number) {
  const indice = Math.min(Math.max(recusas, 1), INTERVALOS_DIAS.length) - 1;
  return INTERVALOS_DIAS[indice];
}

/** O convite deve ficar escondido agora? */
export function conviteSilenciado(): boolean {
  try {
    if (sessionStorage.getItem(CHAVE_SESSAO) === "1") return true;
  } catch {
    /* ignora */
  }

  const estado = ler();
  if (estado.instalado) return true;
  if (!estado.dispensadoEm) return false;

  const espera = diasDeSilencio(estado.recusas ?? 1) * 24 * 60 * 60 * 1000;
  return Date.now() - estado.dispensadoEm < espera;
}

/** Registra "Agora não": silencia a sessão inteira e o próximo intervalo. */
export function registrarRecusa() {
  const estado = ler();
  const recusas = (estado.recusas ?? 0) + 1;
  gravar({ ...estado, dispensadoEm: Date.now(), recusas });
  try {
    sessionStorage.setItem(CHAVE_SESSAO, "1");
  } catch {
    /* ignora */
  }
  return diasDeSilencio(recusas);
}

/** Registra instalação concluída: não convida mais. */
export function registrarInstalado() {
  gravar({ ...ler(), instalado: true });
  try {
    sessionStorage.setItem(CHAVE_SESSAO, "1");
  } catch {
    /* ignora */
  }
}
