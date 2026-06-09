// Conteúdo diário: versículo, santo e evangelho do dia.
// Cicla automaticamente por dia do ano — sempre o mesmo conteúdo em uma data,
// muda à meia-noite local.

import { PLANO, dayOfYear, type Leitura } from "./biblia/leituras";

export type ItemRef = {
  livro: string;
  nome: string;
  capitulo: number;
  vi?: number;
  vf?: number;
};

export type VersiculoDia = ItemRef & { texto: string };
export type EvangelhoDia = ItemRef & { texto: string; titulo: string };
export type SantoDia = { nome: string; data: string; resumo: string };

const VERSICULOS: VersiculoDia[] = [
  { livro: "joao", nome: "João", capitulo: 14, vi: 6, vf: 6, texto: "Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por mim." },
  { livro: "mateus", nome: "Mateus", capitulo: 11, vi: 28, vf: 28, texto: "Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei." },
  { livro: "joao", nome: "João", capitulo: 3, vi: 16, vf: 16, texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito." },
  { livro: "salmos", nome: "Salmos", capitulo: 23, vi: 1, vf: 1, texto: "O Senhor é o meu pastor; nada me faltará." },
  { livro: "filipenses", nome: "Filipenses", capitulo: 4, vi: 13, vf: 13, texto: "Posso todas as coisas naquele que me fortalece." },
  { livro: "isaias", nome: "Isaías", capitulo: 41, vi: 10, vf: 10, texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus." },
  { livro: "mateus", nome: "Mateus", capitulo: 6, vi: 33, vf: 33, texto: "Buscai primeiro o Reino de Deus e a sua justiça, e tudo o mais vos será acrescentado." },
  { livro: "salmos", nome: "Salmos", capitulo: 27, vi: 1, vf: 1, texto: "O Senhor é a minha luz e a minha salvação; a quem temerei?" },
  { livro: "romanos", nome: "Romanos", capitulo: 8, vi: 28, vf: 28, texto: "Tudo coopera para o bem daqueles que amam a Deus." },
  { livro: "1joao", nome: "1 João", capitulo: 4, vi: 8, vf: 8, texto: "Aquele que não ama não conhece a Deus, porque Deus é amor." },
  { livro: "proverbios", nome: "Provérbios", capitulo: 3, vi: 5, vf: 6, texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento." },
  { livro: "salmos", nome: "Salmos", capitulo: 91, vi: 1, vf: 2, texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará." },
  { livro: "joao", nome: "João", capitulo: 8, vi: 12, vf: 12, texto: "Eu sou a luz do mundo; quem me segue não andará em trevas." },
  { livro: "mateus", nome: "Mateus", capitulo: 5, vi: 8, vf: 8, texto: "Bem-aventurados os puros de coração, porque eles verão a Deus." },
  { livro: "1corintios", nome: "1 Coríntios", capitulo: 13, vi: 13, vf: 13, texto: "Agora, pois, permanecem a fé, a esperança e o amor — mas o maior destes é o amor." },
];

const EVANGELHOS: EvangelhoDia[] = [
  { livro: "mateus", nome: "Mateus", capitulo: 5, vi: 1, vf: 12, titulo: "As Bem-aventuranças", texto: "Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus..." },
  { livro: "lucas", nome: "Lucas", capitulo: 15, vi: 11, vf: 32, titulo: "O Filho Pródigo", texto: "Um homem tinha dois filhos. O mais novo disse: ‘Pai, dá-me a parte da herança que me toca’..." },
  { livro: "joao", nome: "João", capitulo: 6, vi: 35, vf: 40, titulo: "O Pão da Vida", texto: "Eu sou o pão da vida; aquele que vem a mim jamais terá fome." },
  { livro: "marcos", nome: "Marcos", capitulo: 4, vi: 1, vf: 20, titulo: "O Semeador", texto: "Saiu o semeador a semear. Enquanto semeava, parte da semente caiu à beira do caminho..." },
  { livro: "lucas", nome: "Lucas", capitulo: 10, vi: 25, vf: 37, titulo: "O Bom Samaritano", texto: "Um homem descia de Jerusalém para Jericó e caiu nas mãos de salteadores..." },
  { livro: "joao", nome: "João", capitulo: 15, vi: 1, vf: 17, titulo: "A Videira verdadeira", texto: "Eu sou a videira verdadeira, e meu Pai é o agricultor..." },
  { livro: "mateus", nome: "Mateus", capitulo: 25, vi: 31, vf: 46, titulo: "O Juízo Final", texto: "Quando o Filho do Homem vier em sua glória... separará uns dos outros, como o pastor separa as ovelhas dos cabritos." },
  { livro: "lucas", nome: "Lucas", capitulo: 24, vi: 13, vf: 35, titulo: "Os Discípulos de Emaús", texto: "Naquele mesmo dia, dois discípulos iam para uma aldeia chamada Emaús..." },
  { livro: "joao", nome: "João", capitulo: 14, vi: 1, vf: 14, titulo: "‘Eu sou o Caminho’", texto: "Não se perturbe o vosso coração. Credes em Deus, crede também em mim." },
  { livro: "mateus", nome: "Mateus", capitulo: 6, vi: 5, vf: 15, titulo: "O Pai-Nosso", texto: "Pai nosso, que estais nos céus, santificado seja o vosso nome..." },
  { livro: "joao", nome: "João", capitulo: 20, vi: 19, vf: 31, titulo: "Aparição aos Apóstolos", texto: "Naquele mesmo dia, o primeiro da semana, Jesus apareceu aos discípulos..." },
  { livro: "marcos", nome: "Marcos", capitulo: 10, vi: 17, vf: 31, titulo: "O Jovem Rico", texto: "‘Mestre bom, que farei para herdar a vida eterna?’" },
  { livro: "lucas", nome: "Lucas", capitulo: 1, vi: 26, vf: 38, titulo: "A Anunciação", texto: "‘Eis a serva do Senhor; faça-se em mim segundo a tua palavra.’" },
  { livro: "joao", nome: "João", capitulo: 11, vi: 1, vf: 44, titulo: "A Ressurreição de Lázaro", texto: "‘Eu sou a ressurreição e a vida. Quem crê em mim, ainda que esteja morto, viverá.’" },
];

// Lista compacta de santos do dia (rotação cíclica). Cada item leva o nome,
// a memória litúrgica e um resumo de uma linha.
const SANTOS_DIA: SantoDia[] = [
  { nome: "Santa Teresa de Ávila", data: "15 de outubro", resumo: "Doutora da Igreja, reformadora do Carmelo, mestra da oração contemplativa." },
  { nome: "São Francisco de Assis", data: "4 de outubro", resumo: "Pobrezinho de Assis, fundador dos Franciscanos, alter Christus." },
  { nome: "Santo Agostinho", data: "28 de agosto", resumo: "Bispo de Hipona, doutor da graça, autor das Confissões." },
  { nome: "São Tomás de Aquino", data: "28 de janeiro", resumo: "Doutor Angélico, autor da Suma Teológica, mestre da escolástica." },
  { nome: "Santa Teresinha do Menino Jesus", data: "1º de outubro", resumo: "Doutora da Igreja, mestra do ‘pequeno caminho’ de confiança." },
  { nome: "São João Paulo II", data: "22 de outubro", resumo: "Papa polonês, ‘o Magno’, peregrino apostólico do século XX." },
  { nome: "Santa Faustina Kowalska", data: "5 de outubro", resumo: "Apóstola da Divina Misericórdia, mística polonesa." },
  { nome: "Santo Antônio de Pádua", data: "13 de junho", resumo: "Doutor Evangélico, franciscano, padroeiro dos pobres e dos objetos perdidos." },
  { nome: "São Pio de Pietrelcina", data: "23 de setembro", resumo: "Capuchinho, estigmatizado, confessor e místico do séc. XX." },
  { nome: "Santa Catarina de Sena", data: "29 de abril", resumo: "Doutora da Igreja, mística dominicana, conselheira de papas." },
  { nome: "Santo Inácio de Loyola", data: "31 de julho", resumo: "Fundador da Companhia de Jesus, autor dos Exercícios Espirituais." },
  { nome: "Santa Mônica", data: "27 de agosto", resumo: "Mãe de Santo Agostinho, modelo de oração perseverante." },
  { nome: "São Jerônimo", data: "30 de setembro", resumo: "Tradutor da Vulgata, doutor máximo nas Escrituras." },
  { nome: "São Bento de Núrsia", data: "11 de julho", resumo: "Patriarca dos monges do Ocidente, padroeiro da Europa." },
  { nome: "Santa Maria Madalena", data: "22 de julho", resumo: "Primeira testemunha da Ressurreição, ‘apóstola dos apóstolos’." },
  { nome: "São Pedro", data: "29 de junho", resumo: "Príncipe dos Apóstolos, primeiro Papa, mártir em Roma." },
  { nome: "São Paulo", data: "29 de junho", resumo: "Apóstolo dos gentios, autor de treze epístolas." },
  { nome: "São José", data: "19 de março", resumo: "Esposo de Maria, pai virginal de Jesus, padroeiro da Igreja universal." },
  { nome: "São João Batista", data: "24 de junho", resumo: "Precursor do Messias, batizou Cristo no Jordão." },
  { nome: "São Lourenço", data: "10 de agosto", resumo: "Diácono romano, mártir queimado na grelha." },
  { nome: "Santa Cecília", data: "22 de novembro", resumo: "Virgem e mártir romana, padroeira dos músicos." },
  { nome: "Santa Luzia", data: "13 de dezembro", resumo: "Virgem e mártir de Siracusa, padroeira dos olhos." },
  { nome: "São Maximiliano Kolbe", data: "14 de agosto", resumo: "Franciscano polonês, mártir da caridade em Auschwitz." },
  { nome: "Santa Edith Stein", data: "9 de agosto", resumo: "Carmelita, filósofa, mártir em Auschwitz, copadroeira da Europa." },
  { nome: "Madre Teresa de Calcutá", data: "5 de setembro", resumo: "Fundadora das Missionárias da Caridade, apóstola dos mais pobres." },
  { nome: "São Carlos Borromeu", data: "4 de novembro", resumo: "Cardeal arcebispo de Milão, reformador tridentino." },
  { nome: "São Vicente de Paulo", data: "27 de setembro", resumo: "Apóstolo da caridade, fundador dos Lazaristas." },
  { nome: "Santa Joana d’Arc", data: "30 de maio", resumo: "Virgem guerreira, libertadora da França, mártir aos 19 anos." },
  { nome: "São Domingos de Gusmão", data: "8 de agosto", resumo: "Fundador da Ordem dos Pregadores, apóstolo do Rosário." },
  { nome: "Santo Estêvão", data: "26 de dezembro", resumo: "Protomártir cristão, primeiro dos sete diáconos." },
  { nome: "São João Crisóstomo", data: "13 de setembro", resumo: "Patriarca de Constantinopla, ‘boca de ouro’, mestre da pregação." },
];

export function versoDoDia(d: Date = new Date()): VersiculoDia {
  return VERSICULOS[(dayOfYear(d) - 1 + VERSICULOS.length * 1000) % VERSICULOS.length];
}
export function evangelhoDoDia(d: Date = new Date()): EvangelhoDia {
  return EVANGELHOS[(dayOfYear(d) - 1 + EVANGELHOS.length * 1000) % EVANGELHOS.length];
}
export function santoDoDia(d: Date = new Date()): SantoDia {
  return SANTOS_DIA[(dayOfYear(d) - 1 + SANTOS_DIA.length * 1000) % SANTOS_DIA.length];
}

export function leituraComoRef(l: Leitura): ItemRef {
  return { livro: l.livro, nome: l.nome, capitulo: l.capitulo, vi: l.vi, vf: l.vf };
}

export { PLANO };
