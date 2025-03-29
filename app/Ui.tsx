"use client";

import LogoutButton from "./components/auth/LogoutButton";

export default function Ui() {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center gap-2">
            <h1 className="text-2xl font-bold">Welcome, Username</h1>
            <LogoutButton />
        </main>
    );
}
