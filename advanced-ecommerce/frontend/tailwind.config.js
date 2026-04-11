/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#003049',
        warmCream: '#FDF0D5',
        terracotta: '#F08080',
        burntOrange: '#C1121F',
      }
    },
  },
  plugins: [],
}