// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--color-primary-a50)",
        mainAccent: "var(--color-primary-a50)", // Not needed for shadcn components
        overlay: "var(--overlay)", // Background color overlay for alert dialogs, modals, etc.

        // Light mode
        bg: "var(--background)",
        text: "var(--foreground)",
        border: "var(--border)",

        // Dark mode
        darkBg: "var(--background)",
        darkText: "var(--foreground)",
        darkBorder: "var(--border)",
        secondaryBlack: "var(--secondaryBlack)", // Opposite of plain white

        // shadcn colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        input: "var(--input)",
        ring: "var(--ring)",

        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        // Add other shadcn colors as needed
      },
      borderRadius: {
        base: "var(--radius)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        light: "6px 6px 0px 0px #000",
        dark: "6px 6px 0px 0px #000",
      },
      translate: {
        boxShadowX: "6px",
        boxShadowY: "6px",
        reverseBoxShadowX: "-6px",
        reverseBoxShadowY: "-6px",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        base: ["Source Sans Pro", "sans-serif"],
      },
      fontWeight: {
        base: "500",
        heading: "800",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
