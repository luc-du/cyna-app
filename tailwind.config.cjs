const { typography } = require("@material-tailwind/react");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#302082",
        primary: "#302082",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to left, #302082,rgb(86, 76, 136))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: { color: theme("colors.primary") }, // Correction ici
            h2: { color: theme("colors.primary") }, // Correction ici
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Ajout du plugin Typography
  ],
};
