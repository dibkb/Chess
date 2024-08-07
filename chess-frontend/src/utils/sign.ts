import { type pageType, type SignInBody, type SignUpBody } from "../types/join";

interface SignUpUserInterface {
  type: pageType;
  body: SignInBody | SignUpBody;
}
function singUser({ type, body }: SignUpUserInterface) {
  try {
  } catch (err) {
    console.log(err);
  }
}
export { singUser };
