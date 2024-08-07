import { Input } from "@nextui-org/react";
import { SignInBody } from "../types/join";
import { Dispatch, SetStateAction, useState } from "react";
import Eye from "../svg/Eye";
import EyeSlash from "../svg/EyeSlash";

interface Signin {
  className: string;
  signInBody: SignInBody;
  setSignInBody: Dispatch<SetStateAction<SignInBody>>;
}
export default function Signin({
  className,
  signInBody,
  setSignInBody,
}: Signin) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  return (
    <div className={className}>
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
        className="max-w-full"
        value={signInBody.username}
        onValueChange={(val) => {
          setSignInBody((prev) => ({
            ...prev,
            username: val,
          }));
        }}
      />
      <Input
        isRequired
        type={isVisible ? "text" : "password"}
        label="Password"
        className="max-w-full"
        value={signInBody.password}
        onValueChange={(val) => {
          setSignInBody((prev) => ({
            ...prev,
            password: val,
          }));
        }}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? <Eye /> : <EyeSlash />}
          </button>
        }
      />
    </div>
  );
}
