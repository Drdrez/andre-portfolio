import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          muted: "var(--color-text-muted)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
          raised: "var(--color-surface-raised)",
          strong: "var(--color-surface-strong)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        interactive: {
          DEFAULT: "var(--color-interactive)",
          contrast: "var(--color-interactive-contrast)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2rem,4vw,2.75rem)", { lineHeight: "1.15", fontWeight: "600" }],
        lead: ["1.125rem", { lineHeight: "1.75" }],
      },
      spacing: {
        18: "4.5rem",
      },
      borderRadius: {
        token: "12px",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
        4: "var(--shadow-4)",
      },
      transitionDuration: {
        instant: "150ms",
        fast: "200ms",
        normal: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
