"use client";
import { motion } from "framer-motion";
import { Check, X, Star, Phone, ArrowRight, Award, Mail } from "lucide-react";
import { quoteOffers, PHONE, PHONE_HREF } from "@/data/mockData";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? "fill-accent-gold text-accent-gold" : "text-white/20 fill-white/20"}
        />
      ))}
      <span className="text-xs text-text-secondary ml-1">{rating}/5</span>
    </div>
  );
}

const coverageLabels = [
  "Responsabilité civile 2 M$",
  "Collision et renversement",
  "Vol et tentative de vol",
  "Véhicule de remplacement",
  "Protection cybersécurité",
  "Assistance routière 24/7",
  "Bris de vitres sans franchise",
];

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-gold/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 glass-card border border-accent-gold/20 rounded-full px-4 py-2 mb-4">
            <Award size={15} className="text-accent-gold" />
            <span className="text-sm text-accent-gold font-medium">Agent H a sélectionné vos 3 meilleures offres</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 tracking-tight">
            Vos <span className="text-gradient-gold">3 soumissions</span> personnalisées
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Comparaison transparente, ligne par ligne. L'offre recommandée vous fait économiser le plus tout en offrant
            la meilleure couverture.
          </p>
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="lg:hidden flex flex-col gap-5">
          {quoteOffers.map((offer, i) => (
            <motion.div
              key={offer.insurer}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-6 relative ${
                offer.recommended ? "border border-accent-gold/40 gold-glow" : ""
              }`}
            >
              {offer.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-gold text-bg-primary text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5">
                  <Award size={12} />
                  Recommandé par Agent H
                </div>
              )}

              {/* Insurer */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-bg-primary border border-white/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent-gold">{offer.logo}</span>
                </div>
                <div>
                  <div className="font-bold text-text-primary">{offer.insurer}</div>
                  <StarRating rating={offer.clientRating} />
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <div className={`text-3xl font-bold ${offer.recommended ? "text-gradient-gold" : "text-text-primary"}`}>
                  {offer.monthlyPremium} $
                  <span className="text-base font-normal text-text-secondary">/mois</span>
                </div>
                <div className="text-sm text-text-secondary">{offer.annualPremium} $/an · Franchise {offer.deductible} $</div>
              </div>

              {/* Coverages */}
              <ul className="space-y-2 mb-4">
                {offer.coverages.map((cov, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    {cov.included ? (
                      <Check size={14} className="text-accent-green flex-shrink-0" />
                    ) : (
                      <X size={14} className="text-red-400/60 flex-shrink-0" />
                    )}
                    <span className={cov.included ? "text-text-primary" : "text-text-secondary/50 line-through"}>{cov.label}</span>
                  </li>
                ))}
              </ul>

              {offer.recommended && (
                <a
                  href="#calendly"
                  className="btn-gold w-full py-3 text-sm font-semibold rounded-btn inline-flex items-center justify-center gap-2"
                >
                  Choisir cette offre
                  <ArrowRight size={16} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Desktop: comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hidden lg:block"
        >
          <div className="grid grid-cols-3 gap-4">
            {quoteOffers.map((offer, i) => (
              <div
                key={offer.insurer}
                className={`glass-card rounded-2xl overflow-hidden relative ${
                  offer.recommended ? "border border-accent-gold/40 gold-glow" : ""
                }`}
              >
                {offer.recommended && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold to-accent-gold-light" />
                )}

                {/* Card header */}
                <div className={`p-6 pb-4 ${offer.recommended ? "bg-accent-gold/5" : ""}`}>
                  {offer.recommended && (
                    <div className="inline-flex items-center gap-1.5 bg-accent-gold/15 border border-accent-gold/30 text-accent-gold text-xs font-bold px-3 py-1 rounded-full mb-3">
                      <Award size={12} />
                      Recommandé par Agent H
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-bg-primary border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-accent-gold">{offer.logo}</span>
                    </div>
                    <div>
                      <div className="font-bold text-text-primary text-sm">{offer.insurer}</div>
                      <StarRating rating={offer.clientRating} />
                    </div>
                  </div>

                  <div className={`text-4xl font-bold mb-1 ${offer.recommended ? "text-gradient-gold" : "text-text-primary"}`}>
                    {offer.monthlyPremium} $
                    <span className="text-sm font-normal text-text-secondary">/mois</span>
                  </div>
                  <div className="text-sm text-text-secondary">{offer.annualPremium} $/an</div>
                  <div className="text-sm text-text-secondary">Franchise : {offer.deductible} $</div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5" />

                {/* Coverages */}
                <div className="p-6 pt-4 flex flex-col gap-2.5">
                  {offer.coverages.map((cov, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm">
                      {cov.included ? (
                        <div className="w-4 h-4 rounded-full bg-accent-green/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} className="text-accent-green" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X size={10} className="text-red-400/60" />
                        </div>
                      )}
                      <span className={cov.included ? "text-text-primary" : "text-text-secondary/40 line-through"}>
                        {cov.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {offer.recommended && (
                  <div className="px-6 pb-6">
                    <a
                      href="#calendly"
                      className="btn-gold w-full py-3 text-sm font-semibold rounded-btn inline-flex items-center justify-center gap-2"
                    >
                      Choisir cette offre
                      <ArrowRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Callback section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 glass-card rounded-2xl p-8 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-gold/40 to-accent-blue/30 border-2 border-accent-gold/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-bold text-accent-gold">HE</span>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Une question sur ces soumissions ?
          </h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Houssem vous rappelle dans l'heure pour vous expliquer chaque offre et vous aider à choisir en toute
            confiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              id="calendly"
              href={PHONE_HREF}
              className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-btn"
            >
              <Phone size={16} />
              Réserver un appel avec Houssem
            </a>
            <button className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-btn">
              <Mail size={16} />
              Recevoir par courriel
            </button>
          </div>
          <p className="text-xs text-text-secondary/50 mt-4">
            {PHONE} · Lundi–vendredi 8 h 30 – 17 h · Rappel garanti dans l'heure
          </p>
        </motion.div>

        {/* Back to landing */}
        <div className="text-center mt-8">
          <a href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
