import { Config } from "tailwindcss";
import { fontFamily} from "tailwindcss/defaultTheme";
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',
        secondary: '#A78BFA',
      },
      fontFamily: {
        sans: ['Work Sans', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '*': {
          transition: 'all 0.3s ease-in-out',
        },
      });
    }),
  ],
} satisfies Config;
