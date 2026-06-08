import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#132033",
        muted: "#607089",
        line: "#d9e1ec",
        ocean: "#173a70",
        action: "#1f6fd1",
        mint: "#14a36f",
        paper: "#f6f8fb"
      },
      boxShadow: {
        card: "0 28px 90px rgba(16, 35, 71, 0.13)",
        soft: "0 16px 44px rgba(16, 35, 71, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
