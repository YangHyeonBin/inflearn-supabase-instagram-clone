"use client";

import LogoutButton from "./components/auth/LogoutButton";
import { useAtom } from "jotai";
import { userAtom } from "utils/jotai/atoms";

export default function Ui() {
    const [user] = useAtom(userAtom);
    const username = user?.user_metadata.email?.split("@")[0];

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center gap-2">
            <h1 className="text-2xl font-bold">Welcome, {username}</h1>
            <LogoutButton />
        </main>
    );
}
