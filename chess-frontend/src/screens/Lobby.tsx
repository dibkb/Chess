import { Input } from "@nextui-org/react";
import { SearchIcon } from "../svg/SearchIcon";
import Playercard from "../components/Playercard";

export default function Lobby() {
  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
        <div className="cutive text-xl font-medium flex items-center gap-2">
          <span className="inline-block !h-3 !w-3 rounded-full bg-lime-500"></span>
          <span>9 Players Online</span>
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
      <main className="grid gap-6 grid-fit">
        {[...new Array(9)].map((_, idx) => (
          <Playercard key={idx} />
        ))}
      </main>
    </div>
  );
}
