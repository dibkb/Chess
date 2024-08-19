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

const LobbyChat = () => {
  const { sendMessage } = useAuthStore();
  const { messageHistory, addMessage } = useMessageStore();
  const { socket } = useSocketStore();
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  return (
    <Card isFooterBlurred className="w-full relative">
      <CardHeader className="flex gap-3 p-4">
        <AvatarGroupPreview />
      </CardHeader>
      <Divider />
      <CardBody className="h-[600px] relative overflow-y-scroll p-0">
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
