export type Misterio = { num: number; titulo: string; fruto: string; referencia: string };
export type ConjuntoMisterios = {
  slug: "gozosos" | "luminosos" | "dolorosos" | "gloriosos";
  nome: string;
  dia: string;
  cor: string;
  misterios: Misterio[];
};

export const CONJUNTOS: ConjuntoMisterios[] = [
  {
    slug: "gozosos",
    nome: "Mistérios Gozosos",
    dia: "Segundas e sábados",
    cor: "Branco",
    misterios: [
      { num: 1, titulo: "A Anunciação do Anjo a Maria", fruto: "Humildade", referencia: "Lc 1,26-38" },
      { num: 2, titulo: "A Visitação de Maria a Isabel", fruto: "Caridade fraterna", referencia: "Lc 1,39-56" },
      { num: 3, titulo: "O Nascimento de Jesus em Belém", fruto: "Pobreza de espírito", referencia: "Lc 2,1-20" },
      { num: 4, titulo: "A Apresentação de Jesus no Templo", fruto: "Obediência", referencia: "Lc 2,22-39" },
      { num: 5, titulo: "Jesus encontrado no Templo entre os doutores", fruto: "Busca de Deus", referencia: "Lc 2,41-52" },
    ],
  },
  {
    slug: "luminosos",
    nome: "Mistérios Luminosos",
    dia: "Quintas-feiras",
    cor: "Verde",
    misterios: [
      { num: 1, titulo: "O Batismo de Jesus no Jordão", fruto: "Abertura ao Espírito", referencia: "Mt 3,13-17" },
      { num: 2, titulo: "A Autorrevelação nas Bodas de Caná", fruto: "Confiança em Maria", referencia: "Jo 2,1-11" },
      { num: 3, titulo: "O Anúncio do Reino e o convite à conversão", fruto: "Conversão", referencia: "Mc 1,14-15" },
      { num: 4, titulo: "A Transfiguração no Monte Tabor", fruto: "Desejo da santidade", referencia: "Lc 9,28-36" },
      { num: 5, titulo: "A Instituição da Eucaristia", fruto: "Amor à Eucaristia", referencia: "Lc 22,14-20" },
    ],
  },
  {
    slug: "dolorosos",
    nome: "Mistérios Dolorosos",
    dia: "Terças e sextas-feiras",
    cor: "Roxo",
    misterios: [
      { num: 1, titulo: "A Agonia de Jesus no Horto", fruto: "Contrição dos pecados", referencia: "Lc 22,39-46" },
      { num: 2, titulo: "A Flagelação", fruto: "Mortificação dos sentidos", referencia: "Jo 19,1" },
      { num: 3, titulo: "A Coroação de espinhos", fruto: "Domínio do orgulho", referencia: "Mt 27,27-31" },
      { num: 4, titulo: "Jesus carrega a cruz até o Calvário", fruto: "Paciência nas provações", referencia: "Jo 19,16-17" },
      { num: 5, titulo: "A Crucifixão e morte de Jesus", fruto: "Perdão e amor ao Senhor", referencia: "Jo 19,18-30" },
    ],
  },
  {
    slug: "gloriosos",
    nome: "Mistérios Gloriosos",
    dia: "Quartas-feiras e domingos",
    cor: "Dourado",
    misterios: [
      { num: 1, titulo: "A Ressurreição de Jesus", fruto: "Fé", referencia: "Mt 28,1-10" },
      { num: 2, titulo: "A Ascensão do Senhor ao Céu", fruto: "Esperança", referencia: "At 1,6-11" },
      { num: 3, titulo: "A Vinda do Espírito Santo sobre Maria e os Apóstolos", fruto: "Dons do Espírito", referencia: "At 2,1-13" },
      { num: 4, titulo: "A Assunção de Maria ao Céu", fruto: "Devoção a Maria", referencia: "Ap 12,1" },
      { num: 5, titulo: "A Coroação de Maria como Rainha do Céu e da Terra", fruto: "Perseverança final", referencia: "Ap 12,1" },
    ],
  },
];

export function conjuntoDoDia(date = new Date()): ConjuntoMisterios {
  const d = date.getDay();
  if (d === 1 || d === 6) return CONJUNTOS[0];
  if (d === 4) return CONJUNTOS[1];
  if (d === 2 || d === 5) return CONJUNTOS[2];
  return CONJUNTOS[3];
}

export const ORACOES_BASE = {
  sinalCruz: "Em nome do Pai, e do Filho, e do Espírito Santo. Amém.",
  credo:
    "Creio em Deus Pai todo-poderoso, Criador do céu e da terra, e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos; ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  paiNosso:
    "Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  aveMaria:
    "Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
  gloria:
    "Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.",
  fatima:
    "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno; levai as almas todas para o Céu, principalmente as que mais precisarem da vossa misericórdia.",
  salveRainha:
    "Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém.",
};
