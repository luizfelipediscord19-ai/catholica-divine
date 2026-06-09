import { useEffect, useMemo, useState } from "react";
import { Star, Calendar, Palette } from "lucide-react";

export type TempoLiturgico = {
  slug: string;
  nome: string;
  cor: string;
  corHex: string;
  inicio: string;
  fim: string;
  resumo: string;
  destaques: { data: string; titulo: string; nota?: string }[];
  fonte: string;
};

/** Ciclo 2025–2026 (Ano Litúrgico C → A; Tempo Comum ímpar). Datas conforme
 *  Normas Universais sobre o Ano Litúrgico e o Calendário (Paulo VI, 1969). */
export const TEMPOS: TempoLiturgico[] = [
  {
    slug: "advento",
    nome: "Advento",
    cor: "Roxo",
    corHex: "#5b2a86",
    inicio: "30 nov 2025",
    fim: "24 dez 2025",
    resumo:
      "Quatro semanas de preparação para o Natal e para a vinda escatológica do Senhor. O 3.º Domingo (Gaudete) admite cor rósea.",
    destaques: [
      { data: "30 nov 2025", titulo: "I Domingo do Advento — início do Ano Litúrgico (Ano A)" },
      { data: "08 dez 2025", titulo: "Solenidade da Imaculada Conceição" },
      { data: "12 dez 2025", titulo: "Festa de Nossa Senhora de Guadalupe" },
      { data: "14 dez 2025", titulo: "III Domingo (Gaudete) — cor rósea facultativa" },
      { data: "17–24 dez 2025", titulo: "Antífonas em “Ó” (Sapientia, Adonai, Radix, Clavis, Oriens, Rex, Emmanuel)" },
    ],
    fonte: "Normas Universais nn. 39–42; Caeremoniale Episcoporum n. 235",
  },
  {
    slug: "natal",
    nome: "Tempo do Natal",
    cor: "Branco / Ouro",
    corHex: "#e9d8a6",
    inicio: "25 dez 2025",
    fim: "11 jan 2026",
    resumo:
      "Vai das I Vésperas do Natal até o Domingo do Batismo do Senhor. Oitava com solenidades marianas e festas dos santos próximos ao Presépio.",
    destaques: [
      { data: "25 dez 2025", titulo: "Natividade do Senhor (Solenidade)" },
      { data: "26 dez 2025", titulo: "Santo Estêvão, protomártir" },
      { data: "28 dez 2025", titulo: "Sagrada Família" },
      { data: "01 jan 2026", titulo: "Santa Maria, Mãe de Deus (oitava)" },
      { data: "04 jan 2026", titulo: "Epifania do Senhor (Brasil)" },
      { data: "11 jan 2026", titulo: "Batismo do Senhor — encerra o Natal" },
    ],
    fonte: "Normas Universais nn. 32–38",
  },
  {
    slug: "comum-1",
    nome: "Tempo Comum (I)",
    cor: "Verde",
    corHex: "#3a7d44",
    inicio: "12 jan 2026",
    fim: "17 fev 2026",
    resumo:
      "Da segunda-feira após o Batismo do Senhor até a véspera da Quarta-feira de Cinzas. Mistério de Cristo em sua plenitude e na vida da Igreja.",
    destaques: [
      { data: "25 jan 2026", titulo: "Conversão de São Paulo (Festa)" },
      { data: "02 fev 2026", titulo: "Apresentação do Senhor" },
      { data: "11 fev 2026", titulo: "Nossa Senhora de Lourdes — Dia Mundial do Enfermo" },
    ],
    fonte: "Normas Universais nn. 43–44",
  },
  {
    slug: "quaresma",
    nome: "Quaresma",
    cor: "Roxo",
    corHex: "#5b2a86",
    inicio: "18 fev 2026",
    fim: "01 abr 2026",
    resumo:
      "Quarenta dias de preparação batismal e penitencial para a Páscoa. Suprime-se o Aleluia e o Glória; suspendem-se as flores no altar e o som de instrumentos (salvo para sustentar o canto).",
    destaques: [
      { data: "18 fev 2026", titulo: "Quarta-feira de Cinzas — jejum e abstinência" },
      { data: "22 fev 2026", titulo: "I Domingo da Quaresma" },
      { data: "15 mar 2026", titulo: "IV Domingo (Laetare) — cor rósea facultativa" },
      { data: "25 mar 2026", titulo: "Solenidade da Anunciação do Senhor" },
      { data: "29 mar 2026", titulo: "Domingo de Ramos e da Paixão do Senhor" },
    ],
    fonte: "Paschalis Sollemnitatis (1988); Normas Universais nn. 27–31",
  },
  {
    slug: "triduo",
    nome: "Tríduo Pascal",
    cor: "Branco / Vermelho",
    corHex: "#b91c1c",
    inicio: "02 abr 2026",
    fim: "04 abr 2026",
    resumo:
      "O ápice de todo o Ano Litúrgico. Começa com a Missa Vespertina da Ceia do Senhor, tem seu coração na Vigília Pascal e termina nas Vésperas do Domingo da Ressurreição.",
    destaques: [
      { data: "02 abr 2026", titulo: "Quinta-feira Santa — Missa Crismal (manhã) e Ceia do Senhor (tarde)" },
      { data: "03 abr 2026", titulo: "Sexta-feira da Paixão — Ação Litúrgica; jejum e abstinência" },
      { data: "04 abr 2026", titulo: "Sábado Santo — silêncio; Vigília Pascal “mãe de todas as vigílias”" },
    ],
    fonte: "Sacrosanctum Concilium 5; Paschalis Sollemnitatis 38–97",
  },
  {
    slug: "pascoa",
    nome: "Tempo Pascal",
    cor: "Branco",
    corHex: "#f7f3e8",
    inicio: "05 abr 2026",
    fim: "24 mai 2026",
    resumo:
      "Cinquenta dias celebrados “como um só dia de festa, como um grande domingo” (SC 22). O círio pascal arde junto ao ambão.",
    destaques: [
      { data: "05 abr 2026", titulo: "Domingo da Ressurreição do Senhor" },
      { data: "12 abr 2026", titulo: "Domingo da Divina Misericórdia" },
      { data: "14 mai 2026", titulo: "Ascensão do Senhor (transferida ao domingo no Brasil — 17 mai)" },
      { data: "24 mai 2026", titulo: "Pentecostes — Solenidade conclusiva" },
    ],
    fonte: "Normas Universais nn. 22–26",
  },
  {
    slug: "comum-2",
    nome: "Tempo Comum (II)",
    cor: "Verde",
    corHex: "#3a7d44",
    inicio: "25 mai 2026",
    fim: "28 nov 2026",
    resumo:
      "Após Pentecostes retoma-se o Tempo Comum até a véspera do I Domingo do Advento. Inclui as grandes solenidades do Senhor.",
    destaques: [
      { data: "31 mai 2026", titulo: "Santíssima Trindade" },
      { data: "07 jun 2026", titulo: "Corpus Christi (Brasil — domingo seguinte)" },
      { data: "12 jun 2026", titulo: "Sagrado Coração de Jesus" },
      { data: "29 jun 2026", titulo: "São Pedro e São Paulo (Solenidade)" },
      { data: "15 ago 2026", titulo: "Assunção de Nossa Senhora" },
      { data: "01 nov 2026", titulo: "Todos os Santos" },
      { data: "02 nov 2026", titulo: "Fiéis Defuntos" },
      { data: "22 nov 2026", titulo: "Nosso Senhor Jesus Cristo, Rei do Universo — encerra o Ano" },
    ],
    fonte: "Normas Universais nn. 43–44; Calendário Romano Geral",
  },
];

