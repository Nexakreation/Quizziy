/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#eb9c64',
          200: '#ff8789',
          300: '#554e4f',
        },
        accent: {
          100: '#8fbf9f',
          200: '#346145',
        },
        text: {
          100: '#353535',
          200: '#000000',
        },
        bg: {
          100: '#F5ECD7',
          200: '#ebe2cd',
          300: '#c2baa6',
        },
      },
    },
  },
  plugins: [],
}