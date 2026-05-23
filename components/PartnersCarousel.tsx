"use client";
import { partners } from "@/data/mockData";

export default function PartnersCarousel() {
  const doubled = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden w-full py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg-primary to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none" />

      <div className="flex animate-scroll gap-8 w-max">
        {doubled.map((name, i) => (
          <div
            key={i}
            className="flex items-center justify-center h-12 px-6 glass-card rounded-xl flex-shrink-0 whitespace-nowrap"
          >
            <span className="text-text-secondary text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
