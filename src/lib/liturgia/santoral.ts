/**
 * Santoral — celebrações de data fixa.
 *
 * Fontes: Calendário Romano Geral (Missal Romano, 3ª edição típica, 2002/2008,
 * com as inscrições posteriores até 2021) e Calendário Próprio do Brasil
 * aprovado pela CNBB (celebrações particulares para o território brasileiro).
 *
 * Graus, conforme as Normas Universais sobre o Ano Litúrgico (nn. 8-15):
 *  - solenidade  · festa  · memória (obrigatória)  · memória facultativa
 *
 * Este arquivo contém apenas celebrações de DATA FIXA. As celebrações móveis
 * (Páscoa e dependentes) são calculadas em `calendario.ts`.
 */

export type GrauCelebracao = "solenidade" | "festa" | "memoria" | "memoria-facultativa";

export type CorLiturgicaSantoral = "branco" | "vermelho" | "verde" | "roxo" | "rosa";

export type CelebracaoFixa = {
  /** mm-dd */
  data: string;
  nome: string;
  grau: GrauCelebracao;
  cor: CorLiturgicaSantoral;
  /** Slug do santo no acervo do portal, quando existir ficha. */
  slug?: string;
  /** `true` quando a celebração é própria do Brasil (CNBB). */
  brasil?: boolean;
  /** Nota breve exibida junto da celebração. */
  nota?: string;
};

export const GRAU_NOME: Record<GrauCelebracao, string> = {
  solenidade: "Solenidade",
  festa: "Festa",
  memoria: "Memória",
  "memoria-facultativa": "Memória facultativa",
};

/** Peso para desempate: quanto maior, mais importante. */
export const GRAU_PESO: Record<GrauCelebracao, number> = {
  solenidade: 4,
  festa: 3,
  memoria: 2,
  "memoria-facultativa": 1,
};

