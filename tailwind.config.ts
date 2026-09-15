import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0A08",
        "ink-soft": "#161310",
        paper: "#F4EEE1",
        "paper-dim": "#E9E1CF",
        gold: "#C9A34E",
        "gold-bright": "#E7C377",
        stage: "#5E1717",
        "stage-bright": "#8C2A2A",
        amber: "#D98E3C",
        tea: "#6B4226",
        "tea-dark": "#3E2A1F",
        cream: "#F1E4CF",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
