import { useEffect, useMemo, useState } from "react";
import { Copy, Heart, Printer, Calendar as CalIcon, Check } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/** Curated list of 31 Scripture verses (Ave-Maria pt-BR), one per day-of-month.
 * Source: Bíblia Sagrada — tradução Ave-Maria (Editora Ave-Maria). */
const VERSICULOS = [
  { ref: "Sl 23,1", livro: "Salmos", cap: 23, vers: 1, texto: "O Senhor é meu pastor, nada me faltará." },
  { ref: "Jo 3,16", livro: "João", cap: 3, vers: 16, texto: "Deus amou tanto o mundo que entregou seu Filho único, para que todo o que nele crer não pereça, mas tenha a vida eterna." },
  { ref: "Mt 11,28", livro: "Mateus", cap: 11, vers: 28, texto: "Vinde a mim, todos vós que estais cansados sob o peso do vosso fardo, e eu vos aliviarei." },
  { ref: "Fl 4,13", livro: "Filipenses", cap: 4, vers: 13, texto: "Tudo posso naquele que me conforta." },
  { ref: "Pr 3,5", livro: "Provérbios", cap: 3, vers: 5, texto: "Confia no Senhor de todo o teu coração e não te firmes em tua própria sabedoria." },
  { ref: "Is 41,10", livro: "Isaías", cap: 41, vers: 10, texto: "Não temas, porque estou contigo; não lances olhares ansiosos, pois eu sou o teu Deus." },
  { ref: "Rm 8,28", livro: "Romanos", cap: 8, vers: 28, texto: "Sabemos que todas as coisas concorrem para o bem daqueles que amam a Deus." },
  { ref: "Mt 5,8", livro: "Mateus", cap: 5, vers: 8, texto: "Bem-aventurados os puros de coração, porque verão a Deus." },
  { ref: "1Cor 13,4", livro: "1 Coríntios", cap: 13, vers: 4, texto: "A caridade é paciente, a caridade é bondosa. Não tem inveja. A caridade não é orgulhosa." },
  { ref: "Sl 27,1", livro: "Salmos", cap: 27, vers: 1, texto: "O Senhor é minha luz e minha salvação: a quem temerei?" },
  { ref: "Jo 14,6", livro: "João", cap: 14, vers: 6, texto: "Eu sou o caminho, a verdade e a vida. Ninguém vai ao Pai senão por mim." },
  { ref: "Mt 6,33", livro: "Mateus", cap: 6, vers: 33, texto: "Buscai em primeiro lugar o Reino de Deus e a sua justiça, e tudo o mais vos será dado por acréscimo." },
  { ref: "Tg 1,12", livro: "Tiago", cap: 1, vers: 12, texto: "Bem-aventurado o homem que suporta a provação, porque, depois de aprovado, receberá a coroa da vida." },
  { ref: "Sl 51,12", livro: "Salmos", cap: 51, vers: 12, texto: "Criai em mim, ó Deus, um coração puro, e renovai dentro de mim um espírito firme." },
  { ref: "Lc 1,38", livro: "Lucas", cap: 1, vers: 38, texto: "Eis aqui a serva do Senhor. Faça-se em mim segundo a tua palavra." },
  { ref: "1Pd 5,7", livro: "1 Pedro", cap: 5, vers: 7, texto: "Depositai nele todas as vossas preocupações, porque ele tem cuidado de vós." },
  { ref: "Hb 11,1", livro: "Hebreus", cap: 11, vers: 1, texto: "A fé é o fundamento das coisas que se esperam, prova das que não se veem." },
  { ref: "Sl 119,105", livro: "Salmos", cap: 119, vers: 105, texto: "Vossa palavra é um facho que ilumina meus passos, uma luz em meu caminho." },
  { ref: "Jo 8,32", livro: "João", cap: 8, vers: 32, texto: "Conhecereis a verdade, e a verdade vos libertará." },
  { ref: "Mt 28,20", livro: "Mateus", cap: 28, vers: 20, texto: "Eis que estou convosco todos os dias até o fim do mundo." },
  { ref: "Gl 5,22", livro: "Gálatas", cap: 5, vers: 22, texto: "O fruto do Espírito é amor, alegria, paz, paciência, afabilidade, bondade, fidelidade." },
  { ref: "Ef 4,32", livro: "Efésios", cap: 4, vers: 32, texto: "Sede bons uns para com os outros; sede compassivos. Perdoai-vos mutuamente, como também Deus vos perdoou em Cristo." },
  { ref: "Mt 7,7", livro: "Mateus", cap: 7, vers: 7, texto: "Pedi e se vos dará; buscai e achareis; batei e vos será aberto." },
  { ref: "Sl 46,2", livro: "Salmos", cap: 46, vers: 2, texto: "Deus é nosso refúgio e nossa força, sempre pronto a nos socorrer na tribulação." },
  { ref: "1Jo 4,8", livro: "1 João", cap: 4, vers: 8, texto: "Aquele que não ama não conhece a Deus, porque Deus é amor." },
  { ref: "Lc 6,38", livro: "Lucas", cap: 6, vers: 38, texto: "Dai e vos será dado; uma boa medida, calcada, sacudida, transbordante derramarão em vosso seio." },
  { ref: "Jr 29,11", livro: "Jeremias", cap: 29, vers: 11, texto: "Conheço os desígnios que tenho a vosso respeito: desígnios de prosperidade, e não de calamidade, em vos dar futuro e esperança." },
  { ref: "Sl 34,9", livro: "Salmos", cap: 34, vers: 9, texto: "Provai e vede como o Senhor é bom; feliz o homem que nele se refugia." },
  { ref: "Mt 22,37", livro: "Mateus", cap: 22, vers: 37, texto: "Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todo o teu espírito." },
  { ref: "Sl 91,11", livro: "Salmos", cap: 91, vers: 11, texto: "Aos seus anjos ele ordenou que te guardem em todos os teus caminhos." },
  { ref: "Ap 21,4", livro: "Apocalipse", cap: 21, vers: 4, texto: "Ele enxugará toda lágrima dos seus olhos; e não haverá mais morte, nem luto, nem clamor, nem dor." },
];

