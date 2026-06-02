/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F2D5A",
        accent: "#FF6B35",
       background: "#E8F4FD",
        dark: "#1A1A2E",
        gray: "#6B7280",
        success: "#10B981",
        error: "#EF4444",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

