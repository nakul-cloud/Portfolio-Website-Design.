/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                dark: {
                    bg: '#0a0a0a',
                    surface: '#121212',
                    card: '#161616',
                    border: '#1f1f1f',
                },
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 71, 87, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(255, 71, 87, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
