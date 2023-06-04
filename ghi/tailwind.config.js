/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        forge: {
          primary: "#C9632C",
          secondary: "#D18D39",
          accent: "#D8B646",
          neutral: "#2b2b2b",
          "base-100": "#131313",
          info: "#afafaf",
          success: "#C7D18C",
          warning: "#D8C586",
          error: "#D1A875",
          "base-content": "#ffffff",
        },
      },
      "forest",
    ],
  },
};
