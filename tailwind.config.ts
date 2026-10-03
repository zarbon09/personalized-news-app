import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201d",
        paper: "#f7f8f5",
        forest: "#184f3b",
        moss: "#dbe7df",
        line: "#dde2dd",
        muted: "#69736e",
        amber: "#a65f17"
      },
      boxShadow: { card: "0 1px 2px rgba(20,35,28,.05), 0 8px 24px rgba(20,35,28,.04)" }
    }
  },
  plugins: []
} satisfies Config;
