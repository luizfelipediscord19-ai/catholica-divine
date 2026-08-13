// Estrutura factual dos 73 livros da Bíblia Católica (não copyrightável).
// O texto integral é linkado diretamente à fonte oficial (bibliacatolica.com.br).

export type Livro = {
  slug: string;
  nome: string;
  abrev: string;
  capitulos: number;
  testamento: "AT" | "NT";
  grupo: string;
  autor: string;
  data: string;
  resumo: string;
};

export const LIVROS: Livro[] = [
  // Pentateuco
  { slug: "genesis", nome: "Gênesis", abrev: "Gn", capitulos: 50, testamento: "AT", grupo: "Pentateuco", autor: "Tradicionalmente atribuído a Moisés (tradição mosaica)", data: "séc. XIII–V a.C.", resumo: "A criação do mundo, a queda, os patriarcas Abraão, Isaac, Jacó e a história de José no Egito." },
  { slug: "exodo", nome: "Êxodo", abrev: "Ex", capitulos: 40, testamento: "AT", grupo: "Pentateuco", autor: "Tradicionalmente atribuído a Moisés (tradição mosaica)", data: "séc. XIII–V a.C.", resumo: "A libertação de Israel da escravidão no Egito, a aliança no Sinai e o Decálogo." },
  { slug: "levitico", nome: "Levítico", abrev: "Lv", capitulos: 27, testamento: "AT", grupo: "Pentateuco", autor: "Tradicionalmente atribuído a Moisés (tradição mosaica)", data: "séc. VI a.C.", resumo: "Leis cultuais, sacerdócio levítico e código de santidade." },
  { slug: "numeros", nome: "Números", abrev: "Nm", capitulos: 36, testamento: "AT", grupo: "Pentateuco", autor: "Tradicionalmente atribuído a Moisés (tradição mosaica)", data: "séc. VI a.C.", resumo: "Quarenta anos de peregrinação de Israel no deserto." },
  { slug: "deuteronomio", nome: "Deuteronômio", abrev: "Dt", capitulos: 34, testamento: "AT", grupo: "Pentateuco", autor: "Tradicionalmente atribuído a Moisés (tradição mosaica)", data: "séc. VII a.C.", resumo: "Os últimos discursos de Moisés e a renovação da aliança." },

  // Históricos
  { slug: "josue", nome: "Josué", abrev: "Js", capitulos: 24, testamento: "AT", grupo: "Históricos", autor: "Tradição deuteronomista", data: "séc. VII a.C.", resumo: "A conquista e divisão da Terra Prometida." },
  { slug: "juizes", nome: "Juízes", abrev: "Jz", capitulos: 21, testamento: "AT", grupo: "Históricos", autor: "Tradição deuteronomista", data: "séc. VII a.C.", resumo: "Período dos juízes de Israel — Débora, Gedeão, Sansão." },
  { slug: "rute", nome: "Rute", abrev: "Rt", capitulos: 4, testamento: "AT", grupo: "Históricos", autor: "Anônimo", data: "séc. V a.C.", resumo: "História da moabita que se tornou bisavó do rei Davi." },
  { slug: "1samuel", nome: "1 Samuel", abrev: "1Sm", capitulos: 31, testamento: "AT", grupo: "Históricos", autor: "Tradição deuteronomista", data: "séc. VII a.C.", resumo: "De Samuel a Saul e a unção de Davi." },
  { slug: "2samuel", nome: "2 Samuel", abrev: "2Sm", capitulos: 24, testamento: "AT", grupo: "Históricos", autor: "Tradição deuteronomista", data: "séc. VII a.C.", resumo: "O reinado de Davi sobre Israel unificado." },
  { slug: "1reis", nome: "1 Reis", abrev: "1Rs", capitulos: 22, testamento: "AT", grupo: "Históricos", autor: "Tradição deuteronomista", data: "séc. VI a.C.", resumo: "Salomão, o Templo e a divisão do reino." },
  { slug: "2reis", nome: "2 Reis", abrev: "2Rs", capitulos: 25, testamento: "AT", grupo: "Históricos", autor: "Tradição deuteronomista", data: "séc. VI a.C.", resumo: "Elias, Eliseu e o exílio babilônico." },
  { slug: "1cronicas", nome: "1 Crônicas", abrev: "1Cr", capitulos: 29, testamento: "AT", grupo: "Históricos", autor: "Cronista", data: "séc. IV a.C.", resumo: "Genealogias de Adão a Davi e o reinado davídico." },
  { slug: "2cronicas", nome: "2 Crônicas", abrev: "2Cr", capitulos: 36, testamento: "AT", grupo: "Históricos", autor: "Cronista", data: "séc. IV a.C.", resumo: "De Salomão ao exílio, com foco no culto e no Templo." },
  { slug: "esdras", nome: "Esdras", abrev: "Esd", capitulos: 10, testamento: "AT", grupo: "Históricos", autor: "Esdras / Cronista", data: "séc. IV a.C.", resumo: "Retorno do exílio e reconstrução do Templo." },
  { slug: "neemias", nome: "Neemias", abrev: "Ne", capitulos: 13, testamento: "AT", grupo: "Históricos", autor: "Neemias / Cronista", data: "séc. IV a.C.", resumo: "Reconstrução dos muros de Jerusalém e reforma religiosa." },
  { slug: "tobias", nome: "Tobias", abrev: "Tb", capitulos: 14, testamento: "AT", grupo: "Históricos", autor: "Anônimo", data: "séc. III–II a.C.", resumo: "Livro deuterocanônico: a piedade de Tobit e a viagem de Tobias com o anjo Rafael." },
  { slug: "judite", nome: "Judite", abrev: "Jt", capitulos: 16, testamento: "AT", grupo: "Históricos", autor: "Anônimo", data: "séc. II a.C.", resumo: "Livro deuterocanônico: a heroína Judite liberta o povo decapitando Holofernes." },
  { slug: "ester", nome: "Ester", abrev: "Est", capitulos: 10, testamento: "AT", grupo: "Históricos", autor: "Anônimo", data: "séc. IV a.C.", resumo: "A rainha Ester salva os judeus do extermínio." },
  { slug: "1macabeus", nome: "1 Macabeus", abrev: "1Mc", capitulos: 16, testamento: "AT", grupo: "Históricos", autor: "Anônimo", data: "séc. II–I a.C.", resumo: "Livro deuterocanônico: a revolta dos Macabeus contra a helenização." },
  { slug: "2macabeus", nome: "2 Macabeus", abrev: "2Mc", capitulos: 15, testamento: "AT", grupo: "Históricos", autor: "Anônimo", data: "séc. II–I a.C.", resumo: "Livro deuterocanônico: martírio dos sete irmãos e ressurreição dos mortos." },

  // Sapienciais
  { slug: "jo", nome: "Jó", abrev: "Jó", capitulos: 42, testamento: "AT", grupo: "Sapienciais", autor: "Anônimo", data: "séc. VI–IV a.C.", resumo: "O problema do sofrimento do justo." },
  { slug: "salmos", nome: "Salmos", abrev: "Sl", capitulos: 150, testamento: "AT", grupo: "Sapienciais", autor: "Tradicionalmente atribuídos em parte a Davi, e a outros salmistas", data: "séc. X–III a.C.", resumo: "Os 150 cânticos da oração de Israel — o livro de orações de Cristo e da Igreja." },
  { slug: "proverbios", nome: "Provérbios", abrev: "Pr", capitulos: 31, testamento: "AT", grupo: "Sapienciais", autor: "Tradicionalmente atribuído a Salomão, e a outros sábios", data: "séc. X–IV a.C.", resumo: "Coleção de máximas sapienciais." },
  { slug: "eclesiastes", nome: "Eclesiastes", abrev: "Ecl", capitulos: 12, testamento: "AT", grupo: "Sapienciais", autor: "Qohélet", data: "séc. III a.C.", resumo: "‘Vaidade das vaidades, tudo é vaidade.’ Reflexão sobre o sentido da vida." },
  { slug: "cantico", nome: "Cântico dos Cânticos", abrev: "Ct", capitulos: 8, testamento: "AT", grupo: "Sapienciais", autor: "Tradição salomônica", data: "séc. V–III a.C.", resumo: "Poema nupcial — imagem do amor de Deus pelo seu povo." },
  { slug: "sabedoria", nome: "Sabedoria", abrev: "Sb", capitulos: 19, testamento: "AT", grupo: "Sapienciais", autor: "Anônimo", data: "séc. I a.C.", resumo: "Livro deuterocanônico: a sabedoria divina personificada." },
  { slug: "eclesiastico", nome: "Eclesiástico", abrev: "Eclo", capitulos: 51, testamento: "AT", grupo: "Sapienciais", autor: "Ben Sira", data: "séc. II a.C.", resumo: "Livro deuterocanônico (Sirácida): tratado sapiencial." },

  // Proféticos
  { slug: "isaias", nome: "Isaías", abrev: "Is", capitulos: 66, testamento: "AT", grupo: "Proféticos", autor: "Tradicionalmente atribuído a Isaías (caps. 40–66 associados a discípulos posteriores)", data: "séc. VIII–VI a.C.", resumo: "O ‘evangelho do Antigo Testamento’ — anuncia o Emanuel e o Servo Sofredor." },
  { slug: "jeremias", nome: "Jeremias", abrev: "Jr", capitulos: 52, testamento: "AT", grupo: "Proféticos", autor: "Jeremias", data: "séc. VII–VI a.C.", resumo: "O profeta das lágrimas, anuncia a Nova Aliança." },
  { slug: "lamentacoes", nome: "Lamentações", abrev: "Lm", capitulos: 5, testamento: "AT", grupo: "Proféticos", autor: "Tradição jeremiana", data: "séc. VI a.C.", resumo: "Cinco poemas sobre a destruição de Jerusalém." },
  { slug: "baruc", nome: "Baruc", abrev: "Br", capitulos: 6, testamento: "AT", grupo: "Proféticos", autor: "Tradição baruquiana", data: "séc. II a.C.", resumo: "Livro deuterocanônico." },
  { slug: "ezequiel", nome: "Ezequiel", abrev: "Ez", capitulos: 48, testamento: "AT", grupo: "Proféticos", autor: "Ezequiel", data: "séc. VI a.C.", resumo: "Visões grandiosas no exílio e promessa do Templo escatológico." },
  { slug: "daniel", nome: "Daniel", abrev: "Dn", capitulos: 14, testamento: "AT", grupo: "Proféticos", autor: "Tradição danielica", data: "séc. II a.C.", resumo: "Visões apocalípticas e o Filho do Homem." },
  { slug: "oseias", nome: "Oseias", abrev: "Os", capitulos: 14, testamento: "AT", grupo: "Proféticos", autor: "Oseias", data: "séc. VIII a.C.", resumo: "O amor fiel de Deus pelo povo infiel." },
  { slug: "joel", nome: "Joel", abrev: "Jl", capitulos: 4, testamento: "AT", grupo: "Proféticos", autor: "Joel", data: "séc. V–IV a.C.", resumo: "Anúncio do Dia do Senhor e da efusão do Espírito." },
  { slug: "amos", nome: "Amós", abrev: "Am", capitulos: 9, testamento: "AT", grupo: "Proféticos", autor: "Amós", data: "séc. VIII a.C.", resumo: "Profeta da justiça social." },
  { slug: "abdias", nome: "Abdias", abrev: "Ab", capitulos: 1, testamento: "AT", grupo: "Proféticos", autor: "Abdias", data: "séc. VI–V a.C.", resumo: "Oráculo contra Edom." },
  { slug: "jonas", nome: "Jonas", abrev: "Jn", capitulos: 4, testamento: "AT", grupo: "Proféticos", autor: "Anônimo", data: "séc. V–IV a.C.", resumo: "A misericórdia de Deus que alcança até Nínive." },
  { slug: "miqueias", nome: "Miqueias", abrev: "Mq", capitulos: 7, testamento: "AT", grupo: "Proféticos", autor: "Miqueias", data: "séc. VIII a.C.", resumo: "Anuncia a vinda do Messias em Belém." },
  { slug: "naum", nome: "Naum", abrev: "Na", capitulos: 3, testamento: "AT", grupo: "Proféticos", autor: "Naum", data: "séc. VII a.C.", resumo: "Oráculo contra Nínive." },
  { slug: "habacuc", nome: "Habacuc", abrev: "Hab", capitulos: 3, testamento: "AT", grupo: "Proféticos", autor: "Habacuc", data: "séc. VII a.C.", resumo: "Diálogo do profeta com Deus sobre o mal." },
  { slug: "sofonias", nome: "Sofonias", abrev: "Sf", capitulos: 3, testamento: "AT", grupo: "Proféticos", autor: "Sofonias", data: "séc. VII a.C.", resumo: "Anúncio do Dia do Senhor." },
  { slug: "ageu", nome: "Ageu", abrev: "Ag", capitulos: 2, testamento: "AT", grupo: "Proféticos", autor: "Ageu", data: "séc. VI a.C.", resumo: "Exortação a reconstruir o Templo." },
  { slug: "zacarias", nome: "Zacarias", abrev: "Zc", capitulos: 14, testamento: "AT", grupo: "Proféticos", autor: "Zacarias", data: "séc. VI a.C.", resumo: "Visões messiânicas." },
  { slug: "malaquias", nome: "Malaquias", abrev: "Ml", capitulos: 3, testamento: "AT", grupo: "Proféticos", autor: "Malaquias", data: "séc. V a.C.", resumo: "Último profeta — anuncia o precursor do Messias." },

  // Evangelhos
  { slug: "mateus", nome: "Mateus", abrev: "Mt", capitulos: 28, testamento: "NT", grupo: "Evangelhos", autor: "Tradicionalmente atribuído ao apóstolo São Mateus", data: "c. 70 d.C.", resumo: "Cristo, novo Moisés, cumpre as Escrituras. Sermão da Montanha." },
  { slug: "marcos", nome: "Marcos", abrev: "Mc", capitulos: 16, testamento: "NT", grupo: "Evangelhos", autor: "Tradicionalmente atribuído a São Marcos", data: "c. 65 d.C.", resumo: "Cristo, Filho de Deus revelado pela cruz. O mais breve dos Evangelhos." },
  { slug: "lucas", nome: "Lucas", abrev: "Lc", capitulos: 24, testamento: "NT", grupo: "Evangelhos", autor: "Tradicionalmente atribuído a São Lucas", data: "c. 80 d.C.", resumo: "Cristo, salvador dos pobres e dos pecadores. Contém o Magnificat e o Benedictus." },
  { slug: "joao", nome: "João", abrev: "Jo", capitulos: 21, testamento: "NT", grupo: "Evangelhos", autor: "Tradicionalmente atribuído ao apóstolo São João", data: "c. 95 d.C.", resumo: "Cristo, Verbo encarnado. Os sete sinais e os grandes discursos." },

  // Atos
  { slug: "atos", nome: "Atos dos Apóstolos", abrev: "At", capitulos: 28, testamento: "NT", grupo: "Atos", autor: "São Lucas", data: "c. 80 d.C.", resumo: "Pentecostes e a missão da Igreja primitiva — de Jerusalém a Roma." },

  // Cartas Paulinas
  { slug: "romanos", nome: "Romanos", abrev: "Rm", capitulos: 16, testamento: "NT", grupo: "Cartas Paulinas", autor: "São Paulo", data: "c. 57 d.C.", resumo: "Síntese teológica: a justificação pela fé em Cristo." },
  { slug: "1corintios", nome: "1 Coríntios", abrev: "1Cor", capitulos: 16, testamento: "NT", grupo: "Cartas Paulinas", autor: "São Paulo", data: "c. 56 d.C.", resumo: "Hino à caridade (cap. 13) e doutrina sobre a Eucaristia e a ressurreição." },
  { slug: "2corintios", nome: "2 Coríntios", abrev: "2Cor", capitulos: 13, testamento: "NT", grupo: "Cartas Paulinas", autor: "São Paulo", data: "c. 57 d.C.", resumo: "Defesa apostólica e teologia do ministério." },
  { slug: "galatas", nome: "Gálatas", abrev: "Gl", capitulos: 6, testamento: "NT", grupo: "Cartas Paulinas", autor: "São Paulo", data: "c. 54 d.C.", resumo: "Liberdade cristã contra o legalismo." },
  { slug: "efesios", nome: "Efésios", abrev: "Ef", capitulos: 6, testamento: "NT", grupo: "Cartas Paulinas", autor: "Tradicionalmente atribuída a São Paulo", data: "c. 62 d.C.", resumo: "Mistério da Igreja como Corpo de Cristo." },
  { slug: "filipenses", nome: "Filipenses", abrev: "Fl", capitulos: 4, testamento: "NT", grupo: "Cartas Paulinas", autor: "São Paulo", data: "c. 62 d.C.", resumo: "Hino cristológico do esvaziamento (kénosis)." },
  { slug: "colossenses", nome: "Colossenses", abrev: "Cl", capitulos: 4, testamento: "NT", grupo: "Cartas Paulinas", autor: "Tradicionalmente atribuída a São Paulo", data: "c. 62 d.C.", resumo: "Primado cósmico de Cristo." },
  { slug: "1tessalonicenses", nome: "1 Tessalonicenses", abrev: "1Ts", capitulos: 5, testamento: "NT", grupo: "Cartas Paulinas", autor: "São Paulo", data: "c. 51 d.C.", resumo: "A mais antiga carta paulina — esperança da Parusia." },
  { slug: "2tessalonicenses", nome: "2 Tessalonicenses", abrev: "2Ts", capitulos: 3, testamento: "NT", grupo: "Cartas Paulinas", autor: "Tradicionalmente atribuída a São Paulo", data: "c. 52 d.C.", resumo: "Sobre a vinda do Senhor e a Tradição apostólica." },
  { slug: "1timoteo", nome: "1 Timóteo", abrev: "1Tm", capitulos: 6, testamento: "NT", grupo: "Cartas Paulinas", autor: "Tradicionalmente atribuída a São Paulo", data: "c. 64 d.C.", resumo: "Pastoral: organização da Igreja." },
  { slug: "2timoteo", nome: "2 Timóteo", abrev: "2Tm", capitulos: 4, testamento: "NT", grupo: "Cartas Paulinas", autor: "Tradicionalmente atribuída a São Paulo", data: "c. 67 d.C.", resumo: "Testamento espiritual de Paulo." },
  { slug: "tito", nome: "Tito", abrev: "Tt", capitulos: 3, testamento: "NT", grupo: "Cartas Paulinas", autor: "Tradicionalmente atribuída a São Paulo", data: "c. 64 d.C.", resumo: "Pastoral: ordenação de presbíteros." },
  { slug: "filemon", nome: "Filêmon", abrev: "Fm", capitulos: 1, testamento: "NT", grupo: "Cartas Paulinas", autor: "São Paulo", data: "c. 62 d.C.", resumo: "Bilhete pela libertação do escravo Onésimo." },
  { slug: "hebreus", nome: "Hebreus", abrev: "Hb", capitulos: 13, testamento: "NT", grupo: "Cartas Paulinas", autor: "Anônima; tradicionalmente associada ao círculo paulino", data: "c. 70 d.C.", resumo: "Cristo, Sumo Sacerdote eterno." },

  // Católicas
  { slug: "tiago", nome: "Tiago", abrev: "Tg", capitulos: 5, testamento: "NT", grupo: "Cartas Católicas", autor: "Tradicionalmente atribuída a São Tiago, 'irmão do Senhor'", data: "c. 50 d.C.", resumo: "Fé e obras — a sabedoria prática cristã." },
  { slug: "1pedro", nome: "1 Pedro", abrev: "1Pd", capitulos: 5, testamento: "NT", grupo: "Cartas Católicas", autor: "Tradicionalmente atribuída a São Pedro", data: "c. 64 d.C.", resumo: "Esperança cristã na perseguição." },
  { slug: "2pedro", nome: "2 Pedro", abrev: "2Pd", capitulos: 3, testamento: "NT", grupo: "Cartas Católicas", autor: "Tradicionalmente atribuída a São Pedro (autoria a mais discutida entre os exegetas)", data: "c. 67 d.C.", resumo: "Contra os falsos mestres." },
  { slug: "1joao", nome: "1 João", abrev: "1Jo", capitulos: 5, testamento: "NT", grupo: "Cartas Católicas", autor: "Tradicionalmente atribuída ao apóstolo São João", data: "c. 95 d.C.", resumo: "‘Deus é amor.’ Comunhão com o Pai e com o Filho." },
  { slug: "2joao", nome: "2 João", abrev: "2Jo", capitulos: 1, testamento: "NT", grupo: "Cartas Católicas", autor: "Tradicionalmente atribuída ao apóstolo São João", data: "c. 95 d.C.", resumo: "Permanecer na verdade e no amor." },
  { slug: "3joao", nome: "3 João", abrev: "3Jo", capitulos: 1, testamento: "NT", grupo: "Cartas Católicas", autor: "Tradicionalmente atribuída ao apóstolo São João", data: "c. 95 d.C.", resumo: "Bilhete pessoal a Gaio." },
  { slug: "judas", nome: "Judas", abrev: "Jd", capitulos: 1, testamento: "NT", grupo: "Cartas Católicas", autor: "Tradicionalmente atribuída a São Judas, 'irmão de Tiago'", data: "c. 65 d.C.", resumo: "Combate aos falsos mestres." },

  // Apocalipse
  { slug: "apocalipse", nome: "Apocalipse", abrev: "Ap", capitulos: 22, testamento: "NT", grupo: "Apocalipse", autor: "Tradicionalmente atribuído a João (identidade exata discutida pelos exegetas)", data: "c. 95 d.C.", resumo: "Visão da vitória final do Cordeiro e da Nova Jerusalém." },
];

export function getLivro(slug: string): Livro | undefined {
  return LIVROS.find((l) => l.slug === slug);
}

// URL oficial Católica para leitura integral do capítulo (Bíblia Ave-Maria via bibliacatolica.com.br)
export function getUrlOficial(livro: Livro, capitulo: number): string {
  return `https://www.bibliacatolica.com.br/biblia-ave-maria/${livro.slug}/${capitulo}/`;
}

export function getUrlVatican(livro: Livro): string {
  return `https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_index_lt.html`;
}
