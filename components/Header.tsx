"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Zap } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/data/mockData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Particuliers", href: "#produits" },
    { label: "Entreprises", href: "#contact" },
    { label: "Comment ça marche", href: "#comment" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/90 backdrop-blur-xl border-b border-accent-gold-dim shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center">
              <Zap size={16} className="text-bg-primary" fill="currentColor" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-text-primary">H Courtage</span>
              <span className="text-gradient-gold"> AI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/app"
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
            >
              Connexion
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition-colors duration-200"
            >
              <Phone size={16} />
              {PHONE}
            </a>
            <a
              href="/app"
              className="btn-gold px-5 py-2.5 text-sm rounded-btn font-semibold"
            >
              Démarrer gratuitement
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-bg-surface border-t border-accent-gold-dim overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-text-primary py-2 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-accent-gold font-semibold py-2"
              >
                <Phone size={18} />
                {PHONE}
              </a>
              <a
                href="/app"
                className="btn-gold px-5 py-3 text-center rounded-btn font-semibold"
              >
                Démarrer mon analyse gratuite
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
