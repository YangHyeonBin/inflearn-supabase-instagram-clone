"use client";

import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function LogoutButton() {
    const supabase = createBrowserSupabaseClient();

    return (
        <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md text-sm">
            로그아웃
        </button>
    );
}
