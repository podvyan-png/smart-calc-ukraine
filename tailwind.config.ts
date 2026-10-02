import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ua: {
          blue: {
            DEFAULT: "#0057B7",
            light: "#2563eb",
            dark: "#1d4ed8",
            50: "#eff6ff",
            100: "#dbeafe",
            500: "#0057B7",
            600: "#004899",
            700: "#003977",
          },
          yellow: {
            DEFAULT: "#FFDD00",
            light: "#fde047",
            dark: "#eab308",
            50: "#fefce8",
            100: "#fef9c3",
            400: "#facc15",
            500: "#eab308",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
