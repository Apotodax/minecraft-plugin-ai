import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          grass: '#7cb342',
          dirt: '#8b7355',
          stone: '#808080',
          gold: '#ffd700',
        },
      },
    },
  },
  plugins: [],
}
export default config
