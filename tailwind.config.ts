import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-hero-patterns")],
} satisfies Config;
