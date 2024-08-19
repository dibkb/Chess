import React from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { useSocketStore } from "../store/auth";
export const AvatarGroupPreview = () => {
  const { onlineUsers } = useSocketStore((state) => state);
  return (
    <>
      <AvatarGroup isBordered>
        {onlineUsers &&
          Array.from(onlineUsers.entries()).map(([id, socketUser]) => {
            return <Avatar key={id} src={socketUser.profilePic} />;
          })}
      </AvatarGroup>
    </>
  );
};
