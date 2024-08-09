import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { Chat } from "../types/chat";

const LobbyChat = () => {
  const [messageHistory, setMessageHistory] = useState<Chat[]>();
  const [message, setMessage] = useState("");
  function submitMessageHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
  return (
    <Card isFooterBlurred className="w-full min-h-[700px] relative">
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
      <CardBody></CardBody>
      <CardFooter className="absolute bottom-0 w-full bg-foreground-100">
        <form
          className="w-full flex px-4 bg-transparent"
          onSubmit={submitMessageHandler}
        >
          <input
            type="text"
            className="flex-grow bg-transparent !outline-none"
            placeholder="Type message here"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="solid"
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
