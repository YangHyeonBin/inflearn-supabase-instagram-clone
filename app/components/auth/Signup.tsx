"use client";

import { useSignup, useVerifyOtp } from "app/services/authService";
import Image from "next/image";
import { useState } from "react";

export default function Signup({
    setView,
}: {
    setView: (view: string) => void;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationRequired, setConfirmationRequired] = useState(false);

    const signUp = useSignup();
    const verifyOtp = useVerifyOtp();

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

                        if (confirmationRequired) {
                            // otp 인증 처리
                            verifyOtp.mutate(
                                { email, otp },
                                {
                                    onSuccess: () => {
                                        setConfirmationRequired(false);
                                        alert("인증이 완료되었습니다!");
                                    },
                                    onError: (error) => {
                                        alert(
                                            `인증 절차 중 오류가 발생했습니다: ${error.message}`
                                        );
                                    },
                                }
                            );
                        } else {
                            // 회원가입 및 otp 메일 전송 절차
                            signUp.mutate(
                                { email, password },
                                {
                                    onSuccess: (data) => {
                                        setConfirmationRequired(true);
                                        alert(
                                            "메일함에서 인증번호를 확인해주세요!"
                                        );
                                    },
                                    onError: (error) => {
                                        alert(
                                            `회원가입 중 오류가 발생했습니다: ${error.message}`
                                        );
                                    },
                                }
                            );
                        }
                    }}>
                    {confirmationRequired ? (
                        <input
                            type="text"
                            value={otp}
                            placeholder="OTP 인증번호 6자리를 입력해주세요"
                            onChange={(e) => setOtp(e.target.value)}
                            className="border border-gray-300  rounded-md py-2 px-4"
                        />
                    ) : (
                        <>
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
                        </>
                    )}
                    <button
                        type="submit"
                        disabled={
                            confirmationRequired
                                ? otp.length !== 6 || verifyOtp.isPending
                                : email === "" ||
                                  password === "" ||
                                  signUp.isPending
                        }
                        // 버튼 onClick이 아닌 form onSubmit으로 처리

                        className="w-full mt-2 bg-[#29b6f6] text-white py-2 rounded-md">
                        {/* 처리중일 때 로딩 아이콘 추가 */}
                        {confirmationRequired
                            ? verifyOtp.isPending && (
                                  <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                              )
                            : signUp.isPending && (
                                  <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                              )}
                        {confirmationRequired ? "인증하기" : "가입하기"}
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
