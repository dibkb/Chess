import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";

interface ApppageModal {
  Header: React.ReactNode;
  Body: React.ReactNode;
  Footer: React.ReactNode;
  //   onCloseCallback: () => void;
}
export const ApppageModal = ({ Header, Body, Footer }: ApppageModal) => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{Header}</ModalHeader>
      <ModalBody>{Body}</ModalBody>
      <ModalFooter>{Footer}</ModalFooter>
    </>
  );
};
