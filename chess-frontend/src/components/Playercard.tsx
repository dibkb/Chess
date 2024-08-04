import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import XmarkIcon from "../svg/XmarkIcon";
import CheckIcon from "../svg/CheckIcon";

export default function Playercard() {
  return (
    <Card className="py-4 w-fit">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Jane Doe</h4>
        <p className="text-tiny uppercase font-bold">👑 3 win streak</p>
        <div className="flex items-center gap-2">
          <small className="text-default-500 clear-start flex items-center gap-1">
            <CheckIcon className="size-5 text-lime-600" /> Wins
          </small>
          <small className="text-default-500 clear-start flex items-center gap-1">
            <XmarkIcon className="size-5 text-red-600" /> Losses
          </small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
}
