"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Car, Home, Shield, Package, CheckCircle, Search, Star } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import {
  wizardInsuranceTypes,
  wizardSituations,
  wizardFamilySituations,
  wizardAutoNeeds,
  wizardHabNeeds,
  wizardCyberNeeds,
  PHONE,
  PHONE_HREF,
} from "@/data/mockData";

const ICONS: Record<string, React.ElementType> = { Car, Home, Shield, Package, CheckCircle, Search, Star };

const TOTAL_STEPS = 5;

interface WizardState {
  insuranceType: string;
  situation: string;
  age: string;
  postalCode: string;
  familySituation: string;
  needs: string[];
  firstName: string;
  email: string;
  phone: string;
  consent: boolean;
}

const initial: WizardState = {
  insuranceType: "",
  situation: "",
  age: "",
  postalCode: "",
  familySituation: "",
  needs: [],
  firstName: "",
  email: "",
  phone: "",
  consent: false,
};

function SlideTransition({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: "forward" | "backward";
}) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={Math.random()}
        custom={direction}
        initial={{ opacity: 0, x: direction === "forward" ? 60 : -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === "forward" ? -60 : 60 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [state, setState] = useState<WizardState>(initial);

  const update = (patch: Partial<WizardState>) => setState((s) => ({ ...s, ...patch }));

  const go = (delta: number) => {
    setDirection(delta > 0 ? "forward" : "backward");
    setTimeout(() => setStep((s) => Math.min(TOTAL_STEPS, Math.max(1, s + delta))), 0);
  };

  const canProceed = () => {
    if (step === 1) return !!state.insuranceType;
    if (step === 2) return !!state.situation;
    if (step === 3) return !!state.age && !!state.postalCode && !!state.familySituation;
    if (step === 4) return state.needs.length > 0;
    if (step === 5) return !!state.firstName && !!state.email && !!state.consent;
    return false;
  };

  const needsOptions = () => {
    if (state.insuranceType === "auto") return wizardAutoNeeds;
    if (state.insuranceType === "hab") return wizardHabNeeds;
    if (state.insuranceType === "cyber") return wizardCyberNeeds;
    return wizardAutoNeeds;
  };

  const toggleNeed = (id: string) => {
    const arr = state.needs.includes(id) ? state.needs.filter((n) => n !== id) : [...state.needs, id];
    update({ needs: arr });
  };

  const submit = () => router.push("/result");

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4 py-24">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-gold/4 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-xl">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ProgressBar current={step} total={TOTAL_STEPS} />
        </motion.div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 gold-glow">
          {/* Step 1 — Type d'assurance */}
          {step === 1 && (
            <SlideTransition direction={direction}>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Quel type d'assurance cherchez-vous ?
                </h2>
                <p className="text-text-secondary mb-6">Sélectionnez une option pour commencer votre analyse.</p>
                <div className="grid grid-cols-2 gap-3">
                  {wizardInsuranceTypes.map((type) => {
                    const Icon = ICONS[type.icon] || Shield;
                    const selected = state.insuranceType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => update({ insuranceType: type.id })}
                        className={`flex flex-col items-start gap-2 p-4 rounded-card border transition-all duration-200 text-left ${
                          selected
                            ? "border-accent-gold bg-accent-gold/10"
                            : "border-white/10 bg-bg-card hover:border-accent-gold/30 hover:bg-accent-gold/5"
                        }`}
                      >
                        <Icon size={22} className={selected ? "text-accent-gold" : "text-text-secondary"} />
                        <div>
                          <div className={`font-semibold text-sm ${selected ? "text-accent-gold" : "text-text-primary"}`}>
                            {type.label}
                          </div>
                          <div className="text-xs text-text-secondary">{type.description}</div>
                        </div>
                        {selected && (
                          <div className="self-end">
                            <CheckCircle size={16} className="text-accent-gold" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SlideTransition>
          )}

          {/* Step 2 — Situation actuelle */}
          {step === 2 && (
            <SlideTransition direction={direction}>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Êtes-vous déjà assuré ?
                </h2>
                <p className="text-text-secondary mb-6">On adapte notre analyse à votre situation.</p>
                <div className="flex flex-col gap-3">
                  {wizardSituations.map((s) => {
                    const Icon = ICONS[s.icon] || CheckCircle;
                    const selected = state.situation === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => update({ situation: s.id })}
                        className={`flex items-center gap-4 p-4 rounded-card border transition-all duration-200 text-left ${
                          selected
                            ? "border-accent-gold bg-accent-gold/10"
                            : "border-white/10 bg-bg-card hover:border-accent-gold/30 hover:bg-accent-gold/5"
                        }`}
                      >
                        <Icon size={20} className={selected ? "text-accent-gold" : "text-text-secondary"} />
                        <span className={`font-medium ${selected ? "text-accent-gold" : "text-text-primary"}`}>
                          {s.label}
                        </span>
                        {selected && <CheckCircle size={16} className="text-accent-gold ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SlideTransition>
          )}

          {/* Step 3 — Profil */}
          {step === 3 && (
            <SlideTransition direction={direction}>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Votre profil</h2>
                <p className="text-text-secondary mb-6">Ces informations permettent d'affiner l'analyse tarifaire.</p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Âge</label>
                      <input
                        type="number"
                        min="16"
                        max="99"
                        placeholder="Ex. 35"
                        value={state.age}
                        onChange={(e) => update({ age: e.target.value })}
                        className="w-full bg-bg-card border border-white/10 rounded-input px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Code postal</label>
                      <input
                        type="text"
                        placeholder="Ex. G1A 0A1"
                        value={state.postalCode}
                        onChange={(e) => update({ postalCode: e.target.value })}
                        className="w-full bg-bg-card border border-white/10 rounded-input px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Situation familiale</label>
                    <div className="grid grid-cols-2 gap-2">
                      {wizardFamilySituations.map((fam) => {
                        const selected = state.familySituation === fam.id;
                        return (
                          <button
                            key={fam.id}
                            onClick={() => update({ familySituation: fam.id })}
                            className={`px-4 py-2.5 rounded-card border text-sm font-medium transition-all duration-200 ${
                              selected
                                ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                                : "border-white/10 bg-bg-card text-text-secondary hover:border-accent-gold/30 hover:text-text-primary"
                            }`}
                          >
                            {fam.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </SlideTransition>
          )}

          {/* Step 4 — Besoins */}
          {step === 4 && (
            <SlideTransition direction={direction}>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Vos besoins</h2>
                <p className="text-text-secondary mb-6">Sélectionnez tout ce qui s'applique à votre situation.</p>
                <div className="flex flex-col gap-3">
                  {needsOptions().map((need) => {
                    const selected = state.needs.includes(need.id);
                    return (
                      <button
                        key={need.id}
                        onClick={() => toggleNeed(need.id)}
                        className={`flex items-center gap-4 p-4 rounded-card border transition-all duration-200 text-left ${
                          selected
                            ? "border-accent-gold bg-accent-gold/10"
                            : "border-white/10 bg-bg-card hover:border-accent-gold/30 hover:bg-accent-gold/5"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected ? "bg-accent-gold border-accent-gold" : "border-white/30"
                          }`}
                        >
                          {selected && (
                            <svg className="w-3 h-3 text-bg-primary" fill="none" viewBox="0 0 12 12">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className={`font-medium text-sm ${selected ? "text-accent-gold" : "text-text-primary"}`}>
                          {need.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SlideTransition>
          )}

          {/* Step 5 — Coordonnées */}
          {step === 5 && (
            <SlideTransition direction={direction}>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Vos coordonnées</h2>
                <p className="text-text-secondary mb-6">
                  Pour recevoir vos soumissions. Vos données sont protégées (Loi 25 RGPQ).
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Prénom *</label>
                    <input
                      type="text"
                      placeholder="Votre prénom"
                      value={state.firstName}
                      onChange={(e) => update({ firstName: e.target.value })}
                      className="w-full bg-bg-card border border-white/10 rounded-input px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Courriel *</label>
                    <input
                      type="email"
                      placeholder="votre@courriel.ca"
                      value={state.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className="w-full bg-bg-card border border-white/10 rounded-input px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Téléphone <span className="text-text-secondary/50">(optionnel)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex. 418-555-1234"
                      value={state.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      className="w-full bg-bg-card border border-white/10 rounded-input px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-colors"
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        state.consent ? "bg-accent-gold border-accent-gold" : "border-white/30 group-hover:border-accent-gold/50"
                      }`}
                      onClick={() => update({ consent: !state.consent })}
                    >
                      {state.consent && (
                        <svg className="w-3 h-3 text-bg-primary" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-text-secondary leading-relaxed">
                      J'accepte que H Courtage AI utilise mes informations pour me transmettre des soumissions
                      d'assurance. Mes données ne seront jamais vendues à des tiers.{" "}
                      <a href="#" className="text-accent-gold hover:underline">
                        Politique de confidentialité
                      </a>
                    </span>
                  </label>
                </div>
              </div>
            </SlideTransition>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            {step > 1 ? (
              <button
                onClick={() => go(-1)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-medium"
              >
                <ArrowLeft size={18} />
                Précédent
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <button
                onClick={() => go(1)}
                disabled={!canProceed()}
                className={`btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-btn ${
                  !canProceed() ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Suivant
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!canProceed()}
                className={`btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-btn ${
                  !canProceed() ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Lancer l'analyse IA
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom trust note */}
        <p className="text-center text-xs text-text-secondary/50 mt-6">
          100 % gratuit · Données protégées (Loi 25 RGPQ) · Courtier certifié ·{" "}
          <a href={PHONE_HREF} className="hover:text-accent-gold transition-colors">
            {PHONE}
          </a>
        </p>
      </div>
    </div>
  );
}
