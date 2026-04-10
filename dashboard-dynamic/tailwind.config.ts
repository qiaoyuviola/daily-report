/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'profit-green': '#00C853',
        'loss-red': '#FF1744',
        'card-bg': '#1E1E2E',
        'accent': '#7C3AED',
      },
    },
  },
  plugins: [],
}
