"use client";
import { motion } from "framer-motion";
import { Car, Home, Shield, Package } from "lucide-react";

const ICONS: Record<string, React.ElementType> = { Car, Home, Shield, Package };

interface Product {
  id: string;
  icon: string;
  title: string;
  description: string;
  savings: string;
  badge: string | null;
  features: string[];
  color: string;
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const Icon = ICONS[product.icon] || Shield;
  const isGold = product.color === "gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: isGold ? "0 0 48px rgba(201,169,97,0.2)" : "0 0 48px rgba(79,156,249,0.15)" }}
      className="glass-card rounded-card p-6 flex flex-col gap-4 relative overflow-hidden group cursor-default"
    >
      {/* Glow bg on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isGold
            ? "bg-gradient-to-br from-accent-gold/5 to-transparent"
            : "bg-gradient-to-br from-accent-blue/5 to-transparent"
        }`}
      />

      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${
            product.badge === "Le + populaire"
              ? "bg-accent-gold text-bg-primary"
              : "bg-accent-blue/20 border border-accent-blue/40 text-accent-blue"
          }`}
        >
          {product.badge}
        </div>
      )}

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isGold ? "bg-accent-gold/15" : "bg-accent-blue/15"
        }`}
      >
        <Icon size={24} className={isGold ? "text-accent-gold" : "text-accent-blue"} />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{product.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-1.5">
        {product.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className={`mt-0.5 flex-shrink-0 ${isGold ? "text-accent-gold" : "text-accent-blue"}`}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Savings */}
      <div className={`mt-auto pt-4 border-t border-white/5 font-semibold text-sm ${isGold ? "text-accent-gold" : "text-accent-blue"}`}>
        {product.savings}
      </div>
    </motion.div>
  );
}
