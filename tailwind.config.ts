import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        dark: {
          950: "#000000",
          900: "#131209",
          850: "#181818",
          800: "#1F1F1F",
          750: "#272727",
          700: "#313131",
        },
        surface: {
          light: "#FFFFFF",
          subtle: "#F9F9F8",
          muted: "#F2F2F0",
          border: "#E7E7E3",
        },
        brand: {
          primary: "#181818",
          secondary: "#575753",
          accent: "#166534", // emerald badge
          accentLight: "#DCFCE7",
        },
      },
      spacing: {
        "spacing-0": "0px",
        "spacing-25": "2px",
        "spacing-50": "4px",
        "spacing-75": "8px",
        "spacing-100": "12px",
        "spacing-200": "16px",
        "spacing-300": "24px",
        "spacing-400": "32px",
        "spacing-500": "40px",
        "spacing-600": "48px",
        "spacing-700": "64px",
        "spacing-800": "80px",
        "spacing-900": "96px",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        luxury: "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
