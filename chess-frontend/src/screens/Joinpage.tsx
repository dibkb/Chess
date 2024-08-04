import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import CropProfilepic from "../components/ModalBody/CropProfilepic";
export function Join() {
  const tabContainer = "flex flex-col gap-6 h-[450px] mt-8";
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
    <section className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <main className="flex rounded-lg justify-center items-center min-w-[600px]">
        <div className="w-full">
          <Tabs
            aria-label="Options"
            size={"lg"}
            className="flex items-center justify-center"
          >
            <Tab key="signup" title="Sign Up" className="w-full px-8">
              <div className={tabContainer}>
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
                    {imageCropUrl || imageUrl ? (
                      <Avatar
                        className="w-20 h-20 cursor-pointer"
                        radius="lg"
                        src={imageCropUrl.length ? imageCropUrl : imageUrl}
                      />
                    ) : (
                      <Avatar
                        className="w-20 h-20 cursor-pointer"
                        src=""
                        radius="lg"
                      />
                    )}
                    <p className="text-default-400 text-center text-xs">
                      Choose profile pic
                    </p>
                  </label>
                </div>
                <Input
                  isRequired
                  type="text"
                  label="Username"
                  className="max-w-full"
                />
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
                        <Button
                          color="primary"
                          variant="light"
                          onPress={onClose}
                        >
                          Done
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </Tab>
            <Tab key="signin" title="Sign In" className="px-8">
              <div className={tabContainer}>
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl text-center">Welcome back</h2>
                  <p className="text-center text-sm text-default-400">
                    Welcome back,Please enter your details to sing in
                  </p>
                </div>
                <Input
                  isRequired
                  type="text"
                  label="Username"
                  defaultValue="junior@nextui.org"
                  className="max-w-full"
                />
                <Input
                  isRequired
                  type="password"
                  label="Password"
                  className="max-w-full"
                />
              </div>
            </Tab>
          </Tabs>
          <Button color="primary" className="w-full py-6 text-lg">
            Continue 👋
          </Button>
        </div>
      </main>
    </section>
  );
}
