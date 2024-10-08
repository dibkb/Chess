import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Chat } from "../types/chat";
import { MessageBodyOwner, MessageBodyUser } from "./MessageBody";
import { AvatarGroupPreview } from "./AvatarGroup";
import { useAuthStore, useMessageStore, useSocketStore } from "../store/auth";
import { SocketMessage } from "../types/socket";
import { AvatarTyping } from "./AvatarTyping";

const LobbyChat = () => {
  const { sendMessage } = useAuthStore();
  const { messageHistory, addMessage } = useMessageStore();
  const { socket } = useSocketStore();
  const [typingSockets, setTypingSockets] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  function submitMessageHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message !== "") {
      const newMessage: Chat = {
        owner: "me",
        message,
      };
      addMessage(newMessage);
      sendMessage({
        socketEvent: SocketMessage.Message,
        data: message,
      });
      setMessage("");
    }
  }
  // Scroll to the bottom when messageHistory updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messageHistory]);
  // Typing and not typing
  useEffect(() => {
    socket?.on(SocketMessage.Typing, (data) => {
      setTypingSockets(data.socketId);
    });
    socket?.on(SocketMessage.StoppedTyping, (data) => {
      setTypingSockets((prev) => {
        const newSet = new Set(prev);
        newSet.delete(data.socketId);
        return newSet;
      });
    });
  }, [socket]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  return (
    <Card isFooterBlurred className="w-full relative">
      <CardHeader className="flex gap-3 p-4">
        <AvatarGroupPreview />
      </CardHeader>
      <Divider />
      <CardBody className="h-[60vh] relative overflow-y-scroll p-0">
        <div
          className="flex flex-col gap-3 w-full max-h-full absolute bottom-16 p-6 overflow-scroll"
          ref={messagesEndRef}
        >
          {messageHistory?.map((mess, id) => {
            if (mess.owner === "other") {
              return (
                <MessageBodyUser key={id} socketId={mess.socketId}>
                  {mess.message}
                </MessageBodyUser>
              );
            } else {
              return (
                <MessageBodyOwner key={id}>{mess.message}</MessageBodyOwner>
              );
            }
          })}
          {typingSockets.size ? (
            <AvatarTyping typingSockets={typingSockets} />
          ) : (
            ""
          )}
        </div>
      </CardBody>
      <CardFooter className="absolute bottom-0 w-full bg-foreground-100 h-16">
        <form
          className="w-full flex px-4 bg-transparent"
          onSubmit={submitMessageHandler}
        >
          <input
            type="text"
            value={message}
            className="flex-grow bg-transparent !outline-none"
            placeholder="Type message here"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            isDisabled={message.length ? false : true}
            type="submit"
            color="primary"
            variant="flat"
            className="flex items-center gap-2 cursor-pointer"
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
export { LobbyChat };
