import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F4D5A",
        accent: "#FFB703",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(60% 60% at 50% 10%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 100%)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
