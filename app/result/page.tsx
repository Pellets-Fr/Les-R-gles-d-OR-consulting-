"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle, TrendingUp, ArrowRight, Phone } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { analysisResult, PHONE, PHONE_HREF } from "@/data/mockData";

function CircularScore({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayed / 100) * circumference;

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(Math.floor(eased * score));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="128" height="128" className="-rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(201,169,97,0.1)" strokeWidth="8" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#C9A961"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-gradient-gold">{displayed}</span>
        <span className="text-xs text-text-secondary">/100</span>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"loading" | "result">("loading");
  const [scanIndex, setScanIndex] = useState(0);

  useEffect(() => {
    const steps = analysisResult.scanSteps;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setScanIndex(i);
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("result"), 600);
      }
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-gold/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* ── LOADING PHASE ── */}
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-2 border-accent-gold/20 border-t-accent-gold mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Agent H analyse votre profil…</h2>
                <p className="text-text-secondary">Consultation de 18 assureurs en temps réel</p>
              </div>

              {/* Scan list */}
              <div className="space-y-2 max-h-72 overflow-hidden">
                {analysisResult.scanSteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={i < scanIndex ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.25 }}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm ${
                      i < scanIndex ? "text-text-primary" : "text-transparent"
                    }`}
                  >
                    <span>{step.label}</span>
                    {i < scanIndex && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                        <CheckCircle size={14} className="text-accent-green" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Animated progress bar */}
              <div className="mt-6">
                <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-gold to-accent-gold-light rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(scanIndex / analysisResult.scanSteps.length) * 100}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2 text-right">
                  {scanIndex} / {analysisResult.scanSteps.length} assureurs consultés
                </p>
              </div>
            </motion.div>
          )}

          {/* ── RESULT PHASE ── */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-text-primary mb-2">Votre analyse est prête !</h1>
                <p className="text-text-secondary">Agent H a identifié des opportunités significatives pour votre profil.</p>
              </div>

              {/* Score + Savings */}
              <div className="glass-card rounded-2xl p-6 gold-glow">
                <div className="grid grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <CircularScore score={analysisResult.score} />
                    <div className="text-center">
                      <div className="font-bold text-text-primary">Score d'opportunité</div>
                      <div className="text-sm text-text-secondary">Potentiel d'optimisation élevé</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedCounter
                      end={analysisResult.savings}
                      suffix=" $"
                      className="text-4xl font-bold text-gradient-gold"
                    />
                    <div className="text-center">
                      <div className="font-bold text-text-primary">Économies estimées / an</div>
                      <div className="text-sm text-accent-green flex items-center justify-center gap-1">
                        <TrendingUp size={14} />
                        vs votre situation actuelle
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 analysis cards */}
              <div className="grid gap-4">
                {/* Risks */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="glass-card rounded-card p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                      <AlertTriangle size={16} className="text-red-400" />
                    </div>
                    <h3 className="font-bold text-text-primary">Risques détectés</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.risks.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">⚠</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Missing coverages */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="glass-card rounded-card p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-blue/15 flex items-center justify-center">
                      <CheckCircle size={16} className="text-accent-blue" />
                    </div>
                    <h3 className="font-bold text-text-primary">Couvertures manquantes</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.missing.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-accent-blue mt-0.5 flex-shrink-0">○</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Optimizations */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="glass-card rounded-card p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-green/15 flex items-center justify-center">
                      <TrendingUp size={16} className="text-accent-green" />
                    </div>
                    <h3 className="font-bold text-text-primary">Optimisations identifiées</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.optimizations.map((o, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-accent-green mt-0.5 flex-shrink-0">✓</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={() => router.push("/quote")}
                  className="btn-gold w-full py-4 text-base font-semibold rounded-btn inline-flex items-center justify-center gap-2"
                >
                  Voir mes 3 soumissions personnalisées
                  <ArrowRight size={18} />
                </button>
                <p className="text-center text-sm text-text-secondary">
                  Questions ?{" "}
                  <a href={PHONE_HREF} className="text-accent-gold hover:underline font-semibold">
                    Houssem vous rappelle dans l'heure — {PHONE}
                  </a>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
