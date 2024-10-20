// tailwind.config.ts

import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'], // Enables class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Custom Orange Monochrome Colors */
        main: 'var(--color-primary-a50)',
        mainAccent: 'var(--color-primary-a50)', // Not needed for shadcn components
        electricLime: 'var(--electric-lime)', // Electric Lime
        electricPurple: 'var(--electric-purple)', // Electric Purple
        overlay: 'var(--overlay)', // Overlay color

        // Light mode
        bg: 'var(--background)',
        text: 'var(--foreground)',
        border: 'var(--border)',

        // Dark mode
        darkBg: 'var(--background)',
        darkText: 'var(--foreground)',
        darkBorder: 'var(--border)',
        secondaryBlack: 'var(--secondaryBlack)', // Opposite of plain white

        // shadcn colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        input: 'var(--input)',
        ring: 'var(--ring)',

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        // Add other shadcn colors as needed
      },
      fontFamily: {
        heading: ['var(--font-poppins)', ...fontFamily.sans], // Poppins for headings
        base: ['var(--font-source-sans-pro)', ...fontFamily.sans], // Source Sans Pro for paragraphs
      },
      borderRadius: {
        base: 'var(--radius)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        light: '6px 6px 0px 0px #000',
        dark: '6px 6px 0px 0px #000',
      },
      translate: {
        boxShadowX: '6px',
        boxShadowY: '6px',
        reverseBoxShadowX: '-6px',
        reverseBoxShadowY: '-6px',
      },
      fontWeight: {
        base: '500',
        heading: '800',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
