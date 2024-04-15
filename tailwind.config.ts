import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary:"#B099E0",
        secondary:"#18083C",
        accent:"#2E1656",
        background:"#0E0A17",
        text:"#EEEBF3"

      },
      fontFamily: {
        Montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        Hind: ["Hind", ...defaultTheme.fontFamily.sans],
      },
      animation:{
        bold: " bold 10s infinite",
        spher:" spher 10s infinite"
      },
      keyframes:{
        bold:{
          "0%":{
            transform:"translate(0px,0px) scale(1)"
          },
          "33%":{
            transform:"translate(30px,-50px) scale(1.3)"
          },
          "66%":{
            transform:"translate(-20px,20px)scale(0.8)"
          },
          "100%":{
            transform:"translate(0px,0px) scale(1)"
          }

        },
        spher: {
          '0%': {
            transform: 'translate(0px, 0px) rotate(0deg) '
          },
          '25%': {
            transform: 'translate(-80px, 30px) rotate(0deg) '
          },
          '50%': {
            transform: 'translate(-120px, 10px) rotate(15deg) '
          },
          '75%': {
            transform: 'translate(-80px, -30px) rotate(5deg) '
          },
          '100%': {
            transform: 'translate(0px,0px) rotate(0deg) '
          }
        }
      },
      screens: {
        'xs': '400px',
  
    },
   
  },
  plugins: [],
}
}
export default config;
