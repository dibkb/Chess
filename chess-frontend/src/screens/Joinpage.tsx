import { Button, Tab, Tabs } from "@nextui-org/react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import { type MouseEvent, useState } from "react";
import { pageType, type SignInBody, type SignUpBody } from "../types/join";
import { singUser } from "../utils/sign";
import { signUpSchema } from "../schemas/zod";
export function Join() {
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
  const [page, setPage] = useState<pageType>("signin");
  function onSubmitHandler(e: MouseEvent<HTMLButtonElement>) {
    {
      e.preventDefault();
      // zod parsing
      switch (page) {
        case "signup":
          const result = signUpSchema.safeParse(signUpBody);
          if (!result.success) {
            console.error(result.error.errors);
          }
          break;
        case "signin":
          break;
      }
      // api call
      // singUser({
      //   type: page,
      //   body: page === "signin" ? singInBody : signUpBody,
      // });
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
    </section>
  );
}

// Types
