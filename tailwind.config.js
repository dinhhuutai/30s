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
                loading2: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                loadingSlice: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
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
                infoBigSmall: {
                    '0%': { transform: 'scale(.8)' },
                    '30%': { transform: 'scale(.9)' },
                    '40%': { transform: 'scale(1.01)' },
                    '50%': { transform: 'scale(.8)' },
                    '60%': { transform: 'scale(.8)' },
                    '70%': { transform: 'scale(.89)' },
                    '80%': { transform: 'scale(.85)' },
                    '100%': { transform: 'scale(.8)' },
                },
                downSlide: {
                    '0%': { height: '0px', display: 'hidden' },
                    '100%': { height: '75px', display: 'block' },
                },
                upSlide: {
                    '0%': { height: '75px', display: 'block' },
                    '100%': { height: '0px', display: 'hidden' },
                },
                downSlide1: {
                    '0%': { height: '0px', display: 'hidden' },
                    '100%': { height: '110.5px', display: 'block' },
                },
                upSlide1: {
                    '0%': { height: '110.5px', display: 'block' },
                    '100%': { height: '0px', display: 'hidden' },
                },
            },
            animation: {
                infoBigSmall: 'infoBigSmall 1s ease-in-out infinite',
                downSlide: 'downSlide .2s ease-in-out forwards',
                upSlide: 'upSlide .2s ease-in-out forwards',
                downSlide1: 'downSlide1 .2s ease-in-out forwards',
                upSlide1: 'upSlide1 .2s ease-in-out forwards',

                loading: 'loading .8s linear infinite',
                loading2: 'loading .4s linear infinite',
                loadingSlice: 'loadingSlice .8s linear forwards',
                modalDownSlide: 'modalDownSlide .1s linear',
                noticeSlideLeft: 'noticeSlideLeft .6s linear forwards',
                noticeSlideRight: 'noticeSlideRight .6s linear forwards',
                noticeSlideTime: 'noticeSlideTime 5s linear forwards',
            },
        },
    },
    plugins: [],
};
