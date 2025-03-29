type Config = {
    content: string[];
    theme?: any;
    plugins?: any[];
    // 필요한 다른 속성들
};

// material ui와 tailwindcss 함께 쓸 수 있는 material tailwind 라이브러리

const config: Config = {
    content: [
        "./utils/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {},
    plugins: [require("@tailwindcss/typography")],
    // 따로 설치한 tailwind css typography 플러그인
};

export default config;
