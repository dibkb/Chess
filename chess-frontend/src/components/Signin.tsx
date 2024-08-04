import { Input } from "@nextui-org/react";

interface Signin {
  className: string;
}
export default function Signin({ className }: Signin) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl text-center">Welcome back</h2>
        <p className="text-center text-sm text-default-400">
          Welcome back,Please enter your details to sing in
        </p>
      </div>
      <Input isRequired type="text" label="Username" className="max-w-full" />
      <Input
        isRequired
        type="password"
        label="Password"
        className="max-w-full"
      />
    </div>
  );
}
