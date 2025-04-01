import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, sendMessage } from "./chatService";

export function useGetMessages({ opponentId }: { opponentId: string }) {
    return useQuery({
        queryKey: ["messages", opponentId],
        queryFn: () => getMessages({ opponentId }),
        enabled: !!opponentId,
    });
}

export function useSendMessage() {
    return useMutation({
        mutationFn: async ({
            message,
            opponentId,
        }: {
            message: string;
            opponentId: string;
        }) => sendMessage({ message, opponentId }),
    });
}
