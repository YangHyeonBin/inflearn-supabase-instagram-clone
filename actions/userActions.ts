"use server";

import { createServerSupabaseAdminClient } from "utils/supabase/server";

export async function getAllUsers() {
    const supabase = await createServerSupabaseAdminClient(); // current user 말고도 모든 유저 가져오기 위해 어드민으로

    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
        return [];
    }

    return data?.users ?? [];
}

export async function getUserById(id: string) {
    const supabase = await createServerSupabaseAdminClient();

    const { data, error } = await supabase.auth.admin.getUserById(id);

    if (error) {
        return null;
    }

    return data.user;
}
