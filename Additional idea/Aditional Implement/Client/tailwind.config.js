/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        secondary: ["Roboto Serif"],
        primary: ["Poppins"],
      },
      colors: {
        primaryGreen: "#00A954",
        secondaryGreen: "#D8FFEB",
      },
    },
  },
  plugins: [],
};
