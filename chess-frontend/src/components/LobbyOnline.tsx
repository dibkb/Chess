import React from "react";
import Playercard from "./Playercard";
import { useSocketStore } from "../store/auth";

const LobbyOnline = () => {
  const { onlineUsers } = useSocketStore((state) => state);
  return onlineUsers ? (
    <main className="grid gap-6 grid-fit">
      {Array.from(onlineUsers.entries()).map(([id, socketUser]) => {
        return <Playercard key={id} {...socketUser} />;
      })}
    </main>
  ) : (
    "No players online"
  );
};
export { LobbyOnline };
