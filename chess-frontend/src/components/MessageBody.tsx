import { User } from "../types/zustand";

const MessageBodyOwner = ({ user, children }: MessageBody) => {
  return (
    <main className="text-sm flex justify-end">
      <div className="bg-foreground-100 px-4 py-2 rounded-full w-min whitespace-nowrap">
        {children}
      </div>
    </main>
  );
};
const MessageBodyUser = ({ children }: MessageBody) => {
  return (
    <main className="text-sm">
      <div>{children}</div>
    </main>
  );
};
interface MessageBody {
  user?: User;
  children: React.ReactNode;
}
export { MessageBodyOwner, MessageBodyUser };
