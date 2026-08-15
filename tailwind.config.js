/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          secondary: '#3B82F6',
          light: '#DBEAFE',
          ice: '#EFF6FF',
          dark: '#1E40AF',
          glow: 'rgba(37, 99, 235, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'blue-glow': '0 0 25px rgba(37, 99, 235, 0.25)',
        'blue-glow-lg': '0 0 45px rgba(37, 99, 235, 0.4)',
        'glass': '0 10px 30px -10px rgba(37, 99, 235, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
        'glass-hover': '0 20px 40px -15px rgba(37, 99, 235, 0.18), 0 8px 12px -4px rgba(15, 23, 42, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