const FAV_KEY = "versiculo-favoritos";

export function VersiculoDoDia() {
  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);
  const [dateIso, setDateIso] = useState(todayIso);
  const [favs, setFavs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const versiculo = useMemo(() => {
    const d = parseISO(dateIso);
    const day = d.getDate();
    return VERSICULOS[(day - 1) % VERSICULOS.length];
  }, [dateIso]);

  const isFav = favs.includes(versiculo.ref);
  const dataFormatada = format(parseISO(dateIso), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });

  function toggleFav() {
    const next = isFav ? favs.filter((r) => r !== versiculo.ref) : [...favs, versiculo.ref];
    setFavs(next);
    try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }

  async function copy() {
    const text = `“${versiculo.texto}” — ${versiculo.ref} (Bíblia Sagrada, tradução Ave-Maria)`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }

  function printVerse() {
    const w = window.open("", "_blank", "width=600,height=400");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>${versiculo.ref}</title>
      <style>body{font-family:Georgia,serif;padding:60px;color:#111;line-height:1.6}
      blockquote{font-size:22px;font-style:italic;border-left:3px solid #b8860b;padding-left:20px;margin:0 0 24px}
      cite{display:block;margin-top:16px;font-style:normal;letter-spacing:.18em;text-transform:uppercase;font-size:12px;color:#666}
      small{display:block;margin-top:32px;color:#888;font-size:11px}</style></head>
      <body><blockquote>“${versiculo.texto}”<cite>— ${versiculo.ref}</cite></blockquote>
      <small>${dataFormatada} · Bíblia Sagrada, tradução Ave-Maria · Portal Católico</small>
      <script>window.onload=()=>window.print();</script></body></html>`);
    w.document.close();
  }

  return (
    <div className="border border-gold/25 bg-card/60 backdrop-blur-sm p-6 md:p-10 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Versículo do dia</p>
        <label className="inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <CalIcon className="size-3.5 text-gold/70" />
          <input
            type="date"
            value={dateIso}
            onChange={(e) => setDateIso(e.target.value)}
            className="bg-transparent border border-gold/25 px-2 py-1 text-foreground text-xs focus:outline-none focus:border-gold"
          />
        </label>
      </div>

      <p className="text-xs text-muted-foreground mb-4 capitalize">{dataFormatada}</p>

      <blockquote className="font-display text-2xl md:text-3xl italic leading-snug text-foreground border-l-2 border-gold/70 pl-5">
        “{versiculo.texto}”
      </blockquote>

      <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-gold/80">— {versiculo.ref}</p>
      <p className="mt-1 text-[10px] text-muted-foreground">
        Bíblia Sagrada · tradução <em>Ave-Maria</em> (Editora Ave-Maria)
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 text-[10px] uppercase tracking-[0.25em] text-foreground hover:border-gold hover:text-gold transition-colors"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
        <button
          onClick={toggleFav}
          aria-pressed={isFav}
          className={`inline-flex items-center gap-2 px-4 py-2 border text-[10px] uppercase tracking-[0.25em] transition-colors ${
            isFav
              ? "border-gold text-gold bg-gold/10"
              : "border-gold/30 text-foreground hover:border-gold hover:text-gold"
          }`}
        >
          <Heart className={`size-3.5 ${isFav ? "fill-gold" : ""}`} />
          {isFav ? "Favorito" : "Favoritar"}
        </button>
        <button
          onClick={printVerse}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-deep text-[10px] uppercase tracking-[0.25em] hover:bg-paper transition-colors"
        >
          <Printer className="size-3.5" /> Imprimir
        </button>
      </div>

      {favs.length > 0 ? (
        <div className="mt-6 pt-5 border-t border-gold/15">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">Favoritos salvos</p>
          <p className="text-xs text-muted-foreground">
            {favs.map((r) => (
              <span key={r} className="inline-block mr-2 text-foreground/80">{r}</span>
            ))}
          </p>
        </div>
      ) : null}
    </div>
  );
}
