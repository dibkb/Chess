import { Avatar, cn } from "@nextui-org/react";
import React from "react";
import { ChallengePayload } from "../types/piece";

export const ChallengerDetails = ({
  color,
  venue,
  time,
  piece,
}: ChallengePayload) => {
  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar src="" size="lg" />
        <p className="font-semibold">{"User"} challenged you </p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="cutive text-lg">You will play as </p>
        {color === "w" ? (
          <span
            className={cn(
              "w-20 h-20 rounded-lg bg-black border-4 border-black cursor-pointer flex items-center justify-center cutive",
              `border-blue-500`
            )}
          >
            Black
          </span>
        ) : (
          <span
            className={cn(
              "w-20 h-20 rounded-lg bg-white border-4 cursor-pointer flex items-center justify-center cutive text-black",
              `border-blue-500`
            )}
          >
            White
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="cutive text-lg text-center">You will play in</p>
        <p className="text-center font-medium text-lg">{venue}</p>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="cutive text-lg text-center">You will play with</p>
        <p className="text-center font-medium text-lg">{piece}</p>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="cutive text-lg text-center">You will play the game</p>
        <p className="text-center font-medium text-lg">{time}</p>
      </div>
    </main>
  );
};
