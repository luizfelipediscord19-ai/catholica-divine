import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Award,
  BookOpen,
  Bookmark,
  Clock,
  Crown,
  Flame,
  Gem,
  Heart,
  Library,
  MessageCircle,
  Moon,
  Mountain,
  Music,
  PenLine,
  Scroll,
  Sparkles,
  Sun,
  Sunrise,
  Users,
  type LucideIcon,
} from "lucide-react";


import { notificar } from "@/lib/notificacoes";

/* -------------------------------------------------------------------------- */
/*  Tipos                                                                     */
/* -------------------------------------------------------------------------- */

type Evento =
  | { tipo: "conquista"; slug: string }
  | { tipo: "nivel"; nivel: number };

type Desenho = {
  /** Estilo visual único de cada celebração. */
  variante:
    | "selo"
    | "vitral"
    | "chama"
    | "pergaminho"
    | "coroa"
    | "aurora"
    | "relicario"
    | "livro"
    | "agora"
    | "montanha"
    | "joia";
  faixa: string;
  titulo: string;
  frase: string;
  citacao?: string;
  Icone: LucideIcon;
  /** Cor de destaque (tokens semânticos do tema). */
  aro: string;
  brilho: string;
  texto: string;
  fundo: string;
};

/* -------------------------------------------------------------------------- */
/*  Registro: cada conquista tem um visual próprio                            */
/* -------------------------------------------------------------------------- */

