import { Avatar, Button, Input, Tab, Tabs } from "@nextui-org/react";
export function Join() {
  const tabContainer = "flex flex-col gap-6 h-[450px] mt-8";
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
                  <Avatar
                    size="lg"
                    isBordered
                    radius="lg"
                    src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                  />
                  <p className="text-default-400 text-xs">Choose profile pic</p>
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
    </section>
  );
}
