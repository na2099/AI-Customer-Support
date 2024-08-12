import type { Config } from "tailwindcss";

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
      colors: {
        primary: '#0d47a1',   // Example primary color: blue
        secondary: '#ff5722', // Example secondary color: deep orange
        background: '#121212', // Dark background for the whole app
        chatBackground: '#1A1A1A', // Darker section for chatbox
        chatForeground: '#FFFFFF', // Text color
      },
      borderRadius: {
        large: '1rem',
      }
    },
  },
  plugins: [],
};
export default config;
