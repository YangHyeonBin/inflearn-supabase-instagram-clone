"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

export async function sendMessage({
    message,
    opponentId,
}: {
    message: string;
    opponentId: string;
}) {
    // "현재 로그인한 유저 정보를 얻기 위해" admin이 아닌 클라이언트를 생성
    // const supabase = await createServerSupabaseAdminClient();
    const supabase = await createServerSupabaseClient();

    const { data: session, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError || !session?.session?.user) {
        throw new Error("User is not authenticated");
    }

    const { data, error } = await supabase.from("message").insert({
        message,
        receiver: opponentId,
        sender: session.session.user.id,
    });

    if (error) {
        throw new Error("Failed to send message, " + error.message);
    }

    return data;
}

export async function getMessages({ opponentId }: { opponentId: string }) {
    const supabase = await createServerSupabaseClient();
    const { data: session, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError || !session?.session?.user) {
        throw new Error("User is not authenticated");
    }

    const { data, error } = await supabase
        .from("message")
        .select("*")
        // 보낸 사람이 현재 유저 또는 상대방,
        // 받는 사람이 현재 유저 또는 상대방인 것 즉 현재 채팅방에서 현재 유저와 상대방이 주고받은 모든 메시지
        .or(`sender.eq.${session.session.user.id}, sender.eq.${opponentId}`)
        .or(`receiver.eq.${session.session.user.id}, receiver.eq.${opponentId}`)
        .order("created_at", { ascending: true });

    if (error) {
        throw new Error("Failed to get messages, " + error.message);
    }

    return data;
}
