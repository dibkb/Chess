import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import CropProfilepic from "./ModalBody/CropProfilepic";

interface Signup {
  className: string;
}
export default function Signup({ className }: Signup) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageCropUrl, setImageCropUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") setImageUrl(reader.result);
          onOpen();
        };
        reader.readAsDataURL(file);
      } else {
        // TODO : error state
      }
    }
  };
  return (
    <>
      <div className={className}>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl text-center">Welcome</h2>
          <p className="text-center text-sm text-default-400">
            Welcome,Please enter your details to sing up
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <input
            type="file"
            id={`user-image`}
            hidden
            onChange={(e) => handleFileChange(e)}
          />

          <label
            htmlFor={`user-image`}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <Avatar
              className="w-24 h-24 cursor-pointer"
              radius="lg"
              isBordered
              showFallback
              src={imageCropUrl || imageUrl}
            />

            <p className="text-default-400 text-center text-xs">
              Choose profile pic
            </p>
          </label>
        </div>
        <Input isRequired type="text" label="Username" className="max-w-full" />
        <Input
          isRequired
          type="password"
          label="Password"
          className="max-w-full"
        />
        <Input
          isRequired
          type="password"
          label="Confirm password"
          className="max-w-full"
        />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        isDismissable={false}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crop Profile Pic
              </ModalHeader>
              <CropProfilepic
                imageUrl={imageUrl || ""}
                setImageCropUrl={setImageCropUrl}
              />
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
