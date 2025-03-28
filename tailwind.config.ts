import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        background: {
          DEFAULT: '#F7F7F7',
          dark: '#E0E0E0',
        },
        foreground: {
          DEFAULT: '#4A4A4A',
          light: '#6E6E6E',
        },
        silver: {
          50: '#F9F9F9',
          100: '#F5F5F5',
          200: '#E7E7E7',
          300: '#D1D1D1',
          400: '#A9A9A9',
          500: '#9F9EA1',
          600: '#7C7C7C',
          700: '#5E5E5E',
          800: '#404040',
          900: '#262626',
        },
        primary: {
          DEFAULT: '#9F9EA1',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#E7E7E7',
          foreground: '#4A4A4A',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        balance: {
          blue: '#0A84FF',
          indigo: '#5E5CE6',
          green: '#30D158',
          mint: '#00C7BE',
          yellow: '#FFD60A',
          orange: '#FF9F0A',
          red: '#FF453A',
          pink: '#FF375F',
          purple: '#BF5AF2',
          gray: '#8E8E93',
          lightGray: '#F2F2F7',
          darkGray: '#1C1C1E',
        },
        backgroundColor: {
          'silver-white': '#F7F7F7',
          'silver-light': '#E7E7E7',
          'silver-medium': '#9F9EA1',
        },
        textColor: {
          'silver-dark': '#4A4A4A',
          'silver-medium': '#6E6E6E',
        },
        backgroundImage: {
          'silver-gradient': 'linear-gradient(to right, #F7F7F7, #E7E7E7)',
          'silver-gradient-dark': 'linear-gradient(to right, #E0E0E0, #9F9EA1)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-out': 'slide-out 0.5s ease-out',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'ripple': 'ripple 1s linear',
        'enter': 'fade-in 0.4s ease-out, scale-in 0.3s ease-out',
        'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'soft': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'subtle': '0 2px 10px 0 rgba(0, 0, 0, 0.03)',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
