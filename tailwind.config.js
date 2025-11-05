/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [ "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#598216",
                white: {
                    DEFAULT: "#ffffff",
                    100: "#fafafa",
                    200: "#598216",
                },
                gray: {
                    100: "#878787",
                    200: "#878787",
                },
                dark: {
                    100: "#181C2E",
                },
                error: "#F14141",
                success: "#2F9B65",
            },
            fontFamily: {
                rubik: ["Rubik_400Regular"],
                "rubik-bold": ["Rubik_700Bold"],
                "rubik-semibold": ["Rubik_600SemiBold"],
                "rubik-medium": ["Rubik_500Medium"],
                "rubik-light": ["Rubik_300Light"],
            },
        },
    },
    plugins: [],
}