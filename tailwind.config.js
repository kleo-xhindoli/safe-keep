const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      minWidth: {
        md: "28rem",
      },
      width: {
        md: "28rem",
      },
    },
  },
  plugins: [require("@tailwindcss/ui")],
};
