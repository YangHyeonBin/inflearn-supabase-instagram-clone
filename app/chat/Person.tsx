"use client";

import { useEffect, useState } from "react";

import ko from "node_modules/javascript-time-ago/locale/ko.json";
import { getRandomImage } from "utils/random";

export default function Person({
    index,
    userId,
    name,
    onlineAt,
    isActive,
    isChatScreen,
    onClick,
}: {
    index: number;
    userId: string;
    name: string;
    onlineAt: string;
    isActive: boolean;
    isChatScreen: boolean;
    onClick?: () => void;
}) {
    // 초기값은 빈 문자열로 설정하여 서버/클라이언트 렌더링 불일치 방지
    const [formattedTime, setFormattedTime] = useState<string>("");

    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        if (typeof window === "undefined") return;

        // 동적 임포트를 컴포넌트 내에서 처리
        // 동적 임포트 이유는 아래 에러 메시지 (time-ago와 Next.js가 사용중인 JavaScript 모듈 시스템이 다르기 때문 (Next.js = CommonJS Module, time-ago = ESM(ECMAScript Module)))
        // Current file is CommonJS module whose imports will produce 'require' calls;
        // however, the referenced file is an ECMAScript module and cannot be imported with 'require'.
        // Consider writing a dynamic 'import("javascript-time-ago")' call instead.
        import("javascript-time-ago").then((module) => {
            const TimeAgo = module.default;
            TimeAgo.addLocale(ko);
            const timeAgo = new TimeAgo("ko-KR");
            setFormattedTime(timeAgo.format(new Date(onlineAt)));
        });
    }, [onlineAt]);

    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 p-4 min-w-60 w-full  ${
                isActive ? "bg-blue-50" : isChatScreen ? "bg-gray-50" : ""
            } ${onClick ? "cursor-pointer" : ""}`}>
            <img
                src={getRandomImage(index)}
                alt={name}
                className="!w-10 !h-10 rounded-full"
            />
            <div className="flex flex-col">
                <p className="font-bold text-sm ">{name}</p>
                <p className="text-gray-500 text-sm">{formattedTime}</p>
            </div>
        </div>
    );
}
