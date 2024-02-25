/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                lato: ["Lato", "sans-serif"],
                montserrat: ["Montserrat", "sans-serif"],
                "dancing-script": ["Dancing Script", "cursive"],
            },
        },
    },
    plugins: [],
    important: true,
};
