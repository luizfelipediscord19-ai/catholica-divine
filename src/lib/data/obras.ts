/**
 * Acervo de arte sacra em domínio público usado no portal.
 *
 * Todas as reproduções vêm do Wikimedia Commons e são obras de domínio
 * público (autores falecidos há mais de 70 anos). A chave é o nome do arquivo
 * em `src/assets`, sem extensão.
 */
export type Obra = {
  titulo: string;
  autor: string;
  ano: string;
  local?: string;
  /** Página do arquivo no Wikimedia Commons. */
  fonte: string;
};

export const OBRAS: Record<string, Obra> = {
  "hero-catedral": {
    titulo: "Disputa do Santíssimo Sacramento",
    autor: "Rafael Sanzio",
    ano: "1509–1510",
    local: "Stanza della Segnatura, Museus Vaticanos",
    fonte: "https://commons.wikimedia.org/wiki/File:Raphael%27s_Disputation_of_the_Holy_Sacrament.jpg",
  },
  cristo: {
    titulo: "Cristo crucificado",
    autor: "Diego Velázquez",
    ano: "c. 1632",
    local: "Museu do Prado, Madri",
    fonte: "https://commons.wikimedia.org/wiki/File:Cristo_crucificado.jpg",
  },
  maria: {
    titulo: "Imaculada Conceição",
    autor: "Bartolomé Esteban Murillo",
    ano: "c. 1678",
    local: "Museu do Prado, Madri",
    fonte: "https://commons.wikimedia.org/wiki/File:Murillo_immaculate_conception.jpg",
  },
  eucaristia: {
    titulo: "A Última Cena",
    autor: "Juan de Juanes",
    ano: "c. 1562",
    local: "Museu do Prado, Madri",
    fonte:
      "https://commons.wikimedia.org/wiki/File:La_%C3%9Altima_Cena_(Juan_de_Juanes)_(restaurada).jpg",
  },
  sacramentos: {
    titulo: "Os Sete Sacramentos — Eucaristia",
    autor: "Nicolas Poussin",
    ano: "1647",
    local: "National Gallery of Scotland, Edimburgo",
    fonte:
      "https://commons.wikimedia.org/wiki/File:Seven_Sacraments_-_Holy_Eucharist_II_(1647)_-_Poussin_-_NGofScotland.jpg",
  },
  rosario: {
    titulo: "Madonna do Rosário",
    autor: "Caravaggio",
    ano: "1607",
    local: "Kunsthistorisches Museum, Viena",
    fonte: "https://commons.wikimedia.org/wiki/File:Madonna_of_the_Rosary-Caravaggio_(1607).jpg",
  },
  biblioteca: {
    titulo: "Santo Agostinho em seu gabinete de estudo",
    autor: "Sandro Botticelli",
    ano: "c. 1494",
    local: "Uffizi, Florença",
    fonte:
      "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_St_Augustin_dans_son_cabinet_de_travail.jpg",
  },
  manuscrito: {
    titulo: "São Jerônimo escrevendo",
    autor: "Caravaggio",
    ano: "1605–1606",
    local: "Galeria Borghese, Roma",
    fonte: "https://commons.wikimedia.org/wiki/File:Saint_Jerome_Writing-Caravaggio_(1605-6).jpg",
  },
  "santos-gloria": {
    titulo: "Cristo glorificado na corte do Paraíso",
    autor: "Fra Angelico",
    ano: "1423–1424",
    local: "National Gallery, Londres",
    fonte:
      "https://commons.wikimedia.org/wiki/File:Beato_angelico,_cristo_glorificato_nella_corte_del_paradiso,_1423-24,_da_s._domenico,_fiesole_05.jpg",
  },
  doutores: {
    titulo: "Os Quatro Doutores da Igreja Latina",
    autor: "Jacob Jordaens",
    ano: "c. 1620",
    fonte: "https://commons.wikimedia.org/wiki/File:Jacob_Jordaens_-_The_Four_Latin_Church_Fathers.jpg",
  },
  velas: {
    titulo: "Adoração dos Pastores",
    autor: "Gerard van Honthorst",
    ano: "1622",
    fonte:
      "https://commons.wikimedia.org/wiki/File:Gerard_van_Honthorst_-_Adoration_of_the_Shepherds_(1622).jpg",
  },
  claustro: {
    titulo: "Pentecostes",
    autor: "El Greco",
    ano: "c. 1600",
    local: "Museu do Prado, Madri",
    fonte: "https://commons.wikimedia.org/wiki/File:Pentecost%C3%A9s_(El_Greco,_c._1600)_Prado.jpg",
  },
  vitral: {
    titulo: "A entrega das chaves a São Pedro",
    autor: "Pietro Perugino",
    ano: "1481–1482",
    local: "Capela Sistina, Vaticano",
    fonte: "https://commons.wikimedia.org/wiki/File:Entrega_de_las_llaves_a_San_Pedro_(Perugino).jpg",
  },
};

const BASES = Object.keys(OBRAS).sort((a, b) => b.length - a.length);

/** Descobre a obra a partir da URL versionada gerada pelo Vite. */
export function obraDaUrl(url: string | undefined): Obra | null {
  if (!url) return null;
  const arquivo = url.split("/").pop()?.split("?")[0] ?? "";
  const semExt = arquivo.replace(/\.[a-z0-9]+$/i, "");
  const base = BASES.find((b) => semExt === b || semExt.startsWith(`${b}-`));
  return base ? OBRAS[base]! : null;
}

/** Legenda curta: "Título — Autor (ano)". */
export function legendaObra(obra: Obra): string {
  return `${obra.titulo} — ${obra.autor} (${obra.ano})`;
}
