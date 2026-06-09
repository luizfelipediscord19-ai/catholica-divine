export type Sacramento = {
  slug: string;
  numero: string;
  nome: string;
  grupo: "Iniciação Cristã" | "Cura" | "Serviço da Comunhão";
  resumo: string;
  baseBiblica: { ref: string; texto: string }[];
  catecismo: string;
  historia: string;
  efeitos: string[];
  faq: { q: string; a: string }[];
};

export const SACRAMENTOS: Sacramento[] = [
  {
    slug: "batismo",
    numero: "I",
    nome: "Batismo",
    grupo: "Iniciação Cristã",
    resumo:
      "Porta da vida no Espírito e porta que dá acesso aos outros sacramentos. Pelo Batismo somos libertos do pecado e regenerados como filhos de Deus.",
    baseBiblica: [
      { ref: "Mt 28,19", texto: "Ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo." },
      { ref: "Jo 3,5", texto: "Quem não nascer da água e do Espírito não pode entrar no Reino de Deus." },
      { ref: "At 2,38", texto: "Convertei-vos e cada um de vós seja batizado em nome de Jesus Cristo para a remissão dos pecados." },
    ],
    catecismo: "CIC §§1213-1284. O Batismo é o fundamento de toda a vida cristã, porta da vida no Espírito (vitae spiritualis ianua) e porta que dá acesso aos outros sacramentos.",
    historia:
      "Prefigurado no Antigo Testamento pela travessia do Mar Vermelho e pelo dilúvio, instituído por Cristo no Jordão e mandato após a Ressurreição. Os Padres dos primeiros séculos descrevem a tríplice imersão e a unção pós-batismal.",
    efeitos: [
      "Remissão do pecado original e de todos os pecados pessoais",
      "Nova criatura, filho adotivo de Deus, membro de Cristo",
      "Incorporação à Igreja, Corpo de Cristo",
      "Caráter sacramental indelével — não se repete",
    ],
    faq: [
      { q: "Por que batizar crianças?", a: "A graça do Batismo é dom gratuito de Deus; já no Novo Testamento famílias inteiras eram batizadas (At 16,33). A Igreja batiza desde a infância para que a criança seja libertada do pecado original e nasça para a vida divina (CIC §1250)." },
      { q: "Quem pode batizar?", a: "Ministros ordinários: bispo, presbítero e diácono. Em caso de necessidade, qualquer pessoa pode batizar, derramando água sobre a cabeça e dizendo: 'Eu te batizo em nome do Pai, do Filho e do Espírito Santo' (CIC §1256)." },
    ],
  },
  {
    slug: "confirmacao",
    numero: "II",
    nome: "Confirmação (Crisma)",
    grupo: "Iniciação Cristã",
    resumo:
      "Completa a graça batismal pela efusão do Espírito Santo, configurando-nos mais perfeitamente a Cristo e enriquecendo-nos com força especial para testemunhar a fé.",
    baseBiblica: [
      { ref: "At 8,14-17", texto: "Pedro e João impunham as mãos sobre os samaritanos e estes recebiam o Espírito Santo." },
      { ref: "At 19,5-6", texto: "Quando Paulo lhes impôs as mãos, o Espírito Santo veio sobre eles." },
      { ref: "2Cor 1,21-22", texto: "Deus nos ungiu, nos selou e depositou em nossos corações o penhor do Espírito." },
    ],
    catecismo: "CIC §§1285-1321. Imprime na alma um sinal indelével, o caráter, marcando-nos como testemunhas de Cristo.",
    historia:
      "Já nos Atos dos Apóstolos vemos a imposição das mãos após o Batismo. A unção com o santo crisma é atestada desde os primeiros séculos. No Oriente, geralmente é conferida junto com o Batismo; no Ocidente, em idade da razão.",
    efeitos: [
      "Plenitude do Espírito Santo e seus sete dons",
      "Enraíza mais profundamente a filiação divina",
      "Vincula mais perfeitamente à Igreja",
      "Concede força especial para difundir e defender a fé",
    ],
    faq: [
      { q: "Posso receber a Crisma sendo adulto?", a: "Sim. Adultos podem se preparar via catecumenato e receber Batismo, Crisma e Eucaristia juntos, ou completar a iniciação cristã." },
    ],
  },
  {
    slug: "eucaristia",
    numero: "III",
    nome: "Eucaristia",
    grupo: "Iniciação Cristã",
    resumo:
      "Fonte e ápice de toda a vida cristã. Pela Eucaristia, Cristo se nos dá realmente, substancialmente: Corpo, Sangue, Alma e Divindade, sob as espécies de pão e vinho.",
    baseBiblica: [
      { ref: "Mt 26,26-28", texto: "Tomai e comei, isto é o meu Corpo. […] Isto é o meu Sangue, da nova aliança, derramado por muitos para a remissão dos pecados." },
      { ref: "Jo 6,51-56", texto: "Eu sou o pão vivo descido do céu. Quem comer deste pão viverá eternamente." },
      { ref: "1Cor 11,23-29", texto: "Quem come este pão e bebe este cálice indignamente, será réu do Corpo e do Sangue do Senhor." },
    ],
    catecismo: "CIC §§1322-1419. A Eucaristia é 'fonte e cume de toda a vida cristã' (LG 11). Pela consagração opera-se a transubstanciação: a substância do pão converte-se na do Corpo de Cristo e a do vinho na de seu Sangue.",
    historia:
      "Instituída por Cristo na Última Ceia, na noite em que foi entregue. Os cristãos celebram a 'fração do pão' desde o Pentecostes (At 2,42). A doutrina da Presença Real foi solenemente afirmada pelos Concílios de Latrão IV e Trento.",
    efeitos: [
      "União íntima com Cristo, que se entrega a nós",
      "Apaga os pecados veniais e preserva dos mortais",
      "Reforça a unidade da Igreja, Corpo Místico de Cristo",
      "Penhor da glória futura e da ressurreição",
    ],
    faq: [
      { q: "O que é transubstanciação?", a: "É a conversão real da substância do pão e do vinho no Corpo e Sangue de Cristo, permanecendo apenas as 'espécies' (aparências) do pão e do vinho. Doutrina solenemente definida pelo Concílio de Trento." },
      { q: "Quem pode comungar?", a: "Os fiéis católicos em estado de graça, em jejum eucarístico de pelo menos uma hora, conscientes do mistério que recebem." },
    ],
  },
  {
    slug: "penitencia",
    numero: "IV",
    nome: "Penitência e Reconciliação",
    grupo: "Cura",
    resumo:
      "Sacramento da misericórdia: Cristo, por meio do sacerdote, perdoa os pecados cometidos após o Batismo e reconcilia o penitente com Deus e com a Igreja.",
    baseBiblica: [
      { ref: "Jo 20,22-23", texto: "Recebei o Espírito Santo. Àqueles a quem perdoardes os pecados, ser-lhes-ão perdoados." },
      { ref: "Mt 16,19", texto: "Tudo o que ligares na terra será ligado nos céus, e tudo o que desligares na terra será desligado nos céus." },
      { ref: "1Jo 1,9", texto: "Se confessarmos os nossos pecados, Deus é fiel e justo para no-los perdoar." },
    ],
    catecismo: "CIC §§1422-1498. Comporta quatro atos: contrição, confissão dos pecados, satisfação (penitência) e absolvição do sacerdote.",
    historia:
      "Cristo confiou aos Apóstolos o ministério da reconciliação (Jo 20). Nos primeiros séculos havia a 'penitência canônica' pública para pecados graves; a partir do século VII generalizou-se a forma da confissão auricular individual.",
    efeitos: [
      "Reconciliação com Deus e restituição da graça",
      "Reconciliação com a Igreja",
      "Remissão da pena eterna devida aos pecados mortais",
      "Paz e serenidade da consciência, consolação espiritual",
    ],
    faq: [
      { q: "Com que frequência devo me confessar?", a: "A Igreja prescreve a confissão dos pecados graves ao menos uma vez por ano. Para crescer espiritualmente, recomenda-se a confissão frequente (mensal ou conforme orientação)." },
    ],
  },
  {
    slug: "uncao-dos-enfermos",
    numero: "V",
    nome: "Unção dos Enfermos",
    grupo: "Cura",
    resumo:
      "Confere graça especial aos cristãos que enfrentam doença grave ou velhice, unindo-os à Paixão de Cristo para seu bem e o de toda a Igreja.",
    baseBiblica: [
      { ref: "Tg 5,14-15", texto: "Está alguém doente entre vós? Chame os presbíteros da Igreja, e estes orem sobre ele, ungindo-o com óleo em nome do Senhor." },
      { ref: "Mc 6,13", texto: "Os Doze ungiam com óleo muitos enfermos e os curavam." },
    ],
    catecismo: "CIC §§1499-1532. Não é apenas sacramento dos moribundos: pode-se receber sempre que um fiel começa a estar em perigo de morte por doença ou velhice.",
    historia:
      "Praticada desde a era apostólica conforme a Carta de Tiago. Conhecida também como 'extrema unção' quando ministrada in articulo mortis.",
    efeitos: [
      "União do enfermo à Paixão de Cristo",
      "Conforto, paz e coragem",
      "Perdão dos pecados se o doente não pôde se confessar",
      "Restabelecimento da saúde, se for útil para a salvação",
      "Preparação para a passagem à vida eterna",
    ],
    faq: [],
  },
  {
    slug: "ordem",
    numero: "VI",
    nome: "Ordem Sacerdotal",
    grupo: "Serviço da Comunhão",
    resumo:
      "Sacramento pelo qual a missão confiada por Cristo aos Apóstolos continua a ser exercida na Igreja até o fim dos tempos, em três graus: episcopado, presbiterado e diaconato.",
    baseBiblica: [
      { ref: "Lc 22,19", texto: "Fazei isto em memória de mim." },
      { ref: "1Tm 4,14", texto: "Não negligencies o dom espiritual que está em ti e que te foi conferido por uma profecia, com a imposição das mãos do colégio dos presbíteros." },
      { ref: "Tt 1,5", texto: "Constituas presbíteros nas cidades, como te ordenei." },
    ],
    catecismo: "CIC §§1536-1600. O ministro do sacramento é o bispo válido. Imprime caráter indelével.",
    historia:
      "A sucessão apostólica é atestada já em Clemente Romano (final do séc. I). A distinção tripartida de bispo, presbítero e diácono está clara em Inácio de Antioquia.",
    efeitos: [
      "Configuração a Cristo Cabeça, Pastor e Servo",
      "Caráter sacramental indelével",
      "Capacidade de agir in persona Christi capitis",
      "Graças necessárias ao múnus ministerial",
    ],
    faq: [
      { q: "Por que apenas homens recebem o sacramento da Ordem?", a: "A Igreja, fiel ao exemplo do Senhor que escolheu apenas homens para o colégio apostólico, considera-se não autorizada a admitir mulheres à ordenação sacerdotal (cf. João Paulo II, Ordinatio Sacerdotalis, 1994)." },
    ],
  },
  {
    slug: "matrimonio",
    numero: "VII",
    nome: "Matrimônio",
    grupo: "Serviço da Comunhão",
    resumo:
      "A aliança matrimonial pela qual um homem e uma mulher constituem entre si íntima comunhão de vida e amor foi elevada por Cristo, entre batizados, à dignidade de sacramento.",
    baseBiblica: [
      { ref: "Gn 2,24", texto: "Por isso o homem deixará pai e mãe e se unirá à sua mulher, e os dois serão uma só carne." },
      { ref: "Mt 19,6", texto: "Não separe o homem o que Deus uniu." },
      { ref: "Ef 5,31-32", texto: "É grande este mistério: refiro-me a Cristo e à Igreja." },
    ],
    catecismo: "CIC §§1601-1666. As propriedades essenciais são a unidade e a indissolubilidade. Os ministros são os próprios cônjuges; o sacerdote/diácono é testemunha qualificada.",
    historia:
      "Instituído por Deus na criação, elevado por Cristo a sacramento. A indissolubilidade foi reafirmada pelo Concílio de Trento e por todo o Magistério moderno.",
    efeitos: [
      "Vínculo perpétuo e exclusivo entre os esposos",
      "Graça própria para amar como Cristo amou a Igreja",
      "Santificação no estado conjugal",
      "Abertura à vida (procriação e educação dos filhos)",
    ],
    faq: [],
  },
];

export function getSacramento(slug: string) {
  return SACRAMENTOS.find((s) => s.slug === slug);
}
