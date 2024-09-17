/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                modalDownSlide: {
                    '0%': { transform: 'translateY(-60%)', opacity: 0 },
                    '100%': { transform: 'translateY(0%)', opacity: 1 },
                },
                loading: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            animation: {
                loading: 'loading .8s linear infinite',
                modalDownSlide: 'modalDownSlide .1s linear',
            },
        },
    },
    plugins: [],
};
