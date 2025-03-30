"use client";

import { useState } from "react";
import Image from "next/image";
import { useSignin } from "app/services/authService";

export default function Signin({
    setView,
}: {
    setView: (view: string) => void;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = useSignin();

    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <div className="max-w-md w-full pt-10 pb-6 px-10  flex flex-col gap-8 bg-white items-center justify-center border border-gray-300 rounded-md">
                <Image
                    src="/hereiamgram.png"
                    alt="hereiamgram logo"
                    width={120}
                    height={40}
                    priority
                    className="!w-120 !h-auto"
                />
                <form
                    action=""
                    className="flex flex-col gap-4 w-full px-8"
                    onSubmit={(e) => {
                        e.preventDefault();

                        signIn.mutate(
                            {
                                email,
                                password,
                            },
                            {
                                onError: (error) => {
                                    alert(
                                        `로그인 중 오류가 발생했습니다: ${error.message}`
                                    );
                                },
                            }
                        );
                    }}>
                    <input
                        type="email"
                        value={email}
                        placeholder="이메일 주소"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300  rounded-md py-2 px-4"
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="비밀번호"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 focus:border-[#29b6f6] focus:ring-1 focus:ring-[#29b6f6] rounded-md py-2 px-4"
                    />
                    <button
                        type="submit"
                        disabled={signIn.isPending}
                        className="w-full mt-2 bg-[#29b6f6] text-white py-2  rounded-md">
                        {signIn.isPending ? "로그인 중..." : "로그인"}
                    </button>
                </form>
            </div>
            <div className="max-w-md w-full flex flex-row gap-4 justify-center bg-white border border-gray-300 rounded-md py-2 px-4 items-center">
                아직 계정이 없으신가요?
                <button
                    type="button"
                    onClick={() => setView("SIGNUP")}
                    className="text-[#29b6f6] font-bold">
                    회원가입하기
                </button>
            </div>
        </div>
    );
}
