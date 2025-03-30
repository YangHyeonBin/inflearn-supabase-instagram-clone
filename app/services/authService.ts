"use client";

import { useMutation } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "utils/supabase/client";

const handleError = (error: Error) => {
    console.error(error);
    throw error;
};

// using react query

export function useSignup() {
    const supabase = createBrowserSupabaseClient();

    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: "http://localhost:3000/signup/confirm", // 인증 완료 후 리다이렉트 url
                },
            });

            if (error) {
                handleError(error);
            }

            // 데이터 리턴 잊지 말기!
            return data;
        },
    });
}

export function useVerifyOtp() {
    const supabase = createBrowserSupabaseClient();

    return useMutation({
        mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
            const { data, error } = await supabase.auth.verifyOtp({
                type: "signup", // 왜 signup이지?
                email,
                token: otp,
            });

            if (error) {
                handleError(error);
            }

            return data;
        },
    });
}

export function useSignin() {
    const supabase = createBrowserSupabaseClient();

    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                handleError(error);
            }

            return data;
        },
    });
}
