"use client";

import { useState } from "react";
import Signup from "./Signup";
import Signin from "./Singin";

export default function Auth() {
    const [view, setView] = useState("SIGNIN");

    return (
        <main className="w-screen h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* bg-gradient에서 br은 bottom, right 방향으로 그라데이션 준다는 의미, via-는 중간색을 의미 */}
            {view === "SIGNUP" ? (
                <Signup setView={setView} />
            ) : (
                <Signin setView={setView} />
            )}
        </main>
    );
}
