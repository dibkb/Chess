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
import { type MouseEvent, useState } from "react";
import { pageType, type SignInBody, type SignUpBody } from "../types/join";
import { signUpSchema } from "../schemas/zod";
import { axiosInstance } from "../api/apiInstance";
import { AxiosError } from "axios";
import { SignModal } from "../components/ModalBody/SignModal";
export function Join() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errorModalContent, setErrorModalContent] =
    useState<ErrorModalContent>();
  const tabContainer = "flex flex-col gap-6 h-[470px] mt-8";
  const [signUpBody, setSignUpBody] = useState<SignUpBody>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [singInBody, setSignInBody] = useState<SignInBody>({
    username: "",
    password: "",
  });
  const [page, setPage] = useState<pageType>("signup");
  async function onSubmitHandler(e: MouseEvent<HTMLButtonElement>) {
    {
      e.preventDefault();
      // zod parsing
      switch (page) {
        case "signup":
          const result = signUpSchema.safeParse(signUpBody);
          if (!result.success) {
            // -----------------------------ERROR HANDLING------------------------------
            setErrorModalContent({
              header: "Invalid Input",
              data: (
                <>
                  {result.error.errors.map((e) => (
                    <p key={e.message}>{e.message}</p>
                  ))}
                </>
              ),
            });
            onOpen();
          } else {
            // api request to sign up
            try {
              const response = (await axiosInstance.post("/signup", signUpBody))
                .data;
              console.log(response);
            } catch (error) {
              const err = error as AxiosError;
              // -----------------------------ERROR HANDLING------------------------------
              console.log(err.response?.data);
              setErrorModalContent({
                // header: "Invalid Input",
                data: (
                  <>
                    <p>
                      {err.response?.data
                        ? String(err.response?.data)
                        : "An unexpected error occurred"}
                    </p>
                  </>
                ),
              });
              onOpen();
            }
          }
          break;
        case "signin":
          break;
      }
    }
  }
  return (
    <section className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <main className="flex rounded-lg justify-center items-center min-w-[600px]">
        <div className="w-full">
          <Tabs
            aria-label="Options"
            size={"lg"}
            className="flex items-center justify-center"
            selectedKey={page}
            onSelectionChange={(page) => setPage(page as pageType)}
          >
            <Tab key="signup" title="Sign Up" className="w-full px-8">
              <Signup
                className={tabContainer}
                signUpBody={signUpBody}
                setSignUpBody={setSignUpBody}
              />
            </Tab>
            <Tab key="signin" title="Sign In" className="px-8">
              <Signin
                className={tabContainer}
                signInBody={singInBody}
                setSignInBody={setSignInBody}
              />
            </Tab>
          </Tabs>
          <Button
            color="primary"
            className="w-full py-6 text-lg"
            onClick={onSubmitHandler}
          >
            Continue 👋
          </Button>
        </div>
      </main>
      {/* Modal to show input errors */}
      {errorModalContent && (
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
                header={errorModalContent.header}
                onCloseCb={() => {
                  errorModalContent.onCloseCallBack?.();
                  onClose();
                }}
              >
                {errorModalContent.data}
              </SignModal>
            )}
          </ModalContent>
        </Modal>
      )}
    </section>
  );
}
interface ErrorModalContent {
  header?: string;
  data: React.ReactNode;
  onCloseCallBack?: () => void;
}
