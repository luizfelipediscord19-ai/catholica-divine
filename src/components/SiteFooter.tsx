import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-deep border-t border-gold/30 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-display text-2xl text-gold italic">
            Ad Maiorem Dei Gloriam
          </span>
          <p className="mt-4 text-sm text-paper/60 max-w-md leading-relaxed">
            Portal Católico — biblioteca digital fiel ao Magistério da Igreja, dedicada ao
            estudo, à evangelização e à formação na fé católica.
          </p>
          <p className="mt-6 text-[10px] tracking-[0.2em] uppercase text-paper/40">
            © MMXXVI Portal Católico • Biblioteca da Fé
          </p>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
            Doutrina
          </h4>
          <ul className="space-y-2 text-sm text-paper/70">
            <li><Link to="/fe-catolica" className="hover:text-gold">A Fé Católica</Link></li>
            <li><Link to="/catecismo" className="hover:text-gold">Catecismo</Link></li>
            <li><Link to="/biblia" className="hover:text-gold">Bíblia Sagrada</Link></li>
            <li><Link to="/apologetica" className="hover:text-gold">Apologética</Link></li>
            <li><Link to="/doutores-da-igreja" className="hover:text-gold">Doutores</Link></li>
            <li><Link to="/glossario" className="hover:text-gold">Glossário</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
            Vida Espiritual
          </h4>
          <ul className="space-y-2 text-sm text-paper/70">
            <li><Link to="/oracoes" className="hover:text-gold">Orações</Link></li>
            <li><Link to="/sacramentos" className="hover:text-gold">Sacramentos</Link></li>
            <li><Link to="/santos" className="hover:text-gold">Santos</Link></li>
            <li><Link to="/maria" className="hover:text-gold">Maria Santíssima</Link></li>
            <li><Link to="/calendario-liturgico" className="hover:text-gold">Calendário</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 py-4 text-[10px] tracking-widest uppercase text-paper/30 text-center">
          Fontes oficiais: vatican.va · cnbb.org.br · Catecismo da Igreja Católica
        </div>
      </div>
    </footer>
  );
}
