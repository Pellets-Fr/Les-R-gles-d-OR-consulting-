import { Phone, Zap } from "lucide-react";
import { PHONE, PHONE_HREF, AFFILIATE } from "@/data/mockData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-surface border-t border-accent-gold-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center">
                <Zap size={16} className="text-bg-primary" fill="currentColor" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-text-primary">H Courtage</span>
                <span className="text-gradient-gold"> AI</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Le premier courtier québécois augmenté par IA. Analyse, compare et négocie pour vous en 3 minutes.
            </p>
            <p className="text-xs text-text-secondary/60 font-medium">{AFFILIATE}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-text-primary text-sm mb-1">Produits</h4>
            {["Assurance Auto", "Assurance Habitation", "Assurance Cybersécurité", "Multi-produits"].map((p) => (
              <a key={p} href="/app" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                {p}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-text-primary text-sm mb-1">Contact</h4>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-accent-gold hover:text-accent-gold-light transition-colors font-semibold"
            >
              <Phone size={16} />
              {PHONE}
            </a>
            <p className="text-text-secondary text-sm">Houssem El Ghoul, courtier certifié</p>
            <p className="text-text-secondary text-sm">Lundi–vendredi, 8 h 30 – 17 h</p>
          </div>
        </div>

        <div className="border-t border-accent-gold-dim pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-text-secondary text-xs">
            © {currentYear} H Courtage AI. Tous droits réservés. {AFFILIATE}
          </p>
          <div className="flex gap-4">
            {["Politique de confidentialité", "Mentions légales", "Loi 25 – RGPQ"].map((link) => (
              <a key={link} href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
