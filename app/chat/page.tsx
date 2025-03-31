"use client";

import ChatPeopleList from "./ChatPeopleList";
import ChatScreen from "./ChatScreen";

export default function Chat() {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <ChatPeopleList />
            <ChatScreen />
        </div>
    );
}
