"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  savings: string;
  text: string;
  product: string;
}

export default function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 0 48px rgba(201,169,97,0.15)" }}
      className="glass-card rounded-card p-6 flex flex-col gap-4 cursor-default"
    >
      {/* Rating */}
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-accent-gold text-accent-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-text-secondary leading-relaxed italic flex-1">"{testimonial.text}"</p>

      {/* Savings badge */}
      <div className="inline-flex items-center gap-2 bg-accent-green/10 border border-accent-green/20 rounded-full px-3 py-1 w-fit">
        <span className="text-accent-green text-sm font-semibold">✓ Économie : {testimonial.savings}/an</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold/30 to-accent-blue/30 border border-accent-gold/20 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-accent-gold">{testimonial.avatar}</span>
        </div>
        <div>
          <div className="font-semibold text-text-primary text-sm">{testimonial.name}</div>
          <div className="text-text-secondary text-xs">{testimonial.location} · {testimonial.product}</div>
        </div>
      </div>
    </motion.div>
  );
}
