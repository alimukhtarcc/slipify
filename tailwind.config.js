/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f1f8fe',
          '100': '#e2f0fc',
          '200': '#bfdff8',
          '300': '#86c7f3',
          '400': '#45a9ea',
          '500': '#1e8fd9',
          '600': '#1070b9',
          '700': '#0e5a96',
          '800': '#104d7c',
          '900': '#134167',
          '950': '#0d2944',
        },
      },
    },
    plugins: [],
  }
}
