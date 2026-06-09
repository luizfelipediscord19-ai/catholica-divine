export type Hora = {
  slug: string;
  nome: string;
  horario: string;
  descricao: string;
  estrutura: string[];
};

export const HORAS: Hora[] = [
  {
    slug: "oficio-leituras",
    nome: "Ofício das Leituras",
    horario: "Em qualquer hora do dia (tradicionalmente à noite)",
    descricao:
      "A 'vigília' da Igreja: longas leituras bíblicas e patrísticas que alimentam a meditação e a lectio divina.",
    estrutura: ["Invitatório", "Hino", "Salmodia (3 salmos)", "Leitura bíblica longa", "Leitura patrística ou hagiográfica", "Oração conclusiva"],
  },
  {
    slug: "laudes",
    nome: "Laudes — Oração da Manhã",
    horario: "Ao amanhecer",
    descricao:
      "Consagra ao Senhor o primeiro movimento do espírito e do coração. Hora maior junto com as Vésperas.",
    estrutura: ["Invitatório", "Hino", "Salmodia (salmo + cântico AT + salmo de louvor)", "Leitura breve", "Responsório", "Cântico de Zacarias (Benedictus)", "Preces", "Pai-Nosso", "Oração e bênção"],
  },
  {
    slug: "intermedia",
    nome: "Hora Intermédia — Tércia, Sexta, Noa",
    horario: "9h, 12h e 15h",
    descricao:
      "Pequenas pausas orantes que santificam o trabalho do dia, recordando a descida do Espírito (Tércia), a crucifixão (Sexta) e a morte do Senhor (Noa).",
    estrutura: ["Hino", "Salmodia (3 salmos breves)", "Leitura breve", "Versículo", "Oração conclusiva"],
  },
  {
    slug: "vesperas",
    nome: "Vésperas — Oração da Tarde",
    horario: "Ao entardecer",
    descricao:
      "Ação de graças pelo dia, oferecendo a Cristo, sol que não conhece ocaso, o sacrifício vespertino.",
    estrutura: ["Hino", "Salmodia (2 salmos + cântico NT)", "Leitura breve", "Responsório", "Cântico de Maria (Magnificat)", "Preces", "Pai-Nosso", "Oração e bênção"],
  },
  {
    slug: "completas",
    nome: "Completas — Antes do Repouso",
    horario: "Antes de dormir",
    descricao:
      "Exame de consciência, salmos de confiança e o cântico de Simeão. Termina com a antífona mariana da estação.",
    estrutura: ["Exame de consciência", "Hino", "Salmodia (1 ou 2 salmos)", "Leitura breve", "Cântico de Simeão (Nunc dimittis)", "Oração", "Bênção da noite", "Antífona mariana"],
  },
];

export const FONTES_OFICIAIS = [
  { nome: "Liturgia das Horas — CNBB / Paulinas", url: "https://www.paulinas.com.br" },
  { nome: "Liturgia das Horas online (iBreviary)", url: "https://www.ibreviary.org/pt/" },
  { nome: "Liturgia diária (Vatican News)", url: "https://www.vaticannews.va/pt/igreja/news/liturgia-do-dia.html" },
];
