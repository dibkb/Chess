import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3).max(30),
  profilePic: z.string().url().optional(),
  password: z.string().min(6).max(100),
});
type SignUpBody = z.infer<typeof signUpSchema>;
export { signUpSchema, SignUpBody };
