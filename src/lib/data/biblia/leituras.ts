// Plano de leituras diárias automáticas (cíclico por dia do ano).
// Cada leitura aponta para livro/capítulo e, opcionalmente, intervalo de versículos.

export type Leitura = {
  livro: string; // slug
  nome: string;
  capitulo: number;
  vi?: number;
  vf?: number;
  tema: string;
};

export const PLANO: Leitura[] = [
  { livro: "joao", nome: "João", capitulo: 3, vi: 14, vf: 21, tema: "Deus amou o mundo" },
  { livro: "genesis", nome: "Gênesis", capitulo: 1, tema: "A Criação" },
  { livro: "salmos", nome: "Salmos", capitulo: 23, tema: "O Senhor é meu pastor" },
  { livro: "mateus", nome: "Mateus", capitulo: 5, vi: 1, vf: 12, tema: "Bem-aventuranças" },
  { livro: "exodo", nome: "Êxodo", capitulo: 20, vi: 1, vf: 17, tema: "Os Dez Mandamentos" },
  { livro: "lucas", nome: "Lucas", capitulo: 15, vi: 11, vf: 32, tema: "O Filho Pródigo" },
  { livro: "isaias", nome: "Isaías", capitulo: 53, tema: "O Servo Sofredor" },
  { livro: "joao", nome: "João", capitulo: 1, vi: 1, vf: 18, tema: "O Verbo se fez carne" },
  { livro: "1corintios", nome: "1 Coríntios", capitulo: 13, tema: "Hino à Caridade" },
  { livro: "mateus", nome: "Mateus", capitulo: 6, vi: 9, vf: 13, tema: "Pai-Nosso" },
  { livro: "salmos", nome: "Salmos", capitulo: 51, tema: "Miserere — Salmo do arrependimento" },
  { livro: "romanos", nome: "Romanos", capitulo: 8, tema: "Vida no Espírito" },
  { livro: "lucas", nome: "Lucas", capitulo: 1, vi: 26, vf: 56, tema: "Anunciação e Magnificat" },
  { livro: "genesis", nome: "Gênesis", capitulo: 22, vi: 1, vf: 19, tema: "Sacrifício de Isaque" },
  { livro: "joao", nome: "João", capitulo: 6, vi: 22, vf: 71, tema: "Pão da Vida" },
  { livro: "filipenses", nome: "Filipenses", capitulo: 2, vi: 1, vf: 11, tema: "Hino da Kénosis" },
  { livro: "salmos", nome: "Salmos", capitulo: 91, tema: "À sombra do Altíssimo" },
  { livro: "mateus", nome: "Mateus", capitulo: 26, tema: "Última Ceia e Getsêmani" },
  { livro: "mateus", nome: "Mateus", capitulo: 27, tema: "Paixão de Cristo" },
  { livro: "mateus", nome: "Mateus", capitulo: 28, tema: "Ressurreição" },
  { livro: "atos", nome: "Atos", capitulo: 2, tema: "Pentecostes" },
  { livro: "joao", nome: "João", capitulo: 14, tema: "‘Eu sou o Caminho’" },
  { livro: "joao", nome: "João", capitulo: 15, vi: 1, vf: 17, tema: "Videira verdadeira" },
  { livro: "joao", nome: "João", capitulo: 17, tema: "Oração Sacerdotal" },
  { livro: "apocalipse", nome: "Apocalipse", capitulo: 21, tema: "Nova Jerusalém" },
  { livro: "proverbios", nome: "Provérbios", capitulo: 3, vi: 1, vf: 12, tema: "Confia no Senhor" },
  { livro: "eclesiastes", nome: "Eclesiastes", capitulo: 3, vi: 1, vf: 15, tema: "Tempo para cada coisa" },
  { livro: "tiago", nome: "Tiago", capitulo: 1, tema: "Fé provada" },
  { livro: "1joao", nome: "1 João", capitulo: 4, tema: "Deus é amor" },
  { livro: "hebreus", nome: "Hebreus", capitulo: 11, tema: "A fé dos antigos" },
  { livro: "lucas", nome: "Lucas", capitulo: 10, vi: 25, vf: 37, tema: "Bom Samaritano" },
  { livro: "lucas", nome: "Lucas", capitulo: 24, vi: 13, vf: 35, tema: "Discípulos de Emaús" },
  { livro: "marcos", nome: "Marcos", capitulo: 4, vi: 1, vf: 20, tema: "Parábola do Semeador" },
  { livro: "salmos", nome: "Salmos", capitulo: 1, tema: "O caminho do justo" },
  { livro: "salmos", nome: "Salmos", capitulo: 121, tema: "Cântico das peregrinações" },
  { livro: "isaias", nome: "Isaías", capitulo: 40, tema: "Consolai meu povo" },
  { livro: "ezequiel", nome: "Ezequiel", capitulo: 37, vi: 1, vf: 14, tema: "Vale dos ossos secos" },
  { livro: "daniel", nome: "Daniel", capitulo: 3, tema: "Os três jovens na fornalha" },
  { livro: "jonas", nome: "Jonas", capitulo: 2, tema: "Oração no ventre do peixe" },
  { livro: "miqueias", nome: "Miqueias", capitulo: 5, vi: 1, vf: 5, tema: "Anúncio do Messias em Belém" },
];

export function dayOfYear(d: Date = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function leituraDoDia(d: Date = new Date()): Leitura {
  return PLANO[(dayOfYear(d) - 1 + PLANO.length * 1000) % PLANO.length];
}

export function proximosDias(n: number, base: Date = new Date()): { data: Date; leitura: Leitura }[] {
  const out: { data: Date; leitura: Leitura }[] = [];
  for (let i = 0; i < n; i++) {
    const data = new Date(base);
    data.setDate(base.getDate() + i);
    out.push({ data, leitura: leituraDoDia(data) });
  }
  return out;
}