const CONQUISTAS: Record<string, Desenho> = {
  "primeira-oracao": {
    variante: "selo",
    faixa: "Primeira conquista",
    titulo: "Primeiro Amém",
    frase: "Sua primeira oração está registrada no diário. O caminho começa no silêncio.",
    citacao: "“Senhor, ensina-nos a rezar.” — Lc 11,1",
    Icone: Sparkles,
    aro: "border-gold/50",
    brilho: "from-gold/25",
    texto: "text-gold",
    fundo: "bg-card",
  },
  "streak-3": {
    variante: "chama",
    faixa: "Sequência de 3 dias",
    titulo: "Perseverança",
    frase: "Três dias seguidos de oração. A pequena chama já resiste ao vento.",
    citacao: "“Orai sem cessar.” — 1Ts 5,17",
    Icone: Flame,
    aro: "border-destructive/40",
    brilho: "from-destructive/25",
    texto: "text-destructive-text",
    fundo: "bg-card",
  },
  "streak-7": {
    variante: "vitral",
    faixa: "Sequência de 7 dias",
    titulo: "Semana Santa",
    frase: "Sete dias de fidelidade — uma semana inteira entregue a Deus.",
    citacao: "“No sétimo dia, Deus descansou.” — Gn 2,2",
    Icone: Sun,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold-soft",
    fundo: "bg-card",
  },
  "streak-30": {
    variante: "coroa",
    faixa: "Sequência de 30 dias",
    titulo: "Mês de Graça",
    frase: "Um mês inteiro de oração diária. A virtude já se tornou hábito.",
    citacao: "“Sê fiel até a morte.” — Ap 2,10",
    Icone: Crown,
    aro: "border-gold/60",
    brilho: "from-gold/30",
    texto: "text-gold",
    fundo: "bg-card",
  },
  "streak-100": {
    variante: "aurora",
    faixa: "Sequência de 100 dias",
    titulo: "Centúria Orante",
    frase: "Cem dias sem interromper a oração. Poucos chegam aqui.",
    citacao: "“Corri o bom combate.” — 2Tm 4,7",
    Icone: Award,
    aro: "border-gold-accent/60",
    brilho: "from-gold-accent/30",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
  "primeiro-capitulo": {
    variante: "livro",
    faixa: "Leitura bíblica",
    titulo: "Primeira Página",
    frase: "Você abriu a Escritura e leu seu primeiro capítulo por inteiro.",
    citacao: "“Tua palavra é lâmpada para os meus passos.” — Sl 119,105",
    Icone: BookOpen,
    aro: "border-primary/40",
    brilho: "from-primary/20",
    texto: "text-primary",
    fundo: "bg-card",
  },
  "dez-capitulos": {
    variante: "pergaminho",
    faixa: "Dez capítulos",
    titulo: "Leitor Assíduo",
    frase: "Dez capítulos lidos. A Palavra já habita sua rotina.",
    citacao: "“Recebei a palavra com toda a avidez.” — At 17,11",
    Icone: Scroll,
    aro: "border-muted-foreground/40",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },
  "evangelho-completo": {
    variante: "montanha",
    faixa: "Evangelho concluído",
    titulo: "Evangelizado",
    frase: "Você percorreu um Evangelho do começo ao fim.",
    citacao: "“Ide e ensinai todas as nações.” — Mt 28,19",
    Icone: Mountain,
    aro: "border-accent/50",
    brilho: "from-accent/25",
    texto: "text-accent-foreground",
    fundo: "bg-card",
  },
  "primeiro-favorito": {
    variante: "relicario",
    faixa: "Versículo guardado",
    titulo: "Palavra Guardada",
    frase: "Você guardou seu primeiro versículo, como Maria guardava tudo no coração.",
    citacao: "“Maria conservava tudo em seu coração.” — Lc 2,51",
    Icone: Heart,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold-soft",
    fundo: "bg-card",
  },
  "primeira-nota": {
    variante: "pergaminho",
    faixa: "Modo estudo",
    titulo: "Escriba",
    frase: "Sua primeira anotação foi escrita — a fé pensada se aprofunda.",
    citacao: "“Escreve a visão numa tábua.” — Hab 2,2",
    Icone: PenLine,
    aro: "border-border",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },
  "primeiro-topico": {
    variante: "agora",
    faixa: "Ágora Ecclesiae",
    titulo: "Voz na Ágora",
    frase: "Você abriu seu primeiro tópico e levou sua pergunta à comunidade.",
    citacao: "“Onde dois ou três estiverem reunidos…” — Mt 18,20",
    Icone: MessageCircle,
    aro: "border-primary/40",
    brilho: "from-primary/20",
    texto: "text-primary",
    fundo: "bg-card",
  },
  "dez-respostas": {
    variante: "joia",
    faixa: "Dez respostas",
    titulo: "Irmão Solícito",
    frase: "Dez vezes você ajudou alguém no fórum. A caridade é a maior virtude.",
    citacao: "“Levai as cargas uns dos outros.” — Gl 6,2",
    Icone: Users,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold",
    fundo: "bg-card",
  },

  /* --- Oração ------------------------------------------------------------ */
  "streak-14": {
    variante: "chama",
    faixa: "Sequência de 14 dias",
    titulo: "Quinzena Fiel",
    frase: "Duas semanas seguidas de oração. A chama já aquece a casa toda.",
    citacao: "“Vigiai e orai.” — Mc 14,38",
    Icone: Flame,
    aro: "border-destructive/40",
    brilho: "from-destructive/20",
    texto: "text-destructive-text",
    fundo: "bg-card",
  },
  "streak-60": {
    variante: "montanha",
    faixa: "Sequência de 60 dias",
    titulo: "Dois Meses de Fogo",
    frase: "Sessenta dias de oração — a subida já é firme e constante.",
    citacao: "“Subamos ao monte do Senhor.” — Is 2,3",
    Icone: Mountain,
    aro: "border-accent/50",
    brilho: "from-accent/25",
    texto: "text-accent-foreground",
    fundo: "bg-card",
  },
  "streak-365": {
    variante: "aurora",
    faixa: "Um ano inteiro",
    titulo: "Ano Litúrgico",
    frase: "Trezentos e sessenta e cinco dias de oração. Um ano oferecido a Deus.",
    citacao: "“Bendize, ó minha alma, ao Senhor.” — Sl 103,1",
    Icone: Crown,
    aro: "border-gold-accent/60",
    brilho: "from-gold-accent/30",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
  "oracoes-10": {
    variante: "selo",
    faixa: "Dez dias de oração",
    titulo: "Dez Amém",
    frase: "Dez dias registrados no diário espiritual.",
    citacao: "“Perseverai na oração.” — Cl 4,2",
    Icone: Sparkles,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold",
    fundo: "bg-card",
  },
  "oracoes-50": {
    variante: "vitral",
    faixa: "Cinquenta dias de oração",
    titulo: "Alma Orante",
    frase: "Cinquenta encontros com Deus guardados no seu diário.",
    citacao: "“Minha alma tem sede de Deus.” — Sl 42,3",
    Icone: Sun,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold-soft",
    fundo: "bg-card",
  },
  "oracoes-100": {
    variante: "coroa",
    faixa: "Cem dias de oração",
    titulo: "Cem Colóquios",
    frase: "Cem dias de conversa com Deus. A amizade já é antiga.",
    citacao: "“Eu vos chamei amigos.” — Jo 15,15",
    Icone: Award,
    aro: "border-gold/60",
    brilho: "from-gold/30",
    texto: "text-gold",
    fundo: "bg-card",
  },
  "oracao-30min": {
    variante: "relicario",
    faixa: "Trinta minutos",
    titulo: "Meia Hora com Deus",
    frase: "Meia hora inteira dedicada apenas à oração.",
    citacao: "“Não pudestes vigiar uma hora comigo?” — Mt 26,40",
    Icone: Clock,
    aro: "border-primary/40",
    brilho: "from-primary/20",
    texto: "text-primary",
    fundo: "bg-card",
  },
  vigilia: {
    variante: "aurora",
    faixa: "Vigília",
    titulo: "Vigília",
    frase: "Uma hora ou mais em oração — como no Getsêmani.",
    citacao: "“À meia-noite eu me levanto para te louvar.” — Sl 119,62",
    Icone: Moon,
    aro: "border-primary/50",
    brilho: "from-primary/25",
    texto: "text-primary",
    fundo: "bg-card",
  },
  "reflexao-profunda": {
    variante: "pergaminho",
    faixa: "Diário espiritual",
    titulo: "Coração Aberto",
    frase: "Você escreveu uma reflexão longa e sincera diante de Deus.",
    citacao: "“Derramo minha alma diante do Senhor.” — 1Sm 1,15",
    Icone: PenLine,
    aro: "border-border",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },

  /* --- Leitura bíblica --------------------------------------------------- */
  "capitulos-25": {
    variante: "livro",
    faixa: "Vinte e cinco capítulos",
    titulo: "Peregrino da Palavra",
    frase: "Vinte e cinco capítulos lidos. O caminho já tem paisagem.",
    citacao: "“Como é doce ao meu paladar a tua palavra.” — Sl 119,103",
    Icone: BookOpen,
    aro: "border-primary/40",
    brilho: "from-primary/20",
    texto: "text-primary",
    fundo: "bg-card",
  },
  "capitulos-50": {
    variante: "pergaminho",
    faixa: "Cinquenta capítulos",
    titulo: "Cinquenta Colunas",
    frase: "Cinquenta capítulos da Escritura já passaram por seus olhos.",
    citacao: "“Escrutinai as Escrituras.” — Jo 5,39",
    Icone: Scroll,
    aro: "border-muted-foreground/40",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },
  "capitulos-100": {
    variante: "vitral",
    faixa: "Cem capítulos",
    titulo: "Centúria Bíblica",
    frase: "Cem capítulos lidos. A Palavra já mora em você.",
    citacao: "“A palavra de Cristo habite em vós.” — Cl 3,16",
    Icone: Sunrise,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold-soft",
    fundo: "bg-card",
  },
  "capitulos-250": {
    variante: "joia",
    faixa: "Duzentos e cinquenta capítulos",
    titulo: "Biblioteca Viva",
    frase: "Duzentos e cinquenta capítulos: você se tornou leitor das Escrituras.",
    citacao: "“Toda a Escritura é inspirada por Deus.” — 2Tm 3,16",
    Icone: Library,
    aro: "border-gold-accent/50",
    brilho: "from-gold-accent/25",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
  "livro-completo": {
    variante: "livro",
    faixa: "Livro concluído",
    titulo: "Livro Concluído",
    frase: "Você terminou um livro bíblico do primeiro ao último capítulo.",
    citacao: "“Está consumado.” — Jo 19,30",
    Icone: BookOpen,
    aro: "border-primary/50",
    brilho: "from-primary/25",
    texto: "text-primary",
    fundo: "bg-card",
  },
  "cinco-livros": {
    variante: "pergaminho",
    faixa: "Cinco livros",
    titulo: "Cinco Livros",
    frase: "Cinco livros bíblicos concluídos por inteiro.",
    citacao: "“Bem-aventurados os que ouvem a palavra.” — Lc 11,28",
    Icone: Scroll,
    aro: "border-muted-foreground/40",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },
  pentateuco: {
    variante: "montanha",
    faixa: "Pentateuco",
    titulo: "Torá Percorrida",
    frase: "Os cinco livros da Lei foram lidos até o fim.",
    citacao: "“Na tua lei medito dia e noite.” — Sl 1,2",
    Icone: Mountain,
    aro: "border-accent/50",
    brilho: "from-accent/25",
    texto: "text-accent-foreground",
    fundo: "bg-card",
  },
  "quatro-evangelhos": {
    variante: "aurora",
    faixa: "Os quatro Evangelhos",
    titulo: "Os Quatro Evangelhos",
    frase: "Mateus, Marcos, Lucas e João: os quatro rostos do Evangelho, completos.",
    citacao: "“No princípio era o Verbo.” — Jo 1,1",
    Icone: Sun,
    aro: "border-gold-accent/60",
    brilho: "from-gold-accent/30",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
  salterio: {
    variante: "vitral",
    faixa: "Salmos",
    titulo: "Saltério",
    frase: "Os cento e cinquenta salmos foram percorridos por você.",
    citacao: "“Louvai o Senhor com a cítara.” — Sl 150,3",
    Icone: Music,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold-soft",
    fundo: "bg-card",
  },
  "novo-testamento": {
    variante: "coroa",
    faixa: "Novo Testamento",
    titulo: "Novo Testamento",
    frase: "Todo o Novo Testamento lido. Uma obra de fé e de fidelidade.",
    citacao: "“Guardei a fé.” — 2Tm 4,7",
    Icone: Crown,
    aro: "border-gold/60",
    brilho: "from-gold/30",
    texto: "text-gold",
    fundo: "bg-card",
  },

  /* --- Favoritos e estudo ------------------------------------------------ */
  "favoritos-10": {
    variante: "relicario",
    faixa: "Dez versículos",
    titulo: "Tesouro de Versículos",
    frase: "Dez versículos guardados no seu relicário pessoal.",
    citacao: "“Onde está teu tesouro, aí está teu coração.” — Mt 6,21",
    Icone: Bookmark,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold-soft",
    fundo: "bg-card",
  },
  "favoritos-50": {
    variante: "joia",
    faixa: "Cinquenta versículos",
    titulo: "Antologia Sagrada",
    frase: "Cinquenta versículos escolhidos formam a sua antologia.",
    citacao: "“Tuas palavras são minha herança.” — Sl 119,111",
    Icone: Gem,
    aro: "border-gold-accent/50",
    brilho: "from-gold-accent/25",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
  "notas-5": {
    variante: "pergaminho",
    faixa: "Cinco anotações",
    titulo: "Estudioso",
    frase: "Cinco anotações de estudo escritas com atenção.",
    citacao: "“Adquire a sabedoria.” — Pr 4,5",
    Icone: PenLine,
    aro: "border-border",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },
  "notas-25": {
    variante: "livro",
    faixa: "Vinte e cinco anotações",
    titulo: "Mestre de Estudo",
    frase: "Vinte e cinco anotações: seu caderno já é um comentário próprio.",
    citacao: "“Todo escriba do Reino tira coisas novas e velhas.” — Mt 13,52",
    Icone: Library,
    aro: "border-primary/40",
    brilho: "from-primary/20",
    texto: "text-primary",
    fundo: "bg-card",
  },

  /* --- Fórum e caminho --------------------------------------------------- */
  "primeira-resposta": {
    variante: "agora",
    faixa: "Ágora Ecclesiae",
    titulo: "Mão Estendida",
    frase: "Sua primeira resposta ajudou um irmão na comunidade.",
    citacao: "“Consolai-vos uns aos outros.” — 1Ts 4,18",
    Icone: MessageCircle,
    aro: "border-primary/40",
    brilho: "from-primary/20",
    texto: "text-primary",
    fundo: "bg-card",
  },
  "cinco-topicos": {
    variante: "agora",
    faixa: "Cinco tópicos",
    titulo: "Semeador de Perguntas",
    frase: "Cinco conversas nasceram das suas perguntas.",
    citacao: "“Pedi e vos será dado.” — Mt 7,7",
    Icone: MessageCircle,
    aro: "border-accent/50",
    brilho: "from-accent/25",
    texto: "text-accent-foreground",
    fundo: "bg-card",
  },
  "cinquenta-respostas": {
    variante: "joia",
    faixa: "Cinquenta respostas",
    titulo: "Coração Fraterno",
    frase: "Cinquenta vezes você serviu a comunidade com sua palavra.",
    citacao: "“A caridade é o vínculo da perfeição.” — Cl 3,14",
    Icone: Users,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold",
    fundo: "bg-card",
  },
  "santo-padroeiro": {
    variante: "relicario",
    faixa: "Padroeiro",
    titulo: "Padroeiro Escolhido",
    frase: "Você escolheu um santo para caminhar ao seu lado e intercedar por você.",
    citacao: "“Rodeados por tão grande nuvem de testemunhas.” — Hb 12,1",
    Icone: Heart,
    aro: "border-gold/50",
    brilho: "from-gold/25",
    texto: "text-gold",
    fundo: "bg-card",
  },
  "caminho-completo": {
    variante: "selo",
    faixa: "Caminho integral",
    titulo: "Caminho Integral",
    frase: "Oração, Escritura, versículos guardados e estudo: o caminho inteiro em ação.",
    citacao: "“Perseveravam na doutrina, na comunhão e nas orações.” — At 2,42",
    Icone: Award,
    aro: "border-gold-accent/60",
    brilho: "from-gold-accent/30",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
};


function desenhoDaConquista(slug: string): Desenho {
  return (
    CONQUISTAS[slug] ?? {
      variante: "selo",
      faixa: "Nova conquista",
      titulo: slug.replace(/-/g, " "),
      frase: "Uma nova conquista foi desbloqueada no seu caminho espiritual.",
      Icone: Sparkles,
      aro: "border-gold/40",
      brilho: "from-gold/20",
      texto: "text-gold",
      fundo: "bg-card",
    }
  );
}

/* -------------------------------------------------------------------------- */
/*  Marcos de nível (de 10 em 10) — cada um com visual próprio                 */
/* -------------------------------------------------------------------------- */

const MARCOS: Record<number, Desenho> = {
  10: {
    variante: "selo",
    faixa: "Nível 10",
    titulo: "Catecúmeno",
    frase: "Dez níveis de caminhada. Você já não é um visitante: é um discípulo em formação.",
    citacao: "“Vinde e vede.” — Jo 1,39",
    Icone: Sparkles,
    aro: "border-gold/40",
    brilho: "from-gold/20",
    texto: "text-gold",
    fundo: "bg-card",
  },
  20: {
    variante: "vitral",
    faixa: "Nível 20",
    titulo: "Peregrino",
    frase: "Vinte níveis. A estrada já é longa e seus passos, firmes.",
    citacao: "“Felizes os que em ti encontram força.” — Sl 84,6",
    Icone: Sun,
    aro: "border-primary/40",
    brilho: "from-primary/25",
    texto: "text-primary",
    fundo: "bg-card",
  },
  30: {
    variante: "chama",
    faixa: "Nível 30",
    titulo: "Orante",
    frase: "Trinta níveis de fidelidade. A oração se tornou respiração.",
    citacao: "“O meu coração e a minha carne exultam.” — Sl 84,3",
    Icone: Flame,
    aro: "border-destructive/40",
    brilho: "from-destructive/25",
    texto: "text-destructive-text",
    fundo: "bg-card",
  },
  40: {
    variante: "montanha",
    faixa: "Nível 40",
    titulo: "Deserto Vencido",
    frase: "Quarenta — número bíblico da provação atravessada.",
    citacao: "“Quarenta dias e quarenta noites.” — Mt 4,2",
    Icone: Mountain,
    aro: "border-muted-foreground/40",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },
  50: {
    variante: "aurora",
    faixa: "Nível 50",
    titulo: "Pentecostal",
    frase: "Cinquenta níveis. Que o Espírito continue soprando sobre seu estudo.",
    citacao: "“Recebei o Espírito Santo.” — Jo 20,22",
    Icone: Award,
    aro: "border-gold-accent/50",
    brilho: "from-gold-accent/30",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
  60: {
    variante: "pergaminho",
    faixa: "Nível 60",
    titulo: "Estudioso da Palavra",
    frase: "Sessenta níveis construídos com leitura, anotação e silêncio.",
    citacao: "“Escrutinai as Escrituras.” — Jo 5,39",
    Icone: Scroll,
    aro: "border-border",
    brilho: "from-muted/40",
    texto: "text-foreground",
    fundo: "bg-card",
  },
  70: {
    variante: "agora",
    faixa: "Nível 70",
    titulo: "Discípulo Enviado",
    frase: "Setenta — como os discípulos enviados dois a dois.",
    citacao: "“Designou outros setenta e dois.” — Lc 10,1",
    Icone: Users,
    aro: "border-primary/50",
    brilho: "from-primary/25",
    texto: "text-primary",
    fundo: "bg-card",
  },
  80: {
    variante: "relicario",
    faixa: "Nível 80",
    titulo: "Guardião da Tradição",
    frase: "Oitenta níveis. Você guarda e transmite o que recebeu.",
    citacao: "“Conserva o depósito da fé.” — 1Tm 6,20",
    Icone: Bookmark,
    aro: "border-gold/50",
    brilho: "from-gold/25",
    texto: "text-gold-soft",
    fundo: "bg-card",
  },
  90: {
    variante: "joia",
    faixa: "Nível 90",
    titulo: "Pérola Preciosa",
    frase: "Noventa níveis: você vendeu tudo pela pérola de grande valor.",
    citacao: "“Vendeu tudo e comprou aquela pérola.” — Mt 13,46",
    Icone: Gem,
    aro: "border-gold-accent/50",
    brilho: "from-gold-accent/25",
    texto: "text-gold-accent",
    fundo: "bg-card",
  },
  100: {
    variante: "coroa",
    faixa: "Nível 100",
    titulo: "Coroa da Perseverança",
    frase: "Cem níveis. Uma vida de estudo e oração diante de Deus.",
    citacao: "“Receberás a coroa da vida.” — Ap 2,10",
    Icone: Crown,
    aro: "border-gold/60",
    brilho: "from-gold/35",
    texto: "text-gold",
    fundo: "bg-card",
  },
};

function desenhoDoNivel(nivel: number): Desenho {
  const marco = MARCOS[nivel];
  if (marco) return marco;
  return {
    ...MARCOS[100]!,
    faixa: `Nível ${nivel}`,
    titulo: "Fidelidade Contínua",
    frase: `Você alcançou o nível ${nivel}. Deus mede o caminho pela constância, não pela pressa.`,
  };
}

/* -------------------------------------------------------------------------- */
/*  Contexto                                                                  */
/* -------------------------------------------------------------------------- */

type Api = {
  celebrarConquistas: (slugs: string[] | undefined | null) => void;
  celebrarNivel: (nivel: number | undefined | null) => void;
};

const Ctx = createContext<Api | null>(null);

const CHAVE_NIVEL = "portal-catolico:nivel-celebrado";
const CHAVE_CONQUISTAS = "portal-catolico:conquistas-celebradas";

function lerLista(chave: string): string[] {
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as string[]) : [];
  } catch {
    return [];
  }
}

/** Modais de parabenização por conquista e por marco de nível (de 10 em 10). */
export function CelebracaoProvider({ children }: { children: ReactNode }) {
  const [fila, setFila] = useState<Evento[]>([]);
  const vistas = useRef<Set<string>>(new Set());

  useEffect(() => {
    lerLista(CHAVE_CONQUISTAS).forEach((s) => vistas.current.add(s));
  }, []);

  const celebrarConquistas = useCallback((slugs: string[] | undefined | null) => {
    const novos = (slugs ?? []).filter((s) => s && !vistas.current.has(s));
    if (novos.length === 0) return;
    novos.forEach((s) => vistas.current.add(s));
    try {
      window.localStorage.setItem(
        CHAVE_CONQUISTAS,
        JSON.stringify([...vistas.current].slice(-100)),
      );
    } catch {
      /* navegação privada */
    }
    novos.forEach((slug) => {
      const d = desenhoDaConquista(slug);
      notificar({
        tipo: "conquista",
        titulo: `Conquista: ${d.titulo}`,
        mensagem: d.frase,
        href: "/painel",
        chave: `conquista:${slug}`,
      });
    });
    setFila((f) => [...f, ...novos.map((slug) => ({ tipo: "conquista" as const, slug }))]);
  }, []);

  const celebrarNivel = useCallback((nivel: number | undefined | null) => {
    if (!nivel || nivel < 10) return;
    let anterior = 0;
    try {
      anterior = Number(window.localStorage.getItem(CHAVE_NIVEL) ?? 0) || 0;
    } catch {
      anterior = 0;
    }
    if (nivel <= anterior) return;
    // Marcos de 10 em 10 ainda não celebrados.
    const marcos: number[] = [];
    for (let n = Math.floor(anterior / 10) * 10 + 10; n <= nivel; n += 10) marcos.push(n);
    try {
      window.localStorage.setItem(CHAVE_NIVEL, String(nivel));
    } catch {
      /* navegação privada */
    }
    if (marcos.length === 0) return;
    marcos.forEach((n) =>
      notificar({
        tipo: "nivel",
        titulo: `Nível ${n} alcançado`,
        mensagem: "Sua perseverança na fé foi registrada no painel espiritual.",
        href: "/painel",
        chave: `nivel:${n}`,
      }),
    );
    setFila((f) => [...f, ...marcos.map((n) => ({ tipo: "nivel" as const, nivel: n }))]);
  }, []);

  const api = useMemo(() => ({ celebrarConquistas, celebrarNivel }), [
    celebrarConquistas,
    celebrarNivel,
  ]);

  // Auxílio de desenvolvimento: permite pré-visualizar cada modal no preview.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    (window as unknown as Record<string, unknown>).__celebrar = {
      conquista: (slug: string) => setFila((f) => [...f, { tipo: "conquista", slug }]),
      nivel: (nivel: number) => setFila((f) => [...f, { tipo: "nivel", nivel }]),
    };
  }, []);

  const atual = fila[0] ?? null;
  const fechar = useCallback(() => setFila((f) => f.slice(1)), []);

  return (
    <Ctx.Provider value={api}>
      {children}
      {atual ? (
        <ModalCelebracao
          desenho={
            atual.tipo === "conquista"
              ? desenhoDaConquista(atual.slug)
              : desenhoDoNivel(atual.nivel)
          }
          restantes={fila.length - 1}
          onFechar={fechar}
        />
      ) : null}
    </Ctx.Provider>
  );
}

export function useCelebracao(): Api {
  const ctx = useContext(Ctx);
  return (
    ctx ?? {
      celebrarConquistas: () => {},
      celebrarNivel: () => {},
    }
  );
}

/* -------------------------------------------------------------------------- */
/*  Modal                                                                     */
/* -------------------------------------------------------------------------- */

function ModalCelebracao({
  desenho,
  restantes,
  onFechar,
}: {
  desenho: Desenho;
  restantes: number;
  onFechar: () => void;
}) {
  const { Icone } = desenho;

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [onFechar]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Parabéns: ${desenho.titulo}`}
      className="fixed inset-0 z-[200] grid place-items-center px-4 py-8 overflow-y-auto"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onFechar}
        className="absolute inset-0 bg-background/85 backdrop-blur-sm animate-in fade-in duration-300"
      />

      <div
        className={`relative w-full max-w-lg border ${desenho.aro} ${desenho.fundo} animate-in fade-in zoom-in-95 duration-500`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b ${desenho.brilho} to-transparent blur-2xl`}
          aria-hidden="true"
        />
        <Ornamento desenho={desenho} />

        <div className="relative px-8 py-10 md:px-12 md:py-12 text-center space-y-6">
          <p className={`text-[10px] uppercase tracking-[0.4em] ${desenho.texto}`}>
            {desenho.faixa}
          </p>

          <div
            className={`mx-auto grid size-20 place-items-center border ${desenho.aro} ${
              desenho.variante === "selo" || desenho.variante === "coroa"
                ? "rounded-full"
                : desenho.variante === "joia"
                  ? "rotate-45"
                  : ""
            }`}
          >
            <Icone
              className={`size-8 ${desenho.texto} ${desenho.variante === "joia" ? "-rotate-45" : ""}`}
              aria-hidden="true"
            />
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight capitalize">
            {desenho.titulo}
          </h2>
          <p className="text-sm text-foreground/80 font-light leading-relaxed max-w-md mx-auto">
            {desenho.frase}
          </p>
          {desenho.citacao ? (
            <p className={`text-xs italic ${desenho.texto} font-light`}>{desenho.citacao}</p>
          ) : null}

          <button
            type="button"
            onClick={onFechar}
            className="mx-auto inline-flex min-h-11 items-center justify-center border border-gold/40 px-8 text-[10px] uppercase tracking-[0.3em] text-foreground hover:bg-gold hover:text-deep transition-premium"
          >
            {restantes > 0 ? `Ver a próxima (${restantes})` : "Deo gratias"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Decoração exclusiva de cada variante — nenhum modal se parece com o outro. */
function Ornamento({ desenho }: { desenho: Desenho }) {
  const cor = desenho.texto;
  switch (desenho.variante) {
    case "vitral":
      return (
        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
          <div className="absolute inset-0 grid grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`border-l ${desenho.aro}`} />
            ))}
          </div>
          <div className={`absolute -top-10 left-1/2 size-40 -translate-x-1/2 rounded-full border ${desenho.aro}`} />
        </div>
      );
    case "chama":
      return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden" aria-hidden="true">
          <div className={`mx-auto size-40 -mb-28 rounded-full bg-gradient-to-t ${desenho.brilho} to-transparent blur-2xl animate-float`} />
        </div>
      );
    case "pergaminho":
      return (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className={`absolute inset-x-6 top-3 border-t ${desenho.aro}`} />
          <div className={`absolute inset-x-6 bottom-3 border-b ${desenho.aro}`} />
        </div>
      );
    case "coroa":
      return (
        <div className="pointer-events-none absolute inset-x-0 -top-3 flex justify-center gap-2" aria-hidden="true">
          {[6, 10, 14, 10, 6].map((h, i) => (
            <span key={i} className={`w-1 ${cor} bg-current`} style={{ height: h }} />
          ))}
        </div>
      );
    case "aurora":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className={`absolute -left-16 top-8 h-56 w-56 rounded-full bg-gradient-to-br ${desenho.brilho} to-transparent blur-3xl animate-float`} />
          <div className={`absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-gradient-to-tl ${desenho.brilho} to-transparent blur-3xl`} />
        </div>
      );
    case "relicario":
      return (
        <div className="pointer-events-none absolute inset-3 border border-dashed opacity-40" aria-hidden="true" />
      );
    case "livro":
      return (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-current opacity-10" aria-hidden="true" />
      );
    case "agora":
      return (
        <div className="pointer-events-none absolute inset-x-8 top-0 flex justify-between" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`h-3 w-px bg-current opacity-40 ${cor}`} />
          ))}
        </div>
      );
    case "montanha":
      return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden opacity-20" aria-hidden="true">
          <div className={`mx-auto h-24 w-24 rotate-45 border-t border-l ${desenho.aro}`} />
        </div>
      );
    case "joia":
      return (
        <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-15" aria-hidden="true">
          <div className={`size-56 rotate-45 border ${desenho.aro}`} />
        </div>
      );
    case "selo":
    default:
      return (
        <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-20" aria-hidden="true">
          <div className={`size-64 rounded-full border ${desenho.aro}`} />
          <div className={`absolute size-48 rounded-full border ${desenho.aro}`} />
        </div>
      );
  }
}
