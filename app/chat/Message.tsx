export default function Message({
    isFromMe,
    message,
}: {
    isFromMe: boolean;
    message: string;
}) {
    return (
        <div
            className={`w-fit px-3 py-1 rounded ${
                isFromMe ? "ml-auto" : "mr-auto"
            } ${isFromMe ? "bg-blue-400 text-white" : "bg-gray-100"}`}>
            <p>{message}</p>
        </div>
    );
}
