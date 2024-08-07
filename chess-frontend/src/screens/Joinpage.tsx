import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import { SignModal } from "../components/ModalBody/SignModal";
import { pageType, SignInBody, SignUpBody } from "../types/join";
import { signInSchema, signUpSchema } from "../schemas/zod";
import { axiosInstance } from "../api/apiInstance";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/auth";
import { User } from "../types/zustand";

interface ModalContent {
  type: "success" | "failure";
  header?: string;
  data: React.ReactNode;
  onCloseCallBack?: () => void;
}

export function Join() {
  const { setToken, setUser } = useAuthStore((state) => state);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [page, setPage] = useState<pageType>("signup");
  const [signUpBody, setSignUpBody] = useState<SignUpBody>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signInBody, setSignInBody] = useState<SignInBody>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { schema, body, apiEndpoint } =
      page === "signup"
        ? { schema: signUpSchema, body: signUpBody, apiEndpoint: "/signup" }
        : { schema: signInSchema, body: signInBody, apiEndpoint: "/signin" };

    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
      showErrorModal("Invalid Input", validationResult.error.errors);
      return;
    }

    try {
      const response = await axiosInstance.post(apiEndpoint, body);
      handleSuccessResponse(response.data);
    } catch (error) {
      handleErrorResponse(error as AxiosError);
    }
  };

  const showErrorModal = (header: string, errors: any[]) => {
    setModalContent({
      type: "failure",
      header,
      data: (
        <>
          {errors.map((e) => (
            <p key={e.message}>{e.message}</p>
          ))}
        </>
      ),
    });
    onOpen();
  };

  const handleSuccessResponse = (response: any) => {
    if (page === "signup") {
      setModalContent({
        type: "success",
        data: (
          <>
            <p>
              Account successfully signed up for{" "}
              {response?.payload.user.username}.
            </p>
            <p>You can now sign in</p>
          </>
        ),
        onCloseCallBack: () => {
          setPage("signin");
          setSignUpBody({ username: "", password: "", confirmPassword: "" });
        },
      });
      onOpen();
    } else {
      const { token, user }: { token: string; user: User } = response.payload;
      setUser(user);
      setToken(token);
      // Handle sign-in success (e.g., set token and redirect)
    }
  };

  const handleErrorResponse = (error: AxiosError) => {
    setModalContent({
      type: "failure",
      data: (
        <p>
          {error.response?.data
            ? String(error.response.data)
            : "An unexpected error occurred"}
        </p>
      ),
    });
    onOpen();
  };

  return (
    <section className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <main className="flex rounded-lg justify-center items-center min-w-[600px]">
        <div className="w-full">
          <Tabs
            aria-label="Options"
            size="lg"
            className="flex items-center justify-center"
            selectedKey={page}
            onSelectionChange={(key) => setPage(key as pageType)}
          >
            <Tab key="signup" title="Sign Up" className="w-full px-8">
              <Signup
                className="flex flex-col gap-6 h-[470px] mt-8"
                signUpBody={signUpBody}
                setSignUpBody={setSignUpBody}
              />
            </Tab>
            <Tab key="signin" title="Sign In" className="px-8">
              <Signin
                className="flex flex-col gap-6 h-[470px] mt-8"
                signInBody={signInBody}
                setSignInBody={setSignInBody}
              />
            </Tab>
          </Tabs>
          <Button
            color="primary"
            className="w-full py-6 text-lg"
            onClick={handleSubmit}
          >
            Continue 👋
          </Button>
        </div>
      </main>
      {modalContent && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          isDismissable={false}
          size="xl"
        >
          <ModalContent>
            {(onClose) => (
              <SignModal
                type={modalContent.type}
                header={modalContent.header}
                onCloseCb={() => {
                  modalContent.onCloseCallBack?.();
                  onClose();
                }}
              >
                {modalContent.data}
              </SignModal>
            )}
          </ModalContent>
        </Modal>
      )}
    </section>
  );
}
