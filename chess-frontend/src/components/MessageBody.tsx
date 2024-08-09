import { Avatar } from "@nextui-org/react";
import { User } from "../types/zustand";

const MessageBodyOwner = ({ user, children }: MessageBody) => {
  return (
    <main className="text-sm flex justify-end text-white">
      <div className="bg-primary px-4 py-2 rounded-lg w-fill">{children}</div>
    </main>
  );
};
const MessageBodyUser = ({ children }: MessageBody) => {
  return (
    <main className="text-sm flex">
      <div className="grid grid-cols-[3rem_auto]">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          size="sm"
          className="border"
        />
        <div className="bg-foreground-100 px-4 py-2 rounded-lg w-fill">
          {children}
        </div>
      </div>
    </main>
  );
};
interface MessageBody {
  user?: User;
  children: React.ReactNode;
}
export { MessageBodyOwner, MessageBodyUser };
