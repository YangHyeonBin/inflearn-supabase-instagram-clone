"use client";

import { useSignup } from "app/services/authService";
import Image from "next/image";
import { useState } from "react";

export default function Signup({
    setView,
}: {
    setView: (view: string) => void;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationRequired, setConfirmationRequired] = useState(false);

    const signUp = useSignup();

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
                        e.preventDefault(); // 폼 제출 기본 동작(새로고침 등) 방지

                        signUp.mutate(
                            { email, password },
                            {
                                onSuccess: (data) => {
                                    setConfirmationRequired(true);
                                    alert(
                                        "메일함에서 이메일 인증을 완료해주세요!"
                                    );
                                },
                                onError: (error) => {
                                    alert(
                                        `회원가입 중 오류가 발생했습니다: ${error.message}`
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
                        disabled={
                            email === "" ||
                            password === "" ||
                            confirmationRequired
                        }
                        // 버튼 onClick이 아닌 form onSubmit으로 처리
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     signUp.mutate(
                        //         { email, password },
                        //         {
                        //             onSuccess: (data) => {
                        //                 setConfirmationRequired(true);
                        //                 alert(
                        //                     "메일함에서 이메일 인증을 완료해주세요!"
                        //                 );
                        //             },
                        //             onError: (error) => {
                        //                 alert(
                        //                     `회원가입 중 오류가 발생했습니다: ${error.message}`
                        //                 );
                        //             },
                        //         }
                        //     );
                        // }}
                        className="w-full mt-2 bg-[#29b6f6] text-white py-2 rounded-md">
                        {/* 처리중일 때 로딩 아이콘 추가 */}
                        {signUp.isPending && (
                            <i className="fa-solid fa-spinner animate-spin"></i>
                        )}
                        {confirmationRequired
                            ? "메일함을 확인해주세요"
                            : "가입하기"}
                    </button>
                </form>
            </div>
            <div className="max-w-md w-full flex flex-row gap-4 justify-center bg-white border border-gray-300 rounded-md py-2 px-4 items-center">
                이미 계정이 있으신가요?
                <button
                    type="button"
                    onClick={() => setView("SIGNIN")}
                    className="text-[#29b6f6] font-bold">
                    로그인하기
                </button>
            </div>
        </div>
    );
}
