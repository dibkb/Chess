import { useSocketStore } from "../store/auth";
import { SocketUser } from "../types/zustand";

function getUserFromSocket(
  socketId: string | undefined
): SocketUser | undefined {
  const { onlineUsers } = useSocketStore();
  if (onlineUsers && socketId)
    return Array.from(onlineUsers.values()).find(
      (socketUser) => socketId === socketUser.socketId
    );
}

export { getUserFromSocket };
