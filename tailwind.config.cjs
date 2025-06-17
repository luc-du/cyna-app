const {
  darkMode,
} = require("@tailwindcss/postcss7-compat/stubs/defaultConfig.stub");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryBackground: "#302082",
        primary: "#302082",
        CTAHover: "#A3A0E2",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to left, #302082,rgb(86, 76, 136))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {},
        },
      }),
    },
  },
};
