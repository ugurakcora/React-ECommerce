/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      dropShadow: {
        xl: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      },
      screens: {
        lg: "1350px",
      },
      colors: {
        primary: "#2A59FE",
        secondary: "rgba(51, 51, 51, 0.70)",
        shadow: "rgba(0, 0, 0, 0.25)",
        "primary-bg": "#F9F9F9",
      },
    },
  },
  plugins: [],
};
