import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { SendIcon } from "../svg/SendIcon";

const LobbyChat = () => {
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
      <CardFooter className="absolute bottom-2 w-full p-4 bg-transparent">
        <form className="w-full flex bg-foreground-100 rounded-md py-2 px-4">
          <input
            type="text"
            className="flex-grow bg-transparent !outline-none"
          />
          <Button
            color="primary"
            variant="solid"
            className="flex items-center gap-2"
          >
            Send
            <SendIcon />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
export { LobbyChat };
