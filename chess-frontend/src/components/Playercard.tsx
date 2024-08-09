import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import XmarkIcon from "../svg/XmarkIcon";
import CheckIcon from "../svg/CheckIcon";

export default function Playercard() {
  return (
    <Card className="py-4 w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col gap-1 items-start">
        <span className="font-bold text-large flex items-center gap-2">
          Jane Doe
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
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
        />
        <Button color="primary" variant="light" className="font-medium">
          Challenge
        </Button>
      </CardBody>
    </Card>
  );
}
