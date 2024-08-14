import { Input, Tab, Tabs } from "@nextui-org/react";
import { SearchIcon } from "../svg/SearchIcon";
import Playercard from "../components/Playercard";
import { useState } from "react";
import { LobbyChat } from "../components/LobbyChat";
import { useSocketStore } from "../store/auth";

export default function Lobby() {
  const [selected, setSelected] = useState<selected>("lobby");
  const { onlineUsers } = useSocketStore((state) => state);
  console.log(onlineUsers);
  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
        <div className="cutive text-xl font-medium flex items-center gap-2">
          <span className="inline-block !h-3 !w-3 rounded-full bg-lime-500 animate-pulse"></span>
          <span className="">{onlineUsers?.size} Players Online</span>
        </div>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[32rem] h-10",
            mainWrapper: "h-full",
            input: "text-sm",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search players..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </div>
      <Tabs
        aria-label="Options"
        size="lg"
        variant="solid"
        radius="sm"
        fullWidth={true}
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as selected)}
      >
        <Tab key="lobby" title="Lobby">
          {onlineUsers ? (
            <main className="grid gap-6 grid-fit">
              {Array.from(onlineUsers.entries()).map(([id, socketUser]) => {
                return <Playercard key={id} {...socketUser} />;
              })}
            </main>
          ) : (
            "Loading"
          )}
        </Tab>
        <Tab key="chat" title="Chat">
          <LobbyChat />
        </Tab>
      </Tabs>
    </div>
  );
}

type selected = "lobby" | "chat";
