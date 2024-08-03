import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
export function Join() {
  const tabContainer = "flex flex-col gap-6 h-[350px] mt-8";
  return (
    <section className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <main className="grid grid-cols-2 gap-6">
        <main className="flex rounded-lg justify-center items-center">
          <div className="w-full max-w-[500px]">
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
                  <Input
                    isRequired
                    type="password"
                    label="Confirm password"
                    className="max-w-full"
                  />
                </div>
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
        <main className="min-h-[700px] rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=2914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="NextUI Album Cover"
            className="w-full h-full"
          />
        </main>
      </main>
    </section>
  );
}
