import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";

import { ExclamationIcon } from "../../svg/ExclamationIcon";

interface SignModal {
  header?: string;
  children: React.ReactNode;
  onCloseCb: () => void;
}
export const SignModal = ({ header, children, onCloseCb }: SignModal) => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
      <main className="flex flex-col gap-4 items-center justify-center">
        <ExclamationIcon className="size-9 text-red-500" />
        <div className="text-sm flex flex-col gap-2 text-center text-red-500">
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