const FAV_KEY = "mapa-liturgico-favoritos-v1";

export function MapaAnoLiturgico() {
  const [ativo, setAtivo] = useState(TEMPOS[0].slug);
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch {}
  }, []);

  const toggleFav = (slug: string) => {
    setFavs((cur) => {
      const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const tempo = useMemo(() => TEMPOS.find((t) => t.slug === ativo)!, [ativo]);
  const isFav = favs.includes(tempo.slug);

  return (
    <div className="not-prose border border-gold/20 bg-card/40 backdrop-blur-sm">
      {/* Navegação por tempo */}
      <div className="flex flex-wrap gap-1 border-b border-gold/15 p-2">
        {TEMPOS.map((t) => {
          const active = t.slug === ativo;
          const fav = favs.includes(t.slug);
          return (
            <button
              key={t.slug}
              onClick={() => setAtivo(t.slug)}
              className={`relative flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                active ? "bg-gold/15 text-gold" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <span
                aria-hidden
                className="inline-block size-2.5 rounded-full border border-foreground/30"
                style={{ background: t.corHex }}
              />
              {t.nome}
              {fav ? <Star className="size-3 fill-gold text-gold" /> : null}
            </button>
          );
        })}
      </div>

      {/* Conteúdo do tempo ativo */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-2">Tempo litúrgico</p>
            <h3 className="font-display text-3xl text-foreground">{tempo.nome}</h3>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5 text-gold/80" /> {tempo.inicio} — {tempo.fim}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Palette className="size-3.5 text-gold/80" /> {tempo.cor}
              </span>
            </div>
          </div>
          <button
            onClick={() => toggleFav(tempo.slug)}
            aria-pressed={isFav}
            className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] uppercase tracking-[0.25em] transition-colors ${
              isFav
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold/30 text-foreground/80 hover:border-gold hover:text-gold"
            }`}
          >
            <Star className={`size-3.5 ${isFav ? "fill-gold" : ""}`} />
            {isFav ? "Favorito" : "Favoritar"}
          </button>
        </div>

        <p className="text-sm text-foreground/85 leading-relaxed max-w-3xl">{tempo.resumo}</p>

        <div className="mt-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Destaques do tempo</p>
          <ul className="divide-y divide-gold/10 border-y border-gold/10">
            {tempo.destaques.map((d) => (
              <li key={d.titulo} className="grid grid-cols-[140px_1fr] gap-4 py-3 text-sm">
                <span className="text-xs text-gold/90 tracking-wider">{d.data}</span>
                <span className="text-foreground/90">
                  {d.titulo}
                  {d.nota ? <em className="block text-xs text-muted-foreground mt-1">{d.nota}</em> : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-muted-foreground italic">Fonte: {tempo.fonte}</p>
        </div>
      </div>

      {favs.length > 0 ? (
        <div className="border-t border-gold/15 px-6 py-4 text-xs text-muted-foreground">
          <span className="text-gold/80 uppercase tracking-[0.25em] text-[10px] mr-3">Seus favoritos</span>
          {favs
            .map((s) => TEMPOS.find((t) => t.slug === s)?.nome)
            .filter(Boolean)
            .join(" · ")}
        </div>
      ) : null}
    </div>
  );
}
