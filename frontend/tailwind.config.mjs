/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#2b2d30',
        darkSecondary: '#121212',
        darkProduct: 'rgba(40,40,40,40.89)',
      },
      screens: {
        xs: '705px',
        s: '815px'
      }
    },
  },
  plugins: [],
};
