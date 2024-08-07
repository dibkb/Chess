interface SignUpBody {
  username: string;
  password: string;
  confirmPassword: string;
}
interface SignInBody {
  username: string;
  password: string;
}
export { type SignUpBody, type SignInBody };
