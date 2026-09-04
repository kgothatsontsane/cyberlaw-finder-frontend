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
        serif: ['Charter', '"Iowan Old Style"', '"Palatino Linotype"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', '"Cascadia Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
};