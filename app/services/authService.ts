"use client";

import { useMutation } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "utils/supabase/client";

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
                console.error(error);
                throw error;
            }

            // 데이터 리턴 잊지 말기!
            return data;
        },
    });
}
