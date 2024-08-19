import { Avatar } from "@nextui-org/react";
import { useSocketStore } from "../store/auth";
import { getUserFromSocket } from "../utils/getUserFromSocket";

const MessageBodyOwner = ({ children }: MessageBody) => {
  return (
    <main className="text-sm flex justify-end text-white">
      <div className="bg-primary px-4 py-2 rounded-lg w-fill">{children}</div>
    </main>
  );
};
const MessageBodyUser = ({ socketId, children }: MessageBody) => {
  const socketUser = getUserFromSocket(socketId);
  return (
    <main className="text-sm flex">
      <div className="grid grid-cols-[3rem_auto]">
        <Avatar src={socketUser?.profilePic} size="sm" className="border" />
        <div className="bg-foreground-100 px-4 py-2 rounded-lg w-fill">
          {children}
        </div>
      </div>
    </main>
  );
};
interface MessageBody {
  socketId?: string;
  children: React.ReactNode;
}
export { MessageBodyOwner, MessageBodyUser };
