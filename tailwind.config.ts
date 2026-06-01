import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:   ['var(--font-dm)', 'system-ui', 'sans-serif'],
        script: ['var(--font-dancing)', 'cursive'],
      },
      colors: {
        cream:    { DEFAULT: '#f8f3ea', dark: '#f0e8d8' },
        ivory:    '#f2ece0',
        paper:    '#faf7f2',
        parchment:'#ede6d4',
        sage:     { DEFAULT: '#7a9e8a', light: '#c8ddd2', dim: 'rgba(122,158,138,0.35)' },
        blue:     { DEFAULT: '#6b9fc4', light: '#a8cce0', ll: '#daedf6' },
        blush:    '#e8b4b0',
        lavender: '#b4a8d0',
        gold:     '#c4a86a',
        ink:      '#2a2820',
        muted:    '#6a6458',
      },
      boxShadow: {
        'book':     '4px 6px 20px rgba(0,0,0,0.1), 2px 3px 8px rgba(0,0,0,0.06)',
        'card':     '0 8px 24px rgba(107,159,196,0.1)',
        'card-hover':'0 12px 32px rgba(107,159,196,0.18)',
        'wax':      '0 4px 12px rgba(107,159,196,0.3)',
        'blue-glow':'0 0 24px 8px rgba(107,159,196,0.15)',
      },
      animation: {
        'book-float':  'bookFloat 5s ease-in-out infinite',
        'wing-beat':   'wingbeat 0.5s ease-in-out infinite alternate',
        'page-reveal': 'pageReveal 0.55s ease both',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'bokeh-drift': 'bokehDrift 8s ease-in-out infinite',
        'confetti':    'confettiFall var(--dur, 2s) ease-in var(--del, 0s) forwards',
        'burst-out':   'burstOut var(--bd, 1.4s) cubic-bezier(0.1,0.8,0.3,1) var(--del, 0s) forwards',
        'fade-in':     'fadeIn 0.5s ease both',
        'fade-up':     'pageReveal 0.5s ease both',
      },
    },
  },
  plugins: [],
};

export default config;
