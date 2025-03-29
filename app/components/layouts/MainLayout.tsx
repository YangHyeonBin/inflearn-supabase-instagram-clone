"use client";

import Sidebar from "../Sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-screen w-full flex flex-row">
            <Sidebar />
            {children}
        </main>
    );
}
