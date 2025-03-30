import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "utils/supabase/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    // 이메일 인증 완료 후 redirect url에 'code' search param이 포함되어 돌아오게 됨
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = await createServerSupabaseClient();
        // 'code' search param 값을 이용,
        // supabase auth에서 제공하는 exchangeCodeForSession 메서드를 사용하여
        // code를 이용해 로그인 세션 획득, 로그인 처리가 됨
        await supabase.auth.exchangeCodeForSession(code);
    }

    // redirect url로 이동 (localhost:3000/signup/confirm/?code=... -> localhost:3000/)
    return NextResponse.redirect(requestUrl.origin);
}
