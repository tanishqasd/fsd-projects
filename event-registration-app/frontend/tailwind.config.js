/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  "#f2f7f1",
          100: "#e0eede",
          200: "#c3ddbf",
          300: "#a4ca9e",
          400: "#84B179",
          500: "#6a9861",
          600: "#527849",
          700: "#3d5936",
        },
        summer: {
          gold:  "#F5C842",
          peach: "#F4845F",
          sky:   "#7EC8E3",
          cream: "#FFF8F0",
          sand:  "#E8D5B7",
        }
      }
    },
  },
  plugins: [],
}