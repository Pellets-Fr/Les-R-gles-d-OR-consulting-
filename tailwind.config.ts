import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0B0F1A",
          surface: "#141A2A",
          card: "#1A2238",
        },
        accent: {
          gold: "#C9A961",
          "gold-light": "#E2C97E",
          "gold-dim": "rgba(201,169,97,0.12)",
          blue: "#4F9CF9",
          green: "#10B981",
        },
        text: {
          primary: "#F5F5F7",
          secondary: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-desktop": ["60px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "hero-mobile": ["38px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        card: "16px",
        btn: "10px",
        input: "8px",
      },
      boxShadow: {
        gold: "0 0 32px rgba(201,169,97,0.15)",
        "gold-hover": "0 0 48px rgba(201,169,97,0.25)",
        blue: "0 0 32px rgba(79,156,249,0.15)",
      },
      backdropBlur: {
        card: "20px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse_gold: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        scan: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        scroll: "scroll 30s linear infinite",
        "pulse-gold": "pulse_gold 2s ease-in-out infinite",
        scan: "scan 1.2s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
