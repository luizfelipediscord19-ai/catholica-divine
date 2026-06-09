export type Santo = {
  slug: string;
  nome: string;
  titulo: string;
  data: string; // dd/mm
  seculo: string;
  padroeiro: string;
  resumo: string;
  biografia: string;
  virtudes: string[];
  frase: string;
  imagem?: string;
};

export const SANTOS: Santo[] = [
  {
    slug: "francisco-de-assis",
    nome: "São Francisco de Assis",
    titulo: "Fundador da Ordem dos Frades Menores",
    data: "04/10",
    seculo: "XII–XIII",
    padroeiro: "Ecologia, animais, Itália",
    resumo: "O pobrezinho de Assis, místico do amor a Cristo crucificado e a toda criatura.",
    biografia:
      "Nascido em 1181/82 em Assis, filho do rico comerciante Pietro Bernardone. Após uma juventude mundana e a experiência da guerra, converteu-se radicalmente diante do crucifixo de São Damião que lhe disse: 'Vai, Francisco, repara a minha Igreja'. Renunciou aos bens paternos, abraçou a Senhora Pobreza e fundou a Ordem dos Frades Menores. Recebeu os estigmas no monte Alverne em 1224. Morreu em 1226 cantando o Cântico das Criaturas.",
    virtudes: ["Pobreza radical", "Alegria evangélica", "Amor à criação", "Conformidade com Cristo crucificado"],
    frase: "Senhor, fazei de mim um instrumento da vossa paz.",
    imagem: "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "agostinho-de-hipona",
    nome: "Santo Agostinho de Hipona",
    titulo: "Bispo e Doutor da Igreja",
    data: "28/08",
    seculo: "IV–V",
    padroeiro: "Teólogos, tipógrafos",
    resumo: "Doutor da Graça. Sua conversão e obra teológica moldaram o pensamento cristão ocidental.",
    biografia:
      "Nascido em 354 em Tagaste (atual Argélia), foi maniqueísta e levou vida desregrada antes de se converter em Milão, em 386, sob a influência de Santo Ambrósio e das orações de sua mãe, Santa Mônica. Ordenado sacerdote e depois bispo de Hipona, escreveu obras monumentais como as Confissões, A Cidade de Deus e De Trinitate. Morreu em 430, durante o cerco vândalo.",
    virtudes: ["Busca incansável da verdade", "Humildade na conversão", "Caridade pastoral"],
    frase: "Tarde te amei, Beleza tão antiga e tão nova, tarde te amei.",
    imagem: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "teresinha-do-menino-jesus",
    nome: "Santa Teresinha do Menino Jesus",
    titulo: "Virgem, Doutora da Igreja",
    data: "01/10",
    seculo: "XIX",
    padroeiro: "Missões, floristas",
    resumo: "A pequena flor de Lisieux, mestra do 'caminho da infância espiritual'.",
    biografia:
      "Nascida em 1873 em Alençon, França, entrou no Carmelo de Lisieux aos 15 anos. Em sua breve vida (morreu aos 24, em 1897, de tuberculose) ensinou o 'caminho pequeno' de confiança e abandono filial em Deus. Sua autobiografia 'História de uma alma' tornou-se um dos livros espirituais mais lidos do mundo. Patrona universal das missões.",
    virtudes: ["Confiança total", "Pequenez", "Amor escondido"],
    frase: "Quero passar o meu céu fazendo o bem na terra.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "joao-paulo-ii",
    nome: "São João Paulo II",
    titulo: "Papa",
    data: "22/10",
    seculo: "XX–XXI",
    padroeiro: "Famílias, jovens, Jornada Mundial da Juventude",
    resumo: "Karol Wojtyła, o Papa que atravessou o século, defensor da dignidade humana.",
    biografia:
      "Nascido em 1920 em Wadowice, Polônia. Operário, ator e poeta antes do sacerdócio. Bispo, cardeal e, em 1978, eleito Papa — o primeiro não italiano em 455 anos. Seu pontificado de 27 anos contribuiu para o fim do comunismo no Leste europeu, instituiu a Jornada Mundial da Juventude, canonizou mais santos que todos os predecessores juntos e enriqueceu a Igreja com 14 encíclicas. Morreu em 2 de abril de 2005. Canonizado em 2014.",
    virtudes: ["Coragem profética", "Amor à juventude", "Devoção mariana ('Totus Tuus')"],
    frase: "Não tenhais medo! Abri, escancarai as portas a Cristo!",
    imagem: "https://images.unsplash.com/photo-1544427928-c49cdfebf194?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "padre-pio",
    nome: "São Pio de Pietrelcina",
    titulo: "Sacerdote, Capuchinho",
    data: "23/09",
    seculo: "XIX–XX",
    padroeiro: "Adolescentes, alívio da dor",
    resumo: "Estigmatizado, confessor incansável, místico do século XX.",
    biografia:
      "Francesco Forgione (1887–1968) recebeu os estigmas em 1918 e os conservou por 50 anos. Confessor por longas horas todos os dias, fundou a Casa Sollievo della Sofferenza em San Giovanni Rotondo. Canonizado em 2002.",
    virtudes: ["Paciência no sofrimento", "Direção espiritual sapiente", "União com a Paixão"],
    frase: "Reza, espera e não te preocupes.",
    imagem: "https://images.unsplash.com/photo-1519834785169-98be25ec3f8a?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "antonio-de-padua",
    nome: "Santo Antônio de Pádua",
    titulo: "Doutor da Igreja",
    data: "13/06",
    seculo: "XII–XIII",
    padroeiro: "Pobres, objetos perdidos, casamenteiro",
    resumo: "O 'Martelo dos Hereges' e mestre da Palavra de Deus.",
    biografia:
      "Fernando de Bulhões (1195–1231), nascido em Lisboa, ingressou nos cônegos regulares e depois nos franciscanos. Pregador genial, foi proclamado 'Doutor Evangélico' por Pio XII. Morreu aos 36 anos em Pádua.",
    virtudes: ["Eloquência", "Ciência sagrada", "Caridade aos pobres"],
    frase: "As obras dão peso às palavras.",
  },
  {
    slug: "tomas-de-aquino",
    nome: "São Tomás de Aquino",
    titulo: "Doutor Angélico",
    data: "28/01",
    seculo: "XIII",
    padroeiro: "Universidades, estudantes",
    resumo: "O maior teólogo escolástico; autor da Suma Teológica.",
    biografia:
      "Nascido em 1225 na Itália, dominicano, discípulo de Alberto Magno. Em sua síntese magistral, conciliou fé e razão, Aristóteles e Revelação. Sua Summa Theologiae permanece referência teológica obrigatória. Morreu em 1274.",
    virtudes: ["Inteligência iluminada pela fé", "Humildade do sábio", "Castidade"],
    frase: "Concedei-me, Senhor, uma inteligência que vos conheça.",
  },
  {
    slug: "joana-darc",
    nome: "Santa Joana d'Arc",
    titulo: "Virgem e mártir",
    data: "30/05",
    seculo: "XV",
    padroeiro: "França, soldados",
    resumo: "A donzela de Orléans que ouviu vozes do céu e conduziu o exército francês.",
    biografia:
      "Camponesa de Domrémy (1412–1431). Aos 17 anos, obedecendo às vozes de Santa Catarina, Santa Margarida e São Miguel, libertou Orléans e fez sagrar Carlos VII em Reims. Capturada, foi queimada viva em Rouen aos 19 anos, traída por um tribunal eclesiástico injusto. Reabilitada em 1456, canonizada em 1920.",
    virtudes: ["Obediência sobrenatural", "Coragem", "Pureza"],
    frase: "Tenho confiança em Deus, meu Senhor; nada faço sem ordem dele.",
  },
  {
    slug: "monica",
    nome: "Santa Mônica",
    titulo: "Mãe de Santo Agostinho",
    data: "27/08",
    seculo: "IV",
    padroeiro: "Mães, mulheres casadas",
    resumo: "Mãe de oração e lágrimas — modelo de perseverança intercessora.",
    biografia:
      "Nascida em 332 no norte da África. Casada com Patrício, pagão difícil, converteu o marido e, durante décadas de oração e lágrimas, alcançou a conversão de seu filho Agostinho. Morreu em Óstia, em 387.",
    virtudes: ["Perseverança", "Mansidão", "Oração"],
    frase: "Filho da minha alma, nada me prende a esta vida.",
  },
  {
    slug: "jose",
    nome: "São José",
    titulo: "Esposo de Maria, Padroeiro da Igreja Universal",
    data: "19/03",
    seculo: "I",
    padroeiro: "Pais, trabalhadores, boa morte, Igreja universal",
    resumo: "O homem justo, guardião do Redentor e da Virgem.",
    biografia:
      "Da estirpe de Davi, carpinteiro de Nazaré, esposo virginal da Bem-Aventurada Virgem Maria e pai legal de Jesus. Modelo de fé silenciosa, de obediência à vontade divina e de trabalho santificado. Proclamado Padroeiro da Igreja Universal por Pio IX em 1870.",
    virtudes: ["Justiça", "Silêncio orante", "Obediência", "Castidade"],
    frase: "Faltam-nos suas palavras, mas não seus exemplos.",
    imagem: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "rita-de-cassia",
    nome: "Santa Rita de Cássia",
    titulo: "Religiosa Agostiniana",
    data: "22/05",
    seculo: "XIV–XV",
    padroeiro: "Causas impossíveis",
    resumo: "A santa das causas impossíveis, esposa, mãe e religiosa.",
    biografia:
      "Margherita Lotti (1381–1457), nasceu em Cássia, Úmbria. Casada à força, suportou um marido violento e perdoou seus assassinos. Após a morte dos filhos, entrou no mosteiro agostiniano. Recebeu um estigma na fronte. Canonizada em 1900.",
    virtudes: ["Perdão", "Paciência", "Esperança contra toda esperança"],
    frase: "Pelos vossos santos méritos, ó Pai, dignai-vos atender-me.",
  },
  {
    slug: "teresa-davila",
    nome: "Santa Teresa d'Ávila",
    titulo: "Doutora da Igreja, reformadora do Carmelo",
    data: "15/10",
    seculo: "XVI",
    padroeiro: "Carmelitas, escritores espanhóis",
    resumo: "Mística e reformadora; mestra da oração contemplativa.",
    biografia:
      "Nascida em Ávila em 1515, carmelita, reformou a Ordem (Carmelitas Descalços) junto com São João da Cruz. Suas obras 'Castelo Interior' e 'Caminho de Perfeição' são clássicos da mística. Primeira mulher proclamada Doutora da Igreja (1970).",
    virtudes: ["Vida interior", "Coragem reformadora", "Senso de humor"],
    frase: "Nada te perturbe, nada te espante; só Deus basta.",
    imagem: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "joao-da-cruz",
    nome: "São João da Cruz",
    titulo: "Doutor Místico",
    data: "14/12",
    seculo: "XVI",
    padroeiro: "Místicos, poetas espanhóis",
    resumo: "Mestre da noite escura da alma; poeta da união divina.",
    biografia:
      "Juan de Yepes (1542–1591) reformou o Carmelo masculino com Santa Teresa. Sofreu cárcere de seus próprios irmãos, ali compondo o 'Cântico Espiritual'. Doutor da Igreja em 1926.",
    virtudes: ["Renúncia interior", "Profundidade contemplativa"],
    frase: "Para chegar a possuir tudo, não queiras possuir coisa alguma.",
  },
  {
    slug: "inacio-de-loyola",
    nome: "Santo Inácio de Loyola",
    titulo: "Fundador da Companhia de Jesus",
    data: "31/07",
    seculo: "XVI",
    padroeiro: "Soldados, retiros espirituais",
    resumo: "Soldado convertido em mestre dos Exercícios Espirituais.",
    biografia:
      "Iñigo de Loyola (1491–1556), basco, ferido em Pamplona, converteu-se durante a convalescença. Compôs os Exercícios Espirituais e fundou a Companhia de Jesus em 1540, instrumento decisivo da Contrarreforma e das missões.",
    virtudes: ["Discernimento", "Magnanimidade", "Indiferença ordenada"],
    frase: "Tudo para a maior glória de Deus.",
  },
  {
    slug: "maria-goretti",
    nome: "Santa Maria Goretti",
    titulo: "Virgem e mártir",
    data: "06/07",
    seculo: "XX",
    padroeiro: "Jovens, vítimas de violência, pureza",
    resumo: "Mártir da pureza aos doze anos, perdoou seu agressor.",
    biografia:
      "Maria Teresa Goretti (1890–1902) foi atacada por Alessandro Serenelli em Nettuno, Itália. Resistiu até a morte para preservar a castidade. Antes de morrer perdoou o agressor, que mais tarde se converteu. Canonizada em 1950.",
    virtudes: ["Pureza", "Coragem", "Perdão heroico"],
    frase: "Pelo amor de Jesus, eu o perdoo.",
  },
  {
    slug: "madre-teresa",
    nome: "Santa Teresa de Calcutá",
    titulo: "Fundadora das Missionárias da Caridade",
    data: "05/09",
    seculo: "XX",
    padroeiro: "Missionários da caridade",
    resumo: "Apóstola dos mais pobres entre os pobres.",
    biografia:
      "Agnes Bojaxhiu (1910–1997), albanesa, religiosa. Em 1946 recebeu 'a chamada dentro da chamada' para servir os agonizantes de Calcutá. Fundou as Missionárias da Caridade. Nobel da Paz em 1979. Canonizada em 2016.",
    virtudes: ["Caridade radical", "Fé na noite escura", "Sorriso"],
    frase: "Não podemos fazer grandes coisas, apenas pequenas coisas com grande amor.",
  },
  {
    slug: "jeronimo",
    nome: "São Jerônimo",
    titulo: "Doutor da Igreja",
    data: "30/09",
    seculo: "IV–V",
    padroeiro: "Tradutores, bibliotecários, exegetas",
    resumo: "Tradutor da Vulgata; pai da exegese ocidental.",
    biografia:
      "Eusebius Hieronymus (c. 347–420) traduziu a Bíblia para o latim a partir dos originais hebraicos e gregos — a Vulgata —, texto oficial da Igreja por mais de quinze séculos. Viveu como eremita em Belém.",
    virtudes: ["Estudo aplicado", "Penitência", "Amor à Escritura"],
    frase: "A ignorância da Escritura é ignorância de Cristo.",
  },
  {
    slug: "ambrosio",
    nome: "Santo Ambrósio",
    titulo: "Bispo e Doutor da Igreja",
    data: "07/12",
    seculo: "IV",
    padroeiro: "Apicultores, Milão",
    resumo: "O bispo orador que catequizou Santo Agostinho.",
    biografia:
      "Aurelius Ambrosius (c. 339–397), governador civil aclamado bispo de Milão por aclamação popular antes mesmo de ser batizado. Defensor da fé contra o arianismo, mestre da liturgia (rito ambrosiano) e da exegese.",
    virtudes: ["Eloquência", "Firmeza pastoral"],
    frase: "Onde está Pedro, ali está a Igreja.",
  },
  {
    slug: "bento-de-nursia",
    nome: "São Bento de Núrsia",
    titulo: "Patriarca dos monges do Ocidente, Padroeiro da Europa",
    data: "11/07",
    seculo: "V–VI",
    padroeiro: "Europa, monges, agricultores",
    resumo: "Pai do monaquismo ocidental; autor da Regra que organizou a vida cristã pelo 'Ora et Labora'.",
    biografia:
      "Nascido em Núrsia c. 480, fundou Monte Cassino em 529. Sua Regra moldou a civilização cristã do Ocidente. Proclamado Padroeiro da Europa por Paulo VI em 1964.",
    virtudes: ["Discrição (discretio)", "Estabilidade", "Equilíbrio"],
    frase: "Nada anteponhas ao amor de Cristo.",
  },
  {
    slug: "ns-aparecida",
    nome: "Nossa Senhora Aparecida",
    titulo: "Padroeira do Brasil",
    data: "12/10",
    seculo: "XVIII",
    padroeiro: "Brasil",
    resumo: "Pequena imagem de terracota encontrada nas águas do Paraíba do Sul em 1717.",
    biografia:
      "Em outubro de 1717, três pescadores — Domingos Garcia, João Alves e Felipe Pedroso — encontraram a imagem decapitada de Nossa Senhora da Conceição nas águas do rio Paraíba do Sul. As redes, antes vazias, encheram-se de peixes. A devoção cresceu e, em 1930, Pio XI a proclamou Padroeira do Brasil. Seu Santuário em Aparecida (SP) é o maior templo mariano do mundo.",
    virtudes: ["Humildade", "Maternidade espiritual ao povo brasileiro"],
    frase: "Vinde a mim, vós todos que estais aflitos.",
    imagem: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
  },
];

export function getSanto(slug: string) {
  return SANTOS.find((s) => s.slug === slug);
}
