interface SignUpBody {
  username: string;
  password: string;
  confirmPassword: string;
}
interface SignInBody {
  username: string;
  password: string;
}
type pageType = "signin" | "signup";

export { type SignUpBody, type SignInBody, type pageType };
