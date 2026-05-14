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
        bg:       '#070708',
        'bg-elev':'#0C0D10',
        'bg-card':'#111318',
        'bg-hover':'#16181F',
        gold: {
          DEFAULT: '#C9A96E',
          light:   '#E8D5A3',
          dim:     '#6B5A30',
        },
        amber: {
          DEFAULT: '#F59E0B',
          400:     '#FBBF24',
          500:     '#F59E0B',
          600:     '#D97706',
        },
        green: {
          DEFAULT: '#10B981',
          500:     '#10B981',
          600:     '#059669',
        },
        ivory: '#F5F0E8',
        text: {
          DEFAULT: '#F5F4F0',
          muted:   '#7A7880',
          dim:     '#3D3D46',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.04) 0%, transparent 40%)',
        'amber-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.07) 0%, transparent 50%)',
      },
      boxShadow: {
        'gold':       '0 0 60px rgba(201,169,110,0.15), 0 0 120px rgba(201,169,110,0.06)',
        'gold-sm':    '0 0 20px rgba(201,169,110,0.18)',
        'amber':      '0 0 60px rgba(245,158,11,0.15), 0 0 120px rgba(245,158,11,0.06)',
        'amber-sm':   '0 0 20px rgba(245,158,11,0.2)',
        'green':      '0 0 40px rgba(16,185,129,0.2)',
        'card':       '0 1px 1px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3), 0 16px 32px rgba(0,0,0,0.2)',
        'card-hover': '0 1px 1px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), 0 32px 64px rgba(0,0,0,0.3)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'marquee':    'marquee 38s linear infinite',
      },
      keyframes: {
        float:      { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-10px)' } },
        pulseGlow:  {
          '0%,100%': { boxShadow:'0 0 20px rgba(16,185,129,.4),0 0 40px rgba(16,185,129,.2)' },
          '50%':     { boxShadow:'0 0 30px rgba(16,185,129,.6),0 0 60px rgba(16,185,129,.3)' },
        },
        shimmer:    { '0%': { backgroundPosition:'-200% 0' }, '100%': { backgroundPosition:'200% 0' } },
        marquee:    { '0%': { transform:'translateX(0)' }, '100%': { transform:'translateX(-50%)' } },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
