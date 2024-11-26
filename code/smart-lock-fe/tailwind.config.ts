import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#061e3a",
        secondary: "#fff4ea",
        transparent: 'transparent',
        current: 'currentColor',
        background: "var(--background)",
        foreground: "var(--foreground)",
        'blue-birds': '#0096d1',
        'ambrosia-ivory': '#fff4ea',
        'panorama-blue': '#3ebdc6',
        'sweet-aqua': '#a8ead5',
        'oxford-blue': '#0c1e38',
        'danger': '#d05e5e',
        'success': '#639246',
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '1rem',
          xl: '1rem',
          '2xl': '1rem',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
