// Introduções catequéticas aos 73 livros da Bíblia Católica.
// Conteúdo redacional original (síntese livre a partir de domínio público:
// CIC, Dei Verbum, prólogos de São Jerônimo, Catena Aurea).

export type Introducao = {
  contexto: string; // contexto histórico-literário
  temas: string[]; // 3-5 temas teológicos centrais
  passagens: string[]; // 2-4 passagens-chave (ref + breve glosa)
  cristo: string; // como o livro aponta para Cristo (sentido pleno)
};

export const INTRODUCOES: Record<string, Introducao> = {
  // ===== PENTATEUCO =====
  genesis: {
    contexto: "Primeiro livro da Torá. Reúne tradições orais e escritas de Israel (javista, eloísta, sacerdotal) compiladas após o exílio babilônico. Os capítulos 1–11 (pré-história) usam linguagem simbólica para revelar verdades sobre Deus, o homem e o pecado; 12–50 narram a história dos patriarcas.",
    temas: [
      "Deus criador único e bom, em oposição aos mitos pagãos",
      "Dignidade do homem, criado à imagem de Deus",
      "Pecado original e promessa do Redentor (Protoevangelho, Gn 3,15)",
      "Aliança e eleição: de Abraão nasce o povo da promessa",
    ],
    passagens: [
      "Gn 1,1 — ‘No princípio Deus criou o céu e a terra.’",
      "Gn 3,15 — Protoevangelho: a descendência da Mulher esmagará a serpente",
      "Gn 12,1-3 — Vocação de Abraão",
      "Gn 22 — Sacrifício de Isaac, figura do Calvário",
    ],
    cristo: "Cristo é o novo Adão (Rm 5,14), descendência prometida a Abraão (Gl 3,16) e cordeiro substituto anunciado em Isaac.",
  },
  exodo: {
    contexto: "Narra a saída de Israel do Egito (séc. XIII a.C.) e a aliança no Sinai. Estrutura tríptica: libertação (1–15), caminhada (16–18), aliança e culto (19–40). É o livro fundador da identidade de Israel.",
    temas: [
      "Deus libertador que ouve o clamor do oprimido",
      "Páscoa: passagem da morte à vida pelo sangue do cordeiro",
      "Aliança do Sinai e Decálogo",
      "Presença de Deus no meio do povo (Tenda, glória)",
    ],
    passagens: [
      "Ex 3,14 — ‘Eu sou Aquele que sou’",
      "Ex 12 — Instituição da Páscoa",
      "Ex 20 — Os Dez Mandamentos",
      "Ex 24,8 — ‘Eis o sangue da aliança’",
    ],
    cristo: "Cristo é o verdadeiro Cordeiro pascal (1Cor 5,7) cuja Páscoa nos liberta do pecado; sua Eucaristia é o sangue da Nova Aliança (Lc 22,20).",
  },
  levitico: {
    contexto: "Código sacerdotal de santidade e culto, redigido em sua forma final no pós-exílio. Concentra-se na santidade ritual e moral do povo da aliança.",
    temas: ["Santidade de Deus comunicada ao povo", "Sacrifícios e mediação sacerdotal", "Pureza e expiação", "Calendário litúrgico"],
    passagens: ["Lv 11,44 — ‘Sede santos, porque eu sou santo’", "Lv 16 — Dia do Yom Kippur", "Lv 19,18 — ‘Amarás teu próximo como a ti mesmo’"],
    cristo: "Cristo é o Sumo Sacerdote definitivo (Hb 9) que se oferece como vítima de expiação única e perfeita.",
  },
  numeros: {
    contexto: "Recebe esse nome dos dois recenseamentos militares (cap. 1 e 26). Narra os quarenta anos de provação no deserto entre o Sinai e Moab.",
    temas: ["Provação e murmuração do povo", "Fidelidade de Deus apesar da infidelidade humana", "Liderança de Moisés", "Oráculos de Balaão"],
    passagens: ["Nm 6,24-26 — Bênção sacerdotal", "Nm 21,8-9 — Serpente de bronze", "Nm 24,17 — ‘Surgirá uma estrela de Jacó’"],
    cristo: "A serpente erguida prefigura Cristo na cruz (Jo 3,14); a estrela de Jacó anuncia o Messias dos Magos.",
  },
  deuteronomio: {
    contexto: "Três grandes discursos de Moisés nas planícies de Moab, releitura da Lei para a nova geração. Núcleo encontrado no Templo em 622 a.C. sob Josias.",
    temas: ["Único Deus e único Templo", "Amor como motor da Lei (Shemá)", "Bênçãos e maldições da aliança", "Memória como espiritualidade"],
    passagens: ["Dt 6,4-5 — Shemá Israel", "Dt 18,15 — ‘Um profeta como eu suscitará o Senhor’", "Dt 30,19 — ‘Escolhe a vida’"],
    cristo: "Cristo é o Profeta anunciado (At 3,22) e cita o Deuteronômio nas tentações (Mt 4).",
  },

  // ===== HISTÓRICOS =====
  josue: {
    contexto: "Conquista idealizada da Terra Prometida sob Josué (séc. XIII a.C.), redigida pela escola deuteronomista no séc. VII a.C.",
    temas: ["Cumprimento das promessas a Abraão", "Fidelidade exige separação dos cultos pagãos", "Repartição da terra como dom"],
    passagens: ["Js 1,9 — ‘Sê forte e corajoso’", "Js 24,15 — ‘Eu e a minha casa serviremos ao Senhor’"],
    cristo: "Josué (Yeshua) prefigura nominal e tipologicamente Jesus que introduz na verdadeira Terra Prometida — o Reino dos céus.",
  },
  juizes: {
    contexto: "Ciclo recorrente — pecado, opressão, clamor, libertador — entre Josué e a monarquia (séc. XII–XI a.C.).",
    temas: ["Necessidade de um rei segundo o coração de Deus", "Deus age por instrumentos humildes", "Infidelidade e misericórdia"],
    passagens: ["Jz 6,15 — Vocação de Gedeão", "Jz 13–16 — Sansão, nazireu de Deus"],
    cristo: "Os juízes prefiguram Cristo, libertador definitivo enviado quando o povo clama.",
  },
  rute: {
    contexto: "Novela edificante do período pós-exílico, contestando o exclusivismo étnico de Esdras-Neemias.",
    temas: ["Hesed (amor fiel)", "Gentios na história da salvação", "Providência discreta"],
    passagens: ["Rt 1,16 — ‘Teu povo será o meu povo’", "Rt 4,17 — Genealogia que conduz a Davi"],
    cristo: "Rute, moabita, entra na genealogia de Cristo (Mt 1,5), antecipando a salvação dos gentios.",
  },
  "1samuel": {
    contexto: "Transição da época dos juízes à monarquia (séc. XI a.C.). Samuel é o último juiz e primeiro profeta.",
    temas: ["Ambiguidade da realeza humana", "Eleição divina contra aparências", "Davi, rei segundo o coração de Deus"],
    passagens: ["1Sm 3,10 — ‘Fala, Senhor, teu servo escuta’", "1Sm 16,7 — ‘O Senhor vê o coração’"],
    cristo: "Davi prefigura Cristo, rei ungido (Messias) escolhido por Deus, não pelos homens.",
  },
  "2samuel": {
    contexto: "Reinado de Davi (c. 1010–970 a.C.): unificação das tribos, conquista de Jerusalém e oráculo de Natã.",
    temas: ["Aliança davídica e promessa messiânica", "Pecado e arrependimento (Sl 51)", "Jerusalém, cidade santa"],
    passagens: ["2Sm 7,12-14 — Oráculo de Natã: trono eterno", "2Sm 12,13 — ‘Pequei contra o Senhor’"],
    cristo: "Cristo é o Filho de Davi (Mt 1,1) cujo trono é eterno (Lc 1,32-33).",
  },
  "1reis": {
    contexto: "Reinado de Salomão, construção do Templo (c. 960 a.C.) e cisma dos dois reinos (c. 930 a.C.).",
    temas: ["Sabedoria como dom", "Templo como morada de Deus", "Profetismo (Elias) contra a idolatria"],
    passagens: ["1Rs 3,9 — Pedido de Salomão por sabedoria", "1Rs 19,12 — Deus na brisa suave"],
    cristo: "Cristo é maior que Salomão (Mt 12,42) e o verdadeiro Templo (Jo 2,21).",
  },
  "2reis": {
    contexto: "Da divisão à queda de Samaria (722 a.C.) e ao exílio babilônico (587 a.C.).",
    temas: ["Juízo histórico pela infidelidade", "Ministério dos profetas", "Esperança no resto fiel"],
    passagens: ["2Rs 2,11 — Elias arrebatado", "2Rs 25 — Queda de Jerusalém"],
    cristo: "Eliseu, com seus milagres (multiplicação, ressuscitação), prefigura o ministério de Cristo.",
  },
  "1cronicas": {
    contexto: "Releitura sacerdotal pós-exílica (séc. IV a.C.) da história de Israel a partir do culto.",
    temas: ["Davi como organizador do culto", "Centralidade do Templo", "Genealogias da promessa"],
    passagens: ["1Cr 17 — Aliança com Davi", "1Cr 29,11 — Doxologia ao Senhor"],
    cristo: "Cristo é o herdeiro de Davi, sumo organizador do culto novo e definitivo.",
  },
  "2cronicas": {
    contexto: "De Salomão ao édito de Ciro (538 a.C.), com ênfase nos reis fiéis ao Templo.",
    temas: ["Reforma religiosa", "Conversão como saída do exílio", "Ciro como instrumento providencial"],
    passagens: ["2Cr 7,14 — ‘Se meu povo se humilhar...’", "2Cr 36,23 — Édito de Ciro"],
    cristo: "Cristo é o verdadeiro Templo reconstruído em três dias (Jo 2,19-21).",
  },
  esdras: {
    contexto: "Retorno do exílio sob Zorobabel e reforma religiosa de Esdras (séc. V a.C.).",
    temas: ["Reconstrução do Templo", "Pureza da fé contra sincretismo", "Lei como identidade"],
    passagens: ["Esd 3,11 — Lançamento dos fundamentos do Templo", "Esd 9 — Confissão de Esdras"],
    cristo: "A reconstrução prefigura a Igreja, novo povo congregado por Cristo.",
  },
  neemias: {
    contexto: "Reconstrução dos muros de Jerusalém (445 a.C.) e renovação da aliança.",
    temas: ["Oração e ação combinadas", "Reforma social (perdão de dívidas)", "Comunidade reunida pela Palavra"],
    passagens: ["Ne 8,10 — ‘A alegria do Senhor é vossa força’"],
    cristo: "A Jerusalém reconstruída prefigura a Igreja, ‘cidade posta sobre o monte’ (Mt 5,14).",
  },
  tobias: {
    contexto: "Romance edificante deuterocanônico (séc. III–II a.C.) sobre a vida piedosa no exílio assírio.",
    temas: ["Providência e ministério dos anjos", "Casamento santo", "Esmola e oração", "Fidelidade no exílio"],
    passagens: ["Tb 4,15 — ‘Não faças a ninguém o que não queres para ti’", "Tb 12,12 — O anjo apresenta as orações"],
    cristo: "Rafael, que cura e acompanha, prefigura o ministério de Cristo Médico das almas.",
  },
  judite: {
    contexto: "Narrativa simbólica deuterocanônica (séc. II a.C.) durante a crise macabaica.",
    temas: ["Deus salva pelos fracos", "Coragem feminina", "Oração que precede a ação"],
    passagens: ["Jt 13,18 — ‘Bendita és tu entre as mulheres’"],
    cristo: "Judite vitoriosa sobre Holofernes prefigura Maria, que esmaga a cabeça do dragão (Ap 12).",
  },
  ester: {
    contexto: "Narrativa cortesã sobre a salvação dos judeus na Pérsia (séc. V–IV a.C.). Origem da festa de Purim.",
    temas: ["Providência oculta", "Intercessão da rainha", "Reviravolta dos planos do mal"],
    passagens: ["Est 4,14 — ‘Quem sabe se não foi para isto que chegaste à realeza?’"],
    cristo: "Ester intercessora prefigura Maria, Rainha que intercede pelo povo diante do Rei.",
  },
  "1macabeus": {
    contexto: "História da revolta dos Macabeus (167–134 a.C.) contra a helenização forçada de Antíoco IV. Deuterocanônico.",
    temas: ["Fidelidade até o martírio", "Defesa do culto e da Lei", "Purificação do Templo (Hanucá)"],
    passagens: ["1Mc 2,50 — ‘Mostrai zelo pela Lei’", "1Mc 4,36-59 — Purificação do Templo"],
    cristo: "A purificação do Templo prefigura a obra de Cristo que purifica o culto (Jo 2,13-22).",
  },
  "2macabeus": {
    contexto: "Compêndio teológico (não cronológico) dos eventos macabaicos. Deuterocanônico, séc. I a.C.",
    temas: ["Ressurreição dos mortos", "Oração pelos defuntos", "Martírio dos sete irmãos", "Intercessão dos santos"],
    passagens: ["2Mc 7 — Martírio dos sete irmãos macabeus", "2Mc 12,46 — ‘Santo pensamento orar pelos mortos’"],
    cristo: "Os mártires macabeus prefiguram os mártires cristãos; a doutrina da ressurreição prepara o Evangelho.",
  },

  // ===== SAPIENCIAIS =====
  jo: {
    contexto: "Poema sapiencial (séc. VI–IV a.C.) que questiona a retribuição automática. Estrutura: prólogo, diálogos, discursos de Deus, epílogo.",
    temas: ["Sofrimento do justo", "Limites da sabedoria humana", "Deus transcendente e providente", "Fé sem garantias"],
    passagens: ["Jó 1,21 — ‘O Senhor deu, o Senhor tirou’", "Jó 19,25 — ‘Eu sei que meu Redentor vive’", "Jó 42,5 — ‘Agora meus olhos te veem’"],
    cristo: "Jó, justo sofredor, prefigura o Servo Sofredor (Is 53) cumprido em Cristo crucificado.",
  },
  salmos: {
    contexto: "Saltério: 150 cânticos da oração de Israel, composto ao longo de séculos. ‘Livro de orações de Cristo, da Igreja e do cristão’ (CIC § 2585-2589).",
    temas: ["Louvor e ação de graças", "Súplica e lamento", "Sabedoria e Torá", "Realeza messiânica"],
    passagens: ["Sl 22 — Lamento messiânico citado na cruz", "Sl 51 — Miserere", "Sl 110 — ‘Tu és sacerdote para sempre’"],
    cristo: "Cristo reza os Salmos e cumpre os Salmos messiânicos (2, 22, 110); são a oração da Igreja na Liturgia das Horas.",
  },
  proverbios: {
    contexto: "Coleção de máximas sapienciais editadas a partir do séc. X (Salomão) até o séc. IV a.C.",
    temas: ["Temor do Senhor, princípio da sabedoria", "Sabedoria personificada (cap. 8)", "Vida prática conforme a Torá"],
    passagens: ["Pr 1,7 — ‘O temor do Senhor é o princípio da ciência’", "Pr 8,22-31 — A Sabedoria gerada antes da criação"],
    cristo: "A Sabedoria de Pr 8 é identificada pelos Padres como o Verbo eterno (Jo 1,1; Cl 1,15-17).",
  },
  eclesiastes: {
    contexto: "Qohélet (o pregador) interroga, no séc. III a.C., o sentido da vida sob a luz do ‘vento’ (hebel).",
    temas: ["Vaidade das coisas humanas", "Tempo para cada coisa", "Temor de Deus como única certeza"],
    passagens: ["Ecl 1,2 — ‘Vaidade das vaidades’", "Ecl 3,1 — ‘Tudo tem seu tempo’", "Ecl 12,13 — ‘Teme a Deus e guarda os mandamentos’"],
    cristo: "A insuficiência das realidades terrenas aponta para Cristo, sentido último de tudo (Cl 1,17).",
  },
  cantico: {
    contexto: "Poema nupcial (séc. V–III a.C.) interpretado alegoricamente como o amor de Deus por Israel e de Cristo pela Igreja.",
    temas: ["Amor esponsal", "Beleza e dom mútuo", "Busca e união"],
    passagens: ["Ct 2,16 — ‘Meu amado é meu e eu sou dele’", "Ct 8,6 — ‘Forte como a morte é o amor’"],
    cristo: "‘Mistério grande, em relação a Cristo e à Igreja’ (Ef 5,32). Lido pelos místicos (São Bernardo, São João da Cruz) como cântico da alma e do Verbo.",
  },
  sabedoria: {
    contexto: "Composto em grego em Alexandria (séc. I a.C.). Deuterocanônico. Diálogo da fé bíblica com a filosofia helenística.",
    temas: ["Imortalidade da alma do justo", "Sabedoria divina personificada", "Crítica da idolatria", "Páscoa relida"],
    passagens: ["Sb 3,1 — ‘As almas dos justos estão nas mãos de Deus’", "Sb 7,26 — ‘Reflexo da luz eterna’"],
    cristo: "Sb 7,26 é aplicado a Cristo em Hb 1,3. Sb 2 (justo perseguido) é leitura da Paixão.",
  },
  eclesiastico: {
    contexto: "Sirácida (Ben Sira, c. 180 a.C.), traduzido em grego pelo neto. Deuterocanônico, manual sapiencial completo.",
    temas: ["Sabedoria como temor de Deus e Torá", "Vida familiar e social", "Elogio dos antepassados (cap. 44-50)"],
    passagens: ["Eclo 1,16 — ‘Princípio da sabedoria é temer o Senhor’", "Eclo 24 — A Sabedoria habita em Israel"],
    cristo: "A Sabedoria que arma sua tenda em Israel (Eclo 24,8) cumpre-se no Verbo que ‘plantou sua tenda entre nós’ (Jo 1,14).",
  },

  // ===== PROFÉTICOS =====
  isaias: {
    contexto: "Tríptico composto entre os séc. VIII–VI a.C.: Isaías de Jerusalém (1–39), Dêutero-Isaías do exílio (40–55), Trito-Isaías do pós-exílio (56–66). Chamado ‘evangelho do AT’.",
    temas: ["Santidade de Deus", "Emanuel e o Filho prometido", "Servo Sofredor", "Nova Jerusalém"],
    passagens: ["Is 7,14 — ‘A virgem conceberá’", "Is 9,5 — ‘Um menino nos nasceu’", "Is 53 — Servo Sofredor", "Is 61,1 — Citado por Jesus em Nazaré"],
    cristo: "Nenhum profeta anuncia Cristo com tanta clareza: o Emanuel, o Príncipe da Paz, o Servo que dá a vida pelos muitos.",
  },
  jeremias: {
    contexto: "Ministério na queda de Jerusalém (627–586 a.C.). Profeta perseguido, ‘confissões’ pessoais.",
    temas: ["Conversão interior", "Nova Aliança escrita no coração", "Sofrimento do profeta", "Juízo e esperança"],
    passagens: ["Jr 1,5 — ‘Antes de te formar... eu te conheci’", "Jr 31,31-34 — Nova Aliança"],
    cristo: "Cristo institui a Nova Aliança anunciada por Jeremias (Lc 22,20); Jeremias rejeitado prefigura Cristo rejeitado.",
  },
  lamentacoes: {
    contexto: "Cinco poemas acrósticos sobre a destruição de Jerusalém (587 a.C.).",
    temas: ["Pranto sobre a cidade", "Misericórdia que se renova", "Esperança na escuridão"],
    passagens: ["Lm 3,22-23 — ‘As misericórdias do Senhor são novas cada manhã’"],
    cristo: "Jesus chora sobre Jerusalém (Lc 19,41); a Igreja canta Lamentações no Tríduo Pascal.",
  },
  baruc: {
    contexto: "Deuterocanônico (séc. II a.C.), atribuído ao secretário de Jeremias. Reúne confissão, hino à Sabedoria e carta de Jeremias.",
    temas: ["Confissão coletiva", "Sabedoria como Lei", "Crítica da idolatria"],
    passagens: ["Br 3,38 — ‘Apareceu sobre a terra e conviveu com os homens’ (lido na Encarnação)"],
    cristo: "Br 3,38 é leitura mariana e cristológica do Natal.",
  },
  ezequiel: {
    contexto: "Profeta-sacerdote no exílio babilônico (593–571 a.C.). Visões grandiosas, ações simbólicas.",
    temas: ["Glória de Deus móvel", "Responsabilidade pessoal", "Coração novo e Espírito", "Templo escatológico"],
    passagens: ["Ez 36,26 — ‘Dar-vos-ei um coração novo’", "Ez 37 — Vale dos ossos secos"],
    cristo: "O Bom Pastor (Ez 34) cumpre-se em Cristo (Jo 10); o Templo escatológico (Ez 40-48) é a Igreja (Ap 21).",
  },
  daniel: {
    contexto: "Apocalipse judaico (séc. II a.C., crise macabaica) ambientado na corte babilônica. Deuterocanônicos: Susana, Bel e o Dragão, Cântico dos três jovens.",
    temas: ["Soberania de Deus na história", "Resistência à idolatria", "Ressurreição (12,2)", "Filho do Homem"],
    passagens: ["Dn 3 — Os três jovens na fornalha", "Dn 7,13-14 — Filho do Homem"],
    cristo: "Jesus assume o título ‘Filho do Homem’ (Mt 26,64) tirado de Dn 7.",
  },
  oseias: {
    contexto: "Profeta do reino do Norte (séc. VIII a.C.). Seu casamento com Gomer ilustra o amor de Deus por Israel infiel.",
    temas: ["Hesed (amor fiel)", "Idolatria como adultério", "Misericórdia que recria"],
    passagens: ["Os 6,6 — ‘Quero misericórdia e não sacrifício’", "Os 11,1 — ‘Do Egito chamei meu filho’"],
    cristo: "Mt 2,15 aplica Os 11,1 a Cristo; Jesus cita Os 6,6 (Mt 9,13).",
  },
  joel: {
    contexto: "Profeta pós-exílico (séc. V–IV a.C.) a partir de uma praga de gafanhotos.",
    temas: ["Dia do Senhor", "Efusão do Espírito sobre toda carne", "Conversão coletiva"],
    passagens: ["Jl 2,12-13 — ‘Convertei-vos de todo o coração’", "Jl 3,1-2 — ‘Derramarei meu Espírito’"],
    cristo: "Pedro cita Jl 3 em Pentecostes (At 2,17) como cumprimento da promessa do Espírito.",
  },
  amos: {
    contexto: "Pastor de Técua (séc. VIII a.C.), profeta da justiça social em Israel próspero.",
    temas: ["Crítica do culto sem justiça", "Opção pelos pobres", "Dia do Senhor como juízo"],
    passagens: ["Am 5,24 — ‘Corra o direito como água’"],
    cristo: "Cristo cumpre a justiça anunciada pelos profetas e proclama bem-aventurados os pobres (Lc 6,20).",
  },
  abdias: {
    contexto: "O mais breve livro do AT. Oráculo contra Edom após 587 a.C.",
    temas: ["Juízo sobre a soberba", "Restauração de Sião"],
    passagens: ["Ab 15 — ‘O Dia do Senhor está próximo’"],
    cristo: "Anuncia o Reino que será do Senhor (v. 21), realizado em Cristo Rei.",
  },
  jonas: {
    contexto: "Conto teológico (séc. V–IV a.C.) contra o exclusivismo: Deus se compadece dos pagãos arrependidos.",
    temas: ["Universalidade da salvação", "Misericórdia que escandaliza", "Conversão"],
    passagens: ["Jn 2 — Oração no ventre do peixe", "Jn 4,11 — Compaixão de Deus por Nínive"],
    cristo: "‘O sinal de Jonas’ (Mt 12,40): três dias no ventre do peixe prefiguram a sepultura e a Ressurreição.",
  },
  miqueias: {
    contexto: "Contemporâneo de Isaías (séc. VIII a.C.), profeta camponês.",
    temas: ["Justiça social", "Messias de Belém", "Caminhar humildemente com Deus"],
    passagens: ["Mq 5,1 — ‘E tu, Belém-Efrata...’", "Mq 6,8 — ‘Praticar a justiça, amar a misericórdia’"],
    cristo: "Mt 2,6 cita Mq 5,1 como o lugar de nascimento do Messias.",
  },
  naum: {
    contexto: "Oráculo de júbilo pela queda iminente de Nínive (612 a.C.).",
    temas: ["Justiça divina sobre os impérios", "Consolo dos oprimidos"],
    passagens: ["Na 2,1 — ‘Eis sobre os montes os pés do mensageiro de boas novas’"],
    cristo: "Citado em Rm 10,15 a propósito dos arautos do Evangelho.",
  },
  habacuc: {
    contexto: "Diálogo do profeta com Deus diante do mal (final do séc. VII a.C.).",
    temas: ["Teodiceia", "Fé como confiança", "Visão escatológica"],
    passagens: ["Hab 2,4 — ‘O justo viverá pela fé’"],
    cristo: "Hab 2,4 é o lema paulino da justificação pela fé (Rm 1,17; Gl 3,11; Hb 10,38).",
  },
  sofonias: {
    contexto: "Profeta no início do reino de Josias (séc. VII a.C.).",
    temas: ["Dia da ira", "Resto pobre e humilde", "Alegria messiânica"],
    passagens: ["Sf 3,12 — ‘Deixarei no meio de ti um povo humilde’", "Sf 3,14-17 — ‘Exulta, filha de Sião’"],
    cristo: "Sf 3,14-17 ressoa na Anunciação a Maria, ‘filha de Sião’ que recebe o Salvador.",
  },
  ageu: {
    contexto: "Pós-exílico (520 a.C.), exorta a reconstrução do Templo.",
    temas: ["Prioridade da casa de Deus", "Glória do segundo Templo"],
    passagens: ["Ag 2,9 — ‘A glória deste segundo Templo será maior’"],
    cristo: "A glória prometida cumpre-se quando Cristo, o verdadeiro Templo, ali entra (Lc 2,22).",
  },
  zacarias: {
    contexto: "Contemporâneo de Ageu (520 a.C.). Oito visões e oráculos messiânicos.",
    temas: ["Messias humilde e traspassado", "Pastor ferido", "Jerusalém escatológica"],
    passagens: ["Zc 9,9 — ‘Eis que teu rei vem montado num jumentinho’", "Zc 12,10 — ‘Olharão para Aquele que traspassaram’"],
    cristo: "Citados nos relatos da entrada em Jerusalém (Mt 21,5) e da Paixão (Jo 19,37).",
  },
  malaquias: {
    contexto: "Último profeta canônico (séc. V a.C.). Diálogos disputatórios sobre a tibieza pós-exílica.",
    temas: ["Culto digno", "Justiça matrimonial", "Vinda do Precursor"],
    passagens: ["Ml 1,11 — ‘Em todo lugar é oferecido ao meu nome um sacrifício puro’", "Ml 3,1 — ‘Eis que envio meu mensageiro’"],
    cristo: "Ml 1,11 anuncia a Eucaristia oferecida em toda parte; Ml 3,1 prepara João Batista.",
  },

  // ===== EVANGELHOS =====
  mateus: {
    contexto: "Escrito para comunidade judeu-cristã (c. 70 d.C.), apresenta Jesus como cumprimento das Escrituras. Cinco grandes discursos correspondem aos cinco livros da Torá.",
    temas: ["Jesus, novo Moisés", "Reino dos Céus", "Igreja fundada sobre Pedro", "Justiça superior"],
    passagens: ["Mt 5–7 — Sermão da Montanha", "Mt 16,18 — ‘Tu és Pedro, e sobre esta pedra...’", "Mt 28,19-20 — Mandato missionário"],
    cristo: "Cristo é o Emanuel (Mt 1,23), Messias filho de Davi, Mestre que cumpre e supera a Lei.",
  },
  marcos: {
    contexto: "O mais antigo dos Evangelhos (c. 65 d.C.), redigido em Roma a partir da pregação de Pedro. Ritmo veloz, ‘evangelho da cruz’.",
    temas: ["Segredo messiânico", "Caminho do discipulado pela cruz", "Filho de Deus revelado na cruz"],
    passagens: ["Mc 1,1 — ‘Princípio do Evangelho de Jesus Cristo, Filho de Deus’", "Mc 8,29 — ‘Tu és o Cristo’", "Mc 15,39 — ‘Verdadeiramente este homem era Filho de Deus’"],
    cristo: "Cristo só é plenamente compreendido a partir da Cruz, lugar onde se revela como Filho de Deus.",
  },
  lucas: {
    contexto: "Médico, companheiro de Paulo (c. 80 d.C.). Escreve para Teófilo (gentio) com cuidado historiográfico. Forma o díptico Lucas-Atos.",
    temas: ["Misericórdia de Deus", "Pobres e excluídos", "Mulheres no Evangelho", "Oração de Jesus", "Ação do Espírito"],
    passagens: ["Lc 1,46-55 — Magnificat", "Lc 15 — Parábolas da misericórdia", "Lc 24,30-31 — Reconhecimento na fração do pão"],
    cristo: "Cristo é o Salvador dos pequenos, dos pecadores e dos pobres; sua Páscoa abre os olhos na Eucaristia.",
  },
  joao: {
    contexto: "Quarto Evangelho (c. 95 d.C.). Estrutura: Livro dos Sinais (cap. 1–12) e Livro da Glória (13–20), epílogo (21).",
    temas: ["Verbo encarnado", "Sete sinais e sete ‘Eu sou’", "Vida eterna", "Amor mútuo"],
    passagens: ["Jo 1,14 — ‘O Verbo se fez carne’", "Jo 3,16 — ‘Tanto Deus amou o mundo’", "Jo 6 — Discurso do Pão da Vida", "Jo 19,30 — ‘Está consumado’"],
    cristo: "Cristo é o Verbo eterno feito carne, o Pão da Vida, o Bom Pastor, o Caminho, a Verdade e a Vida.",
  },

  atos: {
    contexto: "Segundo volume da obra lucana (c. 80 d.C.). Narra de Pentecostes (At 2) ao cativeiro de Paulo em Roma.",
    temas: ["Igreja sob o Espírito Santo", "Missão até os confins da terra", "Universalidade da salvação", "Comunhão dos primeiros cristãos"],
    passagens: ["At 1,8 — ‘Sereis minhas testemunhas até os confins’", "At 2 — Pentecostes", "At 15 — Concílio de Jerusalém"],
    cristo: "Cristo glorificado age na Igreja por seu Espírito. A Igreja é Cristo continuado na história.",
  },

  // ===== CARTAS PAULINAS =====
  romanos: {
    contexto: "Carta-tratado escrita a partir de Corinto (c. 57 d.C.). Síntese mais completa do Evangelho paulino.",
    temas: ["Justificação pela fé", "Universalidade do pecado e da graça", "Israel e os gentios", "Vida no Espírito"],
    passagens: ["Rm 1,17 — ‘O justo viverá pela fé’", "Rm 5,5 — ‘O amor de Deus foi derramado em nossos corações’", "Rm 8 — Vida no Espírito", "Rm 12,1 — Culto espiritual"],
    cristo: "Cristo é o novo Adão (Rm 5) que nos justifica e nos faz filhos no Filho (Rm 8).",
  },
  "1corintios": {
    contexto: "Resposta a divisões e abusos em Corinto (c. 56 d.C.).",
    temas: ["Unidade do Corpo", "Eucaristia", "Carismas e caridade", "Ressurreição dos mortos"],
    passagens: ["1Cor 11,23-26 — Instituição da Eucaristia", "1Cor 13 — Hino à caridade", "1Cor 15 — Ressurreição"],
    cristo: "Cristo crucificado é ‘sabedoria de Deus’ (1Cor 1,24); presente na Eucaristia, primícias dos que ressuscitam.",
  },
  "2corintios": {
    contexto: "Carta mais pessoal e dolorida (c. 57 d.C.), defesa do ministério apostólico.",
    temas: ["Tesouro em vasos de barro", "Ministério da reconciliação", "Glória da Nova Aliança"],
    passagens: ["2Cor 4,7 — ‘Tesouro em vasos de barro’", "2Cor 5,17 — ‘Quem está em Cristo é uma nova criatura’"],
    cristo: "Cristo se faz pobre para nos enriquecer (2Cor 8,9); nele somos reconciliados com o Pai.",
  },
  galatas: {
    contexto: "Carta polêmica (c. 54 d.C.) contra os ‘judaizantes’ que impunham a circuncisão aos pagãos.",
    temas: ["Liberdade cristã", "Justificação pela fé", "Filiação adotiva", "Frutos do Espírito"],
    passagens: ["Gl 2,20 — ‘Vivo, mas já não sou eu, é Cristo que vive em mim’", "Gl 5,22 — Frutos do Espírito"],
    cristo: "Cristo nos liberta da Lei como caminho de salvação; em Cristo já não há judeu nem grego (Gl 3,28).",
  },
  efesios: {
    contexto: "Carta circular do cativeiro (c. 62 d.C.). Visão grandiosa do mistério da Igreja.",
    temas: ["Plano eterno de Deus", "Cristo, cabeça da Igreja", "Unidade de judeus e gentios", "Combate espiritual"],
    passagens: ["Ef 1,3-14 — Hino de bênção", "Ef 4,4-6 — ‘Um só Senhor, uma só fé...’", "Ef 5,32 — Mistério grande do matrimônio"],
    cristo: "Cristo recapitula tudo (Ef 1,10) e ama a Igreja como esposa.",
  },
  filipenses: {
    contexto: "Carta da prisão (c. 62 d.C.) à amada comunidade de Filipos.",
    temas: ["Alegria em Cristo", "Esvaziamento (kénosis)", "Cidadania nos céus"],
    passagens: ["Fl 2,6-11 — Hino cristológico", "Fl 4,4 — ‘Alegrai-vos sempre no Senhor’"],
    cristo: "O hino de Fl 2 sintetiza o mistério: Cristo se esvazia até a cruz e é por isso exaltado como Senhor.",
  },
  colossenses: {
    contexto: "Carta do cativeiro (c. 62 d.C.) contra uma gnose incipiente que rebaixava Cristo.",
    temas: ["Primado cósmico de Cristo", "Plenitude habita nele", "Vida nova no Batismo"],
    passagens: ["Cl 1,15-20 — Hino cristológico", "Cl 3,1 — ‘Buscai as coisas do alto’"],
    cristo: "Em Cristo ‘foram criadas todas as coisas’ (Cl 1,16); nele habita corporalmente a plenitude da divindade (Cl 2,9).",
  },
  "1tessalonicenses": {
    contexto: "A mais antiga carta paulina e o documento cristão mais antigo (c. 51 d.C.).",
    temas: ["Esperança da Parusia", "Vigilância", "Vida cristã concreta"],
    passagens: ["1Ts 4,13-18 — A esperança dos que adormeceram", "1Ts 5,17 — ‘Orai sem cessar’"],
    cristo: "Cristo virá como Senhor glorioso a juntar consigo os que nele dormiram.",
  },
  "2tessalonicenses": {
    contexto: "Carta complementar (c. 52 d.C.) corrigindo entusiasmos escatológicos.",
    temas: ["Sinais antes da Parusia", "Tradição apostólica", "Trabalho cristão"],
    passagens: ["2Ts 2,15 — ‘Conservai as tradições que aprendestes’", "2Ts 3,10 — ‘Quem não quer trabalhar, não coma’"],
    cristo: "Cristo virá no tempo do Pai; até lá, fidelidade à Tradição apostólica.",
  },
  "1timoteo": {
    contexto: "Primeira das Pastorais (c. 64 d.C.). Diretrizes ao bispo de Éfeso.",
    temas: ["Organização da Igreja", "Sã doutrina", "Oração pública", "Ministérios"],
    passagens: ["1Tm 2,5 — ‘Um só mediador entre Deus e os homens’", "1Tm 3 — Qualidades do bispo e do diácono"],
    cristo: "Cristo é o único Mediador; toda estrutura da Igreja serve a esta mediação.",
  },
  "2timoteo": {
    contexto: "Testamento espiritual de Paulo (c. 67 d.C.), preso e prestes a ser martirizado.",
    temas: ["Fidelidade na perseguição", "Inspiração das Escrituras", "Combate concluído"],
    passagens: ["2Tm 3,16 — ‘Toda Escritura é inspirada por Deus’", "2Tm 4,7 — ‘Combati o bom combate’"],
    cristo: "Cristo é o juiz justo que dá a coroa aos que esperaram sua manifestação (2Tm 4,8).",
  },
  tito: {
    contexto: "Carta pastoral a Tito em Creta (c. 64 d.C.).",
    temas: ["Ordenação de presbíteros", "Sã doutrina", "Vida virtuosa"],
    passagens: ["Tt 2,11-14 — ‘Apareceu a graça de Deus, fonte de salvação’", "Tt 3,5 — ‘Pelo banho da regeneração’"],
    cristo: "Tt 3,5 é texto clássico sobre o Batismo como ‘banho da regeneração no Espírito Santo’.",
  },
  filemon: {
    contexto: "Bilhete pessoal (c. 62 d.C.) intercedendo pelo escravo Onésimo, agora cristão.",
    temas: ["Fraternidade em Cristo", "Conversão social do Evangelho", "Caridade discreta"],
    passagens: ["Fm 16 — ‘Não mais como escravo, mas como irmão muito amado’"],
    cristo: "Em Cristo as distinções sociais se relativizam diante da fraternidade batismal (Gl 3,28).",
  },
  hebreus: {
    contexto: "Tratado-homilia (c. 70 d.C.) dirigido a cristãos de origem judaica tentados a regredir.",
    temas: ["Cristo Sumo Sacerdote eterno", "Cumprimento das figuras do AT", "Fé como peregrinação"],
    passagens: ["Hb 1,1-3 — ‘Deus falou-nos pelo Filho’", "Hb 4,15 — Sumo Sacerdote compassivo", "Hb 11 — Galeria da fé"],
    cristo: "Cristo é o Sumo Sacerdote segundo a ordem de Melquisedec, vítima e altar de seu único sacrifício.",
  },

  // ===== CATÓLICAS =====
  tiago: {
    contexto: "Atribuída a Tiago, ‘irmão do Senhor’ e bispo de Jerusalém (c. 50 d.C.). Sapiencial e prática.",
    temas: ["Fé e obras", "Cuidado dos pobres", "Domínio da língua", "Unção dos enfermos"],
    passagens: ["Tg 2,17 — ‘A fé sem obras é morta’", "Tg 5,14-15 — Fundamento bíblico da Unção dos Enfermos"],
    cristo: "Cristo é o Senhor da glória cuja Lei perfeita é a da liberdade (Tg 1,25; 2,1).",
  },
  "1pedro": {
    contexto: "Carta a cristãos perseguidos na Ásia Menor (c. 64 d.C.).",
    temas: ["Sacerdócio comum dos fiéis", "Esperança no sofrimento", "Vida batismal", "Pastoreio cristão"],
    passagens: ["1Pd 2,9 — ‘Vós sois povo sacerdotal’", "1Pd 3,15 — ‘Prontos para dar razão da vossa esperança’"],
    cristo: "Cristo, ‘Pastor e guardião das vossas almas’ (1Pd 2,25), é modelo do justo que sofre.",
  },
  "2pedro": {
    contexto: "Carta-testamento de Pedro (c. 67 d.C.) contra falsos mestres.",
    temas: ["Inspiração da Escritura", "Vinda do Senhor", "Conhecimento de Cristo"],
    passagens: ["2Pd 1,4 — ‘Participantes da natureza divina’", "2Pd 1,20-21 — Sobre a Escritura"],
    cristo: "Cristo nos torna ‘participantes da natureza divina’ — base bíblica da doutrina da divinização.",
  },
  "1joao": {
    contexto: "Tratado-carta joanino (c. 95 d.C.) contra o docetismo (negar que Cristo veio na carne).",
    temas: ["Deus é luz e amor", "Comunhão", "Discernimento dos espíritos", "Vida eterna já presente"],
    passagens: ["1Jo 1,5 — ‘Deus é luz’", "1Jo 4,8 — ‘Deus é amor’", "1Jo 4,2 — Critério cristológico"],
    cristo: "Confessar Cristo vindo na carne é o critério da fé e da comunhão.",
  },
  "2joao": {
    contexto: "Bilhete à ‘Senhora eleita’ (uma comunidade), c. 95 d.C.",
    temas: ["Verdade e amor", "Hospitalidade discernida"],
    passagens: ["2Jo 6 — ‘O amor é caminhar segundo seus mandamentos’"],
    cristo: "Cristo é a verdade na qual permanecemos.",
  },
  "3joao": {
    contexto: "Bilhete pessoal ao presbítero Gaio (c. 95 d.C.).",
    temas: ["Hospitalidade missionária", "Autoridade na Igreja"],
    passagens: ["3Jo 8 — ‘Cooperadores da verdade’"],
    cristo: "Acolher os enviados é acolher o próprio Cristo (Mt 10,40).",
  },
  judas: {
    contexto: "Carta breve (c. 65 d.C.) de Judas, ‘irmão de Tiago’, contra hereges libertinos.",
    temas: ["Combate pela fé recebida", "Memória do juízo", "Misericórdia discernida"],
    passagens: ["Jd 3 — ‘Combatei pela fé transmitida aos santos uma vez por todas’"],
    cristo: "Cristo é ‘nosso único Soberano e Senhor’ (Jd 4) e nos preserva irrepreensíveis (Jd 24).",
  },

  // ===== APOCALIPSE =====
  apocalipse: {
    contexto: "Visão profética de João, exilado em Patmos (c. 95 d.C.) durante a perseguição de Domiciano. Gênero apocalíptico judaico-cristão.",
    temas: ["Cordeiro vitorioso", "Liturgia celeste", "Combate da Igreja com o mal", "Nova Jerusalém"],
    passagens: ["Ap 1,8 — ‘Eu sou o Alfa e o Ômega’", "Ap 5 — O Cordeiro digno do livro", "Ap 12 — A Mulher vestida de sol", "Ap 21,1-4 — ‘Eis a morada de Deus com os homens’"],
    cristo: "Cristo é o Cordeiro imolado e vivo, Senhor da história, esperado pela Igreja-Esposa: ‘Vem, Senhor Jesus!’ (Ap 22,20).",
  },
};

export function getIntroducao(slug: string): Introducao | undefined {
  return INTRODUCOES[slug];
}
