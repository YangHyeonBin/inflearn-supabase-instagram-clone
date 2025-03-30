"use client";

import { useRouter } from "next/navigation"; // next/router 말고 next/navigation을 사용해야 에러 없음
import { useEffect } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function AuthProvider({
    accessToken,
    children,
}: {
    accessToken: string | null;
    children: React.ReactNode;
}) {
    const supabase = createBrowserSupabaseClient();
    const router = useRouter();

    useEffect(() => {
        if (!router) return;

        // auth state change listener (구독)
        const {
            data: { subscription: authListner },
        } = supabase.auth.onAuthStateChange((event, session) => {
            // if (event === "SIGNED_IN") {
            //     // router.replace("/");
            //     router.refresh();
            // }

            // 이미 /login인 경우는 제외
            if (
                event !== "INITIAL_SESSION" &&
                session?.access_token !== accessToken
            ) {
                router.refresh();
            }
        });

        // 컴포넌트가 언마운트될 때 구독 해제
        return () => {
            authListner?.unsubscribe();
        };
    }, [supabase, router, accessToken, children]);
    return <>{children}</>;
}
