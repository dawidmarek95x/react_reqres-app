import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "320px",
        xs: "425px",
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        xxl: "1440px",
      },
    },
  },
  plugins: [daisyui],
};

export default config;
