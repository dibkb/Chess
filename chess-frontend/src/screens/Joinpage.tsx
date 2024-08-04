import { Button, Tab, Tabs } from "@nextui-org/react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
export function Join() {
  const tabContainer = "flex flex-col gap-6 h-[470px] mt-8";
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
              <Signup className={tabContainer} />
            </Tab>
            <Tab key="signin" title="Sign In" className="px-8">
              <Signin className={tabContainer} />
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
