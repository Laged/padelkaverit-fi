// tailwind.config.ts

import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class', // Corrected from ['class'] to 'class'
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom Orange Monochrome Colors
        main: 'var(--color-primary-a50)',
        mainAccent: 'var(--color-primary-a50)', // Not needed for shadcn components
        electricLime: 'var(--electric-lime)', // Electric Lime
        electricPurple: 'var(--electric-purple)', // Electric Purple
        overlay: 'var(--overlay)', // Overlay color

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

        // Optional: Remove or comment out if not using
        // bg: '#fff4e0',
        // text: '#000',
        border: '#000000',
        // darkBg: '#272933',
        // darkText: '#eeefe9',
        // darkBorder: '#000',
        // secondaryBlack: '#212121',
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
