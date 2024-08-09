import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  divider,
  Divider,
} from "@nextui-org/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Chat } from "../types/chat";
import { MessageBodyOwner, MessageBodyUser } from "./MessageBody";

const LobbyChat = () => {
  const [messageHistory, setMessageHistory] = useState<Chat[]>([
    {
      message:
        "Your Lordship 👑, I see that the issue might be related to when the scrollIntoView function is called in relation to the message list update. The problem might be that the scrollIntoView function is being called before the DOM has updated with the new message, so the scroll isn't happening as expected.",
      owner: "other",
    },
    {
      message: "Your Lordship 👑",
      owner: "other",
    },
  ]);
  const [message, setMessage] = useState("");
  function submitMessageHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message !== "") {
      const newMessage: Chat = {
        owner: "me",
        message,
      };
      setMessageHistory((prev) => {
        if (prev) {
          return [...prev, newMessage];
        } else {
          return [newMessage];
        }
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
        <AvatarGroup isBordered>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
      </CardHeader>
      <Divider />
      <CardBody className="h-[600px] relative overflow-y-scroll p-0">
        <div
          className="flex flex-col gap-3 w-full max-h-full absolute bottom-16 p-6 overflow-scroll"
          ref={messagesEndRef}
        >
          {messageHistory?.map((mess, id) => {
            if (mess.owner === "other") {
              return <MessageBodyUser key={id}>{mess.message}</MessageBodyUser>;
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
            className="flex items-center gap-2"
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
export { LobbyChat };
