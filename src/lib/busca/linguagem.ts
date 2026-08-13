// Camada de linguagem natural da busca: permite escrever a dúvida como
// pergunta ("Por que os católicos rezam pelos mortos?") e ainda encontrar o
// conteúdo certo. Remove palavras vazias e expande o vocabulário católico.

function semAcento(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Palavras que não ajudam a discriminar conteúdo em português. */
const VAZIAS = new Set(
  (
    "a o as os um uma uns umas de do da dos das em no na nos nas por porque pra para " +
    "que qual quais quando quanto quantos como onde e ou mas se sim nao nao-se ser sao " +
    "e-que eh esta este esta isso isto aquilo ele ela eles elas eu tu voce voces nos " +
    "me mim meu minha seu sua nosso nossa com sem sobre entre ao aos à as tem ter tenho " +
    "ha havia foi era sera sao existe existem pode podem devo deve devemos fazer faz " +
    "muito mais menos ja ainda tambem apenas so somente qualquer algum alguma alguns " +
    "coisa coisas gente pessoa pessoas duvida pergunta explique explicar explicacao " +
    "significa significado quero saber diga fale me-diga verdade sobre-o assim entao"
  ).split(/\s+/),
);

/**
 * Vocabulário católico: cada chave (radical normalizado) acrescenta termos
 * equivalentes ao índice de busca, para que a pergunta do fiel chegue ao
 * conteúdo mesmo quando usa outras palavras.
 */
const SINONIMOS: Record<string, string[]> = {
  morto: ["purgatorio", "defuntos", "almas", "sufragio", "indulgencia", "juizo"],
  mortos: ["purgatorio", "defuntos", "almas", "sufragio", "indulgencia"],
  morte: ["purgatorio", "juizo", "escatologia", "ressurreicao", "unc"],
  falecido: ["purgatorio", "defuntos", "sufragio"],
  rezar: ["oracao", "oracoes", "prece", "rosario"],
  reza: ["oracao", "oracoes", "prece"],
  rezam: ["oracao", "oracoes", "prece", "intercessao"],
  oracao: ["rezar", "prece", "rosario", "liturgia das horas"],
  santo: ["santos", "intercessao", "canonizacao", "veneracao"],
  santos: ["intercessao", "canonizacao", "veneracao", "comunhao dos santos"],
  imagem: ["imagens", "iconoclasmo", "veneracao", "idolatria"],
  imagens: ["veneracao", "idolatria", "iconoclasmo"],
  maria: ["nossa senhora", "mariologia", "imaculada", "assuncao", "virgem", "rosario"],
  "nossa senhora": ["maria", "mariologia", "imaculada", "assuncao"],
  virgem: ["maria", "imaculada", "virgindade perpetua"],
  papa: ["pontifice", "primado", "pedro", "infalibilidade", "magisterio"],
  pedro: ["papa", "primado", "sucessao apostolica"],
  missa: ["eucaristia", "liturgia", "sacrificio", "santa missa", "comunhao"],
  eucaristia: ["missa", "comunhao", "transubstanciacao", "santissimo", "pao da vida"],
  pao: ["eucaristia", "transubstanciacao", "pao da vida"],
  hostia: ["eucaristia", "santissimo", "comunhao"],
  confissao: ["penitencia", "reconciliacao", "perdao", "pecado", "sacramento"],
  confessar: ["confissao", "penitencia", "reconciliacao", "perdao"],
  pecado: ["pecado mortal", "pecado venial", "graca", "confissao", "penitencia"],
  batismo: ["batizado", "pecado original", "graca", "sacramento"],
  crisma: ["confirmacao", "espirito santo", "sacramento"],
  casamento: ["matrimonio", "sacramento", "familia", "indissolubilidade"],
  divorcio: ["matrimonio", "nulidade", "indissolubilidade"],
  padre: ["sacerdocio", "ordem", "presbitero", "celibato"],
  celibato: ["sacerdocio", "ordem", "castidade"],
  inferno: ["escatologia", "juizo", "condenacao", "novissimos"],
  ceu: ["escatologia", "beatitude", "vida eterna", "novissimos"],
  purgatorio: ["escatologia", "sufragio", "indulgencia", "almas"],
  biblia: ["escritura", "sagrada escritura", "canon", "deuterocanonicos"],
  escritura: ["biblia", "revelacao", "tradicao", "inspiracao"],
  tradicao: ["magisterio", "revelacao", "escritura", "deposito da fe"],
  igreja: ["eclesiologia", "corpo de cristo", "magisterio", "apostolica"],
  jesus: ["cristo", "encarnacao", "redencao", "ressurreicao"],
  cristo: ["jesus", "encarnacao", "redencao", "paixao"],
  trindade: ["pai", "filho", "espirito santo", "dogma"],
  graca: ["justificacao", "santificacao", "sacramento"],
  jejum: ["penitencia", "quaresma", "abstinencia", "mortificacao"],
  quaresma: ["jejum", "penitencia", "cinzas", "tempo liturgico"],
  advento: ["tempo liturgico", "natal", "esperanca"],
  terco: ["rosario", "misterios", "maria"],
  rosario: ["terco", "misterios", "maria"],
  anjo: ["anjos", "arcanjo", "angelologia", "guarda"],
  demonio: ["diabo", "exorcismo", "tentacao", "mal"],
  aborto: ["vida", "moral", "quinto mandamento", "dignidade"],
  eutanasia: ["vida", "moral", "quinto mandamento"],
  dizimo: ["caridade", "moral", "igreja"],
  protestante: ["apologetica", "reforma", "sola scriptura", "unidade"],
  evangelico: ["apologetica", "protestante", "sola scriptura"],
  ateu: ["apologetica", "existencia de deus", "razao e fe"],
};

/** Palavras significativas da consulta (sem artigos, pronomes etc.). */
export function palavrasChave(consulta: string): string[] {
  const brutas = semAcento(consulta)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const uteis = brutas.filter((p) => p.length >= 3 && !VAZIAS.has(p));
  const lista = uteis.length ? uteis : brutas.filter((p) => p.length >= 2);
  // Sem duplicatas, no máximo 8 termos (perguntas longas ficam previsíveis).
  return [...new Set(lista)].slice(0, 8);
}

/** Termos equivalentes (sinônimos e vocabulário doutrinal) das palavras dadas. */
export function expandirTermos(palavras: string[]): string[] {
  const extras = new Set<string>();
  for (const p of palavras) {
    for (const alvo of SINONIMOS[p] ?? []) extras.add(semAcento(alvo));
    // Radical simples: "eucaristico" alcança "eucaristia".
    if (p.length > 5) {
      for (const [chave, valores] of Object.entries(SINONIMOS)) {
        if (chave.startsWith(p.slice(0, 5)) && chave !== p) {
          extras.add(chave);
          for (const v of valores) extras.add(semAcento(v));
        }
      }
    }
  }
  for (const p of palavras) extras.delete(p);
  return [...extras].slice(0, 24);
}

/** Pergunta em linguagem natural? (heurística usada só para dicas na interface) */
export function pareceFrase(consulta: string): boolean {
  return palavrasChave(consulta).length >= 2 || /\?$/.test(consulta.trim());
}
