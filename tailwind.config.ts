import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'first-color': '#F6F6F6',
        'second-color': '#A9BDD6',
        'third-color': '#3A506B',
        'fourth-color': '#1C2541',
        'fifth-color': '#0B132B',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      }
    },
  },
  plugins: [],
}
export default config
