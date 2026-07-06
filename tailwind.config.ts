import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        memorial: {
          bg: "#faf8f5",
          surface: "#ffffff",
          ink: "#2c2a26",
          muted: "#6b6560",
          accent: "#8b9a8f",
          border: "#e8e4de",
          warm: "#c4a882",
          gold: "#e6b422",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Noto Serif SC",
          "Songti SC",
          "serif",
        ],
      },
      maxWidth: {
        prose: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
