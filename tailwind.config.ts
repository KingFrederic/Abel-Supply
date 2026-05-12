import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080909',
        'bg-elev': '#0f1012',
        'bg-card': '#13151a',
        amber: {
          DEFAULT: '#F59E0B',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        green: {
          DEFAULT: '#10B981',
          500: '#10B981',
          600: '#059669',
        },
        text: {
          DEFAULT: '#FAFAFA',
          muted: '#71717A',
          dim: '#3F3F46',
        },
        zinc: {
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'amber-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.05) 0%, transparent 40%)',
        'green-mesh': 'radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.08) 0%, transparent 50%)',
      },
      boxShadow: {
        'amber': '0 0 60px rgba(245,158,11,0.15), 0 0 120px rgba(245,158,11,0.06)',
        'amber-sm': '0 0 20px rgba(245,158,11,0.2)',
        'green': '0 0 40px rgba(16,185,129,0.2)',
        'card': '0 1px 1px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3), 0 16px 32px rgba(0,0,0,0.2)',
        'card-hover': '0 1px 1px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), 0 32px 64px rgba(0,0,0,0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(16,185,129,0.6), 0 0 60px rgba(16,185,129,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
