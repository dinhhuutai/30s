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
                noticeSlideLeft: {
                    '0%': { transform: 'translateX(calc(100% + 30px))' },
                    '40%': { transform: 'translateX(-30px)' },
                    '80%': { transform: 'translateX(30px)' },
                    '100%': { transform: 'translateX(0px)' },
                },
                noticeSlideRight: {
                    '0%': { transform: 'translateX(0px)' },
                    '40%': { transform: 'translateX(-30px)' },
                    '60%': { transform: 'translateX(-30px)' },
                    '100%': { transform: 'translateX(calc(100% + 30px))' },
                },
                noticeSlideTime: {
                    '0%': { width: '100%' },
                    '100%': { width: '0%' },
                },
            },
            animation: {
                loading: 'loading .8s linear infinite',
                modalDownSlide: 'modalDownSlide .1s linear',
                noticeSlideLeft: 'noticeSlideLeft .6s linear forwards',
                noticeSlideRight: 'noticeSlideRight .6s linear forwards',
                noticeSlideTime: 'noticeSlideTime 5s linear forwards',
            },
        },
    },
    plugins: [],
};
