"use client";

import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "actions/userActions";
import { useAtom } from "jotai";
import { userAtom } from "utils/jotai/atoms";

export function useGetAllUsers() {
    const [user] = useAtom(userAtom);

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const users = await getAllUsers();
            return users.filter((u) => u.id !== user?.id);
        },
        enabled: !!user,
    });
}

export function useGetUserById(selectedUserId: string): { data: User | null } {
    return useQuery({
        queryKey: ["user", selectedUserId],
        queryFn: async () => {
            const user = await getUserById(selectedUserId);
            return user;
        },
        initialData: null,
    });
}
