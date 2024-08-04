import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import XmarkIcon from "../svg/XmarkIcon";
import CheckIcon from "../svg/CheckIcon";

export default function Playercard() {
  return (
    <Card className="py-4 w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col gap-1 items-start">
        <span className="font-bold text-large flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-lime-500"></span>
          Jane Doe
        </span>
        <p className="text-tiny uppercase font-bold">👑 3 win streak</p>
        <div className="flex items-center gap-2">
          <small className="text-default-500 clear-start flex items-center gap-1">
            <CheckIcon className="size-4 text-lime-600" /> Wins
          </small>
          <small className="text-default-500 clear-start flex items-center gap-1">
            <XmarkIcon className="size-4 text-red-600" /> Losses
          </small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
        />
      </CardBody>
    </Card>
  );
}
