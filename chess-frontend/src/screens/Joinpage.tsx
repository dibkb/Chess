import { Input } from "@nextui-org/react";

export function Join() {
  return (
    <section className="flex justify-center items-center">
      <main className="grid grid-cols-2">
        <main className="flex justify-center items-center">
          <div className="rounded-xl p-4 w-[90vw] max-w-[600px] flex flex-col gap-6">
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
        </main>
        <main className="min-h-[700px] rounded-lg bg-foreground-100"></main>
      </main>
    </section>
  );
}
