/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "blue-600": "0 4px 6px rgba(37, 99, 235, 0.5",
      },
      spacing: {
        "28xl": "28rem",
      },
    },
  },
  plugins: [],
};
