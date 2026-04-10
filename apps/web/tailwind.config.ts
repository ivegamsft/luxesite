import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "aurora-dark": "oklch(0.15 0.015 50)",
        "aurora-darker": "oklch(0.11 0.01 50)",
        "aurora-cyan": "oklch(0.82 0.105 85)",
        "aurora-purple": "oklch(0.42 0.13 20)",
        "aurora-magenta": "oklch(0.70 0.09 30)",
        "aurora-gold": "oklch(0.80 0.12 75)",
        "aurora-white": "oklch(0.95 0.012 85)",
        "aurora-glass": "oklch(0.95 0.01 85 / 0.04)",
        "aurora-glass-border": "oklch(0.95 0.01 85 / 0.07)",
        "aurora-error": "oklch(0.65 0.20 25)",
      },
      backgroundImage: {
        "gradient-aurora":
          "linear-gradient(135deg, oklch(0.82 0.105 85), oklch(0.42 0.13 20), oklch(0.70 0.09 30))",
        "gradient-aurora-subtle":
          "linear-gradient(135deg, oklch(0.82 0.105 85 / 0.15), oklch(0.42 0.13 20 / 0.15), oklch(0.70 0.09 30 / 0.15))",
      },
      backdropBlur: {
        glass: "6px",
        "glass-lg": "12px",
      },
      boxShadow: {
        glass: "0 4px 20px oklch(0 0 0 / 0.2)",
        glow: "0 0 20px oklch(0.82 0.105 85 / 0.3)",
        "glow-purple": "0 0 20px oklch(0.42 0.13 20 / 0.3)",
      },
      screens: {
        'xs': '320px',
        'xl': '1440px',
        '2xl': '2560px',
      },
      keyframes: {
        "aurora-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "aurora-pulse": "aurora-pulse 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Libre Franklin", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Bodoni Moda", "Georgia", "serif"],
      },
      fontSize: {
        "fluid-sm": "var(--fluid-sm)",
        "fluid-base": "var(--fluid-base)",
        "fluid-lg": "var(--fluid-lg)",
        "fluid-xl": "var(--fluid-xl)",
        "fluid-2xl": "var(--fluid-2xl)",
        "fluid-3xl": "var(--fluid-3xl)",
      },
      spacing: {
        "section-hero": "var(--space-hero)",
        "section-lg": "var(--space-section-lg)",
        "section-md": "var(--space-section-md)",
        "section-sm": "var(--space-section-sm)",
        "section-xs": "var(--space-section-xs)",
      },
    },
  },
  plugins: [],
};

export default config;
