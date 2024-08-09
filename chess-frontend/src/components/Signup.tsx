import {
  Avatar,
  Button,
  Input,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import CropProfilepic from "./ModalBody/CropProfilepic";
import { SignUpBody } from "../types/join";
import EyeSlash from "../svg/EyeSlash";
import Eye from "../svg/Eye";

interface Signup {
  className: string;
  signUpBody: SignUpBody;
  setSignUpBody: Dispatch<SetStateAction<SignUpBody>>;
  onRouteToSignIn: () => void;
}
export default function Signup({
  className,
  signUpBody,
  setSignUpBody,
  onRouteToSignIn,
}: Signup) {
  const [isVisible, setIsVisible] = useState<Visible>({
    password: false,
    confirmPassword: false,
  });
  const toggleVisibility = (type: Label) =>
    setIsVisible((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        // TODO : error state not image file
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
              src={signUpBody.profilePic || imageUrl}
            />

            <p className="text-default-400 text-center text-xs">
              Choose profile pic
            </p>
          </label>
        </div>
        <Input
          isRequired
          value={signUpBody.username}
          onValueChange={(e) => {
            setSignUpBody((prev) => ({
              ...prev,
              username: e,
            }));
          }}
          type="text"
          label="Username"
          className="max-w-full"
        />
        <Input
          isRequired
          label="Password"
          className="max-w-full"
          value={signUpBody.password}
          type={isVisible.password ? "text" : "password"}
          onValueChange={(e) => {
            setSignUpBody((prev) => ({
              ...prev,
              password: e,
            }));
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => toggleVisibility("password")}
              aria-label="toggle password visibility"
            >
              {isVisible.password ? <Eye /> : <EyeSlash />}
            </button>
          }
        />
        <Input
          isRequired
          label="Confirm password"
          className="max-w-full"
          value={signUpBody.confirmPassword}
          type={isVisible.confirmPassword ? "text" : "password"}
          onValueChange={(e) => {
            setSignUpBody((prev) => ({
              ...prev,
              confirmPassword: e,
            }));
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => toggleVisibility("confirmPassword")}
              aria-label="Toggle confirm password visibility"
            >
              {isVisible.confirmPassword ? <Eye /> : <EyeSlash />}
            </button>
          }
        />
        <p className="text-center text-small">
          Already have an account?{" "}
          <Link size="sm" onPress={onRouteToSignIn} className="cursor-pointer">
            Sign in
          </Link>
        </p>
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
                setImageCropUrl={(res: string) => {
                  setSignUpBody((prev) => ({ ...prev, profilePic: res }));
                }}
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

// types
type Label = "password" | "confirmPassword";
type Visible = Record<Label, boolean>;
