"use client";
import { motion } from "framer-motion";
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  MessageSquare,
  Cpu,
  FileText,
  User,
  Scale,
  Zap,
  Eye,
  Car,
  Home,
  Shield,
  Package,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQItem from "@/components/FAQItem";
import PartnersCarousel from "@/components/PartnersCarousel";
import {
  PHONE,
  PHONE_HREF,
  products,
  steps,
  pillars,
  testimonials,
  faqs,
} from "@/data/mockData";

const STEP_ICONS: Record<string, React.ElementType> = { MessageSquare, Cpu, FileText };
const PILLAR_ICONS: Record<string, React.ElementType> = { User, Scale, Zap, Eye };

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-accent-gold/4 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass-card border border-accent-gold/20 rounded-full px-4 py-2 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-gold" />
                <span className="text-sm text-accent-gold font-medium">Nouveau · Courtage augmenté par IA</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[38px] sm:text-5xl lg:text-[60px] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary"
              >
                Votre courtier intelligent.{" "}
                <span className="text-gradient-gold">Vos économies,</span> en 3 minutes.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-text-secondary leading-relaxed max-w-xl"
              >
                L'IA analyse votre profil, compare{" "}
                <span className="text-text-primary font-semibold">18 assureurs</span>, négocie vos rabais. Vous
                gardez le contrôle, on s'occupe du reste.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="/app"
                  className="btn-gold px-8 py-4 text-base font-semibold inline-flex items-center justify-center gap-2 rounded-btn"
                >
                  Démarrer mon analyse gratuite
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#comment"
                  className="btn-outline px-8 py-4 text-base inline-flex items-center justify-center gap-2 rounded-btn"
                >
                  Voir comment ça marche
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  { icon: CheckCircle, label: "200+ clients satisfaits" },
                  { icon: Star, label: "18 assureurs partenaires" },
                  { icon: Shield, label: "Affilié Groupe Jetté" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Icon size={15} className="text-accent-gold flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Phone */}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                href={PHONE_HREF}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition-colors w-fit"
              >
                <Phone size={15} />
                <span>Préférez parler à un humain ? {PHONE}</span>
              </motion.a>
            </div>

            {/* Right — Agent H card mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-gold/20 to-accent-blue/10 blur-2xl scale-110" />

                {/* Main card */}
                <div className="relative glass-card rounded-2xl p-6 w-96 gold-glow">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-gold to-accent-gold-light flex items-center justify-center">
                      <Zap size={18} className="text-bg-primary" fill="currentColor" />
                    </div>
                    <div>
                      <div className="font-bold text-text-primary">Agent H</div>
                      <div className="text-xs text-accent-green flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
                        En ligne · Analyse en cours
                      </div>
                    </div>
                  </div>

                  {/* Chat bubble */}
                  <div className="bg-bg-primary/50 rounded-xl p-4 mb-4">
                    <p className="text-text-primary text-sm leading-relaxed">
                      Bonjour ! Pour trouver votre meilleure offre, j'aurais besoin de savoir : quel type d'assurance
                      cherchez-vous aujourd'hui ?
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { icon: Car, label: "Auto" },
                      { icon: Home, label: "Habitation" },
                      { icon: Shield, label: "Cybersécurité" },
                      { icon: Package, label: "Multi-produits" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 bg-bg-card border border-accent-gold/10 rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:border-accent-gold/30 hover:text-text-primary transition-colors cursor-pointer"
                      >
                        <Icon size={14} className="text-accent-gold" />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>Question 1 sur 5</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all ${
                            i === 1 ? "w-6 bg-accent-gold" : "w-2 bg-bg-card"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating savings badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 glass-card border border-accent-green/30 rounded-xl px-4 py-3"
                >
                  <div className="text-xs text-text-secondary">Économie estimée</div>
                  <div className="text-xl font-bold text-accent-green">1 240 $/an</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BANDEAU ÉCONOMIES ─────────────────── */}
      <section className="bg-bg-surface border-y border-accent-gold-dim py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl text-text-secondary">
            Nos clients économisent en moyenne{" "}
            <AnimatedCounter
              end={847}
              prefix=""
              suffix=" $/an"
              className="text-3xl sm:text-4xl font-bold text-gradient-gold"
            />{" "}
            sur leur prime annuelle
          </p>
          <p className="text-sm text-text-secondary/60 mt-2">Basé sur les résultats réels de nos 200+ clients en 2024</p>
        </div>
      </section>

      {/* ─── PARTENAIRES ─────────────────────────── */}
      <section className="py-10 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-text-secondary text-sm font-medium uppercase tracking-wider">
            18 assureurs partenaires comparés pour vous
          </p>
        </div>
        <PartnersCarousel />
      </section>

      {/* ─── COMMENT ÇA MARCHE ────────────────────── */}
      <section id="comment" className="section-padding bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Comment ça marche ?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Simple, rapide, sans prise de tête. Votre analyse démarre en moins de 3 minutes.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[step.icon] || MessageSquare;
              return (
                <FadeUp key={step.number} delay={i * 0.12} className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+4rem)] right-[-50%] h-px bg-gradient-to-r from-accent-gold/30 to-transparent z-0" />
                  )}
                  <div className="glass-card rounded-card p-6 flex flex-col gap-4 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-gold/15 flex items-center justify-center flex-shrink-0">
                        <Icon size={22} className="text-accent-gold" />
                      </div>
                      <span className="text-5xl font-bold text-accent-gold/20 leading-none mt-1">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.4} className="text-center mt-10">
            <a
              href="/app"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-btn"
            >
              Démarrer mon analyse gratuite
              <ArrowRight size={18} />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ─── PRODUITS ─────────────────────────────── */}
      <section id="produits" className="section-padding bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Tous vos besoins, un seul courtier
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Auto, habitation, cyber ou les trois : l'IA adapte l'analyse à votre profil unique.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── POURQUOI H COURTAGE AI ───────────────── */}
      <section className="section-padding bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — piliers */}
            <div>
              <FadeUp>
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 tracking-tight">
                  Pourquoi choisir{" "}
                  <span className="text-gradient-gold">H Courtage AI</span> ?
                </h2>
                <p className="text-text-secondary text-lg mb-8">
                  L'efficacité d'un algorithme, l'expertise d'un vrai courtier. Le meilleur des deux mondes.
                </p>
              </FadeUp>

              <div className="grid sm:grid-cols-2 gap-5">
                {pillars.map((pillar, i) => {
                  const Icon = PILLAR_ICONS[pillar.icon] || Zap;
                  return (
                    <FadeUp key={pillar.title} delay={i * 0.1}>
                      <div className="glass-card rounded-card p-5 flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-gold/15 flex items-center justify-center">
                          <Icon size={20} className="text-accent-gold" />
                        </div>
                        <h3 className="font-bold text-text-primary">{pillar.title}</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">{pillar.description}</p>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>

            {/* Right — Houssem card */}
            <FadeUp delay={0.2}>
              <div className="glass-card rounded-2xl p-8 gold-glow text-center flex flex-col items-center gap-6">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-gold/40 to-accent-blue/30 border-2 border-accent-gold/30 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent-gold">HE</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">Houssem El Ghoul</h3>
                  <p className="text-accent-gold text-sm font-medium">Courtier certifié · Groupe Jetté Assurances</p>
                </div>

                <blockquote className="text-text-secondary leading-relaxed italic text-center">
                  "L'IA me permet d'analyser 18 assureurs en quelques secondes — ce qui me prenait des heures. Mais c'est
                  toujours moi qui valide et qui vous explique chaque recommandation. Vous avez un vrai courtier, pas un
                  chatbot."
                </blockquote>

                <div className="flex gap-4 w-full">
                  <a
                    href={PHONE_HREF}
                    className="btn-outline flex-1 py-3 text-sm inline-flex items-center justify-center gap-2 rounded-btn"
                  >
                    <Phone size={16} />
                    {PHONE}
                  </a>
                  <a
                    href="/app"
                    className="btn-gold flex-1 py-3 text-sm inline-flex items-center justify-center rounded-btn font-semibold"
                  >
                    Mon analyse gratuite
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-text-secondary/60">
                  <CheckCircle size={12} className="text-accent-green" />
                  200+ clients · 18 assureurs · Affilié Groupe Jetté
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ──────────────────────────── */}
      <section className="section-padding bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Ils ont magasiné avec{" "}
              <span className="text-gradient-gold">H Courtage AI</span>
            </h2>
            <p className="text-text-secondary text-lg">Des vrais Québécois, des vraies économies.</p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────── */}
      <section className="section-padding bg-bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Questions fréquentes
            </h2>
            <p className="text-text-secondary text-lg">
              On anticipe vos vraies questions. Et on y répond honnêtement.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center mt-10">
            <p className="text-text-secondary mb-4">Vous avez une autre question ?</p>
            <a
              href={PHONE_HREF}
              className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-btn"
            >
              <Phone size={16} />
              Appelez Houssem au {PHONE}
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────── */}
      <section className="py-20 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-3xl sm:text-5xl font-bold text-text-primary mb-6 tracking-tight">
              Prêt à économiser{" "}
              <span className="text-gradient-gold">847 $ cette année</span> ?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              3 minutes d'analyse. 18 assureurs comparés. Zéro engagement. Votre soumission personnalisée dans 24 h.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/app"
                className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-btn"
              >
                Démarrer mon analyse gratuite
                <ArrowRight size={18} />
              </a>
              <a
                href={PHONE_HREF}
                className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 text-base rounded-btn"
              >
                <Phone size={16} />
                {PHONE}
              </a>
            </div>
            <p className="text-text-secondary/50 text-sm mt-6">
              100 % gratuit · Aucune obligation · Données protégées (Loi 25 RGPQ)
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
