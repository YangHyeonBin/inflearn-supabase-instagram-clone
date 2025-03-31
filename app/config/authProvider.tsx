"use client";

import { useRouter } from "next/navigation"; // next/router 말고 next/navigation을 사용해야 에러 없음
import { useEffect } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { useAtom } from "jotai";
import { userAtom } from "utils/jotai/atoms";

export default function AuthProvider({
    accessToken,
    children,
}: {
    accessToken: string | null;
    children: React.ReactNode;
}) {
    const supabase = createBrowserSupabaseClient();
    const router = useRouter();
    const [_, setUser] = useAtom(userAtom);

    useEffect(() => {
        if (!router) return;

        // 초기 사용자 정보 설정
        const setInitialUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                setUser(data.user);
            }
        };

        setInitialUser();

        // auth state change listener (구독)
        const {
            data: { subscription: authListner },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user);
            } else {
                setUser(null);
            }

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
