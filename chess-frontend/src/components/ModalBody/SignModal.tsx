import { Button, cn, ModalFooter, ModalHeader } from "@nextui-org/react";

import { ExclamationIcon } from "../../svg/ExclamationIcon";
import { CircleCheck } from "../../svg/CircleCheck";

interface SignModal {
  type: "success" | "failure";
  header?: string;
  children: React.ReactNode;
  onCloseCb: () => void;
}
export const SignModal = ({ type, header, children, onCloseCb }: SignModal) => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
      <main className="flex flex-col gap-4 items-center justify-center">
        {type === "success" ? (
          <CircleCheck className="size-9 text-success-500" />
        ) : (
          <ExclamationIcon className="size-9 text-red-500" />
        )}

        <div
          className={cn(
            `text-sm flex flex-col gap-2 text-center`,
            type === "success" && "text-success-500",
            type === "failure" && "text-red-500"
          )}
        >
          {children}
        </div>
      </main>
      <ModalFooter>
        <Button color="primary" variant="light" onPress={onCloseCb}>
          Okay
        </Button>
      </ModalFooter>
    </>
  );
};
