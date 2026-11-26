import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primária - Vermelho Tomate/Cereja (#E63946)
        primary: {
          50: '#fef0f0',
          100: '#fddddd',
          200: '#fab9b9',
          300: '#f58484',
          400: '#ee5151',
          500: '#E63946',
          600: '#d42d3a',
          700: '#b82330',
          800: '#961f28',
          900: '#7a1c23',
          950: '#410b10',
        },

        // Secundária - Amarelo Mostarda/Ouro (#FFB703)
        secondary: {
          50: '#fffbf0',
          100: '#fff3d1',
          200: '#ffe5a3',
          300: '#ffd366',
          400: '#ffc129',
          500: '#FFB703',
          600: '#e6a300',
          700: '#b88200',
          800: '#926500',
          900: '#775200',
          950: '#402b00',
        },

        // Fundo - Preto Carvão (#1E1E24) - Dark Mode Base
        background: {
          DEFAULT: '#1E1E24',
          secondary: '#252530',
          tertiary: '#2D2D3A',
          hover: '#363646',
        },

        // Texto - Off-White (#F8F9FA)
        text: {
          primary: '#F8F9FA',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
          inverse: '#1E1E24',
        },

        // Status das Mesas (do protótipo)
        status: {
          livre: '#22C55E',
          ocupada: '#3B82F6',
          conta: '#F97316',
          reservada: '#8B5CF6',
        },

        // Estados de Estoque (do protótipo)
        stock: {
          available: '#22C55E',
          low: '#F97316',
          empty: '#EF4444',
          disabled: '#64748B',
        },

        // Semânticas
        success: '#22C55E',
        warning: '#F97316',
        error: '#EF4444',
        info: '#3B82F6',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw + 1rem, 4rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4vw + 0.5rem, 3rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw + 0.5rem, 2.25rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-xl': ['clamp(1.25rem, 2.5vw + 0.5rem, 1.875rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-lg': ['clamp(1.125rem, 2vw + 0.5rem, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-md': ['clamp(1rem, 1.5vw + 0.5rem, 1.25rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['clamp(0.875rem, 1vw + 0.5rem, 1rem)', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
        'button': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
      },

      spacing: {
        0: '0',
              0.5: '0.125rem',
              1: '0.25rem',
              1.5: '0.375rem',
              2: '0.5rem',
              2.5: '0.625rem',
              3: '0.75rem',
              3.5: '0.875rem',
              4: '1rem',
              5: '1.25rem',
              6: '1.5rem',
              7: '1.75rem',
              8: '2rem',
              9: '2.25rem',
              10: '2.5rem',
              11: '2.75rem',
              12: '3rem',
              14: '3.5rem',
              16: '4rem',
              20: '5rem',
              24: '6rem',
            },

      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },

      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
        DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        md: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
        lg: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
        xl: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.4)',
        focus: '0 0 0 3px rgb(230 57 70 / 0.4)',
        'focus-secondary': '0 0 0 3px rgb(255 183 3 / 0.4)',
      },

      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config