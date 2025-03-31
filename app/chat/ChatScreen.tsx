import { useGetUserById } from "app/services/useAuthQueries";
import Message from "./Message";
import Person from "./Person";
import { useAtom } from "jotai";
import {
    selectedUserIdAtom,
    selectedUserIndexAtom,
    userAtom,
} from "utils/jotai/atoms";
import { useEffect, useRef, useState } from "react";
import { useGetMessages, useSendMessage } from "app/services/useChatQueries";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function ChatScreen() {
    const supabase = createBrowserSupabaseClient();
    const [currentUser, setCurrentUser] = useAtom(userAtom);

    const [selectedUserId, _] = useAtom(selectedUserIdAtom);
    const [selectedUserIndex, __] = useAtom(selectedUserIndexAtom);
    const { data: opponentUser } = useGetUserById(selectedUserId);

    const sendMessage = useSendMessage();
    const { data: messages, refetch: refetchMessages } = useGetMessages({
        opponentId: selectedUserId,
    });

    const [message, setMessage] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const channel = supabase
            .channel("message_postgres_changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "message",
                    // filter: `sender.eq.${selectedUserId}.and.receiver.eq.${currentUser?.id}`,
                },
                (payload) => {
                    refetchMessages();
                }
            )
            .subscribe();

        // 채팅 스크린 언마운트 시 채널 구독 해제
        return () => {
            channel.unsubscribe();
        };
    }, [selectedUserId, refetchMessages, currentUser?.id]);

    // 메시지 목록 변경 시 자동 스크롤
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="h-screen w-full flex flex-col">
            {selectedUserId &&
                opponentUser &&
                selectedUserId === opponentUser.id && (
                    <>
                        {/* active user 영역 */}
                        <Person
                            index={selectedUserIndex}
                            userId={selectedUserId}
                            name={
                                opponentUser?.user_metadata?.email?.split(
                                    "."
                                )[0] || ""
                            }
                            onlineAt={new Date().toISOString()}
                            isActive={false}
                            isChatScreen={true}
                        />

                        {/* 채팅 영역 */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                            {messages?.map((message) => (
                                <Message
                                    key={message.id}
                                    isFromMe={
                                        message.receiver === selectedUserId
                                        // message.sender === currentUser?.id
                                    }
                                    message={message.message}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* 인풋 영역 */}
                        <form
                            className="flex items-center gap-2 p-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!message || !selectedUserId) return;

                                sendMessage.mutate(
                                    {
                                        message,
                                        opponentId: selectedUserId,
                                    },
                                    {
                                        onSuccess: () => {
                                            setMessage("");
                                            refetchMessages();
                                        },
                                    }
                                );
                            }}>
                            <input
                                type="text"
                                className="flex-1 border-2 border-gray-300 rounded py-2 px-3"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={
                                    message.length === 0 ||
                                    sendMessage.isPending
                                }
                                className="bg-blue-400 border-2 border-blue-400 text-white px-4 py-2 rounded">
                                {sendMessage.isPending ? "Sending..." : "Send"}
                            </button>
                        </form>
                    </>
                )}
        </div>
    );
}
