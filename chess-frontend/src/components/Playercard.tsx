import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import XmarkIcon from "../svg/XmarkIcon";
import CheckIcon from "../svg/CheckIcon";
import { SocketUser } from "../types/zustand";

export default function Playercard({ username, profilePic }: SocketUser) {
  return (
    <Card className="py-4 w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col gap-1 items-start">
        <span className="font-bold text-large flex items-center gap-2">
          {username}
        </span>
        <p className="text-tiny uppercase font-medium">👑 3 win streak</p>
        <div className="flex items-center gap-2">
          <small className="text-default-500 clear-start flex items-center gap-1">
            <CheckIcon className="size-4 text-lime-600" />4 Wins
          </small>
          <small className="text-default-500 clear-start flex items-center gap-1">
            <XmarkIcon className="size-4 text-red-600" />1 Losses
          </small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col gap-3">
        {profilePic ? (
          <Image
            width={300}
            height={300}
            alt={username + "profile pic"}
            className="object-cover rounded-xl bg-red-200"
            src={profilePic}
          />
        ) : (
          <div className="w-full h-[300px] rounded-xl bg-foreground-100 flex items-center">
            <p className="text-center w-full cutive text-foreground-500">
              No profile pic
            </p>
          </div>
        )}

        <Button color="primary" variant="light" className="font-medium">
          Challenge
        </Button>
      </CardBody>
    </Card>
  );
}
