/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "rgb(var(--cyber-bg))",
          darker: "rgb(var(--cyber-bg-deep))",
          navy: "rgb(var(--cyber-surface))",
          cyan: "rgb(var(--cyber-accent))",
          teal: "rgb(var(--cyber-accent-2))",
          amber: "rgb(var(--cyber-warn))",
          red: "rgb(var(--cyber-danger))",
          purple: "rgb(var(--cyber-purple))",
          gray: "rgb(var(--cyber-border))",
          light: "rgb(var(--cyber-muted))",
        },
        "text-primary": "rgb(var(--text-primary))",
        "text-secondary": "rgb(var(--text-secondary))",
        "text-muted": "rgb(var(--text-muted))",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "aurora": "aurora 8s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "border-glow": "border-glow 3s linear infinite",
        "slide-up-fade": "slide-up-fade 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "particle": "particle 15s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translateY(0) rotate(0deg) scale(1)", opacity: 0.5 },
          "50%": { transform: "translateY(-20px) rotate(3deg) scale(1.1)", opacity: 0.8 },
          "100%": { transform: "translateY(0) rotate(0deg) scale(1)", opacity: 0.5 },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(6,182,212,0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(6,182,212,0.4)" },
        },
        "border-glow": {
          "0%": { borderColor: "rgba(6,182,212,0.2)" },
          "50%": { borderColor: "rgba(6,182,212,0.6)" },
          "100%": { borderColor: "rgba(6,182,212,0.2)" },
        },
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) scale(0)" },
          "50%": { transform: "translateY(50vh) scale(1)" },
          "100%": { transform: "translateY(-10vh) scale(0)" },
        },
      },
    },
  },
  plugins: [],
};