export const SANTORAL: CelebracaoFixa[] = [
  // ---------------------------------------------------------------- Janeiro
  { data: "01-01", nome: "Santa Maria, Mãe de Deus", grau: "solenidade", cor: "branco" },
  { data: "01-02", nome: "São Basílio Magno e São Gregório Nazianzeno, bispos e doutores", grau: "memoria", cor: "branco", slug: "sao-basilio-magno" },
  { data: "01-03", nome: "Santíssimo Nome de Jesus", grau: "memoria-facultativa", cor: "branco" },
  { data: "01-04", nome: "Santa Isabel Ana Seton, religiosa", grau: "memoria-facultativa", cor: "branco" },
  { data: "01-06", nome: "Epifania do Senhor", grau: "solenidade", cor: "branco", nota: "No Brasil, transferida para o domingo entre 2 e 8 de janeiro." },
  { data: "01-07", nome: "São Raimundo de Penyafort, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "01-13", nome: "Santo Hilário de Poitiers, bispo e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "01-17", nome: "Santo Antão, abade", grau: "memoria", cor: "branco" },
  { data: "01-20", nome: "São Fabiano, papa e mártir; São Sebastião, mártir", grau: "memoria-facultativa", cor: "vermelho", slug: "sao-sebastiao" },
  { data: "01-21", nome: "Santa Inês, virgem e mártir", grau: "memoria", cor: "vermelho", slug: "santa-ines" },
  { data: "01-22", nome: "São Vicente, diácono e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "01-24", nome: "São Francisco de Sales, bispo e doutor", grau: "memoria", cor: "branco", slug: "sao-francisco-de-sales" },
  { data: "01-25", nome: "Conversão de São Paulo, apóstolo", grau: "festa", cor: "branco", slug: "sao-paulo" },
  { data: "01-26", nome: "São Timóteo e São Tito, bispos", grau: "memoria", cor: "branco" },
  { data: "01-27", nome: "Santa Ângela Merici, virgem", grau: "memoria-facultativa", cor: "branco" },
  { data: "01-28", nome: "São Tomás de Aquino, presbítero e doutor", grau: "memoria", cor: "branco", slug: "santo-tomas-de-aquino" },
  { data: "01-31", nome: "São João Bosco, presbítero", grau: "memoria", cor: "branco", slug: "sao-joao-bosco" },

  // --------------------------------------------------------------- Fevereiro
  { data: "02-02", nome: "Apresentação do Senhor", grau: "festa", cor: "branco" },
  { data: "02-03", nome: "São Brás, bispo e mártir; São Oscar, bispo", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "02-05", nome: "Santa Águeda, virgem e mártir", grau: "memoria", cor: "vermelho" },
  { data: "02-06", nome: "São Paulo Miki e companheiros, mártires", grau: "memoria", cor: "vermelho" },
  { data: "02-08", nome: "São Jerônimo Emiliani; Santa Josefina Bakhita, virgem", grau: "memoria-facultativa", cor: "branco" },
  { data: "02-10", nome: "Santa Escolástica, virgem", grau: "memoria", cor: "branco" },
  { data: "02-11", nome: "Nossa Senhora de Lourdes", grau: "memoria-facultativa", cor: "branco" },
  { data: "02-14", nome: "São Cirilo, monge, e São Metódio, bispo", grau: "memoria", cor: "branco" },
  { data: "02-17", nome: "Sete Santos Fundadores dos Servitas", grau: "memoria-facultativa", cor: "branco" },
  { data: "02-21", nome: "São Pedro Damião, bispo e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "02-22", nome: "Cátedra de São Pedro, apóstolo", grau: "festa", cor: "branco", slug: "sao-pedro" },
  { data: "02-23", nome: "São Policarpo, bispo e mártir", grau: "memoria", cor: "vermelho" },

  // ------------------------------------------------------------------ Março
  { data: "03-03", nome: "Santa Catarina Drexel, virgem", grau: "memoria-facultativa", cor: "branco" },
  { data: "03-04", nome: "São Casimiro", grau: "memoria-facultativa", cor: "branco" },
  { data: "03-07", nome: "Santa Perpétua e Santa Felicidade, mártires", grau: "memoria", cor: "vermelho" },
  { data: "03-08", nome: "São João de Deus, religioso", grau: "memoria-facultativa", cor: "branco" },
  { data: "03-09", nome: "Santa Francisca Romana, religiosa", grau: "memoria-facultativa", cor: "branco" },
  { data: "03-17", nome: "São Patrício, bispo", grau: "memoria-facultativa", cor: "branco" },
  { data: "03-18", nome: "São Cirilo de Jerusalém, bispo e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "03-19", nome: "São José, esposo da Virgem Maria", grau: "solenidade", cor: "branco", slug: "sao-jose" },
  { data: "03-23", nome: "São Turíbio de Mogrovejo, bispo", grau: "memoria-facultativa", cor: "branco" },
  { data: "03-25", nome: "Anunciação do Senhor", grau: "solenidade", cor: "branco" },

  // ------------------------------------------------------------------ Abril
  { data: "04-02", nome: "São Francisco de Paula, eremita", grau: "memoria-facultativa", cor: "branco" },
  { data: "04-04", nome: "Santo Isidoro, bispo e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "04-05", nome: "São Vicente Ferrer, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "04-07", nome: "São João Batista de La Salle, presbítero", grau: "memoria", cor: "branco" },
  { data: "04-11", nome: "Santo Estanislau, bispo e mártir", grau: "memoria", cor: "vermelho" },
  { data: "04-13", nome: "São Martinho I, papa e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "04-21", nome: "Santo Anselmo, bispo e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "04-23", nome: "São Jorge, mártir; Santo Adalberto, bispo e mártir", grau: "memoria-facultativa", cor: "vermelho", slug: "sao-jorge" },
  { data: "04-24", nome: "São Fidélis de Sigmaringa, presbítero e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "04-25", nome: "São Marcos, evangelista", grau: "festa", cor: "vermelho", slug: "sao-marcos-evangelista" },
  { data: "04-28", nome: "São Pedro Chanel; São Luís Maria Grignion de Montfort", grau: "memoria-facultativa", cor: "branco" },
  { data: "04-29", nome: "Santa Catarina de Sena, virgem e doutora", grau: "memoria", cor: "branco", slug: "santa-catarina-de-sena" },
  { data: "04-30", nome: "São Pio V, papa", grau: "memoria-facultativa", cor: "branco" },

  // ------------------------------------------------------------------- Maio
  { data: "05-01", nome: "São José operário", grau: "memoria-facultativa", cor: "branco", slug: "sao-jose" },
  { data: "05-02", nome: "Santo Atanásio, bispo e doutor", grau: "memoria", cor: "branco", slug: "santo-atanasio" },
  { data: "05-03", nome: "São Filipe e São Tiago, apóstolos", grau: "festa", cor: "vermelho" },
  { data: "05-10", nome: "São João de Ávila, presbítero e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "05-12", nome: "São Nereu e São Aquileu; São Pancrácio, mártires", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "05-13", nome: "Nossa Senhora de Fátima", grau: "memoria-facultativa", cor: "branco" },
  { data: "05-14", nome: "São Matias, apóstolo", grau: "festa", cor: "vermelho" },
  { data: "05-18", nome: "São João I, papa e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "05-20", nome: "São Bernardino de Sena, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "05-21", nome: "São Cristóvão Magallanes e companheiros, mártires", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "05-22", nome: "Santa Rita de Cássia, religiosa", grau: "memoria-facultativa", cor: "branco", slug: "santa-rita-de-cassia" },
  { data: "05-25", nome: "São Beda, o Venerável; São Gregório VII; Santa Maria Madalena de Pazzi", grau: "memoria-facultativa", cor: "branco" },
  { data: "05-26", nome: "São Filipe Néri, presbítero", grau: "memoria", cor: "branco" },
  { data: "05-27", nome: "Santo Agostinho de Cantuária, bispo", grau: "memoria-facultativa", cor: "branco" },
  { data: "05-31", nome: "Visitação de Nossa Senhora", grau: "festa", cor: "branco" },

  // ------------------------------------------------------------------ Junho
  { data: "06-01", nome: "São Justino, mártir", grau: "memoria", cor: "vermelho", slug: "sao-justino" },
  { data: "06-02", nome: "São Marcelino e São Pedro, mártires", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "06-03", nome: "São Carlos Lwanga e companheiros, mártires", grau: "memoria", cor: "vermelho" },
  { data: "06-05", nome: "São Bonifácio, bispo e mártir", grau: "memoria", cor: "vermelho" },
  { data: "06-06", nome: "São Norberto, bispo", grau: "memoria-facultativa", cor: "branco" },
  { data: "06-09", nome: "Santo Efrém, diácono e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "06-11", nome: "São Barnabé, apóstolo", grau: "memoria", cor: "vermelho" },
  { data: "06-13", nome: "Santo Antônio de Pádua (de Lisboa), presbítero e doutor", grau: "memoria", cor: "branco", slug: "santo-antonio-de-padua" },
  { data: "06-19", nome: "São Romualdo, abade", grau: "memoria-facultativa", cor: "branco" },
  { data: "06-21", nome: "São Luís Gonzaga, religioso", grau: "memoria", cor: "branco", slug: "sao-luis-gonzaga" },
  { data: "06-22", nome: "São Paulino de Nola; São João Fisher e São Tomás More, mártires", grau: "memoria-facultativa", cor: "vermelho", slug: "sao-tomas-morus" },
  { data: "06-24", nome: "Natividade de São João Batista", grau: "solenidade", cor: "branco", slug: "sao-joao-batista" },
  { data: "06-27", nome: "São Cirilo de Alexandria, bispo e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "06-28", nome: "Santo Ireneu, bispo, mártir e doutor", grau: "memoria", cor: "vermelho", slug: "santo-ireneu-de-lyon" },
  { data: "06-29", nome: "São Pedro e São Paulo, apóstolos", grau: "solenidade", cor: "vermelho", slug: "sao-pedro" },
  { data: "06-30", nome: "Primeiros mártires da Igreja de Roma", grau: "memoria-facultativa", cor: "vermelho" },

  // ------------------------------------------------------------------ Julho
  { data: "07-03", nome: "São Tomé, apóstolo", grau: "festa", cor: "vermelho" },
  { data: "07-04", nome: "Santa Isabel de Portugal", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-05", nome: "São Antônio Maria Zaccaria, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-06", nome: "Santa Maria Goretti, virgem e mártir", grau: "memoria-facultativa", cor: "vermelho", slug: "santa-maria-goretti" },
  { data: "07-09", nome: "Santo Agostinho Zhao Rong e companheiros, mártires", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "07-11", nome: "São Bento, abade", grau: "memoria", cor: "branco", slug: "sao-bento-de-nursia" },
  { data: "07-13", nome: "Santo Henrique", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-14", nome: "São Camilo de Léllis, presbítero", grau: "memoria-facultativa", cor: "branco", nota: "No Brasil, memória facultativa; no calendário romano, Santa Kateri Tekakwitha." },
  { data: "07-15", nome: "São Boaventura, bispo e doutor", grau: "memoria", cor: "branco", slug: "sao-boaventura" },
  { data: "07-16", nome: "Nossa Senhora do Carmo", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-20", nome: "São Apolinário, bispo e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "07-21", nome: "São Lourenço de Brindisi, presbítero e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-22", nome: "Santa Maria Madalena", grau: "festa", cor: "branco", slug: "santa-maria-madalena" },
  { data: "07-23", nome: "Santa Brígida, religiosa", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-24", nome: "São Charbel Makhluf, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-25", nome: "São Tiago Maior, apóstolo", grau: "festa", cor: "vermelho", slug: "sao-tiago-maior" },
  { data: "07-26", nome: "São Joaquim e Sant'Ana, pais da Virgem Maria", grau: "memoria", cor: "branco", slug: "santa-ana" },
  { data: "07-29", nome: "Santa Marta, Santa Maria e São Lázaro", grau: "memoria", cor: "branco" },
  { data: "07-30", nome: "São Pedro Crisólogo, bispo e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "07-31", nome: "Santo Inácio de Loyola, presbítero", grau: "memoria", cor: "branco", slug: "santo-inacio-de-loyola" },

  // ----------------------------------------------------------------- Agosto
  { data: "08-01", nome: "Santo Afonso Maria de Ligório, bispo e doutor", grau: "memoria", cor: "branco", slug: "santo-afonso-maria-de-ligorio" },
  { data: "08-02", nome: "Santo Eusébio de Vercelli; São Pedro Julião Eymard", grau: "memoria-facultativa", cor: "branco" },
  { data: "08-04", nome: "São João Maria Vianney, presbítero", grau: "memoria", cor: "branco", slug: "sao-joao-maria-vianney" },
  { data: "08-05", nome: "Dedicação da Basílica de Santa Maria Maior", grau: "memoria-facultativa", cor: "branco" },
  { data: "08-06", nome: "Transfiguração do Senhor", grau: "festa", cor: "branco" },
  { data: "08-07", nome: "São Sisto II e companheiros; São Caetano, presbítero", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "08-08", nome: "São Domingos de Gusmão, presbítero", grau: "memoria", cor: "branco", slug: "santo-domingos-de-gusmao" },
  { data: "08-09", nome: "Santa Teresa Benedita da Cruz (Edith Stein), virgem e mártir", grau: "memoria-facultativa", cor: "vermelho", slug: "santa-edith-stein" },
  { data: "08-10", nome: "São Lourenço, diácono e mártir", grau: "festa", cor: "vermelho", slug: "sao-lourenco" },
  { data: "08-11", nome: "Santa Clara de Assis, virgem", grau: "memoria", cor: "branco", slug: "santa-clara-de-assis" },
  { data: "08-13", nome: "São Ponciano, papa, e São Hipólito, presbítero, mártires", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "08-14", nome: "São Maximiliano Maria Kolbe, presbítero e mártir", grau: "memoria", cor: "vermelho", slug: "sao-maximiliano-maria-kolbe" },
  { data: "08-15", nome: "Assunção de Nossa Senhora", grau: "solenidade", cor: "branco" },
  { data: "08-16", nome: "Santo Estêvão da Hungria", grau: "memoria-facultativa", cor: "branco" },
  { data: "08-17", nome: "Santa Beatriz da Silva, virgem", grau: "memoria-facultativa", cor: "branco" },
  { data: "08-20", nome: "São Bernardo, abade e doutor", grau: "memoria", cor: "branco", slug: "sao-bernardo-de-claraval" },
  { data: "08-21", nome: "São Pio X, papa", grau: "memoria", cor: "branco", slug: "sao-pio-x" },
  { data: "08-22", nome: "Nossa Senhora Rainha", grau: "memoria", cor: "branco" },
  { data: "08-23", nome: "Santa Rosa de Lima, virgem", grau: "memoria-facultativa", cor: "branco", slug: "santa-rosa-de-lima" },
  { data: "08-24", nome: "São Bartolomeu, apóstolo", grau: "festa", cor: "vermelho" },
  { data: "08-25", nome: "São Luís de França; São José de Calasanz, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "08-27", nome: "Santa Mônica", grau: "memoria", cor: "branco", slug: "santa-monica" },
  { data: "08-28", nome: "Santo Agostinho, bispo e doutor", grau: "memoria", cor: "branco", slug: "santo-agostinho" },
  { data: "08-29", nome: "Martírio de São João Batista", grau: "memoria", cor: "vermelho", slug: "sao-joao-batista" },

  // -------------------------------------------------------------- Setembro
  { data: "09-03", nome: "São Gregório Magno, papa e doutor", grau: "memoria", cor: "branco", slug: "sao-gregorio-magno" },
  { data: "09-05", nome: "Santa Teresa de Calcutá, religiosa", grau: "memoria-facultativa", cor: "branco", slug: "santa-madre-teresa-de-calcuta" },
  { data: "09-08", nome: "Natividade de Nossa Senhora", grau: "festa", cor: "branco" },
  { data: "09-09", nome: "São Pedro Claver, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "09-12", nome: "Santíssimo Nome de Maria", grau: "memoria-facultativa", cor: "branco" },
  { data: "09-13", nome: "São João Crisóstomo, bispo e doutor", grau: "memoria", cor: "branco", slug: "sao-joao-crisostomo" },
  { data: "09-14", nome: "Exaltação da Santa Cruz", grau: "festa", cor: "vermelho" },
  { data: "09-15", nome: "Nossa Senhora das Dores", grau: "memoria", cor: "branco" },
  { data: "09-16", nome: "São Cornélio, papa, e São Cipriano, bispo, mártires", grau: "memoria", cor: "vermelho" },
  { data: "09-17", nome: "São Roberto Belarmino, bispo e doutor; São Hildegarda de Bingen", grau: "memoria-facultativa", cor: "branco" },
  { data: "09-19", nome: "São Januário, bispo e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "09-20", nome: "Santo André Kim Taegon e companheiros, mártires", grau: "memoria", cor: "vermelho" },
  { data: "09-21", nome: "São Mateus, apóstolo e evangelista", grau: "festa", cor: "vermelho", slug: "sao-mateus" },
  { data: "09-23", nome: "São Pio de Pietrelcina, presbítero", grau: "memoria", cor: "branco", slug: "sao-padre-pio-de-pietrelcina" },
  { data: "09-26", nome: "São Cosme e São Damião, mártires", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "09-27", nome: "São Vicente de Paulo, presbítero", grau: "memoria", cor: "branco", slug: "sao-vicente-de-paulo" },
  { data: "09-29", nome: "Santos Arcanjos Miguel, Gabriel e Rafael", grau: "festa", cor: "branco", slug: "sao-miguel-arcanjo" },
  { data: "09-30", nome: "São Jerônimo, presbítero e doutor", grau: "memoria", cor: "branco", slug: "sao-jeronimo" },

  // --------------------------------------------------------------- Outubro
  { data: "10-01", nome: "Santa Teresinha do Menino Jesus, virgem e doutora", grau: "memoria", cor: "branco", slug: "santa-teresinha-do-menino-jesus" },
  { data: "10-02", nome: "Santos Anjos da Guarda", grau: "memoria", cor: "branco" },
  { data: "10-04", nome: "São Francisco de Assis", grau: "memoria", cor: "branco", slug: "sao-francisco-de-assis" },
  { data: "10-06", nome: "São Bruno, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "10-07", nome: "Nossa Senhora do Rosário", grau: "memoria", cor: "branco" },
  { data: "10-09", nome: "São Dionísio e companheiros; São João Leonardi", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "10-11", nome: "São João XXIII, papa", grau: "memoria-facultativa", cor: "branco", slug: "sao-joao-xxiii" },
  { data: "10-12", nome: "Nossa Senhora Aparecida, padroeira do Brasil", grau: "solenidade", cor: "branco", brasil: true, slug: "ns-aparecida" },
  { data: "10-14", nome: "São Calisto I, papa e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "10-15", nome: "Santa Teresa de Jesus (de Ávila), virgem e doutora", grau: "memoria", cor: "branco", slug: "santa-teresa-de-avila" },
  { data: "10-16", nome: "Santa Edwiges; Santa Margarida Maria Alacoque", grau: "memoria-facultativa", cor: "branco" },
  { data: "10-17", nome: "Santo Inácio de Antioquia, bispo e mártir", grau: "memoria", cor: "vermelho", slug: "santo-inacio-de-antioquia" },
  { data: "10-18", nome: "São Lucas, evangelista", grau: "festa", cor: "vermelho", slug: "sao-lucas-evangelista" },
  { data: "10-19", nome: "São João de Brébeuf, Santo Isaac Jogues e companheiros; São Paulo da Cruz", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "10-20", nome: "Santa Maria Bertilla Boscardin, virgem", grau: "memoria-facultativa", cor: "branco" },
  { data: "10-22", nome: "São João Paulo II, papa", grau: "memoria-facultativa", cor: "branco", slug: "sao-joao-paulo-ii" },
  { data: "10-23", nome: "São João de Capistrano, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "10-24", nome: "Santo Antônio Maria Claret, bispo", grau: "memoria-facultativa", cor: "branco" },
  { data: "10-28", nome: "São Simão e São Judas Tadeu, apóstolos", grau: "festa", cor: "vermelho", slug: "sao-judas-tadeu" },

  // -------------------------------------------------------------- Novembro
  { data: "11-01", nome: "Todos os Santos", grau: "solenidade", cor: "branco" },
  { data: "11-02", nome: "Comemoração de todos os fiéis defuntos", grau: "solenidade", cor: "roxo", nota: "Celebração própria; tem precedência sobre o domingo do Tempo Comum." },
  { data: "11-03", nome: "São Martinho de Lima (Martinho de Porres), religioso", grau: "memoria-facultativa", cor: "branco", slug: "sao-martinho-de-porres" },
  { data: "11-04", nome: "São Carlos Borromeu, bispo", grau: "memoria", cor: "branco", slug: "sao-carlos-borromeu" },
  { data: "11-09", nome: "Dedicação da Basílica de Latrão", grau: "festa", cor: "branco" },
  { data: "11-10", nome: "São Leão Magno, papa e doutor", grau: "memoria", cor: "branco", slug: "sao-leao-magno" },
  { data: "11-11", nome: "São Martinho de Tours, bispo", grau: "memoria", cor: "branco", slug: "sao-martinho-de-tours" },
  { data: "11-12", nome: "São Josafá, bispo e mártir", grau: "memoria", cor: "vermelho" },
  { data: "11-13", nome: "Santa Francisca Xavier Cabrini, virgem", grau: "memoria-facultativa", cor: "branco" },
  { data: "11-15", nome: "Santo Alberto Magno, bispo e doutor", grau: "memoria-facultativa", cor: "branco", slug: "santo-alberto-magno" },
  { data: "11-16", nome: "Santa Margarida da Escócia; Santa Gertrudes, virgem", grau: "memoria-facultativa", cor: "branco" },
  { data: "11-17", nome: "Santa Isabel da Hungria, religiosa", grau: "memoria", cor: "branco", slug: "santa-isabel-da-hungria" },
  { data: "11-18", nome: "Dedicação das Basílicas de São Pedro e São Paulo", grau: "memoria-facultativa", cor: "branco" },
  { data: "11-21", nome: "Apresentação de Nossa Senhora", grau: "memoria", cor: "branco" },
  { data: "11-22", nome: "Santa Cecília, virgem e mártir", grau: "memoria", cor: "vermelho", slug: "santa-cecilia" },
  { data: "11-23", nome: "São Clemente I, papa e mártir; São Columbano, abade", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "11-24", nome: "São André Dung-Lac e companheiros, mártires", grau: "memoria", cor: "vermelho" },
  { data: "11-25", nome: "Santa Catarina de Alexandria, virgem e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "11-30", nome: "Santo André, apóstolo", grau: "festa", cor: "vermelho", slug: "santo-andre" },

  // -------------------------------------------------------------- Dezembro
  { data: "12-03", nome: "São Francisco Xavier, presbítero", grau: "memoria", cor: "branco", slug: "sao-francisco-xavier" },
  { data: "12-04", nome: "São João Damasceno, presbítero e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "12-06", nome: "São Nicolau, bispo", grau: "memoria-facultativa", cor: "branco", slug: "sao-nicolau-de-mira" },
  { data: "12-07", nome: "Santo Ambrósio, bispo e doutor", grau: "memoria", cor: "branco", slug: "santo-ambrosio" },
  { data: "12-08", nome: "Imaculada Conceição de Nossa Senhora", grau: "solenidade", cor: "branco" },
  { data: "12-09", nome: "São João Diego Cuauhtlatoatzin", grau: "memoria-facultativa", cor: "branco" },
  { data: "12-11", nome: "São Dâmaso I, papa", grau: "memoria-facultativa", cor: "branco" },
  { data: "12-12", nome: "Nossa Senhora de Guadalupe", grau: "festa", cor: "branco", nota: "Festa nas Américas; memória facultativa no calendário romano geral." },
  { data: "12-13", nome: "Santa Luzia, virgem e mártir", grau: "memoria", cor: "vermelho", slug: "santa-luzia" },
  { data: "12-14", nome: "São João da Cruz, presbítero e doutor", grau: "memoria", cor: "branco", slug: "sao-joao-da-cruz" },
  { data: "12-21", nome: "São Pedro Canísio, presbítero e doutor", grau: "memoria-facultativa", cor: "branco" },
  { data: "12-23", nome: "São João de Kant, presbítero", grau: "memoria-facultativa", cor: "branco" },
  { data: "12-25", nome: "Natal do Senhor", grau: "solenidade", cor: "branco" },
  { data: "12-26", nome: "Santo Estêvão, primeiro mártir", grau: "festa", cor: "vermelho", slug: "sao-estevao" },
  { data: "12-27", nome: "São João, apóstolo e evangelista", grau: "festa", cor: "branco", slug: "sao-joao-evangelista" },
  { data: "12-28", nome: "Santos Inocentes, mártires", grau: "festa", cor: "vermelho" },
  { data: "12-29", nome: "São Tomás Becket, bispo e mártir", grau: "memoria-facultativa", cor: "vermelho" },
  { data: "12-31", nome: "São Silvestre I, papa", grau: "memoria-facultativa", cor: "branco" },

  // --------------------------------------------- Calendário próprio do Brasil
  { data: "01-06", nome: "Santa Paulina do Coração Agonizante de Jesus, virgem", grau: "memoria-facultativa", cor: "branco", brasil: true, slug: "santa-paulina-do-coracao-agonizante" },
  { data: "04-19", nome: "Bem-aventurado Frei Galvão — Santo Antônio de Sant'Ana Galvão, presbítero", grau: "memoria", cor: "branco", brasil: true, nota: "Primeiro santo nascido no Brasil, canonizado em 2007.", slug: "sao-frei-galvao" },
  { data: "07-17", nome: "Beatos mártires de Cunhaú e Uruaçu", grau: "memoria-facultativa", cor: "vermelho", brasil: true },
  { data: "08-13", nome: "Santa Dulce dos Pobres, religiosa", grau: "memoria", cor: "branco", brasil: true, nota: "Canonizada em 13 de outubro de 2019; memória litúrgica no dia 13 de agosto, data de seu nascimento para o Céu.", slug: "santa-dulce-dos-pobres" },
  { data: "09-10", nome: "Bem-aventurados André de Soveral, Ambrósio Francisco Ferro e companheiros, mártires", grau: "memoria-facultativa", cor: "vermelho", brasil: true },
  { data: "12-01", nome: "Beata Lindalva Justo de Oliveira, virgem e mártir", grau: "memoria-facultativa", cor: "vermelho", brasil: true },
];

const PORTUGUES_MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/** Chave mm-dd de uma data (UTC). */
export function chaveMesDia(date: Date): string {
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

/** Data por extenso "13 de agosto" a partir de uma chave mm-dd. */
export function dataFixaExtenso(chave: string): string {
  const [mm, dd] = chave.split("-").map(Number);
  return `${dd} de ${PORTUGUES_MESES[mm - 1]}`;
}

/** Todas as celebrações fixas do dia, ordenadas por grau (maior primeiro). */
export function celebracoesFixas(date: Date): CelebracaoFixa[] {
  const chave = chaveMesDia(date);
  return SANTORAL.filter((c) => c.data === chave).sort(
    (a, b) => GRAU_PESO[b.grau] - GRAU_PESO[a.grau],
  );
}

/** Celebração fixa principal do dia (a de maior grau), se houver. */
export function celebracaoFixaPrincipal(date: Date): CelebracaoFixa | null {
  return celebracoesFixas(date)[0] ?? null;
}

/** Índice slug -> celebração, para ligar fichas de santos ao calendário. */
export const SANTORAL_POR_SLUG: Record<string, CelebracaoFixa> = SANTORAL.reduce(
  (acc, c) => {
    if (c.slug && !acc[c.slug]) acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, CelebracaoFixa>,
);
