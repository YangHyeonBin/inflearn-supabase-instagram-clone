"use server";

import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./config/ReactQueryClientProvider";
import MainLayout from "./components/layouts/MainLayout";
import Auth from "./components/auth";
import { createServerSupabaseClient } from "utils/supabase/server";
import AuthProvider from "./config/authProvider";
import JotaiProvider from "./config/JotaiProvider";

const inter = Inter({ subsets: ["latin"] });

// 서버 컴포넌트여서 async 가능
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createServerSupabaseClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const loggedIn = !!session?.user;
    const accessToken = session?.access_token;

    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                    integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body className={inter.className}>
                <JotaiProvider>
                    <ReactQueryProvider>
                        <AuthProvider accessToken={accessToken ?? null}>
                            {loggedIn ? (
                                <MainLayout>{children}</MainLayout>
                            ) : (
                                <Auth />
                            )}
                        </AuthProvider>
                    </ReactQueryProvider>
                </JotaiProvider>
            </body>
        </html>
    );
}
