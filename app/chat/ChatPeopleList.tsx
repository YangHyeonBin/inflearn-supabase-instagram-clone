"use client";

import { useAtom } from "jotai";
import Person from "./Person";
import {
    selectedUserIdAtom,
    selectedUserIndexAtom,
    userAtom,
    presenceStateAtom,
} from "utils/jotai/atoms";
import { useGetAllUsers } from "app/services/useAuthQueries";
import { useEffect } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function ChatPeopleList() {
    const [loggedInUser] = useAtom(userAtom);
    const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom);
    const [_, setSelectedUserIndex] = useAtom(selectedUserIndexAtom);
    const [presenceState, setPresenceState] = useAtom(presenceStateAtom);

    const { data: users } = useGetAllUsers();
    const supabase = createBrowserSupabaseClient();

    // 사용자 목록이 로드되고 selectedUserId가 비어있을 때 첫 번째 사용자 선택
    useEffect(() => {
        if (users && users.length > 0 && !selectedUserId) {
            setSelectedUserId(users[0].id);
            setSelectedUserIndex(0);
        }
    }, [users, selectedUserId, setSelectedUserId, setSelectedUserIndex]);

    // 사용자별 접속 시간 체크
    useEffect(() => {
        if (!loggedInUser) return;
        const channel = supabase.channel("online_users", {
            config: {
                presence: {
                    key: loggedInUser.id, // 사용자 ID를 키로 사용 -> 이 사용자의 onlineAt을 트래킹(구독)하겠다는 의미
                },
            },
        });

        channel.on("presence", { event: "sync" }, () => {
            // event 종류 - sync, join, leave
            const newState = channel.presenceState();
            // console.log(newState); // 채널 구독중인 동안에는, 마지막으로 트래킹한 onlineAt 데이터가 계속 찍힘

            // state를 안전한 json object 형태로 정의 (오류 방지)
            const newStateObj = JSON.parse(JSON.stringify(newState));
            setPresenceState(newStateObj);
        });

        channel.subscribe(async (status) => {
            if (status !== "SUBSCRIBED") return;

            const newPresenceStatus = await channel.track({
                // 트래킹하고 싶은 것을 명시
                onlineAt: new Date().toISOString(),
            });
            // console.log(newPresenceStatus); // 트래킹이 잘되면 OK라고 찍힘
        });

        return () => {
            channel.unsubscribe();
        };
    }, [loggedInUser, supabase]);

    return (
        <div className="h-screen w-fit flex flex-col items-center bg-gray-50">
            {users?.map((user, index) => (
                <Person
                    key={user.id}
                    index={index}
                    userId={user.id}
                    name={user.user_metadata.email?.split(".")[0] || ""}
                    onlineAt={presenceState?.[user.id]?.[0]?.onlineAt} // 타입 로깅해보면 array 형태여서 [0]번의 onlineAt을 가져옴
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
