import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer data-chrome="site" className="bg-deep border-t border-gold/30 mt-24">
      <div className="shell py-block grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start">
        <div className="min-w-0 md:col-span-2">
          <h2 className="font-display text-2xl text-gold italic">
            Ad Maiorem Dei Gloriam
          </h2>
          <p className="mt-4 text-sm text-paper/75 max-w-[28rem] leading-relaxed">
            Portal Católico — biblioteca digital fiel ao Magistério da Igreja, dedicada ao
            estudo, à evangelização e à formação na fé católica.
          </p>
          <p className="mt-6 text-[11px] tracking-[0.16em] uppercase text-paper/60">
            © MMXXVI Portal Católico • Biblioteca da Fé
          </p>
        </div>

        <nav aria-label="Doutrina" className="min-w-0">
          <h3 className="kicker mb-4">
            Doutrina
          </h3>
          <ul className="space-y-1 text-sm text-paper/80">
            <li><Link to="/trilhas" className="block py-2 hover:text-gold focus-visible:text-gold">Trilhas de Estudo</Link></li>
            <li><Link to="/fe-catolica" className="block py-2 hover:text-gold focus-visible:text-gold">A Fé Católica</Link></li>
            <li><Link to="/catecismo" className="block py-2 hover:text-gold focus-visible:text-gold">Catecismo</Link></li>
            <li><Link to="/biblia" className="block py-2 hover:text-gold focus-visible:text-gold">Bíblia Sagrada</Link></li>
            <li><Link to="/apologetica" className="block py-2 hover:text-gold focus-visible:text-gold">Apologética</Link></li>
            <li><Link to="/doutores-da-igreja" className="block py-2 hover:text-gold focus-visible:text-gold">Doutores da Igreja</Link></li>
            <li><Link to="/glossario" className="block py-2 hover:text-gold focus-visible:text-gold">Glossário</Link></li>
          </ul>
        </nav>

        <nav aria-label="Vida espiritual" className="min-w-0">
          <h3 className="kicker mb-4">
            Vida Espiritual
          </h3>
          <ul className="space-y-1 text-sm text-paper/80">
            <li><Link to="/oracoes" className="block py-2 hover:text-gold focus-visible:text-gold">Orações</Link></li>
            <li><Link to="/sacramentos" className="block py-2 hover:text-gold focus-visible:text-gold">Sacramentos</Link></li>
            <li><Link to="/santos" className="block py-2 hover:text-gold focus-visible:text-gold">Santos</Link></li>
            <li><Link to="/maria" className="block py-2 hover:text-gold focus-visible:text-gold">Maria Santíssima</Link></li>
            <li><Link to="/calendario-liturgico" className="block py-2 hover:text-gold focus-visible:text-gold">Calendário Litúrgico</Link></li>
          </ul>

          <h3 className="kicker mt-8 mb-4">
            Institucional
          </h3>
          <ul className="space-y-1 text-sm text-paper/80">
            <li><Link to="/sobre" className="block py-2 hover:text-gold focus-visible:text-gold">Sobre o Portal</Link></li>
            <li><Link to="/busca" className="block py-2 hover:text-gold focus-visible:text-gold">Busca Avançada</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-gold/15">
        <div className="shell py-block-sm text-[11px] tracking-widest uppercase text-paper/55 text-center">
          Fontes oficiais: vatican.va · cnbb.org.br · Catecismo da Igreja Católica
        </div>
      </div>
    </footer>
  );
}
