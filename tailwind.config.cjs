module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
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
          css: {
            h1: { color: theme("colors.primary"), fontWeight: 700 },
            h2: { color: theme("colors.primary"), fontWeight: 500 },
          },
        },
      }),
    },
  },
};
