"use client";

import { useAtom } from "jotai";
import Person from "./Person";
import { selectedUserIdAtom, selectedUserIndexAtom } from "utils/jotai/atoms";
import { useGetAllUsers } from "app/services/useAuthQueries";
import { useEffect } from "react";

export default function ChatPeopleList() {
    const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom);
    const [_, setSelectedUserIndex] = useAtom(selectedUserIndexAtom);
    const { data: users } = useGetAllUsers();

    // 사용자 목록이 로드되고 selectedUserId가 비어있을 때 첫 번째 사용자 선택
    useEffect(() => {
        if (users && users.length > 0 && !selectedUserId) {
            setSelectedUserId(users[0].id);
            setSelectedUserIndex(0);
        }
    }, [users, selectedUserId, setSelectedUserId, setSelectedUserIndex]);

    return (
        <div className="h-screen w-fit flex flex-col items-center bg-gray-50">
            {users?.map((user, index) => (
                <Person
                    key={user.id}
                    index={index}
                    userId={user.id}
                    name={user.user_metadata.email?.split(".")[0] || ""}
                    onlineAt={new Date().toISOString()}
                    isActive={true}
                    isChatScreen={false}
                    onClick={() => {
                        setSelectedUserIndex(index);
                        setSelectedUserId(user.id);
                    }}
                />
            ))}
        </div>
    );
}
