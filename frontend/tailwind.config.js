module.exports = {
  darkMode: 'class', // toggle dark mode with a 'dark' class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#967969",         // mocha
        "primary-dark": "#5C4033",  // dark brown
        "primary-light": "#E5E4E2", // platinum

        background: "#483C32",       // taupe
        "background-light": "#E5E4E2", // platinum

        "text-main": "#000000",
        "text-muted": "#000000",

        accent: "#F472B6",

        almond: "#EADDCA",
        "dark-brown": "#5C4033",
        mocha: "#967969",
        "off-white": "#FAF9F6",
        platinum: "#E5E4E2",
        taupe: "#483C32",
      },
      animation: {
        loader: "loader 1s linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.5)" },
          "100%": { transform: "rotate(360deg) scale(1)" }
        }
      }
    },
  },
  plugins: [],
}