/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      "2xl": { max: "1365px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1023px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "767px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "575px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "400px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
