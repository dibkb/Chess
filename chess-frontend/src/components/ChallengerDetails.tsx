import { Avatar, cn } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { ChallengePayload } from "../types/piece";
import { axiosInstance } from "../api/apiInstance";
import { User } from "../types/zustand";

export const ChallengerDetails = ({
  challenger,
  color,
  venue,
  time,
  piece,
}: ChallengePayload) => {
  const [challengerProfile, setChallengerProfile] = useState<User>();
  useEffect(() => {
    async function getUserInfo() {
      const response = await axiosInstance.get<{ users: User[] }>(
        `/user-info?userId=${challenger.userId}`
      );
      const data = response.data.users[0];
      setChallengerProfile(data);
    }
    getUserInfo();
  }, []);
  console.log(challengerProfile);
  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar src={challengerProfile?.profilePic} size="lg" />
        <p className="font-semibold">
          {challengerProfile?.username} challenged you{" "}
        </p>
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
