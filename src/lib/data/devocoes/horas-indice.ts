export type TipoItem = "salmo" | "cantico" | "leitura";

export type ItemLiturgico = {
  tipo: TipoItem;
  ref: string;
  titulo: string;
  hora: string;
  tema: string[];
  incipit: string;
};

export const INDICE_HORAS: ItemLiturgico[] = [
  // ===== SALMOS =====
  { tipo: "salmo", ref: "Sl 94 (95)", titulo: "Invitatório — Vinde, exultemos no Senhor", hora: "Ofício de Leituras / Laudes", tema: ["louvor", "convite", "adoração"], incipit: "Vinde, exultemos de alegria no Senhor, aclamemos a Deus, nosso salvador." },
  { tipo: "salmo", ref: "Sl 62 (63)", titulo: "A alma sedenta de Deus", hora: "Laudes — Domingo I", tema: ["desejo", "sede", "manhã", "intimidade"], incipit: "Sois vós, ó Senhor, o meu Deus, desde a aurora ardentemente vos procuro." },
  { tipo: "salmo", ref: "Sl 5", titulo: "Oração matutina pela justiça", hora: "Laudes — Segunda I", tema: ["justiça", "manhã", "súplica"], incipit: "Ouvi, Senhor, as minhas palavras, escutai o meu gemido." },
  { tipo: "salmo", ref: "Sl 23 (24)", titulo: "O Rei da glória entra no santuário", hora: "Laudes — Terça I", tema: ["glória", "rei", "ascensão"], incipit: "Ao Senhor pertence a terra e o que ela encerra." },
  { tipo: "salmo", ref: "Sl 35 (36)", titulo: "Malícia do pecador e bondade de Deus", hora: "Laudes — Quarta I", tema: ["misericórdia", "bondade", "luz"], incipit: "Vossa bondade, ó Senhor, vai até os céus, vossa fidelidade, até as nuvens." },
  { tipo: "salmo", ref: "Sl 56 (57)", titulo: "Confiança em meio aos perigos", hora: "Laudes — Quinta I", tema: ["confiança", "refúgio", "esperança"], incipit: "Tende piedade, ó meu Deus, tende piedade, em vós minha alma se refugia." },
  { tipo: "salmo", ref: "Sl 50 (51)", titulo: "Miserere — Súplica do pecador arrependido", hora: "Laudes — Sexta de cada semana", tema: ["arrependimento", "contrição", "perdão"], incipit: "Tende piedade de mim, Senhor, segundo a vossa misericórdia." },
  { tipo: "salmo", ref: "Sl 117 (118)", titulo: "Cântico de júbilo pascal", hora: "Laudes — Domingos", tema: ["páscoa", "pedra angular", "júbilo"], incipit: "Dai graças ao Senhor, porque ele é bom, eterna é a sua misericórdia." },
  { tipo: "salmo", ref: "Sl 109 (110)", titulo: "O Messias, Rei e Sacerdote", hora: "Vésperas — Domingo", tema: ["messias", "sacerdócio", "realeza"], incipit: "Disse o Senhor ao meu Senhor: 'Senta-te à minha direita'." },
  { tipo: "salmo", ref: "Sl 110 (111)", titulo: "Grandes são as obras do Senhor", hora: "Vésperas — Domingo", tema: ["obras de Deus", "aliança", "memorial"], incipit: "De todo o coração louvarei o Senhor, na assembleia dos justos." },
  { tipo: "salmo", ref: "Sl 121 (122)", titulo: "Saudação à Jerusalém santa", hora: "Vésperas — Sábado IV", tema: ["jerusalém", "peregrinação", "paz"], incipit: "Que alegria, quando me disseram: 'Vamos à casa do Senhor!'" },
  { tipo: "salmo", ref: "Sl 129 (130)", titulo: "De profundis — Do abismo clamo a vós", hora: "Vésperas — Sábado IV", tema: ["esperança", "perdão", "defuntos"], incipit: "Das profundezas eu clamo a vós, Senhor; escutai a minha voz." },
  { tipo: "salmo", ref: "Sl 140 (141)", titulo: "Oração na hora do perigo", hora: "Vésperas — Domingo I", tema: ["incenso", "tarde", "súplica"], incipit: "Eu vos invoco, Senhor; vinde depressa em meu auxílio." },
  { tipo: "salmo", ref: "Sl 4", titulo: "Ação de graças e confiança na noite", hora: "Completas — Sábado", tema: ["confiança", "noite", "paz"], incipit: "Quando vos invoco, ó Deus, atendei-me, Deus da minha justiça." },
  { tipo: "salmo", ref: "Sl 90 (91)", titulo: "À sombra do Altíssimo", hora: "Completas — Domingo / Quinta", tema: ["proteção", "noite", "anjos"], incipit: "Tu que habitas sob a proteção do Altíssimo." },
  { tipo: "salmo", ref: "Sl 30 (31),2-6", titulo: "Em vossas mãos entrego o meu espírito", hora: "Completas — Segunda", tema: ["entrega", "morte", "confiança"], incipit: "Em vós, Senhor, eu me refugio, jamais serei confundido." },

  // ===== CÂNTICOS =====
  { tipo: "cantico", ref: "Lc 1,68-79", titulo: "Cântico de Zacarias — Benedictus", hora: "Laudes (todos os dias)", tema: ["aurora", "messias", "salvação", "louvor"], incipit: "Bendito seja o Senhor Deus de Israel, porque visitou e redimiu o seu povo." },
  { tipo: "cantico", ref: "Lc 1,46-55", titulo: "Cântico de Maria — Magnificat", hora: "Vésperas (todos os dias)", tema: ["maria", "humildade", "louvor", "justiça"], incipit: "A minha alma engrandece o Senhor e meu espírito se alegra em Deus." },
  { tipo: "cantico", ref: "Lc 2,29-32", titulo: "Cântico de Simeão — Nunc dimittis", hora: "Completas (todos os dias)", tema: ["paz", "morte", "luz"], incipit: "Agora, ó Senhor, podeis deixar vosso servo partir em paz." },
  { tipo: "cantico", ref: "Dn 3,57-88", titulo: "Cântico das Criaturas — Benedicite", hora: "Laudes — Domingo I e III", tema: ["criação", "louvor cósmico"], incipit: "Bendizei o Senhor, todas as obras do Senhor." },
  { tipo: "cantico", ref: "Ex 15,1-18", titulo: "Cântico de Moisés após a passagem do Mar", hora: "Laudes — Sábado I", tema: ["êxodo", "vitória", "páscoa"], incipit: "Cantemos ao Senhor, que se cobriu de glória." },
  { tipo: "cantico", ref: "Is 12,1-6", titulo: "Cântico de júbilo do povo redimido", hora: "Laudes — Segunda II", tema: ["advento", "alegria", "salvação"], incipit: "Eis o Deus, Salvador da minha vida, eu confio e já não tenho medo." },
  { tipo: "cantico", ref: "Ez 36,24-28", titulo: "O Senhor renovará o seu povo", hora: "Laudes — Terça II", tema: ["coração novo", "espírito", "aliança"], incipit: "Eu vos darei um coração novo." },
  { tipo: "cantico", ref: "Fl 2,6-11", titulo: "Cristo, Servo de Deus", hora: "Vésperas — Domingos", tema: ["kenosis", "humildade", "exaltação"], incipit: "Cristo Jesus, sendo de condição divina, não considerou como presa..." },
  { tipo: "cantico", ref: "Ef 1,3-10", titulo: "O plano divino da salvação", hora: "Vésperas — Segunda", tema: ["predestinação", "bênção", "trindade"], incipit: "Bendito seja Deus, Pai de Nosso Senhor Jesus Cristo." },
  { tipo: "cantico", ref: "Cl 1,12-20", titulo: "Cristo, primogênito de toda a criação", hora: "Vésperas — Quarta", tema: ["cristologia", "criação", "reconciliação"], incipit: "Demos graças ao Pai, que nos tornou dignos de partilhar a sorte dos santos." },
  { tipo: "cantico", ref: "Ap 4,11; 5,9.10.12", titulo: "Hino dos remidos — Digno és tu", hora: "Vésperas — Terça", tema: ["liturgia celeste", "cordeiro"], incipit: "Tu és digno, ó Senhor e nosso Deus, de receber a glória." },
  { tipo: "cantico", ref: "Ap 19,1-7", titulo: "Bodas do Cordeiro — Aleluia", hora: "Vésperas — Domingo", tema: ["aleluia", "bodas", "vitória"], incipit: "Aleluia! Salvação, glória e poder pertencem a Deus." },

  // ===== LEITURAS BREVES / PATRÍSTICAS =====
  { tipo: "leitura", ref: "Rm 13,11-14", titulo: "Despertemos do sono — leitura breve", hora: "Laudes — Domingo I", tema: ["vigilância", "conversão", "advento"], incipit: "Já é hora de despertardes do sono; a noite vai adiantada, o dia está próximo." },
  { tipo: "leitura", ref: "2Cor 1,3-4", titulo: "O Deus de toda consolação", hora: "Laudes — Terça I", tema: ["consolação", "sofrimento"], incipit: "Bendito seja Deus, Pai de toda consolação, que nos conforta em toda tribulação." },
  { tipo: "leitura", ref: "1Pd 1,3-5", titulo: "Renascidos para uma esperança viva", hora: "Vésperas — Domingo I", tema: ["esperança", "batismo", "ressurreição"], incipit: "Bendito seja Deus, Pai de Nosso Senhor Jesus Cristo, que pela sua grande misericórdia nos fez renascer." },
  { tipo: "leitura", ref: "1Ts 5,23-24", titulo: "Bênção da paz integral", hora: "Vésperas — Sexta", tema: ["paz", "santificação"], incipit: "Que o Deus da paz vos santifique inteiramente." },
  { tipo: "leitura", ref: "Dt 6,4-7", titulo: "Shemá Israel — Ouve, ó Israel", hora: "Completas — Segunda", tema: ["amor a Deus", "shemá", "memória"], incipit: "Escuta, Israel: o Senhor é o nosso Deus, o Senhor é único." },
  { tipo: "leitura", ref: "Sto. Agostinho, Comentário ao Sl 85", titulo: "Cristo ora por nós, ora em nós, é orado por nós", hora: "Ofício de Leituras — patrística", tema: ["cristo total", "oração", "agostinho"], incipit: "Ele ora por nós como nosso sacerdote, ora em nós como nossa cabeça." },
  { tipo: "leitura", ref: "São Bento, Regra cap. 19", titulo: "Como salmodiar — mens concordet voci", hora: "Ofício de Leituras", tema: ["regra", "atenção", "salmodia"], incipit: "Cantemos os salmos de tal modo que nossa mente esteja de acordo com a nossa voz." },
  { tipo: "leitura", ref: "Vaticano II, SC 84", titulo: "O Ofício Divino na economia da salvação", hora: "Ofício de Leituras — conciliar", tema: ["sacrosanctum concilium", "ofício divino"], incipit: "O Ofício Divino, segundo a antiga tradição cristã, é constituído de modo que todo o curso do dia e da noite seja consagrado pelo louvor a Deus." },
  { tipo: "leitura", ref: "São Cipriano, A oração do Senhor 35", titulo: "Não se descuide de orar na hora certa", hora: "Ofício de Leituras — patrística", tema: ["horas", "disciplina", "cipriano"], incipit: "Devemos orar pela manhã, para celebrar com prece matutina a Ressurreição do Senhor." },
  { tipo: "leitura", ref: "São Basílio, Regras maiores 37", titulo: "As Horas santificam o dia inteiro", hora: "Ofício de Leituras — patrística", tema: ["basílio", "santificação do tempo"], incipit: "Nenhum tempo deve ficar privado da lembrança de Deus." },
];
