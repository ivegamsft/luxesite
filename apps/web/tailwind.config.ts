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
        "aurora-bg": "#f5f3f0",
        "aurora-bg-light": "#faf9f7",
        "aurora-bg-dark": "#f0ebe5",
        "aurora-text": "#2c2620",
        "aurora-text-muted": "#6b6458",
        "aurora-border": "#e8e4df",
        "aurora-gold": "#c9a76a",
        "aurora-navy": "#1a3a52",
        "aurora-success": "#5a8f4a",
        "aurora-error": "#a85a4a",
      },
      boxShadow: {
        lift: "0 2px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        subtle: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        medium: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
      },
      screens: {
        'xs': '320px',
        'xl': '1440px',
      },
      keyframes: {
        "scroll-hint": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(4px)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "bounceX": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(3px)" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 1.2s ease-in-out 2s 1 both",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Space Grotesk", "system-ui", "sans-serif"],
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
        "xs": "var(--space-xs)",
        "sm": "var(--space-sm)",
        "md": "var(--space-md)",
        "lg": "var(--space-lg)",
        "xl": "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
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
