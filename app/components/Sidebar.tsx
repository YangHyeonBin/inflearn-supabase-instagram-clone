"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="h-screen w-fit p-6 border-r border-gray-300 flex flex-col justify-between">
            {/* home, peoople~chat */}
            <div className="flex flex-col gap-4">
                <Link href="/">
                    <i className="fa-solid fa-house mb-10"></i>
                </Link>

                <Link href="/people">
                    <i className="fa-solid fa-user-group"></i>
                </Link>
                <Link href="/discover">
                    <i className="fa-solid fa-compass"></i>
                </Link>
                <Link href="/chat">
                    <i className="fa-solid fa-paper-plane"></i>
                </Link>
            </div>

            {/* logout button */}
            <div>
                <button type="button">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </aside>
    );
}
